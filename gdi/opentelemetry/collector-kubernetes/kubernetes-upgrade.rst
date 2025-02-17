.. _otel-upgrade:
.. _otel-kubernetes-upgrade:

*********************************************************************************
Upgrade the Collector for Kubernetes and other updates
*********************************************************************************

.. meta::
  :description: Upgrade the Splunk Distribution of the OpenTelemetry Collector for Kubernetes.

.. _otel-upgrade-k8s:

Upgrade the Collector for Kubernetes
=======================================

To upgrade the Collector for Kubernetes run the following commands:

- Use the flag ``--reuse-values`` to keep the config values you'd already set while installing or using the Collector: 

.. code-block:: bash

  helm upgrade splunk-otel-collector splunk-otel-collector-chart/splunk-otel-collector 
  --reuse-values

- Use ``--values config.yaml`` to override your previous configuration while upgrading:

.. code-block:: bash

  helm upgrade splunk-otel-collector --values config.yaml splunk-otel-collector-chart/splunk-otel-collector --reuse-values

Read more in the official :new-page:`Helm upgrade options <https://helm.sh/docs/helm/helm_upgrade/#options>` documentation.

.. _otel-upgrade-k8s-guidelines:

Upgrade guidelines
=================================

.. :note::

  For every configuration update use the default agent config as a reference.

Apply the following changes to the Collector configuration files for specific version upgrades. For more details refer to :new-page:`Upgrade guidelines <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/UPGRADING.md>` in GitHub.

From 0.113.0 to 0.116.0
---------------------------------------

This guide provides steps for new users, transitioning users, and those maintaining previous operator CRD configurations:

New users: No migration for CRDs is required.
Previous users: Migration may be needed if using operator.enabled=true.
CRD deployment has evolved over chart versions:

Before 0.110.0: CRDs were deployed via a crds/ directory (upstream default).
0.110.0 to 1.113.0: CRDs were deployed using Helm templates (upstream default), which had reported issues.
0.116.0 and later: Users must now explicitly configure their preferred CRD deployment method or deploy the CRDs manually to avoid potential issues. Users can deploy CRDs via a crds/ directory again by enabling a newly added value.

New users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

New users are advised to deploy CRDs via the crds/ directory. For a fresh installation, use the following Helm values:

operatorcrds:
  install: true
operator:
  enabled: true
To install the chart:

helm install <release-name> splunk-otel-collector-chart/splunk-otel-collector --set operatorcrds.install=true,operator.enabled=true <extra_args>
Current Users (Recommended Migration to crds/ Directory)
If you're using chart versions 0.110.0 to 1.113.0, CRDs are likely deployed via Helm templates. To migrate to the recommended crds/ directory deployment:

Step 1: Delete the Existing Chart
Remove the chart to prepare for a fresh installation:

helm delete <release-name>
Step 2: Verify or Remove Existing CRDs
Check if the following CRDs are present and delete them if necessary:

kubectl get crds | grep opentelemetry
kubectl delete crd opentelemetrycollectors.opentelemetry.io
kubectl delete crd opampbridges.opentelemetry.io
kubectl delete crd instrumentations.opentelemetry.io
Step 3: Reinstall with Recommended Values
Reinstall the chart with the updated configuration:

helm install <release-name> splunk-otel-collector --set operatorcrds.install=true,operator.enabled=true <extra_args>
Previous Users (Maintaining Legacy Helm Templates)
If you're using chart versions 0.110.0 to 1.113.0 and prefer to continue deploying CRDs via Helm templates (not recommended), you can do so with the following values:

operator:
  enabled: true
operator:
  crds:
    create: true
Warning: This method may cause race conditions during installation or upgrades



.. _otel-upgrade-k8s-access-token:

Update the access token for the Collector for Kubernetes
=============================================================

.. note:: Make sure you don't update your Helm chart or Collector version in the process of updating your access token. See Step 3 for details.

To update the access token for your Collector for Kubernetes instance follow these steps:

1. Confirm the Helm release name and chart version. To do so, run: 

  .. code-block:: bash

    helm list -f <Release_Name> 

2. Optionally, you can check your current access token: 

  .. code-block:: bash

    helm get values <Release_Name> 

3. Deploy your new access token with Helm upgrade. This command will only update your access token, but will mantain your current Helm chart and Collector versions. 

  .. code-block:: bash

    helm upgrade --reuse-values --version <Current_Chart_Version> --set splunkObservability.accessToken=<New_Access_Token> <Release_Name> splunk-otel-collector-chart/splunk-otel-collector 

  If you want to use the latest Helm version instead of your current one, remove ``'--version <Current_Chart_Version>'`` from the command.  

4. Verify the value of the updated access token: 

  .. code-block:: bash

    helm get values <Release_Name> 

5. Restart the Collector's DaemonSet and deployments: 

  * If ``agent.enabled=true``, restart the Collector's agent DaemonSet:

  .. code-block:: bash

    kubectl rollout restart DaemonSet <Release_Name>-agent
    
  * If ``clusterReceiver.enabled=true``, restart the Collector's cluster receiver deployment:

  .. code-block:: bash
    
    kubectl rollout restart deployment <Release_Name>-k8s-cluster-receiver 

  * If ``gateway.enabled=true``, restart the Collector's gateway deployment:

  .. code-block:: bash
    
    kubectl rollout restart deployment <Release_Name>

6. Verify the status of your clusters' pods: 

  .. code-block:: bash

    kubectl get pod -n <Namespace> | grep <Release_Name>


