.. _browser-test-results:

***********************************************
Interpret Browser test results
***********************************************

.. meta::
    :description: Understand the results of browser tests run in Splunk Synthetic Monitoring and learn how to interpret the data in visualizations, such as the waterfall chart. 

Every run of a browser test produces a set of diagnostics that help you understand the performance of your application in real time. 

* :ref:`browser-test-history`
* :ref:`browser-run-results`

.. _browser-test-history:

View browser test history
==================================================================

On the :guilabel:`Test History` page, view a customizable summary of recent run results so that you can assess the performance of your test at a glance. 

To open the :guilabel:`Test History` view for a test, select its row in the :guilabel:`Tests` list.


View results for a specific run
------------------------------------------------------------------

To view the :guilabel:`Run results` for a single run, do any of the following:

* On the :guilabel:`Run results` page, select :guilabel:`Go to all run results` and then select the specific run you're interested in.
* Select a data point within the :guilabel:`Availability` or :guilabel:`Performance KPIs` chart.
* If you're viewing aggregate data (for example, at a resolution higher than the run frequency), select a data point to zoom in. Then select a specific run.
* Select a row in the :guilabel:`Recent run results` table below the chart.


Customize the Performance KPIs chart 
==================================================================

See :ref:`test-kpis`.


.. _browser-run-results:

Interpret Browser test run results
==================================================================

Browser test run results include:

* :ref:`A waterfall chart that shows all the requests for the run by default<run-results-waterfall-chart>`
* :ref:`Metrics related to performance, user experience, resources, and errors<run-results-metrics>`
* :ref:`Video (only in Enterprise Edition)<video>`
* :ref:`Filmstrip (only in Enterprise Edition)<filmstrip>`


.. _run-results-waterfall-chart:

Waterfall chart
------------------------------------------------------------------

Browser test run results include an HTTP archive format (HAR) file that logs the interaction between the test runner and the site being tested. This file records the time it takes for each resource in the site to load. A waterfall chart is the visual representation of the data in a HAR file. The chart contains a timeline on a  horizontal bar for each resource in the page.

The waterfall chart displays all the requests for the run by default. You can filter it to show corresponding entries for a transaction, page, or step. Some steps or transactions might not have any waterfall entries associated with them.

To provide detail on these resources, the waterfall chart contains the following columns:

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


Using the waterfall chart, you can do the following:

- Expand the details in a row to show the request and response headers for that resource.
- Hover over a row of the timeline to view a pop-up message with detailed request timings for that resource.
- Search resources in a page by keywords in the URL.
- Follow a direct link to related back-end spans if the same app is instrumented with APM. See :ref:`Link Synthetic spans to APM spans <synthetics-link-to-apm>`.
- Use the tabs to filter the waterfall chart by resource type, including JS, CSS, Image, Media, JSON, and XML.
- Download all of the run's artifacts including the video and HAR using the Download button dropdown or use  the :new-page:`API <https://dev.splunk.com/observability/reference/api/synthetics_artifacts/latest#endpoint-getartifactsbytestid>`.
- Show or hide columns in the chart.


.. - Customize the statistics displayed for each request inline in the waterfall chart
.. - Filter the waterfall chart by key browser events: Before Start Render, Before Onload, After Onload, Before Fully Loaded.


.. _run-results-metrics:

Browser test metrics
------------------------------------------------------------------
Every run of a browser test produces a set of 40+ metrics that offer a picture of website performance. See :ref:`browser-metrics` for a complete list of these metrics. 


.. _video:

Video
------------------------------------------------------------------

.. note::
  Available in Enterprise Edition.

The video of the site loading in real time shows you what users would experience from the location and device of a particular test run. To download this video as an .mp4 file select the video's vertical dot menu and then select :guilabel:`Download`.  


.. _filmstrip:

Filmstrip
------------------------------------------------------------------

.. note::
  Available in Enterprise Edition.

The filmstrip is at the top of the :guilabel:`Run results` for a single run. It offers frames  from the video taken at the frequency you choose and filtered by synthetic transaction, page, or step:

* To set the frequency of screenshots, select a value from the :guilabel:`Frequency` pull-down menu. Supported frequencies are 100 milliseconds, 500 milliseconds, and one second.
* To filter the filmstrip to show a subset of images, select a value from the Filter by synthetic transaction, page, or step menu.

For optimal performance and display in the filmstrip, limit your browser test to a maximum  of 35 steps.

The filmstrip frames are  annotated with step details (step name and duration). If a  step began within the frame's captured time and the next frame's captured time, the step's start frame contains an annotation for that step along with any other steps that match the criteria. For example, if step 4 started 3.5 seconds into the run and the filmstrip is showing images for every 1s, the frame at 3s is annotated with  step 4's details as it began after the 3 second mark and before the 4 second mark.

The filmstrip is derived from the video, which has a maximum size of 3GB. If the video exceeds that limit, the filmstrip will also not contain anything captured after the limit is reached, but all the other metrics are still stored.

If the run result was a failure, the step that failed the run is highlighted in the filmstrip with error styling. A failing step is always  shown on its own frame even if the frequency of the filmstrip frames would have included it in a preceding frame.

You can also view a video of the site loading in real time. The video of the site loading in real time shows you what users would experience from the location and device of a particular test run. To download this video as an ``.mp4`` file select the video's vertical dot menu and then select :guilabel:`Download`.


.. _detector-browser-test:

Detect and report on your synthetic metrics
==================================================================

To get even more value out of your synthetic metrics, use the metrics engine to create custom metrics, charts, and detectors. See the following links for more information:

* To build charts and dashboards using your metrics, see :ref:`dashboards`.
* To create static threshold detectors natively in Splunk Synthetic Monitoring, see :ref:`synth-alerts`.
* To build more advanced detectors using the Splunk Observability Cloud metrics engine, see :ref:`get-started-detectoralert`.
* To learn more about metrics in Splunk Observability Cloud, see :ref:`get-started-metrics`.



(Optional) Integrate with Splunk RUM 
==================================================================

Splunk Synthetics automatically collects web vitals for browser tests. Web vitals capture key metrics that affect user experience and assess the overall performance of your site. If you also want to measure web vital metrics against your run results, integrate with Splunk RUM. For instructions, see :ref:`rum-synth`.
