.. _aws-console-ms:

***********************************************************************************
Connect Splunk Observability Cloud with Metric Streams from the AWS console
***********************************************************************************

.. meta::
  :description: Connect to AWS from the AWS console using Metric Streams

Amazon CloudWatch supports a quick setup experience for AWS Partner destinations in the CloudWatch Metric Streams console. With this simplified getting-started experience you can create a Metric Stream to Splunk Observability in a single step.

Find Splunk Observability Cloud in AWS
======================================================

To connect Splunk Observability Cloud from the AWS console, follow these steps:

1. In the AWS console, go to :guilabel:`CloudWatch > Metrics > Streams`, and select :guilabel:`Create metric stream`.
2. Next, select :guilabel:`Quick AWS Partner setup` as the destination.
3. In the drop down menu, select :guilabel:`Splunk Observability Cloud`.

.. image:: /_images/gdi/aws-console-splunk.png
  :width: 55%

3. In the :guilabel:`Configure the AWS Partner destination` menu, select the Splunk Observability Cloud Ingest endpoints from the dropdown list based on what you can find in :guilabel:`Profile > Organizations > Real-time Data Ingest Endpoint` in the Splunk Observability console. 

4. Fill in the access token by copying one of the access tokens with INGEST authorization scope from :guilabel:`Settings > Access Tokens`.

5. You can leave the rest of the form as default, or customize the config according to your needs, such as filtering based on namespaces.

Prerequisites
======================================================

Ensure you comply with the following requirements before you proceed to create your Metric Streams connection between your AWS and your Splunk Observability Cloud accounts:

* Make sure you have an active AWS integration in your associated Splunk Observability Cloud account. To learn how to create an integration, see [LINK HERE]. 
* Make sure metric streams is activated in the integration.
* Make sure the AWS account you used to create the integration contains the required policies for metric streams, as described in :ref:`metricstreams_iampolicy`. 

Note
* Only one integration is allowed to be created to receive Externally Managed (created through AWS CloudWatch Console) metric streams for each AWS account.
* If you want to add metric streams from more regions or include more namespaces, you shall edit the existing one instead of creating a new integration, as it will not be allowed.
* By default, you might not want to edit the filter for syncing up metadata from all regions. If you deselect a region that has a metric stream sending in metrics, you may not be able to find it later in dashboards because of the lack of corresponding metadata.




