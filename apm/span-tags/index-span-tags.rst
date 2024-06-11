.. _apm-index-span-tags:

************************************************************
Index span tags to generate Troubleshooting MetricSets
************************************************************

.. meta::
   :description: Learn how to use index tags to create Troubleshooting MetricSets that help you troubleshoot services with Splunk Observability Cloud.

Because Splunk APM offers full-fidelity tracing, which captures every span from every trace, you can use span tags or processes to break down services and inter-service calls along trace characteristics or attributes. To get additional value from a span tag or process, a Splunk APM administrator can run an action known as indexing, which activates additional analysis of the indexed span tag or process. One benefit of indexing is to get aggregated metrics, called MetricSets, across all spans that contain a specified indexed tag or process.

What are MetricSets?
=========================

MetricSets are metric time series you can use to track the performance of specific metrics over time. To help you analyze your service performance, APM provides 2 kinds of MetricSets: Troubleshooting MetricSets and Monitoring MetricSets. Troubleshooting MetricSets are for high-cardinality troubleshooting while Monitoring MetricSets use the Infrastructure Monitoring platform for real-time monitoring and alerting. 

APM provides a collection of MetricSets by default. You can also index additional span tags or processes to generate additional Troubleshooting MetricSets and optionally add custom dimensionalized Monitoring MetricSets. See :ref:`apm-MetricSets` for an overview of the types of MetricSets in APM and a list of the MetricSets available by default. 

Use this topic to learn how to index a span tag or process to generate Troubleshooting MetricSets. See :ref:`cmms` to learn how to add custom dimensionalized Monitoring MetricSets. 

Prerequisites
====================================================================================

* To index span tags to create Troubleshooting MetricSets in Splunk APM, you must have the admin role.
* Before indexing span tags and processes, see :ref:`apm-index-tag-tips` for guidance on choosing span tags or processes to index. 

.. _apm-tms-details:

Use Troubleshooting MetricSets to filter and breakdown metrics 
=================================================================

Every Troubleshooting MetricSet (TMS) generates the following metrics, also known as Request, Error, and Duration (RED) metrics. The following metrics appear when you select a service from the :ref:`service map <service-map>` in the :strong:`Troubleshooting` view:

- Request rate
- Error rate
- Root cause error rate
- p50, p90, and p99 latency

The measurement precision of Troubleshooting MetricSets is 10 seconds. Splunk APM reports quantiles from a distribution of metrics for each 10-second reporting window. 

TMS appear on the service map and in Tag Spotlight. Use TMS to filter the service map and create breakdowns across the values of a given indexed span tag or process. 

See :ref:`apm-service-map` and :ref:`apm-tag-spotlight`.

Default indexed span tags
--------------------------------

Splunk APM indexes and generates Troubleshooting MetricSets for several tags by default. For more details about these tags, see :ref:`apm-default-span-tags`. You can't modify or stop APM from indexing these span tags, but you can index additional span tags. See :ref:`index-span-tags-instructions` to learn how. 

.. _index-span-tags-instructions:

Index a new span tag or process
=================================

Follow these steps to index a span tag or process to create a Troubleshooting MetricSet. 

1. To get to the :guilabel:`APM MetricSets` page, do one of the following: 
  
   a. In Splunk APM, select :guilabel:`APM Configuration` and select :guilabel:`APM MetricSets` from the menu. The APM MetricSets page opens.
   b. From anywhere in Splunk Observability Cloud, select :guilabel:`Settings` in the navigation bar and select :guilabel:`APM MetricSets` under :guilabel:`Data Configuration`.   

2. On the :guilabel:`APM MetricSets` page, select :strong:`New MetricSet`.

3. Enter the :strong:`Name` of a span tag or process you want to index.

4. The :strong:`Scope` determines how APM associates the span tag or process with services in a trace:

   - Select :strong:`Service` to associate the span tag or process with services. This means the value of the span tag or process might change across services in a given trace. Specify ``All Services`` to index the span tag or process for every service. Select specific services to index the span tag or process for only those services. 
     
     .. note:: If you index a span tag or process at the service level, you can also use it as a custom dimension in Monitoring MetricSets. See :ref:`cmms` for instructions.

   - Select :strong:`Global` to associate the span tag or process with traces. This means the value of the span tag or process is the same for all services in a given trace.

   For more information about scope, see :ref:`apm-index-tag-types`.

5. Select :strong:`Start Analysis` to submit the configuration. Splunk APM runs an analysis of the span tag or process to calculate the potential cardinality contribution of the MetricSet to determine whether it is within your entitlement limit. 

6. Your new metric set shows under :strong:`Pending MetricSets` section of the table with an :guilabel:`Analyzing` status while the cardinality check runs. You might have to wait a few moments for the check to run. 

   .. caution:: Your pending MetricSet expires after 1 hour. If your MetricSet times out before you turn on it, run the analysis again. 
   
7. After the cardinality check has run, review the cardinality and turn on your new MetricSet.

   * If the cardinality impact of indexing this new MetricSet is acceptable, select the check mark under :guilabel:`Actions` to turn on your Troubleshooting MetricSet. 
   * If the check times out before you turn on the MetricSet, run the analysis again.
   * If the check shows as failed, your cardinality is over your subscription limit for TMS. See :ref:`cardinality-check`.

   The following example shows a cardinality check. 

   .. image:: /_images/apm/span-tags/cardinality-check-APM.png
      :width: 60%
      :alt: This image shows the cardinality check for a Monitoring MetricSet. 

.. _cardinality-check:

Cardinality contribution of indexed span tags and processes
================================================================

When you index a new span tag or process to generate Troubleshooting MetricSets, Splunk APM runs a cardinality contribution analysis to calculate the potential total cardinality contribution after indexing the span tag or process. This gives you control of what you index and helps you to account for any organization limits you have to stay within.

If you try to index a span tag or process that might increase the total cardinality contribution beyond your limit, you can change the existing cardinality contribution of indexed tags or processes by modifying or removing indexed span tags or processes.

To see your TMS subscription limit, go to :guilabel:`Settings` then :guilabel:`Subscription Usage`. Depending on your organization subscription, this might be :guilabel:`Settings` then :guilabel:`Billing and Usage`. Select the :guilabel:`APM` tab and then select the :guilabel:`Troubleshooting MetricSets` panel to view your subscription limit for TMS. You must have an admin or usage role to view subscription limits. To learn more about APM usage and billing, see :ref:`apm-billing-usage-index`.

.. _manage-TMS:

Manage existing Troubleshooting MetricSets
=================================================================

After you've successfully indexed a span tag or process, Splunk APM saves the configuration in the :strong:`APM MetricSets` page in :strong:`Data Configuration`. Go to this page to view the index scope and status of the span tag or process.

You can modify the configuration for existing indexed tags and processes, including adding and removing services for specific indexed tags or processes and modifying the scope. You can also pause or stop indexing without deleting their configuration. This is useful when you want to temporarily stop indexing a span tag or process, but don't want to remove the configuration.

To review or modify existing indexed span tags or processes, do the following:

1. Go to :guilabel:`Settings` then :guilabel:`Data Configuration` then :guilabel:`APM MetricSets`.
2. Find the indexed span tag or process you want to view under the :strong:`Custom MetricSets` section of the configuration table.
3. See :ref:`tms-status` to interpret the status of each indexed span tag or process.
4. Make any desired changes using the buttons in the :guilabel:`Actions` column:

    - Use the pencil button to edit the scope of an indexed span tag or process.
    - Use the pause button to pause generating MetricSets for a given span tag or process. 
    - Use the trash button to delete a MetricSet configuration.

.. _tms-status:

Status of configured Troubleshooting MetricSets
-------------------------------------------------

After you've configured custom Troubleshooting MetricSets you can see their status. The following table lists all available statuses:

.. list-table::
   :header-rows: 1
   :widths: 15, 85

   * - :strong:`Status`
     - :strong:`Description`

   * - Active
     - The application is indexing the span tag or process to generate Troubleshooting MetricSets.

   * - Paused
     - You or another administrator paused indexing for the span tag or process. The application isn't generating Troubleshooting MetricSets for the span tag or process, and you can't view any data you previously indexed for it.
    
   * - Stopped
     - The application stopped indexing the span tag or process and is no longer generating Troubleshooting MetricSets for the span tag or process. You can't view any data you previously indexed.

.. _db-metricsets:

Status of Database MetricSets
--------------------------------------------------

You can pause and resume indexing Database Query Performance data from the :guilabel:`Standard MetricSets` section of :guilabel:`APM MetricSets`. You can also control the indexing of SQL and NoSQL tags separately.

To pause the indexing of Database Query Performance data, select :guilabel:`Pause indexing` next to the database type. To resume, select :guilabel:`Resume indexing`.


