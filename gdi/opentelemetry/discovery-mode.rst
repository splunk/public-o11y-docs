.. _discovery_mode:

***************************************************************************
Automatic discovery and instrumentation
***************************************************************************

.. meta::
      :description: Use automatic discovery and automatic instrumentation with the Splunk Distribution of OpenTelemetry Collector to collect metrics and traces automatically and easily get started with Splunk Application Performance Monitoring and Splunk Infrastructure Monitoring.

.. toctree::
   :hidden:

   Kubernetes <automatic-discovery/discovery-kubernetes>
   Linux <automatic-discovery/discovery-linux>
   Windows <automatic-discovery/discovery-windows>

Use automatic discovery and configuration alongside automatic instrumentation with the Splunk Distribution of the OpenTelemetry Collector to automatically collect metrics and traces. 

Automatic discovery and configuration detects and collects signal data from third-party services, such as databases and web servers, whereas automatic instrumentation collects signal data from application language runtimes without having to modify the source application code. Together, automatic discovery and automatic instrumentation help you quickly get started with Splunk Application Performance Monitoring (APM) and Splunk Infrastructure Monitoring. To learn about automatic instrumentation, see :ref:`get-started-application`.

The following diagram shows the process of using automatic discovery and automatic instrumentation to find data sources:

.. mermaid::
   
   flowchart LR

      accTitle: Automatic discovery and configuration process diagram
      accDescr: Step one. Connect to your cloud environment. Step two. Ensure the OpenTelemetry Collector is running. Step three. Run your application.

      X["Connect to your \n cloud environment"]

      Y["Deploy the Splunk Distribution \n of OpenTelemetry Collector \n in your environment"]

      Z["Run your application"]
      
      X --> Y --> Z

Automatic discovery can detect several types of data sources on the host or Kubernetes cluster, such as databases and web servers. To do so, the Collector generates a configuration that you can modify and adopt, or incorporate automatically into your existing configuration.

Using automatic instrumentation, you can automatically instrument your back-end applications written in Java, Node.js, and .NET without any additional installation or configuration steps. With automatic instrumentation, you can quickly get started with Splunk APM.

.. note::

   When deploying automatic instrumentation using automatic discovery, only Java, Node.js, and .NET are supported. If you deploy automatic instrumentation independently of the Collector, Splunk Observability Cloud supports automatic instrumentation for eight back-end language runtimes. For more information, see :ref:`get-started-application`.

The main advantage of using automatic discovery and automatic instrumentation is that you don't need to manually configure the Splunk Distribution of the OpenTelemetry Collector.

.. raw:: html
  
  <h2>Supported host services and applications for automatic discovery</h2>

Automatic discovery for third-party applications is supported for Linux and Kubernetes.

To get started with automatic discovery for third-party applications, see the instructions corresponding to your environment:

* Linux: :ref:`linux-third-party`
* Kubernetes: :ref:`k8s-third-party`

Automatic discovery supports the following host services and applications:

.. list-table::
   :width: 100%
   :widths: 30 70
   :header-rows: 1

   * - Service
     - Receiver

   * - MySQL
     - MySQL receiver. See :ref:`mysql-receiver`

   * - PostgreSQL
     - PostgreSQL receiver. See :ref:`postgresql-receiver`

   * - OracleDB
     - Oracle DB receiver. See :ref:`oracledb`

   * - NGINX
     - Smart Agent with collectd/nginx monitor type. See :ref:`nginx`

   * - Redis
     - Redis receiver. See :ref:`redis-receiver`

   * - MongoDB
     - MongoDB receiver. See :ref:`mongodb-receiver`

   * - Kafka
     - Kafka metrics receiver. See :ref:`kafkametrics-receiver`

   * - Microsoft SQL Server
     - Microsoft SQL Server receiver. See :ref:`mssql-server-receiver`

.. raw:: html

  <h2>Supported language runtimes for automatic instrumentation</h2>

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