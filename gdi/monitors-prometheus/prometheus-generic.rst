.. _prometheus-generic:

*************************************************************
Integrate with apps compatible with Prometheus
*************************************************************

.. meta::
      :description: Use the Prometheus receiver to retrieve metrics in the Prometheus format from any compatible service. 

The :ref:`prometheus-receiver` allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from any source exposing telemetry in Prometheus format. 

Benefits
========================

By default, the Splunk Distribution of OpenTelemetry Collector includes the Prometheus receiver in the ``metrics/internal`` pipeline when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information.

You can use the Prometheus receiver to connect any service that can export their existing metrics as Prometheus metrics. See a complete list of third-party applications compatible with Prometheus in :new-page:`Prometheus' official documentation <https://prometheus.io/docs/instrumenting/exporters/>`.

Configure the Prometheus receiver to scrape metrics from a third-party app
==================================================================================



Settings
======================

The following table shows the configuration options for the Prometheus receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/prometheus.yaml"></div>


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst