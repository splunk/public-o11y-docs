This monitor type is available in the Smart Agent Receiver, which is part of the Splunk Distribution of OpenTelemetry Collector. You can use existing Smart Agent monitors as OpenTelemetry Collector metric receivers with the Smart Agent Receiver.

This monitor type requires a properly configured environment on your system in which you've installed a functional Smart Agent release bundle. The Collector provides this bundle in the installation paths for ``x86_64/amd64``.

To activate this monitor type in the Collector, add the following lines to your <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector" target="_blank">configuration (YAML) file</a>: 

