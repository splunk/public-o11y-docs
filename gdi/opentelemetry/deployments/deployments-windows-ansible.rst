.. _deployment-windows-ansible:

********************************************************
Deploy the Collector with Ansible for Windows
********************************************************

.. meta::
      :description: Describes how to install the Splunk Observability Cloud OpenTelemetry Collector Ansible role on Windows.

Before installing the Ansible collection, check :ref:`otel-intro` to verify the required resources:

* Find your Splunk access token 
* Find your Splunk realm
* Check your exposed ports to make sure your environment doesn't have conflicts. You can change ports in the package's configuration.

Supported versions
==========================================

Currently, the following Windows versions are supported:

* Windows Server 2016 64-bit
* Windows Server 2019 64-bit
* Windows Server 2022 64-bit

Requirements
==========================================

Ansible requires PowerShell 3.0 or higher and .NET 4.0 or higher to be installed on the Windows host. 

You must create and activate a WinRM listener. 

You can find information on setting up the Windows host on the :new-page:`Ansible Documentation site <https://docs.ansible.com/>`.

Install and use the Collector with Ansible 
============================================================

.. caution:: On Windows, the Collector is installed as a Windows service and its environment variables are set at the service scope, so they're only available to the Collector service and not to the entire machine.

Run the following command to install the Ansible collection from Ansible Galaxy:

.. code-block:: PowerShell

  ansible-galaxy collection install signalfx.splunk_otel_collector

To use the Splunk OpenTelemetry Collector role, include the ``signalfx.splunk_otel_collector.collector role`` invocation in your playbook. Note that this role requires root access. For more information, see :new-page:`Splunk OpenTelemetry Collector Ansible Role <https://github.com/signalfx/splunk-otel-collector/tree/main/deployments/ansible/roles/collector>`.

The following example shows how to use the role in a playbook with minimal required configuration:

.. code-block:: PowerShell

  - name: Install the Splunk Distribution of OpenTelemetry Collector
    hosts: all
    become: yes
    # For Windows "become: yes" will raise error.
    # "The Powershell family is incompatible with the sudo become plugin". Remove "become: yes" tag to run on Windows
    tasks:
      - name: "Include splunk_otel_collector"
        include_role:
          name: "signalfx.splunk_otel_collector.collector"
        vars:
          splunk_access_token: YOUR_ACCESS_TOKEN
          splunk_hec_token: YOUR_HEC_TOKEN
          splunk_realm: SPLUNK_REALM

Note that ``splunk_hec_yoken`` is optional.

Configuration variables
==========================================

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
     - The configuration file, created in YAML. This variable can be set to ``%ProgramData%\Splunk\OpenTelemetry Collector\gateway_config.yaml`` to install the package in data forwarding (gateway) mode. The default location is ``%ProgramData%\Splunk\OpenTelemetry Collector\agent_config.yaml``.
   * - ``splunk_config_override``
     - The custom configuration that is merged into the default configuration.
   * - ``splunk_config_override_list_merge``
     - The variable used to configure the ``list_merge`` option for merging lists in ``splunk_config_override`` with lists in the default configuration. Allowed options are ``replace``, ``keep``, ``append``, ``prepend``, ``append_rp``, or ``prepend_rp``. The default value is ``replace``. You can find information about this variable on the :new-page:`Ansible Documentation site <https://docs.ansible.com/>`.
   * - ``splunk_otel_collector_config_source``
     - This is the source path to a configuration file on your control host that is uploaded and set in place of the value set in ``splunk_otel_collector_config`` on remote hosts. This variable can be used to submit a custom configuration, for example, ``./custom_collector_config.yaml``. The default value is ``""``, which means that nothing is copied and the configuration file set with ``splunk_otel_collector_config`` is used.
   * - ``splunk_bundle_dir``
     - The path to the bundle directory. The default path is provided by the package. If the specified path is changed from the default value, the path should be an existing directory on the node. This variable is set with this value for the service. The default location is ``%ProgramFiles%\Splunk\OpenTelemetry Collector\agent-bundle``.
   * - ``splunk_collectd_dir``
     - The path to the collectd configuration directory for the bundle. The default path is provided by the package. If the specified path is changed from the default value, the path should be an existing directory on the node. This variable is set with this value for the service. The default location is ``%ProgramFiles%\Splunk\OpenTelemetry Collector\agent-bundle\run\collectd``.
   * - ``splunk_memory_total_mib``
     - The amount of allocated memory in MiB. The default value is ``512``, or 500 x 2^20 bytes, of memory .
   * - ``splunk_ballast_size_mib``
     - ``splunk_ballast_size_mib`` is deprecated starting on Collector version 0.97.0. If you're using it, see :ref:`how to update your configuration <collector-upgrade-memory-ballast>`.
   * - ``install_fluentd``
     - The option to install or manage Fluentd and dependencies for log collection. The default value is ``false``.
   * - ``td_agent_version``
     - The version of td-agent (Fluentd package) that is installed.
   * - ``splunk_fluentd_config``
     - The path to the Fluentd configuration file on the remote host. The default is ``%SYSTEMDRIVE%\opt\td-agent\etc\td-agent\td-agent.conf``.
   * - ``splunk_fluentd_config_source``
     - The source path to a Fluentd configuration file on your control host that is uploaded and set in place of the value set in ``splunk_fluentd_config`` on remote hosts. Use this variable to submit a custom Fluentd configuration, for example, ``./custom_fluentd_config.conf``. The default value is ``""``, which means that nothing is copied and the configuration file set with ``splunk_otel_collector_config`` is used.
