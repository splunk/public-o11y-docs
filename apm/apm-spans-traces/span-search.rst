
.. _span-search: 

******************************************
View and filter for spans within a trace
******************************************

.. meta::
   :description: Learn how to filter within a trace to highlight or filter visible spans based on tag values or error status.

In the trace waterfall, you can filter visible spans based on tag values or error status, as the following animation demonstrates: 

.. image:: /_images/apm/spans-traces/span-filter.gif
  :width: 100%
  :alt: This animation shows a span filter in which the user filters for Service = checkoutservice, and then further refines the filter to error=true. The user also demonstrates that using the Matches switch shows only the spans that match your filter.

Follow these steps to filter for a span within a trace: 

1. In the Splunk APM landing page, select :guilabel:`Traces`.
2. Find a trace you're interested in by doing one of the following:

    a. Enter a specific ``traceId`` in the search bar. 
    b. Use the filters in :guilabel:`Traces` view to find a trace of interest.

3. Select the :guilabel:`Trace ID` of the trace you're interested in to open the trace :guilabel:`Waterfall`.  
4. Select :guilabel:`Add Filters` to filter by span tag values to filter the trace waterfall to specific spans. Spans matching your filter are highlighted in blue. 

Use span filter logic
-----------------------
When you select multiple tag values within a single tag name, the filter applies Boolean ``OR`` among the tag values. When you select multiple tag names, the filter applies Boolean AND to each tag name. Use the :guilabel:`Matches only` switch to show only spans that match your filter. After you find a span you are interested in, select that span to expand it and see its metadata.

Show spans in context
-----------------------

When filtering for a span, select the :guilabel:`Matches Only` switch to show only spans matching your filter criteria. Then, once you've found a span or spans you're interested in, turn the :guilabel:`Matches Only` switch back off to show the spans in context. 

This way, span filtering helps you narrow down the spans of a large trace to find the exact span you're interested in, while still retaining visibility of that span's before-and-after context and dependencies.

Trace waterfall reference
----------------------------

When viewing spans in the trace waterfall, note the following:

* When a trace contains multiple repeated spans, the spans are typically collapsed into one row. Open the row to see the repeated span's tags and select the number (x3, x7, and so on) to expand the row and view the individual spans and durations.
* The colors of spans in the waterfall help differentiate the services contributing spans to a trace. If every span in the trace is from the same service, all spans appear in the same color. If there are four different services involved, the spans are in four different colors, indicating the service they're from.

Explore logs for each span
------------------------------

When Related Content is turned on, you can jump to related logs for each trace and its spans. The following image shows the related logs in Log Observer for a specific trace.

.. image:: /_images/apm/spans-traces/log-trace-related.png
  :width: 75%
  :alt: Related logs tile in the trace view.

See :ref:`get-started-enablerelatedcontent` for more information.

Continue troubleshooting in Tag Spotlight
---------------------------------------------

Expand a span of interest in the waterfall chart and select the spotlight icon that appears beside an indexed tag to navigate to Tag Spotlight. Tag Spotlight can help you isolate specific indexed span tags associated with trends in request rate, error rate, or latency and get to the bottom of what's causing problems. See :ref:`apm-tag-spotlight` to learn more about using Tag Spotlight. 

