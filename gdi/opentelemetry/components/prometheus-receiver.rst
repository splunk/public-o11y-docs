.. _prometheus-receiver:

*********************************************************************
Prometheus Receiver
*********************************************************************

.. meta::
      :description: Use the Prometheus Receiver to collect metric data in the Prometheus format in Splunk Cloud Observability.

The Prometheus Receiver collects metric data in the Prometheus format. The supported pipeline type is metrics.

The Prometheus Receiver is added to your configuration :new-page:`by default < https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/agent_config.yaml#L73>`. Do not remove this receiver from your configuration, as the internal metrics that are scraped power the Splunk Distribution of OpenTelemetry Collector default dashboard. See :ref:`dashboard-basics` for more information on the types of dashboards and dashboard groups available in Splunk Observability Cloud. 

.. caution::
   The Prometheus receiver is currently in :new-page:`beta <https://github.com/open-telemetry/opentelemetry-collector#beta>`. The following limitations should be considered before using this receiver:

   * The Splunk Distribution of OpenTelemetry Collector cannot autoscale scraping when multiple replicas of the Collector are run.
   * When running multiple replicas of the Collector with the same configuration, this receiver scrapes the targets multiple times.
   * If you need to configure each replica with different scraping configurations, then manually shard the scraping.
   * The Prometheus Receiver is a stateful component, which means that it keeps track of changing data.

Benefits 
=====================================

The benefits of using the Prometheus Receiver are described in this section.

Familiarity with the Prometheus scrape configuration
---------------------------------------------------------

The Prometheus Receiver uses the Prometheus source code, which includes a configuration system for scraping metrics data from any application that exposes a Prometheus format metrics endpoint. See :ref:`scrape-configuration` for more information.

Mapping Prometheus metrics to the corresponding OpenTelemetry metrics
------------------------------------------------------------------------

The Prometheus Receiver can map Prometheus metrics to OpenTelemetry's proto-based metrics. The Prometheus Receiver maintains the original metric name, value, timestamp, as well as tags. 

The Prometheus Receiver does not need to provide a one-to-one mapping, since supported metric types are different from the two systems, but it does not drop data.

Parity between Prometheus and the OpenTelemetry Prometheus exporter
-------------------------------------------------------------------------

Prometheus can also be used as an exporter that it can expose the metrics it scrapes from other systems with its own metrics endpoint. The Prometheus Receiver retains parity from the following two setups:

* Application > Prometheus > Metric endpoint
* Application > Splunk Distribution of OpenTelemetry Collector (configured with the Prometheus Receiver and the Prometheus exporter) > metrics endpoint

Unsupported features
=====================================

The Prometheus Receiver is meant to be a drop-in replacement for Prometheus to scrape your services. However, there are advanced features of Prometheus that are not supported, and do return an error if the Receiver's configuration contains any of the following options:

* ``alert_config.alertmanagers``
* ``alert_config.relabel_configs``
* ``remote_read``
* ``remote_write``
* ``rule_files``

Configuration
========================

The Prometheus Receiver supports the full :ref:`scrape-configuration`, including service discovery.

Do the following:

1. Include the receiver in your configuration file. See :ref:`scrape-configuration` for an example.
2. Run the following command to start Prometheus using your configuration file. In this example, the configuration file is named ``prom.yaml``.
    
    .. code-block:: yaml

      prometheus --config.file=prom.yaml

.. note::
   Since the configuration supports environment variable substitution, the ``$`` characters in your Prometheus configuration are interpreted as environment variables. If you want to use ``$`` characters in your Prometheus configuration, you must escape them using ``$$``.

Configuration options
--------------------------------

The following table shows the configuration options:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://github.com/splunk/collector-config-tools/raw/main/cfg-metadata/receiver/prometheus.yaml"></div>

.. _scrape-configuration:

Scrape configuration
------------------------------------

The ``scrape_config`` section of your configuration file can specify a set of targets and parameters describing how to scrape them. For basic configurations, one scrape configuration specifies a single job. 

Targets may be statically configured by using the ``static_configs`` parameter or dynamically discovered using one of the supported service-discovery mechanisms.

Additionally, the ``relabel_configs`` parameter allows advanced modifications to any target and its labels before scraping.

The following is an example of a basic scrape configuration:

.. code-block:: yaml

   receivers:
    prometheus/internal:
      config:
        scrape_configs:
        # The job name assigned to scraped metrics by default.
        # <job_name> must be unique across all scrape configurations.
        - job_name: 'otel-collector'
          # How frequently to scrape targets from this job. 
          # The acceptable values are <duration> | default = <global_config.scrape_interval> ]
          scrape_interval: 10s
          # List of labeled statically configured targets for this job.
          static_configs:
          - targets: ['0.0.0.0:8888']
          # List of metric relabel configurations.
          metric_relabel_configs:
            - source_labels: [ __name__ ]
              regex: '.*grpc_io.*'
              action: drop

See the :new-page:`scrape configuration in GitHub <https://github.com/prometheus/prometheus/blob/v2.28.1/docs/configuration/configuration.md#scrape_config>` for advanced configuration examples.

Get help
=======================

.. include:: /_includes/troubleshooting-components.rst
