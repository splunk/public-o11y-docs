.. _apm-index-tag-tips:

*****************************
Which span tags to index
*****************************

.. meta::
   :description: Indexing span tags provides additional insights into the performance of your applications.

Index only span tags you want drill down into to gain insights about the performance of your infrastructure, or to address a specific incident. Some span tags provide a level of cardinality that just isn't useful. For example, indexing ``query_id`` would generate MetricSets for every unique query, and in most cases there's no reason for this level of cardinality.

Also avoid indexing span tags that represent ephemeral resources like ``container_id``.

Consider which span tags are worth creating MetricSets for. Here are some questions you can ask about your environment:

- Are there any attributes I look at when an incident occurs?

  If you're running Kubernetes, you could index ``k8s.pod.name`` to view the performance of services by specific Kubernetes pods.

- Do I run multiple versions or builds of code at the same time?

  You could index tags for ``version`` or ``build_id`` to break down your infrastructure according to specific versions or builds of your applications.

- Do I deploy services in multiple regions or fault domains?

  It could be useful to view metrics for services by specific ``region`` span tags to identify issues with resources in specific regions or zones.

- Do I monitor multiple products?

  To get a better idea about how services for a particular product are running, you could use a span tag like ``product_category`` to view metrics for traces for a single product type rather than viewing traces for multiple product types at the same time.

.. _apm-default-span-tags:

Span tags APM automatically indexes
====================================

APM automatically indexes and creates Troubleshooting MetricSets for these span tags:

.. list-table::
   :header-rows: 1
   :widths: 15, 15, 20, 50

   * - :strong:`Tag`
     - :strong:`Example`
     - :strong:`Type`
     - :strong:`Description`

   * - ``environment``
     - ``production``, ``lab``
     - Global
     - The environment where the service associated with the span runs.

   * - ``Endpoint``
     - ``/auth/valid``, ``/checkout/{cartId}``
     - All services
     - If the root span contains the ``span.kind = server`` tag, the operation name for the root span of a service.

   * - ``Operation``
     - ``/auth/valid``, ``/checkout/{cartId}``
     - All services
     - The operation name for the root span of a service.

   * - ``HTTP Method``
     - ``GET``, ``POST``, ``PUT``
     - All services
     - The HTTP method of the span, if any. The actual span tag field name can be ``http.method`` or ``requestMethod``, but ``HTTP Method`` is the tag you use to filter and break down services.

   * - ``Kind``
     - ``server``, ``client``, ``producer``
     - All services
     - The type of service associated with the span. The actual span tag field name is ``span.kind``, but ``Kind`` is the tag you use to filter and break down services.
   
   * - ``Service``
     - The name of a service you specify when configuring instrumentation.
     - All services
     - The service you instrumented and are exporting trace data from.

.. _apm-index-tag-insights:

How indexing span tags provides insights into service performance
=================================================================

Indexing span tags generates Troubleshooting MetricSets for services in your environment. A Troubleshooting MetricSet is a set of unique span tag key-value pairs. Each Troubleshooting MetricSet generates metrics that you can use to drill down into service performance. 

The measurement precision of Troubleshooting MetricSets is 10 seconds. The application reports quantiles from a distribution of metrics for each 10-second reporting window.

These metrics are what Troubleshooting MetricSets generate:

- Request rate
- Error rate
- Root-cause error rate
- Latency

Because ``endpoint`` is an indexed tag, you can break down the performance of each service by each endpoint you collect. You can even break down service-to-service calls, known as edges. To do so, mouse over or click edges from the :strong:`Troubleshooting` view on the :strong:`APM` page. You can also see these metrics in service panels when you select a service from the :strong:`Troubleshooting` view.

.. _apm-index-tag-types:

Types of span tags you can index
================================

There are three types of span tags you can index:

.. list-table::
   :header-rows: 1
   :widths: 20, 20, 60

   * - :strong:`Type`
     - :strong:`Example`
     - :strong:`Description`

   * - Global
     - Tenant class, application ID
     - A tag with only a single value across a trace. This associates the span tag value with an entire trace.

   * - All services
     - Version, host, status code
     - A tag that exists for most or all services. This associates the span tag value with services in a trace. The value could change across services in a trace.

   * - Specific service(s)
     - Job ID, database name
     - A tag that exists for only a single service in a trace. This associates the span tag value with a single service in a trace.

.. _apm-limits-metricsets:

Limits on indexing span tags
============================

The number of the span tags you can index depends on the number of Troubleshooting MetricSets APM generates from indexed span tags. APM generates a Troubleshooting MetricSet for every unique set of indexed span tag values. This is also known as the cardinality contribution of indexed tags. The number of Troubleshooting MetricSets you can generate is limited. Keep this limit in mind when indexing span tags. For more information, see :new-page:`Splunk APM Pricing <https://www.splunk.com/en_us/software/pricing/faqs/devops.html#Splunk-APM>`.

To determine the total number of possible Troubleshooting MetricSets, multiply the number of indexed tag values for each indexed tag associated with each unique set of service, endpoint, operation, and environment values.

For example, there are two services, ``frontend`` and ``checkoutservice``. Each service exists in two regions. The ``frontend`` service has five endpoints, and the ``checkoutservice`` has two endpoints. ``region`` and ``endpoint`` are indexed tags for each service. There are no other indexed tags in this scenario.

The maximum number of Troubleshooting MetricsSets that can exist for these two services is 14 ((2 * 5) + (2 * 2)). This doesn't always mean there will be 14 Troubleshooting MetricSets. If you collect traces in a certain ``region`` or with a certain ``endpoint``, the Troubleshooting MetricSet exists only for that ``region`` or ``endpoint``.

Here is a table that illustrates the number of possible Troubleshooting MetricSets given two services and two indexed tags with multiple values:

.. list-table::
   :header-rows: 1
   :widths: 10, 30, 30, 30

   * - :strong:`#`
     - :strong:`Service`
     - :strong:`Region`
     - :strong:`Endpoint`

   * - 1
     - ``frontend``
     - ``west``
     - ``/currency``

   * - 2
     - ``frontend``
     - ``west``
     - ``/cart``

   * - 3
     - ``frontend``
     - ``west``
     - ``/checkout``

   * - 4
     - ``frontend``
     - ``west``
     - ``/shipping``

   * - 5
     - ``frontend``
     - ``west``
     - ``/product``

   * - 6
     - ``frontend``
     - ``east``
     - ``/currency``

   * - 7
     - ``frontend``
     - ``east``
     - ``/cart``

   * - 8
     - ``frontend``
     - ``east``
     - ``/checkout``

   * - 9
     - ``frontend``
     - ``east``
     - ``/shipping``

   * - 10
     - ``frontend``
     - ``east``
     - ``/product``

   * - 11
     - ``checkoutservice``
     - ``west``
     - ``/placeholder``

   * - 12
     - ``checkoutservice``
     - ``west``
     - ``/queueplaceholder``

   * - 13
     - ``checkoutservice``
     - ``east``
     - ``/placeholder``

   * - 14
     - ``checkoutservice``
     - ``east``
     - ``/queueplaceholder``