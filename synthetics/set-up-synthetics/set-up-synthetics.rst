
.. _set-up-synthetics:

********************************************************************
Set up Splunk Synthetic Monitoring
********************************************************************

.. meta::
    :description: Get started with Splunk Synthetic Monitoring.

Monitor the performance of your web pages and applications by running synthetic Browser, Uptime, and API tests. These tests let you proactively alert the relevant teams when a site or user flow they manage becomes unavailable, as well as report on the performance of a site or user flow over time. 

Get started
============
Splunk Synthetic Monitoring does not require extensive installation and setup: you can get started by creating your first test directly in the Splunk Synthetic Monitoring user interface. 

Follow these steps to familiarize yourself with each of the synthetic test types:

1. :ref:`first-step-uptime`
2. :ref:`second-step-browser`
3. :ref:`synthetics-link-to-apm`
4. :ref:`third-step-config`

.. _first-step-uptime:

Set up your first Uptime test
==============================
To begin learning what you can do with Splunk Synthetic Monitoring, start by setting up a simple Uptime test. See :ref:`set-up-uptime-test` for instructions. 

Learn more about Uptime tests
----------------------------------
* See :ref:`uptime-test-results` to learn about the visualizations that Uptime tests capture.
* See :ref:`uptime-metrics` for a complete list of Uptime test metrics.  


.. _second-step-browser:

Set up your first Browser test
===============================
Once you’ve successfully created an Uptime test, set up a Browser test to run a synthetic check on a webpage. You can provide the URL to a webpage you manage, or you can start by testing the performance of another website you like to visit. See :ref:`set-up-browser-test` for instructions.  

Learn more about Browser tests
----------------------------------
* See :ref:`browser-test-results` to learn about the visualizations that Browser tests capture.
* See :ref:`browser-metrics` for a complete list of Browser test metrics.  


.. _synthetics-link-to-apm:

(Optional) Link Synthetic spans to APM spans
==========================================================================

Linking Synthetic spans to APM spans enables you to follow the story of your data from front-end to back-end. Splunk Synthetics uses server timing to calculate the response time between the front end and back end of your application, and to join the front-end and back-end traces for end-to-end visibility. 

If a span in Splunk Synthetics has an associated back-end span, an :guilabel:`APM` link appears next to the span in the waterfall view of run results page and opens the span details page in Splunk APM.  

By default, the Splunk Distributions of OpenTelemetry already send the ``Server-Timing`` header. The header links spans from the browser with back-end spans and traces.

The APM environment variable for controlling the ``Server-Timing`` header  is ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true``. Set ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true`` to link to Splunk APM. 

After you set the environment variable, your application instrumentation adds the following response headers to HTTP responses:

.. code-block:: java

    Access-Control-Expose-Headers: Server-Timing
    Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"


The Server-Timing header contains the ``traceId`` and ``spanId`` parameters in ``traceparent`` format. To learn more, see:

* :new-page:`Server Timing <https://www.w3.org/TR/server-timing/>` from the W3C documentation. 
* :new-page:`Traceparent Header <https://www.w3.org/TR/trace-context/#traceparent-header>` from the W3C documentation. 


For more examples on Java instrumentation, see :ref:`server-trace-information-java`.

.. _third-step-config:

(Optional) Configure your application
=====================================
If you use Splunk Synthetic Monitoring to monitor an application or website with allow/block lists or a web analytics tool, you might want to adjust the settings to accommodate traffic from Splunk Synthetic Monitoring. See :ref:`synth-configure-app` for detailed instructions. 

Continue learning
==================
See :ref:`synth-key-concepts` to learn more about important terms and concepts in Splunk Synthetic Monitoring.




