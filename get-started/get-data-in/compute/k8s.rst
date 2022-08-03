.. _get-started-k8s:

****************************
Collect Kubernetes data
****************************

.. meta::
   :description: Start sending metrics and logs from Kubernetes to Splunk Observability Cloud.

The Splunk OpenTelemetry Connector is a package that provides integrated collection/forwarding for all Kubernetes telemetry types. Deploy this connector when you want to gather telemetry for Splunk Infrastructure Monitoring, Splunk APM, or Splunk Log Observer.

This package is a Helm chart for the Splunk OpenTelemetry Connector for Kubernetes. In a Kubernetes cluster, the chart creates a Kubernetes DaemonSet as well as other Kubernetes objects. These objects collect the following for the cluster:

- Metrics for Infrastructure Monitoring
- Traces for APM
- Logs for Log Observer

This Kubernetes solution has been validated in Kubernetes environments that use Minikube, Amazon Elastic Kubernetes Service (Amazon EKS), and Google Kubernetes Engine.

Start the integration
=========================
#. In the Observability Cloud main menu, select :menuselection:`Data Setup`.
#. Select :menuselection:`Kubernetes` in the list of integrations. The Kubernetes integration wizard appears.
#. Follow the steps in the wizard.

Access tokens
=================
Access tokens are organization-level tokens that, by default, are valid for five years. You must use an org token to authenticate emitters that send data points to Observability Cloud. You can use an org token in long-running scripts that call the API. For more information, see :ref:`admin-org-tokens`.
