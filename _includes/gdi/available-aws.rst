You can collect data from the following AWS services:

.. list-table::
  :header-rows: 1
  :widths: 30 30 10 10 10 10
  :width: 100%
  :class: monitor-table

  * - :strong:`Namespace`
    - :strong:`Service`
    - :strong:`Provides metrics`
    - :strong:`Provides traces`
    - :strong:`Provides logs`
    - :strong:`Provides metadata (tags/properties) (4)`

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

  * - AWS/Cassandra
    - Amazon Keyspaces
    - :strong:`X`
    - 
    - 
    - :strong:`X`

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
    - :strong:`X` (5)
    - :strong:`X` (5)
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

  * - AWS/ElasticInference
    - Amazon Elastic Inference
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

  * - AWS/GatewayELB
    - Elastic Load Balancing (Gateway Load Balancers)
    - :strong:`X`
    - 
    - 
    - :strong:`X`

  * - AWS/GlobalAccelerator 
    - AWS Global Accelerator
    - :strong:`X`
    - 
    - 
    - :strong:`X`

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
    - :strong:`X`

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

  * - AWS/MWAA (component metrics)
    - Amazon Managed Workflows for Apache Airflow
    - :strong:`X`
    - 
    -
    - :strong:`X`

  * - AmazonMWAA (environment metrics)
    - Amazon Managed Workflows for Apache Airflow
    - :strong:`X`
    - 
    -
    - :strong:`X`

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
    - :strong:`X`

  * - AWS/NetworkELB
    - AWS Elastic Load Balancing (Network Load Balancers)
    - :strong:`X`
    - 
    - :strong:`X`
    - :strong:`X`

  * - AWS/NetworkFirewall
    - AWS Network Firewall 
    - :strong:`X`
    - 
    - 
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
#. Metadata in this context refers to AWS tags and properties
#. Collected by the :ref:`Splunk Distribution of the Collector for Kubernetes <collector-kubernetes-intro>`