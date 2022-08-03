.. _infrastructure-aws:

**********************************
Monitor AWS
**********************************

.. meta::
   :description: Learn how to monitor AWS infrastructure resources with Splunk Observability Cloud.

Monitor AWS service metrics with Splunk Observability Cloud. Any user can monitor AWS services in Observability Cloud.

Before you can start monitoring any AWS resources, you have to :ref:`get-started-aws`. You have to be an administrator to export AWS data.

Observability Cloud uses AWS :new-page:`CloudWatch Metrics <https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/working_with_metrics.html>` to provide robust infrastructure monitoring capabilities. If you're also exporting data from CloudWatch Logs and want to learn about how to view logs in Observability Cloud, see :ref:`get-started-logs`.

You can also export and monitor data from these sources running in your AWS environment:

.. list-table::
   :header-rows: 1
   :widths: 30, 20, 50

   * - :strong:`Get data in`
     - :strong:`Monitor`
     - :strong:`Description`

   * - :ref:`get-started-k8s`
     - :ref:`infrastructure-k8s`
     - Collect metrics and logs from Kubernetes clusters running in EC2 instances or EKS.

   * - - :ref:`get-started-linux`
       - :ref:`get-started-windows`
     - :ref:`infrastructure-hosts`
     - Collect metrics and logs from Linux and Windows hosts running in EC2 instances.

   * - :ref:`get-started-application`
     - :ref:`get-started-apm`
     - Collect application metrics and spans running in hosts, Kubernetes clusters, or Lambda functions.

Monitor AWS services from the Infrastructure Overview
=====================================================

View the health of AWS services at a glance from the Infrastructure Overview. This view provides a key metric for each service. You can also drill down into specific instances of an AWS service. For example, view key metrics for the EC2 service, and filter for a specific instance ID to analyze a particular EC2 instance.

Follow these steps to analyze problem AWS services from the Infrastructure Overview:

1. Select :strong:`Navigation menu > Infrastructure` and view the :strong:`Amazon AWS` category.
2. Select the specific service you want to analyze.
3. Compare instances of the service along the following metrics with the :strong:`Color by` dropdown menu. In the heat map, colors represent the health of instances based on the metrics you select. For example, a heat map that shows green and red, uses green to denote healthy and red to denote unhealthy instances. If your heat map has multiple colors, then the lighter gradient represents less activity, and the darker gradient represents more activity. To apply visually accessible color palettes on custom dashboards and charts and throughout Infrastructure Monitoring, go to :strong:`Account Settings > Color Accessibility.`

   You can color by metrics like CPU utilization and filter by dimensions like geographic region.
4. Group instances based on metadata about each instance with the :strong:`Group by` dropdown menu.

   For example, you can see instances in groups according to the region or availability zone they are running in or the environment tag. This is useful because you can see correlations between different parts of your infrastructure and its performance.
5.  Find outliers for your metrics with the :strong:`Find Outliers` setting. Specify the :strong:`Scope` and :strong:`Strategy`.

   Set the :strong:`Scope` to the entire population of instances or to the dimension you grouped instances by.

   There are two :strong:`Strategies` you can select to find outliers:

   .. list-table::
      :header-rows: 1
      :widths: 30, 70

      * - :strong:`Strategy`
        - :strong:`Description`

      * - ``Deviation from Mean``
        - Instances appear as red that exceed the mean value of the metric by at least three standard deviations. This setting is helpful for finding extreme outliers.

      * - ``Deviation from Median``
        - Instances appear as red that exceed the median absolute deviation value by at least three absolute deviations. This setting does not weigh extreme outliers as heavily as the standard deviation.

6. Select a specific instance you want to investigate further to view all the metadata and key metrics for the instance. For every instance, Observability Cloud provides a default dashboard.

   Analyze all the available metadata about the cloud service the instance is running in, the instance itself, and any custom tags associated with the instance. The default dashboard provides metric time series for key metrics with a 10-second resolution.

Use default dashboards to monitor AWS services
==============================================

Observability Cloud provides default dashboards for supported AWS services. Default dashboards are available in dashboard groups based on the AWS service a dashboard represents data for.

To find default dashboards for AWS services, select :strong:`Navigation menu > Dashboards` and search for the AWS service you want to view dashboards for.


Explore built-in content
========================
Splunk Observability Cloud collects data from many cloud services. To see all of the navigators provided for data collected in your organization, go to the Infrastructure page. To see all the pre-built dashboards for data collected in your organization, go to :strong:`Dashboards > Built-in`.

..
  Supported AWS services
  ======================

  You can monitor these AWS services in Observability Cloud:

  .. hlist::
    :columns: 2

    - ACM Private CA
    - Amazon MQ
    - Amazon API Gateway
    - Appstream 2.0
    - Elastic Load Balancing
    - Amazon Athena
    - Auto Scaling
    - AWS Billing
    - Amazon CloudFront
    - AWS CloudHSM
    - Amazon CloudSearch
    - AWS CodeBuild
    - Amazon Cognito
    - Amazon Connect
    - AWS Shield Advanced
    - AWS Database Migration Service
    - AWS Direct Connect
    - Amazon DocumentDB
    - Amazon DynamoDB
    - Amazon Elastic Block Store
    - Amazon EC2
    - Amazon EC2 (Spot Instances)
    - Amazon EC2 Container Service
    - Amazon Elastic File System
    - Elastic Load Balancing (Classic Load Balancers)
    - Amazon Elasticsearch Service
    - Amazon ElastiCache
    - AWS Elastic Beanstalk
    - Amazon Elastic Interface
    - Amazon EMR
    - Amazon Elastic Transcoder
    - Amazon CloudWatch Events
    - Amazon FSx for Lustre or Windows File Server
    - Amazon Kinesis Firehose
    - Amazon GameLift
    - AWS Glue
    - Amazon Inspector
    - AWS IoT
    - AWS IoT Analytics
    - AWS Key Management Service
    - Amazon Managed Streaming for Kafka
    - Amazon Kinesis Streams
    - Amazon Kinesis Analytics
    - Amazon Kinesis Video Streams
    - AWS Lambda
    - Amazon Lex
    - Amazon CloudWatch Logs
    - Amazon Machine Learning
    - AWS Elemental MediaConnect
    - AWS Elemental MediaConvert
    - AWS Elemental MediaPackage
    - AWS Elemental MediaTailor
    - Amazon VPC (NAT gateway)
    - Amazon Neptune
    - Elastic Load Balancing (Network Load Balancer)
    - AWS OpsWorks
    - Amazon Polly
    - Amazon Relational Database Service
    - Amazon Redshift
    - AWS Robomaker
    - Amazon Route 53
    - Amazon Simple Storage Service
    - AWS SDK Metrics for Enterprise Support
    - Amazon Simple Email Service
    - Amazon Simple Notification Service
    - Amazon Simple Queue Service
    - Amazon Simple Workflow Service
    - Amazon SageMaker
    - AWS Step Functions
    - AWS Storage Gateway
    - Amazon Textract
    - AWS IoT Things Graph
    - Amazon Translate
    - AWS Trusted Advisor
    - Amazon VPC VPN
    - Amazon WorkMail
    - Amazon WorkSpaces
    - Amazon MediaLive
    - Amazon CloudWatch agent
    - AWS WAF
    - Amazon SageMaker Endpoints
    - Amazon SageMaker Training Jobs
    - Amazon SageMaker Transform Jobs
