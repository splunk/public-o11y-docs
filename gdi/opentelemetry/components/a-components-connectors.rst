.. _otel-components-connectors:

******************************************
Collector components: Connectors
******************************************

.. meta::
    :description: Learn about the components that make up the OpenTelemetry Collector.

.. toctree::
    :titlesonly:
    :hidden:

    span-metrics-connector

A connector is both an exporter and receiver. As the name suggests a Connector connects two pipelines: it consumes data as an exporter at the end of one pipeline and emits data as a receiver at the start of another pipeline. It may consume and emit data of the same data type, or of different data types. A connector may generate and emit data to summarize the consumed data, or it may simply replicate or route data.

The following connectors are available:

* :ref:`span-metrics-connector`

To see other components, refer to :ref:`otel-components`.
