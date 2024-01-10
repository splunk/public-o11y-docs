
.. _aggregate-drop-use-case:

****************************************************************************************************
Scenario: Combine aggregation and dropping rules to control your metric cardinality and volume
****************************************************************************************************

.. meta::
    :description: Aggregation and dropping scenario for metrics pipeline management.

|hr|

:strong:`Available in Enterprise Edition and Service Bureau`

|hr|



The following scenario features an example from Buttercup Games, a fictitious e-commerce company.

Background
===============

Skyler is an admin for the central observability team at Buttercup Games. Skyler is in charge of monitoring observability usage across different teams to make sure they stay within the company's budget.

Lately, Skyler notices a spike in their metrics usage. With the help of the Splunk Observability Cloud account team, Skyler obtains a detailed metrics usage report. The report gives Skyler insights into their metrics volume, high cardinality dimensions, usage of those metrics in charts and detectors, and distribution of metrics across different teams.

Skyler realizes that one team in particular is approaching their allocated usage limit. Skyler reaches out to Kai, the site reliability engineer (SRE) lead on that team, and asks them to optimize their team's usage. Skyler shares with Kai the high cardinality metrics and their team's usage. 

Findings
===============
 
The metrics usage report shows that Kai's team sends about 50,000 metric time series (MTS) for the ``service.latency`` metric to Observability Cloud, but not all the data at full granularity is essential. Kai looks at the report to understand more about the cardinality of different dimensions. They notice that the ``instance_id`` and ``host_name`` dimensions are the highest cardinality dimensions for ``service.latency``.

However, Kai knows their team cares most about different regions when it comes to service latency, so they only want to monitor the ``region`` dimension. The ``instance_id`` or ``host_name`` dimensions are not information they need to monitor.

Actions
===============
 
Kai decides to use metrics pipeline management to control how Observability Cloud ingests their team's data.

#. In Observability Cloud, Kai creates an aggregation rule that reduces the cardinality of ``service.latency`` by keeping the ``region`` dimension and discarding ``instance_id`` and ``host_name``.
#. Kai has a new aggregated ``service.latency_by_region`` metric that yields only 1,623 MTS.
#. Kai downloads the list of charts and detectors that use the ``service.latency`` metric.
#. For each associated chart and detector, Kai replaces ``service.latency`` with ``service.latency_by_region``.
#. Kai lets Skyler know that they have created an aggregated metric and updated all the associated charts and detectors, so Skyler can drop the unaggregated raw metric that the team no longer needs to monitor.
#. Skyler selects ``service.latency`` on the :strong:`Metrics pipeline management` page to view current rules for the metric.
#. Skyler changes :guilabel:`Keep data` to :guilabel:`Drop data`.
#. Skyler verifies the new metric volume after dropping the data they don't need, and saves the rules.

Summary
===============

By combining aggregation and data dropping rules, Kai and Skyler have successfully summarized a high cardinality metric, creating a more focused monitoring experience for their team while minimizing storage costs for Buttercup Games.

Learn more
===============

To learn more about aggregation, see :ref:`aggregation`.

To learn more about data dropping, see :ref:`data-dropping`.

To learn more about metrics usage report, see :ref:`metrics-usage-report`.

For more information on how to create metric rules, see :ref:`use-metrics-pipeline`. 

For more information on the impact of dropping data, see :ref:`data-dropping-impact`. 
