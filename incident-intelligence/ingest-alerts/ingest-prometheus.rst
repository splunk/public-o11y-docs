.. _ii-ingest-prometheus-alerts:

Ingest Prometheus alerts
************************************************************************

.. meta::
   :description: Detailed overview of Prometheus alert ingestion endpoint for Incident Intelligence in Splunk Observability Cloud. 

You can use Incident Intelligence ingest endpoints to ingest alerts from various third-party sources. In Incident Intelligence you can then create on-call schedules and incident workflows to route third-party incidents to responders. You can send Prometheus alerts directly to the ingest endpoint using the Prometheus alertmanager webhook config. For more information, see :new-page:`https://prometheus.io/docs/alerting/latest/configuration/#webhook_config` in the Prometheus documentation.

Prometheus ingest endpoint
---------------------------------

To send Prometheus alerts to the ingest endpoint, make a POST call to the endpoint.

.. code:: 

    https://ingest.<REALM>.signalfx.com/v1/incidentintelligence/prometheus

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
   * - status
     - Required
     - String
     - The alert status
   * - receiver
     - Required
     - String
     - The alert receiver
   * - externalURL
     - Required
     - String
     - The external URL to the alert
   * - commonAnnotations
     - Required
     - Object
     - Alert annotations
   * - commonLabels
     - Require
     - Object
     - Alert labels
   * - alerts.status
     - Required
     - String
     - The alert status
   * - alerts.startsAt
     - Required
     - String
     - Alert start date and time. Send date and time in the Prometheus format (ISO 8601). It is transformed to the epoch long format for the ``triggeredAt`` field in the common event model

JSON payload
------------

Use the Prometheus alertmanager webhook config to send Prometheus alerts to the Prometheus endpoint. Refer to the following example JSON payload for the Prometheus endpoint. 

Example JSON payload:

.. code-block:: json

    {
    "receiver": "my-receivers",
    "status": "firing",
    "alerts": [
        {
        "status": "firing",
        "labels": {
            "alertname": "Disk Usage Red",
            "disk": "mydisk1",
            "instance": "nodeexporter1:9100",
            "job": "node_exporter1",
            "severity": "critical"
        },
        "annotations": {
            "summary": "Delete files now!"
        },
        "startsAt": "2022-06-30T00:55:30.064Z",
        "endsAt": "0001-01-01T00:00:00Z",
        "generatorURL": "http://b8e578b3f5ed:9090/graph?g0.expr=disk_usage+%3E+80&g0.tab=1",
        "fingerprint": "0e8d353af1ccede9"
        },
        {
        "status": "firing",
        "labels": {
            "alertname": "Disk Usage Yellow",
            "disk": "mydisk1",
            "instance": "nodeexporter1:9100",
            "job": "node_exporter1",
            "severity": "warn"
        },
        "annotations": {
            "summary": "Uh oh!"
        },
        "startsAt": "2022-06-30T00:55:14.064Z",
        "endsAt": "0001-01-01T00:00:00Z",
        "generatorURL": "http://b8e578b3f5ed:9090/graph?g0.expr=disk_usage+%3E+50&g0.tab=1",
        "fingerprint": "2523ef41263c9dc5"
        }
    ],
    "groupLabels": {
        "disk": "mydisk1"
    },
    "commonLabels": {
        "disk": "mydisk1",
        "instance": "nodeexporter1:9100",
        "job": "node_exporter1"
    },
    "commonAnnotations": {},
    "externalURL": "http://d37bfc81e932:9093",
    "version": "4",
    "groupKey": "{}:{disk=\"mydisk1\"}",
    "truncatedAlerts": 0
    }

Using this endpoint, your alert is ingested and transformed into the common event model for alerts in Incident Intelligence. This is an example of the transformed alert data that is saved as an alert in Incident Intelligence:

.. code-block:: json 

    {
      "id":"<YOUR_ID>",
      "eventId":"<YOUR_EVENT_ID>",
      "title":"Prometheus firing alert for group - disk: mydisk1",
      "source":"alertmanager:my-receivers",
      "description":"Receiver 'my-receivers' received alerts from Prometheus. For more info, see http://d37bfc81e932:9093. Common labels - disk: mydisk1, instance: nodeexporter1:9100, job: node_exporter1",
      "severity":"critical",
      "sourceType":"prometheus",
      "orgId":"<YOUR_ORG_ID>",
      "triggeredAt":1656550514064,
      "properties":{
          "receiver":"my-receivers",
          "status":"firing",
          "alerts":[
            {
                "status":"firing",
                "labels":{
                  "alertname":"Disk Usage Red",
                  "disk":"mydisk1",
                  "instance":"nodeexporter1:9100",
                  "job":"node_exporter1",
                  "severity":"critical"
                },
                "annotations":{
                  "summary":"Delete files now!"
                },
                "startsAt":"2022-06-30T00:55:30.064Z",
                "endsAt":"0001-01-01T00:00:00Z",
                "generatorURL":"<YOUR_GENERATOR_URL>",
                "fingerprint":"0e8d353af1ccede9"
            },
            {
                "status":"firing",
                "labels":{
                  "alertname":"Disk Usage Yellow",
                  "disk":"mydisk1",
                  "instance":"nodeexporter1:9100",
                  "job":"node_exporter1",
                  "severity":"warn"
                },
                "annotations":{
                  "summary":"Uh oh!"
                },
                "startsAt":"2022-06-30T00:55:14.064Z",
                "endsAt":"0001-01-01T00:00:00Z",
                "generatorURL":"<YOUR_GENERATOR_URL>",
                "fingerprint":"2523ef41263c9dc5"
            }
          ],
          "groupLabels":{
            "disk":"mydisk1"
          },
          "commonLabels":{
            "disk":"mydisk1",
            "instance":"nodeexporter1:9100",
            "job":"node_exporter1"
          },
          "commonAnnotations":{
            
          },
          "externalURL":"<YOUR_EXTERNAL_URL>",
          "version":"4",
          "groupKey":"{}:{disk=\"mydisk1\"}",
          "truncatedAlerts":0
      }
    }
