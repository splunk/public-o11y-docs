.. _troubleshooting-lambda-layer:

******************************************************
Troubleshoot the Splunk OpenTelemetry Lambda Layer
******************************************************

.. meta::
   :description: If your instrumented AWS Lambda function is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

If your instrumented AWS Lambda function is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

No data appears in Splunk Observability Cloud
==================================================

If no data from your instrumented AWS Lambda function appears in Splunk Observability Cloud, try the following steps:

1. Check the CloudWatch metrics of your AWS Lambda Function. Make sure the Lambda function is responding to invocations. You can also check for errors.

2. Make sure that you specified the ``SPLUNK_REALM`` and ``SPLUNK_ACCESS_TOKEN`` environment variables. See :ref:`set-env-vars-otel-lambda`.

3. Try increasing the value of the ``OTEL_INSTRUMENTATION_AWS_LAMBDA_FLUSH_TIMEOUT`` environment variable if the back end or network is slow.

4. Activate verbose logging of the extension. See :ref:`aws-lambda-debug-logging`.

.. _aws-lambda-troubleshooting:

No data points or metrics in Splunk Observability Cloud
=========================================================

If no metric data from your instrumented AWS Lambda function appears in Splunk Observability Cloud, try the following steps:

1. Check the CloudWatch metrics of your AWS Lambda Function. Make sure the Lambda function is responding to invocations. You can also check for errors.

2. Make sure that you specified the ``SPLUNK_REALM`` and ``SPLUNK_ACCESS_TOKEN`` environment variables. See :ref:`set-env-vars-otel-lambda`.

3. The extension might be sending data points with significant delay due to buffering mode. See :ref:`metrics-configuration-lambda`.

4. Activate verbose logging of the extension. See :ref:`aws-lambda-debug-logging`.

Error about SPLUNK_ACCESS_TOKEN and SPLUNK_REALM
=================================================================

If the following error appears, you must set the value of the ``SPLUNK_ACCESS_TOKEN`` environment variable:

.. code-block::

   [ERROR] SPLUNK_REALM is set, but SPLUNK_ACCESS_TOKEN is not set. To export data to Splunk Observability Cloud, define a Splunk Access Token.

For more information, see :ref:`main-lambda-agent-settings`.

Error about exporter endpoint and SPLUNK_REALM
=================================================================

If the following error appears, you must either set the value of the ``SPLUNK_REALM`` and ``SPLUNK_ACCESS_TOKEN``  environment variables, or define an exporter endpoint:

.. code-block::

   [ERROR] Exporter endpoint must be set when SPLUNK_REALM is not set. To export data, either set a realm and access token or a custom exporter endpoint.

For instructions on how to define a custom exporter endpoint, see :ref:`trace-exporters-settings-lambda`.

Deactivate instrumentations that load automatically
=====================================================

Some of the wrappers included in the Splunk OpenTelemetry Lambda Layer load instrumentations for popular libraries or frameworks automatically. To deactivate instrumentations that load automatically, follow these steps:

.. tabs::

   .. group-tab:: Python

      Enter the instrumentations you want to deactivate as comma-separated values for the ``OTEL_PYTHON_DISABLED_INSTRUMENTATIONS`` environment variable. For a list of automatically loaded instrumentations, see the requirements list in the OpenTelemetry repository on GitHub: https://github.com/open-telemetry/opentelemetry-lambda/blob/main/python/src/otel/otel_sdk/requirements-nodeps.txt

.. _aws-lambda-debug-logging:

Activate debug logging
==================================================

If trace data for your function still doesn't appear in Splunk Observability Cloud, activate logging to collect debugging information:

#. Set the ``OTEL_LAMBDA_LOG_LEVEL`` environment variable to ``DEBUG`` for your instrumented function.
#. Check AWS CloudWatch for spans.
#. Search for specific spans in the back end.

For metric data, follow these steps:

#. Set the ``VERBOSE`` environment variable to ``true``.
#. Set the ``HTTP_TRACING`` environment variable to ``true``.
#. Search for relevant log messages in AWS CloudWatch.