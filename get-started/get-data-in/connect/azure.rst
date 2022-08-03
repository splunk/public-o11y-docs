.. _get-started-azure:

****************
Connect to Azure
****************

.. meta::
   :description: Connect your Azure account to Splunk Observability Cloud.

.. toctree::
   :hidden:

Splunk Infrastructure Monitoring provides a robust integration with Microsoft Azure, navigates through Azure entities in the Infrastructure Navigator, and includes many built-in-dashboards to help you get started monitoring Azure services.

You can also use Infrastructure Monitoring to import Azure metadata, which applies to the relevant Azure services. The metadata enables you to monitor your services using custom tags, region, host names, and other dimensions. See :new-page:`Azure Monitor supported metrics <https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported>` for a list of supported metrics.

=============
Prerequisites
=============

Before you begin, you must be an administrator of your Splunk account who also has permissions to create an :new-page:`Azure Active Directory application <https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#permissions-required-for-registering-an-app>`.

1. Create an Azure application in your Microsoft Azure portal.

2. Specify subscriptions to monitor in your Azure portal.

======================
Start the integration
======================

Follow the instructions below to connect your Azure account to Splunk Observability Cloud:

1. In your Microsoft Azure portal, :new-page:`create an Azure application <https://docs.signalfx.com/en/latest/integrations/azure-info.html#part-1-create-an-azure-active-directory-application>`.

2. Specify subscriptions :new-page:`to monitor <https://docs.signalfx.com/en/latest/integrations/azure-info.html#azure-two>` in your Azure portal.

3. In Splunk Infrastructure Monitoring, :new-page:`configure Azure integration <https://docs.signalfx.com/en/latest/integrations/azure-info.html#part-3-complete-the-configuration-in-splunk-infrastructure-monitoring>` in the Setup tab for the Microsoft Azure tile on the Integrations page.

.. commenting out Azure integration wizard usage until sometime after GA when wizard exists

   1. On the Observability Cloud home page, open the Navigation menu and click :strong:`Data Setup`. The Connect Your Data page is displayed.

   2. Select :strong:`Azure Services Monitored`.

   3. Click :strong:`Microsoft Azure` and enter the details for the integration with Azure.

   4. Click :strong:`Add Connection`.

=======
Metrics
=======

These are the metrics available for the Microsoft Azure integration.

Azure App Service metrics
=========================

.. raw:: html

   <div class="metrics-table" type="azure-app-service" include="markdown"></div>

Azure Batch metrics
===================

.. raw:: html

   <div class="metrics-table" type="azure-batch" include="markdown"></div>

Azure Event Hubs metrics
========================

.. raw:: html

   <div class="metrics-table" type="azure-event-hubs" include="markdown"></div>

Azure Functions metrics
=======================

.. raw:: html

   <div class="metrics-table" type="azure-functions" include="markdown"></div>

Azure Kubernetes service metrics
================================

.. raw:: html

   <div class="metrics-table" type="azure-kubernetes-service" include="markdown"></div>

Azure Logic App metrics
========================

.. raw:: html

   <div class="metrics-table" type="azure-logic-app" include="markdown"></div>

Azure Redis metrics
===================

.. raw:: html

   <div class="metrics-table" type="azure-redis" include="markdown"></div>

Azure SQL Databases metrics
============================

.. raw:: html

   <div class="metrics-table" type="azure-sql-databases" include="markdown"></div>

Azure SQL elastic pools metrics
===============================

.. raw:: html

   <div class="metrics-table" type="azure-sql-elasticpools" include="markdown"></div>

Azure Storage metrics
=====================

.. raw:: html

   <div class="metrics-table" type="azure-storage" include="markdown"></div>

Azure Virtual Machine metrics
=============================

.. raw:: html
   
   <div class="metrics-table" type="azure-vm" include="markdown"></div>

Azure Virtual Machine Scale Sets metrics
========================================

.. raw:: html

   <div class="metrics-table" type="azure-vmscaleset" include="markdown"></div>

