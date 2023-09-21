.. _memory-limiter-processor:

************************************
Memory limiter processor
************************************

.. meta::
      :description: The Memory limiter processor prevents out of memory situations on the Splunk Distribution of OpenTelemetry Collector.

The Memory limiter processor prevents out of memory situations on the Splunk Distribution of OpenTelemetry Collector. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``memory_limiter`` processor as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the resource processor, add ``groupbyattrs`` to the ``processors`` section of your configuration file, as shown in the following example:

The configuration is very simple, as you only need to specify an array of attribute keys that will be used to "group" spans, log records or metric data points together, as in the below example:

.. code-block:: yaml




Advanced configuration examples 
--------------------------------------------



Group metrics by host
^^^^^^^^^^^^^^^^^^^^^^^^^^

Consider the below metrics, all originally associated to the same resource:

.. code-block:: yaml



.. _memory-limiter-processor-settings:

Settings
======================

The following table shows the configuration options for the ``groupbyattrs`` processor:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/memory_limiter.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
