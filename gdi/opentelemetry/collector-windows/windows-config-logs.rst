.. _windows-config-logs:

***************************************************************
Collect logs with the Collector for Windows
***************************************************************

.. meta::
  
  :description: Describes how to collect logs for the Splunk Distribution of OpenTelemetry Collector for Linux.

Use the Universal Forwarder to send logs to the Splunk platform. See more at :ref:`collector-with-the-uf`.

.. _fluentd-manual-config-windows:

Collect Windows logs with Fluentd
===========================================================================

Fluentd is turned off by default. 

If you wish to collect logs for the target host with Fluentd, use the ``with_fluentd = 1`` option to install and enable Fluentd when installing the Collector. 

For example:

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


