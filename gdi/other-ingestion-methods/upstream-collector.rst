.. caution::

   Splunk only provides best-effort support for the upstream OpenTelemetry Collector. Only Splunk OpenTelemetry distributions are in scope for official Splunk support and support-related service-level agreements (SLAs).

.. _using-upstream-otel:

Upstream OpenTelemetry Collector
=============================================

You can use the upstream OpenTelemetry Collector instead of the Splunk Distribution of OpenTelemetry Collector, but the following features are not available:

- Packaging, including installer scripts for Linux and Windows
- Configuration management using Ansible or Puppet
- Configuration sources
- Several Smart Agent capabilities
- Visualizations and correlations that are prepackaged in the Splunk Distribution of OpenTelemetry Collector

.. note::

   Splunk officially supports the Splunk Distribution of OpenTelemetry Collector. 
   Splunk only provides best-effort support for the upstream OpenTelemetry Collector.

To use the upstream OpenTelemetry Collector, follow these steps:

#. Get the :new-page:`OpenTelemetry Collector contribution <https://github.com/open-telemetry/opentelemetry-collector-contrib>`. This contribution includes receivers/exporters and vendor-specific components.

#. Configure the upstream OpenTelemetry Collector. See :new-page:`upstream_agent_config.yaml <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/upstream_agent_config.yaml>` for an example configuration for the upstream OpenTelemetry Collector. This configuration includes the recommended settings to ensure :new-page:`infrastructure correlation <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/apm-infra-correlation.md>`.