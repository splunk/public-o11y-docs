.. _otel-install-k8s-manifests:
.. _resource-yaml-manifests:

********************************************************************
Install the Collector for Kubernetes with YAML manifests
********************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Kubernetes with YAML manifests.

You can also install the Splunk Distribution of the OpenTelemetry Collector for Kubernetes using resource YAML manifests.

.. note:: See also :ref:`otel-install-k8s`.

Prerequisites
==================================

To specify the configuration, you need to know your Splunk realm and base64-encoded access token.

A configuration file can contain multiple resource manifests. Each manifest applies a specific state to a Kubernetes object. You must configure your manifests for Splunk Observability Cloud only and come with all telemetry types activated for the agent, which is the default if you install using the Helm chart.

Determine which manifest you want to use
===============================================

Download the necessary manifest files from :new-page:`the examples repository <https://github.com/signalfx/splunk-otel-collector-chart/tree/main/examples>`. Refer to the ``README`` files for more details on each example.

Determine which :ref:`otel-deployment-mode` you want to use, agent or gateway. By default, host monitoring (agent) mode is configured to send data directly to Splunk SaaS endpoints. Host monitoring (agent) mode can be reconfigured to send to a gateway.

Update the manifest
==================================

Once you've decided which manifest suits you better, make the following updates:

#. In the secret.yaml manifest, update the ``splunk_observability_access_token`` data field with your base64-encoded access token.
#. Update any configmap-agent.yaml, configmap-gateway.yaml, and configmap-cluster-receiver.yaml manifest files you use. Search for "CHANGEME" to find the values that must be updated to use the rendered manifests directly.
      #. You need to update "CHANGEME" in exporter configurations to the value of the Splunk realm.
      #. You need to update "CHANGEME" in attribute processor configurations to the value of the cluster name.

Apply the manifest
==================================

After you've updated them, apply the manifests using ``kubectl``, as shown in the following examples.

For host monitoring (agent) mode, download the :new-page:`agent-only manifest directory on GitHub <https://github.com/signalfx/splunk-otel-collector-chart/tree/main/examples/default/rendered_manifests>` for pre-rendered Kubernetes resource manifests that can be applied using the ``kubectl apply`` command after being updated with your token, realm information, and cluster name:

.. code-block:: bash

   kubectl apply -f <agent-manifest-directory> --recursive

For data forwarding (gateway) mode, download the :new-page:`gateway-only manifest directory on GitHub <https://github.com/signalfx/splunk-otel-collector-chart/tree/main/examples/collector-gateway-only/rendered_manifests>` for pre-rendered Kubernetes resource manifests that can be applied using the ``kubectl apply`` command after being updated with your token, realm information, and cluster name:

.. code-block:: bash

   kubectl apply -f <gateway-manifest-directory> --recursive

Use templates
==================================

You can create your own manifest YAML files with customized parameters using ``helm template`` command.

.. code-block:: bash

   helm template --namespace default --set cloudProvider='aws' --set distribution='openshift' --set splunkObservability.accessToken='KUwtoXXXXXXXX' --set clusterName='my-openshift-EKS-dev-cluster' --set splunkObservability.realm='us1' --set gateway.enabled='false' --output-dir <rendered_manifests_dir> --generate-name splunk-otel-collector-chart/splunk-otel-collector

If you prefer, you can update the values.yaml file first.

.. code-block:: bash

   helm template --namespace default --values values.yaml --output-dir <rendered_manifests_dir> --generate-name splunk-otel-collector-chart/splunk-otel-collector

Manifest files will be created in your specified folder ``<rendered_manifests_dir>``.

Manifest examples
==================================
See the following manifest to set security constraints:

.. github:: yaml
   :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector-chart/main/examples/distribution-openshift/rendered_manifests/securityContextConstraints.yaml

Next steps
==================================

After installing the Collector you can:

* :ref:`otel-kubernetes-config`
* :ref:`otel-kubernetes-config-advanced`
* :ref:`otel-kubernetes-config-logs`
* :ref:`troubleshoot-k8s`
* :ref:`apm`
