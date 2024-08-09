.. _instrument-otel-dotnet-applications:

*******************************************************************************
Instrument your .NET application for Splunk Observability Cloud (OpenTelemetry)
*******************************************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry .NET automatically instruments .NET applications, Windows services running .NET applications, and ASP.NET applications deployed on IIS. Follow these steps to get started.

The Splunk Distribution of OpenTelemetry .NET automatically instruments .NET applications, Windows services running .NET applications, and ASP.NET applications deployed on IIS.

You can install the .NET instrumentation manually or using the NuGet packages. The manual instructions include the option to use a guided setup. The NuGet packages are the best method for avoiding dependency version conflicts, but are not well-suited for instrumenting multiple applications running on the same machine. Review the :ref:`pre-checks <dotnet-pre-checks>` and the various installation procedures on this page to identify the best installation method for your application environment.

To learn about automatic discovery, see :ref:`discovery_mode`.

.. _otel-dotnet-nuget-pkg:

Install the OpenTelemetry .NET instrumentation using the NuGet packages
=======================================================================

You can deploy the Splunk Distribution of the OpenTelemetry .NET instrumentation automatically using the official NuGet packages. Your instrumented application project must support NuGet packages.

The following scenarios are ideal for using the NuGet packages:

* You control the application build but not the machine or container where the application is running.
* You're instrumenting a self-contained application. See :new-page:`Publish self-contained <https://learn.microsoft.com/en-us/dotnet/core/deploying/#publish-self-contained>` in the .NET documentation.
* You want to facilitate developer experimentation with automatic instrumentation through NuGet packages.
* You need to solve version conflicts between the dependencies used by the application and the automatic instrumentation.

However, you shouldn't use the NuGet packages if any of the following apply to your scenario:

* You're unable to add the NuGet packages to the application project. This can be the case when instrumenting a third-party application.
* You can't accommodate the increased disk use required by installing the NuGet packages separately for each instrumented application running on the same machine. 
* You need to instrument a legacy application that can't be migrated to the SDK-style project. To verify whether your project is SDK style, see `Identify the project format <https://learn.microsoft.com/en-us/nuget/resources/check-project-format>`__ in the NuGet documentation.

.. note::

   For advanced configuration of the .NET automatic instrumentation, such as changing trace propagation formats or changing the endpoint URLs, see :ref:`advanced-dotnet-otel-configuration`.

Instrument your application using the NuGet packages
----------------------------------------------------

To automatically instrument your application using the NuGet packages, add the ``Splunk.OpenTelemetry.AutoInstrumentation`` package to your project.

#. In a terminal, navigate to the root directory of your .NET application.

#. Add the NuGet packages using the following command, replacing ``<project>`` with the ``.csproj`` file name:

   .. code-block:: powershell

      dotnet add <project> package Splunk.OpenTelemetry.AutoInstrumentation --prerelease

If the build fails and prompts you to add missing instrumentation packages, add the instrumentation package or skip the instrumentation of the listed package by adding it to the ``SkippedInstrumentation`` property. For example:

.. code-block:: xml

   <PropertyGroup>
      <SkippedInstrumentations>MongoDB.Driver.Core;StackExchange.Redis</SkippedInstrumentations>
   </PropertyGroup>

Alternatively, you can set the ``SkippedInstrumentation`` property from the terminal. Rewrite the ``;`` separator as ``%3B``. For example:

.. code-block:: powershell

   dotnet build -p:SkippedInstrumentations=StackExchange.Redis%3BMongoDB.Driver.Core

To distribute the appropriate native runtime components with your .NET application, specify a Runtime Identifier (RID) to build the application using ``dotnet build`` or ``dotnet publish``.

Both self-contained and framework-dependent applications are compatible with automatic instrumentation. See :new-page:`.NET application publishing overview <https://learn.microsoft.com/en-us/dotnet/core/deploying/>` in the .NET documentation for more information.

Run the instrumented application
--------------------------------

The instrumentation procedure in the previous section produces launch scripts in the output folder of the build. The Windows script is ``splunk-launch.cmd`` and the Linux script is ``splunk-launch.sh``. The script passes all the command-line parameters that you provide to the application. Use the following steps to run your instrumented application:

#. Identify the launch script in your build output.

#. Optional. If you want to verify that the instrumentation is working by viewing the telemetry data output in your console, set the following environment variables to ``true``:

   * ``OTEL_DOTNET_AUTO_TRACES_CONSOLE_EXPORTER_ENABLED``
   * ``OTEL_DOTNET_AUTO_METRICS_CONSOLE_EXPORTER_ENABLED``
   * ``OTEL_DOTNET_AUTO_LOGS_CONSOLE_EXPORTER_ENABLED``

#. Run the instrumented application using the launch script:

   * Using the executable:

     - Windows: ``splunk-launch.cmd <application_executable>``.
     - Linux: ``splunk-launch.sh <application_executable>``.

   * Using the ``dotnet`` CLI:

     - Windows: ``splunk-launch.cmd dotnet <application>``.
     - Linux: ``splunk-launch.sh dotnet <application>``.

Install the Splunk Distribution of OpenTelemetry .NET manually
==============================================================

You can deploy the Splunk Distribution of OpenTelemetry .NET instrumentation manually, using either the guided setup or the step-by-step instructions below.

The primary benefit to installing manually is that doing so enables you to instrument multiple .NET applications that run in the same environment. The primary limitation is that there is an increased likelihood of version conflicts between the dependencies used by the application and the automatic instrumentation.

To install the distribution using the official NuGet packages, see :ref:`otel-dotnet-nuget-pkg`.

Generate customized instructions using the guided setup
-------------------------------------------------------

To generate all the basic installation commands for your environment and application, use the .NET OpenTelemetry guided setup. To access the .NET OpenTelemetry guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`.NET OpenTelemetry guided setup <https://login.signalfx.com/#/gdi/scripted/otel-dotnet-tracing/>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`.
   #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.
   #. In the integration filter menu, select :guilabel:`By Product`.
   #. Select the :guilabel:`APM` product.
   #. Select the :guilabel:`.NET (OpenTelemetry)` tile to open the .NET OpenTelemetry guided setup.

.. _install-dotnet-otel-instrumentation:

Instrument your .NET application
--------------------------------

If you don't use the guided setup, follow these instructions to manually install the Splunk Distribution of OpenTelemetry .NET:

- :ref:`install-dotnet-otel-instrumentation`
- :ref:`configure-otel-dotnet`

Use the following steps to automatically instrument your application.

.. warning::

   In .NET version 8, setting the ``DOTNET_EnableDiagnostics`` runtime environment variable to ``0`` deactivates all diagnostics including the CLR Profiler, which is required for launching the .NET instrumentation if you are not using .NET startup hooks. Make sure that ``DOTNET_EnableDiagnostics`` is set to ``1``. To limit diagnostics to only the CLR Profiler, use the following environment variable settings:
   
   * ``DOTNET_EnableDiagnostics=1``
   * ``DOTNET_EnableDiagnostics_Profiler=1``
   * ``DOTNET_EnableDiagnostics_IPC=0``
   * ``DOTNET_EnableDiagnostics_Debugger=0``

Windows
^^^^^^^

#. Check that you meet the requirements. See :ref:`dotnet-otel-requirements`.

#. (Optional) If needed, uninstall the SignalFx Instrumentation for .NET. See :ref:`uninstall-dotnet-sfx`.

#. Download and install the Splunk Distribution of OpenTelemetry .NET from the :new-page:`Releases page on GitHub <https://github.com/signalfx/splunk-otel-dotnet/releases>`. For example:

   .. code-block:: powershell

      # Download and import the PowerShell module
      $module_url = "https://github.com/signalfx/splunk-otel-dotnet/releases/latest/download/Splunk.OTel.DotNet.psm1"
      $download_path = Join-Path $env:temp "Splunk.OTel.DotNet.psm1"
      Invoke-WebRequest -Uri $module_url -OutFile $download_path
      Import-Module $download_path

      # Install the Splunk distribution using the PowerShell module
      Install-OpenTelemetryCore

#. Register the distribution according to the type of application you're instrumenting:

   .. tabs::

      .. code-tab:: shell .NET and .NET Framework Applications

         # Set up environment to start instrumentation from the current PowerShell session
         Register-OpenTelemetryForCurrentSession -OTelServiceName "<your-service-name>"

      .. code-tab:: shell IIS application

         # Set up IIS instrumentation
         # IIS is restarted as a result
         Register-OpenTelemetryForIIS

      .. code-tab:: shell Windows service

         # Set up your Windows Service instrumentation
         Register-OpenTelemetryForWindowsService -WindowsServiceName "<your-windows-service-name>" -OTelServiceName "<your-OTel-service-name>"

#. Set the environment and service version resource attributes:

   .. tabs::

      .. tab:: .NET and .NET Framework

         .. code-block:: powershell

            # Configure environment and service version for current PowerShell session
            $env:OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<envtype>,service.version=<version>'

         Run your application after setting the attribute.

         .. note:: This command instruments any applications launched in the same PowerShell session. It won't instrument applications in a different PowerShell session.

      .. tab:: IIS (ASP.NET)

         For ASP.NET applications, configure the service name and resource attributes in the ``appSettings`` block of the web.config file:

         .. code-block:: xml

            <appSettings>
               <add key="OTEL_SERVICE_NAME" value="my-service-name" />
               <add key="OTEL_RESOURCE_ATTRIBUTES" value="deployment.environment=test,service.version=1.0.0" />
            </appSettings>

         .. note:: 
            If ``OTEL_SERVICE_NAME`` is not set for a web application hosted in IIS, the inferred name based on the site name and virtual directory path is used.

         .. note:: 
            If multiple applications are running in the same IIS Application Pool do not use the ``appSettings`` block of the web.config file to configure any environment variable. Let the instrumentation infer the name and use the Application Pool environment variables configuration, see below, to set the resource attributes (which will be shared by all applications in the Application Pool).

         After modifying the web.config file, restart IIS:

         .. code-block:: powershell

            Start-Process "iisreset.exe" -NoNewWindow -Wait

         You can also set the resource attributes for specific application pools in the ``environmentVariables`` block of the :new-page:`applicationHost.config file <https://learn.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/#configuration-sample>`. For example:

         .. code-block:: xml

            <environmentVariables>
               <add name="OTEL_RESOURCE_ATTRIBUTES" value="deployment.environment=test,service.version=1.0.0" />
            </environmentVariables>

         .. note::
            If the ``OTEL_SERVICE_NAME`` or ``OTEL_RESOURCE_ATTRIBUTES`` environment variables are set for a process, settings with the same names from ``appSettings`` block of web.config are ignored.

      .. tab:: IIS (ASP.NET Core)

         For ASP.NET Core applications hosted in IIS, the service name and resource attributes can be configured using the ``environmentVariables`` block of the :new-page:`web.config file <https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/web-config?view=aspnetcore-8.0#set-environment-variables>`. For example:

         .. code-block:: xml

            <environmentVariables>
               <environmentVariable name="OTEL_SERVICE_NAME" value="my-service-name" />
               <environmentVariable name="OTEL_RESOURCE_ATTRIBUTES" value="deployment.environment=test,service.version=1.0.0" />
            </environmentVariables>

         After modifying the ``web.config`` file, restart IIS:

         .. code-block:: powershell

            Start-Process "iisreset.exe" -NoNewWindow -Wait

      .. tab:: Windows service

         For .NET Framework applications, you can configure resource attributes in the ``appSettings`` block of the app.config file.

         .. code-block:: xml

            <appSettings>
               <add key="OTEL_RESOURCE_ATTRIBUTES" value="deployment.environment=test,service.version=1.0.0" />
            </appSettings>

         You can also modify the ``Environment`` key in the Windows Registry for each Windows service.

         After modifying the app.config file or the Windows Registry, restart the service:

         .. code-block:: powershell

            Restart-Service -Name "<your-windows-service-name>" -Force

If no data appears in APM, see :ref:`common-dotnet-otel-troubleshooting`.

.. note:: If you need to add custom attributes to spans or want to manually generate spans and metrics, instrument your .NET application or service manually. See :ref:`dotnet-otel-manual-instrumentation`.

Linux
^^^^^

#. Check that you meet the requirements. See :ref:`dotnet-otel-requirements`.

#. (Optional) If needed, uninstall the SignalFx Instrumentation for .NET. See :ref:`uninstall-dotnet-sfx`.

#. Download and install the installation script of the Splunk Distribution of OpenTelemetry .NET from the :new-page:`Releases page on GitHub <https://github.com/signalfx/splunk-otel-dotnet/releases>`. For example:

   .. code-block:: shell

      curl -sSfL https://github.com/signalfx/splunk-otel-dotnet/releases/latest/download/splunk-otel-dotnet-install.sh -O
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

If no data appears in APM, see :ref:`common-dotnet-otel-troubleshooting`.

.. note:: If you need to add custom attributes to spans or want to manually generate spans, instrument your .NET application or service manually. See :ref:`dotnet-otel-manual-instrumentation`.

.. _activate-profiling-dotnet-otel:

Activate AlwaysOn Profiling
^^^^^^^^^^^^^^^^^^^^^^^^^^^

To activate AlwaysOn Profiling, set the ``SPLUNK_PROFILER_ENABLED`` environment variable to ``true``.

To activate memory profiling, set the ``SPLUNK_PROFILER_MEMORY_ENABLED`` environment variable to ``true`` after activating AlwaysOn Profiling.

See :ref:`get-data-in-profiling` for more information. For more settings, see :ref:`profiling-configuration-otel-dotnet`.

.. _configure-otel-dotnet:

Configure the instrumentation
---------------------------------------------

For advanced configuration of the .NET automatic instrumentation, like changing trace propagation formats or changing the endpoint URLs, see :ref:`advanced-dotnet-otel-configuration`.

Database Query Performance settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Starting from version 1.4.0, the .NET OTel instrumentation collects database queries for Database Query Performance. See :ref:`db-query-performance`.

SQL statements might contain sensitive information. To configure this behavior, see ``OTEL_DOTNET_AUTO_SQLCLIENT_SET_DBSTATEMENT_FOR_TEXT`` and ``OTEL_DOTNET_AUTO_ENTITYFRAMEWORKCORE_SET_DBSTATEMENT_FOR_TEXT`` in :ref:`dotnet-otel-instrumentation-settings`.

.. _docker-install-otel-dotnet:

Instrument an application running within a Docker container
--------------------------------------------------------------

An example of a Dockerfile that instruments a .NET application running inside a Docker container is available in the :new-page:`splunk/observability-content-contrib <https://github.com/splunk/observability-content-contrib/tree/main/integration-examples/splunk-otel-dotnet-docker>` repository on GitHub.

Instrument Azure Web Apps
---------------------------------------------------------------

To instrument applications or services running on Azure Web Apps, see :ref:`instrument-dotnet-azure-webapp`.


.. _windows-offline-install-otel-dotnet:

Offline installation for Windows
----------------------------------------------

To install the .NET automatic instrumentation on Windows hosts that are offline, follow these steps:

#. Download the following files from the :new-page:`Releases page on GitHub <https://github.com/signalfx/splunk-otel-dotnet/releases>` and copy them to the offline server:

   - ``Splunk.OTel.DotNet.psm1``
   - ``splunk-opentelemetry-dotnet-windows.zip``

#. Import the PowerShell script manually by running the following command:

   .. code-block:: powershell

      # Make sure the Download path is correct

      Import-Module C:\Users\Administrator\Downloads\Splunk.OTel.DotNet.psm1

   When prompted, enter ``R`` for ``Run Once``.

#. Run the install command:

   .. code-block:: powershell

      # Make sure the Download path is correct

      Install-OpenTelemetryCore -LocalPath "C:\Users\Administrator\Downloads\splunk-opentelemetry-dotnet-windows.zip"

.. _export-directly-to-olly-cloud-dotnet-otel:

Send data directly to Splunk Observability Cloud
====================================================================

By default, all telemetry is sent to the local instance of the Splunk Distribution of OpenTelemetry Collector.

To bypass the OTel Collector and send data directly to Splunk Observability Cloud, set the following environment variables:

.. tabs::

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_ACCESS_TOKEN=<access_token>
      $env:SPLUNK_REALM=<realm>

   .. code-tab:: shell Linux

      export SPLUNK_ACCESS_TOKEN=<access_token>
      export SPLUNK_REALM=<realm>

To obtain an access token, see :ref:`admin-api-access-tokens`.

To find your Splunk realm, see :ref:`Note about realms <about-realms>`.

Specify the source host 
----------------------------------------------

.. include:: /_includes/gdi/apm-api-define-host.rst

.. _uninstall-otel-dotnet:

Uninstall the .NET instrumentation
========================================

To deactivate and uninstall the .NET instrumentation, run the following commands:

.. tabs::

   .. code-tab:: powershell Windows (PowerShell)

      # Run the unregister command for your situation
      Unregister-OpenTelemetryForIIS
      Unregister-OpenTelemetryForWindowsService
      Unregister-OpenTelemetryForCurrentSession

      # Uninstall OpenTelemetry for .NET
      Uninstall-OpenTelemetryCore

   .. code-tab:: shell Linux

      rm -rf <path_of_otel_dotnet_install>
