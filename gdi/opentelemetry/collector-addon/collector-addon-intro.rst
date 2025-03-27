.. _collector-addon-intro:

*********************************************************************************************
Splunk Add-On for the OpenTelemetry Collector
*********************************************************************************************

.. meta::
   :description: Introduction to the Splunk Add-on for the Splunk Distribution of the OpenTelemetry Collector.

.. toctree::
   :maxdepth: 5
   :hidden:

   Install the Technical Add-on <collector-addon-install.rst>
   Deployment modes <collector-addon-configure-instance.rst>
   Configure the Technical Add-on <collector-addon-configure.rst>
   Upgrade the Technical Add-on <collector-addon-upgrade.rst>
   Troubleshooting <collector-addon-troubleshooting.rst>
   Release Notes <collector-addon-release-notes.rst>

Use the Splunk Add-on for the OpenTelemetry Collector to collect traces and metrics with Splunk Observability Cloud.

You have two ways to install and configure the Splunk Add-on for the OpenTelemetry Collector:

* :ref:`collector-addon-install-uf`
* :ref:`collector-addon-install-server`

You can also choose to install and configure the Add-on using a customized or third-party solution, such as Ansible or Terraform. 

.. raw:: html

   <embed>
      <h2>Differences between the Splunk Distribution of the OpenTelemetry Collector and the Splunk Add-on for the OpenTelemetry Collector<a name="collector-addon-distro-diffs" class="headerlink" href="#collector-addon-distro-diffs" title="Permalink to this headline">¶</a></h2>
   </embed>

The Collector in the Splunk Add-on for OpenTelemetry is the same Collector offered in Splunk Observability. However, the Splunk Add-on provides the added benefit of out-of-the box Collector content and configuration.

.. list-table::
  :widths: 30 40 40
  :width: 100%
  :header-rows: 1

  * - Function
    - Splunk Distribution of the OpenTelemetry Collector
    - Splunk Add-on for the OpenTelemetry Collector

  * - Collector binary
    - Supported
    - Supported

  * - Gateway configuration
    - Supported
    - Supported

  * - Default agent configuration
    - Includes logging receiver and exporter configuration
    - No out-of-the-box configuration is provided for the logging exporter or receiver

  * - Configuration method
    - Environment variables
    - Inputs.conf

  * - :ref:`Automatic discovery and configuration <discovery_mode>`
    - Supported
    - Supported for Linux only

  * - Distribution and deployment
    - Source code, binary, Operator, Helm Charts, Debian, Ansible, Puppet, Chef, Salt
    - Manual installation and Splunk deployment server distribution

.. raw:: html

   <embed>
      <h2>Prerequisites<a name="collector-addon-prereqs" class="headerlink" href="#collector-addon-prereqs" title="Permalink to this headline">¶</a></h2>
   </embed>

Before you install the Splunk Add-on for the OpenTelemetry Collector, you must have the following Splunk products installed and configured:

* Splunk Universal Forwarder version 8.x or 9.x on Windows or Linux: The Splunk Add-on for the OpenTelemetry Collector is installed alongside your universal forwarder to push collected data to Splunk Observability Cloud.

* Splunk Observability Cloud: The Splunk Add-on for the OpenTelemetry Collector is configured to send data to Splunk Observability Cloud. See :ref:`otel-intro` and :ref:`otel-requirements` for more information on how to prepare your Splunk Observability Cloud instance.

* (optional) Install Splunk Enterprise or Splunk Cloud if you plan to use a Splunk Web interface or deployment server as forwarders.

* (optional) Install the deployment server if you plan to use the deployment server to push the Splunk Add-on for the OpenTelemetry Collector to multiple hosts.

.. raw:: html

   <embed>
      <h2>Data collection and usage<a name="collector-addon-prereqs" class="headerlink" href="#collector-addon-prereqs" title="Permalink to this headline">¶</a></h2>
   </embed>

When you deploy the Splunk Add-on for the Open Telemetry Collector, Splunk Cloud Platform sends aggregated telemetry usage data to Splunk Inc. ("Splunk") to help improve future releases. For information about how to opt in or out, and how the data is collected, stored, and governed, see :new-page:`Share performance and usage data in Splunk Enterprise <https://docs.splunk.com/Documentation/Splunk/9.3.1/Admin/Shareperformancedata>`.

The Splunk Add-on for the Open Telemetry Collector uses saved searches to collect anonymous usage data. These searches run in the background regardless of whether you opt in or out to send usage data to Splunk, and do not have any significant impact on performance.

.. raw:: html

   <embed>
      <h2>Download the Technical Add-on<a name="collector-addon-intro-download" class="headerlink" href="#collector-addon-intro-download" title="Permalink to this headline">¶</a></h2>
   </embed>

You can download the Splunk Add-on for the OpenTelemetry Collector from Splunkbase. See :new-page:`Splunkbase's Splunk Add-on for the OpenTelemetry Collector <https://splunkbase.splunk.com/app/7125?_gl=1*nsvlab*_gcl_au*MTI1MDc1MzQ3OS4xNzIzNDQ2NTk2*FPAU*MTI1MDc1MzQ3OS4xNzIzNDQ2NTk2*_ga*MTY3OTA0Njk3Mi4xNjUyNzEwMTA4*_ga_5EPM2P39FV*MTcyNzcwMTk1MC4xMDQ5LjEuMTcyNzcwMjM4OC4wLjAuMzU0OTAyMDQ1*_fplc*MEE0WVo5cGVvVWpGWXhndCUyRlE1U0RIdU81dUElMkZoUFQ2RyUyQmZXcTRQMGZCdzl5R2N2NVE0JTJGdEVHTXFkZGhPdGZoJTJCQ21JdHp6cFJIOWl0TEdYJTJCd0NIc1BjelRDeG9Oc1lISDlXOU9BcHJ5cm5PTFBRJTNE>`.




