.. _common-dotnet-otel-troubleshooting:

*******************************************************************
Troubleshoot .NET instrumentation for Splunk Observability Cloud
*******************************************************************

.. meta::
   :description: If your instrumented .NET application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a .NET application using the Splunk Distribution of OpenTelemetry .NET and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _enable-dotnet-otel-debug-logging:

General troubleshooting
===================================================

Follow these steps to troubleshoot general instrumentation issues:

#. Check that you've configured all settings according to your needs. See :ref:`advanced-dotnet-otel-configuration`.

#. Check what environment variables apply to your process:

   .. tabs::

      .. code-tab:: shell Windows PowerShell

         # Run a tool like Process Explorer or execute the following:

         [System.Diagnostics.Process]::GetProcessById(<pid>).StartInfo.EnvironmentVariables

      .. code-tab:: shell Linux

         cat /proc/<pid>/environ # where <pid> is the process ID

Activate debug logging
----------------------------------------------------

You can activate debug logging to obtain more information about the issue:

#. Set the ``OTEL_LOG_LEVEL`` environment variable to ``debug`` before starting your instrumented application.

#. Run your application or service and generate some activity.

#. Collect the debug logs. The instrumentation saves its logs in the following locations:

   - Windows: ``%ProgramData%\OpenTelemetry .NET AutoInstrumentation\logs``
   - Linux: ``/var/log/opentelemetry/dotnet``

   If the default log directories can't be created, logs are saved in the user's temporary folder.

   You can change the default location by updating the ``OTEL_DOTNET_AUTO_LOG_DIRECTORY`` environment variable. See :ref:`dotnet-otel-debug-logging-settings` for more information and settings.

.. note:: Activate debug logging only when needed. Debug mode requires more resources.

.. _dotnet-find-rid:

Find the runtime identifier for your .NET applications
==================================================================

If you're using Splunk automatic discovery to instrument your .NET applications, you might need a runtime identifier to configure the appropriate instrumentation.

To find your runtime identifier, follow these steps:

#. In your ``Program.cs`` file, make sure that your code includes the following dependency:

   .. code-block:: c
      
      using System.Runtime.InteropServices

#. In your main application, add the following code to print your runtime identifier information:

   .. code-block:: c

      Console.WriteLine(RuntimeInformation.RuntimeIdentifier);

#. Run the application and check your application logs.
#. Verify that the runtime identifier is supported for your instrumentation.


Traces don't appear in Splunk Observability Cloud
==================================================================

If traces from your instrumented application or service are not available in Splunk Observability Cloud, verify the OpenTelemetry Collector configuration:

#. Make sure that ``OTEL_EXPORTER_OTLP_ENDPOINT`` points to the correct OpenTelemetry Collector instance host.
#. Check that your collector instance is configured and running. See :ref:`otel-splunk-collector-tshoot`.
#. Check that the OTLP receiver is activated in the OTel Collector and plugged into the traces pipeline.
#. Check that the OTel Collector points to the following address: ``http://<host>:4318``. Verify that your URL is correct.

Assembly in AdditionalDeps was not found
==================================================================

The following assembly error message might appear in some cases:

.. code-block:: bash

   An assembly specified in the application dependencies manifest (OpenTelemetry.AutoInstrumentation.AdditionalDeps.deps.json) was not found

To troubleshoot the issue, activate host tracing as in the following example:

.. code-block:: bash

   COREHOST_TRACE=1
   COREHOST_TRACEFILE=corehost_verbose_tracing.log

Run the application to collect the logs.

.. _dotnet-otel-troubleshoot-cpu:

High CPU usage
====================================================

By default, the Splunk Distribution of OpenTelemetry .NET instruments all .NET processes running on the host automatically. This might significantly increase CPU usage if you've activated the instrumentation in the system or user scope. Make sure that the instrumentation's environment variables are always set in the process or terminal scope.

To restrict global instrumentation to a set of processes, use the ``OTEL_DOTNET_AUTO_EXCLUDE_PROCESSES`` environment variable, which excludes processes for instrumentation. See :ref:`advanced-dotnet-otel-configuration` for more information.

.. _disable-instrumentations-otel-dotnet:

Deactivate specific instrumentations
====================================================

All instrumentations are activated by default for all signal types: traces, metrics, and logs.

You can deactivate all instrumentations for a specific signal type by setting the ``OTEL_DOTNET_AUTO_{SIGNAL}_ENABLED_INSTRUMENTATIONS`` environment variable to ``false``.

For a more granular approach, you can deactivate specific instrumentations for a given signal type by setting the ``OTEL_DOTNET_AUTO_{SIGNAL}_{INSTRUMENTATION}_INSTRUMENTATION_ENABLED`` environment variable to ``false``, where ``{SIGNAL}`` is the type of signal, for example traces, and ``{INSTRUMENTATION}`` is the case-sensitive name of the instrumentation.

.. note:: You can't set environment variables for deactivating instrumentations using the web.config or app.config files.

.. _dotnet-otel-profiler-issues:

Troubleshoot AlwaysOn Profiling for .NET
===============================================================

See the following common issues and fixes for AlwaysOn Profiling:

Check that AlwaysOn Profiling is activated
----------------------------------------------------------------

The .NET instrumentation logs the string ``ContinuousProfiler::StartThreadSampling`` started at ``info`` log level. To check whether AlwaysOn Profiling is activated, search your logs for strings similar to the following:

.. code-block:: bash

   10/12/23 12:10:31.962 PM [12096|22036] [info] ContinuousProfiler::StartThreadSampling

If no string appears, make sure that you've activated the profiler by setting the ``SPLUNK_PROFILER_ENABLED`` environment variable to ``true``. See :ref:`profiling-configuration-otel-dotnet`.

Check the AlwaysOn Profiling configuration
----------------------------------------------------------------

If AlwaysOn Profiling is :ref:`not working as intended <profiling-intro>`, check the configuration settings. The .NET instrumentation logs AlwaysOn Profiling settings using ``Debug`` messages at startup. You can grep for the string ``Continuous profiling configuration:`` to see the configuration.

Unsupported .NET version
-----------------------------------------------

To use AlwaysOn Profiling, upgrade your .NET version to .NET 6.0 or higher.

None of the .NET Framework versions is supported.

AlwaysOn Profiling data and logs don't appear in Splunk Observability Cloud
------------------------------------------------------------------------------

Collector configuration issues might prevent AlwaysOn Profiling data and logs from appearing in Splunk Observability Cloud.

To solve this issue, do the following:

#. Check the configuration of the .NET instrumentation, especially ``SPLUNK_PROFILER_LOGS_ENDPOINT``.
#. Verify that the Splunk Distribution of OpenTelemetry Collector is running at the expected endpoint and that the application host or container can resolve the host name and connect to the OTLP port.
#. Make sure that you're running the Splunk Distribution of OpenTelemetry Collector and that the version is 0.34 or higher. The required version for memory profiling is 0.44. Other collector distributions might not be able to route the log data that contains profiling data.
#. A custom configuration might override settings that let the collector handle profiling data. Make sure to configure an ``otlp`` receiver and a ``splunk_hec`` exporter with correct token and endpoint fields. The ``profiling`` pipeline must use the OTLP receiver and Splunk HEC exporter you've configured. See :ref:`splunk-hec-exporter` for more information.

The following snippet contains a sample ``profiling`` pipeline:

.. code-block:: yaml

   receivers:
     otlp:
       protocols:
         grpc:

   exporters:
     # Profiling
     splunk_hec/profiling:
       token: "${SPLUNK_ACCESS_TOKEN}"
       endpoint: "${SPLUNK_INGEST_URL}/v1/log"
       log_data_enabled: false

   processors:
     batch:
     memory_limiter:
       check_interval: 2s
       limit_mib: ${SPLUNK_MEMORY_LIMIT_MIB}

   service:
     pipelines:
       logs/profiling:
         receivers: [otlp]
         processors: [memory_limiter, batch]
         exporters: [splunk_hec, splunk_hec/profiling]

Loss of profiling data or gaps in profiling data
-------------------------------------------------------------

When the instrumentation can't send data to Splunk OpenTelemetry Collector due to full buffers, AlwaysOn Profiling activates the escape hatch, which drops all logs with profiling data until the buffers are empty.

If the escape hatch activates, it logs the following message:

.. code-block:: bash
   
   Skipping a thread sample period, buffers are full.

You can also look for the ``** THIS WILL RESULT IN LOSS OF PROFILING DATA **.`` message.

The thread sampler resumes its activity when any of the buffers is empty.

To avoid the loss of profiling data due to full buffers, check the configuration and the communication layer between your process and the Splunk Distribution of OpenTelemetry Collector.

Uninstall the instrumentation
======================================

To uninstall the .NET instrumentation, see :ref:`uninstall-otel-dotnet`.
