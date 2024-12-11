.. _cadvisor:

cAdvisor
========

.. meta::
   :description: Use this Splunk Observability Cloud integration for the cAdvisor monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of OpenTelemetry Collector uses the Smart Agent receiver with the
cAdvisor monitor type to pull metrics directly from cAdvisor. By
default, it runs on port 4194, but it can be configured to any other
port.

If you are using Kubernetes, consider the
:ref:`kubelet-stats-receiver` because many Kubernetes nodes do not
expose cAdvisor on a network port, even though they are running it
within Kubelet.

If you are running containers with Docker, retrieved metrics might
overlap with ``docker-container-stats``\ '. Consider not enabling the
Docker monitor in a Kubernetes environment, or else use filtering to
allow only certain metrics. This will cause the built-in Docker
dashboards to be blank, but container metrics will be available on the
Kubernetes dashboards instead.

This integration is available on Kubernetes, Linux, and Windows.

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

.. code:: yaml

   receivers:
     smartagent/cadvisor: 
       type: cadvisor
       ... # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/cadvisor]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this receiver:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``cadvisor URL``
      - no
      - ``string``
      - Where to find cAdvisor. The default value is:
         ``http://localhost:4194``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/cadvisor/metadata.yaml"></div>

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



