.. _infrastructure-k8s-nav:

**********************************
Monitor Kubernetes
**********************************


.. meta::
   :description: Learn how to monitor Kubernetes resources with Splunk Observability Cloud.


.. note:: The following topic describes the new Kubernetes navigator. See :ref:`infrastructure-k8s` for documentation on the classic Kubernetes navigator.


You can monitor Kubernetes metrics with Splunk Observability Cloud. Observability Cloud uses the Splunk Distribution of OpenTelemetry Collector for Kubernetes to provide robust infrastructure monitoring capabilities.

Prerequisite
================

Before you can start monitoring any Kubernetes resources, :ref:`get-started-k8s`, and log in with your administrator credentials.


.. _use-k8s-nav:

Use the Kubernetes navigators
==============================

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

Instead of a heat map or table view of instances, the Kubernetes nodes navigator lets you monitor Kubernetes infrastructure with an interactive hierarchical map. You can select elements in the map to drill down into them, or use the filter to explore your data. The level of detail shown on the map is dynamic and depends on the number of elements shown. 

   .. image:: /_images/infrastructure/k8s-nodes-map.png
      :alt: Hierarchical map view in the Kubernetes nodes navigator at the service level.
      :width: 90%

Use the breadcrumb navigation bar to jump across levels and drill down into different the entities at any level.

    ..  image:: /_images/infrastructure/k8s-nav-breadcrumb.gif
        :width: 100%
        :alt: How to jump back to the node level from the container level, select a different node to investigate, and jump to the cluster level.

Containers, pods, and nodes are colored by health and status, as reported by Kubernetes:

    * Containers are colored by status: ready, not ready.
    * Pods are colored by phase: running, pending, failed, and so on.
    * Nodes are colored by condition: ready, not ready, pressure, and so on.


.. _k8s-workloads-nav:

Kubernetes workloads navigator
---------------------------------




Learn more
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