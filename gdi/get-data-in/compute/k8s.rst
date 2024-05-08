.. _get-started-k8s:

****************************
Collect Kubernetes data
****************************

.. meta::
   :description: Integrate Kubernetes metrics and logs with Splunk Observability Cloud.

The Splunk Distribution of the OpenTelemetry Collector provides integrated collection and forwarding for all Kubernetes telemetry, such as metrics, APM traces, and logs, to Splunk Observability Cloud.

By default, the Collector for Kubernetes is deployed using a Helm chart. In a Kubernetes cluster, the chart creates a Kubernetes DaemonSet as well as other Kubernetes objects. 

Supported versions
=====================

This Kubernetes solution has been validated in Kubernetes environments that use Minikube, Amazon Elastic Kubernetes Service (Amazon EKS), and Google Kubernetes Engine. See more details at :ref:`helm-chart-supported-distros`.

Install the Collector for Kubernetes
============================================

To start the Kubernetes integration, follow these steps:

#. Log in to Splunk Observability Cloud.

#. Open the :new-page:`Kubernetes guided setup <https://login.signalfx.com/#/gdi/scripted/kubernetes/step-1?gdiState=%7B"integrationId":"kubernetes"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management` to open the :strong:`Integrate Your Data` page.

   #. Select :guilabel:`Kubernetes`.

   #. Select :guilabel:`Add Connection`. The integration guided setup appears.

#. Follow the steps in the guided setup.

Advanced install
-------------------------------------------

For advanced installation instructions, see :ref:`otel-install-k8s`. 

This includes details about:

* :ref:`helm-chart-components`
* :ref:`Setting the destination for the Collector <collector-k8s-destination>` to Splunk Enterprise or Splunk Cloud (``splunkPlatform``) or Splunk Observability Cloud (``splunkObservability``), including information about HEC endpoints
* :ref:`YAML manifests <resource-yaml-manifests>`
* :ref:`Configuring the Kubernetes distribution <otel-kubernetes-config-distro>`
* :ref:`Configuring the Kubernetes environment <otel-kubernetes-config-environment>`

Check your access tokens
----------------------------------

Access tokens are organization-level tokens that, by default, are valid for one year. For access tokens created prior to February 28, 2022, the expiration date remains 5 years from the creation date. 

You must use an org token to authenticate emitters that send data points to Splunk Observability Cloud. You can use an org token in long-running scripts that call the API. 

For more information, see :ref:`admin-org-tokens`.

Learn more
=================

- :ref:`collector-kubernetes-intro`.
- See how to send Kubernetes logs and events in :ref:`otel-kubernetes-config-logs`.
- Troubleshoot Collector issues. See :ref:`otel-troubleshooting`.
- Troubleshoot Kubernetes and container issues. See :ref:`tshoot-k8s-container-runtimes`.
- For a list of host and application monitors, see :ref:`monitor-data-sources`.

