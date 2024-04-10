.. _go-serverless-instrumentation:

*************************************************************************
Instrument your Go Lambda function for Splunk Observability Cloud
*************************************************************************

.. meta::
   :description: Follow these steps to instrument Go lambda functions in AWS using OpenTelemetry to send traces to Splunk Observability Cloud.

To instrument a Go function in AWS Lambda for Splunk APM, follow these steps:

#. Run the following commands to install the ``otellambda`` and the Splunk OTel Go distribution:

   .. code-block:: bash

      go get -u go.opentelemetry.io/contrib/instrumentation/github.com/aws/aws-lambda-go/otellambda
      go get -u github.com/signalfx/splunk-otel-go/distro

#. Create a wrapper for the OpenTelemetry instrumentation in your function's code. For example:

   .. code-block:: go

      package main

      import (
         "context"
         "fmt"

         "github.com/aws/aws-lambda-go/lambda"
         "github.com/signalfx/splunk-otel-go/distro"
         "go.opentelemetry.io/contrib/instrumentation/github.com/aws/aws-lambda-go/otellambda"
         "go.opentelemetry.io/otel"
      )

      func main() {
         distro.Run()
         flusher := otel.GetTracerProvider().(otellambda.Flusher)
         lambda.Start(otellambda.InstrumentHandler(HandleRequest, otellambda.WithFlusher(flusher)))
      }

      type MyEvent struct {
         Name string `json:"name"`
      }

      func HandleRequest(ctx context.Context, name MyEvent) (string, error) {
         return fmt.Sprintf("Hello %s!", name.Name), nil
      }

   .. note:: For a full example, see :new-page:`https://github.com/signalfx/tracing-examples/blob/main/opentelemetry-tracing/opentelemetry-lambda/go/example.go <https://github.com/signalfx/tracing-examples/blob/main/opentelemetry-tracing/opentelemetry-lambda/go/example.go>` on GitHub.

#. Configure the required environment variables. See :ref:`set-env-vars-otel-lambda`.

See :ref:`instrument-aws-lambda-functions` for more information.
