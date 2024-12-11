.. _collectd-systemd:

systemd
=======

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Collectd Systemd monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the ``collectd/systemd`` monitor type to collect metrics about the state of configured systemd services.

This integration is available on Kubernetes and Linux.

Benefits
--------



.. raw:: html

   <div class="include-start" id="benefits.rst"></div>

.. include:: /_includes/benefits.rst

.. raw:: html

   <div class="include-stop" id="benefits.rst"></div>




Requirements
------------

This integration reads the status of systemd services from
``/var/run/dbus/system_bus_socket``. You must mount the host location to
the container in which the Collector or the Smart Agent is running. The
agent container must also run in privileged mode. The following example
shows an excerpt of the ``docker run`` command:

.. code:: yaml

   docker run ...\
     --privileged \
     -v /var/run/dbus/system_bus_socket:/var/run/dbus/system_bus_socket:ro \
   ...

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
     smartagent/systemd:
       type: collectd/systemd
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/systemd]

Advanced examples
~~~~~~~~~~~~~~~~~

The following is an excerpt of a YAML configuration for monitoring the
state of ``docker`` and ``ubuntu-fan`` services:

.. code:: yaml

   receivers:
     smartagent/systemd:
       type: collectd/systemd
       intervalSeconds: 10
       services:
         - docker
         - ubuntu-fan

By default, the ``gauge.substate.running`` metrics, which indicates
whether a service is running or not, is the only metric reported.
Configure additional metrics using the ``sendActiveState``,
``sendSubState``, and ``sendLoadState`` configuration flags, as shown in
the following example:

.. code:: yaml

   receivers:
     smartagent/systemd:
       type: collectd/systemd
       intervalSeconds: 10
       services:
         - docker
         - ubuntu-fan
       sendActiveState: true

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this monitor:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``services``
      - Yes
      - ``list of strings``
      - Services to report on.
   - 

      - ``sendActiveState``
      - No
      - ``bool``
      - Flag for sending metrics about the state of systemd services.
         The default value is ``false``.
   - 

      - ``sendSubState``
      - No
      - ``bool``
      - Flag for sending more detailed metrics about the state of
         systemd services. The default value is ``false``.
   - 

      - ``sendLoadState``
      - No
      - ``bool``
      - Flag for sending metrics about the load state of systemd
         services. The default value is ``false``.

A service is in the state that a metric represents if the metric value
is ``1`` and not in that state if the metric value is ``0``. The
integration assigns the name of monitored services to the
``systemd_service`` dimension.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/systemd/metadata.yaml"></div>


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



