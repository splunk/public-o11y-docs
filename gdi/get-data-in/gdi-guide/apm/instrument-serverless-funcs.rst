.. _instrument-serverless-functions-apm:

*******************************************************************
Part 2: Instrument serverless functions to send traces and metrics
*******************************************************************

.. meta:: 
    :description: Instrument your serverless functions to send data to Splunk APM.

You can instrument your serverless functions, including AWS Lambda functions, Azure .NET functions, and Azure Node.js functions. 

By integrating your serverless functions with Splunk, you can send traces to Splunk APM and metrics to Splunk Infrastructure Monitoring.

Instrument your serverless functions
====================================================

To instrument your AWS Lambda serverless functions, see :ref:`instrument-serverless-functions`.

View your serverless function data in Splunk Observability Cloud
=====================================================================

After you've instrumented your serverless functions, you can access your data in the following locations:

View traces on the APM landing page
-----------------------------------------

The Splunk APM landing page shows a preview of trace data coming from your serverless functions. 

To learn more about the APM landing page, see :ref:`apm-landing-page`.

View traces in the APM Explorer view
------------------------------------------

The APM explorer view offers detailed insights into your application data, including dependencies among your applications.

To learn how to use the explorer view, see :ref:`apm-service-map`.

View metrics in the Infrastructure Monitoring Lambda Functions navigator
----------------------------------------------------------------------------

Splunk Infrastructure Monitoring uses a special navigator for AWS Lambda functions.

.. image:: /_images/gdi/lambda-navigator.png
   :width: 100%
   :alt: This screenshot shows the Lambda Functions navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from serverless functions.

For more information about finding and using this navigator, see :ref:`monitor-aws-services`.

View metrics in built-in dashboards for AWS Lambda
----------------------------------------------------------------------------------

Splunk Observability Cloud uses built-in dashboards to display charts and visualizations of your AWS Lambda data. 

To use built-in dashboards, see :ref:`built-in-dashboards`.

Search for metrics using the metric finder
----------------------------------------------------------------------------------

You can search for your serverless function metrics using the Splunk metric finder. To learn more, see :ref:`metric-finder`.

Next steps
===============================

Optionally, identify whether your applications and functions use any custom data points and send them to Splunk Observability Cloud. See :ref:`send-custom-data-apm`.