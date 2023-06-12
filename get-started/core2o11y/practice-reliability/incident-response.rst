.. _practice-reliability-incident-response:

***********************************************************************************
Respond to incidents
***********************************************************************************

.. meta::
   :description: This page provides an overview of the many ways you can drill down to root cause problems and decrease MTTR using the components of Observability Cloud.

You can drill down to find the root cause of incidents using several tools available in Splunk Observability Cloud. In the following sections, see how each component of Observability Cloud is an effective incident response tool.

Alerts and detectors
===================================================================================
Use Observability Cloud alerts, detectors, events, and notifications to inform you when certain criteria are met. Alerts and detectors are often your first awareness that an incident has occurred. Observability Cloud has AutoDetect, or built-in alerts and detectors for supported integrations. See :ref:`AutoDetect <autodetect>` for more information. 

Additionally, your team can create detectors to alert on performance and thresholds that matter most to you. For example, you can use alerts and detectors to notify your teams when your systems are nearing a limit you set in an SLO, such as approaching a server latency that is too high. For information on alerts, detectors, thresholds, and how they interact, see :ref:`get-started-detectoralert`. 

When you proactively use alerts and detectors to stay informed on changes in your systems, you can decrease the number of incidents your users experience and reduce toil for your teams in the future by updating your systems when events surpass a static or dynamic threshold that you set.

You can see all alerts, including AutoDetect alerts and custom alerts, on the Alerts homepage in Observability Cloud. To go to your organization's Alerts homepage, log in to Splunk Observability Cloud, then select :strong:`Alerts` in the left navigation menu. The following screenshot shows your Alerts homepage.

 .. image:: /_images/get-started/core-2-o11y-alerts.png
   :width: 100%
   :alt: This screenshot shows a sample Alerts homepage in Observability Cloud.

AutoDetect enables Observability Cloud's automatic detectors for supported integrations. You can subscribe to notifications for all integrations after you connect your systems and send in data for supported integrations. See :ref:`autodetect` to learn more. See also :ref:`autodetect-list`.

Select any alert to see details and links to Observability Cloud components that you can use to troubleshoot the error. The following critical alert shows a high API error rate. The :strong:`Explore Further` section on the right panel shows a link that takes you to APM where you can troubleshoot the issue.

 .. image:: /_images/get-started/alert-details.png
   :width: 100%
   :alt: This screenshot shows the detail view of an individual critical alert in Observability Cloud.

See :ref:`scenarios-alerts-detectors` for examples of how you can use alerts to notify teams about increased server latency, high CPU usage, approaching system limits, and other conditions that negatively impact user experience.

Dashboards
===================================================================================
Observability Cloud components all contribute to the data analytics in Observability Cloud dashboards. You can see charts and dashboards in APM, Infrastructure Monitoring, and RUM. You can also go to the homepage for all Observability Cloud dashboards to see dashboards and charts created in each component, including log views or logs data displayed in a chart. 

Observability Cloud has built-in dashboards, custom dashboards, user dashboards, and dashboard groups. See :ref:`dashboard-basics` for more information. See also :ref:`built-in dashboards <built-in-dashboards>` to learn more about built-in dashboards. Dashboards contain important information that can provide useful and actionable insight into your system at a glance. You can create custom dashboards and charts that help you monitor your SLOs, or simple dashboards that contain only a few charts that drill down into the data that you want to see. The following example shows a dashboard for an organization with dozens of built-in dashboards reporting on their many supported integrations. When users select a dashboard, they see all charts saved to this dashboard and can quickly drill down on a chart showing interesting trends or unexpected variation.

 .. image:: /_images/get-started/core2o11y-dashboard-incidentresp.gif
   :width: 100%
   :alt: This screenshot shows a sample dashboard homepage in Observability Cloud.

To see your dashboards, log in to Splunk Observability Cloud and select :strong:`Dashboards` in the left navigation menu.

Splunk APM
===================================================================================
APM collects traces and spans to monitor your distributed applications. You can investigate the root cause of an error with the service map or find the root cause of an error using Tag Spotlight. To learn how, see :ref:`service-map` and :ref:`troubleshoot-tag-spotlight`. For more examples of APM troubleshooting scenarios, see :ref:`apm-scenarios-intro`. 

For a walkthrough of the APM UI and guidance on drilling down to the root cause of an incident, see the :new-page:`APM troubleshooting scenario <https://bossofopsando11y.com/apm/troubleshooting.html>`.

Database Query Performance
-------------------------------------------------------------------------------------
Slow database queries can be another culprit of wider service availability issues. Respond to incidents faster by assessing whether database query time is contributing to availability or latency incidents. See :ref:`db-query-performance` to see how your databases are performing. The following image shows one organization's Database Query Performance dashboard.

 .. image:: /_images/get-started/core-2-o11y-dbqueryperf.png
   :width: 100%
   :alt: This screenshot shows a sample Alerts homepage in Observability Cloud.

You can check the performance of your database queries in Splunk APM. Log in to Observability Cloud, select :strong:`APM` in the left navigation menu, then select :strong:`DB Query Performance` on the right panel.

Splunk Infrastructure Monitoring
===================================================================================
Infrastructure Monitoring is an industry-leading custom metrics platform for real-time monitoring across infrastructure, application, and business metrics. See :ref:`use-navigators-imm` to explore different layers of your deployments, including your public cloud services, containers, and hosts.

The Infrastructure Monitoring heat map shows the CPU, memory, disk, and network metrics of each host, container, and public cloud service in a real-time streaming fashion. You can sort by CPU utilization or select :strong:`Find Outliers` on the heat map to see which of your resources might be spiking in CPU usage, causing your users to experience slow load or save times.

The following GIF shows an incident responder selecting a critical alert in Infrastructure Monitoring. The responder discovers that host CPU utilization is outside of expected norms set by an Observability Cloud admin. Teams responding to an incident can use this information to remediate the problem with the host or rebalance resources and prevent users from experiencing higher than expected latency.

 .. image:: /_images/get-started/IncidentResponse-InfraMon.gif
   :width: 100%
   :alt: This animated GIF shows a user clicking into Infrastructure Monitoring host on heat map, then going to an alert to find an outlier in CPU utilization.

See :ref:`monitor-services-hosts` to learn more about using Infrastructure Monitoring navigators to monitor public clouds, containers, or hosts.

Splunk Log Observer Connect
===================================================================================
Use Log Observer Connect to drill down to the root cause of incidents in the lowest mean time to resolution. While Splunk core platform users already have access to a powerful logging tool, Log Observer Connect provides an intuitive, codeless, in-app search tool that anyone can use without knowing a query language. Additionally, Log Observer Connect does not require importing logs into Observability Cloud. Logs remain securely in your Splunk Cloud Platform or Splunk Enterprise instance, while you can observe them from Observability Cloud and correlate your Splunk platform logs with metrics, traces, and user experience to drill down to root cause problems faster. 

With Log Observer Connect, you can aggregate logs to group by interesting fields. You can also filter logs by field, view individual log details, and create field aliases to drill down to the root cause of an incident. To learn more, see the following pages:

* :ref:`logs-aggregations`

* :ref:`logs-keyword`

* :ref:`logs-individual-log`

* :ref:`logs-alias`

To view related content, select correlated infrastructure resources, metrics, or traces in the :strong:`Related Content` bar. See :ref:`get-started-relatedcontent` to learn more. Seeing your logs data correlated with metrics and traces in Observability Cloud helps your team to locate and resolve problems faster.

The following GIF shows an incident responder selecting an error log in Log Observer Connect, then selecting related content to see a problematic host. This takes the user to the service map in Infrastructure Monitoring where the problematic  host is automatically selected. The service map panel shows service requests and errors, as well as service and dependency latency for the selected host.

 .. image:: /_images/get-started/core2o11y-LOConnect-incidentresp.gif
   :width: 100%
   :alt: This animated GIF shows user selecting an error log then selecting related content to see the problematic host on the service map.

See :ref:`logs-queries` to learn all of the ways Log Observer Connect queries can drill down to root causes of incidents.

Real User Monitoring (RUM)
===================================================================================
RUM monitors the user experience in your application UI by analyzing user sessions. In RUM, you can monitor and drill down on front-end JavaScript errors and network errors. 

 .. image:: /_images/get-started/core2o11y-RUM-inc-response.png
   :width: 100%
   :alt: This png shows a Real User Monitoring dashboard displaying JavaScript errors.

You can look for front-end and back-end errors, as well as see resource errors and resource response times. See :ref:`rum-identify-span-problems` to walk through a scenario that shows you how to find JavaScript errors, back-end errors, and long resource response times.

RUM is particularly helpful when investigating the root cause of an error reported by a user. See :ref:`rum-mobile-scenario` to learn more. 





