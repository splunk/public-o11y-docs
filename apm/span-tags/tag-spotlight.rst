.. _apm-tag-spotlight:

Analyze service performance with Tag Spotlight
*****************************************************************************

.. meta::
   :description: Learn how to view metrics for every indexed span tag for a service in a single window in Splunk Observability Cloud.

Use Tag Spotlight to analyze the performance of your services in Splunk Observability Cloud to discover trends that contribute to high latency or error rates with span tags you have indexed. You can break down every service by each indexed span tag to view its metrics. When you select span tag values or a time range, you can view relevant traces to learn more about outlying incidents.

For every service, Tag Spotlight provides time-series charts for request, error, and duration (RED) metrics for every value of each indexed span tag. Request and error charts display the total number of requests, errors, and root cause errors, and duration charts display p50, p90, and p99 latency. These values are based on Troubleshooting MetricSets (TMS), which Splunk APM generates for every indexed span tag. 

The following image shows the a chart for requests and errors and a chart for duration for an example ``frontend`` service. Under the charts there are bar charts with RED metrics for each indexed span tag.

   .. image:: /_images/apm/span-tags/tag-spotlight-01.png  
      :alt: This image shows the requests and errors of an example frontend service broken down by indexed span tag.

To learn how to index span tags to generate Troubleshooting MetricSets, see :ref:`apm-index-span-tags`. For a general overview of MetricSets in APM, see :ref:`apm-metricsets`. 

View service performance by indexed span tags with Tag Spotlight
================================================================

#. You can access Tag Spotlight in several places:
     * Select the :guilabel:`Tag Spotlight` panel on the APM landing page or in the service map. 
     * Select the `Tag Spotlight` tab in the service view for your service.
     * Use the search in the top toolbar to search for Tag Spotlight and select the navigation result to go to Tag Spotlight.

..  image:: /_images/apm/span-tags/tag-spotlight-02.gif
    :width: 99%
    :alt: This animation shows the user searching for Tag Spotlight. 

#. Add time range, environment, workflow, service, operation, and tag filters as need to refine the data in your Tag Spotlight view. The default time range is for the last 15 minutes, and the data resolution is 10 seconds.
#. Use the request & errors and latency time-series charts at the top to see a distribution of your RED metrics.
#. Use the bar charts under the request & errors and latency time-series charts to view RED metrics for each indexed span tag.
#. View the distribution of all indexed span tags. The tag bar charts display either request and error distributions or latency distribution. Use the :guilabel:`bar chart display` menu to select the data you want to display in the bars. 
#. Select the menu on the top left of the bar chart section to select which metrics to display in each tag panel. You can also use this menu to select whether to display tags with no values.

Explore the distribution of span tags and values to find trends
----------------------------------------------------------------------

To understand the source of an incident use 1 of these options to drill down into indexed span tags for a selected service:

- Use the filter bar to filter the requests shown in Tag Spotlight by environment, service, and operation. You can also create a custom filter based on indexed or unindexed tags. The filter context is preserved even when you navigate away from the page. 

- Select the menu on the top left of the bar chart section to select which metrics to display for any indexed span tag.  
  
- Select a span tag value then select :guilabel:`Add to filter` to filter the RED metrics charts to spans containing that value. 

- Hover over the RED metrics charts to view a summary of metrics for the specified time. The resolution of data for the RED metrics chart is 10 seconds. 

- Select within the RED metrics charts to load example traces for the time you selected.

- Select a span tag card header to add the top 5 span tag values in the card to the RED metrics charts.

- Control what appears in the RED metrics chart by showing or hiding metrics in the chart's legend. For example, you can select the eye icon beside :guilabel:`Requests` to view only errors.  

Scenario: Find the root cause of an incident with Tag Spotlight
================================================================

To view a detailed example of using Tag Spotlight, see :ref:`troubleshoot-tag-spotlight`. 
