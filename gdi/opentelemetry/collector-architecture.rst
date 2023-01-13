.. _collector-architecture:

*******************************************************************
Architecture
*******************************************************************

.. meta::
   :description: Describes the architecture of the Splunk Distribution of OpenTelemetry Collector.

The Splunk Distribution of OpenTelemetry Collector can be deployed in the ways described in this document. 

Helm or installer script (recommended)
================================================
Agent mode is the recommended deployment mode. See :ref:`otel-deployment-mode` for a complete overview of the Agent mode and the Gateway mode.

The following image shows the architecture for :ref:`Helm chart <otel-install-k8s>`, :ref:`Linux installer script <otel-install-linux>`, or :ref:`Windows installer script <otel-install-windows>` deployments:

.. image:: /_images/gdi/splunk-otel-collector-recommended-arch.png
   :alt: This image shows the architecture for Helm chart and installer script deployments. 

The default configuration of the components is as follows:

* Splunk Distribution of OpenTelemetry Collector
* Fluentd

Standalone 
================================================
If deployed in standalone mode, the Splunk Distribution of OpenTelemetry Collector is the only component deployed and configured. The default configuration for standalone mode is Gateway mode instead of Agent mode. See :ref:`otel-deployment-mode` for a complete overview of the Agent mode and the Gateway mode.

 The following image shows the architecture for the standalone mode:

.. image:: /_images/gdi/splunk-otel-collector-standalone-arch.png 
   :alt: This image shows the architecture for the standalone mode.

Advanced
==================================
When running as an agent, you can also manually configure the Splunk Distribution of OpenTelemetry Collector to send data to a Splunk Distribution of OpenTelemetry Collector gateway instance or cluster. This requires changing the pipeline exporters in the agent to point to the gateway.

The following image shows the architecture for the advanced mode:

.. image:: /_images/gdi/splunk-otel-collector-recommended-gateway-arch.png
   :alt: This image shows the architecture for the advanced mode. 

Processor (CPU) architecture 
===================================
The Collector supports the following processor architecture:

* x86_64/AMD64
* ARM64 compatible Docker image

See :ref:`compatible components <x86_64-AMD64-ARM64-yes>` for more information about supported components. 

While all receivers are supported (including all monitors with the SignalFx Smart Agent receiver) with the Collector on AMD64, there are a list of subprocess monitors with the Smart Agent receivers that are not supported with ARM64. See :ref:`unsupported components <ARM64-no>` for more information.

.. _x86_64-AMD64-ARM64-yes:

x86_64/AMD64 and ARM64 compatible Docker image
----------------------------------------------------------
All native OpenTelemetry receivers are supported in the Collector.

In Native Golang monitors, the main agent process gathers metric and span gathering functionality by using network client, bound socket, or other platform-specific mechanisms. These monitors can either be:

* Entirely standalone on the collection side
* Require third-party software development kits for data gathering
* Come from a scraped Prometheus endpoint
* Implemented as a Telegraf input plugin and imported for direct usage and data translation before sending to the relevant channel

Standalone
^^^^^^^^^^^^^^^^^^^^^^
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
^^^^^^^^^^^^^^^^^^^^^^
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
^^^^^^^^^^^^^^^^^^^^^^
The following components are supported:

* AWS App Mesh 

Telegraf
^^^^^^^^^^^^^^^^^^^^^^
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

ARM64
-----------------
Using the Smart Agent receiver with ``<name-of monitor>`` monitor types is not supported. 

Subprocess monitor types are those that initiate the creation and management of a child process where metric gathering occurs, and whose resulting data points are sent back to the wrapping golang monitor for translation and sending to the relevant channel.

There are three major subprocess monitor types: 

* collectd (and its associated collectd/GenericJMX plugin-based integrations) 
* sfxcollectd
* JMX
 
These types are derived from integrations that produce metrics in the Smart Agent and are not reflective of the current ability to run arbitrary Python or Java applications (as it is unclear that this is necessary for the Collector).

collectd
^^^^^^^^^^^^^^^^^^^^^^
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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following components are not supported:

* ActiveMQ
* Cassandra
* Hadoop JMX
* Kafka
* Kafka Consumer
* Kafka Producer

sfxcollectd 
^^^^^^^^^^^^^^^^^^^^^^
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
^^^^^^^^^^^^^^^^^^^^^^
The following components are not supported:

* JMX
