.. _infrastructure-terms-concepts:

******************************************************************
Key concepts in Splunk Infrastructure Monitoring
******************************************************************

.. meta::
    :description: Terms and concepts in Splunk Infrastructure Monitoring


In the following table, learn about key concepts in Splunk Infrastructure Monitoring to help you get the most out of your Splunk Infrastructure Monitoring experience.


.. list-table::
   :header-rows: 1
   :widths: 30, 70

   * - :strong:`Concept`
     - :strong:`Description`
   
   * - :ref:`data-link-def`
     - A dynamic link available for properties that can take you to a Splunk Infrastructure Monitoring dashboard or an external system, such as a Splunk instance or a custom-defined URL. 

   * - :ref:`navigator-def`
     - A collection of resources that lets you monitor metrics and logs across various instances of your services and detect outliers in the instance population based on key performance indicators. 

   * - :ref:`resolution-def`
     - | Resolution refers to either one of the following:
       | - Data collection intervals, also known as native resolution.
       | - Intervals at which data points are displayed on a chart, also known as chart resolution.

   * - :ref:`signalflow-def`
     - The statistical computation engine of Splunk Observability Cloud.

   * - :ref:`virtual-metrics-def`
     - A unified format of data transformed and returned by Splunk Infrastructure Monitoring.


.. _data-link-def:

Data link
=======================

Data links are dynamic links available for properties that appear in several locations throughout the application. Data links appear in locations such as a chart's data table, in list charts, and in alert messages.

Data links can take you to a Splunk Infrastructure Monitoring navigator, dashboard, or an external system, such as a Splunk instance or a custom-defined URL. Data links include the context of the metadata you clicked on. Some examples of how you might use data links include:

- Move in one click from a property displayed in a dashboard to a navigator showing related data. For example, clicking on a link for the property ``k8s.pod.name`` in the Data Links dashboard opens the Kubernetes pods navigator. 

- Drill down from a property displayed in one dashboard to another dashboard showing related data. For example, clicking on a link for the property ``aws_region`` in one dashboard opens a related dashboard, filtered by the region. 
    
- Troubleshoot by linking from a property to external systems that reference that property. For example, clicking on a link for the property ``host`` in an alert message opens a search for log entries about that host in Splunk. 
    
- Construct specialized links for a specific purpose. For example, specifying a link for the property-value pair ``service:analytics`` opens a destination specific to the service, such as a dashboard containing charts related to analytics or an internal web page about managing your Analytics service.

To learn how to work with data links, see :ref:`navigate-with-data-links`.

.. _navigator-def:

Navigator
==================

A navigator is a collection of resources that lets you monitor metrics and logs across various instances of your services and detect outliers in the instance population based on key performance indicators. Resources in a navigator include, but are not limited to, a full list of entities, dashboards, related alerts and detectors, and service dependencies.

For more detail on how to work with navigators, see :ref:`use-navigators-imm`.

.. _resolution-def:

Resolution 
=======================

Resolution refers to either one of the following:

- Data collection intervals, also known as native resolution. To learn more, see :ref:`native-resolution`.
- Intervals at which data points are displayed on a chart, also known as chart resolution. To learn more, see :ref:`chart-resolution`.

If your organization uses a data points per minute (DPM) subscription plan based on the rate at which you're sending data points to Splunk Infrastructure Monitoring, see :ref:`dpm-retention`.

.. _signalflow-def:

SignalFlow
========================

SignalFlow is the statistical computation engine at the heart of Splunk Observability Cloud. You can use SignalFlow to analyze incoming data and write custom chart and detector analytics.

You can use the following SignalFlow components to create custom analytics for your data:

- SignalFlow programming language: A Python-like language that you use to write SignalFlow programs.
- SignalFlow library: Functions and methods you can call from a SignalFlow program.
- SignalFlow computation engine: The engine that runs your SignalFlow programs in the background and streams results.

To learn more, see :ref:`signalflow-analytics-intro`.

.. _virtual-metrics-def:

Virtual metrics
========================

When you collect infrastructure data from different sources, infrastructure metrics for the same host can vary in naming conventions and value scale. For example, infrastructure metrics from AWS CloudWatch, Google Cloud Platform, Azure Monitor, and the Splunk Distribution of OpenTelemetry Collector might not all share the same naming conventions.

To make it easier for you to find and work with metrics coming in from different sources, Splunk Infrastructure Monitoring pulls data from different sources, transforms them, and returns them in a unified format called virtual metrics.

Example of virtual metrics: ``^aws.ec2.cpu.utilization``.

For more information, see :ref:`infrastructure-virtual-metrics`.





