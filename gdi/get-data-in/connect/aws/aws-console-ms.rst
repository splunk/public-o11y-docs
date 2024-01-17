.. _aws-console-ms:

***********************************************************************************
Connect Splunk Observability Cloud with Metric Streams from the AWS console
***********************************************************************************

.. meta::
  :description: Connect to AWS from the AWS console using Metric Streams

Amazon CloudWatch supports a quick setup experience for AWS Partner destinations in the CloudWatch Metric Streams console. With this simplified getting-started experience you can create a Metric Stream to Splunk Observability Cloud in a single step.

Before you start
======================================================

Before you proceed, check :ref:`aws-prereqs` and :ref:`get-started-aws` for information on data collection intervals and costs. When setting up your configuration in the AWS console, keep in mind that Splunk Observability Cloud only supports OpenTelemetry 0.7 and 1.0. 

For alternative connection methods, see:

* :ref:`aws-connect-polling`
* :ref:`aws-console-ms`
* :ref:`get-configapi`

.. note:: You can only have one integration using Metric Streams externally managed from AWS at a time for each AWS account. All Metric Streams you created in different AWS regions will be sent to this integration. Editing included regions will affect metadata, and might impact how corresponding metric streams are located and displayed in Observability Cloud features such as dashboards.

.. _aws-console-ms-start:

Start the connection to AWS in the Splunk console guided setup 
==========================================================================

To access the guided setup for the AWS integration, perform the following steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Amazon Web Services guided setup <https://login.signalfx.com/#/gdi/aws?category=all&gdiState=%7B%22integrationId%22:%22FfhrrZoAYAA%22%7D>`. Optionally, you can navigate to the guided setup on your own:

  - On the navigation menu, select :menuselection:`Data Management`. 
  - Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
  - On the Integrate Your Data page, select the tile for :strong:`Amazon Web Services`.

Next, follow the steps provided in the guided setup:

  - :ref:`aws-wizard-define-ms`.
  - :ref:`aws-wizard-prepare-ms`.
  - :ref:`aws-wizard-establish-ms`.

.. _aws-console-ms-define:

Define your AWS connection
-------------------------------------------

In this step you need to choose the following connection options:

* :guilabel:`Overall region`: The region AWS from which AWS manages your resources. See :ref:`aws-regions` for more information.
* :guilabel:`Authentication type`: How you will authenticate to connect with AWS. Learn more at :ref:`aws-authentication`.
* :guilabel:`Data types`: Select which types of data to ingest.

  * Metadata.
  * Cost and usage metrics.
  * CloudWatch metrics. 
  * Logs.

In the CloudWatch Metrics option, select :guilabel:`Streaming (AWS-managed)` as the ingestion method, and proceed to the AWS console to complete the connection. 

Prepare your AWS account
-------------------------------------------

On this screen, Splunk Observability Cloud gives you:

* The AWS IAM policy JSON snippet, your Splunk Observability Cloud account ID and your External ID, which you'll need to define your authenticaton policies in the console. See more details in :ref:`aws-authentication`.
* The steps to create Metric Streams in the AWS console. See more at :ref:`aws-console-ms-connect-aws`.

To complete this step, switch to your AWS Console to prepare for authentication and create the Metric Stream to send your data to Splunk Observability Cloud. See :ref:`aws-console-ms-connect-aws`.

.. _aws-console-ms-establish:

Establish the connection
-------------------------------------------

Finally, proceed with the last steps:

* Complete your authentication configuration as prompted.
* Select your data sources: 
  
  * AWS Regions. 
  * Built-in and custom services. 

.. note:: Select :guilabel:`All built-in services` to import all data from built-in CloudWatch namespaces and ensure that built-in dashboards display automatically.

.. _aws-console-ms-connect-aws:

Connect to Splunk Observability Cloud from the AWS console
==================================================================================================

Before you proceed to create your Metric Streams connection between your AWS and your Splunk Observability Cloud accounts in the AWS console, follow the steps in :ref:`aws-console-ms-start` to ensure you have an active AWS integration in your associated Splunk Observability Cloud account: 

* Make sure you selected :guilabel:`Streaming (AWS-managed)` as the ingestion method in the integration.
* Make sure the AWS account you used to create the integration contains the required policies for Metric Streams, as described in :ref:`metricstreams_iampolicy`. 

To connect Splunk Observability Cloud from the AWS console, follow these steps:

1. In the AWS console, go to :guilabel:`CloudWatch > Metrics > Streams`, and select :guilabel:`Create metric stream`.

2. Next, select :guilabel:`Quick AWS Partner setup` as the destination.

3. In the drop down menu, select :guilabel:`Splunk Observability Cloud`.

.. image:: /_images/gdi/aws-console-splunk2.png
  :width: 65%

4. In the :guilabel:`Configure the AWS Partner destination` menu, select the Splunk Observability Cloud Ingest endpoints from the dropdown list. See :guilabel:`Profile > Organizations > Real-time Data Ingest Endpoint` in the Splunk Observability Cloud console for more information. 

5. Fill in the access token by copying one of the access tokens with ``INGEST`` authorization scope from :guilabel:`Settings > Access Tokens` in the Splunk Observability Cloud console.

6. You can leave the rest of the form as default, or customize the config according to your needs, such as filtering based on namespaces.

Integrate from the AWS console using the Splunk API 
======================================================

If you want to integrate from the AWS console using the Splunk Observability Cloud API, see :ref:`aws-api-connect-aws`.

See also our API reference guide at :new-page:`Integrations <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-retrieve-integrations-query>`.

Next steps
================

After you connect Splunk Observability Cloud with AWS, you can use Splunk Observability Cloud to track a series of metrics and analyze your AWS data in real time. 

- See the AWS official documentation for a list of the available AWS resources.
- See :ref:`how to leverage data from integration with AWS <aws-post-install>` for more information.