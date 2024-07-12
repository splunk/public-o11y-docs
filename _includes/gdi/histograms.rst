
To send histogram data to Splunk Observability Cloud, set the ``send_otlp_histograms`` option to ``true``. For example:

.. code-block:: yaml
   :emphasize-lines: 8

   exporters:
     signalfx:
       access_token: "${SPLUNK_ACCESS_TOKEN}"
       api_url: "${SPLUNK_API_URL}"
       ingest_url: "${SPLUNK_INGEST_URL}"
       sync_host_metadata: true
       correlation:
       send_otlp_histograms: true

