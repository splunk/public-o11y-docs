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

The installer script uses one of the supported package managers to install the Collector.

When you update the Collector using the official packages, configuration files are never overridden. If you need to update the configuration after an update, edit them manually before backward compatibility is dropped. 

.. :note::

  For every configuration update use the default agent config as a reference.

Apply the following changes to the Collector configuration files for specific version upgrades. For more details refer to :new-page:`Helm chart upgrade guidelines <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/UPGRADING.md>` in GitHub. For generic guidelines see :ref:`otel-upgrade-k8s-guidelines-generic`.

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

  .. code-block:: yaml

  operatorcrds:
    install: true
  operator:
    enabled: true

To install the chart:

helm install <release-name> splunk-otel-collector-chart/splunk-otel-collector --set operatorcrds.install=true,operator.enabled=true <extra_args>

Current users 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

.. code-block:: yaml

  operator:
    enabled: true
  operator:
    crds:
      create: true

.. caution:: This method may cause race conditions during installation or upgrades

From 0.105.5 to 0.108.0
---------------------------------------

We've simplified the Helm chart configuration for operator auto-instrumentation. The values previously under .Values.operator.instrumentation.spec.* have been moved to .Values.instrumentation.*.

No Action Needed: If you have no customizations under .Values.operator.instrumentation.spec.*, no migration is required.
Action Required: Continuing to use the old values path will result in a Helm install or upgrade error, blocking the process.
Migration Steps:

Find any references to .Values.operator.instrumentation.spec.* in your Helm values with custom values.
Migrate them from .Values.operator.instrumentation.spec.* to .Values.instrumentation.*.
Example Migration:

The updated path looks like this:

.. code-block:: yaml

  instrumentation:
    endpoint: XXX
    ...

The deprecated path was:

.. code-block:: yaml

  operator:
    instrumentation:
      spec:
        endpoint: XXX
        ...

.. _otel-upgrade-k8s-guidelines-generic:

.. raw:: html

   <div class="include-start" id="collector-upgrade.rst"></div>

.. include:: /_includes/collector-upgrade.rst

.. raw:: html

   <div class="include-stop" id="collector-upgrade.rst"></div>

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


