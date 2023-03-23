.. _configure-remove:

*********************************************************************
Remove ingested data 
*********************************************************************

.. meta::
      :description: Remove data ingested with the Splunk Distribution of OpenTelemetry Collector.

The Collector bla bla ingests data . See DATA MODEL.

* dimensions: Key-value pairs that describe some aspect of the source of the metric. A data point can have one or more dimensions. The most common dimension is a source. For example, a dimension can be a host or instance for infrastructure metrics, or it can be an application component or service tier for application metrics.
* sensitive data
* other?

You can use the :ref:`attributes processor <attributes-processor>` to edit or remove any unwanted data you've ingested.

.. note:: See another example of how to tweak your data at :ref:`collector-remove-data`.

Use case: Remove dimensions using the attributes processor
==============================================================================

Moira, a performance engineer, notices high cardinality in ingested metrics, which heavily impacts data charges. Moira is considering dropping certain dimensions to cut costs. 

Moira checks which dimensions are being used, realizes that for the metric ``cpu.utilization``, the dimensions ``hostname`` and ``source_host`` are irrelevant, and decides to delete them.

To do so, first Moira adds the attributes processor in the Collectors's configuration, set up to delete the unnecessary dimensions:

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
