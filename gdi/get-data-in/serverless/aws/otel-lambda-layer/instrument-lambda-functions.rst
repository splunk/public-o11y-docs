.. _instrument-aws-lambda-functions:

******************************************************************
Instrument your AWS Lambda function for Splunk Observability Cloud
******************************************************************

.. meta::
   :description: The Splunk OpenTelemetry Lambda Layer automatically instruments your AWS Lambda functions for many programming languages. Follow these steps to get started.

Use the Splunk OpenTelemetry Lambda Layer to automatically instrument your AWS Lambda functions for many programming languages. To get started, use the guided setup or follow the instructions manually.

Generate customized instructions using the guided setup
====================================================================

To generate a template that instruments your Lambda function using the Splunk OpenTelemetry Lambda Layer, use the AWS Lambda guided setup. To access the AWS Lambda guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.

#. Open the :new-page:`AWS Lambda guided setup <https://login.signalfx.com/#/gdi/scripted/awslambda/step-1?category=product-apm&gdiState=%7B"integrationId":"awslambda"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`AWS Lambda`.

   #. Select the :guilabel:`AWS Lambda` tile to open the AWS Lambda guided setup.

Install the Splunk OpenTelemetry Lambda Layer manually
==================================================================

Follow these instructions to install the Splunk OpenTelemetry Lambda Layer:

- :ref:`otel-lambda-layer-requirements`
- :ref:`install-otel-lambda-layer`
- :ref:`set-env-vars-otel-lambda`

To instrument Go functions, skip to :ref:`go-serverless-instrumentation`.

To instrument .NET functions, skip to :ref:`dotnet-serverless-instrumentation`.

For Python functions using the Serverless Framework, see :ref:`serverless-framework-support-aws`.

.. _otel-lambda-layer-requirements:

Check compatibility and requirements
----------------------------------------------

.. include:: /_includes/requirements/lambda.rst


.. _install-otel-lambda-layer:

Install the AWS Lambda layer
----------------------------------------------

Follow these steps to instrument your function using the Splunk OpenTelemetry Lambda Layer:

#. In the AWS Lambda console, select the function that you want to instrument.

#. In the :guilabel:`Layers` section, select :guilabel:`Add a layer`, then select :guilabel:`Specify an ARN`.

#. Copy the Amazon Resource Name (ARN) for the region of your Lambda function from the list matching your architecture:

   .. tabs::

      .. tab:: Standard x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm.md

      .. tab:: Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-arm.md

#. Paste the selected ARN in the :guilabel:`Specify an ARN` field and select :guilabel:`Add`.

#. Check that the Splunk layer appears in the :guilabel:`Layers` table.

.. note:: You can automate the update of the Lambda layer using the AWS CLI or other automation tools.

.. _set-env-vars-otel-lambda:

Configure the Splunk OpenTelemetry Lambda Layer
----------------------------------------------------

Follow these steps to add the required configuration for the Splunk OpenTelemetry Lambda Layer:

1. In the AWS Lambda console, open the function that you are instrumenting.

2. Navigate to :guilabel:`Configuration`, then :guilabel:`Environment variables`.

3. Select :guilabel:`Edit`.

4. Add each of the following environment variables by selecting :guilabel:`Add environment variable`:

   .. list-table::
      :header-rows: 1
      :widths: 20 80
      :width: 100%

      * - Environment variable
        - Description

      * - ``SPLUNK_REALM``
        - To find the realm of your Splunk Observability Cloud account, open the navigation menu in Splunk Observability Cloud, select :menuselection:`Settings`, and select your username. The realm name appears in the :guilabel:`Organizations` section.

      * - ``SPLUNK_ACCESS_TOKEN``
        - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. See :ref:`Authentication token <admin-tokens>`. To send data to a Splunk OTel Collector in EC2, see :ref:`ec2-otel-collector-serverless`.

      * - ``AWS_LAMBDA_EXEC_WRAPPER``
        - Set the value for the ``AWS_LAMBDA_EXEC_WRAPPER`` environment variable:

            .. tabs::

               .. tab:: Java

                  .. code-block:: shell

                     # Select the most appropriate value

                     # Wraps regular handlers that implement RequestHandler
                     /opt/otel-handler

                     # Same as otel-handler, but proxied through API Gateway,
                     # with HTTP context propagation activated
                     /opt/otel-proxy-handler

                     # Wraps streaming handlers that implement RequestStreamHandler
                     /opt/otel-stream-handler

                  .. note:: Only AWS SDK v2 instrumentation is activated by default. To instrument other libraries, modify your code to include the corresponding library instrumentation from the OpenTelemetry Java SDK.

               .. code-tab:: shell Python

                  /opt/otel-instrument

               .. code-tab:: shell Node.js

                  /opt/nodejs-otel-handler

               .. code-tab:: shell Ruby

                  /opt/ruby-otel-handler

                  .. note:: The Graviton2 ARM64 architecture is not supported for Ruby Lambda functions.

               .. tab:: .NET

                  Don't set the ``AWS_LAMBDA_EXEC_WRAPPER`` environment variable.

                  See :ref:`dotnet-serverless-instrumentation`.

               .. tab:: Go

                  Don't set the ``AWS_LAMBDA_EXEC_WRAPPER`` environment variable.

                  See :ref:`go-serverless-instrumentation`.

      * - ``OTEL_SERVICE_NAME``
        - The name of your service.

      * - (Optional) ``OTEL_RESOURCE_ATTRIBUTES``
        - Define the name of the deployment environment of your function by setting this environment variable to ``deployment.environment=<name-of-your-environment>``.

5. Select :guilabel:`Save` and check that the environment variables appear in the table.

To configure the mode of metric ingest, see :ref:`metrics-configuration-lambda`.

.. note:: By default, the layer sends telemetry to a Collector instance on `localhost`.

.. _go-serverless-instrumentation:

Instrument Go functions in AWS Lambda
==================================================================

To instrument a Go function in AWS Lambda for Splunk APM, follow these steps:

#. Run the following commands to install the ``otellambda`` and the Splunk OTel Go distribution:

   .. code-block:: bash

      go get -u go.opentelemetry.io/contrib/instrumentation/github.com/aws/aws-lambda-go/otellambda
      go get -u github.com/signalfx/splunk-otel-go/distro

#. Set environment variable ``OTEL_EXPORTER_OTLP_ENDPOINT`` with the value ``http://localhost:4318`` and ``OTEL_EXPORTER_OTLP_TRACES_PROTOCOL`` with the value ``http/protobuf``.

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

.. _dotnet-serverless-instrumentation:

Instrument .NET functions in AWS Lambda
==================================================================

To instrument a .NET function in AWS Lambda for Splunk APM, follow these steps:

1. Integrate your existing lambda with the following template or start a new lambda using the template:

.. code-block:: csharp

   using Amazon.Lambda.Core;
   using OpenTelemetry;
   using OpenTelemetry.Exporter;
   using OpenTelemetry.Instrumentation.AWSLambda;
   using OpenTelemetry.ResourceDetectors.AWS;
   using OpenTelemetry.Resources;
   using OpenTelemetry.Trace;
   using System.Diagnostics;

   namespace DotNetInstrumentedLambdaExample;

   public class Function
   {
      public static readonly TracerProvider TracerProvider;

      static Function()
      {
         TracerProvider = ConfigureSplunkTelemetry()!;
      }

      // Note: Do not forget to point function handler to here.
      public string TracingFunctionHandler(string input, ILambdaContext context)
         => AWSLambdaWrapper.Trace(TracerProvider, FunctionHandler, input, context);

      public string FunctionHandler(string input, ILambdaContext context)
      {
         // TODO: Your function handler code here
      }

      private static TracerProvider ConfigureSplunkTelemetry()
      {
         var serviceName = Environment.GetEnvironmentVariable("AWS_LAMBDA_FUNCTION_NAME") ?? "Unknown";
         var accessToken = Environment.GetEnvironmentVariable("SPLUNK_ACCESS_TOKEN")?.Trim();
         var realm = Environment.GetEnvironmentVariable("SPLUNK_REALM")?.Trim();

         ArgumentNullException.ThrowIfNull(accessToken, "SPLUNK_ACCESS_TOKEN");
         ArgumentNullException.ThrowIfNull(realm, "SPLUNK_REALM");

         var builder = Sdk.CreateTracerProviderBuilder()
               // Use Add[instrumentation-name]Instrumentation to instrument missing services
               // Use Nuget to find different instrumentation libraries
               .AddHttpClientInstrumentation()
               .AddAWSInstrumentation()
               // Use AddSource to add your custom DiagnosticSource source names
               .AddSource(SourceName)
               .SetSampler(new AlwaysOnSampler())
               .AddAWSLambdaConfigurations(opts => opts.DisableAwsXRayContextExtraction = true)
               .SetResourceBuilder(
                  ResourceBuilder.CreateDefault()
                     .AddService(serviceName, serviceVersion: "1.0.0")
                     // Different resource detectors can be found at
                     // https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.ResourceDetectors.AWS#usage
                     .AddDetector(new AWSEBSResourceDetector()))
               .AddOtlpExporter(opts =>
               {
                  opts.Endpoint = new Uri($"https://ingest.{realm}.signalfx.com/v2/trace/otlp");
                  opts.Protocol = OtlpExportProtocol.HttpProtobuf;
                  opts.Headers = $"X-SF-TOKEN={accessToken}";
               });

         return builder.Build()!;
      }
   }

2. Make sure that the new function handler ``TracingFunctionHandler`` is configured as the main entry point by editing the aws-lambda-tools-defaults.json file and changing the function handler entry. You can also do this using the AWS web console, changing the handler in :guilabel:`Runtime settings`.

3. The template expects the following environment variables:

   - ``AWS_LAMBDA_FUNCTION_NAME``: Name of your lambda function
   - ``SPLUNK_ACCESS_TOKEN``: Your Splunk ingest access token
   - ``SPLUNK_REALM``: Your Splunk ingest realm, for example ``us0``

4. The template also contains the following customization points in ``ConfigureSplunkTelemetry()``:

   - Add a custom instrumentation library to support other third-party libraries. You can search for libraries using NuGet and strings starting with ``OpenTelemetry.Instrumentation.``.
   - Some libraries already have ``System.Diagnostics.DiagnosticSource`` built in. Use the ``.AddSource()`` method to include a custom ``DiagnosticSource`` name.
   - The AWS package contains multiple ``ResourceDetectors`` that help describe your environment. Select a detector for your use case.

5. Add your code to the ``FunctionHandler`` function as the default AWS template expects.


.. _serverless-framework-support-aws:

Serverless Framework support
==================================================================

Some features of the Serverless Framework might impact OpenTelemetry tracing of Python Lambda functions.

Python libraries compression
------------------------------------

The ``zip`` feature of ``pythonRequirements`` allows packing and deploying Lambda dependencies as compressed files. To instrument packages compressed using the Serverless Framework, set the ``SPLUNK_LAMBDA_SLS_ZIP`` environment variable to ``true``. For more information, see https://github.com/serverless/serverless-python-requirements#dealing-with-lambdas-size-limitations on GitHub.

Slim feature
------------------------------------

The Slim feature reduces the size of Lambda packages by removing some files, including ``dist-info`` folders. Some of the files removed by the Slim feature are required by the OpenTelemetry Python autoinstrumentation. Deactivate the ``slim`` option in your serverless.yml file or define custom ``slimPatterns``. For more information, see https://github.com/serverless/serverless-python-requirements#slim-package on GitHub.

.. _ec2-otel-collector-serverless:

Send serverless spans directly to Splunk Observability Cloud
=====================================================================

By default, the Splunk OpenTelemetry Lambda Layer sends telemetry to a Collector running alongside the Lambda.

To send spans directly to Splunk Observability Cloud from an AWS Lambda function instrumented using the Splunk Lambda layer add the following environment variables:

- ``OTEL_EXPORTER_OTLP_TRACES_PROTOCOL`` with the value ``http/protobuf``
- ``OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`` with the value ``https://ingest.<realm>.signalfx.com/v2/trace/otlp``, substituting ``<realm>`` with the name of your organization's realm.

.. _check-otel-lambda-data:

Check that data appears in Splunk Observability Cloud
=====================================================================

Each time the AWS Lambda function runs, trace and metric data appears in Splunk Observability Cloud. If no data appears, see :ref:`troubleshooting-lambda-layer`.
