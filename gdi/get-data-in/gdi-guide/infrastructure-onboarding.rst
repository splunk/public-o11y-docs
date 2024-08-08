.. _infrastructure-onboarding:

**********************************************************
Chapter 1: Configure infrastructure and cloud services
**********************************************************

.. meta:: 
    :description: Configure cloud services, servers, clusters, and third-party applications to send data to Splunk Observability Cloud.

.. toctree::
    :hidden:

    infrastructure/integrate-cloud-services.rst
    infrastructure/send-server-cluster-data.rst
    infrastructure/configure-third-party.rst

The first step towards achieving full-stack observability is configuring infrastructure and cloud services to send data to Splunk Infrastructure Monitoring. By completing this phase of the onboarding process, you can get a detailed view of the platforms on which you run your services.

.. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-dashboard.gif
    :alt: The Kubernetes infrastructure dashboard in Splunk Observability Cloud.

Infrastructure monitoring can help you solve a variety of problems related to your platform. For example, if you run a set of applications on a Kubernetes cluster, infrastructure monitoring can tell you when specific pods are failing.

Infrastructure monitoring can also show you when your hosts are running slow or using too much memory. Pairing other services such as APM and RUM with Infrastructure monitoring can give you a broader view of your environment and explain problems in your services that might not be visible from APM alone. 

.. raw:: html

    <h2>Getting started</h2>

If you're setting up full-stack observability, follow each part of this guide in order:

* :ref:`integrate-cloud-services`
* :ref:`send-server-cluster-data`
* :ref:`configure-third-party-apps`

Otherwise, select the most relevant part(s) to follow. 

.. note:: You must complete part 2 of this chapter before starting part 3. 