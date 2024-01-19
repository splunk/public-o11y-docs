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
     - Description
   * - ``syn.customer_usage.runs_completed``
     - Description 
   * - ``sf.org.synthetics.numDatapointsReceived``
     -
   * - ``sf.org.synthetics.limit.metricTimeSeriesCreatedPerMinute``
     -
   * - ``sf.org.numSyntheticsMetrics``
     -
   * - ``sf.org.synthetics.limit.synthetics``
     -
   * - ``sf.org.synthetics.numDatapointsReceivedByToken``
     -
   * - ``sf.org.numSyntheticsMetricsByToken``
     -
   * - ``sf.org.synthetics.numDatapointsDroppedInTimeout``
     -
   * - ``sf.org.subscription.syntheticsMetrics``
     -
   * - ``sf.org.numMetricTimeSeriesCreatedByCategoryType``
     -
   * - ``sf.org.numMetricTimeSeriesCreatedByDatapointTypeByToken``
     -
   * - ``sf.org.numThrottledMetricTimeSeriesCreateCallsByDatapointTypeByToken``
     -
   * - ``sf.org.numLimitedMetricTimeSeriesCreateCallsByCategoryTypeByToken``
     - Number of MTS not sent per token; over maximum allowed.
   * - ``sf.org.numThrottledMetricTimeSeriesCreateCallsByDatapointType``
     -
   * - ``sf.org.numMetricTimeSeriesCreatedByCategoryTypeByToken``
     -
   * - ``sf.org.numLimitedMetricTimeSeriesCreateCallsByCategoryType``
     -
   * - ``sf.org.numMetricTimeSeriesCreatedByDatapointType``
     -






See also
==========

To learn more, see: 

* :ref:`browser-metrics`
* :ref:`uptime-metrics`
* :ref:`api-test-metrics`

