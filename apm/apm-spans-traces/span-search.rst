
.. _span-search: 

******************************************
View and search for spans within a trace
******************************************

.. meta::
   :description: Search within a trace to highlight or filter visible spans based on tag values or error status.

In the :guilabel:`Trace Waterfall`, you can search within a trace to highlight or filter visible spans based on tag values or error status, as the following animation demonstrates: 

.. image:: /_images/apm/terms-concepts/span-search.gif
  :width: 100%
  :alt: This animation shows a span search in which the user searches for Service = checkoutservice, and then further refines the search to error=true. The user also demonstrates that using the Matches switch shows only the spans that match your search.

Follow these steps to search for a span within a trace: 

1. In the Splunk APM landing page, select :guilabel:`Traces`.
2. Find a trace you're interested in by doing one of the following:

    a. Enter a specific ``traceId`` in the search bar. 
    b. Use the filters in :guilabel:`Traces` view to find a trace of interest.

3. Select the :guilabel:`Trace ID` of the trace you're interested in to open the :guilabel:`Trace Waterfall`.  
4. Use the :guilabel:`Search Spans` bar to enter span tag values as filters for :guilabel:`Trace Waterfall`. Once you enter a filter, spans matching that filter are highlighted in blue. 

Use span search logic
-----------------------
When you select multiple tag values within a single tag name, the search applies Boolean ``OR`` among the tag values. When you select multiple tag names, the search applies Boolean AND to each tag name. Use the :guilabel:`Matches only` switch to show only spans that match your search. 

For example, the animation shows a search for spans with ``service = checkout service`` and ``error = true``. After you find a span you are interested in, select that span to expand it and see its metadata.

Show spans in context
-----------------------

When searching for a span, select the :guilabel:`Matches Only` toggle to show only spans matching your filter criteria. Then, once you've found a span or spans you're interested in, turn the :guilabel:`Matches Only` toggle back off to show the spans in context. 

This way, span search helps you narrow down the spans of a large trace to find the exact span you're interested in, while still retaining visibility of that span's before-and-after context and dependencies.

Trace waterfall reference
----------------------------

When viewing spans in the trace waterfall, note the following:

* When a trace contains multiple repeated spans, the spans are typically collapsed into one row. Open the row to see the repeated span's tags and select the number (x3, x7, and so on) to expand the row and view the individual spans and durations.
* The colors of spans in the waterfall help differentiate the services contributing spans to a trace. If every span in the trace is from the same service, all spans appear in the same color. If there are four different services involved, the spans are in four different colors, indicating the service they're from.

Explore logs for each span
------------------------------

When Related Content is enabled, you can jump to related logs for each trace and its spans. The following image shows the related logs in Log Observer for a specific trace.

.. image:: /_images/apm/terms-concepts/log-trace-related.png
  :width: 100%
  :alt: Related logs tile in the trace view.

See :ref:`get-started-enablerelatedcontent` for more information.

Continue troubleshooting in Tag Spotlight
---------------------------------------------

Expand a span of interest in the waterfall chart and select the spotlight icon that appears beside an indexed tag to navigate to Tag Spotlight. Tag Spotlight can help you isolate specific indexed span tags associated with trends in request rate, error rate, or latency and get to the bottom of what's causing problems. See :ref:`apm-tag-spotlight` to learn more about using Tag Spotlight. 

