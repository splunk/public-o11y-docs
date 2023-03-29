.. _apm-use-case-trace-analyzer:

Use case: Troubleshoot an unknown issue using Trace Analyzer
************************************************************************************

.. meta::
    :description: To identify the cause and prevalence of an unknown issue, Alex uses Trace Analyzer to explore APM data from wide trends down to single traces. 

Alex, the site reliability engineer for Buttercup Games, receives a report of a customer who received an error during checkout. To proactively prevent a potential incident, Alex uses Trace Analyzer to quickly determine how pervasive the checkout errors are. 


These are the steps Alex took to determine how pervasive the checkout errors are:

#. :ref:`trace-analyzer-errors`
#. :ref:`trace-analyzer-group`
#. :ref:`trace-analyzer-filter`

.. _trace-analyzer-errors:

Alex reviews the customer's trace for errors
===============================================

Customer support shares a trace ID which Alex uses to pull up the trace to begin troubleshooting. Alex notes that an http request in the checkout service is returning a 500 error. Alex would like to quickly understand how prevalent this error is for the checkout flow. He makes a note of the ``http.url`` for the request that is returning a 500. 

.. _trace-analyzer-group:

Group traces by specific tags
==================================

In Trace Analyzer, Alex selects ``http.url`` in the :guilabel:`Group traces by`` menu to quickly understand the prevalence of errors for the the specific http.url value that he made note of from the problematic trace. He notes that a good number of traces for the ``/checkout/{cardId}`` request have errors. 


.. _trace-analyzer-filter:

Filter Trace Analyzer by http url value
==========================================

Alex adds the ``/checkout/{cardId}`` http url to the Trace Analyzer filter so that he can review traces for this specific endpoint. Now Alex is able to 

Summary
====================================================================================

Thanks to the high resolution data provided by full-fidelity tracing and to the features of Trace Analyzer, Alex managed to troubleshoot an unknown issue and set up alerts in case it happens again. click

Learn more
===============

- For more information on Trace Analyzer, see :ref:`trace-analyzer`.
- For a list of APM key concepts, see :ref:`apm-key-concepts`.
- For more Splunk APM use cases, see :ref:`apm-use-cases-intro`.