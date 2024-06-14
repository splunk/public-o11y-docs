.. _monitor-k8s-cluster:

***************************************
Part 2: Monitor your Kubernetes cluster
***************************************

Now that you have Kubernetes cluster data flowing into Splunk Observability Cloud, 
you can use built-in navigators to explore your data. For an overview of the tutorial, see :ref:`about-k8s-tutorial`.

.. note::

   Navigators appear only if Splunk Infrastructure Monitoring is receiving data from your source.

   For example, even if the guided setup that you used in :ref:`install-otel-k8s` provided confirmation of a valid connection, the navigators don’t display unless your host, Kubernetes cluster, or cloud provider service is actively sending data to Splunk Infrastructure Monitoring.

   If you don’t see a navigator after 15 minutes of making a valid connection, check your source to verify that it is generating data. For example, verify that your host, cluster, or service generates data that it can send to Splunk Infrastructure Monitoring.

Monitor Kubernetes clusters using the Kubernetes navigator
----------------------------------------------------------

After installing the Splunk Distribution of OpenTelemetry Collector, explore your cluster's data using the Kubernetes navigator.

#. Log in to Splunk Observability Cloud.
#. In the left-side navigation menu, select :guilabel:`Infrastructure`.
#. In the :guilabel:`Containers` section, select :guilabel:`Kubernetes`. 
#. Select a Kubernetes service, such as :guilabel:`Kubernetes nodes`. The Kubernetes navigator displays.

.. note::

   By default, Kubernetes clusters are separated by service. To see a map of all Kubernetes clusters, select :guilabel:`Switch to classic navigator`.

.. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-containers.gif
   :width: 80%
   :alt: A user selects the Kubernetes navigator, allowing them to view the status of each Kubernetes container.

To filter the data shown in the navigator to a specific cluster, such as the one in which you installed the Splunk Distribution of OpenTelemetry Collector, set the :guilabel:`Cluster` value to the cluster name you provided.

Explore Kubernetes data using built-in dashboards
-----------------------------------------------------

Splunk Observability Cloud also provides built-in dashboards that you can use to explore your Kubernetes data. To see which built-in dashboards are available, refer to :ref:`dashboards`. 

To access the built-in dashboards, follow these steps: 

#. Open the navigation :guilabel:`Menu` and select :guilabel:`Dashboards`. The Dashboards page displays. 
#. Search for :guilabel:`Kubernetes`. The :guilabel:`Kubernetes` dashboard group displays. 
#. Select a link to access a relevant dashboard.

Narrow the scope of data in the Kubernetes navigator
------------------------------------------------------

To narrow the scope of the data shown in the navigator, such as to show only the data received from the connection you made, follow these steps: 

#. Select :guilabel:`Add Filter` and select a key and value that uniquely identifies your connection. For example, you can select :guilabel:`subscription_id = <your subscription ID>`, where the subscription ID value is the one associated with a subscription you provided.
#. Select :guilabel:`Apply Filter`.

Tips for working with navigators
--------------------------------

Navigators are primarily composed of charts. Using charts, you can view details about your metrics and visualize metric time series. 

* Hover over a chart to see details about specific metric time series.
* Select within a chart to see the data table for a given time period.
* Select a chart title in the top left of a chart to display the full chart along with more chart options, such as a plot editor and the ability to change the chart’s visualization type to area, column, or histogram.
* Every chart has a :guilabel:`Chart Actions` menu. Select the more (|more|) icon in the upper right of a chart to open the menu and view available actions. For example, you can share the chart, download it as an image, or export it as a comma-separated values (CSV) file.

.. image:: /_images/infrastructure/images-k8s-infrastructure-tutorial/k8s-chart-actions.png
  :width: 80%
  :alt: The chart actions menu.

Next step
---------

This completes the second part of the tutorial. You've learned how to use built-in navigators to explore your data.

Next, learn how to create a built-in detector to alert you about your Kubernetes data. To continue, see :ref:`activate-builtin-detector`.

Learn more
----------

* For more details about using navigators in general, see :ref:`Use navigators in Splunk Infrastructure Monitoring <use-navigators-imm>`.
* For more details about the data displayed in the Kubernetes navigator, see :ref:`Use the Kubernetes navigator <use-the-k8s-navigator>`.
* For more details about working with charts, see :ref:`Charts in Splunk Observability Cloud <data-visualization-charts>`.