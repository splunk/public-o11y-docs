.. _instrument-dotnet-azure-webapp:

***********************************************************************
Instrument .NET Azure Web App for Splunk Observability Cloud
***********************************************************************

.. meta::
   :description: You can instrument applications or services running on Azure Web App Service using the Splunk Distribution of OpenTelemetry .NET. Follow these instructions to get started.

You can instrument applications or services running on Azure Web App Service using the Splunk Distribution of OpenTelemetry .NET. Follow these instructions to get started.

.. _azure-webapp-step-1:

Define the environment variables
=================================================

Set the required environment variables for your application.

#. Select your application in Azure Web App.

#. Go to :guilabel:`Settings`, :guilabel:`Configuration`.

#. Select :guilabel:`New application setting` to add the following settings:

   .. list-table::
      :header-rows: 1
      :width: 100%
      :widths: 40 60

      * - Name
        - Value
      * - ``SPLUNK_ACCESS_TOKEN``
        - Your Splunk access token. To obtain an access token, see :ref:`admin-api-access-tokens`.
      * - ``SPLUNK_REALM``
        - Your Splunk Observability Cloud realm, for example ``us0``. To find your realm, see :ref:`Note about realms <about-realms>`.
      * - ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``
        - Whether to turn on the integration with Splunk RUM. The default value is ``false``.

#. Add any other settings you might need. See :ref:`advanced-dotnet-otel-configuration`.

.. _azure-webapp-step-2:

Add the required libraries using NuGet
=================================================

Add the following libraries using the NuGet package manager in Visual Studio.

Isolated worker process function
----------------------------------------------------

#. Activate the :strong:`Include prerelease` setting.
#. Install the latest version of the following libraries:

   - :new-page:`OpenTelemetry <https://www.nuget.org/packages/OpenTelemetry>`
   - :new-page:`OpenTelemetry.Exporter.OpenTelemetryProtocol <https://www.nuget.org/packages/OpenTelemetry.Exporter.OpenTelemetryProtocol>`
   - :new-page:`OpenTelemetry.Extensions.Hosting <https://www.nuget.org/packages/OpenTelemetry.Extensions.Hosting>`
   - :new-page:`OpenTelemetry.Instrumentation.AspNetCore <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.AspNetCore>`
   - :new-page:`OpenTelemetry.Instrumentation.Http <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.Http>`
   - :new-page:`OpenTelemetry.Instrumentation.Process <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.Process>`
   - :new-page:`OpenTelemetry.Instrumentation.Runtime <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.Runtime>`
   - :new-page:`OpenTelemetry.ResourceDetectors.Azure <https://www.nuget.org/packages/OpenTelemetry.ResourceDetectors.Azure>`

.. _azure-webapps-step-3:

Initialize OpenTelemetry in the code
=================================================

After adding the dependencies, create an OpenTelemetry helper for your application:

.. code-block::

    using OpenTelemetry.Exporter;
    using OpenTelemetry.Metrics;
    using OpenTelemetry.ResourceDetectors.Azure;
    using OpenTelemetry.Resources;
    using OpenTelemetry.Trace;
    using System.Diagnostics;
    namespace <YourNamespaceHere>.Extensions;
    public static class SplunkOpenTelemetry
    {
        public static WebApplicationBuilder AddSplunkOpenTelemetry(this WebApplicationBuilder builder)
        {
            // Get environment variables from function configuration
            // You need a valid Splunk Observability Cloud access token and realm
            var serviceName = Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME") ?? "Unknown";
            var accessToken = Environment.GetEnvironmentVariable("SPLUNK_ACCESS_TOKEN")?.Trim();
            var realm = Environment.GetEnvironmentVariable("SPLUNK_REALM")?.Trim();
            var enableTraceResponseHeaderValue = Environment.GetEnvironmentVariable("SPLUNK_TRACE_RESPONSE_HEADER_ENABLED")?.Trim();
            // See https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.ResourceDetectors.Azure
            // for other types of Azure detectors
            var resourceDetector = new AppServiceResourceDetector();
            ArgumentNullException.ThrowIfNull(accessToken, "SPLUNK_ACCESS_TOKEN");
            ArgumentNullException.ThrowIfNull(realm, "SPLUNK_REALM");
            builder.Services.AddOpenTelemetry()
                .WithTracing(t => t
                    // Use Add[instrumentation-name]Instrumentation to instrument missing services
                    // Use Nuget to find different instrumentation libraries
                    .AddHttpClientInstrumentation(opts =>
                    {
                        // This filter prevents background (parent-less) http client activity
                        opts.FilterHttpWebRequest = req => Activity.Current?.Parent != null;
                        opts.FilterHttpRequestMessage = req => Activity.Current?.Parent != null;
                    })
                    .AddAspNetCoreInstrumentation(opts =>
                    {
                        // Enables Splunk RUM integration when configuration contains SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=True
                        if (bool.TryParse(enableTraceResponseHeaderValue, out bool isEnabled) && isEnabled)
                        {
                            opts.EnrichWithHttpRequest = (activity, request) =>
                            {
                                var response = request.HttpContext.Response;
                                ServerTimingHeader.SetHeaders(activity, response.Headers, (headers, key, value) =>
                                {
                                    headers.TryAdd(key, value);
                                });
                            };
                        }
                    })
                    // Use AddSource to add your custom DiagnosticSource source names
                    //.AddSource("My.Source.Name")
                    .SetSampler(new AlwaysOnSampler())
                    .ConfigureResource(cfg => cfg
                        .AddService(serviceName: serviceName, serviceVersion: "1.0.0")
                        .AddDetector(resourceDetector))
                    .AddOtlpExporter(opts =>
                    {
                        opts.Endpoint = new Uri($"https://ingest.{realm}.signalfx.com/v2/trace/otlp");
                        opts.Protocol = OtlpExportProtocol.HttpProtobuf;
                        opts.Headers = $"X-SF-TOKEN={accessToken}";
                    }))
                .WithMetrics(m => m
                    // Use Add[instrumentation-name]Instrumentation to instrument missing services
                    // Use Nuget to find different instrumentation libraries
                    .AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddRuntimeInstrumentation()
                    .AddProcessInstrumentation()
                    .ConfigureResource(cfg => cfg
                        .AddService(serviceName: serviceName, serviceVersion: "1.0.0")
                        .AddDetector(resourceDetector))
                    .AddOtlpExporter(opts =>
                    {
                        opts.Endpoint = new Uri($"https://ingest.{realm}.signalfx.com/v2/datapoint/otlp");
                        opts.Headers = $"X-SF-TOKEN={accessToken}";
                    }));
            return builder;
        }
        private static class ServerTimingHeader
        {
            public const string Key = "Server-Timing";
            private const string ExposeHeadersHeaderName = "Access-Control-Expose-Headers";
            public static void SetHeaders<T>(Activity activity, T carrier, Action<T, string, string> setter)
            {
                setter(carrier, Key, ToHeaderValue(activity));
                setter(carrier, ExposeHeadersHeaderName, Key);
            }
            private static string ToHeaderValue(Activity activity)
            {
                var sampled = ((int)activity.Context.TraceFlags).ToString("D2");
                return $"traceparent;desc=\"00-{activity.TraceId}-{activity.SpanId}-{sampled}\"";
            }
        }
    }

Use the helper you created in the Program.cs file:

.. code-block:: csharp

    var builder = WebApplication.CreateBuilder(args);
    var app = builder
        .AddSplunkOpenTelemetry()
        .Build()

.. _azure-webapps-step-4:

Check that data is coming in
=========================================

Run your function and search for spans in Splunk APM. See :ref:`span-search` for more information.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
