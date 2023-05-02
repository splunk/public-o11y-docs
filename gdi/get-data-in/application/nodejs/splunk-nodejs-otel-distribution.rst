.. _splunk-nodejs-otel-dist:

******************************************************
About the Splunk Distribution of OpenTelemetry JS
******************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry JS is a wrapper for the OpenTelemetry Instrumentation for Node.js, an open source Node framework that automatically instruments Node applications and libraries so that they capture telemetry data at runtime.

The Splunk Distribution of OpenTelemetry JS is a wrapper for the OpenTelemetry Instrumentation for Node.js, an open source Node framework that automatically instruments Node applications and libraries so that they capture telemetry data at runtime.

You can automatically instrument any application written in Node.js 14 and higher. See :ref:`nodejs-otel-requirements`. To instrument applications that use Node versions lower than 14, use the :new-page:`SignalFx Tracing Library for Node.js <https://github.com/signalfx/signalfx-nodejs-tracing>`.

Features of the Splunk Distribution of OpenTelemetry JS
===========================================================

In addition to the features of the OpenTelemetry Instrumentation for Node.js, like bundled exporters and propagators, the Splunk Distribution of OpenTelemetry JS provides additional custom features:

- Sends trace and span data to Splunk Observability Cloud using the OTel Collector..
- Collection of runtime metrics. See :ref:`nodejs-otel-metrics`.
- Instrumentation for HTTP server frameworks that returns server trace information in HTTP responses. See :ref:`server-trace-information-nodejs`.
- Automatic injection of trace metadata into application logs. See :ref:`correlate-traces-with-logs-nodejs`.

The Splunk Distribution of OpenTelemetry JS is supported by Splunk and is updated frequently, bringing bug fixes and new features to you before they are integrated in the upstream OTel repositories.

.. caution:: Use the Splunk Distribution of OpenTelemetry JS instead of the upstream OpenTelemetry JavaScript Client. Splunk supports only upstream OTel components as part of the Splunk Distribution of OpenTelemetry JS.

Defaults of the Splunk Distribution of OpenTelemetry JS
===========================================================

The Splunk Distribution of OpenTelemetry JS has the following default settings for context propagation, exporters, and trace settings:

- W3C tracecontext and W3C baggage context propagation is activated by default. You can also configure B3 propagation. See :ref:`trace-propagation-configuration-nodejs`.
- The OTLP exporter is configured by default to send spans to the local :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` over gRPC.
- Unlimited defaults for trace configuration to support full-fidelity tracing. See :ref:`trace-configuration-nodejs`.

Support for previous versions
=========================================================

Splunk is committed to supporting all customers who use this distribution. All major versions of Splunk OpenTelemetry distributions receive critical patches for one year after the next major release. Splunk stops feature development on a major release after it introduces the next major release.

For more information on versioning of the Splunk Distribution of OpenTelemetry JS, see :new-page:`the release guidelines <https://github.com/signalfx/splunk-otel-js/blob/main/RELEASING.md>` on GitHub.

How to contribute
=========================================================

The Splunk Distribution of OpenTelemetry JS is open-source software. You can contribute to its improvement by creating pull requests in GitHub. To learn more, see the :new-page:`contributing guidelines <https://github.com/signalfx/splunk-otel-js/blob/main/CONTRIBUTING.md>` on GitHub.
