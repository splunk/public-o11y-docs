.. _correlate-traces-with-logs-python:

******************************************************************
Connect Python trace data with logs for Splunk Observability Cloud
******************************************************************

.. meta:: 
   :description: You can configure the logging module of the Python standard library to include tracing attributes provided automatically by Splunk OTel Python agent. Use the trace metadata to correlate traces with log events and explore logs in Splunk Observability Cloud.

You can configure the logging module of Python standard library to include tracing attributes provided automatically by the Splunk OTel Python agent. Use the trace metadata to correlate traces with log events and explore logs in Splunk.

To include trace metadata in application logs, follow these steps:

- :ref:`python-include-trace-data`
- (Optional) :ref:`disable-trace-log-python`

.. _python-include-trace-data:

Include trace metadata in log statements
===================================================

The Splunk OTel Python agent provides the following attributes for the logging module in the standard library:

- Trace information: ``otelTraceID`` and ``otelSpanID``
- Resource attributes: ``otelServiceName``

The integration uses the following logging format by default:

.. code-block::

   %(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] [trace_id=%(otelTraceID)s span_id=%(otelSpanID)s resource.service.name=%(otelServiceName)s] - %(message)s

Customize format and level of log statements
---------------------------------------------------

You can change the format and level of log statements by setting the following environment variables:

- ``OTEL_PYTHON_LOG_FORMAT`` 
- ``OTEL_PYTHON_LOG_LEVEL``: Options are ``info``, ``error``, ``debug``, and ``warning``

Alternatively, you can pass new values to the ``LoggingInstrumentor`` as arguments:

- ``LoggingInstrumentor(logging_format='%(msg)s [span_id=%(span_id)s]')``
- ``LoggingInstrumentor(log_level=logging.DEBUG)``

.. _disable-trace-log-python: 

Deactivate log correlation
=================================================

To deactivate the injection of trace metadata, set the ``OTEL_PYTHON_LOG_CORRELATION`` environment variable to ``false``.
