.. _simple-prometheus-receiver:

*******************************************
Simple Prometheus receiver
*******************************************

.. meta::
      :description: The Simple Prometheus receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from a single source compatible with the Prometheus format.

The Simple Prometheus is a wrapper around the Prometheus receiver that allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from a single source of telemetry in Prometheus format. The supported pipeline type is ``metrics``.

To scrape Prometheus metrics from multiple targets that require extensive configuration, use the Prometheus receiver. See :ref:`prometheus-receiver` for more information.

Benefits
=================================

The Simple Prometheus receiver requires less configuration than the Prometheus receiver. You can define settings for a single Prometheus endpoint without having to use a Prometheus configuration. The receiver converts Prometheus metrics to OpenTelemetry metrics while preserving metric names, values, timestamps, and labels.

Get started
========================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Simple Prometheus receiver as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate additional Prometheus receivers, add a new ``prometheus_simple`` entry in the ``receivers`` section of the Collector configuration file, as in the following example:

.. code-block:: yaml

   receivers:
     prometheus:
      receivers:
        prometheus_simple/endpointname:
        collection_interval: 10s
        use_service_account: true
        endpoint: "172.17.0.5:9153"
        tls:
          ca_file: "/path/to/ca"
          cert_file: "/path/to/cert"
          key_file: "/path/to/key"
          insecure_skip_verify: true

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers:
           - prometheus_simple/endpointname

.. caution:: Don't remove the ``prometheus/internal`` receiver from the configuration. Internal metrics feed the Splunk Distribution of OpenTelemetry Collector default dashboard.

Settings
======================

The following table shows the configuration options for the Prometheus receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/prometheus_simple.yaml"></div>

Metrics
=====================

The Simple Prometheus receiver converts Prometheus metrics to OpenTelemetry metrics following these conversion rules:

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
