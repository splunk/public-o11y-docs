.. _discovery_mode:

***************************************************************************
Discover and configure metrics sources automatically
***************************************************************************

.. meta::
      :description: Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and collect metrics automatically.

.. toctree::
   :hidden:

   Kubernetes <automatic-discovery/discovery-kubernetes>
   Linux <automatic-discovery/discovery-linux>
   Windows <automatic-discovery/discovery-windows>

Use the automatic discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and create
a configuration based on the results.

Automatic discovery can detect several types of metric sources on the host, such as language runtimes, databases, and servers. With this information, the Collector generates configuration you can modify and adopt, or incorporate into your exiting configuration automatically by default.

The main advantage of using automatic discovery is that you don't need to manually update the OpenTelemetry Collector configuration for supported metric sources. This is helpful in environments when you deploy and activate host services dynamically or when adding a new supported target database to your infrastructure.

.. raw:: html

  <h2>Supported language runtimes</h2>

The following table shows the platforms that support each language runtime:

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 70

   * - Language runtime
     - Platforms
   * - Java
     - * :ref:`Linux <linux-backend-auto-discovery>`
       * :ref:`Kubernetes <k8s-backend-auto-discovery>`
   * - .NET
     - * :ref:`Kubernetes <k8s-backend-auto-discovery>`
       * :ref:`Windows <windows-backend-auto-discovery>`
   * - Node.js
     - * :ref:`Linux <linux-backend-auto-discovery>`
       * :ref:`Kubernetes <k8s-backend-auto-discovery>`

.. raw:: html
  
  <h2>Supported host services and applications</h2>

Automatic discovery for third-party applications is supported for Linux and Kubernetes.

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



