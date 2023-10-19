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
        * Windows installer and NuGet package (msi and nupkg)
        * macOS binary file (otelcol_darwin_amd64)
        * Docker image. See :ref:`Docker image for Linux <linux-docker>` and :ref:`Docker image for Windows <windows-docker>`
     - See :ref:`native-monitor-support-matrices`.
   * - ARM64
     - 
        * Linux packages (deb, rpm, and tar.gz)
        * Linux binary file (otelcol_linux_arm64)
        * macOS binary file (otelcol_darwin_arm64)
        * Docker image. See :ref:`Docker image for Linux <linux-docker>`
     - Some monitors within the Smart Agent receivers are considered experimental for ARM64. See :ref:`subprocess-monitors-support-matrices`.
   * - ppc64le, including IBM Private Cloud
     - 
        * Linux binary file (otelcol_linux_ppc64le)
        * Docker image. :ref:`Docker image for Linux <linux-docker>`
     - Some Smart Agent monitors are not supported on ppc64le. See :ref:`subprocess-monitors-support-matrices`.

.. caution:: Smart Agent support on ARM64 is experimental.

.. _native-monitor-support-matrices:

Native Smart Agent monitors
==========================================================

Native Smart Agent monitors are grouped into three bundles:

* Standalone
* Prometheus
* Telegraf

The following matrices list support capabilities for each monitor in each architecture.

Support for native standalone monitors
---------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``appmesh``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``cadvisor``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``cgroups``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``cloudfoundry-firehose-nozzle``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``conviva``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``cpu``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``disk-io``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``docker-container-stats``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``ecs-metadata``
     - Yes
     - Yes
     - Yes
     - No
   * - ``elasticsearch``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``expvar``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``filesystems``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``trace-forwarder``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``haproxy``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``heroku-metadata``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``host-metadata``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``http``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``jaeger-grpc``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``kubernetes-cluster``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``kubernetes-events``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``kubelet-metrics``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``kubelet-stats``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``kubernetes-volumes``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``load``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``logstash``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``logstash-tcp``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``memory``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``mongodb-atlas``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``net-io``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``ntp``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``postgresql``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``processlist``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``sql``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``supervisor``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``vmem``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``vsphere``
     - Yes
     - Yes
     - Yes
     - Yes

Support for native Prometheus monitors
-------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``coredns``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``etcd``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``gitlab``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``prometheus/go``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``kubernetes-apiserver``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``kube-controller-manager``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``kubernetes-proxy``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``kubernetes-scheduler``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``prometheus/nginx-vts``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``prometheus/node``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``prometheus/postgres``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``prometheus/redis``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``traefik``
     - Yes
     - Yes
     - Yes
     - Yes
    
Support for native Telegraf monitors
---------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``aspdotnet``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``telegraf/dns``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``telegraf/exec``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``windows-iis``
     - No
     - Yes
     - No
     - No
   * - ``telegraf/logparser``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``telegraf/sqlserver``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``dotnet``
     - No
     - Yes
     - No
     - No
   * - ``telegraf/procstat``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``telegraf/snmp``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``telegraf/statsd``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``telegraf/tail``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``telegraf/win_perf_counters``
     - No
     - Yes
     - No
     - No
   * - ``windows-legacy``
     - No
     - Yes
     - No
     - No
   * - ``telegraf/win_services`` 
     - No
     - Yes
     - No
     - No

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
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``collectd/apache``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/chrony``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/cpufreq``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/memcached``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/mysql``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/nginx``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/php-fpm``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/postgresql``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/processes``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/uptime``
     - Yes
     - No
     - Experimental
     - No

Support for collectd or GenericJMX subprocess monitors
------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``collectd/activemq``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/cassandra``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/hadoopjmx``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/kafka``
     - Yes
     - No
     - Experimental
     - No
   * - ``collect/kafka_consumer``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/kafka_producer``
     - Yes
     - No
     - Experimental
     - No
   
Support for sfxcollectd subprocess monitors
------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``collectd/consul``
     - Yes
     - No
     - Experimental
     - No
   * - ``collect/couchbase``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/elasticsearch``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/etcd``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/hadoop``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/health-checker``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/jenkins``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/kong``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/marathon``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/mongodb``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/openstack``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/rabbitmq``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/solr``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/spark``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/systemd``
     - Yes
     - No
     - Experimental
     - No
   * - ``collectd/zookeeper``
     - Yes
     - No
     - Experimental
     - No

Support for subprocess JMX monitors
----------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Monitor
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``jmx``
     - Yes
     - Yes
     - Experimental
     - No
