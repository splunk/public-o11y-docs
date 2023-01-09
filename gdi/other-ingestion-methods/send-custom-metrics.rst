.. _send-custom-metrics:

**************************************************
Send custom metrics to Splunk Observability Cloud
**************************************************

.. meta::
   :description: You can send custom metrics to Splunk Observability Cloud, for example to instrument a service that isn't supported yet.

You can send custom metrics to Splunk Observability Cloud, for example to instrument a service that isn't supported yet. To send custom metrics, follow these instructions.

Add a receiver for custom metrics
========================================

To send custom metrics through the Splunk Distribution of the OpenTelemetry Collector, define a receiver in your Collector configuration that is ready to accept the data.

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

Add the required dependencies
======================================

To send custom metrics from the code of your application, or from a script that queries a service at regular intervals, add the required dependencies, including OpenTelemetry packages. 

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

The ``requirements.txt`` file for the example contains the following:

.. code-block:: text

   opentelemetry-api==1.12.0
   opentelemetry-sdk==1.12.0
   opentelemetry-proto==1.12.0
   opentelemetry-exporter-otlp-proto-grpc==1.12.0

Send custom metrics
======================================

Configure your code to create counters, gauges, and other metric data types and send them using the OTLP metric exporter. This Python example shows how to define an exporter, reader, and provider for OpenTelemetry:

.. code-block:: python

   exporter = OTLPMetricExporter(endpoint='<collector_ip_address>:4317', headers=None, insecure=True)
   reader = PeriodicExportingMetricReader(exporter)
   provider = MeterProvider(metric_readers=[reader])
   set_meter_provider(provider)

See the ``example.py`` file in GitHub for a full example: :new-page:`https://github.com/open-telemetry/opentelemetry-python/blob/main/docs/examples/metrics/instruments/example.py`.

Send custom metrics without the Collector
-------------------------------------------

To send metrics bypassing the Collector, use the Ingest REST API endpoints. See :new-page:`Send Metrics and Events <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-otlp-metrics>`.