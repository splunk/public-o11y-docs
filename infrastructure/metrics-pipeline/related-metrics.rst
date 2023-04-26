
.. _org-metrics-metrics-pipeline:

************************************************************************
Related org metrics for metrics pipeline management
************************************************************************


Splunk Infrastructure Monitoring provides some metrics to help you measure your usage of metrics pipeline management and how it affects your subscription. For more information on how to view these metrics, see :new-page-ref:`access-org-metrics`.


Data point ingestion metrics
----------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Metric name`
     - :strong:`Description`

   * - ``sf.org.datapointsTotalCount``
     - Total number of data points Infrastructure Monitoring ingested in your organization
    
   * - ``sf.org.datapointsTotalCountByToken``
     - One value per token, number of data points Infrastructure Monitoring ingested

   * - ``sf.org.grossDatapointsReceived``
     - Reserved for Infrastructure Monitoring internal use only.

   * - ``sf.org.grossDatapointsReceivedByToken``
     - Reserved for Infrastructure Monitoring internal use only.

Data point aggregation metrics
----------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Metric name`
     - :strong:`Description`

   * - ``sf.org.numReceivedDatapointsAggregated``
     - Number of data points metrics pipeline management aggregated based on configured rules in your organization
    
   * - ``sf.org.numReceivedDatapointsAggregatedByToken``
     - One value per token, number of data points metrics pipeline management aggregated based on configured rules


Data point dropping metrics
----------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Metric name`
     - :strong:`Description`

   * - ``sf.org.numDatapointsDroppedMetricRuleset``
     - Number of data points metrics pipeline management dropped based on configured rules in your organization
    
   * - ``sf.org.numDatapointsDroppedMetricRulesetByToken``
     - One value per token, number of data points metrics pipeline management dropped based on configured rules 
    
   * - ``sf.org.numAggregatedDatapointsDroppedThrottle``
     - Number of data points metrics pipeline management dropped when the aggregation metrics are more than the limit configured for your organization
    
   * - ``sf.org.numAggregatedDatapointsDroppedThrottleByToken``
     - One value per token, number of data points metrics pipeline management dropped when the aggregation metrics are more than the limit configured for your organization

   * - ``sf.org.numDatapointsDroppedInTimeout``
     - Number of data points Splunk Observability Cloud didn't attempt to create because your account was throttled or limited in the previous few seconds, and creation was unlikely to succeed.
  
   * - ``sf.org.numDatapointsDroppedInTimeoutByToken``
     - Reserved for Infrastructure Monitoring internal use only.

   * - ``sf.org.numDatapointsDroppedExceededQuota``
     - Number of new data points you sent to Infrastructure Monitoring but Infrastructure Monitoring didn't accept because your organization exceeded its subscription limit. To learn more about the process Infrastructure Monitoring uses for incoming data when you exceed subscription limits, see :ref:`dpm-usage`.

   * - ``sf.org.numDatapointsDroppedExceededQuotaByToken``
     - One value per token, number of new data points you sent to Infrastructure Monitoring but Infrastructure Monitoring didn't accept because your organization exceeded its subscription limit. To learn more about the process Infrastructure Monitoring uses for incoming data when you exceed subscription limits, see :ref:`dpm-usage`. The sum of all the values might be less than the value of ``sf.org.numDatapointsDroppedExceededQuota``. For more information, see :new-page-ref:`metrics-by-token`.
  
   * - ``sf.org.numDatapointsDroppedThrottle``
     - Number of data points you sent to Infrastructure Monitoring that Infrastructure Monitoring didn't accept because your organization significantly exceeded its DPM limit. For help with this issue, reach out to support at observability-support@splunk.com. Unlike ``sf.org.numDatapointsDroppedExceededQuota``, this metric represents data points for both existing and new MTS. If Infrastructure Monitoring is throttling your organization, it isn't keeping any of your data.

   * - ``sf.org.numDatapointsDroppedThrottleByToken``
     - One value per token, number of data points you sent to Infrastructure Monitoring that Infrastructure Monitoring didn't accept because your organization significantly exceeded its DPM limit. For help with this issue, reach out to support at observability-support@splunk.com. Unlike ``sf.org.numDatapointsDroppedExceededQuota``, this metric represents data points for both existing and new MTS. If Infrastructure Monitoring is throttling your organization, it isn't keeping any of your data. The sum of all the values might be less than the value of ``sf.org.numDatapointsDroppedThrottle``. For more information, see :new-page-ref:`metrics-by-token`.

   * - ``sf.org.numDatapointsDroppedInvalid``
     - Number of data points dropped because they didn't follow documented guidelines for data points. For example, the metric name was too long, the metric name included unsupported characters, or the data point contained no values.

   * - ``sf.org.numDatapointsDroppedInvalidByToken``
     - Number of data points dropped for a specific access token because they didn't follow documented guidelines for data points. For example, the metric name was too long, the metric name included unsupported characters, or the data point contained no values.
  
   * - ``sf.org.numDatapointsDroppedBatchSize``
     - Number of data points dropped because a single request contained more than 100,000 data points. In this scenario, Observability Cloud drops data points because it perceives sending more than 100,000 data points in a single request as excessive.
  
   * - ``sf.org.numDatapointsDroppedBatchSizeByToken``
     - One value per token, number of data points dropped because a single request contained more than 100,000 data points. In this scenario, Observability Cloud drops data points because it perceives sending more than 100,000 data points in a single request as excessive.
  
  

Data point retention metrics
----------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Metric name`
     - :strong:`Description`

   * - ``sf.org.numDatapointsReceived``
     - One value per metric type, each representing the number of data points that Infrastructure Monitoring received and processed. The sum of the values represents the total number of data points you sent to Infrastructure Monitoring, minus any data points that weren't accepted because you exceeded a limit. You can have up to three metric time series (MTS) for this metric. 
    
   * - ``sf.org.numDatapointsReceivedByToken``
     - One value per metric type per token, each representing the number of data points Infrastructure Monitoring received and processed. The sum of values for a token is the total number of data points you sent to Infrastructure Monitoring, minus the number of data points that Infrastructure Monitoring didn't accept because you exceeded a limit. You can have up to three MTS for this metric. 


Metric rulesets org metrics
----------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Metric name`
     - :strong:`Description`

   * - ``sf.org.metricruleset.numMetricRulesets``
     - Number of metric rulesets created in your organization
    
   * - ``sf.org.metricruleset.numAggregationRules``
     - Number of aggregations in your organization 

   * - ``sf.org.metricruleset.numMetricRulesetsWithDataDrop``
     - Number of metric rulesets with data dropping enabled in your organization