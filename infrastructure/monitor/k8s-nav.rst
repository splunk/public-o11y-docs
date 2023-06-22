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

Before you start monitoring any Kubernetes resources, do the following:

* :ref:`get-started-k8s`.
* Log in with your administrator credentials.


.. _use-k8s-nav:

Kubernetes navigators
===============================

.. note:: The following sections show you components specific to the Kubernetes navigators. For information on components shared by all navigators, see :ref:`use-navigators-imm`.

There are two Kubernetes navigators, Kubernetes nodes and Kubernetes workloads. On the :strong:`Infrastructure` landing page, you can see the summary cards for both navigators under the :strong:`Kubernetes` section.

   .. image:: /_images/infrastructure/k8s-nav-summary.png
      :alt: Summary cards for Kubernetes navigators on the landing page.
      :width: 60%

The following table compares the two Kubernetes navigators.

 .. list-table::
    :header-rows: 1
    :widths: 20 40 40

    * - :strong:`Navigator`
      - :strong:`Description`
      - :strong:`Use this to`
   
    * - Kubernetes nodes
      - Provides a hierarchical view of your Kubernetes infrastructure
      - * Get an overview of your entire Kubernetes infrastructure
        * Monitor the health of all or part of the Kubernetes infrastructure
        * Identify and diagnose an issue with some part of the Kubernetes infrastructure

    * - Kubernetes workloads
      - Provides a view of Kubernetes workloads across all your infrastructure
      - Monitor Kubernetes workloads across your infrastructure, or a specific subset of workloads, such as those running in a particular namespace.

.. _k8s-nodes-nav:

Kubernetes nodes navigator
------------------------------

Each Kubernetes service consists of the following elements:

    * Container: A lightweight package containing everything needed to run applications.
    * Pod: A group of one or more containers, with shared storage and network resources, and a specification for how to run the containers.
    * Node: A physical or a virtual machine that hosts pods and the necessary resources to run pods.
    * Cluster: A group of nodes for running containerized applications. 

   .. image:: /_images/infrastructure/k8s-hierarchy-diagram.png
      :alt: Diagram of Kubernetes component hierarchical relationship.
      :width: 40%

Monitor your entire Kubernetes infrastructure with an interactive hierarchical map. You can select elements in the map to drill down into them, or use the filter to explore your data. The level of detail shown on the map is dynamic and depends on the number of elements shown. 

   .. image:: /_images/infrastructure/k8s-nodes-map.png
      :alt: Hierarchical map view in the Kubernetes nodes navigator at the service level.
      :width: 90%

Containers, pods, and nodes are colored by health and status, as reported by Kubernetes:

    * Containers are colored by status: ``Ready``, ``Not Ready``, and ``Unknown``
    * Pods are colored by phase: ``Running``, ``Pending``, ``Succeeded``, ``Failed``, and ``Unknown``
    * Nodes are colored by condition: ``Node Ready``, ``Memory Pressure``, ``PID Pressure``, ``Disk Pressure``, ``Network Unavailable``, and ``Out of Disk``

Investigate instances in the hierarchical map
++++++++++++++++++++++++++++++++++++++++++++++++

* Breadcrumb navigation: Jump across levels and switch to different entities at any level using the breadcrumb navigation bar.

    ..  image:: /_images/infrastructure/k8s-nav-breadcrumb.gif
        :width: 100%
        :alt: How to jump back to the node level from the container level, select a different node to investigate, and jump to the cluster level.


* Hover: Get more information about an element, including status or phase, by hovering over that element.

    .. image:: /_images/infrastructure/k8s-nav-hover.png
        :alt: Hovering over a pod shows its information and ``Pending`` phase.
        :width: 50%

* Select and zoom: Drill down into an element and change the zoom level of the map, if applicable, by selecting the element. Details about the element display in the sidebar, in the :strong:`About this pod` panel.
    
    ..  image:: /_images/infrastructure/k8s-nav-zoom.gif
      :width: 100%
      :alt: Selecting a pod zooms the hierarchical map view from cluster level to pod level. Details about the selected pod displays in the sidebar, in the :strong:`About this pod` panel.

* Filter: Filter the map by any available metadata in your Kubernetes data, such as a namespace, a workload, or any other key-value pair. When you apply a filter, the map shows only nodes that match the filter and highlights matching pods and containers. You can still select the dimmed pods and containers to view details about them in the sidebar.

    ..  image:: /_images/infrastructure/k8s-nav-filter.gif
      :width: 100%
      :alt: Filtering ``kubernetes.io/cluster-service`` to ``true`` hides nodes that don't match and highlights matching pods and containers.

.. _k8s-workloads-nav:

Kubernetes workloads navigator
---------------------------------

A workload is an application running on Kubernetes. Your workload might be a single component or several that work together, but it always runs inside a set of pods on Kubernetes.

Instead of a hierarchical approach to your Kubernetes infrastructure, you can investigate workloads for a given Kubernetes namespace, and the pods where each workload is running on.

For more information, see :ref:`use-navigators-imm`.

.. _k8s-nav-pivot:

View services and hosts on which Kubernetes is running
-----------------------------------------------------------

Apart from monitoring your Kubernetes infrastructure, you can also track services and hosts where Kubernetes is running in the navigator sidebar for both the Kubernetes nodes and workloads navigators. When you select a host or service from the sidebar, you are switching to the navigator for that host or service instance. 

  .. note:: From a host navigator, you can also jump to a Kubernetes navigator, but only to the Kubernetes nodes navigator.

  ..  image:: /_images/infrastructure/k8s-nav-pivot.gif
    :width: 100%
    :alt: Navigating to the EC2 navigator from the Kubernetes nodes navigator, and then navigating back to the Kubernetes nodes navigator.

Analyzer
+++++++++++++++++++++++++++

The Analyzer accessed through the K8s analyzer tab helps you troubleshoot Kubernetes problems at scale by highlighting Kubernetes objects that are in a bad state, such as nodes that are not ready. Then, the Analyzer produces theories about what those objects might have in common, such as that all of the objects are running the same workload or all objects are located in the same AWS region. Click on a finding in the Analyzer panel to filter the map.

The Analyzer panel displays suggested filters for the elements selected in the :ref:`cluster map <k8s-nav-map>`. Click links in the Analyzer panel to add filters to the cluster map and explore conditions across your entire Kubernetes environment.

The Analyzer uses AI-driven insights to examine patterns that nodes, pods, or containers could have in common. Trouble indicators are:

-  pods that are in pending status
-  pods that are in failed status
-  pods with unknown condition
-  containers with high restart counts
-  nodes not ready
-  nodes with unknown condition
-  nodes experiencing high CPU
-  nodes experiencing high memory

The Analyzer displays overrepresented metrics properties for known conditions, such as pods in pending status, pods in failed status, and so on. You can use properties that are highly correlated with these conditions to filter the cluster map. You can explore data about each of those elements in the navigator using context-sensitive dashboards. This enables you to identify the underlying patterns noticeable on the filtered map that might be correlated with Kubernetes issues. For example, if all failed pods are in certain types of clusters, Analyzer provides suggested paths to follow for troubleshooting such issues.

Next steps
=====================

If you're also exporting logs from Kubernetes and want to learn about how to view logs in Observability Cloud, see :ref:`get-started-logs`.

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