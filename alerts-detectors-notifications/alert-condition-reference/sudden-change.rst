.. _sudden-change:

=============================================================================
Sudden Change
=============================================================================



.. meta::
  :description: The Sudden Change condition alerts when values received during a recent time window are anomalous compared to values received during the preceding time window.

Sudden Change alerts when values received during a recent (short) time window (called the current window) are anomalous compared to values received during the preceding (typically longer) time window (called the historical window). Use this condition to find a sudden change in a metric when you don't have a static baseline for comparison.


Examples
=============================================================================

- If a code push results in the application response time increasing, using this condition with a signal that measures response time would trigger an alert.

- If the number of logins for a server suddenly decreases significantly, this might indicate a problem with that server.


Basic settings
=============================================================================

.. list-table::
   :header-rows: 1
   :widths: 30, 30, 70

   * - :strong:`Parameter`
     - :strong:`Values`
     - :strong:`Notes`

   * - :guilabel:`Alert when`
     - ``Too high``, ``Too low``, ``Too high or Too low``
     - Alert is triggered when the signal is either above a threshold, below a threshold, or outside a specified range (e.g. more than 3.5 standard deviations above or below the mean of the preceding window, or higher than the 95th percentile of the preceding window). Choose :strong:`Custom sensitivity` and then the :strong:`Normal based on` parameter on to specify whether anomalies are based on standard deviations from the mean, a percentile value, or mean plus percentage change.

   * - :guilabel:`Trigger Sensitivity`
     - ``Low``, ``Medium``, ``High``, ``Custom``
     - Approximately how often alerts are triggered, where Low can result in fewer alerts being triggered and alerts taking longer to clear (least :term:`flappy`). Choose ``Custom`` to modify the settings that determine triggering and clearing sensitivity (listed below).

Advanced settings
=============================================================================

.. list-table::
   :header-rows: 1
   :widths: 30, 30, 70

   * - :strong:`Parameter`
     - :strong:`Values`
     - :strong:`Notes`

   * - :strong:`Normal based on`
     - ``Mean plus standard deviation``, ``Percentile``, ``Mean plus percentage change``
     - How to define anomalies as compared to the historical window.

       Use ``Percentile`` for signals such as application response time or latency, where the signal might be more likely to have small but consistent increases or decreases. In general, ``Percentile`` aims to be representative but can be rigid (a new maximum value is seen as anomalous regardless of scale). ``Mean plus standard deviation`` is more flexible but can be unduly influenced by extreme observations. ``Mean plus percentage change`` is more interpretable but might be harder to tune.

   * - :strong:`Current window`
     - Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w.
     - The time range being monitored. For example, a value of 10m indicates that you are looking for anomalies that have occurred in the most recent 10 minutes.

   * - :strong:`Historical window`
     - Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w. Must be higher than Current window.
     - The time range being used to define the recent trend. For example, a value of 8h indicates that you are comparing values received during the current window with values received during the preceding 8 hours.

   * - :strong:`Trigger threshold` and :strong:`Clear threshold`  (when :strong:`Normal based on` is ``Mean plus standard deviation``)
     - Number >= 0; Clear threshold must be lower than Trigger threshold.
     - The number of standard deviations away from the historical mean required to trigger or clear an alert. Higher trigger values result in lower sensitivity and potentially fewer alerts. Higher clear values result in alerts clearing more quickly.

   * - :strong:`Trigger threshold` and :strong:`Clear threshold`  (when :strong:`Normal based on` is ``Percentile``)
     - Number between 0 and 100, inclusive. For details on how these values must relate to each other, see :ref:`trigger-clear-details` below.
     - Percentile of historical window used as a threshold for triggering or clearing an alert. Higher trigger values result in lower sensitivity and potentially fewer alerts. Higher clear values result in alerts clearing more quickly.

   * - :strong:`Trigger threshold` and :strong:`Clear threshold`  (when :strong:`Normal based on` is ``Mean plus percentage change``)
     - Number between 0 and 100, inclusive; Clear threshold must be lower than Trigger threshold.
     - The percentage change required to trigger or clear the alert.

       For example, a trigger value of |nbsp| 30 triggers an alert when the values being compared differ by 30% or more. Higher values result in lower sensitivity and potentially fewer alerts.

       A clear value of |nbsp| 20 clears the alert when the values being compared differ by 20% or less. Higher values result in alerts taking longer to clear.

   * - :strong:`Ignore historical extremes` (when :strong:`Normal based on` is ``Mean plus standard deviation``)
     - ``Yes``, ``No``
     - ``Yes`` applies a filter to the historical data: it replaces data points more than :strong:`Trigger threshold` standard deviations away from the mean with the associated limit (i.e., the value exactly :strong:`Trigger threshold` standard deviations away from the mean), then calculates the threshold on that modified set. ``No`` does not apply a filter.

       In general, ``Yes`` is recommended as a way to prevent anomalous values from influencing the definition of "normal" behavior against which to measure the signal.

   * - :strong:`Use EWMA` (when :strong:`Normal based on` is ``Mean plus standard deviation`` or ``Mean plus percentage change``)
     - ``Yes``, ``No``
     - ``Yes`` calculates an exponentially weighted moving average (and adds standard deviations or a percentage as appropriate). ``No`` uses a usual moving average. In general, ``Yes`` is recommended as a way to prevent the threshold from lagging too far behind the current values.



.. _trigger-clear-details:

Specifying trigger and clear thresholds
=============================================================================

As noted above, when :strong:`Normal based on` is ``Mean plus standard deviation`` or ``Mean plus percentage change``, the value of Clear threshold must be lower than that of Trigger threshold. However, when when :strong:`Normal based on` is ``Percentile``, the relationship between the 2 |nbsp| values is a bit more complex.

In the latter case, the following condition must exist:

.. code-block:: none

   |TriggerThreshold - 50| >= |ClearThreshold - 50|

If this condition is not met, the detector doesn't behave as expected.

Note, however, that you don't need to adapt the thresholds to the type of comparison; that is, if you specify 99 |nbsp| as a Trigger threshold, it is automatically converted to |nbsp| 1 if :guilabel:`Alert when` is ``Too low``.



Further reading
=============================================================================


.. list-table::
   :header-rows: 1
   :widths: 30, 100

   * - :strong:`Parameters`
     - :strong:`Remarks`

   * - Alert when
     - The setting ``Too high or Too low`` doesn't trigger an alert for a signal that oscillates between above and below the bands. The signal must spend at least the amount of time specified for :guilabel:`Current window` on one side of the band or the other.

   * - Current window, Historical window, Native resolution
     - Set both :guilabel:`Current window` and :guilabel:`Historical window` to be significantly larger than native resolution.

   * - Current window
     - The alert condition applies rolling minimum and maximum transformations (over the current window), which can interact poorly with other analytics on the signal. The alert condition is not influenced by missing data points in the current window or historical window. That is, all of the received values must be above/below the threshold; missing data points do not prevent an alert from triggering. Similarly, the threshold calculations ignore missing data points.

   * - Trigger threshold and Clear threshold
     - These produce dynamic thresholds, which can be somewhat disorienting. For example, an alert can be triggered when the signal value is 31.4 (units of the original metric, not deviations or a percentile) and clear when the value is 55.1 (because the dynamic threshold has been influenced by the elevated values that have occurred since the alert was triggered). The clear event does :strong:`not` mean the signal is below the threshold in effect when the alert was triggered.

