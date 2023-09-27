.. _aws-console-ms:

***********************************************************************************
Connect Splunk Observability Cloud with Metric Streams from the AWS console
***********************************************************************************

.. meta::
  :description: Connect to AWS from the AWS console using Metric Streams

You can integrate Splunk Observability Cloud with AWS directly from the AWS console using Metric Streams. 

This process includes creating Metric Streams in CloudWatch, Firehose in Kinesis, and S3 buckets for data backup in a single step. 

[MORE CONTEXT HERE?]


Find Splunk Observability Cloud in AWS
======================================================

To connect Splunk Observability Cloud from the AWS console, follow these steps:

1. In the AWS console, go to :guilabel:`CloudWatch > Metrics > Streams`, and select :guilabel:`Create metric stream`.
2. Next, select :guilabel:`Quick AWS Partner setup` as the destination.
3. In the drop down menu, select :guilabel:`Splunk Observability Cloud`.

.. image:: /_images/gdi/aws-console-splunk.png
  :width: 55%

4. In the :guilabel:`Configure the AWS Partner destination` menu, enter the API endpoint URL and the access token.

Prerequisites
======================================================

Ensure you comply with the following requirements before you proceed to create your connection between AWS and Splunk Observability Cloud:

* Make sure you have an active AWS integration in your associated Splunk Observability Cloud account.
* Make sure Metric Streams is activated in the integration, and configured with the right permissions, as described in :ref:`metricstreams_iampolicy`. 
* Use the following pattern when naming your AWS connection: ``splunk-metric-stream-<numeric integration id>``

To find the Id of your integration [PENDING]



