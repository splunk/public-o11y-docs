.. _trace-search:

***************************************
Explore your traces using Trace Search
***************************************

Use Splunk APM’s Trace Search to search through full fidelity trace data to find a specific trace you’re interested in. Trace search searches all currently retained traces; see :ref:`apm-data-retention` to learn more about the default trace retention period. 

Use these steps to navigate to :guilabel:`Trace Search`:

#. From the Splunk Observability Cloud landing page, click :guilabel:`APM`.
#. From the APM landing page, click :guilabel:`Traces`. A list of recent traces opens. 
#. Use the filter bar at the top of the list to narrow the list by environment, workflow, service(s), and tag(s). If you select multiple items in a filter, they are treated with an AND boolean operator. For example, if you select multiple services in the service filter, only traces containing spans from ALL of the selected the services appear in the results. 
#. (Optional) Select a minimum or maximum trace duration and toggle the :guilabel:`Errors Only` switch to include only traces containing errors in your search. 
#. (Optional) Click the header of the :guilabel:`Start time` or :guilabel:`Duration` column to sort your traces by that field. 

While Splunk APM runs the search, a time chart provides visual feedback on the trace history searched so far. The chart also displays the number of requests and errors within each slice of time that has been searched. You can narrow your search to a specific time range of interest by selecting a time range within the chart. 

The following animated gif demonstrates how to select a time range in the chart: 

.. image:: /_images/apm/spans-traces/trace-search.gif
   :alt: This animated gif shows a user making a selection within the interactive trace search chart. 

.. note:: The :guilabel:`Timestamp` column displays the time zone set in your profile. By default, the time zone is automatically detected from your browser. If you want to change to a different time zone to match the experience of a teammate in another time zone, navigate to :guilabel:`Account Settings` and make a selection in the :guilabel:`Time Zone` field. 
