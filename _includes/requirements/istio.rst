To send telemetry from Istio to Splunk Observability Cloud you need the following:

- Istio 1.8 and higher
- Splunk OpenTelemetry Collector for Kubernetes in host monitoring (agent) mode. See :ref:`otel-install-k8s`.
- Splunk APM instrumentation with B3 context propagation. To set B3 as the context propagator, set the ``OTEL_PROPAGATORS`` environment variable to ``b3multi``.

OpenCensus and W3C trace context are not supported because Istio does not support them.
