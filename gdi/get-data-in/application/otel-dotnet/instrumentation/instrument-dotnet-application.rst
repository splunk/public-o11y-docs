.. _instrument-otel-dotnet-applications:

***************************************************************************
Instrument a .NET application for Splunk Observability Cloud (OTel)
***************************************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry .NET automatically instruments .NET applications, Windows services running .NET applications, and ASP.NET applications deployed on IIS. Follow these steps to get started.

The Splunk Distribution of OpenTelemetry .NET automatically instruments .NET applications, Windows services running .NET applications, and ASP.NET applications deployed on IIS.

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

#. Check that you meet the requirements. See :ref:`dotnet-requirements`.

#. Download the PowerShell script module of the Splunk Distribution of OpenTelemetry .NET from the :new-page:`Releases page on GitHub <https://github.com/signalfx/splunk-otel-dotnet/releases>`. For example:

   .. code-block:: powershell

      # Download and import the module
      $module_url = "https://github.com/signalfx/splunk-otel-dotnet/releases/download/<version>/Splunk.OTel.DotNet.psm1"
      $download_path = Join-Path $env:temp "Splunk.OTel.DotNet.psm1"
      Invoke-WebRequest -Uri $module_url -OutFile $download_path
      Import-Module $download_path

#. Install and configure the distribution:

   .. tabs::

      .. code-tab:: shell .NET application

         # Install core files
         Install-OpenTelemetryCore

         # Setup environment to start instrumentation from the current PowerShell session
         Register-OpenTelemetryForCurrentSession -OTelServiceName "<your-service-name>"

      .. code-tab:: shell IIS application

         # Install core files
         Install-OpenTelemetryCore

         # Setup IIS instrumentation
         Register-OpenTelemetryForIIS
      
      .. code-tab:: shell Windows service

         # Install core files
         Install-OpenTelemetryCore

         # Setup your Windows Service instrumentation
         Register-OpenTelemetryForWindowsService -WindowsServiceName "<your-windows-service-name>" -OTelServiceName "<your-service-display-name>"

#. Set the environment and service version resource attributes:

   .. code-block:: powershell

      $env:OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<envtype>,version=<version>'

   Avoid setting the environment variables in the system or user scopes in Windows unless you require permanent autoinstrumentation. See :ref:`advanced-dotnet-configuration` for more information on how to include or exclude processes for autoinstrumentation.

#. Run your application.

If no data appears in :strong:`Observability > APM`, see :ref:`common-dotnet-troubleshooting`.

.. note:: If you need to add custom attributes to spans or want to manually generate spans, instrument your .NET application or service manually. See :ref:`dotnet-manual-instrumentation`.

Linux and macOS
-------------------

#. Check that you meet the requirements. See :ref:`dotnet-requirements`.

#. Download the installation script of the Splunk Distribution of OpenTelemetry .NET from the :new-page:`Releases page on GitHub <https://github.com/signalfx/splunk-otel-dotnet/releases>`. For example:

   .. code-block:: shell

         curl -sSfL https://raw.githubusercontent.com/signalfx/splunk-otel-dotnet/<version>/splunk-otel-dotnet-install.sh -O

#. Install the distribution for your operating system:

   .. code-block:: shell

      sh ./splunk-otel-dotnet-install.sh
      . $HOME/.splunk-otel-dotnet/instrument.sh

#. Set the following environment variables:

   .. code-block:: shell

      export OTEL_SERVICE_NAME='<service-name>'
      export OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<envtype>,version=<version>'

   Avoid setting the environment variables in the system or user scopes in Windows unless you require permanent autoinstrumentation. See :ref:`advanced-dotnet-configuration` for more information on how to include or exclude processes for autoinstrumentation.      

#. Run your application.

If no data appears in :strong:`Observability > APM`, see :ref:`common-dotnet-troubleshooting`.

.. note:: If you need to add custom attributes to spans or want to manually generate spans, instrument your .NET application or service manually. See :ref:`dotnet-manual-instrumentation`.

.. _kubernetes_dotnet_otel:

Deploy the .NET instrumentation in Kubernetes
==========================================================

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
               - name: OTEL_EXPORTER_OTLP_ENDPOINT
                 value: "http://$(SPLUNK_OTEL_AGENT):4317"
               - name: OTEL_SERVICE_NAME
                 value: "<serviceName>"
               - name: OTEL_RESOURCE_ATTRIBUTES
                 value: "deployment.environment=<environmentName>"

.. _export-directly-to-olly-cloud-dotnet-otel:

Send data directly to Observability Cloud
==============================================================

By default, all telemetry is sent to the local instance of the Splunk Distribution of OpenTelemetry Collector.

To bypass the OTel Collector and send data directly to Observability Cloud, set the following environment variables:

.. tabs::

   .. code-tab:: shell Windows PowerShell

      $env:SIGNALFX_ACCESS_TOKEN=<access_token>
      $env:SIGNALFX_REALM=<realm>

   .. code-tab:: shell Linux

      export SIGNALFX_ACCESS_TOKEN=<access_token>
      export SIGNALFX_REALM=<realm>

To obtain an access token, see :ref:`admin-api-access-tokens`.

In the ingest endpoint URL, ``realm`` is the Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

#. Open the left navigation menu in Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section. 
