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

.. include:: /_includes/requirements/dotnet.rst


.. _supported-dotnet-otel-libraries:

Supported libraries
=================================================

The Splunk Distribution of OpenTelemetry .NET instruments the following libraries.

Traces instrumentations
---------------------------------

.. list-table:: 
   :width: 100%
   :header-rows: 1

   * - Library
     - Supported versions
     - Maturity level
     - Support level
     - Instrumentation ID
   * - ASP.NET Framework (.NET Framework) |br| MVC / WebApi (Only integrated pipeline mode supported)
     - See :ref:`dotnet-otel-versions`
     - Experimental Beta
     - Community support
     - ``ASPNET``
   * - ASP.NET Core
     - See :ref:`dotnet-otel-versions`
     - Experimental Beta
     - Community support
     - ``ASPNETCORE``
   * - Azure SDK
     - ``Azure.`` prefixed packages, released after October 1, 2021
     - Experimental Beta
     - Third-party support
     - ``AZURE``
   * - Elastic.Clients.Elasticsearch
     - 8.0.0 to 8.9.3. |br| (Higher versions are supported by Elastic.Transport)
     - Experimental Beta
     - Third-party support
     - ``ELASTICSEARCH``
   * - Elastic.Transport
     - 0.4.16 and higher
     - Experimental Beta
     - Third-party support
     - ``ELASTICTRANSPORT``
   * - Microsoft.EntityFrameworkCore |br| (Not supported on .NET Framework)
     - 6.0.12 and higher
     - Experimental Beta
     - Community support
     - ``ENTITYFRAMEWORKCORE``
   * - GraphQL |br| (Not supported on .NET Framework)
     - 7.5.0 and higher
     - Experimental Beta
     - Third-party support
     - ``GRAPHQL``
   * - Grpc.Net.Client
     - 2.52.0 to 3.0.0
     - Experimental Beta
     - Community support
     - ``GRPCNETCLIENT``
   * - System.Net.Http.HttpClient and |br| System.Net.HttpWebRequest
     - See :ref:`dotnet-otel-versions`
     - Experimental Beta
     - Community support
     - ``HTTPCLIENT``
   * - MassTransit |br| (Not supported on .NET Framework)
     - 8.0.0 and higher
     - Experimental Beta
     - Third-party support
     - ``MASSTRANSIT``
   * - MongoDB.Driver.Core |br| (Not supported on .NET Framework)
     - 2.13.3 to 3.0.0
     - Experimental Beta
     - Third-party support
     - ``MONGODB``
   * - MySqlConnector
     - 2.0.0 and higher
     - Experimental Beta
     - Third-party support
     - ``MYSQLCONNECTOR``  
   * - MySql.Data |br| (Not supported on .NET Framework)
     - 8.1.0 and higher
     - Experimental Beta
     - Third-party support
     - ``MYSQLDATA``
   * - Npgsql
     - 6.0.0 and higher
     - Experimental Beta
     - Third-party support
     - ``NPGSQL``
   * - NServiceBus
     - 8.0.0 and higher
     - Experimental Beta
     - Third-party support
     - ``NSERVICEBUS``
   * - Microsoft.Data.SqlClient, |br| System.Data.SqlClient, |br| System.Data 
     - Version 3.* is not supported on .NET Framework |br| 4.8.5 and higher |br| versions shipped with .NET Framework
     - Experimental Beta
     - Community support
     - ``SQLCLIENT``
   * - Quartz |br| (Not supported on .NET Framework 4.7.1 and lower)
     - 3.4.0 and higher
     - Experimental Beta
     - Community support
     - ``QUARTZ``
   * - StackExchange.Redis |br| (Not supported on .NET Framework)
     - 2.0.405 to 3.0.0
     - Experimental Beta
     - Community support
     - ``STACKEXCHANGEREDIS``
   * - System.ServiceModel |br| (Service side not supported on .NET)
     - 4.7.0 and higher |br| of ``System.ServiceModel.Primitives``
     - Experimental Beta
     - Community support
     - ``WCFCLIENT`` for client side instrumentation and |br| ``WCFSERVICE`` for service side instrumentation


Metrics instrumentations
---------------------------------

.. list-table:: 
   :width: 100%
   :header-rows: 1

   * - Library
     - Supported versions
     - Maturity level
     - Support level
     - Instrumentation ID
   * - ASP.NET Framework
     - See :ref:`dotnet-otel-versions`
     - Experimental Beta
     - Community support
     - ``ASPNET`` |br| (Requires the trace instrumentation)
   * - ASP.NET Core
     - See :ref:`dotnet-otel-versions`
     - Experimental Beta
     - Community support
     - ``ASPNETCORE`` |br| (Automatically activates ``Microsoft.AspNetCore.Hosting.HttpRequestIn`` spans.)
   * - System.Net.Http.HttpClient and |br| System.Net.HttpWebRequest
     - See :ref:`dotnet-otel-versions`
     - Experimental Beta
     - Community support
     - ``HTTPCLIENT``
   * - OpenTelemetry.Instrumentation.Runtime
     - See :ref:`dotnet-otel-versions`
     - Experimental Beta
     - Community support
     - ``NETRUNTIME``
   * - NServiceBus
     - 8.0.0 and higher
     - Experimental Beta
     - Third-party support
     - ``NSERVICEBUS``
   * - OpenTelemetry.Instrumentation.Process
     - See :ref:`dotnet-otel-versions`
     - Experimental Beta
     - Community support
     - ``PROCESS``

Logs instrumentations
---------------------------------

.. list-table:: 
   :width: 100%
   :header-rows: 1

   * - Library
     - Supported versions
     - Status
     - Support level
     - Instrumentation ID
   * - Microsoft.Extensions.Logging |br| (Not supported on .NET Framework)
     - 6.0.0 and higher
     - Experimental Beta
     - Community support
     - ``ILOGGER`` |br| (Requires the trace instrumentation)

.. _dotnet-otel-collector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry .NET exports application traces and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs, including profiling data.

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.
