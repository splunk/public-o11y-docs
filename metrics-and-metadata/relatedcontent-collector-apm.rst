.. _relatedcontent-collector-apm:
.. _get-started-enablerelatedcontent:

***********************************************************************************
Configure the Collector to enable Related Content for Infra and APM
***********************************************************************************

.. meta::
  :description: Configue the Collector to enable Related Content for APM.

The default configuration of the Splunk Distribution of the OpenTelemetry Collector automatically configures Related Content for you. If you're using a custom configuration, read on.

For an introduction to Related Content, see :ref:`get-started-relatedcontent`.

Configure the Collector in host monitoring (agent) mode to enable Related Content 
==========================================================================================================

To view your infrastructure data in the APM service dashboards, you need to enable certain components in the OpenTelemetry Collector. To learn more, see :ref:`otel-components` and :ref:`otel-data-processing`.

Collector configuration in host monitoring mode
-----------------------------------------------------------------

These are the configuration details required:

``hostmetrics`` receiver
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Enable ``cpu``, ``memory``, ``filesystem`` and ``network`` to collect their metrics.  

To learn more, see :ref:`host-metrics-receiver`.

``signalfx`` exporter
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The SignalFx exporter aggregates the metrics from the ``hostmetrics`` receiver. It also sends metrics such as ``cpu.utilization``, which are referenced in the relevant APM service charts.

To learn more, see :ref:`signalfx-exporter`.

Correlation flag 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, correlation is activated, utilizing standard SignalFx exporter configurations. This setup enables the Collector to execute relvant API calls, thereby linking your spans with the associated infrastructure metrics.

The SignalFx exporter must be enabled for both the metrics and traces pipelines. To adjust the correlation option further, see the SignalFx exporter's options at :ref:`signalfx-exporter-settings`.

``resourcedetection`` processor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This processor enables a unique ``host.name`` value to be set for metrics and traces. The ``host.name`` is determined by either the EC2 host name or the system host name.

Use the following configuration:

* Use the cloud provider or the :ref:`environment variable <collector-env-var>` to set ``host.name``
* Enable ``override`` 

To learn more, see :ref:`resourcedetection-processor`.

``resource/add_environment`` processor (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The APM charts require the environment span tag to be set correctly. 

To set this span tag you have two options:

* Configure the span tag in the instrumentation
* Use this processor to inserts a ``deployment.environment`` span tag to all spans 

To learn more, see :ref:`resourcedetection-processor`.

Example
-----------------------------------------------------------------

Here are the relevant config snippets from each section:

.. code-block::

  receivers:
    hostmetrics:
      collection_interval: 10s
      scrapers:
        cpu:
        disk:
        filesystem:
        memory:
        network:

  processors:
    resourcedetection:
      detectors: [system,env,gcp,ec2]
      override: true
    resource/add_environment:
      attributes:
        - action: insert
          value: staging
          key: deployment.environment

  exporters:
    # Traces
    sapm:
      access_token: "${SPLUNK_ACCESS_TOKEN}"
      endpoint: "${SPLUNK_TRACE_URL}"
    # Metrics + Events + APM correlation calls
    signalfx:
      access_token: "${SPLUNK_ACCESS_TOKEN}"
      api_url: "${SPLUNK_API_URL}"
      ingest_url: "${SPLUNK_INGEST_URL}"

  service:
    extensions: [health_check, http_forwarder, zpages]
    pipelines:
      traces:
        receivers: [jaeger, zipkin]
        processors: [memory_limiter, batch, resourcedetection, resource/add_environment]
        exporters: [sapm, signalfx]
      metrics:
        receivers: [hostmetrics]
        processors: [memory_limiter, batch, resourcedetection]
        exporters: [signalfx]

Configure the Collector to enable Related Content from host monitoring (agent) mode to data forwarding (gateway) mode 
============================================================================================================================

If you need to run the Opentelemetry Collector in both host monitoring (agent) and data forwarding (gateway) modes, refer to the following sections.

For more information, see :ref:`otel-deployment-mode`.

Configure the agent
-----------------------------------------------------------------

Follow the same steps as mentioned in the previous section and include the following changes:

``http_forwarder`` extension
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``http_forwarder`` listens on port ``6060`` and sends all the REST API calls directly to Splunk Observability Cloud. 

If your agent cannot talk to the Splunk SaaS backend directly, use the ``egress`` endpoint to change to the URL of the gateway. 

``signalfx`` exporter
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. caution:: You must send the REST API calls, required for trace correlation, via the SignalFx exporter in the ``traces`` pipeline. 

If you want, you can also use the exporter for metrics, although it's best to use the OTLP exporter. See :ref:`enablerelatedcontent-otlp` for more details.

Use the following configuration:

* Set the ``api_url`` endpoint to the URL of the gateway. Specify the ingress port of the ``http_forwarder`` of the gateway, which is ``6060`` by default.
* Set the ``ingest_url`` endpoint to the URL of the gateway. Specify the ingress port of the ``signalfx`` receiver of the gateway, which is ``9943`` by default.

All pipelines
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Send all metrics, traces and logs pipelines to the appropriate receivers on the gateway.

.. _enablerelatedcontent-otlp:

``otlp exporter`` (optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Using the OTLP exporter is optional, but recommended for the majority of your traffic from the agent to the gateway. Since all data gets converted to ``otlp`` upon receival, the OTLP exporter is the most efficient way to send data to the gateway. Use the SignalFx exporter only to make REST API calls in the traces pipeline. 

The OTLP exporter uses the ``grpc`` protocol, so the endpoint must be defined as the IP address of the gateway. 

.. note:: If you are using the OTLP exporter for metrics, the ``hostmetrics`` aggregation must be performed at the gateway. 

To learn more, see :ref:`otlp-exporter`.

Example
-----------------------------------------------------------------

Here are the relevant config snippets from each section:

.. code-block::

  receivers:
    hostmetrics:
      collection_interval: 10s
      scrapers:
        cpu:
        disk:
        filesystem:
        memory:
        network:

  processors:
    resourcedetection:
      detectors: [system,env,gcp,ec2]
      override: true
    resource/add_environment:
      attributes:
        - action: insert
          value: staging
          key: deployment.environment

  exporters:
    # Traces
    otlp:
      endpoint: "${SPLUNK_GATEWAY_URL}:4317"
      tls:
        insecure: true
    # Metrics + Events + APM correlation calls
    signalfx:
      access_token: "${SPLUNK_ACCESS_TOKEN}"
      api_url: "http://${SPLUNK_GATEWAY_URL}:6060"
      ingest_url: "http://${SPLUNK_GATEWAY_URL}:9943"

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

Configure the gateway
-----------------------------------------------------------------

In gateway mode, the relevant receivers to match the exporters from the Agent. In addition, you need to make the following changes.

``http_forwarder`` extension
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``http_forwarder`` listens on port ``6060`` and sends all the REST API calls directly to Splunk Observability Cloud. 

In Gateway mode, set the ``egress`` endpoint to the Splunk Observability Cloud SaaS endpoint.

``signalfx`` exporter
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Set both the ``translation_rules`` and ``exclude_metrics`` flags to their default value, and thus can be commented out or simply removed. This ensures that the ``hostmetrics`` aggregations that are normally performed by the SignalFx exporter on the agent are performed by the SignalFx exporter on the gateway instead.

Example
-----------------------------------------------------------------

Here are the relevant config snippets from each section:

.. code-block::

  extensions:
    http_forwarder:
      egress:
        endpoint: "https://api.${SPLUNK_REALM}.signalfx.com"

  receivers:
    otlp:
      protocols:
        grpc:
        http:
    signalfx:

  exporters:
    # Traces
    sapm:
      access_token: "${SPLUNK_ACCESS_TOKEN}"
      endpoint: "https://ingest.${SPLUNK_REALM}.signalfx.com/v2/trace"
    # Metrics + Events
    signalfx:
      access_token: "${SPLUNK_ACCESS_TOKEN}"
      realm: "${SPLUNK_REALM}"

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

Use the SignalFx exporter on both Collector modes
============================================================================================================================

Alternatively, if you want to use the SignalFx exporter for metrics on both host monitoring (agent) and data forwarding (gateway) modes, you need to disable the aggregation at the gateway. To do so, you must set the ``translation_rules`` and ``exclude_metrics`` to empty lists.

Example
-----------------------------------------------------------------

Configure the agent in gateway mode as follows:

.. code-block::

  exporters:
    # Traces
    sapm:
      access_token: "${SPLUNK_ACCESS_TOKEN}"
      endpoint: "https://ingest.${SPLUNK_REALM}.signalfx.com/v2/trace"
    # Metrics + Events
    signalfx:
      access_token: "${SPLUNK_ACCESS_TOKEN}"
      realm: "${SPLUNK_REALM}"
      translation_rules: []
      exclude_metrics: []

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