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

Kubernetes navigators
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
        * Provides a :ref:`Kubernetes Analyzer<k8s-nav-analyzer-overview>` that helps you troubleshoot Kubernetes problems at scale
      - * Get an overview of your Kubernetes infrastructure
        * Monitor the health of part of your Kubernetes infrastructure
        * Identify and diagnose an issue with part of your Kubernetes infrastructure
        * View services and hosts running on Kubernetes

    * - * Workloads
        * Deployments
        * ReplicaSets
        * StatefulSets
        * DaemonSets
        * Jobs
        * CronJobs
        * Services
        * Resources
      - Provides a :ref:`table and heat map view <navigator-views>` of Kubernetes instances across your infrastructure
      - * Monitor Kubernetes instances across your infrastructure
        * Monitor a specific subset of instances, such as workloads running in a particular namespace
        * View services and hosts running on Kubernetes

.. _k8s-nav-hierarchy-map:

Hierarchy map
======================

.. note:: The hierarchy map is only available on the Kubernetes nodes, pods, and containers navigators.

Monitor your Kubernetes infrastructure with an interactive hierarchical map that displays the child resources associated with a selected Kubernetes instance. You can select elements in the map to drill down into them, or use the filter to explore your data. The level of detail shown on the map is dynamic and depends on the number of elements shown.

To navigate to the hierarchy map:

1. On the :guilabel:`Infrastructure` landing page, select the Kubernetes nodes, pods, or containers navigator.
2. The table view displays by default. Select an instance from the table.
3. Expand the hierarchy map.

   .. image:: /_images/k8s-nav/k8s-nav-hierarchy-map.png
      :alt: Hierarchy map view in the Kubernetes nodes navigator.
      :width: 90%

Nodes, pods, and containers are colored by health and status, as reported by Kubernetes:

    * Nodes are colored by condition: ``Node Ready``, ``Memory Pressure``, ``PID Pressure``, ``Disk Pressure``, ``Network Unavailable``, and ``Out of Disk``
    * Pods are colored by phase: ``Running``, ``Pending``, ``Succeeded``, ``Failed``, and ``Unknown``
    * Containers are colored by status: ``Ready``, ``Not Ready``, and ``Unknown``

Investigate instances in the hierarchy map
---------------------------------------------

* Breadcrumb navigation: Switch to different entities and jump across levels using the breadcrumb navigation bar.

    ..  image:: /_images/infrastructure/k8s-nav/k8s-nav-breadcrumb.gif
        :width: 100%
        :alt: How to select a different node to investigate and jump to the cluster level.


* Hover: Get more information about an entity, including its status or phase, by hovering over that entity.

    .. image:: /_images/infrastructure/k8s-nav/k8s-nav-hover.png
        :alt: Hovering over a pod shows its information and phase.
        :width: 50%

* Select and zoom: Drill down into an entity and change the zoom level of the map, if applicable, by selecting the element. Details about the entity display in the sidebar, in the :guilabel:`About this <Entity_Type>` panel.
    
    ..  image:: /_images/infrastructure/k8s-nav/k8s-nav-zoom.gif
      :width: 100%
      :alt: From the node-level hierarchy map, selecting a pod zooms the view to the pod level. Details about the selected pod display in the sidebar in the :guilabel:`About this pod` panel. From the pod level, selecting a container zooms the view to the container level.

* Filter: Filter the map by any available metadata in your Kubernetes data, such as a namespace, a workload, or any other key-value pair. When you apply a filter, the map highlights entities that match the filter. You can still hover over the dimmed entities to view details about them.

    ..  image:: /_images/infrastructure/k8s-nav/k8s-nav-filter.gif
      :width: 100%
      :alt: Filtering ``k8s.container.name`` to ``config-reloader`` and ``core-metrics-exporter`` highlights matching pods and dims pods that don't match.

.. _k8s-nav-analyzer-overview:

Analyzer
==============

.. note:: The Analyzer is only available on the Kubernetes nodes, pods, and containers navigators.

The Analyzer, accessed through the :guilabel:`K8s analyzer` tab, helps you troubleshoot Kubernetes problems at scale by highlighting Kubernetes objects that are in a bad state, such as nodes that are not ready. The Analyzer produces theories about what those objects might have in common, such as that all of the objects are running the same workload or all objects are located in the same AWS region. Select a finding in the Analyzer panel to filter the map.

The Analyzer panel displays suggested filters for the elements selected in the table or heat map view. Select links in the Analyzer panel to add filters to the table or heat map view and explore conditions across your entire Kubernetes environment.

The Analyzer uses AI-driven insights to examine patterns that nodes, pods, or containers could have in common. The trouble indicators are:

-  Pods that are in pending status
-  Pods that are in failed status
-  Pods with unknown condition
-  Containers with high restart counts
-  Nodes not ready
-  Nodes with unknown condition
-  Nodes experiencing high CPU
-  Nodes experiencing high memory

The Analyzer displays overrepresented metrics properties for known conditions, such as pods in pending status, pods in failed status, and so on. You can use properties that are highly correlated with these conditions to filter the cluster map. You can explore data about each of those elements in the navigator using context-sensitive dashboards. This enables you to identify the underlying patterns noticeable on the filtered map that might be correlated with Kubernetes issues. For example, if all failed pods are in certain types of clusters, the Analyzer provides suggested paths to follow to troubleshoot such issues.

.. _k8s-nav-view-services:

View services and hosts running on Kubernetes
=======================================================

Apart from monitoring your Kubernetes infrastructure, you can also track services and hosts running on Kubernetes in the navigator sidebar. When you select a service or host from the sidebar, you are switching to the navigator for that service or host instance.

  .. note:: From a host navigator, you can also jump to a Kubernetes navigator, but only to the Kubernetes nodes navigator.

  ..  image:: /_images/infrastructure/k8s-nav/k8s-nav-dependencies.gif
    :width: 100%
    :alt: From the Kubernetes pod navigator, switching to the MySQL host navigator, then switching back to the Kubernetes pod navigator.

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