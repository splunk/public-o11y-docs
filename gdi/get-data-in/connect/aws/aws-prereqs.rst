.. _aws-prereqs:
.. _aws-integration-prereqs:

************************************************************
AWS authentication, permissions, and supported regions 
************************************************************

.. meta::
  :description: Connection planning information and links to the different ways to connect AWS to Splunk Observability Cloud.

To connect your AWS services to Splunk Observability Cloud you need: 

- Administrator privileges in your Splunk Observability Cloud and your AWS accounts. 
- :ref:`AWS authentication rights <aws-authentication>`. You can authenticate either with an :ref:`External ID (recommended) <aws-authentication>` or using a :ref:`security token <aws-authentication-token>`.

.. _aws-authentication:

Authenticate in AWS using an External ID (recommended)
============================================================

In AWS you manage access by creating policies and attaching them to IAM identities or AWS resources. A policy is a JSON object that associates an identity or resource with access permissions. When a user (in this case, your account in Splunk Observability Cloud) makes a request, AWS evaluates the associated policy and determines whether the request is allowed or denied. 

For most AWS regions, use :guilabel:`External ID` to authenticate. Follow these steps: 

* An :strong:`External ID` for Splunk Observability Cloud. An external ID is a random string used to establish a trust relationship between Splunk Observability Cloud and your AWS account. It's automatically generated for you when you create a new AWS integration in Splunk Observability Cloud. 

  * To learn how to create an External ID, see :new-page:`How to use an external ID when granting access to your AWS resources to a third party <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html>` in AWS documentation. 
  * You can also create an External ID using the API. See :ref:`aws-api-create-id`.

* An :ref:`Identity and Access Management (IAM) policy <aws-iam-policy>`. 

* An :ref:`AWS IAM role <aws-iam-role>`. 

.. _aws-iam-policy:

Create an AWS IAM policy
-------------------------------------------

Splunk Observability Cloud refers to an IAM policy to collect data from every supported AWS service. 

To create a new AWS IAM policy, follow these steps:

#. Log into your Amazon Web Services account and look for the :guilabel:`Identity and Access Management (IAM)` service.
#. Create a new policy. In the :strong:`JSON` tab, replace the placeholder JSON with the pertinent AWS IAM policy JSON. Guided setup provides this policy in the :guilabel:`Prepare AWS Account` step. See also some :ref:`policy examples <review-aws-iam-policy>`.
#. Follow the instructions to complete the process and create the policy.

.. :note:: The default AWS IAM policy supports metric collection. To learn how to add support for CloudWatch Metric Streams, see :ref:`aws-wizard-metricstreams`.

If you have any doubts, check AWS documentation.  

.. _aws-iam-role:

Create an AWS IAM role
-------------------------------------------

After creating an AWS IAM policy, you need to assign that policy to a particular role by performing the following steps in the Amazon Web Services console:

#. Go to :strong:`Roles`, then :strong:`Create Role`, and select :strong:`Another AWS account` as the type of trusted entity.
#. Copy and paste the Account ID displayed in either guided setup or the numeric value within ``sfxAwsAccountArn`` from API call's response into the :strong:`Account ID` field.
#. Select :strong:`Require external ID`. Copy and paste the External ID displayed in the guided setup or ``externalId`` from API call's response into the :strong:`External ID` field.
#. Continue with :strong:`Next: Permissions`. Under :strong:`Policy name`, select the policy you made in the previous step.
#. Follow the instructions, and name and create your new AWS IAM role.  

Creating the AWS IAM role generates the ``Role ARN`` used to establish connection with AWS. Copy the created ARN role, and paste it into the :strong:`Role ARN` field in the guided setup.

If you have any doubts, check AWS documentation.

.. _aws-authentication-token:

Authenticate in AWS using a security token
============================================

For the :strong:`GovCloud or China regions`, select the option to authenticate using a secure token, which combines an Access key ID and Secret access key you'll create in your AWS Console.

When you're creating the new permission for your user and are prompted for an access key practice, select :guilabel:`Third-party service`.

.. _aws-required-permissions:

Required permissions
=====================================================

.. caution:: The list of permissions described in this section is updated frequently. If you connected your AWS services to Splunk Observability Cloud a while ago you might need to update them.

These are the required permissions to collect AWS data:

* :ref:`Required permissions <aws-iam-policy-required>`
* :ref:`Permissions for the CloudWatch API <aws-iam-policy-cw>` 
* :ref:`Permissions for Metric Streams <aws-iam-policy-ms>`
* :ref:`Permissions for tag and properties collection <aws-iam-policy-services>`
* :ref:`Permissions for usage collection and reports <aws-iam-policy-reports>`

.. _aws-iam-policy-required:

Required permissions in Splunk Observability Cloud 
---------------------------------------------------------------------

Regardless of the services you want to use, you need the following permissions:

* ``organizations:DescribeOrganization``. Only needed when Amazon cost and usage metrics are activated.
* ``ec2:DescribeRegions``. Used to check if regions configured in the integration are enabled on the AWS account.

Tag and property sync permissions:

* ``tag:GetResources``
* ``cloudformation:ListResources``
* ``cloudformation:GetResource``

Tag and property sync is always enabled for the services configured in the integration. For some services, Splunk Observability Cloud uses either service-specific APIs or generic APIs: Resource Groups Tagging API or Cloud Control API. 

Note that the ``tag:GetResources`` permission is sufficient to use Resource Groups Tagging API. However, in the case of Cloud Control API, on top of the ``cloudformation:ListResources`` and ``cloudformation:GetResource`` permissions you need to also provide service specific permissions: for example ``kafka:DescribeClusterV2`` and ``kafka:ListClustersV2`` for AWS/Kafka.


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
          "tag:GetResources",
          "cloudformation:ListResources",
          "cloudformation:GetResource"
        ],
        "Resource": "*"
      }
    ]
  }

.. _metricstreams_iampolicy:
.. _aws-iam-policy-ms:

Permissions for Splunk-managed Metric Streams
-----------------------------------------------------------

.. note:: If you're using AWS-managed Metric Streams these permissions are not required. For more information, see :ref:`aws-console-ms`.

If you're using Splunk-managed Metric Streams to collect AWS CloudWatch metrics, you need the :ref:`permissions required for Splunk Observability Cloud <aws-iam-policy-required>` as well as these permissions:

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
        "cloudwatch:GetMetricStream"
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

- ``"airflow:ListEnvironments"``
- ``"airflow:GetEnvironment"``
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
- ``"ecs:DescribeClusters"``
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
- ``"kafka:DescribeClusterV2"``
- ``"kafka:ListClustersV2"``
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
- ``"rds:DescribeDBClusters"``
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
          "airflow:ListEnvironments",
          "airflow:GetEnvironment",
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
          "kafka:DescribeClusterV2",
          "kafka:ListClustersV2",
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

.. _aws-iam-policy-reports:

Permissions for usage collection and reports
------------------------------------------------------

Include these permissions to allow Splunk Observability Cloud to collect AWS usage data and reports:

- ``"ec2:DescribeRegions"``
- ``"organizations:DescribeOrganization"``

.. _aws-iam-policy-ts:

Troubleshoot AWS permission issues
-----------------------------------------------------------

In case of any permission-related issue, review your AWS Organization Service Control Policy and the permission boundaries for your IAM entities. Both might impose some limits on the AWS policy Splunk Observability Cloud uses to connect to your AWS account. 

Read more at the official AWS documentation:

* :new-page:`AWS Organization Service Control Policies <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html>`
* :new-page:`Permissions boundaries for IAM entities <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html>`
* :new-page:`Troubleshooting IAM permission access denied or unauthorized errors <https://web.archive.org/web/20231129090004/https://repost.aws/knowledge-center/troubleshoot-iam-permission-errors>`

.. _aws-regions:

Supported AWS regions
============================================

If you want to activate a specific optional region, you need to do it before adding it to the integration. Make sure you've activated the optional regions you'll need in your AWS console first. Regular regions are activated in AWS by default.

  * If you're using the :ref:`UI guided setup <aws-wizardconfig>` to create the integration, you'll be prompted to select which AWS regions you work with. 
  * If you're :ref:`using the API <get-configapi>` and supply an empty list in an API call, Splunk Observability Cloud activates all regular regions. If you add the ``ec2:DescribeRegions`` permission to your AWS policy, optional regions you've activated on your AWS account are activated in Splunk Observability Cloud as well. Although empty regions list configuration is possible via the API, it is highly discouraged since it can lead to an unexpected cost increase whenever a new region is enabled on the AWS account.

.. note:: When you edit an existing integration that was configured with an empty list of regions, the UI guided setup will automatically populate the regions list to include regions enabled on your AWS account if your policy contains ``ec2:DescribeRegions`` permission. Otherwise, it will populate the list with all regular AWS regions. If you previously created an integration using the UI guided setup and used the default all regions configuration, it also will get migrated accordingly. This migration will not impact what data we currently collect for any edited integrations.

Splunk Observability Cloud supports the following AWS regions:

Regular
-------------------------------------------

* ``ap-northeast-1``: Asia Pacific (Tokyo)
* ``ap-northeast-2``: Asia Pacific (Seoul)
* ``ap-northeast-3``: Asia Pacific (Osaka)
* ``ap-south-1``: Asia Pacific (Mumbai)
* ``ap-southeast-1``: Asia Pacific (Singapore)
* ``ap-southeast-2``: Asia Pacific (Sydney)
* ``ca-central-1``: Canada (Central)
* ``eu-central-1``: Europe (Frankfurt)
* ``eu-north-1``: Europe (Stockholm)
* ``eu-west-1``: Europe (Ireland)
* ``eu-west-2``: Europe (London)
* ``eu-west-3``: Europe (Paris)
* ``sa-east-1``: South America (Sao Paulo)
* ``us-east-1``: US East (N. Virginia)
* ``us-east-2``: US East (Ohio)
* ``us-west-1``: US West (N. California)
* ``us-west-2``: US West (Oregon)

Optional
-------------------------------------------

* ``af-south-1``: Africa (Cape Town)
* ``ap-east-1``: Asia Pacific (Hong Kong)
* ``ap-south-2``: Asia Pacific (Hyderabad)
* ``ap-southeast-3``: Asia Pacific (Jakarta)
* ``ap-southeast-4``: Asia Pacific (Melbourne)
* ``eu-central-2``: Europe (Zurich)
* ``eu-south-1``: Europe (Milan)
* ``eu-south-2``: Europe (Spain)
* ``me-central-1``: Middle East (UAE)
* ``me-south-1``: Middle East (Bahrain)

GovCloud
-------------------------------------------

* ``us-gov-east-1``: AWS GovCloud (US-East)
* ``us-gov-west-1``: AWS GovCloud (US-West)  

China
-------------------------------------------

* ``cn-north-1``: China (Beijing)
* ``cn-northwest-1``: China (Ningxia)    
