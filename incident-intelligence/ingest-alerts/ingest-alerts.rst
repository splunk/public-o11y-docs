.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-ingest-alerts:

Ingest alerts in Splunk Incident Intelligence
************************************************************************

.. toctree::
    :maxdepth: 3
    :hidden:

    ingest-cloudwatch
    ingest-prometheus



To ingest alerts in Incident Intelligence, you can create a detector for one of the available alert sources to automatically pass alerts into Incident Intelligence or you can ingest third-party alerts using an ingest endpoint. After alerts have been ingested, you can view them on the :guilabel:`Alerts` tab of Incident Intelligence.

.. raw:: html

   <embed>
      <h2>Available alert sources in Splunk Observability Cloud</h2>
   </embed>

- Splunk APM: To create a detector for APM, see :ref:`create-detectors`. 
- Splunk Infrastructure Monitoring: To create a detector for Infrastructure Monitoring, see :ref:`create-detectors`. 
- Splunk RUM: To create a detector for RUM, see :ref:`rum-detectors`.
- Splunk Synthetic Monitoring
    - To create a detector for an API test, see :ref:`api-detector`.
    - To create a detector for a browser test, see :ref:`detector-browser-test`.
    - To create a detector for a uptime test, see :ref:`uptime-detector`.

.. raw:: html

   <embed>
      <h2>Available ingest endpoints for cloud alerts</h2>
   </embed>

- Amazon CloudWatch, see :ref:`ii-ingest-cloudwatch-alerts`.
- Prometheus, see :ref:`ii-ingest-prometheus-alerts`.

.. raw:: html

   <embed>
      <h2>Next step</h2>
   </embed>

If you are setting up Incident Intelligence for the first time, next you need to create and configure a service. See :ref:`ii-create-configure-services`.
