.. _metrics-usage-analytics-intro:

********************************************************************
Analyze your metric usage in Splunk Observability Cloud
********************************************************************

.. meta:: 
    :description: Use metric usage analytics (MUA) to determine usage of your metrics in Splunk Observability Cloud.

Metric usage analytics (MUA) gives you in-depth visualizations of your metric usage in Splunk Observability Cloud. MUA can help you make informed decisions about your metrics, for example, if you're deciding whether to aggregate, archive, or drop certain metrics.

To learn how to use MUA, see :ref:`mua-understand-metrics`.

For guidance in using MUA to manage and reduce your overall metric usage, see :ref:`mua-reduce-usage`.

To learn more about metric usage and billing, see :ref:`subscription-overview`.

Benefits of metric usage analytics
================================================

Using MUA, you can quickly find and visualize which metrics your organization is using and how these metrics contribute to your metric usage plan. With this information, you can accurately decide how to manage individual metrics for the purpose of reducing your overall usage.

MUA can help you complete the following example scenarios: 

* You want to view high-cardinality custom metrics that are taking up large chunks of your metric usage plan. 
* You want to identify what metrics your team is producing so you can access their usefulness.
* You want to find the source and ownership of a certain metric so that you can modify or adjust it.

.. _mua-understand-metrics:

Use MUA to view and understand your metric usage
====================================================

MUA displays several charts and visualizations that help you determine your metric usage relative to your usage plan. 

With MUA, you can also find more details about individual metrics in MUA, such as which dimensions the metric uses, which tokens the metric is associated with, and which charts the metric appears in.

Access metric usage analytics
------------------------------------------------

To access metric usage analytics in Splunk Observability Cloud, follow these steps:

#. In Splunk Observability Cloud, select :guilabel:`Settings`.
#. Under :guilabel:`Data Configuration`, select :guilabel:`Metrics Management`.
#. Select the :guilabel:`Usage analytics` tab.

The MUA home page contains the following visualizations:

* A card displaying the average number of metric time series (MTS) per hour for your selected time frame.
* A chart displaying the average number of MTS per half hour over the selected time frame.
* The metrics table, displaying each of your metrics and their usage. See :ref:`mua-metrics-table` to interpret these values.

.. _mua-metrics-table:

Understand metric usage with the metrics table 
-------------------------------------------------

The metric usage table displays the following fields:

.. list-table:: 
    :header-rows: 1

    * - Field
      - Description
    * - Metric name
      - The name of the metric
    * - Billing category
      - Category of metric for billing purposes (host, billing, or custom). To learn more about billing categories, see :ref:`imm-billing`.
    * - Utilization
      - Whether the metric is in use. "Unused" indicates that the metric is producing MTS, but these values aren't utilized in Splunk Observability Cloud.
    * - Utility score
      - Indicates how much the metric is used. A high utility score means higher usage.
    * - Metric time series (MTS)
      - The average number of MTS associated with this metric, measured per hour.
    * - Percentage of total
      - How much of your total usage plan this metric utilizes.

Use metric profiles to examine metric properties
------------------------------------------------------

MUA includes metric profiles for each of your metrics. To access a metric profile, select one of the metrics in your metric usage table.

Metric profiles provide the following tables with additional information about the metric:

.. list-table:: 
    :header-rows: 1
    :widths: 20, 40, 40

    * - Table
      - Description
      - Notes
    * - Dimensions
      - Displays the dimension name of each metric sorted by average hourly MTS count. High-cardinality dimensions appear at the top of the list.
      - Displays up to 5000 dimensions.
    * - Tokens
      - Displays the token name and ID for each metric, sorted by the number of metric time series associated with the token. 
      - Displays up to 5000 tokens.
    * - Charts
      - Displays the charts and dashboards associated with each of your metrics, as well as the user who last updated the chart and the time they updated it.
      - None
    * - Detectors
      - Displays the detectors associated with each of your metrics, as well as the user who last updated the detector and the time they updated it.
      - None

.. _mua-reduce-usage:

Manage and reduce your metric usage with MUA
================================================

This section contains tips for identifying metrics that you can aggregate, archive, or drop for the purpose of reducing your metric usage. 

Archive unused metrics
-----------------------------------------------

Using the metrics table, you can find metrics that aren't used. If you have any unused metrics, you can archive them so they take up less of your usage plan. 

Archived metrics go to an archival route in Splunk Observability Cloud, where they remain unused and have a lower billing cost. You can bring them out of the archival route whenever you need to use them again.

To learn more about archiving metrics, see :ref:`archived-metrics`.

Find metrics with low utility scores and aggregate them
-------------------------------------------------------------

If you have metrics with low utility scores, consider aggregating them to reduce the total number of metrics.

To help decide whether to aggregate these metrics, follow these steps:

#. Select the metric you're considering aggregating to open the metric profile. 
#. Select the :guilabel:`Detectors` tab to check whether the metric appears in any detectors.
#. If the metric doesn't appear in detectors, check the :guilabel:`Charts` tab to see which charts use it.
#. Consider whether the metric is important to keep in the respective charts. If not, then aggregate the metric with other dimensions to reduce usage.

To learn more about how to aggregate metrics, see :ref:`mpm-rule-agreggation`.

Reduce the cardinality of your metrics
--------------------------------------------------------------

If you have metrics with high cardinality, consider modifying their dimensions to reduce their cardinalities.















