.. _alert-conditions-apm:

Use built-in alert metrics and conditions in Splunk APM
**********************************************************

.. meta::
   :description: Learn about the built-in alert conditions in Splunk APM. 

Use the built-in alert conditions for Splunk APM metrics to create alert rules that trigger alerts for common problem scenarios. Using these alert conditions, you can dial in your monitoring signals beyond the standard practice of comparing a signal to a static threshold. See :ref:`apm-alerts` for steps to configure an APM detector.

.. note:: 

  This topic covers the built-in alert conditions you can use when you're creating a Splunk APM detector for latency, request rate, or error rate. To learn about alert conditions for Infrastructure or Custom Metrics detectors, see :ref:`condition-reference`.

  For general information about alerts and detectors in Splunk Observability Cloud, see :ref:`get-started-detectoralert`. 

These are the built-in alert conditions that are available in Splunk APM detectors. See :ref:`apm-alerts` for steps to configure an APM detector.

.. list-table::
   :header-rows: 1
   :widths: 10,30,30,30

   * - :strong:`Condition`
     - :strong:`Description`
     - :strong:`Metrics available`
     - :strong:`Example`

   * - :ref:`static-threshold`
     - Alerts when the request rate goes above a specified percentage for a minimum number of requests.
     - * Request rate for service, endpoint, or workflow 
       * Error rate for service, endpoint, or workflow 
       * Latency for service, endpoint, or workflow 
     - The request rate, error rate, or latency over the last 10 minutes is above 10% across at least 50 requests.

   * - :ref:`sudden-change`
     - Alerts when there is a sudden increase in request rate.
     - * Request rate for service, endpoint, or workflow 
       * Error rate for service, endpoint, or workflow 
       * Latency for service, endpoint, or workflow 
     - The request rate, error rate, or latency over the last 5 minutes is over 5% larger than the request rate, error rate, or latency of the preceding 1 hour across at least 100 requests.

   * - :ref:`hist-anomaly`
     - Alerts when the request rate anomalously spikes compared to the same periods in the past (for cyclical or seasonal data). An anomaly is either the number of deviations from the historical norm or the percentage change compared to the historical norm.
     - * Request rate for service, endpoint, or workflow 
       * Latency for service, endpoint, or workflow 
     - Request rate or latency in the last 10 minutes is more than 5 deviations above its historical norm, cyclical over 1‑week periods. The 90th percentile of request rate or latency in the last 10 minutes is more than 30% above its historical norm, cyclical over 1‑week periods.