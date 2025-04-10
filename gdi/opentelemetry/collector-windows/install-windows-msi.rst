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



.. raw:: html

   <div class="include-start" id="requirements/collector-windows.rst"></div>

.. include:: /_includes/requirements/collector-windows.rst

.. raw:: html

   <div class="include-stop" id="requirements/collector-windows.rst"></div>




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

3. Configure the Collector using the variables listed in the table that follows:   

   .. code-block:: PowerShell

      Start-Process -Wait msiexec "/i PATH_TO_MSI /qn SPLUNK_ACCESS_TOKEN=<my_access_token>"

Use the following installation configurations with the MSI deployment method:

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
        - Install property that sets the Collector's deployment mode to either ``agent`` or ``gateway``. Learn more at :ref:`otel-deployment-mode`. 
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


Custom MSI URLs
==================================================

By default, the Collector MSI is downloaded from :new-page:`https://dl.signalfx.com <https://dl.signalfx.com>`. 

To specify custom URLs for these downloads, replace ``COLLECTOR_MSI_URL`` with the URL to the desired MSI packages to install:

.. code-block:: PowerShell

  & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "<SPLUNK_ACCESS_TOKEN>"; realm = "<SPLUNK_REALM>"; collector_msi_url = "<COLLECTOR_MSI_URL>"; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

.. _windows-chocolatey:

Install the Collector using a Chocolatey package
======================================================

A :new-page:`Chocolatey package <https://community.chocolatey.org/packages/splunk-otel-collector>` is available to download, install, and configure the Collector with the following PowerShell command:  

.. code-block:: PowerShell

  choco install splunk-otel-collector --params="'/SPLUNK_ACCESS_TOKEN:MY_SPLUNK_ACCESS_TOKEN /SPLUNK_REALM:MY_SPLUNK_REALM'"

Next steps
==================================



.. raw:: html

   <div class="include-start" id="gdi/collector-windows-next-steps.rst"></div>

.. include:: /_includes/gdi/collector-windows-next-steps.rst
.. raw:: html

   <div class="include-stop" id="gdi/collector-windows-next-steps.rst"></div>



