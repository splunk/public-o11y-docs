.. _aws-ts-ms-aws:

******************************************************
Troubleshoot AWS-managed Metric Streams
******************************************************

.. meta::
  :description: Troubleshoot AWS-managed Metric Streams related issues.

See the following topics when experiencing AWS-managed Metric Streams related issues.

.. note:: See also :ref:`aws-troubleshooting` and :ref:`aws-ts-metric-streams`.

I've enabled AWS-managed Metric Streams in my AWS integration but I do not see any metrics streaming in
==========================================================================================================

Log in to your AWS console and review the following:

Check the Metric Stream integration settings 
----------------------------------------------------------------------

In your CloudWatch console check the following:

* The :strong:`Errors` chart must show zero errors.

* The destination and output format must look similar to what is visible on the screenshot below. Note that your destination URL might use a different realm, for example https://ingest.us0.signalfx.com/v1/cloudwatch_metric_stream.

.. image:: /_images/gdi/aws-ts-awsmanaged1.png
    :width: 70%
    :alt: Metric Stream settings

Check the associated Firehose stream configuration
----------------------------------------------------------------------

Go to your AWS console and check your Firehose stream configuration:

.. image:: /_images/gdi/aws-ts-awsmanaged2.png
      :width: 70%
      :alt: Firehose configuration

Check the associated Firehose stream metrics 
----------------------------------------------------------------------

Make sure that:

* :strong:`Incoming records` must have non-zero values. 

  * Note that if there's a low volume of traffic going through the stream, the value of ``IncomingRecords (per second average)`` can be significantly lower than ``RecordsPerSecondLimit``, and therefore it might look like there are no incoming records. 

* :strong:`HTTP endpoint delivery success` must be 100%. 

.. image:: /_images/gdi/aws-ts-awsmanaged3.png
      :width: 70%
      :alt: Firehose stream metrics

If there are any errors visible on the HTTP endpoint delivery success chart, update the Firehose stream destination settings to ensure that the HTTP endpoint is correct and use a new access token with INGEST scope.  

  * Note that your destination URL might use a different realm, for example https://ingest.us0.signalfx.com/v1/cloudwatch_metric_stream.

.. image:: /_images/gdi/aws-ts-awsmanaged4.png
      :width: 70%
      :alt: Destination settings

Review roles and permissions 
-----------------------------------

Check the following:

* Review the AWS role used by the Metric Streams. 

* Make sure all required permissions are included, and that the CloudWatch metric stream region and the region listed in the AWS policy are the same.

  * To find the AWS role used by the Metric Stream, go to the Stream overview page under the :strong:`Service Role to write to Amazon Data Firehose` label.

This is a sample AWS policy:

.. code-block:: none

  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "firehose:PutRecord",
                  "firehose:PutRecordBatch"
              ],
              "Resource": [
                  "arn:aws:firehose:eu-west-2:906383545488:deliverystream/PUT-HTP-7pH7O"
              ]
          }
      ]
  }

These are the trust relationships:

.. code-block:: none

  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Principal": {
                  "Service": "streams.metrics.cloudwatch.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
          }
      ]
  }



