.. include:: /_includes/gdi/zero-config-preview-header.rst

.. _auto-instrumentation-dotnet:

*****************************************************************************
Splunk OpenTelemetry Zero Configuration Auto Instrumentation for .NET
*****************************************************************************

.. meta::
   :description: Use automatic instrumentation to send traces to Splunk Observability Cloud Application Performance Monitoring (APM) without altering your code.

Splunk OpenTelemetry Zero Configuration Auto Instrumentation for .NET provides a package that automatically instruments your local ASP.NET applications to capture and report distributed traces to the Splunk Distribution of OpenTelemetry Collector, and then on to Splunk APM.

The Zero Configuration package provides the following benefits:

- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.
- You don't need to configure or instrument your .NET back-end services or applications before deployment.

.. _install-the-package-dotnet:

Install the package
=========================================================

By default, the installer script only installs the Collector. If you add the ``with_dotnet_instrumentation`` parameter, the script also downloads and installs the SignalFx Instrumentation for .NET. 

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

To configure the instrumentation, see :ref:`advanced-dotnet-configuration`.

.. _upgrade-the-package-dotnet:

Upgrade the package
==========================

You can upgrade the package by installing a new version of the SignalFx Instrumentation for .NET. See :ref:`instrument-dotnet-applications`.

.. include:: /_includes/troubleshooting-steps.rst
