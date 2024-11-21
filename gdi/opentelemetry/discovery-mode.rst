.. _discovery_mode:

***************************************************************************
Automatic discovery and zero-code instrumentation
***************************************************************************

.. meta::
      :description: Use automatic discovery and zero-code instrumentation with the Splunk Distribution of the OpenTelemetry Collector to collect metrics and traces automatically and send them to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Kubernetes <automatic-discovery/discovery-kubernetes>
   Linux <automatic-discovery/discovery-linux>
   Windows <automatic-discovery/discovery-windows>

The Splunk Distribution of the OpenTelemetry Collector can automatically identify data sources and collect metrics and traces to send them to Splunk Observability Cloud. With automatic discovery and zero-code instrumentation you don't need to manually configure the Splunk Distribution of the OpenTelemetry Collector: 

* Automatic discovery detects and collects signal data from third-party services, such as databases and web servers. To do so, the Collector automatically generates a configuration snipet that you can modify and incorporate into your existing configuration.

* Automatic discovery also incorporates zero-code instrumentation, which allows the Collector to retrieve data from application language runtimes without having to modify the source application code or adding any new installation or configuration steps. To learn about zero-code instrumentation, see :ref:`get-started-application`.

The following diagram shows how automatic discovery and zero-code instrumentation find data sources:

.. mermaid::
   
   flowchart LR

      accTitle: Automatic discovery and configuration process diagram
      accDescr: Step one. Connect to your cloud environment. Step two. Ensure the OpenTelemetry Collector is running. Step three. Run your application.

      X["Connect to your \n cloud environment"]

      Y["Deploy the Splunk Distribution \n of the OpenTelemetry Collector \n in your environment"]

      Z["Run your application"]
      
      X --> Y --> Z


.. caution:: 
  
  Zero-code instrumentation using the Collector's automatic discovery feature is only available for Java, Node.js, and .NET applications. 
  
  If deployed independently of the Collector, zero-code instrumentation is supported for 8 back-end language runtimes. For more information, see :ref:`get-started-application`.

.. raw:: html
  
  <h2>Supported host services and applications for automatic discovery</h2>

Automatic discovery for third-party applications is supported for Linux and Kubernetes. See the instructions corresponding to your environment:

* Linux: :ref:`linux-third-party`
* Kubernetes: :ref:`k8s-third-party`

Automatic discovery supports the following host services and applications:

.. list-table::
   :width: 100%
   :widths: 30 70
   :header-rows: 1

   * - Service
     - Receiver

   * - Apache Web Server
     - Apache Web Server receiver. See :ref:`apache-receiver`.

   * - MySQL
     - MySQL receiver. See :ref:`mysql-receiver`

   * - PostgreSQL
     - PostgreSQL receiver. See :ref:`postgresql-receiver`

   * - OracleDB
     - Oracle DB receiver. See :ref:`oracledb`

   * - NGINX
     - Smart Agent with collectd/nginx monitor type. See :ref:`nginx`

   * - RabbitMQ
     - RabbitMQ receiver. See :ref:`rabbitmq-receiver`.

   * - Redis
     - Redis receiver. See :ref:`redis-receiver`

   * - MongoDB
     - MongoDB receiver. See :ref:`mongodb-receiver`

   * - Kafka
     - Kafka metrics receiver. See :ref:`kafkametrics-receiver`

   * - Microsoft SQL Server
     - Microsoft SQL Server receiver. See :ref:`mssql-server-receiver`

.. raw:: html

  <h2>Supported language runtimes for zero-code instrumentation</h2>

The following table shows the platforms that support each language runtime:

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 25 25 25 25

   * - Application language
     - Supported for Linux
     - Supported for Windows
     - Supported for Kubernetes
   * - Java
     - Yes. See :ref:`linux-backend-auto-discovery`
     - No
     - Yes. See :ref:`k8s-backend-auto-discovery`
   * - .NET
     - Yes. See :ref:`linux-backend-auto-discovery`
     - Yes. See :ref:`windows-backend-auto-discovery`
     - Yes. See :ref:`k8s-backend-auto-discovery`
   * - Node.js
     - Yes. See :ref:`linux-backend-auto-discovery`
     - No
     - Yes. See :ref:`k8s-backend-auto-discovery`