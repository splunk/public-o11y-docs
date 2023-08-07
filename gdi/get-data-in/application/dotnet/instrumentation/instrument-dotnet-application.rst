.. _instrument-dotnet-applications:

***************************************************************************
Instrument a .NET application for Splunk Observability Cloud
***************************************************************************

.. meta::
   :description: The SignalFx Instrumentation for .NET automatically instruments .NET applications, Windows services running .NET applications, ASP.NET applications deployed on IIS, and Azure App Service apps. Follow these steps to get started.

The SignalFx Instrumentation for .NET automatically instruments .NET applications, Windows services running .NET applications, ASP.NET applications deployed on IIS, and Azure App Service applications.

To get started, use the guided setup or follow the instructions manually.

Generate customized instructions using the guided setup
====================================================================

To generate all the basic installation commands for your environment and application, use the .NET guided setup. To access the .NET guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`.NET guided setup <https://login.signalfx.com/#/gdi/scripted/dotnet-tracing/step-1?category=product-apm&gdiState=%7B"integrationId":"dotnet-tracing"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`. 

   #. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.

   #. In the integration filter menu, select :guilabel:`By Product`.

   #. Select the :guilabel:`APM` product.

   #. Select the :guilabel:`.NET` tile to open the .NET guided setup.

Install the SignalFx Instrumentation for .NET manually
==================================================================

Follow these instructions to install the SignalFx Instrumentation for .NET:

- :ref:`install-dotnet-instrumentation`
- :ref:`instrument-windows-service`
- :ref:`instrument-aspnet-iis`
- :ref:`instrument-azure-app`
- :ref:`instrument-azure-webjobs`

.. _install-dotnet-instrumentation:

Instrument a .NET application
--------------------------------------------------------------------

Follow these steps to automatically instrument your application:

#. Check that you meet the requirements. See :ref:`dotnet-requirements`.

#. Download the latest release of the SignalFx Instrumentation for .NET for your operating system from the :new-page:`Releases page on GitHub <https://github.com/signalfx/signalfx-dotnet-tracing/releases/latest>`.

#. Install the package for your operating system:

   .. tabs::

      .. group-tab:: Windows (PowerShell)

         .. tabs::

            .. code-tab:: shell Windows x64

               msiexec /i signalfx-dotnet-tracing-<version-here>-x64.msi /quiet

            .. code-tab:: shell Windows x86

               msiexec /i signalfx-dotnet-tracing-<version-here>-x86.msi /quiet

      .. group-tab:: Linux

         .. tabs::

            .. code-tab:: bash rpm

               rpm -ivh signalfx-dotnet-tracing-<version-here>.rpm
               ./opt/signalfx/createLogPath.sh # Optional

            .. code-tab:: bash deb

               dpkg -i signalfx-dotnet-tracing-<version-here>.deb
               ./opt/signalfx/createLogPath.sh # Optional

            .. code-tab:: bash tar (glibc)

               tar -xf signalfx-dotnet-tracing-<version-here>.tar.gz -C /opt/signalfx
               ./opt/signalfx/createLogPath.sh # Optional

#. Set the following environment variables:

   .. tabs::

      .. group-tab:: Windows (PowerShell)

         .. code-block:: shell

            # Set the following variables in the process scope
            $Env:COR_ENABLE_PROFILING = "1"
            $Env:COR_PROFILER = "{B4C89B0F-9908-4F73-9F59-0D77C5A06874}"
            $Env:CORECLR_ENABLE_PROFILING = "1"
            $Env:CORECLR_PROFILER = "{B4C89B0F-9908-4F73-9F59-0D77C5A06874}"
            $Env:SIGNALFX_SERVICE_NAME = "<my-service-name>"
            $Env:SIGNALFX_ENV = "<your-environment>"

         - Avoid setting the environment variables in the system or user scopes in Windows unless you require permanent autoinstrumentation. See :ref:`advanced-dotnet-configuration` for more information on how to include or exclude processes for autoinstrumentation.

      .. code-tab:: shell Linux

         export CORECLR_ENABLE_PROFILING="1"
         export CORECLR_PROFILER="{B4C89B0F-9908-4F73-9F59-0D77C5A06874}"
         export CORECLR_PROFILER_PATH="/opt/signalfx/SignalFx.Tracing.ClrProfiler.Native.so"
         export SIGNALFX_DOTNET_TRACER_HOME="/opt/signalfx"
         export SIGNALFX_SERVICE_NAME="<my-service-name>"
         export SIGNALFX_ENV="<your-environment>"

#. (Optional) To activate automatic metric collection, see :ref:`enable_automatic_metric_collection_dotnet`.

#. Run your application.

If no data appears in APM, see :ref:`common-dotnet-troubleshooting`.  

If you need to add custom attributes to spans or want to manually generate spans, instrument your .NET application or service manually. See :ref:`dotnet-manual-instrumentation`.

.. _enable_profiling_dotnet:

Activate AlwaysOn Profiling
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To activate AlwaysOn Profiling, set the ``SIGNALFX_PROFILER_ENABLED`` environment variable to ``true``.

To activate memory profiling, set the ``SIGNALFX_PROFILER_MEMORY_ENABLED`` environment variable to ``true`` after activating AlwaysOn Profiling.

See :ref:`get-data-in-profiling` for more information. For more settings, see :ref:`profiling-configuration-dotnet`.

.. _enable_automatic_metric_collection_dotnet:

Activate metrics collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To activate automatic metric collection, set the ``SIGNALFX_TRACE_METRICS_ENABLED`` environment variable to ``true``.

To activate runtime metrics, set the ``SIGNALFX_RUNTIME_METRICS_ENABLED`` environment variable to ``true``.

See :ref:`dotnet-metrics-attributes` for more information about the metrics collected by the instrumentation. For more metric settings, see :ref:`dotnet-metric-settings`. 

.. note:: Runtime metrics are always collected if AlwaysOn Profiling is activated.

.. _instrument-windows-service:

Instrument a Windows service running a .NET application
--------------------------------------------------------------------

To instrument a Windows service, install the instrumentation and set the following environment variables:

.. code-block:: shell

   $svcName = "MySrv"    # Name of the Windows service you want to instrument
   [string[]] $vars = @(
      "COR_ENABLE_PROFILING=1",                                  # Activate .NET Framework Profiler
      "COR_PROFILER={B4C89B0F-9908-4F73-9F59-0D77C5A06874}",     # Select .NET Framework Profiler
      "CORECLR_ENABLE_PROFILING=1",                              # Activate .NET (Core) Profiler
      "CORECLR_PROFILER={B4C89B0F-9908-4F73-9F59-0D77C5A06874}", # Select .NET (Core) Profiler
      "SIGNALFX_SERVICE_NAME=<my-service-name>",                 # Set service name
      "SIGNALFX_ENV=<environment-name>"                          # Set environment name
   )
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\$svcName -Name Environment -Value $vars
   # Every time you start the service, it will be auto-instrumented.

For more information on the default service name, see :ref:`dotnet-default-service-name`.

.. _instrument-aspnet-iis:

Instrument an ASP.NET application deployed on IIS
--------------------------------------------------------------------

To instrument an ASP.NET application running on IIS, install the instrumentation and edit the web.config file to add the following settings. See :ref:`configuration-methods-dotnet` for more information.

.. tabs::

   .. tab:: ASP.NET 4.x and higher

      Add the following settings inside the ``<appSettings>`` block of your web.config file:

      .. code-block:: xml

         <add key="SIGNALFX_SERVICE_NAME" value="service-name" />
         <add key="SIGNALFX_ENV" value="environment-name" />

      After applying the changes to the web.config file, restart IIS by running the following command:

      .. code-block:: powershell

         Start-Process "iisreset.exe" -NoNewWindow -Wait

      In some cases, you might have to restart the machine.

   .. tab:: ASP.NET Core

      Add the following settings inside the ``<aspNetCore>`` block of your web.config file:

      .. code-block:: xml

         <environmentVariables>
            <environmentVariable name="CORECLR_ENABLE_PROFILING" value="1" />
            <environmentVariable name="CORECLR_PROFILER" value="{B4C89B0F-9908-4F73-9F59-0D77C5A06874}" />
            <environmentVariable name="SIGNALFX_SERVICE_NAME" value="service-name" />
            <environmentVariable name="SIGNALFX_ENV" value="environment-name" />
         </environmentVariables>

      After applying the changes to the web.config file, restart IIS by running the following command:

      .. code-block:: powershell

         Start-Process "iisreset.exe" -NoNewWindow -Wait

      In some cases, you might have to restart the machine.

      .. note:: The ASP.NET Core instrumentation collects and obfuscates query strings by default. See :ref:`dotnet-instrumentation-query-strings` for more information.

.. note:: By default, the installer activates IIS instrumentation for .NET Framework by setting the ``Environment`` registry key for W3SVC and WAS services located in the ``HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services`` folder.

.. _instrument-azure-app:

Instrument an application in Azure App Service
--------------------------------------------------------------------

To instrument an application or service in Azure App Service, follow these steps:

#. Find and install the :strong:`SignalFx .NET Tracing` extension in your application. See :new-page:`Adding Extensions to Web Apps in Azure App Service <https://microsoft.github.io/AzureTipsAndTricks/blog/tip21.html>` in the Azure documentation for more information.

#. Add the following application settings. See :new-page:`Configure Apps <https://learn.microsoft.com/en-us/azure/app-service/configure-common>` in the Azure documentation for more information.

   .. list-table::
      :header-rows: 1
      :width: 100%
      :widths: 40 60

      * - Name
        - Value
      * - ``SIGNALFX_ACCESS_TOKEN``
        - Your Splunk access token. To obtain an access token, see :ref:`admin-api-access-tokens`.
      * - ``SIGNALFX_REALM``
        - ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, open the navigation menu in Splunk Observability Cloud, select :menuselection:`Settings`, and select your username. The realm name appears in the :guilabel:`Organizations` section.
      * - ``SIGNALFX_SERVICE_NAME``
        - The name of your service or application.
      * - ``SIGNALFX_ENV``
        - The name of your environment where you're instrumenting the application.

#. Restart the application.

.. note:: To reduce latency and benefit from OTel Collector features, set the endpoint URL to a Collector instance running in Azure VM over an Azure VNet.

.. _instrument-azure-webjobs:

Instrument a background task in Azure App Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When instrumenting an Azure WebJob in App Service, add the following settings. Replace ``<extension-version>`` in system paths with the version of the .NET instrumentation, for example, ``v0.2.0``:

   .. list-table::
      :header-rows: 1
      :width: 100%
      :widths: 40 60

      * - Name
        - Value
      * - ``SIGNALFX_ACCESS_TOKEN``
        - Your Splunk access token. To obtain an access token, see :ref:`admin-api-access-tokens`.
      * - ``SIGNALFX_REALM``
        - ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, open the navigation menu in Splunk Observability Cloud, select :menuselection:`Settings`, and select your username. The realm name appears in the :guilabel:`Organizations` section.
      * - ``SIGNALFX_SERVICE_NAME``
        - The name of your service or application.
      * - ``SIGNALFX_ENV``
        - The name of your environment where you're instrumenting the application.
      * - ``COR_ENABLE_PROFILING``
        - ``1``
      * - ``COR_PROFILER``
        - ``{B4C89B0F-9908-4F73-9F59-0D77C5A06874}``
      * - ``COR_PROFILER_PATH``
        - ``C:\home\signalfx\tracing\<extension-version>\win-x64\SignalFx.Tracing.ClrProfiler.Native.dll``
      * - ``COR_PROFILER_PATH_32``
        - ``C:\home\signalfx\tracing\<extension-version>\win-x86\SignalFx.Tracing.ClrProfiler.Native.dll``
      * - ``COR_PROFILER_PATH_64``
        - ``C:\home\signalfx\tracing\<extension-version>\win-x64\SignalFx.Tracing.ClrProfiler.Native.dll``
      * - ``CORECLR_ENABLE_PROFILING``
        - ``1``
      * - ``CORECLR_PROFILER``
        - ``{B4C89B0F-9908-4F73-9F59-0D77C5A06874}``
      * - ``CORECLR_PROFILER_PATH_32``
        - ``C:\home\signalfx\tracing\<extension-version>\win-x86\SignalFx.Tracing.ClrProfiler.Native.dll``
      * - ``CORECLR_PROFILER_PATH_64``
        - ``C:\home\signalfx\tracing\<extension-version>\win-x64\SignalFx.Tracing.ClrProfiler.Native.dll``
      * - ``SIGNALFX_DOTNET_TRACER_HOME``
        - ``C:\home\signalfx\tracing\<extension-version>``
      * - ``SIGNALFX_PROFILER_EXCLUDE_PROCESSES``
        - ``SnapshotUploader.exe;workerforwarder.exe``
      * - ``SIGNALFX_TRACE_LOG_PATH``
        - ``C:\home\LogFiles\signalfx\tracing\<extension-version>\dotnet-profiler.log``
      * - ``SIGNALFX_AZURE_APP_SERVICES``
        - ``0``

.. caution:: Set ``SIGNALFX_AZURE_APP_SERVICES`` to ``0`` when instrumenting WebJobs. Keep a separate App Service for the WebJob, so that you can use separate settings for your application and for the background service.

.. _kubernetes_dotnet:

Deploy the .NET instrumentation in Kubernetes
--------------------------------------------------------------------

To deploy the .NET instrumentation in Kubernetes, configure the Kubernetes Downward API to expose environment variables to Kubernetes resources.

The following example shows how to update a deployment to expose environment variables by adding the agent configuration under the ``.spec.template.spec.containers.env`` section:

.. code-block:: yaml

   apiVersion: apps/v1
   kind: Deployment
   spec:
     selector:
       matchLabels:
         app: your-application
     template:
       spec:
         containers:
           - name: myapp
             env:
               - name: SPLUNK_OTEL_AGENT
                 valueFrom:
                   fieldRef:
                     fieldPath: status.hostIP
               - name: SIGNALFX_ENDPOINT_URL 
                 value: "http://$(SPLUNK_OTEL_AGENT):9411/api/v2/spans"
               - name: SIGNALFX_SERVICE_NAME
                 value: '<name-of-your-service>'
               - name: SIGNALFX_ENV
                 value: '<name-of-your-environment>'
               - name: CORECLR_ENABLE_PROFILING
                 value: "1"
               - name: CORECLR_PROFILER
                 value: '{B4C89B0F-9908-4F73-9F59-0D77C5A06874}'
               - name: CORECLR_PROFILER_PATH
                 value: '/opt/signalfx/SignalFx.Tracing.ClrProfiler.Native.so'
               - name: SIGNALFX_DOTNET_TRACER_HOME
                 value: '/opt/signalfx'

.. _export-directly-to-olly-cloud-dotnet:

Send data directly to Splunk Observability Cloud
--------------------------------------------------------------------

By default, the instrumentation sends all telemetry to the local instance of the Splunk Distribution of OpenTelemetry Collector.

To bypass the OTel Collector and send data directly to Splunk Observability Cloud, set the following environment variables:

.. tabs::

   .. code-tab:: shell Windows PowerShell

      $env:SIGNALFX_ACCESS_TOKEN=<access_token>
      $env:SIGNALFX_REALM=<realm>

   .. code-tab:: shell Linux

      export SIGNALFX_ACCESS_TOKEN=<access_token>
      export SIGNALFX_REALM=<realm>

To obtain an access token, see :ref:`admin-api-access-tokens`.

In the ingest endpoint URL, ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

#. Open the navigation menu in Splunk Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section.

For more information on the ingest API endpoints, see :new-page:`Send APM traces <https://dev.splunk.com/observability/docs/apm/send_traces/>`.

.. caution:: This procedure applies to spans and traces. To send AlwaysOn Profiling data, you must use the OTel Collector.

