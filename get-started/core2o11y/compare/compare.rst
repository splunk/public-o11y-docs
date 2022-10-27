.. _compare-compare:

******************************************************************************************
Compare the Splunk platform and Splunk Observability Cloud 
******************************************************************************************

.. meta::
   :description: This page explains the purpose and functionality differences between the Splunk platform and Splunk Observability Cloud.

The Splunk platform and Observability Cloud have different purposes and somewhat different functionality. The two combine in a native integration to simultaneously meet your security and observability needs. 

Compare purpose
==========================================================================================
The Splunk platform, a Security Information and Event Management (SEIM) tool, is the most thorough logging solution for security. With your Splunk platform instance, you can analyze and prevent security breaches, while Observability Cloud provides comprehensive observability across your stack.  

With Splunk Observability Cloud, you can:

- Prevent site downtime

- Find and fix problematic code when applications fail

- Properly balance your infrastructure when parts of your infrastructure have performance issues

- Maintain reliability throughout your stack

- Deliver great customer experiences


.. _core-o11y-differences:

Compare functionality
==========================================================================================
Because Observability Cloud and the Splunk platform serve different purposes and are conceptually and logically unique, they have some functionality differences. There are three primary ways that the two differ, as explained in the following sections.

Query language
------------------------------------------------------------------------------------------
The Splunk platform is built around an advanced query language, SPL, that allows users to drill down into their logs in complex and nuanced ways. Observability Cloud, on the other hand, does not require a query language. Instead, Observability Cloud lets novice users analyze their Splunk platform logs along with correlated metrics, traces, and user sessions with point-and-click technology. There is no need to learn SPL or any other query language to use Observability Cloud.

Alerting
------------------------------------------------------------------------------------------
A second difference is in alerting. Alerting for the Splunk platform and alerting for Observability Cloud remain separate. When you set alerts and detectors in the Splunk platform, only users in the Splunk platform instance can receive notifications. Likewise, only Observability Cloud users can receive notifications for alerts and detectors configured in Observability Cloud. You cannot configure detectors in Observability Cloud to alert on objects or trends in the Splunk platform. Conversely, you cannot configure detectors in the Splunk platform to alert on objects or trends in Observability Cloud. Configure detectors and alerts in the platform in which the objects, trends, and teams to notify exist.

Get Data In
------------------------------------------------------------------------------------------
A third difference between Observability Cloud and the Splunk platform is in how you must send data to each. The Splunk platform and Splunk Observability Cloud currently use different data collection agents:

- The Splunk platform uses the Universal Forwarder (UF) to capture logs and some metrics (stored as logs).

- Observability Cloud uses OpenTelemetry to capture metrics, traces, and logs. 

See :ref:`collector-with-the-uf` to learn more about the differences between these two collection agents and how you can use them together. 