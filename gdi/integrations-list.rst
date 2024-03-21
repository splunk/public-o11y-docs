.. _supported-data-sources:
.. _integrations-list:

********************************************************************************
Supported integrations in Splunk Observability Cloud
********************************************************************************

.. meta::
  :description: This page provides a listing of integrations and services supported by Splunk Observability Cloud.

.. toctree::
  :maxdepth: 4
  :hidden:

  Cloud services: AWS <integrations/cloud-aws>
  Cloud services: Azure
  Cloud services: GCP
  Applications: Caches and memory TOGGLE <caches-memory>
  Applications: Cloud platforms TOGGLE <cloud>
  Applications: Cloudfoundry <monitors-cloudfoundry/cloudfoundry-firehose-nozzle>
  Applications: Conviva <monitors-conviva/conviva>
  Applications: Databases TOGGLE <databases>
  Applications: GitLab TOGGLE <gitlab-monitors>
  Applications: Hosts and servers TOGGLE <hosts-servers>
  Applications: Languages TOGGLE <languages>
  Applications: Messaging TOGGLE <messaging>
  Applications: Monitoring TOGGLE <monitoring>
  Applications: Networks TOGGLE <network>
  Applications: Orchestration TOGGLE <orchestration>
  Applications: Prometheus TOGGLE <prometheus>  

This page provides the list of integrations supported by Splunk Observability Cloud.

* :ref:`Cloud services: AWS <cloud-aws>`
* :ref:`Applications: Caches and memory <caches-memory>`

.. _gcp-integrations:

Google Cloud Platform services
-----------------------------------------------

To learn about GCP and Splunk Observability Cloud, read :ref:`get-started-gcp`.

Splunk Observability Cloud supports certain services by default, but you can add any other GCP service you need to monitor. See :ref:`Start the integration <gcp-three>`. 

You can collect data from the following GCP services out-of-the-box:

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

To learn about Azure and Splunk Observability Cloud, read :ref:`get-started-azure`.

You can collect data from the following Azure services out-of-the-box:

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

OpenTelemetry receivers
--------------------------------------------

These are the native OpenTelemetry receivers available:

.. include:: /_includes/gdi/otel-receivers-table.rst

.. _monitor-data-sources:

Application receivers
--------------------------------------------

An application receiver gathers metrics from its associated application and the host the application is running on and sends them to Splunk Observability Cloud. 

These are the available Smart Agent application and services monitors:

.. include:: /_includes/gdi/application-receiver-table.rst

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

- Microsoft ADFS
- Microsoft Entra ID (formerly Azure Directory)
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
