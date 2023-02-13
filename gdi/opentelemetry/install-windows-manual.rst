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

.. _windows-docker:

Docker
===============================

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
===============================

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
===============================

Do the following to install the package using the Windows Installer:

#. Download the Windows MSI package (64-bit only) from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.
#. Double click the downloaded package and follow the instructions in the wizard.

The package is installed to ``\Program Files\Splunk\OpenTelemetry Collector``, and the ``splunk-otel-collector`` service is created, but not started. A default configuration file is copied to ``\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml``, if it does not already exist. This file is required to start the ``splunk-otel-collector`` service.

Next steps
==================================

Once you have installed the package, you can perform these actions:

* :ref:`use-navigators-imm`.
* View logs and errors in the Windows Event Viewer. Search for "view logs and errors" on :new-page:`Microsoft's documentation site <https://docs.microsoft.com/en-us/>` for more information.
* :ref:`apm`.
