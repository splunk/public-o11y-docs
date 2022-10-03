:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst


.. _aggregate-use-case:

*********************************************************************
Use case: Aggregate a metric based on the most important dimension
*********************************************************************

.. meta::
    :description: Aggregation use case

The following use cases feature examples from Buttercup Games, a fictitious e-commerce company.

Kai, a site reliability engineer (SRE) at Buttercup Games, learns that their company is trying to cut down on metric ingestion and storage costs in Splunk Observability Cloud.

Instead of changing how Buttercup Games sends data to Observability Cloud, Kai makes use of :strong:`Metric pipeline management` to control how Observability Cloud ingests their company's data.

Kai notices that Buttercup Games sends about 50,000 MTSs for the ``cpuUtilization`` metric to Observability Cloud. Kai immediately knows that reducing cardinality for ``cpuUtilization`` is beneficial for their company.

#. Kai decides to create an aggregation rule for ``cpuUtilization``. 
#. Kai knows their team cares most about different regions when it comes to CPU utilization, so they keep only the ``region`` dimension in the aggregation rule. Other dimensions such as ``instance_id`` or  ``service`` are not information they need to monitor.
#. Kai has a new aggregated ``cpuUtilization_by_region`` metric that yields only 1,623 MTSs.

With the help of :strong:`Metric pipeline management`, Kai has successfully summarized a high cardinality metric and created a more focused monitoring experience for their team. 

Learn more
===============

To learn more about aggregation, see :ref:`metric-pipeline-intro`

For more information on how to create metric rules, see :ref:`use-metric-pipeline`. 
