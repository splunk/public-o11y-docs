.. caution::

   Splunk provides best-effort support for the OpenTelemetry Collector Contrib. Only Splunk OpenTelemetry distributions are in scope for official Splunk support and support-related service-level agreements (SLAs).

.. _using-upstream-otel:

****************************************************************
Send telemetry using the OpenTelemetry Collector Contrib project
****************************************************************

.. meta:: 
      :description: If you need to use the Contrib Collector due to technical or practical reasons, you can still send traces and metrics to Observability Cloud. On the other hand, the Splunk Distribution of OpenTelemetry Collector enhances the upstream OpenTelemetry Collector and is fully compatible with Splunk instrumentation.

The OpenTelemetry Collector Contrib project, referred to officially as the upstream Collector, is the upstream source of all OpenTelemetry Collector distributions, including the Splunk Distribution of OpenTelemetry Collector. The upstream Collector contains vendor-specific components, such as receivers and exporters for several observability back ends, including Splunk Observability Cloud.

The Splunk Distribution of OpenTelemetry Collector, on the other hand, is configured for Splunk Observability Cloud and can be deployed automatically by a variety of configuration management tools or using the installer scripts. The distribution adds additional functionality to the Collector while preserving all Contrib features.

If you need to use the Contrib Collector due to technical or practical reasons, you can still send traces and metrics to Observability Cloud. On the other hand, the Splunk Distribution of OpenTelemetry Collector enhances the upstream OpenTelemetry Collector and is fully compatible with Splunk instrumentation. See :ref:`otel-intro`.

.. note:: Splunk participates in the OpenTelemetry project and is committed to its growth. Features developed for the Splunk distribution are regularly added to the upstream Collector for the benefit of the entire community. The goal is for all Splunk distributions to eventually become snapshots of upstream.

Feature comparison
===================================

The following table compares the Splunk Distribution of OpenTelemetry Collector with the Collector from the OpenTelemetry Collector Contrib repository.

.. list-table::
  :header-rows: 1
  :widths: 30 30 30
  :width: 100%

  * - :strong:`Feature`
    - :strong:`Splunk Distribution of OpenTelemetry Collector`
    - :strong:`Contrib Collector`

  * - Splunk support
    - Full support
    - Best effort only

  * - Installer scripts for Linux and Windows
    - Yes (Windows and Linux)
    - No

  * - Configured for Observability Cloud
    - Yes (Agent and gateway modes)
    - No

  * - Zero config automatic instrumentation
    - Yes
    - No 

  * - Discovery mode
    - Yes
    - No

  * - Recipes for configuration management tools
    - Yes (Ansible, Chef, Puppet, Salt)
    - No

  * - Helm chart and Kubernetes operator
    - Yes
    - No

  * - Built-in dashboards
    - Yes
    - No

  * - AlwaysOn Profiling
    - Yes (CPU and memory)
    - No

  * - Network Explorer
    - Yes
    - No

  * - Log collection and export
    - Yes (Splunk HEC and Fluentd)
    - No (Requires configuration)

  * - Related content
    - Yes
    - No

  * - RUM correlation
    - Yes
    - No

Prerequisites
===================================================

To send data to Splunk Observability Cloud use the Collector from the OpenTelemetry Collector Contrib repository. See :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib <https://github.com/open-telemetry/opentelemetry-collector-contrib>` on GitHub for more information. 

.. note:: Make sure that the version number of OpenTelemetry Collector Contrib is the same of the latest Splunk distribution before configuring the Collector. To check the version of the Splunk Distribution of OpenTelemetry Collector, see the :new-page:`releases <https://github.com/signalfx/splunk-otel-collector/releases>` page on GitHub.

.. _gdi-upstream-collector:

Sample configuration for Observability Cloud
==================================================

The following example shows how to configure the OpenTelemetry Collector ``contrib`` distribution to send metrics and traces to Splunk Observability Cloud:

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/cmd/otelcol/config/collector/upstream_agent_config.yaml

.. _migrate-otel-upstream:

Migrate to the Splunk Distribution of OpenTelemetry Collector
================================================================

Migrating from existing upstream Collectors to the Splunk Distribution of OpenTelemetry Collector requires fewer steps than migrating from other proprietary agents, as the Splunk distribution is based on the OpenTelemetry Collector. 

To migrate from the Collector Contrib to the Splunk OTel Collector, follow these steps:

#. Save a copy of your current Collector configuration.

#. Stop the Collector Contrib service using ``sudo systemctl stop otelcol`` on Linux or ``net stop otelcol`` on Windows. If you're running the Collector in a Terminal session, interrupt execution by pressing Control+C.

#. Remove the OpenTelemetry Collector Contrib binary and configuration files, including system service configuration files, or use the package manager in your system to remove the Collector.

#. Install the Splunk Distribution of OpenTelemetry Collector. See :ref:`otel-install-platform`. If you've deployed the Collector in Kubernetes use the Helm chart. See :ref:`helm-chart` for more information. 

#. Configure the Collector taking into account the settings you saved before removing the previous Collector, as well as the components available in the Splunk Distribution of OpenTelemetry Collector. See :ref:`gdi-upstream-collector` and :ref:`otel-components`.

Troubleshooting
==================================================

.. include:: /_includes/troubleshooting-components.rst