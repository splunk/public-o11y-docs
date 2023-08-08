.. _trace-search:

***************************************
Explore your traces using Trace Search
***************************************

.. meta::
   :description: Learn how to explore your traces using Trace Search.

Use Splunk APM’s Trace Search to search through full fidelity trace data to find a specific trace you’re interested in. Trace search searches all currently retained traces; see :ref:`apm-data-retention` to learn more about the default trace retention period. 

Use these steps to navigate to :guilabel:`Trace Search`:

#. From the Splunk Observability Cloud landing page, select :guilabel:`APM`.
#. From the APM landing page, select :guilabel:`Traces`. A list of recent traces opens. 
   
   .. note:: Select :guilabel:`Switch to Trace Analyzer` to use the new Trace Analyzer to search traces and identify patterns in the full-fidelity trace data without prior knowledge of which tags are relevant. Trace Analyzer is available to all Splunk Observability Cloud users that use Splunk APM. See :ref:`trace-analyzer` for more info.

#. (Optional) Use the filter bar at the top of the list to narrow the list of traces. If you select multiple items in a filter, they are treated with an AND Boolean operator. For example, if you select multiple services in the service filter, only traces containing spans from ALL of the selected services appear in the results. The following filter options are available: 
    * Time range
    * Environment
    * Workflow
    * Services
    * Tags
#. (Optional) Select a minimum or maximum trace duration and toggle the :guilabel:`Errors Only` switch to include only traces containing errors in your search. 
#. (Optional) Select the header of the :guilabel:`Start time` or :guilabel:`Duration` column to sort your traces by that field. 

While Splunk APM runs the search, a time chart provides visual feedback on the trace history searched so far. The chart also displays the number of requests and errors within each slice of time that has been searched. You can narrow your search to a specific time range of interest by selecting a time range within the chart. 

The following animated gif demonstrates how to select a time range in the chart: 

.. image:: /_images/apm/spans-traces/trace-search-time-selection.gif
   :alt: This animated gif shows a user making a selection within the interactive trace search chart. 

.. note:: The :guilabel:`Timestamp` column displays the time zone set in your profile. By default, the time zone is automatically detected from your browser. If you want to change to a different time zone to match the experience of a teammate in another time zone, navigate to :guilabel:`Account Settings` and make a selection in the :guilabel:`Time Zone` field. 

Trace Search trace limit
==================================

The Trace Search has a limit of 1,000 traces. The Trace Search retrieves traces at the end of the time window you select. When 1,000 traces are matched, the chart stops populating.