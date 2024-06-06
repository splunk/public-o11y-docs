.. _probabilistic-sampler-processor:

***********************************
Probabilistic sampler processor
***********************************

.. meta::
      :description: Supports several modes of sampling for spans and log records.

The Probabilistic sampler processor supports several modes of sampling for spans and log records. Sampling is performed on a per-request basis, considering individual items statelessly. The supported pipeline types are ``traces`` and ``logs``. See :ref:`otel-data-processing` for more information.

For trace spans, the processor supports probabilistic sampling based on a configured sampling percentage applied to the TraceID. In addition, you can use the ``sampling.priority`` setting to force the sampler to apply either 0% or 100% sampling.

.. note:: For whole trace sampling, see :ref:`tail-sampling-processor`.

For log records, you can configure the processor to use the embedded TraceID and follow the same logic applied to spans. When TraceID is not defined, you can configure the sampler to apply hashing to a selected log record attribute. It also supports sampling priority.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``probabilistic_sampler`` processor as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

Sample 15% of log records according to trace ID using the OpenTelemetry specification:

.. code-block:: yaml

  processors:
    probabilistic_sampler:
      sampling_percentage: 15

Sample logs according to their logID attribute:

.. code-block:: yaml

  processors:
    probabilistic_sampler:
      sampling_percentage: 15
      attribute_source: record # possible values: one of record or traceID
      from_attribute: logID # value is required if the source is not traceID

Give sampling priority to log records according to the attribute named priority:

.. code-block:: yaml

  processors:
    probabilistic_sampler:
      sampling_percentage: 15
      sampling_priority: priority      

To complete the configuration, include the processor in the ``traces`` or ``logs`` pipeline of the ``service`` section of your configuration file. For example:

.. code-block:: yaml

  service:
    pipelines:
      logs:
        processors: [probabilistic_sampler]

.. _probabilistic-sampler-config-options:

Configuration options
----------------------------------

The processor has the following configuration options:

* ``sampling_percentage``. Required. 32-bit floating point. Percentage at which items are sampled. If equal or greater than ``100``, it samples all items, ``0`` rejects all items.

* ``hash_seed``. Optional, ``0`` by default. 32-bit unsigned integer. An integer used to compute the hash algorithm. Note that all collectors for a given tier (for example, behind the same load balancer) must have the same ``hash_seed``.

* ``fail_closed``. Optional, ``true`` by default. Boolean. Whether to reject items with sampling-related errors.

Logs-specific configuration:

* ``attribute_source``. Optional, ``"traceID" ``by default. String. Defines where to look for the attribute in ``from_attribute``. The allowed values are ``traceID`` or ``record``.

* ``from_attribute``. Optional, void by default. String. The name of a log record attribute used for sampling purposes, such as a unique log record ID. The value of the attribute is only used if the trace ID is absent or if ``attribute_source`` is set to record.

* ``sampling_priority``. Optional, void by default. String. The name of a log record attribute used to set a different sampling priority from the ``sampling_percentage`` setting. If equal or greater than ``100``, it samples all log records, ``0`` rejects all log records.

Understand the processor
===============================

Consistency guarantee
----------------------------------

A consistent probability sampler is a sampler that supports independent sampling decisions for each span or log record in a group, for example by TraceID, while maximizing the potential for completeness as follows.

Consistent probability sampling requires that for any span in a given trace, if a sampler with lesser sampling probability selects the span for sampling, then the span will also be selected by a sampler configured with greater sampling probability.

Achieve complete sampling
----------------------------------

Consider these guidelines when deploying multiple collectors with different sampling probabilities in a system. For example, a collector serving frontend servers can be configured with smaller sampling probability than a collector serving backend servers, without breaking sub-trace completeness.

A trace is complete when all of its members are sampled. A "sub-trace" is complete when all of its descendents are sampled. Ordinarily, trace and logging SDKs configure parent-based samplers, which sample based on the context.

Results might be incomplete if:

* Non-root spans or logs make independent sampling decisions instead of using the parent-based approach, for example by using the ``TraceIDRatioBased`` sampler for a non-root span.

* A processor like this one samples spans and log records independently. 

To minimize this issue, be consistent. To use 1%, 10% and 50% probabilities in a consistent probability scheme, the 50% sampler must sample when the 10% sampler does, and the 10% sampler must sample when the 1% sampler does. You can configure a three-tier system with 1% sampling in the first tier, 10% sampling in the second tier, and 50% sampling in the bottom tier. In this configuration, 1% of traces will be complete, 10% of traces will be sub-trace complete at the second tier, and 50% of traces will be sub-trace complete at the third tier thanks to the consistency property.

.. caution:: To use consistent probability samplers safely with a mixture of probabilities and preserve sub-trace completeness, child spans and log records must be sampled with probability greater than or equal to the parent context.

Set sampling randomness
----------------------------------

To achieve consistency, sampling randomness is taken from a deterministic aspect of the input data: 

* For ``traces`` pipelines, the source of randomness is always the TraceID. 

* For ``logs`` pipelines, the source of randomness can be the TraceID or another log record attribute, if configured. 

  * If you set ``attribute_source`` to ``traceID``, TraceID is used. 

  * If you set ``attribute_source`` to ``record``, or if the TraceID field is absent, ``from_attribute`` is taken as the source of randomness, if configured.

.. _probabilistic-sampler-processor-priority:

Set sampling priority
----------------------------------

The sampling priority mechanism is an override that takes precedence over the probabilistic decision in all modes.

.. caution:: Sampling priority has different behaviors for logs and traces.

In ``traces`` pipelines, when the priority attribute is ``0``, the configured probability is modified to 0% and the item will not pass the sampler. When the priority attribute is non-zero the configured probability is set to 100%. The sampling priority attribute is not configurable and is called ``sampling.priority``.

In ``logs`` pipelines, when the priority attribute is ``0``, the configured probability is modified to 0%, and the item will not pass the sampler. Otherwise, the logs sampling priority attribute is interpreted as a percentage. If equal or greater than ``100``, it samples all log records. Use ``sampling_priority`` to configure the logs sampling priority attribute.

Sampling algorithm
----------------------------------

Hash seed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The hash seed method uses the FNV hash function applied to either a Trace ID for spans and log records, or to the value of a specified attribute, only for logs. The hashed value, presumed to be random, is compared against a threshold value that corresponds with the sampling percentage.

To enable this mode, either: 

* Set ``hash_seed`` to a value different to zero. 
* Sample log records with ``attribute_source`` set to ``record``.

In order for hashing to be consistent, all collectors for a given tier (for example, behind the same load balancer) must have the same ``hash_seed``. You can also leverage a different ``hash_seed`` at different collector tiers to support additional sampling requirements.

This mode uses 14 bits of sampling precision.

Error handling
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This processor considers it an error when the arriving data has no randomess. This includes conditions where the TraceID field is invalid, such as 16 zero bytes, and where the log record attribute source has zero bytes of information.

By default, if errors are detected the data is refused. To change this behavior and allow erroneous data to pass through the processor, set the ``fail_closed`` property to ``false``.

.. _probabilistic-sampler-processor-settings:

Settings
======================

The following table shows the configuration options for the ``probabilistic_sampler`` processor:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/probabilistic_sampler.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
