.. _signalfx-receiver:

*************************
SignalFx receiver
*************************

.. meta::
      :description: The SignalFx receiver allows the Splunk Distribution of OpenTelemetry Collector to collect logs and events using the SignalFx protocol.

The SignalFx receiver allows the Splunk Distribution of OpenTelemetry Collector to collect events using the bundled Fluentd application. The supported pipeline type is ``logs``. See :ref:`otel-data-processing` for more information.

The receiver accepts data formatted as SignalFx events through a TCP connection. All three Fluent event types, message, forward, and packed forward, are supported, including compressed packed forward.

.. note:: Fluentd is bundled in the Splunk Distribution of OpenTelemetry Collector.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the SignalFx receiver in the ``logs`` pipeline when deploying in agent mode. See :ref:`otel-deployment-mode` for more information.

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

Settings
======================

The following table shows the configuration options for the SignalFx receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/fluentforward.yaml"></div>

Troubleshooting
======================

For troubleshooting Fluentd, see:

* :ref:`fluentd-collector-troubleshooting`.
* :ref:`otel-linux-uninstall-both-otel-and-tdagent`