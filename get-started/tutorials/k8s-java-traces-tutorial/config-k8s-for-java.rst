.. _config-k8s-for-java:

******************************************************************
Part 1: Configure your Kubernetes environment
******************************************************************

Before deploying the OpenTelemetry Collector, you must have a running Kubernetes cluster. Use minikube to create the Kubernetes cluster.

.. _run-the-cluster:

Run the Kubernetes cluster
=========================================

Start by running the cluster and creating a new namespace for the application.

#. Start running the cluster with ``minikube start``.
#. Create a namespace for the sample application. For this example, name the namespace :guilabel:`petclinic`: 

    .. code-block:: bash
        
        kubectl create namespace petclinic

This namespace helps you differentiate between the many different pods running in the cluster.

.. _config-values-yaml:

Configure the values.yaml file for the Helm Chart
====================================================================

Now, you need to configure Helm to correctly install the Splunk Distribution of OpenTelemetry Collector: 

#. Create a new directory called :guilabel:`spring-petclinic-app` to store the files for Helm. 
#. In the spring-petclinic-app directory, create a file called :guilabel:`values.yaml`. This file stores keys and values that configure the Splunk Distribution of OpenTelemetry Collector through the Helm Chart. 
#. Using the following table, add keys and values to values.yaml:

    .. list-table::
        :header-rows: 1
        :width: 100%
        :widths: 33 33 33

        * - Key
          - Value
          - Notes
        * - ``clusterName``
          - ``my-cluster`` or your desired cluster name
          - Name of the Kubernetes cluster
        * - ``splunkObservability.realm``
          - Your Splunk Observability Cloud realm
          - Deployment of the Splunk Observability Cloud instance
        * - ``splunkObservability.accessToken``
          - Your Splunk Observability Cloud access token
          - Allows you to send telemetry data to Splunk Observability Cloud
        * - ``environment``
          - ``prd`` or your desired environment name
          - Tags data that the application sends to Splunk Observability Cloud, allowing you to see the data in Splunk APM
        * - ``certmanager.enabled``
          - ``true``
          - Activates the certification manager for Helm
        * - ``operator.enabled``
          - ``true``
          - Activates the OpenTelemetry Kubernetes Operator

    After adding these keys and values, your values.yaml file looks like the following example:

    .. code-block:: yaml

        clusterName: my-cluster

        # your credentials for Splunk Observability Cloud
        splunkObservability:
          realm: <splunk-realm>
          accessToken: <splunk-access-token>

        # deployment environment value, which tags the data sent by your application
        environment: prd
        certmanager:
          enabled: true
        operator:
          enabled: true

Next step
==============================

You've now configured your Kubernetes environment by starting your Kubernetes cluster, creating a namespace for your application, and configuring the values.yaml file. 

Next, install the Splunk Distribution of OpenTelemetry Collector using Helm. See :ref:`deploy-collector-k8s-java` to continue.