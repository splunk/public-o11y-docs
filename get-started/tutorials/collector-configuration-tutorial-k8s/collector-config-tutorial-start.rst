.. _collector-config-tutorial-start-k8s:

******************************************************************
Part 1: Monitor a demo Kubernetes cluster on your machine
******************************************************************

To follow this tutorial, you need a Kubernetes environment on your machine. A convenient way of setting up a demo Kubernetes environment is through Minikube, Podman, and Helm.

- Minikube creates a local Kubernetes cluster.
- Podman runs containers in Kubernetes.
- Helm helps configure Kubernetes.

.. note:: You don't need Podman if you already have a container runtime installed, such as Docker.

Install the requirements
==========================================

Open a terminal session and install Minikube, Helm, and Podman using Homebrew:

.. code-block:: bash

   brew install minikube helm podman

If you don't have Homebrew installed, run the following command first:

.. code-block:: bash

   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Check that you've installed all the requirements by running the following commands:

.. code-block:: bash

   minikube version
   # minikube version: v1.32.0
   podman -v
   # podman version 4.9.3
   helm version
   # version.BuildInfo{Version:"v3.14.2", ...}


Spin a Kubernetes cluster
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

The empty Kubernetes dashboard appears in your browser, meaning that you still haven't deployed a containerized app in the cluster.


Install the Splunk Distribution of OpenTelemetry Collector
=================================================================

To complete this part of the tutorial, the last step consists in installing the Splunk Distribution of OpenTelemetry Collector using the Helm chart.

Run the following commands to install the Helm chart for the Collector:

.. code-block:: bash

   helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart
   helm repo update
   helm install --set="splunkObservability.accessToken=<access_token>,clusterName=splunkTutorial,splunkObservability.realm=<realm>,gateway.enabled=false,splunkObservability.profilingEnabled=true,environment=splunkTutorialEnv" --generate-name splunk-otel-collector-chart/splunk-otel-collector

To obtain an access token, see :ref:`admin-api-access-tokens`.

After successfully installing the Helm chart, messages similar to the following appear:

.. code-block:: text

   NAME: splunk-otel-collector-1709226095
   LAST DEPLOYED: Thu Feb 29 18:01:36 2024
   NAMESPACE: default
   STATUS: deployed
   REVISION: 1
   TEST SUITE: None
   NOTES:
   Splunk OpenTelemetry Collector is installed and configured to send data to Splunk Observability realm <realm>.

Open Splunk Observability Cloud and go to :guilabel:`Infrastructure`, :guilabel:`Kubernetes`, :guilabel:`K8s nodes` to see the data coming from your local Kubernetes clusters. Filter to show only the ``splunkTutorial`` cluster.

.. image:: /_images/get-started/k8s-demo.png
      :width: 90%
      :alt: Collector metrics in Splunk Infrastructure Monitoring

.. note:: You can generate a prefilled Helm command using the :new-page:`Collector guided setup <https://login.signalfx.com/#/gdi/scripted/otel-connector-v2/step-2?category=use-case-infrastructure&gdiState=%7B%22integrationId%22:%22otel-connector-v2%22,%22platform%22:%22kubernetes%22,%22gateway%22:%22false%22,%22provider%22:%22%22,%22distro%22:%22%22,%22logCollection%22:%22%22,%22input_profiling%22:%22true%22%7D>` in Splunk Observability Cloud.


Next step
=======================================

This completes the first part of the tutorial.

To learn how to edit the configuration to add new components, continue to :ref:`collector-config-tutorial-edit`.


Learn more
=======================================

To learn more about the Collector configuration format and structure, see the following resources:

- :ref:`linux-config-ootb`
- :ref:`otel-install-linux`
- :new-page:`Configuration <https://opentelemetry.io/docs/collector/configuration/>` at OpenTelemetry.io
