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

    configure-the-collector-ootb.rst
    linux-config.rst
    kubernetes-config.rst
    windows-config.rst
    other-configuration-sources.rst
    configure-the-smart-agent.rst
    data-processing.rst

You can use a variety of default configuration files to set up the Splunk Distribution of OpenTelemetry Collector, as well additional components that you can configure separately.

.. _otel-config-options:

.. raw:: html

  <embed>
    <h2>Configuration files<a name="otel-config-options" class="headerlink" href="#otel-config-options" title="Permalink to this headline">¶</a></h2>
  </embed>

See :ref:`the out-of-the-box configuration <otel-configuration-ootb>` for most environments. 

Use these configurations to change the default settings in each Collector package:

* :ref:`otel-linux-config`
* :ref:`otel-kubernetes-config`
* :ref:`otel-windows-config`

.. _otel-config-multiple-files:

.. raw:: html

  <embed>
    <h3>Multiple configuration files<a name="otel-config-multiple-files" class="headerlink" href="#otel-config-multiple-files" title="Permalink to this headline">¶</a></h2>
  </embed>

To define multiple config files simultaneously use:

.. code-block::

  ./otelcol --config=file:/path/to/first/file --config=file:/path/to/second/file

.. raw:: html

  <embed>
    <h2>Configure log collection<a name="otel-config-options" class="headerlink" href="#otel-config-options" title="Permalink to this headline">¶</a></h2>
  </embed>

:new-page:`Fluentd <https://github.com/signalfx/splunk-otel-collector/tree/main/internal/buildscripts/packaging/fpm/etc/otel/collector/fluentd>` to collect logs. Fluentd is applicable to Helm or installer script installations only. Common sources including filelog, journald, and Windows Event Viewer are included in the installation. See the Fluentd configuration documentation for more information.

.. raw:: html

  <embed>
    <h3>Fluentd artifacts<a name="otel-fluentd-artifacts" class="headerlink" href="#otel-fluentd-artifacts" title="Permalink to this headline">¶</a></h2>
  </embed>

The following table describes the artifacts in the Fluentd directory:

.. list-table::
  :widths: 25 75
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

.. _otel-config-additional-components:

.. raw:: html

  <embed>
    <h2>Additional components<a name="otel-config-additional-components" class="headerlink" href="#otel-config-additional-components" title="Permalink to this headline">¶</a></h2>
  </embed>

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
