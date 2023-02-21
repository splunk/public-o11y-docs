.. _aws-logs:

****************************************
Collect logs from your AWS services
****************************************

.. meta::
  :description: Collect logs from your AWS services in Splunk Observability Cloud.

When setting up an AWS connection, you can choose to import logs from a Cloudwatch log group or an S3 bucket. 

To set up log collection, follow these steps:

1. Open the link to a :ref:`CloudFormation template <aws-cloudformation>`. 

2. Adjust the settings. 

3. Deploy the template to create ``splunk-aws-logs-collector``, an AWS Lambda function used to transform log entries, enrich them with metadata, and send them to Splunk Observability Cloud.

How does log collection work?
============================================

The Splunk Observability Cloud back end runs a periodic job which goes through CloudWatch log groups and services in your account. This job adds the appropriate subscriptions and notifications to trigger the ``splunk-aws-logs-collector`` function. 

Splunk Observability Cloud adds subscription filters to log groups for the selected services in the integration, or for all of the supported services when none is selected. For instance, if you select ``AWS/Lambda`` in the integration, Observability Cloud will add subscription filters to ``/aws/lambda/*`` log groups only. Splunk Observability Cloud doesn't capture logs from all CloudWatch log groups.

Managing subscriptions
-----------------------------------

Subscriptions are managed every 5 minutes, which is not configurable at the moment. If you decide to turn off the integration or a particular service, the job will attempt to remove those subscriptions.
  
If a new log group is created for a service in the integration, Observability Cloud will add a subscription filter to this newly created log group. Afterwards, whenever new log events are added to the log group, AWS triggers ``splunk-aws-logs-collector`` lambda automatically in near real time. 

Which services can you collect logs from?
============================================

You can collect logs from the following services:

- Services storing their logs in Cloudwatch. Logs are stored in log groups which start with ``aws/<servicename>``. For example: ``aws/lambda``, ``aws/rds``, or ``aws/eks`` 
- WAF CloudWatch logs
- API Gateway execution logs
- AWS Glue continuous logs if a default log group name is used
- Network and Application Load Balancers access logs (classic Load Balancers not supported) from S3
- S3 access logs from S3
- Redshift access logs from S3
- CloudFront access logs from S3

Limitations
-----------------------------------

The following restrictions apply:

- Log sync can only be enabled for a single AWS integration per AWS account. Note the integration may cover multiple services and regions.

- Deployment in China or Gov regions requires additional manual steps. See :new-page:`the available CloudFormation templates on GitHub <https://github.com/signalfx/aws-cloudformation-templates>`.

.. _aws-logs-unsupported:

Collect logs from unsupported services
==================================================================================

CloudWatch log groups also store logs from unsupported services. If you want to capture those logs, add ``/aws/<namespace>`` to the list of custom namespaces in the integration object. While this option is not available in the Splunk Observability UI, you can easily do it via :ref:`API <aws-logs-api>`, or by adding :ref:`subscription filters <aws-logs-filter>`.

.. _aws-logs-api:

Collect logs via API
-----------------------------------

To capture logs from unsupported services via the API, follow these steps:

1. Use a ``GET`` request to retrieve existing integration object:

.. code-block:: none

  curl https://app.<realm>.signalfx.com/v2/integration/<integrationId> \
    -H 'x-sf-token: <user API access token>'

2. Update the retrieved object by adding or modifying the ``customNamespaceSyncRules`` field by executing: 

.. code-block:: none
  
  {
      "customNamespaceSyncRules": [
          {
              "namespace": "aws/<namespace>"
          }
      ],
      "enabled": true,
      "id": "E1c1_huAAAA",
  }

- Namespaces must use lowercase only 
- Some fields are omitted for brevity 

3. Use a ``PUT`` request to update your integration:

.. code-block:: none
  
  curl https://app.<realm>.signalfx.com/v2/integration/<integrationId> \
    -H PUT \
    -H 'x-sf-token: <user API access token>' \
    -H 'content-type: application/json' \
    --data-raw '<updated integration JSON here>'


.. _aws-logs-filter:

Collect logs manually with subscription filters
-----------------------------------------------------------

Instead of sending all logs to Observability Cloud, you can forward logs only from selected CloudWatch log groups by adding a subscription filter. To add a filter, follow these steps:

#. Install the ``splunk-aws-logs-collector`` lambda using the :ref:`CloudFormation template <aws-cloudformation>`. Don't select ``CloudWatch Logs`` as a data type to ingest in the AWS integration.  

#. Create a subscription filter to invoke the lambda as a CloudWatch log group subscriber for any log groups you want to forward logs from.

.. caution:: Do not name your filters ``Splunk Log Collector``. It's a reserved name for Splunk-managed subscriptions and they'll be removed automatically. 

Metadata
============================

Log events from AWS services are enriched with relevant metadata. Some of the metadata is common :ref:`to all services <aws-logs-meta-common>`, while some other is :ref:`service-specific <aws-logs-meta-service>`.

.. _aws-logs-meta-common:

Common metadata
-----------------------------------

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - awsAccountId
    - The AWS Account ID of the resource that produced the logs
    - awsAccountId: 123456790

  * - region
    - The AWS region of the resource that produced the logs
    - region: us-east-1

  * - logForwarder
    - The name and version of ``aws-log-collector`` that sends these logs
    - logForwarder: splunk_aws_log_forwarder:1.0.1

.. _aws-logs-meta-service:

Service-specific metadata
-----------------------------------

Services that store logs in CloudWatch Logs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - host
    - Same as ``logGroup``, unless overridden by service specific host
    - logGroup: /aws/lambda/my_function

  * - logGroup
    - Source CloudWatch log group name
    - logGroup: /aws/lambda/my_function

  * - logStream
    - Source CloudWatch log stream name
    - logStream: 2020/07/31/[1]e46fcdcac7094436bd846edb431a3f1

  * - source
    - Service name
    - source: lambda

  * - sourcetype
    - `aws`: prefixed service name
    - sourcetype: aws:lambda

API Gateway, ApplicationELB, CloudFront, EKS, Lambda, NetworkELB, RDS, Redshift, S3
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - [aws_tag_name]
    - AWS tags associated with the resource that generated logs
    - name: my_func_name
      env: prod
      myCustomTag: someValue

API Gateway
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - arn
    - API gateway ARN
    - arn: arn:aws:apigateway:us-east-1::/restapis/kgiqlx3nok/stages/prod

  * - host
    - arn
    - host: arn:aws:apigateway:us-east-1::/restapis/kgiqlx3nok/stages/prod

  * - apiGatewayStage
    - The API Gateway Stage name
    - apiGatewayStage: prod

  * - apiGatewayId
    - The API Gateway ID
    - apiGatewayId: kgiqlx3nok

Application Load Balancer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - elbArn
    - Load balancer ARN
    - elbArn:
      arn:aws:elasticloadbalancing:us-east-1:1234567890:loadbalancer/app/my-loadbalancer/50dc6c495c0c9188

  * - targetGroupArn
    - Target group ARN (when available)
    - targetGroupArn:
      arn:aws:elasticloadbalancing:us-east-1:1234567890:loadbalancer/app/my-loadbalancer/50dc6c495c0c9188

CloudFront
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - distributionArn
    - CloudFront distribution ARN
    - distributionArn:
      arn:aws:cloudfront::1234567890:distribution/EMLARXS9EXAMPLE

EKS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - arn
    - EKS cluster ARN
    - arn:
      arn:aws:rds:us-east-1:123456790:cluster/test-eks-cluster

  * - host
    - EKS cluster host
    - host: test-eks-cluster

  * - eksClusterName
    - The EKS cluster name
    - eksClusterName: test-eks-cluster

Lambda
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - arn
    - The ARN of the lambda function that generated the logs
    - arn:
      arn:aws:lambda:us-east-1:123456790:function:my_function

  * - host
    - Lambda host
    - host: arn:aws:lambda:us-east-1:123456790:function:my_function

  * - functionName
    - The name of the lambda
    - functionName: my_function

Network Load Balancer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - elbArn
    - Load balancer ARN
    - elbArn:
      arn:aws:elasticloadbalancing:us-east-1:1234567890:loadbalancer/net/my-netlb/c6e77e28c25b2234

RDS PostgreSQL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - arn
    - DB host ARN
    - arn:
      arn:aws:rds:us-east-1:123456790:db:druid-lab0

  * - host
    - The host of RDS
    - host: druid-lab0

  * - dbType
    - The type of DB
    - dbType: postgresql

RDS, other than PostgreSQL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - arn
    - DB host ARN
    - arn:
      arn:aws:rds:us-east-1:123456790:db:test-database-1

  * - host
    - The host of RDS
    - host: test-database-1

  * - dbLogName
    - The name of the RDS log
    - dbLogName: error

Redshift
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - clusterArn
    - Redshift cluster ARN
    - clusterArn:
      arn:aws:redshift:us-east-1:1234567890:cluster:redshift-cluster-1

  * - logType
    - Redshit log type. Possible: connectionlog, useractivitylog, or userlog
    - logType: userlog

S3
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
  :header-rows: 1
  :widths: 30, 40, 40

  * - Field name
    - Description
    - Example

  * - bucketArn
    - S3 bucket ARN
    - bucketArn:
      arn:aws:s3:::my-bucket

  * - objectArn
    - S3 object ARN (when available)
    - objectArn: arn:aws:s3:::my-bucket/sample.jpeg


.. _aws-logs-ts:

Troubleshooting
============================

CloudFormation stack was not created
-----------------------------------------

You fully control the process of creating the CloudFormation stack, which is executed with the permissions associated with your user. The template contains a lambda function and a role required to forward logs from Cloudwatch and S3 buckets. If any errors occur, AWS displays a specific error message.

To learn more about supported templates, see the :new-page:`README <https://github.com/signalfx/aws-cloudformation-templates>` on GitHub.


I created an integration, but I don't see any logs
-----------------------------------------------------

If you created the integration recently, it may take some time for the logs to appear in your account.  The job that makes your logs notify Splunk AWS Log Collector runs every 5 minutes, so it might take that long to subscribe to a new resource. AWS logs delivery inside AWS (to CloudWatch log groups, or to S3 buckets) and AWS lambda triggering can introduce additional delay. Check AWS documentation for more details. 

If you still don't see any logs after 15 minutes, check the IAM policy you've used to set up the AWS connection. We recommend using the :ref:`provided IAM policy <aws-iam-policy>`. If you still don't see the logs, please contact :ref:`our support <support>`.

You can enable debug mode on the log forwarding lambda function: Add ``LOG_LEVEL=DEBUG`` in the :guilabel:`Configuration > Environment variables` section. If you see log forwarding calls fail due to a 503 HTTP error, you may be exceeding logs limit. To fix this, contact :ref:`our support <support>`.


CloudFront access logs are not being collected
-----------------------------------------------------

CloudFront is a global service, and its logs can be stored in any of the standard AWS regions. Each CloudFront instance can have an S3 target bucket to access configured logs. Splunk AWS log collection can only grab the logs if the S3 bucket is located in a region Splunk AWS log collection can access.Use the provided IAM policy to ensure the Splunk Observability Cloud back end has the required permissions.


I don't see logs from some instances
-----------------------------------------------------

Make sure your IAM policy allows access to the instances, their regions, or the regions where they send logs. If the service instance was recently created, it might take up to 15 minutes for the Splunk Observability Cloud back end to start gathering logs from it. 

AWS allows you to configure only one notification of a given kind when a new log file appears, and S3 event files are created. If the bucket where an instance's logs are stored already notifies another lambda function of a file creation, Observability Cloud cannot add its subscription on top of that. You can either remove the pre-existing notification configuration, or narrow it by specifying a prefix and a suffix in such a way that the log files won't be triggering your pre-existing lambda function. If that's not possible, :ref:`contact us <support>` for assistance to modify your AWS architecture to work around the limitation.


I don't see logs from some of my S3 buckets
-----------------------------------------------------------------

Some AWS services use S3 buckets to store their logs, and sometimes the S3 bucket is located in a different region from the service that produces those logs. In such cases make sure to deploy the ``splunk-aws-logs-collector`` lambda function using the CloudFormation template in all AWS regions where S3 buckets with logs are located.


I have disabled logs collection, but logs are still gathered by Observability Cloud
-----------------------------------------------------------------------------------------------------

It may take up to 15 minutes for the Observability Cloud back end to cancel log subscriptions. There may be additional delays introduced by the AWS logs delivery process.

The back end needs log related permissions to cancel log subscriptions. If log related permissions are removed from the AWS IAM policy (or the entire policy is removed), the back end cannot run the cleanup procedure. Make sure to disable the log collection on Observability Cloud's side first, and clean up on AWS' side later.


I disabled the integration or changed its settings, but logs are still being collected!
---------------------------------------------------------------------------------------------------

If you disable a part or all the integration, our back end job will attempt to clear all notifications and subscriptions it has previously created, which might take up to 15 minutes. However, if you also remove IAM permissions, the attempt may fail. 

To stop sending any logs to Observability Cloud, delete the Splunk AWS Logs collector lambda from the region where you wish to stop collecting logs.
