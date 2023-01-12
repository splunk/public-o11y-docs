.. _apm-use-case-trace-analyzer:

************************************************************************************
Use case: Troubleshoot an unknown issue using Trace Analyzer
************************************************************************************

.. meta::
    :description: To identify the cause of the unknown issues, Alex decides to use Trace Analyzer, which allows to explore APM data from wide trends down to single traces. 

Alex, the Site Reliability Engineer for ButterCup Studios, is tasked with monitoring and troubleshooting the video delivery product, which is central to their monetization strategy. The product comprises several back-end services that manage the storage, processing, search, and streaming of video, as well as front-end applications for web and mobile.

Over the last couple of hours, Alex has been receiving reports from customer support regarding errors during video recommendation. To identify the cause of the unknown issues, Alex decides to use Trace Analyzer, which allows to explore APM data from wide trends down to single traces. These are the steps Alex took to identify and solve the issue:

#. Group traces by specific tags
#. Explore the duration heatmap
#. Save and share the search
#. Come back to confirm solution

1. Group traces by specific tags
==================================

As most reports happened in the weeks following the release of the recommendation service, Alex opens Trace Analyzer and sets the time range to the last week for the recommendation service in production. Next, they use the guilabel:`Grouped by` menu to select the ``device.type`` tag. To narrow down the search further, they toggle Errors only.

The search reduces the amount of traces to a few thousand from the millions available in Splunk APM. Alex notices that the tablet throws the most errors among the types of devices, so they decide to switch the grouping tag to ``tablet.brand``. Alex then selects the :guilabel:`Group Metrics` tab to dig into each value of the grouping tag.

[Screenshot of the table]

2. Explore the duration heatmap
==================================

After pinpointing the tablet brands that are more problematic, Alex feels more confident about the issue. They use the chart selector to load the :guilabel:`Trace duration` chart, which shows the number of traces by duration for each period within the time frame.

Another pattern emerges: the highest latencies happen during the weekends. Alex clicks and drags the chart to zoom into weekend days, which confirms the high latencies and reduces the number of traces listed.

[Animated GIF of time range selection]

3. Save and share the search
==================================

All the available evidence indicates that the issues occur on Amazon tablets at certain times of the day. With this information, Alex goes back to the :guilabel:`Traces` tab and sets a minimum duration to find long, problematic traces they can analyze.

[Screenshot of the duration controls]

Alex then saves and shares the permanent link of the Trace Analyzer view with the back-end team in charge of building the service. The search is granular enough to contain just the error traces that might be relevant for the case.

[Animated GIF of save and share]

4. Come back to confirm solution
==================================

After the back-end team confirmed and solved the issue affecting the Android tablet clients, Alex returns to the saved Trace Analyzer view and changes the time range to the current week. They immediately notice that the amount of errors and the latencies are back to normal. Eager to keep an eye on the issue, Alex configures new alerts based on the trace
metadata they could collect.
