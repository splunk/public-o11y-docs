.. _hist-anomaly:

=============================================================================
Historical Anomaly
=============================================================================



.. meta::
  :description: The Historical Anomaly condition alerts when a signal is different from the same periods in the past (for cyclical or seasonal data)

Historical Anomaly alerts when a signal is different from the same periods in the past (for cyclical or seasonal data). Use the Historical Anomaly alert condition to monitor metrics with patterns that repeat over known, fixed periods of time. To specify the period of time over which patterns repeat, use the :strong:`Cycle length` parameter.

Examples
=============================================================================

- Count of concurrent logins has a weekly pattern; for example, in your environment, Monday mornings might generally have more logins than Friday nights. Set :strong:`Cycle length` to 1w.

- Sales revenue spikes every three months when you have a seasonal closeout sale. Set :strong:`Cycle length` to 13w.

- Count of disk reads spikes every 12 hours when an incremental backup kicks off. Set :strong:`Cycle length` to 12h.


Basic settings
=============================================================================

.. list-table::
   :header-rows: 1
   :widths: 30, 30, 70

   * - :strong:`Parameter`
     - :strong:`Values`
     - :strong:`Notes`

   * - :strong:`Cycle length`
     - Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w. Set this value to be significantly larger than the native resolution.
     - The time range that reflects the cyclicity of your signal. For example, a value of 1w indicates your signal follows a weekly cycle (you want to compare data for a Monday morning with previous Monday mornings). A value of 1d indicates your signal follows a daily cycle (you want to compare today’s data with data from the same time yesterday, the day before, and so on.)

   * - :strong:`Alert when`
     - ``Too high``, ``Too low``, ``Too high or Too low``
     - Alert is triggered when the signal is either above a threshold, below a threshold, or outside a specified range (for example, more than 3.5 deviations above or below normal, or more than 30% above or below normal). To specify whether anomalies are based on standard deviations from normal or percentage difference from normal, choose :strong:`Custom sensitivity` and then the :strong:`Normal based on` parameter.

   * - :strong:`Trigger Sensitivity`
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
     - ``Mean plus standard deviation``, ``Mean plus percentage change``
     -  If the short-term variation in a signal is small relative to the scale of the signal, and the scale is somehow natural, using ``Mean plus percentage change`` is recommended; using ``Mean plus standard deviation`` might trigger alerts even for a large number of standard deviations. In addition, ``Mean plus percentage change`` is recommended for metrics which admit a direct business interpretation. For instance, if ``user_sessions`` drops by 20%, revenue drops by 5%.

   * - :strong:`Current window`
     - Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w. Set this value to be smaller than Cycle length, and significantly larger than the native resolution.
     - The time range against which to compare the data; you can think of this as the moving average window. Higher values compute the mean over more data points, which generally smoothes the value, resulting in lower sensitivity and potentially fewer alerts.

   * - :strong:`Number of previous cycles`
     - Integer >=1 and <= 8
     - Works in conjunction with cycle length. The number of cycles to use for setting a historical norm, or baseline. For example, if your cycle length is |nbsp|  1w, this value specifies how many prior weeks you want to use when computing a historical norm. To consider last week the norm, use the value  |nbsp| 1; to consider the mean of the last 4  |nbsp| weeks the norm, use the value |nbsp| 4. Higher values mean more data is used to define the baseline.

   * - :strong:`Trigger threshold` and :strong:`Clear threshold` (when :strong:`Normal based on` is ``Mean plus standard deviation``)
     - Number >= 0; Clear threshold must be lower than Trigger threshold
     - The number of standard deviations away from the norm required to trigger or clear an alert.

       For example, a trigger value of |nbsp| 3.5 triggers an alert when the values being compared differ by 3.5 standard deviations or more. Higher values result in lower sensitivity and potentially fewer alerts.

       A clear value of |nbsp| 2.5 clears the alert when the values being compared differ by 2.5 standard deviations or less. Higher values result in alerts taking longer to clear.

   * - :strong:`Trigger threshold` and :strong:`Clear threshold` (when :strong:`Normal based on` is ``Mean plus percentage change``)
     - Number between 0 and 100, inclusive; Clear threshold must be lower than Trigger threshold.
     - The percentage change required to trigger or clear the alert.

       For example, a trigger value of |nbsp| 30 triggers an alert when the values being compared differ by 30% or more. Higher values result in lower sensitivity and potentially fewer alerts.

       A clear value of |nbsp| 20 clears the alert when the values being compared differ by 20% or less. Higher values result in alerts taking longer to clear.


   * - :strong:`Ignore historical extremes`
     - ``Yes``, ``No``
     - Only relevant when :strong:`Number of previous cycles` is greater than or equal to |nbsp| 3.

       When :strong:`Normal based on` is ``Mean plus percentage change``, ``Yes`` takes the median of the historical baselines; ``No`` takes their mean.

       When :strong:`Normal based on` is ``Mean plus standard deviation``. ``Yes`` excludes the cycles with largest and smallest mean; ``No`` includes them.

       In general, ``Yes`` is recommended; if there was an incident last week, for example, excluding the associated data from the threshold calculation provides a more accurate representation of "normal" behavior against which to measure the signal.


Further reading
=============================================================================

.. list-table::
   :header-rows: 1
   :widths: 30, 100

   * - :strong:`Parameters`
     - :strong:`Remarks`

   * - Cycle length and Current window
     - Set both parameters to be significantly larger than native resolution.

   * - Current window and native resolution
     - If the ratio of current window to native resolution is small, the rolling standard deviation might be small. In that situation, using ``Mean plus percentage change`` might lead to better results.

   * - Signal
     - The alert condition applies a rolling mean plus standard deviation to the signal, and this might interact poorly with other transformations applied to the signal (for example, can cause double counting or small standard deviations).
