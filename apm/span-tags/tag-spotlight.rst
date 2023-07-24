.. _apm-tag-spotlight:

*****************************************************************************
Analyze service performance with Tag Spotlight
*****************************************************************************

.. meta::
   :description: Learn how to view metrics for every indexed span tag for a service in a single window in Splunk Observability Cloud.

Use Tag Spotlight to analyze the performance of your services in Splunk Observability Cloud to discover trends that contribute to high latency or error rates with indexed span tags. You can break down every service by each indexed span tag to view its metrics. When you select span tag values or a time range, you can view relevant traces to learn more about outlying incidents.

For every service, Tag Spotlight provides request, error, and duration (RED) metrics time-series charts for every value of each indexed span tag within the specified time range in the APM navigation menu. Request and error charts display the total number of requests, errors, and root cause errors, and duration charts display p50, p90, and p99 latency. These values are based on Troubleshooting MetricSets (TMS), which Splunk APM generates for every indexed span tag. 

The following image shows the requests and errors of an example ``frontend`` service broken down by the values of indexed span tags. The graph is powered by Troubleshooting MetricSets. 

   .. image:: /_images/apm/span-tags/tag-spotlight-01.png  
      :alt: This image shows the requests and errors of an example frontend service broken down by indexed span tag.

To learn how to index span tags to generate Troubleshooting MetricSets, see :ref:`apm-index-span-tags`. For a general overview of MetricSets in APM, see :ref:`apm-metricsets`. 

.. note:: 
   For an example scenario of troubleshooting using Tag Spotlight, see :ref:`troubleshoot-tag-spotlight`. For an interactive walkthrough of Tag Spotlight, see :new-page:`APM Tag Spotlight Scenario <https://quickdraw.splunk.com/redirect/?product=Observability&location=apm-tag-spotlight-walkthrough&version=current>`. 


View service performance by indexed span tags with Tag Spotlight
================================================================

Access Tag Spotlight from the :strong:`Tag Spotlight` tab of the APM landing page to analyze the performance of every indexed span tag value for a service. You can break down performance for each tag by either requests and errors or latency. 

Follow these steps to navigate to Tag Spotlight for a specific service:

   #. From the Splunk Observability Cloud landing page, select :guilabel:`APM`.
   #. In the list of services on the APM landing page, select a service you want to drill into. Selecting the service opens the Troubleshooting tab for that service.
   #. Scroll to the :strong:`Tag Spotlight` card in the sidebar to view a preview of top tags with errors and high latency. Select the card to open Tag Spotlight.
   #. View the distribution of all indexed span tags. The RED metrics time-series chart displays requests, errors, root cause errors, or latency for the specified time range. 
   #. Adjust the time range to view more or less data in the RED metrics chart. The default time range is for the last 15 minutes, and the data resolution is 10 seconds.

Use the :guilabel:`Service` picker in the top bar of Tag Spotlight to view metrics for a different service. 

Explore the distribution of span tags and values to find trends
----------------------------------------------------------------------
There are a number of ways to drill down into indexed span tags for a selected service so you can understand the source of an incident:

- Use the filter bar to filter the requests shown in Tag Spotlight by environment, service, and operation. You can also create a custom filter based on indexed or unindexed tags. The filter context is preserved even when you navigate away from the page. 

- Hover over a span tag value for any indexed span tag to view the performance of the span tag value relative to all other indexed span tags and values. You can also select a span tag value to add a filter to filter the RED metrics chart to spans containing that value. 

- Hover over the RED metrics chart to view a summary of metrics for the specified time. The resolution of data for the RED metrics chart is 10 seconds. 

- Select within the RED metrics chart to load representative traces for the time you selected.

- Select a span tag card header to add the top 5 span tag values in the card to the RED metrics chart.

- Control what appears in the RED metrics chart by showing or hiding metrics in the chart's legend. For example, you can select the eye icon beside :guilabel:`Requests` to view only errors. When the slider is set to :guilabel:`Latency`, select the eye icon to hide the p50 latency metric and compare only p90 and p99 values. 

Scenario: Find the root cause of an incident with Tag Spotlight
================================================================

To view a detailed example of using Tag Spotlight, see :ref:`troubleshoot-tag-spotlight`. 
