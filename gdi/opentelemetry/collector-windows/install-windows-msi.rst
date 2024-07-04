.. _otel-install-windows-msi:

**************************************************
Install the Collector for Windows using MSI
**************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Windows using MSI.

.. toctree::
  :maxdepth: 4
  :titlesonly:
  :hidden:

You can use Windows MSI to install the Splunk Distribution of the Collector for Windows.

Alternatively, you can also install the Collector for Windows:

* Using the installer script. See :ref:`otel-install-windows`. 
* Using deployment tools. See :ref:`otel-install-windows-tools`.
* Manually. See :ref:`otel-install-windows-manual`.

.. _install-windows-msi-prereqs:

Prerequisites
==========================

.. include:: /_includes/requirements/collector-windows.rst

.. _install-windows-msi-env-variables:

Collector environment variables
=====================================

.. include:: /_includes/collector-env-vars.rst

.. _windows-installer:

Windows installer file (MSI) installation
===============================================================================

To install the package using Windows Installer, download the Windows MSI package (64-bit only) from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.

  - The package is installed to ``\Program Files\Splunk\OpenTelemetry Collector``.
  - The ``splunk-otel-collector`` service is created, but not started.
  - A default configuration file is copied to ``\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml``, if it does not already exist. This file is required to start the ``splunk-otel-collector`` service.

.. note:: The ``ProgramData`` folder is hidden by default on Windows.

Next, proceed with the GUI, or follow the instructions to install using a Powershell terminal.

.. _windows-manual-installer-gui:

Install using the GUI
---------------------------------

Run the downloaded package and follow the instructions in the guided setup.

.. _windows-powershell:

Install using a PowerShell terminal
-----------------------------------------------

Follow these steps:

1. Open a PowerShell terminal.
2. Run the following command, where ``PATH_TO_MSI`` is the full path to the downloaded package. For example, ``C:\your\download\folder\splunk-otel-collector-0.4.0-amd64.msi``. 

  .. code-block:: PowerShell

    Start-Process -Wait msiexec "/i PATH_TO_MSI /qn"  

1. Update all variables in the configuration file as appropriate. See :ref:`install-windows-msi-env-variables`.
2. Start the ``splunk-otel-collector`` service by rebooting the system or by running the following command in a PowerShell terminal:

  .. code-block:: PowerShell

    Start-Service splunk-otel-collector

Learn more about advanced configuration options (including Service Logging) using PowerShell in the Splunk Distribution of OpenTelemetry Collector :new-page:`Windows manual <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/getting-started/windows-manual.md>`.

.. _windows-manual-fluentd:

Install Fluentd MSI for log collection
==================================================

Default log collection
-----------------------------------------------

Install, configure, and start the Collector with :ref:`Windows Installer <windows-installer>`. The Collector default configuration file ``\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml`` listens for log events on ``127.0.0.1:8006`` and sends them to Splunk Observability Cloud.

Log collection with Fluentd
-----------------------------------------------

.. note:: You need to be an Admin to configure log collection with Fluentd.

Perform the following steps to install Fluentd and forward ``collected`` log events to the Collector:

1. Install :new-page:`Fluentd MSI <https://docs.fluentd.org/installation/install-by-msi#td-agent-v4>` version 4.0 or higher.

2. Configure Fluentd to collect log events and forward them to the Collector:
  
    - Option 1: Update the default config file provided by the Fluentd MSI at ``\opt\td-agent\etc\td-agent\td-agent.conf`` to collect the desired log events and forward them to ``127.0.0.1:8006``.
  
    - Option 2: The installed Collector package provides a custom Fluentd config file ``\Program Files\Splunk\OpenTelemetry Collector\fluentd\td-agent.conf`` to collect log events from the Windows Event Log ``\Program Files\Splunk\OpenTelemetry Collector\fluentd\conf.d\eventlog.conf`` and forwards them to ``127.0.0.1:8006``. 
  
    To use these files, backup the ``\opt\td-agent\etc\td-agent``` directory, and copy the contents from ``\Program Files\Splunk\OpenTelemetry Collector\fluentd``` to ``\opt\td-agent\etc\td-agent```.

3. To apply any changes made to the Fluentd config files, restart the system, or restart ``fluentdwinsvc`` .

  .. code-block:: PowerShell

    - Stop-Service fluentdwinsvc
    - Start-Service fluentdwinsvc

4. View the Fluentd service logs and errors in ``\opt\td-agent\td-agent.log``.

Learn more about general Fluentd configuration details in the :new-page:`official Fluentd documentation <https://docs.fluentd.org/configuration>`.

.. _windows-chocolatey:

Install using a Chocolatey package
===========================================

A :new-page:`Chocolatey package <https://community.chocolatey.org/packages/splunk-otel-collector>` is available to download, install, and configure the Collector and Fluentd with the following PowerShell command:  

.. code-block:: PowerShell

  choco install splunk-otel-collector --params="'/SPLUNK_ACCESS_TOKEN:MY_SPLUNK_ACCESS_TOKEN /SPLUNK_REALM:MY_SPLUNK_REALM'"

Learn more about the :new-page:`package parameters <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/getting-started/windows-manual.md#package-parameters>` in GitHub.

.. _install-windows-msi-modify-default:

Modify the default configuration
==========================================

All installation methods offer default configurations using environment variables. Before starting the ``splunk-otel-collector`` service, replace the variables in the default configuration file with the appropriate values for your environment. See :ref:`otel-windows-config` for more information.

.. include:: /_includes/collector-env-vars.rst

.. note:: When configuring additional settings, use service, process, or terminal scopes.  

Configure proxy settings
----------------------------------

To configure proxy settings to install and run the OpenTelemetry Collector, see :ref:`configure-proxy-collector`.  

Next steps
==================================

After you have installed the package, see:

* :ref:`windows-config-ootb`.
* :ref:`otel-windows-config`.
* :ref:`collector-how-to`.
* :ref:`use-navigators-imm`.
* View logs and errors in the Windows Event Viewer. Search for "view logs and errors" on :new-page:`Microsoft documentation site <https://docs.microsoft.com/en-us/>` for more information.
