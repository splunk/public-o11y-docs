:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst


.. _use-metric-pipeline:

*********************************************************************
Control your metric ingestion volume with rules
*********************************************************************

.. meta::
    :description: Learn how to create metric rules

For each metric you send to Splunk Observability Cloud, you can create various aggregation and data dropping rules to control ingestion and storage volume.

Create rules for a metric
=================================

Follow these steps to create rules for a metric.

#. From the landing page of Splunk Observability Cloud, go to :strong:`Settings > Metric pipeline management`.
#. Select :guilabel:`Create new rules`.
#. In the search bar, enter the name of the metric for which you want to create rules.
#. Select :guilabel:`OK`.
#. Add aggregation rules:

    #. Select :guilabel:`Add aggregation rule`.
    #. Enter the following fields to create an aggregation rule.

       .. list-table::
        :header-rows: 1
        :widths: 30 40 30

        * - :strong:`Field name`
          - :strong:`Description`
          - :strong:`Required?`
        * - Filter population
          - Search for dimension key or value to narrow down the associated MTSs
          - No
        * - Select dimensions to keep
          - Search for dimensions you want to keep. The dimensions you keep are used in the new aggregated MTSs. All other dimensions are removed.
          - Yes
        * - New aggregated metric name
          - Select :guilabel:`Generate name` to use a metric name set by the system, or enter a custom name for your aggregated metric.
          - Yes                 

    #. (Optional) If you want to disable your rule, switch :guilabel:`Rule status` to :strong:`Inactive`. By default, a new aggregation rule is active. 
    #. (Optional) Select :guilabel:`Add new aggregation rule` and repeat steps 6b-6c to add another aggregation rule.
#. (Optional) Add dropping rule:

    :strong:`Note:` You need to be an admin to drop data.

    In the :strong:`Drop unaggregated raw metrics data` section, select :guilabel:`Drop data` to discard the raw unaggregated metric that matches your serach in step 3. If you drop raw data, only the new aggregated metric is retained. By default, raw unaggregated data is kept.
   
    To learn more, see :ref:`data-dropping-impact`.
#. Select :guilabel:`Save`.
#. Review the new MTS volume.
#. Select :strong:`Confirm`.
