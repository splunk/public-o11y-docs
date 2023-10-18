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
     - Yes
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
   * - ``internal-metrics``
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
     - Yes
     - Yes
     - Yes
     - Yes
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
     - Yes
     - Yes
     - Yes
     - Yes
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
   * - ``statsd``
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
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``windows-legacy``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``telegraf/win_services`` 
     - Yes
     - Yes
     - Yes
     - Yes

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
     - Yes
     - Experimental
     - No
   * - ``collectd/chrony``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/cpufreq``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/memcached``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/mysql``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/nginx``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/php-fpm``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/postgresql``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/processes``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/uptime``
     - Yes
     - Yes
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
     - Yes
     - Experimental
     - No
   * - ``collectd/cassandra``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/hadoopjmx``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/kafka``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collect/kafka_consumer``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/kafka_producer``
     - Yes
     - Yes
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
     - Yes
     - Experimental
     - No
   * - ``collect/couchbase``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/elasticsearch``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/etcd``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/hadoop``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/health-checker``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/jenkins``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/kong``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/marathon``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/mongodb``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/openstack``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/rabbitmq``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/solr``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/spark``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/systemd``
     - Yes
     - Yes
     - Experimental
     - No
   * - ``collectd/zookeeper``
     - Yes
     - Yes
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
