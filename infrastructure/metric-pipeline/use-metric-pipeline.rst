:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst


.. _use-metric-pipeline:

*********************************************************************
Control your metrics ingestion volume with rules
*********************************************************************

.. meta::
    :description: Learn how to create metric rules

For each metric you send to Splunk Observability Cloud, you can create various aggregation and data dropping rules to control ingestion and storage volume.

Create rules for a metric
=================================

Follow these steps to create rules for a metric

#. From the landing page of Splunk Observability Cloud, go to :strong:`Settings > Metric pipeline management`.
#. Select :guilabel:`Create new rules`
#. In the search bar, enter the name of the metric for which you want to create rules.
#. Select :guilabel:`OK`.
#. Add aggregation rules:

    #. Select :guilabel:`Add aggregation rule`.
    #. (Optional) In the :strong:`Filter population` field, search for dimension key or value to narrow down the associated MTSs.
    #. In the :strong:`Select dimensions to keep` field, search for dimensions you want to keep. The dimensions you keep are used in the new aggregated MTSs. All other dimensions are removed.
    #. In the :strong:`New aggregated metric name` field, select :guilabel:`Generate name` to use a metric name set by the system, or enter a custom name for your aggregated metric. 
    #. (Optional) If you want to diable your rule, switch :guilabel:`Rule status` to :strong:`Inactive`. By default, a new aggregation rule is active. 
    #. (Optional) Select :guilabel:`Add new aggregation rule` and repeat steps 6b-6e to add another aggregation rule.
#. (Optional) In the :strong:`Drop unaggregated raw metrics data` section, select :guilabel:`Drop data` to discard all metric time series (MTS) that matches your metric selection criteria in step 3. If you drop raw data, only the new aggregated MTSs are retained. By default, unaggregated data is kept.

    To learn more, see :ref:`drop-metrics-data`.
#. Select :guilabel:`Save`.
#. Review the new MTS volume.
#. Select :strong:`Confirm`.
