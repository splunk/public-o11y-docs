.. list-table::
   :widths: 25 55 20
   :header-rows: 1
   :width: 100%

   * - Name
     - Description
     - Pipeline types
   * - :ref:`routing-connector` (``routing``)
     - Routes logs, metrics or traces based on resource attributes to specific pipelines using OpenTelemetry Transformation Language (OTTL) statements as routing conditions.
     - Traces, metrics, logs
   * - :ref:`span-metrics-connector` (``spanmetrics``)
     - Aggregates Request, Error and Duration (R.E.D) OpenTelemetry metrics from span data.
     - Traces, metrics