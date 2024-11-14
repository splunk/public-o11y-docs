.. list-table:: 
  :header-rows: 1
  :widths: 20 80
  :width: 100%

  * - :strong:`Billing class`
    - :strong:`Metrics included`
  * - Custom metrics
    - Metrics reported to Splunk Observability Cloud outside of those reported by default, such as host, container, or bundled metrics. Custom metrics might result in increased data ingest costs.
  * - APM Monitoring MetricSets
    - Includes metrics from APM Monitoring MetricSets. See :ref:`apm-metricsets` for more information.
  * - RUM Monitoring MetricSets
    - Includes metrics from RUM Monitoring MetricSets. See :ref:`rum-custom-indexed-tags` for more information.
  * - Default/bundled metrics (Infrastructure)
    - * Host
      * Container
      * Bundled
      * Additional metrics sent through infrastructure monitoring public cloud integrations that aren't attributed to specific hosts or containers.
  * - Default/bundled metrics (APM)
    - * Host
      * Container
      * Identity
      * Bundled
      * Tracing 
      * Runtime
      * Synthetics
  * - Other metrics
    - Internal metrics