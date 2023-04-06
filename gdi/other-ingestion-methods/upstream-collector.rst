.. caution::

   Splunk only provides best-effort support for the upstream OpenTelemetry Collector. Only Splunk OpenTelemetry distributions are in scope for official Splunk support and support-related service-level agreements (SLAs).

.. _using-upstream-otel:

**********************************************************
Send telemetry using the upstream OpenTelemetry Collector
**********************************************************

.. meta:: 
      :description: If you have to use the upstream OpenTelemetry Collector due to technical or practical reasons, you can still send traces and metrics to Splunk Observability Cloud. The upstream Collector lacks many features present in the Splunk distribution and requires manual deployment and configuration.

The Splunk Distribution of OpenTelemetry Collector builds on the upstream OpenTelemetry Collector to send metrics, logs, and traces to Splunk Observability Cloud. The Splunk distribution also performs trace-metric correlation and is fully compatible with Splunk distributions of OpenTelemetry instrumentation. See :ref:`otel-intro`.

If you have to use the upstream OpenTelemetry Collector due to technical or practical reasons, you can still send traces and metrics to Splunk Observability Cloud. The upstream Collector lacks many features present in the Splunk distribution and requires manual deployment and configuration.

.. note:: Splunk participates in the OpenTelemetry project and is committed to its growth. Features developed for the Splunk distribution are regularly added to the upstream Collector for the benefit of the entire community.

Feature comparison
===================================

The following table compares the Splunk Distribution of OpenTelemetry Collector with the upstream Collector from the OpenTelemetry contrib repository.

.. list-table::
  :header-rows: 1
  :widths: 30 30 30
  :width: 100%

  * - :strong:`Feature`
    - :strong:`Splunk Collector`
    - :strong:`OTel contrib Collector`

  * - Splunk support
    - Full support
    - Best effort only

  * - Installer scripts for Linux and Windows
    - Yes (Windows and Linux)
    - No

  * - Preconfigured for Observability Cloud
    - Yes (Agent and gateway modes)
    - No

  * - Ready for configuration management tools
    - Yes (Ansible, Chef, Puppet, Salt)
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
    - No (Under development)

  * - Database query performance
    - Yes
    - No

  * - RUM correlation
    - Yes
    - No

Prerequisites
===================================================

To send data to Splunk Observability Cloud using the upstream Collector, you need the OpenTelemetry Collector ``contrib`` version with the same version number of the latest Splunk distribution. See :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib <https://github.com/open-telemetry/opentelemetry-collector-contrib>` on GitHub for more information.

.. note:: The OpenTelemetry Collector ``core`` version lacks vendor-specific components, such as receivers and exporters used by the Splunk Distribution of OpenTelemetry Collector.

.. _gdi-upstream-collector:

Sample configuration for Observability Cloud
==================================================

The following example shows how to configure the OpenTelemetry Collector ``contrib`` distribution to send metrics and traces to Splunk Observability Cloud:

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/cmd/otelcol/config/collector/upstream_agent_config.yaml

.. _migrate-otel-upstream:

Migrate to the Splunk OpenTelemetry Collector
==================================================

Migrating from existing upstream Collectors to the Splunk Distribution of OpenTelemetry Collector requires fewer steps than migrating from other proprietary agents. The Splunk distribution is based on the OpenTelemetry Collector ``contrib`` repository.

To migrate from the upstream Collector to the Splunk OTel Collector, follow these steps:

#. Save a copy of your current Collector configuration.

#. Stop the upstream Collector service using ``sudo systemctl stop otelcol`` on Linux or ``net stop otelcol`` on Windows. If you're running the Collector in a Terminal session, interrupt execution by pressing Control+C.

#. Remove the OpenTelemetry Collector binary and configuration files, including system service configuration files, or use the package manager in your system to remove the Collector.

#. Install the Splunk Distribution of OpenTelemetry Collector. See :ref:`otel-install-platform`.

#. Configure the Collector taking into account the settings you saved before removing the upstream Collector, as well as the components available in the Splunk Distribution of OpenTelemetry Collector. See :ref:`gdi-upstream-collector` and :ref:`otel-components`.

Troubleshooting
==================================================

.. include:: /_includes/troubleshooting-components.rst