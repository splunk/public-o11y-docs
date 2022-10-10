:orphan:

.. include:: /_includes/metric-pipeline/metric-pipeline-preview-header.rst


.. _aggregate-drop-use-case:

****************************************************************************************************
Use case: Combine aggregation and dropping rules to control your metric cardinality and volume
****************************************************************************************************

.. meta::
    :description: Aggregation and dropping use case

The following use cases feature examples from Buttercup Games, a fictitious e-commerce company.

Skyler is an admin for the central observability team at Buttercup Games. Skyler is in charge of monitoring observability usage across different teams to make sure they stay within the company's budget.

Lately, Skyler notices a spike in their metric usage. With the help of Splunk Observability Cloud account team, Skyler obtains a detailed metric usage analytics report. The report gives Skyler insights into their metrics volume, high cardinality dimensions, usage of those metrics in charts and detectors, and distribution of metrics across different teams.

Skyler realizes that one team in particular is approaching their allocated usage limit. Skyler reaches out to Kai, the site reliability engineer (SRE) lead on that team, and asks them to optimize their team's usage. Skyler shares with Kai the high cardinality metrics and their team's usage. 
 
Based on the information Kai receives from Skyler, Kai decides to use metric pipeline management to control how Observability Cloud ingests their team's data.

Kai notices that their team sends about 50,000 metric time series (MTSs) for the ``service.latency`` metric to Observability Cloud, but not all the data is essential. Kai concludes that reducing cardinality for ``service.latency`` is beneficial for their team.

#. Kai decides to create an aggregation rule for ``service.latency``. 
#. Kai knows their team cares most about different regions when it comes to service latency, so they keep only the ``region`` dimension in the aggregation rule. Other dimensions such as ``instance_id`` or  ``service`` are not information they need to monitor.
#. Kai has a new aggregated ``service.latency_by_region`` metric that yields only 1,623 MTSs.
#. Kai lets Skyler know that they have created an aggregated metric, so the unaggregated raw metric can be dropped.
#. Skyler selects ``service.latency`` on the :strong:`Metric pipeline management` page to view current rules for the metric.
#. For each associated chart and detector, Skyler replaces ``service.latency`` with ``service.latency_by_region``.
#. Once they have confirmed that no chart and detector still uses the unaggregated raw metric, Skyler changes :guilabel:`Keep data` to :guilabel:`Drop data`.

By combining aggregation and data dropping rules, Kai and Skyler have successfully summarized a high cardinality metric, creating a more focused monitoring experience for their team while minimizing storage costs for Buttercup Games.

Learn more
===============


To learn more about aggregation, see :ref:`aggregation`.

To learn more about data dropping, see :ref:`data-dropping`.

For more information on how to create metric rules, see :ref:`use-metric-pipeline`. 

For more information on the impact of dropping data, see :ref:`data-dropping-impact`. 
