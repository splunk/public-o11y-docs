.. _splunk-otel-lambda-layer:

**************************************************************
Instrument AWS Lambda functions for Splunk Observability Cloud
**************************************************************

.. meta::
   :description: Learn how to instrument your AWS Lambda functions to export spans and metrics to Splunk Observability Cloud. The layer supports numerous programming languages through integrated wrappers, and includes a metrics extension that collects high-resolution, low-latency metrics on function execution.

.. toctree::
   :hidden:

   Instrument your Lambda function <otel-lambda-layer/instrument-lambda-functions>
   Advanced configuration <otel-lambda-layer/advanced-configuration>
   Metrics and dimensions <otel-lambda-layer/lambda-metrics>
   Troubleshooting <otel-lambda-layer/troubleshooting-lambda-layer>
   SignalFx Lambda wrappers <signalfx-lambda-wrappers>
   Migrate from Lambda wrappers <otel-lambda-layer/migrate-signalfx-lambda-wrappers>

Use the Splunk OpenTelemetry Lambda Layer to automatically instrument AWS Lambda functions to send application metrics and traces to Splunk APM. The layer supports numerous programming languages through integrated wrappers, and includes a metrics extension that collects high-resolution, low-latency metrics every time the function runs.

To instrument your AWS Lambda function using the Splunk OpenTelemetry Lambda Layer, follow these steps:

#. :ref:`otel-lambda-layer-requirements`.
#. :ref:`install-otel-lambda-layer`.
#. :ref:`set-env-vars-otel-lambda`.

Splunk Observability Cloud can also collect AWS Lambda metrics and logs from AWS CloudWatch. See :ref:`get-started-aws` for more information on how to connect Splunk Observability Cloud to your AWS services.

.. note:: The :ref:`SignalFx Lambda wrappers <signalfx-lambda-wrappers>` are deprecated. To migrate to the Splunk OpenTelemetry Lambda Layer, see :ref:`migrate-signalfx-lambda-wrappers`.