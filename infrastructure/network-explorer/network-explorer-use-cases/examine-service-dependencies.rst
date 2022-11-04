

.. include:: /_includes/network-explorer/network-explorer-preview-header.rst


.. _examine-service-dependencies:


*************************************************************************************************
Use case: Examine upstream and downstream dependencies for a service update
*************************************************************************************************

.. meta::
    :description: Examine service dependencies use case


The following use cases feature examples from Buttercup Games, a fictitious e-commerce company.

Kai, a site reliability engineering (SRE) at Buttercup Games, is responsible for rolling out an update to an important application service in their Kubernetes environment. They want to make sure they know all the upstream and downstream dependencies of the service so they can notify the dependent teams.

Kai first checks their team's architecture diagram, but soon realizes it has been outdated for 6 months. Additionally, distributed tracing has only been rolled out for a fraction of services.

Kai then attempts to investigate service dependencies using the Network Explorer service map, which provides a complete graphical view of all services based on their network traffic, regardless of the languages and frameworks used in each service.

In particular, Kai selects the service that is about to receive the update, and immediately gets and drilldown view of all upstream and downstream dependencies for that service.

By exploring the Network Explorer service map, Kai successfully obtained the context they need to understand all the dependencies of the service being updated. 

Learn more
======================================

For information on the Network Explorer service map, see :ref:`network-explorer-service-map`.

