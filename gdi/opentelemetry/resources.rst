.. _opentelemetry-resources:

*********************************************************************************
Overview of the Splunk Distribution of OpenTelemetry Collector
*********************************************************************************

.. meta::
   :description: Resources for using the Splunk Distribution of OpenTelemetry Collector.

This page provides a list of resources for using the Splunk Distribution of OpenTelemetry Collector. 

.. note::

   This project is currently in **Beta**. See :new-page:`Beta Definition <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/beta-definition.md>` for more information.

Refer to the following topics for an overview of the Collector:

- :ref:`collector-architecture`, which describes how to deploy the Collector.
- :ref:`otel-components`, which describes what the Collector supports.
- :ref:`otel-monitoring`, which describes how to ensure that the Collector is healthy.
- :ref:`otel-security`, which describes how to ensure that the Collector is secure.
- :ref:`otel-sizing`, which describes how to ensure that the collector is properly sized.
- :ref:`otel-splunk-collector-tshoot`, which describes how to resolve common issues with the Collector.

Getting started
====================

You need the following resources to get started using the Collector:

- :ref:`Splunk Access Token <admin-org-tokens>`.
- :new-page:`Splunk Realm <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.
- :new-page:`Agent or Gateway mode <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/agent-vs-gateway.md>`.
- :ref:`Confirm exposed ports <otel-exposed-endpoints>` to make sure your environment doesn't have conflicts and that firewalls are configured properly. Ports can be changed in the configuration.

This distribution is supported on and packaged for a variety of platforms, including:

- Kubernetes: :ref:`Helm <helm-chart>` (recommended) and :ref:`YAML <resource-yaml-manifests>`.
- Linux: :ref:`installer script <linux-scripts>` (recommended), :ref:`Ansible <deployment-linux-ansible>`, :ref:`Puppet <deployment-linux-puppet>`, :ref:`Heroku <linux-heroku>`, and :ref:`manual <linux-manual>` (including DEB/RPM packages, Docker, and binary).
- Windows: :ref:`installer script <windows-script>` (recommended), :ref:`Ansible <deployment-windows-ansible>`, :ref:`Puppet <deployment-windows-puppet>`, and :ref:`manual <windows-manual>` (including MSI with GUI and PowerShell).

See :new-page:`examples <https://github.com/signalfx/splunk-otel-collector/blob/main/examples>` for additional use cases.

Configuration
============================

The following is a list of default configuration files. These files contain standard specifications and settings.

- :new-page:`signalfx/splunk-otel-collector <https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector>`. *full_config_linux.yaml* includes comments and links to documentation. *agent_config_linux.yaml* is the recommended starting configuration for most environments.

- :new-page:`Fluentd <https://github.com/signalfx/splunk-otel-collector/tree/main/internal/buildscripts/packaging/fpm/etc/otel/collector/fluentd>`, which is only applicable to Helm or installer script installations. See the ``*.conf`` files and the ``conf.d`` directory. Common sources, including filelog, journald, and Windows Event Viewer are included.

Custom configuration
----------------------------------------

Read our docs on how to :ref:`configure the Collector <otel-configuration>`, including our :ref:`advanced settings <otel-optional-configurations>` and :ref:`other configuration sources <otel-other-configuration-sources>`.

.. note::

   SignalFx Smart Agent is deprecated. For details, see the :new-page:`Deprecation Notice <https://github.com/signalfx/signalfx-agent/blob/main/docs/smartagent-deprecation-notice.md>`. See :ref:`Migrating from the SignalFx Smart Agent <migrate-from-sa-to-otel>` for resources and best practices to start using the Collector, which is the replacement for the Smart Agent.

.. _using-upstream-otel:

Upstream OpenTelemetry Collector
=============================================

You can use the upstream OpenTelemetry Collector instead of the Splunk Distribution of OpenTelemetry Collector, but the following features are not
available:

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

Troubleshooting
=============================================

See :ref:`Troubleshooting <otel-troubleshooting>` to resolve common issues using the OpenTelemetry Collector and the Splunk Distribution of OpenTelemetry Collector.
