.. _groupbyattrs-processor:

************************************
Group by attributes processor
************************************

.. meta::
      :description: Use the Group by Attributes processor to reassociate spans, log records, and metric data points to a resource that matches with the specified attributes. As a result, all spans, log records, or metric data points with the same values for the specified attributes are grouped under the same resource.

The Group by Attributes processor is an OpenTelemetry Collector component that reassociates spans, log records, and metric data points to a resource that matches with the specified attributes. As a result, all spans, log records, or metric data points with the same values for the specified attributes are grouped under the same resource. 

The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``groupbyattrs`` processor as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the resource processor, add ``groupbyattrs`` to the ``processors`` section of your configuration file. Specify an array of attribute keys to use to "group" spans, log records or metric data points together, as in the following example:

.. code-block:: yaml


  processors:
    groupbyattrs:
      keys:
        - foo
        - bar

The keys property describes which attribute keys will be considered for grouping:

* If the processed span, log record and metric data point has at least one of the specified attributes key, it will be moved to a resource with the same value for these attributes. The resource will be created if none exists with the same attributes.
* If none of the specified attributes key is present in the processed span, log record or metric data point, it remains associated to the same resource, without any change.

To complete the configuration, include the processor in any pipeline of the ``service`` section of your configuration file. For example:

.. code-block:: yaml


  service:
    pipelines:
      metrics:
        processors: [groupbyattrs]
      logs:
        processors: [groupbyattrs]
      traces:
        processors: [groupbyattrs]

See :new-page:`config.go <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/config.go>` for the config spec.     

Typical use cases
----------------------

Use the processor to perform the following actions:

* Extract resources from "flat" data formats, such as Fluentbit logs or Prometheus metrics.
* Associate Prometheus metrics to a resource that describes the relevant host, based on a label present on all metrics.
* Optimize data packaging by extracting common attributes.
* :ref:`Compact multiple records <groupbyattrs-processor-compact>` that share the same ``resource`` and ``InstrumentationLibrary`` attributes but are under multiple ``ResourceSpans`` or ``ResourceMetrics`` or ``ResourceLogs`` into a single ``ResourceSpans`` or ``ResourceMetrics`` or ``ResourceLogs``, when an empty list of keys is provided. 
  
  * This happens, for example, when you use the ``groupbytrace`` processor, or when data comes in multiple requests. 
  * If you compact data it takes less memory, it's more efficiently processed and serialized, and the number of export requests is reduced, for example if you use the ``sapm`` exporter. See more at :ref:`splunk-apm-exporter`.

.. tip:: Use the ``groupbyattrs`` processor together with ``batch`` processor, as a consecutive step. Grouping records together under matching resource and/or InstrumentationLibrary reduces the fragmentation of data.

Advanced configuration examples 
--------------------------------------------

.. _groupbyattrs-processor-group-metrics:

Group metrics by host
^^^^^^^^^^^^^^^^^^^^^^^^^^

Consider the below metrics, all originally associated to the same resource:

.. code-block:: yaml


  Resource {host.name="localhost",source="prom"}
    Metric "gauge-1" (GAUGE)
      DataPoint {host.name="host-A",id="eth0"}
      DataPoint {host.name="host-A",id="eth0"}
      DataPoint {host.name="host-B",id="eth0"}
    Metric "gauge-1" (GAUGE) // Identical to previous Metric
      DataPoint {host.name="host-A",id="eth0"}
      DataPoint {host.name="host-A",id="eth0"}
      DataPoint {host.name="host-B",id="eth0"}
    Metric "mixed-type" (GAUGE)
      DataPoint {host.name="host-A",id="eth0"}
      DataPoint {host.name="host-A",id="eth0"}
      DataPoint {host.name="host-B",id="eth0"}
    Metric "mixed-type" (SUM)
      DataPoint {host.name="host-A",id="eth0"}
      DataPoint {host.name="host-A",id="eth0"}
    Metric "dont-move" (Gauge)
      DataPoint {id="eth0"}

Use the following configuration to re-associate the metrics with either ``host-A`` or ``host-B``, based on the value of the ``host.name`` attribute.

.. code-block:: yaml


  processors:
    groupbyattrs:
      keys:
        - host.name

The output of the processor is:

.. code-block:: yaml


  Resource {host.name="localhost",source="prom"}
    Metric "dont-move" (Gauge)
      DataPoint {id="eth0"}

  Resource {host.name="host-A",source="prom"}
    Metric "gauge-1"
      DataPoint {id="eth0"}
      DataPoint {id="eth0"}
      DataPoint {id="eth0"}
      DataPoint {id="eth0"}
    Metric "mixed-type" (GAUGE)
      DataPoint {id="eth0"}
      DataPoint {id="eth0"}
    Metric "mixed-type" (SUM)
      DataPoint {id="eth0"}
      DataPoint {id="eth0"}

  Resource {host.name="host-B",source="prom"}
    Metric "gauge-1"
      DataPoint {id="eth0"}
      DataPoint {id="eth0"}
    Metric "mixed-type" (GAUGE)
      DataPoint {id="eth0"}

The ``groupbytrace`` processor has accomplished the following:

* The ``DataPoints`` for the ``gauge-1`` metric were originally split under 2 metric instances, and have been merged in the output.
* The ``DataPoints`` of the ``mixed-type`` ``gauge`` and mixed-type ``sum`` metrics have not been merged under the same metric, because their ``DataType`` is different.
* The ``dont-move`` metric ``DataPoints`` don't have a ``host.name`` attribute, and therefore have remained under the original resource.
* The new resources inherited the attributes from the original resource (source="prom"), and the specified attributes from the processed metrics (``host.name="host-A"`` or ``host.name="host-B"``).
* The specified grouping attributes that are set on the new resources are also removed from the metric ``DataPoints``.
* While not shown in this example, the processor also merges collections of records under matching ``InstrumentationLibrary``.

.. _groupbyattrs-processor-compact:

Compact data
^^^^^^^^^^^^^^^^^^^^^^^^^^

In some cases, data might come in single requests to the Collector, or become fragmented due to use of the ``groupbytrace`` processor. Even after batching there might be multiple duplicated ``ResourceSpans`` or ``ResourceMetrics`` or ``ResourceLogs`` objects, which leads to additional memory consumption, increased processing costs, inefficient serialization, or increase of the export requests. 

To remedy this, use the ``groupbyattrs`` processor to compact the data by matching ``Resource`` and ``InstrumentationLibrary`` properties.

For example, consider the following input:

.. code-block:: yaml


  Resource {host.name="localhost"}
    InstumentationLibrary {name="MyLibrary"}
    Spans
      Span {span_id=1, ...}
    InstumentationLibrary {name="OtherLibrary"}
    Spans
      Span {span_id=2, ...}
    
  Resource {host.name="localhost"}
    InstumentationLibrary {name="MyLibrary"}
    Spans
      Span {span_id=3, ...}
    
  Resource {host.name="localhost"}
    InstumentationLibrary {name="MyLibrary"}
    Spans
      Span {span_id=4, ...}
    
  Resource {host.name="otherhost"}
    InstumentationLibrary {name="MyLibrary"}
    Spans
      Span {span_id=5, ...}

Use the following configuration to re-associate the spans with matching ``Resource`` and ``InstrumentationLibrary``.

.. code-block:: yaml


  processors:
    batch:
    groupbyattrs:

  pipelines:
    traces:
      processors: [batch, groupbyattrs/grouping]
      ...

The output of the processor is:

.. code-block:: yaml


  Resource {host.name="localhost"}
    InstumentationLibrary {name="MyLibrary"}
    Spans
      Span {span_id=1, ...}
      Span {span_id=3, ...}
      Span {span_id=4, ...}
    InstumentationLibrary {name="OtherLibrary"}
    Spans
      Span {span_id=2, ...}

  Resource {host.name="otherhost"}
    InstumentationLibrary {name="MyLibrary"}
    Spans
      Span {span_id=5, ...}

.. _groupbyattrs-processor-settings:

Settings
======================

The following table shows the configuration options for the ``groupbyattrs`` processor:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/groupbyattrs.yaml"></div>

Internal metrics
=====================

The ``groupbyattrs`` processor records the following internal metrics:

.. list-table::
  :width: 100%
  :widths: 30 70
  :header-rows: 1

  * - Metric
    - Description
  * - ``num_grouped_spans``
    - The number of spans that had attributes grouped
  * - ``num_non_grouped_spans``
    - The number of spans that did not have attributes grouped
  * - ``span_groups``
    - Distribution of groups extracted for spans
  * - ``num_grouped_logs``
    - Number of logs that had attributes grouped
  * - ``num_non_grouped_logs``
    - Number of logs that did not have attributes grouped
  * - ``log_groups``
    - Distribution of groups extracted for logs
  * - ``num_grouped_metrics``
    - Number of metrics that had attributes grouped
  * - ``num_non_grouped_metrics``
    - Number of metrics that did not have attributes grouped
  * - ``metric_groups``
    - Distribution of groups extracted for metrics

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
