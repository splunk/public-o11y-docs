.. _otel-windows-config:

*********************************************************************************
Advanced configuration for Windows
*********************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Windows.

The following sections describe available settings for configuring the Splunk Distribution of OpenTelemetry Collector for Windows.

Change the default configuration file
==========================================

The Collector comes with a default configuration in the \\ProgramData\\Splunk\\OpenTelemetry Collector\\agent_config.yaml file. This configuration can be modified as needed. Possible configuration options can be found in the receivers, processors, exporters, and extensions folders of the following GitHub repositories:

* :new-page:`OpenTelemetry Collector <https://github.com/open-telemetry/opentelemetry-collector>`
* :new-page:`OpenTelemetry Collector Contrib <https://github.com/open-telemetry/opentelemetry-collector-contrib>`

Before starting the ``splunk-otel-collector`` service, change the variables in the default configuration file to the appropriate values for your environment. The following table provides a description of each variable.

.. list-table::
   :widths: 50 50
   :header-rows: 1

   * - Variable
     - Description
   * - ``${SPLUNK_ACCESS_TOKEN}``
     - The Splunk access token to authenticate requests
   * - ``${SPLUNK_API_URL}``
     - The Splunk API URL. For example, ``https://api.us0.signalfx.com``.
   * - ``${SPLUNK_HEC_TOKEN}``
     - The Splunk HEC authentication token
   * - ``${SPLUNK_HEC_URL}``
     - The Splunk HEC endpoint URL. For example, ``https://ingest.us0.signalfx.com/v1/log``.
   * - ``${SPLUNK_INGEST_URL}``
     - The Splunk ingest URL. For example, ``https://ingest.us0.signalfx.com``.
   * - ``${SPLUNK_TRACE_URL}``
     - The Splunk trace endpoint URL. For example, ``https://ingest.us0.signalfx.com/v2/trace``.
   * - ``${SPLUNK_BUNDLE_DIR}``
     - The location of your Smart Agent bundle for monitor functionality. For example, ``C:\Program Files\Splunk\OpenTelemetry Collector\agent-bundle``.

|br|

Do the following after updating the variables in the default configuration file:

#. Start the service by rebooting the system or by running the following command in a PowerShell terminal::

    PS> Start-Service splunk-otel-collector
#. To modify the default path to the configuration file for the service, run ``regdit`` and modify the ``SPLUNK_CONFIG`` value in the ``HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Environment`` registry key, or run the following PowerShell command (replace PATH with the full path to the new configuration file)::

    Set-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" -name "SPLUNK_CONFIG" -value "PATH"
#. After modifying the configuration file or registry key, apply the changes by restarting the system or by running the following PowerShell commands::

    Stop-Service splunk-otel-collector
    Start-Service splunk-otel-collector
