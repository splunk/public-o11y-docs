.. _signalfx-receiver:

*************************
SignalFx receiver
*************************

.. meta::
      :description: The SignalFx receiver allows the Splunk Distribution of the OpenTelemetry Collector to collect metrics and logs in SignalFx proto format.

The SignalFx receiver is a native OpenTelemetry component that allows the Splunk Distribution of the OpenTelemetry Collector to collect data in SignalFx proto format. Supported pipeline types are ``metrics`` and ``logs``. See :ref:`otel-data-processing` for more information.

.. note:: While the SignalFx Smart Agent has reached End of Support, OTel native components such as the Smart Agent receiver, the SignalFx receiver, and the SignalFx exporter are available and supported. For information on the exporter, see :ref:`signalfx-exporter`.

The SignalFx receiver accepts:

* Metrics in the SignalFx proto format. For more information, see :new-page:`SignalFx metrics protobuf <https://github.com/signalfx/com_signalfx_metrics_protobuf>`.
* Events (logs) in the SignalFx proto format. For more information, see :new-page:`Send Traces, Metrics, and Events <https://dev.splunk.com/observability/reference/api/ingest_data/latest>` in the Splunk Developer Program documentation.

Get started
======================

.. note:: 
  
  This component is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector in the ``metrics`` and ``logs/signalfx`` pipelines when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information. 
  
  For details about the default configuration, see :ref:`otel-kubernetes-config`, :ref:`linux-config-ootb`, or :ref:`windows-config-ootb`. You can customize your configuration any time as explained in this document.

Follow these steps to configure and activate the receiver:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
  
  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the receiver as described in this doc.
3. Restart the Collector.  

Default configuration
----------------------

.. caution:: Don't remove the ``signalfx`` receiver from the default configuration. If you need to change its settings, use the existing receiver or create a separate receiver configuration.

To use the ``signalfx`` receiver in the Splunk Distribution of the OpenTelemetry Collector, add the following to your config file:

.. code-block:: yaml

  receivers:
    signalfx:
      endpoint: 0.0.0.0:9943
      # Whether to preserve incoming access token and
      # use instead of exporter token. Default value is false.
      # access_token_passthrough: true

Next, configure both the metrics and logs pipelines. Make sure to also add the SignalFx exporter as in the following example:

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

Sample configuration
--------------------------------------------

This is a sample config for the SignalFx receiver:

.. code-block:: yaml

  signalfx:
  signalfx/allsettings:
    # endpoint specifies the network interface and port which will receive
    # SignalFx metrics.
    endpoint: localhost:9943
    access_token_passthrough: true
  signalfx/tls:
    tls:
      cert_file: /test.crt
      key_file: /test.key

Settings
======================

The following table shows the configuration options for the SignalFx receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/signalfx.yaml"></div>

.. caution:: If you use the ``access_token_passthrough`` setting with any exporter other than the SignalFx exporter, the receiver might reveal all organization access tokens. If you activate this setting, you must use the SignalFx receiver with the SignalFx exporter.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst