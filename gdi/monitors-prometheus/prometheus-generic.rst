.. _prometheus-generic:

*************************************************************
Configure applications with Prometheus metrics
*************************************************************

.. meta::
      :description: Use the Prometheus receiver to retrieve metrics in Prometheus format from any compatible service. 

The Prometheus receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from any source exposing telemetry in Prometheus format. See more at :ref:`prometheus-receiver`.

Benefits
========================

By default, the Splunk Distribution of OpenTelemetry Collector includes the Prometheus receiver in the ``metrics/internal`` pipeline when deployed in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information.

This receiver and pipeline enable the collection of the Collector's internal metrics, such as data loss, ingress, egress, that power the built-in Collector dashboard. 

Scrape any service that emits metrics in Prometheus format
------------------------------------------------------------------

You can also use the Prometheus receiver to connect Splunk Observability Cloud with any service that can export their existing data as Prometheus metrics. See a complete list of third-party applications compatible with Prometheus in Prometheus' official documentation at :new-page:`Prometheus exporters <https://prometheus.io/docs/instrumenting/exporters/>`.

Configure the Prometheus receiver to scrape metrics from a third-party app: Apache Flink 
============================================================================================

This example steps through how to scrape data from Apache Flink, which processes data streams at a large scale and analyzes your app's processed data real-time, as Prometheus metrics with the Collector. Learn more about :new-page:`Apache Flink <https://github.com/apache/flink>`. 

.. caution:: Metrics collected using this configuration are custom metrics: they're not supported by built-in content, and charges might apply. See more at :ref:`metrics-landing`. 

To scrape Flink's data as Prometheus metrics with the Collector:

1. Configure Flink to expose data as Prometheus metrics. 

   Flink uses port ``9249`` by default. If necessary, edit the Flink configuration file to enable the Prometheus endpoint to expose metrics there. See :new-page:`Apache's official documentation to learn how <https://nightlies.apache.org/flink/flink-docs-release-1.13/docs/deployment/metric_reporters/#prometheus>`.

2. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

3. Configure the Prometheus receiver as described in the Sample configurations section.
4. (Optional) Limit data ingest. 

   These services have massive cardinality and might generate thousands of MTS per instance. To reduce the amount of data to ingest, see :ref:`configure-remove`.

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

Next, activate the ``metrics`` pipeline:

.. code:: yaml

   metrics:
      receivers: [hostmetrics, otlp, signalfx, prometheus/flink]

Settings
======================

The following table shows the configuration options for the Prometheus receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/prometheus.yaml"></div>

Next steps
======================

You can now see your Apache Flink metrics in Splunk Observability Cloud.

.. image:: /_images/gdi/gdi-prometheus-flink.png 
   :width: 80%
   :alt: This image shows Apache Flink data in Splunk Observability Cloud.  

* Use the metric finder to find, view, and edit Flink metrics. See how at :ref:`metrics-finder-and-metadata-catalog`.
* Create custom dashboards to visualize metrics. Learn how at :ref:`dashboard-create-customize`.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst