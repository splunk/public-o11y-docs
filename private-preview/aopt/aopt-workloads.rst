:orphan:

.. _aopt-workloads:

.. include:: /private-preview/aopt/toc.rst
    :start-after: :orphan:

**********************************************************
The Application Optimization dashboard
**********************************************************

To load the dashboard, select :guilabel:`Application Optimization` in the left navigation menu.


..  image:: /private-preview/aopt/aopt-dashboard-sorted-scaled.png
    :width: 90%
    :alt: Application Optimization workloads


The :guilabel:`Application Optimization` dashboard provides insights and recommendations which it derives from Kubernetes infrastructure metrics you've sent to :new-page:`Splunk Infrastructure Monitoring (IM) <https://docs.splunk.com/observability/en/infrastructure/intro-to-infrastructure.html>`. It groups insights into summary tiles which are described below. It also provides a table of Kubernetes workloads at the bottom of the page. 

.. note::
    The contents of the table and summary tiles change based on the filters you select. 


Workloads
==========================================================

* :guilabel:`Total`: The total number of Kubernetes workloads, of all kinds, for which your organization is sending metrics to Splunk IM. 

* :guilabel:`Processed`: The number of workloads that Application Optimization has processed. This is the total number of workloads minus the following: 

  * Workloads that you added less than 24 hours ago; since Application Optimization processes data once a day, new workloads might have missed the processsing window.

  * Workload kinds that Application Optimization doesn't support (cronjobs and jobs).

  * Workloads that Application Optimization had an error in processing.


Workloads by Starvation Risk
==========================================================

This is a good tile to check first to see if any of your workloads are at high risk of starvation and need immediate attention. You can also find affected workloads by sorting the :guilabel:`Kubernetes Workloads` table by :guilabel:`Starvation Risk`. :ref:`See details on how this risk is calculated <aopt-glossary-starvation-risk>`.


Resource Footprint
==========================================================

The resource footprint represents the total amount of CPU and memory that a workload has on the cluster at any given time. For workloads that have a varying number of pods (perhaps due to the autoscaler), this tile displays the average footprint over the past 14 days. :ref:`See details on how the resource footprint is calculated <aopt-glossary-resource-footprint>`.

The tile also compares the projected footprint (assuming you apply the recommended settings) as well as the difference between the projected and the current footprint. This highlights how much you can save or add to your resources.


.. note::
    This tile aggregates data from all of your workloads, so if you want to see data from a subset of workloads, filter the data in the :guilabel:`Kubernetes Workloads` table until only that workload is visible.


.. _aopt-workloads-sort-search:

Kubernetes Workloads
==========================================================

The :guilabel:`Kubernetes Workloads` table lists all workloads for which you're sending metrics to Splunk IM. Narrow this list by:

* Searching: You can search this table by workload or cluster name.

* Filtering: Select from the :guilabel:`Environment`, :guilabel:`Cluster`, :guilabel:`Namespace`, :guilabel:`Workload Kind`, or :guilabel:`Add filters` menus at the top of the page.
   .. note:: 
    You can select a namespace and/or workload name across multiple clusters, which makes it easy to see all of a team's workloads across multiple regions.

* Sorting the table by any of its columns. To find workloads most in need of attention, sort by :guilabel:`Starvation Risk` or :guilabel:`Efficiency`.

