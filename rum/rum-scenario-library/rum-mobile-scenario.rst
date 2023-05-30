.. _rum-mobile-scenario:


*************************************************************************************
Scenario: Kai finds the root cause of a user reported error in Splunk RUM for Mobile  
*************************************************************************************


The following scenario features Buttercup Industries, a fictitious e-commerce company.

About this scenario
================================

Buttercup Industries recently launched a mobile application. Kai, a site reliability engineer at Buttercup Industries, uses Splunk RUM for Mobile to monitor releases, find root causes of user reported issues, and measure important metrics. In this scenario, you can learn about how Kai leverages Splunk RUM for Mobile to monitor and improve the experience of the Buttercup Mobile app. 


Find the root cause of a user reported error 
================================================================

Sometimes, users report an issue in the app that requires a lot of digging to find the root cause. For example, if a user says the app isn’t working, it can be tricky to find where to start troubleshooting. With Splunk RUM for Mobile, Kai can search for a the specific user session.

Splunk RUM Mobile captures:

    * every screen transition

    * app lifecycle events (app in foreground, background, app start times)

    * network requests

    * app errors and crashes

    * ability to :ref:`rum-custom-event`


Search for a specific session to identify a user reported error
------------------------------------------------------------------------------

A user reported that the Buttercup Industries mobile app crashed during the checkout workflow. Kai uses Splunk RUM to trace  the user session all the way back to app launch so that they can advise the developers on how to reproduce the issue and fix the root cause.

Kai follows these steps to find a root cause of an error:

1. Kai opens RUM. From the left navigation panel, they select RUM then Mobile as the source. The following image shows the application summary dashboard which lists key metrics about the health of their application like:

    * App launches, errors, and crashes

    * Network requests and errors

    * App startup time

    * Detectors

    ..  image:: /_images/rum/mobile-use-case-overview.png
        :width: 100%
        :alt: This image shows the Overview page of Splunk RUM for Mobile. 

2. Kai selects :strong:`See all ButtercupMobile` metrics to open the Overview dashboard. The overview page shows a summary of aggregate metrics. From the overview page, Kai can click on any link to open Tag Spotlight.

3. Kai searches for sessions associated with the custom event userID by applying a filter like in the following image. To learn more, see :ref:`rum-custom-event`.

    ..  image:: /_images/rum/mobile-use-case-filter.png
        :width: 100%
        :alt: This image shows how to filter in Splunk RUM. 

4. Kai finds that there is an issue with an error on the ShoppingCart screen and opens an User session to see more sessions related to the crash. To learn more about User sessions, see :ref:`User sessions<example-session>`.

    ..  image:: /_images/rum/mobile-use-case-user-session.png
        :width: 100%
        :alt: This image shows how to filter in Splunk RUM. 

5. Kai reports the error to the development team and outlines the steps to reproduce the crash and components are affected. 

Summary 
=========

In this scenario, Kai searched for a specific session using filters and reviewed a collection of sessions in Tag Spotlight and User sessions.

To learn more about how you can optimize your experience with Splunk Observability Cloud, see:  

.. list-table::
   :header-rows: 1
   :widths: 15, 50

   * - :strong:`Subject`
     - :strong:`Resource`
   * - Video tutorials and blog articles 
     - 
       * `Splunk Real User Monitoring (RUM) <https://www.youtube.com/playlist?list=PLxkFdMSHYh3Ssnamoroj_NiyBhAZos_TM>`_ on the Splunk YouTube channel. 
       * `Optimizing Mobile App Startup with Splunk Real User Monitoring <https://www.splunk.com/en_us/blog/devops/optimizing-mobile-app-startup-with-splunk-real-user-monitoring.html>`_.
       * `Deep Dive into the App Start Experience <https://www.splunk.com/en_us/blog/devops/deep-dive-into-the-app-start-experience.html>`_.
   * - Splunk RUM Documentation 
     -  
       * :ref:`troubleshoot-tag-spotlight`
       * :ref:`apm-tag-spotlight`
       * :ref:`Create charts in Splunk Observability Cloud<create-charts>`
       * :ref:`Create and customize dashboards<dashboard-create-customize>`
       * :ref:`rum-custom-event`
       * :ref:`rum-alerts`
       * :ref:`Track service performance using dashboards in Splunk APM<apm-dashboards>`
