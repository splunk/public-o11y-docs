.. _tutorial-aws-use:

*****************************************************************
Monitor and use AWS data in Splunk Observability Cloud
*****************************************************************

After you've integrated with your AWS services, you can access your data, set up alerts, and enjor other features of Splunk Observability Cloud.
  
View and manage AWS data
========================================================================

You can access and view your AWS data with a variety of tools. 

View metrics in Infrastructure Monitoring navigators
------------------------------------------------------------------------------

After you completed :ref:`tutorial-aws-start`, you can explore your Amazon Web Services data using navigators. Navigators are primarily composed of charts. Using charts, you can view details about your metrics and visualize metric time series.

Follow these steps:

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Infrastructure`.
#. In the :strong:`Public Clouds` section, select :strong:`Amazon AWS`. The :strong:`Amazon AWS` section provides a high-level view of Amazon Web Services data received by Splunk Infrastructure Monitoring. 

    .. image:: /_images/infrastructure/amazonaws-section.png
      :width: 100%
      :alt: This screenshot shows the Amazon AWS section of the Infrastructure page displaying a high-level view of data received by Splunk Infrastructure Monitoring.

#. Select a service to access its navigator. For example, you can access a navigator that provides data about your Amazon Elastic Compute Cloud (EC2) nodes.

      .. image:: /_images/infrastructure/ec2-navigator.gif
        :width: 100%
        :alt: This animated GIF shows the EC2 navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from the EC2 service.

For more details about using navigators, see :new-page-ref:`use-navigators-imm`.

For more details about working with charts, see :new-page-ref:`data-visualization-charts`.

View AWS metrics in built-in dashboards
--------------------------------------------------------------------------------------------

Splunk Observability Cloud also provides :ref:`built-in dashboards <dashboards>` that you can use to explore your Amazon Web Services data. 

To access these dashboards:

#. Open the navigation :strong:`Menu` and select :strong:`Dashboards`. 
#. Search for :strong:`AWS`, and the available Amazon Web Services dashboard groups will be displayed. 
#. Select a link to access a relevant dashboard.

Search for AWS data
--------------------------------------------------------------------------------------------

You can search for specific metrics :ref:`using Metric Finder <metric-finder>`, and for metadata using the metadata catalog :ref:`<search-edit-metadata>`.

Learn more at :ref:`data-tools-landing`.

Manage your metrics with metrics pipeline management 
--------------------------------------------------------------------------------------------

Metrics pipeline management allows you to centrally manage metric cardinality, and control ohow you ingest and store your metrics, so you can lower costs and improve monitoring performance.

See more at :ref:`metrics-pipeline-intro`.

Create detectors to issue alerts
========================================================================

With alerts you can keep informed about certain conditions in your data.

To create an alert, you first create a detector that monitors data for conditions you want to be alerted about. When a condition you want to be alerted about is met, the detector issues an alert.

To set up an alert, follow these steps:

#. Access the chart you want to create a detector from. 

#. Select the :strong:`Get Alerts` icon in the upper right of a chart. 

    .. image:: /_images/infrastructure/memory-used-create-new-detector.png
      :width: 100%
      :alt: This screenshot shows the New Detector from Chart menu displaying available built-in detctor templates, such as the Memory utilization % greater than historical norm template.

    This detector sends an alert when memory usage for the last 10 minutes was significantly higher than normal, as compared to the last 24 hours.

#. The :strong:`New Detector` panel displays. Select :strong:`Add Recipients` to add where you want to receive the alert: an email, a :ref:`Splunk Observability Cloud team <admin-manage-teams>`, or a :ref:`webhook <webhook>`.

    .. image:: /_images/infrastructure/new-detector-panel.png
      :width: 60%
      :alt: This screenshot shows the New Detector: Memory utilization % greater than historical norm detector template.

#. Select :strong:`Activate`. When the data condition is met, Splunk Observability Cloud sends a notification to designated recipients and displays alerts on the Alerts page.

For more details about using alerts and detectors, see :new-page-ref:`get-started-detectoralert`.

Next steps
==================

This completes the tutorial. 

You can now...

- Create your own dashboards and share them with your team. See :ref:`dashboard-create-customize` and :ref:`dashboards-best-practices`.

- :ref:`Use Related Content <get-started-relatedcontent>` to jump between components of Splunk Observability Cloud by selecting related data.

- Explore :ref:`even more data sources <supported-data-sources>` that you can monitor using Splunk Observability Cloud, such as Apache Zookeeper, Cassandra, Docker, Heroku, Jenkins, and Redis.

- To coordinate team efforts in Splunk Observability Cloud using team alerts and dashboards, see :ref:`admin-manage-teams`.

