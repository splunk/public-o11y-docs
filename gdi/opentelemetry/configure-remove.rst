.. _configure-remove:

*********************************************************************
Control data to ingest using the Collector
*********************************************************************

.. meta::
      :description: Remove data prior to ingestion with the Splunk Distribution of OpenTelemetry Collector / Pre-ingest data removal.

Depending on its configuration, the Splunk Distribution of OpenTelemetry Collector can forward a wide range of telemetry, such as metrics, traces, or logs, to the Splunk Observability Cloud ingest endpoints. For certain scenarios, some of this data can be redundant, unnecessary, or sensitive, causing technical complications, increased cost, or legal issues. 

To address these situations, the Collector comes with options to process the data you're receiving to modify or delete unwanted elements before they're ingested by Splunk Observability Cloud. For example, you can use the :ref:`attributes processor <attributes-processor>` to edit or remove any unwanted data.

Scenarios: Remove dimensions using the attributes processor
==============================================================================

Moira, a performance engineer, notices high cardinality in ingested metrics, which heavily impacts data charges. Moira is considering dropping certain dimensions to cut costs. 

Moira checks which dimensions are being used and realizes that for the metric ``cpu.utilization``, the dimensions ``hostname`` and ``source_host`` are irrelevant. They decide that those dimension don't need to be ingested at all.

To prevent both dimensions from being ingested, first Moira adds the attributes processor in the Collectors's configuration, set up to skip the unnecessary dimensions:

.. code-block:: yaml

    extensions: 
        ...  
    processors:
      attributes/delete:
        actions:
          - key: hostname
            action: delete
          - key: source_host
            action: delete            
    service:
        ...
    ...

Next, Moira adds the ``attributes/delete`` processor to the ``processors`` pipeline under ``pipelines`` in the Collector's configuration: 

.. code-block:: yaml

    ... 
    service:
        pipelines:
        traces:
            receivers: ...
            processors: [..., attributes/delete, ...] 
            ...

Alternatives to alter or remove data
==============================================================================

See another example of how to tweak your data at :ref:`collector-remove-data`.

You can also use the metrics pipeline management tool to control how you ingest and store your metrics. Learn more at :ref:`metrics-pipeline-intro`.