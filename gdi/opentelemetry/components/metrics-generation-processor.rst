.. _metrics-generation-processor:

***********************************
Metrics generation processor
***********************************

.. meta::
      :description: Creates new metrics using existing metrics following a given rule.

The Splunk Distribution of the OpenTelemetry Collector uses the Metrics Generation processor to create new metrics using existing metrics following a given rule.

This processor currently supports the following two rule types for creating a new metric:

* ``calculate``. Creates a new metric from two existing metrics by applying one of the following arithmetic operations: ``add``, ``subtract``, ``multiply``, ``divide``, or ``percent``. 

  * For example, use it to calculate the ``pod.memory.utilization`` metric with the equation ``pod.memory.utilization`` = (``pod.memory.usage.bytes`` / ``node.memory.limit``. 

  * Learn more at :ref:`metrics-generation-processor-calculate`.

* ``scale``. Creates a new metric by scaling the value of an existing metric with a given constant number. 

  * For example, use it to convert ``pod.memory.usage`` metric values from Megabytes to Bytes by multiplying the existing metric's value by 1,048,576.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``metricsgeneration`` processor as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------------------

To activate the resource processor, add ``metricsgeneration`` to the ``processors`` section of your configuration file. Specify the configuration using a list of generation rules. Generation rules find the metrics which match the given metric names and apply the specified operation to those metrics. For example:

.. code-block:: yaml

  processors:
    metricsgeneration:
        # specify the metric generation rules
        rules:
              # Name of the new metric. This is a required field.
            - name: <new_metric_name>

              # Unit for the new metric being generated.
              unit: <new_metric_unit>

              # type describes how the new metric will be generated. It can be one of `calculate` or `scale`.  calculate generates a metric applying the given operation on two operand metrics. scale operates only on operand1 metric to generate the new metric.
              type: {calculate, scale}

              # This is a required field. This must be a gauge or sum metric.
              metric1: <first_operand_metric>

              # This field is required only if the type is "calculate". When required, this must be a gauge or sum metric.
              metric2: <second_operand_metric>

              # Operation specifies which arithmetic operation to apply. It must be one of the five supported operations.
              operation: {add, subtract, multiply, divide, percent}

To complete the configuration, include the processor in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code-block:: yaml

  service:
    pipelines:
      metrics:
        processors: [metricsgeneration]

.. _metrics-generation-processor-example-new-metrics:

Configuration example: Create a new metric using two existing metrics
------------------------------------------------------------------------------------------------------

This example creates the new metric ``pod.cpu.utilized`` dividing ``pod.cpu.usage`` and ``node.cpu.limit``.

.. code-block:: yaml

  rules:
      - name: pod.cpu.utilized
        type: calculate
        metric1: pod.cpu.usage
        metric2: node.cpu.limit
        operation: divide

.. _metrics-generation-processor-example-new-scaling:

Configuration example: Create a new metric scaling the value of an existing metric
------------------------------------------------------------------------------------------------------

This example creates the new metric ``pod.memory.usage.bytes`` from the metric ``pod.memory.usage.megabytes``.

.. code-block:: yaml

  rules:
      - name: pod.memory.usage.bytes
        unit: Bytes
        type: scale
        metric1: pod.memory.usage.megabytes
        operation: multiply
        scale_by: 1048576

.. _metrics-generation-processor-calculate:

Using the ``calculate`` rule
============================================

Keep in mind the following specific behaviors of the ``calculate`` metric generation rule:

* The created metric has the same type as the metric configured as the first metric.

* If the metric being created doesn't have any valid data points it will not be created. This ensures the processor doesn't emit empty new metrics.

* If you want to have metric calculations done on data points whose overlapping attributes match, enable the feature gate ``metricsgeneration.MatchAttributes``. This feature gate is disabled by default, meaning the value used for the second metric during the calculations is simply the first data point's value. 

  * To learn how to enable and disable feature gates, see :new-page:`Collector Feature Gates <https://github.com/open-telemetry/opentelemetry-collector/blob/main/featuregate/README.md>` in GitHub.

.. _metrics-generation-processor-settings:

Settings
======================

The following table shows the configuration options for the ``metricsgeneration`` processor:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/experimental_metricsgeneration.yaml"></div>

Troubleshooting
======================

.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>





