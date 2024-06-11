.. _infrastructure-onboarding.rst:

**********************************************************
Configure infrastructure and cloud services
**********************************************************

.. meta:: 
    :description: Configure cloud services, servers, clusters, and third-party applications to send data to Splunk Observability Cloud.

.. toctree::
    :hidden:

    infrastructure/integrate-cloud-services.rst
    infrastructure/send-server-cluster-data.rst
    infrastructure/configure-third-party.rst

The first step towards achieving full-stack observability is configuring infrastructure and cloud services to send data to Splunk Infrastructure Monitoring. By completing this phase of the onboarding process, you can get a detailed view of the platforms on which you run your services.

Infrastructure monitoring can help you solve a variety of problems related to your platform. For example, if you run a set of applications on a Kubernetes cluster, infrastructure monitoring can tell you when specific pods are failing.

Infrastructure monitoring can also show you when your hosts are running slow or using too much memory. Pairing other services such as APM and RUM with Infrastructure monitoring can give you a broader view of your environment and explain problems in your services that might not be visible from APM alone. 

.. raw:: html

    <h2>Getting started</h2>

If you're setting up full-stack observability, follow each part of this guide in order:

* :ref:`integrate-cloud-services`
* :ref:`send-server-cluster-data`
* :ref:`configure-third-party-apps`

Otherwise, see the following table for which parts you can skip:

.. list-table:: 
    :header-rows: 1

    * - Part
      - Recommended/Optional
      - Notes
    * - :ref:`integrate-cloud-services`
      - Recommended
      - If you don't use cloud services, you can skip this part.
    * - :ref:`send-server-cluster-data`
      - Recommended 
      - None
    * - :ref:`configure-third-party-apps`
      - Optional
      - You must complete part 2 before starting this part.