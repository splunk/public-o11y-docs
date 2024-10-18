.. _signalfx-gateway-prometheus-remote-write-receiver:

***************************************************************************
SignalFx Gateway Prometheus remote write receiver
***************************************************************************

.. meta::
      :description: The SignalFx Gateway Prometheus remote write receiver is the OTel native version of the SignalFx Prometheus remote write gateway.

The SignalFx Gateway Prometheus remote write receiver is the OTel native version of the SignalFx Prometheus remote-write gateway. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the receiver:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
  
  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the receiver as described in this doc.
3. Restart the Collector.  

Default configuration
----------------------

To use the ``signalfxgatewayprometheusremotewritereceiver`` receiver in the Splunk Distribution of the OpenTelemetry Collector, add the following to your config file:

.. code-block:: yaml

  receivers:
    signalfxgatewayprometheusremotewritereceiver:

To complete the configuration, include the receiver in the required pipeline of the ``service`` section of your configuration file. For example:

.. code-block:: yaml

  service:
    pipelines:
      metrics:
        receivers: [signalfxgatewayprometheusremotewritereceiver]

Advanced configuration
--------------------------------------------

This receiver is configured through standard OpenTelemetry mechanisms. See :new-page:`Collector config go <https://github.com/signalfx/splunk-otel-collector/blob/main/internal/receiver/signalfxgatewayprometheusremotewritereceiver/config.go>` for more details.

You can configure the following parameters:

* ``path``. ``/metrics`` by default. The path in which the receiver responds to Prometheus' remote-write requests. 

* ``buffer_size``. ``100`` by default. Buffer for metric translations without blocking further write requests.  

  * Use the Collector's ``confighttp`` options to set up TLS and other features. See more at :new-page:`Collector config http <https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/confighttp/confighttp.go#L206>`.

* ``endpoint``. ``localhost:19291`` by default. Interface and port the receiver listens to. 

Known limitations
======================

This receiver replicates the near-exact behavior of the SignalFx Prometheus remote-write gateway, with a few differences. 

Differences with the Prometheus Remote-Write specification
---------------------------------------------------------------------------------------

This behavior differs from the Prometheus remote-write specification version 1 in the following ways:

* This receiver doesn't remove suffixes, as this is performed by the :ref:`prometheus-receiver`.

* This receiver transforms histograms into counters.

* This receiver transforms quantiles (summaries) into gauges.

* If the representation of a float can be expressed as an integer without loss, the receiver sets the representation of a float as an integer.

* If the representation of a sample is NaN, the receiver reports an additional counter with the metric name ``prometheus.total_NAN_sample``.

* If the representation of a sample is missing a metric name, the receiver reports an additional counter with the metric name ``prometheus.total_bad_datapoints``.

* Any errors in parsing the request report an additional counter, ``prometheus.invalid_request``.

* Metadata from ``prompb.WriteRequest`` is ignored. 
  
Unsupported behavior from the SignalFx gateway
-------------------------------------------------

The following behavior from SignalFx Gateway is not supported:

* ``request_time.ns`` is no longer reported. ``obsreport`` handles similar functionality.

* ``drain_size`` is no longer reported. ``obsreport`` handles similar functionality.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst