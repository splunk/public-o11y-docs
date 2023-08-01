.. _splunk-otel-azure:

************************************************************
Instrument Azure functions for Splunk Observability Cloud
************************************************************

.. meta::
   :description: Learn how to instrument your Azure functions to export spans to Splunk Observability Cloud. Both in-process and isolated functions are supported.

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

#. Go to :guilabel:`Settings`, then :guilabel:` Configuration`.

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

   - OpenTelemetry
   - OpenTelemetry.Exporter.OpenTelemetryProtocol
   - OpenTelemetry.Instrumentation.Http
   - OpenTelemetry.Instrumentation.AspNetCore

In-process function
----------------------------------------------------

#. Activate the :strong:`Include prerelease` setting.
#. Install the specified version of the following libraries:
   
   - OpenTelemetry version 1.3.2
   - OpenTelemetry.Exporter.OpenTelemetryProtocol version1.3.2
   - OpenTelemetry.Instrumentation.Http version 1.0.0-rc9.4
   - OpenTelemetry.Instrumentation.AspNetCore version 1.0.0-rc9.4
   - Microsoft.Azure.Functions.Extensions version 1.1.0

.. note:: Due to runtime dependencies, only the indicated versions are guaranteed to work when instrumenting in-process functions.

.. _azure-functions-step-3:

Initialize OpenTelemetry in the code
=================================================

After adding the dependencies, initialize OpenTelemetry in your function:

Isolated worker process function
----------------------------------------------------

Add startup initialization in the Program.cs file:

.. code-block:: csharp

   using Microsoft.Extensions.Hosting;
   using OpenTelemetry.Resources;
   using OpenTelemetry.Trace;
   using OpenTelemetry;
   using System.Diagnostics;
   using Microsoft.Extensions.DependencyInjection;
   
   TracerProvider? traceProvider = null;
   
   // Get environment variables from function configuration
   // You need a valid Splunk Observability Cloud access token and realm
   var serviceName = Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME") ?? "Unknown";
   var accessToken = Environment.GetEnvironmentVariable("SPLUNK_ACCESS_TOKEN")?.Trim();
   var realm = Environment.GetEnvironmentVariable("SPLUNK_REALM")?.Trim();
   if (realm != null && accessToken != null)
   {
      var exportOpts = new OpenTelemetry.Exporter.OtlpExporterOptions();
   // Ingest endpoint for traces, defined using the Splunk Observability Cloud realm
      exportOpts.Endpoint = new Uri("https://ingest." + realm + ".signalfx.com/v2/trace/otlp");
      exportOpts.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.HttpProtobuf;
      exportOpts.Headers = "X-SF-TOKEN=" + accessToken;
   
      traceProvider = OpenTelemetry.Sdk.CreateTracerProviderBuilder()
         .AddHttpClientInstrumentation(op =>
         {
               op.FilterHttpWebRequest = req => Activity.Current?.Parent != null;
         })
         .AddAspNetCoreInstrumentation()
         .AddSource("*")
         .AddSource(serviceName)
         .SetSampler(new AlwaysOnSampler())
   // Add resource attributes to all spans
         .SetResourceBuilder(
               ResourceBuilder.CreateDefault()
               .AddService(serviceName: serviceName, serviceVersion: "1.0.0")
               .AddAttributes(new Dictionary<String, Object>() {
               { "faas.instance", Environment.GetEnvironmentVariable("WEBSITE_INSTANCE_ID") }
               }))
   // Use batch processor
         .AddProcessor(new BatchActivityExportProcessor(
               new OpenTelemetry.Exporter.OtlpTraceExporter(exportOpts)))
         .Build();
   }
   
   var host = new HostBuilder()
      .ConfigureFunctionsWorkerDefaults()
      .ConfigureServices(services => 
         services.AddSingleton(traceProvider))
      .Build();
   
   host.Run();

.. note:: When instrumenting isolated worker process functions, you can encapsulate startup initialization and parameters into other functions.

In-process function
----------------------------------------------------

Define a startup function and decorate the assembly with it. The startup function uses the Azure.Functions.Extensions package to collect useful metadata. 

.. code-block:: csharp

   using System;
   using System.Threading.Tasks;
   using Microsoft.AspNetCore.Mvc;
   using Microsoft.Azure.WebJobs;
   using Microsoft.Azure.WebJobs.Extensions.Http;
   using Microsoft.AspNetCore.Http;
   using Microsoft.Extensions.Logging;
   using Microsoft.Azure.Functions.Extensions.DependencyInjection;
   using Microsoft.Extensions.DependencyInjection;
   using OpenTelemetry.Resources;
   using OpenTelemetry.Trace;
   using OpenTelemetry;
   using System.Collections.Generic;
   using System.Diagnostics;
   
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
               if (realm == null || accessToken == null)
               {
                  return;
               }
               var exportOpts = new OpenTelemetry.Exporter.OtlpExporterOptions();
         // Ingest endpoint for traces, defined using the Splunk Observability Cloud realm
               exportOpts.Endpoint = new Uri("https://ingest." + realm + ".signalfx.com/v2/trace/otlp");
               exportOpts.Protocol = OpenTelemetry.Exporter.OtlpExportProtocol.HttpProtobuf;
               exportOpts.Headers = "X-SF-TOKEN=" + accessToken;
               var tp = OpenTelemetry.Sdk.CreateTracerProviderBuilder()
                  .AddHttpClientInstrumentation(op =>
                  {
         // This filter prevents background (parent-less) http client activity
         // in the runtime from being reported
                     op.Filter = req => Activity.Current?.Parent != null;
                  })
                  .AddAspNetCoreInstrumentation()
                  .AddSource("*")
                  .AddSource(serviceName)
                  .SetSampler(new AlwaysOnSampler())
         // Add resource attributes to all spans
                  .SetResourceBuilder(
                     ResourceBuilder.CreateDefault()
                     .AddService(serviceName: serviceName, serviceVersion: "1.0.0")
                     .AddAttributes(new Dictionary<String, Object>() {
                           { "faas.instance", Environment.GetEnvironmentVariable("WEBSITE_INSTANCE_ID") }
                     }))
         // Use batch processor
                  .AddProcessor(new BatchActivityExportProcessor(
                     new OpenTelemetry.Exporter.OtlpTraceExporter(exportOpts)))
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