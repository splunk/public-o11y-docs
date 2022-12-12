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
     - Authentication token. See :ref:`api-access-token`. Ensure that the token as :guilabel:`INGEST`` listed under :guilabel:`Authorization Scopes`.

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


Using this endpoint, your alert is ingested and transformed into the common event model for alerts in Incident Intelligence. This is an example of the transformed alert data that is saved as an alert in Incident Intelligence: