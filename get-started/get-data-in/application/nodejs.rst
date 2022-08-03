.. _get-started-nodejs:

***********************************
Instrument a Node.js application
***********************************

.. meta::
   :description: Instrument a Node.js application to export metrics and spans to Splunk Observability Cloud.


The SignalFx Tracing Library automatically instruments your Node.js application to capture and report distributed traces to SignalFx with an OpenTracing-compatible tracer. The tracer has constant sampling (that is, 100% chance of tracing) and reports every span. Where applicable, context propagation uses B3 headers. The library supports Node.js versions 4.7+, 6.9+, and 8+.


Start the integration
========================

To start a Node.js integration, follow these steps:

1. In the Observability Cloud main menu, select :strong:`Data Setup`.

2. In the :strong:`CATEGORIES` menu, select :strong:`APM Instrumentation`.

3. Click :strong:`Node Tracing`.

4. Click :strong:`Add Connection`. The integration wizard appears.

5. Follow the steps in the wizard.

6. At the end of the wizard, the Review Inventory page shows a live view of your data flowing into the application. Click :strong:`Explore Service Spans` to interact with your data.


Lambda wrappers
==================================

You can also instrument AWS Lambda functions with Node.js using SignalFx Lambda wrappers or instrumentation libraries. See :new-page:`SignalFx Node.js Lambda Wrapper <https://github.com/signalfx/lambda-nodejs>` for more information.
