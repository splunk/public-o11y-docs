.. _apm-errors:

***********************************
Analyze error spans in Splunk APM
***********************************



.. meta::
  :description: Learn about types of errors in Splunk APM. 

With Splunk APM error detection, you can isolate specific causes of errors in your system and applications.

Use these sections to answer the following questions you might have about error detection in Splunk APM:

* :ref:`apm-error-detection`
* :ref:`apm-http-status`
* :ref:`root-cause-error`
* :ref:`metricset-errors`
* :ref:`customize-error-logic`

.. _apm-error-detection:

How are error spans detected?
=========================================

Each :term:`span` in Splunk APM captures a single operation. Splunk APM considers a span an error span if the operation that the span captures results in an error.

A span is considered an error span when any of the following conditions are met: 

* The span's ``span.status``, set via OpenTelemetry instrumentation, is ``Error``. See the OpenTelemetry :new-page:`Tracing API specification <https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#set-status>` to learn more about the ``span.status``. 
* The span's ``error`` tag is set to a truthy value, which is any value other than ``False`` or ``0``. 
* The value of the span’s ``http.status_code`` tag is set to a ``5xx`` error code. See :ref:`apm-http-status` to learn more.
 
Error counting in Splunk APM is based on the OpenTelemetry specification. See :new-page:`OpenTelemetry's Tracing API specification <https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#set-status>` on GitHub to learn more about the OpenTelemetry standard.

.. _apm-http-status:

How does Splunk APM handle HTTP status codes?
===============================================

The following table provides an overview of how HTTP status codes are treated in Splunk APM, in accordance with OpenTelemetry semantic conventions. To learn more, see the :new-page:`OpenTelemetry semantic conventions for HTTP spans <https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/http.md#status>` on GitHub.

.. list-table::
   :header-rows: 1
   :widths: 15 43 42

   * - :strong:`Error type`
     - :strong:`Server-side spans` (``span.kind = SERVER``)
     - :strong:`Client-side spans` (``span.kind = CLIENT``) 
   * - ``1xx``, ``2xx``, and ``3xx``
     - ``span.status`` is left unset, unless there's another error in the span. 
     - ``span.status`` is left unset, unless there's another error in the span. 
   * - ``4xx``
     - Not considered a server-side error; ``span.status`` left unset. See :ref:`4xx-error-logic` to learn more.
     - Counted as a client error; ``span.status`` set to ``Error``.
   * - ``5xx`` 
     - ``span.status`` set to ``Error``. See :ref:`5xx-error-logic` to learn more. 
     - ``span.status`` set to ``Error``. See :ref:`5xx-error-logic` to learn more. 

.. _metricset-errors:

How are error spans counted in MetricSets?
============================================

To generate endpoint-level Monitoring MetricSets, Splunk APM turns endpoint spans, which are spans with ``span.kind = SERVER`` or ``span.kind = CONSUMER``, into error metric data. If a span is considered an error per the Error rules in Splunk APM, that span counts towards errors in the Monitoring MetricSet for the endpoint associated with that span.

Service-level Monitoring MetricSets are based on the number of error spans in each of the service’s endpoints.

Server-side and client-side error counting
--------------------------------------------

Splunk APM captures all spans from all instrumented services, including spans capturing requests made to clients (client-side spans) and requests received by services (server-side spans). In certain cases, when a service returns an error, the error can be registered in both the initiating span and the receiving span. To avoid duplicated error reports, Splunk APM counts only the server-side error spans in MetricSets and error totals. 

For example, when ``service_a`` makes a call to ``service_b`` and both services are fully instrumented,Splunk APM receives the following two spans: 

* ``span_1``, a span with ``span.kind = CLIENT`` that captures ``service_a`` making the call to ``service_b``,
* ``span_2``, a span with ``span.kind = SERVER`` that captures ``service_b`` receiving the request. 
  
If ``service_b`` returns a ``500`` error, both spans receive that error.  To avoid double-counting, Splunk APM counts only the server-side span, ``span_2``, as an error in MetricSets and error totals.  



.. _root-cause-error: 

What is the difference between an error and a root cause error?
========================================================================

To help you identify the root cause of an error, Splunk APM differentiates between errors and root cause errors. For instance, the request and error graph in Tag Spotlight differentiates root cause errors from total errors with a darker red color: 

..  image:: /_images/apm/apm-errors/tag-spotlight-errors.png
    :width: 95%
    :alt: This screenshot shows the graph of requests and errors for paymentservice in Tag Spotlight. Total errors are represented by a light pink area plot on the graph, and root cause errors are shown in darker pink. 

When a particular span (operation) within a trace results in an error, the error can propagate through other spans in the trace. Any span determined to contain an error based on the criteria described in :ref:`apm-error-detection` is an error span. Splunk APM designates the originating error of a chain of error spans as the :strong:`root cause error`. 

For instance, consider the checkout trace in the following screenshot:

..  image:: /_images/apm/apm-errors/checkout-trace-402.png
    :width: 95%
    :alt: This screenshot shows an example of Splunk APM Explore view

The ``checkout`` service makes HTTP requests to the ``authorization`` service, the ``checkout`` service, and the ``payment`` service. The HTTP request to the ``payment`` service results in a ``402`` "Payment Required" error. Because the request to the ``payment`` service failed, the initiating requests to ``checkout`` service and ``http.Request`` also result in errors. 

In this case, the source error, or :strong:`root cause error`, is the ``402`` error in the ``payment`` service. The ``500`` errors appearing in the ``checkout`` and ``api`` services are subsequent errors. 

The root cause error count indicates the count of these root cause errors, while the standard error count indicates the total count of all root cause errors as well as any subsequent errors. 

.. _customize-error-logic: 

How can you customize the error logic in Splunk APM?
======================================================

In certain cases, you might want to modify your instrumentation to override defaults in the error logic or devise another method of tracking errors that matter to you. 

.. _4xx-error-logic:

Count ``4xx`` status codes as errors
--------------------------------------

By default, Splunk APM does not count server-side spans with ``4xx`` status codes as errors, because a ``4xx`` status code is often associated with a problem with the request itself, rather than a problem with the service handling a request.

For example, if a user makes a request to ``endpoint/that/does/not/exist``, the ``404`` status code the service returns does not mean there's a problem with the service. Instead, it means there was a problem with the request, which is trying to call an endpoint that does not actually exist. Similarly, if a user tries to access a resource they don’t have access to, the service might return a ``401`` status code, which is typically not the result of an error on the server side.

However, depending on your application’s logic, a ``4xx`` status code might actually represent a meaningful error, particularly for client-side requests. To monitor for ``4xx`` errors, try doing the following: 

* Break down performance by HTTP status code span tags, if available. See :ref:`alert-401s` to learn more. 
* Customize your instrumentation to set the ``span.status`` of spans with meaningful ``4xx`` status codes to ``Error``.

.. _alert-401s:

Example scenario: Alert on the rate of ``401`` errors for a service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For example, if Kai wanted to alert on the rate of ``401`` errors returned by a given service, they would do the following:

1. Index ``http.status_code``. See :ref:`apm-index-span-tags`.
2. Create a custom Monitoring MetricSet on ``http.status_code`` for the service’s endpoints to get a time series for each status code. See :ref:`cmms`.
3. Set up an alert on the rate of ``401`` errors as compared to all requests. See :ref:`apm-alerts`.

.. _5xx-error-logic:

Customize error logic to discard ``5xx`` status codes
--------------------------------------------------------------------------------

By default, Splunk APM counts server-side spans with ``5xx`` status codes as errors, because a ``5xx`` error is typically associated with service unavailability. 

For example, a ``503: service too busy`` error in a server-side span counts as an error by default. If the service you're monitoring is the front-end of a public website, users encountering a 503 error are not able to use the website, thus potentially resulting in lost user interactions or lost revenue. In this case, a 503 would be a true error.

Depending on your application's logic, however, you might not consider ``5xx`` codes to be meaningful errors. For example, if your service is a batch processor, a ``503`` can be a normal flow control mechanism, simply triggering clients to retry their requests later. To override the default that counts ``503`` status codes as errors, you could modify your instrumentation to set ``span.status`` to ``OK`` in the spans where a ``503`` error is not a concern. 

