.. _supported-data-sources:

********************************************************************************
All supported data sources
********************************************************************************

.. meta::
   :description: Splunk Observability Cloud apps that integrate data collection from third-party hosts and services

To help you get data in, Splunk Observability Cloud provides the following:

* Apps that collect data from host hardware, server software, and cloud services. These apps are known as monitors,
  collectors, or integrations.
* Instrumentation that helps you collect tracing data from your own applications. You can use this data
  in Splunk APM.

In following table, the :strong:`Data source` column contains links to the documentation for each data source integration:

* :strong:`X` in the :strong:`Provides metrics` column indicates that the integration sends metrics to Observability Cloud
* :strong:`X` in the :strong:`Provides spans` column indicates that the integration sends spans to Observability Cloud
* :strong:`X` in the :strong:`Provides logs` column indicates that the integration sends logs to Observability Cloud


.. list-table::
   :header-rows: 1
   :widths: 50 16 16 16
   :class: monitor-table

   * - :strong:`Data source`
     - :strong:`Provides metrics`
     - :strong:`Provides spans`
     - :strong:`Provides logs`

   * - :ref:`Amazon Web Services (AWS) <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`AWS Elastic Load Balancing <get-started-aws>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Amazon API Gateway <get-started-aws>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`AWS AppMesh Envoy Proxy <appmesh>`
     - :strong:`X`
     - :strong:`X`
     -

   * - :ref:`AWS Auto Scaling <get-started-aws>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`AWS CloudFront <get-started-aws>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Amazon CloudWatch Events <get-started-aws>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Amazon DynamoDB <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon Elastic Block Store <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon EC2 <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon EC2 Container Service (ECS) <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon Elastic Kubernetes Services (EKS) <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon ElastiCache <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`AWS Elastic Load Balancing (Classic Load Balancers) <get-started-aws>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Amazon Kinesis <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon Kinesis Analytics <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon Kinesis Streams <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`AWS Lambda<wrapper-ingest>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`AWS Compute Optimizer <get-started-aws>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Amazon Relational Database Service <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon Redshift <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon Route 53 <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon Simple Notification Service <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Amazon Simple Queue Service <get-started-aws>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Apache web server <apache>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Application instrumentation <get-started-application>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`ASP.NET <asp-dot-net>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Microsoft Azure <get-started-azure>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Azure App Service <get-started-azure>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Azure Batch <get-started-azure>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Azure Event Hubs <get-started-azure>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Azure Functions <get-started-azure>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Azure Kubernetes Service <get-started-azure>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Azure Logic apps <get-started-azure>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Azure Redis Cache <get-started-azure>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Azure SQL Database <get-started-azure>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Azure SQL Elastic Pools <get-started-azure>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Azure Storage <get-started-azure>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Azure Virtual Machines <get-started-azure>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Azure Virtual Machine Scale Sets <get-started-azure>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`Chronyd NTP <chrony>`
     - :strong:`X`
     -
     -

   * - :ref:`Cassandra <cassandra>`
     - :strong:`X`
     -
     -

   * - :ref:`Consul datastore <consul>`
     - :strong:`X`
     -
     -

   * - :ref:`Conviva Real-Time/Live video play <conviva>`
     - :strong:`X`
     -
     -

   * - :ref:`Couchbase server <couchbase>`
     - :strong:`X`
     -
     -

   * - :ref:`CouchDB <couchdb>`
     - :strong:`X`
     -
     -

   * - :ref:`CPU <cpu>`
     - :strong:`X`
     -
     -

   * - :ref:`Disk and partition <disk>`
     - :strong:`X`
     -
     -

   * - :ref:`Docker API server container <docker>`
     - :strong:`X`
     -
     -

   * - :ref:`Elasticsearch <elasticsearch>`
     - :strong:`X`
     -
     -

   * - :ref:`etcd server <etcd>`
     - :strong:`X`
     -
     -

   * - :ref:`expvar <expvar>`
     - :strong:`X`
     -
     -

   * - :ref:`Free disk space <filesystems>`
     - :strong:`X`
     -
     -

   * - :ref:`Generic JMX <genericjmx>`
     - :strong:`X`
     -
     -


   * - :ref:`GitLab performance <gitlab>`
     - :strong:`X`
     -
     -

   * - :ref:`Google Cloud Platform (GCP) <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP App Engine <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP BigQuery <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP Cloud Bigtable <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP Cloud Datastore <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP Cloud Functions <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP Cloud Pub/Sub <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP Cloud Router <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP Cloud Spanner <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP Cloud Storage <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP Compute Engine <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - :ref:`GCP Kubernetes Engine (GKE) <get-started-gcp>`
     - :strong:`X`
     -
     - :strong:`X`

   * - `SignalFx Tracing Library for Go <https://github.com/signalfx/signalfx-go-tracing/blob/main/README.md>`_
     -
     - :strong:`X`
     -

   * - :ref:`Hadoop <hadoop>`
     - :strong:`X`
     -
     -

   * - :ref:`HAProxy <haproxy>`
     - :strong:`X`
     -
     -

   * - :ref:`Health Checker <health-checker>`
     -
     -
     -

   * - :ref:`Host metadata properties <host-metadata>`
     -
     -
     -

   * - :ref:`Host process <processes>`
     - :strong:`X`
     -
     -

   * - :ref:`Host process list <processlist>`
     -
     -
     -

   * - :ref:`Host process load <load>`
     - :strong:`X`
     -
     -

   * - :ref:`Interface traffic <interface>`
     - :strong:`X`
     -
     -

   * - :ref:`Java <get-started-java>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Kafka <kafka>`
     - :strong:`X`
     -
     -

   * - :ref:`Jenkins <jenkins>`
     - :strong:`X`
     -
     -

   * - :ref:`JMX <jmx>`
     - :strong:`X`
     -
     -


   * - :ref:`Kong <kong>`
     - :strong:`X`
     -
     -
   * - :ref:`Kubernetes instance in a cloud service <get-started-k8s>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`


   * - :ref:`Kubernetes controller manager <kube-controller-manager>`
     -
     -
     -

   * - :ref:`Kubernetes API server <kubernetes-apiserver>`
     - :strong:`X`
     -
     -

   * - :ref:`Kubernetes cluster <kubernetes-cluster>`
     - :strong:`X`
     -
     -


   * - :ref:`Kubernetes network stats <kubelet-stats>`
     - :strong:`X`
     -
     -

   * - :ref:`Linux host data <get-started-linux>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Microsoft .NET core and framework <dotnet>`
     -
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Microsoft .NET runtime <get-started-dotnet>`
     - :strong:`X`
     -
     -


   * - :ref:`Mesos Marathon <marathon>`
     - :strong:`X`
     -
     -

   * - :ref:`Memcached <memcached>`
     - :strong:`X`
     -
     -

   * - :ref:`Memory usage <memory>`
     - :strong:`X`
     -
     -


   * - :ref:`Microsoft Windows IIS <windows-iis>`
     - :strong:`X`
     -
     -

   * - :ref:`Microsoft SQL Server <microsoft-sql-server>`
     - :strong:`X`
     -
     -

   * - :ref:`MongoDB Atlas cluster <mongodb-atlas>`
     - :strong:`X`
     -
     -

   * - :ref:`MySQL <mysql>`
     - :strong:`X`
     -
     -

   * - :ref:`Network interface I/O <net-io>`
     - :strong:`X`
     -
     -

   * - :ref:`NGINX <nginx>`
     - :strong:`X`
     -
     -

   * - :ref:`Node.js language <get-started-nodejs>`
     -
     - :strong:`X`
     -

   * - :ref:`OpenStack <openstack>`
     - :strong:`X`
     -
     -

   * - :ref:`PHP language <get-started-php>` 
     -
     - :strong:`X`
     -


   * - :ref:`PostgreSQL <postgresql>`
     - :strong:`X`
     -
     -

   * - :ref:`procstat <procstat>`
     - :strong:`X`
     -
     -

   * - :ref:`Prometheus Exporter <prometheus-exporter>`
     - :strong:`X`
     -
     -

   * - :ref:`Prometheus Node Exporter <prometheus-node>`
     - :strong:`X`
     -
     -

   * - :ref:`Python language <get-started-python>`
     -
     - :strong:`X`
     -

   * - :ref:`Network protocols <protocols>`
     - :strong:`X`
     -
     -

   * - :ref:`RabbitMQ <rabbitmq>`
     - :strong:`X`
     -
     -

   * - :ref:`Redis <redis>`
     - :strong:`X`
     -
     -

   * - :ref:`Ruby language <get-started-ruby>`
     -
     - :strong:`X`
     -


   * - :ref:`SNMP agent <snmp>`
     - :strong:`X`
     -
     -

   * - :ref:`SolrCloud <solr>`
     - :strong:`X`
     -
     -

   * - :ref:`Spark Cluster <spark>`
     - :strong:`X`
     -
     -

   * - :ref:`statsd <statsd>`
     - :strong:`X`
     -
     -

   * - :ref:`Traefik <traefik>`
     - :strong:`X`
     -
     -

   * - :ref:`Microsoft Windows host <get-started-windows>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Apache Zookeeper <zookeeper>`
     - :strong:`X`
     -
     -

.. toctree::
   :maxdepth: 3
   :hidden:

   apache/apache
   activemq/activemq
   appmesh/appmesh
   asp-dot-net/asp-dot-net
   cassandra/cassandra
   chrony/chrony
   consul/consul
   conviva/conviva
   couchbase/couchbase
   couchdb/couchdb
   cpu/cpu
   disk/disk
   docker/docker
   dotnet/dotnet
   elasticsearch/elasticsearch
   etcd/etcd
   expvar/expvar
   filesystems/filesystems
   genericjmx/genericjmx
   gitlab/gitlab
   hadoop/hadoop
   haproxy/haproxy
   health-checker/health-checker
   host-metadata/host-metadata
   interface/interface
   jenkins/jenkins
   jmx/jmx
   kafka/kafka
   kong/kong
   kube-controller-manager/kube-controller-manager
   kubelet-stats/kubelet-stats
   kubernetes-apiserver/kubernetes-apiserver
   kubernetes-cluster/kubernetes-cluster
   load/load
   marathon/marathon
   memcached/memcached
   memory/memory
   windows-iis/windows-iis
   microsoft-sql-server/microsoft-sql-server
   mongodb-atlas/mongodb-atlas
   mongodb/mongodb
   mysql/mysql
   net-io/net-io
   nginx/nginx
   openstack/openstack
   postgresql/postgresql
   processes/processes
   processlist/processlist
   procstat/procstat
   prometheus-exporter/prometheus-exporter
   prometheus-node/prometheus-node
   protocols/protocols
   rabbitmq/rabbitmq
   redis/redis
   snmp/snmp
   solr/solr
   spark/spark
   statsd/statsd
   traefik/traefik
   vsphere/vsphere
   zookeeper/zookeeper
