.. _otel-install-windows:

****************************************************************
Install the Collector for Windows with the installer script
****************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Windows.

.. toctree::
  :maxdepth: 4
  :titlesonly:

  /gdi/opentelemetry/deployments/deployments-windows-ansible.rst
  /gdi/opentelemetry/deployments/deployments-windows-puppet.rst

The Splunk Distribution of OpenTelemetry Collector for Windows is a package that provides integrated collection and
forwarding for all data types. Install the package using one of these methods:

* :ref:`Installer script <windows-script>`
* :ref:`Deployments <windows-deployments>`

Alternatively, you can manually install the Collector. To learn how, see :ref:`otel-install-windows-manual`.

.. _windows-otel-requirements:

Prerequisites
==========================

The Splunk Distribution of OpenTelemetry Collector for Windows has the following requirements
depending on the installation method:

.. list-table::
  :header-rows: 1
  :widths: 40 60
  :width: 100%

  * - Install method
    - Supported versions (64-bit)
  * - Installer script
    - Windows 2012, 2016, 2019, 2022
  * - Windows installer (MSI)
    - Windows 2012, 2016, 2019, 2022
  * - Ansible
    - Windows 2012, 2016, 2019, 2022
  * - Chef
    - Windows 2019, 2022
  * - Nomad
    - Windows 2012, 2016, 2019
  * - Puppet
    - Windows 2012, 2016, 2019
  * - Docker
    - Windows 2019, 2022

.. _windows-script:

Installer script
==========================

The installer script is available for Windows 64-bit environments, and deploys and configures the Splunk Distribution of OpenTelemetry Collector for Windows and Fluentd through the td-agent, which is deactivated by default.

To install the package using the installer script, follow these steps:

#. Ensure that you have Administrator access on your host.
#. Run the following PowerShell command on your host, replacing the following variables for your environment:

   * ``SPLUNK_REALM``: This is the realm to send data to. The default is ``us0``. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.
   * ``SPLUNK_ACCESS_TOKEN``: This is the base64-encoded access token for authenticating data ingest requests. See :ref:`admin-org-tokens`.

.. code-block:: PowerShell

  & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "SPLUNK_ACCESS_TOKEN"; realm = "SPLUNK_REALM"}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

.. note:: If needed, activate TLS in PowerShell using the following command: 
  
   ``[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12``

Configure memory allocation
----------------------------------

To configure memory allocation, use the ``memory`` parameter. 

By default, the Collector is configured to use 512 MB (500 x 2^20 bytes) of memory. To increase this setting to allocate more memory, replace ``SPLUNK_MEMORY_TOTAL_MIB`` with the desired integer value.

.. code-block:: PowerShell

  & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "SPLUNK_ACCESS_TOKEN"; realm = "SPLUNK_REALM"; memory = "SPLUNK_MEMORY_TOTAL_MIB"}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

Read more about Collector sizing in :ref:`otel-sizing`.

Configure proxy settings
----------------------------------

To configure proxy settings to install and run the OpenTelemetry Collector, see :ref:`configure-proxy-collector`.


.. _fluentd-manual-config-windows:

Configure fluentd for log collection
-------------------------------------------

If you have a Log Observer entitlement or wish to collect logs for the target host with Fluentd, use the ``with_fluentd = 1`` option to also install Fluentd when installing the Collector. For example:

.. code-block:: PowerShell

  & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "SPLUNK_ACCESS_TOKEN"; realm = "SPLUNK_REALM"; with_fluentd = 1}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

When activated, the Fluentd service is configured by default to collect and forward log events with the ``@SPLUNK`` label to the Collector, which then
send these events to the HEC ingest endpoint determined by the ``realm = "<SPLUNK_REALM>"`` option.
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

Start the Collector executable manually 
-------------------------------------------

If you experience unexpected start failures, try to start the Collector executable manually. 

To do so, run the following PowerShell command as an Admin:  

.. code-block:: PowerShell

  & 'C:\Program Files\Splunk\OpenTelemetry Collector\otelcol.exe' --config 'C:\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml'

.. _windows-deployments:

Deployments
===============================
Splunk offers the configuration management options described in this section.

.. _windows-ansible:

Ansible
--------------------------
Splunk provides an Ansible role that installs the package configured to collect data (metrics, traces, and logs) from Windows machines and send that data to Splunk Observability Cloud. See :ref:`deployment-windows-ansible` for the instructions to download and customize the role.

.. _windows-chef:

Chef 
----------------
Splunk provides a cookbook to install the Collector using Chef. See :ref:`deployments-chef` for the installation instructions.

.. _windows-nomad:

Nomad 
-----------------
Use Nomad to deploy the Collector. To learn how to install Nomad, see :ref:`deployments-nomad`.

.. _windows-puppet:

Puppet
-------------------------------
Splunk provides a Puppet module to install and configure the package. A module is a collection of resources, classes, files, definition, and templates. To learn how to download and customize the module, see :ref:`deployment-windows-puppet`.

Next steps
==================================

Once you have installed the package, you can perform these actions:

* :ref:`use-navigators-imm`.
* View logs and errors in the Windows Event Viewer. Search for "view logs and errors" on :new-page:`Microsoft documentation site <https://docs.microsoft.com/en-us/>` for more information.
* :ref:`apm`.
