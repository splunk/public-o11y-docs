:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst


.. _use-metric-pipeline:

*********************************************************************
Control your metrics ingestion volume with metric ruleset
*********************************************************************

.. meta::
    :description: Learn how to create a metric ruleset

A metric ruleset lets you select one metric to set filtering and aggregation rules.

Create a metric ruleset
=================================

Follow these steps to create a metric ruleset.

#. From the landing page of Splunk Observability Cloud, go to :strong:`Settings > Metric pipeline management`.
#. Select :guilabel:`Create new ruleset`
#. In the search bar, enter the name of the metric for which you want to create a ruleset.
#. Select :guilabel:`Next`.
#. Add aggregation rules:

    #. Select :guilabel:`Add aggregation rules`.
    #. In the :strong:`Aggregate by` field, search for dimensions associated with your selected metric. The dimensions you select to aggregate by are retained in the aggregated metric. Other dimensions are dropped.
    #. In the :strong:`New aggregated metric name` field, rename your aggregated metric or select :guilabel:`Generate name` to use a metric name set by the system.
    #. (Optional) If you want to diable your rule, switch :guilabel:`Rule status` to :strong:`Inactive`. By default, a new ggregation rule is active. 
    #. (Optional) Select :guilabel:`Add new rule` and repeat steps 6b-6d to add another aggregation rule.
#. (Optional) In the :strong:`Drop metrics data`, select :guilabel:`Enabled` to discard all metric time series (MTS) that matches your metric selection criteria in step 3. If you enable data dropping, only the new aggregated MTS are retained. By default, :strong:`Drop metrics data` is disabled.

    To learn more, see :ref:`drop-metrics-data`.
#. Select :strong:`Next`.
#. Review the new MTS volume.
#. Select :strong:`Confirm`.
#. Review your ruleset configurations and impact.
#. Select :guilabel:`Save`.

