.. _otel-install-k8s-other:

*******************************************************************
Alternatives to install the Collector for Kubernetes 
*******************************************************************

.. meta::
      :description: Describes alternatives to install the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

To learn how to install de Collector using Helm, see :ref:`Install the Collector for Kubernetes with Helm chart <otel-install-k8s>`.

.. _resource-yaml-manifests:

Install the Collector with resource YAML manifests
=======================================================

.. note::

   To specify the configuration, you at least need to know your Splunk realm and base64-encoded access token.

A manifest specifies the state you want to apply to a Kubernetes object when you apply the configuration file. Each configuration file can contain multiple resource manifests. 

Apply resource manifests using the ``kubectl create`` command. The manifests are configured with all telemetry types enabled for the agent, which is the default when installing the Helm chart. These manifests should be configured for Splunk Observability Cloud only.

Do the following to deploy the Splunk Distribution of OpenTelemetry Collector for Kubernetes using resource manifests:

#. Determine which mode you want to use, Agent mode or Gateway mode. By default, Agent mode is configured to send data directly to Splunk SaaS endpoints. Agent mode can be reconfigured to send to a gateway.
#. Download the necessary manifest files from the provided examples for desired Agent or Gateway modes from :new-page:`the examples repository <https://github.com/signalfx/splunk-otel-collector-chart/tree/main/examples>`.
#. Update the secret.yaml manifest with your base64-encoded access token as the ``splunk_observability_access_token`` data field value.
#. Update the applicable Agent, Gateway, and cluster receiver ConfigMap files to point to your Splunk Realm.
#. Apply the manifests using ``kubectl``, as shown in the following examples.

For Agent mode, download the :new-page:`agent-only manifest directory on GitHub <https://github.com/signalfx/splunk-otel-collector-chart/tree/main/examples/collector-agent-only/rendered_manifests>` for pre-rendered Kubernetes resource manifests that can be applied using the ``kubectl apply`` command after being updated with your token and realm information:

.. code-block:: bash

   kubectl apply -f <agent-manifest-directory> --recursive

For Gateway mode, download the :new-page:`gateway-only manifest directory on GitHub <<https://github.com/signalfx/splunk-otel-collector-chart/tree/main/examples/collector-gateway-only/rendered_manifests>` for pre-rendered Kubernetes resource manifests that can be applied using the ``kubectl apply`` command after being updated with your token and realm information:

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
