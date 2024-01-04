.. _otel-install-platform:
.. _otel-configuration:
.. _otel-understand-use:

***********************************************************************************
Get started: Understand and use the Collector  
***********************************************************************************

.. meta::
      :description: Describes platform-specific installation information for the Splunk Distribution of OpenTelemetry Collector. Also covers how to configure the Splunk Distribution of OpenTelemetry Collector. There are a variety of default configuration files available, as well additional components that can be configured.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    Deployment modes <deployment-modes.rst>
    other-configuration-sources.rst
    data-processing.rst
    tags.rst
    collector-how-to.rst
    Remove data pre-ingest <configure-remove.rst>    
    environment-variables.rst
    Internal metrics <metrics-internal-collector.rst>    
    otel-upgrade.rst
    uninstall-the-collector.rst

For a quick overview of the Collector, see :ref:`otel-intro`.  

Get started with the available options to install, deploy, and configure the Splunk Distribution of the OpenTelemetry Collector. 

* See :ref:`collector-architecture` for compatible CPU architectures and operating systems. 
* See :ref:`otel-deployment-mode` for information on the two deployment modes for the Collector: :ref:`host monitoring (agent) mode <collector-agent-mode>`, and :ref:`data forwarding (gateway) mode <collector-gateway-mode>`.

Next, learn how to :ref:`collector-use-index`. 

.. raw:: html

  <embed>
    <h2>Install the Collector using packages and deployment tools<a name="collector-package-install" class="headerlink" href="#collector-package-install" title="Permalink to this headline">¶</a></h2>
  </embed>

The Splunk Distribution of OpenTelemetry Collector is supported on Kubernetes, Linux, Windows, and Mac. Use one of the following packages to gather data for Splunk Observability Cloud:

* :ref:`collector-kubernetes-intro`
* :ref:`collector-linux-intro`
* :ref:`collector-windows-intro`
  
See also :ref:`other deployment tools and options <otel_deployments>`.

.. _otel-config-options:

.. raw:: html

  <embed>
    <h2>Configure the Collector: Config files, auto-config, and other configuration sources<a name="otel-config-options" class="headerlink" href="#otel-config-options" title="Permalink to this headline">¶</a></h2>
  </embed>

Use these configurations to change the default settings in each Collector package:

* Kubernetes: :ref:`Helm configuration <otel-kubernetes-config>`, :ref:`advanced config <otel-kubernetes-config-advanced>`, and :ref:`log config <otel-kubernetes-config-logs>`
* :ref:`otel-linux-config`
* :ref:`otel-windows-config`

.. note:: Splunk Observability Cloud offers several options for no-hassle, zero-config Auto Instrumentation. Learn more at :ref:`Splunk OpenTelemetry Zero Configuration Auto Instrumentation <zero-config>`.

.. _otel-config-multiple-files:

.. raw:: html

  <embed>
    <h3>Use multiple configuration files<a name="otel-config-multiple-files" class="headerlink" href="#otel-config-multiple-files" title="Permalink to this headline">¶</a></h2>
  </embed>

To define multiple config files simultaneously use:

.. code-block::

  ./otelcol --config=file:/path/to/first/file --config=file:/path/to/second/file

.. _otel-config-additional-components:

.. raw:: html

  <embed>
    <h3>Additional configuration sources<a name="otel-config-additional-components" class="headerlink" href="#otel-config-additional-components" title="Permalink to this headline">¶</a></h3>
  </embed>

You can also use these additional :ref:`configuration sources <otel-other-configuration-sources>`:

* :ref:`Environment variable (Alpha) <env-variable-config-source>`
* :ref:`etcd2 (Alpha) <etcd2-config-source>`
* :ref:`Include config source (Beta) <include-config-source>`
* :ref:`Vault (Alpha) <vault-config-source>`
* :ref:`Zookeeper (Alpha) <zookeeper-config-source>`

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

You can use the Fluentd receiver to collect logs. 

Common sources such as filelog, journald, and Windows Event Viewer are included in the installation. The following table describes the artifacts in the Fluentd directory:

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

To learn more about the Fluentd receiver, see :ref:`fluentd-receiver`.

.. raw:: html

  <embed>
    <h2>Use the Collector<a name="collector-use-index" class="headerlink" href="#collector-use-index" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/collector-works.rst

See also the following documents to understand how the Collector works, and how to use it:

* :ref:`otel-tags`
* :ref:`collector-how-to`
* :ref:`configure-remove`

.. raw:: html

  <embed>
    <h3>Components and services of the Collector<a name="collector-components-index" class="headerlink" href="#collector-components-index" title="Permalink to this headline">¶</a></h3>
  </embed>

.. include:: /_includes/collector-components.rst

.. raw:: html

  <embed>
    <h2>Collector variables and internal metrics<a name="collector-internal" class="headerlink" href="#collector-internal" title="Permalink to this headline">¶</a></h2>
  </embed>

The Collector operates using these environmental variables and internal metrics:

* :ref:`collector-env-var`
* :ref:`metrics-internal-collector`