.. _common-dotnet-troubleshooting:

*******************************************************************
Troubleshoot .NET instrumentation for Splunk Observability Cloud
*******************************************************************

.. meta::
   :description: If your instrumented .NET application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a .NET application using the SignalFx Instrumentation for .NET and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _enable-dotnet-debug-logging:

General troubleshooting
===================================================

Follow these steps to troubleshoot general instrumentation issues:

#. Check that you've configured all settings according to your needs. See :ref:`advanced-dotnet-configuration`.

#. Check what environment variables apply to your process using tools such as Process Explorer. On Linux, run ``cat /proc/<pid>/environ`` where ``<pid>`` is the process ID.

#. Make sure that all environment variables are configured use the following commands:

   .. tabs::

      .. code-tab:: shell Windows (PowerShell)

         # Run a tool like Process Explorer or execute the following:

         [System.Diagnostics.Process]::GetProcessById(<pid>).StartInfo.EnvironmentVariables

      .. code-tab:: shell Linux

         cat /proc/<pid>/environ # where <pid> is the process ID

Activate debug logging
----------------------------------------------------

The SignalFx Instrumentation for .NET logs its configuration using ``INF`` log messages at startup.

You can activate debug logging to obtain more information about the issue:

#. Set the ``SIGNALFX_TRACE_DEBUG`` environment variable to ``true`` before starting your instrumented application. 

#. Run your application or service and generate some activity.

#. Collect the debug logs. By default, log files are in the following locations:

   * Windows: ``%ProgramData%\SignalFx .NET Tracing\logs\``
   * Linux: ``/var/log/signalfx/dotnet/``. If it doesn't exist, run ``/opt/signalfx/createLogPath.sh``.

You can change the default location by updating the ``SIGNALFX_TRACE_LOG_DIRECTORY`` environment variable. See :ref:`dotnet-debug-logging-settings` for more information and settings.

.. note:: Activate debug logging only when needed. Debug mode requires more resources.

Traces don't appear in Splunk Observability Cloud
==================================================================

If traces from your instrumented application or service are not available in Splunk Observability Cloud, verify the OpenTelemetry Collector configuration:

* Make sure that the Splunk Distribution of OpenTelemetry Collector is running.
* Make sure that a ``zipkin`` receiver and a ``sapm`` exporter are configured.
* Make sure that the ``access_token`` and ``endpoint`` fields are configured.
* Check that the traces pipeline is configured to use the ``zipkin`` receiver and ``sapm`` exporter.

Metrics don't appear in Splunk Observability Cloud
==================================================================

If metrics from your instrumented application or service are not available in Splunk Observability Cloud, make sure that the following conditions are true:

* The Splunk Distribution of OpenTelemetry Collector is running.
* A ``signalfx`` receiver and a ``signalfx`` exporter are configured.
* The ``access_token`` and ``realm`` fields are configured.
* The metrics pipeline is configured to use the ``signalfx`` receiver and ``signalfx`` exporter.

.. _dotnet-troubleshoot-linux:

.NET instrumentation not working on Linux
=====================================================

Installing the instrumentation on Linux might fail if you use an incompatible package.

Make sure that you're using an installation package that is compatible with your Linux distribution. To find out your distribution or package manager, run the following commands:

.. code-block:: shell

   lsb_release -a
   cat /etc/*release
   cat /etc/issue*
   cat /proc/version

.. _dotnet-troubleshoot-cpu:

High CPU usage
====================================================

By default, the SignalFx Instrumentation for .NET instruments all .NET processes running on the host automatically. This might significantly increase CPU usage if you've activated the instrumentation in the system or user scope. Make sure that the instrumentation's environment variables are always set in the process or terminal scope.

To restrict global instrumentation to a set of processes, use the ``SIGNALFX_PROFILER_PROCESSES`` and ``SIGNALFX_PROFILER_EXCLUDE_PROCESSES`` environment variables, which include and exclude processes for instrumentation. See :ref:`advanced-dotnet-configuration` for more information.

.. _dotnet-profiler-issues:

Troubleshoot AlwaysOn Profiling for .NET
===============================================================

See the following common issues and fixes for AlwaysOn Profiling:

Check that AlwaysOn Profiling is activated
----------------------------------------------------------------

The .NET instrumentation logs the string ``AlwaysOnProfiler::MemoryProfiling`` started at ``info`` log level. To check whether AlwaysOn Profiling is activated, search your logs for strings similar to the following:

.. code-block:: bash 

   10/12/22 12:10:31.962 PM [12096|22036] [info] AlwaysOnProfiler::MemoryProfiling started.

If no string appears, make sure that you've activated the profiler by setting the ``SIGNALFX_PROFILER_ENABLED`` environment variable to ``true``. See :ref:`profiling-configuration-dotnet`.

If you've activated the CPU profiler or the memory profiler on an unsupported runtime version, entries similar to the following entry appear in the logs:

.. code-block:: bash

   2022-10-12 12:37:18.640 +02:00 [WRN] Cpu profiling activated but not supported.
   2022-10-12 12:37:18.640 +02:00 [WRN] Memory profiling activated but not supported.

Check the AlwaysOn Profiling configuration
----------------------------------------------------------------

If AlwaysOn Profiling is :ref:`not working as intended <profiling-intro>`, check the configuration settings. The .NET instrumentation logs AlwaysOn Profiling settings using INF messages at startup. Search for the string ``TRACER CONFIGURATION``.

Unsupported .NET version
-----------------------------------------------

To use AlwaysOn Profiling, upgrade your .NET version to .NET Core 3.1 or .NET 5.0 and higher. Memory profiling requires .NET 5.0 and higher, as ``ICorProfilerInfo10`` must be available in the runtime.

None of the .NET Framework versions is supported.

AlwaysOn Profiling data and logs don't appear in Splunk Observability Cloud
------------------------------------------------------------------------------

Collector configuration issues might prevent AlwaysOn Profiling data and logs from appearing in Splunk Observability Cloud.

To solve this issue, do the following:

#. Check the configuration of the SignalFx Instrumentation for .NET, especially ``SIGNALFX_PROFILER_LOGS_ENDPOINT``.
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

.. _uninstall-dotnet-sfx:

Uninstall the SignalFx Instrumentation for .NET
=====================================================

To remove the SignalFx Instrumentation for .NET, follow the instructions for each operating system.

Windows
----------------------

Follow these steps to remove the SignalFx Instrumentation for .NET:

#. Stop all instrumented services or applications.
#. Remove all environment variables you might have set for the instrumentation.
#. Uninstall :strong:`SignalFx .NET Tracing` from the :guilabel:`Programs and Features` control panel.

Linux
----------------------

Follow these steps to remove the SignalFx Instrumentation for .NET:

#. Stop all instrumented services or applications.
#. Remove all environment variables you might have set for the instrumentation.
#. Remove ``signalfx-dotnet-tracing`` using your package manager or delete the files from ``/opt/signalfx`` if you installed the instrumentation using the tar file.

.. include:: /_includes/troubleshooting-steps.rst