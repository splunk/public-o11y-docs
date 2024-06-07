.. _integrate-cloud-services:

********************************************************************************************************
Part 1: Configure your infrastructure and cloud services to send data to Splunk Observability Cloud
********************************************************************************************************

.. meta:: 
    :description: Configure your cloud services (such as AWS, GCP, and Azure) with Splunk Observability Cloud to see cloud service metrics and logs.

If you're using cloud services such as AWS, GCP, and Azure for your infrastructure, integrate these services with Splunk Observability Cloud.

With cloud service integrations, you can send metrics and metadata (such as tags, labels and other properties) to Splunk Infrastructure Monitoring, giving you a detailed analysis of your cloud service data.

Choose a method for cloud service integration
=====================================================

You can integrate your cloud service in a variety of methods. By default, each cloud service integration has an associated setup guide in Splunk Observability Cloud. 

You might choose a different method depending on your preferences or your current setup. For example, if you're setting up a small number of integrations, use the guided setup. If you're setting up many integrations for different accounts and regions, use the API or Terraform.

To get started, choose your preferred method from the table of methods for your cloud service provider and follow the associated instructions for setup.

* :ref:`aws-setup-options`
* :ref:`gcp-setup-options`
* :ref:`ms-azure-setup-options`

.. _aws-setup-options:

Amazon Web Services
-------------------------------------------------------

Splunk supports the following integration methods for AWS:

.. list-table:: 
    :header-rows: 1
    :width: 100%
    :widths: 30, 40, 30

    * - Method
      - Description
      - Instructions
    * - Polling (default)
      - Polls AWS CloudWatch for metrics at a specified rate. To configure, use the Splunk Observability Cloud guided setup or the Splunk API. 
      - * Guided setup: :ref:`aws-connect-polling`
        * API setup: :ref:`get-configapi`
    * - Streaming (Splunk-managed)
      - Collects and manage metric streams from AWS. To configure, use the Splunk Observability Cloud guided setup or the Splunk API.
      - * Guided setup: :ref:`aws-connect-ms`
        * API setup: :ref:`get-configapi`
    * - Streaming (AWS-managed)
      - Collects and manage metric streams from AWS. To configure, use the AWS console.
      - :ref:`aws-console-ms`
    * - Splunk Terraform
      - Connect to AWS by configuring and deploying an integration through Terraform.
      - :ref:`terraform-config`

.. _gcp-setup-options:

Google Cloud Platform
------------------------------

Splunk supports the following integration methods for GCP:

.. list-table:: 
    :header-rows: 1
    :width: 100%
    :widths: 30, 40, 30

    * - Method
      - Description
      - Instructions
    * - Guided setup (default)
      - Connect to GCP using the guided setup in Splunk Observability Cloud.
      - :ref:`get-started-gcp`
    * - Splunk API
      - Connect to GCP using the Splunk Observability Cloud API.
      - :new-page:`Integrate Google Cloud Platform Monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/gcp_integration_overview>`
    * - Terraform
      - Connect to GCP by configuring and deploying an integration through Terraform.
      - :ref:`terraform-config`

.. _ms-azure-setup-options:

Microsoft Azure
----------------------------------

Splunk supports the following integration methods for Azure:

.. list-table:: 
    :header-rows: 1
    :width: 100%
    :widths: 30, 40, 30

    * - Method
      - Description
      - Instructions
    * - Guided setup (default)
      - Connect to Azure using the guided setup in Splunk Observability Cloud.
      - :ref:`get-started-azure`
    * - Splunk API
      - Connect to Azure using the Splunk Observability Cloud API.
      - :new-page:`Integrate Microsoft Azure Monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/msazure_integration_overview>`
    * - Terraform
      - Connect to Azure by configuring and deploying an integration through Terraform.
      - :ref:`terraform-config`

Access your cloud service data in Splunk Observability Cloud
====================================================================

After you've integrated your cloud services with Splunk Observability Cloud, you can access your data in the following locations:

* :ref:`Infrastructure monitoring navigators <inframon-navigators-cloud>`
* :ref:`Built-in dashboards <builtin-dashboards-cloud>`
* :ref:`Metric finder <metric-finder-cloud>`

Use one of these methods to access your data. If you can see your data in the navigators, dashboards, or metric finder, then your integration is working.

.. _inframon-navigators-cloud:

View metrics in Infrastructure Monitoring navigators
----------------------------------------------------------

Splunk Observability Cloud uses navigators to display visualizations of your data. 

   .. image:: /_images/infrastructure/ebs-navigator.png
      :width: 100%
      :alt: This screenshot shows the EBS navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from EBS.

To access the navigator for your cloud service provider, follow these steps:

#. In Splunk Observability Cloud, select :guilabel:`Infrastructure`.
#. 


For more information, see the following:

    - :ref:`monitor-aws-services`
    - :ref:`monitor-gcp-services`
    - :ref:`monitor-azure-services`

.. _builtin-dashboards-cloud:

View metrics in built-in dashboards for cloud services
-------------------------------------------------------

.. _metric-finder-cloud:

Search for metrics using the metric finder
-------------------------------------------------------

You can use the metric finder to search for your cloud service metrics. Follow these steps:

#. In Splunk Observability Cloud, select :guilabel:`Metric Finder`.
#. Use the search bar to search for metrics provided by a cloud service. For a list of metrics provided by each cloud service, see:

   - :new-page:`AWS official documentation <https://docs.aws.amazon.com/index.html#general_resourcess>`
   - :ref:`GCP metrics <gcp-metrics>`
   - :ref:`Azure metrics <azure-metrics>`

Next steps
====================

To continue setting up your infrastructure for Splunk Observability Cloud, see <NEXT PART>.