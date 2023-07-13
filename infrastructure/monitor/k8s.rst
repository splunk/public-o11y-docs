.. _infrastructure-k8s:

******************************************
Monitor Kubernetes (classic version)
******************************************

.. meta::
   :description: Learn how to monitor Kubernetes resources with Splunk Observability Cloud.

.. note::
   The classic Kubernetes navigator is deprecated. See :ref:`infrastructure-k8s-nav` for documentation on the new Kubernetes navigator.

Before you can start monitoring any Kubernetes resources, :ref:`get-started-k8s`, and log in with your administrator credentials.

You can monitor Kubernetes metrics with Splunk Observability Cloud. Splunk Observability Cloud uses the Splunk Distribution of OpenTelemetry Collector for Kubernetes to provide robust infrastructure monitoring capabilities. If you're also exporting logs from Kubernetes and want to learn about how to view logs in Observability Cloud, see :ref:`get-started-logs`.

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


.. _use-the-k8s-navigator:

Use the Kubernetes navigator
============================

.. note::
   Kubernetes version 1.21 and higher are compatible with the Kubernetes navigator. Using lower versions of Kubernetes might result in the navigator not displaying all clusters. See :new-page:`endoflife.date <https://endoflife.date/kubernetes>` for more information.

View the health of entire Kubernetes clusters at a glance from the Infrastructure page. From the Infrastructure page, you can drill down into and analyze detailed metrics about these Kubernetes resources:

- Nodes
- Pods
- Containers
- Workloads

You can use the Kubernetes navigator to obtain a real-time, at-a-glance view of the overall health and performance of your Kubernetes environment. You also have visibility all the way through the stack as you drill down and across elements of your environment, reflecting the fact that the infrastructure, Kubernetes control plane, containers, applications, and services are all related layers, not just individual system components.

When you navigate to the Kubernetes navigator from the landing page of Infrastructure Monitoring, the default view is Cluster Map. You can switch to other views to see information about your clusters, nodes, pods, containers, and workloads by selecting a panel from the navigator selection bar:

- :ref:`k8s-nav-map`: Visualize the entire cluster, and drill down into nodes, pods, and containers with the :strong:`Map` view. The :strong:`Map` view lets you explore a cluster and visualize the health of everything at a glance. Nodes, pods, and containers are colored by health and status, as reported by Kubernetes.
- :ref:`k8s-nav-nodes`: Display a compact list of all the nodes in your Kubernetes cluster. Use the :strong:`Nodes` view to see the health and status of all nodes at once.
- :ref:`k8s-nav-workloads`: Display a compact list of all the workloads running in a selected cluster. Use the :strong:`Workloads` view to see the health and status of all workloads at once.
- :ref:`k8s-nav-node-detail`: Display detailed charts about a selected node is a cluster. Use the :strong:`Node Detail` view when investigating an incident to get specific details.
- :ref:`k8s-nav-workload-detail`: Display detailed information about a selected workload in a cluster. Use the :strong:`Workload Detail` view when investigating an incident to get specific details.
- :ref:`k8s-nav-pod-detail`: Display detailed information about a selected pod in a cluster. Use the :strong:`Pod Detail` view when investigating an incident to get specific details.
- :ref:`k8s-nav-container-detail`: Display properties of a selected container in a cluster. Use the :strong:`Container Detail` view when investigating an incident to get specific details.

Follows these steps to monitor and analyze Kubernetes from the Infrastructure page:

#. Select :strong:`Navigation menu > Infrastructure`.
#. Select :strong:`Kubernetes` from the :strong:`Platforms` menu.
#. Specify the cluster you want to view by clicking on the map or selecting it by name from the filter bar.
#. Select a node to view more details about it in the :ref:`k8s-nav-info` panel.
#. Select a node, or hover and click the magnifying glass to visualize pods and containers in the node.
#. Select a pod or container to view more details about it in the :ref:`k8s-nav-info` panel.

By default, you see data from the last 3 hours. You can use the time picker to choose a new time range. When you select a new time range, the map and all pages update to show the status of nodes, pods, and containers present during that time. Streaming metrics charts also update to show the time range you selected.

Depending on your view selection, the page displayed might be divided into a main area on the left and a sidebar on the right.

.. _k8s-nav-main-area:

The main area
+++++++++++++

The Kubernetes navigator automatically discovers the full hierarchy of elements--clusters, nodes, pods, containers--and their associated metadata, as well as the workloads running in them. As that information is streamed through Infrastructure Monitoring, the Kubernetes navigator dynamically produces interactive cluster maps, builds detailed node and workload lists, and populates built-in performance dashboards.

To explore the main area, you can take the following actions:

- Hover: Hover over an element to display a border and to open a tooltip that displays information about the element, including the element’s condition or phase, if applicable.
- Zoom: Hover a cluster or node to display a magnifying glass icon in the upper left corner of the element. Click the magnifying glass icon to apply the filter and change the zoom level of the map.
- Select: Click an element on the map to drill down for more detail. Details about the element display in the Info panel of the sidebar on the right. Selecting an element on the map does not change the zoom level or filters on the map, but does add a border around the selected element.
- Filter: Filter the map by any available metadata in your Kubernetes data, such as a namespace, a workload, or any other key-value pair. When you filter the map, you see nodes that match the filter. Nodes that do not match the filter are hidden. Pods and containers that match the filter are highlighted, and non-matching pods and containers are dimmed. You can still select the dimmed pods and containers to view details about them in the Info panel.

The sidebar
+++++++++++

The sidebar contains more details about the element that you select from the :ref:`main area <k8s-nav-main-area>`, allowing you to drill down into details without losing context.

You can use these components of the sidebar to see more detail about a selected element:

-  :ref:`Analyzer <k8s-nav-analyzer>` panel: Display suggested filters about the selected element.
-  :ref:`Info <k8s-nav-info>` panel: Display details about the selected element--a workload, a node, a pod, or a container.
-  Expand icon: Display the Info panel content in full screen.
-  Hide icon: Hide the entire sidebar.

.. note:: When the sidebar has no Info panel available, the cluster map loads with the sidebar closed. The sidebar is also hidden if the element on which it is focused is deselected, the filter clears, or you navigate to a new page.

.. _drill-down-k8s-nav:

Drill down in the Kubernetes navigator
======================================

.. meta::
      :description: Drill down into the Kubernetes navigator

When you zoom into a single cluster, you can focus on just that cluster and the :ref:`k8s-nav-analyzer` panel displays suggested filters for that specific cluster. When you zoom into a node element, the Analyzer panel displays suggested filters for that specific node and the :ref:`Info <k8s-nav-info>` panel displays charts related to that element.

.. _k8s-nav-map:

Map
+++

The Map view displays your Kubernetes infrastructure in an interactive cluster map. Select elements in the map to explore data about each of those elements, represented by various charts in the :ref:`Info <k8s-nav-info>` tab. The level of detail shown on the map is dynamic and depends on the number of elements shown, either specified through the filters or whether you zoom in on to drill down for more detail.

.. note:: The color or statistics for an element, such as a pod, might change as you drill down or click through your system, because the information, such as, the state of the pod or its memory consumption statistics, might refresh between the time you start navigation and the time a target element appears.

Explore the cluster map:

-  Nodes are colored by condition (ready | not ready | pressure | etc.)
-  Pods are colored by phase (running | pending | failed | etc.)
-  Containers are colored by status (ready | not ready)

.. _k8s-nav-info:

Info
++++

The Info panel in the sidebar displays details about a workload, a node, a pod, or a container that you selected from the main area. The top chart shows metadata about the selected element, similar to the results that the Kubernetes ``kubectl`` command returns. The other charts are a combination of table charts, which list related objects in the selected element, and area charts, which display infrastructure metrics. Click links to related objects in the Info panel to drill down through the sidebar content without losing context.

To view the data in the Info panel using the entire width of the screen, click the fullscreen icon at the top left of the Info panel to navigate to the corresponding Detail page.

.. _k8s-nav-analyzer:

Analyzer (Cluster Map only)
+++++++++++++++++++++++++++

:strong:`Available in the Enterprise Edition.`

The Analyzer panel helps you troubleshoot Kubernetes problems at scale by highlighting Kubernetes objects that are in a bad state such as nodes that are not ready. Then, the Analyzer produces theories about what those objects might have in common. For example, that all of the objects are running the same workload or all objects are located in the same AWS region. Click on a finding in the Analyzer panel to filter the map.

The Analyzer panel in the sidebar displays suggested filters about the elements selected in the :ref:`cluster map <k8s-nav-map>`. Click links in the Analyzer panel to add filters to the cluster map and explore interesting conditions across your entire Kubernetes environment.

The Analyzer uses AI-driven insights to examine patterns that nodes, pods, or containers could have in common. Trouble indicators are:

-  pods that are in pending status
-  pods that are in failed status
-  pods with unknown condition
-  containers with high restart counts
-  nodes not ready
-  nodes with unknown condition
-  nodes experiencing high CPU
-  nodes experiencing high memory

The Analyzer displays overrepresented metrics properties for known conditions, such as pods in pending status, pods in failed status, and so on. You can use properties that are highly correlated with these conditions to filter the cluster map. You can explore data about each of those elements in the Info tab, allowing you to identify the underlying patterns noticeable on the filtered map that might be correlated with Kubernetes issues (for example, all failed pods only being in certain types of clusters) and provides suggested paths to follow for troubleshooting such issues.

.. _k8s-nav-list-pages:

List panels
+++++++++++

The following list panels provide compact lists of node or workload elements in your Kubernetes environment.

.. _k8s-nav-nodes:

Nodes
-----

The Nodes panel displays a compact list of all the nodes in your cluster, along with the infrastructure metrics, basic configuration, and health indicators such as CPU used, memory used, disk used, and so forth, for each node in your selected Kubernetes clusters. This list makes it easy to see hot spots. You can sort or group this list by available keys.

Click the name of a node to open the sidebar and drill down to details without losing context.


.. _k8s-nav-workloads:

Workloads
---------

The Workloads panel displays a compact list of all the workloads running in a selected cluster, along with the metadata and infrastructure metrics for each workload. You can specify a different cluster, namespace, or workload type. You can sort or group this list by available keys.

If you are a Splunk Application Performance Monitoring customer, you can go from Kubernetes Navigator to Splunk APM to view, understand, and explore the relationship between various infrastructure objects and the services running on them. Click a service name to navigate to the APM built-in service dashboard.

Click the name of a workload to open the sidebar and drill down to details without losing context.

.. _k8s-nav-detail-pages:

Detail panels
+++++++++++++

The following detail panels display metadata, infrastructure metrics, and events from the elements (:ref:`node <k8s-nav-node-detail>`, :ref:`workload <k8s-nav-workload-detail>`, :ref:`pod <k8s-nav-pod-detail>`, or :ref:`container <k8s-nav-container-detail>`) of your environment that are specified through the filters at the top of the page or that you selected from another page. You can learn properties about the element such as what is running on it, what related alerts have triggered, and what kind of trends exist.

.. _k8s-nav-node-detail:

Node Detail
-----------

The Node Detail panel displays detailed information about a selected node, including additional properties, workloads running on the node, containers on this node, and so on. The properties in the upper left are metadata about the node. If desired, you can specify a different cluster or node. The status of the workloads helps you understand the health of the workloads.

Click around on workloads and containers on the node to open the sidebar and drill down to details on these elements without losing context. You can search or group by workload or container for this node. Recent trigger and clear events appear in the Node Events chart. You can sort this list by available keys.

.. _k8s-nav-workload-detail:

Workload Detail
---------------

The Workload Detail panel displays detailed information about a selected workload. The properties in the upper left are metadata about the workload. If desired, you can specify a different cluster, namespace, or workload type.

Click around on pods and nodes to open the sidebar and drill down to details on these elements without losing context. You can search or group by the pod list for this workload. Recent trigger and clear events appear in the Workload Events chart. You can sort these lists by available keys.


.. _k8s-nav-pod-detail:

Pod Detail
----------

The Pod Detail panel displays detailed information about a selected pod, including its containers. Use this view to track the activity on one pod or across all pods in your cluster. The properties in the upper left are metadata about the pod. If desired, you can specify a different cluster, node, or pod.

Click around on containers in the pod to open the sidebar and drill down to details without losing context. You can search or group by the container list for this pod. Recent trigger and clear events appear in the Pod Events chart. You can sort this list by available keys.

.. _k8s-nav-container-detail:

Container Detail
----------------

The Container Detail panel displays detailed information about a selected container. The properties in the upper left are metadata about the container. If desired, you can specify a different cluster or container. You can also specify the metric graphs you want to see by applying a filter to the metrics. Recent trigger and clear events appear in the Container Events chart.


Use default dashboards to monitor Kubernetes
============================================

To find default dashboards for Kubernetes, select :strong:`Navigation menu > Dashboards` and search for Kubernetes to find a dashboard.

Observability Cloud provides these default dashboards for Kubernetes:

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Dashboard`
     - :strong:`Description`

   * - Kubernetes Clusters
     - View a summary of every cluster you are monitoring in Observability Cloud.

   * - Kubernetes Overview
     - View a summary of every pod and node you are monitoring in Observability Cloud.

   * - Kubernetes Nodes
     - View a summary of every node you are monitoring in Observability Cloud.

   * - Kubernetes Node
     - View the health of a specific node you specify. The dashboard is empty until you specify a node name.

   * - Kubernetes Pods
     - View a summary of every pod you are monitoring in Observability Cloud.

   * - Kubernetes Pod
     - View the health of a specific pod you specify. The dashboard is empty until you specify a pod name.

   * - Kubernetes Containers
     - View a summary of every container you are monitoring in Observability Cloud.

   * - Kubernetes Container
     - View the health of a specific container ID you specify. The dashboard is empty until you specify a container ID.

   * - Kubernetes Operations
     - View a summary of your Kubernetes deployment, including information about restarts, phases, deployments, and DaemonSets.

   * - Kubernetes Cluster Services
     - View a summary of Controller Managers, Schedulers, Proxies, and other Kubernetes services.
