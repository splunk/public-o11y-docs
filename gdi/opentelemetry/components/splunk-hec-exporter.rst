.. _splunk-hec-exporter:

*************************
Splunk HEC exporter
*************************

.. meta::
      :description: The Splunk HEC exporter allows the OpenTelemetry Collector to send traces, logs, and metrics to Splunk HTTP Event Collector (HEC) endpoints. Read on to learn how to configure the component.

The Splunk HTTP Event Collector (HEC) exporter allows the OpenTelemetry Collector to send traces, logs, and metrics to Splunk HEC endpoints. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

The main purpose of the Splunk HEC exporter is to send logs and metrics to Splunk Cloud Platform or Splunk Enterprise. Log Observer Connect is now used to pull the Splunk Cloud Platform and Splunk Enterprise indexes into Splunk Observability Cloud. See :ref:`lo-connect-landing` for more information.

The exporter also sends AlwaysOn Profiling data to Splunk Observability Cloud. For more information, see :ref:`get-data-in-profiling`.

For information about the HEC receiver, see :ref:`splunk-hec-receiver`.

.. caution:: Splunk Log Observer is no longer available for new users. You can continue to use Log Observer if you already have an entitlement.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the Splunk HEC exporter in the ``logs`` pipeline when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information.

Starting from version 0.81 of the Splunk Distribution of OpenTelemetry Collector, the default configuration includes an exporter for AlwaysOn Profiling data that is separate from the standard logs exporter. See :ref:`exclude-log-data`.

.. note:: To send Splunk HEC data through a proxy, configure proxy settings as environment variables. See :ref:`configure-proxy-collector` for more information.

Sample configurations
----------------------

The following example shows a Splunk HEC exporter instance configured for a logs pipeline in the Collector configuration file:

.. code-block:: yaml

   exporters:
     # ...
     splunk_hec:
       token: "<hec-token>"
       endpoint: "<hec-endpoint>"
       # Source. See https://docs.splunk.com/Splexicon:Source
       source: "otel"
       # Source type. See https://docs.splunk.com/Splexicon:Sourcetype
       sourcetype: "otel"

   # ...
   
   service:
     # ...
     pipelines:
       logs:
         receivers: [fluentforward, otlp]
         processors:
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [splunk_hec]

The Splunk HEC exporter requires a Splunk HEC token and endpoint. Obtaining a HEC token and choosing a HEC endpoint depends on the target. The following table shows endpoints and instructions for each back end. Use the ``source`` and ``sourcetype`` fields options when sending logs to Splunk Cloud Platform or Splunk Enterprise.

.. list-table::
   :header-rows: 1
   :widths: 20 40 40
   :width: 100%

   * - Back end
     - Endpoint
     - Tokens
   * - Splunk Cloud Platform
     - See :new-page:`Send data to HTTP Event Collector on Splunk Cloud Platform <https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector#Send_data_to_HTTP_Event_Collector_on_Splunk_Cloud_Platform>`
     - See :new-page:`Manage HTTP Event Collector (HEC) tokens in Splunk Cloud Platform <https://docs.splunk.com/Documentation/SplunkCloud/latest/Config/ManageHECtokens>`
   * - Splunk Enterprise
     - See :new-page:`Send data to HTTP Event Collector on Splunk Enterprise <https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector#Send_data_to_HTTP_Event_Collector_on_Splunk_Enterprise>`
     - See :new-page:`Create an Event Collector token on Splunk Enterprise <https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector#Create_an_Event_Collector_token_on_Splunk_Enterprise>`
   * - Splunk Observability Cloud
     - See :ref:`admin-org-tokens`.
     - ``https://ingest.<realm>.signalfx.com/v1/log``, where ``<realm>`` is the Splunk Observability Cloud realm, for example ``us0``.

In the ingest endpoint URL, ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

#. Open the navigation menu in Splunk Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section.

.. _send_logs_to_splunk:

Send logs to Splunk Cloud Platform or Splunk Enterprise
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you're using the Collector for log collection and need to send data to Splunk Cloud Platform or Splunk Enterprise, configure the ``splunk_hec`` exporter to use your Splunk ``endpoint`` and ``token``. For example:

.. code-block:: yaml

   exporters:
      splunk_hec:
         # Splunk HTTP Event Collector token.
         token: "00000000-0000-0000-0000-0000000000000"
         # URL to a Splunk instance to send data to.
         endpoint: "https://splunk:8088/services/collector"
         # Optional Splunk source: https://docs.splunk.com/Splexicon:Source
         source: "otel"
         # Optional Splunk source type: https://docs.splunk.com/Splexicon:Sourcetype
         sourcetype: "otel"
         # Splunk index, optional name of the Splunk index targeted.
         index: "metrics"
         # Maximum HTTP connections to use simultaneously when sending data. Defaults to 100.
         max_connections: 20
         # Whether to deactivate gzip compression over HTTP. Defaults to false.
         disable_compression: false
         # HTTP timeout when sending data. Defaults to 10s.
         timeout: 10s
         # Whether to skip checking the certificate of the HEC endpoint when sending data over HTTPS. Defaults to false.
         tls:
           insecure_skip_verify: true

You can split log data between Splunk Cloud Platform or Enterprise and Splunk Observability Cloud to preserve AlwaysOn Profiling data while sending logs to Splunk. See :ref:`profiling-pipeline-setup` for more information.

To split the log pipelines, configure two separate ``splunk_hec`` entries in the ``receiver`` and ``exporters`` sections of the Collector configuration file. Then, add both to the ``logs`` pipeline. For example:

.. code-block:: yaml

   receivers:
     # Default OTLP receiver--used by Splunk platform logs
     otlp:
       protocols:
         grpc:
           endpoint: 0.0.0.0:4317
         http:
           endpoint: 0.0.0.0:4318
      # OTLP receiver for AlwaysOn Profiling data
     otlp/profiling:
       protocols:
         grpc:
         # Make sure to configure your agents
         # to use the custom port for logs when
         # setting SPLUNK_PROFILER_LOGS_ENDPOINT
           endpoint: 0.0.0.0:4319

   exporters:
     # Export logs to Splunk platform
     splunk_hec/platform:
       token: "<splunk_token>"
       endpoint: "https://splunk:8088/services/collector"
       source: "otel"
       sourcetype: "otel"
       index: "main"
       max_connections: 20
       disable_compression: false
       timeout: 10s
       tls:
         insecure_skip_verify: true
      # Export profiling data to Splunk Observability Cloud
     splunk_hec/profiling:
       token: "<splunk_o11y_token>"
       endpoint: "https://ingest.<realm>.signalfx.com/v1/log"
       source: "otel"
       sourcetype: "otel"
       log_data_enabled: false

   processors:
     batch:
     memory_limiter:
       check_interval: 2s
       limit_mib: ${SPLUNK_MEMORY_LIMIT_MIB}

   # Other settings

   service:
     pipelines:
       # Traces and metrics pipelines
       # Logs pipeline for Splunk platform
       logs/platform:
         receivers: [fluentforward, otlp]
         processors:
         - memory_limiter
         - batch
         exporters: [splunk_hec/platform]
        # Logs pipeline for AlwaysOn Profiling
       logs/profiling:
         receivers: [otlp/profiling]
         processors:
         - memory_limiter
         - batch
         exporters: [splunk_hec/profiling]

.. _no_profiling_data:

.. _exclude-log-data:

Turn off logs or profiling data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note:: Starting from version 0.81 of the Splunk Distribution of OpenTelemetry Collector, logs and profiling pipelines are split. In that case, you can remove or comment them out according to your needs.


If you don't need AlwaysOn Profiling data for a specific host or container. set the ``profiling_data_enabled`` option to ``false`` in the ``splunk_hec`` exporter settings of the Collector configuration file. For example:

.. code-block:: yaml
   :emphasize-lines: 6

   splunk_hec:
     token: "${SPLUNK_HEC_TOKEN}"
     endpoint: "${SPLUNK_HEC_URL}"
     source: "otel"
     sourcetype: "otel"
     profiling_data_enabled: false

To turn off log collection for Splunk Observability Cloud while preserving AlwaysOn Profiling data for APM, set the ``log_data_enabled`` option to ``false``. See :ref:`disable_log_collection` for more information.

.. code-block:: yaml
   :emphasize-lines: 6

   splunk_hec/profiling:
     token: "${SPLUNK_HEC_TOKEN}"
     endpoint: "${SPLUNK_HEC_URL}"
     source: "otel"
     sourcetype: "otel"
     log_data_enabled: false

If you need to turn off log data export to Splunk Observability Cloud, for example because you're using Log Observer Connect or because you don't have Log Observer in your organization, set ``log_data_enabled`` to ``false`` in the ``splunk_hec`` exporter of your Collector configuration file:

.. code-block:: yaml
   :emphasize-lines: 6

   splunk_hec:
     token: "${SPLUNK_HEC_TOKEN}"
     endpoint: "${SPLUNK_HEC_URL}"
     source: "otel"
     sourcetype: "otel"
     log_data_enabled: false

.. note:: The ``log_data_enabled`` setting is available in the Splunk Distribution of OpenTelemetry Collector version 0.49.0 and higher.

To use a custom configuration for EC2, see :ref:`ecs-ec2-custom-config`. To use a custom configuration for Fargate, see :ref:`fargate-custom-config`.

If you've deployed the Collector in Kubernetes using the Helm chart, change the following setting in the ``splunkObservability`` section of your custom chart or values.yaml file:

.. code-block:: yaml

   splunkObservability:
     # Other settings
     logsEnabled: false

.. _send_metrics_to_splunk:

Send metrics to Splunk Cloud Platform or Splunk Enterprise
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use the Collector to send metrics to Splunk Cloud Platform or Splunk Enterprise.  

For example, if you're scraping Prometheus metrics with a configuration such as: 

.. code-block:: yaml

  pipelines:
    metrics:
        receivers: [prometheus]
        processors: [batch]
        exporters: [splunk_hec/metrics]

  receivers:
    prometheus:
      config:
        scrape_configs:
          - job_name: 'otel-collector'
            scrape_interval: 5s
            static_configs:
              - targets: ['<container_name>:<container_port>']

You need to configure the ``splunk_hec`` exporter as shown in the following example:

.. code-block:: yaml

  exporters:
      splunk_hec/metrics:
          # Splunk HTTP Event Collector token.
          token: "00000000-0000-0000-0000-0000000000000"
          # URL to a Splunk instance to send data to.
          endpoint: "https://splunk:8088/services/collector"
          # Optional Splunk source: https://docs.splunk.com/Splexicon:Source
          source: "app"
          # Optional Splunk source type: https://docs.splunk.com/Splexicon:Sourcetype
          sourcetype: "jvm_metrics"
          # Splunk index, optional name of the Splunk index targeted.
          index: "metrics"

Note that to be able to ingest metrics through Splunk HEC you need to declare your index as a metric index. To learn more about our metric index technology, see :new-page:`Get started with metrics <https://docs.splunk.com/Documentation/SplunkCloud/latest/Metrics/GetStarted>` in Splunk docs.

Settings
======================

The following table shows the configuration options for the Splunk HEC exporter:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/exporter/splunk_hec.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
