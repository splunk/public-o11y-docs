.. _java-metrics-migration-guide:

.. _note-otel-migration-java:

***************************************************
Migration guide for OpenTelemetry Java 2.x metrics
***************************************************

.. meta::
  :description: Follow the steps in this guide to migrate to 2.x metrics and HTTP semantic conventions, and to convert your custom reporting elements to the new metrics format.

OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates. Versions 2.5.0 and higher of the Splunk Distribution of OpenTelemetry Java are fully compatible with the updated semantic conventions.

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

If you're instrumenting your Java services using the Splunk Distribution of OpenTelemetry Java 1.x or the equivalent upstream instrumentation, you can already migrate to the version 2.5.0 and higher of the Java agent.


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


.. _java-metrics-grace-period:

Use the Data Migration tool
=======================================================

Due to the changes in metric names, upgrading to Java OTel 2.x might break existing dashboards, detectors, and other features. To prevent sudden loss of access to custom reporting elements, use the Data Migration tool, which transforms and duplicates metric data in 1.x to the 2.x formats for a limited period of time at no additional cost.

.. image:: /_images/gdi/datamigrationtool2.png
      :width: 90%
      :alt: Data Migration tool running migration metrics rules for Java 2.x metrics

To access the Data Migration tool:

1. Go to :guilabel:`Settings`, :guilabel:`Data Configuration`.
2. Select :guilabel:`Data Migration`.
3. Inside the :guilabel:`Start migration` card, select :guilabel:`Start`.

For each supported process, you can turn on and off the data migration, see the number of Metric Time Series (MTS) migrated, and view the grace period duration. The duplication and double-publishing of metrics follows a set of predefined rules that are activated when you decide to migrate.

.. note:: Metric rules are treated as system rules and can't be edited.

.. _data-migration-ui:

Grace period
------------------

The grace period for receiving and processing duplicated metrics at no additional cost lasts 6 months, starting with the release of the Java agent version 2.5.0 on June 17, 2024 and ending on January 6, 2025.

Migration support is available for 12 months after the release of version 2.5.0 and will be deprecated after 18 months.

.. note:: After the grace period, duplicated metric data is billed as custom metric data. Make sure to turn off the Data Migration action after you've completed the migration to avoid surcharges.

.. _migrate-java-steps:

Migrate to OTel Java 2.x
========================================

To migrate your instrumentation to the version 2.5.0 or higher of the Java agent, follow these steps:

1. Turn on the migration of Java metrics in the :guilabel:`Data Migration` page:

   - Go to :guilabel:`Settings`, :guilabel:`Data Configuration`.
   - Select :guilabel:`Data Migration`.
   - Inside the :guilabel:`Start migration` card, select :guilabel:`Start`.

2. Turn on OTLP histograms in the Splunk Distribution of OpenTelemetry Collector.

   .. include:: /_includes/gdi/histograms.rst

3. Make sure version 2.5.0 or higher of the Splunk Distribution of the Java agent is installed. See :ref:`upgrade-java-instrumentation`.

4. If you defined a custom Collector endpoint for metrics, make sure to update the port and use the correct property:

   .. code-block:: shell

      # Legacy property and value: -Dsplunk.metrics.endpoint=http(s)://collector:9943
      # You can also use the OTEL_EXPORTER_OTLP_METRICS_ENDPOINT environment variable
      -Dotel.exporter.otlp.metrics.endpoint=http://localhost:4318/v1/metrics

   Review all others settings to check that they're still applicable to version 2.5.0. See :ref:`advanced-java-otel-configuration`.

5. Migrate your custom reporting elements:

      - For Splunk APM, see :ref:`migrate-apm-custom-reporting`.

6. (Optional) Start using the new Java metrics 2.x built-in dashboards. Built-in dashboard versions are available for Java service metrics representing metrics from versions 1.x and 2.x.

7. When ready, turn off the migration:

   - Go to :guilabel:`Settings`, :guilabel:`Data Configuration`.
   - Select :guilabel:`Data Migration`.
   - In the :guilabel:`Stop migration` card, select :guilabel:`Stop`.

.. caution:: If you don't turn off the Data Migration stream for Java metrics after the grace period, the duplicated metrics are billed as custom metrics. See :ref:`java-metrics-grace-period`.

.. _java-20-metric-names:

New metric names for version 2.x
======================================

.. include:: /_includes/gdi/java-20-metrics-equivalences.rst

.. _metrics-not-reported-java:

Metrics no longer reported
---------------------------------------

Due to changes in the metrics emitted by the Java instrumentation version 2.5.0 and higher, detectors or dashboards that use the following metrics might not work as before the migration:

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
