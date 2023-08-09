.. _send-custom-metrics:

**************************************************
Send custom metrics to Splunk Observability Cloud
**************************************************

.. meta::
   :description: You can send custom metrics to Splunk Observability Cloud, for example to instrument a service that isn't supported yet.

You can send custom infrastructure and application metrics to Splunk Observability Cloud, for example to instrument a service that isn't supported yet. To send custom metrics, follow these instructions.

.. _custom-infra-metrics:

Send custom infrastructure or service metrics
==============================================

Splunk Observability Cloud can ingest custom infrastructure or service metrics through existing OpenTelemetry components from OpenTelemetry contrib or through custom components that adhere to OpenTelemetry semantic conventions. For a list of supported metric types, see :ref:`metric-types`.

To send custom application metrics to Splunk Observability Cloud, follow these steps.

Add a receiver for custom metrics
------------------------------------------

To send custom metrics through the Splunk Distribution of the OpenTelemetry Collector, define a receiver in your Collector configuration that is ready to accept the data. See :ref:`otel-components` for a list of available receivers.

The following example shows a custom Prometheus receiver that scrapes a live endpoint on port 8889 every 10 seconds:

.. code-block:: yaml

  prometheus/custom:
    config:
      scrape_configs:
        - job_name: 'otel-collector-custom'
          scrape_interval: 10s
          static_configs:
            - targets: [ '0.0.0.0:8889' ]

Make sure that the new receiver is the ``metrics`` pipeline of the configuration:

.. code-block:: yaml

    metrics:
      receivers: [ prometheus/custom, otlp, ... ]
      processors: [ memory_limiter, batch, resourcedetection ]
      exporters: [ signalfx ]

See :ref:`prometheus-receiver` for more information.

Add the required dependencies
--------------------------------------------------

To send custom infrastructure or service metrics from the code of your application, or from a script that queries a service at regular intervals, add the required dependencies, including OpenTelemetry packages. 

The following example shows dependencies for a Python script that send metrics every time it's run by ``cron``:

.. code-block:: python

   from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import (
      OTLPMetricExporter,
   )
   from opentelemetry.metrics import (
      CallbackOptions,
      Observation,
      get_meter_provider,
      set_meter_provider,
   )
   from opentelemetry.sdk.metrics import MeterProvider
   from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader

The requirements.txt file for the example contains the following:

.. code-block:: text

   opentelemetry-api==1.12.0
   opentelemetry-sdk==1.12.0
   opentelemetry-proto==1.12.0
   opentelemetry-exporter-otlp-proto-grpc==1.12.0

Send custom metrics to the Collector
----------------------------------------

Configure your code to create counters, gauges, and other metric data types and send them using the OTLP metric exporter. This Python example shows how to define an exporter, reader, and provider for OpenTelemetry:

.. code-block:: python

   exporter = OTLPMetricExporter(endpoint='<collector_ip_address>:4317', headers=None, insecure=True)
   reader = PeriodicExportingMetricReader(exporter)
   provider = MeterProvider(metric_readers=[reader])
   set_meter_provider(provider)

See the example.py file in GitHub for a full example: :new-page:`https://github.com/open-telemetry/opentelemetry-python/blob/main/docs/examples/metrics/instruments/example.py`.

To send metrics bypassing the Collector, use the Ingest REST API endpoints. See :new-page:`Send Metrics and Events <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-otlp-metrics>`.

.. _custom-app-metrics:

Send custom application metrics
========================================

Splunk Observability Cloud can ingest custom application metrics created following OpenTelemetry semantic conventions and upstream OpenTelemetry API and SDK. For a list of supported metric types, see :ref:`metric-types`.

To send custom application metrics to Splunk Observability Cloud, follow these steps:

1. Install the APM instrumentation for your application's language. See :ref:`get-started-application`.

2. Activate the metric exporter of the instrumentation:

   - :ref:`Java <enable_automatic_metric_collection>`
   - :ref:`Node.js <metrics-configuration-nodejs>`
   - .NET metric collection is on by default. 
   - Go metric collection is on by default. 
   
   If you've activated AlwaysOn Profiling, metric collection is turned on by default for all languages that support profiling.

3. Make sure that the metric you want to create isn't already collected using a built-in metric:

   - :ref:`java-otel-metrics-attributes`
   - :ref:`nodejs-otel-metrics`
   - :ref:`dotnet-otel-metrics-attributes`
   - :ref:`go-otel-metrics`

4. Create custom metrics following the instructions for each language:

   - :ref:`Java <java-otel-custom-metrics>`
   - :ref:`Node.js <nodejs-otel-custom-metrics>`
   - :ref:`.NET (OpenTelemetry) <custom-metrics-otel-dotnet>`
   - :ref:`Go <custom-metrics-go>`
