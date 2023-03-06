.. _rum-built-in-dashboards:

************************************************************
Splunk RUM built-in dashboards 
************************************************************

Built-in dashboards offer charts, metrics, and aggregations about your applications. 

.. list-table::
   :widths: 20 20 
   :header-rows: 1

   * - :strong:`Dashboard`
     - :strong:`Type of data`
   * - Mobile app health
     - 
        * App crashes and errors 
        * App launch statistics 
        * Network performance metrics
   * - Browser app health
     - 
        * Page loads and route changes
        * Web vitals
        * Network performance metrics

   * - Browser page health
     -  
        * Page loads and route changes
        * Web vitals by page 
        * Network performance metrics by page 

Navigate to RUM built-in dashboards  
====================================

To go to the built-in dashboards: 

#. Select :guilabel:`Dashboards` >  :guilabel:`RUM applications` > then select either Mobile App Health or Browser App Health.

* You can also navigate to the dashboards from RUM with the :guilabel:`...` settings button. 

#. To switch between the Mobile versus Browser view, select:

    * :guilabel:`Mobile app health` 
    * :guilabel:`Browser app health`
    * :guilabel:`Browser page health`

#. To open Splunk RUM and explore data from a built-in dashboard, select the settings symbol in any tile, then :guilabel:`Troubleshoot from this time window`.


Built-in dashboard use cases
========================================

The following use cases feature examples from Buttercup Industries, a fictitious e-commerce company.


Troubleshoot from a built-in dashboard 
---------------------------------------------

Kai, a site reliability engineer at Buttercup Industries, uses Splunk RUM for Browser to identify performance bottlenecks and monitor Web Vitals so that they can troubleshoot customer facing issues on the Buttercup Industries website. Kai uses built-in dashboards to get a high level assessment of the health of the Buttercup Industries applications. They open RUM through the :guilabel:`Troubleshoot from this time window` to dig into the data. For example, if Kai wants to explore traffic by Browser type, they can explore more data in Splunk RUM like this:


..  image:: /_images/rum/troubleshoot-dashboard-rum.png
    :width: 90%
    :alt: This image shows how to open a chart in RUM so that you can troubleshoot in greater detail. 


Review a larger time range of data 
----------------------------------------------

Kai, a site reliability engineer at Buttercup Industries, uses Splunk RUM for Mobile to monitor releases, find root causes of user reported issues, and measure important metrics. Kai looks at the :guilabel:`Application summary dashboard` to see an overview of mobile performance metrics. If Kai sees a troublesome trend, they can open the built-in dashboard to see a longer period of time for the data they're interested in. Data from RUM is retained for 8 days. Data from a built-in dashboard is kept for 13 months. For more on data retention, see :ref:`data-o11y`.

..  image:: /_images/rum/mobile-rum-view-dashboard.png
    :width: 70%
    :alt: This image shows how to open a chart in RUM so that you can troubleshoot in greater detail. 


Dashboards for alerts and detectors
==================================================

To create charts and dashboards for your RUM alerts and detectors, see:   

* :ref:`Link detectors to charts <linking-detectors>` in Alerts & Detectors.    

* :ref:`Dashboards in Splunk Observability Cloud <dashboards>` in Dashboards and Charts. 


Learn more 
==============

* :ref:`Track service performance using dashboards in Splunk APM<apm-dashboards>`
* :ref:`Create and customize dashboards<dashboard-create-customize>`