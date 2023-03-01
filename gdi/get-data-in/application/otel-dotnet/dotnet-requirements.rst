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

- .NET 6.0 and higher on Windows and Linux
- .NET Framework 4.6.2 and higher on Windows

.. note:: CentOS and Red Hat Enterprise version 7 to 8 are not supported.

.. _supported-dotnet-otel-libraries:

Supported libraries
=================================================

The Splunk Distribution of OpenTelemetry .NET instruments the following libraries:

Traces instrumentations
---------------------------------

.. list-table:: 
   :widths: 60 40
   :width: 100%
   :header-rows: 1

   * - Library
     - Instrumentation ID
   * - ASP.NET Framework (.NET Framework) |br| MVC / WebApi (Only integrated pipeline mode supported)
     - ``ASPNET``
   * - ASP.NET Core
     - ``ASPNETCORE``
   * - Elastic.Clients.Elasticsearch
     - ``ELASTICSEARCH``
   * - Microsoft.EntityFrameworkCore  |br| (Not supported on .NET Framework)
     - ``ENTITYFRAMEWORKCORE``
   * - GraphQL
     - ``GRAPHQL``
   * - Grpc.Net.Client
     - ``GRPCNETCLIENT``
   * - System.Net.Http.HttpClient and |br| System.Net.HttpWebRequest
     - ``HTTPCLIENT``
   * - MassTransit |br| (Not supported on .NET Framework)
     - ``MASSTRANSIT``
   * - MongoDB.Driver.Core |br| (Not supported on .NET Framework)
     - ``MONGODB``
   * - MySql.Data |br| (Not supported on .NET Framework)
     - ``MYSQLDATA``
   * - Npgsql
     - ``NPGSQL``
   * - NServiceBus
     - ``NSERVICEBUS``
   * - Microsoft.Data.SqlClient and |br| System.Data.SqlClient
     - ``SQLCLIENT``
   * - Quartz |br| (Not supported on .NET Framework 4.7.1 and lower)
     - ``QUARTZ``
   * - StackExchange.Redis |br| (Not supported on .NET Framework)
     - ``STACKEXCHANGEREDIS``
   * - System.ServiceModel |br| (No support for server side on .NET Core)
     - ``WCF``


Metrics instrumentations
---------------------------------

.. list-table:: 
   :widths: 40 40
   :width: 100%
   :header-rows: 1

   * - Library
     - Instrumentation ID
   * - ASP.NET Framework
     - ``ASPNET`` |br| (Requires the trace instrumentation)
   * - ASP.NET Core
     - ``ASPNETCORE`` |br| (Automatically activates ``Microsoft.AspNetCore.Hosting.HttpRequestIn`` spans.)
   * - System.Net.Http.HttpClient and |br| System.Net.HttpWebRequest
     - ``HTTPCLIENT``
   * - OpenTelemetry.Instrumentation.Runtime
     - ``NETRUNTIME``
   * - NServiceBus
     - ``NSERVICEBUS``
   * - OpenTelemetry.Instrumentation.Process
     - ``PROCESS``

Logs instrumentations
---------------------------------

.. list-table:: 
   :widths: 60 40
   :width: 100%
   :header-rows: 1

   * - Library
     - Instrumentation ID
   * - Microsoft.Extensions.Logging 6.0.0 and higher |br| (Not supported on .NET Framework)
     - ``ILOGGER`` |br| (Requires the trace instrumentation)

.. _dotnet-otel-collector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry .NET exports application traces and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs, including profiling data.

To send application traces and spans to Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.
