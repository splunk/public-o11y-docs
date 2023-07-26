.. _aws-logs:

****************************************
Collect logs from your AWS services
****************************************

.. meta::
  :description: Collect logs from your AWS services in Splunk Observability Cloud.

.. caution:: Splunk Log Observer is no longer available for new users. You can continue to use Log Observer if you already have an entitlement.

When setting up an AWS connection, you can choose to import logs from a Cloudwatch log group or an S3 bucket. 

To set up log collection, follow these steps:

1. Open the link to a :ref:`CloudFormation template <aws-cloudformation>`. 
2. Adjust the settings. 
3. Deploy the template to create ``splunk-aws-logs-collector``, an AWS Lambda function used to transform log entries, enrich them with metadata, and send them to Splunk Observability Cloud.

.. note::

  If you experience any issues getting logs from AWS, see :ref:`aws-ts-logs`.

How does log collection work?
============================================

The Splunk Observability Cloud back end runs a periodic job which goes through CloudWatch log groups and services in your account. This job adds the appropriate subscriptions and notifications to trigger the ``splunk-aws-logs-collector`` function. 

Splunk Observability Cloud adds subscription filters to log groups for the selected services in the integration, or for all of the supported services when none is selected. For instance, if you select ``AWS/Lambda`` in the integration, Splunk Observability Cloud will add subscription filters to ``/aws/lambda/*`` log groups only. Splunk Observability Cloud doesn't capture logs from all CloudWatch log groups.

Managing subscriptions
-----------------------------------

Subscriptions are managed every 5 minutes, which is not configurable at the moment. If you decide to turn off the integration or a particular service, the job will attempt to remove those subscriptions.
  
If a new log group is created for a service in the integration, Splunk Observability Cloud will add a subscription filter to this newly created log group. Afterwards, whenever new log events are added to the log group, AWS triggers ``splunk-aws-logs-collector`` lambda automatically in near real time. 

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

- Log sync can only be activated for a single AWS integration per AWS account. Note the integration can cover multiple services and regions.

- Deployment in China or Gov regions requires additional manual steps. See :new-page:`the available CloudFormation templates on GitHub <https://github.com/signalfx/aws-cloudformation-templates>`.

.. _aws-logs-unsupported:

Collect logs from unsupported services
==================================================================================

CloudWatch log groups also store logs from unsupported services. If you want to capture those logs, add ``/aws/<namespace>`` to the list of custom namespaces in the integration object. While this option is not available in the Splunk Observability UI, you can easily do it using :ref:`API <aws-logs-api>`, or by adding :ref:`subscription filters <aws-logs-filter>`.

.. _aws-logs-api:

Collect logs using API
-----------------------------------

To capture logs from unsupported services using the API, follow these steps:

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
    -X PUT \
    -X 'x-sf-token: <user API access token>' \
    -X 'content-type: application/json' \
    --data-raw '<updated integration JSON here>'


.. _aws-logs-filter:

Collect logs manually with subscription filters
-----------------------------------------------------------

Instead of sending all logs to Splunk Observability Cloud, you can forward logs only from selected CloudWatch log groups by adding a subscription filter. To add a filter, follow these steps:

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
    - Redshift log type. Possible: connectionlog, useractivitylog, or userlog
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

