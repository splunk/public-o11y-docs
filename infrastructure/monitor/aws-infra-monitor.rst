.. _aws-infra-monitor:

**********************************
Monitor Amazon Web Services
**********************************

.. meta::
   :description: The Splunk Infrastructure Monitoring AWS integration imports AWS metrics, metadata, and logs from AWS CloudWatch. This information helps you monitor your AWS resources and the applications that are using those resources.

The Infrastructure Monitoring Amazon Web Services (AWS) integration imports metrics and metadata from AWS CloudWatch and the following :ref:`AWS services <aws-integrations>`, as well as other applications.

Metrics are data points identified by a name, and metadata is information that helps you identify aspects of the metrics such as its source. AWS metrics and metadata help you monitor and troubleshoot the AWS services you're using. They also help you monitor applications, such as Kubernetes clusters, that use the AWS services. 

To learn more about logs and AWS, see :ref:`get-started-logs`.

.. _aws-data:

About AWS data 
=============================================================================

See the AWS official documentation for a list of the available AWS metrics and other data, or see :ref:`the metadatada Observability Cloud provides <aws-infra-metadata>` for AWS.

By default, Observability Cloud brings in data from all :ref:`supported AWS services <aws-integrations>` associated with your account, with :ref:`certain limitations <aws-data-limits>`. To manage the amount of data to import, see :ref:`specify-data-metadata`.

.. _aws-namespaces:

AWS namespaces
-------------------------------------------------------------------

Infrastructure Monitoring imports AWS namespace metadata using the dimension ``namespace``. For most AWS services, the namespace name has the form ``"AWS/<NAME_OF_SERVICE>"``, such as "AWS/EC2" or "AWS/ELB". To select a metric time series (MTS) for an AWS metric when the metric has the same name for more than one service, such as ``CPUUtilization``, use the ``namespace`` dimension as a filter.

To control the amount of data you import, specify the namespaces you want to import as well as the data you want to import or exclude from each namespace. For more information, see :ref:`specify-data-metadata`.

.. _aws-unique-id:

Uniquely identifying AWS instances
-------------------------------------------------------------------

The AWS instance ID is not a unique identifier. To uniquely identify an AWS instance, you need to concatenate the ``instanceId``, ``region``, and ``accountID`` dimension values, separated by underscores "\_", as shown in the following example:

``instanceId_region_accountID``

To construct the identifier manually, first get the specified values for each of your instances. For example, you can
use the following ``cURL`` command:

.. code-block:: none

   curl http://<INSTANCE_URL>/latest/dynamic/instance-identity/document

Here's an example JSON response from the ``cURL`` command:

.. code-block:: json

   {
      "devpayProductCodes" : null,
      "privateIp" : "10.1.15.204",
      "availabilityZone" : "us-east-1a",
      "version" : "2010-08-31",
      "accountId" : "134183635603",
      "instanceId" : "i-a99f9802",
      "billingProducts" : null,
      "instanceType" : "c3.2xlarge",
      "pendingTime" : "2015-09-02T16:45:40Z",
      "imageId" : "ami-2ef44746",
      "kernelId" : null,
      "ramdiskId" : null,
      "architecture" : "x86_64",
      "region" : "us-east-1"
   }

From the response, copy the values for ``instanceId``, ``region``, and ``accountId``, then concatenate them with
underscores as separators.

Use the resulting string identifier as the value for the ``sfxdim\_AWSUniqueId`` dimension.

.. _sfx-aws-metrics:

Organization metrics related to AWS
-------------------------------------------------------------------

Infrastructure Monitoring also sends a set of metrics for AWS related to errors and service calls for your organization. These metrics all start with ``sf.org.num.aws``. For more information, see :new-page:`Usage metrics for Splunk Observability Cloud <https://quickdraw.splunk.com/redirect/?product=Observability&location=userdocs.infrastructure.aws.organization.metrics&version=current>`.

.. _aws-import-cloudwatch:
.. _cloudwatch-metric-sync:
.. _cloudwatch-agent:

Import AWS CloudWatch data and metadata
=============================================================================

AWS provides a CloudWatch agent that lets you import (or download) metrics, logs, and metadata. To import these metrics in Infrastructure Monitoring, add the namespace you use for the AWS CloudWatch agent as a custom namespace in your AWS integration, as described in the section :ref:`specify-data-metadata`. 

During this import, Infrastructure Monitoring gives the metrics special names so you can identify them as coming from AWS: 

- AWS metadata becomes dimensions and custom properties. 
- AWS tags are key-value pairs, so Infrastructure Monitoring converts them to custom properties.

To learn more, see :ref:`aws-oc-metrics`, or refer to the AWS documentation site.

.. _using-cloudwatch-metrics:

CloudWatch rollups and Infrastructure Monitoring MTS
--------------------------------------------------------------------------------

AWS CloudWatch uses rollups to summarize metrics, and it refers to them as "statistics". To learn more about rollups, see :ref:`rollups` in data resolution and rollups in charts.

Because AWS CloudWatch rollups don't map directly to Infrastructure Monitoring rollups, you can't directly access AWS CloudWatch rollups using the rollup selection menu in the Chart Builder. Instead, Infrastructure Monitoring captures the rollups as individual MTS that have the dimension ``stat``.

.. list-table::
   :header-rows: 1
   :width: 100
   :widths: 25 25 50

   *  - :strong:`AWS statistic`
      - :strong:`IM dimension`
      - :strong:`Definition`

   *  - Average
      - stat:mean
      - Mean value of metric over the sampling period

   *  - Maximum
      - stat:upper
      - Maximum value of metric over the sampling period

   *  - Minimum
      - stat:lower
      - Minimum value of metric over the sampling period

   *  - Data Samples
      - stat:count
      - Number of samples over the sampling period

   *  - Sum
      - stat:sum
      - Sum of all values that occurred over the sampling period

To use an AWS CloudWatch metric in a plot, always specify the following:

* AWS Cloudwatch metric name
* Filter for the ``stat`` dimension value that's appropriate for the metric you've chosen.

For example, if you are using the metric ``NetworkPacketsIn`` for EC2 metrics,
the only meaningful AWS statistics are ``Minimum``, ``Maximum`` and ``Average``. To plot ``NetworkPacketsIn`` metric with
the rollup you want, filter for the ``stat`` dimension with a value that corresponds to the AWS statistic (rollup) value:

* ``lower``: Rollup that corresponds to the AWS rollup ``Minimum``
* ``upper``: Rollup that corresponds to the AWS rollup ``Maximum``
* ``mean``: Rollup that corresponds to the AWS rollup ``Average``

.. note:: The "Rollup: Multiple" label in a plot for a CloudWatch metric indicates that you haven't specified the rollup you want. To avoid confusion, specify the rollup as soon as possible.

Infrastructure Monitoring uses a 60-second sampling period for metrics it imports from AWS.

To learn more, see the AWS developer documentation for AWS CloudWatch.

Import data and metadata from other applications
=============================================================================

Infrastructure Monitoring also imports metrics, metadata, and logs for some of your applications that use AWS services. The following table lists these applications.

.. list-table::
   :header-rows: 1
   :width: 100
   :widths: 30, 20, 50

   *  - :strong:`Get data in`
      - :strong:`Monitor`
      - :strong:`Description`

   *  - :ref:`get-started-k8s`
      - :ref:`infrastructure-k8s`
      - Import metrics and logs from Kubernetes clusters running in EC2 instances or EKS.

   *  -  - :ref:`get-started-linux`
         - :ref:`get-started-windows`
      - :ref:`infrastructure-hosts`
      - Import metrics and logs from Linux and Windows hosts running in EC2 instances.

   *  - :ref:`get-started-application`
      - :ref:`get-started-apm`
      - Import application metrics and spans running in hosts, Kubernetes clusters, or Lambda functions.

.. _specify-data-metadata:

Specify and limit the data and metadata to import
=============================================================================

By default, Observability Cloud imports metrics from all built-in AWS namespaces (corresponding to these :ref:`AWS services <aws-integrations>`), and optionally from custom namespaces. 

To limit the amount of AWS data to import, reduce the number of namespaces to pull data from. 

   * Specify a subset of :strong:`built-in namespaces` to import data from. On the UI, go to :guilabel:`Select built-in services to collect data from`, then choose the specific namespaces you want to work with. You can specify multiple built-in services.
   
   * Specify the :strong:`custom namespaces` to import data from. On the UI, go to :guilabel:`Select custom services to collect data from`, type the name of the custom namespace, then press :guilabel:`Enter`. Using this procedure, you can specify multiple custom namespaces. Note that data from built-in services is imported as well.

  * To discard data from built-in namespaces and :strong:`only import metrics from custom namespaces`, use the field ``syncCustomNamespacesOnly`` via the API. See how to do this in :new-page:`our developer portal <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-create-integration/>`.  

You can also limit the amount of AWS data that the integration imports by changing the rate at which Infrastructure Monitoring polls AWS CloudWatch.

Next, you can specify filters to limit the data you want to import:

   * For :ref:`built-in services <aws-integrations>` for which we sync metadata, you can filter the data based on AWS tags, metric names, or both. Filters don't affect tag syncing.  

   * For services without metadata (including custom namespaces), you can only filter by metric names.

.. note:: You must be an administrator of your AWS account to specify namespaces and set filters.

Example: Specify namespaces and filters
--------------------------------------------------------------------------------

The following example demonstrates how to specify the following:

* Namespace: Only import data from Amazon ElasticSearch Service and EC2.
* Data filters: Only import data from EC2 if it matches a filter.
* Tag filters: Exclude data from resources that have the AWS tag ``version:canary``.

To create these specifications, follow these steps:

#. From the list of namespaces, select Amazon ElasticSearch Service and EC2.
#. To limit the data Infrastructure Monitoring imports from EC2, select data filters from the list.
#. To select the filters you want from the following options:

   * Use :guilabel:`Import some` if you want a filter that only imports data.
   * Use :guilabel:`Exclude some` if you want a filter that only excludes data.

#. To use AWS tags to limit the data Infrastructure Monitoring imports, filter by tag. For this example, specify a filter that excludes data from resources that have the AWS tag ``version:canary``.

Infrastructure Monitoring adds the prefix ``aws_tag_`` to the names of tags imported from AWS, which indicates their origin. For example, the AWS tag ``version:canary`` appears in Infrastructure Monitoring as ``aws_tag_version:canary``. When you filter an AWS integration by tag, enter the name of the tag as it appears in AWS.

You can also choose specific metrics to include or exclude. For example, consider the following conditions.

.. image:: /_images/infrastructure/aws-metric-tag2.png
   :width: 55%

Infrastructure Monitoring only includes metricA and metricB, and only for resources specified by the tags:

-  For a resource that has the tag ``env:prod`` or ``env:beta``, metricA and metricB are included.
-  For a resource that doesn't have the tags ``env:prod`` or ``env:beta``, no metrics are included.
-  No other metrics are included.

Infrastructure Monitoring supports wildcards in filters. For example, if you want to import data for a resource that has specific tags, regardless of the tag values, specify this filter:

.. image:: /_images/infrastructure/aws-metric-tag-wildcard2.png
   :width: 55%

In this example, metricA and metricB are included for resources that have the ``env`` tag set to any value. No other metrics are included.

When you remove a namespace, Infrastructure Monitoring no longer includes metrics from that namespace.

.. _api-filters:

.. note:: You can specify more complex filtering options for a namespace by using the Infrastructure Monitoring API.
   In this case, the UI displays a message indicating that the filter is defined programmatically.
   To see which metrics and tags are included or excluded for that namespace, click :guilabel:`View filter code`.

.. _aws-filter:

Example: Filter AWS data using tags
--------------------------------------------------------------------------------

You can filter AWS data using AWS tags, but only with namespaces for which Infrastructure Monitoring syncs tags. For more information, see :ref:`aws-namespaces`. For example, if you use Detailed Monitoring for EC2 instances in AWS, Infrastructure Monitoring imports the following dimensions:

* ``AutoScalingGroupName``
* ``ImageId``
* ``InstanceId``
* ``InstanceType``.

You can use the following AWS metadata to filter metrics:

.. list-table::
   :header-rows: 1
   :width: 100
   :widths: 25 25 50

   *  - :strong:`Custom Property`
      - :strong:`Form`
      - :strong:`Description`

   *  - aws_account_id
      - key-value pair
      - AWS account ID for the instance, volume or load balancer. Use this property to differentiate between metrics you import.

   *  - aws_tag_<TAGNAME>
      - key and optional value
      - AWS custom tag name for the instance, volume or load balancer. A metric may have more than one associated custom tag name.

Use ``aws_account_id`` to differentiate between metrics you import from multiple AWS accounts. Infrastructure Monitoring adds ``aws_account_id`` as a dimension of the MTS for the metric.

For supported AWS services, Infrastructure Monitoring imports AWS tags and adds them as custom properties to the MTS for the metric. For example, if AWS tag has the value named Production, it will be shown in Infrastructure Monitoring as ``aws_tag_Production``.

.. _aws-filter-char: 

Unsupported characters 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Be careful when choosing tag names: Splunk Observability Cloud only allows alphanumeric characters, and the underscore and minus symbols. Unsupported characters include ``.``, ``:``, ``/``, ``=``, ``+``, ``@``, and spaces, which are replaced by the underscore character.    

.. _monitor-aws-services:

Monitor AWS services and identify problems
=====================================================

Visit the :strong:`Infrastructure page` to monitor the health of the AWS services you're using. It provides a key metric for each service. You can also drill down into specific instances of an AWS service. For example, start by viewing the key metrics for your EC2 service, and then filter for a specific instance ID to analyze the EC2 instance with that ID.

Follow these steps to find and troubleshoot AWS services from the Infrastructure page:

#. Select :menuselection:`Navigation menu > Infrastructure`, then click :guilabel:`Amazon Web Services` category.

#. Select the specific service you want to analyze. For example, click :guilabel:`EBS` to view information about your storage volumes. If you see the message :guilabel:`No Data Found`, you first need to configure the integration for the service.

#. Compare instances of the services to investigate their relative health. Select a metric from the :strong:`Color by` drop-down list.
   In the heat map, colors indicate the health of each instance based on the selected metric. For example, consider an AWS EBS heat map for the total number of I/O operations in a time period (Total IOPS). The heat map displays high Total IOPS in lighter colors, which indicates that the instances are healthy. In comparison, the heat map displays low IOPS in a darker color, which indicates that the instances have a I/O-related problem.

   If the heat map only uses green and red, then green indicates a healthy instance and red indicates a problem.

   To apply visually-accessible color palettes to heat maps, select :menuselection:`<USER-ID> > App Preferences`,
   then select your desired color accessibility from the :guilabel:`Color Accessibility` menu.

#. Investigate correlations between instances and their health by grouping the instances based on a dimension, custom property, or tag. To group instances, select the metadata name from the :guilabel:`Group by` drop-down list.

   .. note:: In the DynamoDB navigator, when you view the heatmap and group the instances by ``aws_account_id``, some entries might report back as "n/a" because properties are omitted when the query is not specific enough. To work around this issue, filter by :strong:`Operation`, then group by ``aws_account_id``.

#. Outliers are another indication of instance health. An outlier is a metric value that is significantly outside the mean or median value of all other metric values. To find the outliers in metrics coming from AWS services, use the :strong:`Find Outliers` setting and specify the :strong:`Scope` and :strong:`Strategy`:

   You can select one of two :strong:`Strategies` to find outliers, as described in the following table.

   .. list-table::
      :header-rows: 1
      :widths: 30 70

      *  - :strong:`Strategy`
         - :strong:`Description`

      *  - ``Deviation from Mean``
         - Instances shown in red are ones that exceed the mean value of the metric by at least three standard deviations.
   
      *  - ``Deviation from Median``
         - Instances shown in red are ones that exceed the median absolute deviation value by at least three absolute deviations. Deviation from Median This setting does not weigh extreme outliers as heavily as the standard deviation.

#. To drill down to a specific instance you want to investigate, hover over the heatmap to find the specific instance ID, then click the cell to see the information for that ID. For every instance, Infrastructure Monitoring provides a default dashboard.

The default dashboard helps you analyze all the available metadata about the cloud service the instance is running in, the instance itself, and any custom tags associated with the instance. The default dashboard provides metric time series (MTS) for key metrics.

.. _aws-dashboards:

Use default dashboards to monitor AWS services
===========================================================

Observability Cloud provides default dashboards for supported AWS services. Default dashboards are available in dashboard groups based on the AWS service a dashboard represents data for.

To find default dashboards for AWS services, select :strong:`Navigation menu > Dashboards` and search for the AWS service you want to view dashboards for.

Explore built-in content
-------------------------------------------------------------------

To see all of the navigators provided for data collected in your organization, go to the :strong:`Infrastructure` page. To see all the pre-built dashboards for data collected in your organization, select :strong:`Dashboards > Built-in`.

Amazon EC2 instances are powered by their respective public cloud service as well as the Splunk Distribution of OpenTelemetry Collector. You need both for all the charts to display data in the built-in dashboards.

- If you have only the public cloud service and the Smart Agent configured, some charts in the built-in dashboards for Amazon EC2 instances display no data.
- If you have only the public cloud service configured, you can see all the cards representing the services where data come from, but some charts in the built-in dashboards for Amazon EC2 instances display no data.
- If you have only Smart Agent configured, Amazon EC2 instance navigator isn't available.

.. _aws-costs:

Costs for AWS monitoring
===========================================================

Splunk Observability Cloud costs 
-------------------------------------------------------------------

Your subscription plan determines how you'll be charged for sending AWS metrics to Observability Cloud. See more in :ref:`monitor-imm-billing-usage`.

* In MTS-based subscription plans, all metrics are custom, and you're therefore charged for them.
* In host-based subscription plans, most AWS metrics are categorized as bundled, and are part of your plan. 

Bundled metrics include all metrics from :ref:`supported namespaces <aws-integrations>` as well as metrics from the following services:
  * CWAgent
  * Glue
  * MediaLive 
  * System/Linux 
  * WAF 

For a complete list of Observability Cloud metrics, see :ref:`metric-categories`.

AWS costs 
-------------------------------------------------------------------

Observability Cloud retrieves AWS metrics with two methods:

#. Streaming data with Metric Streams. 
#. Polling CloudWatch APIs:
   
   - First, the list of metrics is retrieved with ``ListMetrics``. 
   - Next, data points are fetched with ``GetMetricData``. Note that the ``GetMetricStatistics`` API is deprecated, see more in :ref:`aws-api-notice`.  

Learn more at :ref:`get-started-aws`.

AWS pricing 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AWS :strong:`pricing is based on the amount of requested metrics`, not the number of requests. Therefore the cost of obtaining Cloudwatch metrics for a service is based on three factors: frequency of pulling data, number of metrics for a given service, and number of cloud resources.

Generally speaking, Metric Streams costs the same as polling if the integration is synced every 5 minutes, and is cheaper (up to 5 times) when synced every minute.

However, when using Metric Stream you can't control costs, while you can configure the polling frequency of the APIs. See :ref:`how to limit the metrics to collect, the resources, or the collection frequently <specify-data-metadata>`. 

Example: Cost scenarios using polling APIs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Let's imagine a user with the following configuration: 

- 100,000 SQS queues
- 9 available CloudWatch metrics per queue 

First, you need to retrieve your list of metrics using the ``ListMetrics`` API at a cost of USD 0.01 per 1,000 API calls:

.. list-table::
   :header-rows: 1
   :width: 100
   :widths: 30 50 20 

   *  - :strong:`Scenario`
      - :strong:`Number of API calls per day`
      - :strong:`Cost/day`

   *  - Metrics are listed every 15 minutes, and a list contains up to 500 items
      - 1440 (number of minutes in a day)/15 (pull interval) * 100k / 500 (items) = 19200
      - USD 0.192 

Next, you retrieve the data using the ``GetMetricData`` API at a cost of USD 0.01 per 1,000 metrics requested:

.. list-table::
   :header-rows: 1
   :width: 100
   :widths: 30 50 20 

   *  - :strong:`Scenario`
      - :strong:`Number of requested metrics per day`
      - :strong:`Cost/day`

   *  - The user wants to retrieve all metrics every 1 minute
      - 1440 (number of minutes in a day) *  9 (number of metrics) * 100k (number of SQS resources) = 1.296B
      - USD 12,960  

   *  - The user wants to retrieve all metrics every 5 minutes
      - 1440 (number of minutes in a day)/5 (pull interval) *  9 (number of metrics) * 100k (number of SQS resources) = 259.2M
      - USD 2,592 

   *  - The user wants to retrieve ONLY 4 metrics for a 1,000 queues (because they're the production instances) every 10 minutes
      - 1440 (number of minutes in a day)/10 (pull interval) *  4 (number of metrics) * 1000 (number of SQS resources) = 576k
      - USD 5.76 
