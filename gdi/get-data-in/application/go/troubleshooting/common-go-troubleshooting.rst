.. _common-go-troubleshooting:

******************************************************************
Troubleshoot Go instrumentation for Splunk Observability Cloud
******************************************************************

.. meta::
   :description: If your instrumented Go application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a Go application using the Splunk Distribution of OpenTelemetry Go and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _basic-go-troubleshooting:

Steps for troubleshooting Go OpenTelemetry issues
=======================================================

The following steps can help you troubleshoot Go instrumentation issues:

#. :ref:`enable-go-debug-logging`.
#. :ref:`check-go-missing-spans`.
#. :ref:`go-error-dialing-tcp`.

.. _enable-go-debug-logging:

Activate debug logging
==========================================================

Debug logging increases the verbosity of the Go instrumentation. This can help you troubleshoot issues. To activate debug logging, set the ``OTEL_LOG_LEVEL`` environment variable to ``debug``.

.. code-block:: shell

   export OTEL_LOG_LEVEL="debug"

Make sure to unset the environment variable after the issue is resolved, as its output
might overload systems if left on indefinitely.

.. _check-go-missing-spans:

Check for missing spans
=========================================================

Go instrumentation might drop spans due to several reasons. Follow these steps to make sure that the instrumentation isn't dropping valid spans.

.. _go-all-spans-missing:

All spans from a service are missing
-----------------------------------------

If you don't see spans in Splunk Observability Cloud for your service, do the following:

#. Wait a few minutes and check again. There might be delays in the telemetry pipeline.

#. Check whether the service names appear in Splunk Observability Cloud with the ``unknown_service`` prefix. For example, ``unknown_service:go``. If that's the case, set the ``OTEL_SERVICE_NAME`` environment variable to the name of your service and restart your application.

#. Check your debug logs for messages like the following:

   .. code-block:: text
   
      exporting spans {"count": 154, "total_dropped": 0}

   The value of ``count`` in the log message is the number of spans exported for a given batch:
      
      - If ``count`` is higher than ``0``, the instrumentation is exporting spans. In that case, check the Collector configuration. See :ref:`otel-troubleshooting`.
         
      - If ``count`` is equal to ``0``, the instrumentation is not exporting spans. Make sure that all the spans end by calling the ``span.End()`` method.

.. _go-missing-some-spans-from-service:

Missing some spans from a service
-----------------------------------------

After activating debug logging, check the logs for messages like the following:

.. code-block:: text

   exporting spans {"count": 364, "total_dropped": 1320}

The ``total_dropped`` value is the cumulative number of spans dropped by the instrumentation. If this value is higher than zero, the batch span processor is dropping new spans when the queue is full. 

The batch span processor might drop spans in the following cases:

   - If the value of ``count`` in the log messages is consistently equal to the maximum batch size, the instrumentation might be creating spans faster than they can be exported. If your system has enough resources, increase the batch size and queue size. For example:

      .. code-block:: bash

         export OTEL_BSP_MAX_EXPORT_BATCH_SIZE=1024
         export OTEL_BSP_MAX_QUEUE_SIZE=20480
         # Don't increase the queue size if the system has limited memory

      If the network has limited bandwidth available, reduce your export batch size. For
      example:

      .. code-block:: bash

         export OTEL_BSP_MAX_EXPORT_BATCH_SIZE=128

      This might increase the export frequency and drain the queue faster.

   - If the value of ``count`` is not consistently equal to the maximum batch size, make sure you have a stable connection to the target and that you have adequate bandwidth. You can also reduce export timeouts, decrease the export size and frequency, and increase the queue size. For example:

      .. code-block:: bash

         # 5s export timeout.
         export OTEL_BSP_EXPORT_TIMEOUT=5000
         # 30s maximum time between exports.
         export OTEL_BSP_SCHEDULE_DELAY=30000
         export OTEL_BSP_MAX_QUEUE_SIZE=5120
         export OTEL_BSP_MAX_EXPORT_BATCH_SIZE=128

      Make sure to allocate enough memory resources on your system to accommodate the increase in queue size. Changes in the export configuration might result in the instrumentation dropping whole export batches that take too long.

.. _go-error-dialing-tcp:

Make sure the endpoint is correct
=================================================================

If you get the following logged error message, the exporter might not be able to connect with the endpoint:

.. code-block:: text

   2022/03/02 20:29:29 context deadline exceeded
   2022/03/02 20:29:29 max retry time elapsed: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing dial tcp: missing address"

To solve this issue, make sure the following conditions are true:

#. The target endpoint is up and receiving connections.

#. The target endpoint is reachable from the connecting service.

#. The target endpoint is correct when providing an alternative value.

.. include:: /_includes/troubleshooting-steps.rst