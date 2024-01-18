.. _splunk-otel-azure:

***********************************************************************
Instrument .NET Azure functions for Splunk Observability Cloud
***********************************************************************

.. meta::
   :description: Learn how to instrument your .NET Azure functions to export spans to Splunk Observability Cloud. Both in-process and isolated functions are supported.

By instrumenting .NET Azure functions you can send spans to Splunk Observability Cloud every time your functions run. You can instrument both isolated worker process and in-process functions.

To instrument your .NET Azure function with OpenTelemetry to send telemetry to Splunk Observability Cloud, follow these high-level steps:

- :ref:`azure-functions-step-1`
- :ref:`azure-functions-step-2`
- :ref:`azure-functions-step-3`
- :ref:`azure-functions-step-4`
- :ref:`azure-functions-step-5`

.. note:: The SignalFx C# Azure Function wrapper is deprecated. Use the following method instrument your Azure functions.

.. _azure-functions-step-1:

Define the environment variables
=================================================

Set the required environment variables in your function's settings:

#. Select your function in Function App.

#. Go to :guilabel:`Settings`, then :guilabel:`Configuration`.

#. Select :strong:`New application setting` to add the following settings:

   .. list-table::
      :header-rows: 1
      :width: 100%
      :widths: 40 60

      * - Name
        - Value
      * - ``SPLUNK_ACCESS_TOKEN``
        - Your Splunk access token. To obtain an access token, see :ref:`admin-api-access-tokens`.
      * - ``SPLUNK_REALM``
        - Your Splunk Observability Cloud realm, for example ``us0``. To find the realm name of your account, open the navigation menu in Splunk Observability Cloud, select :menuselection:`Settings`, and select your username. The realm name appears in the :guilabel:`Organizations` section.

#. Add any other settings you might need.

.. _azure-functions-step-2:

Add the required libraries using NuGet
=================================================

Add the following libraries using NuGet in Visual Studio:

Isolated worker process function
----------------------------------------------------

#. Activate the :strong:`Include prerelease` setting.
#. Install the latest version of the following libraries:

   - :new-page:`OpenTelemetry <https://www.nuget.org/packages/OpenTelemetry>`
   - :new-page:`OpenTelemetry.Exporter.OpenTelemetryProtocol <https://www.nuget.org/packages/OpenTelemetry.Exporter.OpenTelemetryProtocol>`
   - :new-page:`OpenTelemetry.Instrumentation.Http <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.Http>`
   - :new-page:`OpenTelemetry.ResourceDetectors.Azure <https://www.nuget.org/packages/OpenTelemetry.ResourceDetectors.Azure>`

In-process function
----------------------------------------------------

#. Activate the :strong:`Include prerelease` setting.
#. Install the specified version of the following libraries:
   
   - :new-page:`OpenTelemetry version 1.3.2 <https://www.nuget.org/packages/OpenTelemetry/1.3.2>`
   - :new-page:`OpenTelemetry.Exporter.OpenTelemetryProtocol version 1.3.2 <https://www.nuget.org/packages/OpenTelemetry.Exporter.OpenTelemetryProtocol/1.3.2>`
   - :new-page:`OpenTelemetry.Instrumentation.Http version 1.0.0-rc9.4 <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.Http/1.0.0-rc9.4>`
   - :new-page:`OpenTelemetry.Instrumentation.AspNetCore version 1.0.0-rc9.4 <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.AspNetCore/1.0.0-rc9.4>`
   - :new-page:`Microsoft.Azure.Functions.Extensions version 1.1.0 <https://www.nuget.org/packages/Microsoft.Azure.Functions.Extensions/1.1.0>`

.. note:: Due to runtime dependencies, only the indicated versions are guaranteed to work when instrumenting in-process functions.

.. _azure-functions-step-3:

Initialize OpenTelemetry in the code
=================================================

After adding the dependencies, initialize OpenTelemetry in your function:

Isolated worker process function
----------------------------------------------------

Add startup initialization in the Program.cs file:

.. code-block:: csharp

   using Microsoft.Extensions.DependencyInjection;
   using Microsoft.Extensions.Hosting;
   using OpenTelemetry;
   using OpenTelemetry.Exporter;
   using OpenTelemetry.ResourceDetectors.Azure;
   using OpenTelemetry.Resources;
   using OpenTelemetry.Trace;
   using System.Diagnostics;

   // Get environment variables from function configuration
   // You need a valid Splunk Observability Cloud access token and realm
   var serviceName = Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME") ?? "Unknown";
   var accessToken = Environment.GetEnvironmentVariable("SPLUNK_ACCESS_TOKEN")?.Trim();
   var realm = Environment.GetEnvironmentVariable("SPLUNK_REALM")?.Trim();

   ArgumentNullException.ThrowIfNull(accessToken, "SPLUNK_ACCESS_TOKEN");
   ArgumentNullException.ThrowIfNull(realm, "SPLUNK_REALM");

   var tp = Sdk.CreateTracerProviderBuilder()
      // Use Add[instrumentation-name]Instrumentation to instrument missing services
      // Use Nuget to find different instrumentation libraries
      .AddHttpClientInstrumentation(opts =>
      {
         // This filter prevents background (parent-less) http client activity
         opts.FilterHttpWebRequest = req => Activity.Current?.Parent != null;
         opts.FilterHttpRequestMessage = req => Activity.Current?.Parent != null;
      })
      // Use AddSource to add your custom DiagnosticSource source names
      //.AddSource("My.Source.Name")
      // Creates root spans for function executions
      .AddSource("Microsoft.Azure.Functions.Worker")
      .SetSampler(new AlwaysOnSampler())
      .ConfigureResource(configure => configure
         .AddService(serviceName: serviceName, serviceVersion: "1.0.0")
         // See https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.ResourceDetectors.Azure
         // for other types of Azure detectors
         .AddDetector(new AppServiceResourceDetector()))
      .AddOtlpExporter(opts =>
      {
         opts.Endpoint = new Uri($"https://ingest.{realm}.signalfx.com/v2/trace/otlp");
         opts.Protocol = OtlpExportProtocol.HttpProtobuf;
         opts.Headers = $"X-SF-TOKEN={accessToken}";
      })
      .Build();

   var host = new HostBuilder()
      .ConfigureFunctionsWorkerDefaults()
      .ConfigureServices(services => services.AddSingleton(tp))
      .Build();

   host.Run();

.. note:: When instrumenting isolated worker process functions, you can encapsulate startup initialization and parameters into other functions.

In-process function
----------------------------------------------------

Define a startup function and decorate the assembly with it. The startup function uses the Azure.Functions.Extensions package to collect useful metadata. 

.. code-block:: csharp

   using Microsoft.Azure.Functions.Extensions.DependencyInjection;
   using Microsoft.Extensions.DependencyInjection;
   using OpenTelemetry;
   using OpenTelemetry.Exporter;
   using OpenTelemetry.Resources;
   using OpenTelemetry.Trace;
   using System;
   using System.Collections.Generic;
   
   // Decorate assembly with startup function
   [assembly: FunctionsStartup(typeof(OtelManualExample.Startup))]
   
   namespace OtelManualExample
   {
      public class Startup : FunctionsStartup
      {
         public override void Configure(IFunctionsHostBuilder builder)
         {
            // Get environment variables from function configuration
            // You need a valid Splunk Observability Cloud access token and realm
            var serviceName = Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME") ?? "Unknown";
            var accessToken = Environment.GetEnvironmentVariable("SPLUNK_ACCESS_TOKEN")?.Trim();
            var realm = Environment.GetEnvironmentVariable("SPLUNK_REALM")?.Trim();

            ArgumentNullException.ThrowIfNull(accessToken, "SPLUNK_ACCESS_TOKEN");
            ArgumentNullException.ThrowIfNull(realm, "SPLUNK_REALM");

            var tp = Sdk.CreateTracerProviderBuilder()
               // Use Add[instrumentation-name]Instrumentation to instrument missing services
               // Use Nuget to find different instrumentation libraries
               .AddHttpClientInstrumentation(opts => 
                  // This filter prevents background (parent-less) http client activity
                  opts.Filter = req => Activity.Current?.Parent != null)
               .AddAspNetCoreInstrumentation()
               // Use AddSource to add your custom DiagnosticSource source names
               //.AddSource("My.Source.Name")
               .SetSampler(new AlwaysOnSampler())
               // Add resource attributes to all spans
               .SetResourceBuilder(
                  ResourceBuilder.CreateDefault()
                  .AddService(serviceName: serviceName, serviceVersion: "1.0.0")
                  .AddAttributes(new Dictionary<string, object>() {
                     { "faas.instance", Environment.GetEnvironmentVariable("WEBSITE_INSTANCE_ID") }
                  }))
               .AddOtlpExporter(opts =>
               {
                  opts.Endpoint = new Uri($"https://ingest.{realm}.signalfx.com/v2/trace/otlp");
                  opts.Protocol = OtlpExportProtocol.HttpProtobuf;
                  opts.Headers = $"X-SF-TOKEN={accessToken}";
               })
               .Build();

            builder.Services.AddSingleton(tp);
         }
      }
         
.. _azure-functions-step-4:

Instrument the code to send spans
=================================================

Next, instrument your code using OpenTelemetry. Use the following examples as a starting point to instrument your code.

Isolated worker process function
----------------------------------------------------

The following example shows how to instrument a function using start and stop helper functions:

.. code-block:: csharp

   using System.Diagnostics;
   using System.Net;
   using Microsoft.Azure.Functions.Worker;
   using Microsoft.Azure.Functions.Worker.Http;
   using Microsoft.Extensions.Logging;
   
   namespace OtelManualIsolatedExample
   {
      public class ExampleFunction
      {
         private readonly ILogger _logger;
   
         public ExampleFunction(ILoggerFactory loggerFactory)
         {
               _logger = loggerFactory.CreateLogger<ExampleFunction>();
         }
   // Define helper functions for manual instrumentation
         public static ActivitySource ManualInstrumentationSource = new ActivitySource("manualInstrumentation");
         public static Activity? StartActivity(HttpRequestData req, FunctionContext fc)
         {
   // Retrieve resource attributes      
               var answer = ManualInstrumentationSource.StartActivity(req.Method.ToUpper() + " " + req.Url.AbsolutePath, ActivityKind.Server);
               answer?.AddTag("http.url", req.Url);
               answer?.AddTag("faas.invocation_id", fc.InvocationId.ToString());
               answer?.AddTag("faas.name", Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME") + "/" + fc.FunctionDefinition.Name);
               return answer;
         }
         public static HttpResponseData FinishActivity(HttpResponseData response, Activity? activity)
         {
               activity?.AddTag("http.status_code", ((int)response.StatusCode));
               return response;
         }
   
         [Function("ExampleFunction")]
   // Add the FunctionContext parameter to capture per-invocation information
         public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req, FunctionContext fc)
         {
               using (var activity = StartActivity(req, fc))
               {
                  var response = req.CreateResponse(HttpStatusCode.OK);
                  response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
   
                  response.WriteString("The current time is " + DateTime.Now.ToLongTimeString());
   
                  return FinishActivity(response, activity);
               }
         }
      }
   }

In-process function
----------------------------------------------------

The following example shows how to retrieve ``faas`` attributes:

.. code-block:: csharp
   
      public static class ExampleFunction
      {
         [FunctionName("ExampleFunction")]
      // Add the ExecutionContext parameter to capture per-invocation information
         public static async Task<IActionResult> Run(
               [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
               ILogger log, ExecutionContext context)
         {
      // You can also factor this out into a helper method to use across all functions
               Activity.Current.AddTag("faas.invocation_id", context.InvocationId.ToString());
               Activity.Current.AddTag("faas.name", Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME") + "/" + context.FunctionName);
   
               string responseMessage = "The current time is " + DateTime.Now.ToLongTimeString();
               return new OkObjectResult(responseMessage);
         }
      }
   }

.. _azure-functions-step-5:

Check that data is coming in
=========================================

Run your function and search for its spans in Splunk APM. See :ref:`span-search` for more information.

Isolated worker process function
----------------------------------------------------

The following image shows a span sent by an isolated worker process function. Notice the ``faas`` tags:

.. image:: /_images/gdi/isolated_span.png
   :alt: Span details from an isolated worker process function

In-process function
----------------------------------------------------

The following image shows a span sent by an in-process function. Notice the ``faas`` tags:

.. image:: /_images/gdi/inprocess_span.png
   :alt: Span details from an in-process function

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
