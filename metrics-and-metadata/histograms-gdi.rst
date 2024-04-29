.. _histograms-gdi:

***********************************************************
Get histogram data into Splunk Observability Cloud
***********************************************************

.. meta::
   :description: You can collect histogram data using a variety of receivers, including the Prometheus receiver, and send them to Splunk Observability Cloud using the OpenTelemetry Collector.

You can collect histogram data using a variety of receivers, including the Prometheus receiver, and send them to Splunk Observability Cloud using the OpenTelemetry Collector. See :ref:`Prometheus receiver <prometheus-receiver>`.

The Splunk Distribution of OpenTelemetry Collector supports explicit-bucket histogram metrics. You can send histogram metric using the OTLP exporter or, starting from version 0.98, through the SignalFx exporter.

.. include:: /_includes/gdi/histograms.rst

.. _bucket-histograms-best-practices:

Best practices when sending bucket histogram data
===========================================================

When sending bucket histogram data to Splunk Observability Cloud, follow these best practices:

* Send minimum and maximum values, unless you're sending cumulative data. The minimum value must be lower than the maximum value, otherwise the datapoint is dropped.

* Use less than 31 buckets when sending custom histograms. Histograms with more than 31 buckets are dropped.

* Make sure that bucket boundaries don't overlap or repeat. Order the bucket boundaries when sending them.

* Send values as signed integer, float, or numeric string in decimal or fixed-point notation. Splunk Observability Cloud stores them as 64-bit integers.

* Check that the sum of all histogram buckets is equal to the ``count`` field, and that the size of bucket boundaries is equal to the bucket count minus 1. Histograms that don't comply with these criteria are dropped.

* When sending cumulative data, for example from Prometheus, use delta aggregation temporality. See :ref:`delta-temporality` for instructions on how to configure delta temporality in your system.

.. _delta-temporality:

Considerations on delta aggregation temporality
===========================================================

Delta aggregation temporality ensures that histogram data in Splunk Observability Cloud is accurate. For example, cumulative histograms lack minimum and maximum values if delta aggregation isn't activated: this might cause a P90 percentile to fall above the maximum observed value.

To activate delta aggretation temporality in your instrumentation, set the ``OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`` environment variable to ``delta``. See the :new-page:`compliance matrix <https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables>` in the OpenTelemetry Specification repository to check SDK support for your language.


Send histogram data using the API
===========================================================

If you need to bypass the OpenTelemetry Collector, send histogram data directly to Splunk Observability Cloud using the ``/v2/datapoint/otlp`` endpoint of the ingest API. The endpoint accepts data in OTLP format, serialized as Protobuf.

To learn how to send histogram metric data using the API, see :new-page:`/datapoint/otlp <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-otlp-metrics>` in the Splunk Developer Portal.


.. _migrate-histograms:

Migrate your dashboards, functions, charts, and detectors
===========================================================

To migrate your existing dashboards, functions, charts, and detectors to histograms, follow these steps:

1. Make sure that you're sending histogram data using the Splunk Distribution of OpenTelemetry Collector version 0.98 or higher. Lower versions can't send histogram data in OTLP format using the SignalFx exporter.

2. Start sending histogram metrics through the OTLP exporter or the SignalFx exporter. See :ref:`enable-histograms-export` for more information on how to activate this feature in the Collector.

3. Edit your charts to use the new ``histogram()`` function. See :new-page:`histogram() <https://dev.splunk.com/observability/docs/signalflow/functions/histogram_function/>` in the SignalFlow reference documentation.


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst