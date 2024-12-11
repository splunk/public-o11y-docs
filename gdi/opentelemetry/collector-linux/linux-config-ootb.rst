.. _otel-configuration-ootb:
.. _configure-the-collector-ootb:
.. _linux-config-ootb:

****************************************************************
Collector for Linux default configuration
****************************************************************

.. meta::
      :description: Configure the Splunk Distribution of OpenTelemetry Collector. There are a variety of default configuration files available, as well additional components that can be configured.



.. raw:: html

   <div class="include-start" id="collector-components.rst"></div>

.. include:: /_includes/collector-components.rst

.. raw:: html

   <div class="include-stop" id="collector-components.rst"></div>




The Collector configuration is stored in a :new-page:`YAML file <https://yaml.org/>` and specifies the behavior of the different components and services. See an overview of the elements and pipelines in the default configuration in the following sections.

See :ref:`about-collector-configuration-tutorial` to learn how to configure the Collector.

Default configuration 
========================================================

This is the default configuration file for the Linux (Debian/RPM) Installer collector packages:



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

* :ref:`collector-linux-intro`
* :ref:`Troubleshooting <otel-troubleshooting>`
* :ref:`otel-collector-scenario`
* :ref:`about-collector-configuration-tutorial`
