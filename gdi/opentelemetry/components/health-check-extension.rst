.. _health-check-extension:

****************************
Health Check extension
****************************

.. meta::
      :description: Use the Health Check extension to activate an HTTP URL that can be probed to check the status of the OpenTelemetry Collector. You can also use this extension as a liveness or readiness probe on Kubernetes.

The ``health_check`` extension allows you to enable an HTTP URL that can be probed to check the status of the OpenTelemetry Collector. This extension can be used as a liveness or readiness probe on Kubernetes.

Get started
======================

.. note:: 
  
  This component is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information. 
  
  For details about the default configuration, see :ref:`otel-configuration-ootb`. You can customize your configuration any time as explained in this document.

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``basicauth`` extension as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the component, add ``health_check`` to the ``extensions`` section of your configuration file:

.. code-block:: yaml

  extensions:
    health_check:

To complete the configuration, include the extension in the ``service`` section of your configuration file:

.. code:: yaml

  service:
    extensions: [health_check]

The following settings are required to configure the extension:

* ``endpoint``. Address to publish the health check status. ``0.0.0.0:13133`` by default. 
* ``path``. Path to be configured for the health check server. ``"/"`` by default. 
* ``response_body``. The static body that overrides the default response returned by the health check service. ``""`` by default. 
* ``enabled``. Whether to enable the Collector pipeline check or not. ``false`` by default. 
* ``interval``. Time interval to check the number of failures. ``5m`` by default. 
* ``exporter_failure_threshold``. The failure number threshold to mark containers as healthy. ``5`` by default. 

Configuration examples
--------------------------------

This is a basic configuration example for the extension:

.. code-block:: yaml

  extensions:
    health_check:
    health_check/1:
      endpoint: "localhost:13"
      tls:
        ca_file: "/path/to/ca.crt"
        cert_file: "/path/to/cert.crt"
        key_file: "/path/to/key.key"
      path: "/health/status"
      check_collector_pipeline:
        enabled: true
        interval: "5m"
        exporter_failure_threshold: 5

Detailed sample configuration
--------------------------------

This is a detailed configuration example:

.. code-block:: yaml

  health_check:
  health_check/1:
    endpoint: "localhost:13"
    tls:
      ca_file: "/path/to/ca"
      key_file: "/path/to/key"
      cert_file: "/path/to/cert"
    check_collector_pipeline:
      enabled: false
      interval: "5m"
      exporter_failure_threshold: 5
  health_check/missingendpoint:
    endpoint: ""
    check_collector_pipeline:
      enabled: false
      interval: "5m"
      exporter_failure_threshold: 5
  health_check/invalidthreshold:
    endpoint: "localhost:13"
    check_collector_pipeline:
      enabled: false
      interval: "5m"
      exporter_failure_threshold: -1
  health_check/invalidpath:
    endpoint: "localhost:13"
    path: "invalid"
    check_collector_pipeline:
      enabled: false
      interval: "5m"
      exporter_failure_threshold: 5        

Check the Collector's pipelines
-----------------------------------------

Optionally, you can use the configuration parameter ``check_collector_pipeline`` to enable Health Check for the Collector pipelines. If activated, you can monitor the number of times that components failed to send data to their destination. 

Note that it only supports exporter failures, but not receivers or processors.

Settings
======================

The following table shows the configuration options for the ``health_check`` extension:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/extension/health_check.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
