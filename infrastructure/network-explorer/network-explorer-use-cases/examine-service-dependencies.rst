

.. include:: /_includes/network-explorer/network-explorer-preview-header.rst


.. _examine-service-dependencies:


*************************************************************************************************
Use case: Examine upstream and downstream dependencies for a service update
*************************************************************************************************

.. meta::
    :description: Examine service dependencies use case


The following use case features examples from Buttercup Games, a fictitious e-commerce company.

Kai, a site reliability engineer (SRE) at Buttercup Games, is responsible for rolling out an update to the ``checkoutservice`` application service in their Kubernetes environment. They want to make sure they know all the upstream and downstream dependencies of ``checkoutservice`` so they can notify the dependent teams.

Kai first checks their team's architecture diagram, but soon realizes it has been outdated. 

    .. image:: /_images/images-network-explorer/outdated-diagram.png
        :alt: This image shows the outdated architecture diagram for Kai's team. The map is a combination of printed and illegible hand rawn elements on a stained piece of paper.
        :width: 80%

Kai then attempts to investigate service dependencies using the Network Explorer service map, which provides a complete graphical view of all services based on their network traffic, regardless of the languages and frameworks used in each service.

    .. image:: /_images/images-network-explorer/service-map-diagram.png
        :alt: This image shows the up-to-date architecture diagram for Kai's team. The diagram is an interactive service map in Network Explorer, which shows all upstream and downstream dependencies for ``checkoutservice``.
        :width: 80%

In particular, Kai selects ``checkoutservice`` to receive the update, and immediately gets a drilldown view of all upstream and downstream dependencies for ``checkoutservice``.

By exploring the Network Explorer service map, Kai successfully obtained the context they need to understand all the dependencies of the service being updated. 

Learn more
======================================

For information on the Network Explorer service map, see :ref:`network-explorer-service-map`.

