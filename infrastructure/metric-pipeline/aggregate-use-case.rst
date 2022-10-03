:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst


.. _aggregate-use-case:

*********************************************************************
Use case: Aggregate a metric to focus on important data
*********************************************************************

.. meta::
    :description: Aggregation use case

The following use cases feature examples from Buttercup Games, a fictitious e-commerce company.

Kai, a site reliability engineer (SRE) at Buttercup Games, receives a request from their team lead, Skyler, to create more focused monitoring views in Splunk Observability Cloud.

Instead of changing how Buttercup Games sends data to Observability Cloud, Kai makes use of :strong:`Metric pipeline management` to control how Observability Cloud ingests their team's data.

Kai notices that their team sends about 50,000 metric time series (MTSs) for the ``cpuUtilization`` metric to Observability Cloud, but not all the data is essential. Kai immediately realizes that reducing cardinality for ``cpuUtilization`` is beneficial for their team.

#. Kai decides to create an aggregation rule for ``cpuUtilization``. 
#. Kai knows their team cares most about different regions when it comes to CPU utilization, so they keep only the ``region`` dimension in the aggregation rule. Other dimensions such as ``instance_id`` or  ``service`` are not information they need to monitor.
#. Kai has a new aggregated ``cpuUtilization_by_region`` metric that yields only 1,623 MTSs.

With the help of :strong:`Metric pipeline management`, Kai has successfully summarized a high cardinality metric and created a more focused monitoring experience for their team. 

Learn more
===============

To learn more about aggregation, see :ref:`aggregation`.

For more information on how to create metric rules, see :ref:`use-metric-pipeline`. 
