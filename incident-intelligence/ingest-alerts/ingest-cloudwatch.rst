.. _ii-ingest-cloudwatch-alerts:

Ingest Amazon CloudWatch alarms
************************************************************************

.. meta::
   :description: Detailed overview of AWS Cloudwatch alert ingestion endpoint for Incident Intelligence in Splunk Observability Cloud. 

You can use Incident Intelligence ingest endpoints to ingest alerts from various third-party sources. In Incident Intelligence you can then create on-call schedules and incident workflows to route third-party incidents to responders. Use the AWS CloudWatch endpoint to forward AWS CloudWatch alarms to Incident Intelligence, which ingests them as alerts. You can send AWS CloudWatch alarms directly to the ingest endpoint or use AWS CloudWatch Simple Notification Service (SNS).

Prerequisite
================

You must set up CloudWatch to send alarms to a queue in SNS. This is a prerequisite for alert ingestion through the endpoint and SNS.


Send AWS CloudWatch alarms directly to the ingest endpoint
=================================================================

To send AWS CloudWatch alarms directly to the ingest endpoint, make a POST call to the endpoint.

AWS CloudWatch ingest endpoint
---------------------------------

.. code:: 

    https://ingest.<REALM>.signalfx.com/v1/incidentintelligence/cloudwatch

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


Alarm fields
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

   * - id  
     - Required
     - String
     - Alarm ID

   * - detail-type 
     - Required
     - String
     - Alarm title
   * - source 
     - Required
     - String
     - The alarm source

   * - time 
     - Required
     - String
     - Date-time string. Send date-time in the AWS Cloudwatch format (ISO 8601). It is transformed to the epoch long format for the ``triggeredAt`` field in the common event model

   * - region
     -
     - String
     - AWS region

   * - resources
     -
     - Array
     - Alarm resources you want to include with the alert in Incident Intelligence

   * - detail
     -
     - Object
     - Alarm details you want to include with the alert in Incident Intelligence

JSON payload
---------------

Send AWS Cloudwatch alarms to the AWS Cloudwatch endpoint. Refer to the following example JSON payload for the AWS Cloudwatch endpoint. 

Example JSON payload:

.. code-block:: json

    { 
        "version": "0", 
        "id": "<YOUR_ID>", 
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

Using this endpoint, your alarm is ingested and transformed into the common event model for alerts in Incident Intelligence. This is an example of the transformed alert data that saved as an alert in Incident Intelligence:

.. code-block:: json 

    { "id": "<YOUR_ID>", 
      "eventId": "<YOUR_EVENT_ID>", 
      "title": "Glue Data Catalog Database State Change", 
      "source": "aws.glue", 
      "description": "Glue Data Catalog Database State Change", 
      "severity": "WARNING", 
      "sourceType": "cloudwatch", 
      "orgId": "<YOUR_ORG_ID>", 
      "triggeredAt": 1547662128000, 
      "properties": { 
          "version": "0", 
          "id": "<YOUR_ID>", 
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

Send alarms to Incident Intelligence using the AWS CloudWatch SNS
=====================================================================================================

You can also send alarms to Incident Intelligence using AWS CloudWatch SNS. To do so, you need your CloudWatch ingest endpoint and the JSON payload. See the Amazon documentation for more information: :new-page:`https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/US_SetupSNS.html`.

