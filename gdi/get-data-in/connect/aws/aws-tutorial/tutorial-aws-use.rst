.. _tutorial-aws-use:

**************************************************************
Part 2: Monitor and use AWS data in Splunk Observability Cloud
**************************************************************

Now that you've integrated with your AWS services, you can access your data using navigators and dashboards, search your AWS data, and set up detectors and alerts. For an overview of the tutorial, see :ref:`about-aws-tutorial`.
  
View and manage AWS data
========================

You can access and view your AWS data with a variety of tools:

* :ref:`tutorial-aws-use-navigators`
* :ref:`tutorial-aws-use-dashboards`
* :ref:`tutorial-aws-use-search`
* :ref:`tutorial-aws-use-manage`

.. _tutorial-aws-use-navigators:

View metrics in Infrastructure Monitoring navigators
----------------------------------------------------

Navigators are primarily composed of charts. Using charts, you can view details about your metrics and visualize metric time series.

Follow these steps:

#. Log in to Splunk Observability Cloud.
#. In the left-side navigation menu, select :menuselection:`Infrastructure`.
#. In the :guilabel:`Public Clouds` section, select :guilabel:`Amazon AWS`. The :guilabel:`Amazon AWS` section provides a high-level view of the Amazon Web Services data received by Splunk Infrastructure Monitoring. 

   .. image:: /_images/infrastructure/amazonaws-section.png
      :width: 100%
      :alt: This screenshot shows the Amazon AWS section of the Infrastructure page displaying a high-level view of data received by Splunk Infrastructure Monitoring.

#. Select a service to access its navigator. For example, you can access a navigator that provides data about your Amazon Elastic Compute Cloud (EC2) nodes.

   .. image:: /_images/infrastructure/ec2-navigator.gif
      :width: 100%
      :alt: This animated GIF shows the EC2 navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from the EC2 service.

.. _tutorial-aws-use-dashboards:

View AWS metrics in built-in dashboards
---------------------------------------

Splunk Observability Cloud also provides :ref:`built-in dashboards <dashboards>` that you can use to explore your Amazon Web Services data. 

To access these dashboards:

#. In the left-side navigation menu, select :menuselection:`Dashboards`. 
#. Search for :strong:`AWS` to display the available Amazon Web Services dashboard groups. 
#. Select the relevant dashboard link.

.. _tutorial-aws-use-search:

Search for AWS data
-------------------

You can search for specific metrics using :ref:`Metric Finder <metric-finder>` and for metadata using the :ref:`metadata catalog <search-edit-metadata>`.

.. _tutorial-aws-use-manage:

Manage your metrics with metrics pipeline management 
----------------------------------------------------

Use :ref:`metrics pipeline management <metrics-pipeline-intro>` to centrally manage metric cardinality and control how you ingest and store your metrics, so you can lower costs and improve monitoring performance.

Create detectors to issue alerts
================================

With alerts you can stay informed about certain conditions in your data.

To create an alert, you first create a detector that monitors your data for the conditions you want to be alerted about. When such a condition is met, the detector issues an alert.

To set up an alert, follow these steps:

#. Access the chart you want to create a detector from. 

#. Select the :guilabel:`Get Alerts` icon in the upper right of a chart. 

    .. image:: /_images/infrastructure/memory-used-create-new-detector.png
      :width: 100%
      :alt: This screenshot shows the New Detector from Chart menu displaying available built-in detector templates, such as the Memory utilization % greater than historical norm template.

    This detector sends an alert when memory usage for the last 10 minutes was significantly higher than normal, as compared to the last 24 hours.

#. The :guilabel:`New Detector` panel displays. Select :guilabel:`Add Recipient` to add the location where you want to receive the alert such as an email, a :ref:`Splunk Observability Cloud team <admin-manage-teams>`, or a :ref:`webhook <webhook>`.

    .. image:: /_images/infrastructure/new-detector-panel.png
       :width: 60%
       :alt: This screenshot shows the New Detector: Memory utilization % greater than historical norm detector template.

#. Select :strong:`Activate`. When the data condition is met, Splunk Observability Cloud sends a notification to the designated recipients and displays alerts on the Alerts page.

Next steps
==========

This concludes the tutorial. You've connected your AWS services with Splunk Observability Cloud, viewed your data with navigators and dashboards, searched your AWS data, and created a detector.

Learn more
==========

* For more details about the concepts discussed in this part of the tutorial:

  * :new-page-ref:`use-navigators-imm`.
  * :new-page-ref:`data-visualization-charts`.
  * :ref:`data-tools-landing`.
  * :new-page-ref:`get-started-detectoralert`.
* For ideas about what to learn next:

  * To learn how to create custom dashboards, see :ref:`dashboard-create-customize` and :ref:`dashboards-best-practices`.
  * To learn how to jump between components of Splunk Observability Cloud by selecting related data, see :ref:`get-started-relatedcontent`.
  * To learn about additional data sources that you can monitor using Splunk Observability Cloud, see :ref:`supported-data-sources`.
  * To learn how to coordinate team efforts in Splunk Observability Cloud using team alerts and dashboards, see :ref:`admin-manage-teams`
* To learn more about the concepts used in this tutorial and Splunk Observability Cloud in general, see :ref:`welcome`.