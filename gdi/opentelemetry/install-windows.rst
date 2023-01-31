.. _otel-install-windows:

**************************************************
Install the Collector for Windows
**************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Windows.

.. toctree::
   :maxdepth: 4
   :titlesonly:
   :hidden:

   /gdi/opentelemetry/deployments/deployments-windows-ansible.rst
   /gdi/opentelemetry/deployments/deployments-windows-puppet.rst

The Splunk Distribution of OpenTelemetry Collector for Windows is a package that provides integrated collection and forwarding for all data types. Install the package using one of these methods:

* :ref:`Installer script <windows-script>`
* :ref:`Deployments <windows-deployments>`
* :ref:`Manual <windows-manual>`

.. _windows-otel-requirements:

Prerequisites
==========================

The Splunk Distribution of OpenTelemetry Collector for Windows has the following requirements depending on the install method:

.. list-table::
   :header-rows: 1
   :widths: 40 60
   :width: 100

   * - Install method
     - Supported versions (64-bit)
   * - Installer script
     - Windows 2012, 2016, 2019, 2022
   * - Windows installer (MSI)
     - Windows 2012, 2016, 2019, 2022
   * - Ansible
     - Windows 2012, 2016, 2019
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

The installer script is available for Windows 64-bit environments. The script deploys and configures these things:

* Splunk Distribution of OpenTelemetry Collector for Windows
* Fluentd (using the td-agent)

Do the following to install the package using the installer script:

#. Ensure that you have Administrator access on your host.
#. Run the following PowerShell command on your host, replacing the following variables for your environment:

   * ``SPLUNK_REALM``: This is the realm to send data to. The default is ``us0``. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.
   * ``SPLUNK_ACCESS_TOKEN``: This is the base64-encoded access token for authenticating data ingest requests. See :ref:`admin-org-tokens`.

.. code-block:: PowerShell

   & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "SPLUNK_ACCESS_TOKEN"; realm = "SPLUNK_REALM"}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

Configure memory allocation
----------------------------------

To configure memory allocation, use the ``memory`` parameter. By default, this parameter is set to 512 MiB, or 500 x 2^20 bytes, of memory. Increase this setting to allocate more memory, as shown in the following example.

.. code-block:: PowerShell

   & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "SPLUNK_ACCESS_TOKEN"; realm = "SPLUNK_REALM"; memory = "SPLUNK_MEMORY_TOTAL_MIB"}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

Replace ``SPLUNK_MEMORY_TOTAL_MIB`` with the desired integer value.

Configure Fluentd
---------------------------------

By default, the Fluentd service is installed and configured to forward log events with the ``@SPLUNK`` label and send these events to the HEC ingest endpoint determined by the ``--realm <SPLUNK_REALM>`` option. For example, ``https://ingest.<SPLUNK_REALM>.signalfx.com/v1/log``.

To configure the package to send log events to a custom HEC endpoint URL, you can specify the following parameters for the installer script:

* ``hec-url = "<URL>"``
* ``hec-token = "<TOKEN>"``

The main Fluentd configuration file is installed to ``<drive>\opt\td-agent\etc\td-agent\td-agent.conf``, where ``<drive>`` is the driver where Fluentd is installed. Custom Fluentd source configuration files can be added to the ``<drive>\opt\td-agent\etc\td-agent\conf.d`` directory after installation.

Note the following:

* In this directory, all files with the .conf extension are automatically included by Fluentd.
* By default, Fluentd is configured to collect from the Windows Event Log. See ``<drive>\opt\td-agent\etc\td-agent\conf.d\eventlog.conf`` for the default configuration.

After any configuration modification, apply the changes by restarting the system or running the following PowerShell commands:

.. code-block:: PowerShell

   Stop-Service fluentdwinsvc
   Start-Service fluentdwinsvc

.. _windows-deployments:

Deployments
===============================
Splunk offers the configuration management options described in this section.

.. _windows-ansible:

Ansible
--------------------------
Splunk provides an Ansible role that installs the package configured to collect data (metrics, traces, and logs) from Windows machines and send that data to Observability Cloud. See :ref:`deployment-windows-ansible` for the instructions to download and customize the role.

.. _windows-chef:

Chef 
----------------
Splunk provides a cookbook to install the Collector using Chef. See :ref:`deployments-chef` for the installation instructions.

.. _windows-nomad:

Nomad 
-----------------
Use Nomad to deploy the Collector. See :ref:`deployments-nomad` for the installation instructions.

.. _windows-puppet:

Puppet
-------------------------------
Splunk provides a Puppet module to install and configure the package. A module is a collection of resources, classes, files, definition, and templates. See :ref:`deployment-windows-puppet` for the instructions to download and customize the module.

.. _windows-manual:

Manual
===================
Splunk offers the manual configuration options described in this section. 

.. _windows-docker:

Docker
----------------------

Run the following command to deploy the latest Docker image:

.. code-block:: PowerShell

   $ docker run --rm -e SPLUNK_ACCESS_TOKEN=12345 -e SPLUNK_REALM=us0  `
	          -p 13133:13133 -p 14250:14250 -p 14268:14268 -p 4317:4317 -p 6060:6060  `
	          -p 8888:8888 -p 9080:9080 -p 9411:9411 -p 9943:9943 `
	          --name=otelcol quay.io/signalfx/splunk-otel-collector-windows:latest
             # Use a semantic versioning (semver) tag instead of the ``latest`` tag.
             # Semantic versioning is a formal convention for determining the version
             # number of new software releases.

More information regarding the ``docker run`` command options:

* ``--rm`` automatically removes the container when it exits.
* ``-e`` sets simple (non-array) environment variables in the container you’re running, or overwrite variables that are defined in the Dockerfile of the image you’re running.
* ``-p`` publishes a container's port(s) to the host.

.. _windows-powershell:

PowerShell terminal
-------------------------------
Do the following to install the package from a PowerShell terminal:

#. Download the Windows MSI package (64-bit only) from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.
#. Run the following command in a PowerShell terminal. Replace ``PATH_TO_MSI`` with the full path to the downloaded package. For example, ``C:\your\download\folder\splunk-otel-collector-0.4.0-amd64.msi``::

    PS> Start-Process -Wait msiexec "/i PATH_TO_MSI /qn"
#. Update all variables in the configuration file as appropriate. See the next section for the steps to do this.
#. Start the ``splunk-otel-collector`` service by rebooting the system or running the following command in a PowerShell terminal::

    PS> Start-Service splunk-otel-collector

The package is installed to ``\Program Files\Splunk\OpenTelemetry Collector``, and the ``splunk-otel-collector`` service is created, but not started. A default configuration file is copied to ``\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml``, if it does not already exist. This file is required to start the ``splunk-otel-collector`` service.

.. note:: The ``ProgramData`` folder is hidden by default on Windows.

.. _windows-installer:

Windows Installer
-----------------------------------

Do the following to install the package using the Windows Installer:

#. Download the Windows MSI package (64-bit only) from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.
#. Double click the downloaded package and follow the instructions in the wizard.

The package is installed to ``\Program Files\Splunk\OpenTelemetry Collector``, and the ``splunk-otel-collector`` service is created, but not started. A default configuration file is copied to ``\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml``, if it does not already exist. This file is required to start the ``splunk-otel-collector`` service.

More options
==================================
Once you have installed the package, you can perform these actions:

* :ref:`use-navigators-imm`.
* View logs and errors in the Windows Event Viewer. Search for "view logs and errors" on :new-page:`Microsoft's documentation site <https://docs.microsoft.com/en-us/>` for more information.
* :ref:`apm`.
