.. _otel-upgrade-windows:
.. _otel-windows-upgrade:

*********************************************************************************
Upgrade the Collector for Windows
*********************************************************************************

.. meta::
  :description: Upgrade the Splunk Distribution of OpenTelemetry Collector.

The installer script uses one of the supported package managers to install the Collector.

When you update the Collector using the official packages, configuration files are never overridden. If you need to update the configuration after an update, edit them manually before backward compatibility is dropped. 

.. raw:: html

   <div class="include-start" id="collector-upgrade.rst"></div>

.. include:: /_includes/collector-upgrade.rst

.. raw:: html

   <div class="include-stop" id="collector-upgrade.rst"></div>




Upgrade the Collector for Windows
=======================================

If you used the Windows installer script, to upgrade you can manually download and run the MSI for the desired Collector version :new-page:`from GitHub <https://github.com/signalfx/splunk-otel-collector/releases>`.

Chocolatey
------------------

If you're using :ref:`Chocolatey <windows-chocolatey>`, in order to keep parameters when upgrading, before installation you need to activate the following feature:

.. code-block:: PowerShell

  choco feature enable -n=useRememberedArgumentsForUpgrades

To upgrade, run the following command in PowerShell:

.. code-block:: PowerShell

  choco upgrade splunk-otel-collector
