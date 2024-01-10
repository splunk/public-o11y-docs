.. _custom-threshold:

=============================================================================
Custom threshold
=============================================================================



.. meta::
  :description: This alert condition lets you trigger an alert by comparing one signal to another or by evaluating multiple conditions


Custom Threshold lets you trigger an alert by comparing one signal to another or by evaluating multiple conditions. Use Custom Threshold if you want to create a detector that maps to one of the following patterns:

-  You want to see an alert if one signal meets a condition based on the value of another signal
-  You want to specify compound conditions using AND and OR operators, based on the value of one signal
-  You want to specify compound conditions using AND and OR operators, based on the values of multiple signals

Compound conditions
=============================================================================

When you are on the Alert Settings tab, you can select :guilabel:`Add another condition` to create a compound condition using AND and OR operators. You can add a total of 10 |nbsp| conditions.

When specifying compound conditions, AND conditions are applied before OR conditions. To ensure that the conditions are evaluated as required, you can select options from a condition's Actions menu (|more|) to arrange them into the appropriate order. You can also remove a condition from a condition's Actions menu (|more|).

.. note:: For a compound condition to trigger an alert, all the values involved in the condition must be non-null.

If you need to build more complex conditions than this alert condition supports, such as "a AND (b OR c) AND d", or "a AND NOT b", you can do so by using the :new-page:`Splunk Observability Cloud API <https://dev.splunk.com/observability/docs/detectors/detectors_events_alerts#Detectors>` to create the detector. 


.. _compare-signals:

Examples: Single condition, comparing signals
-------------------------------------------------------------------

-  You want to receive an alert when the number of ``cache-misses`` is higher than the number of ``cache-hits`` for 1 |nbsp| minute. In this case,  use ``cache-misses`` as the signal to monitor, ``Above`` as the option for :guilabel:`Alert when`, ``cache-hits`` as the threshold, and a ``Duration`` of |nbsp| 1 |nbsp| minute as the option for :guilabel:`Trigger sensitivity`.

-  You have 3 signals, each of which measures maximum latency for a single AWS availability zone. You have had problems with one of the zones in the past, and you want to receive an alert when that signal is outside the range of the other 2 |nbsp| signals. In this case, use the troublesome zone as the signal to monitor,  ``Out of range`` as the option for :guilabel:`Alert when`, and the other two signals for the lower and upper thresholds.

.. _compound-single:

Example: Compound conditions, monitoring a single signal
-------------------------------------------------------------------

The following example shows how you might build compound conditions while monitoring a single signal. 

You have 2 signals (A and B); |nbsp| A |nbsp| measures available memory in prod and |nbsp| B |nbsp| measures available memory in lab. You want to receive an alert:

-  if available memory in prod is lower than available memory in lab, or 
-  if available memory in prod is less than 50%
   
In this case, monitor a single signal (A, |nbsp| available memory in prod) and then set the following conditions:
   
-  alert when signal A is less than B  OR
-  signal A is less than 50


.. _compound-multiple:

Examples: Compound conditions, monitoring multiple signals
-------------------------------------------------------------------

The following examples show how you might build compound conditions while monitoring multiple signals.

-  You have 3 signals (A, B, and C), each of which measures available memory in a particular environment (prod, lab, or dev respectively). You want to receive an alert:

   -  if available memory in prod is less than 70%, or
   -  if available memory in lab and in dev are less than 70%
   
   In this case, monitor multiple signals and then set the following conditions:
   
   -  alert when signal A is less than 70  OR
   -  signal B is less than 70  AND
   -  signal C is less than 70

   .. note:: AND conditions are always evaluated before OR conditions. 

-  In your organization, one group is responsible for monitoring the health of a cluster while another monitors the health of individual nodes. You don't want to trigger alerts for individual nodes when the cluster itself is unhealthy.

   Assuming A is a metric for cluster health and B is a metric for node health, you can create two detectors:

   -  One detector monitors signal A and triggers alerts when A is unhealthy.
   
   -  Another detectors monitors multiple signals, and has the following conditions:
   
      -  alert when A is healthy AND 
      -  B is unhealthy

   

Settings
=============================================================================

.. list-table::
   :header-rows: 1
   :widths: 30, 30, 70

   * - :strong:`Parameter`
     - :strong:`Values`
     - :strong:`Notes`

   * - :guilabel:`Alert when`
     - ``Above``, ``Below``, ``Out of Range``, ``Within Range``
     - none


   * - :guilabel:`Threshold, Lower threshold, Upper threshold`

     - ``Static value`` (see :ref:`static-threshold` for acceptable values) or another signal.
     - ``Static value`` is designed to be used as an option when you use the ``Out of Range`` or ``Within Range`` settings. For example, you might want to receive an alert when the signal is between the value of another signal and a static value of 80. Using a static value with ``Above`` or ``Below`` is the same as using the Static Threshold condition.

   * - :guilabel:`Trigger sensitivity`
     - ``Immediately``, ``Duration``, ``Percent of duration``

     - ``Immediately`` triggers an alert as soon as the threshold is met.

       ``Duration`` triggers when the signal meets and remains at threshold condition for a specified period, such as 10 minutes. If it is normal for a signal to rise and fall rapidly, using this option reduces :term:`flappiness<flappy>`. For an alert to trigger with this option, there can be no missing data points during the duration. For more information, see :ref:`duration-custom`.

       ``Percent of duration`` triggers based on the number of data points that met the threshold during the specified duration. For more information, see :ref:`duration-custom`.


   * - :guilabel:`Duration`
     - Integer >= 1, followed by time indicator (s, m, h, d, w), e.g. 30s, 10m, 2h, 5d, 1w
     - The amount of time the signal must meet the threshold condition. Longer time periods result in lower sensitivity and potentially fewer alerts.


   * - :guilabel:`Percent of duration`
     - Percentage: Integer between 1 and 100; Duration: Integer >= 1, followed by time indicator (s, m, h, d, w), e.g. 30s, 10m, 2h, 5d, 1w
     - The percentage of times the threshold was met during the specified duration.


.. _duration-custom:

Duration to trigger an alert
=============================================================================


As you might expect, choosing ``Immediately`` for :guilabel:`Trigger Sensitivity` means that an alert is triggered as soon as the signal meets the threshold. This option is the most sensitive (might trigger the most alerts) of the three trigger sensitivity options.

Depending on the nature of your signal, triggering alerts immediately can lead to :term:`flappiness<flappy>`. In these cases, you can choose one of the other options, :ref:`Duration<duration-option>` or :ref:`Percent of duration<pct-duration-option>`.


.. _duration-option:


The ``Duration`` option triggers when the signal meets and remains at threshold condition for a specified period, such as 10 minutes. Therefore, using this option is less sensitive (might trigger fewer alerts) than the ``Immediately`` option. If you use this option, an alert isn't triggered if any data points are delayed or do not arrive at all during that time range, even if all the data points that are received :strong:`do` meet the threshold. For more information about delayed or missing data points, see :ref:`delayed-missing`.

If you want an option that triggers even if some data points do not arrive on time, use ``Percent of duration`` (with a percentage less than |nbsp| 100).

.. _pct-duration-option:

The ``Percent of duration`` option triggers alerts based on the number of data points that met the threshold during the window, compared to how many data points were expected to arrive. Because this option triggers an alert based on the percentage of data points that met the threshold, it can sometimes trigger an alert even if some data points didn't arrive on time. Therefore, using this option with a percentage less than |nbsp| 100 is more sensitive (might trigger more alerts) than the ``Duration`` option.


The following examples illustrate how alerts are triggered in various situations.

Example 1
-------------------------------------------------------------------

-  Option you specify for :strong:`Trigger Sensitivity`: Duration = 3 minutes

-  Resolution of the signal: 5 seconds

-  Number of data points expected in 3 minutes: 12 |nbsp| per |nbsp| minute |nbsp| * |nbsp| 3 minutes (36)

-  Number of anomalous data points (how many times the threshold must be met) to trigger alert: 36



   .. list-table::
      :header-rows: 1

      * - :strong:`Total data points expected`
        - :strong:`Total data points received`
        - :strong:`Anomalous data points required`
        - :strong:`Anomalous data points received`
        - :strong:`Alert is triggered?`

      * - 36
        - 36
        - 36
        - 36
        - Yes

      * - 36
        - 36
        - 36
        - 35 or fewer
        - No

      * - 36
        - 35
        - 36
        - 35 or fewer
        - No



Example 2
-------------------------------------------------------------------


-  Option you specify for :strong:`Trigger Sensitivity`: Percent of Duration = 75% of 3 |nbsp|  minutes

-  Resolution of the signal: 5 seconds

-  Number of data points expected in 3 minutes: 12 |nbsp| per |nbsp| minute |nbsp| * |nbsp| 3 minutes (36)

-  Number of anomalous data points (how many times the threshold must be met) to trigger alert: 75% of 36 (27)



   .. list-table::
      :header-rows: 1

      * - :strong:`Total data points expected`
        - :strong:`Total data points received`
        - :strong:`Anomalous data points required`
        - :strong:`Anomalous data points received`
        - :strong:`Alert is triggered?`

      * - 36
        - 36
        - 27
        - 27-36
        - Yes

      * - 36
        - 30
        - 27
        - 27-30
        - Yes

      * - 36
        - 30
        - 27
        - 26 or fewer
        - No

   Note that in the last example above, even if 26 anomalous data points arrive, and 26/30 is greater than the |nbsp| 75% you specified, the required number of anomalous data points (27) did not arrive. Therefore, the alert isn't triggered. The percent you specify represents percent of :strong:`expected` data points, not percent of :strong:`received` data points.




.. design https://xd.adobe.com/view/5d6af68f-9282-4d98-b7c3-d1a0e21f6069/
