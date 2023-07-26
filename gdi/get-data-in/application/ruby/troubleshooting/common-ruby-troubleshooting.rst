.. _common-ruby-troubleshooting:

******************************************************************
Troubleshoot Ruby instrumentation for Splunk Observability Cloud
******************************************************************

.. meta::
   :description: If your instrumented Ruby application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify the issue and solve it.

When you instrument a Ruby application using the Splunk Distribution of OpenTelemetry Ruby and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _basic-ruby-troubleshooting:

Steps for troubleshooting Ruby OpenTelemetry issues
=======================================================

The following steps can help you troubleshoot Ruby instrumentation issues:

#. :ref:`enable-ruby-debug-logging`.

.. _enable-ruby-debug-logging:

Activate debug logging
==========================================================

Debug logging increases the verbosity of the Ruby instrumentation. This can help you troubleshoot issues. To activate debug logging, set the ``OTEL_LOG_LEVEL`` environment variable to ``debug``.

.. code-block:: shell

   export OTEL_LOG_LEVEL="debug"

Make sure to unset the environment variable after the issue is resolved, as its output might overload systems if left on indefinitely.

.. _ruby-trace-exporter-issues:

Trace exporter issues
=====================================================

By default, the :ref:`Splunk Distribution of OpenTelemetry Ruby <splunk-ruby-otel-dist>` uses the OTLP exporter. Any issue affecting the export of traces produces an error in the debug logs.

OTLP can't export spans
-----------------------------------------------------

To troubleshoot the lack of connectivity between the OTLP exporter and the OTel Collector, try the following:

#. Make sure that ``OTEL_EXPORTER_OTLP_ENDPOINT`` points to the correct OpenTelemetry Collector instance host.
#. Check that your collector instance is configured and running. See :ref:`otel-troubleshooting`.
#. Check that the OTLP receiver is activated in the OTel Collector and plugged into the traces pipeline.
#. Check that the OTel Collector points to the following address: ``http://<host>:4318``. Verify that your URL is correct.

401 error when sending spans
--------------------------------------------------------

If you send traces directly to Splunk Observability Cloud and receive a 401 error code, the authentication token specified in ``SPLUNK_ACCESS_TOKEN`` is invalid. The following are possible reasons:

- The value is null.
- The value is not a well-formed token.
- The token is not an access token that has ``authScope`` set to ingest.

Make sure that you're using a valid Splunk access token when sending data directly to your Splunk platform instance. See :ref:`admin-api-access-tokens`.

.. include:: /_includes/troubleshooting-steps.rst