.. _apm-scenario-trace-analyzer-trace-duration:

Scenario: Alex troubleshoots slow traces using Trace Analyzer
************************************************************************************

.. meta::
    :description: Alex uses Trace Analyzer to explore APM data from wide trends down to single traces to identify the cause and prevalence of slow traces.

Alex, the site reliability engineer for Buttercup Games, receives a report of a customer who experience slowness during checkout. To proactively improve customer experience, Alex uses Trace Analyzer to determine how pervasive the checkout slowness is. 

These are the steps Alex takes to determine how pervasive the checkout errors are:

#. :ref:`trace-duration-view`
#. :ref:`trace-analyzer-group`
#. :ref:`trace-analyzer-filter`
#. :ref:`trace-analyzer-compare`


.. _trace-duration-view:

Alex use trace duration view in Trace Analyzer and filters the time range
============================================================================

Customer support shares that the customer reported slowness when going through the checkout flow at about 11:30am. Alex selects the trace duration view in Trace Analyzer and filters to the time range that matches the customer's report.

..  image:: /_images/apm/apm-use-cases/trace-duration-time-select.png
    :width: 95%
    :alt: This gif shows the trace duration selection and the time selection in the Trace Analyzer chart