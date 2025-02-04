.. _discovery_mode:

***************************************************************************
Automatic discovery of apps and services
***************************************************************************

.. meta::
      :description: Use automatic discovery and zero-code instrumentation with the Splunk Distribution of the OpenTelemetry Collector to collect metrics and traces automatically and send them to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Kubernetes <automatic-discovery/discovery-kubernetes>
   Linux <automatic-discovery/discovery-linux>
   Windows <automatic-discovery/discovery-windows>

The Splunk Distribution of the OpenTelemetry Collector can automatically identify data sources and collect metrics and traces to send them to Splunk Observability Cloud. With automatic discovery and zero-code instrumentation you don't need to manually configure the Splunk Distribution of the OpenTelemetry Collector or your applications before deploying them. 

The following diagram shows how automatic discovery finds data sources:

.. mermaid::
   
   flowchart LR

      accTitle: Automatic discovery and configuration process diagram
      accDescr: Step one. Connect to your cloud environment. Step two. Ensure the OpenTelemetry Collector is running. Step three. Run your application.

      X["Connect to your \n cloud environment"]

      Y["Deploy the Splunk Distribution \n of the OpenTelemetry Collector \n in your environment"]

      Z["Run your application"]
      
      X --> Y --> Z



.. raw:: html

   <div class="include-start" id="gdi/auto-discovery-intro.rst"></div>

.. include:: /_includes/gdi/auto-discovery-intro.rst

.. raw:: html

   <div class="include-stop" id="gdi/auto-discovery-intro.rst"></div>




.. raw:: html
  
  <h2>Supported host services and applications for automatic discovery</h2>

.. note:: If you're in a Kubernetes environment and are using the Collector version 0.109.0 or higher, log in to Splunk Observability Cloud and go to the :guilabel:`Discovered entities` tab in the :guilabel:`Data Management` menu to see which of your services and third-party applications the Collector has detected and can monitor automatically.   

Automatic discovery of third-party applications is supported in Linux and Kubernetes environments for the following services:

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
     - NGINX receiver. See :ref:`nginx-receiver`

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

Read more:

* Linux: :ref:`linux-third-party`
* Kubernetes: :ref:`k8s-third-party`

.. raw:: html

  <h2>Supported language runtimes for zero-code instrumentation</h2>

Zero-code instrumentation via the Collector's automatic discovery is available for the following languages:

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
