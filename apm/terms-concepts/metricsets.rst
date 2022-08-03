.. _apm-metricsets:

**********
MetricSets
**********

.. meta::
   :description: Learn about MetricSets in Splunk Observability Cloud. MetricSets are categories of metrics about traces and spans in Splunk APM.

MetricSets are categories of metrics about traces and spans you can use for real-time monitoring and high-cardinality troubleshooting. MetricSets are specific to Splunk APM, but are similar to metrics and metric time-series for Infrastructure Monitoring the application uses to populate charts and generate alerts.

There are two categories of MetricSets: Troubleshooting and Monitoring.

Troubleshooting MetricSets
==========================

Troubleshooting MetricSets are for filtering service maps and breaking down SLIs to enable historical comparison for spans and workflows.

Every identity has Troubleshooting MetricSets, but not every identity has Monitoring MetricSets.

Troubleshooting MetricSets are stored for eight days by default, along with traces. Each Troubleshooting MetricSet has the following metrics available to use for troubleshooting:

-  Request rate

-  Error rate

-  Root cause error rate

-  Latency (minimum, maximum, P50, P90, P99)

Monitoring MetricSets
=====================

Monitoring MetricSets are for real-time monitoring and alerting. Monitoring MetricSets are defined by spans with the ``SERVER`` or ``CLIENT`` ``kind``. Splunk APM doesn't generate Monitoring MetricSets for services that have a different ``kind``.

Because Monitoring MetricSets include just a subset of metrics that Troubleshooting MetricSets can include, sometimes metrics for a service can be different depending on the context in Splunk APM. This is just because the Troubleshooting view is powered by Troubleshooting MetricSets, and doesn't restrict the metrics it collects to the ``SERVER`` or ``CLIENT`` ``kind``. For example, metrics for the ``checkout`` service could display different metrics when you're viewing the host dashboard compared to when you're viewing performance in the Troubleshooting view because there are multiple span ``kind`` values the dashboard doesn't monitor that the Troubleshooting view does.

Monitoring MetricSets are stored for thirteen months by default. Each Monitoring MetricSet has a set of metrics and dimensions for spans and traces you can use to monitor and alert on service performance. If you build a chart or detector with Monitoring MetricSets, exclude ``sf_dimensionalized:*`` unless you want to look at the time-series of a custom, dimensionalized Monitoring MetricSet. You can do this by adding a filter on ``!sf_dimensionalized:true``. 

These are the metrics and dimensions for Monitoring MetricSets:

Service metrics and dimensions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - :strong:`Metrics`
     - :strong:`Dimensions`

   * - - ``service.request.count``
       - ``service.request.duration.ns.min``
       - ``service.request.duration.ns.median``
       - ``service.request.duration.ns.max``
       - ``service.request.duration.ns.p90``
       - ``service.request.duration.ns.p99``
     - - ``sf_environment``
       - ``sf_service``
       - ``sf_error``

Workflow metrics and dimensions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - :strong:`Metrics`
     - :strong:`Dimensions`

   * - - ``workflows.count``
       - ``workflows.duration.ns.min``
       - ``workflows.duration.ns.median``
       - ``workflows.duration.ns.max``
       - ``workflows.duration.ns.p90``
       - ``workflows.duration.ns.p99``
     - - ``sf_environment``
       - ``sf_workflow``
       - ``sf_error``

Span metrics and dimensions
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - :strong:`Metrics`
     - :strong:`Dimensions`

   * - - ``spans.count``
       - ``spans.duration.ns.min``
       - ``spans.duration.ns.median``
       - ``spans.duration.ns.max``
       - ``spans.duration.ns.p90``
       - ``spans.duration.ns.p99``
     - - ``sf_environment``
       - ``sf_service``
       - ``sf_operation``
       - ``sf_kind``
       - ``sf_httpMethod``
       - ``sf_error``

Trace metrics and dimensions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1

   * - :strong:`Metrics`
     - :strong:`Dimensions`

   * - - ``traces.count``
       - ``traces.duration.ns.min``
       - ``traces.duration.ns.median``
       - ``traces.duration.ns.max``
       - ``traces.duration.ns.p90``
       - ``traces.duration.ns.p99``
     - - ``sf_environment``
       - ``sf_service``
       - ``sf_operation``
       - ``sf_httpMethod``
       - ``sf_error``

Default identities and MetricSets
=================================

The total number of Troubleshooting MetricSets is the sum of all identities. The total number of Monitoring MetricSets is the sum of ``Service``, ``Endpoint``, and ``Workflow`` identities.

Splunk APM creates the following :ref:`identities <apm-identities>` and MetricSets:

.. list-table::
   :header-rows: 1

   *  -  :strong:`APM object`
      -  :strong:`Description`
      -  :strong:`Identity example`
      -  :strong:`Troubleshooting MetricSet`
      -  :strong:`Monitoring MetricSet`

   *  -  Service
      -  Identities for all services
      -  Service |hyph| 1
      -  Yes
      -  Yes

   *  -  Endpoint
      -  Identities for all endpoints
      -  Service |hyph| 1.Endpoint |hyph| 1.HTTPMethod

         Service |hyph| 1.InitEndpoint |hyph| 1 `if HTTPMethod is absent`
      -  Yes
      -  Yes

   *  -  Workflow
      -  Identities for all initiating endpoints
      -  Service |hyph| 1.InitEndpoint |hyph| 1.HTTPMethod

         Service |hyph| 1.InitEndpoint |hyph| 1 `if HTTPMethod is absent`
      -  Yes
      -  Yes

   *  -  Edge
      -  Identities for all edges between services
      -  Service |hyph| 1.Endpoint |hyph| 1.HTTPMethod |hyph| >Service |hyph| 2.Endpoint |hyph| 2.HTTPMethod
      -  Yes
      -  No

   *  -  Operation
      -  Identities for all spans within services
      -  Service |hyph| 1.Operation |hyph| 1
      -  No
      -  No