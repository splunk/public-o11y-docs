.. _amazon-ecs-metadata:

Amazon ECS Task Metadata endpoint
=================================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the ECS metadata monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of OpenTelemetry Collector uses the Smart Agent receiver with the
``ecs-metadata`` monitor type to read metadata and Docker stats from
Amazon ECS Task Metadata Endpoint version 2. This integration does not
currently support CPU share and quota metrics.

This integration is only available on Kubernetes and Linux.

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation-linux.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

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

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
