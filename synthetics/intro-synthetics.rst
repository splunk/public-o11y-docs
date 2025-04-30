.. _intro-synthetics:

********************************************
Introduction to Splunk Synthetic Monitoring
********************************************

.. meta::
    :description: Monitor the performance of your web pages and applications by running synthetic Browser, Uptime, and API tests with Splunk Synthetic Monitoring.

Create detailed tests to proactively monitor the speed and reliability of websites, web apps, and resources over time, at any stage in the development cycle.

To keep up to date with changes in Synthetic Monitoring, see the Splunk Observability Cloud :ref:`release notes <release-notes-overview>`.

How does Splunk Synthetic Monitoring work?
=============================================
Synthetic tests are the primary mechanism of application monitoring in Splunk Synthetic Monitoring. You can set up Browser tests and Uptime tests to monitor various aspects of your site or application. You can set up these tests to run at your preferred frequency from the devices and locations of your choosing. 

Each occurrence of a test from a particular device and location at a specific time is called a run. Each run of a test captures a set of metrics that provide insight into your application's performance. See :ref:`browser-metrics`. You can view this data at the per-run level, or you can view test-level aggregations that provide the data you need at a glance. 

You can also set up alerts that notify you when tests fail and come back online. See :ref:`synth-alerts`. 


Use cases for Splunk Synthetic Monitoring
==========================================

You can use Splunk Synthetic Monitoring for the following use cases:

* Proactively monitor site availability before it affects users
* Report on the availability or impact of third-party services
* Check how new code deployments improve or degrade performance
* Scan for moved or broken links on your site

| To see an example of using Splunk Observability Cloud components together, see :new-page:`APM Scenarios <https://quickdraw.splunk.com/redirect/?product=Observability&location=apm-walkthrough&version=current>`. 


Create your first test with Splunk Synthetic Monitoring
========================================================

To create your first test with Splunk Synthetic Monitoring, see :ref:`Set up Splunk Synthetic Monitoring <set-up-synthetics>`.

