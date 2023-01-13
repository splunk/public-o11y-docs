.. _otel-exporters:

********************************************************************************
Configure OpenTelemetry exporters
********************************************************************************

.. meta::
  :description: This page provides a listing of all OpenTelemetry exporters in Splunk Observability Cloud.

.. toctree::
   :maxdepth: 4
   :hidden:

   sapm/splunk-apm-exporter

An exporter, which can be push or pull based, is how you send data to one or more backends or destinations. Exporters may support one or more data sources (logs, metrics, or traces).

Exporters may come with default settings, but many require configuration to specify at least the destination and security settings. Any configuration for an exporter must be done in the ``exporters`` section of your configuration file. Configuration parameters specified for which the exporter provides a default configuration are overridden.

By default, no exporters are configured, but one or more exporters must be configured. 

Configuring an exporter does not enable it. After configuring the exporter, you must enable it by using a pipeline within the service section.

To find an exporter for your application, see the alphabetical listing of exporters on this page.

.. list-table::
   :header-rows: 1
   :widths: 50 16 16 16
   :class: monitor-table

   * - :strong:`Data source`
     - :strong:`Provides metrics`
     - :strong:`Provides traces`
     - :strong:`Provides logs`

   * - :ref:`Splunk APM (SAPM) <splunk-apm-exporter>`
     - 
     - :strong:`X`
     -
