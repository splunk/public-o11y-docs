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
     - See :ref:`compatible components <x86_64-AMD64-ARM64-yes>`
   * - ARM64
     - 
        * Linux packages (deb, rpm, and tar.gz)
        * Linux binary file (otelcol_linux_arm64)
        * macOS binary file (otelcol_darwin_arm64)
        * Docker image. See :ref:`Docker image for Linux <linux-docker>`
     - Some monitors within the Smart Agent receivers are not supported with ARM64. See :ref:`unsupported components <ARM64-no>`
   * - ppc64le, including IBM Private Cloud
     - 
        * Linux binary file (otelcol_linux_ppc64le)
        * Docker image. :ref:`Docker image for Linux <linux-docker>`
     - Smart Agent monitors are unsupported on ppc64le. See :ref:`unsupported components <ARM64-no>`

.. caution:: Smart Agent support on ARM64 is experimental.

.. _x86_64-AMD64-ARM64-yes:

Compatible components
======================================================================

All native OpenTelemetry receivers are supported in the Collector for the x86_64, AMD64, ARM64, and ppc64le architectures.

Standalone
----------------------------------

The following components are supported:

* cAdvisor (with the kubelet stats receiver)
* cgroups
* Cloud Foundry Firehose Nozzle
* Conviva
* CPU
* Disk-IO
* Docker
* ECS
* Elasticsearch
* Expvar
* File systems
* Trace forwarder
* HA Proxy
* Heroku (dims only)
* Host metadata (props and uptime metrics)
* https
* Internal metrics
* Jaeger gRPC (traces)
* Kubernetes cluster
* Kubernetes events (events)
* Kubernetes and kubelet metrics
* Kubernetes volumes
* Load
* Logstash
* Logstash-tcp
* Memory
* Mongodb Atlas
* Net-IO
* NTP
* PostgreSQL
* Processlist (events)
* SQL
* Supervisor
* Vmem
* vSphere

Prometheus
----------------------------------

The following components are supported:

* CoreDNS
* etcd
* GitLab
* Go
* Kubernetes API server
* Kubernetes controller manager
* Kubernetes proxy
* Kubernetes scheduler
* Nginx VTS
* Node
* Postgres
* Redis
* Traefik

Statsd
----------------------------------

The following components are supported:

* AWS App Mesh 

Telegraf
----------------------------------

The following components are supported:

* ASP.NET (Windows)
* DNS
* Exec
* Internet Information Services (IIS) for Windows
* Logparser
* Microsoft SQL Server
* .NET
* Procstat
* SNMP
* Statsd
* Tail 
* Windows Performance Counter 
* Windows Legacy
* Windows Service

.. _ARM64-no:

Unsupported components
===================================

Support for Smart Agent receiver monitor types is experimental for ARM64 starting from the Splunk Distribution of OpenTelemetry Collector version 0.73 and higher. Using the Smart Agent receiver with monitor types is not supported for ppc64le architectures.

Subprocess monitor types are those that initiate the creation and management of a child process where metric gathering occurs. There are three major subprocess monitor types: 

* ``collectd`` and its associated ``collectd/GenericJMX`` plugin-based integrations
* ``sfxcollectd``
* ``JMX``

These types derive from integrations that produce metrics in the Smart Agent and are not reflective of the current ability to run arbitrary Python or Java applications.

collectd
----------------------------------

The following components are not supported:

* Apache
* Chrony
* CPU frequency
* Memcached
* MySQL
* Nginx
* php-fpm
* postgresql
* processes
* Uptime

collectd or GenericJMX
----------------------------------

The following components are not supported:

* ActiveMQ
* Cassandra
* Hadoop JMX
* Kafka
* Kafka Consumer
* Kafka Producer

sfxcollectd 
----------------------------------

The following components are not supported:

* Consul
* Couchbase
* Elasticsearch
* etcd
* Hadoop
* Health Checker
* Jenkins
* Kong
* Marathon
* MongoDB
* OpenStack 
* RabbitMQ
* Solr
* Spark
* systemd
* Zookeeper

JMX
----------------------------------

The following components are not supported:

* JMX
