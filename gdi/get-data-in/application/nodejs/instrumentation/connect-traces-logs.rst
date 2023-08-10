.. _correlate-traces-with-logs-nodejs:

*******************************************************************
Connect Node.js trace data with logs for Splunk Observability Cloud
*******************************************************************

.. meta:: 
   :description: You can configure Node logging libraries to include tracing attributes provided automatically by the Splunk Distribution of OpenTelemetry JS. Use the trace metadata to correlate traces with log events and explore Node application logs in Splunk Observability Cloud.

You can configure Node logging libraries to include tracing attributes provided automatically by the Splunk Distribution of OpenTelemetry JS. Use the trace metadata to correlate traces with log events and explore Node application logs in Splunk Observability Cloud.

.. _nodejs-traces-logs-requirements:

Supported logging libraries
=====================================================

The Splunk Distribution of OpenTelemetry JS automatically supports the following logging libraries:

- Bunyan
- Pino
- Winston

.. _nodejs-traces-logs-enable:

Activate logs injection
=====================================================

Log injection is already activated for the supported libraries. To inject trace data into formatted logs, see the documentation for each library.

.. _nodejs-include-trace-data:

Include trace metadata in log statements
===================================================

The Splunk Distribution of OpenTelemetry JS provides the following attributes for logging libraries:

- Trace information: ``trace_id``, ``span_id``, and ``trace_flags``
- Resource attributes: ``service.name``, ``service.version``, and ``deployment.environment`` as ``service.environment``

The format of each log message depends on the library. The following is a sample log message formatted using Pino:

.. code-block::

   {"level":30,"time":1979374615686,"pid":728570,"hostname":"my_host","trace_id":"f8e261432221096329baf5e62090d856","span_id":"3235afe76b55fe51","trace_flags":"01","url":"/lkasd","msg":"request handler"}
