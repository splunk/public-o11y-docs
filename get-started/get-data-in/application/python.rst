.. _get-started-python:

**********************************
Instrument a Python application
**********************************

.. meta::
   :description: Instrument a Python application to export metrics and spans to Splunk Observability Cloud.


The Splunk Distribution of OpenTelemetry Python Instrumentation provides multiple installable packages that automatically instrument your Python application to capture and report distributed traces to Splunk APM. The instrumentation works with Python version 3.6+.

This Splunk distribution comes with the following defaults:

* B3 context propagation

* Jaeger thrift exporter configured to send spans to a locally running SignalFx Smart Agent

* Unlimited default limits for configuration options to support full-fidelity traces


Start the integration
========================

To start a Python integration, follow these steps:

1. In the Observability Cloud main menu, select :strong:`Data Setup`.

2. In the :strong:`CATEGORIES` menu, select :strong:`APM Instrumentation`.

3. Click :strong:`Python Tracing`.

4. Click :strong:`Add Connection`. The integration wizard appears.

5. Follow the steps in the wizard.

6. At the end of the wizard, the Review Inventory page shows a live view of your data flowing into the application. Click :strong:`Explore Service Spans` to interact with your data.


Lambda wrappers
==================

You can also instrument AWS Lambda functions with Python using SignalFx Lambda wrappers or instrumentation libraries. See :new-page:`SignalFx Python Lambda Wrapper <https://github.com/signalfx/lambda-python>` for more information.
