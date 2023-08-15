.. _aws-post-install:

***********************************************
Leverage data from your integration with AWS
***********************************************

.. meta::
  :description: After connecting your AWS account to Splunk Observability Cloud, you can perform the actions described in this topic.

You can use Splunk tooling to monitor, collect, process, and send AWS data after you integrate your AWS with Splunk Observability Cloud. See :ref:`infrastructure-aws`.

By default, Splunk Observability Cloud will bring in data from all supported AWS services associated with your account, with :ref:`certain limitations <aws-data-limits>`. To manage the amount of data to import, see :ref:`specify-data-metadata`.

Verify your metrics collection method
============================================

You can use either Splunk Observability Cloud or your AWS CloudWatch console to confirm whether your metrics are collected by polling or by CloudWatch metric streams:

- In Splunk Observability Cloud: Use the :ref:`Plot Editor <specify-signal>` for Splunk Infrastructure Monitoring to select the org metric ``sf.org.num.awsServiceCallCount`` and filter by the ``method`` property using check boxes to select the following values: ``putMetricStream``, ``getMetricData``, ``getMetricStream``.
- In the AWS CloudWatch console, go to :guilabel:`All`, then :guilabel:`Usage`. Select :guilabel:`By AWS resource`, then :guilabel:`CallCount`, open the ``CallCount`` metric and select the following CloudWatch service resources values  ``putMetricStream``, ``getMetricData``, ``getMetricStream``.

Explore your AWS inventory and data
============================================

Review your AWS inventory in Splunk Observability Cloud. To learn about the data model of Splunk Observability Cloud, see :ref:`data-model`.

Locate your metrics
------------------------------------------------------

- In the :guilabel:`Data Management` section, select :strong:`AWS` from the :guilabel:`Deployed Integrations` list, then select your AWS integration to access the :guilabel:`Data Summary`. Note that depending on how you retrieve metrics (polling or Metric Streams), the Summary UI is different, and :ref:`org metrics <org-metrics>` also differ. 
- Use the :guilabel:`Metric Finder` on the left nav menu to get a list of categories you can browse, drawn from your integrations or custom categories, if configured. See :ref:`Metric Finder <metrics-finder-and-metadata-catalog>` for details.
- Go to :guilabel:`Settings`, then select :guilabel:`Metric Metadata` to acccess the Metadata Catalog. Use it to find metadata associated with the metrics you send to Splunk Infrastructure Monitoring. See :new-page:`Use the Metadata Catalog <https://docs.splunk.com/Observability/metrics-and-metadata/metrics-finder-metadata-catalog.html#use-the-metadata-catalog>` for details.
- Use the Infrastructure Monitoring navigators to explore the collection of technologies used to build, run, and deploy applications in your data ecosystem. See :ref:`use-navigators-imm` for more information. 

See your logs 
------------------------------------------------------

If you have access to Splunk Log Observer and selected the CloudWatch Logs option during configuration, you can review detailed log information. 

.. caution:: Splunk Log Observer is no longer available for new users. You can continue to use Log Observer if you already have an entitlement.

In the :guilabel:`Data Management` section, select :strong:`AWS` from the :guilabel:`Deployed Integrations` list, then select your AWS integration to access the :guilabel:`Data Summary`. Select the :menuselection:`Log Events` tab and click :guilabel:`Explore Log Events` to view more details using Splunk Log Observer.

For more information, see :ref:`Introduction to Splunk Log Observer <get-started-logs>`.

Use Dashboards and Related Content
------------------------------------------------------

Explore your AWS data using :strong:`our default dashboards`:

1. To access these dashboards, click :guilabel:`Menu` and select :guilabel:`Dashboards`. The Dashboards page displays. See :ref:`Dashboards in Splunk Observability Cloud <dashboards>` for details.
2. Search for :guilabel:`AWS`. Several AWS dashboard groups display.
3. Click a link to access a dashboard.

:ref:`Use Related Content <get-started-relatedcontent>` to jump between components of Splunk Observability Cloud by clicking related data.

Create detectors and alerts
================================

You can create detectors and alerts based on your AWS data.

- Detectors define rules for identifying conditions of interest and the notifications to send when those conditions occur or stop occurring.

- Alerts indicate that incoming data has triggered one of your detectors.

See :ref:`Introduction to alerts and detectors in Splunk Observability Cloud <get-started-detectoralert>` for details.

Expand your data collection
====================================

Splunk Observability Cloud uses OpenTelemetry to support efficient instrumentation so that you can see your metrics, traces, and logs.

If you haven't already done so, you can install the Splunk Distribution of OpenTelemetry Collector to collect, process, and send data. See :ref:`Install the Splunk Distribution of OpenTelemetry Collector <otel-install-platform>` for details.

You can also set up Splunk APM :ref:`Splunk APM <get-started-apm>` to monitor traces from your applications, provided you've already installed the Splunk Distribution of OpenTelemetry Collector. See :ref:`Introduction to Splunk APM <get-started-apm>` for details.


