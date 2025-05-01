:orphan:

.. _aopt-workloads:

.. include:: /private-preview/aopt/toc.rst
    :start-after: :orphan:

**********************************************************
The Application Optimization dashboard
**********************************************************

To load the dashboard, select :guilabel:`Application Optimization` in the left navigation menu.

The :guilabel:`Application Optimization` dashboard provides a high-level view of metrics from your Kubernetes infrastructure and a table of Kubernetes workloads. Metrics are grouped into tiles which are described below.


Workloads
==========================================================

* :guilabel:`Total`: This is the total number of workloads, of all kinds, for which you're sending metrics to Splunk IM. 

* :guilabel:`Processed`: This is the number of workloads processed by Application Optimization and older than 24 hours. This number doesn't include 

  * Workload kinds that Application Optimization doesn't support (cronjobs and jobs)

  * Workloads that Application Optimization had an error in processing

  * Workloads that you added less than 24 hours ago; since Application Optimization processes data once a day, new workloads might have missed the processsing window.


Workloads by Starvation Risk
==========================================================

This is a good tile to check first to see if any of your workloads are at high risk of starvation. Those are the workloads that need immediate attention. You can find them by sorting the :guilabel:`Kubernetes Workloads` table by :guilabel:`Starvation Risk`.


Resource Footprint
==========================================================

A workload's resource footprint is the sum of its pods' ``request`` settings for that resource plus its actual overage utilization of that resource. This tile displays the sum of all resource footprints of all the pods of all your workloads. It then compares your current ``request`` settings for CPU and memory to  recommended CPU and memory ``request`` settings based on data from the past 14 days. 

.. note::
    This tile aggregates data from all of your workloads, so you may not find a direct correlation to individual workloads in the :guilabel:`Kubernetes Workloads` table.


Kubernetes Workloads
==========================================================

The :guilabel:`Kubernetes Workloads` table lists all workloads for which you're sending metrics to Splunk IM. Narrow this list by:

* Searching: You can search this table by workload or cluster name.

* Filtering: Select from the :guilabel:`Environment`, :guilabel:`Cluster`, :guilabel:`Namespace`, :guilabel:`Workload Kind`, or :guilabel:`Add filters` menus at the top of the page.

* Sorting the table by any of its columns. To find workloads most in need of attention, sort by :guilabel:`Starvation Risk` or :guilabel:`Efficiency`.

