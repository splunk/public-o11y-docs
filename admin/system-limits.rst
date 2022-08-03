.. _system-limits:

******************************************
Infrastructure Monitoring system limits
******************************************

.. meta::
   :description: This topic describes the Splunk Infrastructure Monitoring limits for incoming data,
    number of charts or detectors, and other features.
   :keywords: reference limits constraints infrastructure monitoring charts detectors ingest

Splunk Infrastructure Monitoring has system limits that help ensure good performance, stability, and reliability. These limits also protect the Infrastructure Monitoring multi-tenant environment. Exceeding these limits might degrade your Infrastructure Monitoring experience.

To help you optimize your product experience, this topic describes the following:

* The name and value of each system limit
* If available, the organization metrics associated with the limit
* The impact you observe when you exceed the limit.

The first section in this topic contains tables of limit names and values, organized by product area. Each entry in the table shows the name of the limit and its default value. The
limit name is also a link to more information about the limit.

The first table in the section lists the most important limits to pay attention to as you scale your deployment.

Abbreviations
================================================================================

This documentation uses the following abbreviations:

* MTS: Metric time series
* AMTS: Active MTS
* IMTS: Inactive MTS
* ETS: Event time series

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

   * - :ref:`detectors-per-org`
     - 1,000

   * - :ref:`maximum-number-of-mts-allowed-per-chart-data-function`
     -
       - 5,000 for standard subscriptions
       - 10,000 for enterprise subscriptions

   * - :ref:`maximum-number-of-mts-per-detector-data-function`
     -

       - 5,000 for standard subscriptions
       - 10,000 for enterprise subscriptions

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

   * - :ref:`detectors-per-org`
     - 1,000

   * - :ref:`maximum-max-delay-setting-for-signalflow-programs`
     - 15 min

   * - :ref:`maximum-min-delay-setting-for-signalflow-programs`
     - 15 min

   * - :ref:`maximum-number-of-allocated-datapoints-per-signalflow-program`
     - 60,000,000

   * - :ref:`maximum-number-of-data-graphite-or-newrelic-functions-per-signalflow-program`
     - 200

   * - :ref:`maximum-number-of-derived-mts-per-signalflow-program`
     - 500,000

   * - :ref:`maximum-number-of-functions-and-methods-per-signalflow-program`
     - 1,000

   * - :ref:`maximum-number-of-mts-allowed-per-chart-data-function`
     -

       - 5,000 for standard subscriptions
       - 10,000 for enterprise subscriptions

   * - :ref:`maximum-number-of-mts-analyzed-across-all-signalflow-programs`
     - The larger of 10,000,000 AMTS or 20% of your total AMTS.

   * - :ref:`maximum-number-of-mts-per-detector-data-function`
     -

       - 5,000 for standard subscriptions
       - 10,000 for enterprise subscriptions

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

   * - :ref:`dimensionmetric-value-length`
     - 256

   * - :ref:`events-per-minute`
     - Determined by your subscription

   * - :ref:`maximum-dimension-name-length`
     - 128

   * - :ref:`mts-creations-per-hour-limit`
     - 500,000 MTS per hour or 50 times your MTS per minute limit.

   * - :ref:`mts-creations-per-minute-limit`
     - 6,000 or determined by your subscription

   * - :ref:`number-of-dimensions-per-mts`
     - 36

.. _mts-metadata-limits:

MTS metadata limits
----------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`
   * - :ref:`maximum-number-of-api-calls-per-minute`
     - 100,000

   * - :ref:`number-of-properties-per-dimension`
     - 75

   * - :ref:`number-of-tags-per-dimension`
     - 50

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
     - 500,000

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

   * - :ref:`dashboard-group-links-per-team`
     - 50

   * - :ref:`detector-links-per-team`
     - 700

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

.. _maximum-number-of-dashboards-you-can-retrieve:

Maximum number of dashboards you can retrieve
------------------------------------------------

   * :strong:`Default limit value`: 20,000
   * :strong:`Notes`: Maximum number of dashboards you can retrieve per query using either the UI or the API.  If you reach this limit, you receive an error.
   * :strong:`Customer impact`: When you exceed this limit, the user interface displays the error message "Unexpected error has occurred". After you exceed the limit, the dashboards page stops displaying dashboards.

.. _dashboard-group-links-per-team:

Dashboard group links per team
------------------------------------------------

   * :strong:`Default limit value`: 50
   * :strong:`Notes`: Maximum number of dashboard groups you can link to a team.
   * :strong:`Customer impact`: You can't link additional dashboard groups.

.. _detector-links-per-team:

Detector links per team
------------------------------------------------

   * :strong:`Default limit value`: 700
   * :strong:`Notes`: Number of detectors you can link to a team.
   * :strong:`Customer impact`: You can't link additional detectors.

.. _number-of-input-mts-per-job:

Number of input MTS per job
------------------------------------------------

   * :strong:`Default limit value`: 250,000
   * :strong:`Notes`: Maximum number of input MTS per job. When you use the same MTS multiple times in a job, each use counts towards the maximum.
   * :strong:`Customer impact`: If the job is for a chart, the chart doesn't load and you receive an error message. If the job is for a detector, the job is aborted. You can monitor aborted detector SignalFlow programs using a built-in metric. Your organization also receives an event with information about the detector that aborted. Your job might reach this limit after it starts. A chart might initially load, but fail when the limit is reached.

.. _maximum-number-of-derived-mts-per-signalflow-program:

Maximum number of derived MTS per SignalFlow program
-------------------------------------------------------

   * :strong:`Default limit value`: 500,000
   * :strong:`Notes`: Maximum number of derived MTS per SignalFlow program, where derived MTS are temporary MTS that a SignalFlow SignalFlow function or method has to maintain in memory. For example, if there are 20,000 MTS for the metric ``jvm.load``, and each MTS comes from a unique host , then ``"data('jvm.load').sum(by=['host']).publish()"`` tracks 40,000 derived MTS. The ``data()`` SignalFlow function or method uses 20,000, and the ``sum()`` uses another 20,000. The number of input MTS is still 20,000.
   * :strong:`Customer impact`: If the SignalFlow program is for a chart, the chart doesn't load and you receive an error message. If the SignalFlow program is for a detector, the SignalFlow program is aborted. You can monitor aborted detector SignalFlow programs using a built-in metric. Your organization also receives an event with information about the detector that aborted. Your SignalFlow program might reach this limit after it starts. A chart might initially load, but fail when the limit is reached.

.. _maximum-number-of-mts-allowed-per-chart-data-function:

Maximum number of MTS allowed per chart data() function
----------------------------------------------------------

   * :strong:`Default limit value`:

     - 5,000 for standard subscriptions
     - 10,000 for enterprise subscriptions
   * :strong:`Notes`: If you're using Enterprise Edition, this limit is 10,000. If you have auto-sharding enabled, you can have the limit set higher depending on your subscription. Please contact sales or customer support.
   * :strong:`Customer impact`: If you exceed the limit, only the most recently created MTS are kept, based on the creation timestamp maintained for each MTS. This might result in inaccurate computations.

.. _maximum-number-of-mts-per-detector-data-function:

Maximum number of MTS per detector data() function
----------------------------------------------------

   * :strong:`Default limit value`:

     - 5,000 for standard subscriptions
     - 10,000 for enterprise subscriptions
   * :strong:`Notes`: If you're using Enterprise Edition, this limit is 10,000. If you have auto-sharding enabled, you can have the limit set higher depending on your subscription. Please contact sales or customer support.
   * :strong:`Customer impact`: If you exceed the limit, only the most recently created MTS are kept, based on the creation timestamp maintained for each MTS. Detectors might not trigger, or they might trigger incorrectly.

.. _maximum-number-of-allocated-datapoints-per-signalflow-program:

Maximum number of allocated datapoints per SignalFlow program
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

   * :strong:`Default limit value`: 60,000,000
   * :strong:`Notes`: Total number of datapoints a SignalFlow program must buffer to satisfy time window transformations. This is at least the number of input MTS, but if the SignalFlow has a time window calculation, the actual value might be much more. For example, a sum over 1m at 1s resolution requires 60 datapoints per MTS. If the SignalFlow has 10,000 MTS and only one window transform, the SignalFlow needs 10,000*60=600,000 datapoints.
   * :strong:`Customer impact`: If the SignalFlow program is for a chart, the chart doesn't load and you receive an error message. If the SignalFlow program is for a detector, the SignalFlow program is aborted. You can monitor aborted detector SignalFlow programs using a built-in metric. Your organization also receives an event with information about the detector that aborted. Your SignalFlow program might reach this limit after it starts. A chart might initially load, but fail when the limit is reached.

.. _maximum-number-of-functions-and-methods-per-signalflow-program:

Maximum number of functions and methods per SignalFlow program
-----------------------------------------------------------------

   * :strong:`Default limit value`: 1,000
   * :strong:`Notes`: The SignalFlow program ``"A = data().sum(by="az").sum().publish()"`` has 4 functions and methods (data, sum, sum, publish).
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't start. You immediately get an error message.

.. _maximum-number-of-data-graphite-or-newrelic-functions-per-signalflow-program:

Maximum number of data(), graphite() or newrelic() functions per SignalFlow program
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 200
   * :strong:`Notes`: Maximum number of data(), graphite() or newrelic() functions per SignalFlow program.
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't start. You immediately get an error message. Note that this puts a limit on how many detect() you can use if you use different data(), graphite() or newrelic() methods in the detect().

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
   * :strong:`Customer impact`: If the SignalFlow program is for a chart, the chart doesn't load and you receive an error message. If the SignalFlow program is for a detector, the SignalFlow program is aborted. You can monitor aborted detector SignalFlow programs using a built-in metric. Your organization also receives an event with information about the detector that aborted. Your SignalFlow program might reach this limit after it starts. A chart might initially load, but fail when the limit is reached.

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
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't be saved. You immediately get an error message.

.. _maximum-signalflow-programs-per-minute:

Maximum SignalFlow programs per minute
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 1,000 SignalFlow programs per minute
   * :strong:`Notes`: Maximum number of SignalFlow programs started per minute
   * :strong:`Related metrics`:

     - ``sf.org.computations.started``
     - ``sf.org.computations.throttled``
   * :strong:`Customer impact`: SignalFlow programs which are violating the limit can't start. You immediately get an error message.

.. _maximum-number-of-query-arguments-in-a-filter-function:

Maximum number of query arguments in a filter() function
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 256
   * :strong:`Notes`: Limit to the number of query arguments in a SignalFlow filter
   * :strong:`Customer impact`: Maximum number of derived MTS per SignalFlow program, where derived MTS are temporary MTS that a SignalFlow function or method has to maintain in memory. For example, if there are 20,000 MTS for the metric ``jvm.load``, and each MTS comes from a unique host , then ``"data('jvm.load').sum(by=['host']).publish()"`` tracks 40,000 derived MTS. The ``data()`` function uses 20,000, and the ``sum()`` uses another 20,000. The number of input MTS is still 20,000.

.. _detectors-per-org:

Detectors per org
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 1,000
   * :strong:`Notes`: The maximum number of v2 detectors that you can create in a single organization.
   * :strong:`Related metrics`: ``sf.org.num.detector``
   * :strong:`Customer impact`: The user interface displays an error reporting that the limit has been exceeded.

.. _new-dimension-or-property-key-name-limit:

New dimension or property key name limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 40 per week
   * :strong:`Notes`: The maximum number of new custom fields (property or dimension keys) you can create, per organization per week. This limit applies to MTS and ETS. For example, host:1 and host:2 are considered to have 1 key which is host. foo:1 and bar:1 are considered to have two keys: foo and bar.
   * :strong:`Related metrics`:

     - ``sf.org.numPropertyLimitedMetricTimeSeriesCreateCalls``
     - ``sf.org.numPropertyLimitedMetricTimeSeriesCreateCallsByToken``
   * :strong:`Customer impact`: MTS creations above the limit are rejected, and no error message appears.

.. _events-per-minute:

Events per minute
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Determined by your subscription
   * :strong:`Notes`: Maximum number of custom events you're allowed ingest per minute
   * :strong:`Customer impact`: If you have this limit set for an org token, you will receive a HTTP 429 error from Data Ingestion APIs when you exceed the limit.

.. _mts-creations-per-minute-limit:

MTS creations per minute limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 6,000 or determined by your subscription
   * :strong:`Notes`: Maximum number of MTS you can create per minute
   * :strong:`Related metrics`:

     - ``sf.org.numMetricTimeSeriesCreated``
     - ``sf.org.limit.metricTimeSeriesCreatedPerMinute``
   * :strong:`Customer impact`: Infrastructure Monitoring drops new MTS above the limit without returning an error.

.. _mts-creations-per-hour-limit:

MTS creations per hour limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 500,000 MTS per hour or 50 times your MTS per minute limit.
   * :strong:`Notes`: If you exceed your MTS limit per minute for more than 30 minutes of any hour, you can't create any more MTS for the remainder of the hour.
   * :strong:`Customer impact`: Infrastructure Monitoring drops new MTS above the limit without returning an error. Data points for existing MTS are still accepted.

.. _number-of-dimensions-per-mts:

Number of dimensions per MTS
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 36
   * :strong:`Notes`: Maximum number of dimensions per MTS. Infrastructure Monitoring silently drops invalid data points, but valid data points in the same request are kept.
   * :strong:`Customer impact`: Infrastructure Monitoring accepts valid data points but drops invalid data points. For invalid data points, Infrastructure Monitoring doesn't send an error message.

.. _dimensionmetric-value-length:

Dimension/Metric value length
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 256
   * :strong:`Notes`: No error is returned. Invalid data points are silently dropped. Valid data points in the same request are let in.
   * :strong:`Customer impact`: No error is returned. Invalid data points are silently dropped. Valid data points in the same request are let in.

.. _maximum-dimension-name-length:

Maximum dimension name length
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 128
   * :strong:`Notes`: Maximum number of dimensions per MTS. Infrastructure Monitoring silently drops invalid data points, but valid data points in the same request are kept.
   * :strong:`Customer impact`: Infrastructure Monitoring accepts valid data points but drops invalid data points. For invalid data points, Infrastructure Monitoring doesn't send an error message.

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
   * :strong:`Notes`: Maximum number of tags per dimension. Infrastructure Monitoring silently drops excess tags.
   * :strong:`Customer impact`: Infrastructure Monitoring drops tags that exceed the limit but doesn't issue an error message.

.. _number-of-properties-per-dimension:

Number of properties per dimension
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 75
   * :strong:`Notes`: Maximum number of custom properties per dimension. Infrastructure Monitoring silently drops excess properties.
   * :strong:`Customer impact`: Infrastructure Monitoring drops properties that exceed the limit but doesn't issue an error message.

.. _timeserieswindow-api-datapoint-limit:

timeserieswindow API datapoint limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 1,000,000
   * :strong:`Notes`: The maximum number of datapoints you can retrieve in a single call to GET /v2/timeserieswindow.
   * :strong:`Customer impact`: The request fails and returns an HTTP error code 400

.. _custom-mts-entitlement:

Custom MTS entitlement
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Set by your contract entitlement
   * :strong:`Notes`: Number of custom MTS entitled, as determined by your contract.
   * :strong:`Related metrics`: ``sf.org.numCustomMetrics``
   * :strong:`Customer impact`: Splunk charges an overage of 1.5 times the normal price for usage above contractual entitlement.

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
   * :strong:`Customer impact`: Splunk charges an overage of 1.5 times the normal price for usage above contractual entitlement.

.. _host-burstoverage-limit:

Host burst/overage limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Multiples of entitlement
   * :strong:`Notes`: For host-based pricing contracts, the maximum number of hosts that can send data to your organization.
     This limit is higher than your contractual limit to allow for burst and overage usage.
   * :strong:`Related metrics`:

     - ``sf.org.numResourcesMonitored (filter for the dimension resourceId:hosts)``
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

     - ``sf.org.numResourcesMonitored (filter for the dimension resourceId:containers)``
     - ``sf.org.limit.containers``
   * :strong:`Customer impact`: If you exceed this limit, Infrastructure Monitoring drops data points from new containers but keeps
     accepting data points for existing containers.

.. _high-resolution-custom-metrics-entitlement:

High resolution custom metrics entitlement
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Set by your contract entitlement
   * :strong:`Notes`: Number of high resolution metrics allowed in your contract
   * :strong:`Customer impact`: Splunk charges an overage of 1.5 times the normal price for usage above contractual entitlement.

.. _high-resolution-custom-metrics-burstoverage-limit:

High resolution custom metrics burst/overage limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Multiples of entitlement
   * :strong:`Notes`: This limit is to protect the SaaS platform. It's typically a multiple of your contractual limit. For example, if you purchase 500 hosts, Infrastructure Monitoring might set limit to 800. The multiple decreases as your contractual limit increases.
   * :strong:`Customer impact`: MTS creations for high resolution metrics above the limit are rejected.

.. _bundled-mts-limit:

Bundled MTS limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 500,000
   * :strong:`Notes`: This limit applies to host based contracts only. It is the total number of bundled MTS a customer could has, beyond the standard host based or container based MTS. MTS for SQS queues is an example.
   * :strong:`Customer impact`: MTS creations above the limit are rejected, and no error message appears.

.. _imts-limit:

IMTS Limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Determined by your subscription
   * :strong:`Notes`: Maximum number of inactive MTS, as allowed by your contract.
   * :strong:`Related metrics`: sf.org.numInactiveTimeSeries
   * :strong:`Customer impact`: When you reach this limit, the system deletes the inactive MTS that have been inactive the longest.

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

Contract DPM limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Set by your contract entitlement
   * :strong:`Notes`: Limit on the number of datapoints you can send to Infrastructure Monitoring per minute. If you exceed the limit, Infrastructure Monitoring stops creating new MTS and rejects the data points.
   * :strong:`Customer impact`: Infrastructure Monitoring drops new data points and MTS above the limit without returning an error.

.. _burst-dpm-limit:

Burst DPM limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Multiples of entitlement
   * :strong:`Notes`: Limit on the number of datapoints you can send to Infrastructure Monitoring each minute. If you have this limit set on the organization token, the data ingest API returns HTTP response code 429 when you exceed the limit.
   * :strong:`Customer impact`: If you have this limit set for an org token, you will receive a HTTP 429 error from Data Ingestion APIs when you exceed the limit.

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
