.. _otel-windows-uninstall:

********************************************
Uninstall the Collector for Windows
********************************************

.. meta::
      :description: Describes how to uninstall the Splunk Distribution of OpenTelemetry Collector for Windows.

Follow these instructions to uninstall the Splunk Distribution of the OpenTelemetry Collector for Windows.

.. _otel-windows-uninstall-panel:

Uninstall using the Windows Control Panel
====================================================

If you installed the Collector with the installer script, the Collector and td-agent (Fluentd) can be uninstalled from **Programs and Features** in the Windows Control Panel. The configuration files might persist in ``\ProgramData\Splunk\OpenTelemetry Collector`` and ``\opt\td-agent`` after uninstall.

.. _otel-windows-uninstall-powershell:

Uninstall using PowerShell
====================================================

You can also uninstall the Collector for Windows using PowerShell:

.. code-block:: PowerShell

   $MyProgram = Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\uninstall\* | Where { $_.DisplayName -eq "Splunk OpenTelemetry Collector" }

   if (!$MyProgram) { throw "Splunk OpenTelemetry Collector is not installed" }

   cmd /c $MyProgram.UninstallString
