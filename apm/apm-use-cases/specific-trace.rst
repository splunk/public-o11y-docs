.. _specific-trace:

************************************************************************************
Troubleshoot an edge case by searching for a specific trace
************************************************************************************

.. Metadata updated: 1/23/23
.. meta::
    :description: This Splunk APM use case describes how to filter for specific trace in APM Trace View for troubleshooting.

Kai, the site reliability engineer at Buttercup Games, receives a ticket from a customer getting an “Invalid request” error when redeeming a coupon on the Buttercup Games website. Kai looks at the Splunk APM Overview dashboard, seeing that all services have a minimal level of error rate. Kai clicks :strong:`Traces` to enter the trace view powered by full-fidelity tracing to locate the specific trace corresponding to the ticket. 

Kai selects the ``customer.id`` index tag under the :strong:`Tags` dropdown and enters the customer ID on the ticket. With the tag, Kai finds the exact trace where the error occurred. Kai selects ``Trace ID``  to examine the trace's service, tags, and process in the :strong:`Waterfall` view. Kai also checks the :strong:`Span Performance` to understand the performance of all spans within the trace.

Kai has global data links configured based on the tags to redirect to other tools in Splunk Observability Cloud. Going back to the :strong:`Waterfall` view, Kai clicks a tag with a data link to navigate to a relevant dashboard to further troubleshoot and resolve the issue for the customer. 

Learn more
===========

For more information about creating global data links, see :ref:`apm-data-links`.