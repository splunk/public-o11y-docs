.. _core2o11y-incident-response:

***********************************************************************************
Respond to incidents and write postmortems 
***********************************************************************************

.. meta::
   :description: This page provides an overview of the many ways you can drill down to root cause problems and decrease MTTR using the components of Observability Cloud.

Splunk Observability Cloud provides several tools for drilling down to find the cause of incidents. In the sections below, see how each component of Observability Cloud is an effective incident response tool, as well as boost for writing postmortems. Then find out how you can prevent and prepare for future incidents in :ref:`core2o11y-Gtoil-reduction`.

Splunk Log Observer Connect
---------------------------------------------------------------------------------


Splunk Infrastructure Monitoring
---------------------------------------------------------------------------------
The Infrastructure Monitoring heat map shows the CPU, memory, disk, and network metrics of each of the hosts in a real-time streaming fashion. You can sort by CPU utilization or select :strong:`Find Outliers` on the heat map to see which of your hosts might be spiking in CPU usage and causing your users to experience slow load or save times.

The following GIF shows an incident responder selecting a critical alert in Infrastructure Monitoring, then discovering that a host had CPU utilization outside of expected norms set by an Observability Cloud admin. The responder can use this information to remediate the problem with the host or rebalance resources and prevent users from experiencing higher than expected latency.

.. image:: /_images/get-started/IncidentResponse-InfraMon.gif
   :width: 100%
   :alt: This animated GIF shows user clicking into Infrastructure Monitoring host on heat map, then going to an alert to find an outlier in CPU utilization.


Splunk APM
---------------------------------------------------------------------------------


