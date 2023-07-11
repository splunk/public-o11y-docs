:orphan:

.. _synth-metrics:

*****************
Metrics
*****************

.. meta::
    :description: Learn about metrics in Splunk Synthetic Monitoring.

Metrics in Splunk Synthetic Monitoring are numeric indicators of site performance that synthetic tests capture in each run of a test. 

Metrics for API and Uptime Tests
=================================
API and Uptime Tests capture a set of key metrics that offer insight into your webpage or API’s performance at a glance. The following table provides a list of these metrics: 

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Metric name`
     - :strong:`Description`
   
   * - DNS time
     - Time required to resolve a host name from the DNS server
     
   * - Time to first byte
     - Time from the start of the first request until receiving the first byte of the first non-redirect request. 3xx redirects will increase this time

   * - Response time
     - Total time for the request/response to complete. This metric is also referred to as :strong:`duration`. For :ref:`HTTP tests<http-test>`, this is the total time in seconds from the previous transfer, including name resolving, TCP connection, and so on. For :ref:`port tests<port-test>`, this is the approximate total time in seconds that it took to ping the host. 
 
   * - Uptime
     - Percentage uptime of an endpoint for a set time frame


Metrics for Browser Tests
=================================
Browser tests capture 40+ metrics that offer a complete picture of your website performance. You can also configure custom metrics to gather the information you care about most. The following sections detail the three main types of metrics that Browser Tests can capture.  

Default metrics in Browser Tests
--------------------------------------
Splunk Synthetic Monitoring offers a set of 46 default metrics that each run of a Browser Test captures automatically. These metrics are grouped into several categories. See the tables below for details on all default metrics.

Performance metrics
^^^^^^^^^^^^^^^^^^^^
Performance metrics capture information about how long it takes resources on the page to render. 

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Metric name`
     - :strong:`Description`
   
   * - Time to first byte
     - Time from the start of the first request until receiving the first byte of the first non-redirect request. 3xx redirects increase the duration of this time.

   * - DOM interactive time
     - Time until the DOM is fully loaded and processed
 
   * - First paint time
     - Time until the browser renders anything other than the default background

   * - First contentful paint time
     - Time until the browser first renders any content

   * - First meaningful paint time
     - Time until the biggest above-the-fold layout change has happened and web fonts have loaded

   * - Start render time
     - Time until the first pixel of content is drawn

   * - DOM load time
     - Time until the Document Object Model (DOM) has loaded, and the initial markup has been parsed. This metric corresponds to the browser DOMContentLoaded event.

   * - DOM complete time
     - Time until the page and all of its subresources are ready

   * - First CPU idle
     - Time until the page is minimally interactive and will respond to user input in a reasonable amount of time. See "What Interactivity Metrics Does Rigor Offer?" in the Rigor documentation to learn more about how this metric is calculated. 

   * - Time to interactive
     - Time until the page is first expected to be usable and will respond to user input quickly. See "What Interactivity Metrics Does Rigor Offer?" in the Rigor documentation to learn more about how this metric is calculated. 
     
   * - Onload time
     - Time until the page has loaded. This corresponds to the browser load event.

   * - Visually complete time
     - Time until all above-the-fold content has finished rendering. See :strong:`Monitoring the UX with Start Render, Visually Complete, and Speed Index <LINK>` on the Rigor blog to learn more about how this metric works. 

   * - Speed index
     - A calculated metric that represents how quickly the page renders above-the-fold content. See :strong:`Monitoring the UX with Start Render, Visually Complete, and Speed Index <LINK>` on the Rigor blog to learn more about how this metric works. 

   * - Fully loaded time
     - Time until there is 1.5 seconds of network inactivity after onload, waiting up to a maximum of 5 seconds. If onload is never reached, this metric represents the time from the start of the first request to the time at which the last request finishes. The last request to finish is not always the last request started.


Connection timings
^^^^^^^^^^^^^^^^^^^^
Connection timings metrics capture information about the latency of your site’s connection to its server. 

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Metric name`
     - :strong:`Description`
   
   * - DNS time
     - Time required to resolve a host name from the DNS server

   * - TCP connect time
     - Time it takes to create a TCP connection
 
   * - SSL time
     - Time required for SSL/TLS negotiation

   * - Send time
     - Time required to send HTTP data to the server

   * - Wait time
     - Time from when a request is finished until the time the first byte of the response is received for the first request in a page

   * - Receive time
     - Time required to read the entire response from the server


Resource and error count metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Resource and error count metrics capture information about the number and types of resources on a page.

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Metric name`
     - :strong:`Description`
   
   * - Request count
     - Total number of requests made. This is equivalent to the sum of all resource type counts (HTML, image, JavaScript, CSS, video, font and other counts).

   * - HTML count
     - Number of requests for HTML documents
     
   * - Image count
     - Number of requests for images

   * - JavaScript count
     - Number of requests for JavaScript files

   * - CSS count
     - Number of requests for CSS files

   * - Video count
     - Number of requests for videos

   * - Font count
     - Number of requests for fonts

   * - Other count
     - Number of requests for all other resources that are not HTML, image, JavaScript, CSS, video, or font requests
 
   * - Client error count
     - Number of client responses with a status code between 400 and 499

   * - Connection error count
     - Number of connection responses where the status code is 504 or 0 (a request aborted by the browser)

   * - Server error count 
     - Number of server responses where the status code is 500 or higher (excluding 504)

   * - Error count
     - Total count of responses with status codes greater than or equal to 400. This is equivalent to the total number of client, connection, and server errors.


Content size metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Content size metrics capture information about the size of resources on a page. Content sizes are calculated using the transfer size (or on-the-wire size) of each request. All sizes in the following table is measured in bytes. 

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Metric name`
     - :strong:`Description`
   
   * - Content size
     - Total size of all content loaded. This is equivalent to the total sum of all resource type sizes (HTML, image, JavaScript, CSS, video, font and other sizes).

   * - HTML size
     - Total size of all HTML content loaded

   * - Image size
     - Total size of all image content loaded

   * - JavaScript size
     - Total size of all JavaScript content loaded

   * - CSS size
     - Total size of all CSS content loaded

   * - Video size
     - Total size of all video content loaded

   * - Font size
     - Total size of all font content loaded
     
   * - Other size
     - Total size of all other resources that are not HTML, image, JavaScript, CSS, video, or font requests
 

Web vitals
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Web vitals capture key metrics that affect user experience. 

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Metric name`
     - :strong:`Description`
   
   * - Largest contentful paint (LCP)
     - Measures page loading times as perceived by users. The LCP metric reports the render time of the largest content element visible within the viewport.

   * - Total blocking time (TBT)
     -  Captures issues that affect interactivity. TBT is a synthetic alternative for First Input Delay (FID), which measures page responsiveness to user input. Optimizations that improve TBT in the lab can also help improve FID for your users.

   * - Cumulative layout shift (CLS)
     - Measures page stability. CLS is based on a formula that tallies up how many times the components on the page move or “shift” around while the page is loading. Fewer shifts are better.

To learn more about web vitals, see :new-page:`https://web.dev/vitals/` in the Google developer documentation.

Additional metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following are a set of additional metrics for browser tests.

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Metric name`
     - :strong:`Description`
   
   * - Response time test
     - The Response Time for a single-page Browser Test is the same as the load time. For a multi-step Browser Test, the Response Time equals the sum of load time for each page accessed during the user flow. 

   * - Uptime
     - In browser tests, the Uptime percentage represents the percentage of time that the check passed within a set time frame.

   * - Availability
     - Percentage of total number of successful runs divided by the total amount of runs. 


Metrics for synthetic transactions
----------------------------------
You can use synthetic transactions to set up custom timers on business-critical workflows in your application and receive metrics tailored to the workflows you care about. See :strong:`__<>` to learn how to set up synthetic transactions. 

Custom user timings (Enterprise only)
--------------------------------------
You can also embed detectable markers in your app to get an even more granular picture of how your application responds to user interaction. When you run a Splunk Synthetic Monitoring test, the runner reports the times at which it encounters these markers in your site. See :strong:`__<>` to learn more about custom user timings. Note that custom user timings are available for Enterprise users only.



Detect and report on your synthetic metrics
==========================================================

To get even more value out of your synthetic metrics, use the Splunk Observability Cloud metrics engine to create custom metrics, charts, and detectors. See the following links for more information:

* To build charts and dashboards using your metrics, see :ref:`dashboards`.
* To create static threshold detectors natively in Splunk Synthetic Monitoring, see :ref:`synth-alerts`.
* To build more advanced detectors using the Splunk Observability Cloud metrics engine, see :ref:`get-started-detectoralert`.
* To learn more about metrics in Splunk Observability Cloud, see :ref:`get-started-metrics`.