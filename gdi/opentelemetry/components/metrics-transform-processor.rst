.. _metrics-transform-processor:

***********************************
Metrics transform processor
***********************************

.. meta::
      :description: Renames metrics, and adds, renames, or deletes label keys and values.

The Splunk Distribution of the OpenTelemetry Collector supports the Metrics transform processor. Documentation is planned for a future release.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``metrics_transform`` processor as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the resource processor, add ``metrics_transform`` to the ``processors`` section of your configuration file. 

See the following example:

.. code-block:: yaml

  processors:
    metrics_transform:
      check_interval: 1s

To complete the configuration, include the processor in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code-block:: yaml

  service:
    pipelines:
      metrics:
        processors: [metrics_transform]

.. _metrics-transform-processor-config-options:

Configuration options
----------------------------------

The processor has the following configuration options:



.. _metrics-transform-processor-settings:

Settings
======================

The following table shows the configuration options for the ``memory_limiter`` processor:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/metricstransform.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst


