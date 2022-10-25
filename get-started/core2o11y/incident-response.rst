.. _core2o11y-incident-response:

***********************************************************************************
Respond to incidents and write postmortems 
***********************************************************************************

.. meta::
   :description: This page provides an overview of the many ways you can drill down to root cause problems and decrease MTTR using the components of Observability Cloud.

Splunk Observability Cloud provides several tools for drilling down to find the root cause of incidents. In the sections below, see how each component of Observability Cloud is an effective incident response tool, as well as boost for writing postmortems. Then find out how you can prevent and prepare for future incidents in :ref:`core2o11y-toil-reduction`.


Splunk APM
===================================================================================
APM collects traces and spans to monitor your distributed applications. You can :ref:`investigate the root cause of an error with the service map <service-map>` or :ref:`find the root cause of an error using Tag Spotlight <troubleshoot-tag-spotlight>`. For more examples of APM troubleshooting use cases, see :ref:`apm-use-cases-intro`.

For a walkthrough of the APM UI and guidance on drilling down to the root cause of an incident, see :new-page:`APM troubleshooting scenario <https://bossofopsando11y.com/apm/troubleshooting.html>`.


Splunk Infrastructure Monitoring
===================================================================================
Infrastructure Monitoring is an industry leading custom metrics platform for real-time monitoring across infrastructure, application, and business metrics. :ref:`use-navigators-imm` to explore different layers of your tech stacks, including your public cloud services, containers, and hosts.

The Infrastructure Monitoring heat map shows the CPU, memory, disk, and network metrics of each of the hosts in a real-time streaming fashion. You can sort by CPU utilization or select :strong:`Find Outliers` on the heat map to see which of your hosts might be spiking in CPU usage, causing your users to experience slow load or save times.

The following GIF shows an incident responder selecting a critical alert in Infrastructure Monitoring, then discovering host CPU utilization outside of expected norms set by an Observability Cloud admin. Teams responding to an incident can use this information to remediate the problem with the host or rebalance resources and prevent users from experiencing higher than expected latency.

.. image:: /_images/get-started/IncidentResponse-InfraMon.gif
   :width: 100%
   :alt: This animated GIF shows user clicking into Infrastructure Monitoring host on heat map, then going to an alert to find an outlier in CPU utilization.

See :ref:`Monitor services and hosts <monitor-services-hosts>` to learn more about using Infrastructure Monitoring navigators to monitor public cloud, container, or host.




Splunk Log Observer Connect
===================================================================================


Real User Monitoring (RUM)
===================================================================================






