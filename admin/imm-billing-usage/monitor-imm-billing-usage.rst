.. _monitor-imm-billing-usage:

***************************************************************
Monitor Splunk Infrastructure Monitoring subscription usage
***************************************************************

.. meta::
      :description: Splunk Infrastructure Monitoring administrators can view the billing and usage information for the organization. The application provides a summary and detailed reports. In addition to counts for hosts and containers, the reports also contain counts for custom metrics and high-resolution metrics.


.. note:: This topic describes general aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team.

.. caution:: The information in this topic applies to organizations whose subscription plan is based on the number of hosts or metrics that Splunk Infrastructure Monitoring is monitoring for you. If your organization's usage is based on the rate at which you send data points to Infrastructure Monitoring (DPM), see :ref:`dpm-usage`.

Overview
========

Admin users in your Infrastructure Monitoring organization can view the subscription usage information for the organization. The application provides a summary and detailed reports to help you understand and manage the data that Infrastructure Monitoring monitors for you. In addition to counts for hosts and containers, the reports also contain counts for custom, bundled, and high-resolution metrics.

.. _about-custom-high-res:

About custom, bundled, and high-resolution metrics
==================================================

The following sections provide descriptions about different types of metrics collected by Infrastructure Monitoring.

.. _about-custom:

Differences between host, container, bundled, and custom metrics
----------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Metrics type`
     - :strong:`Description`

   * - Host and container metrics
     - Default metrics sent by the the Splunk Distribution of OpenTelemetry Collector or through Infrastructure Monitoring public cloud integrations for hosts, containers, and the services running on them.

   * - Bundled metrics
     - Additional metrics sent through Infrastructure Monitoring public cloud integrations that are not attributed to specific hosts or containers. They are included as part of a host-based subscription and you are not charged for them.

   * - Custom metrics
     - Metrics reported to Infrastructure Monitoring outside of the host, container, or bundled metrics. Custom metrics are often used for application monitoring, such as counting the number of Splunk Infrastructure Monitoring API calls or measuring the duration of the API requests. They might also include system or service metrics that you configure the Splunk distribution of OpenTelemetry Collector to send outside of its default set of metrics. Your Infrastructure Monitoring subscription allows you to send a certain number of custom metrics.

.. note:: In this context, the term "metric" refers to what is called a metric time series (MTS).

.. _about-high-res:

Differences between high-resolution metrics and standard-resolution metrics
---------------------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Metrics type`
     - :strong:`Description`

   * - Standard-resolution metrics
     - Metrics processed by Infrastructure Monitoring at the coarser of their native resolution or at 10-second resolution. In other words, they are never displayed at a resolution finer than 10 |nbsp| seconds.

   * - High-resolution metrics
     - Metrics processed by Infrastructure Monitoring at their native resolution or at 1-second resolution (whichever is coarser). High-resolution metrics enable exceptionally fine-grained and low-latency visibility and alerting for your infrastructure, applications, and business performance. Your Infrastructure Monitoring subscription allows you to send a certain number of high-resolution metrics.

.. note:: In this context, the term "metric" refers to what is generally called a metric time series (MTS).

..
    _how-counted:

.. the following is placeholder text that might be added someday
   It should be moved into an include file  -- brs

   How are high-resolution metrics counted?
   ----------------------------------------------------------------------------------

   If you have a hi res metric that is coming from a container or host (ie in the Host plan) it will still contribute to those host/container counts plus hi res counts (edited)

   if you have a custom metric that is hi-res it will only be included in the hi res count

..    usage-about:

..
..
.. About usage reports
.. =============================================================================
..
..
.. -  The :ref:`Monthly Usage report<summary-by-month>`, available on the Billed Usage tab, shows the number of hosts and containers sending in data for each hour within the month, and the number of custom metrics (MTS) and high resolution metrics sent in each hour.
..
..
   ref:`dimension-report`:
..
..
.. - The :ref:`dimension-report`, available on the Usage Breakdown tab, shows on a daily basis the number of data points and time series for a given dimension value, as well as its average reporting frequency. It is useful for understanding the nature of the data your organization is sending so you can tune it accordingly. For example, you might notice that there are some metrics that you do not want to send at all, and conversely, you might see that there are some metrics that you want to send at a higher resolution.



.. _using-page:


View and download an Infrastructure Monitoring usage report
=============================================================

Follow these steps to view and download a usage report for your Infrastructure Monitoring subscription.

Prerequisites
-------------

You have to be an admin to view and download usage reports.


View a usage report
---------------------

To view available usage reports:

1. Log in to Splunk Observability Cloud.

2. In the left navigation menu, select :menuselection:`Settings > Subscription Usage`.

3. Select the :strong:`Infrastructure Monitoring` tab.

You can see a chart showing your current usage numbers for hosts, containers, custom metrics, and high-resolution metrics. Below the chart, you might see additional charts representing usage trends that you can customize to show different data or different time periods.

Download a usage report
-------------------------

To view usage reports available for download:

1. Log in to Splunk Observability Cloud.

2. In the left navigation menu, select :menuselection:`Settings > Subscription Usage`.

3. Select the :strong:`Infrastructure Monitoring` tab.

4. Click :guilabel:`View detailed usage reports`.

5. Click a report link on the :guilabel:`Billed Usage` tab or :guilabel:`Usage Breakdown` tab to download it as a tab-delimited text file. In some browsers, you might have to right-click on a report to save the report.

.. note:: If you have switched from a DPM-based subscription plan to a plan based on the number of hosts or metrics that Infrastructure Monitoring monitors for you, older reports on the :guilabel:`Billed Usage` tab indicate that they represent DPM-based data. Reports on the :guilabel:`Usage Breakdown` tab are not available for dates before changing your subscription.

.. _summary-by-month:

Monthly usage report
====================

This report is available on the :guilabel:`Billed Usage` tab. For each hour within the month (or month to date, for the current month), this report shows the number of hosts and containers monitored and the number of custom metrics and high-resolution metrics sent to Infrastructure Monitoring. This report follows your usage period and uses the month when a usage period starts as the label in the report link. For example, if your usage period begins on the 10th of the month, then a link for 'March 2021' covers March 10 through April 9, 2021.

You can use the monthly usage report to determine whether your usage is in line with your subscription plan. You can use the data to calculate your average usage, how many hours in the month you have been over or under your plan, and by how much.

The report has six columns:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Column`
     - :strong:`Description`

   * - Date
     - Follows the mm/dd/yy format.

   * - Hour Ending
     - Follows the 24 hour hh:mm UTC format. For example, 01:00 indicates the hour from midnight to 1:00 AM UTC.

   * - # Hosts
     - The number of hosts that sent data during the specified hour.

   * - # Containers
     - The number of containers that Infrastructure Monitoring monitored during the specified hour.

   * - # Custom Metrics
     - The number of non-high-resolution custom metrics (MTS) that were sent to Infrastructure Monitoring during the specified hour.

   * - # High Res Metrics
     - The number of high-resolution metrics (MTS) that were sent to Infrastructure Monitoring during the specified hour.

.. _summary-including-children:

Monthly usage report (multiple organizations)
=============================================

If you have multiple organizations associated with your Infrastructure Monitoring subscription, an option for a summary report that includes information on multiple organizations is also available. Similar to the :ref:`summary-by-month`, this report shows hourly information for hosts, containers, custom metrics, and high-resolution custom metrics. However, this report also includes this data for each organization associated with your subscription.

.. _summary-by-hour:

Hourly usage detail report
==============================

Available on the :strong:`Usage Breakdown` tab, the hourly usage report shows the information on MTS associated with data points sent from hosts or containers in a given hour. This report contains the MTS category keys and values, along with associated cloud provider metadata.

With this report, you can see all of the MTS categories used within a given hour period.

.. note:: Hourly reports are only available for host-based subscriptions.

The following table explains the different columns in an hourly usage detail report.

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Column`
     - :strong:`Description`


   * - Category Type
     - Type of the MTS category: ``1`` (host) or ``2`` (container)

   * - Category name
     - Name of the MTS category: host or container

   * - Token Id
     - ID of the token associated with the category, if any
  
   * - Token Name
     - Name of the token associated with the category, if any
   
   * - Category Key
     - Key of the category. For example, ``AWSUniqueId``

   * - Category Value
     - Value of the category
  
   * - Cloud Provider
     - Name of the cloud provider for the category
  
   * - Cloud Region
     - Cloud region associated with the category, if available

   * - Availability Zone
     - Availability zone associated with the category, if available
  
   * - Project Name
     - Name of the project associated with the category, if available

   * - Project Number
     - Number of the project associated with the category, if available

   * - Subscription
     - Subscription associated with the category, if available


.. _dimension-report:

Dimension report
================

Available on the :guilabel:`Usage Breakdown` tab, the dimension report shows the MTS information associated with data points sent from hosts or containers and information related to custom, high-resolution, and bundled MTS. It breaks down the totals by dimension so that you can trace the origination of the data.

The dimension report shows the nature of the data your organization is sending so you can adjust the data accordingly. For example, you might see some dimensions (such as ``environment:lab``) that indicate you are sending data for hosts or services that you don't want to monitor using Infrastructure Monitoring.

You can select or type in a date for this report. All values in the report are based on the 24 |hyph| hour period (in UTC) for the date.

The report has 22 columns: two for dimension name and value, and four for each type of usage metric (host, container, custom, high-resolution, or bundled). If you are on a custom metrics subscription plan, you can't see columns for host or container metrics in your report.

The following table explains the different columns in a dimension report:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Columns`
     - :strong:`Description`

   * - Dimension Name and Dimension Value
     - Key/value pairs of the dimensions that are sent in with your metrics. Unique combinations of dimensions and metrics are represented as MTS in Infrastructure Monitoring. The values in each row represent counts associated with the MTS for the specified dimension name and value.

   * - No. [usage metric type] MTS
     - During the report's 24-hour period (UTC), the number of unique MTS for which at least one data point was received from a host or a container; the number of custom, high-resolution, or bundled MTS.

   * - New [usage metric type] MTS
     - During the report's 24-hour period (UTC), the number of unique MTS for which data was received from a host or a container on that date for the first time; the number of custom metrics, high-resolution, or bundled MTS associated with data that was received on that date for the first time.

   * - Avg [usage metric type] MTS Resolution
     - The average reporting frequency (native resolution) of the data points comprising the MTS. This value is averaged across the number of MTS and throughout the 24 |hyph|  hour period represented by the report's date. For example, a value of 10 means the data is being sent every 10 seconds, that is, has a 10s native resolution; a value of 300 means that the data is being sent every 5 minutes, that is, has a 5m native resolution, as is the case with standard AWS CloudWatch metrics. This value is calculated as an average across all of the MTS associated with the relevant dimension value. As a result, it may contain outliers (for example, an MTS reporting more slowly or with more significant jitter or lag) that skew the average. For example, for data sent every 5 minutes (300 seconds), you might see a value of 280 or a value of 315. This value should be treated as an approximate number that guides what you do with your metrics, rather than a way of auditing the precise timing of them.

   * - No. [usage metric type] Data points
     - During the report's 24-hour period (UTC), the number of data points received by Infrastructure Monitoring from hosts or containers; the number of data points associated with custom, high-resolution, or bundled MTS.

.. Keeping the following labels (per-dimension and by-dimension) because they may have been used in the past --brs

.. _metrics-per-dimension:

.. _metrics-by-dimension:

.. _custom-metric-report:

.. _custom-metrics-report:

Older report format
--------------------------------

The :ref:`dimension-report` is a revised format of the report formerly called the Metrics by Dimension report. If you select a date for the Dimension report earlier than the new format's release, the report you download is formatted like the older Metrics by Dimension report. The old report format provides an aggregate view of the data; that is, it doesn't show different values for different usage metrics (host, container, and so on).

Custom metric report
====================

Available on the :guilabel:`Usage Breakdown` tab, custom metric report shows the information on MTS associated with data points sent from hosts or containers, as well as information related to custom, high-resolution, and bundled MTS, for a specified date. The content of most columns in this report represents the same kinds of values as the :ref:`dimension-report`, except that the information is broken down by metric name instead of by dimension name and value. Therefore, you can see how Infrastructure Monitoring is categorizing data associated with each metric.

A significant difference about this report is how you can use the No. |nbsp| Custom |nbsp|  MTS column. For example, there is a non-zero value in this column. In that case, the metric is designated as a custom metric, and all MTS for this metric are counted towards the quota associated with your Infrastructure Monitoring plan. Knowing how many custom MTS your organization is sending can help you tune your usage accordingly. For example, you might notice some custom metrics that you no longer want to report to Infrastructure Monitoring. Conversely, you might decide to increase the number of custom metrics in your plan, so that you can avoid overage charges. You can use the No. |nbsp| High |nbsp| Resolution |nbsp| MTS column in the same way.


.. _host-overages:

Manage overage charges
=========================

When you exceed your subscription limits for a sustained period of time during a monthly usage period, Splunk Observability Cloud might charge overage fees to your organization.


.. _calc-monthly-use:

How we calculate monthly usage
-----------------------------------

The number of hosts, containers, and other resources that Infrastructure Monitoring monitors can fluctuate significantly over the course of a month. For this reason, Observability Cloud calculates monthly usage by using averages.

- To calculate monthly usage for hosts and containers, Observability Cloud counts the number of unique hosts and containers sending metrics during each hour in the month. It then calculates the average of these counts to determine monthly usage.

- To calculate monthly usage for custom and high-resolution metrics, Observability Cloud counts the number of custom and high-resolution metrics sent during each hour in the month. It then calculates the average of these counts to determine monthly usage.

Overage fees apply to each type of object individually. For example, suppose your subscription plan covers 25 hosts and 10 containers per host, or 250 containers. Let's also suppose that you are over your limits as follows:

- Hosts: 35

   This is 10 hosts more than the subscription limit of 25.

- Containers: 300

   This is 50 containers more than the subscription limit of 250.

In this case, Observability Cloud will charge overage fees for 10 hosts and for 50 containers.

However, note that paying the overage fee for 10 hosts doesn't automatically add 100 containers to your subscription limit and thus accommodate for the 50 additional containers. You must add 10 hosts to your subscription plan, as discussed in :ref:`avoid-fees`, to add support for an additional 100 containers.


.. _detect-subscription-limits:

Create a detector to receive alerts about subscription limits
---------------------------------------------------------------

Overage fees can be as high as 110% of the monthly list price for each element for which you are over your plan's limit. To help avoid overage fees, :ref:`create a detector<create-detectors>` to proactively monitor for potential overages and receive alerts when you are nearing a subscription limit.

When creating the detector, you can use these metrics as signals on the :guilabel:`Alert signal` tab.

.. list-table::
   :header-rows: 1
   :widths: 25 75

   *  -  :strong:`Item to alert on`
      -  :strong:`Metric to use as the detector signal`

   *  -  Hosts
      -  ``sf.org.numResourcesMonitored``, filtered on the dimension ``resourceType:host``

   *  -  Containers
      -  ``sf.org.numResourcesMonitored``, filtered on the dimension ``resourceType:container``

   *  -  Custom metrics
      -  ``sf.org.numCustomMetrics``

   *  -  High-resolution metrics
      -  ``sf.org.numHighResolutionMetrics``

Also, consider using one of the following conditions on the :guilabel:`Alert condition` tab:

- :ref:`Static Threshold<static-threshold>` condition: Set the threshold to a relatively high percentage of your limit.

- :ref:`Resource Running Out<resource-running-out>` condition: In :guilabel:`Alert settings`, set :guilabel:`Capacity` to your limit. In :guilabel:`Alert settings`, select :guilabel:`Show advanced settings`, set the :guilabel:`Double EWMA` option to :guilabel:`Yes`.


.. _avoid-fees:

How to avoid overage fees
-------------------------------

If you are approaching or over your limit in any area, you have a few options available to avoid overage fees.

You can monitor fewer hosts, send in fewer custom metrics, and so forth. However, this approach of reducing your monitoring coverage is generally not the ideal solution.

Instead, Observability Cloud recommends that you correctly size your subscription, increasing your limits to match your need for hosts, containers, custom metrics, or high-resolution metrics.

If you have a Standard Edition pricing plan, you can upgrade your subscription to the Enterprise Edition, which includes support for monitoring more containers, custom metrics, and high-resolution metrics per host.

Another option is to purchase support for increasing your limits on any of these items. To get help with understanding which option is best for your organization, contact :ref:`support`.
