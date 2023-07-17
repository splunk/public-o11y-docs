.. _signalfx-receiver:

*************************
SignalFx receiver
*************************

.. meta::
      :description: The SignalFx receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics and logs in SignalFx proto format.

The SignalFx receiver is a native OTel component that allows the Splunk Distribution of OpenTelemetry Collector to collect metrics and logs in SignalFx proto format. Supported pipeline types are ``metrics`` and ``logs``. See :ref:`otel-data-processing` for more information.

For more information on the SignalFx proto format, see :new-page:`Send Traces, Metrics, and Events <https://dev.splunk.com/observability/reference/api/ingest_data/latest>` in the Splunk Developer Program documentation.

.. note:: While the SignalFx Smart Agent has reached End of Support, OTel native components such as the Smart Agent receiver, the SignalFx receiver, and the SignalFx exporter are available and supported. For information on the exporter, see :ref:`signalfx-exporter`.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the SignalFx receiver in the ``metrics`` and ``logs/signalfx`` pipelines when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information.

.. caution:: Don't remove the ``signalfx`` receiver from the default configuration. If you need to change its settings, use the existing receiver or create a separate receiver configuration.

Sample configurations
----------------------

The default configuration of the ``signalfx`` receiver in the Splunk Distribution of OpenTelemetry Collector is the following:

.. code-block:: yaml

   receivers:
     signalfx:
       endpoint: 0.0.0.0:9943
       # Whether to preserve incoming access token and
       #  use instead of exporter token. Default value is false.
       #access_token_passthrough: true

When adding the SignalFx receiver, configure both the metrics and logs pipelines. Make sure to also add the SignalFx exporter as in the following example:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [signalfx]
         processors: [memory_limiter, batch]
         exporters: [signalfx]
         logs:
       receivers: [signalfx]
         processors: [memory_limiter, batch]
         exporters: [signalfx]

Settings
======================

The following table shows the configuration options for the SignalFx receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/signalfx.yaml"></div>

.. caution:: If you use the ``access_token_passthrough`` setting with any exporter other than the SignalFx exporter, the receiver might reveal all organization access tokens. Only use the SignalFx receiver with the SignalFx exporter when activating this setting.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst