.. _otel-install-windows:

****************************************************************
Install the Collector for Windows with the installer script
****************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Windows.

.. toctree::
  :maxdepth: 4
  :titlesonly:

The Splunk Distribution of the OpenTelemetry Collector for Windows is a package that provides integrated collection and
forwarding for all data types. Install the package using one of these methods:

* :ref:`Installer script <windows-script>`
* :ref:`Deployment tools <windows-deployments>`

Alternatively, you can manually install the Collector. To learn how, see :ref:`otel-install-windows-manual`.

.. note:: The Collector comes with a default configuration. To learn more, see :ref:`windows-config-ootb`.

.. _windows-otel-requirements:

Prerequisites
==========================

.. include:: /_includes/requirements/collector-windows.rst

.. _windows-otel-packages:

Included packages
==========================

The Windows installer script installs the following packages:

* Dotnet autoinstrumentation, if enabled. See :ref:`get-started-dotnet-otel`.
* Fluentd, if enabled. See :ref:`fluentd-manual-config-windows`.
* JMX metric gatherer.
* For Docker environments only, Java JDK and JRE.


.. _windows-script:

Install the Collector using the script
============================================

The installer script is available for Windows 64-bit environments, and deploys and configures: 

* The Splunk Distribution of the OpenTelemetry Collector for Windows 
* Fluentd through the ``td-agent``, which is deactivated by default

To install the package using the installer script, follow these steps:

#. Ensure that you have Administrator access on your host.
#. Run the following PowerShell command on your host, replacing the following variables for your environment:

   * ``SPLUNK_REALM``: This is the realm to send data to. The default is ``us0``. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.
   * ``SPLUNK_ACCESS_TOKEN``: This is the base64-encoded access token for authenticating data ingest requests. Your access token needs to have the ingest authorization scope. See :ref:`admin-org-tokens`.

.. code-block:: PowerShell

  & {Set-ExecutionPolicy Bypass -Scope Process -Force; $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1')); $params = @{access_token = "SPLUNK_ACCESS_TOKEN"; realm = "SPLUNK_REALM"}; Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

If you need to activate TLS in PowerShell, use the command:

.. code-block:: PowerShell

  [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

.. caution:: Starting from version 0.89, the installer for the Splunk Distribution of the OpenTelemetry Collector for Windows sets its configuration using environment variables at service level instead of global level. When configuring additional settings, use service, process, or terminal scopes.

.. _otel-installer-options-windows:
.. _windows-script-options:

Start the Collector executable manually 
--------------------------------------------------------------------

If you experience unexpected start failures, try to start the Collector executable manually.

To do so, run the following PowerShell command as an Admin:

.. code-block:: PowerShell

  & 'C:\Program Files\Splunk\OpenTelemetry Collector\otelcol.exe' --config 'C:\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml'

Options of the installer script for Windows
====================================================

The Windows installer script supports the following options:

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 40 30

   * - Option
     - Description
     - Default value
   * - ``access_token``
     - The token used to send metric data to Splunk.
     -
   * - ``realm``
     - The Splunk realm to use. The ingest, API, trace, and HEC endpoint URLs are automatically created using this value. To find your Splunk realm, see :ref:`Note about realms <about-realms>`.
     - ``us0``
   * - ``memory``
     - Total memory in MIB to allocate to the Collector. Automatically calculates the ballast size. See :ref:`otel-sizing` for more information.
     - ``512``
   * - ``mode``
     - Configure the Collectorservice to run in host monitoring (``agent``) or data forwarding (``gateway``).
     - ``agent``
   * - ``network_interface``
     - The network interface the Collectorreceivers listen on.
     - ``0.0.0.0``
   * - ``ingest_url``
     - Set the base ingest URL explicitly instead of the URL inferred from the specified realm.
     - ``https://ingest.REALM.signalfx.com``
   * - ``api_url``
     - Set the base API URL explicitly instead of the URL inferred from the specified realm.
     - ``https://api.REALM.signalfx.com``
   * - ``trace_url``
     - Set the trace endpoint URL explicitly instead of the endpoint inferred from the specified realm.
     - ``https://ingest.REALM.signalfx.com/v2/trace``
   * - ``hec_url``
     - Set the HEC endpoint URL explicitly instead of the endpoint inferred from the specified realm.
     - ``https://ingest.REALM.signalfx.com/v1/log``
   * - ``hec_token``
     - Set the HEC token if it's different than the specified Splunk access token.
     -
   * - ``with_fluentd``
     - Whether to install and configure fluentd to forward log events to the collector. See :ref:`fluentd-manual-config-windows` for more information.
     - ``$false``
   * - ``with_dotnet_instrumentation``
     - Whether to install and configure .NET tracing to forward .NET application traces to the local collector.
     - ``$false``
   * - ``deployment_env``
     - A system-wide environment tag used by .NET instrumentation. Sets the ``SIGNALFX_ENV`` environment variable. Ignored if ``-with_dotnet_instrumentation`` is set to ``false``.
     -
   * - ``bundle_dir``
     - The location of your Smart Agent bundle for monitor functionality.
     - ``C:\Program Files\Splunk\OpenTelemetry Collector\agent-bundle``
   * - ``insecure``
     - If true then certificates aren't checked when downloading resources.
     - ``$false``
   * - ``collector_version``
     - Specify a specific version of the Collector to install.
     - Latest version available
   * - ``stage``
     - The package stage to install from [``test``, ``beta``, ``release``].
     - ``release``
   * - ``collector_msi_url``
     - When installing the Collector, instead of downloading the package, use this local path to a Splunk OpenTelemetry Collector MSI package. If specified, the ``-collector_version`` and ``-stage`` parameters are ignored.
     - ``https://dl.signalfx.com/splunk-otel-collector/`` |br| ``msi/release/splunk-otel-collector-<version>-amd64.msi``
   * - ``fluentd_msi_url``
     - Specify the URL to the Fluentd MSI package to install.
     - ``https://packages.treasuredata.com/4/windows/td-agent-4.1.0-x64.msi``
   * - ``msi_path``
     - Specify a local path to a Splunk OpenTelemetry Collector MSI package to install instead of downloading the package. If specified, the ``-collector_version`` and ``-stage`` parameters will be ignored.
     -
   * - ``msi_public_properties``
     - Specify public MSI properties to be used when installing the Splunk OpenTelemetry Collector MSI package.
     -

.. _otel-install-windows-modify:

Modify the default configuration
----------------------------------

The Splunk Distribution of the OpenTelemetry Collector comes with a default configuration, as detailed in :ref:`windows-config-ootb`. This configuration can be modified as needed. See :ref:`otel-windows-config` for more information.

For more information about the Collector's environment variables, see :ref:`collector-env-var`.

.. _windows-deployments:

Deployment tools
===============================

Splunk Observability Cloud offers the configuration management options described in this section.

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

After you have installed the package, see:

* :ref:`windows-config-ootb`.
* :ref:`otel-windows-config`.
* :ref:`collector-how-to`.
* :ref:`use-navigators-imm`.
* View logs and errors in the Windows Event Viewer. Search for "view logs and errors" on :new-page:`Microsoft documentation site <https://docs.microsoft.com/en-us/>` for more information.











