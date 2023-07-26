.. _ruby-otel-requirements:

*************************************************************
Ruby agent compatibility and requirements
*************************************************************

.. meta::
    :description: This is what you need to instrument any Ruby application using the Splunk OTel Ruby agent.

Meet these requirements to instrument Ruby applications for Splunk Observability Cloud.

.. _supported-ruby-libraries:

Supported libraries and frameworks
=================================================

The Splunk Distribution of OpenTelemetry Ruby instruments numerous libraries and packages. For a complete list, see :new-page:`Supported libraries <https://github.com/open-telemetry/opentelemetry-ruby-contrib/tree/main/instrumentation>` in the OpenTelemetry documentation.

.. _ruby-requirements:

Ensure you have supported Ruby and library versions
==============================================================

The agent of the Splunk Distribution of OpenTelemetry Ruby is compatible with Ruby 2.6 and higher.

.. _ruby-otel-connector-requirement:

Install and configure the Splunk OpenTelemetry Collector
==============================================================

The Splunk Distribution of OpenTelemetry Ruby exports application traces and spans to the Splunk OpenTelemetry Collector, which also collects system metric data and logs.

To send application traces and spans to Splunk Observability Cloud, install the Splunk OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.

