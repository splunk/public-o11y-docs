.. _windows-config-ootb:

.. REMEMBER TO SYNC OOTB Linux doc!

****************************************************************
Collector for Windows default configuration
****************************************************************

.. meta::
      :description: Configure the Splunk Distribution of OpenTelemetry Collector. There are a variety of default configuration files available, as well additional components that can be configured.

.. include:: /_includes/collector-components.rst

The Collector configuration is stored in a :new-page:`YAML file <https://yaml.org/>` and specifies the behavior of the different components and services. See an overview of the elements and pipelines in the default configuration in the following sections.

Default configuration 
========================================================

This is the default configuration file for the Windows Installer collector package:

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/cmd/otelcol/config/collector/agent_config.yaml

Default pipelines
========================================================

.. include:: /_includes/collector-config-ootb.rst

Learn more
========================================================

See also the following documents:

* :ref:`collector-windows-intro` 
* :ref:`Troubleshooting <otel-troubleshooting>`
* :ref:`otel-collector-scenario`
