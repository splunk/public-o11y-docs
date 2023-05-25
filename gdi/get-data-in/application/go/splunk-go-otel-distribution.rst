.. _splunk-go-otel-dist:

******************************************************
About the Splunk Distribution of OpenTelemetry Go
******************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry Go extends the OpenTelemetry Instrumentation for Go, a set of open source Go packages that provides APIs to directly measure the performance and behavior of your software.

The Splunk Distribution of OpenTelemetry Go extends the OpenTelemetry Instrumentation for Go, a set of open source Go packages that provides APIs to directly measure the performance and behavior of your software.

With the distribution you can instrument any application written in Go 1.19 and higher. See :ref:`go-otel-requirements`.

Features of the Splunk Distribution of OpenTelemetry Go
===========================================================

In addition to the features of the OpenTelemetry Instrumentation for Go, like bundled exporters and propagators, the Splunk Distribution of OpenTelemetry Go provides additional custom features:

- Sends trace and metrics telemetry to Splunk Observability Cloud using the OTel Collector.
- Provides additional library instrumentations. See :ref:`supported-go-libraries`.
- Provides trace metadata for application logs. See :ref:`correlate-traces-with-logs-go`.

The Splunk Distribution of OpenTelemetry Go is supported by Splunk and is updated frequently, bringing bug fixes and new features to you before they're integrated in the upstream OTel repositories.

.. caution:: Use the Splunk Distribution of OpenTelemetry Go instead of the upstream OpenTelemetry instrumentation and SDK. Splunk supports only upstream OTel components as part of the Splunk Distribution of OpenTelemetry Go.

Defaults of the Splunk Distribution of OpenTelemetry Go
===========================================================

The Splunk Distribution of OpenTelemetry Go has the following default settings for context propagation, exporters, and trace settings:

- W3C tracecontext and W3C baggage context propagation is activated by default.
- The OTLP over gRPC exporter is configured to send spans and metrics to a locally running the Splunk Distribution of OpenTelemetry Collector.
- Unlimited defaults for trace configuration to support full-fidelity tracing.

Support for previous versions
=========================================================

Splunk is committed to supporting all customers who use this distribution. All major versions of Splunk OpenTelemetry distributions receive critical patches for one year after the next major release. Splunk stops feature development on a major release after it introduces the next major release.

For more information on versioning of the Splunk Distribution of OpenTelemetry Go, see :new-page:`the repository <https://github.com/signalfx/splunk-otel-go>` on GitHub.

How to contribute
=========================================================

The Splunk Distribution of OpenTelemetry Go is open-source software. You can contribute to its improvement by creating pull requests in GitHub. To learn more, see the :new-page:`contributing guidelines <https://github.com/signalfx/splunk-otel-go/blob/main/CONTRIBUTING.md>` on GitHub.
