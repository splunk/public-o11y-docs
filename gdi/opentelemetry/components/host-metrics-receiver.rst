.. _host-metrics-receiver:

*************************
Host metrics receiver
*************************

.. meta::
      :description: Use this Splunk Observability Cloud integration for the host metrics monitor. See benefits, install, configuration, and metrics.

The host metrics receiver generates metrics scraped from host systems when the Collector is deployed as an agent. The supported pipeline type is ``metrics``.

By default, the host metrics receiver is activated in the Splunk Distribution of OpenTelemetry Collector and collects the following metrics:

- CPU usage metrics
- Disk I/O metrics
- CPU load metrics
- File system usage metrics
- Memory usage metrics
- Network interface and TCP connection metrics
- Process count metrics (Linux only)
- Per process CPU, memory, and disk I/O metrics

Host receiver metrics appear in Infrastructure Monitoring. You can use them to create dashboards and alerts. See :ref:`create-detectors` for more information.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`. The most up-to-date list of excluded metrics is in GitHub. See :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/signalfxexporter/internal/translation/default_metrics.go#L49`. 

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

.. note:: Metrics produced by this receiver count towards the custom metric ingestion limit. See :ref:`sys-limits`.

Collect container host metrics (Linux)
---------------------------------------

The host metrics receiver collects metrics from the Linux system directories. To collect metrics for the host instead of the container, follow these steps:

#. Mount the entire host file system when running the container. For example: ``docker run -v /:/hostfs``. You can also choose which parts of the host file system to mount. For example: ``docker run -v /proc:/hostfs/proc``

#. Configure ``root_path`` so that the host metrics receiver knows where the root file system is located. For example:

   .. code-block:: yaml

      receivers:
      hostmetrics:
         root_path: /hostfs

   If you are running multiple instances of the host metrics receiver, set the same ``root_path`` for all.

Sample configurations
----------------------

The collection interval and the categories of metrics to be scraped can
be configured as shown in the following example:

.. code:: yaml

   hostmetrics:
     collection_interval: <duration> # The default is 1m.
     scrapers:
       <scraper1>:
       <scraper2>:
       ...

Scrapers extract data from endpoints and then send that data to a specified target. The following table shows the available scrapers:

.. list-table::
   :widths: 10 90
   :width: 100%
   :header-rows: 1

   - 

      - Scraper
      - Description
   - 

      - ``cpu``
      - CPU utilization metrics
   - 

      - ``disk``
      - Disk I/O metrics
   - 

      - ``load``
      - CPU load metrics
   - 

      - ``filesystem``
      - File system utilization metrics
   - 

      - ``memory``
      - Memory utilization metrics
   - 

      - ``network``
      - Network interface I/O metrics and TCP connection metrics
   - 

      - ``paging``
      - Paging or swap space utilization and I/O metrics
   - 

      - ``processes``
      - Process count metrics. Only available on Linux
   - 

      - ``process``
      - Per process CPU, memory, and disk I/O metrics

See the following sections for scraper configurations.

Disk
^^^^^^^^^^^^^^^^^^^

.. code:: yaml

   disk:
     <include|exclude>:
       devices: [ <device name>, ... ]
       match_type: <strict|regexp>

File system
^^^^^^^^^^^^^^^^^^^

.. code:: yaml

   filesystem:
     <include_devices|exclude_devices>:
       devices: [ <device name>, ... ]
       match_type: <strict|regexp>
     <include_fs_types|exclude_fs_types>:
       fs_types: [ <filesystem type>, ... ]
       match_type: <strict|regexp>
     <include_mount_points|exclude_mount_points>:
       mount_points: [ <mount point>, ... ]
       match_type: <strict|regexp>

The following example shows the forward slash (``/``) as a common mount point for Linux systems:

.. code:: yaml

   filesystem:
     include_mount_points:
       mount_points: ["/"]
       match_type: strict

Similarly, the following example shows ``C:`` as a common mount point for Windows systems:

.. code:: yaml

   filesystem:
     include_mount_points:
       mount_points: ["C:"]
       match_type: strict

To include virtual file systems, set ``include_virtual_filesystems`` to ``true``. 

.. code:: yaml

   filesystem:
     include_virtual_filesystems: true

Find more examples in the daemonset.yaml file in GitHub.

Network
^^^^^^^^^^^^^^^^^^^

.. code:: yaml

   network:
     <include|exclude>:
       interfaces: [ <interface name>, ... ]
       match_type: <strict|regexp>

Process
^^^^^^^^^^^^^^^^^^^

.. code:: yaml

   process:
     <include|exclude>:
       names: [ <process name>, ... ]
       match_type: <strict|regexp>
     mute_process_name_error: <true|false>
     mute_process_exe_error: <true|false>
     mute_process_io_error: <true|false>
     scrape_process_delay: <time>

If you keep getting errors related to process reading, consider setting ``mute_process_name_error``, ``mute_process_exe_error``, or ``mute_process_io_error`` to ``true``.

Filtering
----------------------

To only gather a subset of metrics from a particular source, use the
host metrics receiver with the ``filter`` processor.

Different frequencies
---------------------------------

To scrape some metrics at a different frequency than others, configure
multiple host metrics receivers with different ``collection_interval``
values. For example:

.. code:: yaml

   receivers:
     hostmetrics:
       collection_interval: 30s
       scrapers:
         cpu:
         memory:

     hostmetrics/disk:
       collection_interval: 1m
       scrapers:
         disk:
         filesystem:

   service:
     pipelines:
       metrics:
         receivers: [hostmetrics, hostmetrics/disk]

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`.

cpu scraper
--------------------------

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/cpuscraper.yaml"></div>

disk scraper
--------------------------

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/diskscraper.yaml"></div>

filesystem scraper
--------------------------

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/filesystemscraper.yaml"></div>

load scraper
--------------------------

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/loadscraper.yaml"></div>

memory scraper
--------------------------

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/memoryscraper.yaml"></div>

network scraper
--------------------------

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/networkscraper.yaml"></div>

paging scraper
--------------------------

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/pagingscraper.yaml"></div>

processes scraper
--------------------------

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/processesscraper.yaml"></div>

process scraper
--------------------------

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/processscraper.yaml"></div>

Resource attributes
--------------------------

The host metrics receiver doesn't set any resource attributes on the exported metrics. 

To set resource attributes, provide them using the ``OTEL_RESOURCE_ATTRIBUTES`` environment variables. For example:

.. code-block:: shell

   export OTEL_RESOURCE_ATTRIBUTES="service.name=<name_of_service>,service.version=<version_of_service>"

.. include:: /_includes/activate-deactivate-native-metrics.rst

Settings
======================

The following table shows the configuration options for the host metrics receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/hostmetrics.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
