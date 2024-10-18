.. _appmesh:

AWS AppMesh Envoy Proxy
=======================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the AWS AppMesh Envoy Proxy monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of OpenTelemetry Collector uses the Smart Agent receiver with the
AppMesh monitor type to report metrics from AWS AppMesh Envoy Proxy.

To use this integration, you must also activate the Envoy StatsD sink on
AppMesh and deploy the agent as a sidecar in the services that need to
be monitored.

This integration is available on Kubernetes, Linux, and Windows.

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/appmesh:
       type: appmesh
         ... # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/appmesh]

.. _aws-appmesh-envoy-proxy-1:

AWS AppMesh Envoy Proxy
~~~~~~~~~~~~~~~~~~~~~~~

To configure the AWS AppMesh Envoy Proxy, add the following lines to
your configuration of the Envoy StatsD sink on AppMesh:

.. code:: yaml

   stats_sinks:
    -
     name: "envoy.statsd"
     config:
      address:
       socket_address:
        address: "127.0.0.1"
        port_value: 8125
        protocol: "UDP"
      prefix: statsd.appmesh

Because you need to remove the prefix in metric names before metric name
conversion, set value of the ``prefix`` field with the value of the
``metricPrefix`` configuration field described in the following table.
This change causes the monitor to remove this specified prefix. If you
don't specify a value for the ``prefix`` field, it defaults to
``envoy``.

To learn more, see the Envoy API reference.

The following table shows the configuration options for this monitor:

.. list-table::
   :widths: 8 5 5 53
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``listenAddress``
      - no
      - ``string``
      - This host address binds the UDP listener that accepts statsd
         datagrams. The default value is ``localhost``.
   - 

      - ``listenPort``
      - no
      - ``integer``
      - This value indicates the port on which to listen for statsd
         messages. The default value is ``8125``.
   - 

      - ``metricPrefix``
      - no
      - ``string``
      - This string sets the prefix in metric names that the monitor
         removes before metric name conversion

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/appmesh/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
