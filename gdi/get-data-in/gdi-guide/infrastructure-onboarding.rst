.. _infrastructure-onboarding.rst:

*********************************************************************************************
Configure your infrastructure and cloud services to send data to Splunk Observability Cloud
*********************************************************************************************

.. meta:: 
    :description: Configure cloud services, servers, clusters, and third-party applications to send data to Splunk Observability Cloud.

To achieve full-stack observability, the first step is to configure your infrastructure and cloud services to send data to Splunk Observability Cloud. 

To configure your infrastructure and cloud services, complete the following steps in order:

* :ref:`gdi-1`
* :ref:`gdi-2`
* :ref:`gdi-3`

.. _gdi-1:

Part 1: Integrate with cloud services to send metrics and logs
===================================================================================

If you're using cloud services such as AWS, GCP, and Azure for your infrastructure, integrate these services with Splunk Observability Cloud. If not, skip ahead to :ref:`gdi-2`.

With cloud service integrations, you can send metrics and metadata (such as tags, labels and other properties) to Splunk Infrastructure Monitoring, giving you a detailed analysis of your cloud service data.

Choose a method for cloud service integration
--------------------------------------------------------------------------

You can integrate your cloud service in a variety of methods. By default, each cloud service integration has an associated setup guide in Splunk Observability Cloud. 

You might choose a different method depending on your preferences or your current setup. For example, if you're setting up a small number of integrations, use the guided setup. If you're setting up many integrations for different accounts and regions, use the API or Terraform.

To get started, choose your preferred method from the table of methods for your cloud service provider and follow the associated instructions for setup.

* :ref:`aws-setup-options`
* :ref:`gcp-setup-options`
* :ref:`ms-azure-setup-options`

.. _aws-setup-options:

Amazon Web Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
-----------------------------------------------------------------

After you've integrated with your cloud services, you can access your data in the following locations:

- View metrics in Infrastructure Monitoring navigators

   .. image:: /_images/infrastructure/ebs-navigator.png
      :width: 100%
      :alt: This screenshot shows the EBS navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from EBS.

   For more information, see:

      - :ref:`monitor-aws-services`
      - :ref:`monitor-gcp-services`
      - :ref:`monitor-azure-services`

- View metrics in :ref:`built-in dashboards <built-in-dashboards>` for AWS, GCP, and Azure services

- Search for metrics :ref:`using the Metric Finder <metric-finder>`. For the list of metrics provided by a cloud service, see:

   - :new-page:`AWS official documentation <https://docs.aws.amazon.com/index.html#general_resourcess>`
   - :ref:`GCP metrics <gcp-metrics>`
   - :ref:`Azure metrics <azure-metrics>`

.. _gdi-2:

Part 2: Install the OpenTelemetry Collector to send server and cluster data
=============================================================================================================

Install the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` on any hosts or clusters you're using as a part of your infrastructure, such as servers running in your data center or on a virtual machine running in the cloud to: 

- Send metrics to Infrastructure Monitoring
- Send logs to Log Observer
- Set up your environment to receive logs and traces from applications instrumented in step :ref:`gdi-4`

After you've installed the Collector and configured your servers and clusters, you can access your data in the following locations:

- View metrics in Infrastructure Monitoring navigators

   .. image:: /_images/infrastructure/hosts-navigator.png
      :width: 100%
      :alt: This screenshot shows the Hosts navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from hosts.

   For more information, see:

      - :ref:`monitor-hosts`
      - :Ref:`use-the-k8s-navigator`

- View metrics in :ref:`built-in dashboards <built-in-dashboards>` for hosts and Kubernetes

- Search for metrics :ref:`using Metric Finder <metric-finder>`

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

Steps
-------------------------------------------------------------------

- To configure Windows servers, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install on Windows <get-started-windows>`
   - :ref:`Manually install on Windows <otel-install-windows-manual>`

- To configure Linux servers, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install on Linux <get-started-linux>`
   - :ref:`Manually install on Linux <otel-install-linux-manual>`

- To configure Kubernetes clusters, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install in a Kubernetes cluster <get-started-k8s>`
   - :ref:`Manually install in a Kubernetes cluster <otel-install-k8s>`

One of the benefits of using the Splunk Distribution of OpenTelemetry Collector to send your data to Splunk Observability Cloud is that Related Content, a feature that activates users to seamlessly move between key views in Splunk Observability Cloud, is easier to implement. For more information, see :ref:`get-started-relatedcontent`.

.. _gdi-3:

1. Configure third-party server applications to send metrics, logs, and traces
=========================================================================================================================

After you've completed step :ref:`gdi-2` and installed the Splunk Distribution of OpenTelemetry Collector on your servers (hosts) or in your clusters, configure the Collector's :ref:`native receivers <collector-components-receivers>` or :ref:`any of these third-party applications <monitor-data-sources>`, such as Apache, Cassandra, Hadoop, Kafka, and NGINX, to monitor your systems.

After you've configured the Collector's pipelines for your desired server applications, access your data in the following locations:

- View metrics using any built-in dashboards available for your server applications. For example, here is the built-in Kafka dashboard:

   .. image:: /_images/gdi/kafka-dashboard.png
      :width: 100%
      :alt: This screenshot shows the Kafka built-in dashboard.

   For more information about dashboards, see :ref:`view-dashboards`.

- Search for metrics :ref:`using Metric Finder <metric-finder>`. For the list of metrics provided by an application receiver, see the :ref:`documentation for the application receiver <monitor-data-sources>`.

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

- For SignalFx Forwarder only, you can:

      - View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`
      - View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`