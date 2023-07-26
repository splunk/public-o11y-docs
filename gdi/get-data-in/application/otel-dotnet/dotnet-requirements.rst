.. _dotnet-otel-requirements:

******************************************************************
OpenTelemetry .NET instrumentation compatibility and requirements
******************************************************************

.. meta::
    :description: This is what you need to instrument .NET applications for Splunk Observability Cloud.

Meet the following requirements to instrument .NET applications for Splunk Observability Cloud:

.. _dotnet-otel-versions:

Ensure you are using supported .NET versions
==============================================================

The Splunk Distribution of OpenTelemetry .NET supports the following .NET versions:

- .NET 6.0 and higher
- .NET Framework 4.6.2 and higher

.. _supported-dotnet-otel-libraries:

Supported libraries
=================================================

The Splunk Distribution of OpenTelemetry .NET instruments the following libraries.

.. caution:: This is a beta distribution. Use it for evaluation purposes only. Don't use it in production environments. Some features might have restrictions, limited stability, or might change in next versions. Limited support is provided on best-effort basis.

Traces instrumentations
---------------------------------

.. list-table:: 
   :widths: 40 30 30
   :width: 100%
   :header-rows: 1

   * - Library
     - Supported versions
     - Instrumentation ID
   * - ASP.NET Framework (.NET Framework) |br| MVC / WebApi (Only integrated pipeline mode supported)
     - See :ref:`dotnet-otel-versions`
     - ``ASPNET``
   * - ASP.NET Core
     - See :ref:`dotnet-otel-versions`
     - ``ASPNETCORE``
   * - Elastic.Clients.Elasticsearch
     - 8.0.0 and higher
     - ``ELASTICSEARCH``
   * - Microsoft.EntityFrameworkCore |br| (Not supported on .NET Framework)
     - 6.0.12 and higher
     - ``ENTITYFRAMEWORKCORE``
   * - GraphQL |br| (Not supported on .NET Framework)
     - 7.5.0 and higher
     - ``GRAPHQL``
   * - Grpc.Net.Client
     - 2.43.0 to 3.0.0
     - ``GRPCNETCLIENT``
   * - System.Net.Http.HttpClient and |br| System.Net.HttpWebRequest
     - See :ref:`dotnet-otel-versions`
     - ``HTTPCLIENT``
   * - MassTransit |br| (Not supported on .NET Framework)
     - 8.0.0 and higher
     - ``MASSTRANSIT``
   * - MongoDB.Driver.Core |br| (Not supported on .NET Framework)
     - 2.13.3 to 3.0.0
     - ``MONGODB``
   * - MySqlConnector
     - 2.0.0 and higher
     - ``MYSQLCONNECTOR``  
   * - MySql.Data |br| (Not supported on .NET Framework)
     - 6.10.7 to 8.0.32
     - ``MYSQLDATA``
   * - Npgsql
     - 6.0.0 and higher
     - ``NPGSQL``
   * - NServiceBus
     - 8.0.0 and higher
     - ``NSERVICEBUS``
   * - Microsoft.Data.SqlClient and |br| System.Data.SqlClient
     - Version 3.* is not supported on .NET Framework
     - ``SQLCLIENT``
   * - Quartz |br| (Not supported on .NET Framework 4.7.1 and lower)
     - 3.4.0 and higher
     - ``QUARTZ``
   * - StackExchange.Redis |br| (Not supported on .NET Framework)
     - 2.0.405 to 3.0.0
     - ``STACKEXCHANGEREDIS``
   * - System.ServiceModel |br| (Not supported on .NET Framework)
     - 4.7.0 and higher |br| of ``System.ServiceModel.Primitives``
     - ``WCFCLIENT`` for client side instrumentation and |br| ``WCFSERVICE`` for service side instrumentation


Metrics instrumentations
---------------------------------

.. list-table:: 
   :widths: 40 30 30
   :width: 100%
   :header-rows: 1

   * - Library
     - Supported versions
     - Instrumentation ID
   * - ASP.NET Framework
     - See :ref:`dotnet-otel-versions`
     - ``ASPNET`` |br| (Requires the trace instrumentation)
   * - ASP.NET Core
     - See :ref:`dotnet-otel-versions`
     - ``ASPNETCORE`` |br| (Automatically activates ``Microsoft.AspNetCore.Hosting.HttpRequestIn`` spans.)
   * - System.Net.Http.HttpClient and |br| System.Net.HttpWebRequest
     - See :ref:`dotnet-otel-versions`
     - ``HTTPCLIENT``
   * - OpenTelemetry.Instrumentation.Runtime
     - See :ref:`dotnet-otel-versions`
     - ``NETRUNTIME``
   * - NServiceBus
     - 8.0.0 and higher
     - ``NSERVICEBUS``
   * - OpenTelemetry.Instrumentation.Process
     - See :ref:`dotnet-otel-versions`
     - ``PROCESS``

Logs instrumentations
---------------------------------

.. list-table:: 
   :widths: 40 30 30
   :width: 100%
   :header-rows: 1

   * - Library
     - Supported versions
     - Instrumentation ID
   * - Microsoft.Extensions.Logging 6.0.0 and higher |br| (Not supported on .NET Framework)
     - 6.0.0 and higher
     - ``ILOGGER`` |br| (Requires the trace instrumentation)

.. _dotnet-otel-collector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry .NET exports application traces and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs, including profiling data.

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.
