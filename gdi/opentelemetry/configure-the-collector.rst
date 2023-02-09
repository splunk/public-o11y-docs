.. _otel-configuration:

****************************************************************
Configure the Collector
****************************************************************

.. meta::
      :description: Configure the Splunk Distribution of OpenTelemetry Collector. There are a variety of default configuration files available, as well additional components that can be configured.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    otel-default-configuration.rst
    optional-configurations.rst
    other-configuration-sources.rst
    configure-the-smart-agent.rst

You can use a variety of default configuration files to set up the Splunk Distribution of OpenTelemetry Collector, as well additional components that you can configure separately.

.. _otel-config-options:

Configuration files
===================================

Select the configuration file to set up the Collector based on your needs.

Default configuration
----------------------------------------------------

:ref:`otel-default-configuration` is the starting configuration for most environments. This is the default configuration file for the Linux (Debian/RPM) and Windows Installer collector packages.

Full configuration (Linux)
----------------------------------------------------

:new-page:`full_config_linux.yaml <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/full_config_linux.yaml>` is an extended configuration. This configuration requires using :new-page:`OpenTelemetry Collector Contrib <https://github.com/open-telemetry/opentelemetry-collector-contrib>` or a similar distribution.

Fluentd configuration
----------------------------------------------------

:new-page:`Fluentd <https://github.com/signalfx/splunk-otel-collector/tree/main/internal/buildscripts/packaging/fpm/etc/otel/collector/fluentd>` to collect logs. Fluentd is applicable to Helm or installer script installations only. Common sources including filelog, journald, and Windows Event Viewer are included in the installation. See the Fluentd configuration documentation for more information.

Fluentd artifacts
^^^^^^^^^^^^^^^^^^^^^^

The following table describes the artifacts in the Fluentd directory:

.. list-table::
  :widths: 50 50
  :header-rows: 1

  * - Configuration
    - Description
  * - fluent.conf or td-agent.conf
    - These are the main Fluentd configuration files used to forward events to the Collector. The file locations are ``/etc/otel/collector/fluentd/fluent.conf`` on Linux and ``C:\opt\td-agent\etc\td-agent\td-agent.conf`` on Windows. By default, these files configure Fluentd to include custom Fluentd sources and forward all log events with the ``@SPLUNK`` label to the Collector. 
  * - conf.d
    - This directory contains the custom Fluentd configuration files. The location is ``/etc/otel/collector/fluentd/conf.d`` on Linux and ``\opt\td-agent\etc\td-agent\conf.d`` on Windows. All files in this directory ending with the .conf extension are automatically included by Fluentd, including ``\opt\td-agent\etc\td-agent\conf.d\eventlog.conf`` on Windows.
  * - splunk-otel-collector.conf
    - This is the drop-in file for the Fluentd service on Linux. Use this file to override the default Fluentd configuration path in favor of the custom Fluentd configuration file for Linux (fluent.conf).

The following is a sample configuration to collect custom logs:

.. code-block:: xml

  <source>
    @type tail
    @label @SPLUNK
    <parse>
      @type none
    </parse>
    path /path/to/my/custom.log
    pos_file /var/log/td-agent/my-custom-logs.pos
    tag my-custom-logs
  </source>

.. _otel-config-multiple-files:

Configure the Collector using multiple files
----------------------------------------------------

To define multiple config files simultaneously use:

.. code-block::

  ./otelcol --config=file:/path/to/first/file --config=file:/path/to/second/file

.. _otel-config-additional-components:

Additional components
============================================================

You can also configure the following components:

* :ref:`Configuration sources <otel-other-configuration-sources>`

  * Environment variable (Alpha)
  * etcd (Alpha)
  * Include (Alpha)
  * Vault (Alpha)
  * Zookeeper (Alpha)

* :ref:`SignalFx Smart Agent components <otel-smart-agent>`

  * Extension
  * Receiver
