.. _aws-console-ms:

***********************************************************************************
Connect Splunk Observability Cloud with Metric Streams from the AWS console
***********************************************************************************

.. meta::
  :description: Connect to AWS from the AWS console using Metric Streams

Amazon CloudWatch supports a quick setup experience for AWS Partner destinations in the CloudWatch Metric Streams console. With this simplified getting-started experience you can create a Metric Stream to Splunk Observability Cloud in a single step.

Prerequisites
======================================================

Ensure you comply with the following requirements before you proceed to create your Metric Streams connection between your AWS and your Splunk Observability Cloud accounts:

* Make sure you have an active AWS integration in your associated Splunk Observability Cloud account. To learn how to create an integration, see :ref:`get-started-aws`. 
* Make sure Metric Streams is activated in the integration.
* Make sure the AWS account you used to create the integration contains the required policies for Metric Streams, as described in :ref:`metricstreams_iampolicy`. 

.. note:: You can only have one integration using Metric Streams externally managed from AWS at a time for each AWS account. All Metric Streams you created in different AWS regions will be sent to this integration. Editing included regions will affect metadata, and might impact how corresponding metric streams are located and displayed in Observability Cloud features such as dashboards.

Integrate from the AWS console using the API 
======================================================

If you want to integrate from the AWS console, make sure the following fields are configured:

.. code-block:: yaml

  "importCloudWatch": true // fetch metrics
  "metricStreamsSyncState": "ENABLED" // Metric Streams is activated
  "metricStreamsManagedExternally": true // Metric Streams managed by AWS

Learn more in our API reference guide at :new-page:`Integrations <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-retrieve-integrations-query>`.

Find Splunk Observability Cloud in AWS
======================================================

To connect Splunk Observability Cloud from the AWS console, follow these steps:

1. In the AWS console, go to :guilabel:`CloudWatch > Metrics > Streams`, and select :guilabel:`Create metric stream`.

2. Next, select :guilabel:`Quick AWS Partner setup` as the destination.

3. In the drop down menu, select :guilabel:`Splunk Observability Cloud`.

.. image:: /_images/gdi/aws-console-splunk.png
  :width: 55%

4. In the :guilabel:`Configure the AWS Partner destination` menu, select the Splunk Observability Cloud Ingest endpoints from the dropdown list. See :guilabel:`Profile > Organizations > Real-time Data Ingest Endpoint` in the Splunk Observability Cloud console for more information. 

5. Fill in the access token by copying one of the access tokens with ``INGEST`` authorization scope from :guilabel:`Settings > Access Tokens`.

6. You can leave the rest of the form as default, or customize the config according to your needs, such as filtering based on namespaces.
