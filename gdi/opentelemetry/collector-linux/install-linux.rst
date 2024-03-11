.. _otel-install-linux:

***************************************************************
Install the Collector for Linux with the installer script
***************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Linux using the script or deployment tools.

The Splunk Distribution of OpenTelemetry Collector for Linux is a package that provides integrated collection and forwarding for all data types.

Install the package using one of these methods:

* :ref:`Use the installer script <linux-scripts>`
* :ref:`Use deployment and configuration management tools <linux-deployments>`
* :ref:`Install the Collector for Linux manually <linux-manual>`

.. _linux-scripts:

Installer script
=================================

.. include:: /_includes/requirements/collector-linux.rst

The installer script deploys and configures these elements:

* The Splunk Distribution of OpenTelemetry Collector for Linux
* Fluentd, using the td-agent. Turned off by default. See :ref:`fluentd-receiver` for more information

To install the package using the installer script, follow these steps:

#. Ensure you have systemd, ``curl`` and ``sudo`` installed.
#. Download and run the installer script.
#. Replace the following variables for your environment:

* ``SPLUNK_REALM``: This is the Realm to send data to. The default is ``us0``. To find your Splunk realm, see :ref:`Note about realms <about-realms>`.
* ``SPLUNK_MEMORY_TOTAL_MIB``: This is the total allocated memory in mebibytes (MiB). For example, ``512`` allocates 512 MiB (500 x 2^20 bytes) of memory.
* ``SPLUNK_ACCESS_TOKEN``: This is the base64-encoded access token for authenticating data ingest requests. See :ref:`admin-org-tokens`.

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
   sudo sh /tmp/splunk-otel-collector.sh --realm $SPLUNK_REALM --memory $SPLUNK_MEMORY_TOTAL_MIB -- $SPLUNK_ACCESS_TOKEN

.. note:: If you have a Log Observer entitlement or want to collect logs for the target host with Fluentd, use the ``--with-fluentd`` option to also install Fluentd when installing the Collector.


Configure memory allocation
----------------------------------

To configure memory allocation, change the ``--memory`` parameter. By default, this parameter is set to 512 MiB, or 500 x 2^20 bytes, of memory. Increase this setting to allocate more memory, as shown in the following example.

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
   sudo sh /tmp/splunk-otel-collector.sh --realm $SPLUNK_REALM --memory $SPLUNK_MEMORY_TOTAL_MIB \
       -- $SPLUNK_ACCESS_TOKEN

Configure proxy settings
----------------------------------

To configure proxy settings to install and run the OpenTelemetry Collector, see :ref:`configure-proxy-collector`.

Use configured repos
--------------------------------

By default, apt/yum/zypper repo definition files are created to download the package and Fluentd deb/rpm packages from
:new-page:`https://splunk.jfrog.io/splunk <https://splunk.jfrog.io/splunk>` and :new-page:`https://packages.treasuredata.com <https://packages.treasuredata.com>`, respectively.

To skip these steps and use configured repos on the target system that provide the ``splunk-otel-collector`` and ``td-agent`` deb/rpm packages, specify the ``--skip-collector-repo`` or ``--skip-fluentd-repo`` options. For example:

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
   sudo sh /tmp/splunk-otel-collector.sh --realm $SPLUNK_REALM --skip-collector-repo --skip-fluentd-repo \
    -- $SPLUNK_ACCESS_TOKEN
    

.. _fluentd-manual-config-linux:

Configure Fluentd
---------------------------------------

Fluentd is turned off by default. To install Fluentd for log collection, run the installer script with the ``--with-fluentd`` option. For example:

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
   sudo sh /tmp/splunk-otel-collector.sh --with-fluentd --realm $SPLUNK_REALM -- $SPLUNK_ACCESS_TOKEN

When turned on, the Fluentd service is configured by default to collect and forward log events with the ``@SPLUNK`` label to the Collector, which then sends these events to the HEC ingest endpoint determined by the ``--realm <SPLUNK_REALM>`` option. For example, ``https://ingest.<SPLUNK_REALM>.signalfx.com/v1/log``.

The following Fluentd plugins are also installed:

* ``capng_c`` for activating Linux capabilities.
* ``fluent-plugin-systemd`` for systemd journal log collection.

Additionally, the following dependencies are installed as prerequisites for the Fluentd plugins:

Debian-based systems:

* build-essential
* libcap-ng0
* libcap-ng-dev
* pkg-config

RPM-based systems:

* Development Tools
* libcap-ng
* libcap-ng-devel
* pkgconfig

You can specify the following parameters to configure the package to send log events to a custom Splunk HTTP Event Collector (HEC) endpoint URL:

* ``--hec-url <URL>``
* ``--hec-token <TOKEN>``

HEC lets you send data and application events to a Splunk deployment over the HTTP and Secure HTTP (HTTPS) protocols. See :new-page:`Set up and use HTTP Event Collector in Splunk Web <https://docs.splunk.com/Documentation/Splunk/8.2.1/Data/UsetheHTTPEventCollector>.`

The main Fluentd configuration is installed to ``/etc/otel/collector/fluentd/fluent.conf``. Custom Fluentd source configuration files can be added to the ``/etc/otel/collector/fluentd/conf.d`` directory after installation.

Note the following:

* In this directory, all files with the .conf extension are automatically included by Fluentd.
* The td-agent user must have permissions to access the configuration files and the paths defined within.
* By default, Fluentd is configured to collect systemd journal log events from ``/var/log/journal``.

After any configuration modification, run ``sudo systemctl restart td-agent`` to restart the td-agent service.

If the td-agent package is upgraded after initial installation, you might need to set the Linux capabilities for the new version by performing the following steps for td-agent versions 4.1 or higher:

#. Check for the activated capabilities:

   .. code-block:: bash

      sudo /opt/td-agent/bin/fluent-cap-ctl --get -f /opt/td-agent/bin/ruby
      Capabilities in `` /opt/td-agent/bin/ruby`` ,
      Effective:   dac_override, dac_read_search
      Inheritable: dac_override, dac_read_search
      Permitted:   dac_override, dac_read_search

#. If the output from the previous command does not include ``dac_override`` and ``dac_read_search`` as shown above, run the following commands:

   .. code-block:: bash

      sudo td-agent-gem install capng_c
      sudo /opt/td-agent/bin/fluent-cap-ctl --add "dac_override,dac_read_search" -f /opt/td-agent/bin/ruby
      sudo systemctl daemon-reload
      sudo systemctl restart td-agent


If you already installed Fluentd on a host, install the Collector without Fluentd using the ``--without-fluentd`` option. For more information, see :ref:`otel-configuration`.

.. _configure-auto-instrumentation:

Configure automatic instrumentation for Java
--------------------------------------------

You can also automatically instrument your Java applications along with the Collector installation. Auto instrumentation removes the need to install and configure the Java agent separately. See :ref:`auto-instrumentation-java` for the installation instructions. For more information on Java instrumentation, see :ref:`get-started-java`.



.. _otel-installer-options-linux:

Options of the installer script for Linux
==================================================================

The Linux installer script supports the following options:

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 40 30

   * - Option
     - Description
     - Default value
   * - ``--api-url <url>``
     - Set the API endpoint URL explicitly instead of using the endpoint inferred from the specified realm.
     - ``https://api.REALM.signalfx.com``
   * - ``--ballast <ballast size>``
     - Set the ballast size explicitly instead of the value calculated using the ``--memory`` option. See :ref:`otel-sizing` for more information.
     - ``512``
   * - ``--beta``
     - Use the beta package repository.
     - Not applicable
   * - ``--collector-config <path>``
     -  Set the path to an existing custom configuration file for the Collector service instead of using the default configuration file provided by the Collector package based on the ``--mode <agent|gateway>`` option. If the specified file requires custom environment variables, you can manually add both the variables and values to ``$collector_env_path`` after installation. Restart the Collectorservice with the ``sudo systemctl restart splunk-otel-collector`` command for the changes to take effect.
     -
   * - ``--collector-version <version>``
     - The Collector package version to install.
     - ``latest``
   * - ``--discovery``
     - Activate discovery mode on Collector startup. See :ref:`discovery_mode` for more information.
     - Deactivated
   * - ``--hec-token <token>``
     - Set the HEC token if it`` s different than the specified ``access_token``.
     -
   * - ``--hec-url <url>``
     -  Set the HEC endpoint URL explicitly instead of using the endpoint inferred from the specified realm.
     -  ``https://ingest.REALM.signalfx.com/v1/log``
   * - ``--ingest-url <url>``
     - Set the ingest endpoint URL explicitly instead of using the endpoint inferred from the specified realm.
     - ``https://ingest.REALM.signalfx.com``
   * - ``--memory <memory size>``
     - Total memory in MIB to allocate to the Collector. This option automatically calculates the ballast size. See :ref:`otel-sizing` for more information.
     - ``512``
   * - ``--mode <agent|gateway>``
     - Configure the Collector service to run in host monitoring (``agent``) or data forwarding (``gateway``) mode. See :ref:`otel-deployment-mode` for more information.
     - ``agent``
   * - ``--listen-interface <ip>``
     - Network interface the Collector receivers listen on.
     - ``0.0.0.0``
   * - ``--realm <us0|us1|eu0|...>``
     - The Splunk realm to use. The ingest, API, trace, and HEC endpoint URLs are automatically generated using this value.
     - ``us0``
   * - ``--service-group <group>``
     - Set the group for the splunk-otel-collector service. The option creates the group if it doesn't exist.
     - ``splunk-otel-collector``
   * - ``--service-user <user>``
     - Set the user for the splunk-otel-collector service. The option creates the user if it doesn't exist.
     - ``splunk-otel-collector``
   * - ``--skip-collector-repo``
     - By default, the scripts create an apt, yum, or zypper repo definition file to download the Collector package from ``$repo_base``. Use this option to skip the previous step and use a configured repo on the target system that provides the splunk-otel-collector deb or rpm package.
     -
   * - ``--skip-fluentd-repo``
     - By default, the scripts create an apt, yum, or zypper repo definition file to download the fluentd package from ``$td_agent_repo_base``. Use this option to skip the previous step and use a configured repo on the target system that provides the splunk-otel-collector deb or rpm package.
     -
   * - ``--test``
     - Use the test package repo.
     - Not applicable
   * - ``--trace-url <url>``
     - Set the trace endpoint URL explicitly instead of the endpoint inferred from the specified realm.
     - ``https://ingest.REALM.signalfx.com/v2/trace``
   * - ``--uninstall``
     - Removes the Splunk OpenTelemetry Collector for Linux.
     - Not applicable
   * - ``--with[out]-fluentd``
     - Whether to install and configure fluentd to forward log events to the Collector. See :ref:`fluentd-manual-config-linux` for more information.
     - ``--without-fluentd``
   * - ``--with[out]-instrumentation``
     - Whether to install and configure the splunk-otel-auto-instrumentation package. See :ref:`zero-config` for more information.
     - ``--without-instrumentation``
   * - ``--deployment-environment <value>``
     - Set the ``deployment.environment`` resource attribute to the specified value. Only applicable if the ``--with-instrumentation`` option is also specified.
     - Empty
   * - ``--service-name <name>``
     - Override the autogenerated service names for all instrumented Java applications on this host with ``<name>``. Only applicable if the ``--with-instrumentation`` option is also specified.
     - Empty
   * - ``--[no-]generate-service-name``
     - Specify ``--no-generate-service-name`` to prevent the preloader from setting the ``OTEL_SERVICE_NAME`` environment variable. Only applicable if the ``--with-instrumentation`` option is also specified. This option has been deprecated for Splunk OpenTelemetry Auto Instrumentation versions ``0.87`` or higher, and the bundled Auto Instrumentation agents automatically generate a service name by default.
     - ``--generate-service-name``
   * - ``--[enable|disable]-telemetry``
     - Activate or deactivate the instrumentation preloader from sending the ``splunk.linux-autoinstr.executions``  metric to the Collector. Only applicable if the ``--with-instrumentation``  option is also specified. This option has been deprecated for Splunk OpenTelemetry Auto Instrumentation versions ``0.87`` or higher, and the `libsplunk.so` library no longer generates the ``splunk.linux-autoinstr.executions`` telemetry metric.
     - ``--enable-telemetry``
   * - ``--[enable|disable]-profiler``
     - Activate or deactivate AlwaysOn CPU Profiling. Only applicable if the ``--with-instrumentation``  option is also specified.
     - ``--disable-profiler``
   * - ``--[enable|disable]-profiler-memory``
     - Activate or deactivate AlwaysOn Memory Profiling. Only applicable if the ``--with-instrumentation``  option is also specified.
     - ``--disable-profiler-memory``
   * - ``--[enable|disable]-metrics``
     - Activate or deactivate exporting Micrometer metrics. Only applicable if the ``--with-instrumentation``  option is also specified.
     - ``--disable-metrics``
   * - ``--instrumentation-version``
     - The package version to install. Only applicable if the ``--with-instrumentation``  option is also specified.
     - ``latest``
   * - ``--``
     - Use ``--``  if the access token starts with ``-`` .
     - Not applicable

To display all the configuration options supported by the script, use the ``-h`` flag.

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
   sh /tmp/splunk-otel-collector.sh -h





.. _linux-deployments:

Install the Collector using deployment tools
====================================================

Splunk offers the configuration management options described in this section.

.. _linux-amazon-ecs-ec2:

Amazon ECS EC2
--------------------------------

.. note::

   Available for Prometheus only.

Splunk provides a task definition to deploy the Splunk Distribution of OpenTelemetry Collector to ECS EC2. The task definition is a text file, in JSON format, that describes one or more containers that form your application. See :ref:`deployments-ecs-ec2` for the installation instructions.

.. _linux-amazon-fargate:

Amazon Fargate
---------------------------
.. note::

   Available for Prometheus only. Not yet available for Amazon EKS.

Splunk provides a guided setup to deploy the Splunk Distribution of OpenTelemetry Collector on Amazon Fargate as a sidecar (additional container) to Amazon ECS tasks. See :ref:`deployments-fargate` for the installation instructions.

.. _linux-ansible:

Ansible
-------------------
Splunk provides an Ansible role that installs the package configured to collect data (metrics, traces, and logs) from Linux machines and send that data to Splunk Observability Cloud. See :ref:`deployment-linux-ansible` for the instructions to download and customize the role.

.. _linux-chef:

Chef 
----------------
Splunk provides a cookbook to install the Collector using Chef. See :ref:`deployments-chef` for the installation instructions.

.. _linux-heroku:

Heroku
--------------------
The Splunk Distribution of OpenTelemetry Collector for Heroku is a buildpack for the Collector. The buildpack installs and runs the Collector on a Dyno to receive, process, and export metric and trace data for Splunk Observability Cloud. See :new-page:`Heroku <https://docs.splunk.com/Observability/gdi/heroku/heroku.html>` for the steps to install the buildpack.

.. _linux-nomad:

Nomad 
-----------------
Use Nomad to deploy the Collector. See :ref:`deployments-nomad` for the installation instructions.

.. _linux-pcf:

Pivotal Cloud Foundry
-------------------------------

You can use one of these three options to deploy the Collector with Pivotal Cloud Foundry (PCF):

* Collector standalone deployment.
* Collector as a sidecar to your app.
* Tanzu Tile.

See more in :ref:`deployments-pivotal-cloudfoundry`.

.. _linux-puppet:

Puppet
-------------------------------
Splunk provides a Puppet module to install and configure the package. A module is a collection of resources, classes, files, definition, and templates. See :ref:`deployment-linux-puppet` for the instructions to download and customize the module.

.. _linux-salt:

Salt
---------------
Splunk provides a Salt formula to install and configure the Collector. See :ref:`deployments-salt` for the instructions.


Next steps
==================================

After you`` ve installed the package, you can perform these actions:

* :ref:`Configure the Collector <otel-configuration>`.
* Use :ref:`Infrastructure Monitoring <get-started-infrastructure>` to track the health of your infrastructure.
* Use :ref:`APM <get-started-apm>` to monitor the performance of applications.
* Use :ref:`Log Observer Connect <logs-intro-logconnect>` to analyze log events and troubleshoot issues with your services.