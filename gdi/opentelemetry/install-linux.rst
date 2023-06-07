.. _otel-install-linux:

***************************************************************
Install the Collector for Linux with the installer script
***************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Linux.

.. toctree::
   :maxdepth: 4
   :titlesonly:
   :hidden:

   /gdi/pivotalcloudfoundry/pivotal-cloud-foundry.rst
   /gdi/opentelemetry/deployments/deployments-linux-ansible.rst
   /gdi/opentelemetry/deployments/deployments-linux-puppet.rst

The Splunk Distribution of OpenTelemetry Collector for Linux is a package that provides integrated collection and forwarding for all data types. 

Install the package using one of these methods:

* :ref:`Use the installer script <linux-scripts>`
* :ref:`Use deployment and configuration management tools <linux-deployments>`

See also how to :ref:`Install the Collector for Linux manually <linux-manual>`.

.. _linux-scripts:

Installer script
=================================

The following Linux distributions and versions are supported:

* Amazon Linux: 2, 2023. Log collection with Fluentd is not currently supported for Amazon Linux 2023.
* CentOS, Red Hat, or Oracle: 7, 8, 9
* Debian: 9, 10, 11
* SUSE: 12, 15 for versions v0.34.0 or higher. Log collection with Fluentd is not currently supported.
* Ubuntu: 16.04, 18.04, 20.04, and 22.04

The installer script deploys and configures these elements:

* The Splunk Distribution of OpenTelemetry Collector for Linux
* Fluentd, using the td-agent. See :ref:`fluentd-receiver` for more information

To install the package using the installer script, follow these steps:

#. Ensure you have systemd, ``curl`` and ``sudo`` installed.
#. Download and execute the installer script.
#. Replace the following variables for your environment:

* ``SPLUNK_REALM``: This is the Realm to send data to. The default is ``us0``. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.
* ``SPLUNK_MEMORY_TOTAL_MIB``: This is the total allocated memory in mebibytes (MiB). For example, ``512`` allocates 512 MiB (500 x 2^20 bytes) of memory.
* ``SPLUNK_ACCESS_TOKEN``: This is the base64-encoded access token for authenticating data ingest requests. See :ref:`admin-org-tokens`.

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
   sudo sh /tmp/splunk-otel-collector.sh --realm SPLUNK_REALM --memory SPLUNK_MEMORY_TOTAL_MIB -- SPLUNK_ACCESS_TOKEN

Run additional script options
-------------------------------------------

To display additional configuration options supported by the script, use the ``-h`` flag.

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
   sh /tmp/splunk-otel-collector.sh -h

Configure memory allocation
----------------------------------

To configure memory allocation, change the ``--memory`` parameter. By default, this parameter is set to 512 MiB, or 500 x 2^20 bytes, of memory. Increase this setting to allocate more memory, as shown in the following example.

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
   sudo sh /tmp/splunk-otel-collector.sh --realm SPLUNK_REALM --memory SPLUNK_MEMORY_TOTAL_MIB \
       -- SPLUNK_ACCESS_TOKEN

Configure proxy settings
----------------------------------

If you need to use a proxy, set one of the following environment variables according to your needs:

- ``HTTP_PROXY``: Address of the proxy for HTTP request. Port is optional.
- ``HTTPS_PROXY``: Address of the proxy for HTTPS request. Port is optional.
- ``NO_PROXY``: If a proxy is defined, sets addressess that don't use the proxy.

Restart the Collector after adding these environment variables to your configuration.

.. note:: For more information on proxy settings, see :ref:`configure-proxy-collector`.

Use pre-configured repos 
--------------------------------

By default, apt/yum/zypper repo definition files are created to download the package and Fluentd deb/rpm packages from
:new-page:`https://splunk.jfrog.io/splunk <https://splunk.jfrog.io/splunk>` and :new-page:`https://packages.treasuredata.com <https://packages.treasuredata.com>`, respectively.

To skip these steps and use pre-configured repos on the target system that provide the ``splunk-otel-collector`` and ``td-agent`` deb/rpm packages, specify the ``--skip-collector-repo`` or ``--skip-fluentd-repo`` options. For example:

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
   sudo sh /tmp/splunk-otel-collector.sh --realm SPLUNK_REALM --skip-collector-repo --skip-fluentd-repo \
    -- SPLUNK_ACCESS_TOKEN

.. _fluentd-manual-config-linux:

Configure Fluentd
---------------------------------------

.. note::
   If you don't need to collect logs, run the installer script with the ``--without-fluentd`` option to skip installation of Fluentd and the plugins and dependencies described in this section.

By default, the Fluentd service is installed and configured to forward log events with the ``@SPLUNK`` label to the package, which then sends these events to the HEC ingest endpoint determined by the ``--realm <SPLUNK_REALM>`` option. For example, ``https://ingest.<SPLUNK_REALM>.signalfx.com/v1/log``.

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

* ``hec-url = "<URL>"``
* ``hec-token = "<TOKEN>"``

HEC lets you send data and application events to a Splunk deployment over the HTTP and Secure HTTP (HTTPS) protocols. See :new-page:`Set up and use HTTP Event Collector in Splunk Web <https://docs.splunk.com/Documentation/Splunk/8.2.1/Data/UsetheHTTPEventCollector>.`

The main Fluentd configuration is installed to ``/etc/otel/collector/fluentd/fluent.conf``. Custom Fluentd source configuration files can be added to the ``/etc/otel/collector/fluentd/conf.d`` directory after installation.

Note the following:

* In this directory, all files with the .conf extension are automatically included by Fluentd.
* The td-agent user must have permissions to access the configuration files and the paths defined within.
* By default, Fluentd is configured to collect systemd journal log events from ``/var/log/journal``.

After any configuration modification, run ``sudo systemctl restart td-agent`` to restart the td-agent service.

If the td-agent package is upgraded after initial installation, you might need to set the Linux capabilities for the new version by performing the following steps for td-agent versions 4.1 or later:

#. Check for the activated capabilities:

   .. code-block:: bash

      sudo /opt/td-agent/bin/fluent-cap-ctl --get -f /opt/td-agent/bin/ruby
      Capabilities in '/opt/td-agent/bin/ruby',
      Effective:   dac_override, dac_read_search
      Inheritable: dac_override, dac_read_search
      Permitted:   dac_override, dac_read_search

#. If the output from the previous command does not include ``dac_override`` and ``dac_read_search`` as shown above, run the following commands:

   .. code-block:: bash

      sudo td-agent-gem install capng_c
      sudo /opt/td-agent/bin/fluent-cap-ctl --add "dac_override,dac_read_search" -f /opt/td-agent/bin/ruby
      sudo systemctl daemon-reload
      sudo systemctl restart td-agent


If you already installed Fluentd on a host, install the Splunk OTel Collector without Fluentd using the ``--without-fluentd`` option. For more information, see :ref:`otel-configuration`. 


.. _configure-auto-instrumentation:

Configure automatic instrumentation for Java
--------------------------------------------
You can also automatically instrument your Java applications along with the Collector installation. Auto instrumentation removes the need to install and configure the Java agent separately. See :ref:`auto-instrumentation-java` for the installation instructions. For more information on Java instrumentation, see :ref:`get-started-java`. 

.. _linux-deployments:

Deployments
====================

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
Splunk provides an Ansible role that installs the package configured to collect data (metrics, traces, and logs) from Linux machines and send that data to Observability Cloud. See :ref:`deployment-linux-ansible` for the instructions to download and customize the role.

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
Use Nomad to to deploy the Collector. See :ref:`deployments-nomad` for the installation instructions.

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
Once you have installed the package, you can perform these actions:

* :new-page:`Get started using Log Observer <https://quickdraw.splunk.com/redirect/?product=Observability&location=log.observer.setup&version=current>`.
* :ref:`apm`.
