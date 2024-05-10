.. _otel-upgrade:
.. _otel-kubernetes-upgrade:

*********************************************************************************
Upgrade the Collector for Kubernetes and other updates
*********************************************************************************

.. meta::
  :description: Upgrade the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

.. include:: /_includes/collector-upgrade.rst

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

Read more in the official Helm upgrade options documentation at :new-page:`https://helm.sh/docs/helm/helm_upgrade/#options <https://helm.sh/docs/helm/helm_upgrade/#options>`.

.. _otel-upgrade-k8s-access-token:

Update the access token for the Collector for Kubernetes
=============================================================

To update the access token for your Collector for Kubernetes instance follow these steps:

#. Confirm the Helm release name and the chart version: 

  .. code-block:: bash

    helm list -f splunk-otel-collector 

#. Optionally, you can check your current access token: 

  .. code-block:: bash

    helm get values <Release_Name> 

#. Deploy the new access token with Helm upgrade. If you want to use the latest version, remove ``'--version <Current_Chart_Version>'``: 

  .. code-block:: bash

    helm upgrade --reuse-values --version <Current_Chart_Version> --set splunkObservability.accessToken=<New Access Token> <Release Name> splunk-otel-collector-chart/splunk-otel-collector 

#. Verify the value of the updated access token: 

  .. code-block:: bash

    helm get values <Release_Name> 

#. Restart the Collector's daemonset and deployments: 

  .. code-block:: bash

    kubectl rollout restart daemonset <Release_Name>-agent kubectl rollout restart deployment <Release_Name>-k8s-cluster-receiver 
    
#. Optionally, if the gateway is enabled, use: 

  .. code-block:: bash

    kubectl rollout restart deployment <Release_Name> 

#. Check the status of your clusters' pods: 

  .. code-block:: bash

    kubectl get pod -n <Namespace> | grep <Release_Name>


Update the access token for your cluster receiver and Gateway deployments
-----------------------------------------------------------------------------------

If you have any cluster receiver or gateway component deployed, you need to restart them as well so they can update their access token.    

For more information see :ref:`helm-chart-components`.