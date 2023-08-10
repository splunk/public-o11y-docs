
.. _set-up-synthetics:

********************************************************************
Set up Splunk Synthetic Monitoring
********************************************************************

.. meta::
    :description: Get started with Splunk Synthetic Monitoring.


Monitor the performance of your web pages and applications by running synthetic Browser, Uptime, and API tests. These tests let you proactively alert the relevant teams when a site or user flow they manage becomes unavailable, as well as report on the performance of a site or user flow over time. Splunk Synthetic Monitoring does not require extensive installation and setup: you can get started by creating your first test directly in the Splunk Synthetic Monitoring user interface. 


Choose a test
============================================================

The following table outlines which test might work for the scenario you want to monitor. 

.. list-table::
   :header-rows: 1
   :widths: 20 80 

   * - :strong:`Test`
     - :strong:`Workflow you want to monitor`

   * - Uptime 
     -  
        * SLAs on HTTP endpoints 
        * Health and response codes of endpoints

   * - Browser test  
     - 
        * UX data for single pages like a home page, product pages.
        * UX data across different device types and locations desktop, mobile, tablet.
        * multiple step journeys like login and checkout. 
        * A / B testing. How does adding or removing a specific third party affect performance.
        * Set performance benchmarks and understand long term trends.
        * Compare performance with industry standards like Google search and web vitals. 
        * Use a HAR file to run tests in local developer environments or sites behind a firewall.
        * Upload a HAR file, which contains full response bodies, so that Splunk Synthetic Monitoring can audit the content.


   * - API
     - 
        * SLAs on APIs and microservices, understanding the health of the endpoint 
        * Latency on APIs and microservices
        * Multiple step API transactions


Set up your first test 
==============================
After you choose which type of test you want to use, follow these steps to set up your test:

.. list-table::
   :header-rows: 1
   :widths: 20 80 

   * - :strong:`Test`
     - :strong:`Resources`

   * - Uptime 
     - 
       * :ref:`set-up-uptime-test`
       * :ref:`uptime-test-results` 
       * :ref:`uptime-metrics` 
   
   * - Browser 
     - 
       * :ref:`set-up-browser-test` 
       * :ref:`browser-test-results`
       * :ref:`browser-metrics`

   * - API
     - 

       * :ref:`api-test`
       * :ref:`api-test-results`
       * :ref:`api-test-metrics`


.. _synthetics-link-to-apm:

(Optional) Link Synthetic spans to APM spans
=============================================


If you link Synthetic spans to APM spans, you can follow the story of your data from front-end to back-end. Splunk Synthetics uses server timing to calculate the response time between the front end and back end of your application, and to join the front-end and back-end traces for end-to-end visibility. 

If a span in Splunk Synthetics has an associated back-end span, an :guilabel:`APM` link appears next to the span in the waterfall view of run results page and opens the span details page in Splunk APM.  

By default, the Splunk Distributions of OpenTelemetry already send the ``Server-Timing`` header. The header links spans from the browser with back-end spans and traces.

The APM environment variable for controlling the ``Server-Timing`` header  is ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true``. Set ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true`` to link to Splunk APM. 

After you set the environment variable, your application instrumentation adds the following response headers to HTTP responses:

.. code-block:: java

    Access-Control-Expose-Headers: Server-Timing
    Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"


The Server-Timing header contains the ``traceId`` and ``spanId`` parameters in ``traceparent`` format. To learn more, see:

* :new-page:`Server timing <https://www.w3.org/TR/server-timing/>` from the W3C documentation. 
* :new-page:`Traceparent header <https://www.w3.org/TR/trace-context/#traceparent-header>` from the W3C documentation. 


For more examples on Java instrumentation, see :ref:`server-trace-information-java`.

.. _third-step-config:

(Optional) Integrate with Splunk RUM 
------------------------------------

Integrate with Splunk RUM so that you can automatically measure Web Vital metrics against your run results. Web vitals capture key metrics that affect user experience and assess the overall performance of your site. For more, see :ref:`rum-synth`.

(Optional) Configure your application
------------------------------------------------------------------------


If you use Splunk Synthetic Monitoring to monitor an application or website with allow/block lists or a web analytics tool, you might want to adjust the settings to accommodate traffic from Splunk Synthetic Monitoring. See :ref:`synth-configure-app` for detailed instructions. 


Continue learning
==============================

See :ref:`synth-key-concepts` to learn more about important terms and concepts in Splunk Synthetic Monitoring.


