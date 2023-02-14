.. _otel-install-windows-manual:

**************************************************
Install the Collector for Windows manually
**************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Windows manually.

.. toctree::
  :maxdepth: 4
  :titlesonly:
  :hidden:

Before proceeding to install the Collector for Windows manually, check the :ref:`prerequisites <windows-otel-requirements>`.

.. _windows-manual-config-var:

Configuration variables
===============================

All installation methods offer default configurations using environment variables. Before starting the ``splunk-otel-collector`` service, replace the following variables in the default configuration file with the appropriate values for your environment:

- ``${SPLUNK_ACCESS_TOKEN}``: The Splunk access token to authenticate requests.
- ``${SPLUNK_API_URL}``: The Splunk API URL. For example, ``https://api.us0.signalfx.com``.
- ``${SPLUNK_HEC_TOKEN}``: The Splunk HEC authentication token.
- ``${SPLUNK_HEC_URL}``: The Splunk HEC endpoint URL. For example, ``https://ingest.us0.signalfx.com/v1/log``.
- ``${SPLUNK_INGEST_URL}``: The Splunk ingest URL. For example, ``https://ingest.us0.signalfx.com``.
- ``${SPLUNK_TRACE_URL}``: The Splunk trace endpoint URL. For example, ``https://ingest.us0.signalfx.com/v2/trace``.
- ``${SPLUNK_BUNDLE_DIR}``: The location of your Smart Agent bundle for monitor functionality. For example, ``C:\Program Files\Splunk\OpenTelemetry Collector\agent-bundle``.

.. _windows-installer:

Windows Installer (MSI)
===============================

To install the package using Windows Installer, download the Windows MSI package (64-bit only) from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.

  - The package is installed to ``\Program Files\Splunk\OpenTelemetry Collector``.
  - The ``splunk-otel-collector`` service is created, but not started.
  - A default configuration file is copied to ``\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml``, if it does not already exist. This file is required to start the ``splunk-otel-collector`` service.

.. note:: The ``ProgramData`` folder is hidden by default on Windows.

Next, proceed with the GUI, or follow the instructions to install using a Powershell terminal.

.. _windows-manual-installer-gui:

Install using the GUI
---------------------------------

Double click the downloaded package and follow the instructions in the wizard.

.. _windows-powershell:

Install using a PowerShell terminal
-----------------------------------------------

Follow these steps:

#. Open a PowerShell terminal.
#. Run the following command: 

  .. code-block:: PowerShell

    Start-Process -Wait msiexec "/i PATH_TO_MSI /qn"  

  Where ``PATH_TO_MSI`` is the full path to the downloaded package. For example, ``C:\your\download\folder\splunk-otel-collector-0.4.0-amd64.msi``.

#. Update :ref:`all variables in the configuration file <windows-manual-config-var>` as appropriate. 
#. Start the ``splunk-otel-collector`` service by rebooting the system or by running the following command in a PowerShell terminal:

  .. code-block:: PowerShell

    Start-Service splunk-otel-collector

Learn more about about advanced configuration options (including Service Logging) using PowerShell in our :new-page:`GitHub repos <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/getting-started/windows-manual.md>`.

.. _windows-manual-fluentd:

Fluentd MSI Installation for log collection
==================================================

If log collection is required, perform the following steps to install Fluentd and forward collected log events to the Collector (requires Administrator privileges):

Install, configure, and start the Collector as described in the previous section. The Collector's default configuration file (\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml) listens for log events on 127.0.0.1:8006 and sends them to the Splunk Observability Cloud.
Check https://docs.fluentd.org/installation/install-by-msi#td-agent-v4 to install the Fluentd MSI. Requires version 4.0 or newer.
Configure Fluentd to collect log events and forward them to the Collector:
Option 1: Update the default config file provided by the Fluentd MSI at \opt\td-agent\etc\td-agent\td-agent.conf to collect the desired log events and forward them to 127.0.0.1:8006.
Option 2: The installed Collector package provides a custom Fluentd config file (\Program Files\Splunk\OpenTelemetry Collector\fluentd\td-agent.conf) to collect log events from the Windows Event Log (\Program Files\Splunk\OpenTelemetry Collector\fluentd\conf.d\eventlog.conf) and forwards them to 127.0.0.1:8006. To utilize these files, backup any files as necessary in the \opt\td-agent\etc\td-agent\ directory, and copy the contents from the \Program Files\Splunk\OpenTelemetry Collector\fluentd\ directory to the \opt\td-agent\etc\td-agent\ directory.
Apply the changes by restarting the system or by running the following Powershell commands to restart the Fluentd service:
Stop-Service fluentdwinsvc
Start-Service fluentdwinsvc
Note: The fluentdwinsvc service must be restarted in order for any changes made to the Fluentd config files to take effect.
The Fluentd service logs and errors can be viewed in \opt\td-agent\td-agent.log.
See https://docs.fluentd.org/configuration for general Fluentd configuration details.

.. _windows-chocolatey:

Install using a Chocolatey package
===========================================

A :new-page:`Chocolatey package <https://community.chocolatey.org/packages/splunk-otel-collector>` is available to download, install, and configure the Collector and Fluentd with the following PowerShell command (replace MY_SPLUNK_ACCESS_TOKEN and MY_SPLUNK_REALM):  

.. code-block:: PowerShell

  choco install splunk-otel-collector --params="'/SPLUNK_ACCESS_TOKEN:MY_SPLUNK_ACCESS_TOKEN /SPLUNK_REALM:MY_SPLUNK_REALM'"

Learn more about the :new-page:`package parameters <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/getting-started/windows-manual.md#package-parameters>` in GitHub.

.. _windows-docker:

Install using Docker
===============================

Run the following command to deploy the latest Docker image:

.. code-block:: PowerShell

  $ docker run --rm -e SPLUNK_ACCESS_TOKEN=12345 -e SPLUNK_REALM=us0  `
	    -p 13133:13133 -p 14250:14250 -p 14268:14268 -p 4317:4317 -p 6060:6060  `
	    -p 8888:8888 -p 9080:9080 -p 9411:9411 -p 9943:9943 `
	    --name=otelcol quay.io/signalfx/splunk-otel-collector-windows:latest


.. _windows-manual-custom:

Custom configuration
===============================


Next steps
==================================

Once you have installed the package, you can perform these actions:

* :ref:`use-navigators-imm`.
* View logs and errors in the Windows Event Viewer. Search for "view logs and errors" on :new-page:`Microsoft's documentation site <https://docs.microsoft.com/en-us/>` for more information.
* :ref:`apm`.
