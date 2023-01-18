.. _infrastructure-k8s-nav:

**********************************
Monitor Kubernetes
**********************************


.. meta::
   :description: Learn how to monitor Kubernetes resources with Splunk Observability Cloud.


.. note::
   Before you can start monitoring any Kubernetes resources, :ref:`get-started-k8s`, and log in with your administrator credentials.


You can monitor Kubernetes metrics with Splunk Observability Cloud. Observability Cloud uses the Splunk Distribution of OpenTelemetry Collector for Kubernetes to provide robust infrastructure monitoring capabilities. If you're also exporting logs from Kubernetes and want to learn about how to view logs in Observability Cloud, see :ref:`get-started-logs`.

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


.. notes::
    The following sections describe the latest version of the Kubernetes navigator. If you want to use the previous version, see :ref:`infrastructure-k8s`.

.. _use-k8s-nav:

Use the Kubernetes navigators
==============================

There are two Kubernetes navigators, Kubernetes nodes and Kubernetes workloads. On the :strong:`Infrastructure` landing page, you can see the summary cards for both navigators under the :strong:`Kubernetes` section.

   .. image:: /_images/infrastructure/k8s-nav-summary.png
      :alt: Summary cards for Kubernetes navigators on the landing page.
      :width: 60%

   * Kubernetes nodes navigator: <when to use this>
   * Kubernetes workloads navigator: <when to use this>

Maybe a table comparing the two navs?


Kubernetes nodes navigator
------------------------------

Each Kubernetes service consists of the following elements:

* Container: A lightweight package containing everything needed to run applications.
* Pod: A group of one or more containers, with shared storage and network resources, and a specification for how to run the containers.
* Node: A physical or a virtual machine that hosts pods and the necessary resources to run pods.
* Cluster: A group of nodes for running containerized applications. 

   .. image:: /_images/infrastructure/k8s-hierarchy-diagram.png
      :alt: Diagram of Kubernetes component hierarchical relationship.
      :width: 60%

Instead of a heat map or table view of instances, the Kubernetes nodes navigator lets you monitor your instances with a hierarchical map.

The hierarchical map view displays your Kubernetes infrastructure in an interactive cluster map. Select elements in the map to explore data about each of those elements. The level of detail shown on the map is dynamic and depends on the number of elements shown, either specified through the filters or whether you zoom in on to drill down for more detail.

   .. image:: /_images/infrastructure/k8s-nodes-map.png
      :alt: Hierarchical map view in the Kubernetes nodes navigator.
      :width: 100%






