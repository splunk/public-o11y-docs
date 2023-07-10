.. _deployment-windows-ansible:

**********************
Ansible for Windows
**********************

.. meta::
      :description: Describes how to install the Splunk Observability Cloud OpenTelemetry Collector Ansible role on Windows.

Before installing the Ansible collection, do the following:

* Find your :ref:`Splunk access token <otel-using>`
* Find your :ref:`Splunk realm <otel-using>`
* Check :ref:`exposed ports <otel-using>` to make sure your environment doesn't have conflicts. Ports can be changed in the package's configuration.

Ansible requires PowerShell 3.0 or newer and at least .NET 4.0 to be installed on the Windows host. A WinRM listener should be created and activated. You can find information on setting up the Windows host on the :new-page:`Ansible Documentation site <https://docs.ansible.com/>`.

Run the following command to install the Ansible collection from Ansible Galaxy:

.. code-block:: PowerShell

   ansible-galaxy collection install signalfx.splunk_otel_collector

To use this role, include the ``signalfx.splunk_otel_collector.collector role`` invocation in your playbook. Note that this role requires root access. The following example shows how to use the role in a playbook with minimal required configuration:

.. code-block:: PowerShell

   - name: Install the Splunk Distribution of OpenTelemetry Collector
     hosts: all
     become: yes
     # Setting the "become: yes" tag generates the following error message:
     # "The Powershell family is incompatible with the sudo become plugin". 
     # Remove the "become: yes" tag.
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
     - The set memory ballast size in MiB. The default value is 1/3 of the value set in ``splunk_memory_total_mib``.
   * - ``install_fluentd``
     - The option to install or manage Fluentd and dependencies for log collection. The default value is ``true``.  
   * - ``td_agent_version``
     - The version of td-agent (Fluentd package) that is installed.
   * - ``splunk_fluentd_config``
     - The path to the Fluentd configuration file on the remote host. The default is ``%SYSTEMDRIVE%\opt\td-agent\etc\td-agent\td-agent.conf``.
   * - ``splunk_fluentd_config_source``
     - The source path to a Fluentd configuration file on your control host that is uploaded and set in place of the value set in ``splunk_fluentd_config`` on remote hosts. Use this variable to submit a custom Fluentd configuration, for example, ``./custom_fluentd_config.conf``. The default value is ``""``, which means that nothing is copied and the configuration file set with ``splunk_otel_collector_config`` is used.
