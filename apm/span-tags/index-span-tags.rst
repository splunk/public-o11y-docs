.. _apm-index-span-tags:

********************************************************
Index span tags to gain insight into service performance
********************************************************

.. meta::
   :description: Index tags to create Troubleshooting MetricSets that help you troubleshoot services with Splunk Observability Cloud.

Index span tags associated with specific characteristics and attributes of services to generate Troubleshooting MetricSets. Troubleshooting MetricSets display metrics by characteristics and attributes of services you select, giving you deeper insights into service performance.

Because APM uses full-fidelity tracing to capture every span for every trace, you can use span tags to break down services and inter-service calls along any characteristic or attribute associated with any given trace, allowing you to customize data visualizations and metrics for your monitoring and troubleshooting requirements. For more information, see :ref:`apm-index-tag-insights`.

When you index a span tag to generate Troubleshooting MetricSets, the application runs a cardinality contribution analysis to calculate the potential total cardinality contribution after indexing the span tag. This gives you control of what you index, and helps account for any limits you have to stay within. If you try to index a span tag that could increase the total cardinality contribution beyond your limit, you can change the existing cardinality contribution of indexed tags by modifying or removing indexed span tags.

These are default Troubleshooting MetricSets that APM automatically indexes span tags for:

- Environment

- Endpoint

- Operation

- HTTP Method

- Kind

- Service

You can't modify or stop APM from indexing these span tags.

Prerequisites
=============

You have to be an administrator in your organization to index tags and create Troubleshooting MetricSets.

Index span tags
===============

When you submit a configuration to index a span tag and start generating MetricSets, the application runs an analysis of the span tag to calculate the potential cardinality contribution of indexing it. If indexing a span tag would generate Troubleshooting MetricSets that exceed your limit, you may not be able to index that span tag. For more information about these limits, see :ref:`apm-limits-metricsets`. Here are the possible statuses for pending MetricSets:

   .. list-table::
      :header-rows: 1
      :widths: 20, 80

      * - :strong:`Status`
        - :strong:`Description`

      * - Analyzing
        - The application is currently running the cardinality contribution analysis. When this is the status for a span tag you want to index, you can't create or modify any other span tags.

      * - Ready
        - The cardinality contribution analysis is complete, and you can index the span tag without any issue.

      * - Failed
        - The cardinality contribution analysis is complete, but you can't index the span tag because you reached an entitlement or system limit.

      * - Timeout
        - If more than one hour passes for a pending MetricSet in a ``Ready`` status, the status changes to ``Timeout``. To index the span tag, rerun the analysis.

Follow these steps to index tags and create Troubleshooting MetricSets.

1. In the application, go to :strong:`Settings > Organization Settings > MetricSets Configuration`.
2. Click :strong:`New MetricSet`.
3. Enter the :strong:`Name` of a span tag you want to index.
4. The :strong:`Scope` determines how APM associates the span tag with services in a trace.

   - Select :strong:`Service` to associate the span tag with services. This means the value of the span tag could change across services in a trace. Specify ``All Services`` to index the span tag for every service. Select specific services to index the span tag for only those services.

   - Select :strong:`Global` to associate the span tag with traces. This means the value of the span tag is the same for all services in a given trace.

   For more information about span tag types, see :ref:`apm-index-tag-types`.
5. Click :strong:`Start Analysis` to begin the cardinality contribution check.
6. Check the :strong:`Pending MetricSet` section on the :strong:`MetricSets Configuraton` page. You can view the status of the span tag you're trying to index.

7. When the :strong:`Status` is ``Ready``, manually index the span tag from the :strong:`Actions` column to start generating Troubleshooting MetricSets that include the span tag.

Manage existing indexed span tags and MetricSets
================================================

After you successfully index a span tag, Splunk APM saves the configuration in the :strong:`MetricSets Configuration` page in your :strong:`Organization Settings`. View the indexing scope of the span tag and its current status.

You can modify the configuration for existing indexed tags, including adding and removing services for specific indexed tags and modifying the scope. You can also pause or stop indexing span tags without deleting their configuration. This is useful when you want to temporarily stop indexing a span tag, but don't want to remove the configuration.

To review or modify existing indexed span tags, go to :strong:`Settings > Organization Settings > MetricSets Configuration` and find the indexed span tag you want to view under the :strong:`Custom MetricSets` section of the configuration table.

Custom MetricSets can have these statuses:

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Status`
     - :strong:`Description`

   * - Active
     - The application is indexing the span tag and generating Troubleshooting MetricSets for it.

   * - Paused
     - You or another administrator paused indexing for the span tag. The application isn't generating Troubleshooting MetricSets for the span tag, and you can't view any data you previously indexed for it.
    
   * - Stopped
     - The application stopped indexing the span tag, is no longer generating Troubleshooting MetricSets for the span tag, and you can't view any data you previously indexed for it.