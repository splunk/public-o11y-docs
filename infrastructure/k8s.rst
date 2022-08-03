.. _infrastructure-k8s:

**********************************
Monitor Kubernetes
**********************************

.. meta::
   :description: Learn how to monitor Kubernetes resources with Splunk Observability Cloud.

Monitor Kubernetes metrics with Splunk Observability Cloud. Any user can monitor Kubernetes in Observability Cloud. 

Before you can start monitoring Kubernetes, you have to :ref:`get-started-k8s`. You have to be an administrator to export Kubernetes data.

Observability Cloud uses the :new-page:`Splunk OpenTelemetry Collector for Kubernetes <https://github.com/signalfx/splunk-otel-collector-chart>` to provide robust infrastructure monitoring capabilities. If you're also exporting logs from Kubernetes and want to learn about how to view logs in Observability Cloud, see :ref:`get-started-logs`. 

You can also export and monitor data related to your Kubernetes clusters:

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


Monitor Kubernetes from the Infrastructure Overview
===================================================

View the health of entire Kubernetes clusters at a glance from the Kubernetes Infrastructure Overview. From the Kubernetes Infrastructure Overview, you can drill down into and analyze detailed metrics about these Kubernetes resources:

- Nodes
- Pods
- Containers
- Workloads

There are a couple ways to dig into your Kubernetes infrastructure:

- Visualize the entire cluster, nodes, pods, and containers with the :strong:`Map` view. This is great when you want to explore a cluster and visualize the health of everything at a glance.
- View :strong:`Detail` pages to view detailed dashboards for nodes, pods, containers, and workloads for a cluster. Open one of the :strong:`Detail` pages when you are investigating an incident and know the resource you want to analyze.

Follows these steps to monitor and analyze Kubernetes with the Infrastructure Overview:

1. Select :strong:`Navigation menu > Infrastructure`.
2. Select :strong:`Kubernetes` from the :strong:`Platforms` menu.
3. Specify the cluster you want to view from the filter bar. You can also specify the time range to analyze metrics for. At this point, you can jump right into a :strong:`Detail` page, or keep exploring with visualizations. You can also view a list of all the nodes and workloads from this page. To continue exploring with the :strong:`Map`, move on to the next step.
4. Select a node from the :strong:`Map`. View key properties and metrics about the node in the :strong:`Info` panel.
5. Hover over a node in the :strong:`Map` and select the magnifying glass to visualize pods and containers in the node. This view provides you with the health of each resource in the node at a glance. The color of pods and containers represents their health. Green means everything is fine, and red means everything is not fine.
6. Hover over and select pods or containers in the node to view the :strong:`Info` panel for the resource.

Use default dashboards to monitor Kubernetes
============================================

To find default dashboards for Kubernetes, select :strong:`Navigation menu > Dashboards` and search for Kubernetes to find a dashboard.

Observability Cloud provides these default dashboards for Kubernetes:

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Dashboard`
     - :strong:`Description`
   
   * - K8s Clusters
     - View a summary of every cluster you are monitoring in Observability Cloud.

   * - K8s Overview
     - View a summary of every pod and node you are monitoring in Observability Cloud.

   * - K8s Nodes
     - View a summary of every node you are monitoring in Observability Cloud.

   * - K8s Node
     - View the health of a specific node you specify. The dashboard is empty until you specify a node name.

   * - K8s Pods
     - View a summary of every pod you are monitoring in Observability Cloud.

   * - K8s Pod
     - View the health of a specific pod you specify. The dashboard is empty until you specify a pod name.

   * - K8s Containers
     - View a summary of every container you are monitoring in Observability Cloud.

   * - K8s Container
     - View the health of a specific container ID you specify. The dashboard is empty until you specify a container ID.
  
   * - K8s Operations
     - View a summary of your Kubernetes deployment, including information about restarts, phases, deployments, and DaemonSets.

   * - K8s Cluster Services
     - View a summary of Controller Managers, Schedulers, Proxies, and other Kubernetes services.


Troubleshoot with the analyzer
================================
The Analyzer panel helps you troubleshoot Kubernetes problems at scale by highlighting Kubernetes objects that are in a bad state such as nodes that are not ready. Then, the Analyzer produces theories about what those objects might have in common. For example, that all of the objects are running the same workload or all objects are located in the same AWS region. Click on a finding in the Analyzer panel to filter the map. 