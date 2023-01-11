.. _otel-install-k8s:

******************************************
Install the Collector for Kubernetes
******************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

The Splunk Distribution of OpenTelemetry Collector for Kubernetes is a Helm chart for the Splunk Distribution of OpenTelemetry Collector. Use Helm charts to define, install, and upgrade Kubernetes applications.

Install the chart using one of these methods:

* :ref:`Helm chart <helm-chart>`
* :ref:`Resource YAML manifests <resource-yaml-manifests>`
* :ref:`Kubernetes Operator (Alpha) <k8s-operator>`

.. _helm-chart:

Install the Collector with Helm chart
==============================================

Use the Helm chart to do the following:

* Create a Kubernetes DaemonSet along with other Kubernetes objects in a Kubernetes cluster.
* Receive, process, and export metric, trace, and log data for Splunk Enterprise, Splunk Cloud Platform, and Splunk Observability Cloud.

Supported Kubernetes distributions
---------------------------------------

The Helm chart works with default configurations of the main Kubernetes distributions. Use actively supported versions:

* :new-page:`Vanilla (unmodified version) Kubernetes <https://endoflife.date/kubernetes>`
* :new-page:`Amazon Elastic Kubernetes Service <https://endoflife.date/amazon-eks>`
* :new-page:`Azure Kubernetes Service <https://endoflife.date/azure-kubernetes-service>`
* :new-page:`Google Kubernetes Engine <https://endoflife.date/google-kubernetes-engine>`
* :new-page:`Red Hat OpenShift <https://access.redhat.com/support/policy/updates/openshift#dates>`
* Minikube. This distribution was made for local developers and is not meant to be used in production. 
   - Minikube was created to spin up various past versions of Kubernetes. 
   - Minikube versions don't necessarily align with Kubernetes versions. For example, the :new-page:`Minikube v1.27.1 releases notes <https://github.com/kubernetes/minikube/releases/tag/v1.27.1>` state the default Kubernetes version was bumped to v1.25.2. 

While the chart should work for other Kubernetes distributions, the :new-page:`values.yaml <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml>` configuration file could require additional updates. 

Use the Helm chart
--------------------------------

Follow these steps to install the Collector using the Helm chart. 

Required resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You need the following resources to use the chart:

* :new-page:`Helm 3 <https://helm.sh/docs/intro/install/>`. Helm 2 is not supported.
* A Kubernetes cluster.
* Access Token: ``splunkObservability.accessToken``. Your Splunk Observability org access token. See :ref:`admin-org-tokens`.
* Splunk Realm: ``splunkObservability.realm``. Splunk realm to send telemetry data to. The default is ``us0``. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.
* Cluster name: ``clusterName``. This is an arbitrary value that identifies your Kubernetes cluster.

Deploy the Helm chart
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the following commands to deploy the Helm chart: 

.. code-block:: bash

   
   helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart
   helm install my-splunk-otel-collector --set="splunkRealm=us0,splunkAccessToken=xxxxxx,clusterName=my-cluster" --set=distribution={value},cloudProvider={value} splunk-otel-collector-chart/splunk-otel-collector

Replace the parameters with their appropriate values. Apply the following for distributions:

.. code-block:: bash

   # aks deployment
   --set distribution=aks,cloudProvider=azure 

   # eks deployment
   --set distribution=eks,cloudProvider=aws 

   # eks/fargate deployment (with recommended gateway)
   --set distribution=eks/fargate,gateway.enabled=true,cloudProvider=aws 

   # gke deployment
   --set distribution=gke,cloudProvider=gcp 

   # gke/autopilot deployment
   --set distribution=gke/autopilot,cloudProvider=gcp 

   # openshift deployment (openshift can run on multiple cloud providers, so cloudProvider is excluded here)
   --set distribution=openshift 

You can also set Helm values as arguments using a YAML file. For example, after creating a YAML file named ``my_values.yaml``, run the following command to deploy the Helm chart:

.. code-block:: bash

   helm install my-splunk-otel-collector --values my_values.yaml splunk-otel-collector-chart/splunk-otel-collector

See :new-page:`examples of Helm chart configuration <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/README.md>` for additional chart installation examples or upgrade commands to change the default behavior.

Verify the deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the chart is deployed successfully, the output displays a message informing that the Splunk Distribution of OpenTelemetry Collector for Kubernetes is being deployed in your Kubernetes cluster, the last deployment date, and the status.


.. _resource-yaml-manifests:

Install the Collector with resource YAML manifests
=======================================================

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

Install the Collector for the Kubernetes Operator (Alpha)
============================================================================================

.. caution::

   This project is Alpha. Do not use in production.

The Splunk Distribution of OpenTelemetry Collector for Kubernetes Operator is an implementation of a Kubernetes Operator. This operator helps deploy and manage the Splunk Distribution of OpenTelemetry Collector for Kubernetes. See the :new-page:`README file <https://github.com/signalfx/splunk-otel-collector-operator>` in GitHub for installation instructions.

.. _otel-k8-kubectl:

Collect resources with the kubectl plugin
=====================================================

The :new-page:`Splunk kubectl plugin <https://github.com/signalfx/kubectl-splunk/blob/main/docs/kubectl-splunk_support.md>` collects Kubernetes resources into a zip file. 

The plugin contains the following resources:

* kubectl-splunk, which is a wrapper around kubectl for managing the Splunk Distribution of OpenTelemetry Collector for Kubernetes. 
* kubectl-splunk describe, which is a command that describes any Kubernetes resource (for example, pods, daemonsets, configmaps) that is automatically filtered by ``app=splunk-otel-collector``.
* kubectl-splunk get, which is a command that can be used to retrieve any Kubernetes resource (for example, pods, daemonsets, configmaps) that is automatically filtered by ``app=splunk-otel-collector``.
* kubectl-splunk status, which is a longer description that spans multiple lines and likely contains examples and usage of using your command. 

Next steps
==================================
After installing the package, you can:

* :new-page:`Get started using Log Observer <https://quickdraw.splunk.com/redirect/?product=Observability&location=log.observer.setup&version=current>`
* :ref:`apm`
