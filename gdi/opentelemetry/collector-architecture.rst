.. _collector-architecture:

*******************************************************************
Processor architecture 
*******************************************************************

.. meta::
   :description: Describes the compatible CPU architectures and operating systems of the Splunk Distribution of OpenTelemetry Collector.

.. note:: For information on the Collector's deployment modes and their architecture, see :ref:`otel-deployment-mode`. 

The Collector supports the following processor architectures and operating systems:

.. list-table::
   :width: 100%
   :widths: 20 40 40
   :header-rows: 1

   * - Architecture
     - Install methods
     - Supported components
   * - x86_64 and AMD64
     - 
        * Linux packages (deb, rpm, and tar.gz)
        * Linux binary file (otelcol_linux_amd64)
        * Windows installer and binary file (otelcol_windows_amd64.exe)
        * macOS binary file (otelcol_darwin_amd64)
        * Docker image. See :ref:`Docker image for Linux <linux-docker>` and :ref:`Docker image for Windows <windows-docker>`
     - See :ref:`compatible components <native-monitor-support-matrices>`
   * - ARM64
     - 
        * Linux packages (deb, rpm, and tar.gz)
        * Linux binary file (otelcol_linux_arm64)
        * macOS binary file (otelcol_darwin_arm64)
        * Docker image. See :ref:`Docker image for Linux <linux-docker>`
     - Some monitors within the Smart Agent receivers are not :strong:`X` with ARM64. See :ref:`Unsupported components <subprocess-monitors-support-matrices>`
   * - ppc64le, including IBM Private Cloud
     - 
        * Linux binary file (otelcol_linux_ppc64le)
        * Docker image. :ref:`Docker image for Linux <linux-docker>`
     - Some Smart Agent monitors are unsupported on ppc64le. See :ref:`Unsupported components <subprocess-monitors-support-matrices>`

.. caution:: Smart Agent support on ARM64 is experimental.

.. _native-monitor-support-matrices:

Native Smart Agent monitors
==========================================================

Native Smart Agent monitors are grouped into four bundles:

* Standalone
* Prometheus
* Statsd
* Telegraf

The following matrices list support capabilities for each monitor in each architecture.

Support for native standalone monitors
---------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for x86_64
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le
   * - cAdvisor
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - cgroups
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Cloud Foundry Firehose Nozzle
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Conviva
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - CPU
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Disk-IO
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Docker
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ECS
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Elasticsearch
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Expvar
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - File systems
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Trace forwarder
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - HA Proxy
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Heroku (dims only)
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Host metadata (props and uptime metrics)
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - https
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Internal metrics
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Jaeger gRPC (traces)
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Kubernetes cluster
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Kubernetes events (events)
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Kubernetes and kubelet metrics
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Kubernetes volumes
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Load
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Logstash
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Logstash-tcp
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Memory
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Mongodb-atlas
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Net-IO
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - NTP
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - PostgreSQL
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Processlist (events)
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - SQL
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Supervisor
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Vmem
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - vSphere
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

Support for native Prometheus monitors
-------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for x86_64
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le
   * - CoreDNS
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - etcd
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - GitLab
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Go
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Kubernetes API server
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Kubernetes controller manager
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Kubernetes proxy
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Kubernetes scheduler
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Nginx VTS
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Node
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Postgres
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Redis
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Traefik
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

Support for native Statsd monitors
---------------------------------------
   
.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for x86_64
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le
   * - AWS App Mesh
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   
Support for native Telegraf monitors
---------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for x86_64
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le
   * - ASP .NET (Windows)
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - DNS
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Exec
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Internet Information Services (IIS) for Windows
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Logparser
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Microsoft SQL server
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - .NET
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Procstat
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - SNMP
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Statsd
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Tail
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Windows Performance Counter
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Windows Legacy
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - Windows Service 
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

.. _subprocess-monitors-support-matrices:

Subprocess Smart Agent monitors 
=============================================

Support for Smart Agent receiver monitor types is experimental for ARM64 starting from the Splunk Distribution of OpenTelemetry Collector version 0.73 and higher. Using the Smart Agent receiver with monitor types is not supported for ppc64le architectures.

Subprocess monitor types are those that initiate the creation and management of a child process where metric gathering occurs. There are three major subprocess monitor types: 

* ``collectd`` and its associated ``collectd/GenericJMX`` plugin-based integrations
* ``sfxcollectd``
* ``JMX``

These types derive from integrations that produce metrics in the Smart Agent and are not reflective of the current ability to run arbitrary Python or Java applications.

Support for collectd subprocess monitors
---------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for x86_64
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le
   * - Apache
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Chrony
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - CPU frequency
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Memcached
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - MySQL
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Nginx
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - php-fpm
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - postgresql
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - processes
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Uptime
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 

Support for collectd or GenericJMX subprocess monitors
------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for x86_64
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le
   * - ActiveMQ
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Cassandra
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Hadoop JMX
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Kafka
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Kafka Consumer
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Kafka Producer
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   
Support for sfxcollectd subprocess monitors
------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for x86_64
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le
   * - Consul
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Couchbase
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Elasticsearch
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - etcd
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Hadoop
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Health Checker
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Jenkins
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     -  
   * - Kong
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Marathon
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - MongoDB
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - OpenStack
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - RabbitMQ
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Solr
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Spark
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - systemd
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - Zookeeper
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 

Support for subprocess JMX monitors
----------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for x86_64
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le
   * - JMX
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
