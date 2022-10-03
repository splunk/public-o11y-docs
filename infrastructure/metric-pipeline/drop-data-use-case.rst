:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst


.. _drop-data-use-case:

*********************************************************************
Use case: Drop unaggregated raw data to reduce storage
*********************************************************************

.. meta::
    :description: Drop data use case

The following use cases feature examples from Buttercup Games, a fictitious e-commerce company.

Skyler, a senior site reliability engineer (SRE) at Buttercup Games, notices a spike in metric ingestion volume for CPU utilization in Splunk Observability Cloud.

After some investigation, Skyler finds out that one of their team members, Kai, recently created an aggregation rule to summarize the high cardinality ``cpuUtilization`` metric into a new metric called ``cpuUtilization_by_region``. However, raw unaggregated data is still retained, leading to a higher total ingestion volume.

As the team lead, Skyler understands from past experiences that their team don't need to monitor CPU utilization by instance ID or service. Therefore, Skyler can stop ingesting all the unaggregated raw MTSs in Observability Cloud.

#. Skyler selects ``cpuUtilization`` on the :strong:`Metric pipeline management` page to view current rules for the metric.
#. Skyler checks the list of related charts and detectors to make sure ``cpuUtilization`` has been replaced with ``cpuUtilization_by_region``.
#. Once they have confirmed that no chart and detector still uses the unaggregated metric, Skyler changes :guilabel:`Keep data` to :guilabel:`Drop data`.

Using data dropping, Skyler has successfully reduced the total ingestion volume for the CPU utilization metric by about 50,000 MTSs, minimizing storage costs for Buttercup Games.

Learn more
===============

To learn more about data dropping, see :ref:`data-dropping`.

For more information on the impact of dropping data, see :ref:`drop-metrics-data`. 