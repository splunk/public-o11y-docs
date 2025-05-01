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

:guilabel:`Efficiency Analysis` is based on the workload's configuration settings and its operations metrics, such as its average pod (replica) count and actual resource usage usage.

* :guilabel:`Confidence level`: Look for the confidence level under the Efficiency Analysis label. If the confidence level is something other than high, this probably means that your cluster hasn't sent enough metrics to Splunk IM since you created the workload. In this case, for highly critical business workflows or those that have high variations, wait a few days for the confidence level to increase before you apply the recommendations. :ref:`See details on how this is calculated <aopt-glossary>`.

* :guilabel:`Resource Starvation Risk`: This workload's average risk of running out of CPU or memory.

* :guilabel:`Average Pod Count`: The number of pods (:new-page:`replicas <https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/>`) running for this workload averaged over the analysis period. 

* :guilabel:`Resource Footprint`: The percentage of CPU and memory that this workload's pods requested, averaged over the analysis period. The footprint may exceed 100% when the pods use more than their requested values.

* :guilabel:`Resource Efficiency`: The ratio of resource usage to resource allocation. This is a percentage relative to allocated resources. The higher the percentage, the better. :ref:`See details on how this is calculated <aopt-glossary>`.


Instant Recommendations
==========================================================

:guilabel:`Instant Recommendations` offers simple, actionable changes to a workload's pods which you can implement quickly and easily to improve its resource utilization. 


Why are these recommendations given?
----------------------------------------------------------

If a workload has had a medium or high starvation risk over the past 14 days, ignoring spikes, :guilabel:`Instant Recommendations` suggests an increase in CPU or memory ``request`` or ``limit`` settings to mitigate that risk. 


Workload Breakdown
==========================================================

Your workload is broken down into its containers, and within the section for each container, there are specific recommendations for CPU and memory adjustments, a chart visualizing its historical resource usage, and on the far right, YAML snippets you can copy to improve its settings. 


HPA Recommendation
==========================================================

If you have a horizontal pod autoscaler (HPA) associated with this workload and you're sending HPA metrics to Splunk IM, this section will provide any recommended adjustments to your HPA.