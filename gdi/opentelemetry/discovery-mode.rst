.. _discovery_mode:

***************************************************************************
Discover and configure metrics sources automatically
***************************************************************************

.. meta::
      :description: Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and collect metrics automatically.

Use the automatic discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and create
a configuration based on the results.

Automatic discovery can detect several types of metric sources on the host, such as language runtimes, databases, and servers. With this information, the Collector generates configuration you can modify and adopt, or incorporate into your exiting configuration automatically by default.

The main advantage of using automatic discovery is that you don't need to manually update the OpenTelemetry Collector configuration for supported metric sources. This is helpful in environments when you deploy and activate host services dynamically or when adding a new supported target database to your infrastructure.

.. note:: Update the Collector to version 0.94.0 and higher to activate automatic service discovery.

.. toctree::
   :hidden:

   Kubernetes <automatic-discovery/discovery-kubernetes>
   Linux <automatic-discovery/discovery-linux>
   Windows <automatic-discovery/discovery-windows>
   Advanced configuration <automatic-discovery/advanced-config-auto-instrumentation>

.. raw:: html
  
  <h2>How automatic discovery works</h2>

When you run the Collector with automatic discvoery, it tests built-in configurations for supported metric receivers against endpoints discovered on your platform by observer extensions. This happens before starting the Collector service.

For any dynamically instantiated receiver that retrieves metrics matching the success criteria, the Collector translates the discovery configuration to a receiver creator instance with the known working rules, as well as the required observer extension. See :ref:`receiver-creator-receiver` for more information. At the same time, the Collector adds the configuration to the ``metrics`` pipeline at runtime.

For any receiver that can establish a connection with a service, but not receive the expected metrics, discovery mode suggests which properties to set, or what extensions or settings to configure on the service to successfully retrieve telemetry. You can define any target-specific configuration values that are required, for example authentication information, using discovery properties to tune the discovery process.

When running in Kubernetes, discovery mode tests bundled metric receiver configurations against the endpoints discovered by the ``k8s_observer`` observer. Successfully discovered instances are then incorporated in the existing service configuration.

.. raw:: html

  <h2>Supported language runtimes</h2>

The following table shows the supported platforms and language runtimes:

.. list-table::
   :header-rows: 1
   :width: 60%
   :widths: 15 15 15 15

   * - Application/language
     - Supported for Linux
     - Supported for Windows
     - Supported for Kubernetes
   * - Java
     - Yes
     - No
     - Yes
   * - .NET
     - No
     - Yes
     - Yes
   * - Node.js
     - Yes
     - No
     - Yes


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



