.. _nodejs-otel-requirements:

*************************************************************
Splunk OTel JS compatibility and requirements 
*************************************************************

.. meta::
    :description: This is what you need to instrument any Node.js application using the Splunk Distribution of OpenTelemetry JS.

Meet these requirements to instrument Node.js applications for Splunk Observability Cloud using the Splunk Distribution of OpenTelemetry JS.

.. note:: For front-end applications built using JavaScript libraries like React, use Splunk Real User Monitoring (RUM) for Browser. See :ref:`browser-rum-gdi`.

.. _nodes-requirements:

Ensure you have supported Node.js and library versions
==============================================================

.. include:: /_includes/requirements/nodejs.rst

Dependencies
---------------

.. raw:: html

    <div class="instrumentation" section="dependencies" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-js/metadata.yaml" data-renaming='{"name": "Dependency", "source_href": "Link to source", "version": "Version", "stability": "Stability"}'></div> 

.. _supported-nodejs-otel-libraries:

Supported libraries
=================================================

The Splunk Distribution of OpenTelemetry JS instruments the following libraries and packages:

.. raw:: html

    <div class="instrumentation" section="instrumentations" url="https://raw.githubusercontent.com/splunk/o11y-gdi-metadata/main/apm/splunk-otel-js/metadata.yaml" data-renaming='{"keys": "Identifier", "description": "Description", "stability": "Stability", "support": "Support", "instrumented_components": "Components", "signals": "Signals", "source_href": "Source", "settings": "Settings", "dependencies": "Dependencies", "supported_versions": "Supported versions", "name": "Name", "package_href": "Package URL", "version": "Version", "instrument": "Type", "metric_name": "Metric name", "metrics": "Metrics", "env": "Environment variable"}'></div>

For a complete list, see :new-page:`the plugins folder <https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node>` in the OpenTelemetry upstream repository on GitHub. To use any additional instrumentation, install it using npm before running your application.


.. _nodejs-otel-connector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry JS exports application traces and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs, including profiling data.

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk Distribution of the OpenTelemetry Collector for Linux. See :ref:`otel-install-linux`.
- Splunk Distribution of the OpenTelemetry Collector for Windows. See :ref:`otel-install-windows`.
- Splunk Distribution of the OpenTelemetry Collector for Kubernetes. See :ref:`otel-install-k8s`.
