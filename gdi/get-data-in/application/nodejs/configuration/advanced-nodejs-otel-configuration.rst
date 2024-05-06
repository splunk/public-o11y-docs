.. _advanced-nodejs-otel-configuration:

***************************************************************************
Configure the Splunk Distribution of OTel JS for Splunk Observability Cloud
***************************************************************************

.. meta::
   :description: Configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs, like correlating traces with logs, activating exporters, and more.

You can configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

The following sections describe all available settings for configuring OpenTelemetry for Node.js, including options for activating new features that are unique to the Splunk Distribution of OpenTelemetry JS.

.. _configuration-methods-nodejs:

Configuration methods
===========================================================

To configure the Splunk Distribution of OpenTelemetry JS, you can use a combination of environment variables and arguments passed to the ``start()`` function:

- Environment variables

   For example: ``export OTEL_SERVICE_NAME='test-service'``

- Arguments passed to the ``start()`` function

   For example: ``start({ serviceName: 'my-node-service', });``

Configuration for each of the supported data type, such as metrics or tracing, is set using additional properties on the configuration object:

.. code-block:: javascript

   start({
      // general options like `serviceName` and `endpoint`
      metrics: {
         // configuration passed to metrics signal
      },
      profiling: {
         // configuration passed to profiling signal
      },
      tracing: {
         // configuration passed to tracing signal
      },
   });

You can also activate the collection of a specific data type by passing a boolean value instead of an object. For example:

.. code-block:: javascript

   start({
      // general options like `serviceName` and `endpoint`
      metrics: true, // turn metrics on with default options
      profiling: true, // turn profiling on with default options
   });

.. note:: Function arguments take precedence over the corresponding environment variables.

.. _main-nodejs-agent-settings:

General settings
=========================================================================

The following settings are specific to the Splunk Distribution of OpenTelemetry JS:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="general" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-js/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "Argument to start()"}'></div>

.. _instrumentation-configuration-nodejs:

Instrumentations configuration
=======================================================

The following settings control which instrumentations are activated:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="instrumentation" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-js/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "Argument to start()"}'></div>

For example, to turn off all default instrumentations and only turn on the ``bunyan`` instrumentation, set the following environment variables:

.. code-block:: shell

   export OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED=false
   export OTEL_INSTRUMENTATION_BUNYAN_ENABLED=true

The previous settings only apply to instrumentations loaded by the Splunk Distribution of OpenTelemetry JS by default. When using the programmatic API to supply a list of user-specified instrumentations, they have no effect.


.. _trace-configuration-nodejs:

Trace configuration
=======================================================

The following settings control tracing limits and attributes:

.. list-table::
   :header-rows: 1

   * - Environment variable
     - Argument to start()
     - Description
   * - ``OTEL_TRACE_ENABLED``
     -  Not applicable
     - Activates tracer creation and autoinstrumentation. Default value is ``true``.
   * - ``OTEL_SERVICE_NAME``
     - ``serviceName``
     - Name of the service or application you're instrumenting. Takes precedence over the service name defined in the ``OTEL_RESOURCE_ATTRIBUTES`` variable.
   * - ``OTEL_RESOURCE_ATTRIBUTES``
     - Not applicable
     - Comma-separated list of resource attributes added to every reported span. For example, ``key1=val1,key2=val2``.
   * - ``OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT``
     - Not applicable
     - Maximum number of attributes per span. Default value is unlimited.
   * - ``OTEL_SPAN_EVENT_COUNT_LIMIT``
     - Not applicable
     - Maximum number of events per span. Default value is unlimited.
   * - ``OTEL_SPAN_LINK_COUNT_LIMIT``
     - Not applicable
     - Maximum number of links per span. Default value is ``1000``.
   * - ``OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT``
     - Not applicable
     - Maximum length of strings for attribute values. Values larger than the limit are truncated. Default value is ``1200``. Empty values are treated as infinity.


.. _trace-sampling-settings-nodejs:

Samplers configuration
===============================================================

The following settings control trace sampling:

.. list-table::
   :header-rows: 1
   :widths: 30 70
   :width: 100%

   * - Environment variable
     - Description
   * - ``OTEL_TRACES_SAMPLER``
     - Sampler to use. The default value is ``parentbased_always_on``. Possible values are: ``always_on``, ``always_off``, ``parentbased_always_on``, ``parentbased_always_off``, ``traceidratio``, ``parentbased_traceidratio``. See :new-page:`Built-in samplers <https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-sdk-trace-base/README.md#built-in-samplers>` in the official OpenTelemetry documentation for more information.

   * - ``OTEL_TRACES_SAMPLER_ARG``
     - Semicolon-separated list of rules for the ``rules`` sampler. For example, when setting the sampler to ``parentbased_traceidratio`` you can set the ratio using a number in the 0 to 1 range: |br| |br| ``OTEL_TRACES_SAMPLER_ARG=0.25``.


.. _trace-exporters-settings-nodejs:

Exporters configuration
===============================================================

The following settings control trace exporters and their endpoints:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="exporter" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-js/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "Argument to start()"}'></div>

.. _jaeger-exporter-nodejs:

Jaeger exporter
-------------------

To use the Jaeger exporter, add the ``@opentelemetry/exporter-jaeger`` package as in the following example:

.. code-block:: js

   const { start } = require('@splunk/otel');
   const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
   start({
      serviceName: 'my-node-service',
      tracing: {
         spanExporterFactory: (options) => {
         return new JaegerExporter({
            serviceName: options.serviceName,
            // Additional config
         })
         }
      },
   });

.. note:: To send data directly to Splunk Observability Cloud, see :ref:`export-directly-to-olly-cloud-nodejs`.

.. _trace-propagation-configuration-nodejs:

Propagators configuration
=======================================================

The following settings control trace propagation:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="propagator" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-js/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "Argument to start()"}'></div>

For backward compatibility with the SignalFx Tracing Library for Node.js, use the b3multi trace propagator:

.. tabs::

   .. code-tab:: shell Linux

      export OTEL_PROPAGATORS=b3multi

   .. code-tab:: shell Windows PowerShell

      $env:OTEL_PROPAGATORS=b3multi

.. _profiling-configuration-nodejs:

Node.js settings for AlwaysOn Profiling
===============================================

The following settings control the AlwaysOn Profiling feature for the Node.js agent:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="profiler" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-js/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "Argument to start()"}'></div>

To configure AlwaysOn Profiling programmatically, pass the arguments to the ``start`` function, as in the following example:

.. code-block:: javascript

   start({
      serviceName: '<service-name>',
      profiling: true,
      tracing: {
         // configuration passed to tracing signal
      },
   });

.. note:: For more information on AlwaysOn Profiling, see :ref:`profiling-intro`.

.. _metrics-configuration-nodejs:

Metrics configuration
===============================================================

The following settings activate runtime metrics collection:

.. raw:: html

    <div class="instrumentation" section="settings" group="category" filter="metrics" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-js/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "instrumented_components": "Components", "signals": "Signals", "env": "Environment variable", "default": "Default", "type": "Type", "property": "Argument to start()"}'></div>

.. note:: To pass settings as arguments, use the ``start()`` function.

Configuring an existing metrics client to send custom metrics
---------------------------------------------------------------------

You can use an existing SignalFx client for sending custom metrics instead of creating and configuring a new one.

To configure an existing client, pass the following data to the ``start()`` function:

- ``signalfx``: A JavaScript object with optional ``client`` and ``dimensions`` fields. The ``dimensions`` object adds a predefined dimension for each data point. The format for ``dimensions`` is ``{key: value, ...}``.

The following is a list of dimensions added by default:

- ``service``: See ``serviceName`` in :ref:`trace-configuration-nodejs`.
- ``metric_source``: ``splunk-otel-js``
- ``node_version``: ``process.versions.node``, for example ``16.10.0``

.. _server-trace-information-nodejs:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, activate Splunk trace response headers by setting the following environment variable:

.. tabs::

   .. code-tab:: shell Linux

      export SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true

When you set this environment variable, your application instrumentation adds the following response headers to HTTP responses.

.. code-block::

   Access-Control-Expose-Headers: Server-Timing
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.
