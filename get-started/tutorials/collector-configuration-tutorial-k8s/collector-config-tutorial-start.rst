.. _collector-config-tutorial-start-k8s:

******************************************************************
Part 1: Set up and monitor a Kubernetes cluster on your machine
******************************************************************

To follow the tutorial, you need a Kubernetes environment on your machine. See :ref:`about-collector-configuration-tutorial-k8s` for an overview of the tutorial.

A convenient way of setting up a demo Kubernetes environment is through Minikube, Podman, and Helm. Each tool has a specific purpose:

- Minikube creates a local Kubernetes cluster.
- Podman runs containers in Kubernetes.
- Helm helps configure Kubernetes.

.. note:: You don't need Podman if you already have a container runtime installed, such as Docker.

The following steps assume that you're using macOS as the host operating system. You also need the Homebrew package manager. If you don't have Homebrew installed, run the following command first in your terminal:

.. code-block:: bash

   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"


Install the requirements
==========================================

Open a terminal session and install Minikube, Helm, and Podman using Homebrew:

.. code-block:: bash

   brew install minikube helm podman

Check that you installed all the requirements by running the following commands:

.. code-block:: bash

   minikube version
   # minikube version: v1.32.0
   podman -v
   # podman version 4.9.3
   helm version
   # version.BuildInfo{Version:"v3.14.2", ...}


Create a local Kubernetes cluster
===========================================

To start the local Kubernetes cluster to use in this tutorial, run the following command:

.. code-block:: bash

   minikube start

After 5 minutes, the following message appears to communicate that Minikube successfully created the cluster:

.. code-block:: text

   Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

To test your newly created cluster, run the following command:

.. code-block:: shell

   minikube dashboard

The Kubernetes dashboard appears empty in your browser, meaning that you still haven't deployed a containerized app. Your next step installs the first containerized app, the Collector, in your cluster.


Install the Splunk Distribution of OpenTelemetry Collector
=================================================================

To complete this part of the tutorial, the last step consists in installing the Splunk Distribution of OpenTelemetry Collector using the Helm chart.

Run the following commands to install the Helm chart for the Collector:

.. code-block:: bash

   helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart
   helm repo update
   helm install --set="splunkObservability.accessToken=<access_token>,clusterName=splunkTutorial,splunkObservability.realm=<realm>,gateway.enabled=false,splunkObservability.profilingEnabled=true,environment=splunkTutorialEnv" --generate-name splunk-otel-collector-chart/splunk-otel-collector

Replace ``<realm>`` and ``<access_token>`` in the installation command with your realm and access token.

- To obtain an access token, see :ref:`admin-api-access-tokens`.
- To find your Splunk Observability Cloud realm, see :ref:`Note about realms <about-realms>`.

.. note:: You can also generate a prefilled Helm command using the :new-page:`Collector guided setup <https://login.signalfx.com/#/gdi/scripted/otel-connector-v2/step-2?category=use-case-infrastructure&gdiState=%7B%22integrationId%22:%22otel-connector-v2%22,%22platform%22:%22kubernetes%22,%22gateway%22:%22false%22,%22provider%22:%22%22,%22distro%22:%22%22,%22logCollection%22:%22%22,%22input_profiling%22:%22true%22%7D>` in Splunk Observability Cloud.

After successfully installing the Helm chart, messages similar to the following appear:

.. code-block:: text

   NAME: splunk-otel-collector-1709226095
   LAST DEPLOYED: Thu Feb 29 18:01:36 2024
   NAMESPACE: default
   STATUS: deployed
   NOTES:
   Splunk OpenTelemetry Collector is installed and configured to send data to Splunk Observability realm <realm>.


Check that data is coming into Splunk Observability Cloud
============================================================

Open Splunk Observability Cloud and go to :guilabel:`Infrastructure`, :guilabel:`Kubernetes`, :guilabel:`K8s nodes` to see the data coming from your local Kubernetes clusters. Filter to only show the ``splunkTutorial`` cluster.

The following image shows data coming from the demo ``splunkTutorial`` cluster:

.. image:: /_images/get-started/k8s-demo.png
      :width: 90%
      :alt: Collector metrics in Splunk Infrastructure Monitoring


Next step
=======================================

This completes the first part of the tutorial. You've created a local Kubernetes cluster and deployed the Collector as a containerized app.

Next, you'll edit the configuration to send logs to Splunk Cloud Platform. Continue to :ref:`collector-config-tutorial-edit-k8s`.


Learn more
=======================================

To learn more about the Collector configuration format and structure, see the following resources:

- :ref:`otel-install-k8s`
- :ref:`ootb-metrics-k8s`
