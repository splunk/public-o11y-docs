.. _instrument-otel-dotnet-applications:

****************************************************************************
Instrument a .NET application for Splunk Observability Cloud (OpenTelemetry)
****************************************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry .NET automatically instruments .NET applications, Windows services running .NET applications, and ASP.NET applications deployed on IIS. Follow these steps to get started.

The Splunk Distribution of OpenTelemetry .NET automatically instruments .NET applications, Windows services running .NET applications, and ASP.NET applications deployed on IIS.

.. caution:: This distribution is currently in beta. Don't use it in production environments. Some features might not be supported or might have constrained capabilities. Support is provided on a best-effort basis.

To get started, use the guided setup or follow the instructions manually.

Generate customized instructions using the guided setup
====================================================================

To generate all the basic installation commands for your environment and application, use the .NET OpenTelemetry guided setup. To access the .NET OpenTelemetry guided setup, follow these steps:

#. Log in to Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management`. 
#. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
#. In the integration filter menu, select :guilabel:`By Product`.
#. Select the :guilabel:`APM` product.
#. Select the :guilabel:`.NET OpenTelemetry` tile to open the .NET OpenTelemetry guided setup.

.. _install-dotnet-otel-instrumentation:

Instrument a .NET application
===================================================================

Follow these steps to automatically instrument your application:

Windows
-------------------

#. Check that you meet the requirements. See :ref:`dotnet-otel-requirements`.

#. Download and install the Splunk Distribution of OpenTelemetry .NET from the :new-page:`Releases page on GitHub <https://github.com/signalfx/splunk-otel-dotnet/releases>`. For example:

   .. code-block:: powershell

      # Download and import the PowerShell module
      # Replace <version> with the desired version
      $module_url = "https://github.com/signalfx/splunk-otel-dotnet/releases/download/<version>/Splunk.OTel.DotNet.psm1"
      $download_path = Join-Path $env:temp "Splunk.OTel.DotNet.psm1"
      Invoke-WebRequest -Uri $module_url -OutFile $download_path    
      Import-Module $download_path

      # Install the Splunk distribution using the PowerShell module
      Install-OpenTelemetryCore

#. Register the distribution:

   .. tabs::

      .. code-tab:: shell .NET application

         # Setup environment to start instrumentation from the current PowerShell session
         Register-OpenTelemetryForCurrentSession -OTelServiceName "<your-service-name>"

      .. code-tab:: shell IIS application (.NET Core)

         # Setup IIS instrumentation
         Register-OpenTelemetryForIIS
      
      .. code-tab:: shell Windows service

         # Setup your Windows Service instrumentation
         Register-OpenTelemetryForWindowsService -WindowsServiceName "<your-windows-service-name>"

   .. note:: To instrument ASP.NET (.NET Framework) apps, see :ref:`otel-dotnet-aspnet-framework`.

#. Set the environment and service version resource attributes:

   .. code-block:: powershell

      # You can also set this in web.config or app.config
      $env:OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<envtype>,service.version=<version>'

#. Run your application.

If no data appears in :strong:`Observability > APM`, see :ref:`common-dotnet-otel-troubleshooting`.

.. note:: If you need to add custom attributes to spans or want to manually generate spans and metrics, instrument your .NET application or service manually. See :ref:`dotnet-otel-manual-instrumentation`.

Linux
-------------------

#. Check that you meet the requirements. See :ref:`dotnet-otel-requirements`.

#. Download and install the installation script of the Splunk Distribution of OpenTelemetry .NET from the :new-page:`Releases page on GitHub <https://github.com/signalfx/splunk-otel-dotnet/releases>`. For example:

   .. code-block:: shell

      # Replace <version> with the desired version
      curl -sSfL https://raw.githubusercontent.com/signalfx/splunk-otel-dotnet/<version>/splunk-otel-dotnet-install.sh -O
      # Install the distribution
      sh ./splunk-otel-dotnet-install.sh

#. Activate the automatic instrumentation:

   .. code-block:: shell

      # Activate the automatic instrumentation
      . $HOME/.splunk-otel-dotnet/instrument.sh

#. Set the environment and service version resource attributes:

   .. code-block:: shell

      export OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<envtype>,service.version=<version>'     

#. Run your application.

If no data appears in :strong:`Observability > APM`, see :ref:`common-dotnet-otel-troubleshooting`.

.. note:: If you need to add custom attributes to spans or want to manually generate spans, instrument your .NET application or service manually. See :ref:`dotnet-manual-otel-instrumentation`.

.. _otel-dotnet-aspnet-framework:

Additional steps for ASP.NET (.NET Framework)
================================================

To complete the instrumentation process for ASP.NET applications not running on .NET Core, add the ``TelemetryHttpModule`` module to your application's ``web.config`` file. For example:

.. code-block:: xml

   <system.web>
      <httpModules>
         <add name="TelemetryHttpModule" type="OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule, OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule" />
      </httpModules>
   </system.web>

You can also set the ASP.NET HTTP module in the ``applicationHost.config`` file. The following example shows how to set the module for all ASP.NET applications running in Integrated Pipeline mode:

.. code-block:: xml

   <location path="" overrideMode="Allow">
      <system.webServer>
         <modules>
         <add name="TelemetryHttpModule" type="OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule, OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule" preCondition="managedHandler" />
         </modules>
      </system.webServer>
   </location>   

.. _configure-otel-dotnet:

Configure the instrumentation
===================================

For advanced configuration of the .NET automatic instrumentation, like changing trace propagation formats or changing the endpoint URLs, see :ref:`advanced-dotnet-otel-configuration`.

.. _export-directly-to-olly-cloud-dotnet-otel:

Send data directly to Observability Cloud
==============================================================

By default, all telemetry is sent to the local instance of the Splunk Distribution of OpenTelemetry Collector.

To bypass the OTel Collector and send data directly to Observability Cloud, set the following environment variables:

.. tabs::

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_ACCESS_TOKEN=<access_token>
      $env:SPLUNK_REALM=<realm>

   .. code-tab:: shell Linux

      export SPLUNK_ACCESS_TOKEN=<access_token>
      export SPLUNK_REALM=<realm>

To obtain an access token, see :ref:`admin-api-access-tokens`.

In the ingest endpoint URL, ``realm`` is the Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

#. Open the left navigation menu in Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section. 
