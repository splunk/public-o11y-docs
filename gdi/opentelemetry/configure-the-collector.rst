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
    environment-variables.rst
    linux-config.rst
    kubernetes-config.rst
    kubernetes-config-advanced.rst
    kubernetes-config-logs.rst
    windows-config.rst
    other-configuration-sources.rst
    data-processing.rst
    Internal metrics <metrics-internal-collector.rst>
    Default Kubernetes metrics <metrics-ootb-k8s.rst>
    tags.rst
    Remove data pre-ingest <configure-remove.rst>

You can use a variety of default configuration files to set up the Splunk Distribution of OpenTelemetry Collector, as well :ref:`additional components <otel-components>` that you can configure separately. 

.. note:: See how to perform common actions and tasks with the Collector at :ref:`collector-how-to`. To understand how data is processed, see :ref:`otel-data-processing`.

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

.. note:: Splunk Observability Cloud offers several options for no-hassle, zero-config Auto Instrumentation. Learn more at :ref:`Splunk OpenTelemetry Zero Configuration Auto Instrumentation <zero-config>`.

.. _otel-config-multiple-files:

.. raw:: html

  <embed>
    <h3>Multiple configuration files<a name="otel-config-multiple-files" class="headerlink" href="#otel-config-multiple-files" title="Permalink to this headline">¶</a></h2>
  </embed>

To define multiple config files simultaneously use:

.. code-block::

  ./otelcol --config=file:/path/to/first/file --config=file:/path/to/second/file

.. _otel-config-logs:

.. raw:: html

  <embed>
    <h2>Configure log collection<a name="otel-config-logs" class="headerlink" href="#otel-config-logs" title="Permalink to this headline">¶</a></h2>
  </embed>

The Collector can capture logs using Fluentd, but this option is deactivated by default.

* For Kubernetes, native OpenTelemetry log collection is supported by default. See more at :ref:`kubernetes-config-logs`.
* For Linux and Windows environments (physical hosts and virtual machines), use the Universal Forwarder to send logs to the Splunk platform. See more at :ref:`collector-with-the-uf`.

.. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance. 

.. raw:: html

  <embed>
    <h3>Configure Fluentd<a name="otel-fluentd-artifacts" class="headerlink" href="#otel-fluentd-artifacts" title="Permalink to this headline">¶</a></h2>
  </embed>

You can use the Fluentd receiver to collect logs. Common sources such as filelog, journald, and Windows Event Viewer are included in the installation. See :ref:`fluentd-receiver` for more information.

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


