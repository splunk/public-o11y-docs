.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-ingest-prometheus-alerts:

Ingest Prometheus alerts
************************************************************************

You can use Incident Intelligence ingest endpoints to ingest alerts from various third-party sources. Use the Prometheus endpoint to forward Prometheus alerts to Incident Intelligence where you can create on-call schedules and incident workflows to route Prometheus alerts to responders.

Send Prometheus alerts directly to the ingest endpoint
=================================================================

You can send Prometheus alerts directly to the ingest endpoint. To do so, make a POST call to the endpoint to ingest Prometheus alerts.

Prometheus ingest endpoint
---------------------------------

For steps to obtain your realm see :ref:`organizations`.

.. code:: 

    https://ingest.<REALM>.signalfx.com/v1/incidentintelligence/prometheus

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


Alert fields
----------------

.. list-table:: 
   :widths: 30 70
   :width: 100%
   :header-rows: 1

   * - Field
     - Description
   * -  | status
        | ``Required``
     -  (string) The alert status.
   * -  | receiver
        | ``Required``
     -  (string) The alert receiver.
   * -  | externalURL
        | ``Required``
     -  (string) The external URL to the alert.
   * -  | commonAnnotations
        | ``Required``
     -  (object) Alert annotations.
   * -  | commonLabels
        | ``Required``
     -  (object) Alert labels. 
   * -  | alerts.status
        | ``Required``
     -  (string) The alert status
   * -  | alerts.startsAt
        | ``Required``
     -  (string) Alert start date and time. 

Examples
------------

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

Example transformed JSON data for the example alert that is processed and saved as an alert in Incident Intelligence:

.. code-block:: json 

    {
    "id": "61bd3de1-8820-37d2-aa1d-527d04667d66",
    "eventId": "61bd3de1-8820-37d2-aa1d-527d04667d66",
    "title": "Prometheus firing alert for group - disk: mydisk1",
    "source": "alertmanager:my-receivers",
    "description": "Receiver 'my-receivers' received alerts from Prometheus. For more info, see http://d37bfc81e932:9093. Common labels - disk: mydisk1, instance: nodeexporter1:9100, job: node_exporter1",
    "severity": "critical",
    "sourceType": "prometheus",
    "orgId": "FBMqy06AIA0",
    "triggeredAt": 1656550514064,
    "properties": {
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
    }
