.. _windows-backend:

****************************************************************
Automatic discovery for back-end applications in Windows
****************************************************************

.. meta:: 
    :description: draft

Automatic discovery can detect the following types of applications in your Windows environment:

Zero Configuration Auto Instrumentation for OpenTelemetry .NET activates automatic instrumentation for .NET applications running on Windows. After installing the package, you must start or restart any .NET applications that you want to instrument.

.. note:: The SignalFx instrumentation for .NET is deprecated and will reach end of support on February 21, 2025. To learn how to migrate from SignalFx .NET to OpenTelemetry .NET, see :ref:`migrate-signalfx-dotnet-to-dotnet-otel`.

Get started
==================================================

To get started with automatic discovery for Windows, follow these steps:

#. :ref:`windows-install-package`
#. :ref:`configure-the-package-dotnet`
#. :ref:`upgrade-the-package-dotnet`

.. _windows-install-package:

Install the package
=========================================================

By default, the installer script only installs the Collector. If you add the ``with_dotnet_instrumentation`` parameter, the script also downloads and installs the Splunk Distribution of OpenTelemetry .NET. 

Run the PowerShell script with the ``with_dotnet_instrumentation`` parameter, as shown in the following example:

.. code-block:: powershell
   :emphasize-lines: 3

   & {Set-ExecutionPolicy Bypass -Scope Process -Force; `
   $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); `
   $params = @{access_token = "<access_token>"; realm = "<realm>"; mode = "agent"; with_dotnet_instrumentation = "`$true"; deployment_env = "<environment_name>"}; `
   Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

Do the following to customize the command:

- Replace ``<environment_name>`` with the label for the target environment.
- Replace ``<access_token>`` with a valid Splunk Observability Cloud access token. To obtain an access token, see :ref:`admin-api-access-tokens`.
- Replace ``<realm>`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, open the navigation menu in Splunk Observability Cloud, select :menuselection:`Settings`, and then select your username. The realm name appears in the :guilabel:`Organizations` section.

.. _configure-the-package-dotnet:

Configure the .NET instrumentation
==========================================================

To configure the instrumentation, see :ref:`advanced-dotnet-otel-configuration`.

.. _upgrade-the-package-dotnet:

(Optional) Upgrade the package
==================================

You can upgrade the package by installing a new version of the Splunk Distribution of OpenTelemetry .NET. See :ref:`instrument-otel-dotnet-applications`.

Troubleshooting
===========================

.. include:: /_includes/troubleshooting-components.rst