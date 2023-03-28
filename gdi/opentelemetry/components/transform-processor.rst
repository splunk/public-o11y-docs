.. _transform-processor:

*************************
Transform processor
*************************

.. meta::
      :description: Use the transform processor to modify traces, metrics, or logs before exporting telemetry to Splunk Observability Cloud. Read on to learn how to configure the component.

The transform processor is an OpenTelemetry Collector component that modifies matching spans, metrics, or logs through statements. Use cases include, among others, converting metrics to a different type, replacing or deleting keys, and setting fields depending on predefined conditions.

Statements are functions of the OpenTelemetry Transformation Language (OTTL) and are applied to telemetry following their order in the list. The transform processor includes additional functions for converting metric types. Statements transform data according to the OTTL context you define, for example Span or DataPoint. 

The transform processor supports the following contexts:

.. list-table::
   :width: 100%
   :widths: 20 80
   :header-rows: 1

   * - Signal
     - Supported contexts
   * - Traces
     - ``resource`` → ``scope`` → ``span`` → ``spanevent``
   * - Metrics
     - ``resource`` → ``scope`` → ``metric`` → ``datapoint``
   * - Logs
     - ``resource`` → ``scope`` → ``logs``

Statements can transform telemetry of a higher context. For example, statements applied to a data point can access the metric and resource of the data point. Access to lower contexts isn't possible; for example, you can't use a span statement to transform single span events. As a general rule, associate statements to the context you want to transform.

.. caution:: Modifying telemetry might have unintended consequences, such as orphaned spans or logs, identity conflicts, and wrong metric conversions. Always test transformations before releasing them in a production environment.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the transform processor. To activate the transform processor for a pipeline, add ``transform`` to the ``processors`` section of the configuration. For example:

.. code-block:: yaml

   transform:
     error_mode: ignore
     # Statements can be trace, metric, or log
     <trace|metric|log>_statements:
       - context: <context>
         statements:
           - <statement>
           - <statement>
           - <statement>
        - context: <context>
           statements:
           - <statement>
           - <statement>
           - <statement>

You can then add the transform processor to any compatible pipeline. For example:

.. code-block:: yaml
   :emphasize-lines: 6, 14, 22

   service:
     pipelines:
       traces:
         receivers: [jaeger, otlp, smartagent/signalfx-forwarder, zipkin]
         processors:
         - transform
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [sapm, signalfx]
       metrics:
         receivers: [hostmetrics, otlp, signalfx, smartagent/signalfx-forwarder]
         processors:
         - transform
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [signalfx]
       logs:
         receivers: [fluentforward, otlp]
         processors:
         - transform
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [splunk_hec]

The ``error_mode`` field describes how the processor reacts to errors when processing statements:

* ``error_mode: ignore`` tells the processor to ignore errors and continue execution. This is the default error mode.
* ``error_mode: propagate`` tells the processor to return errors. The Collector drops the payload as a result.

For more information on OTTL functions and syntax, see:

- OTTL Syntax: :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/README.md`
- OTTL Functions: :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs`
- OTTL Contexts: :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/contexts`

Sample configurations
----------------------

The following sample configurations show how to perform different transformations on spans, metrics, and logs.

Transform Kubernetes object logs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to edit logs received using the ``k8sobjects`` receiver. Shortening logs can be helpful when visualizing objects in a dashboard or setting up alerts.

.. code-block:: yaml

   transform:
     error_mode: ignore
     log_statements:
       - context: log
         statements:
           - replace_all_patterns(attributes, "(object\.)(.*\.)", "object.")

Edit resources and spans for size
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to edit resources and spans by limiting the number of attributes and truncating them to 4,096 characters. The ``resource`` statement drops all keys except the ones indicated in ``keep_keys``.

.. code-block:: yaml

   transform:
     error_mode: ignore
     trace_statements:
        - context: resource
          statements:
            # Only keep the following keys
            - keep_keys(attributes, ["service.name", "service.namespace", "cloud.region", "process.command_line"])
            - limit(attributes, 100, [])
            - truncate_all(attributes, 4096)
        - context: span
          statements:
            - limit(attributes, 100, [])
            - truncate_all(attributes, 4096)

Convert datapoints to different types
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to convert datapoints to different types depending on their metric names using the functions included in the transform processor.

.. code-block:: yaml

   transform:
     metric_statements:
       - context: metric
         statements:
           - set(description, "Sum") where type == "Sum"
       - context: datapoint
         statements:
           - convert_sum_to_gauge() where metric.name == "system.processes.count"
           - convert_gauge_to_sum("cumulative", false) where metric.name == "prometheus_metric"

.. _transform-processor-settings:

Settings
======================

The following table shows the configuration options for the attributes processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/transform.yaml"></div>

Metrics functions
----------------------

You can apply the following functions to metric contexts:

* ``convert_sum_to_gauge``: Converts a metric of type sum to type gauge. Retains data points.
* ``convert_gauge_to_sum``: Converts a metric of type gauge to type sum. Retains data points. Takes aggregation temporality (``cumulative`` or ``delta``) and monotonicity (boolean) as arguments.
* ``convert_summary_count_val_to_sum``: Creates a metric of type sum from the count value of a summary. Takes aggregation temporality (``cumulative`` or ``delta``) and monotonicity (boolean) as arguments. The name of the new metric is in the form ``<summary metric name>_count``. Time stamp, attributes, and description are preserved.
* ``convert_summary_sum_val_to_sum``: Creates a metric of type sum from the count value of a summary. Takes aggregation temporality (``cumulative`` or ``delta``) and monotonicity (boolean) as arguments. The name of the new metric is in the form ``<summary metric name>_sum``. Time stamp, attributes, and description are preserved.

.. caution:: Using conversion functions might break metric semantics.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
