.. _toil-reduction:

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

Some detectors are built-in, including AutoDetect detectors and APM built-in alert conditions, while others follow the logic that you configure to alert your team or others on what matters most to you.

You can alert on the following:

- Supported integrations via AutoDetect

- Dashboards and charts

- Built-in APM alert conditions


See :ref:`use-cases-alerts-detectors` for examples of how you can use alerts to notify teams about increased server latency, high CPU usage, approaching system limits, and other conditions that negatively impact user experience.

AutoDetect
-----------------------------------------------------------------------------------
AutoDetect enables Observability Cloud's automatic detectors for supported integrations. You can subscribe to notifications for all integrations once you have connected your systems and sent in data for supported integrations. See :ref:`autodetect` to learn more. See :ref:`autodetect-list` for a comprehensive list of AutoDetect detectors for AWS, Kafka, Kubernetes, and Splunk operations.

Dashboards and charts
-----------------------------------------------------------------------------------
You can automate monitoring dashboards and charts by linking a detector to a chart.

 .. image:: /_images/get-started/core2o11y-chartDetector.png
   :width: 100%
   :alt: This screenshot shows how to link a chart to a detector in Observability Cloud.

Splunk APM
-----------------------------------------------------------------------------------
You can automatically notify teams of worrisome trends or surpassing threshholds in your application using Splunk APM's built-in alert conditions. See :ref:`alert-conditions-apm` for a summary of built-in alert conditions for latency and error rate detectors.

You can also create custom alerts and detectors to automatically alert on conditions that are most important to your teams. See :ref:`apm-alerts` to learn how.

Splunk Infrastructure Monitoring
===================================================================================
generate reliability reports

Splunk Log Observer Connect
===================================================================================


Splunk Real User Monitoring (RUM)
===================================================================================


Splunk Synthetic Monitoring
===================================================================================
Alerting on synthetic testing makes Synthetic Monitoring actionable for your development and dev ops teams. Set up browser tests and uptime tests to monitor your site or application at the frequency you prefer. Each test captures a set of metrics each time it runs. To set up alerts that notify you when tests fail, see :ref:`synth-alerts`.