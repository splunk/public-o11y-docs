.. _apm-download-traces:

**********************************
Download traces
**********************************

.. meta::
   :description: Learn about downloading traces from Splunk APM in JSON.

Download APM traces to analyze, save, and share them with other people. When you download a trace, Splunk APM exports its trace content in JSON files. 

For each trace, Splunk APM combines all spans for a specific time window into a single trace segment. The name of each trace segment corresponds to the start time of the first span in the segment. 

Every trace includes at least 1 trace segment, and there can be more than one trace segment based on the trace duration or number of spans. To get all the content for a trace, download every segment for the trace. If you download multiple trace segments, concatenate each JSON file to view all the available trace data.

.. note:: Downloaded traces are limited to 8 MB.

Follow these steps to download a trace:

1. In the Splunk Observability Cloud, go to the :strong:`APM` tab.

2. Select :strong:`Traces`.

3. If you are investigating a performance issue with a specific service, select the service. You can also add additional filters, including span tags and a custom time range. This displays recent traces according to any filters you specified. If you did not specify any additional filters, it displays recent traces for every service.

4. Select the trace you want to download. Or, if you know the trace ID, enter it in the trace search bar.

5. Select :guilabel:`Trace Properties` then :guilabel:`Download Trace` to get a JSON file of the trace content. If the trace contains more than one trace segment, the button is a dropdown menu that provides a link to each segment.