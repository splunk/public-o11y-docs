.. _get-started-aws:

***************
Connect to AWS
***************

.. meta::
   :description: Connect your AWS account to Splunk Observability Cloud.

..	toctree::
   :hidden:

.. govcloud or china, use the classic integration or the API. contact support to unlock the classic integration.

Configure the :strong:`Amazon Web Services` (AWS) integration to connect your AWS account to Observability Cloud. When you configure the integration, you can import metrics and logs from supported AWS services. The integration uses Amazon CloudWatch Metrics and Logs to export data to Observability Cloud.

To connect an AWS account, you must be an administrator:

1. Log into Splunk Observability Cloud.

2. Click :strong:`Navigation menu > Data Setup` and select the :strong:`Amazon Web Services` integration.

3. In the AWS Setup page, select :strong:`New integration`.

If you have multiple AWS accounts, click :strong:`+ Add Connection` to configure an integration for each AWS account.

The AWS integration wizard walks you through steps for selecting your AWS Console and preparing your AWS account.

The integration uses the :new-page:`AWS Compute Optimizer <https://aws.amazon.com/compute-optimizer/>` to collect cost and usage data from your AWS account. If you want to collect cost and usage data, select :strong:`Import Data for AWS Optimizer` when you configure the integration.

Requirements
============

You need to create an :new-page:`AWS IAM Policy <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html>` to connect your AWS account to Observability Cloud.

There are two ways to authenticate your AWS account with Observability Cloud:

- Use an :new-page:`external ID <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html>`
- Use an :new-page:`access key ID and Secret access key <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html>`

You may opt into using CloudWatch Metric Streams rather than API polling for metrics. To use CloudWatch Metric Streams, follow the steps in this section that describe how to create all required resources using AWS CloudFormation templates to set up Metric Streams delivery.

Configuration Overview
======================

Configuring CloudWatch Metric Streams delivery to Splunk Observability Cloud involves the following steps:

1. Use the AWS integration wizard to integrate AWS with Splunk Observability Cloud.

2. Add Metric Streams actions and permissions to the default AWS IAM policy.

3. Define roles and permissions in AWS to enable streaming metrics.

4. Create an Amazon Kinesis Data Firehouse Stream to receive AWS CloudWatch Metrics and a AWS S3 Bucket to store any records that fail delivery for retry.

5. Use AWS CloudWatch to send metrics to an AWS Kinesis Stream.

6. Configure AWS Kinesis Stream to forward metrics to Splunk Infrastructure Monitoring.

7. Use the Splunk Infrastructure Monitoring API to set the ``metricStreamsSyncState`` field to ``ENABLED``.


Default AWS IAM policy
======================

The AWS integration wizard prompts you to copy the following IAM policy to connect your AWS account to Observability Cloud. The policy gives permissions to collect data from every supported AWS service. If you plan to collect data from only a subset of AWS services that Observability Cloud supports, you can modify the ``Action`` and ``Resource`` fields.

.. code-block:: json

   {
    "Version": "2012-10-17",
    "Statement": [
     {
      "Effect": "Allow",
      "Action": [
       "apigateway:GET",
       "autoscaling:DescribeAutoScalingGroups",
       "cloudfront:GetDistributionConfig",
       "cloudfront:ListDistributions",
       "cloudfront:ListTagsForResource",
       "cloudwatch:DescribeAlarms",
       "cloudwatch:GetMetricData",
       "cloudwatch:GetMetricStatistics",
       "cloudwatch:ListMetrics",
       "dynamodb:DescribeTable",
       "dynamodb:ListTables",
       "dynamodb:ListTagsOfResource",
       "ec2:DescribeInstances",
       "ec2:DescribeInstanceStatus",
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
       "lambda:GetAlias",
       "lambda:ListFunctions",
       "lambda:ListTags",
       "logs:DeleteSubscriptionFilter",
       "logs:DescribeLogGroups",
       "logs:DescribeSubscriptionFilters",
       "logs:PutSubscriptionFilter",
       "organizations:DescribeOrganization",
       "rds:DescribeDBInstances",
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
       "tag:GetResources",
      ],
      "Resource": "*"
     }
    ]
   }

Amending AWS IAM policy to enable CloudWatch Metric Streams
===========================================================

To use Metric Streams, add the following permissions to the AWS IAM policy that you pasted into the access control policy document linked from the AWS Management Console:

.. code-block:: none

   "cloudwatch:ListMetricStreams",
   "cloudwatch:GetMetricStream",
   "cloudwatch:PutMetricStream",
   "cloudwatch:DeleteMetricStream",
   "cloudwatch:StartMetricStreams",
   "cloudwatch:StopMetricStreams",
   "iam:PassRole"

After creating the AWS IAM policy through the AWS Management Console, do the following at the `Establish Connection` page of the AWS integration wizard:

1. Enter the Role ARN (Amazon Resource Name) for the specified external ID.

2. Verify that the :strong:`Import CloudWatch` toggle is empty. If `Import CloudWatch` is enabled, the integration tracks metrics through the original API polling function rather than through Metric Streams.

3. Click :strong:`Enable`.


Required AWS resources
======================

You'll run AWS CloudFormation in every AWS Region from which you want streamed metrics. CloudFormation creates the following in each of the regions where you run it:

- Amazon Kinesis Data Firehose

- S3 bucket to back up all the events that Kinesis Data Firehose sends to the specified HTTP endpoint, or only the ones for which delivery to the HTTP endpoint fails.

- IAM role for :new-page:`CloudWatch metric streams <https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html>` to use.

- IAM role that enables Kinesis Firehose to write to the S3 bucket.


CloudFormation templates enable you to create all AWS resources required to synchronize logs and/or metric streams data. There are a few CloudFormation templates to choose from, depending on the method of deployment (for example, per AWS region or per AWS account) and integration type (for example, logs only, metric streams only, or both). Even if you don't intend to use both logs and metrics functions, you can safely deploy a CloudFormation template, because unused infrastructure will not generate costs.

You can use StackSets after :new-page:`configuring the prerequisites <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs-self-managed.html>` for them, one time for each AWS account.

To create required resources using CloudFormation, do the following:

1. From the CloudFormation templates table below, select the QuickLink for a template with support for Metric Streams and/or logs. You can adjust the region for that QuickLink in the AWS management console.

2. Click on the hosted template link to deploy the template.

3. In the :strong:`Quick Create stack` dialog box for the selected template, enter the access token for your organization.

4. Click :strong:`Create stack`.

:strong:`CloudFormation templates table`

.. list-table::
   :header-rows: 1
   :widths: 16, 16, 16, 16, 36

   * - :strong:`Log collection`
     - :strong:`Metric Streams`
     - :strong:`Deployment Type`
     - :strong:`QuickLink`
     - :strong:`Hosted template link`

   * - yes
     - yes
     - once per account (using StackSets)
     - :new-page:`deploy this <https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features.yaml>`
     - :new-page:`https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features.yaml`

   * - yes
     - yes
     - in each region
     - :new-page:`deploy this in every region <https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features_regional.yaml>`
     - :new-page:`https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features_regional.yaml`

   * - yes
     - no
     - once per account (using StackSets)
     - :new-page:`deploy this <https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs.yaml>`
     - :new-page:`https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs.yaml`

   * - yes
     - no
     - in each region
     - :new-page:`deploy this in every region <https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs_regional.yaml>`
     - :new-page:`https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs_regional.yaml`

   * - no
     - yes
     - once per account (using StackSets)
     - :new-page:`deploy this <https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams.yaml>`
     - :new-page:`https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams.yaml`

   * - no
     - yes
     - in each region
     - :new-page:`deploy this in every region <https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams_regional.yaml>`
     - :new-page:`https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams_regional.yaml`


Using the API to enable Metrics Streams
=======================================

After using the AWS integration wizard to prepare your AWS account and establish a connection between that and Splunk Observability Cloud, you finish configuration by enabling logs and/or Metric Streams through the Splunk Infrastructure Monitoring API:

1. Do a PUT request to the ``https://api.<realm>.signalfx.com/v2/integration/<integration-id>`` endpoint.

2. Set the ``metricStreamsSyncState`` field to ``ENABLED``.

3. Set the ``importCloudWatch`` field to ``true``.


Limitations of CloudWatch Metric Streams
========================================

The initial release of CloudWatch Metrics Streams includes a few limitations that you should consider:

- :strong:`Collection interval`: CloudWatch Metric Streams streams all metrics as soon as they are published to AWS CloudWatch. In most cases, the metrics are published once per minute. For customers who are currently collecting AWS CloudWatch metrics at the default polling rate of 300 seconds (5 minutes), this difference in intervals results in more data being collected from AWS CloudWatch. This increase in data rate typically increases AWS CloudWatch usage costs. Customers who are already polling at 1-minute intervals generally see a slight decrease in AWS CloudWatch usage costs.

- :strong:`Tag filtering`: CloudWatch Metric Streams does not yet support filtering based on resource tags. Collection configuration is per-service, and all resources that report metrics from a configured service have their metrics streamed. Customers who are filtering based on tags should consider the potential increase in costs for both AWS CloudWatch and Splunk Infrastructure Monitoring.

- :strong:`Regional limitations`: CloudWatch Metric Streams is not yet supported in AWS GovCloud or AWS China.


Metrics
=======

These are the metrics available for this integration.

AWS ALB
^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-alb" include="markdown"></div>

AWS API Gateway
^^^^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-api-gateway" include="markdown"></div>

AWS Auto Scaling
^^^^^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-autoscaling" include="markdown"></div>

AWS CloudFront
^^^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-cloudfront" include="markdown"></div>

Amazon EBS
^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-ebs" include="markdown"></div>

Amazon EC2
^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-ec2" include="markdown"></div>

AWS ECS
^^^^^^^

.. raw:: html


   <div class="metrics-table" type="aws-ecs" include="markdown"></div>

Amazon ElastiCache
^^^^^^^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-elasticache" include="markdown"></div>

AWS ELB
^^^^^^^

.. raw:: html


   <div class="metrics-table" type="aws-elb" include="markdown"></div>

AWS Kinesis
^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-kinesis" include="markdown"></div>

AWS Lambda
^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-lambda" include="markdown"></div>

AWS OpsWorks
^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-opsworks" include="markdown"></div>

AWS Optimizer
^^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-optimizer" include="markdown"></div>

Amazon RDS
^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-rds" include="markdown"></div>

Amazon Redshift
^^^^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-redshift" include="markdown"></div>

Amazon Route 53
^^^^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-route53" include="markdown"></div>

Amazon Simple Notification Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-sns" include="markdown"></div>

Amazon Simple Queue Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. raw:: html

   <div class="metrics-table" type="aws-sqs" include="markdown"></div>
