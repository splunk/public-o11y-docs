

.. _examine-service-dependencies:


*************************************************************************************************
Scenario: Kai examines upstream and downstream dependencies for a service update
*************************************************************************************************

.. meta::
    :description: Examine service dependencies scenario


The following scenario features examples from Buttercup Games, a fictitious e-commerce company.

Kai, a site reliability engineer (SRE) at Buttercup Games, is responsible for rolling out an update to the ``checkoutservice`` application service in their Kubernetes environment. They want to make sure they know all the upstream and downstream dependencies of ``checkoutservice`` so they can notify the dependent teams.

Kai first checks their team's architecture diagram, but realizes it's outdated. Not only does the diagram lack some services that Kai's team recently added, but it also doesn't show comprehensive service dependencies across different languages and frameworks.

    .. image:: /_images/images-network-explorer/outdated-diagram.png
        :alt: This image shows the outdated architecture diagram for Kai's team. The map is a combination of printed and illegible hand drawn elements on a stained piece of paper.
        :width: 80%

As this is a network issue, Kai then attempts to investigate service dependencies using Network Explorer in Splunk Infrastructure Monitoring. 
The Network Explorer network map provides a complete graphical view of all services based on their network traffic, regardless of the languages and frameworks used in each service. This is exactly what Kai has been looking for.

    .. image:: /_images/images-network-explorer/network-map-diagram.png
        :alt: This image shows the up-to-date architecture diagram for Kai's team. The diagram is an interactive network map in Network Explorer, which shows all upstream and downstream dependencies for ``checkoutservice``.
        :width: 80%

Kai selects the ``checkoutservice`` service and immediately gets a drilldown view of all upstream and downstream dependencies for ``checkoutservice``.

    .. image:: /_images/images-network-explorer/checkoutservice-network-map.png
        :alt: This image shows the up-to-date architecture diagram for Kai's team. The diagram is an interactive network map in Network Explorer, which shows all upstream and downstream dependencies for ``checkoutservice``.
        :width: 80%


By exploring the Network Explorer network map, Kai successfully obtained the context they need to understand all the dependencies of the service being updated. With this knowledge, Kai can now notify the dependent teams of the imminent update.

Learn more
======================================

For information on the Network Explorer network map, see :ref:`network-explorer-network-map`.

