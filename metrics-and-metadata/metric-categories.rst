.. _metric-categories:
.. _metrics-category:

*****************************************************************
Metric categories
*****************************************************************

.. meta::
  :description: Learn about metric categories in Splunk Observability Cloud.

These are the available categories for metrics in Observability Cloud:

.. include:: /_includes/metric-categories.rst

Identify and track the category of a metric
====================================================

In :ref:`host-based plans <monitor-imm-billing-usage>`, the category of a metric might impact billing. 

To keep track of the type of metrics you're ingesting, Observability Cloud provides you with different tools and reports:

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