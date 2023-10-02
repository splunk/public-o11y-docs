.. _install-otel-k8s:

********************************************************************************************
Step 1: Install the Collector and get Kubernetes data into Splunk Observability Cloud
********************************************************************************************

.. meta::
    :description: Learn how to install the Splunk Distribution of OpenTelemetry Collector for Kubernetes and get Kubernetes data into Splunk Observability Cloud. 

Install the Splunk Distribution of OpenTelemetry Collector in a Kubernetes cluster to start getting platform infrastructure data into Splunk Observability Cloud.
After this data starts flowing into Splunk Observability Cloud, you can take these actions:

* Monitor your platform infrastructure data using navigators.
* Activate a built-in detector to issue alerts about specific conditions in your data.

.. note::
    
    To ensure a seamless flow from this task to :ref:`monitor-k8s-cluster`, make sure that your infrastructure host or cluster is generating data that Splunk Observability Cloud can receive. 
    For example, even if a guided setup you use in this task provides a confirmation of a valid connection, the navigators don't appear unless your infrastructure is actively sending data to Splunk Infrastructure Monitoring.

.. _get-k8s-data-in:

Get Kubernetes data into Splunk Observability Cloud
-----------------------------------------------------------

1. Log in to Splunk Observability Cloud.
2. Select the :guilabel:`Add Integration` button or in the left navigation menu, select :guilabel:`Data Management` to open the Integrate Your Data page.
3. In the :guilabel:`Splunk OpenTelemetry Collector` menu, select the :guilabel:`Kubernetes` button to launch the quick install setup.

4. Select :guilabel:`Kubernetes` from the platform menu and enter the values applicable to your environment to configure the Collector instance.

.. image:: /_images/gdi/k8s-setup-wizard.png
  :width: 80%
  :alt: Installation setup wizard for the OpenTelemetry Collector for Kubernetes.

5. Select :guilabel:`Next`. The Install Integration screen displays. Based on your entries on the Configure Integration screen, the guided setup provides commands that you can copy and paste to 
install the Splunk Distribution of OpenTelemetry Collector on your selected platform.

Next step
-------------------------------------------

This completes the first step of the tutorial.

To learn how to monitor your Kubernetes data using built-in dashboards and navigators, continue to :ref:`monitor-k8s-cluster`.