.. list-table::
   :widths: 25 55 20
   :header-rows: 1
   :width: 100%

   * - Name
     - Description
     - Pipeline types
   * - :ref:`awss3-exporter` (``awss3``) 
     - This exporter targets to support proto/json format. 
     - Metrics, logs, traces
   * - :ref:`file-exporter` (``file``)
     - Writes pipeline data to a JSON file in Protobuf JSON encoding using the OpenTelemetry protocol. 
     - Metrics, logs, traces
   * - :ref:`kafka-exporter` (``kafka``)
     - Exports metrics, logs, and traces to Kafka using a synchronous producer. 
     - Metrics, logs, traces
   * - :ref:`loadbalancing-exporter` (``loadbalancing``)
     - Exports metrics, logs, and traces to different back-ends.
     - Metrics, logs, traces
   * - :ref:`logging-exporter` (``logging``)
     - Exports data to the console. By default, ``logging`` doesn't send its output to Windows Event Viewer. Run the Splunk Distribution of OpenTelemetry Collector directly from the PowerShell terminal to send output to the Windows Event Viewer.
     - Metrics, logs, traces
   * - :ref:`otlp-exporter` (``otlp``)
     - Exports data through gRPC using the OTLP format. By default, this exporter requires TLS and provides queued retry capabilities. 
     - Metrics, logs, traces
   * - :ref:`otlphttp-exporter` (``otlphttp``)
     - Exports data in OTLP format over the HTTP protocol. 
     - Metrics, logs, traces
   * - :ref:`pulsar-exporter` (``pulsar``)
     - Exports logs, metrics, and traces to Pulsar. 
     - Metrics, logs, traces     - 
   * - :ref:`signalfx-exporter` (``signalfx``)
     - Sends metrics, events, and trace correlation to Splunk Observability Cloud. 
     - Logs (events), metrics, traces (trace to metric correlation only)
   * - :ref:`splunk-apm-exporter` (``sapm``)
     - Exports traces from multiple nodes or services in a single batch.
     - Traces
   * - :ref:`splunk-hec-exporter` (``splunk_hec``)
     - Sends telemetry to a Splunk HEC endpoint. 
     - Metrics, logs, traces