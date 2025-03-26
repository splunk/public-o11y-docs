.. _get-started-python-1x:

**************************************************************
Instrument Python applications for Splunk Observability Cloud
**************************************************************


.. meta::
   :description: Instrument Python applications automatically to export spans and metrics to Splunk Observability Cloud.

.. toctree::
   :hidden:

   Instrument your Python application <instrument-python-application-1x>
   Configure the Python agent <advanced-python-otel-configuration-1x>
   Metrics and attributes <python-otel-metrics-1x>

.. note:: 
   
   The Splunk Distribution of OpenTelemetry Python version 1.X is deprecated as of February 28, 2025 and will reach end of support on February 28, 2026. Until then, only critical security fixes and bug fixes will be provided.

   New customers should use the Splunk OpenTelemetry Python agent version 2.0. Existing customers should consider migrating to Splunk OpenTelemetry Python 2.0 or higher. See :ref:`python-migration-guide`.

The Splunk Distribution of OpenTelemetry Python provides a Python agent that automatically adds APM instrumentation to your Python application. The instrumentation captures distributed traces and metrics and sends them to Splunk Observability Cloud.

To instrument your Python application, follow these steps:

#. Check compatibility and requirements. See :ref:`python-otel-requirements`.
#. Instrument your Python application. See :ref:`instrument-python-applications-1x`.
#. Configure your instrumentation. See :ref:`configure-python-instrumentation-1x`.

For more information, see :ref:`splunk-python-otel-dist`.

.. note:: The SignalFx Python Agent is deprecated and will reach End of Support on December 17th, 2022. See :ref:`migrate-signalfx-python-agent-to-otel` to migrate to the Splunk Distribution of OpenTelemetry Python.
