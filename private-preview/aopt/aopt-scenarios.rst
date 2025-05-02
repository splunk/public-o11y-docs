:orphan:

.. _aopt-scenarios:

.. include:: /private-preview/aopt/toc.rst
    :start-after: :orphan:

**********************************************************
Scenarios
**********************************************************

Here are common use case scenarios and how to use Application Optimization for them.


Which workloads need to be optimized?
==========================================================

To gain a comprehensive overview of all workloads and identify optimization opportunities by detecting over-provisioned or under-provisioned resources:

#. Navigate to the :guilabel:`Application Optimization` dashboard.

#. Take a quick look at the :guilabel:`Workloads by Starvation Risk` tile. If there are no workloads at medium or high risk of starvation, you don't need to take any action right now.

#. Scroll down to the :guilabel:`Kubernetes Workloads` table and sort it by :guilabel:`Starvation Risk`.

#. For each workload at high or medium starvation risk:

   #. Select that workload to navigate to its :guilabel:`Workload Details` page.

   #. On the :guilabel:`Workload Details` page, scroll down to :guilabel:`Instant Recommendations`.

   #. If the :guilabel:`Confidence level` at the top of the page is high, copy and paste the YAML snippets in :guilabel:`Instant Recommendations` into that workload's container configuration.


What are some modifcations that I can make to improve efficiency and performance by right-sizing workloads based on actual usage metrics?
==============================================================================================================================================================================

To see actual usage metrics for an individual workload:

#. Navigate to the :guilabel:`Application Optimization` dashboard.

#. Find the target workload in the :guilabel:`Kubernetes Workloads` table. :ref:`Sort, search, or filter this table <aopt-workloads-sort-search>` as needed.  

#. Select the target workload in the table to navigate to the :guilabel:`Workloads Details` page. This page displays actual usage metrics for the target workload, divided into sections for each container in the workload.

#. In the :guilabel:`Instant Recommendations` section, expand each container's section and apply the YAML snippets in the rightmost column to that container's configuration.


