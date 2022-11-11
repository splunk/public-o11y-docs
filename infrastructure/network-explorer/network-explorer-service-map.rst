:orphan:

.. include:: /_includes/network-explorer/network-explorer-preview-header.rst


.. _network-explorer-service-map:

************************************************************
Monitor service dependencies with service map
************************************************************

.. meta::
    :description: Visualization of service dependencies for Network Explorer.

The Network Explorer service map is a visualization of traffic activities and service dependencies in your network. You can view the service map in all Network Explorer navigators, and use the map to switch between Network Explorer navigators.

Components in the service map
------------------------------------------

The service map consists of the following components.

 .. list-table::
    :header-rows: 1
    :widths: 20 40 40

    * - :strong:`Component`
      - :strong:`Definition`
      - :strong:`Description`
        
    * - Network workload
      - A network workload is a service in your network. The names for these services come from your Kubernetes environment, Docker metadata, Linux service managers such as systemd, DNS, and IP address data.
      - Network workloads are represented as circles.
      
    * - Network edge
      - A network edge captures the amount of TCP network traffic from a source to destination workload.
      - Network edges are represented as broken arrows connecting the circles. The arrow direction corresponds to the network traffic direction. Each arrow has a number indicating the amount of data coming from a source network workload to a destination network workload in a certain time period. By default, the time period is the past 3 hours.

For example, the following service map shows traffic between the ``emailservice`` network workload and ``checkoutservice`` network workload, in both directions. The ``emailservice`` network workload sends 245 KiB of data to ``checkoutservice``, and receives 495 KiB of data from ``checkoutservice`` for the past 3 hours.  

.. image:: /_images/images-network-explorer/network-explorer-service-map.png
  :alt: Network Explorer service map showing two network workloads connected by two network edges. Traffic flows in both directions. The ``emailservice`` network workload sends 245 KiB of data to ``checkoutservice``, and receives 495 KiB of data from ``checkoutservice`` for the past 3 hours.  
  :width: 80%

Drill down into specific connections
------------------------------------------

You can view connections related to a network workload or network edge by selecting it on the service map.

* When you select a network workload, you get a drilldown map that shows only network edges and network workloads connected to the selected network workload.

  For example, the following drilldown map shows the selected ``productcatalogservice`` network workload along with its connected network workloads, and all network edges coming to and from ``productcatalogservice``.

      .. image:: /_images/images-network-explorer/network-explorer-service-map-drilldown-load.png
          :alt: Drilldown map showing all network workloads and edges connected to the selected ``productcatalogservice`` network workload.
          :width: 80%

* When you select a network edge, you get a drilldown map that shows only two network workloads connected by the selected network edge.

  For example, the following drilldown map shows the selected network edge along with the source network workload ``prometheus-node-exporter`` and the destination network workload ``kubelet``.

      .. image:: /_images/images-network-explorer/network-explorer-service-map-drilldown-edge.png
          :alt: Drilldown map showing network edge connecting the ``prometheus-node-exporter`` and ``kubelet`` network workloads. Traffic comes from ``prometheus-node-exporter`` to ``kubelet``.
          :width: 80%

.. note:: If you are in the :strong:`Network edge` navigator, selecting a network workload opens the :strong:`Network workload` navigator. If you are in the :strong:`Network workload` navigator, selecting a network edge opens the :strong:`Network edge` navigator.

Change time period for network edge data
--------------------------------------------

By default, a network edge shows the amount of data coming from a source network workload to a network destination workload in the past 3 hours. You can change the time period by selecting a different option, or enter a custom time in the time dropdown menu.

  .. image:: /_images/images-network-explorer/change-time.png
      :alt: Dropdown menu to change time period for network edge data.
      :width: 80%