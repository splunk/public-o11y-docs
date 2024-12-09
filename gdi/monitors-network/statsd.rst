.. _statsd:

Statsd (deprecated)
======================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Statsd monitor. See benefits, install, configuration, and metrics

.. caution:: 
   
   This integration is deprecated and will be removed in a future release. During this period only critical security and bug fixes are provided. When End of Support is reached, the monitor will be removed and no longer be supported, and you won't be able to use it to send data to Splunk Observability Cloud. 

   To forward statsd metrics to Splunk Observability Cloud use the :ref:`statsd-receiver` instead. 

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the ``statsd`` monitor type to collect statsd metrics. It listens on a configured address and port to receive the statsd metrics.

This integration supports certain Stats types, which are dispatched as ``counter`` or ``gauges`` types in Splunk Observability Cloud, as displayed in the table. Statsd extensions such as tags are not supported.

.. list-table::
   :widths: 50 50
   :width: 100%
   :header-rows: 1

   - 

      - Statsd type
      - Splunk Observability Cloud type

   - 

      - ``Counter``
      - ``counter``

   - 

      -  ``Timer``
      - ``counter``

   - 

      - ``Gauge``
      - ``gauge``

   - 

      - ``Set``
      - ``gauge``

This integration is available for Kubernetes and Linux.

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




Verify the installation
~~~~~~~~~~~~~~~~~~~~~~~

To verify the installation, send statsd metrics locally with ``netcat``
as follows, then verify in Splunk Observability Cloud that the metric
arrived:

.. code-block:: yaml

   $ echo "statsd.test:1|g" | nc -w 1 -u 127.0.0.1 8125

For Kubernetes environments, use the ``status.hostIP`` environment
variable to verify the installation. This environment variable is the IP
address of the node where the pod is running.

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
     smartagent/statsd:
       type: statsd
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/statsd]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for the ``statsd``
monitor:

.. list-table::
   :widths: 6 3 12 50
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``listenAddress``
      - No
      - ``string``
      - The host or address on which to bind the UDP listener that
         accepts statsd datagrams. The default value is ``localhost``.
   - 

      - ``listenPort``
      - No
      - ``integer``
      - The port on which to listen for statsd messages. The default
         value is ``8125``.
   - 

      - ``metricPrefix``
      - No
      - ``string``
      - A prefix in metric names that needs to be removed before metric
         name conversion.
   - 

      - ``converters``
      - No
      - ``list of objects (see below)``
      - A list converters to convert statsd metric names into SignalFx
         metric names and dimensions.

The nested ``converters`` configuration object has the following fields:

.. list-table::
   :widths: 8 6 6 52
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``pattern``
      - No
      - ``string``
      - A pattern to match against statsd metric names.
   - 

      - ``metricName``
      - No
      - ``string``
      - A format to compose a metric name to report to Splunk
         Splunk Observability Cloud.

Metrics
-------

By default this monitor has no fixed metrics. Instead, it will create metrics based on your configuration. 

All metrics are custom. See the section below to learn how metrics can be collected with this
monitor.

Add dimensions to statsd metrics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The statsd monitor can parse keywords from a statsd metric name by a set
of converters configured by a user, as shown in the following example:

.. code:: yaml

   converters:
     - pattern: "cluster.cds_{traffic}_{mesh}_{service}-vn_{}.{action}"
       ...

This converter parses ``traffic``, ``mesh``, ``service``, and ``action``
as dimensions from the
``cluster.cds_egress_ecommerce-demo-mesh_gateway-vn_tcp_8080.update_success``
metric. If a section has only a pair of brackets without a name, it does
not capture a dimension.

When multiple converters are provided, a metric is converted by the
first converter with a matching pattern to the metric name.

Format metric names
~~~~~~~~~~~~~~~~~~~

You can customize a metric name by providing a format string within the
converter configuration, as shown in the following example:

.. code:: yaml

   converters:
     - pattern: "cluster.cds_{traffic}_{mesh}_{service}-vn_{}.{action}"
       metricName: "{traffic}.{action}"

The metrics that match to the given pattern are reported to
Infrastructure Monitoring as ``{traffic}.{action}``. For instance,
metric
``cluster.cds_egress_ecommerce-demo-mesh_gateway-vn_tcp_8080.update_success``
is reported as ``egress.update_success``.

``metricName`` is required for a converter configuration. A converter is
deactivated if ``metricName`` is not provided.

Data points get a ``host`` dimension of the current host that the agent
is running on, not the host from which the statsd metric was sent. For
this reason, send statsd metrics to a local agent instance. If you don't
want the ``host`` dimension, you can set ``disableHostDimensions: true``
on the monitor configuration.

Troubleshooting
---------------



.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



