.. _windowsperfcounters-receiver:

**************************************
Windows Performance Counters receiver
**************************************

.. meta::
      :description: The Windows Performance Counters receiver allows the Splunk Distribution of the OpenTelemetry Collector to collect system, application, or custom performance counter data from the Windows Registry.

The Windows Performance Counters receiver allows the Splunk Distribution of the OpenTelemetry Collector to collect configured system, application, or custom performance counter data from the Windows Registry. The supported pipeline types are ``metrics``. See :ref:`otel-data-processing` for more information.

Configured metrics consist of a metric description, including unit and type, used by one or more performance counters scraped by the receiver. If a specific performance counter can't be accessed at startup, the receiver emits a warning and continues execution.

The Windows Performance Counters receiver replaces the SmartAgent monitor type :ref:`telegraf-win-perf-counters`.

.. note:: The Windows Performance Counters receiver only works on Windows hosts.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Windows Performance Counters receiver as described in the next section.
3. Restart the Collector.

View available performance counters
---------------------------------------

To see a list of available performance counters, use Windows PowerShell or the Windows Performance Monitor.

.. tabs:: 
  
  .. tab:: PowerShell

    In PowerShell, run the following command to list all performance counter sets:

    .. code-block:: powershell

      Get-Counter -ListSet *

    To list the instances of each performance counter set, run the following command and replace ``<perf_object_name>`` with the name of the instances you want to find:

    .. code-block:: powershell

      Get-Counter -List "<perf_object_name>"
    
  .. tab:: Windows Performance Monitor
    
    Run the following command to open the Windows Performance Monitor:

    .. code-block:: powershell

      perfmon /sys

    In the Windows Performance Monitor, select the green plus arrow to see a list of available performance counters. 

    .. image:: /_images/gdi/windows-monitor.png
      :width: 100%
      :alt: The Add Counters screen of the Windows Performance Monitor displays a list of available Windows Performance Counters and a list of counters added to the performance monitor.

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
configuration file:

.. code-block:: yaml


   service:
     pipelines:
       metrics:
         receivers:
           - windowsperfcounters

To collect metrics from Windows performance counters, you need to define metrics using the ``metrics`` field as in the example. You can then reference the metrics you defined from the ``counters.metric`` fields.

Format metrics
======================

To report metrics in a specific format, define the metric and reference it in the corresponding counter, along with any applicable attributes. By default, the metric name corresponds to the name of the counter.

Metrics can be of type ``sum`` or ``gauge``. Sum metrics support the ``aggregation`` and ``monotonic`` fields.

.. list-table::
   :header-rows: 1
   :width: 100%

   - 

      - Field
      - Description
      - Value
      - Default
   - 

      - ``name``
      - Metric key or name. Can be any non empty string.
      - String
      - Name of the counter
   - 

      - ``description``
      - Description of the metric or measurement
      - String
      - 
   - 

      - ``unit``
      - Unit of measurement
      - String
      - ``1``
   - 

      - ``sum``
      - Representation of a sum metric
      - Sum configuration
      - 
   - 

      - ``gauge``
      - Representation of a gauge metric
      - Gauge configuration
      - 

Sum metrics
----------------------

The following settings apply to sum metrics:

.. list-table::
   :header-rows: 1

   - 

      - Field
      - Description
      - Value
      - Default
   - 

      - ``aggregation``
      - Type of aggregation temporality for the metric
      - ``cumulative`` or ``delta``
      - 
   - 

      - ``monotonic``
      - Whether the metric value can decrease
      - ``false``
      - 

Gauge metrics
----------------------

The ``gauge`` configuration doesn't accept settings. The following example emits the ``Memory/Committed Bytes`` counter as the ``bytes.committed`` metric:

.. code:: yaml

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

   service:
     pipelines:
       metrics:
         receivers: [windowsperfcounters]

Advanced configurations
============================================

Configure collection interval and counters
------------------------------------------------------------------

You can configure the collection interval and which performance counters you want to scrape. For example:

.. code-block:: yaml

     windowsperfcounters:
      collection_interval: <duration>
      initial_delay: <duration>
      metrics:
        <metric name 1>:
          description: <description>
          unit: <unit type>
          gauge: null
        <metric name 2>:
          description: <description>
          unit: <unit type>
          sum: null
          aggregation: <cumulative or delta>
          monotonic: <true or false>
      perfcounters:
        - object: <object name>
          instances:
            - <instance name>
          counters:
            - name: <counter name>
              metric: <metric name>
              attributes:
                <key>: <value>

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

Configure instances
---------------------------------

An instance is any entity that produces performance data. Instances can have 1 or more counter values.

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
     - The aggregate of all other instance values, which is itself an instance. For more information, see :ref:`total-instance-behavior`.
   * - ``"instance1"``
     - Single instance
   * - ``["instance1", "instance2", ...]``
     - Set of instances
   * - ``["_Total", "instance1", "instance2", ...]``
     - Set of instances including the total instance

.. _total-instance-behavior:

Total instance behavior and the aggregation counter
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To avoid dropping the ``_Total`` instance, you must configure the receiver to collect it individually on its own metric.

For example:

.. code-block:: yaml

   windowsperfcounters:
     metrics:
       processor.time.total:
         description: Total CPU active and idle time
         unit: "%"
         gauge:
     collection_interval: 30s
     perfcounters:
       - object: "Processor"
         instances:
           - "_Total"
         counters:
           - name: "% Processor Time"
             metric: processor.time.total

.. warning::

   When using an ``instance`` value of ``"*"``, if the counter uses a value other than ``_Total``, make sure to avoid double counting when aggregating metrics after the receiver scrapes them.

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
