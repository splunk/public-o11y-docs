.. _core2o11y-slis:

*********************************************************************************
Monitor SLIs, manage SLOs, and meet SLAs
*********************************************************************************

.. meta::
   :description: SLIs, SLOs, and SLAs in Observability Cloud

Splunk Observability Cloud provides out of the box solutions for monitoring your SLIs, and for setting and meeting your SLOs and SLAs. 

SLIs are Service Level Indicators, the metrics used to measure your system's availability. SLOs, Service Level Objectives, are what you have determined is the appropriate level of availability, as measured by your SLIs. Service Level Agreements, SLAs, are the promise you make to your customers about how much of the time you will meet your SLOs and what you will do if you do not meet them.

Observability Cloud immediately monitors and analyzes your SLIs, takes the guesswork out of determining error budgets, and helps you set reasonable SLOs and meet your SLAs. 

The following sections detail the components in Observability Cloud that you can use to track your SLOs and ensure that you meet your SLAs.

Splunk APM
===================================================================================
Splunk APM automatically generates a service map displaying all of your instrumented and inferred services, the dependencies among them, and SLIs for each when you click into a service. See :ref:`apm-service-map`. The service map shows SLIs for your services, including error rate, root error rate, and latency of the service you select. The right panel also shows services by error rate, top error sources, and services by latency.

.. image:: /_images/get-started/core2o11y-apm-pt1.png
  :width: 100%
  :alt: This animated GIF shows hover and click actions on a chart to display metric time series, a data table, and full chart data

Defining and managing SLOs for services with dependencies, some of which have their own SLOs, is tricky. A dynamically generated service map showing all integrated services, critical SLIs, and dependencies helps you with critical decisions, such as whether to combine SLOs for multiple dependencies.

:ref:`built-in-dashboards` in Splunk APM are automatically populated with SLIs for all integrated services. See :ref:`dashboards` for a list of types of dashboards and how you can create, customize, import, export, clone, and share them. See :ref:`apm-dashboards` to learn how to track performance, troubleshoot from the dashboard, and finally create a detector so that you can alert on a dashboard or chart in the future. For a use case on managing SLOs using APM, see :ref:`custom-metricset`.

Splunk Infrastructure Monitoring
===================================================================================
Infrastructure Monitoring is a custom metrics platform for real-time monitoring across infrastructure, applications, and business metrics. It collects health and performance data from servers, virtual machines, containers, databases, public cloud services, container orchestration, serverless and other backend components in a tech stack. With over 200 out of the box integrations and dashboards, you can monitor your entire infrastructure on a single pane of glass and significantly speed your cloud migration journey.

Monitor your SLIs in out of the box navigators, such as the following navigator chart showing latency over the last minute for AWS ELB instances:

  .. image:: /_images/infrastructure/elb-navigator-chart.gif
    :width: 100%
    :alt: This animated GIF shows hover and click actions on a chart to display metric time series, a data table, and full chart data.

:ref:`infrastructure-virtual-metrics` help you more accurately and thoroughly measure SLIs by automatically gathering, aggregating, and defining metrics. Virtual metrics remove the complexity of choosing the most appropriate metric source among various available options.

Splunk Log Observer Connect
===================================================================================
Splunk Log Observer Connect defaults to displaying a count of all of your logs by severity, highlighting the percentage of logs with errors at any given time. 

  .. image:: /_images/get-started/LOsample-core.png 
    :width: 100%
    :alt: This image shows Log Observer Connect with a timeline displaying a count of logs by severity.

You can change the default log aggregation to see other SLI measurements using logs data. For example, to see the average request latency in logs data, change count to average and group by request latency rather than severity. See :ref:`logs-aggregations` for guidance on adjusting aggregations so that you can view the SLIs that are important to you.

Real User Monitoring (RUM)
===================================================================================
Splunk RUM shows SLIs and SLOs from the perspective of what your users experience. In the following example, a RUM dashboard in the Tag Spotlight view starts with a chart displaying the total count of network requests and errors over a 15 minute period. The following charts display the count of requests and errors by URL name, by HTTP method, and by HTTP status code. 

  .. image:: /_images/get-started/Core-to-o11y-RUM-SLIs.png
    :width: 100%
    :alt: This image shows a RUM dashboard displaying a count of requests and errors by URL name, by HTTP method, and by HTTP status code. 
    
To learn more about what you can do with RUM, see :ref:`get-started-rum`. The :ref:`use-case-landingpage` has multiple examples of how you can use RUM. 


Splunk Synthetic Monitoring
===================================================================================
Splunk Synthetic Monitoring lets you test your SLOs before users do. When you proactively monitor the performance of your web application, you can remediate problems before they impact your users. Technical and business teams use Synthetic Monitoring to create detailed tests that proactively monitor the speed and reliability of websites, web apps, and resources over time, at any stage in the development cycle.  See :ref:`intro-synthetics` to learn what you can do with Synthetics Monitoring. 

Learn more about when to use Synthetic Monitoring in the use case, :ref:`uptime-test-use-case`. 

Alerting on synthetic testing makes Synthetic Monitoring actionable for your development and dev ops teams. Set up browser tests and uptime tests to monitor your site or application at the frequency you prefer. Each test captures a set of metrics each time it runs. To set up alerts that notify you when tests fail, see :ref:`synth-alerts`.




Collapsible sections below here 
.. collapse:: Monitor SLIs, manage SLOs, and meet SLAs

    Blah blah blah SLIs


.. collapse:: Respond to incidents and write postmortems

    Blah blah blah incident response


.. collapse:: Reduce toil: Automated solutions for interacting with the infrastructure

    Blah blah blah toil reduction


.. collapse:: Collaborate on reliability across teams

    Blah blah blah collaboration across teams