.. _browser-test-results:

***********************************************
Interpret Browser test results
***********************************************

.. meta::
    :description: Understand the results of browser tests run in Splunk Synthetic Monitoring and learn how to interpret the data in visualizations, such as the waterfall chart. 

Every run of a Browser Test in Splunk Synthetic Monitoring produces a set of diagnostics that help you understand the performance of your application in real time. 

* :ref:`browser-test-history`
* :ref:`browser-run-results`

.. _browser-test-history:

View Browser test history
==========================

On the :guilabel:`Test History` page, view a customizable summary of recent run results so you can assess the performance of your test at a glance. 

#. To open the :guilabel:`Test History` view for a test, select its row in the :guilabel:`Tests` list.
#. You can take the following actions in the Test History page:

    - Select :guilabel:`Edit test` to edit your test configuration. Note that if you change the name of your test or the name of a synthetic transaction, it may take up to 20 minutes for the updated name to appear in your charts and detectors. 
    - Select :guilabel:`Create detector` to create a detector based on your test. See :ref:`synth-alerts` to learn more. 
    - Select :guilabel:`Actions > Pause test` to pause your test.
    - Select :guilabel:`Actions > Copy test` to make a copy of your test. This opens the :guilabel:`New Browser test` page with the details of the test pre-filled. 

Customize the Performance KPIs chart 
--------------------------------------------------
See :ref:`test-kpis`.

View results for a specific run
---------------------------------
To navigate to the :guilabel:`Run results` view for a single run, select a data point within the :guilabel:`Performance KPIs` chart with the visualization interval at :strong:`Run level` and the segmentation set to :strong:`Location`. 

If you're viewing aggregate data (for example, at a 20-minute interval instead of run level), selecting a data point zooms you in to see run-level detail. Then you can select a specific run to see the :guilabel:`Run results` from there. 

You can also select a row in the :guilabel:`Recent run results` table below the :guilabel:`Performance KPIs` chart.


.. _browser-run-results:

Interpret Browser test run results
=============================================
Every run of a Browser test generates a set of results including a waterfall chart and metrics.

* For a single-page Browser test, you get a single waterfall chart with all requests from that run. 
* For a transactional Browser test, the waterfall chart is divided into sections based on the synthetic transactions in your test. Select the name of a synthetic transaction to expand the list of steps involved in that synthetic transaction. Select the name of a step within a synthetic transaction to expand the list of requests involved in each step.  

.. _waterfall-chart:

Waterfall chart
-----------------
Every run of a Browser test in Splunk Synthetic Monitoring also generates a HTTP archive format (HAR) file that logs the interaction between the test runner and the site being tested. This file records the time it takes for each resource in the site to load.

A waterfall chart is a visual representation of the data in a HAR file. The chart contains a horizontal bar for each resource in the page. To provide detail on these resources, the chart contains the following columns:

.. list-table::
   :header-rows: 1
   :widths: 15 25 60

   * - :strong:`Column name`
     - :strong:`Example`
     - :strong:`Description`

   * - Method
     - ``GET``
     - HTTP method for each resource. Most requests to load a page are GET requests, though there might also be POST requests when a user or synthetic test enters data into the page.
   
   * - File
     - ``hero.png``
     - File name of the resource, extracted from the URL where the resource is located. Hover over the cell to view the entire URL. 
    
   * - Domain
     - ``buttercupgames.com``
     - Domain where the resource is hosted.

   * - Size
     - ``1.4 KB``
     - Uncompressed size of the resource.
    
   * - Status
     - ``200``
     - HTTP response code of the request for the resource.

   * - Timeline
     - Colored bars indicating the durations of parts of the request
     - Timeline for the page load. This timeline begins at ``0 ms`` and ends at the time at which the last request in the page finished loading. A multicolored horizontal bar in each row represents the loading time of the resource. Each color represents a different part of the loading process of the resource. Hover over the timeline to view a pop-up message with detailed request timings. 


|

Using the waterfall chart, you can do the following:

- Expand the details in a row to show the request and response headers for that resource.
- Hover over a row of the timeline to view a pop-up message with detailed request timings for that resource.
- Search resources in a page by keywords in the URL.
- Follow a direct link to related back-end spans if the same app is instrumented with APM. See :ref:`Link Synthetic spans to APM spans <synthetics-link-to-apm>`.
- Use the tabs to filter the waterfall chart by resource type, including JS, CSS, Image, Media, JSON, and XML.
- Download the raw HAR file, using the :new-page:`API <https://dev.splunk.com/observability/reference/api/synthetics_artifacts/latest#endpoint-getartifactsbytestid>`.
- Show or hide columns in the chart

.. - Customize the statistics displayed for each request inline in the waterfall chart
.. - Filter the waterfall chart by key browser events: Before Start Render, Before Onload, After Onload, Before Fully Loaded.

.. _filmstrip:

Filmstrip
-----------
:strong:`Available in Enterprise Edition.`

The filmstrip offers a screenshot of site performance at specific intervals on a timeline, so that you can see how the page responds in real time. By default, the filmstrip provides a screenshot and the time in milliseconds for every visual change as the page loads. You can also use the interval selector to view screenshots for every 100 milliseconds, 500 milliseconds, and one second. The maximum number of steps for optimal performance is 35. The maximum data per filmstrip is 3GB. If your filmstrip is larger than 2GB, the remaining video isn't colleceted but all the other metrics are still stored.

.. _video:

Video
-------
:strong:`Available in Enterprise Edition.`

In the filmstrip view, you can also view a video of the site loading in real time. This lets you see exactly what a user trying to load your site from the location and device of a particular test run would experience. You can use the :guilabel:`Download Video` button to download this video as an .mp4 file for later reference.  

.. Post-GA version: In the filmstrip view, you can also view a video of the site loading in real time, or at a faster or slower speed of your choosing. This lets you see exactly what a user trying to load your site from the location and device of a particular test run would experience. You can use the :guilabel:`Download Video` button to download this video as an .mp4 file for later reference.  

Browser test metrics
----------------------
In addition to these diagnostics, every run of a Browser Test produces a set of 40+ metrics that offer a picture of website performance. See :ref:`browser-metrics` for a complete list of these metrics. 


.. _detector-browser-test:

Detect and report on your synthetic metrics
------------------------------------------------------------------
To get even more value out of your synthetic metrics, use the metrics engine to create custom metrics, charts, and detectors. See the following links for more information:

* To build charts and dashboards using your metrics, see :ref:`dashboards`.
* To create static threshold detectors natively in Splunk Synthetic Monitoring, see :ref:`synth-alerts`.
* To build more advanced detectors using the Splunk Observability Cloud metrics engine, see :ref:`get-started-detectoralert`.
* To learn more about metrics in Splunk Observability Cloud, see :ref:`get-started-metrics`.



(Optional) Splunk RUM integration 
------------------------------------
Splunk Synthetic Monitoring automatically collects web vitals for Browser tests. If you also want to measure web vital metrics against your run results, then integrate with Splunk RUM. Web vitals capture key metrics that affect user experience and assess the overall performance of your site. For more, see :ref:`rum-synth`.
