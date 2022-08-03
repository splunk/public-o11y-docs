.. _get-started-apm:

************************************
Monitor applications with Splunk APM
************************************

.. meta::
   :description: Get started monitoring applications with Splunk Observability Cloud.

Monitor :ref:`traces and spans<apm-traces-spans>` from your distributed applications with Splunk APM. A trace is a collection of actions, or spans, that occur to complete a transaction. Splunk APM collects and analyzes every span and trace that an application’s instrumentation generates to give you full-fidelity access to all of your application data. 

Splunk APM is composed of these features: 

 - Streaming architecture for real-time monitoring 
 - Out-of-the-box landing page and service dashboards so that you can start to gain insights from your data in minutes
 - :ref:`Span tags<apm-add-context-trace-span>` that let you break down and analyze application performance along any dimension
 - Dynamic detection and alerting with custom request, error, and duration (RED) :ref:`metrics<apm-metricsets>` to monitor error rate and latency across all of your applications and services
 - Troubleshooting with service map, :ref:`root-cause detection<apm-find-root-cause>`, and :ref:`Tag Spotlight<apm-tag-spotlight>`
 - An array of open-source agents and libraries
 - :ref:`Business Workflows<apm-workflows>` that let you correlate traces that make up end-to-end transactions in your system
 - Seamless integration with all other components of Splunk Observability Cloud using :ref:`Related Content<gdi-troubleshooting>`


Get your data into Splunk APM
=============================
To start using APM, see :ref:`Set up Splunk APM <apm>`.

If you have already instrumented your applications but are not seeing your data coming into APM as you expect, see :ref:`Troubleshoot your instrumentation <instr-troubleshooting>`.

To learn how to use Splunk Observability Cloud components together, see :ref:`get-started-use-case`.
