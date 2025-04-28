.. _deployment-linux-puppet:
.. _linux-puppet:

********************************************************
Deploy the Collector for Linux with Puppet 
********************************************************

.. meta::
      :description: Describes how to install the Splunk Observability Cloud OpenTelemetry Collector Puppet module on Linux. 

Use this module to install and configure the Collector on Linux. Download and install the module from :new-page:`Puppet Forge <https://forge.puppet.com/modules/signalfx/splunk_otel_collector>`. After downloading the module, you can add customizations using the ``class`` parameter.

.. raw:: html

   <div class="include-start" id="requirements/collector-linux.rst"></div>

.. include:: /_includes/requirements/collector-linux.rst

.. raw:: html

   <div class="include-stop" id="requirements/collector-linux.rst"></div>

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

.. _puppet-zero-config:

Configure automatic discovery for back-end application(s) (Linux only)
======================================================================

You can automatically instrument your back-end applications along with the Collector installation using automatic discovery. Automatic discovery (formerly zero configuration auto instrumentation) removes the need to install and configure the OpenTelemetry SDKs separately. See :ref:`discovery_mode` for more information.

The following table shows the variables that you can configure for this Puppet module:

.. list-table::
   :widths: 20 30 50
   :header-rows: 1

   * - Name
     - Description
     - Default value
   * - ``with_auto_instrumentation``
     - Whether to install or manage automatic discovery for back-end applications. When set to ``true``, the ``splunk-otel-auto-instrumentation`` deb/rpm package is downloaded and installed from the Collector repository. The applications on the node need to be restarted after installation for automatic discovery or any configuration changes to take effect. To learn more, see :ref:`linux-backend-auto-discovery`.
     - ``false``
   * - ``with_auto_instrumentation_sdks``
     - The automatic discovery SDKs to install and activate. Note: ``dotnet`` is currently only supported for x86_64/amd64.
     - ``['java', 'nodejs', 'dotnet']``
   * - ``auto_instrumentation_version``
     - Version of the ``splunk-otel-auto-instrumentation`` package to install, for example, ``0.50.0``. The minimum supported version is ``0.48.0`` for Java, ``0.87.0`` for Node.js, and ``0.99.0`` for .NET.
     - ``latest``
   * - ``auto_instrumentation_systemd``
     - Whether to activate and configure the automatic discovery for ``systemd`` services only. If set to ``true``, automatic discovery environment variables are added to ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.
     - ``false``
   * - ``auto_instrumentation_ld_so_preload``
     - By default, the ``/etc/ld.so.preload`` file on the node is configured for the ``/usr/lib/splunk-instrumentation/libsplunk.so`` shared object library provided by the ``splunk-otel-auto-instrumentation`` package. This file preloads the automatic discovery package and is required for automatic discovery. Configure this variable to include additional library paths, for example, ``/path/to/my.library.so``.
     - None
   * - ``auto_instrumentation_resource_attributes``
     - Configure the OpenTelemetry instrumentation resource attributes, for example, ``deployment.environment=prod``. To learn more, see :ref:`main-java-agent-settings` and :ref:`main-nodejs-agent-settings`.
     - None
   * - ``auto_instrumentation_service_name``
     - Explicitly sets the service name for all instrumented applications, for example, ``my.service``. By default, the service names are automatically derived from the arguments for each of the discovered executables to be instrumented on the node. However, if this variable is set to a non-empty value, the value overrides all derived service names.
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
     - Sets the OTLP endpoint for collected metrics, traces, and logs by all activated SDKs. Only applicable if ``auto_instrumentation_version`` is ``latest`` or ``0.87.0`` and higher.
     - ``''``, which defers to the default for each activated SDK.
   * - ``auto_instrumentation_otlp_endpoint_protocol``
     - Sets the OTLP endpoint protocol for collected metrics, traces, and logs by all activated SDKs, for example ``grpc`` or ``http/protobuf``. Only applicable if ``auto_instrumentation_version`` is ``latest`` or ``0.104.0`` and higher.
     - ``''``, which defers to the default for each activated SDK.
   * - ``auto_instrumentation_metrics_exporter``
     - Comma-separated list of exporters for collected metrics by all activated SDKs, for example ``otlp,prometheus``. Set the value to ``none`` to disable collection and export of metrics. Only applicable if ``auto_instrumentation_version`` is ``latest`` or ``0.104.0`` and higher.
     - ``''``, which defers to the default for each activated SDK.
   * - ``auto_instrumentation_logs_exporter``
     - Sets the exporter for collected logs by all activated SDKs, for example ``otlp``. Set the value to ``none`` to disable collection and export of logs. Only applicable if ``auto_instrumentation_version`` is ``latest`` or ``0.108.0`` and higher.
     - ``''``, which defers to the default for each activated SDK.
   * - ``auto_instrumentation_java_agent_jar``
     - Path to the Splunk OpenTelemetry Java agent. The default path is provided by the ``splunk-otel-auto-instrumentation`` package. If the path is changed from the default value, the path should be an existing file on the node.
     - ``/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar``
   * - ``auto_instrumentation_npm_path``
     - The path to the pre-installed ``npm`` command required to install the Node.js SDK. For example, ``/my/custom/path/to/npm``.
     - ``npm``

Next steps
==================================



.. raw:: html

   <div class="include-start" id="gdi/collector-linux-next-steps.rst"></div>

.. include:: /_includes/gdi/collector-linux-next-steps.rst

.. raw:: html

   <div class="include-stop" id="gdi/collector-linux-next-steps.rst"></div>



