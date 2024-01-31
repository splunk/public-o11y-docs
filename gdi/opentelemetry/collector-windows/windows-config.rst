.. _otel-windows-config:

*********************************************************************************
Advanced configuration for Windows
*********************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Windows.

The Collector comes with a default configuration. To learn more, see :ref:`windows-config-ootb`.

Configuration variables
==========================================

The following table provides a description of each variable:

.. list-table::
  :widths: 50 50
  :header-rows: 1

  * - Variable
    - Description
  * - ``${SPLUNK_ACCESS_TOKEN}``
    - The Splunk access token to authenticate requests
  * - ``${SPLUNK_API_URL}``
    - The Splunk API URL. For example, ``https://api.us0.signalfx.com``
  * - ``${SPLUNK_BUNDLE_DIR}``
    - The location of your Smart Agent bundle for monitor functionality. For example, ``C:\Program Files\Splunk\OpenTelemetryCollector\agent-bundle``
  * - ``${SPLUNK_CONFIG}``
    - The path to the Collector config file. For example, ``C:\ProgramData\Splunk\OpenTelemetry Collector\agent_config.yaml``
  * - ``${SPLUNK_HEC_TOKEN}``
    - The Splunk HEC authentication token
  * - ``${SPLUNK_HEC_URL}``
    - The Splunk HEC endpoint URL. For example, ``https://ingest.us0.signalfx.com/v1/log``
  * - ``${SPLUNK_INGEST_URL}``
    - The Splunk ingest URL. For example, ``https://ingest.us0.signalfx.com``
  * - ``${SPLUNK_MEMORY_TOTAL_MIB}``
    - Total memory in MiB allocated to the Collector. For example, ``512``
  * - ``${SPLUNK_REALM}``
    - The Splunk realm to send the data to. For example, ``us0``
  * - ``${SPLUNK_TRACE_URL}``
    - The Splunk trace endpoint URL. For example, ``https://ingest.us0.signalfx.com/v2/trace``

Change the default configuration file
==========================================

Before starting the ``splunk-otel-collector`` service, change the variables in the default configuration file to the appropriate values for your environment. Based on the specified installation parameters, the environment variables are saved to the HKLM:\SYSTEM\CurrentControlSet\Services\splunk-otel-collector registry key and set on the ``Environment`` entry.

To modify any of the configuration values, run ``regedit`` and browse to the path.

Command line options
==========================================

To add or remove command line options for the ``splunk-otel-collector`` service, run ``regedit`` and modify the ``ImagePath`` value in the HKLM:\SYSTEM\CurrentControlSet\Services\splunk-otel-collector registry key. 

Alternatively, run the following PowerShell command, replacing ``OPTIONS`` with the desired command line options:

.. code-block:: PowerShell

  Set-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Services\splunk-otel-collector" -name "ImagePath" -value "C:\Program Files\Splunk\OpenTelemetry Collector\otelcol.exe OPTIONS"

For example, to change the default exposed metrics address of the Collector to ``0.0.0.0:9090``, run the following PowerShell command:

.. code-block:: PowerShell

  Set-ItemProperty -path "HKLM:\SYSTEM\CurrentControlSet\Services\splunk-otel-collector" -name "ImagePath" -value "C:\Program Files\Splunk\OpenTelemetry Collector\otelcol.exe --metrics-addr 0.0.0.0:9090"

Apply the changes
-------------------------------------------

After modifying the configuration file or registry key, apply the changes by restarting the system or running the following PowerShell commands:

.. code-block:: PowerShell

  Stop-Service splunk-otel-collector
  Start-Service splunk-otel-collector

Available command line options
-------------------------------------------

To see all available command line options, run the following PowerShell command:

.. code-block:: PowerShell

  & 'C:\Program Files\Splunk\OpenTelemetry Collector\otelcol.exe' --help





