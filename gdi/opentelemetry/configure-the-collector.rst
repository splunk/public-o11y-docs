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
    kubernetes-config-advanced.rst
    kubernetes-config-logs.rst
    windows-config.rst
    other-configuration-sources.rst
    data-processing.rst
    tags.rst
    Remove data pre-ingest <configure-remove.rst>

You can use a variety of default configuration files to set up the Splunk Distribution of OpenTelemetry Collector, as well :ref:`additional components <otel-components>` that you can configure separately. 

See also other configuration options: 

* :ref:`otel-data-processing`
* :ref:`otel-tags`
* :ref:`configure-remove`

.. note:: Splunk Observability Cloud also offers several options for no-hassle, zero-config Auto Instrumentation. Learn more at :ref:`Splunk OpenTelemetry Zero Configuration Auto Instrumentation <zero-config>`.

.. _otel-config-options:

.. raw:: html

  <embed>
    <h2>Configuration files<a name="otel-config-options" class="headerlink" href="#otel-config-options" title="Permalink to this headline">¶</a></h2>
  </embed>

See :ref:`the default configuration <otel-configuration-ootb>` to learn about the basic structure of the Collector's configuration file. It also contains an example valid for most environments. 

You can also use these configurations to change the default settings in each Collector package:

* Kubernetes: :ref:`Helm configuration <otel-kubernetes-config>`, :ref:`advanced config <otel-kubernetes-config-advanced>`, and :ref:`log config <otel-kubernetes-config-logs>`
* :ref:`otel-linux-config`
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

Use the Fluentd receiver to collect logs. Common sources such as filelog, journald, and Windows Event Viewer are included in the installation. See :ref:`fluentd-receiver` for more information.

.. note:: If you don't have a Log Observer entitlement or don't wish to collect logs for the target host, use the ``--without-fluentd`` option to skip the installation of Fluentd when installing the Collector. 

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

See :ref:`fluentd-receiver` for more information.

.. _otel-config-additional-components:

.. raw:: html

  <embed>
    <h2>Additional components and configuration sources<a name="otel-config-additional-components" class="headerlink" href="#otel-config-additional-components" title="Permalink to this headline">¶</a></h2>
  </embed>

You can also use these additional :ref:`configuration sources <otel-other-configuration-sources>`:

  * Environment variable (Alpha)
  * etcd (Alpha)
  * Include config source (Beta)
  * Vault (Alpha)
  * Zookeeper (Alpha)


