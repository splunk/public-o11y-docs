.. _mongodb-receiver:

***********************
MongoDB receiver
***********************

.. meta::
      :description: The MongoDB receiver fetches stats from a MongoDB instance using the golang mongo driver. 

The MongoDB receiver fetches metrics from standalone MongoDB clusters, including non-Atlas managed MongoDB Servers. The supported pipeline types is ``metrics``. See :ref:`otel-data-processing` for more information. 

Stats are collected via MongoDB's ``dbStats`` and ``serverStatus`` commands. 

The receiver uses the golang mongo driver. See more at :new-page:`Mongo Go driver documentation <https://github.com/mongodb/mongo-go-driver>`.


The purpose of this receiver is to allow users to monitor metrics from standalone MongoDB clusters. This 
This receiver supports MongoDB versions 4.0+ and 5.0. 

Mongodb recommends to set up a least privilege user (LPU) with a clusterMonitor role in order to collect metrics. Please refer to lpu.sh for an example of how to configure these permissions.


Feature gate configurations
See the Collector feature gates for an overview of feature gates in the collector.

BETA: receiver.mongodb.removeDatabaseAttr

The feature gate receiver.mongodb.removeDatabaseAttr is enabled by default but may be disabled. Unless disabled, it will remove the database name attribute from data points because it is already found on the resource. This feature gate will eventually be removed.




Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the MongoDB Atlas receiver as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the MongoDB receiver, add ``mongodb`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    mongodb:
      hosts:
        - endpoint: localhost:27017
          transport: tcp
      username: otel
      password: ${env:MONGODB_PASSWORD}
      collection_interval: 60s
      initial_delay: 1s
      tls:
        insecure: true
        insecure_skip_verify: true

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [mongodb]

Configuration options
--------------------------------------------

The following settings are optional:

* hosts (default: [localhost:27017]): list of host:port or unix domain socket endpoints.
* For standalone MongoDB deployments this is the hostname and port of the mongod instance
* For replica sets specify the hostnames and ports of the mongod instances that are in the replica set configuration. If the replica_set field is specified, nodes will be autodiscovered.
* For a sharded MongoDB deployment, please specify a list of the mongos hosts.
* username: If authentication is required, the user can with clusterMonitor permissions can be provided here.
* password: If authentication is required, the password can be provided here.
* collection_interval: (default = 1m): This receiver collects metrics on an interval. This value must be a string readable by Golang's time.ParseDuration. Valid time units are ns, us (or µs), ms, s, m, h.
* initial_delay (default = 1s): defines how long this receiver waits before starting.
* replica_set: If the deployment of MongoDB is a replica set then this allows users to specify the replica set name which allows for autodiscovery of other nodes in the replica set.
timeout: (default = 1m) The timeout of running commands against mongo.
tls: (defaults defined here): TLS control. By default insecure settings are rejected and certificate verification is on.

Settings
======================

The following table shows the configuration options for the MongoDB receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/mongodb.yaml"></div>

Metrics
=====================

The following metric are available with versions:

* ``mongodb.extent.count`` < 4.4 with mmapv1 storage engine
* ``mongodb.session.count`` >= 3.0 with wiredTiger storage engine
* ``mongodb.cache.operations`` >= 3.0 with wiredTiger storage engine
* ``mongodb.connection.count`` with attribute ``active`` is available >= 4.0
* ``mongodb.index.access.count`` >= 4.0

The following metrics, resource attributes, and attributes are available.

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/mongodbreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst