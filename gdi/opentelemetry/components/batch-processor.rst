.. _batch-processor:

*************************
Batch processor
*************************

.. meta::
      :description: Use the batch processor to batch telemetry and reduce network usage by the OpenTelemetry Collector. Read on to learn how to configure the component.

The batch processor is an OpenTelemetry Collector component that batches and compresses spans, metrics, or logs based on size or time. Batching can help reduce the number of submission requests made by exporters, and help regulate the flow of telemetry from multiple or single receivers in a pipeline.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the batch processor in all the predefined pipelines when deployed in host monitoring (agent) or data forwarding (gateway) modes. See :ref:`otel-deployment-mode` for more information.

To ensure that batching happens after data sampling and filtering, add the batch processor after the ``memory_limiter`` processor and other sampling processors.

Sample configurations
----------------------

The Splunk Distribution of OpenTelemetry Collector adds the batch processor with the default configuration:

.. code-block:: yaml

   processors:
     batch:

The following example shows how to configure the batch processor to send batches after 5,000 spans, data points, or logs have been collected. The timeout setting works as a fallback condition in case the size condition isn't met.

.. code-block:: yaml

   processors:
     batch/custom:
       send_batch_size: 5000
       timeout: 15s

Batching by metadata
--------------------------------

Starting from version 0.78 of the OpenTelemetry Collector, you can batch telemetry based on metadata. For example:

.. code-block:: yaml

   processors:
     batch:
       # batch data by tenant-id
       metadata_keys:
       - tenant_id
       
       # limit to 10 batcher processes before raising errors
       metadata_cardinality_limit: 10

To use metadata as batching criteria, add the ``include_metadata: true`` setting to your receivers's configuration, so that the batch processor can use the available metadata keys.

.. caution:: Batching by metadata can increase memory consumption, as each metadata combination triggers the allocation of a new background task in the Collector. The maximum number of distinct combinations is defined using the ``metadata_cardinality_limit`` setting, which defaults to ``1000``.

Settings
======================

The following table shows the configuration options for the batch processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/batch.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
