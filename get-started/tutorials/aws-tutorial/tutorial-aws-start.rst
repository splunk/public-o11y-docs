.. _tutorial-aws-start:

**************************************************
Connect with your AWS services
**************************************************

.. meta::
   :description: Prerequisites for getting Kubernetes data into Splunk Observability Cloud.

If you're using AWS cloud services for your infrastructure, you can integrate these services with Splunk Observability Cloud to monitor metrics and metadata such as tags, labels and other properties. 

Prerequisites
===================================================================================

To integrate your AWS services with Splunk Observability Cloud, you need:

* Administrator privileges in your Splunk Observability Cloud and your AWS accounts. 
* :ref:`AWS authentication rights <aws-authentication>`. 

  * You can authenticate either with an :ref:`External ID (recommended) <aws-authentication>` or using a :ref:`security token <aws-authentication-token>`. 
  * For more details about creating organization access tokens, see :ref:`admin-org-tokens`.

Connect with AWS
===================================================================================

By default, the preferred method to send Amazon Web Services data is via :ref:`polling (default) <aws-connect-polling>`, which you can set up using Splunk's UI wizard. Optionally, you can also use the Splunk Observability Cloud API.

Alternatively , you can opt for :ref:`data streaming (Splunk-managed) <aws-connect-ms>`, :ref:`data streaming (AWS-managed) <aws-console-ms>`, or to configure the connection using :ref:`Splunk Terraform <terraform-config>`. Learn more at :ref:`aws-compare-connect`.

Poll AWS data using the UI
--------------------------------------------------------------

To access the guided setup for the AWS integration: 

#. Log in to Splunk Observability Cloud.
#. On the navigation menu, select :menuselection:`Data Management > Add Integration > Amazon Web Services`. 

.. image:: /_images/get-started/tutorial-aws-wizard.png
   :width: 80%
   :alt: UI wizard to connect to AWS

Follow the steps to configure the different connection options such as:

* :guilabel:`Overall region`: The region AWS from which AWS manages your resources. See :ref:`aws-regions` for more information.
* :guilabel:`Authentication type`: How you will authenticate to connect with AWS. Learn more at :ref:`aws-authentication`.
* :guilabel:`Data types`: The types of data and metadata to ingest.   
* In the CloudWatch Metrics option, select :guilabel:`Polling` as the ingestion method, and set up the polling rate at which you want Splunk Observability Cloud to poll CloudWatch for metric data.
* Your data sources: AWS Regions and services. 

For details on each step, read :ref:`aws-connect-polling`.

Available AWS services
--------------------------------------------------------------

Check the :ref:`list of AWS integrations available in Splunk Observability Cloud <aws-integrations>` to monitor the specific services you're using. 

For the list of metrics provided by each service, see the :new-page:`AWS official documentation <https://docs.aws.amazon.com/index.html#general_resourcess>`.

Install the OpenTelemetry Collector to send server and cluster data (Optional)
--------------------------------------------------------------------------------

Optionally, you can install the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` on any hosts or clusters you're using as a part of your infrastructure to send metrics to Infrastructure Monitoring, traces to APM, or logs to the Splunk Platform. 

One of the benefits of using the Splunk Distribution of OpenTelemetry Collector to send your data to Splunk Observability Cloud is that Related Content, a feature that activates users to seamlessly move between key views in Splunk Observability Cloud, is easier to implement. For more information, see :ref:`get-started-relatedcontent`.

Next 
===================================================================================

This completes the first step of the tutorial.

To learn how to monitor your AWS data and services, continue to :ref:`tutorial-aws-use`.
