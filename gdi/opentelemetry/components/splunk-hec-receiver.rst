.. _splunk-hec-receiver:

*************************
Name of component
*************************

.. meta::
      :description: Metadata

<Description> <Supported pipeline>

Following the name of the component, use the README file of each upstream component to compose a description. 
The opening paragraph of the topic must cover the following content:
* The name of the component and its type, such as receiver, exporter, processor, or plugin.
* The purpose of the component and its use cases. Describe the signal types, such as logs, metrics, or traces.
* The main features of the component, highlighting which are experimental.
* Additional notes concerning compatibility and requirements.
* If the component replaces a Smart Agent monitor, state which monitor the component replaces.

Benefits
----------------------

When it makes sense, add a list of benefits resulting from the usage of the component. For example:
* A receiver’s main benefits include data collection from specific sources.
* A processor’s main benefits include filtering, redaction, and data operations on telemetry.
* An exporter’s main benefits include data forwarding to o11y cloud.
You can sometimes deduce benefits from the component description in its README file.

Get started
======================

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the <component-type> as described in the next section.
3. Restart the Collector.

Describe how to enable the component for all the supported pipelines in the OTel Collector.
* Add code snippets with syntax highlighting that include all the recommended initial settings.
* If different deploy modes are supported, for example OTel Operator, document each of them.
* Include any external configuration operations that are required, such as creating service accounts or database users.
For certain components, such as processors and exporters, it’s helpful to explain how the component works.

Settings
======================

The following table shows the configuration options for the <component>:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/hostmetrics.yaml"></div>

Sample configurations
----------------------

Metrics
====================

The following table shows the metrics for the COMPONENT_NAME:

<div class="metrics-component" url="https://raw.githubusercontent.com/splunk/opentelemetry-collector-contrib/main/<category-of-component>/<name-of-component>/metadata.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
