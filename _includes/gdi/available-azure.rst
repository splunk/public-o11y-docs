Splunk Observability Cloud collects data from the Azure services listed on the table below as explained in :ref:`connect-to-azure`. 

.. list-table::
  :header-rows: 1
  :widths: 40 40 
  :width: 100%  

  * - :strong:`Resource name`
    - :strong:`Resource type`

  * - Azure Analysis Services 
    - microsoft.analysisservices/servers
  
  * - API Management	
    - microsoft.apimanagement/service

  * - App Service	
    - microsoft.web

  * - App Service	
    - microsoft.web/hostingenvironments/multirolepools

  * - App Service	
    - microsoft.web/hostingenvironments/workerpools

  * - App Service	
    - microsoft.web/serverfarms

  * - App Service	
    - microsoft.web/sites  

  * - App Service	
    - microsoft.web/sites/slots

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

  * - Azure Database for MySQL (flexible server)	
    - microsoft.dbformysql/flexibleservers

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

  * - Content Delivery Network (CDN) Web App Firewall Policies	
    - microsoft.cdn/cdnwebapplicationfirewallpolicies

  * - Content Delivery Network (CDN) Profiles	
    - microsoft.cdn/profiles

  * - Customer Insights	
    - microsoft.customerinsights/hubs

  * - Data Factory	
    - microsoft.datafactory

  * - Data Factory	
    - microsoft.datafactory/datafactories

  * - Data Factory	
    - microsoft.datafactory/factories

  * - Data Lake Analytics	
    - microsoft.datalakeanalytics/accounts

  * - Data Lake Store	
    - microsoft.datalakestore/accounts

  * - Data Protection Backup Vaults 
    - microsoft.dataprotection/backupvaults

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

  * - ExpressRoute	
    - microsoft.network/expressroutecircuits

  * - HDInsight	
    - microsoft.hdinsight/clusters

  * - Iot Hub	
    - microsoft.devices

  * - Iot Hub	
    - microsoft.devices/elasticpools

  * - Iot Hub	
    - microsoft.devices/elasticpools/iothubtenants

  * - Iot Hub	
    - microsoft.devices/iothubs

  * - Iot Hub	
    - microsoft.devices/provisioningservices

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

  * - Recovery Services Vaults	
    - microsoft.recoveryservices/vaults

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

Add additional services
============================================

If you want to collect data from other Azure services you need to add them as a custom service with via the API using the field `additionalServices`. Splunk Observability Cloud syncs resource types that you specify in services and custom services. If you add a resource type to both fields, Splunk Observability Cloud ignores the duplication.

Any resource type you specify as a custom service must meet the following criteria:

* The resource must be an Azure GenericResource type. 
  
  * If the resource types has a hierarchical structure, only the root resource type is a GenericResource. For example, a Storage Account type can have a File Service type, which in turn can have a File Storage type. In this case, only Storage Account is a GenericResource.

* The resource type stores its metrics in Azure Monitor. To learn more about Azure Monitor, refer to the Microsoft Azure documentation.