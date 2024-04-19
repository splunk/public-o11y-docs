.. _discovery_mode:

***************************************************************************
Discover metric sources automatically
***************************************************************************

.. meta::
      :description: Use automatic discovery and configuration with the Splunk Distribution of OpenTelemetry Collector to collect metrics and traces automatically and easily get started with Splunk Application Performance Monitoring and Splunk Infrastructure Monitoring.

.. toctree::
   :hidden:

   Kubernetes <automatic-discovery/discovery-kubernetes>
   Linux <automatic-discovery/discovery-linux>
   Windows <automatic-discovery/discovery-windows>

Use automatic discovery and configuration (formerly Zero Configuration Automatic Instrumentation) with the Splunk Distribution of OpenTelemetry Collector to collect metrics and traces automatically. 

Automatic discovery and configuration helps you quickly get started with Splunk Application Performance Monitoring (APM) and Splunk Infrastructure Monitoring.

The following diagram shows the process of using automatic discovery and configuration to find data sources:

.. mermaid::
   
   flowchart LR

      accTitle: Automatic discovery and configuration process diagram
      accDescr: Step one. Connect to your cloud environment. Step two. Ensure the OpenTelemetry Collector is running. Step three. Run your application.

      X["Connect to your \n cloud environment"]

      Y["Deploy the Splunk Distribution \n of OpenTelemetry Collector \n in your environment"]

      Z["Run your application"]
      
      X --> Y --> Z
      \n

Automatic discovery and configuration can detect several types of data sources on the host or Kubernetes cluster, such as language runtimes, databases, and web servers. 

Using this capability, you can automatically instrument your back-end applications such as Java or .NET without any additional installation or configuration steps. With automatic discovery, you can quickly get started with Splunk APM. 

For third-party applications such as databases and web servers, the Collector generates configuration you can modify and adopt, or incorporate into your existing configuration automatically by default.

The main advantage of using automatic discovery is that you don't need to manually instrument applications or manually configure the Splunk Distribution of OpenTelemetry Collector. 

.. raw:: html

  <h2>Supported language runtimes</h2>

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
     - No
     - Yes. See :ref:`windows-backend-auto-discovery`
     - Yes. See :ref:`k8s-backend-auto-discovery`
   * - Node.js
     - Yes. See :ref:`linux-backend-auto-discovery`
     - No
     - Yes. See :ref:`k8s-backend-auto-discovery`

.. raw:: html
  
  <h2>Supported host services and applications</h2>

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
     - MySQL receiver. See :ref:`mysql-receiver`.

   * - PostgreSQL
     - PostgreSQL receiver. See :ref:`postgresql-receiver`.

   * - OracleDB
     - Oracle DB receiver. See :ref:`oracledb`.

   * - NGINX
     - Smart Agent with collectd/nginx monitor type. See :ref:`nginx`.

   * - Redis
     - Redis receiver. See :ref:`redis-receiver`.



