.. _otel-exposed-endpoints:

******************************************
Exposed ports and endpoints
******************************************

.. meta::
      :description: Exposed ports and endpoints of the Splunk Distribution of OpenTelemetry Collector.

By default, the Collector exposes several endpoints. The components providing these endpoints will attempt to listen on loopback (localhost) or all interfaces (0.0.0.0), as detailed in this document.

The endpoints exposed depend on which mode the Collector is configured in. You can deactivate components, especially receivers, if they are not required for an environment.

Check ports to make sure your environment doesn't have conflicts and that firewalls are configured properly. Ports can be changed in the YAML configuration file.

See the table for a complete list of exposed ports and endpoints:

.. list-table::
  :widths: 50 50
  :width: 100
  :header-rows: 1

  * - <protocol>:<address>:<port>/<endpoint>
    - Description
  * - ``http(s)://0.0.0.0:13133/``
    - Health check extension useful for collector status reporting
  * - ``http(s)://0.0.0.0:[6831|6832|14250|14268]/api/traces``
    - The :new-page:`Jaeger receiver <https://docs.splunk.com/Observability/gdi/jaeger-grpc/jaeger-grpc.html>` supporting Thrift and gRPC protocols
  * - ``http(s)://localhost:55679/debug/[tracez|pipelinez]``
    - zPages extension for component diagnostics
  * - ``http(s)://0.0.0.0:[4317|4318]``
    - OTLP receiver using gRPC and http
  * - ``http(s)://0.0.0.0:6060``
    - :new-page:`HTTP forwarder <https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/httpforwarder>` used to receive Smart Agent ``apiUrl`` data
  * - ``http(s)://0.0.0.0:7276``
    - SAPM trace receiver
  * - ``http://localhost:8888/metrics``
    - :new-page:`Internal Prometheus metrics <https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/monitoring.md>` 
  * - ``http(s)://localhost:8006``
    - Fluent forward receiver
  * - ``http(s)://0.0.0.0:9080``
    - Smart Agent receiver with :new-page:`SignalFx Forwarder <https://docs.splunk.com/Observability/gdi/signalfx-forwarder/signalfx-forwarder.html>` monitor type
  * - ``http(s)://0.0.0.0:9411/api/[v1|v2]/spans``
    - Zipkin receiver supporting V1 and V2
  * - ``http(s)://0.0.0.0:9943``
    - SignalFx receiver supporting metrics and events

For more information, see the :new-page:`agent <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/agent_config.yaml>` and :new-page:`gateway <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/gateway_config.yaml>` configuration files.