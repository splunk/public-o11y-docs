.. _deployments-chef:

****************************
Chef 
****************************

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
* CentOS, Red Hat, Oracle: 7, 8
* Debian: 9, 10, 11
* SUSE: 12, 15 (Note: Only for Collector versions 0.34.0 or higher. Log collection with Fluentd not currently supported.)
* Ubuntu: 18.04, 20.04, 22.04

Windows
---------------------

The following Windows versions. All versions require using PowerShell 3.0 or newer.

* Windows Server 2019 64-bit
* Windows Server 2022 64-bit

Getting started
========================

Download the Chef cookbook from the :new-page:`Chef Supermarket <https://supermarket.chef.io/cookbooks/splunk_otel_collector>`, which is the site for community cookbooks. 

To install the Collector and Fluentd, include the ``splunk_otel_collector::default`` recipe in the ``run_list``, and set the attributes on the node's ``run_state``. The following is an example configuration that shows how to configure the required ``splunk_access_token`` attribute and some optional attributes:

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
     - ``true``
   * - ``fluentd_version``
     -  Version of the td-agent (Fluentd) package to install 
     -  ``3.7.1`` for Debian stretch and ``4.3.1`` for all other Linux distros 
   * - ``fluentd_config_source``
     - Source path to the Fluentd configuration file. This file is copied to the ``$fluentd_config_dest`` path on the node. See the :new-page:`source attribute <https://puppet.com/docs/puppet/latest/types/file.html#file-attribute-source>` of the file resource for the supported value types. The default source file is provided by the Collector package. Only applicable if ``$with_fluentd`` is set to ``true``.
     - ``/etc/otel/collector/fluentd/fluent.conf``
   * - ``fluentd_config_dest``
     - Destination path to the Fluentd configuration file on the node. Only applicable if ``$with_fluentd`` is set to ``true``.
     - ``/etc/otel/collector/fluentd/fluent.conf``

.. _chef-zero-config-java:

Configure auto instrumentation for Java (Linux only)
-------------------------------------------------------------

You can automatically instrument your Java applications along with the Collector installation. Auto instrumentation removes the need to install and configure the Java agent separately. See :ref:`configure-auto-instrumentation` for more information. 

The following table shows the variables that can be configured for this Chef cookbook:

.. list-table::
   :widths: 20 30 50
   :header-rows: 1

   * - Name
     - Description
     - Default value
   * - ``with_auto_instrumentation``
     - Whether to install or manage :ref:`auto-instrumentation-java`. When set to ``true``, the ``splunk-otel-auto-instrumentation`` deb/rpm package is downloaded and installed from the Collector repository. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``false``
   * - ``auto_instrumentation_version``
     - Version of the ``splunk-otel-auto-instrumentation`` package to install, for example, ``0.50.0``. The minimum supported version is ``0.48.0``. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``latest``
   * - ``auto_instrumentation_ld_so_preload``
     - By default, the ``/etc/ld.so.preload`` file on the node is configured for the ``/usr/lib/splunk-instrumentation/libsplunk.so`` shared object library provided by the ``splunk-otel-auto-instrumentation`` package and is required for auto instrumentation. Configure this variable to include additional library paths, for example, ``/path/to/my.library.so``. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``''``
   * - ``auto_instrumentation_java_agent_path``
     - Path to the Splunk OpenTelemetry Java agent. The default path is provided by the ``splunk-otel-auto-instrumentation`` package. If the path is changed from the default value, the path should be an existing file on the node. The specified path is added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect. 
     - ``/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar``
   * - ``auto_instrumentation_resource_attributes``
     - Configure the OpenTelemetry instrumentation resource attributes, for example, ``deployment.environment=prod``. The specified resource attributes are added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``''``
   * - ``auto_instrumentation_service_name``
     - Explicitly sets the service name for the instrumented Java application, for example, ``my.service``. By default, the service name is automatically derived from the arguments of the Java executable on the node. However, if this variable is set to a non-empty value, the value overrides the derived service name and is added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``''``
   * - ``auto_instrumentation_generate_service_name``
     - Set to ``false`` to prevent the preloader from setting the ``OTEL_SERVICE_NAME`` environment variable.
     - ``true``
   * - ``auto_instrumentation_disable_telemetry``
     - Prevents the preloader from sending the ``splunk.linux-autoinstr.executions`` metric to the Collector.
     - ``false``
   * - ``auto_instrumentation_enable_profiler``
     - Activates or deactibvates AlwaysOn CPU Profiling.
     - ``false``
   * - ``auto_instrumentation_enable_profiler_memory``
     - Activates or deactivates AlwaysOn Memory Profiling.
     - ``false``
   * - ``auto_instrumentation_enable_metrics``
     - Activates or deactivates JVM metrics. 
     - ``false``

Attributes for Windows
===========================
For Windows, the cookbook accepts the attributes described in the following table:

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
     - ``%ProgramFiles%\Splunk\OpenTelemetry Collector\agent-bundle\run\collectd``
   * - ``splunk_memory_total_mib``
     - Total memory in MIB to allocate to the Collector; automatically calculates the ballast size. The ``SPLUNK_MEMORY_TOTAL_MIB`` environment variable is set to this value for the Collector service. 
     - ``512``
   * - ``splunk_ballast_size_mib``
     - Sets the ballast size for the Collector explicitly instead of the value calculated from the ``$splunk_memory_total_mib`` parameter. This should be set to 1/3 to 1/2 of configured memory. The ``SPLUNK_BALLAST_SIZE_MIB`` environment variable is set to this value for the Collector service. 
     - ``"``
   * - ``collector_config_source``
     - The source path to the Collector configuration YAML file. This file is copied to the ``$collector_config_dest`` path on the node. See the :new-page:`source attribute <https://puppet.com/docs/puppet/latest/types/file.html#file-attribute-source>` of the file resource for the supported value types. The default source file is provided by the Collector package.
     - ``%ProgramFiles%\Splunk\OpenTelemetry Collector\agent_config.yaml``
   * - ``collector_config_dest``
     - Destination path of the Collector configuration file on the node. The ``SPLUNK_CONFIG`` environment variable is set with this value for the Collector service.
     - ``%PROGRAMDATA%\Splunk\OpenTelemetry Collector\agent_config.yaml``
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
     - ``true``
   * - ``fluentd_version``
     -  Version of the td-agent (Fluentd) package to install 
     -  ``4.3.1`` 
   * - ``fluentd_config_source``
     - Source path to the Fluentd configuration file. This file is copied to the ``$fluentd_config_dest`` path on the node. See the :new-page:`source attribute <https://puppet.com/docs/puppet/latest/types/file.html#file-attribute-source>` of the file resource for the supported value types. The default source file is provided by the Collector package. Only applicable if ``$with_fluentd`` is set to ``true``.
     - ``%SYSTEMDRIVE%\opt\td-agent\etc\td-agent\td-agent.conf``
   * - ``with_auto_instrumentation``
     - Whether to install or manage :ref:`auto-instrumentation-java`. When set to ``true``, the ``splunk-otel-auto-instrumentation`` deb/rpm package is downloaded and installed from the Collector repository. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``false``
   * - ``auto_instrumentation_version``
     - Version of the ``splunk-otel-auto-instrumentation`` package to install, for example, ``0.50.0``. The minimum supported version is ``0.48.0``. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``latest``
   * - ``auto_instrumentation_ld_so_preload``
     - By default, the ``/etc/ld.so.preload`` file on the node is configured for the ``/usr/lib/splunk-instrumentation/libsplunk.so`` shared object library provided by the ``splunk-otel-auto-instrumentation`` package and is required for auto instrumentation. Configure this variable to include additional library paths, for example, ``/path/to/my.library.so``. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``''``
   * - ``auto_instrumentation_java_agent_path``
     - Path to the Splunk OpenTelemetry Java agent. The default path is provided by the ``splunk-otel-auto-instrumentation`` package. If the path is changed from the default value, the path should be an existing file on the node. The specified path is added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect. 
     - ``/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar``
   * - ``auto_instrumentation_resource_attributes``
     - Configure the OpenTelemetry instrumentation resource attributes, for example, ``deployment.environment=prod``. The specified resource attributes are added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``''``
   * - ``auto_instrumentation_service_name``
     - Explicitly sets the service name for the instrumented Java application, for example, ``my.service``. By default, the service name is automatically derived from the arguments of the Java executable on the node. However, if this variable is set to a non-empty value, the value overrides the derived service name and is added to the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file on the node. The Java application on the node needs to be started or restarted separately after installation for auto instrumentation to take effect.
     - ``''``
