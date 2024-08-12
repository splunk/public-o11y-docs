.. _otel-install-k8s:
.. _helm-chart:

*****************************************************
Install the Collector for Kubernetes using Helm
*****************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

You can install the Splunk Distribution of the OpenTelemetry Collector for Kubernetes using a Helm chart to define, install, and upgrade Kubernetes applications.

.. note:: See also :ref:`otel-install-k8s-manifests`.

Use the Helm chart to do the following:

* Create a Kubernetes DaemonSet along with other Kubernetes objects in a Kubernetes cluster.
* Receive, process, and export metric, trace, and log data for Splunk Enterprise, Splunk Cloud Platform, and Splunk Observability Cloud.

To learn more about the Collector for Kubernetes Helm chart, see:

* :ref:`kubernetes-helm-architecture`
* :ref:`kubernetes-helm-releases`
* :ref:`otel-commands`

.. _helm-chart-supported-distros:

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

While the chart should work for other Kubernetes distributions, the default :new-page:`values.yaml <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml>` configuration file could require additional updates.

Prerequisites
==============================================

You need the following resources to use the chart:

* :new-page:`Helm 3 <https://helm.sh/docs/intro/install/>`. Helm 2 is not supported. For more information on the version skew supported between Helm and Kubernetes see :new-page:`Helm Version Support Policy <https://helm.sh/docs/topics/version_skew/>`.

* Administrator access to your Kubernetes cluster.

.. _collector-k8s-destination:

Prerequisites: Destination
------------------------------------------------

The Collector for Kubernetes requires a destination: Splunk Enterprise or Splunk Cloud Platform (``splunkPlatform``) or Splunk Observability Cloud (``splunkObservability``).

Depending on your destination, you need:

* To send data to ``splunkPlatform``:

   * Splunk Enterprise 8.0 or higher.
   * A minimum of one Splunk platform index ready to collect the log data. This index is used for ingesting logs.
   * An HTTP Event Collector (HEC) token and endpoint. See :new-page:`Set up and use HTTP Event Collector in Splunk Web <https://docs.splunk.com/Documentation/Splunk/8.2.0/Data/UsetheHTTPEventCollector>` and :new-page:`Scale HTTP Event Collector <https://docs.splunk.com/Documentation/Splunk/8.2.0/Data/ScaleHTTPEventCollector>`.
   * ``splunkPlatform.endpoint``. URL to a Splunk instance, for example: ``"http://localhost:8088/services/collector"``.
   * ``splunkPlatform.token``. Splunk HTTP Event Collector token.

* To send data to ``splunkObservability``:

   * ``splunkObservability.accessToken``. Your Splunk Observability Cloud org access token with ingest authorization scope. See :ref:`admin-org-tokens`.
   * ``splunkObservability.realm``. Splunk realm to send telemetry data to. The default is ``us0``. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.

.. note:: The Collector for Kubernetes uses ``main`` as the default Splunk platform index.

Deploy the Helm chart
==============================================

Run the following commands to deploy the Helm chart:

#. Add the Helm repo:

   .. code-block:: bash

      helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart

#. Determine your destination.

   For Splunk Observability Cloud:

   .. code-block:: bash

      helm install my-splunk-otel-collector --set="splunkObservability.realm=us0,splunkObservability.accessToken=xxxxxx,clusterName=my-cluster" splunk-otel-collector-chart/splunk-otel-collector

   For Splunk Enterprise or Splunk Cloud Platform:

   .. code-block:: bash

      helm install my-splunk-otel-collector --set="splunkPlatform.endpoint=https://127.0.0.1:8088/services/collector,splunkPlatform.token=xxxxxx,splunkPlatform.metricsIndex=k8s-metrics,splunkPlatform.index=main,clusterName=my-cluster" splunk-otel-collector-chart/splunk-otel-collector

   For both Splunk Observability Cloud and Splunk Enterprise or Splunk Cloud Platform:

   .. code-block:: bash

      helm install my-splunk-otel-collector --set="splunkPlatform.endpoint=https://127.0.0.1:8088/services/collector,splunkPlatform.token=xxxxxx,splunkPlatform.metricsIndex=k8s-metrics,splunkPlatform.index=main,splunkObservability.realm=us0,splunkObservability.accessToken=xxxxxx,clusterName=my-cluster" splunk-otel-collector-chart/splunk-otel-collector

#. Specify a namespace to deploy the chart to with the ``-n`` argument:

   .. code-block:: bash

      helm -n otel install my-splunk-otel-collector -f values.yaml splunk-otel-collector-chart/splunk-otel-collector

.. caution::

  The :new-page:`values.yaml <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml>` file lists all supported configurable parameters for the Helm chart, along with a detailed explanation of each parameter. :strong:`Review it to understand how to configure this chart`.

  You can also configure the Helm chart to support different use cases, such as trace sampling and sending data through a proxy server. See :new-page:`Examples of chart configuration <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/README.md>` for more information.

Configure other parameters
==============================================

You can configure the following:

* :ref:`otel-kubernetes-config-distro`
* :ref:`otel-kubernetes-config-environment`
* :ref:`otel-upgrade-k8s-access-token`

For example:

.. code-block:: bash

   helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart
   helm install my-splunk-otel-collector --set="splunkRealm=us0,splunkAccessToken=xxxxxx,clusterName=my-cluster" --set=distribution={value},cloudProvider={value} splunk-otel-collector-chart/splunk-otel-collector

* Read more about :ref:`otel-kubernetes-config` and also :ref:`the advanced Kubernetes config <otel-kubernetes-config-advanced>`.
* See :new-page:`examples of Helm chart configuration <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/README.md>` for additional chart installation examples or upgrade commands to change the default behavior.
* Set ``isWindows`` to ``true`` to apply the Kubernetes cluster with Windows worker nodes.
* For logs, see :ref:`otel-kubernetes-config-logs`.

Set Helm using a YAML file
==============================================

You can also set Helm values as arguments using a YAML file. For example, after creating a YAML file named my_values.yaml, run the following command to deploy the Helm chart:

.. code-block:: bash

   helm install my-splunk-otel-collector --values my_values.yaml splunk-otel-collector-chart/splunk-otel-collector

See :new-page:`an example of a YAML file in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml>`. 

Set Prometheus metrics
==============================================

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

Verify the deployment
==============================================

If the chart is deployed successfully, the output displays a message informing that the Splunk Distribution of the OpenTelemetry Collector for Kubernetes is being deployed in your Kubernetes cluster, the last deployment date, and the status.

.. _k8s-operator:

Use the Kubernetes Operator in OpenTelemetry
============================================================================================

Using the Splunk Helm chart, you can install the Splunk Collector along with an upstream OpenTelemetry Kubernetes Operator for Auto Instrumentation. For more information, see :ref:`discovery-kubernetes`.

This instance of the Kubernetes Operator is part of the upstream OpenTelemetry Operator project. See the :new-page:`OpenTelemetry GitHub repo <OpenTelemetry GitHub repo <https://github.com/open-telemetry/opentelemetry-operator>` for more information.

.. note:: The upstream Kubernetes Operator is not related to the Splunk Operator for Kubernetes, which is used to deploy and operate Splunk Enterprise deployments in a Kubernetes infrastructure.

Splunk Distribution of the OpenTelemetry Collector for Kubernetes Operator (Alpha)
--------------------------------------------------------------------------------------------------------

.. caution::

   This project is Alpha. Do not use in production.

The Splunk Distribution of the OpenTelemetry Collector for Kubernetes Operator is Splunk Observability Cloud's implementation of a Kubernetes Operator, and it helps deploy and manage the Splunk Distribution of the OpenTelemetry Collector for Kubernetes. See the :new-page:`README file <https://github.com/signalfx/splunk-otel-collector-operator>` in GitHub for installation instructions.

Next steps
==================================

After installing the package you can:

* :ref:`otel-kubernetes-config`
* :ref:`otel-kubernetes-config-advanced`
* :ref:`otel-kubernetes-config-logs`
* :ref:`troubleshoot-k8s`
* :ref:`apm`
