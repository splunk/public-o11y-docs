.. _sys-limits:

********************************************************
System limits for Splunk Infrastructure Monitoring
********************************************************

.. meta::
   :description: This topic describes the Splunk Infrastructure Monitoring limits for incoming data,
    number of charts or detectors, and other features.

Splunk Infrastructure Monitoring has system limits that help ensure good performance, stability, and reliability. These limits also protect the Infrastructure Monitoring multitenant environment. Exceeding these limits might degrade your Infrastructure Monitoring experience. 

To help you avoid problems when you use Infrastructure Monitoring, consider the system limit information presented in this
document. Besides, there are several out-of-the-box charts in Splunk Observability Cloud for the metrics described below. Admins can view these charts by navigating to :guilabel:`Settings > Organization Overview`.

This documentation uses the following abbreviations:

* Active MTS (AMTS)
* Data points per minute (DPM)
* Event time series (ETS)
* Inactive MTS (IMTS)
* Metric time series (MTS)

The tables in this document summarize limits for these product areas: 

* :ref:`important-limits`
* :ref:`charts-detectors-and-signalflow-limits`
* :ref:`data-ingestion-limits`
* :ref:`mts-metadata-limits`
* :ref:`time-series-limits`
* :ref:`subscription-limits`
* :ref:`web-app-limits`

For each limit, Splunk provides the following:

* The name and value of each system limit
* If available, the organization metrics associated with the limit
* The impact you observe when you exceed the limit

.. _important-limits:

Main system limits
================================================================================

.. list-table::
   :header-rows: 1
   :widths: 50 50
   :width: 100%

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
================================================================================

.. list-table::
   :header-rows: 1
   :widths: 50 50
   :width: 100%

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
================================================================================

.. list-table::
   :header-rows: 1
   :widths: 50 50
   :width: 100%

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
================================================================================

.. list-table::
   :header-rows: 1
   :widths: 50 50
   :width: 100%

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
================================================================================

.. list-table::
   :header-rows: 1
   :widths: 50 50
   :width: 100%

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

.. _other-limits:
.. _time-series-limits:

Time Series Window API limits
================================================================================

.. list-table::
   :header-rows: 1
   :widths: 50 50
   :width: 100%

   * - :strong:`Limit name`
     - :strong:`Default limit value`
   * - :ref:`timeserieswindow-api-datapoint-limit`
     - 1,000,000
  

.. _web-app-limits:

Web app limits
================================================================================

.. list-table::
   :header-rows: 1
   :widths: 50 50
   :width: 100%

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


