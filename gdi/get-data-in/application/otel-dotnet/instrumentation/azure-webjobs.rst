.. _instrument-dotnet-azure-webjob:

***********************************************************************
Instrument .NET Azure WebJobs for Splunk Observability Cloud
***********************************************************************

.. meta::
   :description: You can instrument applications or services running on Azure WebJobs using the OpenTelemetry .NET SDK. Follow these instructions to get started.

You can instrument applications or services running on Azure WebJobs using the OpenTelemetry .NET SDK. Follow these instructions to get started.

.. _azure-webjob-step-1:

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

#. Add any other settings you might need. See :ref:`advanced-dotnet-otel-configuration`.

.. _azure-webjob-step-2:

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
   - :new-page:`OpenTelemetry.Instrumentation.Http <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.Http>`
   - :new-page:`OpenTelemetry.Instrumentation.Process <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.Process>`
   - :new-page:`OpenTelemetry.Instrumentation.Runtime <https://www.nuget.org/packages/OpenTelemetry.Instrumentation.Runtime>`
   - :new-page:`OpenTelemetry.ResourceDetectors.Azure <https://www.nuget.org/packages/OpenTelemetry.ResourceDetectors.Azure>`

.. _azure-webjob-step-3:

Initialize OpenTelemetry in the code
=================================================

After adding the dependencies, create an OpenTelemetry helper for your application:

.. code-block::

    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Host;
    using Microsoft.Extensions.DependencyInjection;
    using OpenTelemetry.Exporter;
    using OpenTelemetry.Logs;
    using OpenTelemetry.Metrics;
    using OpenTelemetry.ResourceDetectors.Azure;
    using OpenTelemetry.Resources;
    using OpenTelemetry.Trace;
    using System.Diagnostics;

    namespace <YourNamespaceHere>.Helpers;

    internal static class SplunkOpenTelemetry
    {
        private static readonly string AccessToken;
        private static readonly string Realm;

        static SplunkOpenTelemetry()
        {
            AccessToken = Environment.GetEnvironmentVariable("SPLUNK_ACCESS_TOKEN")?.Trim()
                ?? throw new ArgumentNullException("SPLUNK_ACCESS_TOKEN");

            Realm = Environment.GetEnvironmentVariable("SPLUNK_REALM")?.Trim()
                ?? throw new ArgumentNullException("SPLUNK_REALM");
        }

        public static IWebJobsBuilder AddSplunkOpenTelemetry(this IWebJobsBuilder builder)
        {
            // Get environment variables from function configuration
            // You need a valid Splunk Observability Cloud access token and realm
            var serviceName = Environment.GetEnvironmentVariable("WEBSITE_SITE_NAME") ?? "Unknown";
            var enableTraceResponseHeaderValue = Environment.GetEnvironmentVariable("SPLUNK_TRACE_RESPONSE_HEADER_ENABLED")?.Trim();

            // See https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.ResourceDetectors.Azure
            // for other types of Azure detectors
            var resourceDetector = new AppServiceResourceDetector();

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
                    // Use AddSource to add your custom DiagnosticSource source names
                    //.AddSource("My.Source.Name")
                    // Automatically creates the root span with function start
                    .AddSource(SplunkFunctionAttribute.ActivitySourceName)
                    .SetSampler(new AlwaysOnSampler())
                    .ConfigureResource(cfg => cfg
                        .AddService(serviceName: serviceName, serviceVersion: "1.0.0")
                        .AddDetector(resourceDetector))
                    .AddConsoleExporter()
                    .AddOtlpExporter(opts =>
                    {
                        opts.Endpoint = new Uri($"https://ingest.{Realm}.signalfx.com/v2/trace/otlp");
                        opts.Protocol = OtlpExportProtocol.HttpProtobuf;
                        opts.Headers = $"X-SF-TOKEN={AccessToken}";
                    }))
                .WithMetrics(m => m
                    // Use Add[instrumentation-name]Instrumentation to instrument missing services
                    // Use Nuget to find different instrumentation libraries
                    .AddHttpClientInstrumentation()
                    .AddRuntimeInstrumentation()
                    .AddProcessInstrumentation()
                    .ConfigureResource(cfg => cfg
                        .AddService(serviceName: serviceName, serviceVersion: "1.0.0")
                        .AddDetector(resourceDetector))
                    .AddOtlpExporter(opts =>
                    {
                        opts.Endpoint = new Uri($"https://ingest.{Realm}.signalfx.com/v2/datapoint/otlp");
                        opts.Headers = $"X-SF-TOKEN={AccessToken}";
                    }));

            return builder;
        }
    }

    internal class SplunkFunctionAttribute : FunctionInvocationFilterAttribute
    {
        public const string ActivitySourceName = "Splunk.Azure.WebJob";

        private static readonly ActivitySource ActivitySource = new(ActivitySourceName);

        private Activity? _currentActivity;

        public override Task OnExecutingAsync(FunctionExecutingContext executingContext, CancellationToken cancellationToken)
        {
            _currentActivity = ActivitySource.StartActivity(executingContext.FunctionName, ActivityKind.Server);
            _currentActivity?.AddTag("faas.name", executingContext.FunctionName);
            _currentActivity?.AddTag("faas.instance", executingContext.FunctionInstanceId);

            return base.OnExecutingAsync(executingContext, cancellationToken);
        }

        public override Task OnExecutedAsync(FunctionExecutedContext executedContext, CancellationToken cancellationToken)
        {
            if (!executedContext.FunctionResult.Succeeded)
            {
                if (executedContext.FunctionResult.Exception != null)
                {
                    _currentActivity?.SetStatus(Status.Error.WithDescription(executedContext.FunctionResult.Exception.Message));
                    _currentActivity?.RecordException(executedContext.FunctionResult.Exception);
                }
                else
                {
                    _currentActivity?.SetStatus(Status.Error);
                }
            }

            _currentActivity?.Stop();

            return base.OnExecutedAsync(executedContext, cancellationToken);
        }
    }

Use the helper you created in the Program.cs file:

.. code-block::

    var builder = new HostBuilder()
    .ConfigureWebJobs(context =>
    {
        context.AddSplunkOpenTelemetry();
    })

Use the SplunkFunctionAttribute with every defined WebJobs Function.
See the example how to properly attribute your function.

.. code-block::

    public class Functions
    {
        [SplunkFunction]
        public void ProcessTimer([TimerTrigger("1/5 * * * * *")] TimerInfo timerInfo, ILogger logger)
        {
            logger.LogInformation("Hello World!");
        }
    }

.. _azure-webjobs-step-4:

Check that data is coming in
=========================================

Run your function and search for spans in Splunk APM. See :ref:`span-search` for more information.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
