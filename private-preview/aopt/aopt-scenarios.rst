:orphan:

.. _aopt-scenarios:

.. include:: /private-preview/aopt/toc.rst
    :start-after: :orphan:

**********************************************************
Scenarios
**********************************************************

Here are common use case scenarios and how to use Application Optimization for them.


Which workloads need to be made more resilient?
==========================================================

Under-provisioned workloads (those that need to have their starvation risk reduced) are at risk of performance or reliability problems. If you're a site reliability engineer (SRE) or you handle financial operations (FinOps) you might not be the owner of these workloads but you need to find them and notify their owners ASAP. Here's how to find them:

#. Navigate to the :guilabel:`Application Optimization` dashboard.

#. Take a quick look at the :guilabel:`Workloads by Starvation Risk` tile. If there are no workloads at medium or high risk of starvation, you don't need to take any action right now.

#. Use the filters to limit the scope of your search to what you're interested in or responsible for. For example, filter by geolocation of clusters.

#. Scroll down to the :guilabel:`Kubernetes Workloads` table and sort it by :guilabel:`Starvation Risk`.



Which workloads can I release unnecessary resources from?
===============================================================

Over-provisioned workloads are reserving unnecessary resources, which you could release to make them available to others or to reduce your compute costs. Here's how to find over-provisioned workloads:

#. Navigate to the :guilabel:`Application Optimization` dashboard.

#. Take a quick look at the :guilabel:`Workloads by Starvation Risk` tile. If there are no workloads at medium or high risk of starvation, you don't need to take any action right now.

#. Scroll down to the :guilabel:`Kubernetes Workloads` table and sort it by the :guilabel:`Efficiency`, :guilabel:`Recommended CPU Change (Cores)`, or :guilabel:`Recommended Memory Change (GiB)` column.



How can I improve efficiency and performance by right-sizing workloads?
=========================================================================================================

If you're a workload owner who wants to right-size the workloads you're responsible for (rather than just searching for them in the previous scenarios), you're probably more interested in right-sizing a particular workload based on its actual resource use. Right-sizing ensures that the workload is neither starving nor wasteful. To do this, follow these steps for an individual workload:

#. Navigate to the :guilabel:`Application Optimization` dashboard.

#. Find the target workload in the :guilabel:`Kubernetes Workloads` table. :ref:`Sort, search, or filter this table <aopt-workloads-sort-search>` as needed.  

#. Select the target workload in the table to navigate to the :guilabel:`Workloads Details` page. This page displays actual usage metrics for the target workload, divided into sections for each container in the workload.

#. In the :guilabel:`Instant Recommendations` section, expand each container's section and apply the YAML snippets in the rightmost column to that container's configuration.

  .. note:: 
       If the :guilabel:`Confidence level` at the top of the page is not :guilabel:`High`, you might want to wait a few days for the confidence level to go up before you apply the YAML snippets to this workload's container configuration, depending on how critical this workload is.



