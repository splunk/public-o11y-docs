.. _filesystems:

Free disk space (filesystems)
=============================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the file systems / filesystems monitor. See benefits, install, configuration, and metrics

.. note:: If you are using the Splunk Distribution of OpenTelemetry Collector and want to collect file system utilization metrics, use the native OTel component :ref:`host-metrics-receiver`.

The :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the ``filesystems`` monitor type to retrieve free disk space metrics.

This integration is available on Linux and Windows. On Linux, this monitor relies on the ``/proc`` filesystem. If the underlying host's ``/proc`` file system is mounted somewhere other than ``/proc``, specify the path using the top level setting ``procPath``.


Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code:: yaml

   receivers:
     smartagent/filesystems:
       type: filesystems
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/filesystems]
       logs:
         receivers: [smartagent/filesystems]

The following example shows how to collect additional metrics from a variefy of file system types:

.. code:: yaml

    smartagent/filesystems:
       type: filesystems
       extraMetrics:
       - df_complex.reserved
       - df_inodes.free
       - df_inodes.used
       - percent_inodes.free
       - percent_inodes.used
       - percent_bytes.free
       - percent_bytes.reserved
       - percent_bytes.used
       fsTypes:
       - ext3
       - ext4
       - nfs
       - xfs
       - btrfs
       sendModeDimension: true

Configuration settings
----------------------

The following table shows the configuration options for this monitor.

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``hostFSPath``
      - no
      - ``string``
      - Path to the root of the host filesystem. It is useful when
         running in a container and the host filesystem is mounted in a
         subdirectory under /. The disk usage metrics emitted will be
         based at this path.
   - 

      - ``fsTypes``
      - no
      - ``list of strings``
      - The filesystem types to include/exclude. This is an
         :ref:`overridable set <filtering-smart-agent>` If this is
         not set, the default value is the set of all
         **non-logical/virtual filesystems** on the system. On Linux
         this list is determined by reading the ``/proc/filesystems``
         file and choosing the filesystems that do not have the
         ``nodev`` modifier.
   - 

      - ``mountPoints``
      - no
      - ``list of strings``
      - The mount paths to include/exclude. This is an
         :ref:`overridable set <filtering-smart-agent>` **Note**:
         If you are using the hostFSPath option, do not include the
         ``/hostfs/`` mount in the filter. If both this and ``fsTypes``
         are specified, the two filters combine in an AND relationship.
   - 

      - ``sendModeDimension``
      - no
      - ``bool``
      - Set to ``true`` to emit the “mode” dimension, which represents
         whether the mount is “rw” or “ro”. (**default:** ``false``)

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/filesystems/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
