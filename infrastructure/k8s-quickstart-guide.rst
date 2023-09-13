.. _k8s-quickstart-guide:

*********************************************************************************************
Quickstart guide: monitor your Kubernetes environment with Splunk Observability Cloud
*********************************************************************************************

This quick start tutorial walks you through the following steps to start monitoring your Kubernetes platform using :ref:`Splunk Observability Cloud <get-started-infrastructure>` and related features in under 20 minutes.

:strong:`Step 1`: Install the Splunk Distribution of OpenTelemetry Collector for Kubernetes 

:strong:`Step 2`: :ref:`Monitor <navigators-imqs>` your Kubernetes cluster using out-of-the-box navigators.

:strong:`Step 3`: :ref:`Activate an out-of-the-box detector to issue alerts <alerts-imqs>` that help you stay informed about the condition of your infrastructure.

.. _install-collector-for-k8s:

Step 1: Install the Collector and get Kubernetes data into Splunk Observability Cloud
======================================================================================

Install the Splunk Distribution of OpenTelemetry Collector in a Kubernetes cluster to start getting platform infrastructure data into Splunk Observability Cloud.
After this data starts flowing into Splunk Observability Cloud, you can:

* :ref:`Monitor your platform infrastructure data using navigators <navigators-imqs>`
* :ref:`Activate an out-of-the-box detector to issue alerts <alerts-imqs>` about specific conditions in your data

Prerequisites
---------------------------------------

* You must be an administrator in Splunk Observability Cloud.
* You must have an access token for the Splunk Observability Cloud organization you want to get data into. If you are using a free trial account, an access token named Default has already been created for you and you can use it to complete this task. 
  For more details about creating organization access tokens, see :ref:`admin-org-tokens`.
* You must have systemd and cURL installed.

.. note::
    
    To help ensure a seamless flow from this task to :ref:`monitor-k8s-cluster`, make sure that your infrastructure host or cluster is generating data that can be received by Splunk Observability Cloud. 
    For example, even if a guided setup you use in this task provides a confirmation of a valid connection, the navigators won’t display unless your infrastructure is actively sending data to Splunk Infrastructure Monitoring.

.. _get-k8s-data-in:

To get Kubernetes data into Splunk Observability Cloud:
-----------------------------------------------------------

1. Log in to Splunk Observability Cloud
2. Select the :guilabel:`Add Integration` button or, in the left navigation menu, select :guilabel:`Data Management` to open the Integrate Your Data page.
3. In the :guilabel:`Splunk OpenTelemetry Collector` menu, select the :guilabel:`Kubernetes` button to launch the quick install wizard.

.. image:: /_images/gdi/k8s-setup-wizard.png
  :width: 80%
  :alt: Installation setup wizard for the OpenTelemetry Collector for Kubernetes.

4. Select Kubernetes from the platform menu and enter the values applicable to your environment to configure the Collector instance.

.. list-table::
  :widths: 50 50
  :header-rows: 1

  * - Field
    - Description
  * - Mode
    - Select the deployment mode for your Collector instance.
  * - Environment
    - Name of the environment that you're deploying the Collector in.
  * - Cluster name
    - Enter a name that allows you to uniquely identify your Kubernetes cluster in Spunk Observability Cloud. This name should correspond to the 
      name of the cluster in which you're installing the Splunk Distribution of the OpenTelemetry Collector.
  * - Provider
    - Select the location of the Kubernetes cluster where you are installing the Splunk Distribution of the OpenTelemetry Collector:
      * Amazon Web Services
      * Microsoft Azure
      * Google Cloud Platform
      * Other
  * - Distribution
    - Select the Kubernetes distribution you're running from the drop-down menu, or :guilabel:`Other` if your distribution is not listed.
  * - Log Collection
    - NBED
  * - Auto Instrumentation
    - NBED
  * - Profiling
    - Activate or deactivate profiling. See more at NBED.
  * - Splunk Access Token
    - Select the access token you want to use to authenticate the connection between Splunk Observability Cloud and your infrastructure platform. 

5. Select :guilabel:`Next`. The Install Integration screen displays. Based on your entries on the Configure Integration screen, the guided setup provides commands that you can copy and paste to 
install the Splunk Distribution of OpenTelemetry Collector on your selected platform.

.. _monitor-k8s-cluster:

Step 2: Monitor your Kubernetes cluster and your Cloud infrastructure
========================================================================

Now that you have data about your infrastructure, such as platform hosts, Kubernetes clusters, and cloud provider services, flowing into Splunk Observability Cloud, 
you can use default navigators to explore your data.

Prerequisites
-----------------------

Navigators appear only if Splunk Infrastructure Monitoring is receiving data from your source.

For example, even if a guided setup you used in :ref:`install-collector-for-k8s` or :ref:`monitor-k8s-cluster` provided confirmation of a valid connection, the navigators don’t display unless your host, Kubernetes cluster, or cloud provider service is actively sending data to Splunk Infrastructure Monitoring.

If you don’t see a navigator after 15 minutes of making a valid connection, check your source to ensure that it is generating data. For example, ensure that your host, cluster, or service is being used in a way that generates data that it can send to Splunk Infrastructure Monitoring.

Tips for working with navigators
----------------------------------------------------------------

Navigators are primarily composed of charts.

Using charts, you can view details about your metrics and visualize metric time series. 

* Hover over a chart to see details about specific metric time series.
* Select within a chart to see the data table for a given time period.
* Select a chart title in the top left of a chart to display the full chart along with more chart options, such as a plot editor and the ability to change the chart’s visualization type to area, column, or histogram, for example.

.. image:: /_images/gdi/k8s-dashboard.gif
  :width: 80% 
  :alt: The user selecting the title of a chart, displaying a full chart along with additional chart options.

* Every chart has a :guilabel:`Chart Actions` menu. Select the |more| icon in the upper right of a chart to open the menu and view available actions. For example, you can share the chart, download it as an image, or export it as a comma-separated values (CSV) file.

.. image:: /_images/gdi/k8s-chart-actions.png
  :width: 80%
  :alt: The chart actions menu.

For more details about using navigators, see :ref:`Use navigators in Splunk Infrastructure Monitoring <use-navigators-imm>`.

For more details about working with charts, see :ref:`Charts in Splunk Observability Cloud <data-visualization-charts>`.

Monitor Kubernetes clusters using the Kubernetes navigator
----------------------------------------------------------------

After installing the Collector, explore your cluster's data using the Kubernetes navigator.

1. Log in to Splunk Observability Cloud.
2. In the left navigation menu, select :guilabel:`Infrastructure`.
3. In the :guilabel:`Containers` section, select :guilabel:`Kubernetes`. The Kubernetes navigator displays.

.. image:: /_images/gdi/k8s-containers.gif
  :width: 80%
  :alt: A user selects the Kubernetes navigator, allowing them to view the status of each Kubernetes container.

To filter the data shown in the navigator to a specific cluster, such as the one you installed the Splunk Distribution of OpenTelemetry Collector in, set the :guilabel:`Cluster` value to the cluster name you provided in :ref:`gdi-infrastructure-imqs`.

For more details about the data displayed in the Kubernetes navigator, see :ref:`Use the Kubernetes navigator <use-the-k8s-navigator>`.

Splunk Observability Cloud also provides :ref:`built-in (out of the box) dashboards <dashboards>` that you can use to explore your Kubernetes data. To access these dashboards, open the navigation :guilabel:`Menu` and select :guilabel:`Dashboards`. The Dashboards page displays. Search for :guilabel:`Kubernetes`. The :guilabel:`Kubernetes` dashboard group displays. Select a link to access a relevant dashboard.

To narrow the scope of the data shown in the navigator, such as to only the data received from the connection you made, select :guilabel:`Add Filter` and select a key and value that uniquely identify your connection. For example, you can select :guilabel:`subscription_id = <your subscription ID>`, where the subscription ID value is the one associated with a subscription you provided in :ref:`gdi-infrastructure-imqs`. Select :guilabel:`Apply Filter`.

Splunk Observability Cloud also provides :ref:`built-in (out of the box) dashboards <dashboards>` that you can use to explore your Microsoft Azure data. To access these dashboards, open the navigation Menu and select Dashboards. The Dashboards page displays. Search for Azure. Several Microsoft Azure dashboard groups display. Select a link to access a relevant dashboard.

.. _activate-ootb-detector:

Step 3: Activate a detector to issue alerts
==================================================================================

Now that you have data flowing into Splunk Observability Cloud and you can explore that data using navigators and dashboards, you can set up an alert that can help keep you informed about certain conditions in your data.

To create an alert, you first create a detector that monitors data for conditions you want to be alerted about. When a condition you want to be alerted about is met, the detector issues an alert.

This task describes how to create a detector directly from a chart in a navigator or dashboard covered in :ref:`Step 3: Monitor your platform and cloud infrastructure <navigators-imqs>`.

1. Access the chart you want to create a detector from. This example creates a detector based on the :guilabel:`Memory Used %` chart in the :ref:`Monitor Windows Server and Linux hosts using the Hosts navigator <host-navigator-imqs>`.
2. Select the :guilabel:`Get Alerts` icon in the upper right of a chart. For some chart data, there are built-in templates that make it easy for you create detectors for useful alert conditions. For example, for the :guilabel:`Memory Used %` chart, we provide a :guilabel:`Memory utilization % greater than historical norm` detector template.

.. image:: /_images/gdi/k8s-new-detector.png
  :width: 80%
  :alt: A user creates a new detector from a chart.

This detector sends an alert when memory usage for the last 10 minutes was significantly higher than normal, as compared to the last 24 hours.

3. The :guilabel:`New Detector` panel displays. Select :guilabel:`Add Recipients` to add an email, :ref:`Splunk Observability Cloud team <admin-manage-teams>`, or :ref:`webhook <webhook>` that you want to receive the alert.

.. image:: /_images/gdi/k8s-activate-detector.png
  :width: 80%
  :alt: A screen shows a summary of the new detector and alert condition.

4. Select :guilabel:`Activate`. When the data condition is met, Splunk Observability Cloud sends a notification to designated recipients and displays alerts on the Alerts page.

.. image:: /_images/gdi/k8s-alert.png
  :width: 70% 
  :alt: An alert that the new detector triggered.

For more details about alerts and detectors, see :ref:`Introduction to alerts and detectors in Splunk Observability Cloud <get-started-detectoralert>`.

.. _k8s-next-steps:

Next steps
=============================

* To create your own dashboards and share them with your team, see :ref:`Create and customize dashboards <dashboard-create-customize>` and :ref:`Best practices for creating dashboards <dashboards-best-practices>` in Splunk Observability Cloud.
* Use :ref:`Related Content <get-started-relatedcontent>` to jump between components of Splunk Observability Cloud by selecting related data.
* [ADD MPM]
* Now that you have infrastructure data flowing into Splunk Observability Cloud, consider :ref:`instrumenting an application <get-started-application>` to send spans and traces to :ref:`Splunk Application Performance Monitoring (APM) <get-started-apm>`, where you can access dashboards like this one for your services and business workflows.
  Splunk Observability Cloud provides tools that help you instrument applications written in Java, .NET, Node.js, Python, Ruby, and PHP.

.. image:: /_images/gdi/instrumenting-preview.png
  :width: 80%
  :alt: A Splunk APM dashboard that displays data gathered by instrumenting back-end applications.


* Explore :ref:`even more data sources <supported-data-sources>` that you can monitor using Splunk Observability Cloud, such as Apache Zookeeper, Cassandra, Docker, Heroku, Jenkins, and Redis.
* To coordinate team efforts in Splunk Observability Cloud, see :ref:`Create and manage teams in Splunk Observability Cloud <admin-manage-teams>`.
  
.. image:: /_images/gdi/dashboard-group-preview.png
  :width: 80%
  :alt: A landing page that displays a team's dashboards.