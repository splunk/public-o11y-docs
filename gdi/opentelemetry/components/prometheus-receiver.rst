.. _prometheus-receiver:

*******************************************
Prometheus receiver
*******************************************

.. meta::
      :description: The Prometheus receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from any scraping source compatible with the Prometheus format.

The Prometheus receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from any source exposing telemetry in Prometheus format. The supported pipeline type is ``metrics``.

.. note:: To use a simplified version of the Prometheus receiver that supports single endpoints, see :ref:`simple-prometheus-receiver`.

Benefits
=================================

The Prometheus receiver can scrape metrics data from any application that exposes a Prometheus endpoint. The receiver converts Prometheus metrics to OpenTelemetry metrics while preserving metric names, values, timestamps, and labels. You can also reuse your existing Prometheus configurations.

Get started
========================

By default, the Splunk Distribution of OpenTelemetry Collector includes the Prometheus receiver in the ``metrics/internal`` pipeline when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information.

To activate additional Prometheus receivers, add a new ``prometheus`` entry in the ``receivers`` section of the Collector configuration file, as in the following example:

.. code-block:: yaml

   receivers:
     prometheus:
       config:
         scrape_configs:
           - job_name: 'sample-name'
             scrape_interval: 5s
             static_configs:
               - targets: ['0.0.0.0:8888']

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers:
           - prometheus

.. caution:: Don't remove the ``prometheus/internal`` receiver from the configuration. Internal metrics feed the Splunk Distribution of OpenTelemetry Collector default dashboard.

Scraper configuration
----------------------------------

The Prometheus Receiver supports the most of the scrape configuration of Prometheus, including service discovery, through the ``config.scrape_configs`` section. In the ``scrape_config`` section of your configuration file you can specify a set of targets and parameters that describe how to scrape them. 

For basic configurations, a single scrape configuration specifies a single job. You can configure static targets using the ``static_configs`` parameter. Dynamically discovered targets use service discovery mechanisms of Prometheus. In addition, the ``relabel_configs`` parameter allows advanced modifications to any target and its labels before scraping.

The following is an example of a basic scrape configuration:

.. code-block:: yaml

   receivers:
     prometheus:
       config:
         scrape_configs:
         # The job name assigned to scraped metrics by default.
         # <job_name> must be unique across all scrape configurations.
           - job_name: 'otel-collector'
           # How frequently to scrape targets from this job. 
           # The acceptable values are <duration> | default = <global_config.scrape_interval> ]
             scrape_interval: 5s
           # List of labeled statically configured targets for this job.
             static_configs:
               - targets: ['0.0.0.0:8888']
           - job_name: k8s
           # Scraping configuration for Kubernetes 
             kubernetes_sd_configs:
             - role: pod
             relabel_configs:
             - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
               regex: "true"
               action: keep
             # List of metric relabel configurations.
             metric_relabel_configs:
             - source_labels: [__name__]
               regex: "(request_duration_seconds.*|response_duration_seconds.*)"
               action: keep

To use environment variables in the Prometheus receiver configuration, use the ``${<var>}`` syntax. For example:

.. code-block:: yaml

   prometheus:
     config:
       scrape_configs:
         - job_name: ${JOBNAME}
           scrape_interval: 5s

If you're using existing Prometheus configurations, replace ``$`` with ``$$`` to prevent the Collector from reading them as environment variables.

Scaling considerations
-------------------------------

When running multiple replicas of the Collector with the same configuration, the Prometheus receiver scrapes targets multiple times. If you need to configure each replica with different scraping configurations, shard the scraping. The Prometheus receiver is stateful. For considerations on scaling, see :ref:`otel-sizing`.

Known limitations
---------------------------------

The following Prometheus features are not supported and return an error if used in the receiver configuration:

* ``alert_config.alertmanagers``
* ``alert_config.relabel_configs``
* ``remote_read``
* ``remote_write``
* ``rule_files``

Settings
======================

The following table shows the configuration options for the Prometheus receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/prometheus.yaml"></div>

Metrics
=====================

The Prometheus receiver converts Prometheus metrics to OpenTelemetry metrics following these conversion rules:

.. list-table::
   :width: 100%
   :widths: 50 50
   :header-rows: 1

   * - Prometheus metric type
     - OpenTelemetry metric type
   * - Counter (monotonic)
     - Sum (data type ``double``)
   * - Gauge |br| Unknown
     - Gauge (data type ``double``)
   * - Histogram
     - Histogram (cumulative distribution)
   * - Summary
     - Summary (percentiles)

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst