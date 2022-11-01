.. _compare-compare:

******************************************************************************************
Compare the Splunk platform and Splunk Observability Cloud 
******************************************************************************************

.. meta::
   :description: This page explains the purpose and functionality differences between the Splunk platform and Splunk Observability Cloud.

The Splunk platform and Observability Cloud are different platforms that work together for an end-to-end solution that meets your security and observability needs. 

Compare purpose
==========================================================================================
The Splunk platform enables you to collect, search, monitor, report, and analyze all of your real-time and historical machine data, making it the most thorough logging solution for security. With your Splunk platform instance, you can prevent security breaches and conduct IT and some observability investigations. 

Observability Cloud, on the other hand, provides comprehensive observability across your stack. Observability Cloud is the ideal toolset for SREs, developers, and DevOps engineers. With Splunk Observability Cloud, you can:

- Prevent site downtime

- Find and fix problematic code when applications fail

- Properly balance your infrastructure when parts of your infrastructure have performance issues

- Maintain reliability throughout your stack

- Deliver great customer experiences


.. _core-o11y-differences:

Compare functionality
==========================================================================================
Observability Cloud and the Splunk platform have a few functionality differences. There are three primary ways that the two platforms differ, as explained in the following sections.

Query language
------------------------------------------------------------------------------------------
The Splunk platform is built around an advanced query language, SPL, that allows users to drill down into their logs in complex and nuanced ways. On the other hand, Log Observer Connect, a component of Observability Cloud, lets novice users analyze their Splunk platform logs along with correlated metrics, traces, and user sessions with point-and-click technology. There is no need to learn SPL or any other query language to use Log Observer Connect.

Infrastructure Monitoring, another component of Observability Cloud, uses SignalFlow, a query language for metrics. To learn more see :ref:`signalflow-analytics-intro`.

Alerting
------------------------------------------------------------------------------------------
A second difference is in alerting. Alerting for the Splunk platform and alerting for Observability Cloud remain separate. When you set alerts and detectors in the Splunk platform, only users in the Splunk platform instance can receive notifications. Likewise, only Observability Cloud users can receive notifications for alerts and detectors configured in Observability Cloud. You cannot configure detectors in Observability Cloud to alert on objects or trends in the Splunk platform. Conversely, you cannot configure detectors in the Splunk platform to alert on objects or trends in Observability Cloud. Configure detectors and alerts in the platform in which the objects, trends, and teams to notify exist.

Get Data In
------------------------------------------------------------------------------------------
A third difference between Observability Cloud and the Splunk platform is in how you must send data to each. The Splunk platform and Splunk Observability Cloud currently use different data collection agents:

- The Splunk platform primarily uses the Universal Forwarder (UF) to capture logs and some metrics (stored as logs). It also uses other methods. See :new-page:`Splunk Cloud Platform: Getting Data In <https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/WhatSplunkcanmonitor>` or :new-page:`Splunk Enterprise: Getting Data In <https://docs.splunk.com/Documentation/Splunk/latest/Data/WhatSplunkcanmonitor>` to learn other methods.

- Observability Cloud uses OpenTelemetry to capture metrics, traces, and logs. See :ref:`otel-intro` to learn more.

See :ref:`collector-with-the-uf` to learn more about the differences between the Universal Forwarder and OpenTelemetry collection agents and how you can use them together. 

When you use Log Observer Connect component of Observability Cloud, you do not need to import your data into Observability Cloud. Instead, you can see your Splunk platform logs in the Log Observer Connect UI without importing or storing logs outside your Splunk platform instance.