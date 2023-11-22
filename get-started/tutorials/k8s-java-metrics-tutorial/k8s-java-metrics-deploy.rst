.. _k8s-java-metrics-deploy:

*************************************************************************
Deploy the Splunk Distribution of OpenTelemetry Collector Java
*************************************************************************

To capture Java application metrics from your Kubernetes environment, deploy the Splunk Distribution of OpenTelemetry Collector Java.

.. _k8s-java-metrics-prereqs:

Prerequisites
=========================================

* You must be an administrator in Splunk Observability Cloud.
* You must have an access token for the Splunk Observability Cloud organization you want to get data into. If you are using a free trial account, you can use the :guilabel:`Default` access token to complete this task. 
  For more details about creating organization access tokens, see :ref:`admin-org-tokens`.
* You must have systemd and cURL installed.
* You must have a running Kubernetes cluster.
* You must have Java version 11 or higher and a running Java application.

.. _deploy-otel-java:

Deploy the Collector and get Java metrics into Splunk Observability Cloud
==================================================================================

Install the Splunk Distribution of OpenTelemetry Collector Java in a Kubernetes cluster to start getting Java application metrics into Splunk Observability Cloud.

.. note::
    To ensure a seamless flow from this task to <next task>, make sure that your Java application is generating metrics that Splunk Observability Cloud can receive. Even if a guided setup you used in this task provides a valid connection, your metrics won't appear in Splunk Observability Cloud unless your application is actively generating them.

Deploy the Collector and instrument your Java application
----------------------------------------------------------------

To deploy the Collector for Java, follow these steps:

#. Log in to Splunk Observability Cloud.
#. Select the :guilabel:`Add Integration` button or in the left navigation menu, select :guilabel:`Data Management` to open the Integrate Your Data page.
#. In the Integrate your Data page, select :guilabel:`Monitor applications`.
#. Select the :guilabel:`Java (OpenTelemetry)` tile. The OpenTelemetry Java installation page opens.
#. Select :guilabel:`Next`. The setup guide opens.

.. image:: /_images/get-started/k8s-java-metrics-tutorial/otel-java-setup.png
    :width: 100%

#. In the :guilabel:`Kubernetes` field, select :guilabel:`Yes`. For all other fields, enter the values applicable to your environment. 

#. Select :guilabel:`Next`. The Installation Instructions screen displays. Based on your entries in the Configure Integration screen, the guided setup provides commands that you can copy and paste to 
install the Splunk Distribution of OpenTelemetry Collector on your selected platform. 

#. Start your Kubernetes cluster, and use the commands from the Configure Integration to deploy the Java agent. The following image shows a successful installation of the Java agent:

.. temporary image. In final version, blur out the name and serial number

.. image:: /_images/get-started/k8s-java-metrics-tutorial/java-otel-installation.png

#. Modify your Kubernetes deployment file to configure the Java agent. 

#. Once you have deployed the Java agent, return to the Configure Integration screen and select :guilabel:`Next`. The Review Inventory screen shows a summary of your Java application data.








