.. _amazon-ecs-metadata:

Amazon ECS Task Metadata endpoint (deprecated)
==================================================================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the ECS metadata monitor. See benefits, install, configuration, and metrics

.. caution:: This integration is deprecated. If you're using the Splunk Distribution of the OpenTelemetry Collector and want to monitor task metadata and docker stats from Amazon ECS use the native OpenTelemetry component :ref:`awsecscontainermetrics-receiver` instead.

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the ``ecs-metadata`` monitor type to read metadata and Docker stats from Amazon ECS Task Metadata Endpoint version 2. This integration does not currently support CPU share and quota metrics.

This integration is only available on Kubernetes and Linux.

Benefits
--------



.. raw:: html

   <div class="include-start" id="benefits.rst"></div>

.. include:: /_includes/benefits.rst

.. raw:: html

   <div class="include-stop" id="benefits.rst"></div>




Installation
------------



.. raw:: html

   <div class="include-start" id="collector-installation-linux.rst"></div>

.. include:: /_includes/collector-installation-linux.rst

.. raw:: html

   <div class="include-stop" id="collector-installation-linux.rst"></div>




Configuration
-------------



.. raw:: html

   <div class="include-start" id="configuration.rst"></div>

.. include:: /_includes/configuration.rst

.. raw:: html

   <div class="include-stop" id="configuration.rst"></div>




Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/ecs-metadata:
       type: ecs-metadata
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/ecs-metadata]

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/ecs/metadata.yaml"></div>


Notes
~~~~~



.. raw:: html

   <div class="include-start" id="metric-defs.rst"></div>

.. include:: /_includes/metric-defs.rst

.. raw:: html

   <div class="include-stop" id="metric-defs.rst"></div>




Troubleshooting
---------------



.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



