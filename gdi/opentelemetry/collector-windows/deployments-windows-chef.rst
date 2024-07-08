.. _deployments-windows-chef:

********************************************************
Deploy the Collector for Windows with Chef
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

Configure automatic discovery for SignalFx .NET 
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

Next steps
==================================

.. include:: /_includes/gdi/collector-windows-next-steps.rst