.. _metrics-transform-processor:

***********************************
Metrics transform processor
***********************************

.. meta::
      :description: Renames metrics, and adds, renames, or deletes label keys and values.

The Splunk Distribution of the OpenTelemetry Collector uses the Metrics transform processor to perform the following tasks:

* Rename metrics.
* Add, rename, or delete label keys and values.
* Scale and aggregate metrics across labels or label values. 

The processor only supports renames and aggregations within a batch of metrics. It doesn't do any aggregation across batches, so do not use it to aggregate metrics from multiple sources, such as multiple nodes or clients.

For the complete list of supported operations, see :ref:`metrics-transform-processor-operations`.

.. note:: 
  
  Use the Attributes processor to delete, hash or extract the attributes of spans, metrics, or logs through actions. Use cases include obfuscating sensitive information, copying values to new keys, and backfilling attributes. See :ref:`attributes-processor`.

  To include or exclude whole spans, logs, or metrics, use the filter processor. See :ref:`filter-processor`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``metricstransform`` processor as described in the next section.
3. Restart the Collector.

Sample configuration
----------------------

To activate the resource processor, add ``metricstransform`` to the ``processors`` section of your configuration file. 

For example:

.. code-block:: yaml

  processors:
    metrics_transform:

To complete the configuration, include the processor in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code-block:: yaml

  service:
    pipelines:
      metrics:
        processors: [metricstransform]

.. _metrics-transform-processor-config-example:

Configuration example
----------------------------------

To configure the processor you must specify the list of transformations and operations you want to apply to your metrics. Later transformations or operations reference the result of previous transformations or operations.

.. code-block:: yaml

  processors:
    metricstransform:
    # transforms is a list of transformations with each element transforming a metric selected by metric name
      transforms:
      
          # SPECIFY WHICH METRIC(S) TO MATCH
        
          # include specifies the metric name used to determine which metric(s) to operate on
        - include: <metric_name>
          
          # match_type specifies whether the include name should be used as a strict match or regexp match, default = strict
          match_type: {strict, regexp}
    
          # experimental_match_labels specifies the label set against which the metric filter will work. If experimental_match_labels is specified, transforms will only be applied to those metrics which 
          # have the provided metric label values. This works for both strict and regexp match_type. This is an experimental feature.
          experimental_match_labels: {<label1>: <label_value1>, <label2>: <label_value2>}
        
          # SPECIFY THE ACTION TO TAKE ON THE MATCHED METRIC(S)
        
          # action specifies if the operations (specified below) are performed on metrics in place (update), on an inserted clone (insert), or on a new combined metric (combine)
          action: {update, insert, combine}
        
          # SPECIFY HOW TO TRANSFORM THE METRIC GENERATED AS A RESULT OF APPLYING THE ABOVE ACTION
        
          # new_name specifies the updated name of the metric; if action is insert or combine, new_name is required
          new_name: <new_metric_name_inserted>
        
          # aggregation_type defines how combined data points will be aggregated; if action is combine, aggregation_type is required
          aggregation_type: {sum, mean, min, max}
        
          # submatch_case specifies the case that should be used when adding label values based on regexp submatches when performing a combine action; leave blank to use the submatch value as is
          submatch_case: {lower, upper}
        
          # operations contain a list of operations that will be performed on the resulting metric(s)
          operations:
              # action defines the type of operation that will be performed, see examples below for more details
            - action: {add_label, update_label, delete_label_value, toggle_scalar_data_type, experimental_scale_value, aggregate_labels, aggregate_label_values}
              # label specifies the label to operate on
              label: <label>
              # new_label specifies the updated name of the label; if action is add_label, new_label is required
              new_label: <new_label>
              # aggregated_values contains a list of label values that will be aggregated; if action is aggregate_label_values, aggregated_values is required
              aggregated_values: [values...]
              # new_value specifies the updated name of the label value; if action is add_label or aggregate_label_values, new_value is required
              new_value: <new_value>
              # label_value specifies the label value for which points should be deleted; if action is delete_label_value, label_value is required
              label_value: <label_value>
              # label_set contains a list of labels that will remain after aggregation; if action is aggregate_labels, label_set is required
              label_set: [labels...]
              # aggregation_type defines how data points will be aggregated; if action is aggregate_labels or aggregate_label_values, aggregation_type is required
              aggregation_type: {sum, mean, min, max}
              # experimental_scale specifies the scalar to apply to values
              experimental_scale: <scalar>
              # value_actions contain a list of operations that will be performed on the selected label
              value_actions:
                  # value specifies the value to operate on
                - value: <current_label_value>
                  # new_value specifies the updated value
                  new_value: <new_label_value>

See :ref:`metrics-transform-processor-operations` to understand the operations, and see some examples.

.. _metrics-transform-processor-operations:

Available operations
======================

The processor can perform the following operations:

* Rename metrics.	For example, rename ``system.cpu.usage``to ``system.cpu.usage_time``.
* Add labels. For example, you can add the new label ``identifier`` with value ``1`` to all points.
* Rename label keys. For example, rename the label ``state`` to ``cpu_state``.
* Rename label values. For example,	in the label ``state``, you can rename the value ``idle`` to ``-``.
* Delete data points. For example, delete all points where the label ``state`` has value ``idle``.
* Toggle data type. For example, you can change ``int`` data points to ``double`` data points
* Scale value. For example, multiply values by 1000 to convert from seconds to milliseconds.
* Aggregate across label sets. For example, you can retain only the label ``state``, and average all points with the same value for this label.
* Aggregate across label values. For example, for the label ``state``, you can sum points where the value is ``user`` or ``system`` into ``used = user + system``.

The following applies:

* You can only apply operations to one or more metrics using a ``strict`` or ``regexp`` filter.

* With the ``action`` property you can:

  * Update your metrics in-place (``update``).

  * Copy and update the copied metrics (``insert``).

  * Combine your metrics into a newly inserted metric that is generated by combining all data points from the set of matching metrics into a single metric (``combine``). The original matching metrics are also removed.

* When renaming metrics, capturing groups from the ``regexp`` filter will be expanded.

* When adding or updating a label value, ``{{version}}`` will be replaced with your Collector's instance version number.

.. _metrics-transform-example-create-new-metric:

Example: Create a new metric from an existing metric
--------------------------------------------------------------------

To create a new metric from an existing metric, apply this configuration:

.. code-block:: yaml

  # create host.cpu.utilization from host.cpu.usage
  include: host.cpu.usage
  action: insert
  new_name: host.cpu.utilization
  operations:
    ...

.. _metrics-transform-example-create-new-metric-labels:

Example: Create a new metric from an existing metric with matching label values
--------------------------------------------------------------------

To create a new metric from an existing metric with matching label values, apply this configuration:

.. code-block:: yaml

  # create host.cpu.utilization from host.cpu.usage where we have metric label "container=my_container"
  include: host.cpu.usage
  action: insert
  new_name: host.cpu.utilization
  match_type: strict
  experimental_match_labels: {"container": "my_container"}
  operations:
    ...

.. _metrics-transform-example-create-new-metric-label-regexp:

Example: Create a new metric from an existing metric with matching label values with regexp
--------------------------------------------------------------------

To create a new metric from an existing metric with matching label values with regexp, apply this configuration:

.. code-block:: yaml

  # create host.cpu.utilization from host.cpu.usage where we have metric label pod with non-empty values
  include: host.cpu.usage
  action: insert
  new_name: host.cpu.utilization
  match_type: regexp
  experimental_match_labels: {"pod": "(.|\\s)*\\S(.|\\s)*"}
  operations:
    ...

.. _metrics-transform-example-rename:

Example: Rename a metric
--------------------------------------------------------------------

To rename a metric, apply this configuration:

.. code-block:: yaml

  # rename system.cpu.usage to system.cpu.usage_time
  include: system.cpu.usage
  action: update
  new_name: system.cpu.usage_time

.. _metrics-transform-example-create-rename-substitution:

Example: Rename multiple metrics using Substitution
--------------------------------------------------------------------

To rename multiple metrics using Substitution, apply this configuration:

.. code-block:: yaml

  # rename all system.cpu metrics to system.processor.*.stat
  # instead of regular $ use double dollar $$. Because $ is treated as a special character.
  # wrap the group name/number with braces
  include: ^system\.cpu\.(.*)$$
  match_type: regexp
  action: update
  new_name: system.processor.$${1}.stat                  

.. _metrics-transform-example-add-label:

Example: Add a label
--------------------------------------------------------------------

To add a label, apply this configuration:

.. code-block:: yaml

  # for system.cpu.usage_time, add label `version` with value `opentelemetry collector vX.Y.Z` to all points
  include: system.cpu.usage
  action: update
  operations:
    - action: add_label
      new_label: version
      new_value: opentelemetry collector {{version}}

.. _metrics-transform-example-add-label-multiple:

Example: Add a label to multiple metrics
--------------------------------------------------------------------

To add a label to multiple metrics, apply this configuration:

.. code-block:: yaml

  # for all system metrics, add label `version` with value `opentelemetry collector vX.Y.Z` to all points
  include: ^system\.
  match_type: regexp
  action: update
  operations:
    - action: add_label
      new_label: version
      new_value: opentelemetry collector {{version}}

.. _metrics-transform-example-rename-label:

Example: Rename labels
--------------------------------------------------------------------

To rename labels, apply this configuration:

.. code-block:: yaml

  # for system.cpu.usage_time, rename the label state to cpu_state
  include: system.cpu.usage
  action: update
  operations:
    - action: update_label
      label: state
      new_label: cpu_state      

.. _metrics-transform-example-rename-labels-multiple:

Example: Rename labels for multiple metrics
--------------------------------------------------------------------

To rename labels for multiple metrics, apply this configuration:

.. code-block:: yaml

  # for all system.cpu metrics, rename the label state to cpu_state
  include: ^system\.cpu\.
  action: update
  operations:
    - action: update_label
      label: state
      new_label: cpu_state      

.. _metrics-transform-example-rename-label-value:

Example: Rename label values
--------------------------------------------------------------------

To rename label values, apply this configuration:

.. code-block:: yaml

  # rename the label value slab_reclaimable to sreclaimable, slab_unreclaimable to sunreclaimable
  include: system.memory.usage
  action: update
  operations:
    - action: update_label
      label: state
      value_actions:
        - value: slab_reclaimable
          new_value: sreclaimable
        - value: slab_unreclaimable
          new_value: sunreclaimable             

.. _metrics-transform-example-delete-label-value:

Example: Delete by label value
--------------------------------------------------------------------

To delete by label value, apply this configuration:

.. code-block:: yaml

  # deletes all data points with the label value 'idle' of the label 'state'
  include: system.cpu.usage
  action: update
  operations:
    - action: delete_label_value
      label: state
      label_value: idle      

.. _metrics-transform-example-toggle-type:

Example: Toggle the data type
--------------------------------------------------------------------

To toggle the data type, apply this configuration:

.. code-block:: yaml

  # toggle the datatype of cpu usage from int (the default) to double
  include: system.cpu.usage
  action: update
  operations:
    - action: toggle_scalar_data_type

.. _metrics-transform-example-scale-values:

Example: Scale values
--------------------------------------------------------------------

To scale values, apply this configuration:

.. code-block:: yaml

  # experimental_scale CPU usage from seconds to milliseconds
  include: system.cpu.usage
  action: update
  operations:
    - action: experimental_scale_value
      experimental_scale: 1000      

.. _metrics-transform-example-aggregate-labels:

Example: Aggregate labels
--------------------------------------------------------------------

To aggregate labels, apply this configuration:

.. code-block:: yaml

  # aggregate away all labels except `state` using summation
  include: system.cpu.usage
  action: update
  operations:
    - action: aggregate_labels
      label_set: [ state ]
      aggregation_type: sum      

.. _metrics-transform-example-aggregate-label-values:

Example: Aggregate label values
--------------------------------------------------------------------

To aggregate label values, apply this configuration:

.. code-block:: yaml

  # aggregate data points with state label value slab_reclaimable & slab_unreclaimable using summation into slab
  include: system.memory.usage
  action: update
  operations:
    - action: aggregate_label_values
      label: state
      aggregated_values: [ slab_reclaimable, slab_unreclaimable ]
      new_value: slab 
      aggregation_type: sum             

.. _metrics-transform-example-combine-metrics:

Example: Combine metrics
--------------------------------------------------------------------

To combine metrics, apply this configuration:

.. code-block:: yaml

  # convert a set of metrics for each http_method into a single metric with an http_method label, i.e.
  #
  # Web Service (*)/Total Delete Requests     iis.requests{http_method=delete}
  # Web Service (*)/Total Get Requests     >  iis.requests{http_method=get}
  # Web Service (*)/Total Post Requests       iis.requests{http_method=post}
  include: ^Web Service \(\*\)/Total (?P<http_method>.*) Requests$
  match_type: regexp
  action: combine
  new_name: iis.requests
  submatch_case: lower
  operations:
    ...      

.. _metrics-transform-example-group-metrics:

Example: Group Metrics
--------------------------------------------------------------------

To group Metrics, apply this configuration:

.. code-block:: yaml

.. _metrics-transform-example-create-new-metric:

Example: Create a new metric from an existing metric
--------------------------------------------------------------------

To create a new metric from an existing metric, apply this configuration:

.. code-block:: yaml

  # Group metrics from one single ResourceMetrics and report them as multiple ResourceMetrics.
  # 
  # ex: Consider pod and container metrics collected from Kubernetes. Both the metrics are recorded under under one ResourceMetric
  # applying this transformation will result in two separate ResourceMetric packets with corresponding resource labels in the resource headers
  #
  # instead of regular $ use double dollar $$. Because $ is treated as a special character.

  - include: ^k8s\.pod\.(.*)$$
    match_type: regexp
    action: group
    group_resource_labels: {"resouce.type": "k8s.pod", "source": "kubelet"}
  - include: ^container\.(.*)$$
    match_type: regexp
    action: group
    group_resource_labels: {"resouce.type": "container", "source": "kubelet"}      

.. _metrics-transform-processor-settings:

Settings
======================

The following table shows the configuration options for the ``metricstransform`` processor:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/metricstransform.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst


