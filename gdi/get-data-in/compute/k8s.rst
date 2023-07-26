.. _get-started-k8s:

****************************
Collect Kubernetes data
****************************

.. meta::
   :description: Integrate Kubernetes metrics and logs with Splunk Observability Cloud.

The Splunk Distribution of OpenTelemetry Collector provides integrated collection and forwarding for all Kubernetes telemetry. Deploy the Collector to gather telemetry for Splunk Infrastructure Monitoring, Splunk APM, or Splunk Log Observer.

The Collector is deployed using a Helm chart for the Splunk Distribution of OpenTelemetry Collector for Kubernetes. In a Kubernetes cluster, the chart creates a Kubernetes DaemonSet as well as other Kubernetes objects. These objects collect the following for the cluster:

- Metrics for Infrastructure Monitoring
- Traces for APM
- Logs for Log Observer

Supported versions
=====================

This Kubernetes solution has been validated in Kubernetes environments that use Minikube, Amazon Elastic Kubernetes Service (Amazon EKS), and Google Kubernetes Engine.

Start the integration
=========================

To start a Kubernetes integration, follow these steps:

#. Log in to Splunk Observability Cloud.

#. Open the :new-page:`Kubernetes guided setup <https://login.signalfx.com/#/gdi/scripted/kubernetes/step-1?gdiState=%7B"integrationId":"kubernetes"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.

   #. Select :guilabel:`Kubernetes`.

   #. Select :guilabel:`Add Connection`. The integration guided setup appears.

#. Follow the steps in the guided setup.

Advanced install
-------------------------------------------

For advanced installation instructions, see :ref:`otel-install-k8s`. 

This includes :ref:`how to configure the destination for the Collector <collector-k8s-destination>`: Splunk Enterprise or Splunk Cloud (``splunkPlatform``) or Splunk Observability Cloud (``splunkObservability``). 

Check access tokens
----------------------------------

Access tokens are organization-level tokens that, by default, are valid for one year. For access tokens created prior to February 28, 2022, the expiration date remains 5 years from the creation date. You must use an org token to authenticate emitters that send data points to Splunk Observability Cloud. You can use an org token in long-running scripts that call the API. For more information, see :ref:`admin-org-tokens`.

Next steps
=================

- Configure the Collector. See :ref:`otel-kubernetes-config`.
- See how to send Kubernetes logs in :ref:`otel-kubernetes-config-logs`.
- Learn about the Collector commands. See :ref:`otel-commands`.
- Troubleshoot Collector issues. See :ref:`otel-troubleshooting`.
- Troubleshoot Kubernetes and container issues. See :ref:`tshoot-k8s-container-runtimes`.

