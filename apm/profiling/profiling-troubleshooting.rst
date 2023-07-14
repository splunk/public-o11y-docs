.. _profiling-troubleshooting:

*****************************************************************
Troubleshoot AlwaysOn Profiling
*****************************************************************

.. meta:: 
   :description: If you have instrumented an application but are not seeing profiling data in Splunk APM, use the following guidelines to troubleshoot AlwaysOn Profiling.

If you have instrumented an application but are not seeing profiling data in Splunk APM, use the following guidelines to troubleshoot AlwaysOn Profiling:

- :ref:`profiler-no-data-issue`
- :ref:`profiling-ui-not-visible`
- :ref:`profiler-language-specific-troubleshooting`

.. note:: AlwaysOn Profiling requires the Splunk Distribution of OpenTelemetry Collector version 0.44 or higher.

.. _profiler-no-data-issue:

No profiling data in Splunk Observability Cloud
==================================================

If profiling data does not appear in Observability Cloud, do the following:

Check that you've instrumented your application
----------------------------------------------------

You can extract AlwaysOn Profiling data only if you've instrumented your application or service for Splunk APM. If the APM instrumentation is not loading or isn't working, the profiler cannot work.

To solve this, check that you've instrumented your application and that the application is sending trace data to APM. See :ref:`profiling-setup-step-instrument`. 

.. _profiling-pipeline-setup:

Check the OpenTelemetry Collector configuration
-------------------------------------------------

AlwaysOn Profiling requires the Splunk HTTP Event Collector (HEC) exporter to send profiling data to Splunk Observability Cloud. If the Splunk HEC exporter isn't configured, the Collector drops profiling data.

To solve this issue, edit the configuration file of the Collector and make sure that a profiling pipeline exists with an OTLP gRPC receiver and a Splunk HEC exporter. See :ref:`splunk-hec-exporter` for more information.

The following example shows you how to configure a pipeline in the ``agent-config.yaml`` file. Set the ``SPLUNK_ACCESS_TOKEN`` environment variable to a valid access token. See :ref:`admin-org-tokens`.

.. code-block:: yaml

   receivers:
     otlp:
       protocols:
         grpc:

   exporters:
     # Profiling
     splunk_hec/profiling:
       token: "${SPLUNK_ACCESS_TOKEN}"
       endpoint: "${SPLUNK_INGEST_URL}/v1/log"
       log_data_enabled: false

   processors:
     batch:
     memory_limiter:
       check_interval: 2s
       limit_mib: ${SPLUNK_MEMORY_LIMIT_MIB}

   service:
     pipelines:
       logs/profiling:
         receivers: [otlp]
         processors: [memory_limiter, batch]
         exporters: [splunk_hec, splunk_hec/profiling]

The exporter is configured automatically for the Splunk OTel Collector version 0.44.0 and higher. If you're using a version of the Collector lower than 0.44.0, you might have to edit the configuration manually.

Check that you've activated AlwaysOn Profiling
-------------------------------------------------

Depending on the programming language, you can activate AlwaysOn Profiling by setting a system property, a function argument, or an environment variable. System properties and function arguments always take precedence. If the profiler is not activated, Observability Cloud can't receive profiling data.

To solve this issue, check that you've activated the profiler. See :ref:`profiling-setup-enable-profiler`.

Check the Helm chart configuration
------------------------------------------------

If you've deployed the Collector in a Kubernetes environment, make sure that the ``splunkObservability.profilingEnabled=true`` is present. See :ref:`profiling-setup-helm` for more information.

.. _no-call-stacks:

No call stacks available for a span
===========================================================

Span might lack call stacks if the duration of the span is shorter than the snapshot interval for capturing call stacks. For example, the default snapshot interval for Java instrumentation is 10 seconds, so spans shorter than 10 seconds might not contain call stacks. To set a shorter interval, set the ``SPLUNK_PROFILER_CALL_STACK_INTERVAL`` environment variable to a value lower than ``10000`` milliseconds.

Another cause for call stacks not appearing is when HTTP requests follow an async/await pattern. When the processing thread was executing in the scope of a span from another trace when the snapshot was recorded.

.. _profiling-ui-not-visible:

AlwaysOn Profiling is not accessible in Observability Cloud
============================================================

If you're sending profiling data to Observability Cloud but can't see AlwaysOn Profiling in Splunk APM, your organization might be lacking the profiler entitlement.

AlwaysOn Profiling is activated for all host-based subscriptions. For TAPM-based subscriptions, AlwaysOn Profiling might be deactivated depending on the contract.

To solve this issue, reach out to Splunk Support to request they activate the AlwaysOn Profiling feature.

.. _profiler-language-specific-troubleshooting:

Instrumentation-specific troubleshooting
============================================

Some profiler issues might be specific to the APM instrumentation. See the following instructions to troubleshoot instrumentation-specific issues:

- :ref:`java-profiler-issues`
- :ref:`nodejs-profiler-issues`
- :ref:`dotnet-profiler-issues`

Deactivate profiling log data for specific hosts
==============================================================

If you don't need AlwaysOn Profiling data for a specific host or container, see :ref:`unwanted_profiling_logs`.