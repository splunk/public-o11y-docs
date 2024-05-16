
.. _use-case-archive:

****************************************************************************************************
Scenario: Improve storage use and costs by routing and archiving your data
****************************************************************************************************

.. meta::
    :description: Archive scenario for metrics pipeline management.

|hr|

:strong:`Available in Enterprise Edition`. For more information, see :ref:`sd-subscriptions`.

|hr|

The following scenario features an example from Buttercup Games, a fictitious e-commerce company.

Background
===============

Skyler is an admin for the central observability team at Buttercup Games. Skyler is in charge of monitoring observability usage across different teams to make sure they stay within the company's budget.

Lately, Skyler has been noticing an increase in their metric time series (MTS) usage. With the help of the Splunk Observability Cloud account team, Skyler obtains a detailed metrics usage report. The report gives Skyler insights into their MTS volume, use of dimensions with high cardinality, use of those MTS in charts and detectors, and distribution of MTS across different teams.

Skyler notices that one team in particular is approaching their allocated usage limit. Skyler reaches out to Kai, the site reliability engineer (SRE) lead on that team, and asks them to optimize their team's usage. Skyler shares with Kai the MTS that have high-cardinality dimensions, the total MTS usage and their team's MTS usage.

Findings
===============

The metrics usage report shows that Kai's team sends about 50,000 MTS for the ``service.latency`` metric to Splunk Observability Cloud, but not all the MTS at full granularity are essential. Kai looks at the report to understand more about the cardinality of different dimensions. 

Kai knows that their team cares only about service latency performance for data centers in Europe, so they only filter data where ``data_center_region = Europe``. But, they also want to make sure they have access to recent data in case they want to dig deeper into any other data.

Actions
===============

Kai decides to use Archived Metrics to control how Splunk Observability Cloud stores their team's data.

#. In Splunk Observability Cloud, Kai goes into Metrics Pipeline Management, searches for the metric ``service.latency`` and configures the ingestion route to Archived Metrics. Kai can now see all the MTS as Archived MTS.
#. Kai creates a route exception rule and specifies a filter where ``data_center_region = Europe``. This gives them the estimate of 2,497 Real-Time MTS. Kai also restores the previous hour data to make sure they don't have gaps.
#. Now, Kai views the list of charts and detectors that use ``service.latency``. To learn more about viewing or downloading the list, see :ref:`metrics-usage-report`.
#. Kai already had a filter set up on the charts and detectors for ``data_center_region = Europe``. Kai verifies the data is visible in one of the charts.
#. Kai revisits the metric ``service.latency`` in Metric Pipeline Management to see the MTS estimates again. The estimates now show a 95% reduction in the Real-time MTS count, from 50,000 to 2,497.

Summary
===============

By archiving and routing a portion of MTS to real-time, Kai and Skyler have successfully reduced their overall MTS usage, staying below their usage limits while lowering storage costs for Buttercup Games.

Learn more
===============

To learn more, see the following docs:

* :ref:`metrics-pipeline-intro`
* :ref:`mpm-rule-routing`
* :ref:`mpm-rule-agreggation`
* :ref:`metrics-usage-report`