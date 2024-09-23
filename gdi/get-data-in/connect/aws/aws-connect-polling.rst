.. _aws-wizardconfig:
.. _aws-connect-polling:

*********************************************************************
Connect to AWS via polling from the Splunk console
*********************************************************************

.. meta::
  :description: Send AWS data to Splunk Observability Cloud via polling.

If you have Administrator privileges for Splunk Observability Cloud and your Amazon Web Services (AWS) account, you can use the UI guided setup to create an integration to connect to AWS, and configure metric collection.

Before you start
============================================

Before you proceed, check :ref:`aws-prereqs` and :ref:`get-started-aws` for information on data collection intervals and costs.

For alternative connection methods, see:

* :ref:`aws-connect-ms`
* :ref:`aws-console-ms`
* :ref:`get-configapi`

.. _aws-wizard:

Use the UI guided setup to connect to AWS 
============================================

To access the guided setup for the AWS integration, perform the following steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Amazon Web Services guided setup <https://login.signalfx.com/#/gdi/aws?category=all&gdiState=%7B%22integrationId%22:%22FfhrrZoAYAA%22%7D>`. Optionally, you can navigate to the guided setup on your own:

  - On the navigation menu, select :menuselection:`Data Management`. 
  - Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.
  - Select the tile for :strong:`Amazon Web Services`.

Next, follow the steps provided in the guided setup:

* :ref:`aws-wizard-define`.
* :ref:`aws-wizard-prepare`.
* :ref:`aws-wizard-establish`.

.. _aws-wizard-define:

Define your AWS connection
-------------------------------------------

In this step you need to choose the following connection options:

* :guilabel:`Overall region`: The region AWS from which AWS manages your resources. See :ref:`aws-regions` for more information.
* :guilabel:`Authentication type`: How you will authenticate to connect with AWS. Learn more at :ref:`aws-authentication`.
* :guilabel:`Data types`: Select which types of data to ingest.

  * Metadata.
  * Cost and usage metrics.
  * CloudWatch metrics. 

In the CloudWatch Metrics option, select :guilabel:`Polling` as the ingestion method, and set up the polling rate at which you want Splunk Observability Cloud to poll CloudWatch for metric data.

.. note:: To collect logs, see :ref:`aws-logs`.

Set up the polling rate 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The polling rate is expressed in seconds, with ``60`` (1 minute) as the minimum value, and ``600`` (10 minutes) as the maximum value. 

For example, a value of 300 polls metrics once every 5 minutes. 

.. _aws-wizard-prepare:

Prepare your AWS account
-------------------------------------------

In this step, switch to your AWS Console to prepare for authentication.

On this screen, Splunk Observability Cloud gives you the AWS IAM policy JSON snippet, your Splunk Observability Cloud account ID and your External ID, which you'll need to define your authenticaton policies in the console.

See more details in :ref:`aws-authentication`.

.. _aws-wizard-establish:

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

After creating an AWS IAM policy and assigning it to a particular role through the guided setup you can modify your configuration.

Modify the scope of data collection
--------------------------------------------------

By default, Splunk Observability Cloud brings in data from all supported AWS services associated with your account, with :ref:`certain limitations <aws-data-limits>`, but only imports certain stats, which are based on AWS' own recommended stats and vary with service. You can look for your services' recommended stats in the official AWS docs, for example :new-page:`CloudWatch metrics for your Classic Load Balancer <https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-cloudwatch-metrics.html>` or :new-page:`S3 monitoring with Amazon CloudWatch <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html>`.

Use the check box options in the guided setup to limit the scope of your data collection. These are the available options:
  
* Collect Amazon Cost and Usage Metrics.
* Ingest CloudWatch Metrics. You can deactivate it altogether, or deactivate the polling but activate AWS Metric Streams instead.
* Select which :ref:`AWS regions <aws-regions>` to fetch data from.
* Select which AWS services to fetch data from.

To limit data collection, you can also:

- Manage the amount of data to import. See :ref:`aws-infra-import`.  
- In the :guilabel:`Data Management` menu in Splunk Observability Cloud, edit any integration to limit data import.

  .. image:: /_images/gdi/aws-edit-data-limit.png
    :width: 55%

- Use the AWS console to revise the contents of the ``Action`` and ``Resource`` fields.

Select a CloudFormation template
--------------------------------------------------

Select a :ref:`CloudFormation template <aws-cloudformation>` to collect Metric Streams for each AWS region that you want to operate in.

Next steps
================

After you connect Splunk Observability Cloud with AWS, you can use Splunk Observability Cloud to track a series of metrics and analyze your AWS data in real time. 

- See the AWS official documentation for a list of the available AWS resources.
- See :ref:`how to leverage data from integration with AWS <aws-post-install>` for more information.