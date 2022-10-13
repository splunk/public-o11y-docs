.. _otel-exposed-endpoints:

******************************************
Exposed ports and endpoints
******************************************

.. meta::
      :description: Exposed ports and endpoints.


By default, the Collector exposes several endpoints. Endpoints are either exposed locally or publicly:

* Locally (``localhost``): Within the service
* Publicly (``0.0.0.0``): On all network interfaces

The endpoints exposed depend on which mode the Collector is configured in. You can disable components, especially receivers, if they are not required for an environment.

Check ports to make sure your environment doesn't have conflicts and that firewalls are configured properly. Ports can be changed in the configuration YAML file.

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
    - The :ref:`Jaeger receiver <https://docs.splunk.com/Observability/gdi/jaeger-grpc/jaeger-grpc.html>` supporting Thrift and gRPC protocols
  * - ``http(s)://localhost:55679/debug/[tracez|pipelinez]``
    - zPages extension for component diagnostics
  * - ``http(s)://0.0.0.0:[4317|4318]``
    - OTLP receiver via gRPC and http
  * - ``http(s)://0.0.0.0:6060``
    - HTTP forwarder used to receive Smart Agent ``apiUrl`` data
  * - ``http(s)://0.0.0.0:7276``
    - SAPM trace receiver
  * - ``http://localhost:8888/metrics``
    - Internal Prometheus metrics
  * - ``http(s)://localhost:8006``
    - Fluent forward receiver
  * - ``http(s)://0.0.0.0:9080``
    - Smart Agent receiver with SignalFx Forwarder monitor type
  * - ``http(s)://0.0.0.0:9411/api/[v1|v2]/spans``
    - Zipkin receiver supporting V1 and V2
  * - ``http(s)://0.0.0.0:9943``
    - SignalFx receiver supporting metrics and events

For more information, see the :new-page:`agent <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/agent_config.yaml>` and :new-page:`gateway <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/gateway_config.yaml>` configuration files.