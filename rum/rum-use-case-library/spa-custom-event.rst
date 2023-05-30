.. _spa-custom-event:


******************************************************************************
Scenario: Kai creates custom events and monitor a single page application
******************************************************************************

The following scenario features Buttercup Industries, a fictitious e-commerce company.

About this scenario
================================

Buttercup Industries recently started a blog to share customer success stories and engage with their user base. The engineers at Buttercup Industries created the blog as a single-page application (SPA). Kai, a site reliability engineer at Buttercup Industries, monitors the blog with RUM to learn more about route changes, route durations, and back-end calls. Kai also leverages custom events in RUM to monitor how users engage with content on the blog.  

Instrument an SPA with Splunk RUM 
===================================

Splunk RUM for Browser automatically collects metrics on route changes for an SPA. Route changes are events with zero second durations. 

To monitor an SPA in Splunk RUM:

1. Kai instruments the blog and names the application ``ButtercupBlog``. See, :ref:`browser-rum-spas` for the steps they take to instrument an SPA with Splunk RUM. 

2. Kai opens RUM. From the navigation panel, they select :strong:`RUM` and :strong:`Browser` as the source and :strong:`ButtercupBlog` as the Application. 

    In the Application Summary Dashboard Kai sees key metrics about the health of their application, like:

    * Web vitals

    * Page views/errors 

    * Route changes 

    * Network requests/errors

    * JavaScript errors

    * Detectors

3. Kai opens Tag Spotlight to take a look at route changes by clicking :strong:`see all` in the :strong:`Page views/Route changes` metric. The following image shows an example set of urls for the Page views/Route changes metric in RUM. 

    ..  image:: /_images/rum/pageview-routechange.png
        :width: 80%
        :alt: This image shows the Page Views/Route Changes metric in RUM.

4. To explore a specific session, Kai can open :strong:`User sessions`. To learn more, see :ref:`User sessions<example-session>`.

Create a custom event to measure user engagement on blog posts
=================================================================

Kai wants to capture metrics for like and share actions on blog posts to help Buttercup Industries gauge how users are interacting with the content. Since there is no route change, and no URL change when someone likes a blog post, Kai creates a custom event to capture this workflow. Custom events are a great tool for Kai to leverage with MPA (multiple page apps) and SPA when they want to monitor a workflow with custom JavaScript logic. 

To create a custom event in Splunk RUM:

1. Kai creates a custom event called ``blog.likes`` to track how users are engaging with content on the Buttercup Blog. See, :ref:`rum-custom-event` for the steps they take. 

2. To see the metrics on the custom event they created, navigate to Tag Spotlight. Select the custom event metric they're interested in from the top filter bar. 

    ..  image:: /_images/rum/FilterbarSPAusecase.png
        :width: 80%
        :alt: This image shows the Page Views/Route Changes metric in RUM.

Summary 
=========

In this scenario, Kai:

* Instrumented an SPA with Splunk RUM by following these steps: :ref:`browser-rum-spas`.

* Created a custom event to monitor blog posts likes and shares to better understand user engagement by following these steps: :ref:`rum-custom-event`.

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