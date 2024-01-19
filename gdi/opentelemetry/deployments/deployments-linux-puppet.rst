.. _deployment-linux-puppet:

********************************************************
Deploy the Collector with Puppet for Linux 
********************************************************

.. meta::
      :description: Describes how to install the Splunk Observability Cloud OpenTelemetry Collector Puppet module on Linux. 

Use this module to install and configure the Collector on Linux. Download and install the module from :new-page:`Puppet Forge <https://forge.puppet.com/modules/signalfx/splunk_otel_collector>`. After downloading the module, you can add customizations using the ``class`` parameter.

Currently, we support the following Linux distributions and versions:

- Amazon Linux: 2, 2023. Log collection with Fluentd isn't supported for Amazon Linux 2023.
- CentOS / Red Hat / Oracle: 7, 8, 9
- Debian: 9, 10, 11
- SUSE: 12, 15 (Note: Only applicable for Collector versions v0.34.0 or higher. Log collection with Fluentd not currently supported.)
- Ubuntu: 16.04, 18.04, 20.04, 22.04

On Linux systems, the :new-page:`puppetlabs/stdlib module <https://forge.puppet.com/modules/puppetlabs/stdlib/readme>` is required. 

.. note::
    
    systemd is required to be installed on the host for service management.

Use the Puppet module
============================

To use this module, include the ``splunk_otel_collector`` class in your manifests with the supported parameters (see :ref:`modify-class-parameters-linux` for descriptions of the available parameters). For example, the following deployment definition is the simplest deployment definition with the default parameters (replace ``VERSION`` with the desired Collector version, ``SPLUNK_ACCESS_TOKEN`` with your Splunk access token to authenticate requests, and ``SPLUNK_REALM`` for the realm to send the data to):

.. code-block:: ruby

   class { splunk_otel_collector:
     collector_version => 'VERSION'
     splunk_access_token => 'SPLUNK_ACCESS_TOKEN',
     splunk_realm => 'SPLUNK_REALM',
   }

.. _modify-class-parameters-linux:

Modify the class parameters
=======================================

The class accepts the parameters described in the following table:

.. list-table:: 
   :widths: 25 45 30
   :header-rows: 1

   * - Name
     - Description
     - Default value
   * - ``collector_version``
     - Version of the Collector package to install, for example, ``0.25.0``. The version should correspond to :new-page:`Github Releases <https://github.com/signalfx/splunk-otel-collector/releases>` without the preceding ``v``. Note that on Linux, the latest Collector version is installed if this parameter is not specified.
     - None
   * - ``splunk_access_token``
     - The Splunk access token to authenticate requests. This attribute is required.
     - None
   * - ``splunk_realm``
     - Which realm to send the data to, for example, ``us0``. The Splunk ingest and API URLs are inferred by this value. The ``SPLUNK_REALM`` environment variable is set with this value for the collector service. This attribute is required.
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
     - Sets the ballast size for the Collector explicitly instead of the value calculated from the ``$splunk_memory_total_mib`` parameter. This should be set to 1/3 to 1/2 of configured memory. The ``SPLUNK_BALLAST_SIZE_MIB`` environment variable is set to this value for the Collector service. 
     - None
   * - ``collector_config_source``
     - The source path to the Collector configuration YAML file. This file is copied to the ``$collector_config_dest`` path on the node. See the :new-page:`source attribute <https://puppet.com/docs/puppet/latest/types/file.html#file-attribute-source>` of the file resource for the supported value types. The default source file is provided by the Collector package.
     - ``/etc/otel/collector/agent_config.yaml``
   * - ``collector_config_dest``
     - Destination path of the Collector configuration file on the node. The ``SPLUNK_CONFIG`` environment variable is set with this value for the Collector service.
     - ``/etc/otel/collector/agent_config.yaml``
   * - ``service_user and $service_group``
     - Sets the user or group ownership for the Collector service. The user or group is created if they do not exist.
     - ``splunk-otel-collector``
   * - ``with_fluentd``
     - Whether to install or manage Fluentd and dependencies for log collection. On Linux, the dependencies include ``capng_c`` for activating Linux capabilities, ``fluent-plugin-systemd`` for systemd journal log collection, and the required libraries and development tools.
     - ``false``
   * - ``fluentd_config_source``
     - Source path to the Fluentd configuration file. This file is copied to the ``$fluentd_config_dest`` path on the node. See the :new-page:`source attribute <https://puppet.com/docs/puppet/latest/types/file.html#file-attribute-source>` of the file resource for the supported value types. The default source file is provided by the Collector package. Only applicable if ``$with_fluentd`` is set to ``true``.
     - ``/etc/otel/collector/fluentd/fluent.conf``
   * - ``fluentd_config_dest``
     - Destination path to the Fluentd configuration file on the node. Only applicable if ``$with_fluentd`` is set to ``true``.
     - ``/etc/otel/collector/fluentd/fluent.conf``
   * - ``manage_repo`` 
     - In cases where the Collector and Fluentd apt/yum repositories are managed externally, set this to ``false`` to deactivate management of the repositories by this module. If set to ``false``, the externally managed repositories should provide the ``splunk-otel-collector`` and ``td-agent`` packages. Also, the apt (``/etc/apt/sources.list.d/splunk-otel-collector.list`` and ``/etc/apt/sources.list.d/splunk-td-agent.list``) and yum (``/etc/yum.repos.d/splunk-otel-collector.repo`` and ``/etc/yum.repos.d/splunk-td-agent.repo``) repository definition files are deleted if they exist in order to avoid any conflicts.
     - ``true``

.. _puppet-zero-config:

Configure auto instrumentation for Java and Node.js (Linux only)
====================================================================

You can automatically instrument your Java and Node.js applications along with the Collector installation. Auto instrumentation removes the need to install and configure the Java or Node.js agents. See :ref:`zero-config` for more information. 

The following table shows the variables that you can configure for this Puppet module:

.. list-table::
   :widths: 20 30 50
   :header-rows: 1

   * - Name
     - Description
     - Default value
   * - ``with_auto_instrumentation``
     - Whether to install or manage :ref:`auto-instrumentation-java` and :ref:`auto-instrumentation-nodejs`. When set to ``true``, the ``splunk-otel-auto-instrumentation`` deb/rpm package is downloaded and installed from the Collector repository. The applications on the node need to be restarted after installation for auto instrumentation to take effect.
     - ``false``
   * - ``auto_instrumentation_version``
     - Version of the ``splunk-otel-auto-instrumentation`` package to install, for example, ``0.50.0``. The minimum supported version is ``0.48.0`` for Java and ``0.87.0`` for Node.js. The Java and Node.js applications on the node need to be restarted after installation for auto instrumentation to take effect.
     - ``latest``
   * - ``auto-instrumentation-systemd``
     - Whether to activate and configure the auto instrumentation for ``systemd`` services only. If set to ``true``, auto instrumentation environment variables are added to ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.
     - ``false``
   * - ``auto_instrumentation_ld_so_preload``
     - By default, the ``/etc/ld.so.preload`` file on the node is configured for the ``/usr/lib/splunk-instrumentation/libsplunk.so`` shared object library provided by the ``splunk-otel-auto-instrumentation`` package and is required for auto instrumentation. Configure this variable to include additional library paths, for example, ``/path/to/my.library.so``. The applications on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - None
   * - ``auto_instrumentation_resource_attributes``
     - Configure the OpenTelemetry instrumentation resource attributes, for example, ``deployment.environment=prod``. The specified resource attributes are added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node, or ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf`` if using the ``systemd`` installation method. 
     - None
   * - ``auto_instrumentation_service_name``
     - Explicitly sets the service name for the instrumented Java and Node.js applications, for example, ``my.service``. If this variable is set to a non-empty value, the value overrides is added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node. The applications on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - None 
   * - ``auto_instrumentation_enable_profiler``
     - Activates or deactivates AlwaysOn CPU Profiling.
     - ``false``
   * - ``auto_instrumentation_enable_profiler_memory``
     - Activates or deactivates AlwaysOn Memory Profiling.
     - ``false``
   * - ``auto_instrumentation_enable_metrics``
     - Activates or deactivates exporting instrumentation metrics.
     - ``false``
   * - ``auto_instrumentation_otlp_endpoint``
     - Sets the OTLP gRPC endpoint that receives traces. Only applicable for OpenTelemetry Collector versions ``0.87.0`` and higher.
     - ``http://127.0.0.1:4317``
   * - ``with_auto_instrumentation_sdks``
     - The auto instrumentation SDKs to install and activate.
     - ``%w(java nodejs)``
   * - ``auto_instrumentation_java_agent_jar``
     - Path to the Splunk OpenTelemetry Java agent. The default path is provided by the ``splunk-otel-auto-instrumentation`` package. If the path is changed from the default value, the path should be an existing file on the node. The specified path is added to the /usr/lib/splunk-instrumentation/instrumentation.conf configuration file on the node. The applications on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar``
   * - ``auto_instrumentation_npm_path``
     - The path to the pre-installed ``npm`` command. For example, ``/my/custom/path/to/npm``.
     - ``npm``