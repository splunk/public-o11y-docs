.. _browser-metrics:

**********************
Browser test metrics
**********************

.. meta::
    :description: Learn about metrics for Browser tests in Splunk Synthetic Monitoring.

Metrics in Splunk Synthetic Monitoring are numeric indicators of site performance that synthetic tests capture in each run of a test. 

Metrics for Browser tests
=================================
Browser tests capture 40+ metrics that offer a complete picture of your website performance. You can also configure custom metrics to gather the information you care about most. The following sections detail the three main types of metrics that Browser tests can capture.  

* :ref:`test-level-metrics`
* :ref:`page-level-metrics`
* :ref:`transaction-level-metrics`


Dimensions
---------------

All Splunk Synthetic Monitoring metrics contain the following dimensions:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Dimension`
     - :strong:`Description`

   * - ``success``
     - ``true`` if the run succeeds; ``false`` if it fails.

   * - ``failed``
     - ``true`` if the run fails, ``false`` if it succeeds.

   * - ``location_id``
     - The ID of the location for this run.

   * - ``test_id``
     - The ID of this test.    

   * - ``test_type``
     - The test type dimension for Browser tests is set to ``browser``. 

.. _test-level-metrics:

Test-level metrics in Browser tests
-------------------------------------
.. list-table::
   :header-rows: 1
   :widths: 15 20 65

   * - :strong:`Metric label`
     - :strong:`Source metric name`
     - :strong:`Description`

   * - Uptime
     - ``synthetics.run.uptime.percent``
     - In Browser tests, the Uptime represents the percentage of non-failed test runs. Uptime is calculated by taking the average score of all runs in the selected time frame, where a successful run receives a score of 100 and a failure receives a score of 0.

   * - Downtime
     - ``synthetics.run.downtime.percent``
     - The percentage of failed runs within the selected time frame. Downtime is calculated by taking the average score of all runs in the selected time frame, where a failed run receives a score of 100 and a successful run receives a score of 0.

   * - Run count
     - ``synthetics.run.count``
     - Total number of runs for the test. This metric contains dimensions such as ``success: true`` and ``failed: false`` to indicate whether the run succeeded or failed. 

   * - Run-level duration
     - ``synthetics.run.duration.time.ms``
     - The total duration of the entire run, including all pages and synthetic transactions. 

  
.. _page-level-metrics:

Page-level metrics in Browser tests
--------------------------------------
Browser tests in Splunk Synthetic Monitoring automatically capture a set of 46 default metrics for each page load. These metrics are grouped into several categories. See the tables below for details on all default page-level metrics. 

Page-level metrics include an additional ``page_position`` dimension that refers to the position of the page within the test. The position of the first page in the test is 0, the second page has position 1, and so on. If you choose a page-level metric in the Performance KPIs chart or in a detector without specifying a page in the ``page_position`` dimension, the metric value is aggregated across all pages. 

Performance timings
^^^^^^^^^^^^^^^^^^^^
Performance timing metrics capture information about how long it takes resources on the page to render. 

.. list-table::
   :header-rows: 1
   :widths: 15 20 65

   * - :strong:`Metric label`
     - :strong:`Source metric name`
     - :strong:`Description`
   
   * - DNS time
     - ``synthetics.dns.time.ms``
     - Time required to resolve a host name from the DNS server.

   * - DOM complete time
     - ``synthetics.dom_complete.time.ms``
     - Time until the Document Object Model (DOM) and all of its subresources are ready.

   * - DOM interactive time
     - ``synthetics.dom_interactive.time.ms``
     - Time until the Document Object Model (DOM) is fully loaded and processed.

   * - DOM load time
     - ``synthetics.dom_load.time.ms``
     - Time until the Document Object Model (DOM) has loaded, and the initial markup has been parsed. This metric corresponds to the browser ``DOMContentLoaded`` event.

   * - Time to first byte (TTFB)
     - ``synthetics.ttfb.time.ms``
     - Time from the start of the first request until receiving the first byte of the first non-redirect request. ``3xx`` redirects increase the duration of this time.

   * - Duration/Response time
     - ``synthetics.duration.time.ms``
     - The response time for a single-page Browser test is the same as the load time. 

   * - First paint time
     - ``synthetics.first_paint.time.ms``
     - Time until the browser renders anything other than the default background.

   * - First contentful paint time
     - ``synthetics.first_contentful_paint.time.ms``
     - Time until the browser first renders any content.

   * - First meaningful paint time
     - ``synthetics.first_meaningful_paint.time.ms``
     - Time until the biggest above-the-fold layout change has happened and web fonts have loaded.

   * - Start render time
     - ``synthetics.start_render.time.ms``
     - Time until the first pixel of content is drawn.

   * - First CPU idle
     - ``synthetics.first_cpu_idle.time.ms``
     - Time until the page is minimally interactive and will respond to user input in a reasonable amount of time. See "What Interactivity Metrics Does Rigor Offer?" in the Rigor knowledge base to learn more about how this metric is calculated. 

   * - Time to interactive
     - ``synthetics.tti.time.ms``
     - Time until the page is first expected to be usable and will respond to user input quickly. See "What Interactivity Metrics Does Rigor Offer?" in the Rigor knowledge base to learn more about how this metric is calculated. 
     
   * - Onload time
     - ``synthetics.onload.time.ms``
     - Time until the page has loaded. This corresponds to the browser load event.

   * - Visually complete time
     - ``synthetics.visually_complete.time.ms``
     - Time until all above-the-fold content has finished rendering. See :new-page:`Monitoring the UX with Start Render, Visually Complete, and Speed Index <https://rigor.com/blog/monitoring-the-ux/>` on the Rigor blog to learn more about how this metric works. 

   * - Speed index
     - ``synthetics.speed_index.time.ms``
     - A calculated metric that represents how quickly the page renders above-the-fold content. See :new-page:`Monitoring the UX with Start Render, Visually Complete, and Speed Index <https://rigor.com/blog/monitoring-the-ux/>` on the Rigor blog to learn more about how this metric works. 


Web vitals
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Web vitals capture key metrics that affect user experience. 

.. list-table::
   :header-rows: 1
   :widths: 15 20 65

   * - :strong:`Metric label`
     - :strong:`Source metric name`
     - :strong:`Description`
   
   * - Cumulative layout shift (CLS)
     - ``synthetics.webvitals_cls.score``
     - Measures page stability. CLS is based on a formula that tallies up how many times the components on the page move or “shift” around while the page is loading. Fewer shifts are better.

   * - Largest contentful paint (LCP)
     - ``synthetics.webvitals_lcp.time.ms``
     - Measures page loading times as perceived by users. The LCP metric reports the render time of the largest content element visible within the viewport.

   * - Total blocking time (TBT)
     - ``synthetics.webvitals_tbt.time.ms``
     -  Captures issues that affect interactivity. TBT is a synthetic alternative for First Input Delay (FID), which measures page responsiveness to user input. Optimizations that improve TBT in the lab can also help improve FID for your users.


To learn more about web vitals, see :new-page:`https://web.dev/vitals/` in the Google developer documentation.

Connection timings
^^^^^^^^^^^^^^^^^^^^
Connection timings metrics capture information about the latency of your site’s connection to its server. 

.. list-table::
   :header-rows: 1
   :widths: 15 20 65

   * - :strong:`Metric label`
     - :strong:`Source metric name`
     - :strong:`Description`
   
   * - DNS time
     - ``synthetics.first_request.dns.time.ms``
     - Time required to resolve a host name from the DNS server.

   * - TCP connect time
     - ``synthetics.first_request.connect.time.ms``
     - Time it takes to create a TCP connection.
 
   * - Receive time
     - ``synthetics.first_request.receive.time.ms``
     - Time required to read the entire response from the server.

   * - Send time
     - ``synthetics.first_request.send.time.ms``
     - Time required to send HTTP data to the server.

   * - TLS time
     - ``synthetics.first_request.tls.time.ms`` 
     - Time required for TLS/SSL negotiation.

   * - Wait time
     - ``synthetics.first_request.wait.time.ms``
     - Time from when a request is finished until the time the first byte of the response is received for the first request in a page.


Resource and error count metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Resource and error count metrics capture information about the number and types of resources on a page.

.. list-table::
   :header-rows: 1
   :widths: 15 20 65

   * - :strong:`Metric label`
     - :strong:`Source metric name`
     - :strong:`Description`
   
   * - Client error count
     - ``synthetics.resource_request.error.count``
     - Number of client responses with a status code between 400 and 499. The error type is indicated in the ``http.status_code_type`` dimension. 

   * - Connection error count
     - ``synthetics.resource_request.error.count``
     - Number of connection responses where the status code is 504 or 0 (a request aborted by the browser). The error type is indicated in the ``http.status_code_type`` dimension. 

   * - Server error count 
     - ``synthetics.resource_request.error.count``
     - Number of server responses where the status code is 500 or higher (excluding 504). The error type is indicated in the ``http.status_code_type`` dimension. 

   * - Error count
     - ``synthetics.resource_request.error.count``
     - Total count of responses with status codes greater than or equal to 400. This is a calculated metric, equivalent to the total number of client, connection, and server errors. 

   * - HTML count
     - ``synthetics.resource_request.count``
     - Number of requests for HTML documents. The content type is indicated in the ``content_type`` dimension. 
     
   * - Image count
     - ``synthetics.resource_request.count``
     - Number of requests for images. The content type is indicated in the ``content_type`` dimension. 

   * - JavaScript count
     - ``synthetics.resource_request.count`` 
     - Number of requests for JavaScript files. The content type is indicated in the ``content_type`` dimension.  

   * - CSS count
     - ``synthetics.resource_request.count``
     - Number of requests for CSS files. The content type is indicated in the ``content_type`` dimension. 

   * - Video count
     - ``synthetics.resource_request.count``
     - Number of requests for videos. The content type is indicated in the ``content_type`` dimension. 

   * - Font count
     - ``synthetics.resource_request.count``
     - Number of requests for fonts. The content type is indicated in the ``content_type`` dimension. 

   * - Other count
     - ``synthetics.resource_request.count``
     - Number of requests for all other resources that are not HTML, image, JavaScript, CSS, video, or font requests.

   * - Request count
     - ``synthetics.resource_request.count``
     - Total number of requests made. This is a calculated metric, equivalent to the sum of all resource type counts (HTML, image, JavaScript, CSS, video, font and other counts).



Content size metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Content size metrics capture information about the size of resources on a page. Content sizes are calculated using the transfer size (or on-the-wire size) of each request.

.. list-table::
   :header-rows: 1
   :widths: 15 20 65

   * - :strong:`Metric label`
     - :strong:`Source metric name`
     - :strong:`Description`
   
   * - Total content size
     - ``synthetics.resource_request.size.bytes`` 
     - Total size (in bytes) of all content loaded. This is equivalent to the total sum of all resource type sizes (HTML, image, JavaScript, CSS, video, font and other sizes).

   * - Total HTML size
     - ``synthetics.resource_request.size.bytes`` 
     - Total size (in bytes) of all HTML content loaded. The content type is indicated by the ``content_type`` dimension.

   * - Total image size
     - ``synthetics.resource_request.size.bytes`` 
     - Total size (in bytes) of all image content loaded. The content type is indicated by the ``content_type`` dimension.

   * - Total JavaScript size
     - ``synthetics.resource_request.size.bytes`` 
     - Total size (in bytes) of all JavaScript content loaded. The content type is indicated by the ``content_type`` dimension.

   * - Total CSS size
     - ``synthetics.resource_request.size.bytes`` 
     - Total size (in bytes) of all CSS content loaded. The content type is indicated by the ``content_type`` dimension.

   * - Total video size
     - ``synthetics.resource_request.size.bytes`` 
     - Total size (in bytes) of all video content loaded. The content type is indicated by the ``content_type`` dimension.

   * - Total font size
     - ``synthetics.resource_request.size.bytes`` 
     - Total size (in bytes) of all font content loaded. The content type is indicated by the ``content_type`` dimension.
     
   * - Total other size
     - ``synthetics.resource_request.size.bytes`` 
     - Total size (in bytes) of all other resources that are not HTML, image, JavaScript, CSS, video, or font requests.
 

Score metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Splunk Synthetic Monitoring currently offers one calculated score metric to offer a gauge of how your page is performing against an established scale. 

.. list-table::
   :header-rows: 1
   :widths: 15 20 65

   * - :strong:`Metric label`
     - :strong:`Source metric name`
     - :strong:`Description`

   * - Lighthouse Performance Score
     - ``synthetics.lighthouse.score``
     - A weighted aggregation of several Browser test metric values calculated using v6 of the Lighthouse scoring algorithm. See https://web.dev/performance-scoring/ in the Google developer documentation to learn more about Lighthouse scoring.


.. _transaction-level-metrics:

Transaction-level metrics
-------------------------------------
Splunk Synthetic Monitoring captures three metrics for each synthetic transaction. Using these metrics, synthetic transactions can act as custom timers on business-critical workflows in your application and receive metrics tailored to the workflows you care about. See :ref:`set-up-transactional-browser-test` to learn how to set up Business Transactions. 

Transaction-level metrics include two additional dimensions that correspond to each specific transaction within the test: ``transaction`` and ``transaction_position``. The ``transaction`` dimension contains the name of the corresponding transaction, and the that refers to the position of that transaction within the test. The position of the first transaction in the test is 0, the second transaction has position 1, and so on. If you choose a transaction-level metric in the Performance KPIs chart or in a detector without specifying a transaction in the ``transaction`` dimension, the metric value is an aggregate of the metric across all transactions. 

.. list-table::
   :header-rows: 1
   :widths: 15 20 65

   * - :strong:`Metric label`
     - :strong:`Source metric name`
     - :strong:`Description`
   
   * - Duration
     - ``synthetics.duration.time.ms``
     - Total duration of the synthetic transaction.

   * - Requests
     - ``synthetics.resource_request.count`` 
     -  Total number of requests made during the synthetic transaction. 

   * - Total size
     - ``synthetics.resource_request.size.bytes``
     - Total size (in bytes) of the content loaded during the synthetic transaction.


Detect and report on your synthetic metrics
==========================================================
To get even more value out of your synthetic metrics, use the Splunk Observability Cloud metrics engine to create custom metrics, charts, and detectors. See the following links for more information:

* To build charts and dashboards using your metrics, see :ref:`dashboards`.
* To create static threshold detectors natively in Splunk Synthetic Monitoring, see :ref:`synth-alerts`.
* To build more advanced detectors using the Splunk Observability Cloud metrics engine, see :ref:`get-started-detectoralert`.
* To learn more about metrics in Splunk Observability Cloud, see :ref:`get-started-metrics`.
