.. _synthetics-usage:

*********************************************************************
Synthetic Monitoring subscription usage 
*********************************************************************

.. meta::
   :description: Synthetic Monitoring subscription usage.


Splunk Synthetic Monitoring offers metrics you can use to track your subscription usage. You can use these metrics to create charts, dashboards, and set alerts. 



.. list-table:: 
   :widths: 25 25 
   :header-rows: 1

   * - :strong:`Metric`
     - :strong:`Description`
   * - ``sf.org.synthetics.limit.synthetics``
     - Limit of number of MTS for that org. 
   * - ``syn.customer_usage.runs_completed``
     - Total number of runs completed. 
   * - ``sf.org.synthetics.numDatapointsReceived``
     - Total number of datapoints recevied. 
   * - ``sf.org.synthetics.limit.metricTimeSeriesCreatedPerMinute``
     - Limit of MTS created per minute. 
   * - ``sf.org.numSyntheticsMetrics``
     - 
   * - ``sf.org.synthetics.limit.synthetics``
     - 
   * - ``sf.org.synthetics.numDatapointsReceivedByToken``
     - Total number of data points received by token per org. 
   * - ``sf.org.numSyntheticsMetricsByToken``
     - Total number of metrics received by token per org
   * - ``sf.org.synthetics.numDatapointsDroppedInTimeout``
     - Total number of data points dropped because of a time out. 
   * - ``sf.org.subscription.syntheticsMetrics``
     - 
   * - ``sf.org.numMetricTimeSeriesCreatedByCategoryType``
     - Total number of MTS created for each category type per org. 
   * - ``sf.org.numMetricTimeSeriesCreatedByDatapointTypeByToken``
     - Total number of MTS created for each data point per org sorted by token. 
   * - ``sf.org.numMetricTimeSeriesCreatedByDatapointType``
     - Total number of MTS created for each data point per org
   * - ``sf.org.numThrottledMetricTimeSeriesCreateCallsByDatapointTypeByToken``
     - 
   * - ``sf.org.numLimitedMetricTimeSeriesCreateCallsByCategoryTypeByToken``
     - Number of MTS not sent per token; over maximum allowed.
   * - ``sf.org.numThrottledMetricTimeSeriesCreateCallsByDatapointType``
     - 
   * - ``sf.org.numMetricTimeSeriesCreatedByCategoryTypeByToken``
     - Number of MTS sent per token; over maximum allowed.
   * - ``sf.org.numLimitedMetricTimeSeriesCreateCallsByCategoryType``
     -







See also
==========

To learn more, see: 

* :ref:`browser-metrics`
* :ref:`uptime-metrics`
* :ref:`api-test-metrics`

