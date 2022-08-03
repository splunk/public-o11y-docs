.. _infrastructure-infrastructure:

********************************
Set up Infrastructure Monitoring
********************************

.. meta::
   :description: Learn how to configure Infrastructure Monitoring in Splunk Observability Cloud.

This page provides an overview for sending metrics from common data sources to Splunk Observability Cloud. Configure integrations in Observability Cloud to collect metrics from your infrastructure. If you also want to collect logs and traces from your infrastructure and services, see the :ref:`get-started-get-data-in` guide.

Each integration walks you through a step-by-step process to collect supported data types. To configure an integration for any data source, select :strong:`Navigation menu > Data setup`. 

The following steps describe how to configure integrations that collect metrics from your infrastructure.

..  image:: /_images/infrastructure/imm-first-hour.png
    :width: 80%
    :alt: This image describes the steps to get metrics in to Observability Cloud and monitor cloud services and infrastructure components.

Step 1. Connect cloud services
==============================

**Note:** You have to be an administrator to set up integrations that collect data on your behalf in Observability Cloud.

Connect your cloud service provider to collect metrics from supported cloud services. Observability Cloud provides integrations for AWS, GCP, and Azure. If you do not plan to monitor cloud services in Observability Cloud, skip to the next step. In addition, you do not have to first connect to cloud services to monitor hosts or Kubernetes clusters that run in cloud services.

To connect to a cloud service, select :strong:`Navigation menu > Data setup` and search for the cloud service you want to connect to. 

If you plan to collect only metrics from an AWS account, select to only collect data from CloudWatch Metrics.

See these pages for more information about connecting cloud services to Observability Cloud:

- :ref:`get-started-aws`
- :ref:`get-started-gcp`
- :ref:`get-started-azure`

Step 2. Collect infrastructure data with an OpenTelemetry Collector
===================================================================

Observability Cloud provides supported integrations for Kubernetes, Linux, and Windows. Integrations for these data sources help you deploy a :new-page:`Splunk OpenTelemetry Collector <https://github.com/signalfx/splunk-otel-collector>` to export metrics from hosts and containers to Observability Cloud.

To collect metrics from an infrastructure resource, select :strong:`Navigation menu > Data setup` and search for the host type or containerized environment you want to collect metrics from. 

See these pages for more information about sending host or container metrics to Observability Cloud:

- :ref:`get-started-k8s`
- :ref:`get-started-linux`
- :ref:`get-started-windows`

Step 3. Monitor and troubleshoot your infrastructure
====================================================

Observability Cloud provides default dashboards to monitor and troubleshoot your infrastructure from the Infrastructure Overview. 

To view the Infrastructure Overview, select :strong:`Navigation menu > Infrastructure`. The Infrastructure Overview breaks down your infrastructure into the following three categories:

.. list-table::
   :header-rows: 1
   :widths: 20, 25, 55

   * - :strong:`Category`
     - :strong:`Resource`
     - :strong:`Description`

   * - Public Clouds
     - - :ref:`infrastructure-aws`
       - :ref:`infrastructure-gcp`
       - :ref:`infrastructure-azure`
     - View key metrics and visualize incidents for every supported cloud service. The Infrastructure Overview provides default dashboards for each cloud service. For example, there are separate dashboards for AWS EC2 instances and AWS EBS instances.

   * - Containers
     - :ref:`infrastructure-k8s`
     - View key metrics and visualize incidents for your Kubernetes infrastructure at the cluster, node, pod, and container level. 

   * - My Data Center 
     - :ref:`infrastructure-hosts`
     - View key metrics and visualize incidents for every Linux and Windows host you collect data from in Observability Cloud.