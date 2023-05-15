.. _metric-categories:
.. _metrics-category:

*****************************************************************
Metric categories
*****************************************************************

.. meta::
  :description: Learn about metric categories in Splunk Observability Cloud.

These are the available categories for metrics in Observability Cloud:

.. include:: /_includes/metric-categories.rst

Identify the category of a metric
====================================

In :ref:`host-based plans <monitor-imm-billing-usage>`, the category of a metric might impact billing. 

To keep track of the type of metrics you're ingesting, Observability Cloud provides you with different tools and reports:

* :ref:`custom-metric-report`.
* Metric Pipeline Management's :ref:`usage report <metrics-usage-report>`.
* Track specific org metrics with custom metric information. See more in :ref:`org-metrics`.
  
Use Signalflow 
----------------------

You can query for the ``sf_mtsCategoryType`` dimension, which indicates the metric category, using Signalflow. For example: 

.. code-block:: 

  A = data('*', filter=filter('sf_mtsCategoryType', '3')).count(by="sf_metric").top(10).publish(label='A')

Learn more in :ref:`signalflow-analytics-intro`. 