.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-ingest-cloudwatch-alerts:

Ingest Amazon CloudWatch alarms
************************************************************************

You can use Incident Intelligence ingest endpoints to ingest alerts from various third-party sources. In Incident Intelligence you can create on-call schedules and incident workflows to route AWS incidents to responders. Use the AWS CloudWatch endpoint to forward AWS CloudWatch alarms to Incident Intelligence, which ingests them as alerts. You can send AWS CloudWatch alarms directly to the ingest endpoint or use AWS CloudWatch Simple Notification Service (SNS).

Prerequisite
================

You have to set up CloudWatch to send alarms to a queue in SNS.


Send AWS CloudWatch alarms directly to the ingest endpoint
=================================================================

To send AWS CloudWatch alarms directly to the ingest endpoint, make a POST call to the endpoint to ingest Amazon CloudWatch alarms.

AWS CloudWatch ingest endpoint
---------------------------------

For steps to obtain your realm see :ref:`organizations`.

.. code:: 

    https://ingest.<REALM>.signalfx.com/v1/incidentintelligence/cloudwatch

Request header
------------------

.. list-table:: 
   :widths: 30 70
   :width: 100%
   :header-rows: 1

   * - Header
     - Description
   * - | X-SF-Token  
       | ``Required``
     - (string) Authentication token. See :ref:`api-access-token`.


Alarm fields
----------------

.. list-table:: 
   :widths: 30 70
   :width: 100%
   :header-rows: 1

   * - Field
     - Description
   * -  | id  
        | ``Required``
     -  (string) Alarm ID.
   * -  | detail-type 
        | ``Required``
     -  (string) Alarm title.
   * -  | source 
        | ``Required``
     -  (string) The alarm source.
   * -  | time 
        | ``Required``
     -  (string) Date-time string.
   * -  region
     -  (string) AWS region.
   * -  resources
     -  (array) Alarm resources you want to include with the alert in Incident Intelligence.
   * -  detail
     -  (object) Alarm details you want to include with the alert in Incident Intelligence.

JSON payload
---------------

Send AWS Cloudwatch alarms to the AWS Cloudwatch endpoint. Use this JSON payload. 

Example JSON payload:

.. code-block:: json

    { 
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

Using this endpoint, your alarm is ingested and transformed into a consistent format for AWS Cloudwatch alerts in Incident Intelligence. This is an example of the transformed alert data that saved as an alert in Incident Intelligence:

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

Send alarms to Incident Intelligence using the  AWS CloudWatch Simple Notification Service (SNS)
=====================================================================================================

You can also send alarms to Incident Intelligence using AWS CloudWatch SNS. To do so, you need your CloudWatch ingest endpoint and the JSON payload. See :new-page:`https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/US_SetupSNS.html`.

