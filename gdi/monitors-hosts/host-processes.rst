.. _processes:

Host processes
==============

.. meta::
   :description: Use this Splunk Observability Cloud integration for the processes monitor. See benefits, install, configuration, and metrics

.. note:: If you're using the Splunk Distribution of OpenTelemetry Collector and want to collect metrics about processes running on a host, use the native OTel component :ref:`host-metrics-receiver`.

Configuration settings
----------------------

The following table shows the configuration options for the host process
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

      - ``processes``
      - no
      - ``list of strings``
      - A list of process names to match.
   - 

      - ``processMatch``
      - no
      - ``map of strings``
      - A map with keys specifying the ``plugin_instance`` value to send
         for regex values that match process names. See the example
         configuration.
   - 

      - ``collectContextSwitch``
      - no
      - ``bool``
      - Collects metrics on the number of context switches made by the
         process. The default value is ``false``.
   - 

      - ``procFSPath``
      - no
      - ``string``
      - (Deprecated) Set the agent configuration ``procPath`` instead of
         this monitor configuration option. This option is useful for
         overriding the path to the ``proc`` file system if the agent is
         running in a container.

Metrics
-------

Metrics produced by this receiver count towards the custom metric
ingestion limit. See
:ref:`System limits for Splunk Infrastructure Monitoring <sys-limits>`

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/process/metadata.yaml"></div>


Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
