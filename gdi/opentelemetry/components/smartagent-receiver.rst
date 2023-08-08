.. _smartagent-receiver:

*************************
Smart Agent receiver
*************************

.. meta::
      :description: The Smart Agent receiver lets you use Smart Agent monitors in the Splunk Distribution of OpenTelemetry Collector.

The Smart Agent receiver is a native OTel component that lets you use Smart Agent monitors through the Splunk Distribution of OpenTelemetry Collector. Supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

The Smart Agent receiver is fully supported only on amd64 linux platforms. Support for ARM64 is experimental starting from the Splunk Distribution of OpenTelemetry Collector version 0.73 and higher. For a list of supported monitors, see :ref:`collector-architecture`.

.. note:: For instructions on how to migrate from the Smart Agent to the Splunk Distribution of OpenTelemetry Collector, see :ref:`migrate-from-sa-to-otel`.

Benefits
=================================

The Smart Agent receiver lets you use Smart Agent monitors through the OpenTelemetry Collector. In most cases, you can move your existing Smart Agent monitor configuration to the configuration file of the Collector without changes.

For a list of monitor data sources, see :ref:`monitor-data-sources`.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the Smart Agent receiver with the ``signalfx-forwarder`` and ``processlist`` monitors when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information.

For each Smart Agent monitor you want to add to the Collector, add a Smart Agent receiver. After you've configured a Smart Agent monitor in the Collector, each Smart Agent receiver behaves like the corresponding Smart Agent monitor. 

Sample configurations
--------------------------------------------

The following example adds the Postgresql monitor to the Collector using the Smart Agent receiver:

.. code-block:: yaml

   receivers:
     smartagent/postgresql:
       type: postgresql
       host: mypostgresinstance
       port: 5432
       dimensionClients:
         - signalfx # Instructs the receiver to use this exporter for dimension updates

You can then add the receiver to any compatible pipeline. For example:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers:
           - smartagent/postgresql
         exporters:
           - signalfx

If you use a monitor that updates dimension properties or tags, for example ``postgresql``, add the name of your SignalFx exporter in the ``dimensionClients`` field in Smart Agent receiver configuration block. If you don't set any exporter in the ``dimensionClients`` field, the receiver tries to use the pipeline to which it's connected. If you don't require dimension updates, you can use an empty array (``[]``) to deactivate it.

.. caution:: Don't remove the ``smartagent/signalfx-forwarder`` and ``smartagent/processlist`` receivers from the configuration. System processes and Smart Agent telemetry depend on both receivers's configurations.

.. _otel-sareceiver-extrametrics:

Add additional metrics
--------------------------------------------

To ingest additional metrics using Smart Agent monitors, add the ``extraMetrics`` field to the monitor configuration. For example:

.. code-block:: yaml

   receivers:
     smartagent/postgresql:
       type: postgresql
       host: mypostgresinstance
       port: 5432
       extraMetrics:
         - actual-name-0 # Add metrics to be ingested
         - actual-name-1 

Settings
======================

To configure Smart Agent monitors, see the documentation on each monitor type in :ref:`monitor-data-sources`.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst