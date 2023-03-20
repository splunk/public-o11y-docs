.. _apm-index-tag-tips:

*******************************************************************************
Reference and best practices for span tags and Troubleshooting MetricSets
*******************************************************************************

.. Metadata updated: 1/23/23

.. meta::
  :description: Learn how to drill down to gain insights about the performance of your infrastructure or to address a specific incident using Troubleshooting MetricSets (TMS).

With Troubleshooting MetricSets (TMS), you can drill down to gain insights about the performance of your infrastructure, or to address a specific incident.

.. note::
  Troubleshooting MetricSets are distinct from Monitoring MetricSets in Splunk APM. For an overview of the types of MetricSets in APM, see :ref:`apm-metricsets`. 

* See :ref:`apm-default-span-tags` for details about the span tags Splunk APM automatically indexes.

* See :ref:`apm-index-tag-types` to learn about the types of span tags you can choose to index and their scope.

* See :ref:`apm-limits-metricsets` for guidance on how to calculate the available number of Troubleshooting MetricSets in your system configuration.

* See :ref:`index-which-span-tags` to index for guidance on selecting additional span tags to index.


.. _apm-default-span-tags:

Default indexed span tags in APM
====================================

APM indexes and creates Troubleshooting MetricSets by default for the span tags in the following table:

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

To learn how to index span tags, see :ref:`apm-index-span-tags`. 

If you choose not to index any additional span tags, you can still view tags in your spans when analyzing whole traces. You can also download traces and filter or process data by span tags manually. To learn how to download a trace, see :ref:`apm-download-traces`.

.. _apm-limits-metricsets:

Limits on indexing span tags
============================

 APM generates a Troubleshooting MetricSet for every unique set of indexed span tag values, so the number of span tags you can index depends on the number of Troubleshooting MetricSets that the span tags generate. This is also known as the cardinality contribution of indexed tags. The number of Troubleshooting MetricSets you can generate might be limited in your Splunk APM contract, so keep this limit in mind when you're indexing span tags. For more information, see :new-page:`Splunk APM Pricing <https://www.splunk.com/en_us/products/pricing/faqs/observability.html#splunk-apm>`.

Determining the number of possible Troubleshooting MetricSets
-----------------------------------------------------------------
To determine the total number of possible Troubleshooting MetricSets that indexing a tag will generate, multiply the number of indexed tag values for each indexed tag associated with each unique set of service, endpoint, operation, and environment values.

For example, consider two services, ``frontend`` and ``checkoutservice``. Each service exists in two regions. The ``frontend`` service has five endpoints, and the ``checkoutservice`` has two endpoints. ``region`` and ``endpoint`` are indexed tags for each service. There are no other indexed tags in this scenario.

Multiplying the five endpoints for ``frontend`` by two, the number of unique regions, and then adding the result of multiplying the two endpoints for ``checkoutservice`` by two for the unique regions, we get a maximum of 14 possible combinations: ``(2 * 5) + (2 * 2) = 14``. This doesn't always mean there will be 14 Troubleshooting MetricSets. If you collect traces in a certain ``region`` or with a certain ``endpoint``, the Troubleshooting MetricSet exists only for that ``region`` or ``endpoint``.

The following table illustrates the sample set of possible Troubleshooting MetricSets given these two services and two indexed tags with multiple values:

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

.. _index-which-span-tags:

Decide which additional span tags to index
===========================================
To avoid running out of Troubleshooting MetricSets, consider which span tags are most worth indexing. Here are some questions you can consider to help you decide which span tags are most useful:

- Are there any attributes I look at when an incident occurs?

  If you're running Kubernetes, you could index ``k8s.pod.name`` to view the performance of services by specific Kubernetes pods.

- Do I run multiple versions or builds of code at the same time?

  You could index tags for ``version`` or ``build_id`` to break down your infrastructure according to specific versions or builds of your applications.

- Do I deploy services in multiple regions or fault domains?

  It could be useful to view metrics for services by specific ``region`` span tags to identify issues with resources in specific regions or zones.

- Do I monitor multiple products?

  To get a better idea about how services for a particular product are running, you could use a span tag like ``product_category`` to view metrics for traces for a single product type rather than viewing traces for multiple product types at the same time.

- How much cardinality do I need?

  Some span tags provide a level of cardinality that might not be useful. For example, indexing ``query_id`` can generate Troubleshooting MetricSets for every unique query, and in most cases, there's no reason for this level of cardinality. 

- Do any of my tags represent ephemeral resources?

  It's best to avoid indexing span tags that represent ephemeral resources such as ``container_id``.

Once you have chosen which span tags you'd like to index, see :ref:`apm-index-span-tags` to learn how.