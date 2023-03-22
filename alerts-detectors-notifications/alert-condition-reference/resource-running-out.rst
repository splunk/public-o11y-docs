.. _resource-running-out:

=============================================================================
Resource Running Out
=============================================================================

.. meta::
  :description: The Resource Running Out condition alerts when a signal has a certain amount of time before it is exhausted or full.


Resource Running Out alerts when a signal has a certain amount of time before it is exhausted (reaches a specified minimum value) or full (reaches a specified capacity). While it is common to use a :ref:`static-threshold` for many types of signals that trend to empty or capacity, such as alerting when memory utilization is  |nbsp| 80% or when free disk space is below |nbsp| 10%, the Resource Running Out condition provides a more powerful way of receiving alerts for these types of signals, because it takes into account whether a signal is trending up or down (steadily rising or falling).


Example
=============================================================================

You might have a detector that triggers an alert when memory utilization goes above 80%, so you have time to look into the issue before the your app is seriously affected. In fact, reaching 80% might only represent a problem if the value has been trending upward and is on a path to reaching 100%. A better way to monitor this signal is to use the Resource Running Out alert condition, which alerts you when a signal is trending up or down.

In this case, say you want to receive a notification when the signal is expected to hit 80% in 15 |nbsp| minutes (trigger threshold of |nbsp| .25 |nbsp| hours) and has been in this state for 3 |nbsp| minutes (trigger duration of |nbsp| 3m). This alerts you in advance of the error condition, giving you more time to respond, but won't send a false alert if the signal simply spikes to 80% and then quickly drops to a safer level.


Basic settings
=============================================================================

.. list-table::
   :header-rows: 1
   :widths: 30, 30, 70

   * - :strong:`Paramter`
     - :strong:`Values`
     - :strong:`Notes`

   * - :strong:`Alert when nearing`
     - ``Empty``, ``Capacity``
     - Choose Empty for signals assumed to be decreasing, Capacity for signals assumed to be increasing

   * - :strong:`Minimum value/Capacity`
     - Number >= 0
     - Minimum value represents "empty" for the signal (in case Alert when nearing empty) and has a default value of 0. Capacity represents "full" for the signal (in case Alert when nearing capacity) and has no default value; if the signal is a percent, for example, you might enter 100. \*

   * - :strong:`Trigger Sensitivity`
     - ``Low``, ``Medium``, ``High``, ``Custom``
     - Approximately how often alerts will be triggered, where Low can result in fewer alerts being triggered and alerts taking longer to clear (least :term:`flappy`). Choose ``Custom`` to modify the settings that determine triggering and clearing sensitivity (listed below).

\* If you specify a metric unit in the plot configuration panel for the signal, the value you enter for Capacity must match the unit you specified. For example, if you specified bytes, you have to specify 100000000000 (a hundred billion) to specify 100 gigabytes. To learn more, see :ref:`specify-unit` and :ref:`plot-config-panel`.
   

Advanced settings
=============================================================================


.. list-table::
   :header-rows: 1
   :widths: 30, 30, 70

   * - :strong:`Parameter`
     - :strong:`Values`
     - :strong:`Notes`


   * - :strong:`Trigger threshold`
     - Number > 0
     - The estimated number of hours remaining before resource reaches the specified capacity. Lower values result in lower sensitivity and potentially fewer alerts.

   * - :strong:`Trigger duration`
     - Percent: Integer between 1 and 100; Time indicator: Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w.
     - The number of times the derived signal (hours remaining) must meet the trigger threshold, compared to the number of expected data points. Higher percentages and/or longer time periods result in lower sensitivity and potentially fewer alerts. For more information about this option, see :ref:`duration-resource`.

   * - :strong:`Clear threshold`
     - Number > 0; must be higher than Trigger threshold.
     - The estimated number of hours remaining before the resource reaches the specified capacity. Lower values result in alerts taking longer to clear.

       For example, if the Trigger threshold is 24 and the Clear threshold is 36, the alert is triggered when the resource is projected to reach capacity in 24 hours; it clears when the projected length of time before reaching capacity increases to 36 hours.

   * - :strong:`Clear duration`
     - Percent: Integer between 1 and 100; Time indicator: Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w.
     - The number of times the derived signal (hours remaining) must meet the clear threshold, compared to the number of expected data points. Higher percentages and/or longer time periods result in longer times for alerts to clear, increasing confidence that the alert condition is in fact no longer occurring. For more information about this option, see :ref:`duration-resource`.

   * - :strong:`Use Double EWMA`
     - ``Yes``, ``No``
     - ``Yes`` uses a double exponentially weighted moving average to perform forecasts. ``No`` uses linear extrapolation. In general, it's good paractice to use ``Yes`` to handle trends present at a resolution somewhat coarser than native resolution.


.. _duration-resource:

Using the Duration option
=============================================================================

The Trigger duration and Clear duration options are used to trigger or clear alerts based on how frequently the condition is satisfied during the specified time window. For this alert, the condition being evaluated concerns the forecasted number of hours left, and the forecast is extrapolated when data is missing. Therefore, in the alert when nearing empty case (for example), a short period of descent followed by a long period of missing data might result in an alert being triggered.


Further reading
=============================================================================


.. list-table::
   :header-rows: 1
   :widths: 30, 100

   * - :strong:`Parameters`
     - :strong:`Remarks`

   * - Trigger duration and Clear duration
     - Set these parameters to be significantly larger than native resolution.

   * - Trigger threshold and Trigger duration
     - These parameters are naturally a pair: consider a trigger strategy with 3 |nbsp| rules, such as alert if <  |nbsp| 72  |nbsp| hours left for  |nbsp| 100% of |nbsp| 4  |nbsp| hours, if <  |nbsp| 48 |nbsp|  hours for  100% of |nbsp| 2  |nbsp| hours, or if <  |nbsp|  24 hours |nbsp|  for  100% of |nbsp| 1 |nbsp|  hour (with increasingly higher levels of severity).

   * - Signal
     - If the signal often does not change, changes might go undetected (depending on "percent" required in the trigger duration).

   * - Signal
     - The alert condition applies a rate of change transformation, and this might not interact well with other analytics (especially rolling minimum, mean, maximum transformations).

       

   * - Signal
     - The transformed signal is "hours left." This quantity is negative if the signal goes below the specified minimum value (for Empty) or above the specified capacity (for Capacity). This means you might see negative values for "hours left" in the detector's chart.

