.. _k8s-quickstart-guide:

*********************************************************************************************
Quickstart guide: monitor your Kubernetes environment with Splunk Observability Cloud
*********************************************************************************************

This quick start tutorial walks you through the following steps to start monitoring your Kubernetes platform using :ref:`Splunk Observability Cloud <get-started-infrastructure>` and related features in under 20 minutes!

:strong:`Step 1`: Install the Splunk Distribution of OpenTelemetry Collector for Kubernetes  (5 minutes)

:strong:`Step 2`: :ref:`Monitor <navigators-imqs>` your Kubernetes cluster using out-of-the-box navigators. (10 minutes)

For example, you can access this Hosts navigator to monitor all hosts where you’ve installed the Splunk Distribution of OpenTelemetry Collector

:strong:`Step 3`: :ref:`Activate an out-of-the-box detector to issue alerts <alerts-imqs>` that help you stay informed about the condition of your infrastructure. (2 minutes)

.. _install-collector-for-k8s:

Install the Collector and get Kubernetes data into Splunk Observability Cloud
======================================================================================

In this step, you’ll install the Splunk Distribution of OpenTelemetry Collector in a Kubernetes cluster to start getting platform infrastructure data into Splunk Observability Cloud.
After this data starts flowing into Splunk Observability Cloud, you can:

* :ref:`Monitor your platform infrastructure data using navigators <navigators-imqs>`
* :ref:`Activate an out-of-the-box detector to issue alerts <alerts-imqs>'` about specific conditions in your data

Prerequisites
---------------------------------------

* You must be an administrator in Splunk Observability Cloud.
* You must have an access token for the Splunk Observability Cloud organization you want to get data into. If you are using a free trial account, an access token named Default has already been created for you and you can use it to complete this task. 
  For more details about creating organization access tokens, see :ref:`admin-org-tokens`.
* You must have systemd and cURL installed.

.. note::
    
    To help ensure a seamless flow from this task to Step 2: Monitor your platform and cloud infrastructure, make sure that your infrastructure host or cluster is generating data that can be received by Splunk Observability Cloud. 
    For example, even if a guided setup you use in this task provides a confirmation of a valid connection, the navigators won’t display unless your infrastructure is actively sending data to Splunk Infrastructure Monitoring.

.. _get-k8s-data-in:

To get Kubernetes data into Splunk Observability Cloud:
-----------------------------------------------------------

1. Log in to Splunk Observability Cloud
2. Select the :guilabel:`Add Integration` button or, in the left navigation menu, select :guilabel:`Data Management` to open the Integrate Your Data page.
3. In the :guilabel:`Splunk OpenTelemetry Collector` menu, select the :guilabel:`Kubernetes` button to launch the quick install wizard.

