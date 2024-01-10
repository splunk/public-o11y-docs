.. _correlate-traces-with-logs-ruby:

******************************************************************
Connect Ruby trace data with logs for Splunk Observability Cloud
******************************************************************

.. meta:: 
   :description: You can configure the Ruby standard logger to include tracing attributes provided automatically by Splunk OTel Ruby agent. Use the trace metadata to correlate traces with log events and explore logs in Splunk Observability Cloud.

You can configure the Ruby standard logger to include tracing attributes provided automatically by the Splunk OTel Ruby agent. Use the trace metadata to correlate traces with log events and explore logs in Splunk.

.. _ruby-include-trace-data:

Include trace metadata in log statements
===================================================

The Splunk OTel Ruby agent provides the following attributes for the logging module in the standard library:

- Trace information: ``TraceId`` and ``SpanId``
- Resource attributes: ``ServiceName``

To add trace metadata to logs, use the ``Splunk::Otel::Logging.format_correlation`` function of the Ruby standard logger to set the formatter, as in the following example:

.. code-block:: ruby

   logger.formatter = proc do |severity, datetime, progname, msg|  
      "#{Splunk::Otel::Logging.format_correlation} #{msg}\n"
   end

This adds ``service.name=<ServiceName> trace_id=<TraceId> span_id=<SpanId>`` to each log line. For example:

.. code-block:: text

   service.name=basic-service trace_id=789b159aaee2b389a8771b2588278bcf span_id=6d26eba14a81f3fa
