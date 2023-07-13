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
- ``${SPLUNK_HEC_TOKEN}``: The Splunk HTTP Event Collector (HEC) authentication token.
- ``${SPLUNK_HEC_URL}``: The Splunk HEC endpoint URL. For example, ``https://ingest.us0.signalfx.com/v1/log``.
- ``${SPLUNK_INGEST_URL}``: The Splunk ingest URL. For example, ``https://ingest.us0.signalfx.com``.
- ``${SPLUNK_TRACE_URL}``: The Splunk trace endpoint URL. For example, ``https://ingest.us0.signalfx.com/v2/trace``.
- ``${SPLUNK_BUNDLE_DIR}``: The location of your Smart Agent bundle for monitor functionality. For example, ``C:\Program Files\Splunk\OpenTelemetry Collector\agent-bundle``.

Configure proxy settings
----------------------------------

To configure proxy settings to install and run the OpenTelemetry Collector, see :ref:`configure-proxy-collector`.


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

3. Update :ref:`all variables in the configuration file <windows-manual-config-var>` as appropriate. 
4. Start the ``splunk-otel-collector`` service by rebooting the system or by running the following command in a PowerShell terminal:

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
  
    To use these files, backup the ``\opt\td-agent\etc\td-agent\`` directory, and copy the contents from ``\Program Files\Splunk\OpenTelemetry Collector\fluentd\`` to ``\opt\td-agent\etc\td-agent\``.

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

.. _windows-docker:

Install using Docker
===============================

Run the following command to deploy the latest Docker image:

.. code-block:: PowerShell

  $ docker run --rm -e SPLUNK_ACCESS_TOKEN=12345 -e SPLUNK_REALM=us0  `
	    -p 13133:13133 -p 14250:14250 -p 14268:14268 -p 4317:4317 -p 6060:6060  `
	    -p 8888:8888 -p 9080:9080 -p 9411:9411 -p 9943:9943 `
	    --name=otelcol quay.io/signalfx/splunk-otel-collector-windows:latest

.. _windows-binary:

Install using the binary file
===============================

To install the Collector using the binary file, follow these steps:

#. Download the binary for your architecture from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.

#. If you're not using an existing or custom config file, download the :new-page:`default config file <https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector>`` for the Collector. See more at :ref:`otel-configuration-ootb`.

#. Run the binary from the command line:

.. code-block:: PowerShell

  # see available command-line options
  PS> & '<download dir>\otelcol_windows_amd64.exe' --help
  Usage of otelcol:
      --config string          Locations to the config file(s), note that only a single location can be set per flag entry e.g. --config=/path/to/first --config=path/to/second. (default "[]")
      --feature-gates string   Comma-delimited list of feature gate identifiers. Prefix with '-' to disable the feature. '+' or no prefix will enable the feature. (default "[]")
      --no-convert-config      Do not translate old configurations to the new format automatically. By default, old configurations are translated to the new format for backward compatibility.
      --set string             Set arbitrary component config property. The component has to be defined in the config file and the flag has a higher precedence. Array config properties are overridden and maps are joined. Example --set=processors.batch.timeout=2s (default "[]")
      -v, --version                Version of the collector.

  # set the SPLUNK_REALM and SPLUNK_ACCESS_TOKEN env vars required in our default config files
  PS> $env:SPLUNK_REALM = "<realm>"
  PS> $env:SPLUNK_ACCESS_TOKEN = "<token>"

  # start the collector
  PS> & '<download dir>\otelcol_windows_amd64.exe' --config=<path to config file>

  # alternatively, use the SPLUNK_CONFIG env var instead of the --config command-line option
  PS> $env:SPLUNK_CONFIG = "<path to config file>"
  PS> & '<download dir>\otelcol_windows_amd64.exe'

  # type Ctrl-c to stop the collector

.. _windows-manual-custom:

Use a custom configuration file
===========================================

If you're using a custom configuration file, mount the directory containing the file and either use the ``SPLUNK_CONFIG=<path>`` environment variable or the ``--config=<path>`` command line argument. Replace ``<path>`` with the path to the custom file within the container.

To mount configuration files on a Windows container, specify a directory name in which the configuration file is present. 

Example with ``SPLUNK_CONFIG``
-----------------------------------------------

.. code-block:: PowerShell

  $ docker run --rm -e SPLUNK_ACCESS_TOKEN=12345 -e SPLUNK_REALM=us0 `
	    -e SPLUNK_CONFIG=c:\splunk_config\gateway_config.yaml -p 13133:13133  `
	    -p 14250:14250 -p 14268:14268 -p 4317:4317 -p 6060:6060 -p 8888:8888 -p 9080:9080 `
	    -p 9411:9411 -p 9943:9943 -v ${PWD}\splunk_config:c:\splunk_config:RO `
	    --name otelcol quay.io/signalfx/splunk-otel-collector-windows:latest

Example with ``--config``
-----------------------------------------------

.. code-block:: PowerShell

  $ docker run --rm -e SPLUNK_ACCESS_TOKEN=12345 -e SPLUNK_REALM=us0 `
      -p 13133:13133 -p 14250:14250 -p 14268:14268 -p 4317:4317 -p 6060:6060 `
      -p 8888:8888 -p 9080:9080 -p 9411:9411 -p 9943:9943 `
      -v ${PWD}\splunk_config:c:\splunk_config:RO `
      --name otelcol quay.io/signalfx/splunk-otel-collector-windows:latest `
      --config c:\splunk_config\gateway_config.yaml 

Next steps
==================================

Once you have installed the package, you can perform these actions:

* :ref:`use-navigators-imm`.
* View logs and errors in the Windows Event Viewer. Search for "view logs and errors" on :new-page:`Microsoft documentation site <https://docs.microsoft.com/en-us/>` for more information.
* :ref:`apm`.
