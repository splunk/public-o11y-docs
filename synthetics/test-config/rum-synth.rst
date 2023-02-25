.. _rum-synth:

********************************************************************************
(Optional) Splunk RUM metrics integration 
********************************************************************************

.. meta::
    :description: Learn how to integrate Splunk RUM with Splunk Synthetic Monitoring.

Integrate with Splunk RUM so that you can automatically measure Web Vital metrics against your run results. Web vitals capture key metrics that affect user experience and assess the overall performance of your site.  Many businesses rely on search engines for users to discover their sites. Google uses web vitals to determine page ranking. 

Web vitals are made up of these metrics that measure user experience.

.. list-table::
   :header-rows: 1
   :widths: 20 80 

   * - :strong:`Metric name`
     - :strong:`Description`
   
   * - Largest contentful paint (LCP)
     - Measures loading performance by capturing the render time of the largest image or text block visible within the viewport.
   * - Cumulative layout shift (CLS)
     -  Measures visual stability by capturing the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page. A layout shift occurs any time a visible element changes its position from one rendered frame to the next. Fewer shifts are better for page stability.
   * - First input delay(FID)
     - Measures the time from when a user first interacts with a web page to the time when the browser is able to respond to that interaction
   * - Total blocking time (TBT)
     - TBT is collected from a synthetic test, while FID is collected from real user data and they both may be considered equivalent to each other since they measure the same metric: time taken by the page to become interactive and responsiveness to the user.


Prerequisites 
=================
You need to instrument your broswer application with Splunk RUM. See, :ref:`browser-rum-gdi`.

View web vitals for your run results 
==========================================
Navigate to the run results page for the test you're interested in monitoring. The metrics panel for each run result lists web vitals, performance timing, and other metrics. Each web vital shows how your metrics compare to the acceptable range. 
 
For example, this image shows the acceptable ranges for TBT. Select the flash light icon to open the sessions in Tag Spotlight in Splunk RUM. 

.. image:: /_images/rum/TBT-range.png
      :width: 30%
      :alt: Shows range of typical performance for TBT times that are poor(greater than 300 ms), need to be improved(between 100-300ms), or good (less than 100 ms). 

Example
==============
Web vitals are a great way of measuring if your tests are actually capturing the performance you expect. Suppose you want to compare latency for tests by location... 


See also 
=========

To learn more about:

* Web Vitals, see :new-page:`https://web.dev/vitals/` in the Google developer documentation
* what kind of use cases you can solve with Splunk RUM, see :ref:`use-case-landingpage`
* Tag spotlight, see :ref:`error-aggregates`.