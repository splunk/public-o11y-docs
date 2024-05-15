.. _aws-connect-ms:
.. _aws-wizard-metricstreams:

*********************************************************************
Connect to AWS with Splunk-managed Metric Streams 
*********************************************************************

.. meta::
  :description: Use guided setup to connect Splunk Observability Cloud to AWS through CloudWatch using Metric Streams.

If you have Administrator privileges for Splunk Observability Cloud and your Amazon Web Services (AWS) account, you can use the UI guided setup to create an integration to connect to AWS, and configure metrics and logs collection.

Before you start
============================================

Before you proceed, check :ref:`aws-prereqs` and :ref:`get-started-aws` for information on data collection intervals and costs.

For alternative connection methods, see:

* :ref:`aws-connect-polling`
* :ref:`aws-console-ms`
* :ref:`get-configapi`

Use the guided setup to connect to AWS 
============================================

To access the guided setup for the AWS integration, perform the following steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Amazon Web Services guided setup <https://login.signalfx.com/#/gdi/aws?category=all>`. Optionally, you can navigate to the guided setup on your own:

  - On the navigation menu, select :menuselection:`Data Management`. 
  - Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.
  - Select the tile for :strong:`Amazon Web Services`.

Next, follow the steps provided in the guided setup:

  - :ref:`aws-wizard-define-ms`.
  - :ref:`aws-wizard-prepare-ms`.
  - :ref:`aws-wizard-establish-ms`.

.. _aws-wizard-define-ms:

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

In the CloudWatch metrics option, select :guilabel:`Streaming (Splunk-managed)` as the ingestion method. 

When you activate Metric Streams, make sure you :ref:`add these additional permissions <metricstreams_iampolicy>` to your IAM policy. 

Kinesis Firehose connection options
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To create Kinesis Firehose and other resources required to connect to AWS using Splunk-managed Metric Streams you can use one of these two options: 

* CloudFormation template. Learn more at :ref:`aws-cloudformation-use`.
* Terraform template. Learn more at :ref:`aws-terraform-use`. The provided Terraform template supports Metric Streams only, and does not offer log support.

.. _aws-wizard-prepare-ms:

Prepare your AWS account
-------------------------------------------

In this step, switch to your AWS Console to prepare for authentication.

On this screen, Splunk Observability Cloud gives you the AWS IAM policy JSON snippet, your Splunk Observability Cloud account ID and your External ID, which you'll need to define your authenticaton policies in the console.

See more details in :ref:`aws-authentication`.

.. _aws-wizard-establish-ms:

Establish the connection
-------------------------------------------

Finally, proceed with the last steps:

* Complete your authentication configuration as prompted.
* Select your data sources: 
  
  * AWS Regions 
  * Built-in and custom services. 

.. note:: Select :guilabel:`All built-in services` to import all data from built-in CloudWatch namespaces and ensure that built-in dashboards display automatically.

Review the default settings
==================================================

After creating an AWS IAM policy and assigning it to a particular role through the guided setup, you can modify your configuration.

Modify the scope of data collection
--------------------------------------------------

By default, Splunk Observability Cloud brings in data from all supported AWS services associated with your account, with :ref:`certain limitations <aws-data-limits>`. 

Use the check box options in the guided setup to limit the scope of your data collection. These are the available options:
  
* Collect Amazon Cost and Usage Metrics.
* Ingest CloudWatch Metrics. You can deactivate it altogether, or deactivate the polling but activate AWS Metric Streams instead.
* Collect CloudWatch Logs.
* Select which :ref:`AWS regions <aws-regions>` to fetch data from.
* Select which AWS services to fetch data from.

To limit data collection, you can also:

- Manage the amount of data to import. See :ref:`specify-data-metadata`. 
- In the :guilabel:`Data Management` menu in Splunk Observability Cloud, edit any integration to limit data import.

  .. image:: /_images/gdi/aws-edit-data-limit.png
    :width: 55%

- Use the AWS console to revise the contents of the ``Action`` and ``Resource`` fields.

Select a CloudFormation template
--------------------------------------------------

Select a :ref:`CloudFormation template <aws-cloudformation>` to collect logs or Metric Streams for each AWS region that you want to operate in.

Next steps
================

After you connect Splunk Observability Cloud with AWS, you can use Splunk Observability Cloud to track a series of metrics and analyze your AWS data in real time. 

- See the AWS official documentation for a list of the available AWS resources.
- See :ref:`how to leverage data from integration with AWS <aws-post-install>` for more information.