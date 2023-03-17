.. _aws-infra-metadata:

**********************************
AWS CloudWatch metadata
**********************************

.. meta::
   :description: List of Splunk Infrastructure Monitoring AWS integration imported AWS metadata.

Infrastructure Monitoring automatically imports AWS metadata for imported AWS CloudWatch metrics. Keep in mind metadata might take up to 15 minutes to arrive.

.. note::
   Observability Cloud creates a new property name by converting the original AWS property name to `snake_case` and adding the prefix `aws_` prefix.
   
   For example, `DBClusterIdentifier` becomes `aws_db_cluster_identifier`.

.. _aws_common_properties:

Common properties
=============================================================================

For all services, the system imports the following common properties:

..  list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 30 60

   *  - :strong:`AWS Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - AccountId
      - aws_account_id
      - The id of your AWS account.

   *  - Region
      - aws_region
      - The region you're importing metadata from. See available :ref:`AWS regions <aws-regions>`.


.. _aws-oc-metrics:

Metadata available per service
=============================================================================

Infrastructure Monitoring imports all metadata available for supported AWS, with a few exceptions and caveats. Select a specific service to see more information:

- :ref:`Amazon API Gateway <apigateway-metadata>` 
- :ref:`AWS Elastic Load Balancing (Application, Classic, and Network) <cloudwatch-elb-metadata>`
- :ref:`AWS Auto Scaling <autoscaling-metadata>` 
- :ref:`AWS CloudFront <cloudfront-metadata>` 
- :ref:`Amazon DocumentDB <docdb-metadata>` 
- :ref:`AWS Direct Connect <dx-metadata>` 
- :ref:`Amazon DynamoDB <dynamodb-metadata>` 
- :ref:`Amazon Elastic Block Store (EBS) <cloudwatch-ebs-metadata>`
- :ref:`Amazon Elastic Compute Cloud (EC2) <cloudwatch-ec2-metadata>`, :ref:`cloudwatch-ec2-optimization-data`, and Amazon Cloudwatch Agent
- :ref:`Amazon EC2 Container Service (ECS) <cloudwatch-ecs-metadata>`
- :ref:`Amazon Elastic File System <efs-metadata>`
- :ref:`Amazon Elastic Kubernetes Service (EKS) <eks-metadata>`
- :ref:`Amazon ElastiCache <elasticache-metadata>`
- :ref:`Amazon Elastic Beanstalk <beanstalk-metadata>`
- :ref:`Amazon Elastic MapReduce <emr-metadata>` 
- :ref:`Amazon ElasticSearch service <elasticsearch-metadata>`
- :ref:`Amazon Kinesis Firehose <firehose-metadata>`
- :ref:`Amazon Kinesis Streams <kinesis-metadata>`
- :ref:`Amazon Kinesis Analytics <kanalytics-metadata>`
- :ref:`AWS Lambda <lambda-metadata>` 
- :ref:`Amazon VPC (NAT Gateway) <natgateway-metadata>` 
- :ref:`Amazon Relational Database Service (RDS) <cloudwatch-rds-metadata>`
- :ref:`Amazon Redshift <redshift-metadata>` 
- :ref:`Amazon Route 53 <route53-metadata>` 
- :ref:`Amazon Simple Storage Service (S3) <s3-metadata>`
- :ref:`Amazon Simple Notification Service (SNS) <sns-metadata>`
- :ref:`Amazon Simple Queue Service (SQS) <sqs-metadata>` 
- :ref:`AWS Step Functions <step-metadata>` 
- :ref:`Amazon VPC VPN <vpc-vpn-metadata>` 
- :ref:`Amazon WorkSpaces <workspaces-metadata>` 

.. _apigateway-metadata:

Amazon API Gateway metadata
-------------------------------------------------------------------

For API Gateway, Infrastructure Monitoring imports the names and tags of every REST API and stage. 

For more information, see the AWS documentation for API Gateway.

..  list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 30 60

   *  - :strong:`API Gateway Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - ApiName
      - aws_rest_api_name
      - The API's name

   *  - Stage
      - aws_stage_name
      - The first path segment in the Uniform Resource Identifier (URI) of a call to API Gateway


.. _cloudwatch-elb-metadata:

AWS Elastic Load Balancing (Classic, Application, and Network) metadata
-----------------------------------------------------------------------------------------------------
For AWS Elastic Load Balancing (ELB), Infrastructure Monitoring scans every load balancer name for your AWS account and imports properties of the load balancer and any tags set on the load balancer.

For more information on these properties, including acceptable values and constraints, see the AWS Documentation for ELB.

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 20 20 60

   *  - :strong:`ELB Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - CreatedTime
      - aws_create_time
      - Load balancer creation timestamp

Note that the custom property name drops the ``d`` in ``aws_create_time``. 

.. _autoscaling-metadata:

AWS Auto Scaling metadata
-------------------------------------------------------------------

For Auto Scaling, Infrastructure Monitoring imports properties of every group as well as all the tags set on the group.

For more information, see the AWS documentation for Auto Scaling.

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 30 60

   *  - :strong:`Auto Scaling Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - CreatedTime
      - aws_creation_time
      - Resource creation time, in the form ``Thu Apr 13 15:59:25 UTC 2017``

   *  - DefaultCoolDown
      - aws_default_cool_down
      - Amount of time, in seconds, after a scaling activity completes before another scaling activity can start

   *  - HealthCheckGracePeriod
      - aws_health_check_grace_period
      - Amount of time, in seconds, that Auto Scaling waits before checking the health status of an EC2 instance that has come into service

   *  - HealthCheckType
      - aws_health_check_type
      - Service to use for the health checks

   *  - LaunchConfigurationName
      - aws_launch_configuration_name
      - Name of the associated launch configuration

   *  - NewInstancesProtectedFromScaleIn
      - aws_new_instances_protected_from_scale_in
      - Indicates whether Auto Scaling protects newly launched instances from termination when scaling in

   *  - PlacementGroup
      - aws_placement_group
      - The name of the placement group into which you launch your instances, if any

   *  - ServiceLinkedRoleARN
      - aws_service_linked_role_arn
      - Amazon Resource Name (ARN) of the service-linked role that the Auto Scaling group uses to call other Amazon services on your behalf

   *  - Stats
      - aws_status
      - Current state of the group when DeleteAuto ScalingGroup is in progress

   *  - VPCZoneIdentifier
      - aws_vpc_zone_identifier
      - One or more subnet IDs, if applicable, separated by commas

   *  - Region
      - aws_region
      - AWS Region to which the Auto Scaling group belongs

The custom property name becomes ``aws_creation_time`` instead of ``aws_created_time``.

.. _cloudfront-metadata:

AWS CloudFront metadata
-------------------------------------------------------------------

For CloudFront, Infrastructure Monitoring scans every distribution for your AWS account and imports the properties of each distribution and all the tags set on the distribution.

For more information on these properties, including acceptable values and constraints, see the AWS documentation for AWS CloudFront.

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 30 60

   *  -  :strong:`CloudFront Name`
      -  :strong:`Custom Property`
      -  :strong:`Description`

   *  -  Id
      -  aws_distribution_id
      -  The identifier for the distribution, for example ``EDFDVBD632BHDS5``.

   *  -  DomainName
      -  aws_domain_name
      -  The domain name corresponding to the distribution, for example ``d111111abcdef8.cloudfront.net``.


.. _docdb-metadata:

Amazon DocumentDB metadata
-------------------------------------------------------------------

For DocumentDB, Infrastructure Monitoring scans every AWS/DocDB cluster and AWS/DocDB cluster instance for your AWS account, and imports properties and tags on each instance. The system excludes ``DBSubnetGroup`` from the properties list, because the amount of AWS/DocDB properties exceeds the amount of properties that the system can keep.

For more information on these properties, including acceptable values and constraints, see the AWS documentation for Amazon DocumentDB.

.. _dx-metadata:

AWS Direct Connect metadata
-------------------------------------------------------------------

For Direct Connect (DX), Infrastructure Monitoring scans every Direct Connect instance for your AWS account and imports properties of each instance and any tags set on each instance. 

For more information, including acceptable values and constraints, see the AWS documentation for the Direct Connect API.

.. _dynamodb-metadata:

Amazon DynamoDB metadata
-------------------------------------------------------------------

For DynamoDB, Infrastructure Monitoring scans every table in your AWS account and imports properties of the table and any tags set for the table. 

For more information on these properties, including acceptable values and constraints, see the AWS documentation for DynamoDB.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  -  :strong:`DynamoDB Name`
      -  :strong:`Custom Property`
      -  :strong:`Description`

   *  -  ProvisionedThroughputDescription.ReadCapacityUnits
      -  aws_read_capacity_units
      -  Maximum number of strongly consistent reads consumed per second before DynamoDB returns a ThrottlingException

   *  -  ProvisionedThroughputDescription.WriteCapacityUnits
      -  aws_write_capacity_units
      -  Maximum number of writes consumed per second before DynamoDB returns a ThrottlingException

   *  -  TableName
      -  aws_table_name
      -  Name of the DynamoDB table

   *  -  TableStatus
      -  aws_table_status
      -  Current state of the table

.. _cloudwatch-ebs-metadata:

Amazon Elastic Block Store (EBS) metadata
-------------------------------------------------------------------

For EBS, Infrastructure Monitoring scans every volume ID from your AWS account and imports properties of the volume and any tags set on the volume.

For more information on these properties, including acceptable values and constraints, see the AWS documentation for EBS.

.. list-table::
   :header-rows: 1
   :widths: 20 20 60
   :width: 100%

   *  - :strong:`EBS Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - attachment_state
      - aws_attachment_state
      - The attachment state of the volume

   *  - availability-zone
      - aws_availability_zone
      - The Availability Zone in which EBS created the volume

   *  - create-time
      - aws_create_time
      - Date and time that EBS created the volume

   *  - delete_on_termination
      - aws_delete_on_termination
      - Whether or not EBS deletes a volume if something terminates the instance to which it's attached

   *  - encrypted
      - aws_encrypted
      - The encryption status of the volume

   *  - instance_id
      - aws_instance_id
      - ID of the instance to which the volume is attached. This property is propagated only if the volume is attached to an instance

   *  - iops
      - aws_iops
      - The number of I/O operations per second (IOPS) that the volume supports

   *  - kms_key_id
      - aws_kms_key_id
      - The full ARN of the AWS customer master key used to protect the volume encryption key for the volume

   *  - size
      - aws_size
      - The size of the volume, in GiB

   *  - snapshot_id
      - aws_snapshot_id
      - The snapshot from which the volume was created

   *  - state
      - aws_state
      - The status of the volume

   *  - volume_id
      - aws_volume_id
      - The volume ID

   *  - volume_type
      - aws_volume_type
      - The Amazon EBS volume type

.. _cloudwatch-ec2-metadata:

Amazon Elastic Compute Cloud (EC2) metadata
-------------------------------------------------------------------

For EC2, Infrastructure Monitoring scans every instance ID in your AWS account and imports properties of the instance and any tags set on the instance. Any property named ``Host`` or ``InstanceId`` in Infrastructure Monitoring that has the value of the instance ID, private DNS name, or private IP address gets the same tags and properties of the instance ID. Each instance property is prefixed with ``aws\_``. 

For more information on these properties, including acceptable values and constraints, see the Amazon documentation for EC2 metadata.

.. list-table::
   :header-rows: 1
   :widths: 25 25 50
   :width: 100%

   *  -  :strong:`EC2 Name`
      -  :strong:`Custom Property`
      -  :strong:`Description`

   *  - architecture
      - aws_architecture
      - Instance architecture (i386 or x86_64)

   *  - availability-zone
      - aws_availability_zone
      - The availability zone of the instance

   *  - dns-name
      - aws_public_dns_name
      - Public DNS name of the instance

   *  - hypervisor
      - aws_hypervisor
      - Hypervisor type of the instance (ovm or xen)

   *  - image-id
      - aws_image_id
      - ID of the image used to launch the instance

   *  - instance-id
      - aws_instance_id
      - ID of the instance

   *  - instance-state-name
      - aws_state
      - An object defining the state code and name of the instance

   *  - instance-type
      - aws_instance_type
      - Type of the instance

   *  - ip-address
      - aws_public_ip_address
      - The address of the Elastic IP address bound to the network interface

   *  - kernel-id
      - aws_kernel_id
      - Kernel ID

   *  - launch-time
      - aws_launch_time
      - The time when the instance was launched

   *  - private-dns-name
      - aws_private_dns_name
      - Private DNS name of the instance

   *  - reason
      - aws_state_reason
      - The state reason for the instance (if provided)

   *  - region
      - aws_region
      - The region in which the instance is running

   *  - reservation-id
      - aws_reservation_id
      - ID of the instance's reservation

   *  - root-device-type
      - aws_root_device_type
      - Type of root device that the instance uses


.. _cloudwatch-ec2-optimization-data:

Amazon EC2 metadata for AWS Optimizer
-------------------------------------------------------------------

Infrastructure Monitoring AWS Optimizer helps you find cost-saving opportunities and underutilized investments in EC2. AWS Optimizer shows you usage patterns and cost attribution by InstanceType, AWS Region, and AWS Availability Zone. AWS Optimizer also shows you categories specific to your setup, such as Service, Team, and all other dimensions that come from EC2 instance tags.

AWS Optimizer generates metrics from usage and cost data imported by calls to the AWS API. These generated metrics let you visualize and analyze EC2 usage and costs, as shown in built-in dashboards. You can also create detectors based on AWS Optimizer metrics. These detectors send real-time alerts for unexpected changes in cost or usage patterns.

* To learn more about visualizing and analyzing the metrics, see :ref:`built-in-dashboards`.
* To learn more about creating detectors, see :ref:`create-detectors`.

To import the usage and cost data, make sure the following lines are in your AWS Policy Document. To learn how to view and modify your AWS Policy Document, see :ref:`get-started-aws`:

.. code-block:: none

   "ec2:DescribeInstances",
   "ec2:DescribeInstanceStatus",
   "ec2:DescribeTags",
   "ec2:DescribeReservedInstances",
   "ec2:DescribeReservedInstancesModifications",
   "organizations:DescribeOrganization",


Notes on using AWS Optimizer:

* AWS Optimizer is only available in Splunk Observability Cloud Enterprise Edition.
* The imported data does not include AWS billing data.
* Infrastructure Monitoring doesn't import data or generate metrics for EC2 Spot Instances.
* If you have multiple AWS accounts, you need to add a Infrastructure Monitoring AWS integration for each account, and each integration must have :strong:`Import data for AWS Optimizer` selected. If you don't set this option, your generated metrics might contain inaccurate values.

.. _cloudwatch-ecs-metadata:

Amazon EC2 Container Service (ECS) metadata
-------------------------------------------------------------------

For ECS, Infrastructure Monitoring scans every cluster and service for your AWS account and imports their properties as well as any tags set on the cluster or service.

For more information, see the AWS documentation for ECS.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  - :strong:`ECS Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - ClusterName
      - aws_cluster_name
      - A user-generated string that you use to identify your cluster.

   *  - ServiceName
      - aws_service_name
      - The name of your service.

.. _efs-metadata:

Amazon Elastic File System metadata
-------------------------------------------------------------------

For Amazon Elastic File System (Amazon EFS), Infrastructure Monitoring scans every volume ID from your AWS account and imports all tags set on the volume. Observability Cloud doesn't import any properties.

For more information, including acceptable values and constraints, see the AWS documentation for EFS.

.. _eks-metadata:

Amazon Elastic Kubernetes System (EKS) metadata
-------------------------------------------------------------------

For EKS, Infrastructure Monitoring imports properties and tags on each instance, except for clusters' ``CertificateAuthorityData``.

For more information, including acceptable values and constraints, see the AWS documentation for EKS.

.. _elasticache-metadata:

Amazon ElastiCache metadata
-------------------------------------------------------------------

For ElastiCache, Infrastructure Monitoring scans every cluster and node for your AWS account and imports their properties as well as any tags set on the cluster or node.

For more information about these properties, including acceptable values and constraints, see the AWS CacheCluster and AWS CacheNode documentation.

.. list-table::
   :header-rows: 1
   :width: 100%

   *  -  :strong:`ElastiCache Name`
      -  :strong:`Custom Property`
      -  :strong:`Description`
      -  :strong:`Applies to`

   *  -  ReplicationGroupId
      -  aws_replication_group_id
      -  The replication group to which this cluster belongs. If this field is empty, the cluster is not associated with any
         replication group.
      -  Cluster metrics that are part of a replication group

   *  -  CacheClusterCreateTime
      -  aws_cache_cluster_create_time
      -  The date and time when the cluster was created
      -  Cluster and node

   *  -  Engine
      -  aws_engine
      -  The name of the cache engine used by this cluster
      -  Cluster and node

   *  -  EngineVersion
      -  aws_engine_version
      -  The version of the cache engine by this cluster
      -  Cluster and node

   *  -  CustomerAvailabilityZone
      -  aws_availability_zone
      -  The AWS Availability Zone where this node was created and now resides
      -  Node only

   *  -  CacheNodeCreateTime
      -  aws_cache_node_create_time
      -  The date and time when the cache node was created
      -  Node only

   *  -  n/a
      -  aws_cache_cluster_name
      -  Either the value of ``aws_replication_group_id`` (if applicable) or the value of the dimension ``CacheClusterId``
      -  Cluster and node


CacheClusterId is a dimension that is already in the ElastiCache metric time series (MTS) that Infrastructure Monitoring imports from AWS Cloudwatch.

.. _beanstalk-metadata:

Amazon Elastic Beanstalk metadata
-------------------------------------------------------------------

For Elastic Beanstalk, Infrastructure Monitoring imports properties and tags. 

For more information, including acceptable values and constraints, see the AWS documentation for Elastic Beanstalk.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  -  :strong:`Elastic Beanstalk Name`
      -  :strong:`Custom Property`
      -  :strong:`Description`

   *  -  ApplicationName
      -  aws_application_name
      -  The name of the application associated with this environment

   *  -  SolutionStackName
      -  aws_solution_stack_name
      -  The name of the SolutionStack deployed with this environment

   *  -  TemplateName
      -  aws_template_name
      -  The name of the configuration template used to originally launch this environment

   *  -  Status
      -  aws_status
      -  The current operational status of the environment. 

         Possible values are:
         
         * Aborting: The environment is aborting a deployment
         * Launching: The environment is in the process of initial deployment
         * LinkingFrom: The environment is linked to by another environment. See Environment links for details
         * LinkingTo: The environment is in the process of linking to another environment. See Environment links for details
         * Updating: The environment is updating its configuration settings or application version
         * Ready: The environment is available to have an action performed on it, such as update or terminate
         * Terminating: The environment is shutting down
         * Terminated: The environment is not running

   *  -  VersionLabel
      -  aws_version_label
      -  The application version deployed in this environment


.. _emr-metadata:

Amazon Elastic MapReduce (EMR) metadata
-------------------------------------------------------------------

For EMR, Infrastructure Monitoring scans the properties of every cluster as well as any tags set on each cluster.

For more information on these properties, including acceptable values and constraints, see the AWS documentation for the DescribeCluster API.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  - :strong:`EMR Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - Id
      - aws_cluster_id
      - AWS identifier of the cluster

   *  - Name
      - aws_cluster_name
      - The name you gave the cluster

   *  - AutoScalingRole
      - aws_auto_scaling_role
      - An Amazon Identity and Access Management (IAM) role for automatic scaling policies

   *  - CustomAmiId
      - aws_custom_ami_id
      - The ID of a custom Amazon EBS-backed Linux Amazon Machine Image (AMI) if the cluster uses a custom AMI

   *  - InstanceCollectionType
      - aws_instance_collection_type
      - The instance group configuration of the cluster

   *  - LogUri
      - aws_log_uri
      - The path to the Amazon S3 location where logs for this cluster are stored

   *  - MasterPublicDnsName
      - aws_master_public_dns_name
      - The DNS name of the master node

   *  - ReleaseLabel
      - aws_release_label
      - The Amazon EMR release label, which determines the version of open-source application packages installed on the cluster

   *  - RepoUpgradeOnBoot
      - aws_repo_upgrade_on_boot
      - Applies only when CustomAmiID is used

   *  - RequestedAmiVersion
      - aws_requested_ami_version
      - The AMI version requested for this cluster

   *  - RunningAmiVersion
      - aws_running_ami_version
      - The AMI version running on this cluster

   *  - ScaleDownBehavior
      - aws_scale_down_behavior
      - The way that individual Amazon EC2 instances terminate when an automatic scale-in activity occurs or an instance group is resized

   *  - SecurityConfiguration
      - aws_security_configuration
      - The name of the security configuration applied to the cluster

   *  - ServiceRole
      - aws_service_role
      - The IAM role that the Amazon EMR service uses to access AWS resources on your behalf

   *  - Status
      - aws_status
      - The current status details about the cluster

   *  - AutoTerminate
      - aws_auto_terminate
      - Specifies whether the cluster terminates after completing all steps

   *  - TerminationProtected
      - aws_termination_protected
      - Indicates whether Amazon EMR locks the cluster to prevent the EC2 instances from being terminated by an API call or user intervention, or in the event of a cluster error

   *  - VisibleToAllUsers
      - aws_visible_to_all_users
      - Indicates whether the cluster is visible to all IAM users of the AWS account associated with the cluster

   *  - NormalizedInstanceHours
      - aws_normalized_instance_hours
      - An approximation of the cost of the cluster, represented in m1.small/hours

.. _elasticsearch-metadata:

Amazon Elasticsearch Service metadata
-------------------------------------------------------------------

For Elasticsearch, Infrastructure Monitoring scans every domain from your AWS account and imports the version and any tags set on the domain.

For more information, see the documentation for AWS Elasticsearch

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  -  :strong:`Elasticsearch Name`
      -  :strong:`Custom Property`
      -  :strong:`Description`

   *  -  ElasticsearchVersion
      -  aws_es_version
      -  The Elasticsearch version, for example ``7.1``.


.. _firehose-metadata:

Amazon Kinesis Firehose metadata
-------------------------------------------------------------------

Infrastructure Monitoring imports Kinesis Firehose's tags. See the AWS documentation.

.. _kinesis-metadata:

Amazon Kinesis Streams metadata
-------------------------------------------------------------------

For Kinesis Streams, Infrastructure Monitoring scans the properties of every stream as well as any tags set on each stream. If shard-level metrics are enabled in AWS, properties and tags are also applied to Kinesis shards for their respective parent streams. 

For more information, see the AWS documentation for the StreamDescription API.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  - :strong:`Kinesis Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - StreamName
      - aws_stream_name
      - The name of the stream

   *  - StreamStatus
      - aws_stream_status
      - The server-side encryption type used on the stream

   *  - RetentionPeriodHours
      - aws_retention_period_hours
      - The current retention period, in hours

.. _kanalytics-metadata:

Amazon Kinesis Analytics metadata
-------------------------------------------------------------------

Infrastructure Monitoring imports Kinesis Analytics' properties and tags, except for ``ApplicationConfiguration``. 

For more information, see the AWS documentation.

.. _lambda-metadata:

AWS Lambda metadata
-------------------------------------------------------------------

For AWS Lambda, Infrastructure Monitoring scans every version of every function associated with your AWS
account and imports properties of the function version and any tags set on the function. Infrastructure Monitoring also imports the ``lambda_arn`` dimension, which is the qualified ARN for an AWS Lambda function.

For more information on these properties, including acceptable values and constraints, see the AWS Lambda documentation for API function configuration.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  - :strong:`AWS Lambda Filter Name`
      - :strong:`Custom Property`
      - :strong:`Description`


   *  - CodeSha256
      - aws_function_code_sha256
      - SHA256 hash of your function deployment package

   *  - CodeSize
      - aws_function_code_size
      - The size of the .zip file you uploaded for the function, in bytes

   *  - FunctionName
      - aws_function_name
      - Function name

   *  - MemorySize
      - aws_function_memory_size
      - Memory size you configured for the function, in MB

   *  - Runtime
      - aws_function_runtime
      - Runtime environment for the function

   *  - Timeout
      - aws_function_timeout
      - The function execution time at which AWS Lambda needs to terminate the function

   *  - Version
      - aws_function_version
      - The function version

   *  - VpcConfig.vpcId
      - aws_function_vpc_id
      - The Amazon Virtual Private Cloud (VPC) ID associated with your function


.. _natgateway-metadata:

Amazon VPC (NAT Gateway) metadata
-------------------------------------------------------------------

Infrastructure Monitoring imports all Amazon VPC Network Address Translation (NAT) gateway properties and tags.

For more information on these properties, including acceptable values and constraints, see the AWS documentation.

.. _cloudwatch-rds-metadata:

Amazon Relational Database Service (RDS) metadata
-------------------------------------------------------------------

For RDS, Infrastructure Monitoring scans every database instance for your AWS account and imports properties of each instance and any tags set on each instance. 

For more information, including acceptable values and constraints, see the AWS documentation for the DBCluster API.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  - :strong:`RDS Name`
      - :Strong:`Custom Property`
      - :Strong:`Description`

   *  - AvailabilityZone
      - aws_availability_zone
      - Name of the DB instance Availability Zone

   *  - DBClusterIdentifier
      - aws_db_cluster_identifier
      - If the DB instance is a member of a DB cluster, contains the name of the DB cluster

   *  - DBInstanceClass
      - aws_db_instance_class
      - Name of the compute and memory capacity class of the DB instance

   *  - DBInstanceStatus
      - aws_db_instance_status
      - Current state of the DB instance

   *  - Engine
      - aws_engine
      - Name of the database engine this DB instance uses

   *  - EngineVersion
      - aws_engine_version
      - Database engine version.

   *  - InstanceCreateTime
      - aws_instance_create_time
      - DB instance creation date and time

   *  - Iops
      - aws_iops
      - New Provisioned input/output operations per second (IOPS) value for the DB instance. AWS might apply this value in the future, or might be applying it at the moment.

   *  - MultiAZ
      - aws_multi_az
      - Indicates if the DB instance is a Multi-AZ deployment

   *  - PubliclyAccessible
      - aws_publicly_accessible
      - Accessibility options for the DB instance. ``"true"`` indicates an internet-facing instance with a publicly resolvable DNS name that resolves to a public IP address. ``"false"`` indicates an internal instance with a DNS name that resolves to a private IP address.

   *  - ReadReplicaSourceDBInstanceIdentifier
      - aws_read_replica_source_db_instance_identifier
      - If the DB instance is a Read Replica, this value is the identifier of the source DB instance.

   *  - SecondaryAvailabilityZone
      - aws_second_availability_zone
      - If this property is present, and the DB instance has multi-AZ support, this value specifies the name of the secondary Availability Zone.

   *  - StorageType
      - aws_storage_type
      - Storage type associated with the DB instance

.. _redshift-metadata:

Amazon Redshift metadata
-------------------------------------------------------------------

For RedShift, Infrastructure Monitoring scans every cluster for your AWS account and imports properties of the cluster and any tags set on the cluster.

For more information, including acceptable values and constraints, see the AWS documentation for the RedShift Cluster API.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  - :strong:`Redshift Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - ClusterIdentifier
      - aws_cluster_identifier
      - The unique identifier of the cluster

   *  - AvailabilityZone
      - aws_availability_zone
      - Name of the Availability Zone in which the cluster is located

   *  - ClusterCreateTime
      - aws_cluster_create_time
      - Creation date and time for the cluster

   *  - ClusterStatus
      - aws_cluster_status
      - The current state of the cluster

   *  - ClusterRevisionNumber
      - aws_cluster_revision_number
      - Revision number of the database in the cluster.

   *  - ClusterVersion
      - aws_cluster_version
      - Version ID of the Amazon Redshift engine that is running in the cluster

   *  - NodeType
      - aws_cluster_node_type
      - The node type for the nodes in the cluster

   *  - DBName
      - aws_cluster_db_name
      - Name of the initial database created when the cluster was created

   *  - Encrypted
      - aws_cluster_encrypted
      - Boolean. If ``true``, indicates that data in the cluster is encrypted at rest.

   *  - MasterUsername
      - aws_cluster_master_username
      - Master username for the cluster. This is the name used to connect to the database specified in the DBName parameter.

   *  - PubliclyAccessible
      - aws_cluster_publicly_accessible
      - Boolean. If ``true``, indicates that the cluster can be accessed from a public network.

.. _route53-metadata:

Amazon Route 53 metadata
-------------------------------------------------------------------

Infrastructure Monitoring imports Route 53's :ref:`common properties <aws_common_properties>` and tags. 

For more information, see the AWS documentation.

.. _s3-metadata:
.. _s3:

Amazon Simple Storage Service (S3) metadata
-------------------------------------------------------------------

For S3, Infrastructure Monitoring imports the region in which the bucket resides, as well as any tags set on buckets. Infrastructure Monitoring only imports metadata for non-empty buckets. By default, Infrastructure Monitoring only receives the daily storage metrics listed on the Amazon S3 console page. Amazon bills you separately for the request metrics shown on that page, so you must explicitly select to import them. 

For more information on S3 bucket tags, see the documentation for AWS S3 Cost Allocation tagging.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  - :strong:`S3 Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - Region
      - aws_region
      - The region in which the S3 bucket resides

.. _sns-metadata:

Amazon Simple Notification Service (SNS) metadata
-------------------------------------------------------------------

Infrastructure Monitoring imports SNS tags only. See the AWS documentation.

.. _sqs-metadata:

Amazon SQS metadata
-------------------------------------------------------------------

For Amazon Simple Queue Service (SQS), Infrastructure Monitoring imports properties of every queue as well as any tags set on the queue.

For more information on these properties, including acceptable values and constraints, see the AWS developer documentation for SQS.

.. list-table::
   :header-rows: 1
   :widths: 30 30 60
   :width: 100%

   *  - :strong:`SQS Name`
      - :strong:`Custom Property`
      - :strong:`Description`

   *  - QueueArn
      - aws_queue_arn
      - AWS resource name of the SQS queue

   *  - QueueURL
      - aws_queue_url
      - URL for the SQS queue

   *  - MaximumMessageSize
      - aws_maximum_message_size
      - Maximum size of a message that SQS accepts, in bytes. SQS rejects a message that is larger than this value.

   *  - CreateTimestamp
      - aws_created_timestamp
      - Creation timestamp for the SQS queue

   *  - VisibilityTimeout
      - aws_visibility_timeout
      - Visibility timeout for the queue

   *  - FifoQueue
      - aws_fifo_queue
      - Indicates whether the queue is a fifo queue

   *  - Region
      - aws_region
      - The region in which the SQS resides

.. _step-metadata:

AWS Step Functions metadata
-------------------------------------------------------------------

For Step Functions, Infrastructure Monitoring scans every state machine for your AWS account and imports all instances' properties, and any tags set on each instance. 

For more information, including acceptable values and constraints, see the AWS documentation for the State Machine.

.. _vpc-vpn-metadata:

Amazon VPC VPN metadata
-------------------------------------------------------------------

Infrastructure Monitoring imports the :ref:`common properties <aws_common_properties>` and tags of Amazon VPC Virtual Private Network (VPN).

For more information, see the AWS documentation.

.. _workspaces-metadata:

Amazon WorkSpaces metadata
-------------------------------------------------------------------

For WorkSpaces, Infrastructure Monitoring scans every WorkSpace instance for your AWS account and imports all instances' properties, and any tags set on each instance. 

For more information, including acceptable values and constraints, see the AWS documentation for the WorkSpaces API.