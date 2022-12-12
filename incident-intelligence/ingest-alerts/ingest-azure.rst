.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-ingest-azure-alerts:

Ingest Azure Monitor alerts
************************************************************************

.. meta::
   :description: Detailed overview of Azure Monitor alert ingestion endpoint for Incident Intelligence in Splunk Observability Cloud. 

You can use Incident Intelligence ingest endpoints to ingest alerts from various third-party sources. In Incident Intelligence you can then create on-call schedules and incident workflows to route third-party incidents to responders. Use the Azure Monitor endpoint to forward Azure Monitor alerts to Incident Intelligence. 

Azure Monitor ingest endpoint
---------------------------------

.. code:: 

    https://ingest.<REALM>.signalfx.com/v1/incidentintelligence/azure-monitor

For steps to obtain your realm see :ref:`organizations`.

Request header
------------------

.. list-table:: 
   :widths: 20 20 60
   :width: 100%
   :header-rows: 1

   * - Header
     - Required
     - Description
   * - X-SF-Token  
     - Required
     - Authentication token. See :ref:`api-access-token`. Ensure that the token as :guilabel:`INGEST` listed under :guilabel:`Authorization Scopes`.

Alert fields
----------------

.. list-table:: 
   :widths: 15 15 15 55
   :width: 100%
   :header-rows: 1

   * - Field
     - Required
     - Type
     - Description
   * - alertRule
     - Required
     - String
     - The alert rule name
   * - monitoringService
     - Required
     - String
     - The monitoring service for the alert
   * - severity
     - Required
     - String
     - The alert severity
   * - firedDateTime
     - Required
     - String
     - Alert fired date and time. Send date and time in the Azure format (ISO 8601). It is transformed to the epoch long format for the ``triggeredAt`` field in the common event model

JSON payload
------------

Use this JSON payload to send Azure Monitor alerts to the Azure Monitor endpoint. 

Example JSON payload:

.. code-block:: json

    {
      "schemaId": "azureMonitorCommonAlertSchema",
      "data": {
          "essentials": {
          "alertId": "/subscriptions/680123C3-2EF6-4679-A222-359FAF36370F/providers/Microsoft.AlertsManagement/alerts/b9569717-bc32-442f-add5-83a997729330",
          "alertRule": "WCUS-R2-Gen2",
          "severity": "Sev3",
          "signalType": "Metric",
          "monitorCondition": "Resolved",
          "monitoringService": "Platform",
          "alertTargetIDs": [
              "/subscriptions/680123C3-2EF6-4679-A222-359FAF36370F/resourcegroups/pipelinealertrg/providers/microsoft.compute/virtualmachines/wcus-r2-gen2"
          ],
          "configurationItems": [
              "wcus-r2-gen2"
          ],
          "originAlertId": "3f2d4487-b0fc-4125-8bd5-7ad17384221e_PipeLineAlertRG_microsoft.insights_metricAlerts_WCUS-R2-Gen2_-117781227",
          "firedDateTime": "2019-03-22T13:58:24.3713213Z",
          "resolvedDateTime": "2019-03-22T14:03:16.2246313Z",
          "description": "",
          "essentialsVersion": "1.0",
          "alertContextVersion": "1.0"
          },
          "alertContext": {
          "properties": null,
          "conditionType": "SingleResourceMultipleMetricCriteria",
          "condition": {
              "windowSize": "PT5M",
              "allOf": [
              {
                  "metricName": "Percentage CPU",
                  "metricNamespace": "Microsoft.Compute/virtualMachines",
                  "operator": "GreaterThan",
                  "threshold": "25",
                  "timeAggregation": "Average",
                  "dimensions": [
                  {
                      "name": "ResourceId",
                      "value": "3efad9dc-3d50-4eac-9c87-8b3fd6f97e4e"
                  }
                  ],
                  "metricValue": 7.727
              }
              ]
          }
          }
      }
      }

Using this endpoint, your alert is ingested and transformed into the common event model for alerts in Incident Intelligence. This is an example of the transformed alert data that is saved as an alert in Incident Intelligence:

.. code-block:: json 
    
    {
      "id": "09e4b8f1-83a3-44ce-bcf5-5dd35d953a77",
      "eventId": "09e4b8f1-83a3-44ce-bcf5-5dd35d953a77",
      "title": "Azure Monitor Alert for WCUS-R2-Gen2",
      "source": "Platform",
      "description": "",
      "severity": "major",
      "sourceType": "azure_monitor",
      "orgId": "<YOUR_ORG_ID>",
      "triggeredAt": 1553263104371,
      "properties": {
          "schemaId": "azureMonitorCommonAlertSchema",
          "data": {
          "essentials": {
              "alertId": "/subscriptions/680123C3-2EF6-4679-A222-359FAF36370F/providers/Microsoft.AlertsManagement/alerts/b9569717-bc32-442f-add5-83a997729330",
              "alertRule": "WCUS-R2-Gen2",
              "severity": "Sev3",
              "signalType": "Metric",
              "monitorCondition": "Resolved",
              "monitoringService": "Platform",
              "alertTargetIDs": [
              "/subscriptions/680123C3-2EF6-4679-A222-359FAF36370F/resourcegroups/pipelinealertrg/providers/microsoft.compute/virtualmachines/wcus-r2-gen2"
              ],
              "configurationItems": [
              "wcus-r2-gen2"
              ],
              "originAlertId": "3f2d4487-b0fc-4125-8bd5-7ad17384221e_PipeLineAlertRG_microsoft.insights_metricAlerts_WCUS-R2-Gen2_-117781227",
              "firedDateTime": "2019-03-22T13:58:24.3713213Z",
              "resolvedDateTime": "2019-03-22T14:03:16.2246313Z",
              "description": "",
              "essentialsVersion": "1.0",
              "alertContextVersion": "1.0"
          },
          "alertContext": {
              "properties": null,
              "conditionType": "SingleResourceMultipleMetricCriteria",
              "condition": {
              "windowSize": "PT5M",
              "allOf": [
                  {
                  "metricName": "Percentage CPU",
                  "metricNamespace": "Microsoft.Compute/virtualMachines",
                  "operator": "GreaterThan",
                  "threshold": "25",
                  "timeAggregation": "Average",
                  "dimensions": [
                      {
                      "name": "ResourceId",
                      "value": "3efad9dc-3d50-4eac-9c87-8b3fd6f97e4e"
                      }
                  ],
                  "metricValue": 7.727
                  }
              ]
              }
          }
          }
      }
      }