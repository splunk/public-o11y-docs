.. _windowsperfcounters-receiver:

**************************************
Windows Performance Counters receiver
**************************************

.. meta::
      :description: The Windows Performance Counters receiver allows the Splunk Distribution of OpenTelemetry Collector to collect system, application, or custom performance counter data from the Windows Registry.

The Windows Performance Counters receiver allows the Splunk Distribution of OpenTelemetry Collector to collect configured system, application, or custom performance counter data from the Windows Registry. The supported pipeline types are ``metrics``. See :ref:`otel-data-processing` for more information.

Configured metrics consist of a metric description, including unit and type, used by one or more performance counters scraped by the receiver. If a specific performance counter can't be accessed at startup, the receiver emits a warning and continues execution.

The Windows Performance Counters receiver replaces the SmartAgent monitor type of the same name. See :ref:`telegraf-win-perf-counters` for information on the monitor type.

.. note:: The Windows Performance Counters receiver only works on Windows hosts.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Windows Performance Counters receiver as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the Windows Performance Counters receiver add a ``windowsperfcounters`` entry inside the ``receivers`` section of the Collector configuration file. For example:

.. code-block:: yaml

   receivers:
     windowsperfcounters:
       metrics:
         bytes.committed:
           description: the number of bytes committed to memory
           unit: By
           gauge:
       collection_interval: 30s
       perfcounters:
       - object: Memory
         counters:
           - name: Committed Bytes
             metric: bytes.committed

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your
configuration file. For example:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers:
           - windowsperfcounters

To collect metrics from Windows performance counters, you need to define metrics using the ``metrics`` field as in the example. You can then reference the metrics you defined from the ``counters.metric`` fields. 

Metrics can be of type ``sum`` or ``gauge``. Sum metrics support the ``aggregation`` and ``monotonic`` fields.


Scrape at different collection intervals
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to scrape performance counters using different collection intervals depending on the target:

.. code-block:: yaml

   receivers:
     windowsperfcounters/memory:
       metrics:
         bytes.committed:
           description: Number of bytes committed to memory
           unit: By
           gauge:
       collection_interval: 30s
         perfcounters:
           - object: Memory
             counters:
               - name: Committed Bytes
                 metric: bytes.committed

     windowsperfcounters/processor:
       collection_interval: 1m
         metrics:
           processor.time:
           description: CPU active and idle time
           unit: "%"
           gauge:
       perfcounters:
         - object: "Processor"
           instances: "*"
           counters:
             - name: "% Processor Time"
               metric: processor.time
               attributes:
                 state: active
         - object: "Processor"
           instances: [1, 2]
           counters:
             - name: "% Idle Time"
               metric: processor.time
               attributes:
                 state: idle

     # ...

   service:
     pipelines:
       metrics:
         receivers: [windowsperfcounters/memory, windowsperfcounters/processor]

Instances configuration
---------------------------------

An instance is any entity that produces performance data. Instances can have one or more counter values.

The receiver supports the following values through the ``instances`` field:

.. list-table::
   :header-rows: 1
   :widths: 40, 60
   :width: 100%

   * - Value
     - Interpretation
   * - ``"*"``
     - All instances
   * - ``"_Total"``
     - The total instance
   * - ``"instance1"``
     - Single instance
   * - ``["instance1", "instance2", ...]``
     - Set of instances
   * - ``["_Total", "instance1", "instance2", ...]``
     - Set of instances including the total instance

Known limitations
---------------------------------

Metrics from the Network Interface object aren't generated when running the Collector inside a container. This is caused by the network interface not being available inside the container. Network Interface metrics are captured for subprocesses.

Settings
======================

The following table shows the configuration options for the Windows Performance Counters receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/windowsperfcounters.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
