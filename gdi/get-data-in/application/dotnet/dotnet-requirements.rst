.. _dotnet-requirements:

*************************************************************
.NET instrumentation compatibility and requirements
*************************************************************

.. meta::
    :description: This is what you need to instrument .NET applications for Splunk Observability Cloud.

Meet the following requirements to instrument .NET applications for Splunk Observability Cloud:

.. _dotnet-versions:

Ensure you are using supported .NET versions
==============================================================

The SignalFx Instrumentation for .NET supports the following .NET versions:

- Instrumentation for traces and metrics:
   
   -  .NET 6.0 and higher
   -  .NET Framework 4.6.2 and higher

- AlwaysOn Profiling:

   - .NET 6.0 and higher.

Support for legacy .NET versions
---------------------------------------------------------------

Limited support is available for the following legacy versions of .NET:

- Instrumentation for traces and metrics:

   - .NET Core 3.1
   - .NET 5.x
   - .NET Framework 4.6.1

- AlwaysOn Profiling:

   - CPU Profiling: .NET Core 3.1 and .NET 5.x
   - Memory Profiling: .NET Core 5.x

.. _supported-dotnet-libraries:

Supported libraries
=================================================

The SignalFx Instrumentation for .NET instruments the following libraries:

.. list-table:: 
   :widths: 60 40
   :width: 100%
   :header-rows: 1

   * - Library
     - Instrumentation ID
   * - ``Aerospike.Client``
     - ``Aerospike``
   * - ASP.NET 4.x
     - ``AspNet``
   * - ASP.NET Core
     - ``AspNetCore``
   * - ASP.NET MVC
     - ``AspNetMvc``
   * - ASP.NET Web API 2
     - ``AspNetWebApi2v``
   * - ``AWSSDK.Core`` (Experimental)
     - ``AwsSdk``
   * - ``AWSSDK.SQS`` (Experimental)
     - ``AwsSqs``
   * - ``Confluent.Kafka``
     - ``Kafka``
   * - ``CouchbaseNetClient`` (Experimental)
     - ``Couchbase``
   * - ``Elasticsearch.Net``
     - ``ElasticsearchNetv``
   * - GraphQL
     - ``GraphQL``
   * - gRPC
     - ``Grpc``
   * - ``Microsoft.Data.SqlClient`` and ``System.Data.SqlClient``
     - ``SqlClient``
   * - ``Microsoft.Extensions.Logging.Abstractions``
     - ``ILOgger``
   * - ``Microsoft.Azure.Cosmos`` (Experimental)
     - ``CosmosDb``
   * - ``Microsoft.Azure.WebJobs`` (Experimental)
     - ``AzureFunctions``
   * - ``Microsoft.ServiceFabric.Services.Remoting`` (Experimental)
     - ``ServiceRemoting``
   * - ``Microsoft.VisualStudio.TestPlatform`` (Experimental)
     - ``MsTestV2``
   * - ``MongoDB.Driver.Core``
     - ``MongoDb``
   * - ``MySql.Data``
     - ``MySql``
   * - Npgsql
     - ``Npgsql``
   * - ``NUnit`` (Experimental)
     - ``NUnit``
   * - ``Oracle.ManagedDataAccess``
     - ``Oracle``
   * - ``RabbitMQ.Client``
     - RabbitMQ
   * - ``ServiceStack.Redis``
     - ``ServiceStacksRedis``
   * - SQLite
     - ``Sqlite``
   * - ``StackExchange.Redis``
     - ``StackExchangeRedis``
   * - ``System.Net.Http.CurlHandler``
     - ``CurlHandler``
   * - ``System.Net.Http.MessageHandler``
     - ``HttpMessageHandler``
   * - ``System.Net.Http.SocketsHandler``
     - ``HttpSocketsHandler``
   * - ``System.Net.Http.WinHttpHandler``
     - ``WinHttpHandler``
   * - ``System.Net.WebRequest``
     - ``WebRequest``
   * - ``System.Messaging`` (Experimental)
     - ``Msmq``
   * - Windows Communication Foundation (WCF)
     - ``Wcf``
   * - ``xunit`` (Experimental)
     - ``XUnit``

To instrument the ``System.Net.Http.HttpClient`` library, you must instrument the following group of libraries:

- ``System.Net.Http.CurlHandler``
- ``System.Net.Http.MessageHandler``
- ``System.Net.Http.SocketsHandler``
- ``System.Net.Http.WinHttpHandler``

.. _dotnet-collector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The SignalFx Instrumentation for .NET exports application traces and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs, including profiling data.

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.

.. note:: The OTel Collector is not required when instrumenting Azure App Service applications. See :ref:`instrument-azure-app`.
