.. _apm-traces-spans:

****************
Traces and spans
****************

.. meta::
   :description: Learn about traces and spans in Splunk Observability Cloud. Spans are operations, and traces are collections of spans.

A trace is a collection of operations that represents a unique transaction handled by an application and its constituent services. A span is a single operation within a trace.

Each span has a name that represents the operation captured by the span and a service name that represents where the operation took place. Additionally, spans may refer to another span as their parent, defining a relationship between operations the trace captures to process that transaction. Spans can also include additional information and context with span tags. 

Each span contains information about the method, operation, or block of code that it captures, including these characteristics:

-  The service name 

-  The operation name

-  The start time of the operation

-  The duration of the operation

-  The name and IP address of the service where the operation took place

.. _apm-4xx-errors:

How Splunk APM handles 4xx errors
====================================

By default, Splunk APM doesn't display traces with ``4xx`` status codes as errors, just ``5xx`` status codes. This is because ``4xx`` status codes could be the result of issues with requests and not issues with services handling requests.

For example, if a user makes a request to ``endpoint/that/does/not/exist``, the ``404`` status code the service returns is not an error with the service, but with the request. Similarly, if a user tries to access a resource they don't have access to, the service could return a ``401`` status code, which is typically not the result of an error on the server side.

Depending on your application's logic, a ``4xx`` status code could be an error, particularly for client-side requests. There are a couple ways to address this:

- Break down performance by HTTP status code span tags, if available.

- Configure custom instrumentation to report ``4xx`` status codes as errors.

.. _span-tags:

Span tags
=============================================================================

Spans can include additional, free-form metadata to provide information and context about the operations that they represent in the form of span tags. Use span tags to query and filter traces or to provide extra information about each operation when inspecting the spans of a trace during troubleshooting.

Span tags are key-value pairs that correspond to a span. Span tag keys for a single span have to be unique. Both keys and values are strings.

Each span contains default span tags, but you can also add custom span tags when you instrument an application. For more information about using span tags to analyze service performance, see :ref:`apm-span-tags`.

Span tag naming conventions
----------------------------------------------------------------------------------

Tags provide more value when you construct a simple, dependable metadata model to use them. Define clear tag names to use for all your applications. Because span tag key-value pairs are text strings, you can create a model to fit your specific needs. OpenTelemetry provides semantic conventions for spans that you can use. For more information about existing semantic conventions, see :new-page:`Trace Semantic Conventions <https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace/semantic_conventions>` on GitHub.

Host-specific span tags
----------------------------------------------------------------------------------

If you send trace data to the :new-page:`Splunk OpenTelemetry Collector <https://github.com/signalfx/splunk-otel-collector>`, it automatically adds a ``host`` span tag to every span. This helps you identify which infrastructure component each span uses. The ``host`` span tag allows the application to render key infrastructure metrics and link to default dashboards for infrastructure components. This can help you more easily monitor the performance of your applications at the infrastructure level. The ``host`` span tag value is generally the hostname or unique resource identifier for the infrastructure component. 

In addition to the ``host`` span tag, the OpenTelemetry Collector automatically adds certain span tags to every span captured on that host according to the type of host. These additional span tags provide more information about infrastructure components each span uses, render corresponding infrastructure metrics, and link to more complete dashboards for the underlying infrastructure component.

Here are examples of host-specific span tags:

.. list-table::
   :header-rows: 1

   * - :strong:`Span tag`
     - :strong:`Description`
    
   * - ``AWSUniqueId`` or ``gcp_id``
     - Unique resource identifier for cloud providers.

   * - ``container_id``
     - Unique resource identifier for Docker containers.

   * - ``kubernetes_pod_uid``
     - Unique resource identifier for a resource in a Kubernetes cluster.

Limits on spans and traces
=============================================================================

These are the limits for span and trace length and count:

.. list-table::
   :header-rows: 1

   * - :strong:`Attribute`
     - :strong:`Description`

   * - Length 
     - The total length of all span tag keys, span tag values, and span annotations can't exceed 64 kB.

   * - Count
     - The maximum number of spans for each trace is 5000 spans per trace.