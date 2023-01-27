.. _alert-conditions-apm:

************************************************
Use built-in alert conditions in Splunk APM
************************************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn about the built-in alert conditions in Splunk APM. 

When creating rules in detectors to specify conditions that can trigger alerts, Splunk APM provides built-in conditions that detect common problem scenarios. Many of these alert conditions provide more powerful ways of monitoring signals than the standard practice of comparing a signal to a static threshold.

.. note:: 

  This topic covers the built-in alert conditions you can use when you're creating a Splunk APM detector for latency or error rate. To learn about alert conditions for Infrastructure or Custom Metrics detectors, see :ref:`condition-reference`.

  For general information about alerts and detectors in Splunk Observability Cloud, see :ref:`get-started-detectoralert`. 

Alert conditions for latency detectors
========================================

The following table summarizes the available built-in alert conditions for latency detectors in Splunk APM. These conditions appear under Alert condition after you select :guilabel:`Service Latency` or :guilabel:`Workflow Duration` under Alert signal when you're creating a detector. 

.. list-table::
   :header-rows: 1
   :widths: 20,30,40

   * - :strong:`Condition`
     - :strong:`Description`
     - :strong:`Example`

   * - :ref:`static-threshold`
     - Alerts when latency goes above a static threshold, relative to a specified percentile, for a specified period of time.
     - The 90th percentile of latency is above 500ms for 100% of 5 seconds.

   * - :ref:`sudden-change`
     - Alerts when latency during a recent time window anomalously spikes compared to the preceding time window. Anomaly can be defined through number of deviations from norm or percentage change of signal.
     - Latency in the last 10 minutes is more than 5 deviations above the norm established in the preceding 1 hour; The 50th percentile of latency in the last 10 minutes is more than 30% above latency of the preceding 1 hour.

   * - :ref:`hist-anomaly`
     - Alerts when latency anomalously spikes compared to the same periods in the past (for cyclical or seasonal data). Anomaly can be defined through number of deviations from historical norm or percentage change compared to historical norm.
     - Latency in the last 10 minutes is more than 5 deviations above its historical norm, cyclical over 1‑week periods; The 90th percentile of latency in the last 10 minutes is more than 30% above its historical norm, cyclical over 1‑week periods.


Alert conditions for error rate detectors
==========================================

The following table summarizes the available built-in alert conditions for error rate detectors in Splunk APM. These conditions appear under Alert condition after you select :guilabel:`Service Error Rate` or :guilabel:`Workflow Error Rate` under Alert signal when you're creating a detector. 

.. list-table::
   :header-rows: 1
   :widths: 20,30,40

   * - :strong:`Condition`
     - :strong:`Description`
     - :strong:`Example`

   * - :ref:`static-threshold`
     - Alerts when the error rate goes above a specified percentage for a minimum number of requests.
     - The error rate over the last 10 minutes is above 10% across at least 50 requests.

   * - :ref:`sudden-change`
     - Alerts when there is a sudden increase in error rate.
     - The error rate over the last 5 minutes is over 5% larger than the error rate of the preceding 1 hour across at least 100 requests.
