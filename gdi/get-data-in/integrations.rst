.. _supported-data-sources:

********************************************************************************
Supported integrations
********************************************************************************

.. meta::
  :description: This page provides a listing of integrations and services supported by Splunk Observability Cloud.

This page provides the list of integrations supported by Splunk Observability Cloud.


.. _aws-integrations:

Amazon Web Services
----------------------------------

To learn about AWS and Splunk Observability Cloud, read the following: 

* :ref:`get-started-aws`
* Refer to the AWS official documentation for a list of the available AWS metrics and other data, or read about :ref:`the metadata Splunk Observability Cloud provides <aws-infra-metadata>`
* :ref:`aws-logs`
* :ref:`infrastructure-aws`

The following AWS services send data to Infrastructure Monitoring:

.. list-table::
  :header-rows: 1
  :widths: 40 40 15 15 15 15
  :width: 100%
  :class: monitor-table

  * - :strong:`Namespace`
    - :strong:`Service`
    - :strong:`Provides metrics`
    - :strong:`Provides traces`
    - :strong:`Provides logs`
    - :strong:`Provides metadata`

  * - AWS/ACMPrivateCA
    - ACM Private CA
    - :strong:`X`
    -
    - 
    - 

  * - AWS/AmazonMQ
    - Amazon Managed Message Broker (MQ)
    - :strong:`X`
    - 
    - :strong:`X`
    - 

  * - AWS/ApiGateway
    - Amazon API Gateway
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/ApplicationELB
    - AWS Elastic Load Balancing (Application Load Balancers)
    - :strong:`X`
    - 
    - :strong:`X`
    - :strong:`X`

  * - AWS/AppStream
    - AppStream 2.0  
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/Athena
    - Amazon Athena
    - :strong:`X`
    -
    - 
    - 

  * - AWS/AutoScaling
    - AWS Auto Scaling
    - :strong:`X`
    - 
    - :strong:`X` (1)
    - :strong:`X`

  * - AWS/Backup
    - Amazon Backup
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/Billing
    - AWS Billing
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/CertificateManager
    - AWS Certificate Manager
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/CloudFront
    - AWS CloudFront
    - :strong:`X`
    - 
    - :strong:`X`
    - :strong:`X`

  * - AWS/CloudHSM
    - AWS CloudHSM
    - :strong:`X`
    - 
    - :strong:`X` (1)
    -
  
  * - AWS/CloudSearch
    - Amazon CloudSearch
    - :strong:`X`
    - 
    - 
    -

  * - AWS/CodeBuild
    - AWS CodeBuild
    - :strong:`X`
    - 
    - :strong:`X`
    - 

  * - AWS/Cognito
    - Amazon Cognito
    - :strong:`X`
    - 
    - :strong:`X`
    -

  * - AWS/Connect
    - Amazon Connect
    - :strong:`X`
    -
    -
    -

  * - AWS/DDoSProtection
    - AWS Shield Advanced
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/DMS
    - AWS Database Migration Service
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/DocDB
    - Amazon DocumentDB
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/DX
    - AWS Direct Connect
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/DynamoDB
    - Amazon DynamoDB
    - :strong:`X`
    - :strong:`X`
    - 
    - :strong:`X`

  * - AWS/EBS
    - Amazon Elastic Block Store (EBS)
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/EC2
    - Amazon Elastic Compute Cloud (EC2)
    - :strong:`X`
    - :strong:`X`
    - :strong:`X` (3)
    - :strong:`X`

  * - AWS/EC2Spot
    - Amazon EC2 Spot Instances
    - :strong:`X`
    - 
    - :strong:`X` (3)
    - 

  * - AWS/ECS
    - Amazon EC2 Container Service (ECS)
    - :strong:`X`
    - :strong:`X`
    - :strong:`X` (1)
    - :strong:`X`

  * - AWS/EFS
    - Amazon Elastic File System
    - :strong:`X`
    - 
    -
    - :strong:`X`

  * - AWS/EKS
    - Amazon Elastic Kubernetes Service (EKS)
    - :strong:`X`
    - :strong:`X`
    - :strong:`X`
    - :strong:`X`

  * - AWS/ElastiCache
    - Amazon ElastiCache
    - :strong:`X`
    - :strong:`X`
    - :strong:`X`
    - :strong:`X`

  * - AWS/ElasticBeanstalk
    - AWS Elastic Beanstalk
    - :strong:`X`
    - 
    - :strong:`X`
    - :strong:`X`

  * - AWS/ElasticInterface
    - Amazon Elastic Interface
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/ElasticMapReduce
    - Amazon Elastic MapReduce (EMR)
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/ElasticTranscoder
    - Amazon Elastic Transcoder
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/ELB
    - AWS Elastic Load Balancing (Classic Load Balancers)
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/ES
    - Amazon Elasticsearch Service
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/Events
    - Amazon CloudWatch Events
    - :strong:`X`
    - 
    - :strong:`X`
    - 

  * - AWS/Firehose
    - Amazon Kinesis Firehose
    - :strong:`X`
    - 
    - :strong:`X`
    - :strong:`X`

  * - AWS/FSx
    - Amazon FSx for Lustre or Windows File Server
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/GameLift
    - Amazon GameLift
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/Inspector
    - Amazon Inspector
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/IoT
    - AWS IoT
    - :strong:`X`
    - 
    - :strong:`X`
    -

  * - AWS/IoTAnalytics
    - AWS IoT Analytics
    - :strong:`X`
    -
    -
    - 

  * - AWS/Kafka
    - Amazon Managed Streaming for Kafka (MSK)
    - :strong:`X`
    -
    - :strong:`X`
    - 

  * - AWS/Kinesis
    - Amazon Kinesis Streams
    - :strong:`X`
    - :strong:`X`
    - 
    - :strong:`X`

  * - AWS/KinesisAnalytics
    - Amazon Kinesis Analytics
    - :strong:`X`
    - :strong:`X`
    - 
    - :strong:`X`

  * - AWS/KinesisVideo
    - Amazon Kinesis Video Streams
    - :strong:`X`
    -
    - 
    - 

  * - AWS/KMS
    - AWS Key Management Service
    - :strong:`X`
    -
    - 
    - 

  * - AWS/Lambda
    - AWS Lambda
    - :strong:`X`
    - :strong:`X`
    - :strong:`X`
    - :strong:`X`

  * - AWS/Lex
    - Amazon Lex
    - :strong:`X`
    - 
    - :strong:`X` (1)
    -

  * - AWS/Logs
    - Amazon CloudWatch Logs
    - :strong:`X`
    - 
    -
    -

  * - AWS/MediaConnect
    - AWS Elemental MediaConnect
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/MediaConvert
    - AWS Elemental MediaConvert
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/MediaPackage
    - AWS Elemental MediaPackage
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/MediaTailor
    - AWS Elemental MediaTailor
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/ML
    - Amazon Machine Learning
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/NATGateway
    - Amazon VPC (NAT gateway)
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/Neptune
    - Amazon Neptune
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/NetworkELB
    - AWS Elastic Load Balancing (Network Load Balancers)
    - :strong:`X`
    - 
    - :strong:`X`
    - :strong:`X`

  * - AWS/OpsWorks
    - AWS OpsWorks
    - :strong:`X`
    - 
    - :strong:`X`
    - 

  * - AWS/Polly
    - Amazon Polly
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/RDS
    - Amazon Relational Database Service
    - :strong:`X`
    - :strong:`X`
    - 
    - :strong:`X`

  * - AWS/Redshift
    - Amazon Redshift
    - :strong:`X`
    - :strong:`X`
    - 
    - :strong:`X`

  * - AWS/Robomaker
    - AWS RoboMaker
    - :strong:`X`
    - 
    - :strong:`X`
    - 

  * - AWS/Route53
    - Amazon Route 53
    - :strong:`X`
    -
    - 
    - :strong:`X`

  * - AWS/S3
    - Amazon Simple Storage Service
    - :strong:`X`
    - 
    - :strong:`X`
    - :strong:`X`

  * - AWS/S3/Storage-Lens
    - Amazon S3 Storage Lens
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/SageMaker
    - Amazon SageMaker
    - :strong:`X`
    -
    - :strong:`X`
    - 

  * - AWS/sagemaker/Endpoints
    - Amazon SageMaker Endpoints
    - :strong:`X`
    -
    - :strong:`X`
    - 

  * - AWS/sagemaker/TrainingJobs
    - Amazon SageMaker Training Jobs
    - :strong:`X`
    -
    - :strong:`X`
    - 

  * - AWS/sagemaker/TransformJobs
    - Amazon SageMaker Transform Jobs
    - :strong:`X`
    -
    - :strong:`X`
    - 

  * - AWS/SDKMetrics
    - AWS SDK Metrics for Enterprise Support
    - :strong:`X`
    -
    - 
    - 

  * - AWS/SES
    - Amazon Simple Email Service
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/SNS
    - Amazon Simple Notification Service
    - :strong:`X`
    - :strong:`X`
    -
    - :strong:`X`

  * - AWS/SQS
    - Amazon Simple Queue Service
    - :strong:`X`
    - :strong:`X`
    -
    - :strong:`X`

  * - AWS/States
    - AWS Step Functions
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/StorageGateway
    - AWS Storage Gateway
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/SWF
    - Amazon Simple Workflow Service
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/Textract
    - Amazon Textract
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/ThingsGraph
    - AWS IoT Things Graph
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/Translate
    - Amazon Translate
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/TrustedAdvisor
    - AWS Trusted Advisor
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/VPN
    - Amazon VPC VPN
    - :strong:`X`
    -
    - 
    - :strong:`X`

  * - AWS/WAFV2
    - AWS Web Application Firewall (WAF) V2
    - :strong:`X`
    - 
    - :strong:`X` (1)
    - 

  * - AWS/WorkMail
    - Amazon WorkMail
    - :strong:`X`
    - 
    - 
    - 

  * - AWS/WorkSpaces
    - Amazon WorkSpaces
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - CWAgent
    - Amazon CloudWatch Agent
    - :strong:`X`
    - 
    - 
    - :strong:`X` (2)

  * - Glue
    - AWS Glue
    - :strong:`X`
    -
    - :strong:`X`
    - 

  * - MediaLive
    - Amazon MediaLive
    - :strong:`X`
    - 
    - 
    - 

  * - System/Linux
    - Amazon Linux 2
    - :strong:`X`
    - 
    - 
    - 

  * - WAF
    - AWS WAF Classic
    - :strong:`X`
    - 
    - 
    - 


The following applies to the collected logs and metadata listed in the table:

#. CloudWatch Logs only
#. EC2 tags & properties only
#. Logs collected by the CloudWatch agent stored in CloudWatch Logs

.. _gcp-integrations:

Google Cloud Platform services
-----------------------------------------------

To learn about GCP and Splunk Observability Cloud, read the following: 

* :ref:`get-started-gcp`
* :ref:`gcp-metrics`
* :ref:`gcp-logs`
* :ref:`infrastructure-gcp`

The following GCP services send metrics to Infrastructure Monitoring:

.. list-table::
  :header-rows: 1
  :widths: 40 40 
  :width: 100%  

  * - :strong:`Service name (to use in the API)`
    - :strong:`Product name (as displayed in the GUI)`

  * - appengine
    - App Engine

  * - bigquery
    - BigQuery

  * - bigtable
    - Cloud Bigtable

  * - cloudfunctions
    - Cloud Functions

  * - cloudiot
    - Cloud Internet of Things Core

  * - cloudsql
    - Cloud SQL

  * - cloudtasks
    - Cloud Tasks

  * - composer
    - Cloud Composer

  * - compute
    - Compute Engine

  * - container
    - Container Engine

  * - dataflow
    - Cloud Dataflow

  * - dataproc
    - Cloud Dataproc

  * - datastore
    - Cloud Datastore

  * - file
    - Cloud Filestore

  * - firebasedatabase
    - Firebase Database

  * - firebasehosting
    - Firebase Hosting

  * - interconnect
    - Cloud Interconnect Dedicated

  * - knative
    - Knative

  * - kubernetes
    - Kubernetes (GKE)

  * - loadbalancing
    - Compute Engine HTTP(S) Load Balancing

  * - logging
    - Stackdriver Logging

  * - ml
    - Cloud Machine Learning
  
  * - monitoring
    - Stackdriver Monitoring

  * - pubsub
    - Cloud Pub/Sub

  * - redis
    - Memorystore for Redis

  * - router
    - Cloud Router

  * - run
    - Cloud Run

  * - serviceruntime
    - Google Cloud Endpoints APIs

  * - spanner
    - Cloud Spanner

  * - storage
    - Cloud Storage

  * - vpn
    - Cloud VPN


.. _azure-integrations:
.. _supported-azure-services:

Microsoft Azure services
----------------------------------

To learn about Azure and Splunk Observability Cloud, read the following: 

* :ref:`get-started-azure`
* :ref:`azure-metrics`
* :ref:`ingest-azure-log-data`
* :ref:`infrastructure-azure`

The following Azure services send metrics to Infrastructure Monitoring:

.. list-table::
  :header-rows: 1
  :widths: 40 40 
  :width: 100%  

  * - :strong:`Resource name`
    - :strong:`Resource type`

  * - API Management	
    - microsoft.apimanagement/service

  * - App Service	
    - microsoft.web/sites  

  * - App Service	
    - microsoft.web/serverfarms

  * - App Service	
    - microsoft.web/sites/slots

  * - App Service	
    - microsoft.web/hostingenvironments/multirolepools

  * - App Service	
    - microsoft.web/hostingenvironments/workerpools 

  * - Application Gateway
    - microsoft.network/applicationgateways

  * - Automation	
    - microsoft.automation/automationaccounts

  * - Azure Analysis Services	
    - microsoft.analysisservices/servers

  * - Azure Autoscale	
    - microsoft.insights/autoscalesettings

  * - Azure Cosmos DB	
    - microsoft.documentdb/databaseaccounts

  * - Azure Data Explorer	
    - microsoft.kusto/clusters

  * - Azure Database for MariaDB	
    - microsoft.dbformariadb/servers

  * - Azure Database for MySQL	
    - microsoft.dbformysql/servers

  * - Azure Database for PostgreSQL	
    - microsoft.dbforpostgresql/servers

  * - Azure DDoS Protection	
    - microsoft.network/publicipaddresses

  * - Azure DNS	
    - microsoft.network/dnszones

  * - Azure Firewall	
    - microsoft.network/azurefirewalls

  * - Azure Front Door	
    - microsoft.network/frontdoors

  * - Azure Kubernetes Service	
    - microsoft.containerservice/managedclusters

  * - Azure Location Based Services	
    - microsoft.locationbasedservices/accounts

  * - Azure Machine Learning	
    - microsoft.machinelearningservices/workspaces

  * - Azure Maps	
    - microsoft.maps/accounts

  * - Azure SignalR Service	
    - microsoft.signalrservice/signalr

  * - Azure SQL Managed Instances	
    - microsoft.sql/managedinstances

  * - Azure Web PubSub	
    - microsoft.signalrservice/webpubsub

  * - Batch	
    - microsoft.batch/batchaccounts

  * - Container Instances	
    - microsoft.containerinstance/containergroups

  * - Cognitive Services	
    - microsoft.cognitiveservices/accounts

  * - Container Registry	
    - microsoft.containerregistry/registries

  * - Content Delivery Network (CDN)	
    - microsoft.cdn/cdnwebapplicationfirewallpolicies

  * - Customer Insights	
    - microsoft.customerinsights/hubs

  * - Event Grid (domains)	
    - microsoft.eventgrid/domains

  * - Event Grid (Event Subscriptions)	
    - microsoft.eventgrid/eventsubscriptions

  * - Event Grid (Extension Topics)	
    - microsoft.eventgrid/extensiontopics

  * - Event Grid (System Topics)	
    - microsoft.eventgrid/systemtopics

  * - Event Grid (Topics)	
    - microsoft.eventgrid/topics

  * - Event Hubs	
    - microsoft.eventhub/namespaces

  * - Data Factory	
    - microsoft.datafactory/datafactories

  * - Data Factory	
    - microsoft.datafactory/factories

  * - Data Lake Analytics	
    - microsoft.datalakeanalytics/accounts

  * - Data Lake Store	
    - microsoft.datalakestore/accounts

  * - ExpressRoute	
    - microsoft.network/expressroutecircuits

  * - HDInsight	
    - microsoft.hdinsight/clusters

  * - Iot Hub	
    - microsoft.devices/iothubs

  * - Iot Hub	
    - microsoft.devices/provisioningservices

  * - Iot Hub	
    - microsoft.devices/elasticpools

  * - Iot Hub	
    - microsoft.devices/elasticpools/iothubtenants

  * - Key Vault	
    - microsoft.keyvault/vaults

  * - Load Balancer	
    - microsoft.network/loadbalancers

  * - Logic apps	
    - microsoft.logic/workflows

  * - Network Interfaces	
    - microsoft.network/networkinterfaces, Network Interfaces

  * - Notification Hubs	
    - microsoft.notificationhubs/namespaces/notificationhubs

  * - Power BI	
    - microsoft.powerbidedicated/capacities

  * - Redis Cache	
    - microsoft.cache/redis

  * - Relays	
    - microsoft.relay/namespaces

  * - Search Services	
    - microsoft.search/searchservices

  * - Service Bus	
    - microsoft.servicebus/namespaces

  * - Storage	
    - microsoft.storage/storageaccounts

  * - Storage	
    - microsoft.storage/storageaccounts/tableservices

  * - Storage	
    - microsoft.storage/storageaccounts/blobservices

  * - Storage	
    - microsoft.storage/storageaccounts/queueservices

  * - Storage	
    - microsoft.storage/storageaccounts/fileservices

  * - Stream Analytics	
    - microsoft.streamanalytics/streamingjobs

  * - SQL Database	
    - microsoft.sql/servers/databases

  * - SQL Elastic Pools	
    - microsoft.sql/servers/elasticpools

  * - SQL Servers	
    - microsoft.sql/servers

  * - Traffic Manager	
    - microsoft.network/trafficmanagerprofiles

  * - Virtual Machines	
    - microsoft.compute/virtualmachines

  * - Virtual Machines (Classic)	
    - microsoft.classiccompute/virtualmachines

  * - Virtual Machine Scale Sets	
    - microsoft.compute/virtualmachinescalesets

  * - Virtual Machine Scale Sets	
    - microsoft.compute/virtualmachinescalesets/virtualmachines

  * - VPN Gateway	
    - microsoft.network/virtualnetworkgateways


Infrastructure
----------------------------------

Install the Splunk Distribution of OpenTelemetry Collector on your infrastructure to start sending data to Splunk Observability Cloud.

.. list-table::
   :header-rows: 1
   :widths: 50 16 16 16
   :width: 100%
   :class: monitor-table

   * - :strong:`Data source`
     - :strong:`Provides metrics`
     - :strong:`Provides traces`
     - :strong:`Provides logs`

   * - :ref:`Kubernetes <get-started-k8s>`
     - :strong:`X`
     - :strong:`X`
     - :strong:`X`

   * - :ref:`Linux <get-started-linux>`
     - :strong:`X`
     - :strong:`X`
     -

   * - :ref:`Microsoft Windows <get-started-windows>`
     - :strong:`X`
     - :strong:`X`
     -


APM instrumentation
--------------------------------------------

Instrument your applications to send metrics and traces to Splunk Observability Cloud.

.. list-table::
   :header-rows: 1
   :widths: 50 16 16 16
   :width: 100%
   :class: monitor-table

   * - :strong:`Language`
     - :strong:`Provides metrics`
     - :strong:`Provides traces`
     - :strong:`Provides logs`

   * - :new-page:`C++ <https://github.com/signalfx/splunk-otel-cpp>`
     -
     - :strong:`X`
     - 

   * - :ref:`Go <get-started-go>`
     -
     - :strong:`X`
     -

   * - :ref:`Java <get-started-java>`
     - :strong:`X`
     - :strong:`X`
     -

   * - :ref:`Microsoft .NET <microsoft-dotnet>`
     -
     - :strong:`X`
     -

   * - :ref:`Node.js <get-started-nodejs>`
     -
     - :strong:`X`
     -

   * - :ref:`PHP <get-started-php>`
     -
     - :strong:`X`
     -

   * - :ref:`Python <get-started-python>`
     -
     - :strong:`X`
     -

   * - :ref:`Ruby <get-started-ruby>`
     -
     - :strong:`X`
     -


Metric instrumentation
--------------------------------------------

Instrument your applications to send metrics to Infrastructure Monitoring.

- :new-page:`Go <https://github.com/signalfx/signalfx-go>`

- :new-page:`Java <https://github.com/signalfx/signalfx-java>`

- :new-page:`Node.js <https://github.com/signalfx/signalfx-nodejs>`

- :new-page:`Python <https://github.com/signalfx/signalfx-python>`

- :new-page:`Ruby <https://github.com/signalfx/signalfx-ruby>`


RUM instrumentation
--------------------------------------------

Instrument your web and mobile front-end applications to send metrics, web vitals, errors, and other forms of data to Splunk Real User Monitoring.

* :ref:`browser-rum-gdi`
* :ref:`rum-mobile-ios`
* :ref:`rum-mobile-android`

For more information, see :ref:`get-started-rum`.


Application receivers
--------------------------------------------

An application receiver gathers metrics from its associated application and the host the application is running on and sends them to Infrastructure Monitoring.



.. include:: /_includes/application-receiver-table.rst


Community integrations
---------------------------------------------------------------------------------

- Istio
- Jaeger
- Linkerd
- Micrometer
- Prometheus
- Spring Boot
- Telegraf Agent
- Zipkin

For information about these integrations:

#. Log in to Splunk Observability Cloud
#. In the navigation menu, select :menuselection:`Data Management`. 
#. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for the name of the community integration.
#. Select the community integration tile to display its details.


Notification services
--------------------------------------------

These integrations let you send Splunk Observability Cloud alert notifications to the following third-party notification services:

- Amazon EventBridge
- BigPanda
- Jira
- Microsoft Teams
- Opsgenie
- PagerDuty
- ServiceNow
- Slack
- Splunk On-Call
- Webhook
- xMatters

For more information about integrating with notification services, see :ref:`admin-notifs-index`.


Login services
--------------------------------------------

These login service integrations allow your users to single sign-on (SSO) to Splunk Observability Cloud using a third-party identity provider (IdP) that uses SAML SSO or a custom URL that you specify.

- Active Directory FS
- Azure Active Directory
- Google Cloud Identity
- Google Sign-In
- Okta
- OneLogin
- PingOne
- SAML

For more information about configuring an SSO integration, see :ref:`sso-label`.


Data link destinations
--------------------------------------------

Data links let you link metadata to the following destinations outside of Splunk Observability Cloud:

- Splunk Cloud Platform
- Splunk Enterprise
- Kibana

For more information about creating data links, see :ref:`link-metadata-to-content`.


Other integrations
----------------------------------------------------------------------------------------------

- :new-page:`Grafana <https://grafana.com/grafana/plugins/grafana-splunk-monitoring-datasource/>`

- :new-page:`LaunchDarkly <https://docs.launchdarkly.com/integrations/signalfx>`

- :new-page:`Pulumi <https://www.pulumi.com/docs/intro/cloud-providers/signalfx/>`

- :new-page:`Terraform <https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs>`
