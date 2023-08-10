
.. _ingest-azure-log-data:

*********************************************
Send Azure logs to Splunk Log Observer
*********************************************

.. meta::
   :description: Learn how to send logs from your Azure services to Splunk Observability Cloud and Splunk Log Observer using Azure Event Hub.

.. caution:: Splunk Log Observer is no longer available for new users. You can continue to use Log Observer if you already have an entitlement.

You can send logs from Azure to Splunk Log Observer by deploying a function that prepares and sends log data to the Splunk HTTP Event Collector (HEC) endpoint. To get started, follow these instructions.

Prerequisites
=================================================

To send logs from Azure to Splunk Observability Cloud, you need the following:

- Access to Log Observer in Splunk Observability Cloud. See :ref:`logs-logs`.
- An ingest token in your organization. See :ref:`admin-org-tokens`.
- An Event Hub namespace in Azure to use for logs forwarding. See Event Hub in the Azure documentation.

Create an event hub in Azure
=================================================

Azure uses diagnostic settings to send data to Event Hubs. Each resource you want to monitor must have a diagnostic setting. Follow these steps to configure an event hub for each use case:

#. In Azure, go to :guilabel:`Event Hubs` and select :guilabel:`Create`.

#. Select your Event Hub namespace.

#. Set the name of the event hub to one of the following values depending on which logs you want to forward:

   .. tabs::

      .. tab:: Activity logs

         Event Hub name: ``insights-activity-logs``

         .. note:: If you set a different hub name, update the function application settings to use the right name.

      .. tab:: Active Directory logs

         Event Hub name: ``insights-logs-aad``

         .. note:: If you set a different hub name, update the function application settings to use the right name.

      .. tab:: Diagnostics logs

         Event Hub name: ``insights-logs-diag``

         .. note:: If you set a different hub name, update the function application settings to use the right name.

      .. tab:: Metrics data

         Event Hub name: ``insights-metrics-pt1m``

         .. note:: If you set a different hub name, update the function application settings to use the right name.

#. Set the number of partitions. Use at least 4 partitions.

#. Select :guilabel:`Create`.

Configure diagnostic settings to send logs
===================================================

After you've created the event hub, follow these steps to activate diagnostic settings:

#. In Azure, select the resource.

#. Select :guilabel:`Monitoring`, then :guilabel:` Diagnostic settings`.

#. Create a new setting or edit an existing setting.

#. Select the events you want to log.

#. Select :guilabel:`Stream to an event hub` and select the event hub you've created.

#. Select :guilabel:`Save`.

Set up the forwarding function in Azure
==================================================

To deploy the Azure function, click the following button:

.. raw:: html

   <a href="https://portal.azure.com/#blade/Microsoft_Azure_CreateUIDef/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fsplunk%2Fazure-functions-splunk%2Fmaster%2Fevent-hubs-hec%2Fdeploy%2FazureDeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2Fsplunk%2Fazure-functions-splunk%2Fmaster%2Fevent-hubs-hec%2Fdeploy%2FazureDeploy.portal.json" target="_blank"><img src="https://aka.ms/deploytoazurebutton"/></a>

In the :guilabel:`Function App Settings` section, enter the following details:

.. list-table::
   :header-rows: 1
   :widths: 40, 60
   :width: 100%

   * - Setting
     - Value
   * - Event Hub Namespace
     - The namespace that contains the event hub you've created.
   * - Splunk HEC Endpoint
     - ``https://ingest.<realm>.signalfx.com/v1/log`` where ``<realm>`` is your Splunk Observability Cloud realm. See :ref:`splunk-hec-exporter` for more information.
   * - Splunk HEC Token
     - Your Splunk Observability Cloud ingest token. See :ref:`admin-org-tokens`.

.. include:: /_includes/realm-note.rst

Security considerations
===================================================

Azure encrypts settings by default. For increased security, you can transfer one or more of settings to a Key Vault. See the Key Vault documentation in the Azure docs for more information.

Additional resources
==================================================

For examples and additional information, see :new-page:`https://github.com/splunk/azure-functions-splunk/tree/master/event-hubs-hec <https://github.com/splunk/azure-functions-splunk/tree/master/event-hubs-hec>` on GitHub.