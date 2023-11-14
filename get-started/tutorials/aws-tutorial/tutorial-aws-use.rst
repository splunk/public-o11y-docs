.. _tutorial-aws-use:

*****************************************************************
Monitor and use AWS data in Splunk Observability Cloud
*****************************************************************

Tips for working with navigators
------------------------------------------------------------------------------

Navigators are primarily composed of charts.

Using charts, you can view details about your metrics and visualize metric time series.

- Hover over a chart to see details about specific metric time series.

- Select within a chart to see the data table for a given time period.

- Select a chart title in the top left of a chart to display the full chart along with more chart options, such as a plot editor and the ability to change the chart's visualization type to area, column, or histogram, for example.

  .. image:: /_images/infrastructure/elb-navigator-chart.gif
    :width: 100%
    :alt: This animated GIF shows hover and select actions on a chart to display metric time series, a data table, and full chart data.

  |

- Every chart has a :strong:`Chart Actions` menu. Select the more (|more|) icon in the upper right of a chart to open the menu and view available actions. For example, you can share the chart, download it as an image, or export it as a comma-separated values (CSV) file.

  .. image:: /_images/infrastructure/chart-actions.png
    :width: 70%
    :alt: This screenshot shows the Chart actions menu (|more|) displaying available options such as Share, Download Chart as Image, and Export Chart as CSV.

For more details about using navigators, see :new-page-ref:`use-navigators-imm`.

For more details about working with charts, see :new-page-ref:`data-visualization-charts`.

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

Splunk Observability Cloud also provides :new-page-ref:`built-in dashboards <dashboards>` that you can use to explore your Amazon Web Services data. To access these dashboards, open the navigation :strong:`Menu` and select :strong:`Dashboards`. The Dashboards page displays. Search for :strong:`AWS`. Several Amazon Web Services dashboard groups display. Select a link to access a relevant dashboard.

Step 4. Activate a detector to issue alerts
========================================================================

Now that you have data flowing into Splunk Observability Cloud and you can explore that data using navigators and dashboards, you can set up an alert that keeps you informed about certain conditions in your data.

To create an alert, you first create a detector that monitors data for conditions you want to be alerted about. When a condition you want to be alerted about is met, the detector issues an alert.

This task describes how to create a detector directly from a chart in a navigator or dashboard covered in :ref:`navigators-imqs`.

#. Access the chart you want to create a detector from. This example creates a detector based on the :strong:`Memory Used %` chart in the :ref:`host-navigator-imqs`.

#. Select the :strong:`Get Alerts` icon in the upper right of a chart. For some chart data, there are built-in templates that make it easy for you to create detectors for useful alert conditions. For example, for the :strong:`Memory Used %` chart, we provide a :strong:`Memory utilization % greater than historical norm` detector template.

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


Next steps
==================

- To create your own dashboards and share them with your team, see :ref:`dashboard-create-customize` and :ref:`dashboards-best-practices`.

- :ref:`Use Related Content <get-started-relatedcontent>` to jump between components of Splunk Observability Cloud by selecting related data.

- Now that you have infrastructure data flowing into Splunk Observability Cloud, consider :ref:`instrumenting an application to send spans and traces <get-started-application>` to :ref:`Splunk Application Performance Monitoring <get-started-apm>` (APM), where you can access dashboards like this one for your services and business workflows.

      .. image:: /_images/infrastructure/apm-landing.png
        :width: 100%
        :alt: This animated GIF shows the Splunk Application Performance Monitoring (APM) page displaying charts and visualizations of data collected from instrumented applications.

  Splunk Observability Cloud provides tools that help you instrument applications written in Java, .NET, Node.js, Python, Ruby, and PHP.

- Explore :ref:`even more data sources <supported-data-sources>` that you can monitor using Splunk Observability Cloud, such as Apache Zookeeper, Cassandra, Docker, Heroku, Jenkins, and Redis.

- To coordinate team efforts in Splunk Observability Cloud using team alerts and dashboards, see :ref:`admin-manage-teams`.

    .. image:: /_images/infrastructure/team-page.png
      :width: 100%
      :alt: This screenshot shows a team landing page displaying an overview of team alerts and access to team dashboards.


Next step
-----------------------
This completes the second part of the tutorial. 

To learn how to create a built-in detector to alert you about your Kubernetes data, continue to :ref:`activate-builtin-detector`.

- View metrics in :ref:`built-in dashboards <built-in-dashboards>` for hosts and Kubernetes

- Search for metrics :ref:`using Metric Finder <metric-finder>`

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

