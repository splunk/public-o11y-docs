.. _metrics-generation-processor:

***********************************
Metrics generation processor
***********************************

.. meta::
      :description: Creates new metrics using existing metrics following a given rule.

The Splunk Distribution of the OpenTelemetry Collector uses the Metrics transform processor to creates new metrics using existing metrics following a given rule.




Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``metricsgeneration`` processor as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------------------

To activate the resource processor, add ``metricsgeneration`` to the ``processors`` section of your configuration file. 

For example:

.. code-block:: yaml

  processors:
    metricsgeneration:

To complete the configuration, include the processor in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code-block:: yaml

  service:
    pipelines:
      metrics:
        processors: [metricsgeneration]

.. _metrics-generation-processor-config-example:

Configuration example
----------------------------------


.. _metrics-generation-processor-settings:

Settings
======================

The following table shows the configuration options for the ``metricstransform`` processor:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/metricstransform.yaml"></div>

Troubleshooting
======================



.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>





