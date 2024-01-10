.. _data-o11y:

******************************************************
Data retention in Splunk Observability Cloud
******************************************************

.. meta::
   :description: Data retention for Splunk Observability Cloud.

The following sections list the data retention for each product in Splunk Observability Cloud.

.. _im-data-retention:

Data retention in Infrastructure Monitoring
====================================================

The following table shows the retention time period for each data type in Infrastructure Monitoring. 

.. list-table:: 
   :widths: 25 25
   :header-rows: 1
   :width: 100%

   * - :strong:`Data resolution`
     - :strong:`Retention`
   * - 1 to 60-second resolution
     - 
       * Standard contract: 8 days
       * Enterprise contract: 3 months 
   * - 1 minute resolution and more (one-minute roll-ups)
     - 
       * 13 months

.. _rum-data-retention:

Data retention in Real User Monitoring (RUM)
==============================================

The following table shows the retention time period for each data type in RUM. 

.. list-table:: 
   :widths: 25 25
   :header-rows: 1
   :width: 100%

   * - :strong:`Data type`
     - :strong:`Retention`
   * - Spans 
     - 
       * 8 days
   * - Metrics 
     - 
       * 8 days
   * - :ref:`Monitoring MetricSets <monitoring-metricsets>`
     - 
       * 13 months 

.. _apm-data-retention:

Data retention in Application Performance Monitoring (APM)
=====================================================================
The following table shows the retention time period for each data type in APM. See :ref:`apm-extended-trace-retention` to learn how to extend the retention of specific traces of interest. 

.. list-table:: 
   :widths: 20 25
   :header-rows: 1
   :width: 100%

   * - :strong:`Data type`
     - :strong:`Retention`
   * - Traces
     - 
        * All raw traces: 8 days
        * Specific traces of interest: up to 13 months
   * - :ref:`Troubleshooting MetricSets <troubleshooting-metricsets>`
     - 
       * 8 days   
   * - :ref:`Monitoring MetricSets <monitoring-metricsets>`
     - 
       * 13 months 
   * - :ref:`Profiling data <profiling-intro>`
     - 
       * 8 days

.. _log-observer-data-retention:

Data retention in Log Observer 
============================================

The retention period for indexed logs in Splunk Log Observer is 30 days. If you send logs to S3 through the Infinite Logging feature, then the data retention period depends on the policy you purchased for your Amazon S3 bucket. To learn how to set up Infinite Logging rules, see :ref:`logs-infinite`.

.. _oncall-data-retention:

Data retention in Splunk On-Call
============================================

Data collected by Splunk On-Call is retained unless you request that your data be deleted. For more information, see :new-page:`Splunk On-Call Security FAQ <https://www.splunk.com/en_us/support-and-services/on-call-security-faq.html>`.

Data retention in Splunk Synthetic Monitoring 
===============================================

The following table shows the retention time period for each data type in Splunk Synthetic Monitoring. 

.. list-table:: 
   :widths: 25 25
   :header-rows: 1
   :width: 100%

   * - :strong:`Data type`
     - :strong:`Retention`
   * - Run results  
     - 
       * Standard contract: 8 days
       * Enterprise contract: 3 months 
   * - Metric data 
     - 
       * 13 months for both Standard and Enterprise.