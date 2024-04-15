.. _rum-custom-dashboards:

************************************************************
Splunk RUM custom dashboards 
************************************************************

.. meta::
   :description: Create custom dashboards in Splunk RUM to track application metrics that are most relevant to your business. 

Create a custom dashboard for any Splunk RUM metric. 


1. In the left navigation menu, select :menuselection:`Dashboards`> :strong:`+`> :strong:`Dashboard`
2. Select the charts you want to create with the metrics of interest to you. For more information, see :ref:`dashboard-create-customize`.
3. Save your dashboard. 

Metrics
==========

The following metrics are available in Splunk RUM. All errors in Splunk RUM have the dimension ``sf_error=true``.

* :ref:`RUM Browser metrics <browser-rum-metrics>`
* :ref:`RUM iOS metrics <rum-ios-metrics>`
* :ref:`RUM Android metrics <rum-android-metrics>`
* :ref:`rum-custom-event-metrics`


Page level dashboards
========================

Metrics with the prefix ``rum.node.`` are page level metrics, whereas metrics with the prefix ``rum.`` are application level metrics. 
For example, ``rum.node.workflow.count`` represents the total number of spans with the selected custom event in the given time range sorted by page. Page level metrics also have a dimension ``sf_node_name``, which you can use to filter on specific pages.


Use case
============

The following use case features an example from Kai, a site reliability engineer at Buttercup Industries, a fictitious e-commerce company.

.. _custom-events-dash:

Monitor custom events and page level metrics
---------------------------------------------

Kai uses custom dashboards to get a high level assessment of the health of the Buttercup Industries applications. They go to :menuselection:`Dashboards` to create a new dashboard. Kai wants to look at custom events and page level metrics for page views. The first chart utilizes the metric ``rum.node.workflow.count``. The second chart shows the metric ``rum.node.page_view.count`` which shows custom events and page level metrics for page views. Here is how Kai set up their dashboard: 


..  image:: /_images/rum/use-case-custom-dashboard.png
    :width: 90%
    :alt: This image shows two charts. The first chart shows a line chart of custom events and the second chart shows a line chart for page views represented by page. 

With this dashboard Kai can monitor custom events and page level metrics. 



..
    View average HTTP response rate at an app level.
    ------------------------------------------------


    Plot a conversion rate
    ------------------------------


    Plot slowest page loads
    ------------------------------

    AppDex
    ------------------------------

    View version adoption for an app
    ------------------------------