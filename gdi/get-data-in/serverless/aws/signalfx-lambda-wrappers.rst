.. _signalfx-lambda-wrappers:

*******************************************************
Instrument functions using the SignalFx Lambda wrappers
*******************************************************

.. meta::
   :description: Follow these instructions to instrument your AWS Lambda functions using the SignalFx Lambda wrappers in Splunk Observability Cloud. Note that the SignalFx Lambda wrappers are being deprecated.

.. _wrapper-ingest:

.. note:: The SignalFx Lambda wrappers are deprecated. Use the :ref:`Splunk OpenTelemetry Lambda Layer <splunk-otel-lambda-layer>` to instrument your lambdas on AWS to send traces and metrics to Splunk Observability Cloud. To learn how to migrate to the Splunk OpenTelemetry Lambda Layer, see :ref:`migrate-signalfx-lambda-wrappers`.

The SignalFx Lambda wrappers instrument your AWS Lambda functions to send metrics and traces to Splunk Observability Cloud. Lambda wrappers are available for the following programming languages:

- Java. See :new-page:`SignalFx Java Wrapper <https://github.com/signalfx/lambda-java>` on GitHub.
- Python. See :new-page:`SignalFx Python Wrapper <https://github.com/signalfx/lambda-python>` on GitHub.
- Node.js. See :new-page:`SignalFx Node.js Wrapper <https://github.com/signalfx/lambda-nodejs>` on GitHub.
- Ruby. See :new-page:`SignalFx Ruby Wrapper <https://github.com/signalfx/lambda-ruby>` on GitHub.
- C#. See :new-page:`SignalFx C# Wrapper <https://github.com/signalfx/lambda-csharp>` on GitHub.