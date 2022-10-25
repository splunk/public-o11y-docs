.. _core2o11y-incident-response:

***********************************************************************************
Respond to incidents and write postmortems 
***********************************************************************************

.. meta::
   :description: This page provides an overview of the many ways you can drill down to root cause problems and decrease MTTR using the components of Observability Cloud.

Splunk Observability Cloud provides several tools for drilling down to find the root cause of incidents. In the sections below, see how each component of Observability Cloud is an effective incident response tool, as well as a boost for writing postmortems. Then find out how you can prevent and prepare for future incidents in :ref:`core2o11y-toil-reduction`.


Splunk APM
===================================================================================
APM collects traces and spans to monitor your distributed applications. You can :ref:`investigate the root cause of an error with the service map <service-map>` or :ref:`find the root cause of an error using Tag Spotlight <troubleshoot-tag-spotlight>`. For more examples of APM troubleshooting use cases, see :ref:`apm-use-cases-intro`.

For a walkthrough of the APM UI and guidance on drilling down to the root cause of an incident, see :new-page:`APM troubleshooting scenario <https://bossofopsando11y.com/apm/troubleshooting.html>`.


Splunk Infrastructure Monitoring
===================================================================================
Infrastructure Monitoring is an industry leading custom metrics platform for real-time monitoring across infrastructure, application, and business metrics. :ref:`use-navigators-imm` to explore different layers of your tech stacks, including your public cloud services, containers, and hosts.

The Infrastructure Monitoring heat map shows the CPU, memory, disk, and network metrics of each host, container, and public cloud service in a real-time streaming fashion. You can sort by CPU utilization or select :strong:`Find Outliers` on the heat map to see which of your resources might be spiking in CPU usage, causing your users to experience slow load or save times.

The following GIF shows an incident responder selecting a critical alert in Infrastructure Monitoring. The responder discovers that host CPU utilization is outside of expected norms set by an Observability Cloud admin in :ref:`alerts and detectors <get-started-detectoralert>`. Teams responding to an incident can use this information to remediate the problem with the host or rebalance resources and prevent users from experiencing higher than expected latency.

 .. image:: /_images/get-started/IncidentResponse-InfraMon.gif
   :width: 100%
   :alt: This animated GIF shows user clicking into Infrastructure Monitoring host on heat map, then going to an alert to find an outlier in CPU utilization.

See :ref:`Monitor services and hosts <monitor-services-hosts>` to learn more about using Infrastructure Monitoring navigators to monitor public clouds, containers, or hosts.

Splunk Log Observer Connect
===================================================================================
Log Observer Connect is purpose built to drill down to find the root cause of incidents in the lowest mean time to resolution. While users of Splunk core platform already have access to a powerful logging tool, Log Observer Connect provides a codeless, point-and-click query tool that anyone can use without the need to know a query language. Additionally, Log Observer Connect does not require importing logs into Observability Cloud. Logs remain securely in your Splunk Cloud Platform or Splunk Enterprise instance, while you can observe them from Observability Cloud and correlate your Splunk platform logs with metrics, traces, and user experience to drill down to root cause problems faster. 

With Log Observer Connect, you can :ref:`aggregate logs <logs-aggregations>` to group by interesting fields. You can also :ref:`filter logs by field <logs-filter-logs-by-field>`, :ref:`view individual log details <logs-individual-log>`, and :ref:`create field aliases <logs-alias>` to drill down to the root cause of an incident. You can also select correlated infrastructure resources, metrics, or traces in the Related Content bar to :ref:`view related content <get-started-relatedcontent>` in a single pane of glass. Seeing your logs data correlated with metrics and traces in Observability Cloud helps your team to locate and resolve problems exponentially faster.

The following GIF shows user selecting an error log in Log Observer Connect, then selecting related content to see a problematic host. This takes the user to the service map in Infrastructure Monitoring where the problematic  host is already automatically selected. The service map right panel shows service requests and errors, as well as service and dependency latency for the selected host.

 .. image:: /_images/get-started/core2o11y-LOConnect-incidentresp.gif
   :width: 100%
   :alt: This animated GIF shows user selecting an error log then selecting related content to see the problematic host on the service map.

See :ref:`logs-queries` to learn more about how Log Observer Connect queries can drill down to root causes of incidents.

When your team discovers that code in your application is the cause of the incident, you can use Log Observer Live Tail to find out whether your fix has solved the problem that caused the incident. Live Tail is available only to customers who have a full Log Observer entitlement. Reach out to your Splunk representative if you are interested in Log Observer. See :ref:`get-started-logs` to learn what you can do with a full Log Observer entitlement, including confirming that a code fix solved a problem.

Real User Monitoring (RUM)
===================================================================================
RUM monitors the front-end user experience of your application by analyzing user sessions. In RUM, you can monitor and drill down on the Endpoints Errors metric. You can look for front-end and back-end errors, as well as see resource errors and resource response times. See :ref:`rum-identify-span-problems` to walk through a use case that shows you how to find JavaScript errors, back-end errors, and long resource response times.

RUM is particularly helpful when investigating the root cause of an error reported by a user. See :ref:`rum-mobile-usecase` to learn more.





