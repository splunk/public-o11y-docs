.. _solr:

SolrCloud
=========

.. meta::
   :description: Use this Splunk Observability Cloud integration for the SolrCloud monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of OpenTelemetry Collector uses the Smart Agent receiver with the
SolrCloud monitor type to monitor Solr instances. You can collect
metrics only when the instance is running in SolrCloud mode.

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
     smartagent/solr:
       type: collectd/solr
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/solr]

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

      - ``pythonBinary``
      - No
      - ``string``
      - Path to the Python binary. If not set, a built-in runtime is
         used. Can include arguments to the binary.
   - 

      - ``host``
      - Yes
      - ``string``
      - Host or address of the Solr instance. For example,
         ``127.0.0.1``.
   - 

      - ``port``
      - Yes
      - ``integer``
      - Port of the Solr instance.
   - 

      - ``cluster``
      - No
      - ``string``
      - Name of the Solr cluster.
   - 

      - ``enhancedMetrics``
      - No
      - ``bool``
      - Whether stats from the ``/metrics`` endpoint are needed. The
         default value is\ ``false``.
   - 

      - ``includeMetrics``
      - No
      - ``list of strings``
      - List of metric names from the ``/admin/metrics`` endpoint to
         include. Valid when ``EnhancedMetrics`` is “false”.
   - 

      - ``excludeMetrics``
      - No
      - ``list of strings``
      - List of metric names from the ``/admin/metrics`` endpoint to
         exclude. Valid when ``EnhancedMetrics`` is “true”.

Metrics
-------

These metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/solr/metadata.yaml"></div>


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



