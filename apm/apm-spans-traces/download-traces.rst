.. _apm-download-traces:

**********************************
Download traces
**********************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn about downloading traces from Splunk APM in JSON.

Download APM traces to analyze, save, and share them with other people. When you download a trace, Splunk APM exports its trace content in JSON files. Because there are limits to how much trace content the waterfall view in Splunk APM can display, downloading traces can provide you with more information about a given trace than you are able to view in the UI.

For each trace, Splunk APM combines all spans for a specific time window into a single trace segment. The name of each trace segment corresponds to the start time of the first span in the segment. 

Every trace includes at least one trace segment, and there could be more than one trace segment based on the trace duration or number of spans. To get all the content for a trace, download every segment for the trace. If you download multiple trace segments, concatenate each JSON file to view all the available trace data.

Follow these steps to download a trace:

1. In the application, go to the :strong:`APM` tab.

2. Select the :strong:`Troubleshooting` view of the Service Map.

3. If you are investigating a performance issue with a specific service, select the service and select :strong:`Add to Filter`. You can also add additional filters, including span tags and a custom time range.

4. Select :strong:`Show Traces`. This displays recent traces according to any filters you specified. If you did not specify any additional filters, it displays recent traces for every service.

5. Select the trace you want to download. If you know the trace ID, enter it in the trace search bar.

6. Select :strong:`Download Trace` to get a JSON file of the trace content. If the trace contains more than one trace segment, the button is a dropdown menu that provides a link to each segment.