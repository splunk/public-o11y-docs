
.. _span-search: 

******************************************
View and filter for spans within a trace
******************************************

.. meta::
   :description: Learn how to filter within a trace to highlight or filter visible spans based on tag values or error status.

In the trace waterfall, you can filter visible spans based on tag values or error status, as the following animation demonstrates: 

.. image:: /_images/apm/spans-traces/span-search-filter.gif
  :width: 100%
  :alt: This animation shows a span filter in which the user filters for Service = checkoutservice, and then further refines the filter to error=true. The user also demonstrates that using the matches-only switch shows only the spans that match your filter.

Follow these steps to filter for a span within a trace: 

1. On the Splunk APM landing page, select :guilabel:`Traces`.
2. There are 2 ways to find a trace:

    a. Enter a specific ``traceId`` in the search bar. 
    b. Use the filters in :guilabel:`Traces` view to find a trace of interest.

3. When you have found the trace you are interseted in, select the :guilabel:`Trace ID` of the trace to open the trace :guilabel:`Waterfall`.  
4. Select :guilabel:`Add filters` to select span tag values to filter the trace waterfall to specific spans. Spans matching your filter are highlighted in blue. 

Use span filter logic
========================
When you select multiple tag values within a single tag name, the filter applies Boolean ``OR`` among the tag values. When you select multiple tag names, the filter applies Boolean ``AND`` to each tag name. Use the :guilabel:`Matches only` switch to show only spans that match your filter. After you find a span you are interested in, select that span to expand it and see its metadata.

Show spans in context
========================

When filtering for a span, select the :guilabel:`Matches Only` switch to show only spans matching your filter criteria. Then, once you've found a span or spans you're interested in, turn the :guilabel:`Matches Only` switch back off to show the spans in context. Use the :guilabel:`Matches Only` filter to narrow down the spans of a large trace to find the exact span you're interested in, while still retaining visibility of that span's before-and-after context and dependencies.

Expand and collapse spans
===========================

Use the 3-dot menu next to each span to expand and collapse spans as needed. You can expand or collapse at a specific depth or at the service and operation level.

.. image:: /_images/apm/spans-traces/span-search-expand-collapse.png
  :width: 95%
  :alt: 3-dot menu with options to collapse spans at a specific depth or the service and operation level

Trace waterfall reference
==========================

When viewing spans in the trace waterfall, note the following:

* When a trace contains multiple repeated spans, the spans are typically collapsed into 1 row. Open the row to see the repeated span's tags and select the number (x3, x7, and so on) to expand the row and view the individual spans and durations.
* The colors of spans in the waterfall help differentiate the services contributing spans to a trace. If every span in the trace is from the same service, all spans appear in the same color. If there are 4 different services involved, the spans are in 4 different colors, indicating the service they're from.

View RUM session details
===========================

For spans that also have RUM session details, the word RUM displays in the span. Select the RUM link to view the session in RUM. To view the RUM session details, select the span and then select the :guilabel:`RUM Session` tab in the Trace Properties panel. You can also select the session ID to go to RUM. 

.. image:: /_images/apm/spans-traces/span-search-integrated-traces-splunk-show.png
  :width: 95%
  :alt: The integration of RUM within traces shows a link to RUM and the RUM session details in the Trace Properties panel


Explore logs and infrastructure for each span
====================================================

If you turned on Related Content, you can jump to related logs and infrastructure when available for each trace and its spans. The following image shows the related logs in Log Observer for a specific trace.

.. image:: /_images/apm/spans-traces/span-search-related-content.png
  :width: 95%
  :alt: Related logs tile in the trace view.

See :ref:`get-started-enablerelatedcontent` for more information.

Continue troubleshooting in Tag Spotlight
=============================================

Expand a span of interest in the waterfall chart and select the spotlight icon that appears beside an indexed tag to navigate to Tag Spotlight. Tag Spotlight can help you isolate specific indexed span tags associated with trends in request rate, error rate, or latency and get to the bottom of what's causing problems. See :ref:`apm-tag-spotlight` to learn more about using Tag Spotlight. 

