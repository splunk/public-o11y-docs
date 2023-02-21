.. _host-metrics-receiver:

*************************
Host metrics receiver
*************************

.. meta::
      :description: Use this Splunk Observability Cloud integration for the host metrics monitor. See benefits, install, configuration, and metrics.

Description
=====================

A receiver is a way to get data into the Splunk Distribution of
OpenTelemetry Collector. Receivers support one or more data sources -
traces, metrics, or logs.

The host metrics receiver generates metrics scraped from host systems
when the Collector is deployed as an agent. The supported pipeline type
is ``metrics``.

.. note:: Metrics produced by this receiver count towards the custom metric ingestion limit. See :ref:`sys-limits`.

Benefits
=====================



   ### Benefits

   ```{include} /_includes/benefits.md

Get started
-----------

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your
   host or container platform:

   -  Install on Kubernetes
   -  Install on Linux
   -  Install on Windows

2. Configure the receiver, as described in the next section.
3. Restart the Splunk Distribution of OpenTelemetry Collector.

Configuration
-------------

Settings
~~~~~~~~

This receiver has the following settings:

.. container:: metrics-standard

Scraper configuration
~~~~~~~~~~~~~~~~~~~~~

The collection interval and the categories of metrics to be scraped can
be `configured <#scraper-configuration>`__, as shown in the following
example.

.. code:: yaml

   hostmetrics:
     collection_interval: <duration> # The default is 1m.
     scrapers:
       <scraper1>:
       <scraper2>:
       ...

The following table shows the available scrapers:

.. list-table::
   :widths: 17 37 18
   :header-rows: 1

   - 

      - Scraper
      - Supported OS
      - Description
   - 

      - cpu
      - Not supported on macOS when compiled without Cgo, which is the
         default.
      - CPU utilization metrics
   - 

      - disk
      - Not supported on macOS when compiled without Cgo, which is the
         default.
      - Disk I/O metrics
   - 

      - load
      - All
      - CPU load metrics
   - 

      - filesystem
      - All
      - File system utilization metrics
   - 

      - memory
      - All
      - Memory utilization metrics
   - 

      - network
      - All
      - Network interface I/O metrics & TCP connection metrics
   - 

      - paging
      - All
      - Paging or swap space utilization and I/O metrics
   - 

      - processes
      - Linux
      - Process count metrics
   - 

      - process
      - Linux and Windows
      - Per process CPU, memory, and disk I/O metrics

Scrapers extract data from endpoints and then send that data to a
specified target. See the following sections for scraper configurations.

Disk
^^^^

.. code:: yaml

   disk:
     <include|exclude>:
       devices: [ <device name>, ... ]
       match_type: <strict|regexp>

File system
^^^^^^^^^^^

``{note} The SignalFx exporter excludes some available file system metrics by default. Learn more about default metric filters in [GitHub](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/signalfxexporter#default-metric-filters). See the complete list of file system metrics in [GitHub](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/internal/scraper/filesystemscraper/documentation.md).``

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

For example, for Linux systems, ``/`` is a common mount point:

.. code:: yaml

   filesystem:
     include_mount_points:
       mount_points: ["/"]
       match_type: strict

Similarly, for Windows systems, ``C:`` is a common mount point.

.. code:: yaml

   filesystem:
     include_mount_points:
       mount_points: ["C:"]
       match_type: strict

Find more examples in our GitHub repos.

Network
^^^^^^^

.. code:: yaml

   network:
     <include|exclude>:
       interfaces: [ <interface name>, ... ]
       match_type: <strict|regexp>

Process
^^^^^^^

.. code:: yaml

   process:
     <include|exclude>:
       names: [ <process name>, ... ]
       match_type: <strict|regexp>
     mute_process_name_error: <true|false>
     scrape_process_delay: <time>

Filtering
^^^^^^^^^

To only gather a subset of metrics from a particular source, use the
host metrics receiver with the filter processor.

Different frequencies
^^^^^^^^^^^^^^^^^^^^^

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

Troubleshooting
---------------

``{include} /_includes/troubleshooting.md``
