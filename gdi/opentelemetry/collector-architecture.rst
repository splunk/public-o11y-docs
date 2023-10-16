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
     - See :ref:`native-monitor-support-matrices`.
   * - ARM64
     - 
        * Linux packages (deb, rpm, and tar.gz)
        * Linux binary file (otelcol_linux_arm64)
        * macOS binary file (otelcol_darwin_arm64)
        * Docker image. See :ref:`Docker image for Linux <linux-docker>`
     - Some monitors within the Smart Agent receivers are not supported with ARM64. See :ref:`subprocess-monitors-support-matrices`.
   * - ppc64le, including IBM Private Cloud
     - 
        * Linux binary file (otelcol_linux_ppc64le)
        * Docker image. :ref:`Docker image for Linux <linux-docker>`
     - Some Smart Agent monitors are not supported on ppc64le. See :ref:`subprocess-monitors-support-matrices`.

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
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``cadvisor``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``cgroups``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``cloudfoundry-firehose-nozzle``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``conviva``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``cpu``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``disk-io``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``docker-container-stats``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``ecs-metadata``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``elasticsearch``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``expvar``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``filesystems``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``trace-forwarder``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``haproxy``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``heroku-metadata``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``host-metadata``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``http``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``internal-metrics``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``jaeger-grpc``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``kubernetes-cluster``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``kubernetes-events``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``kubelet-metrics``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``kubernetes-volumes``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``load``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``logstash``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``logstash-tcp``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``memory``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``mongodb-atlas``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``net-io``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``ntp``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``postgresql``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``processlist``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``sql``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``supervisor``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``vmem``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``vsphere``
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
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``coredns``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``etcd``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``gitlab``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``prometheus/go``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``kubernetes-apiserver``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``kube-controller-manager``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``kubernetes-proxy``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``kubernetes-scheduler``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``prometheus/nginx-vts``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``prometheus/node``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``prometheus/postgres``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``prometheus/redis``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``traefik``
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
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``appmesh``
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
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``aspdotnet``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``telegraf/dns``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``telegraf/exec``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``windows-iis``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``telegraf/logparser``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``telegraf/sqlserver``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``dotnet``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``telegraf/procstat``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``telegraf/snmp``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``statsd``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``telegraf/tail``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``telegraf/win_perf_counters``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``windows-legacy``
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`
   * - ``telegraf/win_services`` 
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
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``collectd/apache``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/chrony``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/cpufreq``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/memcached``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/mysql``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/nginx``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/php-fpm``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/postgresql``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/processes``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/uptime``
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
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``collectd/activemq``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/cassandra``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/hadoopjmx``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/kafka``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collect/kafka_consumer``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/kafka_producer``
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
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``collectd/consul``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collect/couchbase``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/elasticsearch``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/etcd``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/hadoop``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/health-checker``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/jenkins``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     -  
   * - ``collectd/kong``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/marathon``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/mongodb``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/openstack``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/rabbitmq``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/solr``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/spark``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/systemd``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
   * - ``collectd/zookeeper``
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
     - Support for AMD64 Linux
     - Support for AMD64 Windows
     - Support for ARM64 Linux
     - Support for ppc64le Linux
   * - ``jmx``
     - :strong:`X`
     - :strong:`X`
     - Experimental
     - 
