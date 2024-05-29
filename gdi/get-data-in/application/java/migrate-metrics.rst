.. _java-metrics-migration-guide:

.. _note-otel-migration-java:

***************************************************
Migration guide for OpenTelemetry Java 2.x metrics
***************************************************

.. meta::
  :description: Follow the steps in this guide to migrate to 2.x metrics and HTTP semantic conventions, and to convert your custom reporting elements to the new metrics format.

OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates. Versions 2.4.0 and higher of the Splunk Distribution of OpenTelemetry Java are fully compatible with the updated semantic conventions.

The following migration instructions assume the following:

- You're sending Java application metrics using version 1.x of the Splunk Distribution of OpenTelemetry Java.
- You've created custom dashboards, detectors, or alerts based on Java application metrics.

Follow the steps in this guide to migrate to 2.x metrics and HTTP semantic conventions, and to convert your custom reporting elements to the new metrics format.

.. note:: AlwaysOn Profiling metrics are not impacted by this change.

Prerequisites
=============================================

To migrate from OpenTelemetry Java 1.x to OpenTelemetry Java 2.x, you need the following:

- Splunk Distribution of OpenTelemetry Collector version 0.98 or higher deployed
- Administrator permissions in Splunk Observability Cloud. See :ref:`roles-table-phase`

If you're instrumenting your Java services using the Splunk Distribution of OpenTelemetry Java 1.x or the equivalent upstream instrumentation, you can already migrate to the version 2.4.0 and higher of the Java agent.


.. _java-20-migration-best-practices:

Migration best practices
=============================================

The following best practices can help you when initiating the migration process:

#. Familiarize yourself with this documentation.
#. Read the release notes. See :new-page:`Releases <https://github.com/signalfx/splunk-otel-java/releases>` on GitHub.
#. Use a development or test environment.
#. Migrate production services gradually and grouped by type.
#. Identify changes in your instrumentation settings.
#. Validate the data in Splunk Observability Cloud.
#. Verify the impact of HTTP semantic convention changes. See :ref:`migrate-apm-custom-reporting`.


.. _migrate-java-steps:

Migrate to OTel Java 2.x
========================================

To migrate your instrumentation to the version 2.4.0 or higher of the Java agent, follow these steps:

1. Turn on OTLP histograms in the Splunk Distribution of OpenTelemetry Collector.

   .. include:: /_includes/gdi/histograms.rst

2. Make sure version 2.4.0 or higher of the Splunk Distribution of the Java agent is installed. See :ref:`upgrade-java-instrumentation`.

3. If you defined a custom Collector endpoint for metrics, make sure to update the port and use the correct property:

   .. code-block:: shell

      # Legacy property and value: -Dsplunk.metrics.endpoint=http(s)://collector:9943
      # You can also use the OTEL_EXPORTER_OTLP_METRICS_ENDPOINT environment variable
      -Dotel.exporter.otlp.metrics.endpoint=http://localhost:4318/v1/metrics

   Review all others settings to check that they're still applicable to version 2.4.0. See :ref:`advanced-java-otel-configuration`.

4. Migrate your custom reporting elements:

      - For Splunk APM, see :ref:`migrate-apm-custom-reporting`.

5. (Optional) Start using the new Java metrics 2.x built-in dashboards. Built-in dashboard versions are available for Java service metrics representing metrics from versions 1.x and 2.x.


.. _java-20-metric-names:

New metric names for version 2.x
======================================

.. include:: /_includes/gdi/java-20-metrics-equivalences.rst


.. _metrics-not-reported-java:

Metrics no longer reported
---------------------------------------

Due to changes in the metrics emitted by the Java instrumentation version 2.4.0 and higher, detectors or dashboards that use the following metrics might not work as before the migration:

* ``db.pool.connections``
* ``executor.tasks.completed``
* ``executor.tasks.submitted``
* ``executor.threads``
* ``executor.threads.active``
* ``executor.threads.core``
* ``executor.threads.idle``
* ``executor.threads.max``
* ``runtime.jvm.memory.usage.after.gc``
* ``runtime.jvm.gc.memory.promoted``
* ``runtime.jvm.gc.overhead``
* ``runtime.jvm.threads.peak``
* ``runtime.jvm.threads.states``


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
