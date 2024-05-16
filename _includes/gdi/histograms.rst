
To send histogram data to Splunk Observability Cloud, set the ``send_otlp_histograms`` option to ``true``. For example:

.. code-block:: yaml
   :emphasize-lines: 5

   signalfx:
     access_token: "${SPLUNK_ACCESS_TOKEN}"
     api_url: "${SPLUNK_API_URL}"
     ingest_url: "${SPLUNK_INGEST_URL}"
     send_otlp_histograms: true

