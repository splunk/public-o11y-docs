
.. _metrics-pipeline-intro:

******************************************************
Optimizing metrics data
******************************************************

.. meta::
    :description: Optimizing metrics data using metrics pipeline management in Splunk Infrastructure Monitoring

|hr|

:strong:`Available in Enterprise Edition and Service Bureau`

|hr|

.. meta::
    :description: Optimizing metrics data using metrics pipeline management in Splunk Infrastructure Monitoring

The problem: Too much data
===============================================================================

As you expand observability to cover all you systems, you often see exponential data growth. High cardinality data
also leads to data growth. These challenges lead to the following problems:

* Increased cost for ingesting and storing data
* Decreased performance due to processing overhead
* Operational challenges: How do I make sense of my data?

You discover that more data doesn't yield better observability outcomes.

The solution: Optimize data
===============================================================================

Splunk Observability Cloud helps you identify and address the problem of too much data with metrics pipeline management (MPM).

MPM is a set of tools and a process that helps you optimize your data by following these steps:

#. Start by reviewing raw, unchanged MTS from the systems you want to monitor.
#. Use charts and data tables to look for MTS that have unused or high-cardinality dimensions. You can also review
   organization metrics that measure your use of Splunk Observability Cloud resources. To learn more, see :ref:`org-metrics-metrics-pipeline`.
#. Use aggregation rules to create new aggregated MTS. Drop unneeded dimensions from the MTS; aggregation automatically rolls up the metrics.
#. Drop the original MTS.
#. Use routing rules to move existing MTS into the low-cost tier. Drop MTS you don't want to keep.
#. Review your new MTS usage.
#. Refine your aggregation and routing rules.

The following flowchart summarizes the MPM process:

.. mermaid::

   flowchart LR

   accTitle: Data optimization using metrics pipeline management

   accDescr: Metrics pipeline management optimizes metrics data by creating new aggregating MTS based on rules you specify. Metrics pipeline management also archives MTS based on data routing rules you specify.

   A(Raw MTS) -- Analyze -->B{"`Find MTS with unused and high cardinality data`"}
   B -- Aggregate --> C("`Define rules that create new aggregated MTS with rolled-up metrics`") -->E
   B -- Route -->D("`Define rules that route or drop MTS`") -->E
   E(Optimized data with aggregated MTS and routed MTS) -- Analyze results -->A


Using MPM instead of SignalFlow aggregation
--------------------------------------------------------------------------------

Although you can use SignalFlow to aggregate MTS, the aggregation occurs after you ingest the raw MTS. SignalFlow
can't help you remove high-cardinality dimensions, and it can't drop MTS you don't need. MPM aggregation occurs before
raw MTS ingestion is complete, so you can eliminate high-cardinality dimensions and drop data you don't want.

MPM can also route data to a low-cost data tier, which SignalFlow can't do.

Using MPM instead of Splunk Distribution of OpenTelemetry Collector changes
--------------------------------------------------------------------------------


When you use MPM,  you don't have to modify the configuration of your
:ref:`Splunk Distribution of the OpenTelemetry Collector <otel-intro>`. You can still use the configuration to ingest
data, remove high-cardinality dimensions, drop MTS you don't need, and route MTS to the low-cost data tier after you
ingest OpenTelemetry data. To learn how to remove data before using the Collector by modifying the configuration,
see :ref:`configure-remove`.

What are high-cardinality MTS dimensions?
===============================================================================

The cardinality of a single metric time series (MTS) is cardinality of its dimensions.

An MTS is the combination of a metric type, a metric name, the value of the metric, and the dimension names (keys) and values
for the metric. Each unique combination of dimension key and value is a separate dimension.

A metric has high cardinality when it has a high number of dimension keys, or a high number of possible unique values for its dimension keys,
or both.

For example, suppose you ingest data for the metric ``http.server.duration``.

* If ``http.server.duration`` has only 1 dimension key ``endpoint`` with 3 unique values: ``A``, ``B``, and ``C``, then
  ``http.server.duration`` has 3 possible dimensions. ``http.server.duration`` could have three MTS, each representing the data from
  3 different endopints
* When you add another dimension ``region`` with 3 unique values: ``us-east``, ``us-west``, and ``eu``, then
  ``http.server.duration`` could have 9 MTS, one for each possible endpoint and region combination (3 endpoints * 3 regions = 9 dimensions).
  Even though ``http.server.duration`` only has 2 dimensions, its metric cardinality is already 9 since each dimension has
  multiple possible values.

Your data might also contain 9 dimension keys, each with its own unique value. For example, the ``country`` dimension key
might have the values ``Canada``, ``Brazil``, ``France``, ``Germany``, ``Spain``, ``Portugal``, ``Mexico``, ``United Kingdom``, and
``Ireland``. This single dimension key has a metric cardinality of 9. If you use this dimension key with the ones previously
mentioned, you get a cardinality of 81. For a metric that has a large number of values, the number of MTS generated can be
large.

To learn more about MTS, see :ref:`metric-time-series`. To learn more about the Observability Cloud data model, see
:ref:`data-model`.

How does metrics pipeline management work?
========================================================

Metrics pipeline management has the following features that optimize metrics data:

MTS aggregation
   MPM creates new MTS by aggregating metrics and dimensions data from incoming raw MTS and dropping unwanted dimensions.
   You create aggregation rules that roll up your selected metric data into new metrics that take up less storage and increase
   computational performance. To learn how to create aggregation rules, see :ref:`aggregation`.
MTS Data dropping
   After MPM aggregates new MTS, it can drop the original raw MTS. You create data dropping rules that discard any metrics
   you don't want to retain for monitoring. To learn how to create data dropping rules, see
   :ref:`data-dropping`.
MTS routing
   The MPM archived metrics (ARM) feature routes low-priority MTS to a low-cost data tier. You can create routing exception
   rules that modify the routing or temporarily restore MTS to a real-time tier if necessary.

.. note:: A new aggregated MTS has a resolution of 10 seconds. Metrics pipeline management rolls up the raw data
   points received into one aggregated data point, for each MTS associated with the metric. If your systems emit data
   points over a period that's much longer than 10 seconds, you might have difficulty reconciling your raw data with
   the aggregated data. To learn more, see the section :ref:`mts-aggregation-rollup-period`.

Controlling metrics pipeline management using rules
===============================================================================

Metrics pipeline management is rules-based. Use rules to do the following:

* Aggregation - Choose MTS to aggregate, choose dimensions to aggregate or drop
* Data routing

       * Choose MTS to move to a lower-cost tier
       * Choose historical MTS to restore to higher-cost tier

* Dashboards show rules in effect and their impact on data storage

To learn how to manage rules, see :ref:`use-metrics-pipeline`.

.. _aggregation:

Optimizing using aggregation rules
--------------------------------------------------------------------------------

Data you send from your services to Observability Cloud can have high cardinality. Instead of adjusting how you are
sending in your data before you send it, aggregation lets you summarize your data in Observability Cloud based on
dimensions you consider important.

By selecting specific dimensions to keep, you can aggregate your data points into a new metric with fewer dimensions,
creating a specific view of dimensions that are important. You can then obtain a more simplified and concentrated view
of your data when you don't need to view metrics across all dimensions.

When you select specific dimensions, metrics pipeline management generates a new metric. The system creates new MTS
based on the dimensions you select and rolls up data points for each MTS. By default, aggregation rules roll up the
data points into the new MTS using ``sum``, ``min``, ``max``, ``count``, ``delta``, ``avg``, and ``latest`` functions.
You can use the new aggregated MTS in the same way as any other MTS in Observability Cloud.

Scenario: Reducing dimension cardinality
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You send a metric called ``http.server.duration`` for a containerized workload using Splunk Infrastructure Monitoring.

Your workload has 10 endpoints, 20 regions, 5 services, and 10,000 containers. Each of the 5 services has 10,000
containers and 10 endpoints.

Your data is coming in at the container ID level, generating 10 (endpoints) * 5 (services) * 20 (regions) * 10,000 (containers) = 1,000,000 MTS.

You can reduce your metric cardinality by aggregating one or multiple dimensions.

Scenario: Aggregate using one dimension
--------------------------------------------------------------------------------

You are only interested in the source region of your data, so you create an aggregation rule that groups your data by
the ``region`` dimension.

The aggregated metric removes all other dimensions and retains only the ``region`` dimension based on your rule. There
are only 20 different values for ``region``, so only Observability Cloud only ingests 20 MTS.

Scenario: Aggregate using multiple dimensions
--------------------------------------------------------------------------------

You want to continue monitoring endpoints, regions, and services for your data, but don't need to monitor container IDs.
You create an aggregation rule that groups your data by the dimensions you want to keep.

The aggregated metric removes the ``container_id`` dimension and retains ``endpoint``, ``region``, and ``service``
based on your rule. Your new metric volume is: 10 (endpoints) * 20 (regions) * 5 (services) = 1,000 MTS.

.. _mts-aggregation-rollup-period:

MTS aggregation rollup period
===============================================================================

If your systems send periodic data points, but the period is longer than 10 seconds, then the result of MTS aggregation
might not be what you expect.

For example, suppose your systems generate data points every 5 seconds. Two successive data points have timestamps
that differ by 5 seconds. If your systems immediately transmit the points to Observability Cloud, the system ingests
two data points every 10 seconds. Metrics pipeline management can roll up the two data points into one aggregated
data point with a resolution of 10 seconds, which is the result you expect.

If you are sending data points, but they don't always arrive with the same frequency,
Observability Cloud might receive two data points in the first 10 seconds, then twelve data points in the next 10
seconds. In both cases, metrics pipeline management rolls up the raw points into a single aggregated data point.

Also, if you want to send data points every second and you want to keep the resolution of the incoming data points, don't
use MTS aggregation.

Timestamp considerations
===============================================================================

The difference between the timestamp that your systems add to a raw data point when it's created and the time
the system uses when it aggregates data points can cause one of the following issues:

* The starting and ending time of aggregated MTS might shift. A data point generated by your server
  might come in some time after its creation time as recorded in its timestamp. In this case, the entire aggregated
  MTS shifts to a more recent time on the chart, indicating that the start time was more recent than the actual timestamp. This shift occurs
  because metrics pipeline management ignores the data point timestamp and instead uses the time it ingested the
  data point.

  For example, if your data points have a 10:00 timestamp, but Observability Cloud doesn't start receiving them
  until 10:10, the aggregated MTS seems to start at 10:10 instead of 10:00.
* The aggregated MTS might appear to have an incorrect duration.

You can avoid these aggregation issues by using the following options:

* Do your own MTS aggregation before sending data to the system, by reconfiguring the OTel collector to drop unwanted dimensions.
* Aggregate data using SignalFlow when you generate charts or create detectors.


.. _data-dropping:

Data dropping rules
===============================================================================

When you have a new aggregated metric, you might no longer need the original unaggregated data. You
can also drop a metric without adding an aggregation rule. Data dropping rules let you discard any data you don't want
to monitor, so you can save storage space and reduce cardinality.

.. note::
    - You must be an admin to drop data.
    - You can drop new incoming data, but you can't drop data that Observability Cloud has already ingested.
    - You can't recover dropped data. Before you drop data, see :ref:`data-dropping-impact`.

Scenario: Dropping raw data
--------------------------------------------------------------------------------

Once you have new aggregated metrics created by aggregation rules, you can drop the raw unaggregated data for
``http.server.duration``.

Scenario: Metrics pipeline management
===============================================================================

See :ref:`aggregate-drop-use-case`.

Create your first metric rules
===============================================================================

To start using metrics pipeline management, see :ref:`use-metrics-pipeline`.

.. note:: Metrics pipeline management is not available for metrics ingested through the ``https://ingest.signalfx.com/v1/collectd`` endpoint.
