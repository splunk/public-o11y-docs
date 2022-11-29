.. _common-dotnet-otel-troubleshooting:

*******************************************************************
Troubleshoot .NET instrumentation for Splunk Observability Cloud
*******************************************************************

.. meta::
   :description: If your instrumented .NET application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a .NET application using the SignalFx Instrumentation for .NET and you don't see your data in Observability Cloud, follow these troubleshooting steps.

.. _enable-dotnet-otel-debug-logging:

General troubleshooting
===================================================

Follow these steps to troubleshoot general instrumentation issues:

#. Check that you've configured all settings according to your needs. See :ref:`advanced-dotnet-configuration`.

#. Check what environment variables apply to your process using tools such as Process Explorer. On Linux, run ``cat /proc/<pid>/environ`` where ``<pid>`` is the process ID.

Enable debug logging
----------------------------------------------------

The SignalFx Instrumentation for .NET logs its configuration using ``INF`` log messages at startup.

You can enable debug logging to obtain more information about the issue:

#. Set the ``SIGNALFX_TRACE_DEBUG`` environment variable to ``true`` before starting your instrumented application. 

#. Run your application or service and generate some activity.

#. Collect the debug logs. By default, log files are in the following locations:

   * Windows: ``%ProgramData%\SignalFx .NET Tracing\logs\``
   * Linux: ``/var/log/signalfx/dotnet/``. If it doesn't exist, run ``/opt/signalfx/createLogPath.sh``.

You can change the default location by updating the ``SIGNALFX_TRACE_LOG_DIRECTORY`` environment variable. See :ref:`dotnet-debug-logging-settings` for more information and settings.

.. note:: Enable debug logging only when needed. Debug mode requires more resources.

Traces don't appear in Observability Cloud
==================================================================

If traces from your instrumented application or service are not available in Splunk Observability Cloud, verify the OpenTelemetry Collector configuration:

* Make sure that the Splunk Distribution of OpenTelemetry Collector is running.
* Make sure that a ``zipkin`` receiver and a ``sapm`` exporter are configured.
* Make sure that the ``access_token`` and ``endpoint`` fields are configured.
* Check that the traces pipeline is configured to use the ``zipkin`` receiver and ``sapm`` exporter.

Metrics don't appear in Observability Cloud
==================================================================

If metrics from your instrumented application or service are not available in Splunk Observability Cloud, make sure that the following conditions are true:

* The Splunk Distribution of OpenTelemetry Collector is running.
* A ``signalfx`` receiver and a ``signalfx`` exporter are configured.
* The ``access_token`` and ``realm`` fields are configured.
* The metrics pipeline is configured to use the ``signalfx`` receiver and ``signalfx`` exporter.

.. _dotnet-otel-troubleshoot-linux:

.NET instrumentation not working on Linux
=====================================================

Installing the instrumentation on Linux might fail if you use an incompatible package.

Make sure that you're using an installation package that is compatible with your Linux distribution. To find out your distribution or package manager, run the following commands:

.. code-block:: shell

   lsb_release -a
   cat /etc/*release
   cat /etc/issue*
   cat /proc/version

.. _dotnet-otel-troubleshoot-cpu:

High CPU usage
====================================================

By default, the SignalFx Instrumentation for .NET instruments all .NET processes running on the host automatically. This might significantly increase CPU usage if you've enabled the instrumentation in the system or user scope. Make sure that the instrumentation's environment variables are always set in the process or terminal scope.

To restrict global instrumentation to a set of processes, use the ``SIGNALFX_PROFILER_PROCESSES`` and ``SIGNALFX_PROFILER_EXCLUDE_PROCESSES`` environment variables, which include and exclude processes for instrumentation. See :ref:`advanced-dotnet-configuration` for more information.

.. _dotnet-otel-profiler-issues:

Troubleshoot AlwaysOn Profiling for .NET
===============================================================

See the following common issues and fixes for AlwaysOn Profiling:

Check that AlwaysOn Profiling is enabled
----------------------------------------------------------------

The .NET instrumentation logs the string ``Thread sampling initialized`` at startup using an ``INF`` message. To check whether AlwaysOn Profiling is enabled, search your logs for strings similar to the following:

.. code-block:: bash 

   2022-01-13 13:30:02.601 +01:00 [INF] Thread sampling initialized.  { MachineName: ".", Process: "[11524 dotnet]", AppDomain: "[1 Samples.Profiling]", AssemblyLoadContext: "\"Default\" System.Runtime.Loader.DefaultAssemblyLoadContext #1", TracerVersion: "0.2.0.0" }

If the string does not appear, make sure that you've enabled the profiler by setting the ``SIGNALFX_PROFILER_ENABLED`` environment variable to ``true``. See :ref:`profiling-configuration-dotnet`.

Check the AlwaysOn Profiling configuration
----------------------------------------------------------------

If AlwaysOn Profiling is :ref:`not working as intended <profiling-intro>`, check the configuration settings. The .NET instrumentation logs AlwaysOn Profiling's settings using INF messages at startup. Search for the string ``TRACER CONFIGURATION``.

Unsupported .NET version
-----------------------------------------------

To use AlwaysOn Profiling, upgrade your .NET version to .NET Core 3.1 or .NET 5.0 and higher. None of the .NET Framework versions is supported.

AlwaysOn Profiling data and logs don't appear in Observability Cloud
--------------------------------------------------------------------

Collector configuration issues might prevent AlwaysOn Profiling data and logs from appearing in Splunk Observability Cloud.

To solve this issue, do the following:

#. Check the configuration of the SignalFx Instrumentation for .NET, especially ``SIGNALFX_PROFILER_LOGS_ENDPOINT``.
#. Verify that the Splunk Distribution of OpenTelemetry Collector is running at the expected endpoint and that the application host or container can resolve the host name and connect to the OTLP port.
#. Make sure that you're running the Splunk Distribution of OpenTelemetry Collector and that the version is 0.34 or higher. Other collector distributions might not be able to route the log data that contains profiling data.
#. A custom configuration might override settings that let the collector handle profiling data. Make sure to configure an ``otlp`` receiver and a ``splunk_hec`` exporter with correct token and endpoint fields. The ``profiling`` pipeline must use the OTLP receiver and Splunk HEC exporter you've configured.

The following snippet contains a sample ``profiling`` pipeline:

.. code-block:: yaml

   receivers:
     otlp:
        protocols:
           grpc:

   exporters:
     splunk_hec:
        token: "${SFX_TOKEN}"
        endpoint: "https://ingest.${SFX_REALM}.signalfx.com/v1/log"
     logging/info:
        loglevel: info

   processors:
     batch:

   service:
     pipelines:
        profiling:
           receivers: [otlp]
           processors: [batch]
           exporters: [logging/info, splunk_hec]

Loss of profiling data or gaps in profiling data
-------------------------------------------------------------

When the instrumentation can't send data to Splunk OpenTeletry Collector due to full buffers, AlwaysOn Profiling enables the escape hatch, which drops all logs with profiling data until the buffers are empty.

If the escape hatch activates, it logs the following message:

``Skipping a thread sample period, buffers are full.``

The thread sampler resumes its activity when any of the buffers is empty.

To avoid the loss of profiling data due to full buffers, check the configuration and the communication layer between your process and the Splunk Distribution of OpenTelemetry Collector.

.. include:: /_includes/troubleshooting-steps.rst