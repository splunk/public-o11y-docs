.. _fluentd-receiver:

*************************
Fluent Forward receiver
*************************

.. meta::
      :description: The Fluent Forward receiver allows the Splunk Distribution of OpenTelemetry Collector to collect logs and events using the Fluent Forward protocol.

The Fluent Forward receiver allows the Splunk Distribution of OpenTelemetry Collector to collect events using the bundled Fluentd application. The supported pipeline type is ``logs``. See :ref:`otel-data-processing` for more information.

The receiver accepts data formatted as Fluent Forward events through a TCP connection. All three Fluent event types, message, forward, and packed forward, are supported, including compressed packed forward.

.. note:: Fluentd is bundled in the Splunk Distribution of OpenTelemetry Collector.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the Fluent Forward receiver in the ``logs`` pipeline when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information.

The default configuration of the ``fluentforward`` receiver in the Splunk Distribution of OpenTelemetry Collector is the following:

.. code-block:: yaml

   receivers:
     fluentforward:
       endpoint: 127.0.0.1:8006

   service:
     pipelines:
       logs:
         receivers: [fluentforward, otlp]
         processors:
         - memory_limiter
         - batch
         - resourcedetection

For more information on how to install Fluentd when manually installing the Collector, see:

* :ref:`fluentd-manual-config-linux`
* :ref:`fluentd-manual-config-windows`
* :ref:`windows-manual-fluentd`

Settings
======================

The following table shows the configuration options for the Fluent Forward receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/fluentforward.yaml"></div>

Troubleshooting
======================

For troubleshooting Fluentd, see:

* :ref:`fluentd-collector-troubleshooting`.
* :ref:`otel-linux-uninstall-both-otel-and-tdagent`

.. caution:: If you don't have a Log Observer entitlement or don't wish to collect logs for the target host, use the ``--without-fluentd`` option to skip the installation of Fluentd when installing the Collector.
