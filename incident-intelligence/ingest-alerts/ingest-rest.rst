.. _ii-ingest-rest:

Ingest generic REST alerts
************************************************************************

.. meta::
   :description: Detailed overview of ingest endpoint for generic REST alerts for Incident Intelligence in Splunk Observability Cloud. 

You can use Incident Intelligence ingest endpoints to ingest alerts from various third-party sources. In Incident Intelligence you can then create on-call schedules and incident workflows to route third-party incidents to responders. Use the generic REST ingest endpoint to forward third-party alerts to Incident Intelligence for which there is not a specific ingest endpoint available. 

REST ingest endpoint
---------------------------------

To send REST alerts to the ingest endpoint, make a POST call to the endpoint for your realm.

.. code:: 

    https://ingest.<REALM>.signalfx.com/v1/incidentintelligence/generic

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
     - Authentication token. See :ref:`api-access-token`. Ensure that the token has :guilabel:`INGEST` listed under :guilabel:`Authorization Scopes`.
   * - Content-Type
     - Required
     - application/json

Alert fields
----------------

The following fields are transformed as part of the common information model. All other included fields are included properties object in the transformed alert.

.. list-table:: 
   :widths: 15 15 15 55
   :width: 100%
   :header-rows: 1

   * - Field
     - Required
     - Type
     - Description
   * - severity or message_type for Splunk On-call alerts
     - Required
     - String
     - The criticality of the alert. Supported values are ``info``, ``normal``, ``warning``, ``minor``, ``major``, and ``critical``
   * - title or entity_display_name for Splunk On-call alerts
     - Required
     - String
     - Name of the alert
   * - description or state_message for Splunk On-call alerts
     - 
     - String
     - Verbose message
   * - timestamp
     - 
     - Integer
     - Date-time. Send date-time in epoch format
   * - source 
     - 
     - String
     - The alert source


JSON payload
------------

Refer to the following example JSON payload for the generic third-party alert to the REST endpoint. 

Example JSON payload for generic third-party alert:

.. code-block:: json

    {
    "severity":"critical",
    "title":"Out of memory exception",
    "description":"Failed log statement",
    "timestamp": 1675704711477
    }

Refer to the following example JSON payload for the generic third-party alert to the REST endpoint. 

Example JSON payload for Splunk On-call alert:

.. code-block:: json

    {
    "message_type":"critical",
    "entity_display_name":"Out of memory exception",
    "state_message":"Failed log statement",
    "timestamp": 1675704711477
    }


Using this endpoint, your alert is ingested and transformed into the common event model for alerts in Incident Intelligence. These are examples of the transformed alert data that is saved as an alert in Incident Intelligence:

Example transformed alert data for a generic third-party alert:

.. code-block:: json 
    
    {
    "id": "<Your alert ID>",
    "eventId": "<Your event ID>",
    "title": "Out of memory exception",
    "description": "Failed log statement",
    "severity": "critical",
    "sourceType": "generic",
    "orgId": "<Your org ID>",
    "triggeredAt": 1675704711477,
    "properties": {
      "severity": "critical",
      "title": "Out of memory exception",
      "description": "Failed log statement",
      "timestamp": 1675704711477
      }
    }

Example transformed alert data for a Splunk On-call alert:

.. code-block:: json

    {
    "id": "<Your alert ID>",
    "eventId": "<Your event ID>",
    "title": "Out of memory exception",
    "description": "Failed log statement",
    "severity": "critical",
    "sourceType": "generic",
    "orgId": "<Your org ID>",
    "triggeredAt": 1675704711477,
    "properties": {
      "message_type": "critical",
      "entity_display_name": "Out of memory exception",
      "state_message": "Failed log statement",
      "timestamp": 1675704711477
    }
  }