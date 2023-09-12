.. _health-check-extension:

****************************
Health check extension
****************************

.. meta::
      :description: Use the Health Check extension to activate an HTTP URL that can be probed to check the status of the OpenTelemetry Collector. You can also use this extension as a liveness or readiness probe on Kubernetes.

The ``health_check`` extension

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``health_check`` extension as described in the next section.
3. Restart the Collector.

Sample configurations
--------------------------------------------





Settings
======================

The following table shows the configuration options for the ``health_check`` extension:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/extension/health_check.yaml"></div>



Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
