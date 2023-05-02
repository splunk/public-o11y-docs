.. _otel-linux-config:

*********************************************************************************
Advanced configuration for Linux
*********************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Linux.

The following sections describe available settings for configuring the Splunk Distribution of OpenTelemetry Collector for Linux.

.. _otel-linux-full:

Change the default configuration file
===========================================

The Collector comes with a default configuration as explained in :ref:`otel-configuration-ootb`. 

See :new-page:`full_config_linux.yaml <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/full_config_linux.yaml>` for extended configuration options. This configuration requires using :new-page:`OpenTelemetry Collector Contrib project <https://github.com/open-telemetry/opentelemetry-collector-contrib>` or a similar distribution.

After you modify the configuration, restart the Collector service. For example: 

.. code-block:: bash

  sudo systemctl restart splunk-otel-collector

You can view splunk-otel-collector service logs and errors in the systemd journal using the following command:

.. code-block:: bash

  sudo journalctl -u splunk-otel-collector   

