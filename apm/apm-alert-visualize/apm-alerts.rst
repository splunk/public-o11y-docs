.. _apm-alerts:

*********************************************
Configure detectors and alerts in Splunk APM
*********************************************

.. meta::
   :description: Learn about options for detectors and alerts in Splunk APM. 

You can use detectors to dynamically monitor error rate and latency in the services you are tracing with Splunk APM. APM detectors use built-in algorithms to generate alerts about sudden spikes and historical anomalies in your APM metrics or Business Workflows. AutoDetect detectors are also available.

You can set up an APM detector from the Detector menu on any chart with APM metrics, so that you get alerted about changes in data that matter most to you. 

.. list-table::
   :header-rows: 1
   :widths: 20 80
   
   * - :strong:`Feature`
     - :strong:`Description`
   
   * - Detectors 
     - Detectors are powered by Monitoring MetricSets. APM provides a set of MMS by default see :ref:`apm-metricsets`. You you can create MMS with custom dimensions to monitor a specific subset of your data. To create a custom MMS on a specific span tag, index the span tag first.

       * :ref:`get-started-detectoralert`
       * :ref:`create-detectors`
       * :ref:`autodetect-list`
       * :ref:`view-detectors`

   * - Alerts 
     - The built-in alert conditions for detectors in Splunk APM are slightly different than the set of built-in alert conditions for detectors in Splunk Infrastructure Monitoring. To see the list of built-in alert conditions and their definitions in Splunk APM, see :ref:`alert-conditions-apm`.

   * - Monitoring MetricSets 
     - 
       * :ref:`apm-index-span-tags`
       * :ref:`cmms`
       * :ref:`troubleshoot-mms`





  


