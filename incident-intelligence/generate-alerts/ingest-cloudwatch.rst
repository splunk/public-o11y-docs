.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-ingest-cloudwatch-alerts:

Ingest Amazon CloudWatch alerts
************************************************************************

You can use Incident Intelligence ingest endpoints to ingesting alerts from various third-party sources. 

Make a POST call to this endpoint to ingest Amazon Cloudwatch alerts.

.. code:: 

    https://ingest.<REALM>.signalfx.com/v1/incidentintelligence/cloudwatch

Request header
=================

.. list-table:: 
   :widths: 30 70
   :width: 100%
   :header-rows: 1

   * - Header
     - Description
   * -  X-SF-Token  ``Required``
     - (string) Authentication token. See :ref:`api-access-token`.


Alert fields
=================

.. list-table:: 
   :widths: 30 70
   :width: 100%
   :header-rows: 1

   * - Field
     - Description
   * -  id  ``Required``
     -  (string) Alert ID.
   * -  detail-type ``Required``
     -  (string) Alert title.
   * -  source ``Required``
     -  (string) The alert source.
   * -  time ``Required``
     -  (string) Date-time string.
   * -  region
     -  (string) AWS region.
   * -  resources
     -  (array) Alert resources you want to include with the alert in Incident Intelligence.
   * -  detail
     -  (object) Alert details you want to include with the alert in Incident Intelligence.

Examples
===========

Example cURL call:

.. code-block:: curl

    curl -i -X POST https://ingest.<REALM>.signalfx.com/v1/incidentintelligence/cloudwatch 
       -H "X-SF-TOKEN: <value>" 
       -H "Content-Type: application/json" 
       -d '{ 
              "version": "0", 
              "id": "60e7ddc2-a588-5328-220a-21c060f6c3f4", 
              "detail-type": "Glue Data Catalog Database State Change", 
              "source": "aws.glue", 
              "account": "123456789012", 
              "time": "2019-01-16T18:08:48Z", 
              "region": "eu-west-1", 
              "resources": [ 
              	"arn:aws:glue:eu-west-1:123456789012:table/d1/t1" 
              ], 
              "detail": { 
              	"databaseName": "d1", 
              	"typeOfChange": "CreateTable", 
              	"changedTables": [ "t1" ] 
              }
            }

Transformed JSON  data for the example call that is processed and saved in Incident Intelligence:

.. code-block:: json 

    { "id": "60e7ddc2-a588-5328-220a-21c060f6c3f4", 
      "eventId": "60e7ddc2-a588-5328-220a-21c060f6c3f4", 
      "title": "Glue Data Catalog Database State Change", 
      "source": "aws.glue", 
      "description": "Glue Data Catalog Database State Change", 
      "severity": "WARNING", 
      "sourceType": "cloudwatch", 
      "orgId": "FBMqy06AIA0", 
      "triggeredAt": 1547662128000, 
      "properties": { 
          "version": "0", 
          "id": "60e7ddc2-a588-5328-220a-21c060f6c3f4", 
          "detail-type": "Glue Data Catalog Database State Change", 
          "source": "aws.glue", 
          "account": "123456789012", 
          "time": "2019-01-16T18:08:48Z", 
          "region": "eu-west-1", 
          "resources": [ 
              "arn:aws:glue:eu-west-1:123456789012:table/d1/t1" 
          ], 
          "detail": { 
              "databaseName": "d1", 
              "typeOfChange": "CreateTable", 
              "changedTables": [ "t1" ] 
          } 
       } 
    }