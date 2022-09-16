.. _RUM-metrics:


**********************************
Splunk RUM metrics reference
**********************************


The following tables list all of the metrics available in Splunk RUM. All errors in Splunk RUM have the dimension ``sf_error=true``.



Custom event metrics 
=================================
Metrics for custom events are applicable to both browser and mobile.

.. list-table:: 
   :widths: 25 25 
   :header-rows: 1

   * - :strong:`Metric`
     - :strong:`Name`
   * - Custom event requests/errors
     - :code:`rum.workflow.count`
   * - Custom event latency
     - :code:`rum.workflow.time.ns.p75`  


.. _rum-browser-metric:
 
Browser metrics 
=================================

The following metrics are available for browser:

.. list-table:: 
   :widths: 25 25 
   :header-rows: 1

   * - :strong:`Metric`
     - :strong:`Name`
   * - LCP 
     - :code:`rum.webvitals_lcp.time.ns.p75`
   * - CLS
     - :code:`rum.webvitals_cls.score.p75`
   * - FID
     - :code:`rum.webvitals_fid.time.ns.p75`   
   * - Page views 
     - :code:`rum.page_view.count`      
   * - Page load latency 
     - :code:`rum.page_view.time.ns.p75`
   * - JavaScript errors 
     - :code:`rum.client_error.count`
   * - Long task count
     - :code:`rum.long_task.count`
   * - Long task length
     - :code:`rum.long_task.time.ns.p75`
   * - AJAX and back-end requests/errors
     - :code:`rum.resource_request.count` 
   * - AJAX and back-end latency 
     - :code:`rum.resource_request.time.ns.p75`
   * - TTFB 
     - :code:`rum.resource_request.ttfb.time.ns.p75`
  



.. _rum-mobile-metric:

Mobile metrics 
=================================


The following metrics are available for mobile:

.. list-table:: 
   :widths: 25 25 
   :header-rows: 1

   * - :strong:`Metric`
     - :strong:`Name`
   * - Mobile crash 
     - :code:`rum.crash.count`
   * - App error 
     - :code:`rum.app_error.count`
   * - Cold start
     - :code:`rum.cold_start.time.ns.p75`
   * - Cold start count  
     - :code:`rum.cold_start.count`
   * - Warm start count
     - :code:`rum.warm_start.count`
   * - Warm start time 
     - :code:`rum.warm_start.time.ns.p75`
   * - Hot start count 
     - :code:`rum.hot_start.count`
   * - Hot start time 
     - :code:`rum.hot_start.time.ns.p75`
   * - Network or back-end requests/errors
     - :code:`rum.resource_request.count`
   * - Network back-end latency
     - :code:`rum.resource_request.time.ns.p75`
     

Learn more 
============
To learn how to set alerts on metrics in Splunk RUM, or about metrics in Splunk Observability Cloud, see: 

* :ref:`get-started-metrics`
* :ref:`rum-alerts`