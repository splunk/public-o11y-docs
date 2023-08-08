.. _python-manual-instrumentation:

**********************************************************************
Manually instrument Python applications for Splunk Observability Cloud
**********************************************************************

.. meta:: 
   :description: Manually instrument your Python application when you need to add custom attributes to spans or want to manually generate spans. Keep reading to learn how to manually instrument your Python application for Splunk Observability Cloud. 

Instrumenting applications automatically using the agent of the Splunk Distribution of OpenTelemetry Python covers most needs. Manually instrumenting your application is only necessary when, for example, you need to add custom attributes to spans or need to manually generate spans.

For instructions on how to manually instrument Python applications, see the Manual instrumentation docs in the OpenTelemetry Python Instrumentation repository at https://opentelemetry.io/docs/instrumentation/python/manual/.

Frameworks that require manual instrumentation
==================================================

Some Python frameworks only support manual instrumentation. For specific instructions, see:

- :ref:`uwsgi-instrumentation`

.. note:: Manual OTel instrumentation is fully compatible with Splunk automatic Python instrumentation and is fully supported by Splunk.