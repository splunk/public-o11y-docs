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