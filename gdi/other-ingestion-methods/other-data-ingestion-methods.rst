.. _other-data-ingestion-methods:

****************************
Other data ingestion methods
****************************

.. meta::
   :description: Alternative ways of getting and sending custom metric data into Splunk Observability Cloud.

If your needs are not covered by Splunk distributions of OpenTelemetry, you can still send data to Splunk Observability Cloud using the following methods.

.. toctree::
   :maxdepth: 3

   upstream-collector
   Send data using REST APIs <rest-APIs-for-datapoints>
   send-custom-metrics
   grpc-data-ingest
   set-host-name-attribute-override

.. raw:: html

  <embed>
    <h2>Use the OpenTelemetry Collector Contrib (upstream)</h2>
  </embed>

You can use the OpenTelemetry Collector Contrib instead of the Splunk Distribution of OpenTelemetry Collector. See :ref:`using-upstream-otel` for installation instructions and information about the differences between the upstream Collector and the Splunk distribution.

.. caution::

   Splunk only provides best-effort support for OpenTelemetry Collector Contrib. Only Splunk OpenTelemetry distributions are in scope for official Splunk support and support-related service-level agreements (SLAs).

.. raw:: html

  <embed>
    <h2>Send data using the REST APIs</h2>
  </embed>

Splunk Observability Cloud supports an extensive set of REST APIs that lets you send data points and events. This is useful when you need to bypass the Collector. See an example in :ref:`rest-api-ingest`.

.. raw:: html

  <embed>
    <h2>Send custom metrics</h2>
  </embed>

You can send custom metrics to Splunk Observability Cloud, for example to instrument a service that isn't supported yet. To create and send custom metrics, see :ref:`send-custom-metrics`.

.. raw:: html

  <embed>
    <h2>Send traces using the gRPC endpoint</h2>
  </embed>

You can send trace data in OTLP format directly to Splunk Observability Cloud using the gRPC endpoint, either directly or from an OpenTelemetry Collector. See :ref:`grpc-data-ingest`.

.. raw:: html

  <embed>
    <h2>Send metrics using client libraries</h2>
  </embed>

To send metrics from your code to Splunk Observability Cloud, you can use several client libraries for Java, Python, Ruby, Go, and Node.js. See :new-page:`SignalFlow client libraries <https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/#SignalFlow-client-libraries>` for more information.

