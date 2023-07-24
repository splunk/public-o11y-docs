.. caution::

   Splunk provides best-effort support for the OpenTelemetry Collector Contrib. Only Splunk OpenTelemetry distributions are in scope for official Splunk support and support-related service-level agreements (SLAs).

.. _using-upstream-otel:

****************************************************************
Send telemetry using the OpenTelemetry Collector Contrib project
****************************************************************

.. meta:: 
      :description: If you need to use the upstream Collector due to technical or practical reasons, you can still send traces and metrics to Splunk Observability Cloud. On the other hand, the Splunk Distribution of OpenTelemetry Collector enhances the upstream OpenTelemetry Collector and is fully compatible with Splunk instrumentation.

The OpenTelemetry Collector Contrib project, referred to officially as the upstream Collector, is the upstream source of all OpenTelemetry Collector distributions, including the Splunk Distribution of OpenTelemetry Collector. The upstream Collector contains vendor-specific components, such as receivers and exporters for several observability back ends, including Splunk Observability Cloud.

The Splunk Distribution of OpenTelemetry Collector, on the other hand, is configured for Splunk Observability Cloud and can be deployed automatically by a variety of configuration management tools or using the installer scripts. The distribution adds additional functionality to the Collector while preserving all the features from the OpenTelemetry Collector Contrib project. See :ref:`otel-intro`.

If you need to use the upstream Collector due to technical or practical reasons, you can still send traces and metrics to Splunk Observability Cloud. Read on to learn about the differences between the upstream Collector and the Splunk OTel Collector, how to configure the upstream Collector for Splunk Observability Cloud, and how to migrate from the upstream Collector to the Splunk Distribution of OpenTelemetry Collector.

.. note:: Splunk participates in the OpenTelemetry project and is committed to its growth. Features developed for the Splunk distribution are regularly added to the upstream Collector for the benefit of the entire community. The goal is for all Splunk distributions to eventually become snapshots of the OpenTelemetry Contrib Collector project.

Feature comparison
===================================

The following table compares the Splunk Distribution of OpenTelemetry Collector with the Collector from the OpenTelemetry Collector Contrib project.

.. list-table::
  :header-rows: 1
  :widths: 30 30 30
  :width: 100%

  * - :strong:`Feature`
    - :strong:`Splunk Distribution of OpenTelemetry Collector`
    - :strong:`OpenTelemetry Collector Contrib project`

  * - Splunk support
    - Full support
    - Best effort

  * - Installer scripts for Linux and Windows
    - Yes, for Windows and Linux
    - No

  * - Configured for Splunk Observability Cloud
    - Yes, for host monitoring (agent) and data forwarding (gateway) modes
    - No

  * - Zero config automatic instrumentation
    - Yes
    - No 

  * - Discovery mode
    - Yes
    - No

  * - Recipes for configuration management tools
    - Yes, for Ansible, Chef, Puppet, and Salt
    - No

  * - Helm chart and Kubernetes operator
    - Yes
    - No

  * - Built-in dashboards
    - Yes
    - No

  * - AlwaysOn Profiling
    - Yes, CPU and memory
    - No

  * - Network Explorer
    - Yes
    - No

  * - Log collection and export
    - Yes, using Splunk HEC and Fluentd
    - No, it requires configuration

  * - Related content
    - Yes
    - No

  * - RUM correlation
    - Yes
    - No

Prerequisites
===================================================

To send data to Splunk Observability Cloud you can use the Collector from the OpenTelemetry Collector Contrib project. See :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib <https://github.com/open-telemetry/opentelemetry-collector-contrib>` on GitHub for more information. 

.. note:: Make sure that the version number of OpenTelemetry Collector Contrib is the same as the latest Splunk distribution before configuring the Collector. To check the version of the Splunk Distribution of OpenTelemetry Collector, see the :new-page:`Releases <https://github.com/signalfx/splunk-otel-collector/releases>` page on GitHub.

.. _gdi-upstream-collector:

Sample configuration for Splunk Observability Cloud
======================================================

The following example shows how to configure the upstream Collector to send metrics and traces to Splunk Observability Cloud:

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/cmd/otelcol/config/collector/upstream_agent_config.yaml

.. _migrate-otel-upstream:

Migrate to the Splunk Distribution of OpenTelemetry Collector
================================================================

Migrating from existing upstream Collectors to the Splunk Distribution of OpenTelemetry Collector requires fewer steps than migrating from other proprietary agents, because the Splunk distribution is based on the OpenTelemetry Collector. 

To migrate from the Collector Contrib to the Splunk OTel Collector, follow these steps:

#. Save a copy of your current upstream Collector configuration.

#. Stop the Collector Contrib service using ``sudo systemctl stop otelcol`` on Linux or ``net stop otelcol`` on Windows. If you're running the Collector Contrib in a Terminal session, interrupt it by selecting Ctrl+C.

#. Remove the OpenTelemetry Collector Contrib binary and configuration files, including system service configuration files, or use the package manager in your system to remove the upstream Collector.

#. Install the Splunk OTel Collector. See :ref:`otel-install-platform`. If you've deployed the Collector in Kubernetes use the Helm chart. See :ref:`helm-chart` for more information. 

#. Configure the Splunk OTel Collector taking into account the settings you saved before removing the Collector Contrib project, as well as the components available in the Splunk Distribution of OpenTelemetry Collector. See :ref:`gdi-upstream-collector` and :ref:`otel-components`.

Troubleshooting
==================================================

.. include:: /_includes/troubleshooting-components.rst