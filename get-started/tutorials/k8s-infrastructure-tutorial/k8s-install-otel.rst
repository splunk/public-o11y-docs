.. _install-otel-k8s:

********************************************************************************************
Install the Collector and get Kubernetes data into Splunk Observability Cloud
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
2. Select the :guilabel:`Add Integration` button or in the left navigation menu, select :guilabel:`Data Management`. 
3. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.
4. Select :guilabel:`Deploy the Splunk OpenTelemetry Collector`, and select :guilabel:`Next`. The Install Configuration screen displays.
5. In the :guilabel:`Platform` menu, select :guilabel:`Kubernetes`. The setup guide opens.

6. Enter the values applicable to your environment to configure the Collector instance.

.. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-setup-wizard-new.png
  :width: 80%
  :alt: Installation setup guide for the OpenTelemetry Collector for Kubernetes.

6. Select :guilabel:`Next`. The Installation Instructions screen displays. Based on your entries in the Configure Integration screen, the guided setup provides commands that you can copy and paste to 
install the Splunk Distribution of OpenTelemetry Collector on your selected platform.

.. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-integration-commands.png
  :width: 100%
  :alt: Command lines for installing the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

7. Start your Kubernetes cluster, and use the commands from the Configure Integration to deploy the Splunk Distribution of OpenTelemetry Collector. The following image shows a successful installation of the Collector:

.. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-install-collector.png
  :width: 100%
  :alt: Collector installation in the CLI.

8. Once you have deployed the Collector, return to the Configure Integration screen and select :guilabel:`Next`. The Review Inventory screen shows a summary of your Kubernetes data.

.. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-data-ingestion.png
  :width: 100%
  :alt: Successful Kubernetes data ingestion.

9. (Optional) Select :guilabel:`Explore Metric Data` to further interact with your data.

Next step
-------------------------------------------

This completes the first step of the tutorial.

To learn how to monitor your Kubernetes data using built-in dashboards and navigators, continue to :ref:`monitor-k8s-cluster`.