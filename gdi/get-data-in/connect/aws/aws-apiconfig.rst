.. _get-configapi:

********************************************************
Connect to AWS using the Splunk Observability Cloud API
********************************************************

.. meta::
  :description: Use the API to connect Splunk Observability Cloud to AWS, review your permissions, configure the integration, collect logs, or enable Metric Streams.

To connect Splunk Observability Cloud to your AWS account, complete the following steps:

#. :ref:`Create an AWS connection <aws-api-create-connection>`.
#. :ref:`Review your IAM policy <review-aws-iam-policy>`. Specify whether to collect both metrics and logs, and whether to gather metrics by API polling (which is the default) or through CloudWatch Metric Streams.
#. :ref:`Configure your setup <aws-api-setup>`. 
#. :ref:`Collect logs <aws-api-logs>`.  
#. Optionally, :ref:`enable Metric Streams <enable-cw-metricstreams>`.
#. See :ref:`next steps <aws-api-next-steps>`. 

.. _aws-api-create-connection:

1. Create an AWS connection 
=====================================================

To connect Splunk Observability Cloud to AWS through the Observability Cloud API, open your command-line interface and perform the following steps:

#. :ref:`Create an external AWS ID <aws-api-create-id>`
#. :ref:`Create an AWS policy and IAM role <aws-api-create-policy-role>`

.. _aws-api-create-id:

1. Create an external AWS ID
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

1. Create an AWS policy and IAM role
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

2. Review your IAM policy
=====================================================

The default AWS Identify and Access Management (IAM) policy looks like this:

.. IMPORTANT: If you update this JSON, please also update the service:permission pairs in the child section below.

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
          "cloudwatch:DescribeAlarms",
          "cloudwatch:GetMetricData",
          "cloudwatch:GetMetricStatistics",
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
          "kinesisanalytics:ListApplications",
          "kinesisanalytics:DescribeApplication",
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
      }
    ]
  }

Review your AWS IAM policy permissions in Observability Cloud 
---------------------------------------------------------------------

Each entry in the ``Action`` array of the :ref:`AWS IAM policy JSON <review-aws-iam-policy>` is a ``"<service>:<permission>"`` pair. Each pair identifies an AWS service and a permission for that service. Include a service and permission pair in your AWS IAM policy to allow Observability Cloud to collect a specific type of data from a specific AWS service.

Use the information provided here to understand which AWS service and permission pairs to include in your AWS IAM policy to allow specific Observability Cloud features to collect relevant AWS service data.

The ``"ec2:DescribeRegions"`` permission appears in every feature section because every feature requires this permission.

.. IMPORTANT: If you update these service:permission pairs, please also update the JSON in the parent section above.

Metric collection (CloudWatch API)
------------------------------------------------------

Include these permissions to allow Observability Cloud to collect AWS metrics using CloudWatch API polling:

- ``"cloudwatch:DescribeAlarms"``
- ``"cloudwatch:GetMetricData"``
- ``"cloudwatch:GetMetricStatistics"``
- ``"cloudwatch:ListMetrics"``
- ``"ec2:DescribeRegions"``

Metric collection (CloudWatch Metric Streams)
------------------------------------------------------

Include these permissions to allow Observability Cloud to collect AWS metrics using CloudWatch Metric Streams:

- ``"cloudwatch:DeleteMetricStream"``
- ``"cloudwatch:DescribeAlarms"``
- ``"cloudwatch:GetMetricStream"``
- ``"cloudwatch:ListMetricStreams"``
- ``"cloudwatch:ListMetrics"``
- ``"cloudwatch:PutMetricStream"``
- ``"cloudwatch:StartMetricStreams"``
- ``"cloudwatch:StopMetricStreams"``
- ``"ec2:DescribeRegions"``
- ``"iam:PassRole"``

Note the ``iam:PassRole`` permission is restricted to resources matching the ``arn:aws:iam::*:role/splunk-metric-streams*`` pattern. See :ref:`AWS IAM policy for Metric Streams <metricstreams_iampolicy>` for details.

Log collection
---------------------------

Include these permissions to allow Observability Cloud to collect AWS logs:

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

Usage collection and reports
------------------------------------------------------

Include these permissions to allow Observability Cloud to collect AWS usage data and reports:

- ``"ec2:DescribeRegions"``
- ``"organizations:DescribeOrganization"``

Tag and property collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Include these permissions to allow Observability Cloud to collect AWS tags and properties:

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
- ``"kinesis:DescribeStream"``
- ``"kinesis:ListShards"``
- ``"kinesis:ListStreams"``
- ``"kinesis:ListStreams"``
- ``"kinesis:ListTagsForStream"``
- ``"kinesis:ListTagsForStream"``
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

.. _aws-api-setup:

3. Configure your setup
=============================

Provide the ARN role to the Infrastructure Monitoring component of Splunk Observability Cloud. You can also configure your connection to support any of the following use cases:

- Collect metrics for selected regions and services using CloudWatch API.
- Collect metrics for all regions and all services using CloudWatch API.
- Collect metrics using CloudWatch Metric Streams by itself or together with log collection.

The following example shows how to collect metrics from all regions and services by leaving the regions and services values unspecified.

.. code-block:: none

  curl -X PUT 'https://app.<realm>.signalfx.com/v2/integration/E78gbtjBcAA' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'x-sf-token: <USER_API_ACCESS_TOKEN>' \
    -H 'content-type: application/json' \
    --data-raw '{"authMethod": "ExternalId", "created": 1628082281828, "creator": "E73pzL5BUAI", "customCloudWatchNamespaces": null, "enableCheckLargeVolume": false, "enabled": true, "externalId": "jobcimfczlkhwxlqwbum", "id": "E78gbtjBcAA", "importCloudWatch": true, "largeVolume": false, "lastUpdated": 1628090302516, "lastUpdatedBy": "E73pzL5BUAI", "name": "AWS", "pollRate": 300000, "regions": [], "roleArn": "<your-aws-iam-role-arn>", "services": [], "sfxAwsAccountArn": "arn:aws:iam::134183635603:root", "syncLoadBalancerTargetGroupTags": false, "type": "AWSCloudWatch", "key": null, "token": null, "namedToken": "Default", "namespaceSyncRules": []}'


.. _aws-api-logs:

4. Collect logs
===================================================

To collect log data from any CloudWatch log group, perform the following steps:

#. Deploy one of the :ref:`CloudFormation templates <aws-cloudformation>` provided by Splunk that supports log collection.
#. Update your AWS integration using the ``curl -X PUT`` request to set the ``logsSyncState`` field value to ``ENABLED``.

Observability Cloud synchronizes AWS integration settings with the logging configuration information on your AWS customer account every 5 minutes, adding triggers for newly-added services, and deleting triggers from regions or services removed from the integration.

See Splunk developer documentation about :new-page:`POST /integration <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-create-integration>` for more examples of the request format.

.. _enable-cw-metricstreams:

5. Enable CloudWatch Metric Streams
=======================================

To enable CloudWatch Metric Streams as an alternative to traditional API polling, follow these steps:

#. Submit a GET request to ``https://api.<realm>.signalfx.com/v2/integration/<integration-id>`` to retrieve your current settings. Make sure to substitute your own realm and integration ID in the URL.

#. Set the ``metricStreamsSyncState`` field to ``ENABLED``.

#. Set the ``importCloudWatch`` field to ``true``.

#. Set the ``enabled`` field to ``true``.

#. Submit a PUT request to the ``https://api.<realm>.signalfx.com/v2/integration/<integration-id>`` endpoint to save your updated settings.

.. note:: When you edit an AWS integration through the user interface for Splunk Observability Cloud, the integration ID shows in your browser address bar as an alphanumeric string in quotation marks (") after a colon (:) at the end of the URL.

Next, to complete enabling Metric Streams:

#. If you haven't already, add the :ref:`relevant permissions to the AWS IAM policy <metricstreams_iampolicy>`.

#. In every region from which you want to stream metrics from, :ref:`deploy CloudFormation <metricstreams_cloudformation>`.

This will create:

- Kinesis Firehose.

- The S3 bucket, to back up the events that Kinesis Data Firehose fails to send to the specified HTTP endpoint.

- The IAM role that Metric Streams will use.

- The IAM role that allows Kinesis Firehose to write the S3 bucket.

.. _metricstreams_iampolicy:

Update the AWS IAM policy
-------------------------------

To enable Metric Streams use the following AWS IAM policy. It includes the permissions with the ``MetricStream`` phrase and the ``iam:PassRole`` permission, which are required by the CloudWatch Metric Streams feature.

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
        "cloudwatch:DescribeAlarms",
        "cloudwatch:GetMetricData",
        "cloudwatch:GetMetricStatistics",
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
        "kinesisanalytics:ListApplications",
        "kinesisanalytics:DescribeApplication",
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
        "workspaces:DescribeWorkspaces",
        "cloudwatch:ListMetricStreams",
        "cloudwatch:GetMetricStream",
        "cloudwatch:PutMetricStream",
        "cloudwatch:DeleteMetricStream",
        "cloudwatch:StartMetricStreams",
        "cloudwatch:StopMetricStreams"
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

See :new-page:`Create an AWS integration using an external ID and ARN <https://dev.splunk.com/observability/docs/integrations/aws_integration_overview/#Create-an-AWS-integration-using-an-external-ID-and-ARN>` in the Splunk developer documentation for syntax examples.

.. _metricstreams_cloudformation:

Deploy CloudFormation
---------------------------

To collect CloudWatch Metric Streams or logs from all supported AWS services across all regions, select and deploy a CloudFormation template that supports metric streams or logs. Deploying the template creates the additional resources on your AWS account required both by Metric Streams (Kinesis Firehose, S3 bucket, IAM roles) and logs (Splunk AWS log collector lambda function, IAM role).

- See the :ref:`CloudFormation templates table <aws-cloudformation>` for more information.
- You can find your access token in your account's profile settings.

.. _aws-api-next-steps:

1. Next steps
=================

After you connect Splunk Observability Cloud with AWS, you can use Observability Cloud to track a series of metrics and analyze your AWS data in real time. See :ref:`how to leverage data from integration with AWS <aws-post-install>` for more information.
