.. _otel-install-windows-manual:

**************************************************
Install the Collector for Windows manually
**************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of the OpenTelemetry Collector for Windows manually.

.. toctree::
  :maxdepth: 4
  :titlesonly:
  :hidden:

You can use Windows MSI to install the Splunk Distribution of the Collector for Windows.

.. note:: 
  
  The Splunk Distribution of the OpenTelemetry Collector comes with a default configuration, as detailed in :ref:`windows-config-ootb`. To modify this configuration, refer to :ref:`otel-windows-config`.

  To learn how to obtain logs, see :ref:`windows-config-logs`.

Alternatively, you can also install the Collector for Windows:

* Using the installer script. See :ref:`otel-install-windows`. 
* Using MSI. See :ref:`otel-install-windows-msi`. 
* Using deployment tools. See :ref:`otel-install-windows-tools`.

.. _install-windows-manual-prereqs:

Prerequisites
==========================

.. include:: /_includes/requirements/collector-windows.rst

.. _windows-docker:

Install the Collector for Windows using Docker
==============================================================

Run the following command to deploy the latest Docker image:

.. code-block:: PowerShell

  $ docker run --rm -e SPLUNK_ACCESS_TOKEN=12345 -e SPLUNK_REALM=us0  `
	    -p 13133:13133 -p 14250:14250 -p 14268:14268 -p 4317:4317 -p 6060:6060  `
	    -p 8888:8888 -p 9080:9080 -p 9411:9411 -p 9943:9943 `
	    --name=otelcol quay.io/signalfx/splunk-otel-collector-windows:latest

.. _windows-binary:

Install the Collector for Windows using the binary file
==============================================================

To install the Collector using the binary file, follow these steps:

#. Download the binary for your architecture from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.

#. If you're not using an existing or custom config file, download the :new-page:`default config file <https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector>`` for the Collector. See more at :ref:`windows-config-ootb`.

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

.. include:: /_includes/gdi/collector-windows-next-steps.rst
