.. _welcome:

*************************************
Welcome to Splunk Observability Cloud
*************************************

.. meta::
   :description: Overview on Observability Cloud

Splunk Observability Cloud provides end-to-end visibility into your environment. Observability Cloud is made 
up of the following products: Splunk Infrastructure Monitoring, Splunk 
Application Performance Monitoring (APM), Splunk Real User Monitoring (RUM), and Splunk Log Observer. 
If you are interested in an incident response product, you can opt in to access Splunk On-Call.

========================================================
Get data in with Splunk Observability Cloud integrations
========================================================
Splunk Observability Cloud offers support for a broad range of integrations 
for collecting data of all kinds, from system metrics for infrastructure 
components to custom data from your applications. 
Integrating the Observability Cloud with your systems 
allows you to import your data and analyze it using all of the 
Observability Cloud components. The integrations work with Splunk Log Observer, 
Splunk APM, and Splunk Infrastructure Monitoring.

For instructions on how to get your data into Observability Cloud, see :ref:`Start getting data in <get-started-get-data-in>`.

For more information on the supported integrations, 
see :ref:`Supported data sources <supported-data-sources>`.

================================
Splunk Infrastructure Monitoring
================================
Splunk Infrastructure Monitoring is a metrics platform to address real-time cloud monitoring requirements at scale.

For instructions on how to set up Infrastructure Monitoring, see :ref:`Set up Infrastructure Monitoring <infrastructure-infrastructure>`.

===========================
Splunk Real User Monitoring
===========================
With Splunk Real User Monitoring, 
you can gain insight about the performance and health 
of the front-end user experience of your application. 
Splunk RUM collects performance metrics, web vitals, 
errors, and other forms of data to enable you to detect 
and troubleshoot problems in your application. For a complete 
view of your application from browser to back-end, integrate with Splunk APM.

Monitor browser traces with Splunk RUM
======================================
If you want to monitor only the browser traces of your application, 
then you can install Splunk RUM by itself, without Splunk APM. 
For directions, see :ref:`Instrument and configure Splunk RUM to monitor your application <rum-rum-org>`.


Monitor your application from browser to back-end with Splunk RUM and Splunk APM
================================================================================
If you want to monitor your application 
from browser to back-end, then integrate 
Splunk RUM with Splunk APM. When you integrate 
Splunk RUM with Splunk APM, you start sending server timing metrics to Splunk RUM
along with the back-end trace ID that was generated. 
Splunk RUM uses the server-timing header response times to associate 
the Splunk RUM Span with the corresponding Splunk APM Trace. 
For more information on Splunk APM, see :ref:`Monitor applications with Splunk APM <get-started-apm>`.

For information on how to install and set up Splunk APM, see :ref:`Set up Splunk APM <apm>`.

=========================================
Splunk Application Performance Monitoring
=========================================
Splunk APM is an application performance monitoring and troubleshooting solution for cloud-native, 
microservices-based applications. APM monitors applications by collecting traces. 
A trace is a collection of actions that occur to complete a transaction. 
Each action in a trace is known as a span.

For instructions on how to set up and instrument Splunk APM, see :ref:`Set up Splunk APM <apm>`.


===================
Splunk Log Observer
===================
Splunk Log Observer offers real-time insight into the logs in your environment. 
With Splunk Log Observer, you can perform code-less queries on your logs to 
identify and troubleshoot problems in your systems. Monitor your releases with the 
Splunk Log Observer Live Tail to get feedback in real-time if your new deployment or recent integration went smoothly.

To get started with Splunk Log Observer, see :ref:`Set up Splunk Log Observer <logs-logs>`.

=========================
(Optional) Splunk On-Call
=========================
Splunk On-Call incident response software aligns log management, 
monitoring, chat tools, and more, for a single-pane of glass into system health. 
Splunk On-Call automates delivery of alerts to get the right alert, to the right person, at the right time.

For more information, see the :new-page:`Splunk On-Call <https://help.victorops.com/>` documentation.