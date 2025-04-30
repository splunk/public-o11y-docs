.. _apm-metricsets:

******************************
Learn about MetricSets in APM
******************************

.. meta::
   :description: Learn about MetricSets in Splunk Observability Cloud. MetricSets are metrics for traces and spans in Splunk APM.

MetricSets are key performance indicators, like request rate, error rate, and request duration, that are calculated from traces and spans in Splunk APM. There are 2 categories of MetricSets: Troubleshooting MetricSets (TMS), used for high-cardinality troubleshooting, and Monitoring MetricSets (MMS), used for real-time monitoring. MetricSets are similar to the metric time series (MTS) used in Splunk Infrastructure Monitoring to populate charts and generate alerts. See :ref:`metric-time-series` to learn more. MetricSets are MTS that are specific to Splunk APM.

.. _monitoring-metricsets:

Monitoring MetricSets
=====================

Monitoring MetricSets (MMS) are metric time series (MTS) that power the monitoring capabilities in Splunk APM, including charts and dashboards. MMS power the APM landing page and the dashboard view. MMS are also the metrics that detectors monitor to generate alerts. 

MMS are available for a specific endpoint or for the aggregate of all endpoints in a service.

Endpoint-level MMS reflect the activity of a single endpoint in a service, while service-level MMS aggregate the activity of all of the endpoints in the service. MMS are created for spans where the ``span.kind`` has a value of ``SERVER`` or ``CONSUMER``.

Spans might lack a ``kind`` value, or have a different ``kind`` value, in the following situations:

* The span originates in self-initiating operations or inferred services
* An error in instrumentation occurs.

MMS retention period
-----------------------------------

Splunk Observability Cloud stores MMS for 13 months by default.

.. _default-mms:


Available default MMS metrics and dimensions
-----------------------------------------------

MMS are available for the APM components listed in the following table. Each MMS also has a set of dimensions you can use to monitor and alert on service performance. In addition to the following default MMS, you can create custom MMS to deep dive on your MMS. See :ref:`cmms`.

.. _service-mms: 
.. _inferred-service-mms-dimensions:
.. _endpoint-mms:

.. list-table::
   :widths: 33 33 33
   :width: 100
   :header-rows: 1

   * - Metric name
     - Dimensions 
     - Custom dimension available? (Yes/No)
   * - ``service.request`` - the requests to endpoints in a service 
     - * ``sf_environment``
       * ``deployment.environment`` - This dimension is only available for histogram MMS.
       * ``sf_service``
       * ``service.name`` - This dimension is only available for histogram MMS.
       * ``sf_error``
     - Yes
   * - ``inferred.services`` - 
     - * ``sf_service``
       * ``service.name`` - This dimension is only available for histogram MMS.
       * ``sf_environment``
       * ``deployment.environment`` - This dimension is only available for histogram MMS.
       * ``sf_error``
       * ``sf.kind``
       * ``sf_operation``
       * ``sf_httpMethod``
     - No
   * - ``spans`` - the count of spans (a single operation)   
     - * ``sf_environment``
       * ``deployment.environment`` - This dimension is only available for histogram MMS.
       * ``sf_service``
       * ``service.name`` - This dimension is only available for histogram MMS.
       * ``sf_operation``
       * ``sf_kind``
       * ``sf_error``
       * ``sf_httpMethod``, where relevant
     - Yes
   * - ``traces`` - the count of traces (collection of spans that represents a transaction)
     - * ``sf_environment``
       * ``deployment.environment`` - This dimension is only available for histogram MMS.
       * ``sf_service``
       * ``service.name`` - This dimension is only available for histogram MMS.
       * ``sf_operation``
       * ``sf_httpMethod``
       *  ``sf_error``
     - No
   * - ``workflows`` - created by default when you create a business workflow
     - * ``sf_environment``
       * ``deployment.environment`` - This dimension is only available for histogram MMS.
       * ``sf_workflow``
       * ``sf_error``
     - No

Monitoring MetricSets in APM are generated as histogram metrics. Histogram metrics represent a distribution of measurements or metrics, with complete percentile data available. Data is distributed into equally sized intervals, allowing you to compute percentiles across multiple services and aggregate datapoints from multiple metric time series. Histogram metrics provide an advantage over other metric types when calculating percentiles, such as the p90 percentile for a single MTS. See more in :ref:`metric-types`. For histogram MMS, there is a single metric for each component.

Previously, MMS were classified as either a counter or gauge metric type. The previous MMS included 6 metrics for each component. 

.. list-table::
   :widths: 33 33 33
   :width: 100
   :header-rows: 1

   * - Description
     - Histogram MMS
     - MMS (deprecated)
   * - Request count
     - ``<component>`` with a ``count`` function
     - ``<component>.count``
   * - Minimum request duration
     - ``<component>`` with a ``min`` function
     - ``<component>.duration.ns.min``
   * - Maximum request duration
     - ``<component>`` with a ``max`` function
     - ``<component>.duration.ns.max``
   * - Median request duration
     - ``<component>`` with a ``median`` function
     - ``<component>.duration.ns.median``
   * - Percentile request duration
     - ``<component>`` with a ``percentile`` function and a percentile ``value``
     - ``<component>.duration.ns.p90``
   * - Percentile request duration
     - ``<component>`` with a ``percentile`` function and a percentile ``value``
     - ``<component>.duration.ns.p99``

Example metrics in APM
---------------------------------------------

A histogram MTS uses the following syntax using SignalFlow:

.. code-block:: none
   
   histogram(metric=<metric_name>[,filter=<filter_dict>][,resolution=<resolution>)

The following table displays example SignalFlow functions:  

.. list-table::
   :widths: 33 33 33
   :width: 100
   :header-rows: 1

   * - Description
     - Histogram MMS 
     - Previous MMS (deprecated)
   * - Aggregate count of all MTS
     - ``A = histogram('spans').count().publish(label='A')``
     - ``A = data('spans.count').sum().publish(label='A')``
   * - P90 percentile for single MTS
     - ``filter_ = filter('sf_environment', 'environment1') and filter('sf_service', 'service 1') and filter('sf_operation', 'operation1') and filter('sf_httpMethod', 'POST') and filter('sf_error', 'false') A = data('spans.duration.ns.p90', filter=filter_, rollup='sum').publish(label='A')``
     - ``filter_ = filter('sf_environment', 'us1') and filter('sf_service', 'service1') and filter('sf_operation', 'POST /api/autosuggest/tagvalues') and filter('sf_httpMethod', 'POST') and filter('sf_error', 'false') A = data('spans.duration.ns.p90', filter=filter_, rollup='sum').publish(label='A')``
   * - Combined p90 for multiple services
     - ``A = histogram('service.request', filter=filter('sf_service', 'service 2', 'service 1')).percentile(pct=90).publish(label='A')``
     - ``A = data('service.request.duration.ns.p90', filter=filter('sf_service', 'service 2', 'service 1'), rollup='average').mean().publish(label='A')``

.. note:: Because an aggregation is applied on histogram(), to display all of the metric sets separately, each dimension needs to be applied as a groupby. 

Use MMS within Splunk APM
----------------------------------------

Use MMS for alerting and real-time monitoring in Splunk APM. You can create charts, dashboards, and alerts based on Monitoring MetricSets. 

.. list-table::
   :header-rows: 1
   :widths: 15, 50

   * - :strong:`Task`
     - :strong:`Documentation`
   * - Create charts
     - :ref:`create-charts`
   * - Create dashboards
     - :ref:`dashboard-create-customize`
   * - Create an alert 
     - :ref:`apm-alerts`
   * - Monitor services in APM dashboards 
     - :ref:`Track service performance using dashboards in Splunk APM<apm-dashboards>`

.. _troubleshooting-metricsets:

Troubleshooting MetricSets
==========================

Troubleshooting MetricSets (TMS) are metric time series (MTS) you can use for troubleshooting high-cardinality identities in APM. You can also use TMS to make historical comparisons across spans and workflows. 

Splunk APM indexes and creates Troubleshooting MetricSets for several span tags by default. For more details about each of these tags, see :ref:`apm-default-span-tags`. You can't modify or stop APM from indexing these span tags. 

You can also create custom TMS by indexing additional span tags and processes. To learn how to index span tags and processes to create new Troubleshooting MetricSets, see :ref:`apm-index-span-tags`.

Available TMS metrics
-----------------------
Every TMS creates the following metrics, known as request, error, and duration (RED) metrics. RED metrics appear when you select a service in the service map. See :ref:`service-map` to learn more about using RED metrics in the service map.

- Request rate
- Error rate
- Root cause error rate
- p50, p90, and p99 latency

The measurement precision of Troubleshooting MetricSets is 10 seconds. Splunk APM reports quantiles from a distribution of metrics for each 10-second reporting window. 

Use TMS within Splunk APM
----------------------------------------

TMS appear on the service map and in Tag Spotlight. Use TMS to filter the service map and create breakdowns across the values of a given indexed span tag or process. 

See :ref:`apm-service-map` and :ref:`apm-tag-spotlight`.

TMS retention period
-----------------------------------

Splunk Observability Cloud retains TMS for the same amount of time as raw traces. By default, the retention period is 8 days.

For more details about Troubleshooting MetricSets, see :ref:`apm-index-tag-tips`. 

Comparing Monitoring MetricSets and Troubleshooting MetricSets
=================================================================

Because endpoint-level and service-level MMS include a subset of the TMS metrics, you might notice that metric values for a service are different depending on the context in Splunk APM. This is because MMS are the basis of the dashboard view and MMS can only have a ``kind`` of ``SERVER`` or ``CONSUMER``. In contrast, TMS are the basis of the troubleshooting and Tag Spotlight views and TMS aren't restricted to specific metrics. 

For example, values for ``checkout`` service metrics displayed in the host dashboard might be different from the metrics displayed in the service map because there are multiple span ``kind`` values associated with this service that the MMS that power the dashboard don't monitor.

To compare MMS and TMS directly, restrict your TMS to endpoint-only data by filtering to a specific endpoint. You can also break down the service map by endpoint.
