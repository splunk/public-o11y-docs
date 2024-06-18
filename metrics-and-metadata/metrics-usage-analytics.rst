.. _metrics-usage-analytics-intro:

********************************************************************
Analyze your metric usage in Splunk Observability Cloud
********************************************************************

.. meta:: 
    :description: Use metric usage analytics (MUA) to determine usage of your metrics in Splunk Observability Cloud.

Metric usage analytics (MUA) gives you in-depth visualizations of your metric usage in Splunk Observability Cloud. 

To learn more about metric usage and billing, see :ref:`subscription-overview`.

Benefits of metric usage analytics
================================================

Using MUA, you can quickly find and visualize which metrics your organization is using and how these metrics contribute to your metric usage plan. 

MUA can help you in the following example scenarios: 

* You want to view high-cardinality custom metrics that are taking up large chunks of your metric usage plan. 
* You want to identify what metrics your team is producing so you can access their usefulness.
* You want to find the source and ownership of a certain metric so that you can modify or adjust it.

Use MUA to view metric usage
================================================

Access metric usage analytics
------------------------------------------------

To access metric usage analytics in Splunk Observability Cloud, follow these steps:

#. In Splunk Observability Cloud, select :guilabel:`Settings`.
#. Under :guilabel:`Data Configuration`, select :guilabel:`Metrics Management`.
#. Select the :guilabel:`Usage analytics` tab.

Identify metric usage with the metrics table 
-------------------------------------------------


.. make this a better section title 

Use metric profiles to identify details of metrics
====================================================

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










