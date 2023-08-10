.. _sys-limits:

********************************************************
System limits for Splunk Infrastructure Monitoring
********************************************************

.. meta::
   :description: This topic describes the Splunk Infrastructure Monitoring limits for incoming data,
    number of charts or detectors, and other features.

Splunk Infrastructure Monitoring has system limits that help ensure good performance, stability, and reliability. These limits also protect the Infrastructure Monitoring multitenant environment. Exceeding these limits might degrade your Infrastructure Monitoring experience. 

To help you avoid problems when you use Infrastructure Monitoring, consider the system limit information presented in this
document, which includes the following:

* The name and value of each system limit
* If available, the organization metrics associated with the limit
* The impact you observe when you exceed the limit.

The first section in this topic contains tables of limit names and values, organized by product area. Each entry in the table shows the name of the limit and its default value. The
limit name is also a link to more information about the limit.

There are several out-of-the-box charts in Splunk Observability Cloud for the metrics described below. Admins can view these charts by navigating to :guilabel:`Settings > Organization Overview`.

The first table in the section lists the most important limits to consider.

Abbreviations
================================================================================

This documentation uses the following initialisms:

* Metric time series (MTS)
* Active MTS (AMTS)
* Inactive MTS (IMTS)
* Event time series (ETS)
* Data points per minute (DPM)

Limit summaries
================================================================================

The following tables summarize limits for these product areas:

* :ref:`important-limits`
* :ref:`charts-detectors-and-signalflow-limits`
* :ref:`data-ingestion-limits`
* :ref:`mts-metadata-limits`
* :ref:`subscription-limits`
* :ref:`web-app-limits`
* :ref:`other-limits`

.. _important-limits:

Important limits
-------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`

   * - :ref:`amts-limit`
     - Determined by your subscription

   * - :ref:`maximum-number-of-detectors-per-org`
     - 1,000

   * - :ref:`maximum-number-of-mts-allowed-per-chart-data-function`
     -
       - 10,000 for standard subscriptions
       - 30,000 for enterprise subscriptions

   * - :ref:`maximum-number-of-mts-per-detector-data-function`
     -
       - 10,000 for standard subscriptions
       - 30,000 for enterprise subscriptions

   * - :ref:`mts-creations-per-minute-limit`
     - 6,000 or determined by your subscription

   * - :ref:`number-of-input-mts-per-job`
     - 250,000

.. _charts-detectors-and-signalflow-limits:

Charts, detectors, and SignalFlow limits
-------------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`

   * - :ref:`maximum-alerts-rate`
     -

       - 10,000 alerts/minute for a detector with resolution smaller or equal to 1 minute
       - 20,000 or (job resolution/1m)*10,000)) for a detector with resolution larger than 1 minute, whichever is smaller 

   * - :ref:`maximum-max-delay-setting-for-signalflow-programs`
     - 15 min

   * - :ref:`maximum-min-delay-setting-for-signalflow-programs`
     - 15 min

   * - :ref:`maximum-number-of-active-alerts-per-detector`
     - 200,000

   * - :ref:`maximum-number-of-allocated-datapoints-per-signalflow-program`
     - 60,000,000

   * - :ref:`maximum-number-of-data-graphite-functions-per-signalflow-program`
     - 200

   * - :ref:`maximum-number-of-derived-mts-per-signalflow-program`
     - 500,000

   * - :ref:`maximum-number-of-detectors-per-org`
     - 1,000

   * - :ref:`maximum-number-of-functions-and-methods-per-signalflow-program`
     - 1,000

   * - :ref:`maximum-number-of-mts-allowed-per-chart-data-function`
     -

       - 10,000 for standard subscriptions
       - 30,000 for enterprise subscriptions

   * - :ref:`maximum-number-of-mts-analyzed-across-all-signalflow-programs`
     - The larger of 10,000,000 AMTS or 20% of your total AMTS.

   * - :ref:`maximum-number-of-mts-per-detector-data-function`
     -

       - 10,000 for standard subscriptions
       - 30,000 for enterprise subscriptions

   * - :ref:`maximum-number-of-prefix-wildcards-per-filter-function`
     - 150

   * - :ref:`maximum-number-of-query-arguments-in-a-filter-function`
     - 256

   * - :ref:`maximum-number-of-wildcards-per-filter-function`
     - 35

   * - :ref:`maximum-signalflow-program-stack-size`
     - 64

   * - :ref:`maximum-signalflow-program-text-size`
     - 50,000

   * - :ref:`maximum-signalflow-programs-per-minute`
     - 1,000 SignalFlow programs per minute

   * - :ref:`number-of-input-mts-per-job`
     - 250,000

   * - :ref:`maximum-number-of-signalflow-jobs-per-org`
     - 5,000 per minute

   * - :ref:`maximum-number-of-signalflow-jobs-per-connection`
     - 300

.. _data-ingestion-limits:

Data ingestion limits
------------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`
   * - :ref:`new-dimension-or-property-key-name-limit`
     - 40 per week

   * - :ref:`events-per-minute`
     - Determined by your subscription

   * - :ref:`mts-creations-per-minute-limit`
     - 6,000 or determined by your subscription

   * - :ref:`mts-creations-per-hour-limit`
     - 60 times your MTS per minute limit

   * - :ref:`mts-creations-burst-per-minute-limit`
     - 10 times your MTS per minute limit, with a maximum of 20 minutes worth of bursting capacity in an hour.

   * - :ref:`maximum-number-of-api-calls-per-minute`
     - 100,000

.. _mts-metadata-limits:

MTS metadata limits
----------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`

   * - :ref:`dimensionmetric-value-length`
     - 256

   * - :ref:`number-of-properties-per-dimension`
     - 75

   * - :ref:`number-of-tags-per-dimension`
     - 50

   * - :ref:`number-of-dimensions-per-mts`
     - 36

   * - :ref:`maximum-dimension-name-length`
     - 128

.. _subscription-limits:

Subscription limits
----------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`

   * - :ref:`amts-limit`
     - Determined by your subscription

   * - :ref:`burst-dpm-limit`
     - Multiples of entitlement

   * - :ref:`bundled-mts-limit`
     - Determined by your subscription

   * - :ref:`container-burstoverage-limit`
     - Multiples of entitlement

   * - :ref:`container-entitlement`
     - Set by your contract entitlement

   * - :ref:`contract-dpm-limit`
     - Set by your contract entitlement

   * - :ref:`custom-mts-burstoverage-limit`
     - Multiples of entitlement

   * - :ref:`custom-mts-entitlement`
     - Set by your contract entitlement

   * - :ref:`high-resolution-custom-metrics-burstoverage-limit`
     - Multiples of entitlement

   * - :ref:`high-resolution-custom-metrics-entitlement`
     - Set by your contract entitlement

   * - :ref:`host-burstoverage-limit`
     - Multiples of entitlement

   * - :ref:`host-entitlement`
     - Contract entitlement

   * - :ref:`imts-limit`
     - Determined by your subscription

.. _web-app-limits:

Web app limits
-----------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`
    
   * - :ref:`email-address-invitations-per-minute`
     - 1
   
   * - :ref:`organization-invitations-per-day`
     - 5,000

   * - :ref:`maximum-number-of-dashboards-you-can-retrieve`
     - 20,000

   * - :ref:`maximum-rendered-mts-for-area-or-stacked-column-visualizations`
     - 500

   * - :ref:`maximum-rendered-MTS-for-column-chart-visualizations`
     - 20

   * - :ref:`maximum-rendered-mts-for-line-histogram-or-heatmap-visualizations`
     - 1,000

.. _other-limits:

Other limits
---------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`
   * - :ref:`timeserieswindow-api-datapoint-limit`
     - 1,000,000

Limit details
================

This section provides details about each Infrastructure Monitoring system limit.

.. _email-address-invitations-per-minute:

Email address invitations per minute
---------------------------------------------------------------------------------------

  * :strong:`Default limit value`: 1
  * :strong:`Notes`: You can only invite an email address to an organization once within one minute. If you try to invite the same email address multiple times in one minute, the UI returns an error, and you must wait at least one minute before sending another invitation.

.. _organization-invitations-per-day:

Organization invitations per day 
----------------------------------------------------------------------------------------

  * :strong:`Default limit value`: 5,000
  * :strong:`Notes`: You can only send 5,000 invitations for an organization within 24 hours. If you exceed this limit, the UI returns an error, and you must wait at least one day before sending another invitation.

.. _maximum-number-of-dashboards-you-can-retrieve:

Maximum number of dashboards you can retrieve
------------------------------------------------

   * :strong:`Default limit value`: 20,000
   * :strong:`Notes`: Maximum number of dashboards you can retrieve per query using either the UI or the API. If you reach this limit, you receive an error.
   * :strong:`Customer impact`: When you exceed this limit, the user interface displays the error message "Unexpected error has occurred". After you exceed the limit, the dashboards page stops displaying dashboards.

.. _dashboard-group-links-per-team:

.. _number-of-input-mts-per-job:

Number of input MTS per job
------------------------------------------------

   * :strong:`Default limit value`: 250,000
   * :strong:`Notes`: Maximum number of input MTS per job. When you use the same MTS multiple times in a job, each use counts towards the maximum.
   * :strong:`Customer impact`: If the job is for a chart, the chart doesn't load and you receive an error message. If the job is for a detector, the system aborts the job. You can monitor aborted detector SignalFlow programs using a built-in metric. Your organization also receives an event with information about the detector that aborted. Your job might reach this limit after it starts. A chart might initially load, but fail when its SignalFlow job aborts.

.. _maximum-number-of-derived-mts-per-signalflow-program:

Maximum number of derived MTS per SignalFlow program
-------------------------------------------------------

   * :strong:`Default limit value`: 500,000
   * :strong:`Notes`: Maximum number of derived MTS per SignalFlow program, where derived MTS are temporary MTS that a SignalFlow function or method has to maintain in memory. For example, if there are 20,000 MTS for the metric ``jvm.load``, and each MTS comes from a unique host, then ``"data('jvm.load').sum(by=['host']).publish()"`` tracks 40,000 derived MTS. The ``data()`` SignalFlow function or method uses 20,000, and the ``sum()`` uses another 20,000. The number of input MTS is still 20,000.
   * :strong:`Customer impact`: If the SignalFlow program is for a chart, the chart doesn't load and you receive an error message. If the SignalFlow program is for a detector, the system aborts the program. You can monitor aborted detector SignalFlow programs using a built-in metric. Your organization also receives an event with information about the detector that aborted. Your SignalFlow program might reach this limit after it starts. A chart might initially load, but fail when its SignalFlow program aborts.

.. _maximum-number-of-mts-allowed-per-chart-data-function:

Maximum number of MTS allowed per chart data() function
----------------------------------------------------------

   * :strong:`Default limit value`:

     - 10,000 for standard subscriptions
     - 30,000 for enterprise subscriptions
   * :strong:`Notes`: If you're using Enterprise Edition, this limit is 30,000. You can have the limit set higher depending on your subscription. To have your limit changed, contact sales or customer support.
   * :strong:`Customer impact`: If you exceed the limit, the system only keeps the most recently created MTS, based on the MTS creation timestamps. This might result in inaccurate computations.

.. note::
  For a chart that is unavailable for autosharding, this limit is 10,000. A chart becomes unavailable for autosharding when:

  - It has been manually sharded using the ``partition_filter()`` function.
  - It uses one of the following functions: ``percentile()``, ``mean_plus_stddev()``, ``median()``, ``stddev()``, ``variance()``, ``sample_stddev()``, ``sample_variance()``, ``ewma()``, ``double_ewma()``, ``kpss()``, ``union()``.

.. _maximum-number-of-mts-per-detector-data-function:

Maximum number of MTS per detector data() function
----------------------------------------------------

   * :strong:`Default limit value`:

     - 10,000 for standard subscriptions
     - 30,000 for enterprise subscriptions
   * :strong:`Notes`: If you're using Enterprise Edition, this limit is 30,000. You can have the limit set higher depending on your subscription. To have the limit changed, contact sales or customer support.
   * :strong:`Customer impact`: If you exceed the limit, the system only keeps the most recently created MTS, based on the MTS creation timestamps. Detectors might not trigger, or they might trigger incorrectly.

.. note::
  For a detector that is unavailable for autosharding, this limit is 10,000. A detector becomes unavailable for autosharding when:
  
  - It has been manually sharded using the ``partition_filter()`` function.
  - It uses one of the following functions: ``percentile()``, ``mean_plus_stddev()``, ``median()``, ``stddev()``, ``variance()``, ``sample_stddev()``, ``sample_variance()``, ``ewma()``, ``double_ewma()``, ``kpss()``, ``union()``.

.. _maximum-number-of-active-alerts-per-detector:

Maximum number of active alerts per detector
--------------------------------------------------------------------

   * :strong:`Default limit value`: 200,000
   * :strong:`Notes`: Maximum number of active alerts you can have for a detector.
   * :strong:`Customer impact`: Once you reach this limit, Splunk Infrastructure Monitoring aborts the detector and deletes all active alerts. To avoid hitting this limit, configure autoclear on your detectors to clear active alerts based on defined thresholds. To learn more, see :ref:`auto-clearing-alerts`.

.. note:: When you update or delete a detector, Observability Cloud stops the SignalFlow program associated with the detector and sends a stop notification to all the recipients currently configured for the detector. If the detector has a large number of recipients or a large number of alerts, sending the notification causes a flood of notifications. Your first reaction might be to delete the detector, but that might cause additional problems.
 
  If your detector has a large number of recipients or a large number of alerts, do the following:

  * To update the detector, first mute its alerts. You can unmute them when you’re finished editing. To learn more about muting alerts, see :ref:`rule-from-alerts-page`.
  * To delete the detector, first delete all its recipients. To learn more about deleting recipients, see :ref:`remove-recipients`.

.. _maximum-alerts-rate:

Maximum alert rate per detector
--------------------------------------------------------------------

   * :strong:`Default limit value`: 
      - 10,000 alerts/minute for a detector with resolution smaller or equal to 1 minute
      - 20,000 or (job resolution/1m)*10,000)) for a detector with resolution larger than 1 minute, whichever is smaller 
   * :strong:`Notes`: Maximum alert rate limits the maximun amount of alerts a detector can fire within the job resolution.
   * :strong:`Customer impact`: When the detector exceeds this limit, it's aborted. For example: 
      - If a detector runs at a 30-second resolution, it can fire at most 10,000 alerts within a minute. 
      - If a detector runs at a 2-minute resolution, it can fire at most 20,000 alerts within 2 minutes. 
      - If a detector runs at 5-minute resolution, it can fire at most 20,000 alerts within 5 minutes.

.. _maximum-number-of-allocated-datapoints-per-signalflow-program:

Maximum number of allocated data points per SignalFlow program
--------------------------------------------------------------------

   * :strong:`Default limit value`: 60,000,000
   * :strong:`Notes`: Total number of data points a SignalFlow program must buffer to satisfy time window transformations. This is at least the number of input MTS, but if the SignalFlow has a time window calculation, the actual value might be much more. For example, a sum over 1m at 1s resolution requires 60 data points per MTS. If the SignalFlow has 10,000 MTS and only one window transform, the SignalFlow needs 10,000*60=600,000 data points.
   * :strong:`Customer impact`: If the SignalFlow program is for a chart, the chart doesn't load and you receive an error message. If the SignalFlow program is for a detector, the system aborts the SignalFlow program. You can monitor aborted detector SignalFlow programs using a built-in metric. Your organization also receives an event with information about the detector that aborted. Your SignalFlow program might reach this limit after it starts. A chart might initially load, but fail when its SignalFlow exceeds reaches the limit.

.. _maximum-number-of-functions-and-methods-per-signalflow-program:

Maximum number of functions and methods per SignalFlow program
-----------------------------------------------------------------

   * :strong:`Default limit value`: 1,000
   * :strong:`Notes`: The SignalFlow program ``"A = data().sum(by="az").sum().publish()"`` has 4 functions and methods (data, sum, sum, publish).
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't start. You immediately get an error message.

.. _maximum-number-of-data-graphite-functions-per-signalflow-program:

Maximum number of queries per SignalFlow program
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 200
   * :strong:`Notes`: Maximum number of queries you can have in a SignalFlow program used in a chart or detector. Queries that count toward this limit include ``data()``, ``graphite()``, ``events()``, and ``alerts()``. Using a ``timeshift()`` function on a stream causes all the queries for that stream to run again and increases the total number of queries in the program. For example, in the following program, queries A and B run again to retrieve data for D.
     
   .. code-block::

    A = data('jvm.a').publish('A')
    B = data('jvm.b').publish('B')
    C = data('jvm.c').publish('C')
    D = union(A, B).timeshift('1h').publish('D')

   * :strong:`Customer impact`: SignalFlow programs which violate the limit can't start. You immediately get an error message. This limit puts limit on how many ``detect()`` calls you can use if you use different ``data()`` or ``graphite()`` calls in the ``detect()``.

.. _maximum-signalflow-program-stack-size:

Maximum SignalFlow program stack size
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 64
   * :strong:`Notes`: A SignalFlow function can't recursively call itself more than this limit.

.. _maximum-number-of-mts-analyzed-across-all-signalflow-programs:

Maximum number of MTS analyzed across all SignalFlow programs
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: The larger of 10,000,000 AMTS or 20% of your total AMTS.
   * :strong:`Notes`: Maximum number of MTS that can concurrently use SignalFlow programs in your organization, including detector chart SignalFlow. For example, suppose you open 10 charts and keep them open. If each chart uses on average 5,000 MTS, you're using 50,000 MTS, even if each chart looks at the same 5,000 MTS. If you close the charts, your usage goes to zero. Detector SignalFlow programs are always running, so they always use a portion of your MTS usage limit. This limit only applies to streaming SignalFlow programs, not ones that look at historical data.
   * :strong:`Customer impact`: If the SignalFlow program is for a chart, the chart doesn't load and you receive an error message. If the SignalFlow program is for a detector, the system aborts the program. You can monitor aborted detector SignalFlow programs using a built-in metric. Your organization also receives an event with information about the detector that aborted. Your SignalFlow program might reach this limit after it starts. A chart might initially load, but fail when the program reaches the limit.

.. _maximum-max-delay-setting-for-signalflow-programs:

Maximum max delay setting for SignalFlow programs
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 15 min
   * :strong:`Notes`: The maximum allowed max delay value that you can set for a SignalFlow program. Higher values aren't allowed, because they cause SignalFlow programs to use too much memory when data is slow to arrive.
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't start. You immediately get an error message.

.. _maximum-min-delay-setting-for-signalflow-programs:

Maximum min delay setting for SignalFlow programs
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 15 min
   * :strong:`Notes`: The maximum allowed min delay value that you can set for a SignalFlow program. Higher values aren't allowed, because they cause SignalFlow programs to use too much memory when data is slow to arrive.
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't start. You immediately get an error message.

.. _maximum-number-of-wildcards-per-filter-function:

Maximum number of wildcards per filter() function
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 35
   * :strong:`Notes`: ``"data('jvm.load', filter=filter('host', 'kafka*east'))"`` counts as 1 wildcard filter
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't start. You immediately get an error message.

.. _maximum-number-of-prefix-wildcards-per-filter-function:

Maximum number of prefix wildcards per filter() function
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 150
   * :strong:`Notes`: ``"data('jvm.load', filter=filter('host', 'kafka*'))"`` counts as 1 prefix filter
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't start. You immediately get an error message.

.. _maximum-signalflow-program-text-size:

Maximum SignalFlow program text size
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 50,000
   * :strong:`Notes`: Maximum character length of a SignalFlow program allowed in charts and detectors.
   * :strong:`Customer impact`: You can't save a SignalFlow program that exceeds the limit; instead, an error message appears.

.. _maximum-signalflow-programs-per-minute:

Maximum SignalFlow programs per minute
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 1,000 SignalFlow programs per minute
   * :strong:`Notes`: Maximum number of SignalFlow programs started per minute. The following actions start SignalFlow programs:

     * Creating or updating charts
     * Creating or updating detectors
     * Running a SignalFlow job using the API
     * Opening an alert from the list displayed the **Alerts** UI page. This action displays an alert dialog box and
       runs a SignalFlow program that provides charts and information to the page.

     You don't get a notification when Observability Cloud starts a SignalFlow program for an alert dialog box, but the program
     counts against your SignalFlow programs per minute limit.
   * :strong:`Related metrics`:

     - ``sf.org.numComputationsStarted``
     - ``sf.org.numComputationsThrottled``
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't start. You immediately get an error message.

.. _maximum-number-of-query-arguments-in-a-filter-function:

Maximum number of query arguments in a filter() function
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 256
   * :strong:`Notes`: Limit to the number of query arguments in a SignalFlow filter
   * :strong:`Customer impact`: Maximum number of derived MTS per SignalFlow program, where derived MTS are temporary MTS that a SignalFlow function or method has to maintain in memory. For example, if there are 20,000 MTS for the metric ``jvm.load``, and each MTS comes from a unique host , then ``"data('jvm.load').sum(by=['host']).publish()"`` tracks 40,000 derived MTS. The ``data()`` function uses 20,000, and the ``sum()`` uses another 20,000. The number of input MTS is still 20,000.

.. _maximum-number-of-detectors-per-org:

Maximum number of detectors per organization
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 1,000
   * :strong:`Notes`: The maximum number of detectors that you can create in a single organization.
   * :strong:`Related metrics`:

     - ``sf.org.limit.detector``
     - ``sf.org.num.detector``
   * :strong:`Customer impact`: The user interface displays an error reporting that you've exceeded the limit.

.. _maximum-number-of-signalflow-jobs-per-org:

Maximum number of SignalFlow jobs per organization
-------------------------------------------------------------------------
   
   * :strong:`Default limit value`: 5,000 per minute
   * :strong:`Notes`: The maximum number of SignalFlow jobs you can run for your organization. Each token in the organization shares the same limit. For example, you can run 5,000 jobs per minute with one token, but you can't run more jobs with any other token in the same organization. 
   * :strong:`Related metrics`:

      * ``sf.org.numComputationsStarted``
      * ``sf.org.numComputationsThrottled``
      * ``sf.org.numComputationsStartedByToken``
      * ``sf.org.numComputationsThrottledByToken``
   * :strong:`Customer impact`: You reach this limit when the total number of jobs across all tokens for an organization exceeds 5,000 per minute. A single token, or a combination of different tokens in an organization, can use up the capacity.
   
      To check whether a single token hits the limit, use the related metrics. For example, if you see that the ``sf.org.numComputationsThrottledByToken`` metric increases for one token, but the ``sf.org.numComputationsThrottled`` metric doesn't increase for the organization, then only a single token has used up the capacity.

.. _maximum-number-of-signalflow-jobs-per-connection:

Maximum number of SignalFlow jobs per websocket connection
-------------------------------------------------------------------------

   * :strong:`Default limit value`: 300
   * :strong:`Notes`: The maximum number of SignalFlow jobs you can run for each of your websocket connection.
   * :strong:`Customer impact`: When you reach this limit, you get an error message saying "Too many channels in this connection".
   
      You might reach this limit when you have too many charts open on the same page. For example, you open a dashboard with more than 300 charts. In this case, the charts outside the 300 limit don't display. To avoid hitting this limit, you can reduce the number of charts by putting them into another dashboard or removing them.


.. _new-dimension-or-property-key-name-limit:

New dimension or property key name limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 40 per week
   * :strong:`Notes`: The maximum number of new custom fields (property or dimension keys) you can create, per organization per week. This limit applies to MTS and ETS. For example, `host: 1` and `host: 2` have the same key, which is `host`. `hostname: host1` and `hosttype: QA` have different keys, which are `hostname` and `hosttype`.
   * :strong:`Related metrics`:

     - ``sf.org.numPropertyLimitedMetricTimeSeriesCreateCalls``
     - ``sf.org.numPropertyLimitedMetricTimeSeriesCreateCallsByToken``
   * :strong:`Customer impact`: The system rejects MTS creations that exceed the limit are rejected, and no error message appears.

.. _events-per-minute:

Events per minute
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Determined by your subscription
   * :strong:`Notes`: Maximum number of custom events you're allowed to ingest per minute
   * :strong:`Customer impact`: If you have this limit set for an org token, you receive a HTTP 429 error from Data Ingestion APIs when you exceed the limit.

.. _mts-creations-per-minute-limit:

MTS creations per minute limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 6,000 or determined by your subscription.
   * :strong:`Notes`: Maximum number of MTS you can create per minute.
   * :strong:`Related metrics`:

     - ``sf.org.numMetricTimeSeriesCreated``
     - ``sf.org.limit.metricTimeSeriesCreatedPerMinute``
   * :strong:`Customer impact`: Infrastructure Monitoring drops new MTS that exceed the limit without returning an error, but accepts data points for existing MTS.

.. _mts-creations-per-hour-limit:

MTS creations per hour limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 60 times your MTS per minute limit
   * :strong:`Notes`: Maximum number of MTS you can create per hour.
   * :strong:`Customer impact`: Infrastructure Monitoring drops new MTS that exceed the limit without returning an error, but accepts data points for existing MTS.

.. _mts-creations-burst-per-minute-limit:

MTS creations bursting per minute limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 10 times your MTS per minute limit, with a maximum of 20 minutes worth of bursting capacity per hour.
   * :strong:`Notes`: Splunk Observability Cloud allows bursting for metric time series (MTS) creation to better support bursty or spiky patterns in MTS creation traffic. This limit is the maximum bursting capacity for MTS creations. Bursting is not guaranteed and is available only when there is enough additional capacity. 
  
   * :strong:`Customer impact`: The default MTS creations per minute limit is enforced once you have used up the 20 minutes maximum bursting capacity per hour.
    
      For example, your default MTS creations per minute limit is 6,000. You can max out the MTS creations burst limit in the following ways:
          
          #. Create 60,000 MTS per minute for consecutive or nonconsecutive 20 minutes, then go back to creating 6,000 MTS per minute for the rest of the hour.
          #. Spread the bursting capacity utilization over the entire hour by creating MTS at the rate of less than or equal to 24,000 per minute.


.. _number-of-dimensions-per-mts:

Number of dimensions per MTS
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 36
   * :strong:`Notes`: Maximum number of dimensions per MTS. Infrastructure Monitoring drops invalid data points without returning an error, but keeps valid data points in the same request.
   * :strong:`Customer impact`: Infrastructure Monitoring accepts valid data points but drops invalid data points. For invalid data points, Infrastructure Monitoring doesn't send an error message.

.. _dimensionmetric-value-length:

Dimension/Metric value length
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: UTF-8 strings with a maximum length of 256 characters (1024 bytes).
   * :strong:`Notes`: Maximum length of a metric value or dimension value
   * :strong:`Customer impact`: While ingesting data, the system drops data points with invalid dimension or metric values and doesn't return an error. Ingest continues for valid data points.

.. _maximum-dimension-name-length:

Maximum dimension name length
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 128 characters (512 bytes)
   * :strong:`Notes`: Maximum length of a dimension name
   * :strong:`Customer impact`: While ingesting data, the system drops data points with invalid dimension names and doesn't return an error. Ingest continues for valid data points.

.. _maximum-number-of-api-calls-per-minute:

Maximum number of API calls per minute
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 100,000
   * :strong:`Notes`: Maximum number of REST API calls you can make per endpoint per minute. The limit for GET calls is 10 times the rate for other calls. The limit protects the system from gross misuse or attacks. This applies to metadata API to api.signalfx.com
   * :strong:`Related metrics`: ``sf.org.numRestCalls``
   * :strong:`Customer impact`: The API returns an HTTP error code 429 that indicates that you've reached your API call limit.

.. _number-of-tags-per-dimension:

Number of tags per dimension
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 50
   * :strong:`Notes`: Maximum number of tags per dimension. Infrastructure Monitoring drops excess tags without returning an error.
   * :strong:`Customer impact`: Infrastructure Monitoring drops tags that exceed the limit but doesn't issue an error message.

.. _number-of-properties-per-dimension:

Number of properties per dimension
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 75
   * :strong:`Notes`: Maximum number of custom properties per dimension. Infrastructure Monitoring drops excess properties, but it doesn't return an error.
   * :strong:`Customer impact`: Infrastructure Monitoring drops properties that exceed the limit, but it doesn't issue an error message.

.. _timeserieswindow-api-datapoint-limit:

timeserieswindow API data point limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 1,000,000
   * :strong:`Notes`: The maximum number of data points you can retrieve in a single call to GET /v2/timeserieswindow.
   * :strong:`Customer impact`: The request fails and returns an HTTP error code 400

.. _custom-mts-entitlement:

Custom MTS entitlement
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Set by your contract entitlement
   * :strong:`Notes`: Number of custom MTS entitled, as determined by your contract.
   * :strong:`Related metrics`: ``sf.org.numCustomMetrics``
   * :strong:`Customer impact`: Splunk charges an overage of 1.5 times the normal price for usage that exceeds your contractual entitlement.

.. _custom-mts-burstoverage-limit:

Custom MTS burst/overage limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Multiples of entitlement
   * :strong:`Notes`: Maximum number of active custom MTS, within a moving window of the
     previous 60 minutes, that you're allowed to have in your organization.
   * :strong:`Related metrics`:

     - ``sf.org.numCustomMetrics``
     - ``sf.org.limit.customMetricTimeSeries``
   * :strong:`Customer impact`: If you exceed this limit,
     Infrastructure Monitoring stops accepting data points for new custom MTS, but it continues to accept
     data points for custom MTS that already existed.

.. _host-entitlement:

Host entitlement
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Contract entitlement
   * :strong:`Notes`: Number of hosts in your contract, if applicable.
   * :strong:`Related metrics`: ``sf.org.numResourcesMonitored``
   * :strong:`Customer impact`: Splunk charges an overage of 1.5 times the normal price for usage that exceeds your contractual entitlement.

.. _host-burstoverage-limit:

Host burst/overage limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Multiples of entitlement
   * :strong:`Notes`: For host-based pricing contracts, the maximum number of hosts that can send data to your organization.
     This limit is higher than your contractual limit to allow for burst and overage usage.
   * :strong:`Related metrics`:

     - ``sf.org.numResourcesMonitored (filter for the dimension resourceType:hosts)``
     - ``sf.org.limit.hosts``
   * :strong:`Customer impact`: If you exceed this limit, Infrastructure Monitoring drops data points from new hosts but keeps
     accepting data points for existing hosts.

.. _container-entitlement:

Container entitlement
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Set by your contract entitlement
   * :strong:`Notes`: Number of containers in your contract, if applicable
   * :strong:`Related metrics`: ``sf.org.numResourcesMonitored``
   * :strong:`Customer impact`: Splunk charges an overage of 1.5 times the normal price for usage above contractual entitlement.

.. _container-burstoverage-limit:

Container burst/overage limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Multiples of entitlement
   * :strong:`Notes`: For host-based pricing contracts, maximum number of containers that can send data to your organization.
     This limit is higher than your contractual limit to allow for burst and overage usage.
   * :strong:`Related metrics`:

     - ``sf.org.numResourcesMonitored (filter for the dimension resourceType:containers)``
     - ``sf.org.limit.containers``
   * :strong:`Customer impact`: If you exceed this limit, Infrastructure Monitoring drops data points from new containers but keeps
     accepting data points for existing containers.

.. _high-resolution-custom-metrics-entitlement:

High resolution custom metrics entitlement
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Set by your contract entitlement
   * :strong:`Notes`: Number of high resolution metrics allowed in your contract
   * :strong:`Customer impact`: Splunk charges an overage of 1.5 times the normal price for usage that exceeds your contractual entitlement.

.. _high-resolution-custom-metrics-burstoverage-limit:

High resolution custom metrics burst/overage limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Multiples of entitlement
   * :strong:`Notes`: This limit is to protect the SaaS platform. It's typically a multiple of your contractual limit. For example, if you purchase 500 hosts, Infrastructure Monitoring might set limit to 800. The multiple decreases as your contractual limit increases.
   * :strong:`Customer impact`: The system rejects MTS creations for high resolution metrics that exceed the limit.

.. _bundled-mts-limit:

Bundled MTS limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Determined by your subscription
   * :strong:`Notes`: This limit is scaled to subscription, and is no longer a pricing measure.

.. _imts-limit:

IMTS Limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Determined by your subscription
   * :strong:`Notes`: Maximum number of inactive MTS, as allowed by your contract.
   * :strong:`Related metrics`: sf.org.numInactiveTimeSeries
   * :strong:`Customer impact`: When you reach this limit, the system deletes the MTS with the longest period of inactivity.

.. _amts-limit:

AMTS limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Determined by your subscription
   * :strong:`Notes`: Maximum number of active MTS in a 25 hour period. If you're using Kubernetes, the period is 1 hour.
   * :strong:`Related metrics`:

     - ``sf.org.numActiveTimeSeries``
     - ``sf.org.limit.activeTimeSeries``
   * :strong:`Customer impact`: When you exceed this limit, Infrastructure Monitoring refuses new MTS without issuing an error message. Infrastructure Monitoring continues to ingest data points for existing MTS.

.. _contract-dpm-limit:

Data points per minute (DPM) limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Set by your contract entitlement
   * :strong:`Notes`: Limit on the number of data points you can send to Infrastructure Monitoring per minute. If you exceed the limit, Infrastructure Monitoring stops creating new MTS and rejects the data points.
   * :strong:`Customer impact`: Infrastructure Monitoring drops new data points and MTS above the limit without returning an error.

.. _burst-dpm-limit:

Burst DPM limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Multiples of entitlement
   * :strong:`Notes`: Limit on the number of data points you can send to Infrastructure Monitoring each minute. If you have this limit set on the org token you use, the data ingest API returns HTTP response code 429 when you exceed the limit.
   * :strong:`Customer impact`: If you have this limit set on the org token you use, you receive a HTTP 429 error from Data Ingestion APIs when you exceed the limit.

.. _maximum-rendered-mts-for-line-histogram-or-heatmap-visualizations:

Maximum rendered MTS for line, histogram, or heatmap visualizations
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 1,000
   * :strong:`Notes`: When a visualization exceeds the limit, the UI arbitrarily selects the MTS it renders.

.. _maximum-rendered-mts-for-area-or-stacked-column-visualizations:

Maximum rendered MTS for area or stacked column visualizations
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 500
   * :strong:`Notes`: When a visualization exceeds the limit, the UI arbitrarily selects the MTS it renders.

.. _maximum-rendered-mts-for-column-chart-visualizations:

Maximum rendered MTS for column chart visualizations
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 20
   * :strong:`Notes`: When a visualization exceeds the limit, the UI arbitrarily selects the MTS it renders.
