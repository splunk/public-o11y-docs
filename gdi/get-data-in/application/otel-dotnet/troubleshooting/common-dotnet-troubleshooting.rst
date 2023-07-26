.. _common-dotnet-otel-troubleshooting:

*******************************************************************
Troubleshoot .NET instrumentation for Splunk Observability Cloud
*******************************************************************

.. meta::
   :description: If your instrumented .NET application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a .NET application using the Splunk Distribution of OpenTelemetry .NET and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. caution:: This is a beta distribution. Use it for evaluation purposes only. Don't use it in production environments. Some features might have restrictions, limited stability, or might change in next versions. Limited support is provided on best-effort basis.

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