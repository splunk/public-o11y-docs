.. _collector-linux-intro:

***********************************************************
Get started with the Collector for Linux
***********************************************************

.. meta::
   :description: Introduction to the Splunk Distribution of the OpenTelemetry Collector for Linux.

.. toctree::
   :maxdepth: 5
   :hidden:

   Install the Collector for Linux (script) <install-linux.rst>
   Install the Collector for Linux (manual) <install-linux-manual.rst>    
   Install the Collector for Linux (tools) <install-linux-tools>
   linux-config-ootb.rst
   Default Linux metrics <metrics-ootb-linux.rst>   
   linux-config.rst
   linux-config-logs.rst
   linux-upgrade.rst   
   linux-uninstall.rst
   collector-configuration-tutorial/about-collector-config-tutorial.rst

To install and configure the Splunk Distribution of the OpenTelemetry Collector for Linux, follow these docs:

.. raw:: html

  <embed>
    <h2>Install the Collector for Linux<a name="linux-install" class="headerlink" href="#linux-install" title="Permalink to this headline">¶</a></h2>
  </embed>

* :ref:`otel-install-linux`
* :ref:`otel-install-linux-manual`
* :ref:`otel-install-linux-tools` 

.. note:: You can also deploy the Collector using the Technical Add-on, which provides out-of-the box Collector content and configuration. Learn more at :ref:`collector-addon-intro`.

.. raw:: html

  <embed>
    <h2>Configure the Collector for Linux<a name="linux-configure" class="headerlink" href="#linux-configure" title="Permalink to this headline">¶</a></h2>
  </embed>

.. note:: To deploy the Collector for Linux and automatically find services and applications running in your environment refer to :ref:`discovery-linux`.   

See the default settings and configuration options at:

* :ref:`linux-config-ootb`
* By default, you'll obtain these :ref:`metrics <ootb-metrics-windows>` 
* :ref:`otel-linux-config`
* :ref:`linux-config-logs`

.. include:: /_includes/gdi/collector-common-options.rst

.. raw:: html

  <embed>
    <h2>Upgrade, uninstall and troubleshoot<a name="linux-ts" class="headerlink" href="#linux-ts" title="Permalink to this headline">¶</a></h2>
  </embed>


To upgrade or uninstall, see:

* :ref:`otel-linux-upgrade` 
* :ref:`otel-linux-uninstall`

If you have any installation or configuration issues, refer to :ref:`otel-troubleshooting`.

.. raw:: html

  <embed>
    <h2>Tutorials<a name="linux-tutorials" class="headerlink" href="#linux-tutorials" title="Permalink to this headline">¶</a></h2>
  </embed>

For a walkthrough of common tasks related to the OpenTelemetry Collector for Linux see: :ref:`about-collector-configuration-tutorial`.