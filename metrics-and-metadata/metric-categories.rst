.. _metric-categories:
.. _metrics-category:

*****************************************************************
Metric categories
*****************************************************************

.. meta::
  :description: Learn about metric categories in Splunk Observability Cloud.

Metric categories for realms us0 and us1
===========================================

The following metric categories are used in the realms ``us0`` and ``us1``:

.. raw:: html

   <div class="include-start" id="metric-classes.rst"></div>

.. include:: /_includes/metric-classes.rst

.. raw:: html

   <div class="include-stop" id="metric-classes.rst"></div>

Metric categories for other realms
===========================================

The following metric categories are used for any realms that aren't ``us0`` or ``us1``:

.. list-table:: 
   :header-rows: 1
   :widths: 20 80
   :width: 100%

   * - :strong:`Category type`
     - :strong:`Description`

   * - 0
     - | No information about the category type of the metric.
       | Note: Category type information for metrics is only available after 03/16/2023. Any metrics created before that date has category type ``0``. 
   
   * - 1
     - Host

   * - 2
     - Container

   * - 3
     - | Custom 
       | Metrics reported to Splunk Observability Cloud outside of those reported by default, such as host, container, or bundled metrics. Custom metrics might result in increased data ingest costs.
   * - 4
     - Hi-resolution

   * - 5
     - Internal

   * - 6
     - Tracing metrics

   * - 7
     - | Bundled 
       | In host-based subscription plans, additional metrics sent through Infrastructure Monitoring public cloud integrations that are not attributed to specific hosts or containers.
   * - 8
     - APM hosts

   * - 9
     - APM container   

   * - 10
     - APM identity   

   * - 11
     - APM bundled metrics  

   * - 12
     - | APM Troubleshooting MetricSets
       | This category is not part of the report.
   * - 13
     - APM Monitoring MetricSets

   * - 14
     - Infrastructure Monitoring function

   * - 15
     - APM function

   * - 16
     - | RUM Troubleshooting MetricSets
       | This category is not part of the report.
   * - 17
     - RUM Monitoring MetricSets

   * - 18
     - Network Explorer metrics

   * - 19
     - Runtime metrics

   * - 20
     - Synthetics metrics

.. note:: In subscription plans based on metric time series (MTS), all metrics are categorized as custom metrics and billed accordingly.




.. note:: Usage analytics doesn't support APM Monitoring MetricSets, RUM Monitoring MetricSets, or default/bundles APM metrics, so you can't view these metrics in usage analytics. To learn more about usage analytics, see :ref:`metrics-usage-analytics-intro`.

Identify and track the category of a metric
====================================================

In :ref:`host-based plans <monitor-imm-billing-usage>`, the category of a metric might impact billing. 

To keep track of the type of metrics you're ingesting, Splunk Observability Cloud provides you with different tools and reports:

* :ref:`custom-metric-report`. It shows the information on MTS associated with data points sent from hosts or containers, as well as information related to custom, high-resolution, and bundled MTS, for a specified date.
* Metric Pipeline Management's :ref:`usage report <metrics-usage-report>`. It gives a detailed breakdown of your MTS creation and usage.
* Track specific org metrics with custom metric information. See more in :ref:`org-metrics`.
  
Use Signalflow to look for a metric's category
--------------------------------------------------

You can use SignalFlow to query for the ``sf_mtsCategoryType`` dimension, which indicates the metric category. 

For example, to look for the top 10 custom metrics you're ingesting, use the following query with the ``*`` character:  

.. code-block:: 

  A = data('*', filter=filter('sf_mtsCategoryType', '3')).count(by="sf_metric").top(10).publish(label='A')

To only look at specific metrics, use their specific metric name. 

Learn more in :ref:`signalflow-analytics-intro`. 