.. _tutorial-aws-start:

**************************************************
Start here: Connect with your AWS services
**************************************************

.. meta::
   :description: Prerequisites for getting Kubernetes data into Splunk Observability Cloud.

Get started with monitoring your AWS data in Splunk Observability Cloud.

Prerequisites
===================================================================================

* You must be an administrator in Splunk Observability Cloud.
* You must have an access token for the Splunk Observability Cloud organization you want to get data into. 

  * For more details about creating organization access tokens, see :ref:`admin-org-tokens`.
  * If you are using a free trial account, you can use the :guilabel:`Default` access token to complete this task. 

Prerequisites
===================================================================================

If you're using cloud services for your infrastructure, the first step is to integrate these services with Splunk Observability Cloud. Cloud integrations can send metrics and metadata (such as tags, labels and other properties) to Infrastructure Monitoring.

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


Steps
--------------------------------------------------------------

- To integrate with Amazon Web Services, use the method that better suits your environment:




For example, you might want to use the guided setup if you are setting up just a few integrations. However, if you are setting up many integrations, such as for different accounts and regions, use the API or Terraform. Note that if you need all of the latest integration features, you might want to use the API because support might not yet be available using Terraform.


Install the OpenTelemetry Collector to send server and cluster data
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





One of the benefits of using the Splunk Distribution of OpenTelemetry Collector to send your data to Splunk Observability Cloud is that Related Content, a feature that activates users to seamlessly move between key views in Splunk Observability Cloud, is easier to implement. For more information, see :ref:`get-started-relatedcontent`.
