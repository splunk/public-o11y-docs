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

The Splunk Distribution of OpenTelemetry Python provides a Python agent that automatically adds APM instrumentation to your Python application. The instrumentation captures distributed traces and metrics and sends them to Splunk Observability Cloud.

To instrument your Python application, follow these steps:

#. Check compatibility and requirements. See :ref:`python-otel-requirements`.
#. Instrument your Python application. See :ref:`instrument-python-applications-1x`.
#. Configure your instrumentation. See :ref:`configure-python-instrumentation-1x`.

For more information, see :ref:`splunk-python-otel-dist`.

.. note:: The SignalFx Python Agent is deprecated and will reach End of Support on December 17th, 2022. See :ref:`migrate-signalfx-python-agent-to-otel` to migrate to the Splunk Distribution of OpenTelemetry Python.
