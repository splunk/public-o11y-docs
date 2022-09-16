.. _gcp-logs:
.. _ingest-gcp-log-data:

********************************************************
Ingest Google Cloud Platform log data
********************************************************

.. meta::
   :description: Send GCP logs to Splunk Observability Cloud.

.. toctree::
   :hidden:

To export GCP Cloud Logging data to Splunk Observability Cloud, create a Pub/Sub subscription and use the :new-page:`Pub/Sub to Splunk Dataflow template <https://cloud.google.com/dataflow/docs/guides/templates/provided-streaming#cloudpubsubtosplunk>` to create a Dataflow job. The Dataflow job takes messages from the Pub/Sub subscription, converts payloads into Splunk HTTP Event Collector (HEC) event format, and forwards those payloads to Splunk Observability Cloud, where the whole event (JSON payload and its information) is ingested.

To learn more, see :new-page:`Scenarios for exporting Cloud Logging data: Splunk <https://cloud.google.com/architecture/exporting-stackdriver-logging-for-splunk>`. While this GCP documentation describes both pull- and push-based methods for exporting Google Cloud Logging data, Splunk Observability Cloud supports the push-based method only.

Use the example ``gcloud`` command provided in :new-page:`Option A: Stream logs using Pub/Sub to Splunk Dataflow <https://cloud.google.com/architecture/exporting-stackdriver-logging-for-splunk#deploy_splunk_dataflow_template>`, with the following changes:

- Change the token in the sample syntax (``token=your-splunk-hec-token``) to a Splunk Observability Cloud organization access token with ingest permission. For more information about organization access tokens, see :ref:`admin-org-tokens`

- Change the URL in the sample syntax (``url=your-splunk-hec-url``) to point to the real-time log data ingest endpoint for Splunk Observability Cloud: ``https://ingest.{REALM}.signalfx.com`` (for example, ``https://ingest.{REALM}.signalfx.com:443``).

.. note::

   Any response code that is not 2xx, including throttling, indicates a message delivery failure. If message delivery fails, you can replay unprocessed messages manually by following the instructions in the "Handling delivery failures" section of :new-page:`GCP documentation <https://cloud.google.com/architecture/deploying-production-ready-log-exports-to-splunk-using-dataflow#replay_failed_messages>` for deploying production-ready log exports to Splunk using Dataflow.


