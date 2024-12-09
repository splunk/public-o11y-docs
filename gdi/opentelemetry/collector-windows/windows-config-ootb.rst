.. _windows-config-ootb:

****************************************************************
Collector for Windows default configuration
****************************************************************

.. meta::
      :description: Configure the Splunk Distribution of OpenTelemetry Collector. There are a variety of default configuration files available, as well additional components that can be configured.



.. raw:: html

   <div class="include-start" id="collector-components.rst"></div>

.. include:: /_includes/collector-components.rst

.. raw:: html

   <div class="include-stop" id="collector-components.rst"></div>




The Collector configuration is a :new-page:`YAML file <https://yaml.org/>` which specifies the behavior of the different components and services. By default, it's stored in ``\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml``.

Find an overview of the elements and pipelines in the default configuration in the following sections.

Default configuration 
========================================================

This is the default configuration file for the Windows Installer collector package:



.. raw:: html

   <div class="github" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/cmd/otelcol/config/collector/agent_config.yaml"></div>

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/cmd/otelcol/config/collector/agent_config.yaml

.. raw:: html

   <div class="github-end"></div>




Default pipelines
========================================================



.. raw:: html

   <div class="include-start" id="collector-config-ootb.rst"></div>

.. include:: /_includes/collector-config-ootb.rst

.. raw:: html

   <div class="include-stop" id="collector-config-ootb.rst"></div>




Learn more
========================================================

See also the following documents:

* :ref:`collector-windows-intro` 
* :ref:`Troubleshooting <otel-troubleshooting>`
* :ref:`otel-collector-scenario`
