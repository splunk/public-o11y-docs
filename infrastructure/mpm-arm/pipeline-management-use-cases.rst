
.. _pipeline-management-use-cases-arm:

****************************************************************************************************
Use case: Improve storage use and monitoring performance using data routing and aggregation
****************************************************************************************************

.. meta::
    :description: Data routing and aggregation use cases for metrics pipeline management.

|hr|

:strong:`Available in Enterprise Edition and Service Bureau`

|hr|

The following use case features an example from Buttercup Games, a fictitious e-commerce company.

.. note:: The tasks describe here require you to have the Admin or Power role.

Background
===============================================================================

Skyler is an admin for the central observability team at Buttercup Games. Skyler is in charge of monitoring
observability usage across different teams to make sure they stay within the company's budget.

Lately, Skyler notices a spike in their metric time series (MTS) usage. With the help of the Splunk Observability Cloud account team,
Skyler obtains a detailed metrics usage report. The report gives Skyler insights into their MTS volume,
use of dimensions with high cardinality, use of those MTS in charts and detectors, and distribution of MTS across
different teams.

Skyler notices that one team in particular is approaching their allocated usage limit. Skyler reaches out to Kai, the
site reliability engineer (SRE) lead on that team, and asks them to optimize their team's usage. Skyler shares with Kai
the MTS that have high-cardinality dimensions, the total MTS usage and their team's MTS usage.

Findings
===============================================================================

The metrics usage report shows that Kai's team sends about 50,000 MTS for the ``service.latency`` metric to
Observability Cloud, but not all the MTS at full granularity are essential. Kai looks at the report to understand more
about the cardinality of different dimensions. They notice that the ``instance_id`` and ``host_name`` dimensions are the
highest-cardinality dimensions for ``service.latency``.

Kai knows that their team cares most about the service latency performance for different regions,
so they only want to monitor the ``region`` dimension. The ``instance_id`` and ``host_name`` dimensions are not
information they need to monitor.

Actions
===============================================================================

Kai decides to use metrics pipeline management to control how Observability Cloud ingests their team's data.

#. In Observability Cloud, Kai creates an aggregation rule that reduces the cardinality of ``service.latency`` by keeping the
   ``region`` dimension and discarding ``instance_id`` and ``host_name``.
#. Kai has a new aggregated ``service.latency_by_region`` metric that only has 1,623 associated MTS.
#. Kai views or downloads the list of charts and detectors that use the ``service.latency`` metric. To learn more about
   viewing or downloading the list, see :ref:`view-metrics-usage-list-arm`.
#. For each associated chart and detector, Kai replaces ``service.latency`` with ``service.latency_by_region``.
#. Kai lets Skyler know that they have created an aggregated MTS and updated all the associated charts and detectors,
   so Skyler can drop the unaggregated raw MTS that the team no longer needs to monitor.
#. Skyler selects ``service.latency`` on the :strong:`Metrics pipeline management` page to view the current data routing
   for ``service.latency``.
#. Skyler changes the data routing for ``service.latency`` to :guilabel:`Dropped`. Observability Cloud now drops MTS associated with ``service.latency``.
#. Skyler verifies the new metric volume after dropping the data they don't need.

Summary
===============================================================================

By combining aggregation rules and data routing, Kai and Skyler have successfully aggregated a high-cardinality dimension,
creating a more focused monitoring experience for their team while minimizing storage costs for Buttercup Games.

Learn more
===============================================================================

To learn more about MTS aggregation, including how to create aggregation rules, see :ref:`use-MTS-aggregation-pipeline-arm`.

To learn more about considerations for routing data to :guilabel:`Dropped`, see :ref:`data-dropping-impact-arm`.

To learn more about the metrics usage report, see :ref:`metrics-usage-report-arm`.