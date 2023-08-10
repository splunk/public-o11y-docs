.. _scenario-monitoring:

******************************************************************************
Scenario: Kai identifies performance bottlenecks with Splunk RUM for Browser
******************************************************************************

The following scenario features Buttercup Industries, a fictitious e-commerce company.


About this scenario
================================

Kai is a site reliability engineer at Buttercup Industries e-commerce company. One of Kai’s main concerns is monitoring the performance of the Buttercup Industries website. When sites are sluggish, users get frustrated and are more likely to abandon a slow site in favor of a faster competitor. In this example, Kai uses Splunk RUM for Browser and Splunk Observability Cloud to identify performance bottlenecks and monitor Web Vitals so that they can troubleshoot customer facing issues on the Buttercup Industries website. 

Web vitals 
------------------------
Many businesses rely on search engines for users to discover their sites. Google uses web vitals to determine page ranking. Splunk RUM automatically measures Web Vital metrics so Kai can tune into the overview page to check in on the metric scores.

Web Vitals are made up of three metrics that measure user experience:

* LCP (largest contentful paint)
* CLS (cumulative layout shift)
* FID (first input delay).

Monitor Web Vitals 
======================

To monitor the Web Vitals, Kai follows these steps: 

1. Kai opens RUM. From the left navigation panel, they select :strong:`RUM` and :strong:`Browser` as the source. 

    The following image shows the application summary dashboard. Kai sees key metrics about the health of their application like:

    * Web vitals

    * Page views/errors

    * Network requests/errors

    * JavaScript errors

    * Detectors

    In the Application summary dashboard, Kai sees that LCP has a poor performance score. 

    ..  image:: /_images/rum/use-case-app-summary-dashboard.png
        :width: 100%
        :alt: This image shows the application summary dashboard in Splunk RUM for Browser. 

3. Kai clicks on the LCP metric to see more in Tag Spotlight.

    * Kai can also get to Tag Spotlight by clicking into any metric in the Overview page. In Tag Spotlight Kai can filter session aggregates by endpoint, pages, environments, operation, and more.

4. In Tag Spotlight, Kai sees that the P99 loading time for the site is abnormally slow, 53.86s for Chrome users! 
   
    * This image shows the Browser metric in Tag Spotlight. As the width of the bars in the chart indicate, Chrome has the most users.

    ..  image:: /_images/rum/Browser-usecase.png
        :width: 60%
        :alt: This image shows the browser metric in Tag Spotlight. 


Drill down to a User session to troubleshoot slow loading
========================================================================================

In Tag Spotlight, Kai found that something is causing the loading speed of the website to decrease. To dig deeper, Kai opens up an :ref:`User session<example-session>`. By looking in an example session, Kai can investigate the causes of the latency issue.

1. Kai opens User sessions from Tag Spotlight by clicking the :strong:`User sessions` tab. 

    * The User sessions tab in the Tag Spotlight view shows sessions that contain certain characteristics based on the filters selected. 

2. Kai sorts the User sessions by LCP duration to drill into a session with a long load time. Kai opens Session Details by clicking on the session ID like the following image. 

    ..  image:: /_images/rum/buttercup-performance-usecase.png
        :width: 90%
        :alt: This image shows a session for LCP in User sessions.

3. In the Session Details view, Kai discovers that the loading latency is from a third-party resource like the following image. 

    ..  image:: /_images/rum/resource-latency-use-case.png
        :width: 90%
        :alt: This image shows a session from the session details page.  

Summary
==============

In this scenario, Kai identified problems on the Buttercup Industries website performance by doing the following:

* Monitoring the Web Vitals in the Application Summary Dashboard and identifying that LCP was really slow. 

* Investigated the data in Tag Spotlight and discovered there was a loading problem. 

* Kai opened an User session to troubleshoot and learned that the resource loading issue was from a third party vendor.  

* Kai reported the issue to the Buttercup Industries developer team so that they can reproduce the issue and work on a fix. 

* By helping the team improve the Web Vitals score, Kai also helped improve the search engine optimization for their site. 

* Finally, Kai can also configure detectors to alert on their Splunk RUM metrics. 

To learn more about how you can optimize your experience with Splunk Observability Cloud, see:  

.. list-table::
   :header-rows: 1
   :widths: 15, 50

   * - :strong:`Subject`
     - :strong:`Resource`
   * - Video tutorials and blog articles 
     - 
       * `Splunk Real User Monitoring (RUM) <https://www.youtube.com/playlist?list=PLxkFdMSHYh3Ssnamoroj_NiyBhAZos_TM>`_ on the Splunk YouTube channel.  
   * - Splunk RUM Documentation 
     -  
       * :ref:`troubleshoot-tag-spotlight`
       * :ref:`apm-tag-spotlight`
       * :ref:`Create charts in Splunk Observability Cloud<create-charts>`
       * :ref:`Create and customize dashboards<dashboard-create-customize>`
       * :ref:`rum-custom-event`
       * :ref:`rum-alerts`
       * :ref:`Track service performance using dashboards in Splunk APM<apm-dashboards>`