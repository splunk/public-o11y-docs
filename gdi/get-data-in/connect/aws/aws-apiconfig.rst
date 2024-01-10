.. _get-configapi:

********************************************************
Connect to AWS using the Splunk Observability Cloud API
********************************************************

.. meta::
  :description: Use the API to connect Splunk Observability Cloud to AWS, review permissions, configure the integration, collect logs, or activate CloudWatch Metric Streams.

To connect Splunk Observability Cloud to your AWS account, complete the following steps:

#. :ref:`Create an AWS connection <aws-api-create-connection>`. See the available :ref:`AWS regions <aws-regions>`.
#. :ref:`Review your IAM policy <review-aws-iam-policy>`. Specify the permissions you'll require to connect to AWS.
#. :ref:`Configure your setup <aws-api-setup>`. 
#. :ref:`Configure how to connect to AWS <aws-api-connect>`: Select :ref:`polling <aws-api-connect-polling>` or :ref:`Metric Streams <aws-api-connect-ms>`. 
#. :ref:`Deploy CloudFormation <aws-api-cloudformation>`.  
#. :ref:`Collect logs <aws-api-logs>`.  
#. See :ref:`next steps <aws-api-next-steps>`. 

.. _aws-api-create-connection:

1. Create an AWS connection 
=====================================================

To connect Splunk Observability Cloud to AWS through the Splunk Observability Cloud API, perform the following steps:

* :ref:`Create an external AWS ID <aws-api-create-id>`
* :ref:`Create an AWS policy and IAM role <aws-api-create-policy-role>`

.. _aws-api-create-id:

Create an external AWS ID
---------------------------------------------------------------------

To create an external AWS ID, open your command-line interface and use the following command to create an AWS connection that generates an external ID:

.. code-block:: none

  curl -X POST 'https://app.<realm>.signalfx.com/v2/integration' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'x-sf-token: <USER_API_ACCESS_TOKEN>' \
    -H 'content-type: application/json' \
    --data-raw '{"name":"AWS-connection-name","type":"AWSCloudWatch","authMethod":"ExternalId","pollRate":300000,"services":[],"regions":["us-east-1", "us-east-2", "us-west-1", "us-west-2"]}'

Your system response looks something like this:

.. code-block:: none

  {
  "authMethod" : "ExternalId",
  "enabled" : false,
  "externalId" : "<externalId>",
  "id" : "<integrationId>",
  "importCloudWatch" : false,
  "name" : "AWS",
  "pollRate" : 300000,
  "regions" : [ "us-east-1", "us-east-2", "us-west-1", "us-west-2" ],
  "roleArn" : null,
  "services" : [ ],
  "sfxAwsAccountArn" : "arn:aws:iam::<accountId>:root"
  "type" : "AWSCloudWatch"
  }

In the system response, note the following fields:

- The ``id`` field is the id of the integration you just created. 
- ``externalId`` and ``accountId`` will be used when you create an IAM (Identity and Access Management) role in the AWS console later on.
- The ``importCloudWatch`` value is set to ``false`` because CloudWatch Metrics collection has not been configured.

.. _aws-api-create-policy-role:

Create an AWS policy and IAM role
---------------------------------------------------------------------

To create an AWS policy and an AWS IAM role with a unique Amazon Resource Name (ARN), go to the AWS console and follow the instructions in :ref:`aws-authentication`. Use the ``externalId`` and ``accountId`` values generated in the previous step.

.. _review-aws-iam-policy:

2. Review the IAM policy and required permissions
=========================================================

These are the required permissions to collect AWS data:

* :ref:`Required permissions <aws-iam-policy-required>`
* :ref:`Permissions for the CloudWatch API <aws-iam-policy-cw>` 
* :ref:`Permissions for Metric Streams <aws-iam-policy-ms>`
* :ref:`Permissions for tag and properties collection <aws-iam-policy-services>`
* :ref:`Permissions for logs <aws-iam-policy-logs>`
* :ref:`Permissions for usage collection and reports <aws-iam-policy-reports>`

.. _aws-api-setup:

3. Configure your setup
=============================

Provide the ARN role to Splunk Observability Cloud. 

You can also configure your connection to support any of the following use cases:

- Collect metrics for selected regions and services using the CloudWatch API.
- Collect metrics for all services using the CloudWatch API.
- Collect metrics using CloudWatch Metric Streams by itself or together with log collection.

The following example shows how to collect metrics from selected regions and all services by leaving the services value unspecified.

.. code-block:: none

  curl -X PUT 'https://app.<realm>.signalfx.com/v2/integration/<integrationId>' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'x-sf-token: <USER_API_ACCESS_TOKEN>' \
    -H 'content-type: application/json' \
    --data-raw '{
      "authMethod" : "ExternalId",
      "created" : 1690856052734,
      "createdByName" : null,
      "creator" : "FVaMfXTAIAA",
      "customCloudWatchNamespaces" : null,
      "enableAwsUsage" : false,
      "enableCheckLargeVolume" : false,
      "enabled" : true,
      "externalId" : "<externalId>",
      "id" : "<integrationId>",
      "importCloudWatch" : true,
      "largeVolume" : false,
      "lastUpdated" : 1690856052734,
      "lastUpdatedBy" : "FVaMfXTAIAA",
      "lastUpdatedByName" : null,
      "name" : "AWS-connection-name",
      "pollRate" : 300000,
      "regions" : [ "us-east-1", "us-east-2", "us-west-1", "us-west-2" ],
      "roleArn" : "<your-aws-iam-role-arn>",
      "services" : [ ],
      "sfxAwsAccountArn" : "arn:aws:iam::<accountId>:root",
      "syncCustomNamespacesOnly" : false,
      "syncLoadBalancerTargetGroupTags" : false,
      "type" : "AWSCloudWatch"}'

.. _aws-api-connect:

4. Configure how to connect to AWS 
======================================

Configure how to connect to AWS: via API polling, or using Metric Streams.

.. _aws-configure-api-polling:
.. _aws-api-connect-polling:

Configure API polling (default)
------------------------------------------------------

If you're retrieving AWS metrics polling CloudWatch APIs, keep in mind the following intervals: 

  - First, the list of metrics is retrieved with the ``ListMetrics`` API every 15 minutes. 
  
  - Next, data points are retrieved with the ``GetMetricData`` API. Note that the ``GetMetricStatistics`` API is deprecated, see more in :ref:`aws-api-notice`.  
  
    - Use ``pollRate`` to configure the polling interval for metrics. 
    - Use ``metadataPollRate`` to configure the polling interval for metadata. 
    - See :new-page:`how to configure the APIs in the developer portal <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-retrieve-integrations-query>` for more information.

.. _activate-cw-metricstreams:
.. _aws-api-connect-ms:

Configure Metric Streams 
------------------------------------------------------

To activate CloudWatch Metric Streams, follow these steps:

#. Submit a GET request to ``https://api.<realm>.signalfx.com/v2/integration/<integrationId>`` to retrieve your current settings. Make sure to substitute your own realm and integration ID in the URL.
#. Set the ``metricStreamsSyncState`` field to ``ENABLED``.
#. Set the ``importCloudWatch`` field to ``true``.
#. Set the ``enabled`` field to ``true``.
#. Submit a PUT request to the ``https://api.<realm>.signalfx.com/v2/integration/<integrationId>`` endpoint to save your updated settings.

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

.. _aws-api-connect-aws:

Configure Metric Streams from the AWS console
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you want to integrate from the AWS console, make sure the following fields are configured:

.. code-block:: yaml

  "importCloudWatch": true // import metrics
  "metricStreamsSyncState": "ENABLED" // Metric Streams is activated
  "metricStreamsManagedExternally": true // Metric Streams managed by AWS

Deactivate Metric Streams
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To deactivate Metric Streams, follow these steps:

#. Submit a GET request to ``https://api.<realm>.signalfx.com/v2/integration/<integrationId>`` to retrieve your current settings. Make sure to substitute your own realm and integration ID in the URL.
#. Set the ``metricStreamsSyncState`` field to ``CANCELLING``.
#. Wait for Splunk Observability Cloud to clean up. This can take up to 15 minutes. 

  * If Splunk Observability Cloud sets ``metricStreamsSyncState`` to ``DISABLED``, Metric Streams has been deactivated sucessfully.
  * If Splunk Observability Cloud sets ``metricStreamsSyncState`` to ``CANCELLATION_FAILED``, try again, or refer to :ref:`aws-ts-metric-streams`.

.. _metricstreams_cloudformation:
.. _aws-api-cloudformation:

5. (Optional) Deploy CloudFormation
===================================================

To collect CloudWatch Metric Streams or logs from all supported AWS services across all regions, select and deploy a CloudFormation template that supports metric streams or logs. Deploying the template creates the additional resources on your AWS account required both by Metric Streams (Kinesis Firehose, S3 bucket, IAM roles) and logs (Splunk AWS log collector lambda function, IAM role).

- See the :ref:`CloudFormation templates table <aws-cloudformation>` for more information.
- You can find your access token in your account's profile settings.

.. _aws-api-logs:

6. Collect logs
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
