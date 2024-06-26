.. _deployments-chef:

********************************************************
Deploy the Collector with Chef
********************************************************

.. meta::
      :description: Use Chef to install and configure the OpenTelemetry Collector to collect metrics, traces, and logs from Linux and Windows machines and send data to Splunk Observability Cloud.

Chef is a configuration management technology used to manage infrastructure on physical or virtual machines. Chef uses cookbooks to define a scenario. 

Cookbooks are fundamental working units of Chef, which consists of all the details related to working units, having the capability to modify configuration and the state of any system configured as a node on Chef infrastructure. Cookbooks can run multiple tasks.

Prerequisites
=========================

You need the following resources to use Chef:

* :ref:`Splunk Access Token <admin-org-tokens>`
* :new-page:`Splunk Realm <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`
* Double-check exposed ports to make sure your environment doesn't have conflicts. You can change ports in the Collector configuration. See :ref:`otel-exposed-endpoints` for more information.

Linux
------------------------

The following Linux distributions and versions:

* Amazon Linux: 2
* CentOS, Red Hat, Oracle: 7, 8, 9
* Debian: 9, 10, 11
* SUSE: 12, 15 (Note: Only for Collector versions 0.34.0 or higher. Log collection with Fluentd not currently supported.)
* Ubuntu: 18.04, 20.04, 22.04

Windows
---------------------

The following Windows versions. All versions require using PowerShell 3.0 or newer.

* Windows Server 2019 64-bit
* Windows Server 2022 64-bit

.. caution:: On Windows, the Collector is installed as a Windows service and its environment variables are set at the service scope, so they're only available to the Collector service and not to the entire machine.

Install and use the Collector with Chef
============================================================

Download the Chef cookbook from the :new-page:`Chef Supermarket <https://supermarket.chef.io/cookbooks/splunk_otel_collector>`, which is the site for community cookbooks. 

To install the Collector, include the ``splunk_otel_collector::default`` recipe in the ``run_list``, and set the attributes on the node's ``run_state``. The following is an example configuration that shows how to configure the required ``splunk_access_token`` attribute and some optional attributes:

.. code-block:: yaml

    {
        "splunk-otel-collector": {
            "splunk_access_token": "<SPLUNK_ACCESS_TOKEN>",
            "splunk_realm": "<SPLUNK_REALM>",
        }
    }

Attributes for Linux
===========================

For Linux, the cookbook accepts the attributes described in the following table:

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
     - Replaces ``splunk_ballast_size_mib`` starting in Collector version 0.97.0. It allows limiting memory usage in the GO runtime, helping enhance garbage collection and prevent out of memory situations. Learn more at :ref:`how to update memory ballast in your configuration <collector-upgrade-memory-ballast>`.
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
     - ``"``
   * - ``collector_config_source``
     - The source path to the Collector configuration YAML file. This file is copied to the ``$collector_config_dest`` path on the node. See the :new-page:`source attribute <https://puppet.com/docs/puppet/latest/types/file.html#file-attribute-source>` of the file resource for the supported value types. The default source file is provided by the Collector package.
     - ``/etc/otel/collector/agent_config.yaml``
   * - ``collector_config_dest``
     - Destination path of the Collector configuration file on the node. The ``SPLUNK_CONFIG`` environment variable is set with this value for the Collector service.
     - ``/etc/otel/collector/agent_config.yaml``
   * - ``node['splunk_otel_collector']['collector_config']``
     -  The Collector configuration object. Everything underneath this object gets directly converted to YAML and becomes the Collector configuration file. Using this option preempts ``collector_config_source`` functionality.
     -  ``{}``
   * - ``service_user`` and ``$service_group``
     - Sets the user or group ownership for the Collector service. The user or group is created if they do not exist.
     - ``splunk-otel-collector``
   * - ``package_stage``
     - The Collector package repository stage to use. Can be ``release``, ``beta``, or ``test``.
     - ``release``
   * - ``with_fluentd``
     - Whether to install or manage Fluentd and dependencies for log collection. On Linux, the dependencies include ``capng_c`` for activating Linux capabilities, ``fluent-plugin-systemd`` for systemd journal log collection, and the required libraries and development tools.
     - ``false``
   * - ``fluentd_version``
     -  Version of the td-agent (Fluentd) package to install 
     -  ``3.7.1`` for Debian stretch and ``4.3.1`` for all other Linux distros 
   * - ``fluentd_config_source``
     - Source path to the Fluentd configuration file. This file is copied to the ``$fluentd_config_dest`` path on the node. See the :new-page:`source attribute <https://puppet.com/docs/puppet/latest/types/file.html#file-attribute-source>` of the file resource for the supported value types. The default source file is provided by the Collector package. Only applicable if ``$with_fluentd`` is set to ``true``.
     - ``/etc/otel/collector/fluentd/fluent.conf``
   * - ``fluentd_config_dest``
     - Destination path to the Fluentd configuration file on the node. Only applicable if ``$with_fluentd`` is set to ``true``.
     - ``/etc/otel/collector/fluentd/fluent.conf``

.. _chef-zero-config:

Configure automatic discovery for back-end applications (Linux only)
--------------------------------------------------------------------

You can automatically instrument your back-end applications applications along with the Collector installation using automatic discovery. Automatic discovery removes the need to install and configure OpenTelemetry agents separately. See :ref:`discovery_mode` for more information.  The applications to be instrumented on the node need to be started or restarted separately after installation or any configuration changes for automatic discovery to take effect.

The following table shows the variables that can be configured with this Chef cookbook:

.. list-table::
   :widths: 20 50 30
   :header-rows: 1

   * - Name
     - Description
     - Default value
   * - ``with_auto_instrumentation``
     - Whether to install or manage automatic discovery for back-end applications. When set to ``true``, the ``splunk-otel-auto-instrumentation`` deb/rpm package is downloaded and installed from the Collector repository. To learn more, see :ref:`linux-backend-auto-discovery`.
     - ``false``
   * - ``with_auto_instrumentation_sdks``
     - The automatic discovery SDKs to install and activate. Note: ``dotnet`` is currently only supported for x86_64/amd64.
     - ``%w(java nodejs dotnet)``
   * - ``auto_instrumentation_version``
     - Version of the ``splunk-otel-auto-instrumentation`` package to install, for example, ``0.50.0``. The minimum supported version is ``0.48`` for Java, ``0.87.0`` for Node.js, and ``0.99.0`` for .NET.
     - ``latest``
   * - ``auto_instrumentation_systemd``
     - Whether to activate and configure the automatic discovery for ``systemd`` services only. If set to ``true``, the automatic discovery environment variables are added to ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.
     - ``false``
   * - ``auto_instrumentation_ld_so_preload``
     - By default, the ``/etc/ld.so.preload`` file on the node is configured for the ``/usr/lib/splunk-instrumentation/libsplunk.so`` shared object library provided by the ``splunk-otel-auto-instrumentation`` package and is required for system-wide automatic discovery. Configure this variable to include additional library paths, for example, ``/path/to/my.library.so``.
     - ``''``
   * - ``auto_instrumentation_resource_attributes``
     - Configure the OpenTelemetry instrumentation resource attributes, for example, ``deployment.environment=prd,my.key=my.value`` (comma-separated string of ``key=value`` pairs). The specified resource attributes are added to the ``/etc/splunk/zeroconfig/node.conf`` configuration file on the node, or ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf`` if using the ``systemd`` installation method.
     - ``''``
   * - ``auto_instrumentation_service_name``
     - Explicitly sets the service name for all instrumented applications on the node, for example, ``my.service``. By default, the service name is automatically derived for each instrumented application. However, if this variable is set to a non-empty value, the value overrides the derived service names.
     - ``''``
   * - ``auto_instrumentation_enable_profiler``
     - Activates or deactivates AlwaysOn CPU Profiling. To learn more, see :ref:`profiling-configuration-nodejs`.
     - ``false``
   * - ``auto_instrumentation_enable_profiler_memory``
     - Activates or deactivates AlwaysOn Memory Profiling. To learn more, see :ref:`profiling-configuration-nodejs`.
     - ``false``
   * - ``auto_instrumentation_enable_metrics``
     - Activates or deactivates exporting instrumentation metrics.
     - ``false``
   * - ``auto_instrumentation_otlp_endpoint``
     - Sets the OTLP gRPC endpoint that receives traces. Only applicable for OpenTelemetry Collector versions ``0.87.0`` and higher.
     - ``http://127.0.0.1:4317``
   * - ``auto_instrumentation_java_agent_path``
     - Path to the Splunk OpenTelemetry Java agent. The default path is provided by the ``splunk-otel-auto-instrumentation`` package. If the path is changed from the default value, the path should be an existing file on the node.
     - ``/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar``
   * - ``auto_instrumentation_npm_path``
     - The path to the pre-installed ``npm`` command, e.g. ``/my/custom/path/to/npm``.
     - ``npm``

Configure automatic discovery for SignalFx .NET (Windows only)
=================================================================

You can automatically instrument your .NET applications along with the Collector installation using automatic discovery. Automatic discovery removes the need to install and configure the SignalFx .NET agent separately. See :ref:`discovery_mode` for more information. 

The cookbook accepts the attributes described in the following table:

.. list-table:: 
   :widths: 20 50 30
   :header-rows: 1

   * - Name
     - Description
     - Default value
   * - ``with_signalfx_dotnet_instrumentation``
     - Whether to install or manage automatic discovery for .NET. When set to ``true``, the ``signalfx-dotnet-tracing`` MSI package will be downloaded and installed, and the Windows registry will be updated based on other configuration options. To learn more, see :ref:`windows-backend-auto-discovery`
     - ``false``
   * - ``signalfx_dotnet_auto_instrumentation_version``
     - Version of the ``signalfx-dotnet-tracing`` MSI package to download and install.
     - ``1.1.0``
   * - ``signalfx_dotnet_auto_instrumentation_msi_url``
     - Specify the URL to download the MSI from a custom host, for example ``https://my.host/signalfx-dotnet-tracing-1.0.0-x64.msi``. If specified, the ``signalfx_dotnet_auto_instrumentation_version`` option is ignored.
     - ``https://github.com/signalfx/signalfx-dotnet-tracing/releases/download/v{{ signalfx_dotnet_auto_instrumentation_version }}/signalfx-dotnet-tracing-{{ signalfx_dotnet_auto_instrumentation_version }}-x64.msi``
   * - ``signalfx_dotnet_auto_instrumentation_iisreset``
     - By default, the ``iisreset.exe`` command will be executed after installation/configuration in order for any changes to take effect for IIS applications. Set this option to ``false`` to skip this step if IIS is managed separately or is not applicable.
     -  ``false``
   * - ``signalfx_dotnet_auto_instrumentation_system_wide``
     - Whether to configure automatic discovery for all .NET applications on the node. When set to ``true``, all attributes and environment variables are added to the ``HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment`` registry key.
     - ``false``
   * - ``signalfx_dotnet_auto_instrumentation_environment``
     - Sets the deployment environment variable that is reported to Splunk APM, for example ``production``. The value is assigned to the ``SIGNALFX_ENV`` environment variable in the Windows registry.
     - ``''``
   * - ``signalfx_dotnet_auto_instrumentation_service_name``
     - Sets the service name for the instrumented application, for example, ``my-service``. The value is assigned to the ``SIGNALFX_SERVICE_NAME`` environment variable in the Windows registry.
     - ``''``
   * - ``signalfx_dotnet_auto_instrumentation_enable_profiler``
     - Activates or deactivates AlwaysOn Profiling. The value will be assigned to the ``SIGNALFX_PROFILER_ENABLED`` environment variable in the Windows registry.
     - ``false``
   * - ``signalfx_dotnet_auto_instrumentation_enable_profiler_memory``
     - Activates or deactivates AlwaysOn Memory Profiling. The value will be assigned to the ``SIGNALFX_PROFILER_MEMORY_ENABLED`` environment variable in the Windows registry.
     - ``false``
   * - ``signalfx_dotnet_auto_instrumentation_additional_options``
     - Hash of additional options to be added to the Windows registry in addition to the options above. To learn more, see :ref:`advanced-dotnet-configuration`.
     - ``{}``

Additional environment variables
======================================================

Use ``collector_additional_env_vars`` to include any additional environment variables from the Collector configuration file for the Collector's service. ``{}`` by default. 

For example, if the Collector's configuration file includes references to ``${MY_CUSTOM_VAR1}`` and ``${MY_CUSTOM_VAR2}``, specify the following to allow the Collector service to expand these variables:

.. code-block:: yaml

  collector_additional_env_vars: {'MY_CUSTOM_VAR1' => 'value1', 'MY_CUSTOM_VAR2' => 'value2'}

On Linux, the variables/values will be added to the ``/etc/otel/collector/splunk-otel-collector.conf`` systemd environment file. 

On Windows, the variables/values will be added to the Environment value under the ``HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\splunk-otel-collector`` registry key.