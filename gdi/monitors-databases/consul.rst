.. _consul:

Consul datastore
================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Consul datastore monitor. See benefits, install, configuration, and metrics

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
Consul datastore monitor type to monitor Consul datastores and collect
metrics from the following endpoints:

-  /agent/self.
-  /agent/metrics.
-  /catalog/nodes.
-  /catalog/node/:node.
-  /status/leader.
-  /status/peers.
-  /coordinate/datacenters.
-  /coordinate/nodes.
-  /health/state/any.

This integration is only available on Kubernetes and Linux.

This integration works with Consul 0.7.0 and higher.

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
     smartagent/consul:
       type: collectd/consul
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/consul]

Configuration options
~~~~~~~~~~~~~~~~~~~~~

If you are running a version of Consul earlier than 0.9.1, configure
each Consul agent you want to monitor to send metrics to the
OpenTelemetry Collector. To do so, add the following configuration to
each Consul agent configuration file:

.. code-block:: yaml

   {"telemetry":
      {"statsd_address": "<agent host>:<agent port, default 8125>"}
   }

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this
integration:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``pythonBinary``
      - no
      - ``string``
      - Path to a python binary that should be used to execute the
         Python code. If not set, a built-in runtime will be used. Can
         include arguments to the binary as well.
   - 

      - ``host``
      - **yes**
      - ``string``
      - 
   - 

      - ``port``
      - **yes**
      - ``integer``
      - 
   - 

      - ``aclToken``
      - no
      - ``string``
      - Consul ACL token
   - 

      - ``useHTTPS``
      - no
      - ``bool``
      - Set to ``true`` to connect to Consul using HTTPS. You can figure
         the certificate for the server with the ``caCertificate``
         config option. (**default:** ``false``)
   - 

      - ``telemetryServer``
      - no
      - ``bool``
      - (**default:** ``false``)
   - 

      - ``telemetryHost``
      - no
      - ``string``
      - IP address or DNS to which Consul is configured to send
         telemetry UDP packets. Relevant only if ``telemetryServer`` is
         set to ``true``. (**default:** ``0.0.0.0``)
   - 

      - ``telemetryPort``
      - no
      - ``integer``
      - Port to which Consul is configured to send telemetry UDP
         packets. Relevant only if ``telemetryServer`` is set to
         ``true``. (**default:** ``8125``)
   - 

      - ``enhancedMetrics``
      - no
      - ``bool``
      - Set to ``true`` to activate the collection all metrics from
         Consul runtime telemetry send using UDP or from the
         ``/agent/metrics`` endpoint. (**default:** ``false``)
   - 

      - ``caCertificate``
      - no
      - ``string``
      - If Consul server has HTTPS activated for the API, specifies the
         path to the CA Certificate.
   - 

      - ``clientCertificate``
      - no
      - ``string``
      - If client-side authentication is activated, specifies the path
         to the certificate file.
   - 

      - ``clientKey``
      - no
      - ``string``
      - If client-side authentication is activated, specifies the path
         to the key file.
   - 

      - ``signalFxAccessToken``
      - no
      - ``string``
      - 

Metrics
-------

These metrics are available for this integration.

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/consul/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
