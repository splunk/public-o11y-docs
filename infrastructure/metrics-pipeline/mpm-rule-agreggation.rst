.. _mpm-rule-agreggation:

******************************************************
Use aggregation rules to control your data volume
******************************************************

.. meta::
    :description: Introduction to the aggregation rule for metrics pipeline management in Splunk Observability Cloud.

|hr|

:strong:`Available in Enterprise Edition`. For more information, see :ref:`sd-subscriptions`.

|hr|

Data you send from your services to Splunk Observability Cloud can have high cardinality. Instead of adjusting how you are
sending in your data before you send it, aggregation lets you summarize your data in Splunk Observability Cloud based on
the dimensions you consider important.

.. mermaid::

   flowchart LR

   accTitle: Data aggregation diagram
   accDescr: Metrics pipeline management (MPM) receives raw incoming metric time series (MTS). You choose an MTS to aggregate, and perform the aggregation, then you choose whether to keep or drop the raw MTS. MPM keeps the aggregated MTS and any raw MTS that you chose to keep.
   
   Raw[(Incoming raw MTS)] ---|MPM|ChooseDimensions{"`Choose MTS to aggregate`"} ---|Perform aggregation|CreateNew("`New aggregated MTS with rolled-up
   metrics`") ---|Keep or drop raw MTS|OriginalMTS[(Kept MTS and new MTS)]

By selecting specific dimensions to keep, you can aggregate your data points into a new metric with fewer dimensions,
creating a specific view of dimensions that are important. You can then obtain a more simplified and concentrated view
of your data when you don't need to view metrics across all dimensions.

When you select specific dimensions, metrics pipeline management generates a new metric. The system creates new MTS based on the dimensions you select and rolls up data points for each MTS. By default, aggregation rules roll up the data points into the new MTS using ``sum``, ``min``, ``max``, ``count``, ``delta``, ``avg``, and ``latest`` functions.

You can use the new aggregated MTS in the same way as any other MTS in Splunk Observability Cloud.

How is MPM aggregation different from post-ingestion aggregation at query time?
==============================================================================================

When you configure charts or detectors, you can aggregate your data using analytic functions, such as ``sum``, and then group your data by specific dimensions, such as ``sum by region``. This aggregation occurs after Splunk Observability Cloud has stored your raw MTS, so you still pay for storing the data.

With metrics pipeline management, you can aggregate your MTS as you store it and retain only aggregated metrics. Since you're storing fewer dimensions for each data point, and metrics pipeline management roles up the metric values, you save storage costs.

Example
--------------------------------------------------------------------------------

You send a metric called ``http.server.duration`` for a containerized workload using Splunk Infrastructure Monitoring:

* Your workload has 10 endpoints, 20 regions, 5 services, and 10,000 containers. 
* Each of the 5 services has 10,000 containers and 10 endpoints.

Your data is coming in at the container ID level, generating 10 (endpoints) * 5 (services) * 20 (regions) * 10,000 (containers) = 1,000,000 MTS.

You can reduce your metric cardinality by aggregating one or multiple dimensions.

Aggregate using one dimension
++++++++++++++++++++++++++++++++++++++++++++++++++++++

Scenario: You are only interested in the source region of your data. 

In this case, you can create an aggregation rule that groups your data by the ``region`` dimension. The aggregated metric removes all other dimensions and retains only the ``region`` dimension based on your rule. 

There are only 20 different values for ``region``, so Splunk Observability Cloud only ingests 20 MTS.

Aggregate using multiple dimensions
++++++++++++++++++++++++++++++++++++++++++++++++++++++

Scenario: You want to continue monitoring endpoints, regions, and services for your data, but don't need to monitor container IDs. 

In this case, you can create an aggregation rule that groups your data by the dimensions you want to keep. The aggregated metric removes the ``container_id`` dimension and retains ``endpoint``, ``region``, and ``service`` based on your rule. 

Your new metric volume is: 10 (endpoints) * 20 (regions) * 5 (services) = 1,000 MTS.

.. _mts-aggregation-rollup-period:

MTS aggregation rollup period
===============================================================================

If your systems send periodic data points, but the period is longer than 10 seconds, then the result of MTS aggregation might not be what you expect.

For example, suppose your systems generate data points every 5 seconds. Two successive data points have timestamps that differ by 5 seconds. If your systems immediately transmit the points to Splunk Observability Cloud, the system ingests two data points every 10 seconds. Metrics pipeline management can roll up the two data points into one aggregated data point with a resolution of 10 seconds, which is the result you expect.

If you are sending data points, but they don't always arrive with the same frequency, Splunk Observability Cloud might receive two data points in the first 10 seconds, then twelve data points in the next 10 seconds. In both cases, metrics pipeline management rolls up the raw points into a single aggregated data point.

Also, if you want to send data points every second and you want to keep the resolution of the incoming data points, don't use MTS aggregation.

Potential issues
--------------------------------------------------------------------------------

The difference between the timestamp that your systems add to a raw data point when it's created and the time the system uses when it aggregates data points can cause one of the following issues:

* The starting and ending time of aggregated MTS might shift. A data point generated by your server might come in some time after its creation time as recorded in its timestamp. In this case, the entire aggregated MTS shifts to a more recent time on the chart, indicating that the start time was more recent than the actual timestamp. This shift occurs because metrics pipeline management ignores the data point timestamp and instead uses the time it ingested the data point.

  For example, if your data points have a 10:00 timestamp, but Splunk Observability Cloud doesn't start receiving them until 10:10, the aggregated MTS seems to start at 10:10 instead of 10:00.

* The aggregated MTS might appear to have an incorrect duration.

Solutions
--------------------------------------------------------------------------------

Avoid these aggregation issues by using the following options:

* Do your own MTS aggregation before sending your data by reconfiguring the OTel collector to drop unwanted dimensions.
* Aggregate data using SignalFlow when you generate charts or create detectors.

Benefits of aggregating using metric pipeline management
=============================================================================

Use MPM instead of aggregation at query time
----------------------------------------------------------------

Although you can use SignalFlow to aggregate MTS by applying the "group by" option, this aggregation is different from MPM aggregation:

* MPM aggregates MTS before storing the MTS in the Splunk Observability Cloud database.
* SignalFlow stores MTS in the database before doing the aggregation.
* SignalFlow can't help you remove high-cardinality dimensions, and it can't drop MTS you don't need. 
* MPM aggregation occurs before raw MTS ingestion is complete, so you can eliminate high-cardinality dimensions and drop data you don't want.

Use MPM instead of modifying the Splunk Distribution of the OpenTelemetry Collector 
------------------------------------------------------------------------------------------------

When you use MPM, you don't have to modify the configuration of your Splunk Distribution of the OpenTelemetry Collector. With MPM you can remove high-cardinality dimensions, drop MTS you don't need, and route MTS to the low-cost data tier after you ingest OpenTelemetry data. 

To learn how to remove data before ingestion by modifying the Collector configuration, see :ref:`configure-remove`.

.. _use-metrics-pipeline:

Create aggregation rules for a metric
=================================================

.. note:: You must have the Admin or Power user role to create or edit an aggregation rule. For more information, see :ref:`roles-and-capabilities`.

To access and create the aggregation rules for a metric follow these steps:

#. Access your Splunk Observability Cloud account.
#. In the left nav, select :guilabel:`Settings > Metrics Pipeline Management` to access the landing screen with a list of all your metrics and a summary of their rulesets. 
#. Select or search for a metric to access the metric's summary page.
#. In the :guilabel:`Added by rule` tile, select :guilabel:`Add`. 
#. In the :guilabel:`Create aggregation rule` dialog, complete the options:
  
  * Name your rule.
  * Filter incoming data to a specific MTS population. Search for dimension keys or values to narrow down the associated metric time series (MTS).
  * Configure the dimensions settings. Search for dimensions and select either :strong:`Keep` or :strong:`Drop`. Splunk Observability Cloud saves the dimensions you keep in the new aggregated MTS, and removes the dropped dimensions.

.. note:: You cannot aggregate histogram metrics.

After creating new metrics using aggregation, you can drop unwanted or unnecessary metrics and reduce your data volume. Learn more at :ref:`data-dropping-impact`.  

Edit, deactivate, or delete an aggregation rule
----------------------------------------------------

To edit, activate/deactivate, or delete an existing routing exception rule, perform the following steps:

#. Access your Splunk Observability Cloud account.
#. In the left nav, select :guilabel:`Settings > Metrics Pipeline Management` to access the landing screen with a list of all your metrics and a summary of their rulesets. 
#. Select or search for a metric to access the metric's summary page.
#. From the list of rules, find the one you want to change, then select any of the available options in the :guilabel:`More actions (⋮ icon)` menu.


