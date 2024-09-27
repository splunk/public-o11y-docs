.. _otel-linux-config:

*********************************************************************************
Advanced configuration for Linux
*********************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Linux.

The Collector comes with a default configuration, as explained in :ref:`linux-config-ootb`. Read on to modify advanced settings. 

.. _otel-linux-full:

Change the default configuration file
===========================================

For extended configuration options, see :new-page:`full_config_linux.yaml <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/full_config_linux.yaml>`. This configuration requires using :new-page:`OpenTelemetry Collector Contrib project <https://github.com/open-telemetry/opentelemetry-collector-contrib>` or a similar distribution.

After you modify the configuration, restart the Collector service. For example:

.. code-block:: bash

  sudo systemctl restart splunk-otel-collector

You can view the ``splunk-otel-collector`` service logs and errors in the systemd journal using the following command:

.. code-block:: bash

  sudo journalctl -u splunk-otel-collector   

.. note:: See :ref:`about-collector-configuration-tutorial` to learn how to configure the Collector.
