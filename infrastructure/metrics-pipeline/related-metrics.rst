
.. _related-metrics:

************************************************************************
View related metrics for metrics pipeline management
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
    
   * - ``sf.org.numReceivedDatapointsAggregatedByToken``
     - One value per token, number of data points metrics pipeline management dropped based on configured rules 


Data point retention metrics
----------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Metric name`
     - :strong:`Description`

   * - ``sf.org.numDatapointsReceived``
     - One value per metric type, each representing the number of data points that Infrastructure Monitoring received and processed. The sum of the values represents the total number of data points you sent to Infrastructure Monitoring, minus any data points that weren't accepted because you exceeded a limit. You can have up to three metric time series (MTS) for this metric. 
    
   * - ``sf.org.numReceivedDatapointsAggregatedByToken``
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