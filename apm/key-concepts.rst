.. _apm-key-concepts:

*********************************
Key concepts in Splunk APM
*********************************

.. meta::
   :description: Learn about key concepts in Splunk APM.

Splunk APM is an Application Performance Monitoring solution that collects every span from every instrumented application to give you a complete picture of the interactions among the microservices that make up your distributed system. 

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Concept`
     - :strong:`Description`

   * - :ref:`Business Workflow<business-workflow-concept>`
     - A set of correlated traces that track a transaction or user flow of particular interest.

   * - :ref:`cardinality<cardinality-concept>`
     - The number of distinct values in a data set.
  
   * - :ref:`endpoint<endpoint-concept>`
     - A special type of operation where the root span's ``span.kind = SERVER``. A given service typically has one or more endpoints associated with it.

   * - :ref:`environment<environment-concept>`
     - A distinct deployment of your application that doesn’t interact directly with other deployments of the same application.  

   * - :ref:`identity<identity-concept>`
     - A unique set of indexed span tags that corresponds to a Splunk APM object. 

   * - :ref:`indexed span tag<indexed-tag-concept>`
     - A span tag for which Splunk generates Troubleshooting MetricSets.
  
   * - :ref:`inferred service<inf-service-concept>`
     - A remote service that is not instrumented in Splunk APM, but which Splunk APM can identify based on information in spans that make calls to the remote service.  

   * - :ref:`MetricSet<metricset-concept>`
     - A set of metric time series capturing the values of key indicators over time, such as request rate, error rate and durations, calculated based on your traces and spans in Splunk APM. 

   * - :ref:`Monitoring MetricSets (MMS)<mms-concept>`
     - Metric time series that power Splunk APM’s real-time monitoring capabilities, including charts, dashboards, and detectors.

   * - :ref:`operation<operation-concept>`
     - A specific action performed by a service. 
   
   * - :ref:`service<service-concept>`
     - A unit of software that connects to other services to make up a complete application.

   * - :ref:`service map<service-map-concept>`
     - A visualization of your instrumented and inferred services and their relationships. 

   * - :ref:`span<span-concept>` 
     - A single operation within a system of applications and services. 

   * - :ref:`span tag<span-tag-concept>`
     - A piece of metadata attached to a span that provides more information about the operation the span represents. 

   * - :ref:`Tag Spotlight<tag-spotlight-concept>`
     - A top-down view of your services based on indexed span tags. 

   * - :ref:`trace<trace-concept>` 
     - A collection of operations, known as spans, that represents a unique transaction an application handles. 

   * - :ref:`Trace Analyzer<trace-search-concept>`
     - Search through all traces from all instrumented services to find the exact trace you're looking for. 

   * - :ref:`trace view<trace-view-concept>`
     - View the span waterfall chart for a specific trace, and search for spans within that trace.

   * - :ref:`Troubleshooting MetricSets (TMS)<tms-concept>`
     - Metric time series used for high-cardinality troubleshooting of identities in APM and for historical comparison among spans and workflows.
 

Services 
=========
Services are the key components of the systems you can monitor with Splunk APM. The following are service-related terms and concepts.

.. _endpoint-concept:

endpoint
---------
A special type of operation where the root span's ``span.kind = SERVER``. A given service typically has one or more endpoints associated with it. 

.. _environment-concept:

environment
-------------
The term “environment” refers to the deployment environment, which is a distinct deployment in Splunk APM that doesn’t interact directly with other deployments of the same application. Separate deployment environments are often used for different stages of the development process, such as development, staging, and production. For more information, see :ref:`apm-environments`. 

.. _identity-concept:

identity
---------
A unique set of indexed span tags that corresponds to a Splunk APM object. An identity can represent a service, endpoint, operation, edge, or workflow, and is always related to at least one service. For more information, see :ref:`apm-traces-spans`.

.. _inf-service-concept:

inferred service
-------------------
A remote service that is not instrumented in Splunk APM, but which Splunk APM can identify based on information in spans that make calls to the remote service. Inferred services often include external service providers, pub/subs, Remote Procedure Calls (RPCs), and databases. To learn more, see :ref:`apm-inferred-services`.

.. _instr-service-concept:

instrumented service
---------------------
Use the OpenTelemetry Collector to instrument a service so that it sends its spans to Splunk APM. The SignalFx Smart Agent is now deprecated and will reach end of support on June 30th, 2023. To migrate from the Smart Agent to the Collector, see the :new-page:`migration guide <https://docs.splunk.com/Observability/gdi/opentelemetry/smart-agent-migration-to-otel-collector.html>`.  

See :ref:`get-started-application` to learn more about instrumenting services. 

.. _operation-concept:

operation
-----------
A specific action performed by a service. Each operation in an instrumented service is  captured in an individual spans. 

.. _service-concept:

service
--------
A service is a small, flexible, and autonomous unit of software that connects to other services to make up a complete application. A service typically represents a collection of API endpoints and operations that work together with other services’ endpoints in a distributed and dynamic architecture to deliver the full functionality of an application. 

“Service” is an umbrella term that encompasses container services (e.g. Docker, Kubernetes), microservices, and even calls to serverless functions. By instrumenting each of the services that make up your application, you can collect spans that represent operations within services and traces that represent collections of operations across services, to analyze and monitor this activity in Splunk APM. 

.. _service-map-concept: 

service map
-------------
A visualization of your instrumented and inferred services and their relationships. The service map is dynamically generated based on your selections in the time range, environment, workflow, service, and tag filters. See :ref:`apm-service-map` to learn more about using the service map in APM, or see :ref:`service-map` for a dedicated scenario. 


Traces and spans
==================

Spans and traces form the backbone of application monitoring in Splunk APM. The following image illustrates the relationship between traces and spans:  

.. image:: /_images/apm/terms-concepts/traces-spans.png
   :width: 70%
   :alt: This image shows a trace represented by a series of multicolored bars labeled with the letters A, B, C, D, and E. Each lettered bar represents a single span. The spans are organized to visually represent a hierarchical relationship in which span A is the parent span and the subsequent spans are its children. 

The following are terms and concepts related to spans and traces.

.. _business-workflow-concept:

Business Workflow
-------------------
Using Business Workflows, you can correlate a set of related traces that track a transaction or user flow of particular interest. 

To learn more, see:

* :ref:`apm-workflows` for an overview of Business workflows
* :ref:`configure-business-workflows` for a scenario involving Business Workflows

.. _indexed-tag-concept:

indexed span tag
-----------------
When you index a span tag, you indicate to Splunk APM that you are particularly interested in this tag and would like to generate additional analytics for it. Indexing a span tag generates Troubleshooting MetricSets for that tag. When you index a service-level span tag, you also have the option to generate custom dimensionalized Monitoring MetricSets using that span tag as a dimension. 

To learn how to index a span tag, see :ref:`apm-index-span-tags`. 

.. _span-concept:

span
-----
A single operation within a system of applications and services. Spans include span tags, which provide metadata such as the location and duration of the operations they represent.  A group of related spans makes up a trace. For more information, see :ref:`apm-traces-spans`.


.. _span-tag-concept:

span tag
--------
A piece of metadata attached to a span that provides more information about the operation the span represents. Examples of span tags include ``service.name`` and ``http.operation``. You can add span tags to spans during instrumentation or in the Splunk Distribution of OpenTelemetry Collector. Span tags are also known as “attributes” in the OpenTelemetry context. 

For more information, see :ref:`apm-span-tags`.

.. _tag-spotlight-concept:

Tag Spotlight
---------------
The Tag Spotlight view in Splunk APM offers a top-down view of your services based on indexed span tags. 

To learn more, see:

* :ref:`apm-tag-spotlight-overview` for an orientation to Tag Spotlight
* :ref:`troubleshoot-tag-spotlight` for a specific scenario leveraging Tag Spotlight. 

.. _trace-concept:

trace
------
A collection of related operations, known as spans, that represents a unique transaction an application handles. For more information, see :ref:`apm-traces-spans`.

.. _trace-search-concept:

Trace Analyzer
---------------

In Trace Analyzer, use Splunk APM's full-fidelity tracing by searching through all of your traces to find the precise source of a particular issue. 

To learn more, see :ref:`apm-scenario-trace-analyzer` for a dedicated scenario leveraging trace search. 


.. _trace-view-concept:

trace view
-----------
In Trace view, you can view the span waterfall chart for a specific trace, and search for spans within that trace. 

To learn more, see:

* :ref:`apm-trace-view` for an overview of Trace View
* :ref:`span-search` to learn more about span search


.. _metricset-concept:

MetricSets
===========
MetricSets are the central type of metric data that power Splunk APM. 

A MetricSet is a set of metric time series capturing the values of key indicators over time, such as request rate, error rate and durations, calculated based on your traces and spans in Splunk APM. Generate MetricSets by indexing span tags of interest. The following are terms and concepts related to MetricSets.

.. _cardinality-concept:

cardinality
------------
The number of distinct values in a data set. Low cardinality data has a small number of distinct values.  High cardinality data has a large number of distinct values, and requires more computation and storage to analyze and store. 

See :ref:`troubleshoot-mms` to learn more about working with high cardinality data. 

.. _mms-concept:

Monitoring MetricSets (MMS)
-----------------------------
Metric time series used to monitor and alert on the performance of your services in real time. MMS power the real-time APM Landing Page and the dashboard view, and are the metrics that detectors monitor and use to generate alerts.  MMS use the same functionality as metric time series in Infrastructure Monitoring to monitor and alert on the performance of applications and services. 

For more information about MMS, see :ref:`monitoring-metricsets`. 

.. _tms-concept:

Troubleshooting MetricSets (TMS)
----------------------------------
Metric time series used for high-cardinality troubleshooting of identities in APM and for historical comparison among spans and workflows. Splunk APM generates TMS based on indexed span tags. 

To learn more, see :ref:`troubleshooting-metricsets` .



