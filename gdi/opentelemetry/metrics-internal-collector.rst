.. _metrics-internal-collector:

****************************************************************
Internal metrics of the Collector
****************************************************************

.. meta::
      :description: Internal metrics for the Collector.

Find the complete list of the Collector's internal metrics and what to use them for.

.. _metrics-internal-collector-list:

List of internal metrics of the Collector
====================================================

These are the Collector's internal metrics.

.. list-table::
  :widths: 40 60
  :width: 100%
  :header-rows: 1

  * - Metric name
    - Metric description

  * - ``otelcol_exporter_enqueue_failed_log_records``
    - Number of log records failed to be added to the sending queue

  * - ``otelcol_exporter_enqueue_failed_metric_points``
    - Number of metric points failed to be added to the sending queue

  * - ``otelcol_exporter_enqueue_failed_spans``
    - Number of spans failed to be added to the sending queue

  * - ``otelcol_exporter_queue_capacity``
    - Capacity of the exporter queue

  * - ``otelcol_exporter_queue_size``
    - Current size of the retry queue, in batches

  * - ``otelcol_exporter_send_failed_log_records``
    - Number of log records failed to be sent to destination

  * - ``otelcol_exporter_send_failed_metric_points``
    - Number of metrics point failed to be sent to destination

  * - ``otelcol_exporter_sent_log_records``
    - Number of log records successfully sent to destination

  * - ``otelcol_exporter_sent_metric_points``
    - Number of metric points successfully sent to destination

  * - ``otelcol_exporter_sent_spans``
    - Number of spans successfully sent to destination

  * - ``otelcol_otelsvc_k8s_namespace_added``
    - Number of namespace add events received

  * - ``otelcol_otelsvc_k8s_namespace_updated``
    - Number of namespace update events received

  * - ``otelcol_otelsvc_k8s_pod_added``
    - Number of pod add events received

  * - ``otelcol_otelsvc_k8s_pod_deleted``
    - Number of pod delete events received

  * - ``otelcol_otelsvc_k8s_pod_updated``
    - Size of table containing pod info

  * - ``otelcol_process_cpu_seconds``
    - Total CPU user and system time, in seconds

  * - ``otelcol_process_memory_rss``
    - Total physical memory (resident set size)

  * - ``otelcol_process_runtime_heap_alloc_bytes``
    - Bytes of allocated heap objects 

  * - ``otelcol_process_runtime_total_alloc_bytes``
    - Total bytes of allocated objects 

  * - ``otelcol_process_runtime_total_sys_memory_bytes``
    - Cumulative bytes allocated for heap objects 

  * - ``otelcol_process_uptime``
    - Uptime of the process

  * - ``otelcol_processor_accepted_log_records``
    - Number of log records successfully pushed into the next component in the pipeline 

  * - ``otelcol_processor_accepted_metric_points``
    - Number of metric points successfully pushed into the next component in the pipeline

  * - ``otelcol_processor_accepted_spans``
    - Number of spans successfully pushed into the next component in the pipeline 

  * - ``otelcol_processor_batch_batch_send_size``
    - Number of units in the batch

  * - ``otelcol_processor_batch_batch_send_size_bucket``
    - Number of units in the batch histogram bucket

  * - ``otelcol_processor_batch_batch_send_size_count``
    - Number of units in the batch histogram count

  * - ``otelcol_processor_batch_batch_send_size_sum``
    - Number of units in the batch histogram sum

  * - ``otelcol_processor_batch_timeout_trigger_send``
    - Number of times the batch was sent due to a timeout trigger

  * - ``otelcol_processor_dropped_log_records``
    - Number of log records that were dropped

  * - ``otelcol_processor_dropped_metric_points``
    - Number of metric points that were dropped

  * - ``otelcol_processor_dropped_spans``
    - Number of spans that were dropped

  * - ``otelcol_processor_groupbyattrs_log_groups``
    - Distribution of groups extracted for logs

  * - ``otelcol_processor_groupbyattrs_log_groups_bucket``
    - Distribution of groups extracted for logs bucket histogram

  * - ``otelcol_processor_groupbyattrs_log_groups_count``
    - Distribution of groups extracted for logs count histogram

  * - ``otelcol_processor_groupbyattrs_log_groups_sum``
    - Distribution of groups extracted for logs sum histogram 

  * - ``otelcol_processor_refused_log_records``
    - Number of refused log records

  * - ``otelcol_processor_refused_metric_points``
    - Number of refused metric points

  * - ``otelcol_receiver_accepted_log_records``
    - Number of log records successfully pushed into the pipeline 

  * - ``otelcol_receiver_accepted_metric_points``
    - Number of metric points successfully pushed into the pipeline 

  * - ``otelcol_receiver_accepted_spans``
    - Number of spans successfully pushed into the pipeline 
  
  * - ``otelcol_receiver_refused_log_records``
    - Number of log records that could not be pushed into the pipeline

  * - ``otelcol_receiver_refused_metric_points``
    - Number of metric points that could not be pushed into the pipeline 

  * - ``otelcol_receiver_refused_spans``
    - Number of spans that could not be pushed into the pipeline

  * - ``otelcol_sapm_requests_failed``
    - Number of failed HTTP requests

  * - ``otelcol_sapm_spans_exported``
    - Number of spans successfully exported

  * - ``otelcol_scraper_errored_metric_points``
    - Number of metric points that couldn't be scraped

  * - ``otelcol_scraper_scraped_metric_points``
    - Number of metric points successfully scraped

.. _metrics-internal-collector-use:

Use internal metrics to monitor your Collector instance 
=========================================================================

You can use the Collector's internal metrics to monitor the behavior of the Collector and identify performance issues.

Monitor data flow and detect data loss
------------------------------------------------------------

To ensure data is flowing correctly, use the ``otelcol_receiver_accepted_spans`` and ``otelcol_receiver_accepted_metric_points`` metrics for information about the data ingested by the Collector, and ``otecol_exporter_sent_spans`` and ``otelcol_exporter_sent_metric_points`` for information about exported data.

Use ``otelcol_processor_dropped_spans`` and ``otelcol_processor_dropped_metric_points`` to detect data loss. Small losses shouldn't be considered outages, so depending on your requirements, set up a minimal time window before alerting.

Detect receive failures
------------------------------------------------------------

Sustained rates of ``otelcol_receiver_refused_spans`` and ``otelcol_receiver_refused_metric_points`` indicate too many errors returned to clients. Depending on the deployment and the client's resilience this may indicate data loss at the clients.

Sustained rates of ``otelcol_exporter_send_failed_spans`` and ``otelcol_exporter_send_failed_metric_points`` indicate that the Collector is not able to export data as expected. It doesn't imply data loss per se since there could be retries but a high rate of failures could indicate issues with the network or the back-end receiving the data.

Control queue length
------------------------------------------------------------

Use the queue-retry mechanism (available in most exporters) as the retry mechanism for the Collector: 

To check if your queue capacity is enough, compare ``otelcol_exporter_queue_capacity``, which indicates the capacity of the retry queue in batches, and ``otelcol_exporter_queue_size``, which indicates the current size of retry queue. 

``otelcol_exporter_enqueue_failed_spans``, ``otelcol_exporter_enqueue_failed_metric_points`` and ``otelcol_exporter_enqueue_failed_log_records`` indicate the number of span/metric points/log records failed to be added to the sending queue. If your queue is full, decrease your sending rate or horizontally scale collectors.

The queue-retry mechanism also supports logging for monitoring. Check your logs for messages like "Dropping data because sending_queue is full".







