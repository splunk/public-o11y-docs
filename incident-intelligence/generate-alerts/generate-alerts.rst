.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-generate-alerts:

Generate alerts in Splunk Incident Intelligence
************************************************************************

.. toctree::
    :maxdepth: 3
    :hidden:

    ingest-cloudwatch
    ingest-prometheus



To generate alerts in Incident Intelligence, you can create a detector for the one of the available alert sources to automatically generate alerts in Incident Intelligence or you can ingest alerts using an ingest endpoint.

:strong:`Available alert sources in Splunk Observability Cloud`

- Splunk APM
- Splunk Infrastructure Monitoring
- Splunk RUM
- Splunk Synthetic Monitoring

See :ref:`create-detectors` for more information about configuring detectors. 

:strong:`Available ingest endpoints for cloud alerts`

- Amazon CloudWatch, see :ref:`ii-ingest-cloudwatch-alerts`.
- Prometheus, see :ref:`ii-ingest-prometheus-alerts`.
