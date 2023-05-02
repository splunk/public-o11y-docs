.. _uptime-test-results:

******************************************
Interpret Uptime test results 
******************************************

.. meta::
    :description: Learn about Uptime test results in Splunk Synthetic Monitoring.

Every run of an Uptime test in Splunk Synthetic Monitoring produces a set of results that help you understand the performance of your application in real time. 

To learn more about the types of Uptime tests, see :ref:`uptime-test`. To set up an Uptime test, see :ref:`set-up-uptime-test`.

.. _uptime-test-history:



.. _uptime-detector: 

View Uptime test history
==========================

On the :guilabel:`Test History` page, view a customizable summary of recent run results so you can assess the performance of your test at a glance. 

#. To open the :guilabel:`Test History` view for a test, select its row in the :guilabel:`Tests` list.

#. You can take the following actions in the Test History page:

    - Select :guilabel:`Edit test` to edit your test configuration.
    - Select :guilabel:`Create detector` to create a detector based on your test. See :ref:`synth-alerts` to learn more. 
    - Select :guilabel:`Actions > Pause test` to pause your test.
    - Select :guilabel:`Actions > Copy test` to make a copy of your test. This opens the :guilabel:`New Uptime Test` page with the details of the test pre-filled. 

Customize the Performance KPIs chart 
--------------------------------------------------
The :guilabel:`Performance KPIs` chart offers a customizable visualization of your recent test results. Use these steps to customize the visualization:

In the :guilabel:`Performance KPIs` chart, use the selectors to adjust the following settings:

  .. list-table::
    :header-rows: 1
    :widths: 20 20 60
    
    * - :strong:`Option`
      - :strong:`Default`
      - :strong:`Description`

    * - Time
      - Last 8 hours
      - Choose the amount of time shown in the chart.

    * - Interval
      - Run level
      - | Interval between each pair of data points. 
        | 
        | When you choose :strong:`Run level`, each data point on the chart corresponds to an actual run of the test; choosing larger intervals shows an aggregation of results over that time interval. 
        |
        | If you choose a level higher than :strong:`Run level`, the data points you see are aggregations of multiple runs. You can select an aggregate data point in the chart to zoom in and view the data at a per-run level.

    * - Scale
      - Linear
      - Choose whether the y-axis has a linear or logarithmic scale.

    * - Segment by
      - Location
      - | Choose whether the data points are segmented by run location or no segmentation: 
        | 
        | - Choose :strong:`No segmentation` to view data points aggregated from across all locations, pages, and synthetic transactions in your test. 
        | - Choose :strong:`Location` to compare performance across multiple test locations. 
        |

    * - Locations
      - All locations selected
      - Choose the run locations you want to display on the chart. 

    * - Filter
      - All locations selected
      - If you have enabled segmentation by location, choose the run locations you want to display on the chart. 

    * - Metrics
      - Run duration
      - By default, the chart displays the :guilabel:`Duration` metric. Use the drop-down list to choose the metrics you want to view in the chart.


View results for a specific run
---------------------------------
To navigate to the :guilabel:`Run Results` view for a single run, select a data point within the :guilabel:`Performance KPIs` chart with the visualization interval at :strong:`Run level` and the segmentation set to :strong:`Location`. 

If you're viewing aggregate data (for example, at a 20-minute interval instead of at run level, or with no segmentation by location), selecting a data point zooms you in to see run-level detail. Then you can select a specific run to see the :guilabel:`Run Results` from there. 

You can also select a row in the :guilabel:`Recent run results` table below the :guilabel:`Performance KPIs` chart.


Interpret Uptime test run results
=============================================
When you navigate to the Run Results page for a particular run of an Uptime test, what you see depends on whether the test is a Port or HTTP test, and whether the run was successful or not. 

Run Results: Success
-----------------------
For successful HTTP tests, the Run Results page shows the following metrics:

- DNS time
- Time to first byte
- Response time
- Uptime

For successful Port tests, the Run Results page shows the following metric: 

- Response time 

Run Results: Failure
-----------------------
For failed Uptime tests, the Run Results page shows the following additional diagnostics to help you understand the root cause of availability issues:

- Request header
- Response header
- Response body
- Nslookup, a series of queries to the Domain Name System (DNS) of the mappings between domain name and IP address
- Traceroute, a list of packet transit delays across the IP network
- Connection log



Splunk RUM integration 
------------------------------------
Integrate with Splunk RUM so that you can automatically measure Web Vital metrics against your run results. Web vitals capture key metrics that affect user experience and assess the overall performance of your site. For more, see :ref:`rum-synth`.



.. _uptime-metrics:

Uptime test metrics
=================================
Uptime tests capture a set of key metrics that offer insight into your webpage’s performance at a glance. The following table provides a list of these metrics: 

.. list-table::
   :header-rows: 1
   :widths: 15 20 65

   * - :strong:`Metric label`
     - :strong:`Source metric name`
     - :strong:`Description`
   
   * - DNS time
     - ``synthetics.dns.time.ms``
     - Time required to resolve a host name from the DNS server. This metric is available for HTTP Uptime tests, but not Port Uptime tests.
     
   * - Time to first byte
     - ``synthetics.ttfb.time.ms`` 
     - Time from the start of the first request until receiving the first byte of the first non-redirect request. ``3xx`` redirects will increase this time. This metric is available for HTTP Uptime tests, but not Port Uptime tests.

   * - Response time
     - ``synthetics.duration.time.ms``
     - Total time for the request/response to complete. This metric is also referred to as :strong:`duration`. For HTTP tests, this is the total time in seconds from the previous transfer, including name resolving, TCP connection, and so on. For Port tests, this is the approximate total time in seconds that it took to ping the host. 
 
   * - Uptime
     - ``synthetics.run.uptime.percent``
     - Percentage uptime of an endpoint in the selected time frame.

Dimensions
----------------
All Splunk Synthetic Monitoring metrics have the following dimensions:

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
     - The test type dimension for Uptime tests is either ``http`` or ``port``. 

