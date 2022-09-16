.. _dpm-usage:

**********************************************************************************
Monitor Splunk Infrastructure Monitoring billing and usage (DPM plans only)
**********************************************************************************

.. note:: 

   This topic applies to organizations whose subscription plan is based on the rate at which you are sending data points to Splunk Infrastructure Monitoring (DPM). If your organization's usage is based on the number of hosts or metrics that Splunk Infrastructure Monitoring is monitoring for you, see :ref:`monitor-imm-billing-usage`.


.. note:: This topic describes general aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team.

Admin users in your Splunk Observability Cloud organization can view the usage information for the
organization as a whole.


.. _dpm-usage-about:


About usage reports
=============================================================================

Splunk Infrastructure Monitoring provides summary and detail to help you understand and manage your metrics submission.

-  The first, :ref:`datapoints-per-minute-detail-report`, shows the total number of data points sent for each minute of a month (or month to date, for the current month). This information is helpful for understanding whether your rate of data submission has stayed within the limits of your Splunk Infrastructure Monitoring subscription.

-  The second, :ref:`datapoints-per-dimension-report`, shows on a daily basis the number of data points and time series for a given dimension value, as well as its average reporting frequency (resolution). It is useful for understanding the nature of the data your organization is sending so you can tune it accordingly. For example, you might notice that there are some metrics which you do not want to send at all, and conversely, you might see that there are some metrics that you want to send at a higher resolution.


.. _dpm-using-page:


About the Subscription Usage page
=============================================================================

To view available usage reports, select :menuselection:`Settings > Subscription Usage`. You see a usage chart that shows average and maximum DPM for the current usage period. Hovering over different points in the chart shows actual values below the chart. To see average and maximum usage for a previous period, choose the desired period from the dropdown menu.

.. image:: /_images/admin/dpm-usage-max.png
      :alt: Maximum usage chart for the usage period from Nov 1 - Dec 1
      :width: 85%

.. _dpm-usage-report:

To view usage reports available for download, click :guilabel:`View detailed usage reports`. Available reports are shown on the :strong:`Billed Usage` tab.

.. image:: /_images/admin/dpm-summary-tab.png
      :width: 99%

Different reports are available on the :strong:`Billed Usage` and :strong:`Usage Breakdown` tabs. Clicking on the icon for a report downloads the report. In some browsers, you might have to right click on the icon and save the report. 

All reports are tab-separated text files. They are designed to be imported into a spreadsheet application, such as Microsoft Excel, Google Sheets, and Apple Numbers.


.. _datapoints-per-minute-detail-report:

Data points per minute detail report
=============================================================================

This report, available on the Billed Usage tab, shows the total number of data points sent for each minute of a month (or month to date, for the current month). It follows your usage period, and uses the month in which a usage period starts as the label in the report link. For example, if your usage period starts on the 10th of the month, then a link for 'March 2018' will cover the period of March 10 through April 9, 2018.


Report format
-------------------------------------------------------------------


The report is a tab-separated text file. It is designed to be imported into a spreadsheet application, such as Microsoft Excel, Google Sheets or Apple Numbers.

Report contents
-------------------------------------------------------------------

The report has five columns:

-  Date

   Follows the mm/dd/yy format
   
-  Time

   24 hour hh:mm UTC
   
-  Streaming Datapoints

   The number of data points received by Splunk Infrastructure Monitoring through our ingest APIs for the specified date and time. This includes data points sent in using the API directly; via a supported agent like collectd using our write_http plugin configuration; through a client library; or using the SignalFx Gateway (formerly called the metric proxy).

-  Backfill Datapoints

   The number of data points received by Splunk Infrastructure Monitoring through the backfill API for the specified date and time.

-  Throttled Datapoints

   The number of data points actively dropped by Splunk Infrastructure Monitoring for the specified date and time.

For past months, the report includes streaming, backfill and throttled data points for all of the minutes in that month. For the current month, the report includes the data points for the month-to-date, and is updated once per day.

Use the report
-------------------------------------------------------------------


The report shows you the detail of how many data points Splunk Infrastructure Monitoring is receiving from your organization on a per-minute basis. In general, this is useful if you want to determine whether your usage is in line with your subscription plan. Using the data, it is easy for you to calculate your average usage, how many minutes in the month you have been over or under your plan, and by how much.


.. _aggregate-datapoints-per-minute-detail-report:

Aggregate data points per minute detail report
=============================================================================

If you are working in a Splunk Observability Cloud organization that has a parent-child relationship with other organizations, you will see an option for the Datapoints per minute report that includes information on child organizations. Like the :ref:`datapoints-per-minute-detail-report`, this report shows the number of data points sent to Splunk Infrastructure Monitoring for each minute within the month; however, this report also includes this data for all child organizations.


.. _datapoints-per-dimension-report:

Data points per dimension report
=============================================================================

This report, available on the Usage Breakdown tab, shows on a daily basis the number of data points and time series for a given dimension value, as well as its average reporting frequency.  Reports are for the 24-hour period (in UTC) represented by that date.

You can select or type in a date for this report. Data is retained for a limited amount of time.

Report format
-------------------------------------------------------------------

The report is a tab-separated text file. It is designed to be imported into a spreadsheet application, such as Microsoft Excel, Google Sheets or Apple Numbers.

Report contents
-------------------------------------------------------------------


The report has seven columns:

-  Dimension Name

-  Dimension Value

   Dimension Name and Dimension Value are the key/value pairs of the dimensions that are sent in with your metrics. Unique combinations of dimensions and metrics are represented as time series in Splunk Infrastructure Monitoring.

-  Number of Contributing Metric Time Series

   The number of metric time series associated with the dimension name and value.

-  Total Datapoints Received per Day

   The total number of data points received by Splunk Infrastructure Monitoring during the 24 hour period represented by the date of the report, again as associated with the dimension name and value.

   Note that if you sum up the Total Datapoints Received per Day column, it is possible that your total will be larger than what is reported in the Datapoints per Minute detailed usage report. This scenario would occur if any of your metrics report more than one dimension, in which case that data point would be counted multiple times in this report (once for each dimension).

-  Average DPM

   The data points per minute, averaged across the number of time series associated with the dimension name and value, and over the course of the 24 hour period represented by the date of the report.


-  Average Reporting Frequency for the Day

   The time (in seconds) between successive data points, averaged across the number of time series associated with the dimension name and value, and over the course of the 24 hour period represented by the date of the report. For example, a value of 10 means the data is being sent every 10 seconds, i.e. has a 10s frequency; a value of 60 means that the data is being sent every minute, i.e. has a 1m frequency; and a value of 300 means that the data is being sent every 5 minutes, i.e. has a 5m frequency, as is the case with standard AWS CloudWatch metrics.

   Note that frequency is calculated as an average across all of the time series associated with the relevant dimension value, rather than measured for each individual time series. As a result, it may contain outliers (e.g. a time series that is reporting more slowly or with greater jitter or lag) that skew the average. For example, for data being sent every 5 minutes (300 seconds), you might see a value of 280, or a value of 315. Frequency should be treated as an approximate value that guides what you do with your metrics, rather than a way of auditing the precise timing of them.

-  Number of Contributing Metric Time Series Which Were Created Today

   The number of metric time series associated with the dimension name and value that were created over the course of the 24 hour period represented by the date of the report.


Using the report
-------------------------------------------------------------------


-  Metric names

   A good starting point for using the report is the ``sf_metric`` dimension. The dimension values are the names of the metrics being sent in, and you can see how much data is being sent in for each metric and at what resolution. Armed with this information, you can decide whether you want to send in that metric to Splunk Infrastructure Monitoring, and if so, how often.

-  collectd

   If you are using the Splunk Infrastructure Monitoring collectd agent, then another place to gain insight is to look at the plugin dimension. collectd collects metrics via plugins, and plugins are easy to install, uninstall, or configure (for their reporting interval).

-  Amazon Web Services

   If you are using the Amazon Web Services integration, you should also look at the namespace dimension. The AWS integration lets you select the services for which you want data, such as AWS Cloudwatch, and the namespace values tell you how much data is being sent in for each AWS service that is turned on.

-  Hosts and instances

   Finally, many people find the host, instanceId or similar dimensions worthwhile, as hosts or instances are often associated with different stages or environments. For example, you might decide that you want to have fewer metrics coming in from your test environment, and more from production. Knowing which hosts map to which stage or environment gives you insight into this question, and lets you manage your data submission accordingly.



