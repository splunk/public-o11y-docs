.. _condition-reference:

*****************************************************************
Built-in alert conditions
*****************************************************************



.. meta::
  :description: Built-in alert conditions provide more powerful ways of monitoring signals than the standard practice of comparing a signal to a static threshold.


.. toctree::
   :hidden:

   static-threshold
   heartbeat-check
   resource-running-out
   outlier-detection
   sudden-change
   hist-anomaly
   custom-threshold


When you create rules in detectors to specify conditions that trigger alerts, Splunk Infrastructure Monitoring provides a number of built-in conditions that detect common problem scenarios. Many of these alert conditions provide more powerful ways of monitoring signals than the standard practice of comparing a signal to a static threshold.

The following table summarizes the available built-in alert conditions. To learn more about each condition, select the name of the condition.

.. _condition-ref-table:

.. list-table::
   :header-rows: 1
   :widths: 20,30,40

   * - :strong:`Condition`
     - :strong:`Description`
     - :strong:`Example`


   * - :ref:`static-threshold`
     - Alert when a signal crosses a static threshold
     - Availability over the last day is below 99.9.

   * - :ref:`heartbeat-check`
     - Alert when a signal has stopped reporting for some time
     - ``Host-linux-001`` has not reported for 15 minutes.

   * - :ref:`resource-running-out`

     - Detect when a signal is projected to reach a specified minimum or maximum value
     - ``disk_space_available`` is projected to decrease to zero within 24 hours. ``cpu.utilization`` is projected to reach 95 within 2 hours.

   * - :ref:`outlier-detection`
     - Alert when the signal from one data source differs from similar data sources
     - The number of logins in the last 10 minutes for this instance is 3 standard deviations lower than other instances in the same AWS availability zone.


   * - :ref:`sudden-change`
     - Alert when a signal is different from its normal behavior (based on mean of preceding window or percentile of preceding window)
     - All the values for ``cpu.utilization`` received in the last 15 |nbsp| minutes are at least |nbsp| 3 standard deviations higher than the mean of the preceding hour. All the values for ``latency`` received in the last 10 minutes are greater than 99% of the values of the preceding 1 hour.

   * - :ref:`hist-anomaly`
     - Alert when a signal differs by a specified amount when compared to similar periods in the past
     - The average number of logins in the last 2 hours is |nbsp| 3 standard deviations higher than the average for this same 2 hours last week.


   * - :ref:`custom-threshold`
     - Alert when a signal crosses another signal, or when you want to specify compound conditions using AND and OR operators.
     - The value for ``cache_misses`` is above ``cache_hits`` OR the value for ``cache_misses_percent`` is above 10. 
















