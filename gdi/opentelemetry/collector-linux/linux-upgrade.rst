.. _otel-upgrade-linux:
.. _otel-linux-upgrade:

*********************************************************************************
Upgrade the Collector for Linux
*********************************************************************************

.. meta::
  :description: Upgrade the Splunk Distribution of OpenTelemetry Collector for Linux.

.. include:: /_includes/collector-upgrade.rst

Upgrade the Collector for Linux
=======================================

Run the following commands on your system to upgrade the Collector. It requires ``root`` privileges:

Debian
-------------

.. tabs::
  
  .. tab:: debian

    .. code-block:: bash 
      
      sudo apt-get update
      sudo apt-get install --only-upgrade splunk-otel-collector

.. note::
  If the default configuration files in ``/etc/otel/collector`` have been modified after the initial installation, you might be prompted to keep the existing files or overwrite the files from the new package.

RPM
------------------

The package managers are yum, dnf, and zypper.

.. tabs:: 

  .. tab:: yum 

    .. code-block:: bash

      sudo yum upgrade splunk-otel-collector

  .. tab:: dnf 

    .. code-block:: bash

      sudo dnf upgrade splunk-otel-collector

  .. tab:: zypper 

    .. code-block:: bash

      sudo zypper refresh
      sudo zypper update splunk-otel-collector

.. note::
  If the default configuration files in ``/etc/otel/collector`` have been modified after initial installation, the existing files are preserved and the files from the new package can be installed with an ``.rpmnew`` extension.

