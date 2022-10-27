.. _toil-reduction-toil-reduction:

***********************************************************************************
Reduce toil with automated solutions for interacting with the infrastructure
***********************************************************************************

.. meta::
   :description: This page provides an overview of how Observability Cloud helps SREs to automate solutions with out of the box 


SREs and developers can use Splunk Observability Cloud components to reduce toil by relying on out of the box and custom automation for interacting with your organization's infrastructure. The following sections detail ways you can automate reliability tasks and reduce toil for teams.

Alerts and detectors
===================================================================================
Alerting in Observability Cloud is a primary way to reduce toil for your teams. Configure alerts and detectors to notify team members when threshholds you set are surpassed, or when trends begin to veer off course based on rules you create. Alerting helps your teams stay ahead of potential problems and prevent incidents from occuring. 

Your organization's Alerts homepage displays a list of all current alerts, To see all alerts, log in to Splunk Observability Cloud, then select :strong:`Alerts` in the left navigation menu. All alerts are broken down into Critical, Major, Minor, Warning, and Info as seen in the following sample Alerts homepage.

 .. image:: /_images/get-started/core2o11y-alerts-homepage.png
   :width: 100%
   :alt: This screenshot shows a sample Alerts homepage in Observability Cloud.

Select any alert to see details and links to Observability Cloud components that you can use to troubleshoot the error. The following critical alert showing a high API error rate. The :strong:`Explore Further` section on the right panel shows a link that takes you to APM where you can troubleshoot the issue.

 .. image:: /_images/get-started/alert-details.png
   :width: 100%
   :alt: This screenshot shows the detail view of an individual critical alert in Observability Cloud.

Some detectors are built-in, including AutoDetect detectors and APM built-in alert conditions, while others follow the logic that you configure to alert your team or others on what matters most to you. See :ref:`get-started-detectoralert` to learn about alerts, detectors, and notifications.

See :ref:`use-cases-alerts-detectors` for examples of how you can use alerts to notify teams about increased server latency, high CPU usage, approaching system limits, and other conditions that negatively impact user experience.

AutoDetect
-----------------------------------------------------------------------------------
AutoDetect enables Observability Cloud's automatic detectors for supported integrations. You can subscribe to notifications for all integrations once you have connected your systems and sent in data for supported integrations. See :ref:`autodetect` to learn more. See :ref:`autodetect-list` for a comprehensive list of AutoDetect detectors for AWS, Kafka, Kubernetes, and Splunk operations.

Dashboards and charts 
-----------------------------------------------------------------------------------
Link a chart to a detector to make it easier for team members to know which charts they should examine when a detector is tripped and they are notified. 

 .. image:: /_images/get-started/core2o11y-chartDetector.png
   :width: 100%
   :alt: This screenshot shows how to link a chart to a detector in Observability Cloud.

See :ref:`linking-detectors` to learn more.

Splunk APM
-----------------------------------------------------------------------------------
You can automatically notify teams of worrisome trends or surpassing threshholds in your application using Splunk APM's built-in alert conditions. See :ref:`alert-conditions-apm` for a summary of built-in alert conditions for latency and error rate detectors.

You can also create custom alerts and detectors to automatically alert on conditions that are most important to your teams. See :ref:`apm-alerts` to learn how.

Splunk Real User Monitoring (RUM)
===================================================================================
:ref:`rum-built-in-dashboards` are out of the box dashboards that show the health of your mobile app or browser app. You can link detectors to RUM dashboards to automatically alert your team when your mobile or browser app front-end user experience reaches certain conditions that you specify. See See :ref:`linking-detectors` to learn how.

To view your RUM built-in dashboards, log in to Splunk Observability Cloud, then select :strong:`Dashboards` in the left navigation menu, then select the :strong:`RUM Application` dashboard.

 .. image:: /_images/get-started/core2o11yRUMdashboard.gif
   :width: 100%
   :alt: This screenshot shows out of the box Real User Monitoring dashboards in Observability Cloud.

Easily switch from mobile to browser monitoring by selecting the :strong:`MOBILE APP`` HEALTH or :strong:`BROWSER APP HEALTH` tabs. See :ref:`get-started-rum` to learn more.

Splunk Synthetic Monitoring
===================================================================================
Alerting on synthetic testing makes Synthetic Monitoring actionable for your development and dev ops teams. Set up browser tests and uptime tests to monitor your site or application at the frequency you prefer. Each test captures a set of metrics each time it runs. To set up alerts that notify you when tests fail, see :ref:`synth-alerts`.