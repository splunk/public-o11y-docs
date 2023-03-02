.. _opentelemetry-resources:

*********************************************************************************
Overview of the Splunk Distribution of OpenTelemetry Collector
*********************************************************************************

.. meta::
   :description: Resources for using the Splunk Distribution of OpenTelemetry Collector: Architecture, Components, Monitoring, Security, Troubleshooting.

This page provides a list of resources for using the Splunk Distribution of OpenTelemetry Collector. 

.. note::

   This project is currently in **Beta**. See :new-page:`Beta Definition <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/beta-definition.md>` for more information.

.. _otel-using:

Get started
====================

The following table describes everything you need to start using the Collector:

.. list-table::
  :widths: 25 75
  :header-rows: 1

  *   - Resource
      - Description
  *   - Access token
      - Use an access token to track and manage your resource usage. Where you see ``<access_token>``, replace it with the name of your access token. See :ref:`admin-org-tokens`.
  *   - Realm
      - A realm is a self-contained deployment that hosts organizations. You can find your realm name on your profile page in the user interface. Where you see ``<REALM>``, replace it with the name of your organization's realm. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.   
  *   - Agent or Gateway mode
      - In Agent mode, the Collector runs with the application or on the same host as the application. In Gateway mode, one or more collectors run a standalone service, for example, a container or deployment. See :ref:`otel-deployment-mode`.
  *   - Ports and endpoints
      - Check exposed ports to make sure your environment doesn't have conflicts and that firewalls are configured properly. You can change the ports in the Collecto configuration. See :ref:`otel-exposed-endpoints`.

See also :ref:`otel-requirements`.

Install and configure the Collector
==========================================

Learn how to install, deploy, upgrade or uninstall the Collector in :ref:`otel-install-platform`.

This distribution is supported on and packaged for a variety of platforms, including:

- Kubernetes: :ref:`Helm <helm-chart>` (recommended) and :ref:`YAML <resource-yaml-manifests>`.
- Linux: :ref:`installer script <linux-scripts>` (recommended), :ref:`Ansible <deployment-linux-ansible>`, :ref:`Puppet <deployment-linux-puppet>`, :ref:`Heroku <linux-heroku>`, and :ref:`manual <linux-manual>` (including DEB/RPM packages, Docker, and binary).
- Windows: :ref:`installer script <windows-script>` (recommended), :ref:`Ansible <deployment-windows-ansible>`, :ref:`Puppet <deployment-windows-puppet>`, and :ref:`manual <otel-install-windows-manual>` (including MSI with GUI and PowerShell).

Next, read our docs on how to :ref:`configure the Collector <otel-configuration>`, including :ref:`other configuration sources <otel-other-configuration-sources>`.

.. _otel-monitoring:

Monitor the Collector
=============================================

The default configuration automatically scrapes the Collecto own metrics and sends the data using the ``signalfx`` exporter. A built-in dashboard provides information about the health and status of Collector instances.

In addition, logs should be collected. For :ref:`Log Observer <get-started-logs>` customers, logs are automatically collected for the Collector and Journald processes.

The Collector also offers zPages. zPages provide in-process web pages that display collected data from the process that they are attached to. These pages are useful for in-process diagnostics without having to depend on any back end to examine traces or metrics. These pages are useful during development time or when the process to be inspected is known in production.

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

Troubleshooting
=============================================

See :ref:`Troubleshooting <otel-troubleshooting>` to resolve common issues using the OpenTelemetry Collector and the Splunk Distribution of OpenTelemetry Collector.
