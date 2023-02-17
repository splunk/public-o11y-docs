.. _otel-update:

*********************************************************************************
Upgrade the Collector
*********************************************************************************

.. meta::
  :description: Upgrade the Splunk Distribution of OpenTelemetry Collector.


Upgrade guidelines
=================================

Apply the following changes to the Collector's configuration files for specific version upgrades. While automated scripts that cover backward compatibility are included in the bundle, configuration files aren't overridden, so you need to update them manually before the backward compatibility is dropped. 

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

To upgrade the Collector for Kubernetes, run the following commands:

.. code-block:: bash

  helm upgrade splunk-otel-collector --values config.yaml 
  splunk-otel-collector-chart/splunk-otel-collector 
  --reuse-values

Use the flag ``--reuse-values`` to keep the config values you'd already set.

.. _otel-upgrade-linux:

Upgrade the Collector for Linux
=======================================

Run the following commands on your system to upgrade the Collector. It requires ``root`` privileges:

Debian
-------------

.. code-block:: bash

  sudo apt-get update
  sudo apt-get --only-upgrade splunk-otel-collector

.. note::
  If the default configuration files in ``/etc/otel/collector`` have been modified after the initial installation, you may be prompted to keep the existing files or overwrite the files from the new package.

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
