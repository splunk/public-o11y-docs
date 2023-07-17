.. _deployment-linux-ansible:

**********************
Ansible for Linux
**********************

.. meta::
      :description: Describes how to install the Splunk Observability Cloud OpenTelemetry Collector Ansible role on Linux.

Install the Ansible collection
=========================================

The following Linux distributions and versions are supported:

* Amazon Linux: 2, 2023. Log collection with Fluentd isn't supported for Amazon Linux 2023.
* CentOS, Red Hat, or Oracle: 7, 8, 9
* Debian: 9, 10, 11
* SUSE: 12, 15 for Collector version 0.34.0 or higher. Log collection with Fluentd isn't supported.
* Ubuntu: 16.04, 18.04, 20.04, and 22.04

Before installing the Ansible collection, do the following:

* Find your :ref:`Splunk access token <otel-using>`
* Find your :ref:`Splunk realm <otel-using>`
* Check :ref:`exposed ports <otel-using>` to make sure your environment doesn't have conflicts. Ports can be changed in the package's configuration.

Ansible Galaxy is the Ansible official hub for sharing Ansible content. See :new-page:`Ansible Collection for the Splunk Distribution of OpenTelemetry Collector <https://galaxy.ansible.com/signalfx/splunk_otel_collector>` for more information about the playbook. 

Run the following command to install the Ansible collection from Ansible Galaxy:

.. code-block:: bash

   ansible-galaxy collection install signalfx.splunk_otel_collector

To use the role, include the ``signalfx.splunk_otel_collector.collector role`` invocation in your playbook. Note that this role requires root access. The following example shows how to use the role in a playbook with minimal required configuration:

.. code-block:: bash

   - name: Install the Splunk Distribution of OpenTelemetry Collector
     hosts: all
     become: yes
     tasks:
       - name: "Include splunk_otel_collector"
         include_role:
           name: "signalfx.splunk_otel_collector.collector"
         vars:
           splunk_access_token: YOUR_ACCESS_TOKEN
           splunk_realm: SPLUNK_REALM

The following table describes the variables that can be configured for this role:

.. list-table::       
   :header-rows: 1
   :widths: 50 50
   :width: 100%
   
   * - Variable
     - Description
   * - ``splunk_access_token``
     - The Splunk access token to authenticate requests. This attribute is required.
   * - ``splunk_realm``
     - The realm to send the data to. This variable is set with this value for the service. The default value is ``us0``.
   * - ``splunk_ingest_url``
     - The Splunk ingest URL, for example, ``https://ingest.us0.signalfx.com``. This variable is set with this value for the service. The default value is ``https://ingest.{{ splunk_realm }}.signalfx.com``. 
   * - ``splunk_api_url``
     - The Splunk API URL, for example, ``https://api.us0.signalfx.com``. This variable is set with this value for the service. The default value is ``https://api.{{ splunk_realm }}.signalfx.com``.
   * - ``splunk_trace_url``
     - The Splunk trace endpoint URL, for example, ``https://ingest.us0.signalfx.com/v2/trace``. This variable is set with this value for the service. The default value is ``{{ splunk_ingest_url }}/v2/trace``.
   * - ``splunk_hec_url``
     -  The Splunk HEC endpoint URL, for example, ``https://ingest.us0.signalfx.com/v1/log``. This variable is set with this value for the service. The default value is ``{{ splunk_ingest_url }}/v1/log``.
   * - ``splunk_otel_collector_version``
     - The version of the package to install, for example, ``0.25.0``. The default value is ``latest``.
   * - ``splunk_otel_collector_config``
     - The configuration file, created in YAML. This variable can be set to ``/etc/otel/collector/gateway_config.yaml`` to install the package in data forwarding (gateway) mode. The default location is ``/etc/otel/collector/agent_config.yaml``.
   * - ``splunk_config_override``
     - The custom configuration that is merged into the default configuration.
   * - ``splunk_config_override_list_merge``
     - The variable used to configure the ``list_merge`` option for merging lists in ``splunk_config_override`` with lists in the default configuration. Allowed options are ``replace``, ``keep``, ``append``, ``prepend``, ``append_rp``, or ``prepend_rp``. The default value is ``replace``. You can find information about this variable on the :new-page:`Ansible Documentation site <https://docs.ansible.com/>`.
   * - ``splunk_otel_collector_config_source``
     - This is the source path to a configuration file on your control host that is uploaded and set in place of the value set in ``splunk_otel_collector_config`` on remote hosts. This variable can be used to submit a custom configuration, for example, ``./custom_collector_config.yaml``. The default value is ``""``, which means that nothing is copied and the configuration file set with ``splunk_otel_collector_config`` is used.
   * - ``splunk_bundle_dir``
     - The path to the bundle directory. The default path is provided by the package. If the specified path is changed from the default value, the path should be an existing directory on the node. This variable is set with this value for the service. The default location is ``/usr/lib/splunk-otel-collector/agent-bundle``.
   * - ``splunk_collectd_dir``
     - The path to the collectd configuration directory for the bundle. The default path is provided by the package. If the specified path is changed from the default value, the path should be an existing directory on the node. This variable is set with this value for the service. The default location is ``/usr/lib/splunk-otel-collector/agent-bundle``.
   * - ``splunk_service_user`` and ``splunk_service_group``
     - The user or group ownership for the service. The user or group is created if they do not exist. The default value is ``splunk-otel-collector``.
   * - ``splunk_otel_collector_proxy_http`` and ``splunk_otel_collector_proxy_https``
     - The proxy address, respectively for ``http_proxy`` and ``https_proxy`` environment variables, to be used by the service if at least one of them is not empty. This value must be a full URL, for example, ``http://user:pass@10.0.0.42``. Notice this proxy is not used by Ansible itself during deployment. The default value is ``""``.   
   * - ``splunk_memory_total_mib``
     - The amount of allocated memory in MiB. The default value is ``512``, or 500 x 2^20 bytes, of memory .
   * - ``splunk_ballast_size_mib``
     - The set memory ballast size in MiB. The default value is 1/3 of the value set in ``splunk_memory_total_mib``.
   * - ``install_fluentd``
     - The option to install or manage Fluentd and dependencies for log collection. The dependencies include ``capng_c`` for activating Linux capabilities, ``fluent-plugin-systemd`` for systemd journal log collection, and the required libraries or development tools. The default value is ``true``.
   * - ``td_agent_version``
     - The version of td-agent (Fluentd package) that is installed. The default value is ``3.3.0`` for Debian jessie, ``3.7.1`` for Debian stretch, and ``4.3.0`` for other distros.
   * - ``splunk_fluentd_config``
     - The path to the Fluentd configuration file on the remote host. The default location is ``/etc/otel/collector/fluentd/fluent.conf``.
   * - ``splunk_fluentd_config_source``
     - The source path to a Fluentd configuration file on your control host that is uploaded and set in place of the value set in ``splunk_fluentd_config`` on remote hosts. Use this variable to submit a custom Fluentd configuration, for example, ``./custom_fluentd_config.conf``. The default value is ``""``, which means that nothing is copied and the configuration file set with ``splunk_otel_collector_config`` is used.

.. _ansible-zero-config-java:

Configure auto instrumentation for Java (Linux only)
======================================================

You can automatically instrument your Java applications along with the Collector installation. Auto instrumentation removes the need to install and configure the Java agent separately. See :ref:`configure-auto-instrumentation` for more information. 

The following table shows the variables that can be configured for this Ansible role:

.. list-table::
   :widths: 50 50
   :header-rows: 1

   * - Variable
     - Description
   * - ``install_splunk_otel_auto_instrumentation``
     - Available on Linux only. Installs or manages Auto Instrumentation for Java. When set to ``true``, the ``splunk-otel-auto-instrumentation`` Debian or RPM package is downloaded and installed from the Collector repository. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect. The default value is ``false``.
   * - ``splunk_otel_auto_instrumentation_version``
     - Available on Linux only. Determines the version of the ``splunk-otel-auto-instrumentation`` package to install, for example, ``0.50.0``. The minimum supported version is ``0.48.0``. The Java application on the node needs to be restarted separately for any change to take effect. The default value is ``latest``.
   * - ``splunk_otel_auto_instrumentation_ld_so_preload``
     - Available on Linux only. By default, the ``/etc/ld.so.preload`` file on the node is configured for the ``/usr/lib/splunk-instrumentation/libsplunk.so`` shared object library, which is provided by the ``splunk-otel-auto-instrumentation`` package and is required for auto instrumentation. You can configure this variable to include additional library paths, for example, ``/path/to/my.library.so``. Use this option if you need to include custom or other shared object library files to be preloaded for your applications, in addition to the ``/usr/lib/splunk-instrumentation/libsplunk.so`` file.The Java application on the node needs to be restarted separately for any change to take effect.
   * - ``splunk_otel_auto_instrumentation_java_agent_jar``
     - Available on Linux only. Determines the path to the Splunk OpenTelemetry Java agent. The default path is provided by the ``splunk-otel-auto-instrumentation`` package. If the path is changed from the default value, the path should be an existing file on the node. The specified path is added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node. The Java application on the node needs to be restarted separately for any change to take effect. The default value is ``/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar``.
   * - ``splunk_otel_auto_instrumentation_resource_attributes``
     - Available on Linux only. Configures the OpenTelemetry instrumentation resource attributes, for example, ``deployment.environment=prod``. The resource attributes are user-defined key-value pairs. The specified resource attributes are added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node. The Java application on the node needs to be restarted separately for any change to take effect. See :ref:`trace-configuration-java` for more information.
   * -  ``splunk_otel_auto_instrumentation_service_name`` 
     - Available on Linux only. Explicitly sets the service name for the instrumented Java application, for example, ``my.service``. By default, the service name is automatically derived from the arguments of the Java executable on the node. The specified service name is added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node, overriding any generated service name. See :ref:`trace-configuration-java` for more information. The Java application on the node needs to be restarted separately for any change to take effect.
   * - ``splunk_otel_auto_instrumentation_generate_service_name``
     - Set to ``false`` to prevent the preloader from setting the ``OTEL_SERVICE_NAME`` environment variable.
   * - ``splunk_otel_auto_instrumentation_disable_telemetry``
     - Prevents the preloader from sending the ``splunk.linux-autoinstr.executions`` metric to the Collector.
   * - ``splunk_otel_auto_instrumentation_enable_profiler``
     - Activates or deactivates AlwaysOn CPU Profiling.
   * - ``splunk_otel_auto_instrumentation_enable_profiler_memory``
     - Activates or deactivates AlwaysOn Memory Profiling.
   * - ``splunk_otel_auto_instrumentation_enable_metrics``
     - Activates or deactivates JVM metrics. 

