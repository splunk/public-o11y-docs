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


Max delay
====================

By default, the :strong:`Max delay` field is set to ``Auto``, which allows data to come in with as little delay as possible.

If you know that some of your data is delayed and you want to wait for that data to arrive before your charts are updated, click the drop-down menu and choose a new value from the list. For more information, see :ref:`delayed-datapoints`.

Disable chart display sampling
================================

.. if text is changed here, also change it as necessary in :ref:`chart-sampling`

In cases where a large number of time series would be displayed, for example, if you choose a metric being reported by 500 servers, Splunk Infrastructure Monitoring samples a subset of those time series so the chart will render more quickly. The sampled display provides you with an approximate sense of the values in those time series. If you disable sampling, any time series data that were previously omitted will be shown. Depending on the number of time series, disabling sampling may cause the chart to render more slowly.

The detector is still triggered as configured, regardless of the number of time series displayed on the chart.



.. _detector-cal-time-zone:

Calendar time zone
=====================

The :ref:`time zone<cal-window-time-zone>` used for aligning data timestamps and interpreting calendar cycles in analytics functions that perform  :ref:`calculations over calendar windows<calendar-window>`. All such functions in a chart use the same calendar time zone. The value set here can also be viewed and changed while editing any calendar window function in the chart builder. This option has no effect if there are no functions using calendar windows.
