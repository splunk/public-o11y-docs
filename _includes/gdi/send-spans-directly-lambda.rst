Send spans directly to Splunk Observability Cloud
=====================================================================

<<<<<<< HEAD
By default, the Splunk OpenTelemetry Lambda layer sends telemetry to a Collector instance running alongside the Lambda.

To send spans directly to Splunk Observability Cloud from an AWS Lambda function instrumented using the Splunk Lambda layer add the following environment variables:
=======
By default, the Splunk OpenTelemetry Lambda layer sends telemetry to a Collector instance running alongside AWS Lambda.

To send spans directly to Splunk Observability Cloud from an AWS Lambda function instrumented using the Splunk OpenTelemetry Lambda layer add the following environment variables:
>>>>>>> main

- ``OTEL_EXPORTER_OTLP_TRACES_PROTOCOL`` with the value ``http/protobuf``
- ``OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`` with the value ``https://ingest.<realm>.signalfx.com/v2/trace/otlp``, substituting ``<realm>`` with the name of your organization's realm.
