.. _common-python-troubleshooting:

******************************************************************
Troubleshoot Python instrumentation for Splunk Observability Cloud
******************************************************************

.. meta::
   :description: If your instrumented Python application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a Python application using the Splunk Distribution of OpenTelemetry Python and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _basic-python-troubleshooting:

Steps for troubleshooting Python OpenTelemetry issues
=======================================================

The following steps can help you troubleshoot Python agent issues:

#. :ref:`check-python-path`
#. :ref:`enable-python-debug-logging`

.. _check-python-path:

Check that your pip install directory is in PATH
------------------------------------------------------

To run ``splunk-py-trace`` and ``splunk-py-trace-bootstrap``, the install directory of ``pip`` must be on your system's ``PATH`` environment variable. 

If ``pip`` installs packages into your user local environment, add the user base ``bin`` directory to ``PATH``. 

#. Find out your Python user base by running ``python -m site --user-base``.

#. Add the user base directory to your path:

   .. code-block:: shell

      export PATH="<user-base-path>:$PATH"

.. _enable-python-debug-logging:

Activate debug logging
-------------------------------------------------------

Activating debug logging can help you troubleshoot Python instrumentation issues. 

To activate logging, import the ``logging`` module and configure the logging level to ``DEBUG``:

.. code-block:: python

   import logging

   logging.basicConfig(level=logging.DEBUG)

When you run the agent with debug logging activated, debug information is sent to the console (stderr). Debug log entries look like the following example:

.. code-block:: bash

   ...
   [opentelemetry.auto.trace 2021-10-10 10:57:05:814 +0200] [main] DEBUG io.opencensus.tags.Tags - <Could not load lite implementation for TagsComponent, now using default implementation for TagsComponent.3>
   [opentelemetry.auto.trace 2021-10-10 10:57:05:722 +0200] [main] DEBUG io.grpc.netty.shaded.io.netty.util.internal.PlatformDependent0 - direct buffer constructor: unavailable
   ...

While not all debug entries might be relevant to the issue affecting your Python instrumentation, the root cause is likely to appear in your debug log.

.. note:: Activate debug logging only when needed. Debug mode requires more resources.

.. _python-trace-exporter-issues:

Trace exporter issues
=====================================================

By default, the Splunk Distribution of OpenTelemetry Python uses the OTLP exporter. Any issue affecting the export of traces produces an error in the debug logs.

OTLP can't export spans
-----------------------------------------------------

The following error in the logs means that the agent can't send trace data to the OpenTelemetry Collector:

.. code-block:: bash

   DEBUG:opentelemetry.exporter.otlp.proto.grpc.exporter:Waiting 1s before retrying export of span
   DEBUG:opentelemetry.exporter.otlp.proto.grpc.exporter:Waiting 2s before retrying export of span

To troubleshoot the lack of connectivity between the OTLP exporter and the OTel Collector, try the following:

#. Make sure that ``OTEL_EXPORTER_OTLP_ENDPOINT`` points to the correct OpenTelemetry Collector instance host.
#. Check that your OTel Collector instance is configured and running. See :ref:`otel-splunk-collector-tshoot`.
#. Check that the OTLP gRPC receiver is activated in the OTel Collector and plugged into the traces pipeline.
#. Check that the OTel Collector points to the following address: ``http://<host>:4317``. Verify that your URL is correct.

Channel pipeline error
-------------------------------------------------------------------

If you're seeing the following error in your logs, it might mean that the Python agent is trying to send trace data to the Splunk Observability Cloud ingest endpoint, which is not yet supported by OTLP:

.. code-block:: bash

   E0908 16:23:32.337704280    5881 ssl_transport_security.cc:1468] Handshake failed with fatal error SSL_ERROR_SSL: error:10000095:SSL routines:OPENSSL_internal:ERROR_PARSING_EXTENSION.
   E0908 16:23:32.556405854    5881 ssl_transport_security.cc:1468] Handshake failed with fatal error SSL_ERROR_SSL: error:10000095:SSL routines:OPENSSL_internal:ERROR_PARSING_EXTENSION.

To solve this issue, use the Jaeger exporter instead. See :ref:`trace-exporters-settings-python`.

Jaeger can't export spans
------------------------------------------------------

If you're exporting trace data using the Jaeger exporter, errors in your logs might mean the Python agent can't send trace data to the OTel Collector, Smart Agent (now deprecated), or Splunk Cloud Platform:

To troubleshoot the lack of connectivity between Jaeger and Splunk Observability Cloud, try the following:

1. Make sure that ``OTEL_EXPORTER_JAEGER_ENDPOINT`` points to a OpenTelemetry Collector or your Collector or Smart Agent (deprecated) configuration instance, or to the Splunk Ingest URL. See the Splunk Ingest URL summary in :new-page:`Summary of Splunk Observability Cloud API Endpoints <https://dev.splunk.com/observability/docs/apibasics/api_list>`.
2. Check that the OTel Collector or Smart Agent instance is configured and running.
3. Check that the Jaeger Thrift HTTP receiver is activated and plugged into the traces pipeline. See :ref:`otel-exposed-endpoints`.
4. Check that the endpoint is correct. The OpenTelemetry Collector and Smart Agent use different ports and paths by default. For the Jaeger receiver, the OTel Collector uses ``http://<host>:14268/api/traces``, while the Smart Agent uses ``http://<host>:9080/v1/trace``.

401 error when sending spans
--------------------------------------------------------

If you send traces directly to Splunk Observability Cloud and receive a 401 error code, the authentication token specified in ``SPLUNK_ACCESS_TOKEN`` is invalid. The following are possible reasons:

- The value is null.
- The value is not a well-formed token.
- The token is not an access token that has ``authScope`` set to ingest.

Make sure that you're using a valid Splunk access token when sending data directly to your Splunk platform instance. See :ref:`admin-api-access-tokens`.

.. include:: /_includes/troubleshooting-steps.rst
