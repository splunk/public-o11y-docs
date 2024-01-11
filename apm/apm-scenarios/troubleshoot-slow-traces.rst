.. _apm-scenario-trace-analyzer-trace-duration:

Scenario: Alex troubleshoots slow traces using Trace Analyzer
************************************************************************************

.. meta::
    :description: Alex uses Trace Analyzer to explore APM data from wide trends down to single traces to identify the cause and prevalence of slow traces.

Alex, the site reliability engineer for Buttercup Games, receives a report of a few customers who experienced slowness using Buttercup Games. To proactively improve the customer experience, Alex uses Trace Analyzer to determine how pervasive the slowness is. 

These are the steps Alex takes to determine how pervasive the slowness is:

#. :ref:`trace-duration-view`
#. :ref:`zoom-heatmap`
#. :ref:`sampling`
#. :ref:`review-heatmap`
#. :ref:`review-traces`


.. _trace-duration-view:

Alex uses the trace duration view in Trace Analyzer and filters the time range
================================================================================

Customer support shared that the customer reports of slowness started around 11:00 APM. So, Alex selects the trace duration view in Trace Analyzer and filters to the time range that matches the customer's report.

..  image:: /_images/apm/apm-use-cases/trace-duration-time-select.gif
    :width: 95%
    :alt: This gif shows the trace duration selection and the time selection in the Trace Analyzer chart

.. _zoom-heatmap:

Alex zooms in on the trace duration heatmap
============================================================================

Alex selects the time period in the trace duration heatmap that shows a higher rate of traces with a longer trace durations to further refine the traces in the table.


..  image:: /_images/apm/apm-use-cases/trace-duration-filter-to-selection.gif
    :width: 95%
    :alt: This gif shows the filtering to a selection in the Trace Analyzer heatmap

.. _sampling:

Alex turns off sampling
============================================================================

Alex selects :guilabel:`1:1` for the :guilabel:`Sample Ratio` so that they can view all traces that match their criteria. 

..  image:: /_images/apm/apm-use-cases/trace-duration-filter-sample.gif
    :width: 95%
    :alt: This gif shows the sampling ratio selection in the Trace Analyzer chart

.. _review-heatmap:

Alex reviews the heatmap for a high rate of high-duration traces
============================================================================

Alex uses the heatmap to better understand trace durations for the time period reported by the customer. Alex notes the darker area of the heatmap at 11:10 AM which tells them that there was a high trace per second rate (between 3 and 4 traces per second) with durations of 10 or more seconds.

..  image:: /_images/apm/apm-use-cases/trace-duration-interpret-heatmap.png
    :width: 95%
    :alt: This screenshot shows the heatmap for 11:10 AM which shows 3-4 traces per second had durations of 10 or more seconds

.. _review-traces:

Alex sorts the table of traces to review high-duration traces
============================================================================

Alex sorts the table of traces by duration so that they can review the high-duration traces.

..  image:: /_images/apm/apm-use-cases/trace-duration-review-traces.gif
    :width: 95%
    :alt: This gif shows sorting the trace table by duration

Summary
====================================================================================

Using the high-resolution data provided by full-fidelity tracing, Alex managed to quickly determine the prevalence of slowness in the checkout flow. Using filtering and the trace duration heatmap, Alex quickly isolated high-duration traces to provide to the engineers to isolate the issue. 

Learn more
===============

- For more information on Trace Analyzer, see :ref:`trace-analyzer`.
- For another Trace Analyzer scenario, see :ref:`apm-scenario-trace-analyzer`.
- For a list of APM key concepts, see :ref:`apm-key-concepts`.
- For more Splunk APM scenarios, see :ref:`apm-scenarios-intro`.