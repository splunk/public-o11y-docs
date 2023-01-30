.. _other-data-ingestion-methods:

****************************
Other data ingestion methods
****************************

.. meta::
   :description: Alternative ways of getting / sending custom metric data into Splunk Observability Cloud.

If your needs are not covered with OpenTelemetry instrumentation, you can still send data to Splunk Observability Cloud using the following alternative methods.

Send data using the REST API
=====================================

Observability Cloud supports an extensive REST API that lets you send data points and events. This is useful when you need to bypass the Collector. See an example in :ref:`rest-api-ingest`.

Send custom metrics
======================================

You can send custom metrics to Observability Cloud, for example to instrument a service that isn't supported yet. To create and send custom metrics, see :ref:`send-custom-metrics`.

Send traces using the gRPC endpoint
============================================

You can send trace data in OTLP format directly to Observability Cloud using the gRPC endpoint, either directly or from an OpenTelemetry Collector. See :ref:`grpc-data-ingest`.

Send metrics using client libraries
============================================

To send metrics from your code to Observability Cloud, you can use several client libraries for Java, Python, Ruby, Go, and Node.js. See :new-page:`SignalFlow client libraries <https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/#SignalFlow-client-libraries>` for more information.

Use the upstream OpenTelemetry Collector
==================================================

You can use the upstream OpenTelemetry Collector instead of the Splunk Distribution of OpenTelemetry Collector. For more information on the differences between the Splunk distribution and the upstream version, see :ref:`using-upstream-otel`.

.. caution::

   Splunk only provides best-effort support for the upstream OpenTelemetry Collector. Only Splunk OpenTelemetry distributions are in scope for official Splunk support and support-related service-level agreements (SLAs).
   
.. toctree::
   :maxdepth: 3
   :hidden:

   rest-APIs-for-datapoints
   send-custom-metrics
   grpc-data-ingest
   set-host-name-attribute-override
