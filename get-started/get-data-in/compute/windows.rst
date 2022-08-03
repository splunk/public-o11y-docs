.. _get-started-windows:

*************************
Collect Windows host data
*************************

.. meta::
   :description: Start sending metrics and logs from Windows hosts to Splunk Observability Cloud.

The Splunk OpenTelemetry Connector for Windows is a package that provides integrated collection/forwarding for all telemetry types for Windows. You can deploy this connector in support of gathering telemetry for Splunk Infrastructure Monitoring, Splunk APM, or Splunk Log Observer use cases.

This component may be packaged in several formats/installers as appropriate for the deployment scheme (for example, EXE and MSI).

Supported versions
=====================
The following Windows versions are supported and require PowerShell 3.0 or higher:

- Windows Server 2012 64-bit
- Windows Server 2016 64-bit
- Windows Server 2019 64-bit

Getting started
===================
An installation script is available for deploying and configuring the OpenTelemetry Connector and TD Agent (Fluentd).

In administrator mode, run the following PowerShell command on your host. Replace the following variables for your environment:

- ``SPLUNK_REALM``: Which realm to send the data to (for example, ``us0``)
- ``SPLUNK_ACCESS_TOKEN``: Access token to authenticate requests

.. code-block:: none

   & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "SPLUNK_ACCESS_TOKEN"; realm = "SPLUNK_REALM"}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

You can view :new-page:`the source <https://github.com/signalfx/splunk-otel-collector/blob/main/internal/buildscripts/packaging/installer/install.ps1>` for more details and available configuration options.
