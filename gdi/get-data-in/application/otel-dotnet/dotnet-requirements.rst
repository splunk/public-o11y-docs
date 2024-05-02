.. _dotnet-otel-requirements:

******************************************************************
OpenTelemetry .NET instrumentation compatibility and requirements
******************************************************************

.. meta::
    :description: This is what you need to instrument .NET applications for Splunk Observability Cloud.

Meet the following requirements to instrument .NET applications for Splunk Observability Cloud:

.. _dotnet-otel-versions:

Ensure you are using supported .NET versions
==============================================================

.. include:: /_includes/requirements/dotnet.rst

Dependencies
---------------

.. raw:: html

    <div class="instrumentation" section="dependencies" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"name": "Dependency", "source_href": "Link to source", "version": "Version", "stability": "Stability"}'></div>


.. _supported-dotnet-otel-libraries:

Supported libraries
=================================================

The Splunk Distribution of OpenTelemetry .NET instruments the following libraries.

.. raw:: html

    <div class="instrumentation" section="instrumentations" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-dotnet-metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "stability": "Stability", "support": "Support", "instrumented_components": "Components", "signals": "Signals", "source_href": "Source", "settings": "Settings", "dependencies": "Dependencies", "supported_versions": "Supported versions", "name": "Name", "package_href": "Package URL", "version": "Version", "instrument": "Type", "metric_name": "Metric name", "metrics": "Metrics"}'></div>

.. _dotnet-otel-collector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry .NET exports application traces and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs, including profiling data.

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.
