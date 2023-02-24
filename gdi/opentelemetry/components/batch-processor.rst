.. _batch-processor:

*************************
Batch processor
*************************

.. meta::
      :description: Use the batch processor to batch telemetry and reduce network usage by the OpenTelemetry Collector. Read on to learn how to configure the component.

The batch processor is an OpenTelemetry Collector component that batches and compresses spans, metrics, or logs based on size or time. Batching telemetry reduces the network usage by the Collector and improves its overall performance.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the batch processor in all the predefined pipelines when deploying in agent or gateway modes. See :ref:`otel-deployment-mode` for more information.

To ensure that batching happens after data sampling and filtering, add the batch processor after the ``memory_limiter`` processor and other sampling processors.

Sample configurations
----------------------

The Splunk Distribution of OpenTelemetry Collector adds the batch processor with default configuration:

.. code-block:: yaml

   processors:
     batch:

The following example shows how to configure the batch processor to send batches after 5,000 spans, data points, or logs have been collected. The timeout setting works as a fallback condition in case the size condition isn't met.

.. code-block:: yaml

   processors:
     batch/custom:
        send_batch_size: 5000
        timeout: 15s

Settings
======================

The following table shows the configuration options for the batch processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/batch.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
