.. _about-k8s-imm:
.. _about-k8s-tutorial:

*****************************************************************************************
Tutorial: Monitor your Kubernetes environment in Splunk Observability Cloud
*****************************************************************************************

.. meta::
    :description: Learn how to deploy the Splunk Distribution of the OpenTelemetry Collector on a Kubernetes cluster, view your cluster data, and create a detector to issue alerts.

.. toctree::
    :hidden:
    :maxdepth: 3

    k8s-install-otel
    k8s-monitor-with-navigators
    k8s-activate-detector

Deploy the Splunk Distribution of the OpenTelemetry Collector in a Kubernetes cluster and start monitoring your Kubernetes platform using Splunk Observability Cloud.

.. raw:: html

    <h2> What's in this tutorial </h2>

After completing this tutorial, you can accomplish the following tasks:

* Install and deploy the Splunk Distribution of OpenTelemetry Collector for Kubernetes.
* Use the Splunk Distribution of OpenTelemetry Collector to send Kubernetes data to Splunk Observability Cloud.
* View your Kubernetes cluster data in navigators and dashboards.
* Create a detector to issue alerts about your Kubernetes cluster data.

.. raw:: html

    <h2> How to use this tutorial </h2>

Each part in this tutorial builds on the previous part. Follow the tutorial parts in order. 

#. Deploy the Splunk Distribution of OpenTelemetry Collector for Kubernetes. See :ref:`install-otel-k8s`.
#. Use navigators and dashboards to monitor your Kubernetes cluster. See :ref:`monitor-k8s-cluster`.
#. Create a detector to alert you about Kubernetes cluster data. See :ref:`activate-builtin-detector`.

.. raw:: html

    <h2> Prerequisites </h2>

* You must be an administrator in Splunk Observability Cloud.
* You must have an access token for the Splunk Observability Cloud organization you want to get data into. If you are using a free trial account, you can use the :guilabel:`Default` access token to complete this task. 
  For more details about creating organization access tokens, see :ref:`admin-org-tokens`.
* You must have systemd and cURL installed.
* You must have a running Kubernetes cluster.

.. raw:: html

    <h2> Get started </h2>

To get started with the tutorial, see :ref:`install-otel-k8s`.
