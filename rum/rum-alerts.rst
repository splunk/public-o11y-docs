.. _rum-alerts:


************************************************
Alert on Splunk RUM data 
************************************************

Splunk RUM leverages the Infrastructure Monitoring platform to create detectors and alerts. Configure detectors to alert on your Splunk RUM metrics so that you can monitor and take timely action on alerts associated with your application. 

How alerts work in Splunk RUM
========================================

In Splunk RUM for Browser, alerts are triggered on aggregate metrics for the entire application. If you want to create an alert for a page level metric, first create a custom event for the metric, then create an alert for the custom event. To learn more, see :ref:`Create custom events <rum-custom-event>`. If you are new to alerts and detectors, see :ref:`Introduction to alerts and detectors in Splunk Observability Cloud <get-started-detectoralert>`. 



Integrations 
-----------------------------

You can use the following methods and integrations to receive alerts from Splunk RUM:

* Email notifications
* Jira
* PagerDuty
* ServiceNow
* Slack 
* VictorOps
* XMatters 

You can also add a link in your message such as a link to a runbook or other troubleshooting information in your organization.  

Data retention
---------------------

Alerts are triggered based on Infrastructure Monitoring metrics. Metrics are stored for 13 months. For more, see :ref:`Data retention in Splunk Observability Cloud <data-o11y>`.


Types of metrics you can alert on 
=======================================

You can create alerts on the following kind of metrics. For a comprehensive list of all Splunk RUM metrics, see:

* :ref:`rum-browser-data`
* :ref:`rum-ios-data`
* :ref:`manual-android-instrumentation` 


To learn more about web vitals, see :new-page:`https://web.dev/vitals/` in the Google developer documentation.

.. list-table:: 
   :widths: 30 60 
   :header-rows: 1

   * - :strong:`Category`
     - :strong:`Metrics`
   * - Web vitals
     -  * LCP (Largest Contentful Paint) 
        * FID (First Input Delay)
        * CLS (Cumulative Layout Shift) 
   * - Custom events  
     -  * :ref:`Create custom events<rum-custom-event>`
   * - Page metrics 
     -  * Page views and route changes   
        * JavaScript errors 
        * Long task length 
        * Long task count 
   * - Endpoint metrics 
     -  * Endpoint requests 
        * Endpoint latency 
        * TTFB (Time to First Byte)




Alert configuration examples
=============================

Here are a few examples of how you can configure alerts. Set the scope of your alert to either the page or URL level, or the app level which is an aggregate. The following use cases feature examples from Buttercup Industries, a fictitious ecommerce company. 


Alert trigger conditions
---------------------------

RUM alert conditions are designed to reduce noise and provide clear, actionable insights on your data. You can configure the sensitivity of the alert to suit your needs. If you want an alert that is more sensitive to smaller changes, you can reduce the percentage. For example, if you set your sensitivity to 10%, then you'd be alerted when only 10% of the data in the given time frame crosses the threshold you set. 


Page level metrics 
------------------

To create a page level metric, first create a custom rule to map to the page you want to monitor. See :ref:`rum-rules` to learn how to create a custom rule. For example, suppose you use the pattern ``https://buttercupgames.com/product/<?>`` because you want to group by the product type for your online store Buttercup Games. When you create a detector, apply a custom rule by selecting the rule from the list. The following image shows a page level detector for the custom pattern  ``https://buttercupgames.com/product/<?>``. 

.. image:: /_images/rum/product-page-rum-example.png
   :alt: This screenshot shows a detector modal where you can select the scope, type, and frequency of your alert. 
   :width: 97.3%


App level metrics 
-----------------

Web vitals have a standard range that denotes good performance. For example, a largest contentful paint (LCP) metric of more than 2.5 seconds might lead to bad user experience on your application. With Splunk RUM, you can create an alert to notify you when your aggregated LCP is more than 2.5 seconds, send a Slack notification to your team, and link to the runbook with the steps on how to remedy the slow LCP.

.. image:: /_images/rum/alert-modal-lcp.png
   :alt: This screenshot shows a detector modal where you can select the scope, type, and frequency of your alert. 
   :width: 97.3%


URL level metrics 
-----------------

The following image shows an example configuration for a URL level metric for long task duration that triggers if 50% of the data points in a five minute window are longer than 1000 milliseconds. 

.. image:: /_images/rum/url-level-alert-rum.png
   :alt: This screenshot shows a detector modal where you can select the scope, type, and frequency of your alert. 
   :width: 97.3%



.. _rum-detectors:

Create a detector 
==================

You can create a detector from either the RUM overview page or from Tag Spotlight.

Follow these steps to create a detector in RUM: 

1. In Splunk RUM, select a metric that is of interest to you to open Tag Spotlight.  

2. Select :strong:`Create new detector`.

3. Configure your detector:

    * Name your detector. 
    * Select the metric that is of interest to you and the type of data. 
    * Set the static threshold for your alert. 
    * Select the scope of your alert.
    * Select the severity of the alert. 
    * Apply a custom rule by selecting the rule from the list under "Scope the alerts I get to URL/Page".

4. Share your alert with others by integrating with the tool your team uses to communicate and adding a link to your runbook.  

5. Select :strong:`Activate`.


Create dashboards for your RUM alerts 
================================================
You can create dashboards for both web and mobile metrics. To see a list of the metrics available in Splunk RUM, see:

* :ref:`rum-browser-data`
* :ref:`rum-ios-data`
* :ref:`manual-android-instrumentation` 


To create charts and dashboard for your RUM alerts and detectors, see:   

* :ref:`Link detectors to charts <linking-detectors>` in Alerts and Detectors.    

* :ref:`Dashboards in Splunk Observability Cloud <dashboards>` in Dashboards and Charts. 



View detectors and alerts  
==========================================

For instructions, see:

* :ref:`Edit detectors through the SignalFlow tab <v2-detector-signalflow>`

* :ref:`View alerts in Splunk Observability Cloud <view-alerts>` 

* :ref:`View detectors in Splunk Observability Cloud <view-detectors>`

