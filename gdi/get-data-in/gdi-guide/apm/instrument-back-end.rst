.. _instrument-back-end-services-apm:

******************************************************************************************
Part 1: Instrument back-end services and applications to send traces, logs, and metrics
******************************************************************************************

.. meta:: 
    :description: Get started with instrumenting your back-end services and applications to send data to Splunk APM.

Splunk Application Performance Monitoring (APM) monitors and reports on data from your in-house applications, such as Java, Python, and Ruby applications. Using Splunk APM, you can gain important insights into the behavior of your applications. 

Instrumentation is the process of integrating Splunk with these applications. With instrumentation, you can send traces, logs, and metrics to Splunk Observability Cloud.

Instrument your applications
================================================================

To begin instrumenting your applications, see the instrumentation guides corresponding to the language of the application you want to instrument:

* :ref:`Instrument Java applications <get-started-java>`
* :ref:`Instrument Python applications <get-started-python>`
* :ref:`Instrument Node.js applications <get-started-nodejs>`
* :ref:`Instrument .NET applications <get-started-dotnet-otel>`
* :ref:`Instrument Go applications <get-started-go>`
* :ref:`Instrument Ruby applications <get-started-ruby>`
* :ref:`Instrument PHP applications <get-started-php>`

Use Splunk APM to view your application data
================================================================

After you've instrumented your application, you can access your data in the following locations:

* The APM landing page
* APM explorer view
* Metric finder
* Splunk Log Observer

Use one of these methods to make sure that your application data is reaching Splunk Observability Cloud.

View traces on the APM landing page
----------------------------------------

The APM landing page displays previews of trace data for applications. To use the APM landing page to find your trace data, see :ref:`apm-landing-page`.

View traces in the APM Explorer view
------------------------------------------

The APM explorer view gives detailed information about traces, such as highlighting dependencies among your application. 

   .. image:: /_images/apm/set-up-apm/set-up-apm-02.png
      :width: 100%
      :alt: This screenshot shows an example of the Splunk APM Explore view

To learn more about APM explorer, see :ref:`apm-service-map`.

Search for metrics using metric finder (Java only)
--------------------------------------------------------------------------------------------------

If you've instrumented a Java application, you can see application metrics using the metric finder. See :ref:`metric-finder` for more information.

Query logs in Log Observer
----------------------------------------------------------------------------------

If you chose to ingest logs, you can find logs in Splunk Log Observer. To learn how, see :ref:`logs-timeline`.

Next steps
===============================

To continue setting up your application monitoring with Splunk APM, see :ref:`instrument-serverless-functions-apm`.

