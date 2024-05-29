.. list-table:: 
   :header-rows: 1
   :widths: 20 80
   :width: 100%

   * - :strong:`Category type`
     - :strong:`Description`

   * - 0
     - | No information about the category type of the metric.
       | Note: Category type information for metrics is only available after 03/16/2023. Any metrics created before that date has category type ``0``. 
   
   * - 1
     - Host

   * - 2
     - Container

   * - 3
     - | Custom 
       | Metrics reported to Splunk Observability Cloud outside of those reported by default, such as host, container, or bundled metrics. Custom metrics might result in increased data ingest costs.

   * - 4
     - Hi-resolution

   * - 5
     - Internal

   * - 6
     - Tracing metrics

   * - 7
     - | Bundled 
       | In host-based subscription plans, additional metrics sent through Infrastructure Monitoring public cloud integrations that are not attributed to specific hosts or containers.

   * - 8
     - APM hosts

   * - 9
     - APM container   

   * - 10
     - APM identity   

   * - 11
     - APM bundled metrics  

   * - 12
     - | APM Troubleshooting MetricSets
       | This category is not part of the report.

   * - 13
     - | APM Monitoring MetricSets
       | This category is not part of the report.

   * - 14
     - Infrastructure Monitoring function

   * - 15
     - APM function

   * - 16
     - | RUM Troubleshooting MetricSets
       | This category is not part of the report.

   * - 17
     - RUM Monitoring MetricSets

   * - 18
     - Network Explorer metrics

   * - 19
     - Runtime metrics

   * - 20
     - Synthetics metrics

.. note:: In subscription plans based on metric time series (MTS), all metrics are categorized as custom metrics and billed accordingly.