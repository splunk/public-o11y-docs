.. _go-otel-metrics:

**********************************************************************
Metrics and attributes collected by the Splunk Distribution of OTel Go
**********************************************************************

.. meta:: 
   :description: The Splunk Distribution of OpenTelemetry Go collects the following metrics.

The Splunk Distribution of OpenTelemetry Go collects runtime and custom metrics. To enable runtime metrics collection, see :ref:`metrics-configuration-golang`. 

To learn about the different metric types, see :ref:`metric-types`.

.. note:: Runtime and trace metrics collection is an experimental feature subject to future changes.

.. _enable-golang-metrics:

Enable metrics collection
====================================================

To collect Node.js metrics, see :ref:`metrics-configuration-golang`.

.. _golang-otel-runtime-metrics:

Runtime metrics
================================================

To enable runtime metrics, see :ref:`metrics-configuration-golang`. The following runtime metrics are automatically collected and exported:

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description

.. _golang-otel-custom-metrics:

Custom metrics
=====================================

To send custom application metrics to Observability Cloud...

.. _golang-otel-metrics-migration:

Migrate from SignalFx metrics for Go
===========================================

To migrate your custom metric instrumentation from the SignalFx client library, follow these steps:

. . . 