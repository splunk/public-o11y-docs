.. _cumulative-to-delta-processor:

*********************************
Cumulative to delta processor
*********************************

.. meta::
      :description: Use the resource processor to update, add, or delete resource attributes. Read on to learn how to configure the component.

The cumulative to delta processor is an OpenTelemetry Collector component that converts monotonic, cumulative sum, and histogram metrics to monotonic metrics with delta aggregation temporality. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

Converting metrics from cumulative to delta temporality is useful when sending cumulative histogram data because cumulative histograms are difficult to process in the platform. Since the processor is stateful, it works best when data is always sent to the same instance of the Collector. See :ref:`statefulness-delta-considerations`.

.. note:: Non-monotonic sums and exponential histograms are not supported.


Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the cumulative to delta processor as described in the next section.
3. Restart the Collector.

Sample configuration
----------------------

To activate the cumulative to delta processor, add ``cumulativetodelta`` to the ``processors`` section of your
configuration file, as shown in the following example:

.. code:: yaml

   processors:
      cumulativetodelta:
         include:
               metrics:
                  - <metric_1_name>
                  - <metric_2_name>
                  - <metric_n_name>
               match_type: strict
         exclude:
               metrics:
                  - ".*metric.*"
               match_type: regexp

.. note:: If you don't specify include or exclude lists, the processor converts all cumulative sum or histogram metrics to delta aggregation temporality.

To complete the configuration, include the receiver in any pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         processors: [cumulativetodelta]

.. _statefulness-delta-considerations:

Considerations about statefulness
-------------------------------------

Because the cumulative to delta processor calculates delta aggregation using previous values of metrics, it is accurate only if the metric is continuously sent to the same instance of the Collector. The cumulative to delta processor might not work as expected in deployments that use multiple collectors.


.. _resource-processor-settings:

Settings
======================

The following table shows the configuration options for the resource processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/cumulativetodelta.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
