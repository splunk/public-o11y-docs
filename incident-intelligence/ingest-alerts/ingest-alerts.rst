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
    ingest-rest
    ingest-splunk-alerts

The following options are available for ingesting alerts in Incident Intelligence:

.. raw:: html

   <ol>
      <li>Create a detector for one of the available alert sources in Splunk Observability Cloud to automatically pass alerts. See <a href="#ii-ingest-observability-alerts">Available alert sources in Splunk Observability Cloud</a>.</li>
      <li>Use the Splunk Incident Intelligence app on Splunkbase to send Splunk Enterprise and Splunk Cloud Platform alerts. See <a href="#ii-ingest-splunk-alerts">Available alert sources in Splunk Enterprise and Splunk Cloud Platform</a>.</li>
      <li>Ingest third-party alerts using an ingest endpoint. See <a href="#ii-ingest-third-party-alerts">Available ingest endpoints for third-party alerts</a>.</li>
   </ol>

After alerts are ingested, you can view them on the :guilabel:`Alerts` tab of Incident Intelligence.

.. raw:: html

      <embed>
      <h2 id="ii-ingest-observability-alerts">Available alert sources in Splunk Observability Cloud</h2>
      </embed>


.. list-table::
   :header-rows: 1
   :width: 100%
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
      <h2 id="ii-ingest-splunk-alerts">Available alert sources in Splunk Enterprise and Splunk Cloud Platform</h2>
   </embed>

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 25, 75

   * - :strong:`Alert source`
     - :strong:`Documentation`

   * - Splunk Enterprise
     - See :ref:`ii-ingest-splunk-itsi-alerts`.

   * - Splunk Cloud Platform
     - See :ref:`ii-ingest-splunk-itsi-alerts`.

.. raw:: html

   <embed>
      <h2 id="ii-ingest-third-party-alerts">Available ingest endpoints for third-party alerts</h2>
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
  
   * - Generic REST alerts
     - See :ref:`ii-ingest-rest`.





.. raw:: html

   <embed>
      <h2>Next step</h2>
   </embed>

If you are setting up Incident Intelligence for the first time, next you need to create and configure an incident policy. See :ref:`ii-create-configure-incident-policies`.
