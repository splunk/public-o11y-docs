.. _histograms-gdi:

***********************************************************
Get histogram data into Splunk Observability Cloud
***********************************************************

.. meta::
   :description: You can collect histogram data using a variety of receivers, including the Prometheus receiver, and send them to Splunk Observability Cloud using the OpenTelemetry Collector.

You can collect histogram data using a variety of receivers, including the Prometheus receiver, and send them to Splunk Observability Cloud using the OpenTelemetry Collector. See :ref:`Prometheus receiver <prometheus-receiver>`.

The Splunk Distribution of OpenTelemetry Collector supports explicit bucket histogram metrics. You can send histogram metric using the OTLP exporter or, starting from version 0.94, through the SignalFx exporter.

.. include:: /_includes/gdi/histograms.rst


Send histogram data using the API
===========================================================

If you need to bypass the OpenTelemetry Collector, send histogram data directly to Splunk Observability Cloud using the ``/v2/datapoint/otlp`` endpoint of the ingest API. The endpoint accepts data in OTLP format, serialized as Protobuf.

To learn how to send histogram metric data using the API, see :new-page:`/datapoint/otlp <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-otlp-metrics>` in the Splunk Developer Portal.


.. _migrate-histograms:

Migrate your dashboards, functions, charts, and detectors
===========================================================

To migrate your existing dashboards, functions, charts, and detectors to histograms, follow these steps:

1. Make sure that you're sending histogram data using the Splunk Distribution of OpenTelemetry Collector version 0.94 or higher. Lower versions can't send histogram data in OTLP format using the SignalFx exporter.

2. Start sending histogram metrics through the OTLP exporter or the SignalFx exporter. See :ref:`enable-histograms-export` for more information on how to activate this feature in the Collector.

3. Edit your charts to use the new ``histogram()`` function. See :new-page:`histogram() <https://dev.splunk.com/observability/docs/signalflow/functions/histogram_function/>` in the SignalFlow reference documentation.


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst