
.. _grpc-data-ingest:

********************************************************************************
Send traces to Splunk Observability Cloud using the gRPC endpoint
********************************************************************************

.. meta::
   :description: You can send traces to Splunk Observability Cloud in OTLP format using the gRPC endpoint.

You can send traces to Splunk Observability Cloud in OTLP format using the gRPC endpoint. This is useful when you need to bypass the OpenTelemetry Collector due to network or application requirements and want to sent data in OTLP format.

.. note:: To send data using the REST API endpoints, see :ref:`rest-api-ingest`.

Send traces using the gRPC endpoint
==============================================

The gRPC ingest endpoint for traces is ``ingest.<realm>.signalfx.com:443``, where ``<realm>`` is your Splunk Observability Cloud realm. Requests must contain an access token in the ``X-SF-Token`` header.

To obtain an access token, see :ref:`admin-api-access-tokens`.

To find the realm name of your account, follow these steps: 

#. Open the navigation menu in Splunk Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section.

Configure the Splunk OpenTelemetry Collector
-----------------------------------------------

To send traces directly to the gRPC ingest endpoint, add the following lines to the ``exporters`` section of your Collector configuration file:

.. code-block:: yaml

   exporters:
     otlp:
        endpoint: ingest.${SPLUNK_REALM}.signalfx.com:443
        headers:
           "X-SF-Token": "${SPLUNK_ACCESS_TOKEN}"

Make sure that the traces pipeline contains the ``otlp`` exporter:

.. code-block:: yaml

   service:
     pipelines:
       traces:
         # ...
         exporters: [otlp]

Send data in OTLP format over HTTP
-----------------------------------------------

If you want to send data in OTLP format using HTTP instead of gRPC, see the documentation for the :new-page:`/trace/otlp endpoint <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-sendotlptraces>`.
