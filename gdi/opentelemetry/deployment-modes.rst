.. _otel-deployment-mode:

**********************************
Deployment modes
**********************************

.. meta::
      :description: The Splunk Distribution of OpenTelemetry Collector provides a single binary and two deployment methods. Both deployment methods can be configured using a default configuration.

The Collector provides a single binary and two deployment modes, Agent mode or Gateway mode.

.. _collector-agent-mode:

Agent mode
===============

In Agent mode, the Collector runs with the application or on the same host as the application, and send data directly to Splunk Observability Cloud. Use Agent mode when you want to do these things:

* Configure instrumentation. Agent mode offloads responsibilities from the application including batching, queuing, and retrying.
* Collect host and application metrics, as well as host and application metadata enrichment for metrics, spans, and logs.

See :new-page:`Agent mode configuration <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/agent_config.yaml>` for the default configuration file.

.. _collector-gateway-mode:

Gateway mode
==================

Use Gateway mode when one or more Collectors are running as a standalone service, for example in containers. Gateway mode is typically deployed per cluster, data center, or region. You can configure the Collector in Agent mode or the serverless instrumentaiton to send data to the Collector running in Gateway mode. 

Use Gateway mode when you want to do one of the following:

* Configure a larger buffer.
* Configure an increased wait interval for retry attempts.
* Limit the number of egress points required to send data.
* Consolidate API token management.

See :new-page:`Gateway mode configuration <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/gateway_config.yaml>` for the default configuration file.

.. note:: To forward metrics and metadata in Gateway mode, see :ref:`collector-gateway-metrics-issue`.

.. _collector-agent-to-gateway:

Send data from Agent to Gateway
============================================

You can configure the Collector to send data to the another Collector in Gateway mode.

Agent configuration
-------------------------

Change the following sections of the :new-page:`Agent mode configuration file <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/agent_config.yaml>`:

* Update the ``SPLUNK_GATEWAY_URL`` environment variable to the URL of the Gateway.
* Update the ``SPLUNK_GATEWAY_URL`` environment variable to the URL of the Gateway. 
* Update the ``SPLUNK_API_URL`` environment variable to the URL of the Gateway, specifying the ingress port, which is ``6060`` by default.
* Update the ``SPLUNK_INGEST_URL`` environment variable to the URL of the Gateway, specifying the ingress port, which is ``9943`` by default.
* Make sure that metrics, traces, and logs pipelines send data to the appropriate receivers on the Gateway.

To enable trace correlation, use the ``signalfx`` exporter in the traces pipeline. All other pipelines between the Agent and the Gateway can use the ``otlp`` exporter, which is more efficient.

.. note:: If you are using the ``otlp`` exporter for metrics, the ``hostmetrics`` aggregation takes place in the Gateway.

The following example shows how to configure the Collector in Agent mode when sending data to a Gateway:

.. code-block:: yaml

   receivers:
      hostmetrics:
         collection_interval: 10s
         scrapers:
            cpu:
            disk:
            filesystem:
            memory:
            network:
   # More receivers

   processors:
      resourcedetection:
         detectors: [system,env,gce,ec2]
         override: true
      resource/add_environment:
         attributes:
            - action: insert
               value: staging
               key: deployment.environment
   # More processors

   exporters:
      # Traces
      otlp:
         endpoint: "${SPLUNK_GATEWAY_URL}:4317"
         insecure: true
      # Metrics, events, and APM correlation calls
      signalfx:
         access_token: "${SPLUNK_ACCESS_TOKEN}"
         api_url: "http://${SPLUNK_GATEWAY_URL}:6060"
         ingest_url: "http://${SPLUNK_GATEWAY_URL}:9943"
         sync_host_metadata: true
         correlation:
   # More exporters

   service:
      extensions: [health_check, http_forwarder, zpages]
      pipelines:
         traces:
            receivers: [jaeger, zipkin]
            processors: [memory_limiter, batch, resourcedetection, resource/add_environment]
            exporters: [otlp, signalfx]
         metrics:
            receivers: [hostmetrics]
            processors: [memory_limiter, batch, resourcedetection]
            exporters: [otlp]
         metrics/internal:
            receivers: [prometheus/internal]
            processors: [memory_limiter, batch, resourcedetection]
            exporters: [signalfx]
      # More pipelines

Gateway configuration
-------------------------

Change the following sections of the :new-page:`Gateway mode configuration file <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/gateway_config.yaml>`:

* Make sure that the receivers match the exporters in the Agent configuration.
* Make sure that the Collector in Gateway mode can listen to requests on ports 6060 and 9943.
* Update the ``SPLUNK_GATEWAY_URL`` environment variable to ``https://api.${SPLUNK_REALM}.signalfx.com``.

The following example shows how to configure the Collector in Gateway mode when receiving data from an Agent:

.. code-block:: yaml

   extensions:
      http_forwarder:
         egress:
            endpoint: "https://api.${SPLUNK_REALM}.signalfx.com"
   # More extensions

   receivers:
      otlp:
         protocols:
            grpc:
            http:
      signalfx:
   # More receivers

   exporters:
      # Traces
      sapm:
         access_token: "${SPLUNK_ACCESS_TOKEN}"
         endpoint: "https://ingest.${SPLUNK_REALM}.signalfx.com/v2/trace"
      # Metrics + Events (Agent)
      signalfx:
         access_token: "${SPLUNK_ACCESS_TOKEN}"
         realm: "${SPLUNK_REALM}"
      # Metrics + Events (Gateway)
      signalfx/internal:
         access_token: "${SPLUNK_ACCESS_TOKEN}"
         realm: "${SPLUNK_REALM}"
         sync_host_metadata: true
   # More exporters

   service:
      extensions: [http_forwarder]
      pipelines:
         traces:
            receivers: [otlp]
            processors:
            - memory_limiter
            - batch
            exporters: [sapm]
         metrics:
            receivers: [otlp]
            processors: [memory_limiter, batch]
            exporters: [signalfx]
         metrics/internal:
            receivers: [prometheus/internal]
            processors: [memory_limiter, batch, resourcedetection/internal]
            exporters: [signalfx/internal]
      # More pipelines

If you want to use the ``signalfx`` exporter for metrics on both Agent and Gateway, disable the aggregation at the Gateway. To do so, set the ``translation_rules`` and ``exclude_metrics`` to empty lists as in the following example.

.. note:: If you want to collect host metrics from the Gateway, use a different ``signalfx exporter`` with translation rules intact. For example, add the ``hostmetrics`` to the metrics/internal pipeline.

.. code-block:: yaml
   :emphasize-lines: 10,11

   exporters:
      # Traces
      sapm:
         access_token: "${SPLUNK_ACCESS_TOKEN}"
         endpoint: "https://ingest.${SPLUNK_REALM}.signalfx.com/v2/trace"
      # Metrics + Events (Agent)
      signalfx:
         access_token: "${SPLUNK_ACCESS_TOKEN}"
         realm: "${SPLUNK_REALM}"
         translation_rules: []
         exclude_metrics: []
      # Metrics + Events (Gateway)
      signalfx/internal:
         access_token: "${SPLUNK_ACCESS_TOKEN}"
         realm: "${SPLUNK_REALM}"
         sync_host_metadata: true

   service:
      extensions: [http_forwarder]
      pipelines:
         traces:
            receivers: [otlp]
            processors:
            - memory_limiter
            - batch
            exporters: [sapm]
         metrics:
            receivers: [signalfx]
            processors: [memory_limiter, batch]
            exporters: [signalfx]
         metrics/internal:
            receivers: [prometheus/internal]
            processors: [memory_limiter, batch, resourcedetection/internal]
            exporters: [signalfx/internal]