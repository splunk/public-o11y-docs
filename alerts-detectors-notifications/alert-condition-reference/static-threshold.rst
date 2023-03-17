.. _static-threshold:

=============================================================================
Static Threshold
=============================================================================



.. meta::
  :description: The Static Threshold condition alerts when a signal goes above or below a static threshold, or is within or outside of a range.

Static Threshold alerts when a signal goes above or below a static threshold, or is within or outside of a range. Use this condition when you need to be alerted based on fixed values, as opposed to trends (for which you can use the :ref:`sudden-change` and :ref:`resource-running-out` conditions) or comparisons with past behavior (for which you can use :ref:`hist-anomaly`). This condition works best with metrics that have a static range of "good" and "bad" values.

To compare one signal with another, use :ref:`custom-threshold`.

Examples
=============================================================================

-  You have an availability SLA of 99.9, and want to be alerted whenever your availability drops below that value.

-  You have a latency signal with a "healthy" range between 200 |nbsp| and 300 |nbsp| ms, and want to be alerted when it falls outside that range.


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
     -

   * - :guilabel:`Threshold`

       :guilabel:`Lower threshold, Upper threshold`

     - Number

     - Lower and upper thresholds are available if you choose ``Out of Range`` or ``Within Range`` for :guilabel:`Alert when`.

       For ``Alert when``, if you select ``Out of Range`` or ``Within Range``, you can enter a number for :guilabel:`Lower threshold` and :guilabel:`Upper threshold`.

       For ``Within Range``, the threshold values you provide are inclusive ( >= and <= ).

       For ``Out of Range``, the threshold values you provide are exclusive ( > and < ).

   * - :guilabel:`Trigger sensitivity`

     - ``Immediately``, ``Duration``, ``Percent of duration``

     - ``Immediately`` triggers an alert as soon as the threshold is met.

       ``Duration`` triggers when the signal meets and remains at threshold condition for a specified period, such as 10 minutes. If it is normal for a signal to rise and fall rapidly, using this option reduces :term:`flappiness<flappy>`. If this option is used, an alert will *not* trigger if there are any missing data points during the duration. For more information, see :ref:`duration-static`.

       ``Percent of duration`` triggers based on the number of data points that met the threshold during the specified duration. For more information, see :ref:`duration-static`.


   * - :guilabel:`Duration`
     - Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w.
     - The amount of time the signal must meet the threshold condition. Longer time periods result in lower sensitivity and potentially fewer alerts.


   * - :guilabel:`Percent of duration`
     - Percentage: Integer between 1 and 100; Duration: Integer >= 1, followed by time indicator (s, m, h, d, w). For example, 30s, 10m, 2h, 5d, 1w.
     - The percentage of anomalous data points received during the specified duration.


.. _duration-static:

Duration to trigger an alert
=============================================================================

As you might expect, choosing ``Immediately`` for :guilabel:`Trigger Sensitivity` means that an alert will be triggered as soon as the signal meets the threshold. This option is the most sensitive (might trigger the most alerts) of the three trigger sensitivity options.

Depending on the nature of your signal, triggering alerts immediately can lead to :term:`flappiness<flappy>`. In these cases, you can choose one of the other options, :ref:`Duration<duration-option>` or :ref:`Percent of duration<pct-duration-option>`.


.. _duration-option:

The ``Duration`` option triggers when the signal meets and remains at threshold condition for a specified period, such as 10 minutes. Therefore, using this option is less sensitive (might trigger fewer alerts) than the ``Immediately`` option. If you use this option, an alert isn't triggered if any data points are delayed or don't arrive at all during that time range, even if all the data points that are received :strong:`do` meet the threshold. For more information about delayed or missing data points, see :ref:`delayed-missing`.

If you want an option that triggers even if some data points do not arrive on time, use ``Percent of duration`` (with a percentage below |nbsp| 100).

.. _pct-duration-option:

The ``Percent of duration`` option triggers alerts based on the number of data points that met the threshold during the window, compared to how many data points were expected to arrive. Because this option triggers an alert based on the percentage of data points that met the threshold, it can sometimes trigger an alert even if some data points didn't arrive on time. Therefore, using this option with a percentage below |nbsp| 100 is more sensitive (might trigger more alerts) than the ``Duration`` option.

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


-  Option you specify for :strong:`Trigger Sensitivity`: Percent of Duration = 75% of 3 |nbsp| minutes

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


API usage note
=============================================================================

If you use the Splunk Observability Cloud API to build detectors, you can use the ``const()`` function to specify different threshold values for different dimension values. For example, you might have different acceptable SLA values depending on whether a host is in dev, lab, or production. Using the ``const()`` function can be more efficient than manually building multiple detectors or detectors with multiple rules. For more information, see the section on creating multiple time series in the :new-page:`Splunk Observability Cloud API documentation <https://dev.splunk.com/observability/docs/signalflow/functions/const_function/>`.
