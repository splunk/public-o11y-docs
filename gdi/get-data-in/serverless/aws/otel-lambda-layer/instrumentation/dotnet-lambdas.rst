.. _dotnet-serverless-instrumentation:

*************************************************************************
Instrument your .NET AWS Lambda function for Splunk Observability Cloud
*************************************************************************

.. meta::
   :description: Follow these steps to instrument .NET AWS Lambda functions in AWS using OpenTelemetry to send traces to Splunk Observability Cloud.

You can instrument a .NET AWS Lambda function to send traces to Splunk Observability Cloud using the following OpenTelemetry template. The template uses these packages:

* :new-page:`OpenTelemetry <https://www.nuget.org/packages/OpenTelemetry>`
* :new-page:`OpenTelemetry.Exporter.OpenTelemetryProtocol <https://www.nuget.org/packages/OpenTelemetry.Exporter.OpenTelemetryProtocol>` 
* :new-page:`OpenTelemetry.Instrumentation.AWS <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.AWS>`
* :new-page:`OpenTelemetry.Instrumentation.AWSLambda <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.AWSLambda>`
* :new-page:`OpenTelemetry.Instrumentation.Http <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.Http>`
* :new-page:`OpenTelemetry.ResourceDetectors.AWS <https://www.nuget.org/packages/OpenTelemetry.ResourceDetectors.AWS>`

To instrument a .NET function in AWS Lambda for Splunk APM, follow these steps:

1. Integrate your existing AWS Lambda with the following template or start a new function using the template:

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
               //.AddSource("My.Source.Name")
               .SetSampler(new AlwaysOnSampler())
               .AddAWSLambdaConfigurations(opts => opts.DisableAwsXRayContextExtraction = true)
               .ConfigureResource(configure => configure
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

2. Make sure that the main entry point is set to ``TracingFunctionHandler`` by updating the ``function-handler`` field in the ``aws-lambda-tools-defaults.json`` file to ``<project-name>::<class-namespace-with-class-name>::TracingFunctionHandler``. You can also do this using the AWS web console, by changing the handler in :guilabel:`Runtime settings`.

   The following is an example of a ``aws-lambda-tools-defaults.json`` file with the function handler set to ``TracingFunctionHandler``. Don't paste the contents of the example into your file, as most of it won't match your environment. The part that must match is ``TracingFunctionHandler``.

   .. code-block:: json

      {
          "Information": [
              "This file provides default values for the deployment wizard inside Visual Studio and the AWS Lambda commands added to the .NET Core CLI.",
              "To learn more about the Lambda commands with the .NET Core CLI execute the following command at the command line in the project root directory.",
              "dotnet lambda help",
              "All the command line options for the Lambda command can be specified in this file."
          ],
          "profile": "default",
          "region": "us-west-2",
          "configuration": "Release",
          "function-architecture": "x86_64",
          "function-runtime": "dotnet8",
          "function-memory-size": 512,
          "function-timeout": 30,
          "function-handler": "AWSLambdaSample::AWSLambdaSample.Function::TracingFunctionHandler"
      }

3. The template expects the following environment variables:

   - ``AWS_LAMBDA_FUNCTION_NAME``: Name of your AWS Lambda function
   - ``SPLUNK_ACCESS_TOKEN``: Your Splunk ingest access token
   - ``SPLUNK_REALM``: Your Splunk ingest realm, for example ``us0``

4. The template also contains the following customization points in ``ConfigureSplunkTelemetry()``:

   - Add a custom instrumentation library to support other third-party libraries. You can search for libraries using NuGet and strings starting with ``OpenTelemetry.Instrumentation.``.
   - Some libraries already have the ``System.Diagnostics.DiagnosticSource`` module built in. Use the ``.AddSource()`` method to include a custom ``DiagnosticSource`` name.
   - The AWS package contains multiple ``ResourceDetectors`` elements that help describe your environment. Select a detector for your use case.

5. Add your code to the ``FunctionHandler`` function as the default AWS template expects.
