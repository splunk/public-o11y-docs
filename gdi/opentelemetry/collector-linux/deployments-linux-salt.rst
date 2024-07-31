.. _deployments-salt:
.. _deployments-linux-salt:
.. _linux-salt:

********************************************************
Deploy the Collector for Linux with Salt 
********************************************************

.. meta::

  :description: Deploy the Splunk Observability Cloud OpenTelemetry Collector for Linux using a Salt formula.

You can use a formula to install and configure the Collector to collect metrics, traces, and logs from Linux machines and send data to Splunk Observability Cloud. See the :new-page:`GitHub repository <https://github.com/signalfx/splunk-otel-collector/tree/main/deployments/salt>` to download the Salt module.

Formulas are pre-written Salt States. They are as open-ended as Salt States themselves and can be used for tasks such as installing a package, configuring and starting a service, setting up users or permissions, and many other common tasks.

Prerequisites
=========================

You need the following resources to use Salt:

* :ref:`Splunk Access Token <admin-org-tokens>`
* :new-page:`Splunk Realm <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`
* Check exposed ports to make sure your environment doesn't have conflicts. You can change ports in the Collector configuration. See :ref:`otel-exposed-endpoints` for more information.

Supported Linux versions
------------------------

The following Linux distributions and versions are supported:

* Amazon Linux: 2, 2023. Log collection with Fluentd isn't supported for Amazon Linux 2023.
* CentOS, Red Hat, Oracle: 7, 8, 9
* Debian: 9, 10, 11
* SUSE: 12, 15 (Note: Only for Collector versions 0.34.0 or higher. Log collection with Fluentd not currently supported.)
* Ubuntu: 18.04, 20.04, 22.04

Get started
==========================

Salt uses key-value stores known as "pillars" for user-defined data to be made available to a "minion". Salt defines a minion as a server running a Salt minion daemon which can listen to commands from a manager and run the requested tasks. Generally, minions are servers controlled using Salt.

You can configure all attributes in the ``splunk-otel-collector`` pillar. For example:

.. code-block:: yaml

   splunk-otel-collector:
   splunk_access_token: "MY_ACCESS_TOKEN"
   splunk_realm: "SPLUNK_REALM"
   splunk_repo_base_url: https://splunk.jfrog.io/splunk
   splunk_otel_collector_config: '/etc/otel/collector/agent_config.yaml'
   splunk_service_user: splunk-otel-collector
   splunk_service_group: splunk-otel-collector
    
Attributes for Linux
===========================

For Linux, the formula accepts the attributes described in the following table:

.. list-table:: 
   :widths: 25 45 30
   :header-rows: 1

   * - Name
     - Description
     - Default value
   * - ``collector_version``
     - Version of the Collector package to install, for example, ``0.25.0``. The version should correspond to :new-page:`Github Releases <https://github.com/signalfx/splunk-otel-collector/releases>` without the preceding ``v``. Note that on Linux, the latest Collector version is installed if this parameter is not specified.
     - None
   * - ``gomemlimit``
     - Replaces ``splunk_ballast_size_mib`` starting in Collector version 0.97.0. Learn more at :ref:`how to update memory ballast in your configuration <collector-upgrade-memory-ballast>`.
     - 90% of ``splunk_total_mem_mib``    
   * - ``splunk_access_token``
     - The Splunk access token to authenticate requests. This attribute is required.
     - None
   * - ``splunk_realm``
     - Which realm to send the data to, for example, ``us0``. The Splunk ingest and API URLs are inferred by this value. The ``SPLUNK_REALM`` environment variable is set with this value for the collector service. This attribute is required. To find your Splunk realm, see :ref:`Note about realms <about-realms>`.
     - None
   * - ``splunk_ingest_url``
     - Sets the Splunk ingest URL explicitly instead of the URL inferred by the ``$splunk_realm`` parameter. The ``SPLUNK_INGEST_URL`` environment variable is set with this value for the Collector service.
     - ``https://ingest.${splunk_realm}.signalfx.com``
   * - ``splunk_api_url``
     - Sets the Splunk API URL explicitly instead of the URL inferred by the ``$splunk_realm`` parameter. The ``SPLUNK_API_URL`` environment variable is set with this value for the Collector service.
     - ``https://api.${splunk_realm}.signalfx.com``
   * - ``splunk_trace_url``
     - Sets the Splunk trace endpoint URL explicitly instead of the URL inferred by the ``$splunk_ingest_url`` parameter. The ``SPLUNK_TRACE_URL`` environment variable is set with this value for the Collector service.
     - ``${splunk_ingest_url}/v2/trace``
   * - ``splunk_hec_url``
     - Sets the Splunk HEC endpoint URL explicitly instead of the URL inferred by the ``$splunk_ingest_url`` parameter. The ``SPLUNK_HEC_URL`` environment variable is set with this value for the Collector service.
     - ``${splunk_ingest_url}/v1/log``
   * - ``splunk_hec_token``
     - Sets the Splunk HEC authentication token if different than ``$splunk_access_token``. The ``SPLUNK_HEC_TOKEN`` environment variable is set with this value for the Collector service.    
     - ``$splunk_access_token``
   * - ``splunk_bundle_dir``
     - The path to the Smart Agent bundle directory. The default path is provided by the Collector package. If the specified path is changed from the default value, the path should be an existing directory on the node. The ``SPLUNK_BUNDLE_DIR`` environment variable is set to this value for the Collector service. 
     - ``/usr/lib/splunk-otel-collector/agent-bundle``
   * - ``splunk_collectd_dir``
     - The path to the collectd configuration directory for the Smart Agent bundle. The default path is provided by the Collector package. If the specified path is changed from the default value, the path should be an existing directory on the node. The ``SPLUNK_COLLECTD_DIR`` environment variable is set to this value for the Collector service. 
     - ``${splunk_bundle_dir}/run/collectd``
   * - ``splunk_memory_total_mib``
     - Total memory in MIB to allocate to the Collector; automatically calculates the ballast size. The ``SPLUNK_MEMORY_TOTAL_MIB`` environment variable is set to this value for the Collector service. 
     - ``512``
   * - ``splunk_ballast_size_mib``
     - ``splunk_ballast_size_mib`` is deprecated starting on Collector version 0.97.0. If you're using it, see :ref:`how to update your configuration <collector-upgrade-memory-ballast>`.
     - 1/3 of the ``splunk_memory_total_mib`` total
   * - ``splunk_otel_collector_config_source``
     - The source path to a Collector configuration YAML file on your control host that is uploaded and set in place of ``splunk_otel_collector_config`` in remote hosts. To use a custom Collector configuration, add the configuration file in the Salt dir. For example, ``salt://templates/agent_config.yaml``.
     - ``""``, meaning that nothing is copied and the existing ``splunk_otel_collector_config`` file is used
   * - ``service_user`` and ``$service_group``
     - Sets the user or group ownership for the Collector service. The user or group is created if they do not exist.
     - ``splunk-otel-collector``
   * - ``install_fluentd``
     - Whether to install or manage Fluentd and dependencies for log collection. On Linux, the dependencies include ``capng_c`` for activating Linux capabilities, ``fluent-plugin-systemd`` for systemd journal log collection, and the required libraries and development tools.
     - ``false``
   * - ``td_agent_version``
     -  Version of the td-agent (Fluentd) package to install 
     -  ``3.7.1-0`` for Debian 9 and ``4.3.0`` for other distros
   * - ``splunk_fluentd_config``
     - The path to the Fluentd configuration file on the remote host.
     - ``/etc/otel/collector/fluentd/fluent.conf``
   * - ``splunk_fluentd_config_source``
     - The source path to a Fluentd configuration file on your control host that is uploaded and set in place of the ``splunk_fluentd_config`` file on remote hosts. To use a custom Fluentd configuration file, add the configuration file into the Salt dir. For example, ``salt://templates/td_agent.conf``. 
     - ``""`` meaning that nothing is copied and the existing ``splunk_fluentd_config`` file is used.
   * - ``fluentd_config_dest``
     - Destination path to the Fluentd configuration file on the node. Only applicable if ``$with_fluentd`` is set to ``true``.
     - ``/etc/otel/collector/fluentd/fluent.conf``

.. _salt-zero-config:

Configure automatic discovery for back-end application(s) 
======================================================================

You can automatically instrument your back-end applications along with the Collector installation. Automatic discovery removes the need to install and configure the OpenTelemetry SDKs separately. See :ref:`configure-auto-instrumentation` for more information.

The following table shows the variables that can be configured for this Salt module:

.. list-table::
   :widths: 20 30 50
   :header-rows: 1

   * - Name
     - Description 
     - Default value
   * - ``install_auto_instrumentation``
     - Whether to install or manage automatic discovery for back-end applications. When set to ``true``, the ``splunk-otel-auto-instrumentation`` deb/rpm package is downloaded and installed from the Collector repository. The applications on the node need to be started or restarted separately after installation for automatic discovery or any configuration changes to take effect. To learn more, see :ref:`linux-backend-auto-discovery`.
     - ``false``
   * - ``auto_instrumentation_version``
     - Version of the ``splunk-otel-auto-instrumentation`` package to install, for example, ``0.50.0``. The minimum supported version is ``0.48.0`` for Java, ``0.87.0`` for Node.js, and ``0.99.0`` for .NET.
     - ``latest``
   * - ``auto_instrumentation_systemd``
     - Whether to activate and configure the automatic discovery for ``systemd`` services only. If set to ``true``, automatic discovery environment variables are added to ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.
     - ``false``
   * - ``auto_instrumentation_ld_so_preload``
     - By default, the ``/etc/ld.so.preload`` file on the node is configured for the ``/usr/lib/splunk-instrumentation/libsplunk.so`` shared object library provided by the ``splunk-otel-auto-instrumentation`` package and is required for automatic discovery. Configure this variable to include additional library paths, for example, ``/path/to/my.library.so``.
     - ``''``
   * - ``auto_instrumentation_java_agent_path``
     - Path to the Splunk OpenTelemetry Java agent. The default path is provided by the ``splunk-otel-auto-instrumentation`` package. If the path is changed from the default value, the path should be an existing file on the node.
     - ``/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar``
   * - ``auto_instrumentation_npm_path``
     - The path to the pre-installed ``npm`` command required to install the Node.js SDK. For example, ``/my/custom/path/to/npm``.
     - ``npm``
   * - ``auto_instrumentation_resource_attributes``
     - Configure the OpenTelemetry instrumentation resource attributes, for example, ``deployment.environment=prod``.
     - ``''``
   * - ``auto_instrumentation_service_name``
     - Explicitly sets the service name for all instrumented applications, for example, ``my.service``. By default, the service names are automatically derived from the arguments for each of the discovered executables to be instrumented on the node. However, if this variable is set to a non-empty value, the value overrides all derived service names.
     - ``''``
   * - ``auto_instrumentation_enable_profiler``
     - Activates or deactivates AlwaysOn CPU Profiling.
     - ``false``
   * - ``auto_instrumentation_enable_profiler_memory``
     - Activates or deactivates AlwaysOn Memory Profiling.
     - ``false``
   * - ``auto_instrumentation_enable_metrics``
     - Activates or deactivates instrumentation metrics.
     - ``false``

Next steps
==================================

.. include:: /_includes/gdi/collector-linux-next-steps.rst