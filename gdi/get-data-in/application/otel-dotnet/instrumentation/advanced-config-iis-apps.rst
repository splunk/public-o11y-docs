.. _advanced-config-iis-apps:

*******************************************
Advanced configuration for IIS applications
*******************************************

Follow these advanced configuration steps to make changes to specific application pools.

Set resource attributes
=======================

You can set the resource attributes for specific application pools in the ``environmentVariables`` block of the :new-page:`applicationHost.config file <https://learn.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/#configuration-sample>`.

For example:

.. code-block:: xml

    <environmentVariables>
        <add name="OTEL_RESOURCE_ATTRIBUTES" value="deployment.environment=test,service.version=1.0.0" />
    </environmentVariables>

.. note::

   If you set the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable in the ``environmentVariable`` block and in the web.config ``appSettings`` block, the value in the ``environmentVariables`` block takes precedence.

Active or deactivate instrumentation
=====================================

Use the PowerShell module to activate or deactivate the instrumentation for specific application pools.

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