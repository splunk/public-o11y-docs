.. _memory-limiter-processor:

************************************
Memory Limiter processor
************************************

.. meta::
      :description: The Memory limiter processor prevents out of memory situations on the Splunk Distribution of OpenTelemetry Collector.

The Memory Limiter processor prevents out of memory situations on the Splunk Distribution of OpenTelemetry Collector. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

Get started
======================

.. note:: 
  
  This component is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information. 
  
  For details about the default configuration, see :ref:`otel-configuration-ootb`. You can customize your configuration any time as explained in this document.

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``memory_limiter`` processor as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the resource processor, add ``memory_limiter`` to the ``processors`` section of your configuration file. 

Define the ``memory_limiter`` as the first processor in the pipeline, immediately after the receivers, to ensure that backpressure can be sent to applicable receivers, and to minimize the likelihood of dropped data when ``memory_limiter`` gets triggered.

Along with the ``memory_limiter`` processor, it's highly recommended to configure the Ballast extension as well on every Collector. The ballast should be configured to be 1/3 to 1/2 of the memory allocated to the Collector. 

See the following example:

.. code-block:: yaml


  processors:
    memory_limiter:
      check_interval: 1s
      limit_mib: 4000
      spike_limit_mib: 800

To complete the configuration, include the processor in any pipeline of the ``service`` section of your configuration file. For example:

.. code-block:: yaml


  service:
    pipelines:
      metrics:
        processors: [memory_limiter]
      logs:
        processors: [memory_limiter]
      traces:
        processors: [memory_limiter]

Control memory usage
----------------------------------

Given that the amount and type of data the Collector processes is specific to the environment, and that the resources used by the Collector are also dependent on the configured processors, it's important to put checks in place regarding memory usage.

.. caution:: While the processor can help mitigate out of memory situations, it doesn't replace proper sizing and configuration of the Collector. 
  
  If the soft limit is crossed, the Collector will return errors to all receive operations until enough memory is freed. This might result in dropped data since the receivers might not be able to hold back and retry the data indefinitely.

  If the component preceding the Memory Limiter in the pipeline does not correctly retry and send the data, then that data will be permanently lost. 

Define soft and hard memory limits
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``memory_limiter`` processor allows to perform periodic checks of memory usage. If it exceeds the defined limits, it will begin to refuse data and force to reduce memory consumption.

The ``memory_limiter`` uses soft and hard memory limits: 

* The hard limit is always above or equal to the soft limit.
* When memory usage exceeds the soft limit, the processor enters the memory limited mode and starts to refuse the data by returning errors to the preceding component in the pipeline that made the ConsumeLogs/Trace/Metrics function call. The preceding component should be a receiver.
* When the memory usage is above the hard limit, in addition to refusing the data, the processor will forcedly perform garbage collection in order to try to free memory.
* When the memory usage drops below the soft limit, normal operation is resumed, data is no longer refused, and there's no forced garbage collection.

The difference between the soft limit and hard limits is defined via the ``spike_limit_mib`` configuration option. Select a value that ensures that between memory check intervals memory usage cannot increase by more than this value, otherwise memory usage might exceed the hard limit. See more in :ref:`memory-limiter-processor-config-options`.

.. _memory-limiter-processor-config-options:

Configuration options
----------------------------------

The processor has the following configuration options:

* ``check_interval``: Time between measurements of memory usage. The recommended value is 1 second. ``0`` by default.

  * If the expected traffic to the Collector is very spiky, decrease ``check_interval`` or increase ``spike_limit_mib`` to avoid memory usage going over the hard limit. 

* ``limit_mib``: Maximum amount of memory, in MiB, targeted to be allocated by the process heap. This defines the hard limit. ``0`` by default.

  * Typically the total memory usage of the process is about 50MiB higher than this value. 

* ``limit_percentage``: Maximum amount of total memory targeted to be allocated by the process heap. ``0`` by default.

  * This option is used to calculate ``memory_limit`` from the total available memory. For instance, if you set it to 75% with a total memory of 1GiB, the limit will be 750 MiB. 
  * The fixed memory setting, ``limit_mib``, takes precedence over the percentage configuration. 
  * This configuration is supported on Linux systems with cgroups and it's intended to be used in dynamic platforms like Docker.    

* ``spike_limit_mib``: Maximum spike expected between the measurements of memory usage. It must be less than ``limit_mib``. The recommended and default value for ``spike_limit_mib`` is 20% of ``limit_mib``. 

  * The soft limit value will be equal to (``limit_mib`` - ``spike_limit_mib``). 

* ``spike_limit_percentage``: Maximum spike expected between the measurements of memory usage. The value must be less than ``limit_percentage``. ``0`` by default.

  * This option is used to calculate ``spike_limit_mib`` from the total available memory. For instance, if you set it to 25% with a total memory of 1GiB, the limit will be 250MiB. 

.. _memory-limiter-processor-settings:

Settings
======================

The following table shows the configuration options for the ``memory_limiter`` processor:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/memory_limiter.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
