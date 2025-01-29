.. _infrastructure-k8s-nav:

**********************************
Monitor Kubernetes
**********************************

.. meta::
   :description: Learn how to monitor Kubernetes resources with Splunk Observability Cloud.

.. note:: The following topic describes the new Kubernetes navigator. See :ref:`infrastructure-k8s` for documentation on the classic Kubernetes navigator.

You can monitor Kubernetes metrics with Splunk Observability Cloud. Splunk Observability Cloud uses the Splunk Distribution of OpenTelemetry Collector for Kubernetes to provide robust infrastructure monitoring capabilities. To learn more, see :ref:`otel-intro`.

Prerequisites
================

To start monitoring Kubernetes resources, you must:

* :ref:`get-started-k8s`.
* Log in with your administrator credentials.


.. _use-k8s-nav:

About Kubernetes navigators
===============================

.. note:: The following sections describe components specific to the Kubernetes navigators. For information on components shared by all navigators, see :ref:`use-navigators-imm`.

On the :guilabel:`Infrastructure` landing page, you can view the summary cards for Kubernetes navigators under the :guilabel:`Kubernetes` section.

The following table describes the Kubernetes navigators:

 .. list-table::
    :header-rows: 1
    :widths: 20 40 40

    * - :strong:`Kubernetes navigator`
      - :strong:`Description`
      - :strong:`Use this to`
   
    * - * Nodes
        * Pods
        * Containers
      - * Provides a :ref:`table, heat map <navigator-views>`, and :ref:`hierarchy map <k8s-nav-hierarchy-map>` view of your Kubernetes infrastructure
        * Provides a :ref:`Kubernetes analyzer<k8s-nav-analyzer-overview>` that helps you troubleshoot Kubernetes problems at scale
      - * Get an overview of your Kubernetes infrastructure
        * Monitor the health of part of your Kubernetes infrastructure
        * Identify and diagnose an issue with part of your Kubernetes infrastructure
        * View services and hosts running on Kubernetes

    * - * Clusters
        * Workloads
        * Deployments
        * ReplicaSets
        * StatefulSets
        * DaemonSets
        * Jobs
        * CronJobs
        * Services
        * Resources
      - Provides a :ref:`table and heat map view <navigator-views>` of Kubernetes objects across your infrastructure
      - * Monitor Kubernetes instances across your infrastructure
        * Monitor a specific subset of instances, such as workloads running in a particular namespace
        * View services and hosts running on Kubernetes

.. _k8s-nav-hierarchy-map:

Hierarchy map
======================

.. note:: The hierarchy map is only available on the Kubernetes nodes, pods, and containers navigators.

Monitor your Kubernetes infrastructure with an interactive hierarchical map that displays the child resources associated with a selected Kubernetes instance. You can select elements in the map to drill down into them, or use the filter to explore your data. The level of detail shown on the map is dynamic and depends on the number of elements shown.

To navigate to the hierarchy map:

#. From the Splunk Observability Cloud main menu, select :guilabel:`Infrastructure`, then :guilabel:`Kubernetes`.
#. Select the Kubernetes nodes, pods, or containers navigator.
#. The table view displays by default. Select an instance from the table.
#. Expand the :guilabel:`Hierarchy Map`.

Nodes, pods, and containers are colored by health and status, as reported by Kubernetes:

    * Nodes are colored by condition: ``Node Ready``, ``Memory Pressure``, ``PID Pressure``, ``Disk Pressure``, ``Network Unavailable``, and ``Out of Disk``
    * Pods are colored by phase: ``Running``, ``Pending``, ``Succeeded``, ``Failed``, and ``Unknown``
    * Containers are colored by status: ``Ready``, ``Not Ready``, and ``Unknown``

Investigate instances in the hierarchy map
---------------------------------------------

* Breadcrumb navigation: Switch to different instances and jump across entity levels using the breadcrumb navigation bar.
* Hover: Get more information about an instance, including its status or phase, by hovering over that instance.
* Select and zoom: Drill down into an instance and change the zoom level of the map, if applicable, by selecting the instance.
* Filter: Filter the map by any available metadata in your Kubernetes data, such as a namespace, a workload, or any other key-value pair. When you apply a filter, the map highlights instances that match the filter. You can still hover over the dimmed instances to view details about them.

.. _k8s-nav-left-nav:

Left navigation panel
============================

Use the left navigation panel in the table or heat map view to quickly switch between Kubernetes entity types, search for filters, and access predefined filters.

To use the left navigation panel:

* :guilabel:`Select entity type`: Use this drop-down menu to switch between Kubernetes entity types.
* :guilabel:`Refine by`: Use this panel to search for filters or access a list of predefined filters. The list of predefined filters is searchable and organized by :guilabel:`Relationship` and :guilabel:`Attribute`.

.. _k8s-nav-analyzer-overview:

Troubleshoot performance with the analyzer
======================================================

.. note:: The analyzer is only available on the Kubernetes nodes, pods, and containers navigators.

The Kubernetes analyzer, accessed through the :guilabel:`K8s analyzer` tab, helps you troubleshoot Kubernetes problems at scale by highlighting Kubernetes instances that are in a bad state, such as nodes that are not ready. The analyzer produces theories about what those instances might have in common, such as that all of the instances are running the same workload or all instances are located in the same AWS region. Select a finding in the analyzer tab to filter the map.

The analyzer tab displays suggested filters for the elements selected in the table or heat map view. Select links in the analyzer tab to add filters to the table or heat map view and explore conditions across your entire Kubernetes environment.

The analyzer uses AI-driven insights to examine potential patterns between nodes, pods, or containers. The trouble indicators are:

-  Pods that are in pending status
-  Pods that are in failed status
-  Pods with unknown condition
-  Containers with high restart counts
-  Nodes not ready
-  Nodes with unknown condition
-  Nodes experiencing high CPU
-  Nodes experiencing high memory

The analyzer displays overrepresented metrics properties for known conditions, such as pods in pending status, pods in failed status, and so on. You can use properties that are highly correlated with these conditions to filter the table or heat map. You can explore data about each of those elements in the navigator using context-sensitive dashboards. This enables you to identify the underlying patterns noticeable on the filtered map that might be correlated with Kubernetes issues. For example, if all failed pods are in certain types of clusters, the analyzer provides suggested paths to follow to troubleshoot such issues.

Next steps
=====================
You can also export and monitor data related to your Kubernetes clusters, as described in the following table.

.. list-table::
   :header-rows: 1
   :widths: 30, 30, 40

   * - :strong:`Get data in`
     - :strong:`Monitor`
     - :strong:`Description`

   * - - :ref:`get-started-aws`
       - :ref:`get-started-gcp`
       - :ref:`get-started-azure`
     - - :ref:`infrastructure-aws`
       - :ref:`infrastructure-gcp`
       - :ref:`infrastructure-azure`
     - Connect to the cloud service provider your Kubernetes clusters run in, if any.

   * - :ref:`get-started-application`
     - :ref:`get-started-apm`
     - Collect metrics and spans from applications running in Kubernetes clusters.