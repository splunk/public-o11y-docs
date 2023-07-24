.. _aws-wizardconfig:

*********************************************************************
Connect to AWS using the guided setup in Splunk Observability Cloud
*********************************************************************

.. meta::
  :description: Use guided setup to connect Splunk Observability Cloud to AWS through CloudWatch.

If you have Administrator privileges for Splunk Observability Cloud and your Amazon Web Services (AWS) account, you can use the UI guided setup to create an integration to connect to AWS, and configure metrics and logs collection.

Check :ref:`get-started-aws` for prerequisites, information on ingest methods, and other ways to connect Splunk Observability Cloud to AWS.

.. _aws-wizard:

Use the guided setup to connect to AWS 
============================================

To access the guided setup for AWS integration, perform the following steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Amazon Web Services guided setup <https://login.signalfx.com/#/gdi/aws?category=all&gdiState=%7B%22integrationId%22:%22FfhrrZoAYAA%22%7D>`. Optionally, you can navigate to the guided setup on your own:

  - On the navigation menu, select :menuselection:`Data Management`. 
  - Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
  - On the Integrate Your Data page, select the tile for :strong:`Amazon Web Services`.

Next, follow the steps provided in the guided setup:

  - :ref:`aws-wizard-define`.
  - :ref:`aws-wizard-prepare`.
  - :ref:`aws-wizard-establish`.

.. _aws-wizard-define:

Define your connection
-------------------------------------------

Choose the following connection options:

* The region AWS from which AWS manages your resources. See :ref:`aws-regions` for more informaion.
* Authentication method. Learn more at :ref:`aws-authentication`.
* Data ingest options such as:

  * Metadata.
  * Cost and usage metrics.
  * Logs.
  * Ingestion method: Polling or streaming. Learn more at :ref:`get-started-aws`.

Polling rate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you poll yourdata from AWS, select the rate at which you want Splunk Observability Cloud to poll CloudWatch for metric data, with 1 minute as the minimum value, and 10 minutes as the maximum value. For example, a value of 300 polls metrics once every 5 minutes. 

Poll rate is expressed in seconds.  

.. _aws-wizard-metricstreams:

Activating Metric Streams
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you activate Metric Streams, take the following considerations into account:

* When creating the new AWS IAM policy, :ref:`add these additional permissions <metricstreams_iampolicy>` to the ones already suggested in the guided setup.
* Follow the instructions to :ref:`activate Metric Streams <activate-cw-metricstreams>`.
* Update your settings and deploy the CloudFormation template following :ref:`these steps <activate-cw-metricstreams>`.

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

Review the default AWS integration settings
==================================================

After creating an AWS IAM policy and assigning it to a particular role through the guided setup, you can modify your configuration.

Limit the scope of data collection
--------------------------------------------------

By default, Splunk Observability Cloud will bring in data from all supported AWS services associated with your account, with :ref:`certain limitations <aws-data-limits>`. 

- To manage the amount of data to import, see :ref:`specify-data-metadata`. 

- Use the check box options in the guided setup to limit the scope of your data collection. These are the available options:
  
  - Amazon Cost and Usage Metrics
  - CloudWatch Metrics polling (you can deactivate it altogether, or deactivate the polling but activate AWS Metric Streams instead)
  - CloudWatch Logs
  - :ref:`AWS regions <aws-regions>` to fetch data from
  - AWS services to fetch data from

- In the :strong:`Data Management` menu in Splunk Observability Cloud, edit any integration to limit data import.

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