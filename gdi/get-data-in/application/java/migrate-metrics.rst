.. _java-metrics-migration-guide:

***************************************************
Migration guide for OpenTelemetry Java 2.0 metrics
***************************************************

.. meta::
  :description: OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates.

penTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates. Changes to upstream OpenTelemetry Java instrumentation will impact Splunk OpenTelemetry Java distribution.

If you're using the upstream OpenTelemetry 1.x instrumentation, wait before upgrading to version 2.x, as it might cause built-in Java metric dashboards and features that rely on metricized attributes, such MTS and TMS, to not work as expected.

.. note:: AlwaysOn Profiling metrics are not impacted by this change.

When to start the migration to 2.0 metrics
==============================================

If you're already instrumenting your Java services using the Splunk Distribution of OpenTelemetry Java 1.x or the equivalent upstream instrumentation, you can already migrate to the version 2.0 and higher of the Java agent.

.. include:: /_includes/requirements/java.rst


Migration manager
----------------------------------------------

Use the Migration manager under ::guilabel:`Settings` > ::guilabel:`Data Management` to turn on migration procedures that help you migrate Java metrics to version 2.0.


Metric data redundancy grace period
-----------------------------------------------

To prevent sudden loss of access to custom reporting elements, the Metrics Pipeline Manager transforms and duplicates metric data in both 1.x and the 2.x formats for a limited period of time with no additional cost. 

The duplication and double-publishing of metrics follows a set of predefined rules that are activated when you decide to migrate. MPM shows the rules as system rules that can't be edited. See :ref:`metrics-pipeline-arm`.

The grace period for receiving and processing duplicated metric started with the release of the Java agent version 2.0 on <DATE> and ends on <DATE>.

.. note:: After the grace period, duplicated metric data is treated as custom metrics and charged accordingly.


.. _migrate-java-steps:

Migrate to OTel Java 2.0
========================================

To migrate your instrumentation to the version 2.0 or higher of the Java agent, follow these steps:

1. Install version 2.0 or higher of the Splunk Distribution of the Java agent. For upgrade best practices, see :ref:`upgrade-java-instrumentation`.

2. Migrate custom reporting elements:

      - For Splunk APM, see :ref:`migrate-apm-custom-reporting`.
      - For Splunk IMM, see ---
      - For Splunk RUM, see ---

3. (Optional) Switch to the new Java metrics 2.0 built-in dashboards. Built-in dashboard versions are available for Java service metrics representing metrics from versions 1.x and 2.x.


.. _java-20-metric-names:

New metric names
======================================

The following table shows the previous metric names and the current names used by OpenTelemetry Java 2.0 and higher. When a metric isn't available, the table suggests a similar metric or calculation where possible. For a full list of OpenTelemetry Java 2.0 metrics, see :ref:`java-otel-metrics-attributes`.

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 30 70
  
  * - Old name (Micrometer)
    - New name or OTel Java 2.0 equivalent
  * - ``runtime.jvm.classes.loaded``
    - ``jvm.class.count`` |br| ``jvm.class.loaded``
  * - ``runtime.jvm.classes.unloaded``
    - ``jvm.class.unloaded``
  * - ``runtime.jvm.gc.concurrent.phase.time``
    - ``jvm.gc.duration{jvm.gc.name=<concurrent gcs>}`` (Histogram)
  * - ``runtime.jvm.gc.live.data.size``
    - ``process.runtime.jvm.memory.usage_after_last_gc{pool=<long lived pools>}``
  * - ``runtime.jvm.gc.max.data.size``
    - ``jvm.memory.limit{jvm.memory.pool.name=<long lived pools>}``
  * - ``runtime.jvm.gc.memory.allocated``
    - ``process.runtime.jvm.memory.allocated``
  * - ``runtime.jvm.gc.memory.promoted``
    - No equivalent
  * - ``runtime.jvm.gc.pause``
    - ``jvm.gc.duration{jvm.gc.name!=<concurrent gcs>}``
  * - ``runtime.jvm.gc.overhead``
    - No equivalent
  * - ``runtime.jvm.memory.usage.after.gc``
    - ``jvm.memory.usage_after_last_gc{jvm.memory.pool.name=<long lived pools>,`` |br| ``jvm.memory.type=heap} / jvm.memory.limit{jvm.memory.pool.name=<long lived pools>,jvm.memory.type=heap}``
  * - ``process.runtime.jvm.memory.allocated``
    - ``process.runtime.jvm.memory.allocated``
  * - ``process.runtime.jvm.memory.reclaimed``
    - ``process.runtime.jvm.memory.reclaimed``
  * - ``runtime.jvm.buffer.count``
    - ``jvm.buffer.count``
  * - ``runtime.jvm.buffer.memory.used``
    - ``jvm.buffer.memory.usage``
  * - ``runtime.jvm.buffer.total.capacity``
    - ``jvm.buffer.memory.limit``
  * - ``runtime.jvm.memory.committed``
    - ``jvm.memory.committed``
  * - ``runtime.jvm.memory.max``
    - ``jvm.memory.limit``
  * - ``runtime.jvm.memory.used``
    - ``jvm.memory.used``
  * - ``runtime.jvm.threads.daemon``
    - ``jvm.thread.count``
  * - ``runtime.jvm.threads.live``
    - ``jvm.thread.count``
  * - ``runtime.jvm.threads.peak``
    - No equivalent
  * - ``runtime.jvm.threads.states``
    - ``jvm.thread.count``
  * - ``db.pool.connections``
    - ``db.client.connections.usage``
  * - ``db.pool.connections.active``
    - ``db.client.connections.usage[state=used]``
  * - ``db.pool.connections.idle``
    - ``db.client.connections.usage[state=idle]``
  * - ``db.pool.connections.idle.max``
    - ``db.client.connections.idle.max``
  * - ``db.pool.connections.idle.min``
    - ``db.client.connections.idle.min``
  * - ``db.pool.connections.max``
    - ``db.client.connections.max``
  * - ``db.pool.connections.pending_threads``
    - ``db.client.connections.pending_requests``
  * - ``db.pool.connections.timeouts``
    - ``db.client.connections.timeouts``
  * - ``db.pool.connections.create_time``
    - ``db.client.connections.create_time`` (Histogram, ms)
  * - ``db.pool.connections.wait_time``
    - ``db.client.connections.wait_time`` (Histogram, ms)
  * - ``db.pool.connections.use_time``
    - ``db.client.connections.use_time`` (Histogram, ms)
  * - ``executor.threads``
    - No equivalent
  * - ``executor.threads.active``
    - No equivalent
  * - ``executor.threads.idle``
    - No equivalent
  * - ``executor.threads.core``
    - No equivalent
  * - ``executor.threads.max``
    - No equivalent
  * - ``executor.tasks.submitted``
    - No equivalent
  * - ``executor.tasks.completed``
    - No equivalent

For more information, see:

* :ref:`About the Splunk Distribution of OpenTelemetry Java <splunk-java-otel-dist>`
* :ref:`APM specific information on the new semantic conventions <migrate-apm-custom-reporting>`
* :new-page:`OpenTelemetry semantic convention <https://opentelemetry.io/docs/specs/semconv/>`

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst