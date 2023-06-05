.. _get-started-rum:

************************************************
Introduction to Splunk RUM
************************************************

.. meta::
   :description: With Splunk Real User Monitoring, you can gain insight about the performance and health of the front-end user experience of your application.

What is Splunk RUM?
========================================
With Splunk Real User Monitoring (RUM), you can gain insight about the performance and health of the front-end user experience of your application. Splunk RUM offers two solutions:

.. list-table::
   :header-rows: 1
   :widths: 15, 50

   * - :strong:`Product`
     - :strong:`Description`
   * - Splunk RUM for Browser
     - Splunk RUM for Browser collects performance metrics, web vitals, errors, and other forms of data for every user session to enable you to detect and troubleshoot problems in your application. For a complete view of your application from browser to back-end, integrate with Splunk APM.
   * - Splunk RUM for Mobile
     - Splunk Real User Monitoring (RUM) for Mobile provides visibility into every user session of your native iOS and Android mobile applications by equipping you with comprehensive performance monitoring, directed troubleshooting, and full-stack observability.


.. _wcidw-rum:

What can I do with Splunk RUM?
=========================================

.. list-table::
   :header-rows: 1
   :widths: 50, 28

   * - :strong:`Do this`
     - :strong:`Link to documentation`
   * - Learn how to identify errors and other problems like long resource response times in your browser spans.
     - :ref:`Scenario: Investigate errors in your browser spans <rum-identify-span-problems>`
   * - Create custom events to capture meaningful metrics about customer journeys and user behavior on your site.
     - :ref:`Create custom events  <rum-custom-event>`
   * - Experiment with the demo applications for Splunk RUM for Mobile
     - :ref:`Experiment with the demo applications for Splunk RUM for Mobile <rum-sample-app>`

(Optional) Link RUM spans to APM spans
==========================================================
If you want to monitor your application from browser to back-end, then integrate Splunk RUM with Splunk APM. When you integrate Splunk RUM for Browser with Splunk APM, you start sending server timing metrics to RUM along with the back-end trace ID that was generated. 

If a span in Splunk RUM has an associated back-end span, an :guilabel:`APM` link appears next to the span in the waterfall view and opens the span details page in Splunk APM.  

By default, the Splunk Distributions of OpenTelemetry already send the ``Server-Timing`` header. The header links spans from the browser with back-end spans and traces.

Splunk RUM for Browser uses the server-timing header response times to associate the RUM span with the corresponding APM trace. The APM environment variable for controlling the ``Server-Timing`` header  is ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true``. Set ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true`` to link to Splunk APM. 

For more information on Splunk APM, see :ref:`Monitor applications with Splunk APM <get-started-apm>`.


Get data in 
=============================
To start instrumenting your application with Splunk RUM, see :ref:`rum-setup`. 