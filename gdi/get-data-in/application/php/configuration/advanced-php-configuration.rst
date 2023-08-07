
.. _advanced-php-configuration:

********************************************************************
Configure the PHP instrumentation for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Configure the SignalFx Tracing Library for PHP to suit most of your instrumentation needs.

The following sections describe all available settings for configuring the SignalFx Tracing Library for PHP.

.. _main-php-agent-settings:

General settings
=========================================================================

The following settings are specific to the Splunk Distribution of OpenTelemetry Python:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``SIGNALFX_SERVICE_NAME``
     - Service name in Splunk Observability Cloud. The default value is ``unnamed-php-service``.
   * - ``SIGNALFX_ENDPOINT_URL``
     - Endpoint URL. The default value is ``http://localhost:9080/v1/trace``.
   * - ``SIGNALFX_TRACING_ENABLED``
     - Whether to activate automatic tracer creation and instrumentation. The default value is ``true``.
   * - ``SIGNALFX_TRACE_CLI_ENABLED``
     - Whether to activate automatic tracer creation and instrumentation for the ``cli`` SAPI. See :ref:`tracing-cli-sessions` for more information. The default value is ``false``.
   * - ``SIGNALFX_TRACE_DEBUG``
     - Whether to activate debug logging. The default value is ``false``.
   * - ``SIGNALFX_DISTRIBUTED_TRACING``
     - Whether to activate B3 context propagation. The default value is ``true``.
   * - ``SIGNALFX_RECORDED_VALUE_MAX_LENGTH``
     - Maximum length an attribute value can have. Values longer than this are truncated.	The default value is ``1200``.
   * - ``SIGNALFX_CAPTURE_ENV_VARS``
     - List of environment variables to attach to the root span, separated by commas.
   * - ``SIGNALFX_CAPTURE_REQUEST_HEADERS``
     - Comma-separated list of incoming request headers to turn into spans. For example, ``User-Agent`` is captured as ``http.request.headers.user_agent``.
   * - ``SIGNALFX_ACCESS_TOKEN``
     - Splunk authentication token that lets the library send data directly to Splunk Observability Cloud. Unset by default. Not required unless you need to send data to the Splunk Observability Cloud ingest endpoint. See :ref:`export-directly-to-olly-cloud-php` for more information.

.. _tracing-cli-sessions:

Tracing CLI sessions
=====================================

To trace the CLI SAPI functionality, you have to activate it manually using the ``SIGNALFX_TRACE_CLI_ENABLED`` environment variable. When you activate CLI tracing, the instrumentation automatically creates a root span to track the lifetime of your CLI session.

.. code-block:: shell

   export SIGNALFX_TRACE_CLI_ENABLED=true
   php artisan migrate:fresh
   php myTracedCliScript.php

.. caution:: This SAPI is deactivated by default to avoid undesired tracing of system activity.

.. _server-trace-information-php:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data, trace response headers are activated by default. The instrumentation adds the following response headers to HTTP responses:

.. code-block::

   Access-Control-Expose-Headers: Server-Timing 
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` parameters in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.

.. note:: If you need to deactivate trace response headers, set ``SIGNALFX_TRACE_RESPONSE_HEADER_ENABLED`` to ``false`` or set the ``signalfx.trace.response_header_enabled`` option in your INI file to ``false``.