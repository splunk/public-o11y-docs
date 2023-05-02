.. _outlier-detection:

=============================================================================
Outlier Detection
=============================================================================



.. meta::
  :description: The Outlier Detection condition alerts when a signal is significantly different from its peers in the same time period.

Outlier Detection alerts when a signal is significantly different from its peers in the same time period. Use this condition to identify inconsistent behavior among a population of emitters (within the same time period), such as which node in a cluster is using more CPU than the others.

.. note:: To compare current signal values to past values of the same signal, use :ref:`sudden-change` or :ref:`hist-anomaly`.

Example
=============================================================================

Use this condition to determine if you have not added a host to your load balancer, or if there is a problem between the host and the load balancer. For example, if a metric tracks requests routed to a host in a load balancer, trigger an outlier alert when, for example, the value of the metric is more than 2.5 standard deviations below the mean of similar signals for 80% of 5m.


Basic settings
=============================================================================

.. list-table::
   :header-rows: 1
   :widths: 30, 30, 70

   * - :strong:`Parameter`
     - :strong:`Values`
     - :strong:`Notes`

   * - :strong:`Alert when`
     - ``Too high``, ``Too low``, ``Too high or Too low``
     - 

   * - :strong:`Trigger Sensitivity`
     - ``Low``, ``Medium``, ``High``, ``Custom``
     - Approximately how often alerts are triggered, where Low can result in fewer alerts being triggered and alerts taking longer to clear (least :term:`flappy`). Choose ``Custom`` to modify the settings that determine triggering and clearing sensitivity (listed below).

Advanced settings
=============================================================================


.. list-table::
   :header-rows: 1
   :widths: 30, 30, 70

   * - :strong:`Paramter`
     - :strong:`Values`
     - :strong:`Notes`

   * - :strong:`Define thresholds by`
     - ``Deviations from norm``, ``Norm plus percentage change``
     -  Whether to express comparison in terms of a statistic (number of deviations) or a percentage

   * - :strong:`Normal based on` (when :strong:`Define thresholds by` is ``Deviations from norm``)
     - ``Mean plus standard deviation``, ``Median plus median absolute deviation``
     - ``Median plus median absolute deviation`` is recommended for small populations (<15).

   * - :strong:`Normal defined by` (when :strong:`Define thresholds by` is ``Norm plus percentage change``)
     - ``Mean``,` ``Median``
     - ``Median`` is less influenced by extreme values.

   * - (Optional) :strong:`Group by`
     - Dimension or property chosen from dropdown menu
     - Use a dimension or property when you want the norm to be different according to the different values of the dimension or property. For example, if you choose ``aws_availability_zone`` and your zones are US-east and US-west, instances in US-east are being compared only to other instances in US-east, and likewise for US-west. If you choose None, there is one norm, and all members are compared to this norm.

   * - :strong:`Trigger threshold` and :strong:`Clear threshold` (when :strong:`Define thresholds by` is ``Deviations from norm``)
     - Number >= 0; Clear threshold must be lower than Trigger threshold.
     - The number of deviations away from the norm required to trigger an alert.

       For example, a trigger value of |nbsp| 3.5 triggers an alert when the values being compared differ from the norm by 3.5 standard deviations or more. Higher values result in lower sensitivity and potentially fewer alerts.

       A clear value of |nbsp| 2.5 clears the alert when the values being compared differ by 2.5 standard deviations or less. Higher values result in alerts taking longer to clear.

   * - :strong:`Trigger threshold` and :strong:`Clear threshold` (when :strong:`Define thresholds by` is ``Norm plus percentage change``)
     - Number between 0 and 100, inclusive; Clear threshold must be lower than Trigger threshold.
     - The percentage change required to trigger or clear the alert.

       For example, a trigger value of |nbsp| 30 triggers an alert when the values being compared differ by 30% or more. Higher values result in lower sensitivity and potentially fewer alerts.

       A clear value of |nbsp| 20 clears the alert when the values being compared differ by 20% or less. A gap between Trigger threshold and Clear thresholds results in alerts taking longer to clear.

   * - :strong:`Trigger duration`
     - Percent: Integer between 1 and 100; Time indicator: Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w.
     - The number of times the signal must meet the trigger threshold, compared to the number of expected data points. Higher percentages and/or longer time periods result in lower sensitivity and potentially fewer alerts. For more information about this option, see :ref:`duration-outlier`.

   * - :strong:`Clear duration`
     - Percent: Integer between 1 and 100; Time indicator: Integer >= 1, followed by time indicator (s, m, h, d, w), For example,  30s, 10m, 2h, 5d, 1w.
     - The number of times the signal must meet the clear threshold, compared to the number of expected data points. Higher percentages and/or longer time periods result in longer times for alerts to clear, increasing confidence that the alert condition is in fact no longer occurring. For more information about this option, see :ref:`duration-outlier`.


.. _duration-outlier:

The Duration option
=============================================================================


The ``Trigger duration`` and ``Clear duration`` options are used to trigger or clear alerts based on how many signals met the threshold during the specified time window, compared to how many were expected.

-  Specifying |nbsp| 100% means that all expected data points arrived (there were no delayed or missing data points) and all met the threshold. In other words, if you specify 100% |nbsp| of a time range, an alert isn't triggered if any data points are delayed or do not arrive at all during that time range, even if all the data points that are received :strong:`do` meet the threshold.  (For more information about delayed or missing data points, see :ref:`delayed-missing`.)

   .. note:: To specify that an alert triggers immediately, specify 100% |nbsp| of 1 |nbsp| second for infrastructure detectors, and 100% |nbsp| of 10 |nbsp| seconds for µAPM |nbsp| detectors. If the signal resolution is greater than the value you enter, a message indicates that you need to change it to at least the value of the signal resolution.

-  Specifying a percentage below |nbsp| 100 has a few effects:

   -  For the Alert threshold, a lower percentage is more sensitive (might trigger more alerts) than using 100%, because fewer signals are needed to trigger an alert. Also, it can trigger alerts even if some data points are missing, as long as the required number of anomalous signals arrive.

   -  For the Clear threshold, it can clear alerts more quickly than using 100%, because fewer signals are needed to trigger the clear condition. Also, it can clear an alert even if some data points are missing, as long as the required number of non-anomalous signals arrive.


The following examples illustrate how this option affects triggering and clearing alerts in various situations.

Alert example 1
-------------------------------------------------------------------

-  Percent of duration you specify: 100% of 10 minutes

-  Resolution of the signal: 10 seconds

-  Number of data points expected in 10 minutes: 6 |nbsp| per |nbsp| minute |nbsp| * |nbsp| 10 minutes (60)

-  Number of anomalous data points (how many times the threshold must be met) to trigger alert: 100% of 60 (60)



   .. list-table::
      :header-rows: 1

      * - :strong:`Total data points expected`
        - :strong:`Total data points received`
        - :strong:`Anomalous data points required`
        - :strong:`Anomalous data points received`
        - :strong:`Alert is triggered?`

      * - 60
        - 60
        - 60
        - 60
        - Yes

      * - 60
        - 60
        - 60
        - 59 or fewer
        - No

      * - 60
        - 59
        - 60
        - 59
        - No

   Note that in the last example above, even though 100% of the data points that arrived were anomalous, the required number of anomalous data points (60) did not arrive. Therefore, the alert isn't triggered. The percent you specify represents percent of :strong:`expected` data points, not percent of :strong:`received` data points.

Alert example 2
-------------------------------------------------------------------

-  Percent of duration you specify: 80% of 10 minutes

-  Resolution of the signal: 10 seconds

-  Number of data points expected in 10 minutes: 6 |nbsp| per |nbsp| minute |nbsp| * |nbsp| 10 minutes (60)

-  Number of anomalous data points (how many times the threshold must be met) to trigger alert: 80% of 60 (48)



   .. list-table::
      :header-rows: 1

      * - :strong:`Total data points expected`
        - :strong:`Total data points received`
        - :strong:`Anomalous data points required`
        - :strong:`Anomalous data points received`
        - :strong:`Alert is triggered?`

      * - 60
        - 60
        - 48
        - 48-60
        - Yes

      * - 60
        - 50
        - 48
        - 48-50
        - Yes

      * - 60
        - 50
        - 48
        - 47
        - No

   Note that in the last example above, even though 47/50 is greater than the |nbsp| 80% you specified, the required number of anomalous data points (48) did not arrive. Therefore, the alert isn't triggered. The percent you specify represents percent of :strong:`expected` data points, not percent of :strong:`received` data points.



Clear example 1
-------------------------------------------------------------------

-  Percent of duration you specify: 100% of 15 minutes

-  Resolution of the signal: 30 seconds

-  Number of data points expected in 15 minutes: 2 |nbsp| per |nbsp| minute |nbsp| * |nbsp| 15 minutes (30)

-  Number of anomalous data points (how many times the threshold must be met) to clear alert: 100% of 30 (30)


   .. list-table::
      :header-rows: 1

      * - :strong:`Total data points expected`
        - :strong:`Total data points received`
        - :strong:`Normal data points required`
        - :strong:`Normal data points received`
        - :strong:`Alert is cleared?`

      * - 30
        - 30
        - 30
        - 30
        - Yes

      * - 30
        - 30
        - 30
        - 29 or fewer
        - No

      * - 30
        - 25
        - 30
        - 25
        - No

   Note that in the last example above, even though 100% of the data points that arrived were anomalous, only 35 out of the 36 expected data points arrived. Therefore, the alert isn't cleared. The percent you specify represents percent of :strong:`expected` data points, not percent of :strong:`received` data points.

Clear example 2
-------------------------------------------------------------------

-  Percent of duration you specify: 50% of 15 minutes

-  Resolution of the signal: 30 seconds

-  Number of data points expected in 15 minutes: 2 |nbsp| per |nbsp| minute |nbsp| * |nbsp| 15 minutes (30)

-  Number of anomalous data points (how many times the threshold must be met) to clear alert: 50% of 30 (15)


   .. list-table::
      :header-rows: 1

      * - :strong:`Total data points expected`
        - :strong:`Total data points received`
        - :strong:`Normal data points required`
        - :strong:`Normal data points received`
        - :strong:`Alert is cleared?`

      * - 30
        - 30
        - 15
        - 15-30
        - Yes

      * - 30
        - 20
        - 15
        - 15-20
        - Yes

      * - 30
        - 20
        - 15
        - 14
        - No

   Note that in the last example above, even if 14 anomalous data points arrive, and 14/15 is greater than the |nbsp| 50% you specified, the required number of anomalous data points (15) did not arrive. Therefore, the alert isn't triggered. The percent you specify represents percent of :strong:`expected` data points, not percent of :strong:`received` data points.


Further reading
=============================================================================

.. list-table::
   :header-rows: 1
   :widths: 30, 100

   * - :strong:`Parameters`
     - :strong:`Remarks`

   * - Alert when
     - The setting "Too high or Too low" triggers an alert for a signal that oscillates between above and below the bands (provided of course it spends enough time outside of the band).

   * - Trigger and clear duration
     - Set these parameters to be significantly larger than native resolution.

   * - Trigger threshold and Outlier algorithm
     - Mean plus standard deviation never triggers an alert for ``n`` standard deviations if ``n^2 + 1`` is greater than or equal to the size of the population being monitored. Therefore, Median plus median absolute deviation is recommended for small populations (``n <  15``).

   * - Trigger threshold and clear threshold
     - These produce dynamic thresholds, which can be somewhat disorienting. For example, an alert can be triggered when the signal value is 31.4 (units of the original metric, not deviations) and clear when the value is 55.1 (because the rest of the population now also shows elevated values).


