.. _apm-scenario-trace-analyzer-trace-duration:

Scenario: Alex troubleshoots slow traces using Trace Analyzer
************************************************************************************

.. meta::
    :description: Alex uses Trace Analyzer to explore APM data from wide trends down to single traces to identify the cause and prevalence of slow traces.

Alex, the site reliability engineer for Buttercup Games, receives a report of a customer who experience slowness during checkout. To proactively improve customer experience, Alex uses Trace Analyzer to determine how pervasive the checkout slowness is. 

These are the steps Alex takes to determine how pervasive the checkout errors are:

#. :ref:`trace-duration-view`
#. :ref:`service-filter`
#. :ref:`trace-analyzer-filter`
#. :ref:`trace-analyzer-compare`


.. _trace-duration-view:

Alex uses    trace duration view in Trace Analyzer and filters the time range
============================================================================

Customer support shared that the customer reported slowness when going through the checkout flow at about 11:30am. So, Alex selects the trace duration view in Trace Analyzer and filters to the time range that matches the customer's report.

..  image:: /_images/apm/apm-use-cases/trace-duration-time-select.gif
    :width: 95%
    :alt: This gif shows the trace duration selection and the time selection in the Trace Analyzer chart

.. _service-filter:

Alex adds a filter for the checkout service and turns off sampling
============================================================================

Alex further refines the traces he is viewing by adding a filter for the checkout service. He also selects :guilabel:`1:1`` for the :guilabel:`Sample Ratio` so that he can view all traces that match his criteria. 

..  image:: /_images/apm/apm-use-cases/trace-duration-filter-sample.gif
    :width: 95%
    :alt: This gif shows the addition of a service filter and sampling ration selection in the Trace Analyzer chart

.. _review-heatmap:

Alex reviews the heatmap for a high-percentage of high-duration traces
============================================================================

Alex uses the heatmap to better understand trace durations for the time period that was reported by the customer. Alex notes the green area of the heatmap  at 11:31 which tells them that about 0.1 or 10 percent of traces per second had durations of 10+ seconds. 

..  image:: /_images/apm/apm-use-cases/trace-duration-interpret-heatmap.png
    :width: 95%
    :alt: This screenshot shows the heatmap for 11:31 which shows 10 percent of traces had durations of 10+ seconds

.. _review-traces:

Alex sorts to table of traces to reviews high-duration traces
============================================================================

Alex further refines the traces he is viewing by adding a filter for the checkout service. He also selects :guilabel:`1:1`` for the :guilabel:`Sample Ratio` so that he can view all traces that match his criteria. 

..  image:: /_images/apm/apm-use-cases/trace-duration-review-traces.gif
    :width: 95%
    :alt: This gif shows sorting the trace table by duration