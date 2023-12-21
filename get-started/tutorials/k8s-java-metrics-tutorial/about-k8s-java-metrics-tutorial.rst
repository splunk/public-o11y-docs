.. _about-k8s-java-metrics-tutorial:

*******************************************************************************
Tutorial: capture metrics from a Java application in Kubernetes
*******************************************************************************

.. meta::
    :description: Learn how to capture metrics from a Java application in Kubernetes by following a guided walkthrough with an example application.

.. toctree::
    :hidden:
    :maxdepth: 3

    config-k8s-for-java.rst
    deploy-collector-k8s-java.rst
    k8s-java-view-apm.rst

This tutorial provides a walkthrough of instrumenting a sample Java application in a Kubernetes environment. After this tutorial, you can:

* Configure a Kubernetes environment for application monitoring
* Deploy the Kubernetes Operator to automatically instrument a Java application.
* View your application data in Splunk APM.

We'll use the Spring Petclinic Java application as our example in the tutorial. To learn more about this application and to see a demo, go to the :new-page:`Spring Petclinic website <https://spring-petclinic.github.io/>`. 

.. _k8s-java-prereqs:

.. raw:: html

    <h2> Prerequisites </h2>

To get the most out of this tutorial, you need a basic understanding of Kubernetes. You must know how to create and manage Kubernetes components such as deployments, pods, and services.

You must have the following installed:

* ``minikube`` and ``kubectl``
* Helm version ``3.0.0`` or higher.

Additionally, you must have your Splunk realm and Splunk Observability Cloud access token to deploy the Splunk Distribution of OpenTelemetry Collector. For more information, see :ref:`admin-org-tokens`.

.. raw:: html

    <h2> Get started </h3>

To get started with the tutorial, see :ref:`config-k8s-for-java`.
