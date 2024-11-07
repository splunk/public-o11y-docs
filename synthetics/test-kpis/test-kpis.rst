.. _test-kpis:

***************************************************
Test performance KPIs 
***************************************************

.. meta::
    :description: words

    
KPIs measure how well your tests are performing in a variety of circumstances. There are two tabs in this view on the test details page: availability and performance KPIs. The availability tab shows when the test was up and running versus failing, and if an auto-retry run occurred. 

Here are some ways you can troubleshoot issues in the performance KPI chart: 

* Zoom in on a range of time to isolate an issue. 
* Play or pause windows of time during troubleshooting to and open run results, screen captures, and charts in context with the selected data. 
* Data density  automatically adjusts for zoomed in views or summaries of larger time ranges. 
* Up to 90 days of historical data for related run results. 


Performance KPI chart settings 
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

