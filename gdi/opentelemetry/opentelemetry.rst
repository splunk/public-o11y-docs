.. _otel-intro:

*******************************************************************************************
Install and configure the Splunk Distribution of OpenTelemetry Collector
*******************************************************************************************

.. meta::
    :description: Install and configure the Splunk Distribution of OpenTelemetry Collector to receive, process, and export metric, trace, and log data for Splunk Observability Cloud. Splunk Observability Cloud offers a guided setup to install the Splunk Distribution of OpenTelemetry Collector. This guide provides information to install the Splunk Distribution of OpenTelemetry Collector without using the guided setup.

.. toctree::
    :maxdepth: 5
    :hidden:

    smart-agent-migration-to-otel-collector.rst
    collector-architecture.rst
    install-the-collector.rst
    configure-the-collector.rst
    use-the-collector.rst
    troubleshooting.rst
    resources.rst

The OpenTelemetry Collector uses pipelines to receive, process, and export trace data with components known as receivers, processors, and exporters. You can also add extensions that provide OpenTelemetry Collector with additional functionality, such as diagnostics and health checks.

The OpenTelemetry Collector has a core version and a contributions version. The core version provides receivers, processors, and exporters for general use. The contributions version provides receivers, processors, and exporters for specific vendors and use cases.

The Splunk Distribution of OpenTelemetry Collector is a distribution of the OpenTelemetry Collector. The distribution is a project that bundles components from OpenTelemetry Core, OpenTelemetry Contrib, and other sources to provide data collection for multiple source platforms. The customizations in the Splunk distribution include these features:

* Better defaults for Splunk products
* Fluentd for log capture
* Tools to support migration from SignalFx products

.. caution::

   Splunk officially supports the Splunk Distribution of OpenTelemetry Collector. 
   Splunk only provides best-effort support for the upstream OpenTelemetry Collector.


..raw:: html

    <embed>
     <h2>Use the Collector
     </embed>

To use the Collector:

#. :ref:`otel-install-platform`. Get instructions for installing the Collector on a variety of platforms. Or use :ref:`our guided install <collector-guided-install>`.
#. :ref:`otel-configuration`. Download default and advanced configuration files.
#. :ref:`otel-using`. Determine your access token, realm, and deployment mode to start using the Collector.
#. :ref:`otel-troubleshooting`. Try these troubleshooting techniques and learn how to open a support request.

See also the following resources for the Collector:

- Check :ref:`migrate-from-sa-to-otel` to learn how to migrate your data from the SignalFx Smart Agent to the Collector.
- See :ref:`collector-architecture` for a description of the Collector architecture.
- Use :ref:`collector-remove-data` to strip data out of your telemetry, including PII.

For a complete list of resources, refer to :ref:`opentelemetry-resources`. 

.. _collector-guided-install:

..raw:: html

    <embed>
     <h3>Guided install for the Collector
     </embed>


:new-page:`Splunk Observability Cloud <https://docs.splunk.com/Observability/get-started/welcome.html>` offers a guided setup to install the Collector:

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for :guilabel:`Splunk Distribution of OpenTelemetry Collector`, and select it.
#. Choose your platform.
#. Follow the step-by-step process provided in the platform's guided setup.