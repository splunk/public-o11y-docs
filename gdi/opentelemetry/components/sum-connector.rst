.. _sum-connector:

****************************
Sum connector
****************************

.. meta::
      :description: Sums attribute values from spans, span events, metrics, data points, and log records.

The Splunk Distribution of the OpenTelemetry Collector uses the Sum connector to sum attribute values from spans, span events, metrics, data points, and log records.

As a receiver, the supported pipeline types are ``metrics``, ``traces`` and ``logs``. As an exporter, the supported pipeline type is ``metrics``.  See :ref:`otel-data-processing` for more information.

.. note:: Values found within an attribute are converted into a float regardless of their original type before being summed and output as a metric value. Non-convertible strings are dropped and not included.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the connector as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------------------

To activate the connector, add ``sum`` to the ``connectors`` section of your configuration file. 

For example:

.. code-block:: yaml

  connectors:
    sum:

To complete the configuration, add the connector in the ``service`` section of your configuration file according to the pipelines you want to use, for example:

.. code-block:: yaml

  service:
    pipelines:
      metrics/sum:
         receivers: [sum]
      traces:
         exporters: [sum]

Configuration options
----------------------------------

The following settings are required:

* Telemetry type. Nested below the ``sum:`` connector declaration. Can be any of ``spans`` or ``spanevents`` for ``traces``, ``datapoints`` for ``metrics``, or ``logs``.

  * In :ref:`sum-connector-example-sum`, it's declared as ``spans``.

* Metric name. Nested below the telemetry type; this is the metric name the sum connector will output summed values to. 

  * In :ref:`sum-connector-example-sum`, it's declared as ``my.example.metric.name``.

* ``source_attribute``. A specific attribute to search for within the source telemetry being fed to the connector. This attribute is where the connector looks for numerical values to sum into the output metric value. 

  * In :ref:`sum-connector-example-sum`, it's declared as ``attribute.with.numerical.value``. 

The following settings can be optionally configured:

* ``conditions``. You can use OTTL syntax to provide conditions for processing incoming telemetry. Conditions are ORed together, so if any condition is met the attribute's value is included in the resulting sum. For more information see :new-page:`OTTL grammar <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/LANGUAGE.md>` in GitHub.

* ``attributes``. Declaration of attributes to include. Any of these attributes found will generate a separate sum for each set of unique combination of attribute values and output as its own datapoint in the metric time series.

  * ``key``. Required for ``attributes``. The attribute name to match against.

  * ``default_value``. Optional for ``attributes``. A default value for the attribute when no matches are found. The ``default_value`` value can be a string, integer, or float.

.. _sum-connector-example-sum:

Configuration example: Sum attribute values
--------------------------------------------

This example configuration sums numerical values found within the attribute ``attribute.with.numerical.value`` of any span telemetry routed to the connector and outputs a metric time series with the name ``my.example.metric.name`` with those summed values.

.. code-block:: yaml

  receivers:
    foo:
  connectors:
    sum:
      spans:
        my.example.metric.name:
          source_attribute: attribute.with.numerical.value

  exporters:
    bar:

  service:
    pipelines:
      metrics/sum:
         receivers: [sum]
         exporters: [bar]
      traces:
         receivers: [foo]
         exporters: [sum]

Configuration example: Check payment logs
--------------------------------------------

In this example the Sum connector ingests logs and creates an output metric named ``checkout.total`` with numerical values found in the ``source_attribute`` ``total.payment``. It also checks any incoming log telemetry for values present in the attribute ``payment.processor`` and creates a datapoint within the metric time series for each unique value. 

It also makes sure that:

* The attribute ``total.payment`` is not ``NULL``. 
* Any logs without values in ``payment.processor`` are included in a datapoint with the ``default_value`` of ``unspecified_processor``.

.. code-block:: yaml

  receivers:
    foo:
  connectors:
    sum:
      logs:
        checkout.total:
          source_attribute: total.payment
          conditions:
            - attributes["total.payment"] != "NULL"
          attributes:
            - key: payment.processor
              default_value: unspecified_processor
  exporters:
    bar:

  service:
    pipelines:
      metrics/sum:
         receivers: [sum]
         exporters: [bar]
      logs:
         receivers: [foo]
         exporters: [sum]

Logs to metrics
--------------------------------------------

For log-to-metrics connection, if your logs contain all values in their body rather than in attributes, use a :ref:`transform-processor` in your pipeline to upsert parsed key/value pairs into attributes attached to the log.

For example, for a JSON payload:

.. code-block:: yaml

  processors:
    transform/logs:
      log_statements:
        - context: log
          statements:
            - merge_maps(attributes, ParseJSON(body), "upsert")

.. _sum-connector-troubleshooting:

Troubleshooting
======================

.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>






