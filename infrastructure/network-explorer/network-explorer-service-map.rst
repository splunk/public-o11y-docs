:orphan:

.. include:: /_includes/network-explorer/network-explorer-preview-header.rst


.. _network-explorer-service-map:

************************************************************
Use service map to monitor service dependencies
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
        
    * - Network load
      - A network load can be a service, 
      - Network loads are represented as circles.
      
    * - Network edge
      - A network edge is ...
      - Network edges are represented as broken arrows connecting the circles. The arrow direction corresponds to the network traffic direction. Each arrow has a number indicating the amount of data coming from a source network load to a destination network load in the past <time duration>.

For example, the following service map shows traffic between the ``emailservice`` network load and ``checkoutservice`` network load, in both directions. The ``emailservice`` network load sends 245 KiB of data to ``checkoutservice``, and receives 495 KiB of data from ``checkoutservice`` for the past <time duration>.  

.. image:: /_images/images-network-explorer/network-explorer-service-map.png
  :alt: Network Explorer service map showing two network loads connected by two network edges. Traffic flows in both directions. The ``emailservice`` network load sends 245 KiB of data to ``checkoutservice``, and receives 495 KiB of data from ``checkoutservice`` for the past <time duration>.  
  :width: 80%

Drill down into specific connections
------------------------------------------

You can view connections related to a network load or network edge by selecting it on the service map.

* When you select a network load, you get a drilldown map that shows only network edges and network loads connected to the selected network load. For example, the following drilldown map shows the selected ``productcatalogservice`` network load along with its connected network loads, and all network edges coming to and from ``productcatalogservice``.

    .. image:: /_images/images-network-explorer/network-explorer-service-map-drilldown-load.png
        :alt: Drilldown map showing all network loads and edges connected to the selected ``productcatalogservice`` network load.
        :width: 80%

* When you select a network edge, you get a drilldown map that shows only two network loads connected by the selected network edge. For example, the following drilldown map shows the selected network edge along with the source network load ``prometheus-node-exporter`` and the destination network load ``kubelet``.

    .. image:: /_images/images-network-explorer/network-explorer-service-map-drilldown-edge.png
        :alt: Drilldown map showing network edge connecting the ``prometheus-node-exporter`` and ``kubelet`` network loads. Traffic comes from ``prometheus-node-exporter`` to ``kubelet``.
        :width: 80%

.. note:: If you are in the :strong:`Network edge` navigator, selecting a network load takes you to the :strong:`Network load` navigator. If you are in the :strong:`Network load` navigator, selecting a network edge takes you to the :strong:`Network edge` navigator.