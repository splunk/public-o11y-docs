.. _about-k8s-java-traces-tutorial:

*******************************************************************************
Tutorial: Capture traces from a Java application in Kubernetes
*******************************************************************************

.. meta::
    :description: Learn how to capture traces from a Java application in Kubernetes using Splunk automatic discovery and configuration. 

.. toctree::
    :hidden:
    :maxdepth: 3

    config-k8s-for-java.rst
    deploy-collector-k8s-java.rst
    k8s-java-view-apm.rst

Follow this tutorial for a walkthrough of instrumenting a sample Java application in a Kubernetes environment by using Splunk automatic discovery and configuration.

.. raw:: html

    <h2>What's in this tutorial</h2>

After completing this tutorial, you can accomplish the following:

* Configure a Kubernetes environment for application monitoring.
* Deploy the Kubernetes Operator to automatically instrument a Java application.
* View your application data in Splunk APM.

.. raw:: html

    <h2> How to use this tutorial</h2>

Follow the tutorial parts in order:

#. Configure your Kubernetes environment to install the OpenTelemetry Collector. See :ref:`config-k8s-for-java`
#. Deploy the OpenTelemetry Collector and Spring PetClinic Java application. See :ref:`deploy-collector-k8s-java`
#. View your application data in Splunk APM. See :ref:`k8s-java-view-apm`

The tutorial uses the Spring Petclinic Java application as an example. To learn more about this application and to see a demo, see the Spring Petclinic website: :new-page:`https://spring-petclinic.github.io/`. 

.. _k8s-java-prereqs:

.. raw:: html

    <h2> Prerequisites </h2>

To get the most out of this tutorial, you need a basic understanding of Kubernetes. You must know how to create and manage Kubernetes components such as deployments, pods, and services.

Install the following components:

* minikube
* kubectl
* Helm version 3.0.0 or higher

Additionally, you must have your Splunk Observability Cloud realm and access token to deploy the Splunk Distribution of OpenTelemetry Collector. For more information, see :ref:`admin-org-tokens`.

.. raw:: html

    <h2> Get started </h3>

To get started with the tutorial, see :ref:`config-k8s-for-java`.
