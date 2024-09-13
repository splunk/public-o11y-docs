.. _advanced-config-iis-apps:

*******************************************
Advanced configuration for IIS applications
*******************************************

Follow these advanced configuration steps to make changes to specific application pools.

Set environment variables
=========================

You can set environment variables for specific application pools in the ``environmentVariables`` block of the :new-page:`applicationHost.config file <https://learn.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/#configuration-sample>`.

For example:

.. code-block:: xml

    <environmentVariables>
        <add name="OTEL_RESOURCE_ATTRIBUTES" value="deployment.environment=test,service.version=1.0.0" />
    </environmentVariables>

For all IIS applications, consider setting common environment variables for W3SVC and WAS Windows Services. For more information, see :new-page:`Instrument a Windows Service running a .NET application <https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/blob/main/docs/windows-service-instrumentation.md>` in the OpenTelemetry documentation.

.. note::

   If the same environment variables are set in the ``environmentVariable`` block and in the web.config ``appSettings`` block, the value in the ``environmentVariables`` block takes precedence.

Active or deactivate instrumentation
=====================================

For .NET Framework applications, use the PowerShell module to activate or deactivate the instrumentation for specific application pools.

#. Import the PowerShell module:
  
   .. code-block:: powershell

      Import-Module "OpenTelemetry.DotNet.Auto.psm1"

   .. note::

      The application pool name is case sensitive.

#. Activate or deactivate the application pool.

   * Activate instrumentation for the application pool:

     .. code-block:: powershell

        Enable-OpenTelemetryForIISAppPool -AppPoolName <app-pool>

   * Deactivate instrumentation for the application pool:

     .. code-block:: powershell

        Disable-OpenTelemetryForIISAppPool -AppPoolName <app-pool>

#. Restart the application pool:

   .. code-block:: powershell

      Restart-WebAppPool -Name <app-pool>