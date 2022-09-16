.. _otel-install-k8s:

******************************
Kubernetes
******************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

The Splunk Distribution of OpenTelemetry Collector for Kubernetes is a Helm chart for the Splunk Distribution of OpenTelemetry Collector. Use Helm charts to define, install, and upgrade Kubernetes applications.

Install the chart using one of these methods:

* :ref:`Helm chart <helm-chart>`
* :ref:`Resource YAML manifests <resource-yaml-manifests>`
* :ref:`Splunk Distribution of OpenTelemetry Collector for Kubernetes Operator (Alpha) <k8s-operator>`

.. _helm-chart:

Helm chart
===================
Use the chart to do the following:

* Create a Kubernetes DaemonSet along with other Kubernetes objects in a Kubernetes cluster
* Receive, process, and export metric, trace, and log data for Splunk Enterprise, Splunk Cloud Platform, and Splunk Observability Cloud

Supported Kubernetes distributions
---------------------------------------
The chart is tested and works with default configurations on the following Kubernetes distributions:

* Vanilla (unmodified version) Kubernetes
* Amazon Elastic Kubernetes Service
* Azure Kubernetes Service
* Google Kubernetes Engine
* Minikube
* Red Hat OpenShift

While this chart should work for other Kubernetes distributions, it may require additional configurations applied to the values.yaml configuration file.

How to use the chart
--------------------------------

You need the following resources to use the chart:

* Helm 3. Helm 2 is not supported.
* A Kubernetes cluster
* Access Token: ``splunkObservability.accessToken``. Your Splunk Observability org access token. See :ref:`admin-org-tokens`.
* Splunk Realm: ``splunkObservability.realm``. Splunk realm to send telemetry data to. The default is ``us0``. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.
* Cluster name: ``clusterName``. This is an arbitrary value that identifies your Kubernetes cluster.

Run the following commands to deploy the Helm chart. Replace the parameters with their appropriate values.

.. code-block:: bash

   helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart
   helm install my-splunk-otel-collector --set="splunkRealm=us0,splunkAccessToken=xxxxxx,clusterName=my-cluster" splunk-otel-collector-chart/splunk-otel-collector

If the chart is deployed successfully, the output displays a message stating that the Splunk Distribution of OpenTelemetry Collector for Kubernetes is deploying in your Kubernetes cluster. You also see the last deployed date and status in the output.

You can also set Helm values as arguments using a YAML file. For example, after creating a YAML file named ``my_values.yaml``, run the following command to deploy the Helm chart:

.. code-block:: bash

   helm install my-splunk-otel-collector --values my_values.yaml splunk-otel-collector-chart/splunk-otel-collector

See :new-page:`examples of Helm chart configuration <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/README.md>` for additional chart installation examples or upgrade commands to change the default behavior.

.. _resource-yaml-manifests:

Resource YAML manifests
============================

.. note::

   To specify the configuration, you at least need to know your Splunk realm and base64-encoded access token.

A manifest specifies the state you want to apply to a Kubernetes object when you apply the configuration file. Each configuration file can contain multiple resource manifests. 

Apply resource manifests using the ``kubectl create`` command. The manifests are configured with all telemetry types enabled for the agent, which is the default when installing the Helm chart. These manifests should be configured for Splunk Observability Cloud only.

Do the following to deploy the Splunk Distribution of OpenTelemetry Collector for Kubernetes using resource manifests:

#. Determine which mode you want to use, Agent mode or Gateway mode. By default, Agent mode is configured to send data directly to Splunk SaaS endpoints. Agent mode can be reconfigured to send to a gateway.
#. Download the necessary manifest files for desired Agent or Gateway modes from :new-page:`the rendered manifests repository <https://github.com/signalfx/splunk-otel-collector-chart/tree/main/rendered/manifests>`.
#. Update the secret.yaml manifest with your base64-encoded access token as the ``splunk_observability_access_token`` data field value.
#. Update the applicable Agent, Gateway, and cluster receiver ConfigMap files to point to your Splunk Realm.
#. Apply the manifests using ``kubectl``, as shown in the following examples.

For Agent mode, download the :new-page:`agent-only manifest directory on GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/rendered/manifests/agent-only>` for pre-rendered Kubernetes resource manifests that can be applied using the ``kubectl apply`` command after being updated with your token and realm information:

.. code-block:: bash

   kubectl apply -f <agent-manifest-directory> --recursive

For Gateway mode, download the :new-page:`gateway-only manifest directory on GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/rendered/manifests/gateway-only>` for pre-rendered Kubernetes resource manifests that can be applied using the ``kubectl apply`` command after being updated with your token and realm information:

.. code-block:: bash

   kubectl apply -f <gateway-manifest-directory> --recursive

.. _k8s-operator:

The Splunk Distribution of OpenTelemetry Collector for Kubernetes Operator (Alpha)
============================================================================================

.. warning::

   This project is Alpha. Do not use in production.

The Splunk Distribution of OpenTelemetry Collector for Kubernetes Operator is an implementation of a Kubernetes Operator. This operator helps deploy and manage the Splunk Distribution of OpenTelemetry Collector for Kubernetes. See the :new-page:`README file <https://github.com/signalfx/splunk-otel-collector-operator>` in GitHub for installation instructions.

Splunk kubectl plugin
==========================

The :new-page:`Splunk kubectl plugin <https://github.com/signalfx/kubectl-splunk/blob/main/docs/kubectl-splunk_support.md>` collects Kubernetes resources into a zip file. The plugin contains the following resources:

* kubectl-splunk, which is a wrapper around kubectl for managing the Splunk Distribution of OpenTelemetry Collector for Kubernetes. 
* kubectl-splunk describe, which is a command that describes any Kubernetes resource (for example, pods, daemonsets, configmaps) that is automatically filtered by ``app=splunk-otel-collector``.
* kubectl-splunk get, which is a command that can be used to retrieve any Kubernetes resource (for example, pods, daemonsets, configmaps) that is automatically filtered by ``app=splunk-otel-collector``.
* kubectl-splunk status, which is a longer description that spans multiple lines and likely contains examples and usage of using your command. 

More options
==================================
Once you have installed the package, you can perform these actions:

* :new-page:`Get started using Log Observer <https://quickdraw.splunk.com/redirect/?product=Observability&location=log.observer.setup&version=current>`
* :ref:`apm`
