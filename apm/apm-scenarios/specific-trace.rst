.. _specific-trace:

************************************************************************************
Scenario: Kai troubleshoots an edge case by searching for a specific trace
************************************************************************************

.. meta::
    :description: This Splunk APM scenario describes how to filter for specific trace in APM Trace View for troubleshooting.

Kai, the site reliability engineer at Buttercup Games, receives a ticket from a customer who reports they are getting an "Invalid request" error when redeeming a coupon on the Buttercup Games website. 

To troubleshoot this issue, Kai takes the following steps:

#. :ref:`specific-trace-apm-overview`
#. :ref:`specific-trace-trace-view`
#. :ref:`specific-trace-waterfall-view`
#. :ref:`specific-trace-data-links`

.. _specific-trace-apm-overview:

Kai reviews the services on the APM overview dashboard
========================================================

Kai looks at the Splunk APM Overview dashboard, seeing that all services have a minimal error rate.

.. _specific-trace-trace-view:

Kai goes to the trace view and finds the trace where the customer error occurred
==================================================================================

Kai selects :strong:`Traces` to enter the trace view powered by full-fidelity tracing to locate the specific trace corresponding to the ticket. 

Kai selects the ``customer.id`` index tag under the :strong:`Tags` dropdown and enters the customer ID on the ticket. With the tag, Kai finds the exact trace where the error occurred. 

.. _specific-trace-waterfall-view:

Kai reviews the trace and the span performance in waterfall view
====================================================================

Kai selects ``Trace ID`` to examine the trace's service, tags, and processes in the :strong:`Waterfall` view. Kai also checks the :strong:`Span Performance` to understand the performance of all spans within the trace.

.. _specific-trace-data-links:

Kai uses data links to navigate to the relevant dashboard 
==============================================================

Kai has global data links configured to redirect to other tools in Splunk Observability Cloud based on the tags. Going back to the :strong:`Waterfall` view, Kai selects a tag with a data link to navigate to a relevant dashboard to further troubleshoot and resolve the issue for the customer. 

Summary
==========

Kai was able to use trace view to quickly navigate to a specific trace to troubleshoot an edge case issue reported by a customer.

Learn more
===========

For more information about creating global data links, see :ref:`apm-data-links`.