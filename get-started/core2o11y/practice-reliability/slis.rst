.. _practice-reliability-slis:

*********************************************************************************
Measure and alert on your SLIs
*********************************************************************************

.. meta::
   :description: SLIs, SLOs, and SLAs in Observability Cloud

Splunk Observability Cloud provides out of the box solutions for monitoring your SLIs. You can also define your own SLIs with custom detectors, and alert on the data most important to your teams.

SLIs, SLOs, and SLAs
===================================================================================
SLIs are important because they help you meet your SLAs with customers. To review, SLIs are Service Level Indicators, the metrics used to measure your system’s availability. SLOs, Service Level Objectives, are what you have determined is the appropriate level of availability, as measured by your SLIs. Service Level Agreements, SLAs, are the promise you make to your customers about how much of the time you will meet your SLOs and what you will do if you do not meet them.

:strong:`Example`:

SLI: the percentage of the time your system is available (where we define availability as a transaction taking less than a half second to complete)

SLO: Your system should be available 99.99% of the time 

SLA: If your system is not available 99.99% of the time during a month, you will give the customer a rebate

To meet your SLAs, you must set and manage SLOs based on accurate data, as measured by your SLIs. Observability Cloud immediately monitors and analyzes your SLIs, takes the guesswork out of determining error budgets, and helps you set reasonable SLOs so that you meet your SLAs. The following sections detail the components in Observability Cloud that you can use to measure and alert on your SLIs.

Splunk APM
===================================================================================
You can monitor your SLIs in Splunk APM. Splunk APM automatically generates a service map displaying all of your instrumented and inferred services, the dependencies among them, and SLIs for each when you select a service. See :ref:`apm-service-map`. The service map shows SLIs for your services, including error rate, root error rate, and latency of your services. The right panel also shows services by error rate, top error sources, and services by latency. For example, you can track whether the SLI for your 90th percentile service latency for each service is less than 5 seconds. On the following service map, we can see in the :strong:`Services By Latency (P90)` chart on the right that all services have a P90 of less than one minute. You can also track error rates on the service map in the :strong:`Services by Error Rate` chart. 

.. image:: /_images/get-started/core2o11y-apm-map.png
  :width: 100%
  :alt: This screenshot shows an APM service map.

You can alert on a service by creating a detector. See :ref:`create-detectors` to learn how. You can also rely on :ref:`built-in alert conditions <condition-reference>` or :ref:`link detectors to charts <linking-detectors>`.


:ref:`built-in-dashboards` in Splunk APM are automatically populated with SLIs for all integrated services, as seen in the following sample APM dashboard.

  .. image:: /_images/get-started/core2o11y-apmDashboard-SLIs.png
    :width: 100%
    :alt: This animated GIF shows hover and click actions on a chart to display metric time series, a data table, and full chart data.

To see a dashboard for a service, select the service on the service map, then select :strong:`View Dashboard`. 

See :ref:`dashboards` for a list of types of dashboards and how you can create, customize, import, export, clone, and share them. See :ref:`apm-dashboards` to learn how to track performance, troubleshoot from the dashboard, and finally create a detector so that you can alert on a dashboard or chart in the future. For a use case on managing SLOs using APM, see :ref:`custom-metricset`.

Observability Cloud Alerts and detectors
===================================================================================
Observability Cloud includes out of the box alerts and detectors using :ref:`autodetect`. You can also set up custom detectors, as described in the previous section. Custom detectors let you define your own SLIs and alert on any data that matters most to you. 


Splunk Infrastructure Monitoring
===================================================================================
Infrastructure Monitoring is a custom metrics platform for real-time monitoring across infrastructure, applications, and business metrics. It collects health and performance data from servers, virtual machines, containers, databases, public cloud services, container orchestration, serverless and other backend components in a tech stack. With over 200 out of the box integrations and dashboards, you can monitor your entire infrastructure on a single pane of glass and significantly speed your cloud migration journey.

Monitor your SLIs in out of the box navigators, such as the following navigator chart showing latency over the last minute for AWS ELB instances:

  .. image:: /_images/infrastructure/elb-navigator-chart.gif
    :width: 100%
    :alt: This animated GIF shows hover and click actions on a chart to display metric time series, a data table, and full chart data.

In addition to out of the box navigators, you can set up alerts and detectors on any custom Infrastructure Monitoring data that matters to you. See :ref:`get-started-detectoralert`.

:ref:`infrastructure-virtual-metrics` help you more accurately and thoroughly measure SLIs by automatically gathering, aggregating, and defining metrics. Virtual metrics remove the complexity of choosing the most appropriate metric source among various available options.

Real User Monitoring (RUM)
===================================================================================
Splunk RUM shows SLIs and SLOs from the perspective of what your users experience in the front end. In the following example, a RUM dashboard in the Tag Spotlight view starts with a chart displaying the total count of network requests and errors over a 15 minute period. The following charts display the count of requests and errors by URL name, by HTTP method, and by HTTP status code. 

  .. image:: /_images/get-started/Core-to-o11y-RUM-SLIs.png
    :width: 100%
    :alt: This image shows a RUM dashboard displaying a count of requests and errors by URL name, by HTTP method, and by HTTP status code. 
    
To learn more about what you can do with RUM, see :ref:`get-started-rum`. The :ref:`use-case-landingpage` has multiple examples of how you can use RUM. 


Splunk Synthetic Monitoring
===================================================================================
Splunk Synthetic Monitoring lets you test your SLOs before users do. When you proactively monitor the performance of your web application, you can remediate problems before they impact your users. Technical and business teams use Synthetic Monitoring to create detailed tests that proactively monitor the speed and reliability of websites, web apps, and resources over time, at any stage in the development cycle.  See :ref:`intro-synthetics` to learn what you can do with Synthetics Monitoring. 

Learn more about when to use Synthetic Monitoring in the use case, :ref:`uptime-test-use-case`. 

Alerting on synthetic testing makes Synthetic Monitoring actionable for your development and dev ops teams. Set up browser tests and uptime tests to monitor your site or application at the frequency you prefer. Each test captures a set of metrics each time it runs. To set up alerts that notify you when tests fail, see :ref:`synth-alerts`. 

