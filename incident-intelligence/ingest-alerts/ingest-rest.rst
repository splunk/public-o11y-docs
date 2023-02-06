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
     - The criticality of the alert. Supported values are ``CRITICAL``, ``WARNING``, and ``INFO``
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


JSON payload
------------

Refer to the following example JSON payload for the Azure Monitor endpoint. 

Example JSON payload:

.. code-block:: json

    {
      "severity": "CRITICAL",
      "title": "My alert name",
      "description": "The disk is very full.  Here is some information about the problem",
      "timestamp": "1675101397"
    }

Using this endpoint, your alert is ingested and transformed into the common event model for alerts in Incident Intelligence. This is an example of the transformed alert data that is saved as an alert in Incident Intelligence:

.. code-block:: json 
    
    {  
      "id":"<YOUR_ID>",
      "eventId":"<YOUR_EVENT_ID>",
      "title":"My alert name",
      "source":"generic",
      "description":"The disk is very full.  Here is some information about the problem",
      "severity":"critical",
      "sourceType":"generic",
      "orgId":"<YOUR_ORG_ID>",
      "triggeredAt":1675101397,
      "properties":{}
    }