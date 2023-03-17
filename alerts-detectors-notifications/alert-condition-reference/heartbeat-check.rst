.. _heartbeat-check:

=============================================================================
Heartbeat Check
=============================================================================



.. meta::
  :description: The Heartbeat Check condition alerts when a signal has not reported for some time. This might happen because a host is down or stopped reporting a particular metric.

Heartbeat Check alerts when a signal has not reported for some time. This might happen because a host is down or stopped reporting a particular metric. This condition is often used in tandem with another detector, to ensure that a signal being analyzed is reporting.

.. note:: Only active metric time series are monitored, so this condition doesn't trigger an alert for a host that has never sent a metric. It triggers only if a host has sent metrics and then stops sending metrics.


Examples
============================================================================

You have a detector that alerts you when the minimum number of logins being handled by each host goes below a specified value. If any host stops reporting, that detector isn't triggered if there is a problem. The Heartbeat Check condition notifies you if a host stops reporting.


Settings
=============================================================================


.. list-table::
   :header-rows: 1
   :widths: 30, 30, 70

   * - :strong:`Parameter`
     - :strong:`Values`
     - :strong:`Notes`


   * - :strong:`Hasn't reported for`
     - Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w.
     - How long it's been since the signal last reported. Longer time periods result in lower sensitivity and potentially fewer alerts. If you specify a value for :guilabel:`Group by` (below), how long it's been since any member of the group stopped reporting.

   * - (optional) :strong:`Group by`
     - Dimension or property chosen from dropdown menu
     - Use a dimension or property when you want alerts to be based on a specified unit. For example, if you group by ``cluster``, the alert is triggered only if all hosts in a cluster stop reporting. Alternatively, if each time series is associated with only one host, and you want to be alerted when :strong:`any` host has stopped reporting, leave this parameter blank (or group by ``host``).

Further reading
=============================================================================


.. list-table::
   :header-rows: 1
   :widths: 30, 100

   * - :strong:`Parameters`
     - :strong:`Remarks`

   * - :strong:`Signal (heartbeat metric)`
     - If you want to avoid triggering alerts based on specific conditions (for example, excluding a test realm, or excluding hosts known to have been terminated), apply filters to the signal before configuring the alert condition.

       Make sure that the Extrapolation policy is Null (the default) for all signals that influence the heartbeat metric. If it is not Null, Splunk Infrastructure Monitoring extrapolates values for :ref:`missing data points <missing-datapoints>`, and the alert isn't triggered as expected. Extrapolation policy is specified in the plot configuration panel for each signal. To learn more, see :ref:`plot-config-panel`.

   * - :strong:`Hasn't reported for`
     - To avoid :term:`flappy` alerts that are triggered due to minor, short-lived delays in sending metrics, set this parameter to be significantly larger than the native resolution of the signal (how often the signal is reporting). For example, if the signal reports once a minute, setting this parameter to 10 |nbsp| minutes means that the alert isn't triggered until 10 |nbsp| data points have not reported.


