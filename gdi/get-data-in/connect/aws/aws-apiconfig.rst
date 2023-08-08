.. _get-configapi:

********************************************************
Connect to AWS using the Splunk Observability Cloud API
********************************************************

.. meta::
  :description: Use the API to connect Splunk Observability Cloud to AWS, review permissions, configure the integration, collect logs, or activate CloudWatch Metric Streams.

To connect Splunk Observability Cloud to your AWS account, complete the following steps:

#. :ref:`Create an AWS connection <aws-api-create-connection>`. See the available :ref:`AWS regions <aws-regions>`.
#. :ref:`Review your IAM policy <review-aws-iam-policy>`. Specify whether to collect both metrics and logs, and whether to gather metrics by API polling (which is the default) or through CloudWatch Metric Streams.
#. :ref:`Configure your setup <aws-api-setup>`. 
#. Optionally, :ref:`activate Metric Streams <activate-cw-metricstreams>`.
#. :ref:`Collect logs <aws-api-logs>`.  
#. See :ref:`next steps <aws-api-next-steps>`. 

.. _aws-api-create-connection:

Create an AWS connection 
=====================================================

To connect Splunk Observability Cloud to AWS through the Splunk Observability Cloud API, open your command-line interface and perform the following steps:

#. :ref:`Create an external AWS ID <aws-api-create-id>`
#. :ref:`Create an AWS policy and IAM role <aws-api-create-policy-role>`

.. _aws-api-create-id:

Create an external AWS ID
---------------------------------------------------------------------

Use the ``-X`` flag on a POST request to create an AWS connection that generates an external ID:

.. code-block:: none

  curl -X POST 'https://app.<realm>.signalfx.com/v2/integration' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'x-sf-token: <USER_API_ACCESS_TOKEN>' \
    -H 'content-type: application/json' \
    --data-raw '{"name":"AWS-connection-name","type":"AWSCloudWatch","authMethod":"ExternalId","pollRate":300000,"services":[],"regions":[]}'

Your system response looks something like this:

.. code-block:: none

  {
  "authMethod" : "ExternalId",
  "enabled" : false,
  "externalId" : "<externalId>",
  "id" : "<id>",
  "importCloudWatch" : false,
  "name" : "AWS",
  "pollRate" : 300000,
  "regions" : [ ],
  "roleArn" : null,
  "services" : [ ],
  "type" : "AWSCloudWatch"
  }

In the system response, note the following:

- Values are displayed for the ``externalId`` and ``id`` fields.
- The ``importCloudWatch`` value is set to ``false`` because CloudWatch Metrics collection has not been configured.

.. _aws-api-create-policy-role:

Create an AWS policy and IAM role
---------------------------------------------------------------------

To create an AWS policy and an AWS IAM (Identity and Access Management) role with a unique Amazon Resource Name (ARN), use a PUT request with the ``externalId`` value generated in the previous step.

The following example shows a PUT request for collecting data from two regions and three AWS services. The regions involved are ``us-west-1`` and ``us-east-1``. Services are identified by the ``namespace`` tag.

.. code-block:: none

  curl -X PUT 'https://app.<realm>.signalfx.com/v2/integration/E78gbtjBcAA' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'x-sf-token: <USER_API_ACCESS_TOKEN>' \
    -H 'content-type: application/json' \
    --data-raw '{"authMethod": "ExternalId", "created": 1628082281828, "creator": "E73pzL5BUAI", "customCloudWatchNamespaces": null, "enableCheckLargeVolume": false, "enabled": true, "externalId": "<externalId>", "id": "<id>", "importCloudWatch": true, "largeVolume": false, "lastUpdated": 1628090302516, "lastUpdatedBy": "<id>", "name": "AWS", "pollRate": 300000, "regions": ["us-west-1", "us-east-1"], "roleArn": "<your-aws-iam-role-arn>", "services": [], "sfxAwsAccountArn": "arn:aws:iam::134183635603:root", "syncLoadBalancerTargetGroupTags": false, "type": "AWSCloudWatch", "key": null, "token": null, "namedToken": "Default", "namespaceSyncRules": [{"namespace": "AWS/S3"}, {"namespace": "AWS/EC2"}, {"namespace": "AWS/ApplicationELB"}]}'

For further information and more examples on how to integrate AWS monitoring with Splunk Observability Cloud, see :new-page:`our developer documentation <https://dev.splunk.com/observability/docs/integrations/aws_integration_overview#Integrate-AWS-monitoring-with-Splunk-Observability-Cloud>`.

.. _review-aws-iam-policy:

Review your IAM policy
=====================================================

To collect AWS data, review the permissions in this document:

* :ref:`Required permissions <aws-iam-policy-required>`
* :ref:`Permissions for the CloudWatch API <aws-iam-policy-cw>` 
* :ref:`Permissions for Metric Streams <aws-iam-policy-ms>`
* :ref:`Permissions for tag and properties collection <aws-iam-policy-services>`
* :ref:`Permissions for logs <aws-iam-policy-logs>`
* :ref:`Permissions for usage collection and reports <aws-iam-policy-reports>`

.. _aws-iam-policy-required:

Required permissions in Splunk Observability Cloud 
---------------------------------------------------------------------

Regardless of the services you want to use, you need the following permissions:

* ``organizations:DescribeOrganization``. Only needed when Amazon cost and usage metrics are activated.
* ``ec2:DescribeRegions``
* ``tag:GetResources``

.. _aws-iam-policy-cw:

Permissions for the CloudWatch API
-----------------------------------------------------------

Besides the :ref:`required permissions <aws-iam-policy-required>`, include these permissions to allow Splunk Observability Cloud to collect AWS metrics using the CloudWatch API:

* ``cloudwatch:GetMetricData``
* ``cloudwatch:ListMetrics``

For example:

.. code-block:: json

  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "cloudwatch:GetMetricData",
          "cloudwatch:ListMetrics",
          "ec2:DescribeRegions",
          "organizations:DescribeOrganization",
          "tag:GetResources"
        ],
        "Resource": "*"
      }
    ]
  }

.. _metricstreams_iampolicy:
.. _aws-iam-policy-ms:

Permissions for Metric Streams
-----------------------------------------------------------

Besides the :ref:`required permissions <aws-iam-policy-required>`, include these permissions to allow Splunk Observability Cloud to collect AWS metrics using CloudWatch Metric Streams:

- ``"cloudwatch:DeleteMetricStream"``
- ``"cloudwatch:GetMetricStream"``
- ``"cloudwatch:ListMetricStreams"``
- ``"cloudwatch:ListMetrics"``
- ``"cloudwatch:PutMetricStream"``
- ``"cloudwatch:StartMetricStreams"``
- ``"cloudwatch:StopMetricStreams"``
- ``"iam:PassRole"``

These permissions include the ``MetricStream`` phrase and the ``iam:PassRole`` permissions. Note the ``iam:PassRole`` permission is restricted to resources matching the ``arn:aws:iam::*:role/splunk-metric-streams*`` pattern. 

For example:

.. code-block:: json

  {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudwatch:GetMetricStream",       
        "cloudwatch:ListMetrics",
        "cloudwatch:ListMetricStreams",
        "cloudwatch:PutMetricStream",
        "cloudwatch:DeleteMetricStream",
        "cloudwatch:StartMetricStreams",
        "cloudwatch:StopMetricStreams",
        "ec2:DescribeRegions",
        "organizations:DescribeOrganization",
        "tag:GetResources"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": "arn:aws:iam::*:role/splunk-metric-streams*"
    }
  ]
  }


.. _aws-iam-policy-services:

Permissions for tag and properties collection
---------------------------------------------------------------------------------------

On top of the required permissions, you also need to include the specific permissions for the services you use in your AWS IAM policy to allow Splunk Observability Cloud to collect specific AWS tags and properties. You'll be able to use Infrastructure Monitoring :ref:`to filter metrics based on those tags and properties <aws-filter>`.

These are these permissions to allow Splunk Observability Cloud to collect AWS tags and properties:

- ``"apigateway:GET"``
- ``"autoscaling:DescribeAutoScalingGroups"``
- ``"cloudformation:ListResources"``
- ``"cloudformation:GetResource"``
- ``"cloudfront:GetDistributionConfig"``
- ``"cloudfront:ListDistributions"``
- ``"cloudfront:ListTagsForResource"``
- ``"directconnect:DescribeConnections"``
- ``"dynamodb:DescribeTable"``
- ``"dynamodb:ListTables"``
- ``"dynamodb:ListTagsOfResource"``
- ``"ec2:DescribeInstances"``
- ``"ec2:DescribeInstanceStatus"``
- ``"ec2:DescribeNatGateways"``
- ``"ec2:DescribeRegions"``
- ``"ec2:DescribeReservedInstances"``
- ``"ec2:DescribeReservedInstancesModifications"``
- ``"ec2:DescribeTags"``
- ``"ec2:DescribeVolumes"``
- ``"ecS:DescribeClusters"``
- ``"ecs:DescribeServices"``
- ``"ecs:DescribeTasks"``
- ``"ecs:ListClusters"``
- ``"ecs:ListServices"``
- ``"ecs:ListTagsForResource"``
- ``"ecs:ListTaskDefinitions"``
- ``"ecs:ListTasks"``
- ``"elasticache:DescribeCacheClusters"``
- ``"elasticloadbalancing:DescribeLoadBalancerAttributes"``
- ``"elasticloadbalancing:DescribeLoadBalancers"``
- ``"elasticloadbalancing:DescribeTags"``
- ``"elasticloadbalancing:DescribeTargetGroups"``
- ``"elasticmapreduce:DescribeCluster"``
- ``"elasticmapreduce:ListClusters"``
- ``"es:DescribeElasticsearchDomain"``
- ``"es:ListDomainNames"``
- ``"kinesis:DescribeStream"``
- ``"kinesis:ListShards"``
- ``"kinesis:ListStreams"``
- ``"kinesis:ListTagsForStream"``
- ``“kinesisanalytics:DescribeApplication”``
- ``“kinesisanalytics:ListApplications”``
- ``"kinesisanalytics:ListTagsForResource"``
- ``"lambda:GetAlias"``
- ``"lambda:ListFunctions"``
- ``"lambda:ListTags"``
- ``"rds:DescribeDBInstances"``
- ``"rds:ListTagsForResource"``
- ``"redshift:DescribeClusters"``
- ``"redshift:DescribeLoggingStatus"``
- ``"s3:GetBucketLocation"``
- ``"s3:GetBucketTagging"``
- ``"s3:ListAllMyBuckets"``
- ``"s3:ListBucket"``
- ``"states:ListActivities"``
- ``"states:ListStateMachines"``
- ``"sqs:GetQueueAttributes"``
- ``"sqs:ListQueues"``
- ``"sqs:ListQueueTags"``
- ``"tag:GetResources"``
- ``"workspaces:DescribeWorkspaces"``

.. note:: Cassandra permissions are declared as a separate object. See the example below.

Add the ``"<service>:<permission>"`` pair relevant to each service in the ``Action`` array of the :ref:`AWS IAM policy JSON <review-aws-iam-policy>`. For example:

.. code-block:: json

  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "apigateway:GET",
          "autoscaling:DescribeAutoScalingGroups",
          "cloudformation:ListResources",
          "cloudformation:GetResource",
          "cloudfront:GetDistributionConfig",
          "cloudfront:ListDistributions",
          "cloudfront:ListTagsForResource",
          "cloudwatch:GetMetricData",
          "cloudwatch:ListMetrics",
          "directconnect:DescribeConnections",
          "dynamodb:DescribeTable",
          "dynamodb:ListTables",
          "dynamodb:ListTagsOfResource",
          "ec2:DescribeInstances",
          "ec2:DescribeInstanceStatus",
          "ec2:DescribeNatGateways",
          "ec2:DescribeRegions",
          "ec2:DescribeReservedInstances",
          "ec2:DescribeReservedInstancesModifications",
          "ec2:DescribeTags",
          "ec2:DescribeVolumes",
          "ecs:DescribeClusters",
          "ecs:DescribeServices",
          "ecs:DescribeTasks",
          "ecs:ListClusters",
          "ecs:ListServices",
          "ecs:ListTagsForResource",
          "ecs:ListTaskDefinitions",
          "ecs:ListTasks",
          "eks:DescribeCluster",
          "eks:ListClusters",
          "elasticache:DescribeCacheClusters",
          "elasticloadbalancing:DescribeLoadBalancerAttributes",
          "elasticloadbalancing:DescribeLoadBalancers",
          "elasticloadbalancing:DescribeTags",
          "elasticloadbalancing:DescribeTargetGroups",
          "elasticmapreduce:DescribeCluster",
          "elasticmapreduce:ListClusters",
          "es:DescribeElasticsearchDomain",
          "es:ListDomainNames",
          "kinesis:DescribeStream",
          "kinesis:ListShards",
          "kinesis:ListStreams",
          "kinesis:ListTagsForStream",
          "kinesisanalytics:DescribeApplication",
          "kinesisanalytics:ListApplications",
          "kinesisanalytics:ListTagsForResource",
          "lambda:GetAlias",
          "lambda:ListFunctions",
          "lambda:ListTags",
          "logs:DeleteSubscriptionFilter",
          "logs:DescribeLogGroups",
          "logs:DescribeSubscriptionFilters",
          "logs:PutSubscriptionFilter",
          "organizations:DescribeOrganization",
          "rds:DescribeDBInstances",
          "rds:DescribeDBClusters",
          "rds:ListTagsForResource",
          "redshift:DescribeClusters",
          "redshift:DescribeLoggingStatus",
          "s3:GetBucketLocation",
          "s3:GetBucketLogging",
          "s3:GetBucketNotification",
          "s3:GetBucketTagging",
          "s3:ListAllMyBuckets",
          "s3:ListBucket",
          "s3:PutBucketNotification",
          "sqs:GetQueueAttributes",
          "sqs:ListQueues",
          "sqs:ListQueueTags",
          "states:ListActivities",
          "states:ListStateMachines",
          "tag:GetResources",
          "workspaces:DescribeWorkspaces"
        ],
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Action": [
          "cassandra:Select"
        ],
        "Resource": [
          "arn:aws:cassandra:*:*:/keyspace/system/table/local",
          "arn:aws:cassandra:*:*:/keyspace/system/table/peers",
          "arn:aws:cassandra:*:*:/keyspace/system_schema/*",
          "arn:aws:cassandra:*:*:/keyspace/system_schema_mcs/table/tags",
          "arn:aws:cassandra:*:*:/keyspace/system_schema_mcs/table/tables",
          "arn:aws:cassandra:*:*:/keyspace/system_schema_mcs/table/columns"
        ]
      }
    ]
  }

.. _aws-iam-policy-logs:

Permissions for log collection
----------------------------------------

These are the permissions to allow Splunk Observability Cloud to collect AWS logs. Include those related to your service in your IAM policy.

- ``"cloudfront:GetDistributionConfig"``
- ``"cloudfront:ListDistributions"``
- ``"cloudfront:ListTagsForResource"``
- ``"ec2:DescribeRegions"``
- ``"elasticloadbalancing:DescribeLoadBalancerAttributes"``
- ``"elasticloadbalancing:DescribeLoadBalancers"``
- ``"elasticloadbalancing:DescribeTags"``
- ``"elasticloadbalancing:DescribeTargetGroups"``
- ``"logs:DeleteSubscriptionFilter"``
- ``"logs:DescribeLogGroups"``
- ``"logs:DescribeSubscriptionFilters"``
- ``"redshift:DescribeClusters"``
- ``"redshift:DescribeLoggingStatus"``
- ``"s3:GetBucketLogging"``
- ``"s3:GetBucketNotification"``
- ``"s3:ListAllMyBuckets"``
- ``"s3:ListBucket"``
- ``"s3:PutBucketNotification"``
- ``"tag:GetResources"``

.. _aws-iam-policy-reports:

Permissions for usage collection and reports
------------------------------------------------------

Include these permissions to allow Splunk Observability Cloud to collect AWS usage data and reports:

- ``"ec2:DescribeRegions"``
- ``"organizations:DescribeOrganization"``

.. _aws-api-setup:

Configure your setup
=============================

Provide the ARN role to the Infrastructure Monitoring component of Splunk Observability Cloud. You can also configure your connection to support any of the following use cases:

- Collect metrics for selected regions and services using the CloudWatch API.
- Collect metrics for all regions and all services using the CloudWatch API.
- Collect metrics using CloudWatch Metric Streams by itself or together with log collection.

The following example shows how to collect metrics from all regions and services by leaving the regions and services values unspecified.

.. code-block:: none

  curl -X PUT 'https://app.<realm>.signalfx.com/v2/integration/E78gbtjBcAA' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'x-sf-token: <USER_API_ACCESS_TOKEN>' \
    -H 'content-type: application/json' \
    --data-raw '{"authMethod": "ExternalId", "created": 1628082281828, "creator": "E73pzL5BUAI", "customCloudWatchNamespaces": null, "enableCheckLargeVolume": false, "enabled": true, "externalId": "jobcimfczlkhwxlqwbum", "id": "E78gbtjBcAA", "importCloudWatch": true, "largeVolume": false, "lastUpdated": 1628090302516, "lastUpdatedBy": "E73pzL5BUAI", "name": "AWS", "pollRate": 300000, "regions": [], "roleArn": "<your-aws-iam-role-arn>", "services": [], "sfxAwsAccountArn": "arn:aws:iam::134183635603:root", "syncLoadBalancerTargetGroupTags": false, "type": "AWSCloudWatch", "key": null, "token": null, "namedToken": "Default", "namespaceSyncRules": []}'

.. _aws-configure-api-polling:

Configure API polling (optional)
========================================================

If you're retrieving AWS metrics polling CloudWatch APIs, keep in mind the following intervals: 

  - First, the list of metrics is retrieved with the ``ListMetrics`` API every 15 minutes. 
  
  - Next, data points are retrieved with the ``GetMetricData`` API. Note that the ``GetMetricStatistics`` API is deprecated, see more in :ref:`aws-api-notice`.  
  
    - Use ``pollRate`` to configure the polling interval for metrics. 
    - Use ``metadataPollRate`` to configure the polling interval for metadata. 
    - See :new-page:`how to configure the APIs in the developer portal <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-retrieve-integrations-query>` for more information.

.. _activate-cw-metricstreams:

Activate CloudWatch Metric Streams (optional)
========================================================

To activate CloudWatch Metric Streams as an alternative to traditional API polling, follow these steps:

#. Submit a GET request to ``https://api.<realm>.signalfx.com/v2/integration/<integration-id>`` to retrieve your current settings. Make sure to substitute your own realm and integration ID in the URL.
#. Set the ``metricStreamsSyncState`` field to ``ENABLED``.
#. Set the ``importCloudWatch`` field to ``true``.
#. Set the ``enabled`` field to ``true``.
#. Submit a PUT request to the ``https://api.<realm>.signalfx.com/v2/integration/<integration-id>`` endpoint to save your updated settings.

.. caution:: CloudWatch Metric Streams supports filtering by namespace and metric name but doesn't support filtering based on resource tags.   

Next, to complete the activation of Metric Streams:

#. If you haven't already, add the :ref:`relevant permissions to your AWS IAM policy <metricstreams_iampolicy>`.
#. In every region from which you want to stream metrics from, :ref:`deploy CloudFormation <metricstreams_cloudformation>`.

This creates:

- Kinesis Firehose.
- The S3 bucket, to back up the events that Kinesis Data Firehose fails to send to the specified HTTP endpoint.
- The IAM role that Metric Streams will use.
- The IAM role that allows Kinesis Firehose to write the S3 bucket.

See :new-page:`Create an AWS integration using an external ID and ARN <https://dev.splunk.com/observability/docs/integrations/aws_integration_overview/#Create-an-AWS-integration-using-an-external-ID-and-ARN>` in the Splunk developer documentation for syntax examples.

Deactivate Metric Streams
------------------------------------------------------

To deactivate Metric Streams, follow these steps:

#. Submit a GET request to ``https://api.<realm>.signalfx.com/v2/integration/<integration-id>`` to retrieve your current settings. Make sure to substitute your own realm and integration ID in the URL.
#. Set the ``metricStreamsSyncState`` field to ``CANCELLING``.
#. Wait for Splunk Observability Cloud to clean up. This can take up to 15 minutes. 

  * If Splunk Observability Cloud sets ``metricStreamsSyncState`` to ``DISABLED``, Metric Streams has been deactivated sucessfully.
  * If Splunk Observability Cloud sets ``metricStreamsSyncState`` to ``CANCELLATION_FAILED``, try again, or refer to :ref:`aws-ts-metric-streams`.

.. _metricstreams_cloudformation:

Deploy CloudFormation
===================================================

To collect CloudWatch Metric Streams or logs from all supported AWS services across all regions, select and deploy a CloudFormation template that supports metric streams or logs. Deploying the template creates the additional resources on your AWS account required both by Metric Streams (Kinesis Firehose, S3 bucket, IAM roles) and logs (Splunk AWS log collector lambda function, IAM role).

- See the :ref:`CloudFormation templates table <aws-cloudformation>` for more information.
- You can find your access token in your account's profile settings.

.. _aws-api-logs:

Collect logs
===================================================

To collect log data from any CloudWatch log group, perform the following steps:

#. Deploy one of the :ref:`CloudFormation templates <aws-cloudformation>` provided by Splunk that supports log collection.
#. Update your AWS integration using the ``curl -X PUT`` request to set the ``logsSyncState`` field value to ``ENABLED``.
#. Review the :ref:`required permissions for logs <aws-iam-policy-logs>`.

Splunk Observability Cloud synchronizes AWS integration settings with the logging configuration information on your AWS customer account every 5 minutes, adding triggers for newly-added services, and deleting triggers from regions or services removed from the integration.

See Splunk developer documentation about :new-page:`POST /integration <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-create-integration>` for more examples of the request format.

.. _aws-api-next-steps:

Next steps
=================

After you connect Splunk Observability Cloud with AWS, you'll be able to track a series of metrics and analyze your AWS data in real time. See :ref:`how to leverage data from integration with AWS <aws-post-install>` for more information.

.. note:: When you edit an AWS integration through the user interface for Splunk Observability Cloud, the integration ID shows in your browser address bar as an alphanumeric string in quotation marks (") after a colon (:) at the end of the URL.
