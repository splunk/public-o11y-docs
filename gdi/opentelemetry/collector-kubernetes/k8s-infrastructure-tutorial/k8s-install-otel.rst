.. _install-otel-k8s:

*************************************************************************************
Part 1: Install the Collector and get Kubernetes data into Splunk Observability Cloud
*************************************************************************************

Before deploying the OpenTelemetry Collector, you must have a running Kubernetes cluster. For an overview of the tutorial, see :ref:`about-k8s-tutorial`.

.. note::
    
    To ensure a seamless flow from this task to :ref:`monitor-k8s-cluster`, make sure that your infrastructure host or cluster is generating data that Splunk Observability Cloud can receive. 
    For example, even if the guided setup you use in this tutorial provides confirmation of a valid connection, the navigators don't appear unless your infrastructure is actively sending data to Splunk Infrastructure Monitoring.

.. _get-k8s-data-in:

Get Kubernetes data into Splunk Observability Cloud
---------------------------------------------------

#. Log in to Splunk Observability Cloud.
#. Select the :guilabel:`Add Integration` button or, in the left navigation menu, select :guilabel:`Data Management` to open the :strong:`Integrate Your Data` page.
#. Select :guilabel:`Deploy the Splunk OpenTelemetry Collector`, and select :guilabel:`Next`. The Install Configuration screen displays.
#. In the :guilabel:`Platform` menu, select :guilabel:`Kubernetes`. The setup guide opens.
#. Enter the values applicable to your environment to configure the Collector instance.

   .. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-setup-wizard-new.png
      :width: 80%
      :alt: Installation setup guide for the OpenTelemetry Collector for Kubernetes.

#. Select :guilabel:`Next`. The Installation Instructions screen displays. Based on your entries in the Configure Integration screen, the guided setup provides commands that you can copy and paste to install the Splunk Distribution of OpenTelemetry Collector on your selected platform.

   .. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-integration-commands.png
      :width: 100%
      :alt: Command lines for installing the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

#. Start your Kubernetes cluster, and use the commands from the Configure Integration screen to deploy the Splunk Distribution of OpenTelemetry Collector. The following image shows a successful installation of the Collector:

   .. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-install-collector.png
      :width: 100%
      :alt: Collector installation in the CLI.

#. Once you have deployed the Collector, return to the Configure Integration screen and select :guilabel:`Next`. The Review Inventory screen shows a summary of your Kubernetes data.

   .. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-data-ingestion.png
      :width: 100%
      :alt: Successful Kubernetes data ingestion.

#. (Optional) Select :guilabel:`Explore Metric Data` to further interact with your data.

Next step
---------

This completes the first part of the tutorial. You've deployed the Collector onto your Kubernetes cluster and confirmed that data is flowing into Splunk Observability Cloud.

Next, learn how to monitor your Kubernetes data using built-in dashboards and navigators. To continue, see :ref:`monitor-k8s-cluster`.