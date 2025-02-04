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
* Windows Server 2025 64-bit

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



.. raw:: html

   <div class="include-start" id="gdi/collector-windows-next-steps.rst"></div>

.. include:: /_includes/gdi/collector-windows-next-steps.rst
.. raw:: html

   <div class="include-stop" id="gdi/collector-windows-next-steps.rst"></div>



