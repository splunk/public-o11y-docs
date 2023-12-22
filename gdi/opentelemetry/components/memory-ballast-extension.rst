.. _memory-ballast-extension:

****************************
Memory Ballast extension
****************************

.. meta::
      :description: Use the Memory Ballast extension to allow your applications to configure memory ballast for processing.

The Memory Ballast extension enables applications to configure memory ballast for processing.

Get started
======================

.. note:: This component is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector. See :ref:`otel-configuration-ootb` for details. You can customize your configuration any time as explained in this document.

You can configure the following settings for the extension:

* ``size_mib``. The memory ballast size, in MiB. 

  * ``0`` by default.
  * Takes higher priority than ``size_in_percentage`` if both are specified at the same time. 
  
* ``size_in_percentage``. Sets the memory ballast based on the total memory in percentage. 

  * ``0`` by default.
  * The value can range from 1 to 100. 
  * Supported in both containerized (Docker, Kubernetes) and physical host environments. 

Calculate the ballast's size as a percentage
--------------------------------------------------------------------

When ``size_in_percentage`` is enabled, the value for ``ballast_size`` is calculated as follows.

On the target host or container, check the value in ``memory.limit_in_bytes`` to learn if there's any memory limitation for the running Collector process. Memory files are stores in paths such as /sys/fs/cgroup/memory/memory.limit_in_bytes.

* If ``memory.limit_in_bytes`` is a positive value other than ``9223372036854771712`` (``0x7FFFFFFFFFFFF000``), the value for ``ballast_size`` is calculated with the formula 

  ``ballast_size`` = ``size_in_percentage`` * ``memory.limit_in_bytes`` / 100 

* If ``memory.limit_in_bytes`` is ``9223372036854771712`` (``0x7FFFFFFFFFFFF000``), no memory limit has been set for the Collector process or the running container in cgroup, and the value for ``ballast_size`` is calculated with the formula 
  
  ``ballast_size`` =  ``size_in_percentage`` * ``totalMemory`` / 100 

  where ``totalMemory`` is calculated by :new-page:`github.com/shirou/gopsutil/v3/mem <https://github.com/shirou/gopsutil>` on ``mem.VirtualMemory().total``. 

Sample configurations
--------------------------------

This configuration uses 64 Mib of memory for the ballast:

.. code-block:: yaml


  extensions:
    memory_ballast:
      size_mib: 64


This configuration uses 20% of the total memory for the ballast:

.. code-block:: yaml


  extensions:
    memory_ballast:
      size_in_percentage: 20

Settings
======================

The following table shows the configuration options for the Memory Ballast extension:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/extension/memory_ballast.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
