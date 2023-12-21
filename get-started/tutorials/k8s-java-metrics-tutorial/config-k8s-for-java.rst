.. _config-k8s-for-java:

******************************************************************
Part 1: Configure your Kubernetes environment
******************************************************************

Before deploying the OpenTelemetry Collector, you must have a running Kubernetes cluster. In this tutorial, we'll use ``minikube`` as the cluster. Start running the cluster with ``minikube start``.

Next, create a namespace for the sample application:

.. code-block:: bash
    
    kubectl create namespace petclinic

This namespace helps us differentiate between the many different pods running in the cluster.

.. _config-values-yaml:

Configure ``values.yaml`` for the Helm Chart
====================================================================

Next, create a new directory called ``spring-petclinic-app`` to store the files used for this deployment. 

In the new directory, create a file called ``values.yaml``. This file stores keys and values that configure the Splunk Distribution of OpenTelemetry Collector through the Helm Chart.

The following table demonstrates the keys and values to add to ``values.yaml``:

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
      - Allows you to access the Splunk Distribution of OpenTelemetry Collector Helm Chart
    * - ``splunkObservability.accessToken``
      - Your Splunk Observability Cloud access token
      - Allows you to access the Splunk Distribution of OpenTelemetry Collector Helm Chart
    * - ``environment``
      - ``prd``
      - Tags data that the application sends to Splunk Observability Cloud, allowing you to see the data in Splunk APM.

After adding these values, your ``values.yaml`` file should look like the following example:

.. code-block:: yaml

    clusterName: my-cluster

    # your credentials for Splunk Observability Cloud
    splunkObservability:
      realm: <splunk-realm>
      accessToken: <splunk-access-token>

    # deployment environment value, which tags the data sent by your application
    environment: prd

You've now configured your Kubernetes environment. Next, we'll install the Splunk Distribution of OpenTelemetry Collector using Helm. See :ref:`deploy-collector-k8s-java` to continue.