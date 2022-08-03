.. _apm-tag-spotlight:

**********************************************
Analyze service performance with Tag Spotlight
**********************************************

.. meta::
   :description: View metrics for every indexed span tag for a service in a single window.

Use Tag Spotlight to analyze the performance of your services to discover trends that contribute to high latency or error rates with indexed span tags. You can break down every indexed span tag for a particular service to view metrics for it. When you select specific span tag values or a specific time range, you can view representative traces to learn more about an outlying incident.

For every service, Tag Spotlight provides a RED metrics time-series chart that displays the total number of requests, errors, root-cause errors, and latency according to the specified time range in the APM navigation menu. Along with the RED metrics chart, Tag Spotlight also displays the total number of requests, errors, root-cause errors, and latency for every value of an indexed span tag according to the specified time range in the APM navigation menu.

Splunk APM uses Troubleshooting MetricSets to display indexed span tag performance for a service. For every indexed span tag value, view metrics for request rate, error, root-cause error rates, and p50, p90, and p99 latency. For more information about Troubleshooting MetricSets, see :ref:`apm-index-span-tags`.

View service performance by indexed span tags with Tag Spotlight
================================================================

Access Tag Spotlight from the :strong:`Troubleshooting` tab of the APM page to analyze the performance of every indexed span tag value for a service and break down performance for each tag by either requests and errors or latency. Follow these steps to go to Tag Spotlight for a service:

1. In the application, go to the :strong:`APM` page.
2. Select a service you want to drill down into.
3. From the filter bar for the service, click :strong:`Troubleshoot`.
4. Click :strong:`Spotlight` from the service menu bar. You can view the analysis for requests and errors or latency. You can also click :strong:`Tag Spotlight` in the :strong:`Requests and Errors` service card.
5. View the distribution of all indexed span tags. The RED metrics time-series chart displays requests, errors, root-cause errors, or latency for the specified time range. Span tag values are available in cards for each indexed span tag. The default time range is for the last 15 minutes, and the data resolution is 10 seconds.
6. Click the time-series chart to view representative traces for the selected point.

How to explore the distribution of span tags and values to find trends
----------------------------------------------------------------------

There are a few ways to drill down into indexed span tags for a selected service so you can understand the source of an incident:

- From the filter bar, specify an environment, endpoint, operation, or span tag for the service to filter requests shown in Tag Spotlight. The filter context remains even when you navigate away from the page.

- Hover over a span tag value for any indexed span tag to view the performance of the span tag value relative to all other indexed span tags and values. You can also click a span tag value to add it to the filter bar.

- Hover over the RED metrics chart to view metrics for the specified time. The resolution of data for the RED metrics chart is 10 seconds.

- Click a span tag card header to add the top 5 span tag values in the card to the RED metrics chart.

- Control what shows up in the RED metrics chart by showing or hiding metrics in the chart's legend. For example, you can hide requests to view only errors, or hide the p50 latency metric to compare just p90 and p99 values when analyzing latency. 

Example: Find the root cause of an incident with Tag Spotlight
==============================================================

A service ``yourService`` is generating a lot of errors. Follow these steps to learn how you can pinpoint the root cause of an incident with Tag Spotlight.

For this example, you index span tags representing these things:

- Kubernetes pod name
- Tenant level

This example also uses the :strong:`Operation` span tag, but this is indexed by default.

#. In the application, go to the :strong:`APM` page.
#. From the :strong:`Troubleshooting` tab, select a service you want to drill down into.
#. Click :strong:`Tag Spotlight` in the :strong:`Requests and Errors` service card.
#. Using the RED metrics chart, click and drag the cursor where there's a spike in errors to view data for only the incident you're investigating. 
#. In the ``Operation`` span tag card, you see that some operation ``yourOperation`` has a lot of errors. 
#. Hover over the operation to quickly see RED metrics for the operation. 
#. To drill down further into the performance of the operation, click the ``yourOperation`` value in the span tag card. This shows you information about all indexed tags for only requests that include ``myOperation``.
#. There are multiple tenant values, but you see that users who belong to a single tenant are experiencing the vast majority of errors with the service.
#. You also see that a particular Kubernetes pod has an error spike that corresponds to the errors the operation is generating.
#. You infer that the incident is due to an operation running in a specific Kubernetes pod that affects people associated with a particular tenant.
#. From the RED metrics chart, click the peak error rate to view an exemplar trace for the incident.