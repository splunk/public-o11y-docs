.. _apm-use-case-trace-analyzer:

************************************************************************************
Use case: Troubleshoot an unknown issue using Trace Analyzer
************************************************************************************

.. meta::
    :description: To identify the cause of the unknown issues, Alex decides to use Trace Analyzer, which allows them to explore APM data from wide trends down to single traces. 

Alex, the site reliability engineer for Buttercup Games, receives a report of a customer who received an error during checkout. To proactively prevent a potential incident, Alex uses Trace Analyzer to quickly determine how pervasive the checkout errors are. 


These are the steps Alex took to determine how pervasive the checkout errors are:

#. :ref:`trace-analyzer-errors`
#. :ref:`trace-analyzer-group`
#. :ref:`trace-analyzer-solution`

.. _trace-analyzer-errors:

Search for traces with errors
===================================

Customer support shares a trace ID which Alex uses to

As most reports happened in the weeks following the release of the recommendation service, Alex opens Trace Analyzer and sets the time range to the last hour for the recommendation service in production. To narrow down the search further, they switch :guilabel:`Errors only`.

The search reduces the amount of traces to a few thousand from the millions available in Splunk APM. 

.. _trace-analyzer-group:

Group traces by specific tags
==================================

Next, Alex uses the :guilabel:`Grouped by` menu to select the ``device.type`` tag. 

Alex notices that the tablet throws the most errors among the types of devices, so they decide to switch the grouping tag to ``tablet.brand``. Alex then selects the :guilabel:`Group Metrics` tab to dig into each value of the grouping tag.

.. _trace-analyzer-solution:

Return to confirm solution
==================================

After the back-end team confirmed and solved the issue affecting the Android tablet clients, Alex returns to the saved Trace Analyzer view and changes the time range to the current week. They immediately notice that the amount of errors and the latencies are back to normal. Eager to keep an eye on the issue, Alex configures new alerts based on the trace metadata they might collect.

Summary
====================================================================================

Thanks to the high resolution data provided by full-fidelity tracing and to the features of Trace Analyzer, Alex managed to troubleshoot an unknown issue and set up alerts in case it happens again.

Learn more
===============

- For more information on Trace Analyzer, see :ref:`trace-analyzer`.
- For a list of APM key concepts, see :ref:`apm-key-concepts`.
- For more Splunk APM use cases, see :ref:`apm-use-cases-intro`.