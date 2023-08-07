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

You can use the Prometheus receiver to connect any service that can export their existing data as Prometheus metrics. See a complete list of third-party applications compatible with Prometheus in :new-page:`Prometheus' official documentation <https://prometheus.io/docs/instrumenting/exporters/>`.

Configure the Prometheus receiver to scrape metrics from a third-party app
==================================================================================

Let's take, as an example, :new-page:`Apache Flink <https://github.com/apache/flink>`, which processes data streams at a large scale and analyzes your app's processed data real-time.

To scrape Flink's data as Prometheus metrics with the Collector:

1. Configure Flink to expose data as Prometheus metrics. See :new-page:`Apache's official documentation to learn how <https://nightlies.apache.org/flink/flink-docs-release-1.13/docs/deployment/metric_reporters/#prometheus>`.
2. Edit the configuration file to enable the Prometheus endpoint to expose metrics on port ``9249``.
3. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

4. Configure the :ref:`prometheus-receiver` as described in the next section.
5. Restart the Collector.

Sample configurations
----------------------

Configure the Prometheus receiver with Apache Flink:

.. code:: yaml

   prometheus/flink:
      config:
         scrape_configs:
            - job_name: 'apache-flink'
            scrape_interval: 10s
            static_configs:
               - targets: ['0.0.0.0:9249']

Next, enable the ``metrics`` pipeline:

.. code:: yaml

   Enabled the pipeline:
      metrics:
         receivers: [hostmetrics, otlp, signalfx, smartagent/signalfx-forwarder, prometheus/flink]

Settings
======================

The following table shows the configuration options for the Prometheus receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/prometheus.yaml"></div>


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst