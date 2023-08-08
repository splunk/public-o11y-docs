.. _quickstart-imm:

************************************************************
Quick start tutorial for Splunk Infrastructure Monitoring
************************************************************

.. meta::
   :description: This topic provides an onboarding tutorial that quickly and visually walks you through completing the most basic and common steps required to start seeing what Splunk Infrastructure Monitoring, navigators, dashboards, detectors, and alerts can do to help you understand and act on important signals in your platform and cloud infrastructure data. Having walked through this tutorial, we hope that you can feel confident in moving forward with more in-depth configuration and use of the product.

This quick start tutorial walks you through the following steps to start monitoring your platform and cloud infrastructure using :new-page-ref:`Splunk Infrastructure Monitoring <get-started-infrastructure>` and related features.

:strong:`Step 1`: :ref:`Start getting platform infrastructure data into Splunk Observability Cloud <gdi-infrastructure-imqs>` by installing the Splunk Distribution of OpenTelemetry Collector on a Windows Server or Linux host or in a Kubernetes cluster. (5 minutes)

:strong:`Step 2`: :ref:`Start getting cloud provider data into Splunk Observability Cloud <gdi-cloud-imqs>` by connecting to a cloud provider, such as Amazon Web Services, Google Cloud Platform, or Microsoft Azure. (15 minutes)

:strong:`Step 3`: :ref:`Monitor your platform and cloud infrastructure <navigators-imqs>` using out-of-the-box navigators. (10 minutes)

    For example, you can access this Hosts navigator to monitor all hosts where you've installed the Splunk Distribution of OpenTelemetry Collector, including Windows Server and Linux hosts.

      .. image:: /_images/infrastructure/hosts-navigator.png
        :width: 100%
        :alt: This screenshot shows the Hosts navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from hosts.

    |

    You can also access navigators that enable you to monitor your cloud provider services, like this one for Amazon Web Services Elastic Block Storage (EBS):

      .. image:: /_images/infrastructure/ebs-navigator.png
        :width: 100%
        :alt: This screenshot shows the EBS navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from EBS.

    |

:strong:`Step 4`: :ref:`Activate an out-of-the-box detector to issue alerts <alerts-imqs>` that help you stay informed about the condition of your infrastructure. (2 minutes)

    .. image:: /_images/infrastructure/alerts-page.png
      :width: 100%
      :alt: This screenshot show the Alerts page focusing on a critical alert.

    |

.. _gdi-infrastructure-imqs:

Step 1. Get platform infrastructure data into Splunk Observability Cloud
===========================================================================

This task describes how to install the Splunk Distribution of OpenTelemetry Collector on Windows Server or Linux or in a Kubernetes cluster to start getting platform infrastructure data into Splunk Observability Cloud.

After this data starts flowing into Splunk Observability Cloud, you can:

- :ref:`Monitor your platform infrastructure data using navigators <navigators-imqs>`

- :ref:`Activate an out-of-the-box detector to issue alerts <alerts-imqs>` about specific conditions in your data


Prerequisites
----------------------

- You must be an administrator in Splunk Observability Cloud.

- You must have an access token for the Splunk Observability Cloud organization you want to get data into. If you are using a free trial account, an access token named :strong:`Default` has already been created for you and you can use it to complete this task. For more details about creating organization access tokens, see :new-page-ref:`admin-org-tokens`.

- If you want to monitor Windows Server, you must be an administrator on the host and running one of the following versions:

  - Windows Server 2012 64-bit

  - Windows Server 2016 64-bit

  - Windows Server 2019 64-bit

- If you want to monitor Linux, you must be an administrator on the host and running one of the following versions:

  - Amazon Linux 2

  - CentOS/Red Hat/Oracle 7 or 8

  - Debian 8, 9, or 10

  - Ubuntu 16.04, 18.04, or 20.04

  You must also have systemd and cURL installed.

- If you want to monitor Kubernetes, you must be an administrator of the cluster and have the Helm 3.0 client installed and configured.

.. note:: To help ensure a seamless flow from this task to :ref:`navigators-imqs`, make sure that your infrastructure host or cluster is generating data that can be received by Splunk Observability Cloud. For example, even if a guided setup you use in this task provides a confirmation of a valid connection, the navigators won't display unless your infrastructure is actively sending data to Splunk Infrastructure Monitoring.


To get platform infrastructure data into Splunk Observability Cloud:
----------------------------------------------------------------------------------------

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.

#. Select the tile for the platform you want to get data in from:

    - :strong:`Kubernetes`
    - :strong:`Linux`
    - :strong:`Windows`

#. The access screen for your selected guided setup displays. For example, here is the access screen for the Linux guided setup. Select :strong:`Add Connection`.

    .. image:: /_images/infrastructure/linux-wizard-access.png
      :width: 90%
      :alt: This screenshot shows a screen that provides access to the Linux guided setup. The focus is on the Add Connection button, which launches the platform guided setup.

    |

#. The Configure Integration screen displays. Enter the values applicable to your platform:

    .. list-table::
        :widths: 25 25 50
        :header-rows: 1

        * - Field
          - Platform
          - Description

        * - :strong:`Access Token`
          - * Kubernetes
            * Linux
            * Windows Server
          - Select the access token you want to use to authenticate the connection between Splunk Observability Cloud and your infrastructure platform.

            If you are using a free trial account, an access token named :strong:`Default` has already been created for you and you can use it to complete this task.

            For information about creating access tokens, see :new-page-ref:`admin-org-tokens`.

        * - :strong:`Mode`
          - * Linux
            * Windows Server
          - Select the mode you want to run the Splunk Distribution of OpenTelemetry Collector in.

            * Select :strong:`Agent` if you want to run the Splunk Distribution of OpenTelemetry Collector with the application or on the same host as the application you want to instrument and monitor. This is the most common scenario.

            * Select :strong:`Gateway` if you want to run the Splunk Distribution of OpenTelemetry Collector as a standalone service in a container or as a separate deployment. Typically, data forwarding (gateway) mode is deployed per cluster, data center, or region.

            * For more details, see :ref:`otel-deployment-mode`.
  
        * - :strong:`Log Collection`
          - * Kubernetes
            * Linux
            * Windows Server
          - This field applies only if you have purchased Splunk Log Observer and are running the Splunk Distribution of OpenTelemetry Collector in host monitoring (agent) mode.

            By default, Splunk Observability Cloud free trials do not include Splunk Log Observer. If you want to try out Splunk Log Observer, you can :new-page:`register for a free trial <https://www.splunk.com/en_us/form/log-observer-early-access-program.html>`.

            * Select :strong:`Yes` to enable the Splunk Distribution of OpenTelemetry Collector to collect logs from your infrastructure platform and send them to Splunk Log Observer.

            * Select :strong:`No` if you don't want to collect logs.

        * - :strong:`Cluster Name`
          - Kubernetes
          - Enter a name that enables you to uniquely identify your Kubernetes cluster in Splunk Observability Cloud. This name should correspond to the cluster where you are installing the Splunk Distribution of OpenTelemetry Collector.

            For example, in the :ref:`Kubernetes navigator <kubernetes-navigator-imqs>`, you can set the :strong:`Cluster` drop-down value to your cluster name to make the navigator display information about your cluster only.

        * - :strong:`Provider`
          - Kubernetes
          - Select the location of the Kubernetes cluster where you are installing the Splunk Distribution of OpenTelemetry Collector:

            * :strong:`Amazon Web Services`

            * :strong:`Microsoft Azure`

            * :strong:`Google Cloud Platform`

            * :strong:`Other`

        * - :strong:`Distribution`
          - Kubernetes
          - Select the Kubernetes distribution you are installing the Splunk Distribution of OpenTelemetry Collector in:

            * :strong:`Amazon EKS` (Elastic Kubernetes Service)

            * :strong:`Azure AKS` (Azure Kubernetes Service)

            * :strong:`Google GKE` (Google Kubernetes Engine)

            * :strong:`Other`

        * - :strong:`Add Gateway`
          - Kubernetes
          - When you install the Splunk Distribution of OpenTelemetry Collector for Kubernetes, it will automatically and always run in host monitoring (agent) mode.

            * Select :strong:`Yes` to deploy a gateway service, in addition to running the Splunk Distribution of OpenTelemetry Collector in host monitoring (agent) mode. With this configuration, collectors running in host monitoring (agent) mode can send data to the gateway and the gateway sends data to Splunk Observability Cloud. For more information on when to use data forwarding (gateway) mode, see :ref:`collector-gateway-mode`. Agents installed with this gateway (using the same Helm chart) are automatically configured to send data to this gateway.

              If you have any other Splunk Distribution of OpenTelemetry Collectors running in host monitoring (agent) mode in other clusters, you can manually configure them to point to this gateway.

            * Select :strong:`No` if you don't want to deploy a gateway service. For example, if you have an existing gateway running in your Kubernetes implementation, you don't need to deploy another. This option installs the Splunk Distribution of OpenTelemetry Collector running in host monitoring (agent) mode. If you have an existing gateway running, you can manually configure the Splunk Distribution of OpenTelemetry Collector installed by this task to point to that gateway.

            For more installation details, see :new-page-ref:`otel-install-k8s`.

#. Select :strong:`Next`. The Install Integration screen displays.

   Based on your entries on the Configure Integration screen, the guided setup provides commands that you can copy and paste to install the Splunk Distribution of OpenTelemetry Collector on your selected platform.

   For example, here is what a successful installation looks like for Windows Server in Windows Powershell:

    .. image:: /_images/infrastructure/windows-powershell-splunk-otel-connector-install-success.png
      :width: 100%
      :alt: Image of the Splunk Distribution of OpenTelemetry Collector installation success message in a Powershell window: The Splunk Distribution of OpenTelemetry Collector for Windows has been successfully installed.

#. For Windows Server and Linux, once your installation of the Splunk Distribution of OpenTelemetry Collector is complete, select :strong:`Done`. The Infrastructure page displays, where you can :ref:`monitor Windows Server and Linux host data using the Hosts navigator <host-navigator-imqs>`.

   For Kubernetes, select :strong:`Next`. The Review Inventory screen displays. On the :strong:`Log Events` tab, select :strong:`Explore Log Events` to view more details using :new-page-ref:`Splunk Log Observer <get-started-logs>`. This option applies only if you have access to Splunk Log Observer and set :strong:`Log Collection` to :strong:`Yes` earlier in this task. On the :strong:`Metric Data` tab, select :strong:`Explore Metric Data` to access the Kubernetes navigator, where you can :ref:`monitor Kubernetes cluster data <kubernetes-navigator-imqs>`.


.. _gdi-cloud-imqs:

Step 2. Get cloud infrastructure data into Splunk Observability Cloud
===========================================================================

This task describes how to connect to a cloud provider, such as Amazon Web Services, Google Cloud Platform, or Microsoft Azure, to start getting data about your cloud infrastructure into Splunk Observability Cloud.

After this data starts flowing into Splunk Observability Cloud, you can:

- :ref:`Monitor your cloud infrastructure data using navigators <navigators-imqs>`

- :ref:`Activate an out-of-the-box detector to issue alerts <alerts-imqs>`


Prerequisites
------------------------------------------------------------------------------

- You must be an administrator in Splunk Observability Cloud and in your cloud environment.

- If you are connecting to Amazon Web Services, you must have an access token for the Splunk Observability Cloud organization you want to get data into. If you are using a free trial account, an access token named :strong:`Default` has already been created for you and you can use it to complete this task. For more details about creating organization access tokens, see :new-page-ref:`admin-org-tokens`.

.. note:: To help ensure a seamless flow from this task to :ref:`navigators-imqs`, make sure that your cloud provider service is generating data that can be received by Splunk Observability Cloud. For example, even if a guided setup you use in this task provides a confirmation of a valid connection, the navigators won't display unless your cloud provider service is actively sending data to Splunk Infrastructure Monitoring.

To get cloud infrastructure data into Splunk Observability Cloud:
------------------------------------------------------------------------------

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.

#. In the integration filter menu, select :guilabel:`By Use Case`.

#. Select the :guilabel:`Monitor infrastructure` use case.

#. In the :guilabel:`Cloud Integrations` section, select the cloud provider you want to connect to Splunk Observability Cloud:

    - :strong:`Amazon Web Services`

    - :strong:`Google Cloud Platform`

    - :strong:`Microsoft Azure`

    The guided setup for your selected platform displays.

#. For Amazon Web Services, select :strong:`Add Connection`. For Google Cloud Platform and Microsoft Azure, select :strong:`Add Integration`. Follow the instructions in the guided setup for your selected platform to complete the connection.

   - For details about connecting Amazon Web Services, see :new-page-ref:`get-started-aws`.

   - For details about connecting Google Cloud Platform, see :new-page-ref:`get-started-gcp`.

   - For details about connecting Microsoft Azure, see :new-page-ref:`get-started-azure`.

#. After you successfully connect to your cloud provider, one of the following provider-specific screens displays.

   - After you successfully connect with Amazon Web Services, the Review Inventory screen displays.

     If you have access to Splunk Log Observer and selected :strong:`Cloudwatch Logs` on the Add Filters screen, the Log Events tab displays as follows. Select :strong:`Explore Log Events` to view more details using :new-page-ref:`Splunk Log Observer <get-started-logs>`.

     .. image:: /_images/infrastructure/aws-connection-review-inventory-log-events.png
       :width: 100%
       :alt: This screenshot shows the Log Events tab reflecting that data is being retrieved from Amazon Web Services: "It can take up to 15 minutes to gather initial log data from AWS. Once data begins flowing in, this screen will update to show a summary of your log data."

     |

     Select the :strong:`Metric Data` tab to see an overview of your Amazon Web Services infrastructure metrics. Select :strong:`Explore Metric Data` to :ref:`view more details using Splunk Infrastructure Monitoring navigators <navigators-imqs>`.

     .. image:: /_images/infrastructure/aws-connection-review-inventory-metric-data.png
       :width: 100%
       :alt: This screenshot shows the Metric Data tab reflecting metric data received from Amazon Web Services, including the data points/minute received, number of metric time series received, number of regions reporting, and number of services reporting.

     |

    - After you successfully connect with Google Cloud Platform, the GOOGLE CLOUD PLATFORM page displays a :strong:`Validated!` message for your connection.

      .. image:: /_images/infrastructure/gcp-connection-validated.gif
        :width: 100%
        :alt: This animated GIF shows a Google Cloud Platform connection being validated and ending with a "Validated!" message.

      |

      In :ref:`navigators-imqs`, we cover how to use Splunk Infrastructure Monitoring navigators to monitor your Google Cloud Platform services.

      |

    - After you successfully connect with Microsoft Azure, the MICROSOFT AZURE page displays a :strong:`Validated!` message for your connection.

      .. image:: /_images/infrastructure/azure-connection-validated.gif
        :width: 100%
        :alt: Animated GIF showing a Microsoft Azure connection being validated and ending with a "Validated!" status.

      |

      In :ref:`navigators-imqs`, we cover how to use Splunk Infrastructure Monitoring navigators to monitor your Microsoft Azure services.


.. _navigators-imqs:

Step 3: Monitor your platform and cloud infrastructure
================================================================================

Now that you have data about your infrastructure, such as platform hosts, Kubernetes clusters, and cloud provider services, flowing into Splunk Observability Cloud, you can use out-of-the-box navigators to explore your data.


Prerequisites
------------------------------------------------------------------------------

Navigators display only if Splunk Infrastructure Monitoring is receiving data from your source.

For example, even if a guided setup you used in :ref:`gdi-infrastructure-imqs` or :ref:`gdi-cloud-imqs` provided confirmation of a valid connection, the navigators don't display unless your host, Kubernetes cluster, or cloud provider service is actively sending data to Splunk Infrastructure Monitoring.

If you don't see a navigator after 15 minutes of making a valid connection, check your source to ensure that it is generating data. For example, ensure that your host, cluster, or service is being used in a way that generates data that it can send to Splunk Infrastructure Monitoring.


Tips for working with navigators
------------------------------------------------------------------------------

Navigators are primarily composed of charts.

- Hover over a chart to see details about specific metric time series.

- Select within a chart to see the data table for a given time period.

- Select a chart title in the top left of a chart to display the full chart along with more chart options, such as a plot editor and the ability to change the chart's visualization type to area, column, or histogram, for example.

  .. image:: /_images/infrastructure/elb-navigator-chart.gif
    :width: 100%
    :alt: This animated GIF shows hover and select actions on a chart to display metric time series, a data table, and full chart data.

  |

- Every chart has a :strong:`Chart Actions` menu. Select the more (|more|) icon in the upper right of a chart to open the menu and view available actions. For example, you can share the chart, download it as an image, or export it as a CSV (comma-separated values) file.

  .. image:: /_images/infrastructure/chart-actions.png
    :width: 70%
    :alt: This screenshot shows the Chart actions menu (|more|) displaying available options such as Share, Download Chart as Image, and Export Chart as CSV.

For more details about using navigators, see :new-page-ref:`use-navigators-imm`.

For more details about working with charts, see :new-page-ref:`data-visualization-charts`.


.. _host-navigator-imqs:

Monitor Windows Server and Linux hosts using the Hosts navigator
------------------------------------------------------------------------------

If you completed :ref:`gdi-infrastructure-imqs`, you can explore the host’s data using the Hosts navigator.

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Infrastructure`.

#. Select :strong:`My Data Center` and then select the :strong:`Hosts` tile. The Hosts navigator displays.

    .. image:: /_images/infrastructure/hosts-navigator.gif
      :width: 100%
      :alt: Animated GIF scrolling through the Hosts navigator in Splunk Infrastructure Monitoring showing charts and visualizations of data collected from hosts.

To filter the data shown in the navigator to a specific host, such as the one you just installed the Splunk Distribution of OpenTelemetry Collector on, select :strong:`Add Filter` and select a key and value that uniquely identify your host. For example, for a Windows Server host, you can select :strong:`host.name` = :strong:`<host computer name>`. Select :strong:`Apply Filter`.

.. image:: /_images/infrastructure/add-filter-host-name.gif
  :width: 60%
  :alt: This animated GIF shows the Add Filter menu with the host.name key and a computer name value selected.

|

Tips for viewing host data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- The Hosts navigator includes data only from hosts where you :ref:`installed the Splunk Distribution of OpenTelemetry Collector <gdi-infrastructure-imqs>`. For more details about the data displayed in the Hosts navigator, see :new-page-ref:`monitor-hosts`.

- In addition to displaying its data on the Hosts navigator, a cloud-based host where you've installed the Splunk Distribution of OpenTelemetry Collector also displays its data on its corresponding cloud provider service navigator. For example:

   - If you installed the Splunk Distribution of OpenTelemetry Collector on an Amazon Web Services EC2 instance, you can view its data in the :new-page-ref:`EC2 navigator <monitor-aws-services>`.
   - If you installed the Splunk Distribution of OpenTelemetry Collector on a Microsoft Azure Virtual Machine, you can view its data in the :new-page-ref:`Virtual Machines navigator <monitor-azure-services>`.
   - If you installed the Splunk Distribution of OpenTelemetry Collector on a Google Compute Engine, you can view its data on the :new-page-ref:`Compute Engine navigator <monitor-gcp-services>`.

  Each of these navigators includes a :strong:`Host With Agent Installed` module that reflects all of the hosts where you've installed the Splunk Distribution of OpenTelemetry Collector.

- If you want to see data from all hosts, including those where you installed the Splunk Distribution of OpenTelemetry Collector and SignalFx Smart Agent, use the :strong:`Hosts with agent installed` built-in dashboard. To access this dashboard, open the navigation :strong:`Menu` and select :strong:`Dashboards`. The Dashboards page displays. Search for :strong:`Hosts with agent installed`. The :strong:`Hosts with agent installed` dashboard group displays. Select a link to access a relevant dashboard. For more details about working with dashboards, see :new-page-ref:`dashboards`.


.. _kubernetes-navigator-imqs:

Monitor Kubernetes clusters using the Kubernetes navigator
------------------------------------------------------------------------------

If you completed :ref:`gdi-infrastructure-imqs`, you can explore the cluster’s data using the Kubernetes navigator.

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Infrastructure`.

#. In the :strong:`Containers` section, select :strong:`Kubernetes`. The Kubernetes navigator displays.

    .. image:: /_images/infrastructure/kubernetes-navigator.gif
      :width: 100%
      :alt: This animated GIF shows the Kubernetes navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from a Kubernetes cluster.

To filter the data shown in the navigator to a specific cluster, such as the one you installed the Splunk Distribution of OpenTelemetry Collector in, set the :strong:`Cluster:` value to the cluster name you provided in :ref:`gdi-infrastructure-imqs`.

For more details about the data displayed in the Kubernetes navigator, see :new-page-ref:`use-the-k8s-navigator`.

Splunk Observability Cloud also provides :new-page-ref:`built-in (out of the box) dashboards <dashboards>` that you can use to explore your Kubernetes data. To access these dashboards, open the navigation :strong:`Menu` and select :strong:`Dashboards`. The Dashboards page displays. Search for :strong:`Kubernetes`. The :strong:`Kubernetes` dashboard group displays. Select a link to access a relevant dashboard.


.. _aws-navigators-imqs:

Monitor Amazon Web Services using navigators
--------------------------------------------------------------------------------------------

If you completed :ref:`gdi-cloud-imqs`, you can explore your Amazon Web Services data using navigators.

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Infrastructure`.

#. In the :strong:`Public Clouds` section, select :strong:`Amazon AWS`. The :strong:`Amazon AWS` section provides a high-level view of Amazon Web Services data received by Splunk Infrastructure Monitoring. Select a service to access its navigator.

    .. image:: /_images/infrastructure/amazonaws-section.png
      :width: 100%
      :alt: This screenshot shows the Amazon AWS section of the Infrastructure page displaying a high-level view of data received by Splunk Infrastructure Monitoring.

    |

    For example, you can access a navigator that provides data about your Amazon Elastic Compute Cloud (EC2) nodes.

      .. image:: /_images/infrastructure/ec2-navigator.gif
        :width: 100%
        :alt: This animated GIF shows the EC2 navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from the EC2 service.

To narrow the scope of the data shown in the navigator, such as to only the data received from the connection you made, select :strong:`Add Filter` and select a key and value that uniquely identify your connection. For example, you can select :strong:`aws_account_id` = :strong:`<your AWS account ID>`. Select :strong:`Apply Filter`.

For more details about Amazon Web Services navigators, see :new-page-ref:`monitor-aws-services`.

Splunk Observability Cloud also provides :new-page-ref:`built-in (out of the box) dashboards <dashboards>` that you can use to explore your Amazon Web Services data. To access these dashboards, open the navigation :strong:`Menu` and select :strong:`Dashboards`. The Dashboards page displays. Search for :strong:`AWS`. Several Amazon Web Services dashboard groups display. Select a link to access a relevant dashboard.


.. _gcp-navigators-imqs:

Monitor Google Cloud Platform services using navigators
-----------------------------------------------------------------------------------------

If you completed :ref:`gdi-cloud-imqs`, you can explore your Google Cloud platform data using navigators.

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Infrastructure`.

#. In the :strong:`Public Clouds` section, select :strong:`Google Cloud Platform`. The :strong:`Google Cloud Platform` section provides a high-level view of Google Cloud Platform services data received by Splunk Infrastructure Monitoring. Select a service to access its navigator.

    .. image:: /_images/infrastructure/gcp-section.png
      :width: 100%
      :alt: This screenshot shows the Google Cloud Platform section of the Infrastructure page displaying a high-level view of data received by Splunk Infrastructure Monitoring.

   For example, you can access a navigator that provides data about your Google Cloud Platform Compute Engines.

      .. image:: /_images/infrastructure/gcp-compute-engine-navigator.gif
        :width: 100%
        :alt: This animated GIF shows the Google Cloud Platform Compute Engine navigator in Splunk Infrastructure Monitoring showing charts and visualizations of data collected from the Compute Engine service.

For more details about Google Cloud Platform service navigators, see :new-page-ref:`monitor-gcp-services`.

To narrow the scope of the data shown in the navigator, such as to only the data received from the connection you made, select :strong:`Add Filter` and select a key and value that uniquely identify your connection. For example, you can select :strong:`project_id` = :strong:`<your project ID>`, where the project ID value is the one you provided in :ref:`gdi-cloud-imqs`. Select :strong:`Apply Filter`.

Splunk Observability Cloud also provides :new-page-ref:`built-in (out of the box) dashboards <dashboards>` that you can use to explore your Google Cloud Platform data. To access these dashboards, open the navigation :strong:`Menu` and select :strong:`Dashboards`. The Dashboards page displays. Search for :strong:`Google`. Several Google Cloud Platform dashboard groups display. Select a link to access a relevant dashboard.


.. _azure-navigators-imqs:

Monitor Microsoft Azure services using navigators
-----------------------------------------------------------------------------------------

If you completed :ref:`gdi-cloud-imqs`, you can explore your Microsoft Azure data using navigators.

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Infrastructure`.

#. In the :strong:`Public Clouds` section, select :strong:`Microsoft Azure`. The :strong:`Microsoft Azure` section provides a high-level view of Microsoft Azure services data received by Splunk Infrastructure Monitoring. Select a service to access its navigator.

    .. image:: /_images/infrastructure/azure-section.png
      :width: 100%
      :alt: This screenshot show the Microsoft Azure section of the Infrastructure page showing a high-level view of data received by Splunk Infrastructure Monitoring.

   For example, you can access a navigator that provides data about your Microsoft Azure Virtual Machines.

      .. image:: /_images/infrastructure/azure-navigator.gif
        :width: 100%
        :alt: This animated GIF shows the Microsoft Azure Virtual Machines navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from the Virtual Machines service.

For more details about Microsoft Azure service navigators, see :new-page-ref:`monitor-azure-services`.

To narrow the scope of the data shown in the navigator, such as to only the data received from the connection you made, select :strong:`Add Filter` and select a key and value that uniquely identify your connection. For example, you can select :strong:`subscription_id` = :strong:`<your subscription ID>`, where the subscription ID value is the one associated with a subscription you provided in :ref:`gdi-cloud-imqs`. Select :strong:`Apply Filter`.

Splunk Observability Cloud also provides :new-page-ref:`built-in (out of the box) dashboards <dashboards>` that you can use to explore your Microsoft Azure data. To access these dashboards, open the navigation :strong:`Menu` and select :strong:`Dashboards`. The Dashboards page displays. Search for :strong:`Azure`. Several Microsoft Azure dashboard groups display. Select a link to access a relevant dashboard.


.. _alerts-imqs:

Step 4. Activate an out-of-the-box detector to issue alerts
========================================================================

Now that you have data flowing into Splunk Observability Cloud and you can explore that data using navigators and dashboards, let's set up an alert that can help keep you informed about certain conditions in your data.

To create an alert, you first create a detector that monitors data for conditions you want to be alerted about. When a condition you want to be alerted about is met, the detector issues an alert.

This task describes how to create a detector directly from a chart in a navigator or dashboard covered in :ref:`navigators-imqs`.

#. Access the chart you want to create a detector from. This example creates a detector based on the :strong:`Memory Used %` chart in the :ref:`host-navigator-imqs`.

#. Select the :strong:`Get Alerts` icon in the upper right of a chart. For some chart data, there are built-in templates that make it easy for you create detectors for useful alert conditions. For example, for the :strong:`Memory Used %` chart, we provide a :strong:`Memory utilization % greater than historical norm` detector template.

    .. image:: /_images/infrastructure/memory-used-create-new-detector.png
      :width: 100%
      :alt: This screenshot shows the New Detector from Chart menu displaying available built-in detctor templates, such as the Memory utilization % greater than historical norm template.

    |

    This detector sends an alert when memory usage for the last 10 minutes was significantly higher than normal, as compared to the last 24 hours.

#. The :strong:`New Detector` panel displays. Select :strong:`Add Recipients` to add an email, :new-page-ref:`Splunk Observability Cloud team <admin-manage-teams>`, or :new-page-ref:`webhook <webhook>` that you want to receive the alert.

    .. image:: /_images/infrastructure/new-detector-panel.png
      :width: 60%
      :alt: This screenshot shows the New Detector: Memory utilization % greater than historical norm detector template.

    |

#. Select :strong:`Activate`. When the data condition is met, Splunk Observability Cloud sends a notification to designated recipients and displays alerts on the Alerts page.

    .. image:: /_images/infrastructure/alerts-page.png
      :width: 100%
      :alt: This screenshot show the Alerts page focusing on a critical alert.

For more details about using alerts and detectors, see :new-page-ref:`get-started-detectoralert`.


.. _next-steps-imqs:

Next steps
==================

- Now that you've seen some out-of-the-box visualizations, want to create your own dashboards and share them with your team? See :ref:`dashboard-create-customize` and :ref:`dashboards-best-practices`.

- :ref:`Use Related Content <get-started-relatedcontent>` to jump between components of Splunk Observability Cloud by selecting related data.

- Now that you have infrastructure data flowing into Splunk Observability Cloud, consider :ref:`instrumenting an application to send spans and traces <get-started-application>` to :ref:`Splunk Application Performance Monitoring <get-started-apm>` (APM), where you can access dashboards like this one for your services and business workflows.

      .. image:: /_images/infrastructure/apm-landing.png
        :width: 100%
        :alt: This animated GIF shows the Splunk Application Performance Monitoring (APM) page displaying charts and visualizations of data collected from instrumented applications.

  We provide tools that help you instrument applications written in Java, .NET, Node.js, Python, Ruby, and PHP.

- Explore :ref:`even more data sources <supported-data-sources>` that you can monitor using Splunk Observability Cloud, such as Apache Zookeeper, Cassandra, Docker, Heroku, Jenkins, and Redis.

- Interested in coordinating team efforts in Splunk Observability Cloud using team alerts and dashboards? See :ref:`admin-manage-teams`.

    .. image:: /_images/infrastructure/team-page.png
      :width: 100%
      :alt: This screenshot shows a team landing page displaying an overview of team alerts and access to team dashboards.
