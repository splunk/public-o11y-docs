.. _test-kpis:

***************************************************
Test performance KPIs 
***************************************************

words 

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

