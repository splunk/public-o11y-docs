.. _get-started-retention:

***********************************************************************
Resolution and data retention in Splunk Infrastructure Monitoring
***********************************************************************

.. meta::
	:description: Data points are typically sent to Splunk Infrastructure Monitoring at a regular interval, for example, once every 30 seconds.


In Infrastructure Monitoring, the term resolution refers to data collection intervals called native resolution, or intervals at which data points are displayed on a chart called chart resolution. For more information, see :ref:`data-resolution-rollups-charts`.

.. note::

   The information presented in this topic applies to you only if your organization's subscription plan is based on the number of hosts or metrics that Infrastructure Monitoring is monitoring for you. If your organization uses a data points per minute (DPM) subscription plan based on the rate at which you're sending data points to Splunk Infrastructure Monitoring, see :ref:`dpm-retention`.

.. _native-resolution:

Native resolution
=============================================================================

Data points are typically sent to Infrastructure Monitoring at a regular interval, for example, once every 10  |nbsp| seconds. For data coming in more often than every |nbsp| 10s, the native resolution depends on whether the data point was specified as high-resolution when it was sent to Infrastructure Monitoring.

-  If a data point is specified as high resolution when it is sent to Infrastructure Monitoring, the frequency at which it is being sent (as fine as one second) will be considered as its native resolution. In other words, if you are sending in 1s data, graphs and detectors can display or analyze the data at 1 |hyph| second intervals.

-  For standard resolution data, all metrics arriving more frequently than every 10s will be rolled up to achieve an effective native resolution of 10s.

You can also specify that data points you are sending to Infrastructure Monitoring using the :new-page:`Splunk Infrastructure Monitoring API <https://dev.splunk.com/observability/reference/api/ingest_data/latest>` should be treated as high resolution.

.. _retention:


Rollups, resolution, and data retention policies
=============================================================================

Rollups
----------------------------------------------------------------------------------

When Infrastructure Monitoring receives data points for a given metric time series it stores rollups for each interval. For more information, see :ref:`get-started-metrics`.

-  :strong:`Sum` --- The sum of all the values of the data points received during each interval
-  :strong:`Min` --- The lowest value from among the data points received during each interval
-  :strong:`Max` --- The highest value from among the data points received during each interval
-  :strong:`Count` --- The number of data points received during each interval
-  :strong:`Latest` --- The value of the most recent data point received during each interval
-  :strong:`Delta` --- The value of the delta timing.
-  :strong:`Lag` --- The value of the lag timing.


For example, if Infrastructure Monitoring receives the data point values 40, 50, 30, 10, and 20 (in that order) for a given time series in a 1-minute window, the 1-minute rollups will be stored as shown in the following table.


.. list-table::
   :header-rows: 1

   *  - :strong:`Rollup type`
      - :strong:`Value`
   *  - Sum
      - 150
   *  - Count
      - 5
   *  - Min
      - 10
   *  - Max
      - 50
   *  - Latest
      - 20

.. _resolution:

Resolution
----------------------------------------------------------------------------------

These rollups are retained at different resolutions depending on how long ago the data was received, the subscription plan that was in effect when the data arrived at Infrastructure Monitoring, and whether the data point was specified as high resolution when it was sent to Infrastructure Monitoring.

-  High resolution metrics can be stored at a resolution as fine as 1 |nbsp| second.

-  Standard resolution metrics can be stored at a resolution as fine as 10 |nbsp| seconds.


Retention
----------------------------------------------------------------------------------

Retention period is officially managed in days since the length of each month is different. Therefore, the number of months is only an approximation to the number of days in the actual retention period.

The following table shows how long data is retained at different resolutions.

.. list-table::
   :header-rows: 1

   *  -  :strong:`Resolution`
      -  :strong:`Standard plan`
      -  :strong:`Enterprise or Custom plan`

   *  -  1 second, 10 seconds
      -  8 days
      -  ~3 months (96 days)

   *  -  1 minute, 5 minutes, 1 hour
      -  ~13 months (384 days)
      -  ~13 months (384 days)

For more information on rollups in general, and how they apply to charts and detectors, see :ref:`rollups`.

.. note:: Custom events are retained in the platform for a year.