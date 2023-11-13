
.. _view-metrics-usage-list-arm:

*******************************************************************************
View and download the usage list for a metric
*******************************************************************************

.. meta::
    :description: Learn how to see the objects that depend on your aggregated MTS and routing exception rules.

|hr|

:strong:`Available in Enterprise Edition and Service Bureau`

|hr|


The usage list for a metric displays the charts and detectors that use the metric time series (MTS) associated with a metric.
Use this list to see the objects that depend on your aggregated MTS and routing exception rules.

When you want to create aggregated MTS and drop the raw incoming MTS, use the list to identify the charts and detectors
you need to update using the aggregated MTS metric and dimensions.

You can also download the list to a .csv file.

.. note:: All roles can view the usage list.

To view the usage list, perform the following steps:

#. From the landing page of Splunk Observability Cloud, select the :menuselection:`Metrics pipeline management` menu item.
#. The opening page for :guilabel:`Metrics pipeline management` appears.
#. This page displays the aggregation and routing exception rules and the data routing for the MTS associated with each metric.
#. To find a metric in the list, go to the search box and start entering the name of the metric. The system starts
   displaying matching metric names, using autocomplete.
#. When you see the metric you want, select it from the list of metric names. The summary page for the metric appears.
#. On the summary page for the metric, select the :guilabel:`Metrics usage` tab: A list appears:

   #. To see the charts that depend on the metric, select the :guilabel:`Charts` tab. This is the default selection.
   #. To see the detectors that depend on the metric, select the :guilabel:`Detectors` tab.

   The number of objects for each type appears in the tab for the type.

   The :guilabel:`Agg` label appears next to a metric created by an aggregation rule.
#. To download the metrics usage, select :menuselection:`Download` from the list menu. The name of the downloaded file
   appears at the end of the usage list.

