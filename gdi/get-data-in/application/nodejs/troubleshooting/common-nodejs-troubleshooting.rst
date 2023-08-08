.. _common-nodejs-troubleshooting:

*******************************************************************
Troubleshoot Node.js instrumentation for Splunk Observability Cloud
*******************************************************************

.. meta::
   :description: If your instrumented Node.js application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a Node.js application using the Splunk Distribution of OpenTelemetry JS and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _basic-nodejs-troubleshooting:

Steps for troubleshooting Node.js OpenTelemetry issues
=======================================================

The following steps can help you troubleshoot Node.js instrumentation issues:

#. :ref:`enable-nodejs-debug-logging`
#. :ref:`enable-debug-metrics`

.. _enable-nodejs-debug-logging:

Activate diagnostic logging
-------------------------------------------------------

Diagnostic logs can help you troubleshoot instrumentation issues.

To output instrumentation logs to the console, set the ``OTEL_LOG_LEVEL`` environment variable to ``debug``. 

You can also activate debug logging programmatically by setting the ``logLevel`` argument. For example:

.. code-block:: js
   :emphasize-lines: 2
   
   start({
      logLevel: 'debug',
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

To deactivate debug logging in your code, call ``setLogger()`` as in the following example:

.. code-block:: js

   const { diag } = require('@opentelemetry/api');
   diag.setLogger();

.. note:: Activate debug logging only when needed. Debug mode requires more resources.

.. _enable-debug-metrics:

Activate debug metrics
---------------------------------

You can activate internal debug metrics by setting the ``SPLUNK_DEBUG_METRICS_ENABLED`` environment variable to true. For more information, see :ref:`nodejs-otel-debug-metrics`.

.. _nodejs-trace-exporter-issues:

Trace exporter issues
=====================================================

By default, the :ref:`Splunk Distribution of OpenTelemetry JS <splunk-nodejs-otel-dist>` uses the OTLP exporter. Any issue affecting the export of traces produces an error in the debug logs.

OTLP can't export spans
-----------------------------------------------------

The following error in the logs means that the instrumentation can't send trace data to the OpenTelemetry Collector:

.. code-block::

   @opentelemetry/instrumentation-http http.ClientRequest return request
   {"stack":"Error: connect ECONNREFUSED 127.0.0.1:55681\n    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1148:16)\n    at TCPConnectWrap.callbackTrampoline (internal/async_hooks.js:131:17)","message":"connect ECONNREFUSED 127.0.0.1:55681","errno":"-111","code":"ECONNREFUSED","syscall":"connect","address":"127.0.0.1","port":"55681","name":"Error"}

To troubleshoot the lack of connectivity between the OTLP exporter and the OTel Collector, make sure that the following is true:

#. Make sure that ``OTEL_EXPORTER_OTLP_ENDPOINT`` points to the correct OpenTelemetry Collector instance host.
#. Check that your collector instance is configured and running. See :ref:`otel-splunk-collector-tshoot`.
#. Check that the OTLP receiver is activated in the OTel Collector and plugged into the traces pipeline.
#. Check that the OTel Collector points to the following address: ``http://<host>:4317``. Verify that your URL is correct.

401 error when sending spans
--------------------------------------------------------

If you send traces directly to Splunk Observability Cloud and receive a 401 error code, the authentication token specified in ``SPLUNK_ACCESS_TOKEN`` is invalid. The following are possible reasons:

- The value is null.
- The value is not a well-formed token.
- The token is not an access token that has ``authScope`` set to ingest.

Make sure that you're using a valid Splunk access token when sending data directly to your Splunk platform instance. See :ref:`admin-api-access-tokens`.

.. _nodejs-webpack-issues:

Webpack compatibility issues
=====================================================

The Splunk Distribution of OpenTelemetry JS can't instrument modules bundled using Webpack, as OpenTelemetry can instrument libraries only by intercepting its ``require`` calls.

To instrument Node applications that use bundled modules, use the Webpack ``externals`` configuration option so that the ``require`` calls are visible to OpenTelemetry.

The following example shows how to edit the ``webpack.config.js`` file to instrument the ``express`` framework:

.. code-block:: javascript

   module.exports = {
      // ...
      externalsType: "node-commonjs",
      externals: [
         "express"
      // See https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node
      // for a list of supported instrumentations. Use the require name of the library or framework,
      // not the name of the instrumentation. For example, "tedious" instead of "instrumentation-tedious".
      ]
   };

When added to ``externals``, the ``express`` framework loads through the ``require`` method and OpenTelemetry can instrument it. Make sure that the package is in the ``node_modules`` folder so that the ``require`` method can find it:

.. code-block:: shell

   # Install the library or framework and add it to node_modules
   npm install express

.. note:: You don't need to add Node.js core modules such as ``http``, ``net``, and ``dns`` to the ``externals`` list.

.. _nodejs-profiler-issues:

Troubleshoot AlwaysOn Profiling for Node.js
===============================================================

See the following common issues and fixes for AlwaysOn Profiling:

Check that AlwaysOn Profiling is activated
----------------------------------------------------------------

Make sure that you've activated the profiler by setting the ``SPLUNK_PROFILER_ENABLED`` environment variable to ``true``. See :ref:`profiling-configuration-nodejs`.

Unsupported Node version
-----------------------------------------------

To use AlwaysOn Profiling, upgrade to Node version 16 or higher.

AlwaysOn Profiling data and logs don't appear in Splunk Observability Cloud
----------------------------------------------------------------------------

Collector configuration issues might prevent AlwaysOn Profiling data and logs from appearing in Splunk Observability Cloud.

To solve this issue, do the following:

#. Check the configuration of the Node agent, especially ``SPLUNK_PROFILER_LOGS_ENDPOINT``.
#. Verify that the Splunk Distribution of OpenTelemetry Collector is running at the expected endpoint and that the application host or container can resolve the host name and connect to the OTLP port.
#. Make sure that you're running the Splunk Distribution of OpenTelemetry Collector and that the version is 0.34 or higher. Other collector distributions might not be able to route the log data that contains profiling data.
#. A custom configuration might override settings that let the collector handle profiling data. Make sure to configure an ``otlp`` receiver and a ``splunk_hec`` exporter with correct token and endpoint fields. The ``profiling`` pipeline must use the OTLP receiver and Splunk HEC exporter you've configured.

The following snippet contains a sample ``profiling`` pipeline:

.. code-block:: yaml

   receivers:
     otlp:
       protocols:
         grpc:

   exporters:
     # Profiling
     splunk_hec/profiling:
       token: "${SPLUNK_ACCESS_TOKEN}"
       endpoint: "${SPLUNK_INGEST_URL}/v1/log"
       log_data_enabled: false

   processors:
     batch:
     memory_limiter:
       check_interval: 2s
       limit_mib: ${SPLUNK_MEMORY_LIMIT_MIB}

   service:
     pipelines:
       logs/profiling:
         receivers: [otlp]
         processors: [memory_limiter, batch]
         exporters: [splunk_hec, splunk_hec/profiling]

.. include:: /_includes/troubleshooting-steps.rst