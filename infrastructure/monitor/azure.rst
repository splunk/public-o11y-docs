.. _infrastructure-azure:

**********************************
Monitor Azure
**********************************

.. meta::
   :description: Learn how to monitor Microsoft Azure infrastructure resources with Splunk Observability Cloud.

.. note::
   Before you can start monitoring any Microsoft Azure resources, :ref:`get-started-azure`, and log in with your administrator credentials.

Splunk Observability Cloud can automatically import metrics and metadata about your services from Microsoft Azure. Observability Cloud provides infrastructure monitoring capabilities powered by Azure Monitor. See :new-page:`https://docs.microsoft.com/en-us/azure/azure-monitor/overview <https://docs.microsoft.com/en-us/azure/azure-monitor/overview>` on the Microsoft site for more information.

You can also export and monitor data from sources running in your Azure environment, as described in the following table.

.. list-table::
   :header-rows: 1
   :widths: 30, 20, 50

   * - :strong:`Get data in`
     - :strong:`Monitor`
     - :strong:`Description`

   * - :ref:`get-started-k8s`
     - :ref:`infrastructure-k8s`
     - Collect metrics and logs from Kubernetes clusters running in Azure Kubernetes Service.

   * - - :ref:`get-started-linux`
       - :ref:`get-started-windows`
     - :ref:`infrastructure-hosts`
     - Collect metrics and logs from Linux and Windows hosts running in Virtual Machine instances.

   * - :ref:`get-started-application`
     - :ref:`get-started-apm`
     - Collect application metrics and spans running in hosts or Kubernetes clusters.

.. _monitor-azure-services:

Monitor Azure services and identify problems
=======================================================

View the health of Azure services at a glance from the Infrastructure page. This page provides a key metric for each service. You can also drill down into specific instances of an Azure service. For example, view key metrics for the Virtual Machines service, and filter for a specific ID to analyze a particular virtual machine instance.

Follow these steps to analyze problem Azure services from the Infrastructure page:

1. Select :strong:`Navigation menu > Infrastructure` and view the :strong:`Microsoft Azure` category.
2. Select the specific service you want to analyze. For example, select :strong:`Virtual Machines` to view metrics of a virtual machine. If you see “No Data Found,” you need to first configure an integration.
3. Compare instances of the service along the following metrics with the :strong:`Color by` drop-down list. In the heat map, colors represent the health of instances based on the metrics you select. For example, a heat map that shows green and red, uses green to denote healthy and red to denote unhealthy instances. If your heat map has multiple colors, then the lighter gradient represents less activity, and the darker gradient represents more activity. 

   You can color by metrics like CPU utilization and filter by dimensions like geographic region.
4. Group instances based on metadata about each instance with the :strong:`Group by` drop-down list.

   You can group instances according to the region or resource group they are running in or the environment tag. Use this to see correlations between different parts of your infrastructure and its performance.
5.  Find outliers for your metrics with the :strong:`Find Outliers` setting. Specify the :strong:`Scope` and :strong:`Strategy`.

    Set the :strong:`Scope` to analyze outliers from across the entire visible population of instances, or only within groups defined by the dimension or property you grouped instances by.

    You can select one of two :strong:`Strategies` to find outliers, as described in the following table.

    .. list-table::
       :header-rows: 1
       :widths: 30, 70

       * - :strong:`Strategy`
         - :strong:`Description`

       * - ``Deviation from Mean``
         - Instances appear as red that exceed the mean value of the metric by at least three standard deviations. Use this setting to find the most extreme outliers.

       * - ``Deviation from Median``
         - Instances appear as red that exceed the median absolute deviation value by at least three absolute deviations. This setting does not weigh extreme outliers as heavily as the standard deviation.

6. Select a specific instance you want to investigate further to view all the metadata and key metrics for the instance. For every instance, Observability Cloud provides a default dashboard.

   Analyze all the available metadata about the cloud service the instance is running in, the instance itself, and any custom tags associated with the instance. The default dashboard provides metric time series (MTS) for key metrics.

Use default dashboards to monitor Azure services
================================================

Observability Cloud provides default dashboards for supported Azure services. Default dashboards are available in dashboard groups based on the Azure service a dashboard represents data for.

To find default dashboards for Azure services, select :strong:`Navigation menu > Dashboards` and search for the Azure service you want to view dashboards for.

Explore built-in content
========================
Observability Cloud collects data from many cloud services. To see all of the navigators provided for data collected in your organization, go to the Infrastructure page. To see all the pre-built dashboards for data collected in your organization, select :strong:`Dashboards > Built-in`.

.. note::

  Azure Virtual Machines instances are powered by their respective public cloud service as well as the Splunk Distribution of OpenTelemetry Collector. You need both for all the charts to display data in the built-in dashboards.

  - If you have only the public cloud service and the Smart Agent configured, some charts in the built-in dashboards for Azure Virtual Machines instances display no data.
  - If you have only the public cloud service configured, you can see all the cards representing the services where data come from, but some charts in the built-in dashboards for Azure Virtual Machines instances display no data.
  - If you have only Smart Agent configured, Azure Virtual Machines instance navigator isn't available.

Identify Azure resources using metadata
================================================================================

Regardless of the mechanism by which you collect and send your metrics,
you can also use the Azure metadata that Observability Cloud imports.
This feature is available for the relevant Azure Services as well as
metrics collected by the collectd agent.

Azure metadata helps you analyze metrics by custom tags, region, host names,
and other dimensions.

The azure_resource_id dimension
--------------------------------------------------------------------------------

The Azure integration adds the ``azure_resource_id`` dimension to metrics received from Azure.
The dimension value is derived from Azure's ``resource_id`` for the resource and has the following syntax:

``<subscription_id>/<resource_group_name>/<resource_provider_namespace>/<resource_name>``

The Azure integration truncates the dimension value to 256 bytes, which is the maximum length of an Observability Cloud dimension value.

If you install collectd on an Azure Compute Virtual Machine instance using the
:new-page:`standard install script <https://github.com/signalfx/signalfx-collectd-installer>`,
the installation automatically adds the ``azure_resource_id``.

Azure integration generic dimensions
--------------------------------------------------------------------------------

The metric time series (MTS) associated with Azure metrics have the following generic dimensions.
These dimensions are common to all services.

.. list-table::
   :header-rows: 1

   * - :strong:`Dimension name`
     - :strong:`Description`

   * - ``azure_resource_id``
     - Unique identifier for the Azure object

   * - ``resource_group_id``
     - ID of the resource group the Azure object belongs to

   * - ``subscription_id``
     - ID of the subscription the resource belongs to

   * - ``resource_type``
     - Type of the Azure object

   * - ``aggregation_type``
     - The Azure aggregation type of the metric

   * - ``primary_aggregation_type``
     - Indicates whether or not the aggregation type is the primary type

   * - ``unit``
     - Unit of the metric value

|br|

``resource_group_id`` is derived from the Azure resource group id with the
following syntax:

``<subscription_id>/<resource_group_name>``

Some Azure services include dimensions that Observability Cloud adds to MTS.
For example, the metrics from :strong:`Azure Storage` provider include the
dimensions ``apiname`` and ``geotype``.

Azure integration resource metadata
--------------------------------------------------------------------------------

The Azure integration queries the Azure API to retrieve metadata for monitored resources.
You can filter and group MTS by this metadata in charts and in the Infrastructure Navigator.

The Azure integration adds the metadata as custom properties of a specific Azure MTS dimension, as follows:

- Metadata for services in a subscription is added as custom properties of the ``subscription_id`` dimension. To learn more, see :ref:`sub-metadata`.

- Metadata for services within a resource group is added as custom properties of the ``resource_group_id`` dimension. To learn more, see :ref:`resource-metadata`.

- Metadata that are service-specific is added as properties of the ``azure_resource_id`` dimension. To learn more, see :ref:`service-metadata`.

- Tags on all resources are added to the ``azure_resource_id`` dimension. To learn more, see :ref:`resource-tags`.

.. _sub-metadata:

Subscription metadata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following table shows the metadata that the Azure integration syncs for services in a subscription:

.. list-table::
   :header-rows: 1

   * - :strong:`Azure name`
     - :strong:`Custom property`
     - :strong:`Description`

   * - ``displayName``
     - ``azure_subscription_display_name``
     - The display name of the subscription. For example, ``Pay-As-You-Go``

   * - ``state``
     - ``azure_subscription_state``
     - State of the subscription. For example, ``Enabled``


.. _resource-metadata:

Resource-group metadata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following table shows the metadata that the Azure integration syncs for services in a resource group:

.. list-table::
   :header-rows: 1

   * - :strong:`Azure name`
     - :strong:`Custom property`
     - :strong:`Description`

   * - ``name``
     - ``azure_resource_group_name``
     - Name of the resource group

   * - ``provisioningState``
     - ``azure_resource_group_provisioning_state``
     - Provisioning state of the resource group. For example, ``Succeeded``

   * - ``region``
     - ``azure_resource_group_region``
     - Region to which the resource group belongs. For example, ``eastus``

   * - Tags
     - ``azure_resource_group_tag<name-of-tag>``, if resource group has user-defined tags
     - All resource group wide tags

.. _resource-tags:

Azure tags for resource groups
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Azure tags for resource groups are a list of key:value pairs, and from them the Azure integration creates
Observability Cloud tags that have the syntax ``azure_resource_group_tag<name-of-tag>``.
For example, if Azure has ``[key1:label01, key2:label02]`` as the tags property for a resource group, the Azure integration
creates two tags: ``azure_resource_group_tag_key1`` and ``azure_resource_group_tag_key2``.

.. _service-metadata:

Service-level metadata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following tables shows the metadata that the Azure integration syncs for individual services:

.. _autoscale-settings-service-metadata:

**Autoscale settings**

For autoscale settings, Observability Cloud syncs the following properties:

.. list-table::
   :header-rows: 1

   * - :strong:`Azure name`
     - :strong:`Custom property`
     - :strong:`Description`

   * - ``autoscaleEnabled``
     - ``azure_autoscale_enabled``
     - Indicates whether automatic scaling is enabled
   * - ``targetResourceId``
     - ``azure_target_resource_id``
     - Resource identifier of the resource that the autoscale settings are added to
   * - ``regionName``
     - ``azure_region``
     - Name of the region the resource is in. For example, ``Central US``
   * - ``state``
     - ``azure_state``
     - State of the app. For example, ``Running``
     

|br| 


.. _batch-accounts-service-metadata:

**Batch accounts**

For batch accounts, Observability Cloud syncs the following properties:

.. list-table::
   :header-rows: 1

   * -   :strong:`Azure name`
     -   :strong:`Custom property`
     -   :strong:`Description`

   * -   ``activeJobAndJobScheduleQuota``
     -   ``azure_active_job_and_job_schedule_quota``
     -   Active job and job schedule quota for this batch account

   * -   ``coreQuota``
     -   ``azure_core_quota``
     -   Core quota for the batch account

   * -   ``poolQuota``
     -   ``azure_pool_quota``
     -   Pool quota for the batch account

   * -   ``provisioningState``
     -   ``azure_provisioning_state``
     -   Provisioning state of the batch account. For example, ``Succeeded``

   * -   ``regionName``
     -   ``azure_region``
     -   Name of the region the resource is in. For example, ``Central US``

|br| 

.. _function-apps-web-apps-service-metadata:

**Function apps and web apps**

For function apps and web apps, Observability Cloud syncs the following properties:

.. list-table::
   :header-rows: 1

   * - :strong:`Azure name`
     - :strong:`Custom property`
     - :strong:`Description`
   * - ``availabilityState``
     - ``azure_availabilityState``
     - Availability state of the app. For example ``Normal``
   * - ``kind``
     - ``azure_kind``
     - The type of resource. For example, ``app``
   * - ``name``
     - ``azure_resource_name``
     - Name of the function or app
   * - ``regionName``
     - ``azure_region``
     - Name of the region the resource is in. For example, ``Central US``
   * - ``state``
     - ``azure_state``
     - State of the app. For example, ``Running``

|br| 

.. _redis-cache-service-metadata:

**Redis caches**

For Redis caches, Observability Cloud syncs the following properties:

.. list-table::
   :header-rows: 1

   * -   :strong:`Azure name`
     -   :strong:`Custom property`
     -   :strong:`Description`

   * -   ``hostName``
     -   ``azure_host_name``
     -   Host name of the Redis cache

   * -   ``isPremium``
     -   ``azure_is_premium``
     -   Indicates whether or not the service is premium

   * -   ``nonSslPort``
     -   ``azure_non_ssl_port``
     -   Indicates whether or not non-SSL port is enabled

   * -   ``port``
     -   ``azure_port``
     -   Port value for Redis cache. For example, ``6379``

   * -   ``provisioningState``
     -   ``azure_provisioning_state``
     -   Provisioning state of the Redis cache. For example, ``Succeeded``

   * -   ``redisVersion``
     -   ``azure_redis_version``
     -   Version of Redis

   * -   ``regionName``
     -   ``azure_region``
     -   Name of the region the resource is in. For example, ``Central US``

   * -   ``shardCount``
     -   ``azure_shard_count``
     -   Number of shards

   * -   ``sku``
     -   ``azure_sku``
     -   SKU of the Redis cache. For example, ``Standard_C1``

   * -   ``sslPort``
     -   ``azure_ssl_port``
     -   SSL port value for Redis cache. For example, ``6380``

|br|

.. _storage-account-service-metadata:

**Storage accounts**

For storage accounts, Observability Cloud syncs the following properties:

.. list-table::
   :header-rows: 1

   * -   :strong:`Azure name`
     -   :strong:`Custom property`
     -   :strong:`Description`

   * -   ``creationTime``
     -   ``azure_creation_time``
     -   Time at which the account was created. For example, ``Thu Jan 19 18:16:25 UTC 2018``

   * -   ``kind``
     -   ``azure_kind``
     -   Kind of storage account. For example, ``Storage`` or ``BLOB``

   * -   ``regionName``
     -   ``azure_region``
     -   Name of the region the resource is in. For example, ``Central US``

   * -   ``sku``
     -   ``azure_sku``
     -   SKU of the storage account. For example, ``Standard_LRS``

|br|


.. _virtual-machine-service-metadata:

**Virtual machines**

For virtual machines, Observability Cloud retrieves a subset of metadata about the instance,
as well as custom metadata you specify for the instance.

.. list-table::
   :header-rows: 1

   * -   :strong:`Azure name`
     -   :strong:`Custom property`
     -   :strong:`Description`

   * -   ``computerName``
     -   ``azure_computer_name``
     -   Name of the virtual machine instance

   * -   ``imageReference.offer``
     -   ``azure_image_reference_offer``
     -   Offer of the image reference. For example, ``UbuntuServer``

   * -   ``imageReference.publisher``
     -   ``azure_image_reference_publisher``
     -   Publisher of the image reference. For example, ``Canonical``

   * -   ``imageReference.sku``
     -   ``azure_image_reference_sku``
     -   SKU of the image reference. For example, ``16.04-LTS``

   * -   ``imageReference.version``
     -   ``azure_image_reference_version``
     -   Version of the image reference. For example, ``latest``

   * -   ``osDiskCachingType``
     -   ``azure_os_disk_caching_type``
     -   OS Disk caching type of the instance. For example, ``ReadWrite``

   * -   ``osType``
     -   ``azure_os_type``
     -   Type of OS on the virtual machine. For example, ``"LINUX"`` or ``"WINDOWS"``

   * -   ``osDiskSize``
     -   ``azure_os_disk_size``
     -   Disk size in GB

   * -   ``powerState``
     -   ``azure_power_state``
     -   Power state of the virtual machine. For example, ``PowerState/running``

   * -   ``provisioningState``
     -   ``azure_provisioning_state``
     -   Provisioning state of the virtual machine. For example, ``Succeeded``

   * -   ``regionName``
     -   ``azure_region``
     -   Name of the region the resource is in. For example, ``Central US``

   * -   ``size``
     -   ``azure_size``
     -   Information about the size of the virtual machine. For example, ``Standard_D2s_v3``

   * -   ``vmId``
     -   ``azure_vm_id``
     -   ID given to the virtual machine instance by Azure

|br|

.. _virtual-machine-scale-sets-service-metadata:

**Virtual machine scale sets**

For virtual machine scale sets, Observability Cloud syncs the following properties:

.. list-table::
   :header-rows: 1

   * -   :strong:`Azure name`
     -   :strong:`Custom property`
     -   :strong:`Description`

   * -   ``capacity``
     -   ``azure_capacity``
     -   Number of instances in the scale set

   * -   ``computerNamePrefix``
     -   ``azure_computer_name_prefix``
     -   Computer name prefix of the instances in the scale set

   * -   ``imageReference.offer``
     -   ``azure_image_reference_offer``
     -   Offer of the image reference. For example, ``UbuntuServer``

   * -   ``imageReference.publisher``
     -   ``azure_image_reference_publisher``
     -   Publisher of the image reference. For example, ``Canonical``

   * -   ``imageReference.sku``
     -   ``azure_image_reference_sku``
     -   SKU of the image reference. For example, ``16.04-LTS``

   * -   ``imageReference.version``
     -   ``azure_image_reference_version``
     -   Version of the image reference. For example, ``latest``

   * -   ``osDiskCachingType``
     -   ``azure_os_disk_caching_type``
     -   OS Disk caching type of the instance. For example, ``ReadWrite``

   * -   ``overProvisionEnabled``
     -   ``azure_over_provision_enabled``
     -   Indicates whether or not over provisioning is enabled

   * -   ``primaryNetworkId``
     -   ``azure_primary_network_id``
     -   ID of the primary network of the scale set

   * -   ``regionName``
     -   ``azure_region``
     -   Name of the region the resource is in. For example, ``Central US``

   * -   ``upgradeModel``
     -   ``azure_upgrade_model``
     -   Upgrade model of the scale set. For example, ``Manual``

|br|

.. _virtual-machines-in-scale-sets-service-metadata:

**Virtual machines in scale sets**

For virtual machines in scale sets, Observability Cloud syncs the following properties:

.. list-table::
   :header-rows: 1

   * -   :strong:`Azure name`
     -   :strong:`Custom property`
     -   :strong:`Description`

   * -   ``imageReference.offer``
     -   ``azure_image_reference_offer``
     -   Offer of the image reference. For example, ``UbuntuServer``

   * -   ``imageReference.publisher``
     -   ``azure_image_reference_publisher``
     -   Publisher of the image reference. For example, ``Canonical``

   * -   ``imageReference.sku``
     -   ``azure_image_reference_sku``
     -   SKU of the image reference. For example, ``16.04-LTS``

   * -   ``imageReference.version``
     -   ``azure_image_reference_version``
     -   Version of the image reference. For example, ``latest``

   * -   ``instanceId``
     -   ``azure_instance_id``
     -   Instance ID of the VM in the Scaleset

   * -   ``osDiskCachingType``
     -   ``azure_os_disk_caching_type``
     -   OS Disk caching type of the instance. For example, ``ReadWrite``

   * -   ``osDiskName``
     -   ``azure_os_disk_name``
     -   OS Disk name of the instance

   * -   ``osDiskSize``
     -   ``azure_os_disk_size``
     -   OS Disk size of the instance

   * -   ``osType``
     -   ``azure_os_type``
     -   OS Type. For example, ``Linux``

   * -   ``powerState``
     -   ``azure_power_state``
     -   Power state of the instance. For example, ``PowerState/running``

   * -   ``regionName``
     -   ``azure_region``
     -   Name of the region the resource is in. For example, ``Central US``

   * -   ``size``
     -   ``azure_size``
     -   Size of the instance. For example, ``Standard_A1``

   * -   ``sku``
     -   ``azure_sku``
     -   SKU of the instance. For example, ``com.microsoft.azure.management.compute.Sku@151e5d8d``

..
  Supported Azure services
  ========================

  You can monitor these Azure services in Observability Cloud:

  .. hlist::
    :columns: 2

    - API Management
    - App Service
    - Application Gateway
    - Automation
    - Azure Analysis Services
    - Azure Cosmos DB
    - Azure DDoS Protection
    - Azure DNS
    - Azure Data Explorer
    - Azure Database for MySQL
    - Azure Database for PostgreSQL
    - Azure Firewall
    - Azure Front Door
    - Azure Kubernetes Service
    - Azure Location Based Services
    - Azure Machine Learning
    - Azure Maps
    - Batch
    - Cognitive Services
    - Container Instances
    - Container Registry
    - Content Delivery Network (CDN)
    - Customer Insights
    - Data Factory
    - Data Lake Analytics
    - Data Lake Store
    - Event Grid (Event Subscriptions)
    - Event Grid (Extension Topics)
    - Event Grid (System Topics)
    - Event Grid (Topics)
    - Event Grid (domains)
    - Event Hubs
    - ExpressRoute
    - HDInsight
    - Iot Hub
    - Key Vault
    - Load Balancer
    - Logic apps
    - Network Interfaces
    - Notification Hubs
    - Power BI
    - Redis Cache
    - Relays
    - SQL Database
    - SQL Elastic Pools
    - SQL Servers
    - Search Services
    - Service Bus
    - Storage
    - Stream Analytics
    - Traffic Manager
    - VPN Gateway
    - Virtual Machine Scale Sets
    - Virtual Machines
    - Virtual Machines (Classic)
