.. _api-test-metrics:

******************************************
API test metrics
******************************************

API Tests capture a set of key metrics that offer insight into your API’s performance at a glance.

* :ref:`request-level-metrics-api`
* :ref:`run-level-metrics-api`

Dimensions
============
Splunk Synthetic Monitoring metrics have the following dimensions:


.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Dimension`
     - :strong:`Description`

   * - ``success``
     - ``true`` if the run succeeds; ``false`` if it fails

   * - ``failed``
     - ``true`` if the run fails, ``false`` if it succeeds

   * - ``location_id``
     - The ID of the location for this run

   * - ``test_id``
     - The ID of this test.

   * - ``test_type``
     - The test type for an API test is set to ``api``. 
     

.. _request-level-metrics-api:

Request level metrics 
==============================
The following metrics are collected for each request. 

Request-level metrics include an additional ``request_number`` dimension that refers to the position of the request within the test. The position of the first request in the test is 0, the second request has position 1, and so on. If you choose a request-level metric in the Performance KPIs chart or in a detector without specifying a request with the ``request_number`` dimension, the metric value is aggregated across all requests. 

.. list-table::
   :header-rows: 1
   :widths: 20, 10, 70

   * - :strong:`Metric`
     - :strong:`Metric name`
     - :strong:`Description`
   
   * - DNS time
     - ``synthetics.dns.time.ms``  
     - Time required to resolve a host name from the DNS server. Name resolving is the process when libcurl translates a name into an IP address.  
     
   * - Time to first btye (TTFB)
     - ``synthetics.ttfb.time.ms`` 
     - Time from the start of the first request until receiving the first byte of the first non-redirect request. Each 3xx redirect increases this time.

   * - Duration
     - ``synthetics.duration.time.ms``
     - Total time for the request and response to complete. 

   * - Receive time
     - ``synthetics.receive_time_ms`` 
     - Total time it takes to receive the previous transfer, for example name resolving.

   * - TCP connect time 
     - ``synthetics.connect.time.ms``
     - Time it takes to connect to the to remote host or proxy.   

   * - TLS time 
     - ``synthetics.tls.time.ms``
     - Time from start to finish of the SSL/SSH handshake. 

   * - Start transfer time 
     - ``synthetics.wait.time.ms``
     - Time elapsed from the start of the transfer until libcurl receives the first byte.

   * - Request size 
     - ``synthetics.resource_request.size.bytes`` 
     - Number of bytes in the http request.

.. _run-level-metrics-api:

Run-level metrics 
==================
Each occurrence of a test from a particular device and location at a specific time is called a run. These metrics are calculated based on each run:

.. list-table::
   :header-rows: 1
   :widths: 20, 10, 70

   * - :strong:`Metric`
     - :strong:`Metric name`
     - :strong:`Description`
   
   * - Duration
     - ``synthetics.run.duration.time.ms``  
     -  Total duration of the run.

   * - Uptime
     - ``synthetics.run.uptime.percent``
     - The percentage of non-failed test runs. Uptime is calculated by taking the average score of all runs in the selected time frame, where a successful run receives a score of 100 and a failure receives a score of 0.

   * - Downtime
     - ``synthetics.run.downtime.percent``
     - The percentage of failed runs within the selected time frame. Downtime is calculated by taking the average score of all runs in the selected time frame, where a failed run receives a score of 100 and a successful run receives a score of 0.

