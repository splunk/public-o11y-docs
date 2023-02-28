.. _otel-install-k8s:

***************************************************************
Install the Collector for Kubernetes with Helm chart 
***************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Kubernetes using Helm chart.

The Splunk Distribution of OpenTelemetry Collector for Kubernetes is a Helm chart for the Splunk Distribution of OpenTelemetry Collector. Use Helm charts to define, install, and upgrade Kubernetes applications.

Use the Helm chart to do the following:

* Create a Kubernetes DaemonSet along with other Kubernetes objects in a Kubernetes cluster.
* Receive, process, and export metric, trace, and log data for Splunk Enterprise, Splunk Cloud Platform, and Splunk Observability Cloud.

You can install the Collector using Helm as explained in this do, or you can also use one of these methods:

* :ref:`Resource YAML manifests <resource-yaml-manifests>`
* :ref:`Kubernetes Operator (Alpha) <k8s-operator>`

Supported Kubernetes distributions
==============================================

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

Required resources
==============================================

You need the following resources to use the chart:

* :new-page:`Helm 3 <https://helm.sh/docs/intro/install/>`. Helm 2 is not supported.
* A Kubernetes cluster.
* Access Token: ``splunkObservability.accessToken``. Your Splunk Observability org access token. See :ref:`admin-org-tokens`.
* Splunk Realm: ``splunkObservability.realm``. Splunk realm to send telemetry data to. The default is ``us0``. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.
* Cluster name: ``clusterName``. This is an arbitrary value that identifies your Kubernetes cluster.

.. _helm-chart:

Deploy the Helm chart
==============================================

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

To set your cloud provider and configure ``cloud.platform`` for the resource detection processor, use: 

.. code-block:: bash

   --set cloudProvider={azure|gcp|eks|openshift} 


Set Helm using a YAML file
==============================================

You can also set Helm values as arguments using a YAML file. For example, after creating a YAML file named ``my_values.yaml``, run the following command to deploy the Helm chart:

.. code-block:: bash

   helm install my-splunk-otel-collector --values my_values.yaml splunk-otel-collector-chart/splunk-otel-collector

See :new-page:`an example of a YAML file in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml>`. Options include:

* Set ``isWindows`` to ``true`` to apply the Kubernetes cluster with Windows worker nodes. 
* Set ``networkExplorer.enabled`` to ``true`` to use the default values for :ref:`splunk-otel-network-explorer <network-explorer>`.

Set Prometheus metrics
------------------------------------------

Set the Collector to automatically scrape any pod emitting Prometheus by adding this property to the Helm chart's values YAML: 

.. code-block:: bash
   
   autodetect:
      prometheus: true

Add this configuration in the resources file for any pods in the deployment:

.. code-block:: bash

   metadata:
      annotations:
         prometheus.io/scrape: "true"
         prometheus.io/path: /metrics
         prometheus.io/port: "8080"

Additional configuration resources
==============================================

See also:

* :ref:`otel-kubernetes-config`.
* :new-page:`Examples of Helm chart configuration <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/README.md>` for additional chart installation examples or upgrade commands to change the default behavior.

Verify the deployment
==============================================

If the chart is deployed successfully, the output displays a message informing that the Splunk Distribution of OpenTelemetry Collector for Kubernetes is being deployed in your Kubernetes cluster, the last deployment date, and the status.

Next steps
==================================
After installing the package, you can:

* :new-page:`Get started using Log Observer <https://quickdraw.splunk.com/redirect/?product=Observability&location=log.observer.setup&version=current>`
* :ref:`apm`
