.. _rum-ios-data:

***********************************
Data collected by the iOS RUM agent
***********************************

.. meta::
   :description: Understand which RUM data you collect from iOS applications when using Splunk Real User Monitoring (RUM).

The iOS RUM agent includes a package that collects the following types of data about your iOS application.

Location data  
=============
If you choose to set the latitude and longitude for location data by using the Splunk RUM for iOS APIs, then Splunk Observability Cloud uses the information to map the geographical location of the user, such as country, city, and so on.

.. note::
   Splunk Observability Cloud calculates geographical metadata from the latitude and longitude, and then drops the latitude and longitude after processing the data. 


Common data types
==============================================

.. include:: /_includes/rum-data-model.rst





.. _rum-ios-metrics:

Metrics 
=============================================
The following tables list all of the metrics available in Splunk RUM for iOS. All errors in Splunk RUM have the dimension ``sf_error=true``. 
Metrics with the prefix ``rum.node.`` are page level metrics, whereas metrics with the prefix ``rum.`` are application level metrics. Page level metrics also have a dimension ``sf_node_name``, which you can use to filter on specific pages.

.. list-table:: 
   :widths: 5 15 15 65
   :header-rows: 1

   * - :strong:`Metric name`
     - :strong:`UI name`
     - :strong:`Page level metric`
     - :strong:`Description`
   * - ``rum.workflow.count``
     - Custom Event Count
     - ``rum.node.workflow.count``
     - The total number of spans with the selected custom event in the given time range. 
   * - ``rum.workflow.time.ns.p75``
     - Custom Event Duration
     - ``rum.node.workflow.time.ns.p75``
     - The p75 time in nanoseconds of spans with the selected custom event in the given time range.
   * - ``rum.crash.count``
     - Mobile crash
     -  ``rum.node.crash.count``
     - A crash is when a user encounters an error and has to exit the app.
   * - ``rum.app_error.count``
     - App error.
     - ``rum.node.app_error.count``
     - App error by page. 
   * - ``rum.resource_request.count``
     -  Network or back-end requests/errors
     - ``rum.node.resource_request.count``
     - The total number of network requests in a given time range. 
   * - ``rum.resource_request.time.ns.p75``
     - Network back-end latency
     - ``rum.node.resource_request.time.ns.p75``
     - The p75 time in nanoseconds for the network request latency in the given time range. 
   






.. _ios-rum-basic-properties:
 
Application data
==============================================

The following properties are common to all iOS applications instrumented for Splunk RUM:

.. list-table:: 
   :widths: 20 40 
   :header-rows: 1

   * - :strong:`Data type`
     - :strong:`Description`
   * - App life cycle events
     - Events that signal that the app starts up and goes to background.
   * - UI level events
     - Screen transitions and clicks on components.
   * - Network related events
     - Network changes, connection information. For example:
        * HTTP requests
        * Latency
        * Errors
   * - Errors
     - Crashes and exceptions.
   * - Custom events 
     - Events not collected by the RUM instrumentation and any events that need manual coding. See :ref:`manual-rum-ios-instrumentation`.