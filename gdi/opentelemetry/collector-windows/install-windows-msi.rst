.. _otel-install-windows-msi:

*******************************************************************
Install the Collector for Windows using the MSI installer
*******************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of the OpenTelemetry Collector for Windows using the MSI installer.

.. toctree::
  :maxdepth: 4
  :titlesonly:
  :hidden:

You can use the Windows MSI installer to install the Splunk Distribution of the Collector for Windows.

.. note:: 
  
  The Splunk Distribution of the OpenTelemetry Collector comes with a default configuration, as detailed in :ref:`windows-config-ootb`. To modify this configuration, refer to :ref:`otel-windows-config`.

  To learn how to obtain logs, see :ref:`windows-config-logs`.

Alternatively, you can also install the Collector for Windows:

* Using the installer script. See :ref:`otel-install-windows`. 
* Using deployment tools. See :ref:`otel-install-windows-tools`.
* Manually. See :ref:`otel-install-windows-manual`.

.. _install-windows-msi-prereqs:

Prerequisites
==========================

.. include:: /_includes/requirements/collector-windows.rst

.. _windows-installer:

Install the Collector using the Windows installer file (MSI) 
===============================================================================

To install the package using Windows Installer, download the Windows MSI package (64-bit only) from the Collector's :new-page:`GitHub release site <https://github.com/signalfx/splunk-otel-collector/releases>`.

  - The package is installed to ``\Program Files\Splunk\OpenTelemetry Collector``.
  - The ``splunk-otel-collector`` service is created, but not started.
  - A default configuration file is copied to ``\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml``, if it does not already exist. This file is required to start the ``splunk-otel-collector`` service.

.. note:: The ``ProgramData`` folder is hidden by default on Windows.

Next, follow the installer steps, or install the Collector using a PowerShell terminal.

.. _windows-manual-installer-gui:

Install using the graphical installer
--------------------------------------

Run the downloaded package and follow the instructions in the guided setup.

.. _windows-powershell:

Install using a PowerShell terminal
-----------------------------------------------

Follow these steps:

1. Open a PowerShell terminal.

2. Run the following command, where ``PATH_TO_MSI`` is the full path to the downloaded package. For example, ``C:\your\download\folder\splunk-otel-collector-0.4.0-amd64.msi``. 

.. code-block:: PowerShell

    Start-Process -Wait msiexec "/i PATH_TO_MSI /qn"  

3. Update all variables in the configuration file as appropriate.   

.. code-block:: PowerShell

<<<<<<< HEAD
    Start-Service splunk-otel-collector

Learn more about advanced configuration options (including Service Logging) using PowerShell in the following docs: 

* :ref:`otel-install-windows-manual`
* :ref:`otel-windows-config`

.. _windows-msi-env-variables:

Configure the Colector's environment variables with the MSI
==============================================================
=======
    Start-Process -Wait msiexec "/i PATH_TO_MSI /qn SPLUNK_ACCESS_TOKEN=<my_access_token>"
>>>>>>> 81348d067 (Feedback)

You can use the following Splunk-specific environment variables with the MSI:

.. list-table::
    :widths: 15 75 10
    :width: 100
    :header-rows: 1

    *   - Name
        - Description
        - Default

    *   - ``SPLUNK_ACCESS_TOKEN`` 
        - The Splunk access token to authenticate requests.
        - Empty

    *   - ``SPLUNK_API_URL`` 
        - The Splunk API URL. 
        - ``https://api.[SPLUNK_REALM].signalfx.com``

    *   - ``SPLUNK_BUNDLE_DIR`` 
        - The path to the Smart Agent bundle. 
        - ``[INSTALLDIR]\OpenTelemetry Collector\agent-bundle``

    *   - ``SPLUNK_COLLECTD_DIR``
        - The path to the collectd config directory for the Smart Agent. For example, ``/usr/lib/splunk-otel-collector/agent-bundle/run/collectd``
        - Optional. Only added if passed to msiexec command.

    *   - ``SPLUNK_CONFIG`` 
        - Destination path of the Collector custom configuration file. 
        - ``[CommonAppDataFolder]Splunk\OpenTelemetry Collector\[SPLUNK_SETUP_COLLECTOR_MODE]_config.yaml``

    *   - ``SPLUNK_GATEWAY_URL``
        - URL in Gateway mode.
        - Optional. Only added if passed to msiexec command.

    *   - ``SPLUNK_HEC_TOKEN`` 
        - The Splunk HEC authentication token.
        - ``[SPLUNK_ACCESS_TOKEN]``
    
    *   - ``SPLUNK_HEC_URL`` 
        - The Splunk HEC endpoint URL. 
        - ``https://ingest.[SPLUNK_REALM].signalfx.com/v1/log``
    
    *   - ``SPLUNK_INGEST_URL`` 
        - The Splunk ingest URL. 
        - ``https://ingest.[SPLUNK_REALM].signalfx.com``

    *   - ``SPLUNK_LISTEN_INTERFACE`` 
        - The network interface the agent receivers listen on. 
        - Optional. Only added if passed to msiexec command.

    *   - ``SPLUNK_MEMORY_LIMIT_MIB`` 
        - Use it to set the memory limit for the ``memory_limiter`` processor. 
        - Optional. Only added if passed to msiexec command.

    *   - ``SPLUNK_MEMORY_TOTAL_MIB`` 
        - Total memory in MiB to allocate to the Collector
        - Optional. Only added if passed to msiexec command.

    *   - ``SPLUNK_REALM`` 
        - Your Splunk realm.
        - ``us0``

    *   - ``SPLUNK_SETUP_COLLECTOR_MODE`` 
        - Install property that sets the Collector's deployment mode. Learn more at :ref:`otel-deployment-mode`. 
        - ``agent``

    *   - ``SPLUNK_TRACE_URL`` 
        - The Splunk trace endpoint URL. 
        - ``https://ingest.[SPLUNK_REALM].signalfx.com/v2/trace``

4. Start the ``splunk-otel-collector`` service by rebooting the system or by running the following command in a PowerShell terminal:

.. code-block:: PowerShell

    Start-Service splunk-otel-collector

Learn more about advanced configuration options (including Service Logging) using PowerShell in the following docs: 

* :ref:`otel-install-windows-manual`
* :ref:`otel-windows-config`

.. _windows-manual-fluentd:

Install Fluentd MSI for log collection
==================================================

If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance. 

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

Custom MSI URLs
==================================================

By default, the Collector MSI is downloaded from :new-page:`https://dl.signalfx.com <https://dl.signalfx.com>` and
the Fluentd MSI is downloaded from :new-page:`https://packages.treasuredata.com <https://packages.treasuredata.com>`.  

To specify custom URLs for these downloads, replace ``COLLECTOR_MSI_URL`` and ``FLUENTD_MSI_URL`` with the URLs to the desired MSI packages to install:

.. code-block:: PowerShell

  & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "<SPLUNK_ACCESS_TOKEN>"; realm = "<SPLUNK_REALM>"; collector_msi_url = "<COLLECTOR_MSI_URL>"; fluentd_msi_url = "<FLUENTD_MSI_URL>"}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

.. _windows-chocolatey:

Install the Collector using a Chocolatey package
======================================================

A :new-page:`Chocolatey package <https://community.chocolatey.org/packages/splunk-otel-collector>` is available to download, install, and configure the Collector and Fluentd with the following PowerShell command:  

.. code-block:: PowerShell

  choco install splunk-otel-collector --params="'/SPLUNK_ACCESS_TOKEN:MY_SPLUNK_ACCESS_TOKEN /SPLUNK_REALM:MY_SPLUNK_REALM'"

Next steps
==================================

.. include:: /_includes/gdi/collector-windows-next-steps.rst