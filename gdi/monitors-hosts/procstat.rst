.. _procstat:

procstat
========

.. meta::
   :description: Use this Splunk Observability Cloud integration for the procstat monitor. See benefits, install, configuration, and metrics

.. caution:: Smart Agent monitors are being deprecated. To collect metrics about processes use the OpenTelemetry Collector and the :new-page:`Telegraf Procstat Input plugin <https://github.com/influxdata/telegraf/tree/master/plugins/inputs/procstat>`. See how in :ref:`telegraf-generic`.

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the
``procstat`` monitor type to collect metrics about processes.

This integration is available for Kubernetes, Linux, and Windows.

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

   <div class="include-start" id="collector-installation.rst"></div>

.. include:: /_includes/collector-installation.rst

.. raw:: html

   <div class="include-stop" id="collector-installation.rst"></div>




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
     smartagent/procstat:
       type: telegraf/procstat
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/procstat]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for the procstat
monitor:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``exe``
      - No
      - ``string``
      - Name of an executable to monitor. For example,
         ``exe: "signalfx-agent*"``.
   - 

      - ``pattern``
      - No
      - ``string``
      - Regular expression pattern to match against.
   - 

      - ``user``
      - No
      - ``string``
      - Username to match against.
   - 

      - ``pidFile``
      - No
      - ``string``
      - Path to pid file to monitor. For example,
         ``pidFile: "/var/run/signalfx-agent.pid"``.
   - 

      - ``processName``
      - No
      - ``string``
      - Use to override the process name dimension.
   - 

      - ``prefix``
      - No
      - ``string``
      - Prefix to add to each dimension.
   - 

      - ``pidTag``
      - No
      - ``bool``
      - Whether to add PID as a dimension or as part of the metric name.
         The default value is ``false``.
   - 

      - ``cmdLineTag``
      - No
      - ``bool``
      - When ``true``, it adds the full ``cmdline`` as a dimension. The
         default value is ``false``.
   - 

      - ``cGroup``
      - No
      - ``string``
      - The name of the cgroup to monitor. This cgroup name is appended
         to the configured ``sysPath``. See the agent config schema for
         more information about the ``sysPath`` agent configuration.
   - 

      - ``WinService``
      - No
      - ``string``
      - The name of a Windows service to report procstat information on.

On Linux hosts, this monitor relies on the ``/proc`` file system. If the
underlying host's ``/proc`` file system is mounted somewhere other than
``/proc``, specify the path using the top-level configuration
``procPath``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/telegraf/monitors/procstat/metadata.yaml"></div>


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



