.. _php-otel-requirements:

****************************************************************
OpenTelemetry PHP instrumentation compatibility and requirements
****************************************************************

.. meta::
    :description: This is what you need to instrument PHP applications for Splunk Observability Cloud.

.. include:: /_includes/requirements/php.rst

Dependencies
---------------

.. raw:: html

    <div class="instrumentation" section="dependencies" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/opentelemetry-php-metadata.yaml" data-renaming='{"name": "Dependency", "source_href": "Link to source", "version": "Version", "stability": "Stability"}'></div>

.. _php-otel-connector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.

.. _supported-php-otel-libraries:

Supported libraries and frameworks
=================================================

The OpenTelemetry instrumentation supports the following libraries:

.. raw:: html

    <div class="instrumentation" section="instrumentations" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/opentelemetry-php-metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "stability": "Stability", "support": "Support", "instrumented_components": "Components", "signals": "Signals", "source_href": "Source", "settings": "Settings", "dependencies": "Dependencies", "supported_versions": "Supported versions", "name": "Name", "package_href": "Package URL", "version": "Version", "instrument": "Type", "metric_name": "Metric name", "metrics": "Metrics"}'></div>
