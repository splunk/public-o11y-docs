.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-ingest-alerts:

Ingest alerts in Splunk Incident Intelligence
************************************************************************

.. meta::
   :description: Overview of alert ingestion methods for Incident Intelligence in Splunk Observability Cloud. 

.. toctree::
    :maxdepth: 3
    :hidden:

    ingest-cloudwatch
    ingest-azure
    ingest-prometheus




There are 3 options for ingesting alerts in Incident Intelligence:
1. Create a detector for one of the available alert sources in Splunk Observability Cloud to automatically pass alerts.
2. Ingest third-party alerts using an ingest endpoint. 
3. Use the Splunk Incident Intelligence app on Splunkbase to send Splunk Enterprise, Splunk Cloud Platform, and Splunk IT Service Intelligence (ITSI) alerts.

After alerts have been ingested, you can view them on the :guilabel:`Alerts` tab of Incident Intelligence.

.. raw:: html

   <embed>
      <h2>Available alert sources in Splunk Observability Cloud</h2>
   </embed>

.. list-table::
   :header-rows: 1
   :widths: 25, 75

   * - :strong:`Alert source`
     - :strong:`Documentation`

   * - Splunk APM
     - See :ref:`create-detectors`. 

   * - Splunk Infrastructure Monitoring
     - See :ref:`create-detectors`. 

   * - Splunk RUM
     - See :ref:`rum-detectors`.

   * - Splunk Synthetic Monitoring
     - 
        * To create a detector for an API test, see :ref:`api-detector`.
        * To create a detector for a browser test, see :ref:`detector-browser-test`.
        * To create a detector for an uptime test, see :ref:`uptime-detector`.

.. raw:: html

   <embed>
      <h2>Available alert sources in Splunk Enterprise, Splunk Cloud Platform, and Splunk IT Service Intelligence (ITSI)</h2>
   </embed>

.. list-table::
   :header-rows: 1
   :widths: 25, 75

   * - :strong:`Alert source`
     - :strong:`Documentation`

   * - ITSI
     - See 


.. raw:: html

   <embed>
      <h2>Available ingest endpoints for cloud alerts</h2>
   </embed>

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 25, 75

   * - :strong:`Ingest endpoint`
     - :strong:`Documentation`

   * - Amazon CloudWatch
     - See :ref:`ii-ingest-cloudwatch-alerts`.

   * - Azure Monitor
     - See :ref:`ii-ingest-azure-alerts`.

   * - Prometheus
     - See :ref:`ii-ingest-prometheus-alerts`.

.. raw:: html

   <embed>
      <h2>Next step</h2>
   </embed>

If you are setting up Incident Intelligence for the first time, next you need to create and configure an incident policy. See :ref:`ii-create-configure-incident-policies`.
