.. _otel-linux-config:

*********************************************************************************
Advanced configurations for Linux
*********************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Linux.

The following sections describe available settings for configuring the Splunk Distribution of OpenTelemetry Collector for Linux.

.. _otel-linux-full:

Change the default configuration file
===========================================

The Collector comes with a default configuration in the ``/etc/otel/collector/agent_config.yaml`` file. :new-page:`full_config_linux.yaml <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/full_config_linux.yaml>` is an extended configuration. This configuration requires using :new-page:`OpenTelemetry Collector Contrib <https://github.com/open-telemetry/opentelemetry-collector-contrib>` or a similar distribution.

After you modify the configuration, restart the Collector service. For example: 

.. code-block:: bash

  sudo systemctl restart splunk-otel-collector

You can view splunk-otel-collector service logs and errors in the systemd journal using the following command:

.. code-block:: bash

  sudo journalctl -u splunk-otel-collector   

Upgrade the Collector
=================================

Run the following commands on your system to upgrade the Collector (requires ``root`` privileges):

Debian
-------------

.. code-block:: bash

  sudo apt-get update
  sudo apt-get --only-upgrade splunk-otel-collector

.. note::
   If the default configuration files in ``/etc/otel/collector`` have been modified after initial installation, you may be prompted to keep the existing files or overwrite the files from the new package.

RPM
------------------

The package managers are yum, dnf, and zypper.

yum
^^^^^^^^^^^^^

.. code-block:: bash

    sudo yum upgrade splunk-otel-collector

dnf
^^^^^^^^^^^^

.. code-block:: bash
    
    sudo dnf upgrade splunk-otel-collector
    

zypper
^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

    sudo zypper refresh
    sudo zypper update splunk-otel-collector

.. note::
  If the default configuration files in ``/etc/otel/collector`` have been modified after initial installation, the existing files are preserved and the files from the new package may be installed with an ``.rpmnew`` extension.
