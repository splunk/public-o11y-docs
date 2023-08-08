.. _otel-configuration-ootb:

****************************************************************
Collector default configuration
****************************************************************

.. meta::
      :description: Configure the Splunk Distribution of OpenTelemetry Collector. There are a variety of default configuration files available, as well additional components that can be configured.

The Collector configuration is stored in a :new-page:`YAML file <https://yaml.org/>` that specifies the characteristics and behavior of the following elements:

* :ref:`Extensions <collector-components-extensions>`: Extend the capabilities of the Collector.
* :ref:`Receivers <collector-components-receivers>`: Determine how you'll get data into the Collector.
* :ref:`Processors <collector-components-processors>`: Configure which operations you'll perform on data before it's exported. For example, filtering.
* :ref:`Exporters <collector-components-exporters>`: Set up where to send data to. It can be one or more backends or destinations. 
* Services. It consists of two elements:

  * List of the :ref:`extensions <collector-components-extensions>` you've configured.

  * :ref:`Pipelines <otel-data-processing>`: Path data will follow from reception, then through processing or modification, and finally exiting through exporters. 

See an overview of the elements and pipelines in the default configuration in the following sections.

Default configuration 
========================================================

This is the default configuration file for the Linux (Debian/RPM) and Windows Installer collector packages:

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/cmd/otelcol/config/collector/agent_config.yaml

Default pipelines
========================================================

By default, ingested data follows these pipelines.

Default pipelines for logs 
----------------------------------------------------------------------------

The following diagram shows the default logs pipeline:

.. image:: /_images/collector/pipeline-logs.png
  :alt: Default logs pipeline.  

Learn more about these receivers:

* :ref:`signalfx-receiver`
* :ref:`processlist`
* :ref:`fluentd-receiver`

Learn more about these processors:

* :ref:`batch-processor`
* :ref:`resourcedetection-processor`

Learn more about these exporters:

* :ref:`signalfx-exporter`
* :ref:`splunk-hec-exporter`


Default pipelines for metrics 
----------------------------------------------------------------------------

The following diagram shows the default metrics pipeline:

.. image:: /_images/collector/pipeline-metrics.png
  :alt: Default metrics pipeline.  

Learn more about these receivers:

* :ref:`host-metrics-receiver`
* :ref:`signalfx-receiver`
* :ref:`signalfx-forwarder`
* :ref:`prometheus-receiver`

Learn more about these processors:

* :ref:`batch-processor`
* :ref:`resourcedetection-processor`

Learn more about these exporters:

* :ref:`signalfx-exporter`

Default pipelines for traces 
----------------------------------------------------------------------------

The following diagram shows the default traces pipeline:

.. image:: /_images/collector/pipeline-traces.png
  :alt: Default traces pipeline.  

Learn more about these receivers:

* :ref:`jaeger-grpc`
* :ref:`signalfx-forwarder`

Learn more about these processors:

* :ref:`batch-processor`
* :ref:`resourcedetection-processor`

Learn more about these exporters:

* :ref:`splunk-apm-exporter`
* :ref:`signalfx-exporter`

Learn more
========================================================

See also the following documents:

* :ref:`otel-collector-scenario`
* :ref:`otel-install-platform` 
* :ref:`Troubleshooting <otel-troubleshooting>`
