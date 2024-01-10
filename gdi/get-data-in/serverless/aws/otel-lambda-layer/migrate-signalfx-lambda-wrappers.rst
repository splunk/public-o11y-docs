.. _migrate-signalfx-lambda-wrappers:

**********************************************************************************
Migrate from SignalFx Lambda wrappers to Splunk OpenTelemetry Lambda Layer
**********************************************************************************

.. meta::
   :description: The Splunk OpenTelemetry Lambda Layer replaces the deprecated SignalFx Lambda wrappers for all supported languages. To migrate to the Splunk OTel Lambda layer, follow these instructions.

The SignalFx Lambda wrappers are deprecated. Follow these steps to migrate from the SignalFx Lambda wrappers to the Splunk OpenTelemetry Lambda Layer. For more information, see :ref:`splunk-otel-lambda-layer`.

- :ref:`remove-old-wrapper`
- :ref:`switch-handler`
- :ref:`install-new-layer`
- :ref:`convert-env-vars`

.. _remove-old-wrapper:

Remove the SignalFx Lambda wrapper from your function
========================================================

Before installing the Splunk OpenTelemetry Lambda Layer, remove any previous instrumentation, including the SignalFx Lambda wrapper.

   - If you installed the SignalFx wrapper as a layer, remove it from the console.
   - If you referenced the wrapper directly, remove the wrapper from the build.

For more information on Lambda layers, see the official AWS documentation at https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html.

.. _switch-handler:

Replace the handler for your function
========================================================

The Splunk OpenTelemetry Lambda Layer does not require setting a custom handler in :guilabel:`Runtime settings`. 

To replace the SignalFx handler with your function handler, follow these steps:

#. In the AWS Lambda console, open the function that you are instrumenting.

#. Navigate to :guilabel:`Code`, then :guilabel:`Runtime settings`.

#. Select :guilabel:`Edit`.

#. Replace the SignalFx handler with the handler of your function.

#. Select :guilabel:`Save`.

.. _install-new-layer:

Install the Splunk OpenTelemetry Lambda Layer
=======================================================

Once you've removed the SignalFx Lambda wrapper from your function, install the new Splunk OpenTelemetry Lambda Layer. See :ref:`install-otel-lambda-layer`.

.. _convert-env-vars:

Update the environment variables
=======================================================

The following table shows SignalFx Lambda wrapper environment variables and their Splunk OpenTelemetry Lambda Layer equivalents:

.. list-table:: 
   :header-rows: 1

   * - SignalFx environment variable
     - OpenTelemetry environment variable
   * - ``SIGNALFX_ACCESS_TOKEN`` and ``SIGNALFX_AUTH_TOKEN``
     - ``SPLUNK_ACCESS_TOKEN``
   * - ``SIGNALFX_TRACING_URL`` and ``SIGNALFX_API_HOSTNAME``
     - You can set either the ``SPLUNK_REALM`` environment variable or the endpoint using the ``OTEL_EXPORTER_OTLP_ENDPOINT`` or ``OTEL_EXPORTER_JAEGER_ENDPOINT`` environment variables.
   * - ``SIGNALFX_METRICS_URL``
     - You can set either the ``SPLUNK_REALM`` or the ``SPLUNK_METRICS_ENDPOINT`` environment variables.
   * - ``SIGNALFX_SEND_TIMEOUT``
     - ``OTEL_INSTRUMENTATION_AWS_LAMBDA_FLUSH_TIMEOUT``. See :ref:`other-lambda-settings`.
   * - ``SIGNALFX_LAMBDA_HANDLER``
     - ``AWS_LAMBDA_EXEC_WRAPPER``. You must select one of the supported handlers. See :ref:`set-env-vars-otel-lambda`.
   * - ``SIGNALFX_SERVICE_NAME``
     - ``OTEL_SERVICE_NAME=<name_of_the_service>``
   * - ``SIGNALFX_ENV``
     - ``OTEL_RESOURCE_ATTRIBUTES=deployment.environment=<name_of_the_environment>``
