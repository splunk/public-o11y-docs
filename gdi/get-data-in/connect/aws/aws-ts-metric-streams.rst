.. _aws-ts-metric-streams:

******************************************************
Troubleshoot Metric Streams in AWS
******************************************************

.. meta::
  :description: Troubleshoot Metric Streams from your AWS services in Splunk Observability Cloud.

See the following topics when experiencing Metric Streams issues from AWS.

.. note::

  See also :ref:`aws-troubleshooting` and :ref:`aws-ts-logs`.

I've enabled Metric Streams in my AWS integration but I do not see any metrics streaming in
==================================================================================================

After all the required IAM permissions are in place, your AWS integration is configured, and one of the :ref:`CloudFormation templates <aws-cloudformation>` has been deployed, Observability Cloud starts to create CloudWatch Metric Streams objects in your AWS account. It might take up to 15 minutes for metrics to start streaming.

If you're experiencing issues streaming metrics, check the following: 

* In the AWS CloudWatch Metric Streams console, verify that Metric Streams (automatically created by Observability Cloud) match the ``splunk-metric-stream-<integration-id>`` pattern. If Metric Streams are not present, review the Metric Streams set-up procedure.

* CloudFormation parameter values:
  
  * ``SplunkIngestUrl`` needs to be set to the value shown in the :strong:`Profile > Organizations > Real-time Data Ingest Endpoint`. For example, https://ingest.signalfx.com.
  
    Note: do NOT include the /v1/cloudwatch_metric_stream endpoint path in ``SplunkIngestUrl``.

  * ``SplunkAccessToken`` needs to be set to a valid organization access token with ``INGEST`` authorization scope. You can find access tokens in the :strong:`Settings > Access Tokens` page in the Observability Cloud UI.

* In the AWS Kinesis Streams console, validate that metrics are being delivered to the Kinesis Stream created by the CloudFormation template.

* In the AWS S3 bucket used by Kinesis Firehose, check if there are any records that could not be delivered to Observability Cloud.

How does Metric Streams clean-up work? How can I try to clean up Metric Streams again?
====================================================================================================

When you deactivate Metric Streams (or an entire AWS integration), Observability Cloud attempts to remove all CloudWatch Metric Streams that had been created. This process might take up to 15 minutes.

The clean-up procedure might fail if you remove IAM permissions or due to throttling, for example if there are too many API calls to delete Metric Streams objects.

To re-try the clean-up process, you have two options:

* Observability Cloud UI: Go to the context menu in the integration list and select Cleanup. 
* API: Set ``metricStreamsSyncState`` to the ``CANCELLING`` state.

Assisted Metric Streams clean-up failed. How do I clean up Metric Streams manually?
====================================================================================================

To manually remove Metric Streams:

#. Go to the AWS CloudWatch Metric Streams console in each region where you deployed a CloudFormation template. 
#. Remove all Metric Streams with a name starting with the ``splunk-metric-stream`` prefix followed by a numeric id.

Optionally, go to the CloudFormation console and remove the entire Observability Cloud stack.


