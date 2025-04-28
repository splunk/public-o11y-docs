.. _deployment-linux-ansible:
.. _linux-ansible:

********************************************************
Deploy the Collector for Linux with Ansible 
********************************************************

.. meta::

  :description: Describes how to install the Splunk Observability Cloud OpenTelemetry Collector Ansible role on Linux.

Install the Ansible collection
=========================================

.. raw:: html

   <div class="include-start" id="requirements/collector-linux.rst"></div>

.. include:: /_includes/requirements/collector-linux.rst

.. raw:: html

   <div class="include-stop" id="requirements/collector-linux.rst"></div>

Before installing the Ansible collection, do the following:

* Find your :ref:`Splunk access token <otel-using>`.
* Find your :ref:`Splunk realm <otel-using>`.
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
   * - ``gomemlimit``
     - Replaces ``splunk_ballast_size_mib`` starting in Collector version 0.97.0. It allows limiting memory usage in the GO runtime, helping enhance garbage collection and prevent out of memory situations. Learn more at :ref:`how to update memory ballast in your configuration <collector-upgrade-memory-ballast>`. Default value is 90% of ``splunk_total_mem_mib``.
   * - ``splunk_access_token``
     - The Splunk access token to authenticate requests. This attribute is required.
   * - ``splunk_realm``
     - The realm to send the data to. This variable is set with this value for the service. The default value is ``us0``. To find your Splunk realm, see :ref:`Note about realms <about-realms>`.
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
     - ``splunk_ballast_size_mib`` is deprecated starting on Collector version 0.97.0. If you're using it, see :ref:`how to update your configuration <collector-upgrade-memory-ballast>`.

.. _ansible-zero-config:

Configure automatic discovery with zero-code instrumentation for back-end applications (Linux only) 
=================================================================================================================

You can automatically discover and instrument your back-end applications along with the Collector installation. Automatic discovery (formerly zero configuration auto instrumentation) removes the need to install and configure the SDKs separately. See :ref:`configure-auto-instrumentation-linux` for more information.

The following table shows the variables that you can configure for this Ansible role:

.. list-table::
   :width: 100%
   :header-rows: 1

   * - Variable
     - Description
     - Default value
   * - ``install_splunk_otel_auto_instrumentation``
     - Installs or manages automatic discovery for Java, Node.js, and/or .NET back-end applications. When set to ``true``, the ``splunk-otel-auto-instrumentation`` Debian or RPM package is downloaded and installed from the Collector repository. The application(s) on the node needs to be started or restarted separately after installation for automatic discovery or any configuration changes to take effect.
     - ``false``
   * - ``splunk_otel_auto_instrumentation_sdks``
     - The automatic discovery SDKs to install and activate. Note: ``dotnet`` is currently only supported for x86_64/amd64.
     - ``['java', 'nodejs', 'dotnet']``
   * - ``splunk_otel_auto_instrumentation_version``
     - Determines the version of the ``splunk-otel-auto-instrumentation`` package to install, for example, ``0.50.0``. The minimum supported version is ``0.48.0`` for Java, ``0.87.0`` for Node.js, and ``0.99.0`` for .NET.
     - ``latest``
   * - ``splunk_otel_auto_instrumentation_systemd``
     - By default, the ``/etc/ld.so.preload`` file on the node will be configured for the ``/usr/lib/splunk-instrumentation/libsplunk.so`` shared object library provided by the `splunk-otel-auto-instrumentation` package to activate and configure automatic discovery system-wide for all supported applications.  Alternatively, set this option to ``true`` to activate and configure automatic discovery only for supported applications running as ``systemd`` services. If this option is set to ``true``, ``/usr/lib/splunk-instrumentation/libsplunk.so`` will not be added to `/etc/ld.so.preload`. Instead, the ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf`` ``systemd`` drop-in file will be created and configured for environment variables based on the default and specified options.
     - ``false``
   * - ``splunk_otel_auto_instrumentation_ld_so_preload``
     - By default, the ``/etc/ld.so.preload`` file on the node is configured for the ``/usr/lib/splunk-instrumentation/libsplunk.so`` shared object library, which is provided by the ``splunk-otel-auto-instrumentation`` package and is required for automatic discovery. You can configure this variable to include additional library paths, for example, ``/path/to/my.library.so``. Use this option if you need to include custom or other shared object library files to be preloaded for your applications, in addition to the ``/usr/lib/splunk-instrumentation/libsplunk.so`` file.
     - None
   * - ``splunk_otel_auto_instrumentation_java_agent_jar``
     - Determines the path to the Splunk OpenTelemetry Java agent. The default path is provided by the ``splunk-otel-auto-instrumentation`` package. If the path is changed from the default value, the path should be an existing file on the node.
     - ``/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar``
   * - ``splunk_otel_auto_instrumentation_npm_path``
     - The path to the pre-installed ``npm`` command required to install the Node.js SDK. For example, ``/my/custom/path/to/npm``.
     - ``npm``
   * - ``splunk_otel_auto_instrumentation_resource_attributes``
     - Configures the OpenTelemetry instrumentation resource attributes, for example, ``deployment.environment=prod``. The resource attributes are user-defined comma-separated ``key=value`` pairs. See :ref:`Java <advanced-java-otel-configuration>`, :ref:`Node.js <trace-configuration-nodejs>`, and :ref:`.NET <dotnet-otel-instrumentation-settings>` for more information.
     - None
   * -  ``splunk_otel_auto_instrumentation_service_name`` 
     - Explicitly sets the service name for the instrumented applications, for example, ``my.service``. By default, the service name is automatically derived from the arguments of the executable on the node. See :ref:`Java <advanced-java-otel-configuration>`, :ref:`Node.js <trace-configuration-nodejs>`, and :ref:`.NET <dotnet-otel-instrumentation-settings>` for more information.
     - None
   * - ``splunk_otel_auto_instrumentation_enable_profiler``
     - Activates or deactivates AlwaysOn CPU Profiling.
     - ``false``
   * - ``splunk_otel_auto_instrumentation_enable_profiler_memory``
     - Activates or deactivates AlwaysOn Memory Profiling.
     - ``false``
   * - ``splunk_otel_auto_instrumentation_enable_metrics``
     - Activates or deactivates JVM metrics. 
     - ``false``
   * - ``splunk_otel_auto_instrumentation_otlp_endpoint``
     - Sets the OTLP endpoint for collected metrics, traces, and logs by all activated SDKs. Only applicable if ``splunk_otel_auto_instrumentation_version`` is ``latest`` or ``0.87.0`` and higher.
     - ``''``, which defers to the default for each activated SDK.
   * - ``splunk_otel_auto_instrumentation_otlp_protocol_protocol``
     - Sets the OTLP endpoint protocol for collected metrics, traces, and logs by all activated SDKs, for example ``grpc`` or ``http/protobuf``. Only applicable if ``splunk_otel_auto_instrumentation_version`` is ``latest`` or ``0.104.0`` and higher.
     - ``''``, which defers to the default for each activated SDK.
   * - ``splunk_otel_auto_instrumentation_metrics_exporter``
     - Comma-separated list of exporters for collected metrics by all activated SDKs, for example ``otlp,prometheus``. Set the value to ``none`` to disable collection and export of metrics. Only applicable if ``splunk_otel_auto_instrumentation_version`` is ``latest`` or ``0.104.0`` and higher.
     - ``''``, which defers to the default for each activated SDK.
   * - ``splunk_otel_auto_instrumentation_logs_exporter``
     - Sets the exporter for collected logs by all activated SDKs, for example ``otlp``. Set the value to ``none`` to disable collection and export of logs. Only applicable if ``splunk_otel_auto_instrumentation_version`` is ``latest`` or ``0.108.0`` and higher.
     - ``''``, which defers to the default for each activated SDK.

Next steps
==================================



.. raw:: html

   <div class="include-start" id="gdi/collector-linux-next-steps.rst"></div>

.. include:: /_includes/gdi/collector-linux-next-steps.rst

.. raw:: html

   <div class="include-stop" id="gdi/collector-linux-next-steps.rst"></div>



