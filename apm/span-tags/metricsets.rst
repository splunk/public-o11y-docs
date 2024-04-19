.. _apm-metricsets:

******************************
Learn about MetricSets in APM
******************************

.. meta::
   :description: Learn about MetricSets in Splunk Observability Cloud. MetricSets are metrics for traces and spans in Splunk APM.

MetricSets are key indicators, such as request rate, error rate, and durations, calculated based on your traces and spans in Splunk APM. There are 2 categories of MetricSets: Troubleshooting MetricSets (TMS), used for high-cardinality troubleshooting, and Monitoring MetricSets (MMS), used for real-time monitoring.

Monitoring MetricSets are similar to the metric time series (MTS) used in Splunk Infrastructure Monitoring to populate charts and generate alerts. See :ref:`metric-time-series` to learn more. MetricSets are MTS that are specific to Splunk APM.

.. _troubleshooting-metricsets:

Troubleshooting MetricSets
==========================

Troubleshooting MetricSets (TMS) are metric time series (MTS) you can use for troubleshooting high-cardinality identities in APM. You can also use TMS to make historical comparisons across spans and workflows. You can index span tags and processes to generate TMS.

Splunk APM indexes and generates Troubleshooting MetricSets for several span tags by default. For more details about each of these tags, see :ref:`apm-default-span-tags`. You can't modify or stop APM from indexing these span tags. 

You can also create custom TMS by indexing specific span tags and processes. To learn how to index span tags and processes to generate new Troubleshooting MetricSets, see :ref:`apm-index-span-tags`.

Available TMS metrics
-----------------------
Every Troubleshooting MetricSet generates the following metrics, known as request, error, and duration (RED) metrics. The RED metrics appear when you select a service in the service map. See :ref:`service-map` to learn more.

- Request rate
- Error rate
- Root cause error rate
- p50, p90, and p99 latency

The measurement precision of Troubleshooting MetricSets is 10 seconds. Splunk APM reports quantiles from a distribution of metrics for each 10-second reporting window. 

Where can I use TMS within Splunk APM?
----------------------------------------

TMS appear on the service map and in Tag Spotlight. You can use TMS to filter the service map and create breakdowns across the values of a given indexed span tag or process. 

See :ref:`apm-service-map` and :ref:`apm-tag-spotlight`.

TMS retention period
-----------------------------------

Splunk Observability Cloud retains TMS for the same amount of time as raw traces. By default, the retention period is 8 days.

For more details about Troubleshooting MetricSets, see :ref:`apm-index-tag-tips`. 

.. _monitoring-metricsets:

Monitoring MetricSets
=====================

Monitoring MetricSets are metric time series (MTS) that power the real-time monitoring capabilities in Splunk APM, including charts and dashboards. MMS power the real-time APM landing page and the dashboard view. MMS are also the metrics that detectors monitor and use to generate alerts. 

MMS are available for a specific endpoint or for the aggregate of all endpoints in a service.

Endpoint-level MMS reflect the activity of a single endpoint in a service, while service-level MMS aggregate the activity of all of the endpoints in the service. MMS are limited to spans where the ``span.kind = SERVER`` or ``span.kind = CONSUMER``.

Spans might lack a ``kind`` value, or have a different ``kind`` value, in the following situations:

* The span originates in self-initiating operations or inferred services
* An error in instrumentation occurs.

Available MMS metrics and dimensions
----------------------------------------

MMS are available for the following APM components:

- service.request
- spans
- traces
- workflows (Workflow metrics are created by default when you create a Business Workflow. Custom MMS are not available for Business Workflows.)

Each MMS includes 6 metrics for each component. For histogram MMS, there is a single metric for each component. Use the histogram functions to access the specific histogram bucket you want to use.

For each metric, there is 1 metric time series (MTS) with responses ``sf_error: true`` or ``sf_error: false``.

.. list-table::
    :widths: 33 33 33
    :width: 100
    :header-rows: 1

    *   - Description
        - MMS
        - Histogram MMS
    *   - Request count
        - ``<component>.count``
        - ``<component>`` with a ``count`` function
    *   - Minimum request duration
        - ``<component>.duration.ns.min`` 
        - ``<component>`` with a ``min`` function 
    *   - Median request duration
        - ``<component>.duration.ns.median`` 
        - ``<component>`` with a ``median`` function
    *   - Percentile request duration
        - ``<component>.duration.ns.p90`` 
        - ``<component`` with a ``percentile`` function
    *   - Percentile request duration
        - ``<component>.duration.ns.p99`` 
        - ``<component>`` with a ``percentile`` function
    *   - Maximum request duration
        - ``<component>.duration.ns.max`` 
        - ``<component>`` with a ``max`` function

Each MMS has a set of dimensions you can use to monitor and alert on service performance. 

.. _service-mms: 

Service dimensions
---------------------------------
* ``sf_environment``
* ``sf_service``
* ``sf_error``

.. _endpoint-mms:

Span dimensions
----------------------------------------------

* ``sf_environment``
* ``sf_service``
* ``sf_operation``
* ``sf_kind``
* ``sf_error``
* ``sf_httpMethod``, where relevant

Trace dimensions
---------------------------------
* ``sf_environment``
* ``sf_service``
* ``sf_operation``
* ``sf_httpMethod``
*  ``sf_error``

Workflow dimensions
---------------------------------

Workflow metrics and dimensions are created by default when you create a Business Workflow. 

* ``sf_environment``
* ``sf_workflow``
* ``sf_error``

What is the MMS retention period?
-----------------------------------

Splunk Observability Cloud stores MMS for 13 months by default.

Comparing Monitoring MetricSets and Troubleshooting MetricSets
=================================================================

Because endpoint-level and service-level MMS include a subset of the TMS metrics, you might notice that metric values for a service are different depending on the context in Splunk APM. This is because MMS are the basis of the dashboard view, and MMS can only have a ``kind`` of ``SERVER`` or ``CONSUMER``. In contrast, TMS are the basis of the troubleshooting and Tag Spotlight views, and TMS aren't restricted to specific metrics. For example, values for ``checkout`` service metrics displayed in the host dashboard might be different from the metrics displayed in the service map because there are multiple span ``kind`` values associated with this service that the MMS that power the dashboard don't monitor.

To compare MMS and TMS directly, restrict your TMS to endpoint-only data by filtering to a specific endpoint. You can also break down the service map by endpoint.