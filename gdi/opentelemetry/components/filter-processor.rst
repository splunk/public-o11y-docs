.. _filter-processor:

*************************
Filter processor
*************************

.. meta::
      :description: Use the filter processor to include or exclude telemetry based on certain conditions. Read on to learn how to configure the component.

The filter processor is an OpenTelemetry Collector component that filters spans, metrics, or logs based on the conditions you define in its configuration. A typical use case for the filter processor is dropping telemetry that isn't relevant to the observed system, like noncritical logs or spans, to reduce noise in your data.

Filtering works through allow lists and deny lists, which include or exclude telemetry based on regular expressions and resource attributes. You can also use the OpenTelemetry Transformation Language (OTTL) to better describe the signals you want to filter. The processor supports all pipeline types. See :ref:`otel-data-processing` for more information.

The filter processor can include or exclude telemetry based on the following criteria:

.. list-table::
   :width: 100%
   :widths: 20 80
   :header-rows: 1

   * - Signal
     - Criteria and match types
   * - Spans
     - OTTL conditions, span names (``strict`` or ``regexp``), and resource attributes (``strict`` or ``regexp``). Span events filtering only supports OTTL conditions.
   * - Metrics
     - OTTL conditions, metric names (``strict`` or ``regexp``), and metric attributes (``expr``). Data points filtering only supports OTTL conditions.
   * - Logs
     - OTTL conditions, resource attributes (``strict`` or ``regexp``).

The regular expression engine used by the filter processor is ``re2``.

.. note:: To redact or transform attributes of spans, logs, or metrics without dropping them, use the attributes processor. See :ref:`attributes-processor`.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the filter processor. To activate the filter processor for a pipeline, add ``filter`` to the ``processors`` section of the configuration. For example:

.. code-block:: yaml

   processors:
     filter/includemetrics:
       metrics:
           # Drop nonmatching metrics from the pipeline
           include:
             match_type: strict
             metric_names:
               - good_metric
               - great_metric
     filter/excludemetrics:
       metrics:
         # Drop matching metrics from the pipeline
         exclude:
           match_type: strict
           metric_names:
             - a_metric
             - another_metric
             - a_third_metric
     filter/mixedlogs:
       logs:
          # Include filters are applied before exclude filters
          include:
            match_type: strict
            record_attributes:
              - key: host.name
                value: "(host1|anotherhost2)"
          exclude:
            match_type: strict
            record_attributes:
              - key: host.name
                value: wrong_host_.*

You can then add the filter processors to any compatible pipeline. For example:

.. code-block:: yaml
   :emphasize-lines: 6, 14, 15, 23

   service:
     pipelines:
       traces:
         receivers: [jaeger, otlp, smartagent/signalfx-forwarder, zipkin]
         processors:
         - filter/traces
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [sapm, signalfx]
       metrics:
         receivers: [hostmetrics, otlp, signalfx, smartagent/signalfx-forwarder]
         processors:
         - filter/includemetrics
         - filter/excludemetrics
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [signalfx]
       logs:
         receivers: [fluentforward, otlp]
         processors:
         - filter/mixedlogs
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [splunk_hec]

For a complete list of parameters, see :ref:`filter-processor-settings`.

Sample configurations
----------------------

The following sample configurations show how to filter spans, metrics, and logs using different criteria.

.. note:: For a complete list of examples, see the configuration snippets in :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor/testdata`.

Filter spans
^^^^^^^^^^^^^^^^^^^^^^^^^^

You can exclude or include spans from traces using resource attributes or OTTL conditions. For example:

.. code-block:: yaml

   filter/spans:
     spans:
       include:
         match_type: strict
         services:
           - ponygame
           - ponytest
         attributes:
           - key: an_attribute
             value: "(valid_value|another_value)"
       exclude:
         match_type: regexp
         attributes:
           - key: bad_attributes
             value: "(invalid_value|another_value)"

   filter/ottl:
     traces:
       span:
         - 'attributes["test"] == "value"'
         - 'attributes["test"] == "value2"'

.. note:: Include filters are always applied before exclude filters for any given filter processor instance.

Filter metrics
^^^^^^^^^^^^^^^^^^^^^

You can exclude or include metrics using metric names, expressions, or OTTL conditions. For example:

.. code-block:: yaml

   filter/mixed:
     metrics:
       # Include using metric names
       include:
         match_type: strict
         metric_names:
           - a_metric
           - another_metric
       # Exclude using regular expressions
       exclude:
         match_type: regexp
         metric_names:
           - prefix/.*
           - prefix_.*
           - .*/suffix
           - .*_suffix
           - .*/contains/.*
           - .*_contains_.*
           - full/name/match
           - full_name_match

   filter/expr:
     metrics:
       include:
         match_type: expr
         expressions:
           - Label("label1") == "text"
           - HasLabel("label2")

   filter/ottl:
     metrics:
       metric:
         - 'name == "a_name"'
      datapoint:
         - 'attributes["attributename"] == "value"'

Filter logs
^^^^^^^^^^^^^^^^^^^^^

You can exclude or include logs using resource attributes or OTTL conditions. For example:

.. code-block:: yaml

   filter/mixed:
     logs:
       include:
         match_type: strict
         resource_attributes:
           - key: should_include
             value: "true"
       exclude:
         match_type: regexp
         resource_attributes:
           - key: host.name
             value: banned_host_.*

   filter/severity:
     logs:
       exclude:
         match_type: strict
         severity_texts:
           - "DEBUG"
           - "DEBUG2"
           - "DEBUG3"
           - "DEBUG4"
       include:
         match_type: regexp
         severity_texts:
           - "INFO[2-4]?"

   filter/recordattributes:
     logs:
       exclude:
         match_type: strict
         record_attributes:
           - key: should_exclude
             value: "true"

   filter/includeexclude:
     logs:
       include:
         severity_number:
           min: "INFO"
           match_undefined: true
      exclude:
         severity_number:
           min: "ERROR"

   filter/ottl:
     logs:
       log_record:
         - 'attributes["test"] == "pass"'

Filter Kubernetes elements
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can exclude or include Kubernetes elements, such as containers, pods, nodes, namespaces, or clusters, with the following configuration:

.. code-block:: yaml 

  agent:
    config:
      processors:
        # Exclude specific metrics from containers named 'containerXName' or 'containerYName'
        filter/exclude_metrics_from_container:
          metrics:
            exclude:
              match_type: regexp
              resource_attributes:
                - key: k8s.container.name
                  value: '^(containerXName|containerYName)$'
        
        # Exclude logs from pods named 'podNameX'
        filter/exclude_logs_from_pod:
          logs:
            exclude:
              match_type: regexp
              resource_attributes:
                - key: k8s.pod.name
                  value: '^(podNameX)$'
        
        # Exclude logs from nodes named 'nodeNameX'
        filter/exclude_logs_from_node:
          logs:
            exclude:
              match_type: regexp
              resource_attributes:
                - key: k8s.node.name
                  value: '^(nodeNameX)$'
        
        # Exclude spans from traces for services housed in containers named 'containerXName' or 'containerYName'
        filter/exclude_spans_from_traces_from_container:
          spans:
            exclude:
              match_type: regexp
              attributes:
                - key: k8s.container.name
                  value: '^(containerXName|containerYName)$'
        
        # Exclude all telemetry data (metrics, logs, traces) from a namespace named 'namespaceX'
        filter/exclude_all_telemetry_data_from_namespace:
          logs:
            exclude:
              match_type: regexp
              resource_attributes:
                - key: k8s.namespace.name
                  value: '^(namespaceX)$'
          metrics:
            exclude:
              match_type: regexp
              resource_attributes:
                - key: k8s.namespace.name
                  value: '^(namespaceX)$'
          traces:
            span:
              - 'attributes["k8s.namespace.name"] != "namespaceX"'
        
        # Exclude metrics from a cluster named 'clusterX'
        filter/exclude_metrics_from_cluster:
          metrics:
            exclude:
              match_type: regexp
              resource_attributes:
                - key: k8s.cluster.name
                  value: '^(clusterX)$'

After setting up the processors, configure the pipelines:

.. code-block:: yaml 
  
      # Define the data processing pipelines for logs, metrics, and traces
      service:
        pipelines:
          logs:
            processors:
              - memory_limiter
              - k8sattributes
              - filter/logs
              - batch
              - resourcedetection
              - resource
              - resource/logs
              - filter/exclude_logs_from_pod
              - filter/exclude_logs_from_node

.. _ottl-syntax:

Drop telemetry using OTTL conditions
-------------------------------------------------

You can use the OpenTelemetry Transformation Language (OTTL) to define filtering conditions with more detail. Matching telemetry is dropped (excluded).

In OTTL, each telemetry type or context has its own fields. The following example shows all available OTTL contexts:

.. code-block:: yaml

   processors:
     filter:
        traces:
          span:
            - 'attributes["attribute.label"] == "attribute_value"'
            - 'resource.attributes["host.name"] == "localhost"'
          # Checked only if `span` is not dropped 
          spanevent:
            - 'attributes["label"] == true'
            - 'IsMatch(name, ".*http.*") == false'
           # If all span events are dropped, the span is dropped
          metrics:
            metric:
              - 'name == "metric.name" and attributes["label"] == "value"'
              - 'type == METRIC_DATA_TYPE_HISTOGRAM'
            # Checked only if `metric` is not dropped 
            datapoint:
              - 'metric.type == METRIC_DATA_TYPE_SUMMARY'
              - 'resource.attributes["service.name"] == "my_service_name"'
             # If all datapoints are dropped, the metric is dropped 
          logs:
            log_record:
              - 'IsMatch(body, ".*token.*") == true'
              - 'severity_number < SEVERITY_NUMBER_WARN'

For more information on OTTL functions and syntax, see:

- OTTL Syntax: :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/README.md`
- OTTL Functions: :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs`
- OTTL Contexts: :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/contexts`

.. _filter-processor-settings:

Settings
======================

The following table shows the configuration options for the filter processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/filter.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
