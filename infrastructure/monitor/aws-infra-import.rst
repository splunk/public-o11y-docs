.. _aws-infra-import:

*******************************************
Manage Amazon Web Services data import  
*******************************************

.. meta::
   :description: The Splunk Infrastructure Monitoring AWS integration imports AWS metrics, metadata, and logs from AWS CloudWatch. 

.. note:: 
   
   To set up your AWS integration see :ref:`get-started-aws`. 
   
   To understand the costs associated to working with AWS data in Splunk Observability Cloud see :ref:`aws-infra-costs`.

Splunk Observability Cloud's Amazon Web Services (AWS) integration imports metrics and metadata from AWS CloudWatch and the following :ref:`AWS services <aws-integrations>`, as well as other applications. 

After you've sent your AWS data, Splunk Observability Cloud helps you monitor your AWS resources and the applications that are using those resources. See how at :ref:`aws-infra-monitor`.

.. _aws-import-cloudwatch:
.. _cloudwatch-metric-sync:
.. _cloudwatch-agent:

Import AWS CloudWatch data and metadata
=============================================================================

AWS provides a CloudWatch agent that lets you import metrics, logs, and metadata. Metrics are data points identified by a name, and metadata is information that helps you identify aspects of the metrics such as its source. AWS metrics and metadata help you monitor and troubleshoot the AWS services you're using. They also help you monitor applications, such as Kubernetes clusters, that use the AWS services. See more at :ref:`aws-infra-monitor`.

By default, Splunk Observability Cloud brings in data from all :ref:`supported AWS services <aws-integrations>` associated with your account, with :ref:`certain limitations <aws-data-limits>`. 

AWS data in Splunk Observability Cloud
--------------------------------------------------------------------------------

During import, Infrastructure Monitoring gives the metrics special names so you can identify them as coming from AWS: 

- AWS metadata becomes dimensions and custom properties. 
- AWS tags are key-value pairs, so Infrastructure Monitoring converts them into custom properties.

To learn more, see :ref:`aws-oc-metrics`, or refer to the AWS documentation site.

.. _aws-namespaces:

Namespaces in Splunk Observability Cloud
--------------------------------------------------------------------------------

Splunk Observability Cloud imports metadata using the dimension ``namespace``. For most AWS services, the namespace name has the form ``"AWS/<NAME_OF_SERVICE>"``, such as "AWS/EC2" or "AWS/ELB". To select a metric time series (MTS) for an AWS metric when the metric has the same name for more than one service, such as ``CPUUtilization``, use the ``namespace`` dimension as a filter. 

To control the amount of data you import, you can specify the namespaces you want to import data from, add any AWS CloudWatch agent namespace as a custom namespace, or select the data you want to import or exclude from each namespace. For more information, see :ref:`specify-data-metadata`.

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

Splunk Observability Cloud also imports metrics, metadata, and logs for some of your applications that use AWS services, such as:

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

Control the data and metadata to import
=============================================================================

By default, Splunk Observability Cloud imports metrics from all built-in AWS namespaces, corresponding to these :ref:`AWS services <aws-integrations>`. Optionally, you can add custom namespaces. 

You can control data import with the following options:

* Region
* Namespaces
* Polling rate (not available for data streaming)
* Filtering 

.. _aws-control-namespaces:

Control data import using namespaces
--------------------------------------------------------------------------------

To limit the amount of AWS data to import, reduce the number of namespaces to pull data from:

* Specify a subset of :strong:`built-in namespaces` to import data from. On the UI, go to :guilabel:`Select built-in services to collect data from`, then choose the specific namespaces you want to work with. You can specify multiple built-in services.
   
* Specify the :strong:`custom namespaces` to import data from. On the UI, go to :guilabel:`Select custom services to collect data from`, type the name of the custom namespace, then press :guilabel:`Enter`. Using this procedure, you can specify multiple custom namespaces. Note that data from built-in services is imported as well.

* To discard data from built-in namespaces and :strong:`only import metrics from custom namespaces`, use the field ``syncCustomNamespacesOnly`` via the API. See how to do this in :new-page:`our developer portal <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-create-integration/>`.  

.. _aws-control-poll:

Control data import using the poll rate 
--------------------------------------------------------------------------------

You can also limit the amount of AWS data that the integration imports by changing the rate at which Infrastructure Monitoring polls AWS CloudWatch.

.. _aws-control-filter:
.. _aws-filter:

Control data import using filters
--------------------------------------------------------------------------------

You can specify filters to limit the data you want to import for a specific namespace. Filters don't affect tag syncing.  

  * If you're polling AWS data, you can filter built-in services with synced metadata based on AWS tags, metric names, or dimensions. Filters can either be inclusive or exclusive. 

  * If you're streaming AWS data, you can filter built-in services with synced metadata by metric name and dimensions. You can only use inclusive filters.

  * For services without metadata (including custom namespaces), you can only filter by metric names.

See how to filter data at :ref:`aws-control-example`.

.. note:: You must be an Administrator of your AWS account to specify namespaces and set filters.

.. _aws-filter-char: 

Unsupported characters for tags 
++++++++++++++++++++++++++++++++++++++++++++++++++++++

Be careful when choosing tag names. Splunk Observability Cloud only allows alphanumeric characters (lower and upper case latin letters and digits), the underscore ( ``_`` ) and the minus/hyphen ( ``-`` ) symbols. Spaces and unsupported characters are replaced by the underscore character. 

The following characters are not supported. This list is not exhaustive.

* periods ( ``.`` )
* colons ( ``:`` )
* forward slashes ( ``/`` )
* equal signs ( ``=`` )
* plus signs ( ``+`` )
* at symbols ( ``@`` ) 

.. _api-filters:

Advanced filtering using the API
++++++++++++++++++++++++++++++++++++++++++++++++++++++

You can specify more complex filtering options for a namespace by using the Infrastructure Monitoring API. In this case, the UI displays a message indicating that the filter is defined programmatically.
   
To see which metrics and tags are included or excluded for that namespace, click :guilabel:`View filter code`.

.. _aws-control-example:

Data import management examples
=========================================

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

Example: Filter AWS data using tags
--------------------------------------------------------------------------------

You can filter AWS data using AWS tags, only if Observability Cloud syncs tags for those AWS namespaces. For example, if you use Detailed Monitoring for EC2 instances in AWS, Infrastructure Monitoring imports the following dimensions:

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
