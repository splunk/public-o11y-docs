The installer script uses one of the supported package managers to install the Collector, for example apt or yum.

When you update the Collector using the official packages, configuration files are never overridden. If you need to update the configuration after an update, edit them manually before backward compatibility is dropped. 

General guidelines
=================================

Apply the following changes to the Collector configuration files for specific version upgrades. 

.. :important::

  For every configuration update use the default agent config as a reference.

From 0.96.1 to 0.97.0
------------------------------------

.. include:: /_includes/collector-upgrade-memory-ballast.rst

From 0.68.0 to 0.69.0
------------------------------------

The ``gke`` and ``gce`` resource detectors in the ``resourcedetection`` processor have been replaced with the ``gcp`` resource detector. If you have ``gke`` and ``gce`` detectors configured in the ``resourcedetection`` processor, update your configuration accordingly.

For more information, see :ref:`resourcedetection-processor`.

From 0.41.0 to 0.42.0
------------------------------------

The Splunk Distribution of the OpenTelemetry Collector used to evaluate user configuration twice and this required escaping of each ``$`` symbol with ``$$`` to prevent unwanted environment variable expansion. The issue was fixed in the 0.42.0 version. Any occurrences of ``$$`` in your configuration need to be replaced with ``$``.

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
