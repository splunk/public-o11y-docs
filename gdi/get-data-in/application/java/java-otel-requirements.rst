.. _java-otel-requirements:

*************************************************************
Java agent compatibility and requirements
*************************************************************

.. meta::
    :description: This is what you need to instrument Java applications for Splunk Observability Cloud.

Meet the following requirements to instrument Java applications for Splunk Observability Cloud.

.. _java-requirements:

Make sure you are using compatible Java and JVM versions
==============================================================

.. include:: /_includes/requirements/java.rst

Dependencies
---------------

.. raw:: html

    <div class="instrumentation" section="dependencies" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-java/metadata.yaml" data-renaming='{"name": "Dependency", "source_href": "Link to source", "version": "Version", "stability": "Stability"}'></div>

.. _supported-java-libraries:

Supported libraries and frameworks
=================================================

The Splunk Distribution of OpenTelemetry Java instruments numerous libraries, frameworks, and application servers.

.. raw:: html

    <div class="instrumentation" section="instrumentations" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-java/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "stability": "Stability", "support": "Support", "instrumented_components": "Components", "signals": "Signals", "source_href": "Source", "settings": "Settings", "dependencies": "Dependencies", "supported_versions": "Supported versions", "name": "Name", "package_href": "Package URL", "version": "Version", "instrument": "Type", "metric_name": "Metric name", "metrics": "Metrics", "env": "Environment variable", "default": "Default", "type": "Type", "category": "Category"}'></div>

For a complete list of supported libraries and frameworks, see :new-page:`Supported libraries <https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md>` in the OpenTelemetry documentation.

.. note:: To deactivate specific instrumentations, see :ref:`java-instrumentation-issues`.


.. _java-otel-connector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry Java exports application and JVM metrics and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs, including profiling data.

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.
