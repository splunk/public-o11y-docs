.. _rum-browser-data:

**************************************************
RUM Browser data model 
**************************************************

.. meta::
   :description: Understand which data you collect from browser-based web applications when using Splunk Observability Cloud Real User Monitoring (RUM).

The Browser RUM agent collects general RUM telemetry data about your front-end web application, as well as data from several instrumentations.

Common data types
==============================================

.. include:: /_includes/rum-data-model.rst

.. _browser-rum-basic-properties:

Basic properties
==============================================

The following properties are common to all web applications instrumented for Splunk RUM:

.. list-table:: 
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``id``
     - String
     - Unique 64-bit identifier generated for the span within the trace.
   * - ``parentId``
     - String
     - Parent span ID. Absent if the span is the root span in a trace.
   * - ``name``
     - String
     - Logical operation the span represents. For example, ``/pay`` or ``/customers/{1}/details``.
   * - ``duration``
     - Number
     - Duration in microseconds.
   * - ``traceId``
     - String
     - Unique 128-bit identifier, set on all spans belonging to the trace.
   * - ``timestamp``
     - Number
     - Epoch microseconds of the start of the span. Can be absent if incomplete.
   * - ``tags``
     - Object
     - Additional context, allowing to search and analyze spans based on specific tags.
   * - ``annotations``
     - Array
     - Associates events that explain latency with the time they happened.

.. _browser-rum-metrics:

Metrics 
=================================
The following tables list all of the metrics available in Splunk RUM for Browser. All errors in Splunk RUM have the dimension ``sf_error=true``. Metrics with the prefix ``rum.node.`` are page level metrics, whereas metrics with the prefix ``rum.`` are aggregations of multiple pages. Page level metrics also have a dimension ``sf_node_name``, which you can use to filter on specific pages.


.. list-table:: 
   :widths: 5 10 10 75
   :header-rows: 1

   * - :strong:`App level metric name`
     - :strong:`UI name` 
     - :strong:`Page level metric`
     - :strong:`Description`
   * - ``rum.workflow.count``
     - Custom event count
     - ``rum.node.workflow.count``
     - The total number of spans with the selected custom event in the given time range. 
   * - ``rum.workflow.time.ns.p75``
     - Custom event duration
     - ``rum.node.workflow.time.ns.p75``
     - The p75 time in nanoseconds of spans with the selected custom event in the given time range.
   * - ``rum.page_view.count``
     - Page views and route changes  
     - ``rum.node.page_view.count``
     - The total number of page views and route changes sorted by page for the given time range.
   * - ``rum.page_view.time.ns.p75``
     - Page views and route change duration
     - ``rum.node.rum.page_view.time.ns.p75``
     - The p75 time in nanoseconds of the document load and, or, the route change time for the given time range. Route changes in Splunk RUM are events with zero second durations. For more, see :ref:`browser-rum-data-doc-load`.
   * - ``rum.client_error.count``
     - JavaScript errors
     - ``rum.node.client_error.count``
     - The total number of spans with JavaScript errors in the given time range. 
   * - ``rum.webvitals_lcp.time.ns.p75``
     - Largest contentful paint (LCP) Time 
     - ``rum.node.webvitals_lcp.time.ns.p75``
     - The p75 time of the LCP in nanoseconds for the given time range.
   * - ``rum.webvitals_fid.time.ns.p75``
     - First input delay time (FID)
     - ``rum.node.rum.webvitals_fid.time.ns.p75``
     - The p75 time of the FID in nanoseconds for the given time range. 
   * - ``rum.webvitals_cls.score.p75``
     - Cumulative layout shift (CLS) 
     -  ``rum.node.rum.webvitals_cls.score.p75``
     - The p75 time of the CLS in nanoseconds for the given time range. 
   * - ``rum.long_task.count``
     - Long task count 
     - ``rum.node.long_task.count``
     - The total number of long tasks in the given time range. 
   * - ``rum.long_task.time.ns.p75``
     - Long task duration
     - ``rum.node.long_task.time.ns.p75``
     - The p75 time for long task duration in nanoseconds. 
   * - ``rum.resource_request.count``
     - Network requests (HTTPS, XHR, AJAX)
     - ``rum.node.resource_request.count``
     - The total number of network requests such as https, XHR, AJAX, and retrieve events in a given time range. 
   * - ``rum.resource_request.time.ns.p75``
     - Back-end and Resource request Duration  
     - ``rum.node.resource_request.time.ns.p75``
     - The p75 time in nanoseconds for AJAX and back-end latency in the given time range. 
   * - ``rum.resource_request.ttfb.time.ns.p75``
     - Time to first byte (TTFB) 
     - ``rum.node.resource_request.time.ns.p75``
     - The p75 time in nanoseconds for TTFB for the given time range. 

.. _browser-rum-default-tags:

Default tags
==============================================

By default, the Browser RUM agent adds the following tags to all spans:

.. list-table:: 
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``app``
     - String
     - Application name, as set in the configuration.
   * - ``component``
     - String
     - Instrumentation name that produced the span. For example, ``document-load``.
   * - ``location.href``
     - String
     - Location URL at the moment of creating the span.
   * - ``splunk.rumSessionId``
     - String
     - Session ID, collected from the ``_splunk_rum_sid`` cookie. See :ref:`browser-rum-cookies`.
   * - ``splunk.rumVersion``
     - String
     - Version of the Splunk RUM SDK instrumenting the application.
   * - ``splunk.scriptInstance``
     - String
     - The 64-bit ID of the ``splunk-otel-web.js`` instance. The ID is renewed every time the page is reloaded. This is useful, for example, when distinguishing between different open tabs within the same browser window which share the same session.
   * - ``otel.status_code``
     - String
     - If set, the value can be either ``OK`` or ``ERROR``.
   * - ``telemetry.sdk.language``
     - String
     - Always ``webjs``.
   * - ``telemetry.sdk.name``
     - String
     - Always ``@splunk/otel-web``.

.. _browser-rum-timing-annotations:

Request timing annotations
===============================================

All spans produced by the Browser RUM agent are annotated with performance timings, as specified by the W3C specification for the ``PerformanceNavigationTiming`` interface:

.. list-table:: 
   :widths: 10 90
   :header-rows: 1

   * - Name
     - Timestamp
   * - ``fetchStart``
     - Immediately before the browser starts to fetch the resource.
   * - ``domainLookupStart``
     - Immediately before the browser starts the domain name lookup for the resource.
   * - ``domainLookupEnd``
     - Immediately after the browser finishes the domain name lookup for the resource.
   * - ``connectStart``
     - Immediately before the browser starts to establish the connection to the server to retrieve the resource.
   * - ``secureConnectionStart``
     - Immediately before the browser starts the handshake process to secure the current connection.
   * - ``connectEnd``
     - Immediately after the browser finishes establishing the connection to the server to retrieve the resource.
   * - ``requestStart``
     - Immediately before the browser starts requesting the resource from the server.
   * - ``responseStart``
     - Immediately after the browser receives the first byte of the response from the server.
   * - ``responseEnd``
     - Immediately after the browser receives the last byte of the resource or immediately before the transport connection is closed.

.. _browser-rum-data-sending:

Data forwarding limits
===============================================

The Browser RUM agent has the following built-in limits:

- The forwarding frequency for data batches is 5 seconds.
- The agent can send 100 spans in 30 seconds per component. Spans produced beyond the limit are dropped.
- Tag values can be up to 4,096 characters long. The agent truncates longer values.
- The batch size, as determined by the number of spans, is 20 spans.

.. _browser-rum-geodata:

Collection and retention of geographical data
===============================================

The browser agent sends the IP addresses of all beacon connections to Splunk Observability Cloud, which uses them to map the geographical location of the user, such as country, city, and so on.

.. note:: Splunk Observability Cloud calculates only geographical metadata from the IPs, and drops IP addresses within 6 hours.

Instrumentation-specific data
==============================================

See :ref:`browser-rum-instrumentation-data` for more information on Browser RUM instrumentations and the data they collect.