.. _fluentd-receiver:

*************************
Fluent Forward receiver
*************************

.. meta::
      :description: The Fluent Forward receiver allows the Splunk Distribution of OpenTelemetry Collector to collect logs and events using the Fluent Forward protocol.

.. caution:: ``fluentd``` will be deprecated in October 2025. In Kubernetes environments use native OpenTelemetry log collection instead. In Linux and Windows platforms use the Universal Forwarder. See :ref:otel-config-logs`.

The Fluent Forward receiver allows the Splunk Distribution of the OpenTelemetry Collector to collect events using the bundled Fluentd application. The supported pipeline type is ``logs``. See :ref:`otel-data-processing` for more information.

The receiver accepts data formatted as Fluent Forward events through a TCP connection. All three Fluent event types, message, forward, and packed forward, are supported, including compressed packed forward.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next document.
3. Restart the Collector.

Next, add the Fluent Forward receiver in the ``logs`` pipeline:

.. code-block:: yaml

  receivers:
    fluentforward:
      endpoint: 127.0.0.1:8006

  service:
    pipelines:
      logs:
        receivers: [fluentforward]

Settings
======================

The following table shows the configuration options for the Fluent Forward receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/fluentforward.yaml"></div>

Troubleshooting
======================

.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>