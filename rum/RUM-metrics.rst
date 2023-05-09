.. _rum-metrics:


**********************************
Splunk RUM metrics reference
**********************************


The following metrics are available in Splunk RUM. All errors in Splunk RUM have the dimension ``sf_error=true``.

* :ref:`RUM Browser metrics <browser-rum-default-tags>`
* :ref:`RUM iOS metrics <rum-ios-metrics>`
* :ref:`RUM Android metrics <rum-android-metrics>`
* :ref:`rum-subscription-usage`


Aggregates versus page level metrics 
==================================================================
Metrics with the prefix ``rum.node.`` are page level metrics, whereas metrics with the prefix ``rum.`` are aggregations of multiple pages. Page level metrics also have a dimension ``sf_node_name``, which you can use to filter on specific pages.

.. _rum-custom-event-metrics:

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


Learn more 
============
To learn how to set alerts on metrics in Splunk RUM, or about metrics in Splunk Observability Cloud, see: 

* :ref:`get-started-metrics`
* :ref:`rum-alerts`