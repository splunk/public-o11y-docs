.. _detector-options:

************************************
Detector options
************************************



.. meta::
  :description: How to set detector options in the Options tab.

The Options tab lets you specify some of the same settings that are available in the :ref:`Chart Options tab<chart-options-tab>` of a chart.


Show events as lines
=======================

.. if text is changed here, also change it in :ref:`event-lines`

Specifies whether vertical lines are displayed at times where event markers are shown.


Show data markers
========================

.. if text is changed here, also change it in :ref:`show-markers`

Specifies whether small dots are displayed on the chart, indicating the times at which there are data points.


Delay settings
====================

Detectors in Splunk Observability Cloud run on a regular time interval, known as the detector resolution. Each time a detector runs, it evaluates its condition to determine if an alert will be fired.

Because many metric time series (MTS) can be included in a single detector, the analytics engine keeps track of the lag for known MTS, attempting to make sure that the all known MTS will be included. While most MTS have little delay, a detector evaluate its condition up to 15 minutes late if data points are regularly delayed.

It is best practice to let the engine determine the time to run the computation, but you can also control the delay manually with :strong:`Min Delay` and :strong:`Max Delay` settings.


.. _min-delay-detectors:

Min Delay
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :strong:`Min Delay` parameter specifies the minimum amount of time that the analytics engine must wait for data to arrive for a specific detector. 

For example, if you set :strong:`Min Delay` to 2 minutes, the computation waits for at least 2 minutes even if all the data points arrive on time with no delay. Because the detector will wait a minimum of 2 minutes whether the data arrives on time or not, you are prioritizing correctness over real-time alerting. :strong:`Min Delay` is most useful in cases of delayed new MTS or sparsely emitting MTS for the detector compared to the existing set of MTS being computed on.

By default, :strong:`Min Delay` is set to ``0``, which means the analytics engine does not have to wait to run the computation.

You can only configure :strong:`Min Delay` using the API. For more information, see the :new-page:`Detectors API reference <https://dev.splunk.com/observability/reference/api/detectors/latest>`.

.. _max-delay-detectors:

Max Delay
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :strong:`Max Delay` parameter specifies the maximum amount of time that the analytics engine can wait for data to arrive for a specific detector.

For example, if :strong:`Max Delay` is set to 5 minutes, the detector will wait for only a maximum of 5 minutes even if some data points have not arrived.

By default, :strong:`Max Delay` is set to ``Auto``, allowing the analytics engine to determine the appropriate amount of time to wait for data points. With :strong:`Max Delay` set to ``Auto``, the analytics engine will accommodate most data by adopting the maximum observed delay. :strong:`Max Delay` is most useful in cases where there might be occasional momentary delay of some data points.

You can permanently override the default setting for a detector by setting a :strong:`Max Delay` value in the :strong:`Detector Options` tab or using the API. For more information, see the :new-page:`Detectors API reference <https://dev.splunk.com/observability/reference/api/detectors/latest>`.


Disable chart display sampling
================================

.. if text is changed here, also change it as necessary in :ref:`chart-sampling`

In cases where a large number of time series are displayed, for example, if you choose a metric being reported by 500 servers, Splunk Infrastructure Monitoring samples a subset of those time series so the chart will render more quickly. The sampled display provides you with an approximate sense of the values in those time series. If you disable sampling, any time series data that were previously omitted will be shown. Depending on the number of time series, disabling sampling might cause the chart to render more slowly.

The detector is still triggered as configured, regardless of the number of time series displayed on the chart.



.. _detector-cal-time-zone:

Calendar time zone
=====================

The :ref:`time zone<cal-window-time-zone>` used for aligning data timestamps and interpreting calendar cycles in analytics functions that perform  :ref:`calculations over calendar windows<calendar-window>`. All such functions in a chart use the same calendar time zone. The value set here can also be viewed and changed while editing any calendar window function in the chart builder. This option has no effect if there are no functions using calendar windows.
