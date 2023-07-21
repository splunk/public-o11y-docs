.. _otel-intro:

*******************************************************************************************
Get started with the Splunk Distribution of the OpenTelemetry Collector
*******************************************************************************************

.. meta::
    :description: Install and configure the Splunk Distribution of OpenTelemetry Collector to receive, process, and export metric, trace, and log data for Splunk Observability Cloud. Splunk Observability Cloud offers a guided setup to install the Splunk Distribution of OpenTelemetry Collector. This guide provides information to install the Splunk Distribution of OpenTelemetry Collector without using the guided setup.

.. toctree::
    :maxdepth: 5
    :hidden:

    Migrate from the Smart Agent to the Collector <smart-agent-migration-to-otel-collector.rst>
    Collector overview <resources.rst>
    components.rst
    Requirements <otel-requirements.rst>
    install-the-collector.rst
    configure-the-collector.rst
    Zero config auto instrumentation <zero-config.rst>
    Discover metric sources automatically <discovery-mode.rst>
    Use the Universal Forwarder <collector-with-the-uf.rst>
    Troubleshooting <troubleshooting.rst>
    Commands reference <otel-commands.rst>
    
The OpenTelemetry Collector uses pipelines to receive, process, and export trace data with components known as receivers, processors, and exporters. You can also add extensions that provide OpenTelemetry Collector with additional functionality, such as diagnostics and health checks.

The OpenTelemetry Collector has a core version and a contributions version. The core version provides receivers, processors, and exporters for general use. The contributions version provides receivers, processors, and exporters for specific vendors and use cases.

.. caution::

  Splunk officially supports the Splunk Distribution of OpenTelemetry Collector. 
  Splunk only provides best-effort support for the upstream OpenTelemetry Collector. See :ref:`using-upstream-otel` for more information.

The Splunk Distribution of OpenTelemetry Collector is a distribution of the OpenTelemetry Collector. The distribution is a project that bundles components from OpenTelemetry Core, OpenTelemetry Contrib, and other sources to provide data collection for multiple source platforms. The customizations in the Splunk distribution include these features:

* Better defaults for Splunk products
* Discovery mode for metric sources
* Zero configuration auto instrumentation
* Fluentd for log capture
* Tools to support migration from SignalFx products

.. note::

  Check :ref:`migrate-from-sa-to-otel` to learn how to migrate your data from the SignalFx Smart Agent (deprecated) to the Collector.

To get started with the Collector, see :ref:`opentelemetry-resources`:

#. Check the :ref:`requirements <otel-requirements>`.
#. :ref:`otel-install-platform`. Get instructions for installing the Collector on a variety of platforms. Or use :ref:`our guided install <collector-guided-install>`.
#. Learn about the discovery mode. See :ref:`discovery_mode`.
#. Learn about the available :ref:`configuration options <otel-configuration>`. 
#. :ref:`otel-troubleshooting`. Try these troubleshooting techniques and learn how to open a support request.

For more information:

- See :ref:`otel-components` for a description of the components the Collector supports.
- Use :ref:`collector-remove-data` to strip data out of your telemetry, including PII.
- Read :ref:`otel-collector-scenario`.
