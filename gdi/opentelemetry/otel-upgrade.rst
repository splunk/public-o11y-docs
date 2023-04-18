.. _otel-upgrade:

*********************************************************************************
Upgrade the Collector
*********************************************************************************

.. meta::
  :description: Upgrade the Splunk Distribution of OpenTelemetry Collector.

The installer script uses one of the supported package managers to install the Collector, for example apt or yum.

When you update the Collector using the official packages, configuration files are never overridden. If you need to update the configuration after an update, edit them manually before backward compatibility is dropped. 

Upgrade guidelines
=================================

Apply the following changes to the Collector configuration files for specific version upgrades. 

.. :important::

  For every configuration update use the default agent config as a reference.

From 0.41.0 to 0.42.0
------------------------------------

The Splunk OpenTelemetry Collector used to evaluate user configuration twice and this required escaping of each ``$`` symbol with ``$$`` to prevent unwanted environment variable expansion. The issue was fixed in the 0.42.0 version. Any occurrences of ``$$`` in your configuration need to be replaced with ``$``.

From 0.35.0 to 0.36.0
------------------------------------

Move the config parameter ``exporters -> otlp -> insecure`` to ``exporters -> otlp -> tls -> insecure``.

The ``otlp`` exporter configuration must look like this:

.. code-block:: yaml

  exporters:
    otlp:
      endpoint: "${SPLUNK_GATEWAY_URL}:4317"
      tls:
        insecure: true

From 0.34.0 to 0.35.0
------------------------------------

Move the ``ballast_size_mib`` parameter from the ``memory_limiter`` processor to the ``memory_ballast`` extension, and rename it to ``size_mib``.

.. code-block:: yaml

  extensions:
    memory_ballast:
      size_mib: ${SPLUNK_BALLAST_SIZE_MIB}


.. _otel-upgrade-k8s:

Upgrade the Collector for Kubernetes
=======================================

To upgrade the Collector for Kubernetes run the following commands:

- Use the flag ``--reuse-values`` to keep the config values you'd already set while installing or using the Collector: 

.. code-block:: bash

  helm upgrade splunk-otel-collector splunk-otel-collector-chart/splunk-otel-collector 
  --reuse-values

- Use ``--values config.yaml`` to override your previous configuration while upgrading:

.. code-block:: bash

  helm upgrade splunk-otel-collector --values config.yaml splunk-otel-collector-chart/splunk-otel-collector --reuse-values

Read more in the official Helm upgrade options documentation at :new-page:`https://helm.sh/docs/helm/helm_upgrade/#options <https://helm.sh/docs/helm/helm_upgrade/#options>`.

.. _otel-upgrade-linux:

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

.. _otel-upgrade-windows:

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
