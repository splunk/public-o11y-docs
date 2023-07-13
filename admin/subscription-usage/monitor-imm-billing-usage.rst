.. _monitor-imm-billing-usage:

***************************************************************************************
Infrastructure Monitoring subscription usage (Host and metric plans)
***************************************************************************************

.. meta::
      :description: Splunk Infrastructure Monitoring administrators can view the usage information for the organization. The application provides a summary and detailed reports. In addition to counts for hosts and containers, the reports also contain counts for custom metrics and high-resolution metrics.

.. note:: Read this document if your organization's subscription plan is based on the number of hosts or metrics you're monitoring with Infrastructure Monitoring. If your usage plan is based on the rate at which you send data points to Infrastructure Monitoring (DPM), see :ref:`dpm-usage`. 
  
  This topic describes general aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team. 

Observability Cloud provides a summary and detailed subscription usage reports to help you understand and manage the data you monitor with Infrastructure Monitoring. This information is available to Admin users only.

.. _about-custom-high-res:
.. _about-custom:

Metrics in Infrastructure
==================================================

Infrastructure Monitoring collects metric time series (MTS) with different categories of metrics.

* In MTS-based plans, all metrics are custom.
* In host-based plans, the following categories apply:

.. list-table::
  :header-rows: 1
  :width: 100
  :widths: 20, 80

  * - :strong:`Metric category`
    - :strong:`Description`

  * - Host and container metrics
    - * Default metrics sent by the Splunk Distribution of OpenTelemetry Collector or through Infrastructure Monitoring public cloud integrations for hosts, containers, and the services running on them.

  * - Bundled metrics
    - * Additional metrics sent through Infrastructure Monitoring public cloud integrations that are not attributed to specific hosts or containers. 
      * They are included as part of a host-based subscription, so you're not charged for them.

  * - Custom metrics 
    - * Metrics reported to Infrastructure Monitoring outside of the host, container, or bundled metrics. 
      * Custom metrics are often used for application monitoring, such as counting the number of Splunk Infrastructure Monitoring API calls or measuring the duration of the API requests. 
      * You can also configure the Splunk Distribution of OpenTelemetry Collector to send custom metrics (such as system or service metrics) outside of its default set of metrics.
      * Your Infrastructure Monitoring subscription lets you send a certain number of custom metrics. If you exceed this number your organization might be overcharged.

Learn more about metric categories in :ref:`metrics-category`.

.. _about-high-res:

Standard and high-resolution metrics
-------------------------------------------------------------------------------------

Metric resolution does not affect billing in host-based plans. To learn more, see :ref:`metric-resolution`.

.. _using-page:

Access Infrastructure Monitoring usage reports
====================================================================

Infrastructure Monitoring usage reports help you understand the amount of data you're sending. Use these reports to manage your costs and ensure you're collecting the correct data.

.. note:: To view and download usage reports, you must be an organization admin.

View and download usage reports
-----------------------------------------

Go to :menuselection:`Settings > Subscription Usage > Infrastructure Monitoring` to see a chart showing your current usage numbers for hosts, containers, custom metrics, and high-resolution metrics. Below the chart, you might see additional charts representing usage trends that you can customize to show different data or different time periods.

In :guilabel:`View detailed usage reports`, select the :guilabel:`Usage` or :guilabel:`Usage Breakdown` tabs to download available reports as a tab-delimited text file. In some browsers, you might have to right-click on a report to save the report.

If you have switched from a DPM-based subscription plan to a plan based on the number of hosts or metrics you monitor with Infrastructure Monitoring, older reports on the :guilabel:`Usage` tab indicate that they represent DPM-based data. Reports on the :guilabel:`Usage Breakdown` tab are not available for dates before changing your subscription.

.. _summary-by-month:

Monthly usage report
=============================

This report is available on the :guilabel:`Usage` tab. For each hour within the month (or month to date, for the current month), this report shows the number of hosts and containers monitored and the number of custom metrics and high-resolution metrics sent to Infrastructure Monitoring. This report follows your usage period and uses the month when a usage period starts as the label in the report link. For example, if your usage period begins on the 10th of the month, then a link for 'March 2022' covers from March 10 through April 9, 2022.

You can use the monthly usage report to determine whether your usage is in line with your subscription plan. You can use the data to calculate your average usage, how many hours in the month you are over or under your plan, and by how much.

The report has six columns:

.. list-table::
   :header-rows: 1
   :width: 100
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
     - The number of non-high-resolution custom metrics (MTS) that are sent to Infrastructure Monitoring during the specified hour.

   * - # High Res Metrics
     - The number of high-resolution metrics (MTS) that are sent to Infrastructure Monitoring during the specified hour.

.. _summary-including-children:

Monthly usage report (multiple organizations)
----------------------------------------------------------------

If you have multiple organizations associated with your Infrastructure Monitoring subscription, an option for a summary report that includes information on multiple organizations is also available. Similar to the :ref:`summary-by-month`, this report shows hourly information for hosts, containers, custom metrics, and high-resolution custom metrics. However, this report also includes this data for each organization associated with your subscription.

.. _summary-by-hour:

Hourly usage detail report
==============================

Available on the :strong:`Usage Breakdown` tab, the hourly usage report shows the information on MTS associated with data points sent from hosts or containers in a given hour. This report contains the MTS category keys and values, along with associated cloud provider metadata, within a given hour period.

The following table explains the different columns in an hourly usage detail report.

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 20 80

   * - :strong:`Column`
     - :strong:`Description`

   * - Category Type
     - Type of the MTS category: ``1`` (host) or ``2`` (container).

   * - Category name
     - Name of the MTS category: host or container.

   * - Token Id 
     - ID of the token associated with the category, if any. Containers or hosts with TokenId 0 are generated when detectors are created. They aren't duplicates, and are not used in billing.
  
   * - Token Name
     - Name of the token associated with the category, if any.
   
   * - Category Key
     - Key of the category. For example, ``AWSUniqueId``.

   * - Category Value
     - Value of the category.
  
   * - Cloud Provider
     - Name of the cloud provider for the category.
  
   * - Cloud Region
     - Cloud region associated with the category, if available.

   * - Availability Zone
     - Availability zone associated with the category, if available.
  
   * - Project Name
     - Name of the project associated with the category, if available.

   * - Project Number
     - Number of the project associated with the category, if available.

   * - Subscription
     - Subscription associated with the category, if available.

.. _dimension-report:

Dimension report
=======================

Available on the :guilabel:`Usage Breakdown` tab, the dimension report shows the MTS information associated with data points sent from hosts or containers and information related to custom, high-resolution, and bundled MTS. It breaks down the totals by dimension so that you can trace the origination of the data.

The dimension report shows the nature of the data your organization is sending so you can adjust the data accordingly. For example, you might see some dimensions (such as ``environment:lab``) that indicate you are sending data for hosts or services that you don't want to monitor using Infrastructure Monitoring.

You can select or type in a date for this report. All values in the report are based on the 24 |hyph| hour period (in UTC) for the date.

The report has 22 columns: two for dimension name and value, and four for each type of usage metric (host, container, custom, high-resolution, or bundled). If you are on a custom metrics subscription plan, you can't see columns for host or container metrics in your report.

The following table explains the different columns in a dimension report:

.. list-table::
  :header-rows: 1
  :width: 100
  :widths: 20 80

  * - :strong:`Columns`
    - :strong:`Description`

  * - Dimension Name and Dimension Value
    - * Key/value pairs of the dimensions that are sent in with your metrics. Unique combinations of dimensions and metrics are represented as MTS in Infrastructure Monitoring. 
      * The values in each row represent counts associated with the MTS for the specified dimension name and value.

  * - No. [usage metric type] MTS
    - * During the report's 24-hour period (UTC), the number of unique MTS for which at least one data point was received from a host or a container, and the number of custom, high-resolution, or bundled MTS.

  * - New [usage metric type] MTS
    - * During the report's 24-hour period (UTC), the number of unique MTS for which data was received from a host or a container on that date for the first time, and the number of custom metrics, high-resolution, or bundled MTS associated with data that was received on that date for the first time.

  * - Avg [usage metric type] MTS Resolution
    - * The average reporting frequency (native resolution) of the data points comprising the MTS. This value is averaged across the number of MTS and throughout the 24 |hyph| hour period represented by the report's date. 
      * For example, a value of 10 means the data is sent every 10 seconds, so it has a 10s native resolution. A value of 300 means that the data is sent every 5 minutes, so it has a 5m native resolution (a typical value for standard AWS CloudWatch metrics). 
      * This value is calculated as an average across all of the MTS associated with the relevant dimension value. As a result, it might contain outliers (for example, an MTS reporting more slowly or with more significant jitter or lag) that skew the average. 
      * For example, for data sent every 5 minutes (300 seconds), you might see a value of 280 or a value of 315. Treat this value as an approximate number that guides what you do with your metrics, rather than a way of auditing the precise timing of them.

  * - No. [usage metric type] Data points
    - * During the report's 24-hour period (UTC), the number of data points received by Infrastructure Monitoring from hosts or containers, and the number of data points associated with custom, high-resolution, or bundled MTS.


.. _metrics-per-dimension:
.. _metrics-by-dimension:

Older report format
--------------------------------

The :ref:`dimension-report` is a revised format of the report formerly called the Metrics by Dimension report. If you select a date for the Dimension report earlier than the new format's release, the report you download is formatted like the older Metrics by Dimension report. The old report format provides an aggregate view of the data; that is, it doesn't show different values for different usage metrics (host, container, and so on).

.. _custom-metric-report:
.. _custom-metrics-report:

Custom metric report
===========================

Available on the :guilabel:`Usage Breakdown` tab, custom metric report shows the information on MTS associated with data points sent from hosts or containers, as well as information related to custom, high-resolution, and bundled MTS, for a specified date. The content of most columns in this report represents the same kinds of values as the :ref:`dimension-report`, except that the information is broken down by metric name instead of by dimension name and value. Therefore, you can see how Infrastructure Monitoring is categorizing data associated with each metric.

A significant difference about this report is how you can use the No. |nbsp| Custom |nbsp| MTS column. For example, there is a nonzero value in this column. In that case, the metric is designated as a custom metric, and all MTS for this metric count towards the quota associated with your Infrastructure Monitoring plan. Knowing how many custom MTS your organization is sending can help you tune your usage accordingly. For example, you might notice some custom metrics that you no longer want to report to Infrastructure Monitoring. Conversely, you might decide to increase the number of custom metrics in your plan, so that you can avoid overage charges. You can use the No. |nbsp| High |nbsp| Resolution |nbsp| MTS column in the same way.

.. _on-demand-report-host:

On demand MTS usage reports
===============================

You can track and control metric creation and cardinality using :ref:`Metrics Pipeline Management <metrics-pipeline>`.

To get a detailed breakdown of the metric time series (MTS) you've created and use, you can request a usage report for a specific time interval by contacting your tech support member or your account team. Learn more at :ref:`metrics-usage-report`.

.. _imm-throttling:

System limits and data throttling
====================================================================

Observability Cloud products, including Infrastructure Monitoring, have system limits to protect the service's performance. If you exceed those limits, the platform starts to throttle the data you send in. 

To learn more, see :ref:`per-product-limits`. 
