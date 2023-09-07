.. _k8s-quickstart-guide:

*********************************************************************************************
Quickstart guide: monitor your Kubernetes environment with Splunk Observability Cloud
*********************************************************************************************

This quick start tutorial walks you through the following steps to start monitoring your Kubernetes platform using :ref:`get-started-infrastructure` and related features in under 20 minutes!

:strong:`Step 1`: Install the Splunk Distribution of OpenTelemetry Collector for Kubernetes  (5 minutes)

:strong:`Step 2`: :ref:`navigators-imqs` your Kubernetes cluster using out-of-the-box navigators. (10 minutes)

For example, you can access this Hosts navigator to monitor all hosts where you’ve installed the Splunk Distribution of OpenTelemetry Collector

:strong:`Step 3`: :ref:`alerts-imqs` that help you stay informed about the condition of your infrastructure. (2 minutes)

.. _install-collector-for-k8s:

Install the Collector and get Kubernetes data into Splunk Observability Cloud
======================================================================================

In this step, you’ll install the Splunk Distribution of OpenTelemetry Collector in a Kubernetes cluster to start getting platform infrastructure data into Splunk Observability Cloud.
After this data starts flowing into Splunk Observability Cloud, you can:

* :ref:`navigators-imqs`
* :ref:`alerts-imqs`

Prerequisites
---------------------------------------

* You must be an administrator in Splunk Observability Cloud.
* You must have an access token for the Splunk Observability Cloud organization you want to get data into. If you are using a free trial account, an access token named Default has already been created for you and you can use it to complete this task. 
  For more details about creating organization access tokens, see :ref:`admin-org-tokens`.
* You must also have systemd and cURL installed.
