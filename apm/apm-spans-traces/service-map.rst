.. _apm-service-map:

************************************************************
View dependencies among your services in the service map
************************************************************

.. meta::
   :description: Learn about the service map displays for your services in Splunk APM. 

The service map, located in Splunk APM :guilabel:`Explore` view, displays the dependencies and connections among your instrumented and inferred services in APM. The map is dynamically generated based on your selections in the time range, environment, workflow, service, and tag filters. See :ref:`apm-inferred-services` to learn more about inferred services in APM.

You can use the service map to identify dependencies, performance bottlenecks, and error propagation. 

For a detailed scenario involving the service map, see :ref:`service-map`. 

The following screenshot shows an example service map: 

..  image:: /_images/apm/spans-traces/service-map-01.png
    :width: 95%
    :alt: This screenshot shows an example of the service map in Splunk APM Explore view.


Access the service map
========================

Use these steps to access the service map in Splunk APM: 

#. Log into Splunk Observability Cloud. 
#. Select the :guilabel:`APM` icon in the navigation bar. 
#. Select :guilabel:`Explore` on the APM Landing Page. The Explore view opens, with the service map in the center. 

Using the service map, you can do the following: 

* Hover over a node or edge to view a pop-up chart of the request, error, and latency (RED) metrics for that node or edge.
* Select any node in the service map to see charts for that node in the service panel. 
* Double-select on a node in the service map to isolate to that node and its immediate dependencies in the service map.
* Use the :guilabel:`Breakdown` option to break the service activity down by any indexed span tag. See :ref:`service-map-breakdowns` to learn more.
* Select any chart in this view to show example traces that match the parameters of the chart.  

You can also use the service map as a starting point for monitoring or troubleshooting scenarios:

* To get real-time monitoring insights on the service, select :guilabel:`View Dashboard` in the side panel to view the built-in service dashboard. See :ref:`apm-dashboards` to learn more.
* To do more extensive troubleshooting, select the :guilabel:`Tag Spotlight` tab in the side panel to open Tag Spotlight. See :ref:`apm-tag-spotlight` to learn more.


.. _service-map-breakdowns:

Perform breakdowns in the service map
===========================================

The following screenshot shows an example service map in which the ``paymentservice`` node is broken down by endpoint, showing that errors with the payment service are occurring in the ``/Charge`` endpoint. 

..  image:: /_images/apm/spans-traces/service-map-02-breakdown.png
    :width: 95%
    :alt: This screenshot shows an example of the service map in Splunk APM Explore view. The ``paymentservice`` node is broken down by endpoint, showing that errors with that service are arising in the ``/Charge`` endpoint.

The following screenshot shows the same service map with an additional breakdown on the ``checkoutservice`` by endpoint. This shows that the errors occurring in the ``/Charge`` endpoint of the ``paymentservice`` originate in the ``/placeOrder`` endpoint of the ``checkoutservice``. 

..  image:: /_images/apm/spans-traces/service-map-03-breakdown.png
    :width: 95%
    :alt: This screenshot shows an example of the service map in Splunk APM Explore view. The ``paymentservice`` and ``checkoutservice`` nodes are broken down by endpoint.

To breakdown the service map:

#. Select a service you're interested in. 
#. In the service tab, select :guilabel:`Breakdown` and select an option from the menu. This breaks down your view of the service by the feature you select. For example, select :guilabel:`Endpoint` then :guilabel:`Latency (P90)` to break the service node down into its endpoints, ranked from highest to lowest by 90th percentile latency. If there are more than 5 breakdown values, the breakdown shows the top 5 and groups the remainder into a node labeled :guilabel:`<other>`.
#. (Optional) Select a node within the breakdown to further break down the visualization by another feature. 

Share your view of the service map
======================================
To share your view of the service map with a colleague, copy and share the URL. Your current filter selections are preserved in the URL.

Service map thresholds
===========================================

The following table presents applicable thresholds and limits in the service map:
 
.. list-table::
   :header-rows: 1
   :widths: 70 30

   * - :strong:`Description`
     - :strong:`Threshold value`

   * - Error rate in "risk" zone, displayed in yellow
     - 5%

   * - Error rate in "critical" zone, displayed in red
     - 20%

   * - P90 latency in "critical" zone, displayed in red
     - 1 second

   * - Maximum number of nodes visible in the service map at once
     - 200 service nodes

   * - Character limit for service and operation names 
     - 1024 characters
