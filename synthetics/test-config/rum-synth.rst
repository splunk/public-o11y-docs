.. _rum-synth:

********************************************************************************
Review Web Vitals for Synthetics tests with Splunk RUM 
********************************************************************************

.. meta::
    :description: Learn how to integrate Splunk RUM with Splunk Synthetic Monitoring.


Splunk Synthetic Monitoring automatically collects Web Vitals for Browser tests. If you also want to measure Web Vital metrics against your run results, then integrate Splunk Synthetic Monitoring with Splunk RUM. Web Vitals capture key metrics that affect user experience and assess the overall performance of your site. Many businesses rely on search engines for users to discover their sites. Google uses Web Vitals to determine page ranking. 

.. list-table::
   :header-rows: 1
   :widths: 20 80 

   * - :strong:`Metric name`
     - :strong:`Description`
   
   * - Largest contentful paint (LCP)
     - Measures loading performance by capturing the render time of the largest image or text block visible within the viewport.
   * - Cumulative layout shift (CLS)
     -  Measures visual stability by capturing the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page. A layout shift occurs any time a visible element changes its position from one rendered frame to the next. Fewer shifts are better for page stability.
   * - First input delay (FID)
     - Measures the time from when a user first interacts with a web page to the time when the browser responds to that interaction.
   * - Total blocking time (TBT)
     - Measures the time it takes a page to become interactive and responsive for a user. 
       TBT is collected from a synthetic test, while FID is collected from real user data. They are considered equivalent to each other because they measure the same metric.



Prerequisites 
=================
To measure Web Vital metrics against your run results, you need to instrument your browser application with Splunk RUM. See, :ref:`browser-rum-gdi`.

View Web Vitals for your run results 
==========================================
Navigate to the run results page for the test you're interested in monitoring. The metrics panel for each run result lists Web Vitals, performance timing, and other metrics. Each Web Vital shows how your metrics compare to the acceptable range. 
 
For example, this image shows the acceptable ranges for TBT. Select the flash light icon to open the sessions in Tag Spotlight in Splunk RUM. The visit count represents the number of users and synthetic tests that have interacted with the normalized URL specified in the test.  

.. image:: /_images/rum/TBT-range.png
      :width: 30%
      :alt: Shows range of typical performance for TBT times that are poor(greater than 300 ms), need to be improved(between 100-300ms), or good (less than 100 ms). 

Compare latency of a test by run location 
====================================================================================
Web Vitals are a great way of measuring if your tests are actually capturing the performance you expect. Suppose you want to compare the latency of your tests by run location. Open the run results of your test. In the metrics panel, select the filter icon to open the run location options dialog box. 

.. image:: /_images/rum/rum-synth-filter.png
      :width: 30%
      :alt: Shows how to toggle among four location options: global, country, region, city. 

Example
------------------
The site reliability engineering (SRE) team at the fictitious Buttercup Games company sets up tests to monitor the checkout workflow for their online store using an API test. For steps on how they setup their API test, see :ref:`api-test-scenario`. The SRE team wants to determine the health of the API test by run location. The data centers for Buttercup Games are in Johannesburg and the Web Vitals for the local tests reflect optimal performance. 

Using the RUM integration, the SRE team can compared Web Vitals by global results and found that the LCP really lagged. 

.. image:: /_images/rum/web-vital-example.png
      :width: 30%
      :alt: Shows LCP range for global view. 

To investigate which regions are experiencing poor performance, the SRE team selects the RUM link to Tag Spotlight. The team sees that Mumbai has a large range of response times for LCP. The SRE team can apply Mumbai as a filter and explore individual user sessions to find if there are performance discrepancies in relation to the of type of browser, browser version, OS Version, App version and more.  

.. image:: /_images/rum/tag-spotlight-rum-snyth.png
      :width: 80%
      :alt: Shows Tag Spotlight dashboard for global view of LCP metric. 


See also 
=========

To learn more about:

* Web Vitals, see :new-page:`https://web.dev/vitals/` in the Google developer documentation
* What kind of use cases you can solve with Splunk RUM, see :ref:`scenario-landingpage`
* Tag Spotlight, see :ref:`error-aggregates`