.. _splunk-python-otel-dist:

******************************************************
About the Splunk Distribution of OpenTelemetry Python
******************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry Python is a wrapper for the OpenTelemetry Instrumentation for Python, an open source Python agent that dynamically patches supported libraries at runtime with an OTel-compatible tracer to capture and export traces and spans.

The Splunk Distribution of OpenTelemetry Python is a wrapper for the OpenTelemetry Instrumentation for Python, an open source Python agent that dynamically patches supported libraries to capture telemetry data.

With the agent you can automatically instrument any application written in Python 3.7 and higher. See :ref:`python-otel-requirements`.

Features of the Splunk Distribution of OpenTelemetry Python
==============================================================

In addition to the features of the OpenTelemetry Instrumentation for Python, like bundled exporters and propagators, the agent provides additional custom features:

- Sends trace and span data to Splunk Observability Cloud using the OTel Collector..
- Instrumentation for HTTP server frameworks that returns server trace information in HTTP responses. See :ref:`server-trace-information-python`.
- Automatic injection of trace metadata into application logs. See :ref:`correlate-traces-with-logs-python`.

The agent of the Splunk Distribution of OpenTelemetry Python is supported by Splunk and is updated frequently, bringing bug fixes and new features to you before they are integrated in the upstream OTel repositories.

.. caution:: Use the Splunk Distribution of OpenTelemetry Python instead of the upstream OpenTelemetry instrumentation and SDK. Splunk supports upstream OTel components as part of the Splunk Distribution of OpenTelemetry Python.

Defaults of the Splunk Distribution of OpenTelemetry Python
==============================================================

The Splunk Distribution of OpenTelemetry Python has the following default settings for context propagation, exporters, and trace settings:

- W3C tracecontext and W3C baggage context propagation is activated by default. You can also configure B3 propagation. See :ref:`trace-propagation-configuration-python`.
- The OTLP gRPC exporter is configured by default to send spans to the local :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`.
- Unlimited defaults for trace configuration to support full-fidelity tracing. See :ref:`trace-configuration-python`.

Support for previous versions
=========================================================

Splunk is committed to supporting all customers who use this distribution. All major versions of Splunk OpenTelemetry distributions receive critical patches for one year after the next major release. Splunk stops feature development on a major release after it introduces the next major release.

For more information on versioning of the Splunk Distribution of OpenTelemetry Python, see :new-page:`the release guidelines <https://github.com/signalfx/splunk-otel-python/blob/main/RELEASING.md>` on GitHub.

How to contribute
=========================================================

The Splunk Distribution of OpenTelemetry Python is open-source software. You can contribute to its improvement by creating pull requests in GitHub. To learn more, see the :new-page:`contributing guidelines <https://github.com/signalfx/splunk-otel-python/blob/main/CONTRIBUTING.md>` on GitHub.
