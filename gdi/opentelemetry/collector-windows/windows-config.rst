.. _otel-windows-config:

*********************************************************************************
Advanced configuration for Windows
*********************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Windows.

The Collector comes with a default configuration. To learn more, see :ref:`windows-config-ootb`.

.. _windows-config-change-default:

Change the default configuration file for the Collector for Windows
==============================================================================

All installation methods offer default configurations using environment variables. Before starting the ``splunk-otel-collector`` service, replace the variables in the default configuration file with the appropriate values for your environment.

.. include:: /_includes/collector-env-vars.rst

.. note:: When configuring additional settings, use service, process, or terminal scopes.    

Based on the specified installation parameters, the environment variables are saved to the ``HKLM:\SYSTEM\CurrentControlSet\Services\splunk-otel-collector`` registry key and set on the ``Environment`` entry.

To modify any of the configuration values, run ``regedit`` and browse to the path.

Configure memory allocation
----------------------------------

To configure memory allocation, use the ``memory`` parameter, which sets the environment variable ``SPLUNK_MEMORY_TOTAL_MIB``.

* By default, the Collector is configured to use 512 MiB of memory. 
* To modify this setting, replace ``SPLUNK_MEMORY_TOTAL_MIB`` with the desired integer value.

.. code-block:: PowerShell

  & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "SPLUNK_ACCESS_TOKEN"; realm = "SPLUNK_REALM"; memory = "SPLUNK_MEMORY_TOTAL_MIB"}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

Read more about Collector sizing in :ref:`otel-sizing`.

Configure proxy settings
----------------------------------

To configure proxy settings to install and run the OpenTelemetry Collector, see :ref:`configure-proxy-collector`.

.. _windows-config-logs:

Configure log collection for the Collector for Windows
====================================================================

For Windows environments (physical hosts and virtual machines), use the Universal Forwarder to send logs to the Splunk platform. See more at :ref:`collector-with-the-uf`.

.. _fluentd-manual-config-windows:

Configure Fluentd for log collection
--------------------------------------------------------------------

If you have a Log Observer entitlement or wish to collect logs for the target host with Fluentd, use the ``with_fluentd = 1`` option to install and enable Fluentd when installing the Collector. For example:

.. code-block:: PowerShell

  & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "<SPLUNK_ACCESS_TOKEN>"; realm = "<SPLUNK_REALM>"; with_fluentd = 1}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

When activated, the Fluentd service is configured by default to collect and forward log events with the ``@SPLUNK`` label to the Collector, which then send these events to the HEC ingest endpoint determined by the ``realm = "<SPLUNK_REALM>"`` option.
For example, ``https://ingest.<SPLUNK_REALM>.signalfx.com/v1/log``.

To configure the package to send log events to a custom HTTP Event Collector (HEC) endpoint URL with a token different than ``<SPLUNK_ACCESS_TOKEN>``, you can specify the following parameters for the installer script:

* ``hec_url = "<SPLUNK_HEC_URL>"``
* ``hec_token = "<SPLUNK_HEC_TOKEN>"``

For example (replace the ``<SPLUNK...>`` values in the command for your configuration):

.. code-block:: PowerShell

  & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "<SPLUNK_ACCESS_TOKEN>"; realm = "<SPLUNK_REALM>"; hec_url = "<SPLUNK_HEC_URL>"; hec_token = "<SPLUNK_HEC_TOKEN>"}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

The installation creates the main fluentd configuration file  ``<drive>\opt\td-agent\etc\td-agent\td-agent.conf``, where ``<drive>`` is the drive letter for the fluentd installation directory.

You can add custom fluentd source configuration files to the ``<drive>\opt\td-agent\etc\td-agent\conf.d``
directory after installation.

Note the following:

* In this directory, fluentd includes all files with the .conf extension.
* By default, fluentd collects from the Windows Event Log. See ``<drive>\opt\td-agent\etc\td-agent\conf.d\eventlog.conf`` for the default configuration.

After any configuration modification, apply the changes by restarting the system or running the following PowerShell commands:

.. code-block:: PowerShell

  Stop-Service fluentdwinsvc
  Start-Service fluentdwinsvc

Command line options
==========================================

To add or remove command line options for the ``splunk-otel-collector`` service, run ``regedit`` and modify the ``ImagePath`` value in the ``HKLM:\SYSTEM\CurrentControlSet\Services\splunk-otel-collector`` registry key. 

Alternatively, run the following PowerShell command, replacing ``OPTIONS`` with the desired command line options:

.. code-block:: PowerShell

  Set-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Services\splunk-otel-collector" -name "ImagePath" -value "C:\Program Files\Splunk\OpenTelemetry Collector\otelcol.exe OPTIONS"

For example, to change the default exposed metrics address of the Collector to ``0.0.0.0:9090``, run the following PowerShell command:

.. code-block:: PowerShell

  Set-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Services\splunk-otel-collector" -name "ImagePath" -value "C:\Program Files\Splunk\OpenTelemetry Collector\otelcol.exe --metrics-addr 0.0.0.0:9090"

Apply the changes
-------------------------------------------

After modifying the configuration file or registry key, apply the changes by restarting the system or running the following PowerShell commands:

.. code-block:: PowerShell

  Stop-Service splunk-otel-collector
  Start-Service splunk-otel-collector

Available command line options
-------------------------------------------

To see all available command line options, run the following PowerShell command:

.. code-block:: PowerShell

  & 'C:\Program Files\Splunk\OpenTelemetry Collector\otelcol.exe' --help





