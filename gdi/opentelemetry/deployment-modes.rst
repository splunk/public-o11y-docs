.. _otel-deployment-mode:

**********************************
Collector deployment modes
**********************************

.. meta::
      :description: The Splunk Distribution of OpenTelemetry Collector provides a single binary and two deployment methods. Both deployment methods can be configured using a default configuration.

The Collector has two deployment modes: :ref:`host monitoring (agent) mode <collector-agent-mode>`, and :ref:`data forwarding (gateway) mode <collector-gateway-mode>`.

.. _collector-agent-mode:

Host monitoring (agent) mode  
======================================================================

In host monitoring (agent) mode, the Collector runs with the application or on the same host as the application, and sends data directly to Splunk Observability Cloud. 

Use the host monitoring (agent) mode when you want to do these things:

* Configure instrumentation. Host monitoring (agent) mode offloads responsibilities from the application including batching, queuing, and retrying.
* Collect host and application metrics, as well as host and application metadata enrichment for metrics, spans, and logs.

Standalone host monitoring (agent) mode 
--------------------------------------------------------------------

If deployed as a standalone agent, the Splunk Distribution of OpenTelemetry Collector is the only component deployed and configured. 

The following image shows the architecture for the standalone mode:

.. image:: /_images/gdi/splunk-otel-collector-standalone-arch.png 
   :alt: This image shows the architecture for the standalone host monitoring (agent) mode.   

Host monitoring (agent) mode deployed with the installer script or Helm chart
--------------------------------------------------------------------------------------

The default configurations for the :ref:`Linux installer script <otel-install-linux>`, :ref:`Windows installer script <otel-install-windows>`, and for certain :ref:`Helm charts <otel-install-k8s>` deploy the Collector with Fluentd.

The architecure looks as follows:

.. image:: /_images/gdi/splunk-otel-collector-recommended-arch.png
   :alt: This image shows the architecture for Helm chart and installer script deployments. 

.. _collector-gateway-mode:

Data forwarding (gateway) mode
======================================================================

Use this mode when one or more Collectors are running as a standalone service, for example in containers. Data forwarding (gateway) mode is typically deployed per cluster, data center, or region. 

Use data forwarding (gateway) mode when you want to do one of the following:

* Configure a larger buffer.
* Configure an increased wait interval for retry attempts.
* Limit the number of egress points required to send data.
* Consolidate API token management.

See :new-page:`data forwarding (gateway) mode configuration <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/gateway_config.yaml>` for the default configuration file.

.. note:: To forward metrics and metadata in data forwarding (gateway) mode, see :ref:`collector-gateway-metrics-issue`.

The following image shows the architecture for the data forwarding (gateway) mode:

.. image:: /_images/gdi/splunk-otel-collector-recommended-gateway-arch.png
   :alt: This image shows the architecture for the advanced mode.    

.. _collector-current-mode:

What mode is my Collector deployed as? How can I change it?
======================================================================

If you install the Collector using the :ref:`provided scripts <otel-install-platform>`, the Collector is deployed in the mode specified in your configuration file. 

Linux and Windows
----------------------------------

For Windows and Linux installers, the default configuration yaml sets the Collector as an agent.

The path to the configuration yaml is set in the env variable ``SPLUNK_CONFIG`` and is, by default:

* Linux: ``/etc/otel/collector/<gateway or agent>_config.yaml``
* Windows: ``C:\ProgramData\Splunk\OpenTelemetry Collector\<gateway or agent>_config.yaml``

To change the deployment mode, modify ``SPLUNK_CONFIG`` for the path to the gateway configuration yaml file instead. See :ref:`collector-gateway-mode` for details on the data forwarding (gateway) mode yaml.

Kubernetes
----------------------------------

For Kubernetes, check the config mappings in your Helm chart. See :ref:`otel-kubernetes-config-advanced` for information on how to access your configuration yaml, and how to override it.

.. _collector-agent-to-gateway:

Send data from an agent Collector to a gateway Collector
======================================================================

When running as an agent, you can also manually configure the Collector to send data to a Splunk Distribution of OpenTelemetry Collector gateway instance or cluster. This requires changing the :ref:`pipeline exporters <otel-data-processing>` in the agent to point to the gateway.

To configure the Collector to send data to the another Collector in data forwarding (gateway) mode, see these configurations:

Agent configuration
----------------------------------

Change the following sections of the :new-page:`host monitoring (agent) mode configuration file <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/agent_config.yaml>`:

* Update the ``SPLUNK_GATEWAY_URL`` environment variable to the URL of the gateway.
* Update the ``SPLUNK_API_URL`` environment variable to the URL of the gateway, specifying the ingress port, which is ``6060`` by default.
* Update the ``SPLUNK_INGEST_URL`` environment variable to the URL of the gateway, specifying the ingress port, which is ``9943`` by default.
* Make sure that metrics, traces, and logs pipelines send data to the appropriate receivers on the gateway.

To activate trace correlation, use the ``signalfx`` exporter in the traces pipeline. All other pipelines between the agent and the gateway can use the ``otlp`` exporter, which is more efficient.

.. note:: If you are using the ``otlp`` exporter for metrics, the ``hostmetrics`` aggregation takes place in the gateway.

The following example shows how to configure the Collector in host monitoring (agent) mode when sending data to a gateway:

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
----------------------------------

Change the following sections of the :new-page:`data forwarding (gateway) mode configuration file <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/gateway_config.yaml>`:

* Make sure that the receivers match the exporters in the agent configuration.
* Make sure that the Collector in data forwarding (gateway) mode can listen to requests on ports 6060 and 9943.
* Update the ``SPLUNK_GATEWAY_URL`` environment variable to ``https://api.${SPLUNK_REALM}.signalfx.com``.

To set the Collector in data forwarding (gateway) mode to receiving data from an agent, use the following configuration:

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

Send metrics with the SignalFx exporter
--------------------------------------------

If you want to use the :ref:`signalfx-exporter` for metrics on both agent and gateway, deactivate the aggregation at the Gateway. To do so, set the ``translation_rules`` and ``exclude_metrics`` to empty lists as in the following example.

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
