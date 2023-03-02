.. _splunk-ruby-otel-dist:

******************************************************
About the Splunk Distribution of OpenTelemetry Ruby
******************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry Ruby is a wrapper for the OpenTelemetry Instrumentation for Ruby, an open source Ruby agent that dynamically patches supported libraries at runtime with an OTel-compatible tracer to capture and export traces and spans.

The Splunk Distribution of OpenTelemetry Ruby is a wrapper for the OpenTelemetry Instrumentation for Ruby, an open source Ruby agent that dynamically patches supported libraries to capture telemetry data.

With the agent you can automatically instrument any application written in Ruby 2.6 and higher. See :ref:`ruby-otel-requirements`.

Features of the Splunk Distribution of OpenTelemetry Ruby
===========================================================

In addition to all the features of the OpenTelemetry Instrumentation for Ruby, like bundled exporters and propagators, the agent provides additional custom features:

- Configured to send trace and span data to Splunk Observability Cloud using the OTel Collector..
- Instrumentation for HTTP server frameworks that returns server trace information in HTTP responses. See :ref:`server-trace-information-ruby`.
- Automatic injection of trace metadata into application logs. See :ref:`correlate-traces-with-logs-ruby`.

The agent of the Splunk Distribution of OpenTelemetry Ruby is supported by Splunk and is updated frequently, bringing bug fixes and new features to you before they are integrated in the upstream OTel repositories.

.. caution:: Use the Splunk Distribution of OpenTelemetry Ruby instead of the upstream OpenTelemetry instrumentation and SDK. Splunk supports only upstream OTel components as part of the Splunk Distribution of OpenTelemetry Ruby.

Defaults of the Splunk Distribution of OpenTelemetry Ruby
===========================================================

The Splunk Distribution of OpenTelemetry Ruby has the following default settings for context propagation, exporters, and trace settings:

- W3C tracecontext and W3C baggage context propagation is activated by default. You can also configure B3 propagation. See :ref:`trace-propagation-configuration-ruby`.
- The OTLP gRPC exporter is configured by default to send spans to the local :ref:`Splunk OpenTelemetry Collector <otel-intro>`.
- Unlimited defaults for trace configuration to support full-fidelity tracing. See :ref:`trace-configuration-ruby`.

Support for previous versions
=========================================================

Splunk is committed to supporting all customers who use this distribution. All major versions of Splunk OpenTelemetry distributions receive critical patches for one year after the next major release. Splunk stops feature development on a major release after it introduces the next major release.

How to contribute
=========================================================

The Splunk Distribution of OpenTelemetry Ruby is open source software. You can contribute to its improvement by creating pull requests in GitHub. To learn more, see the :new-page:`contributing guidelines <https://github.com/signalfx/splunk-otel-ruby/blob/main/CONTRIBUTING.md>` on GitHub.
