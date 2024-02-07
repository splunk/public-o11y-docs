.. _otel-windows-config:

*********************************************************************************
Advanced configuration for Windows
*********************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Windows.

The Collector comes with a default configuration. To learn more, see :ref:`windows-config-ootb`.

Configuration variables
==========================================

.. include:: /_includes/collector-env-vars.rst

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





