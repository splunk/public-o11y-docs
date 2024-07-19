.. _tutorial-aws-start:

**************************************
Part 1: Connect with your AWS services
**************************************

Install the AWS integration and connect your AWS services with Splunk Observability Cloud. For an overview of the tutorial, see :ref:`about-aws-tutorial`.

Connect with AWS
================

Send Amazon Web Services data to Splunk Observability Cloud using :ref:`polling (default) <aws-connect-polling>`, which you can set up using the Splunk Observability Cloud UI guided install. Optionally, you can use the Splunk Observability Cloud API.

Alternatively, you can opt for :ref:`data streaming (Splunk-managed) <aws-connect-ms>`, :ref:`data streaming (AWS-managed) <aws-console-ms>`, or to configure the connection using :ref:`Splunk Terraform <terraform-config>`.

Poll AWS data using the UI
--------------------------

To access the guided setup for the AWS integration: 

#. Log in to Splunk Observability Cloud.
#. In the navigation menu, select :menuselection:`Data Management`, :menuselection:`Add Integration`, then :menuselection:`Amazon Web Services`. The following window displays:

   .. image:: /_images/get-started/tutorial-aws-wizard.png
      :width: 80%
      :alt: UI guided setup to connect to AWS

Configure the following connection options:

* :guilabel:`Overall region`: The AWS region from which AWS manages your resources. For more information, see :ref:`aws-regions`.
* :guilabel:`Authentication type`: How you authenticate to connect with AWS. Learn more at :ref:`aws-authentication`.
* :guilabel:`Data types`: The types of data and metadata to ingest.   
* In the :guilabel:`CloudWatch Metrics` option, select :guilabel:`Polling` as the ingestion method, and set up the polling rate at which you want Splunk Observability Cloud to poll CloudWatch for metric data.
* Your data sources: AWS Regions and services. 

  .. image:: /_images/get-started/tutorial-aws-sources.png
     :width: 90%
     :alt: Data sources for your AWS connection

For details on each step, read :ref:`aws-connect-polling`.

Available AWS services
----------------------

To monitor the specific services you're using, check the :ref:`list of AWS integrations available in Splunk Observability Cloud <aws-integrations>`. 

For the list of metrics provided by each service, see the :new-page:`AWS official documentation <https://docs.aws.amazon.com/index.html#general_resourcess>`.

Install the OpenTelemetry Collector to send server and cluster data (Optional)
------------------------------------------------------------------------------

Optionally, you can install the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` on any hosts or clusters you're using as a part of your infrastructure to send metrics to Infrastructure Monitoring, traces to APM, or logs to the Splunk Platform. 

One of the benefits of using the Splunk Distribution of OpenTelemetry Collector to send your data to Splunk Observability Cloud is that Related Content, a feature that activates users to seamlessly move between key views in Splunk Observability Cloud, is easier to implement. For more information, see :ref:`get-started-relatedcontent`.

Next step
=========

This completes the first part of the tutorial. You've connected your AWS services with Splunk Observability Cloud

Next, learn how to monitor your AWS data and services. To continue, see :ref:`tutorial-aws-use`.

Learn more
==========

For more details about alternative ways to connect with AWS, see :ref:`aws-compare-connect`.
