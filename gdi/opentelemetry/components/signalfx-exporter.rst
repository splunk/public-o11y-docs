.. _signalfx-exporter:

*************************
SignalFx exporter
*************************

.. meta::
      :description: The SignalFx exporter allows the OpenTelemetry Collector to send traces, logs, and metrics to SignalFx endpoints. Read on to learn how to configure the component.

The SignalFx exporter allows the OpenTelemetry Collector to send metrics and events to SignalFx endpoints. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

.. note:: For information on the receiver, see :ref:`signalfx-receiver`.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the SignalFx exporter in the ``traces``, ``metrics``, and ``logs/signalfx`` pipelines when deploying in agent mode. See :ref:`otel-deployment-mode` for more information.

Sample configurations
----------------------

The following example shows the default configuration of SignalFx exporter for metrics and events ingest, as well as trace and metrics correlation:

.. code-block:: yaml

   # Metrics + Events
   signalfx:
     access_token: "${SPLUNK_ACCESS_TOKEN}"
     api_url: "${SPLUNK_API_URL}"
     ingest_url: "${SPLUNK_INGEST_URL}"
     # Use instead when sending to gateway (http forwarder extension ingress endpoint)
     #api_url: http://${SPLUNK_GATEWAY_URL}:6060
     #ingest_url: http://${SPLUNK_GATEWAY_URL}:9943
     sync_host_metadata: true
     correlation:

When adding the SignalFx exporter, configure both the metrics and logs pipelines. Make sure to also add the SignalFx receiver as in the following example:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [signalfx]
         processors: [memory_limiter, batch, resourcedetection]
         exporters: [signalfx]
       logs:
         receivers: [signalfx]
         processors: [memory_limiter, batch, resourcedetection]
         exporters: [signalfx]

Settings
======================

The following table shows the configuration options for the SignalFx exporter:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/signalfx.yaml"></div>

.. caution:: Use the ``access_token_passthrough`` setting if you're using a SignalFx receiver with the same setting. Only use the SignalFx receiver with the SignalFx exporter when activating this setting.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
