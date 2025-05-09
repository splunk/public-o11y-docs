:orphan:

.. _aopt-workload-details:

.. include:: /private-preview/aopt/toc.rst
    :start-after: :orphan:

**********************************************************
Workload Details
**********************************************************

When you select a workload in the :guilabel:`Kubernetes Workloads` table, you navigate to its :guilabel:`Workload Details` page. This page displays the efficiency analysis and instant recommendations for the particular workload you selected.


..  image:: /private-preview/aopt/aopt-workload-details-scaled.png
    :width: 90%
    :alt: Application Optimization details about a specific workload


Efficiency Analysis
==========================================================

:guilabel:`Efficiency Analysis` is based on the workload's resource utilization efficiency. This section contains the following tiles:

* :guilabel:`Resource Starvation Risk`: This workload's average risk of running out of CPU or memory. :ref:`See details on how this is calculated <aopt-glossary-starvation-risk>`. Workloads that have a high risk of starvation are also at high risk of performance degradation and decreased reliability and resilience.

* :guilabel:`Average Pod Count`: The number of pods (:new-page:`replicas <https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/>`) running for this workload averaged over the analysis period. 

* :guilabel:`Resource Footprint`: The resource footprint represents the total amount of CPU and memory that this workload has on the cluster at any given time. For workloads that have a varying number of pods (perhaps due to the autoscaler), this tile displays the average footprint over the past 14 days. :ref:`See details on how the resource footprint is calculated <aopt-glossary-resource-footprint>`. The tile includes the following values for each resource:

   * Current footprint
   * Projected footprint if all recommendations are applied
   * Change of footprint (impact of applying the recommendation), in absolute units and in percentage between the recommended and current.

* :guilabel:`Resource Efficiency`: The ratio of resource usage to resource allocation. This is a percentage relative to allocated resources. Best practices call for resource utilization in the 60-80% range. Having efficiency above 70-80% presents resource starvation risks. :ref:`See details on how this is calculated <aopt-glossary-efficiency>`.


Analysis window and confidence Level
----------------------------------------------------------

Directly under the :guilabel:`Efficiency Analysis` label, there are two important pieces of information: 

* The analysis window (:guilabel:`Analysis is based on ___ days of workload metrics`) is the metric lookback window that was actually used in the analysis of this workload. This window may be less than 14 days if this workload is new or if its resources have been reconfigured recently.

* The :guilabel:`Confidence level` rates the degree of confidence in the analysis. :ref:`See details on how this is calculated <aopt-glossary-confidence-level>`.


.. note:: 
    If :guilabel:`Confidence level` is something other than high, this probably means that your cluster hasn't sent enough metrics to :new-page:`Splunk Infrastructure Monitoring (IM) <https://docs.splunk.com/observability/en/infrastructure/intro-to-infrastructure.html>` since you created the workload. In this case, if the workload is a highly critical business workflows or one with high variations, wait a few days for the confidence level to increase before you apply the recommendations.


Instant Recommendations
==========================================================

:guilabel:`Instant Recommendations` offers simple, actionable changes to a workload's pods which you can implement quickly and easily to improve its resource utilization. The recommendations address both under-provisioning as well as over-provisioning. For example, if a workload doesn't use all of the resources it requested, :guilabel:`Instant Recommendations` reduces its footprint and, ultimately, your costs for the Kubernetes cluster.

.. warning::
    If you apply CPU recommendations to a cluster that has HPA enabled, you must also apply the HPA recommendations. These two recommendations must always be applied together. Otherwise, your HPA configuration might undo your new CPU settings. You must also specify your HPA configuration either through metrics or manually. See :ref:`aopt-workload-hpa`.


Why are these recommendations given?
----------------------------------------------------------

If a workload has had a medium or high starvation risk over the past 14 days, ignoring spikes, :guilabel:`Instant Recommendations` suggests an increase in CPU or memory ``request`` or ``limit`` settings to mitigate that risk. 


Workload Breakdown
----------------------------------------------------------

Your workload is broken down into its containers, and within the section for each container, there are specific recommendations for CPU and memory adjustments, a chart visualizing its historical resource usage, and in the rightmost column (:guilabel:`Recommended K8s Spec`), YAML snippets you can copy to improve its settings. 


.. _aopt-workload-hpa:

Horizontal Pod Autoscaler (HPA) target recommendation
----------------------------------------------------------

If you have a horizontal pod autoscaler (HPA) associated with this workload, this section provides compatible adjustments to your HPA configuration. You can specify your HPA configuration by sending HPA metrics to Splunk IM. If we cannot detect your HPA configuration, you can manually specify the configuration:

#. Select the scope: 

   * :guilabel:`Pod` means that your HPA's CPU utilization target applies to the CPU utilization of the pod as a whole (the only option available for HPA v1 resources).
   * :guilabel:`Container`means that your HPA's CPU utilization target applies to a particular container only (new capability for HPA v2 resources).

#. Enter the value (percentage) that matches your current CPU utilization target value (from your HPA configuration file).

