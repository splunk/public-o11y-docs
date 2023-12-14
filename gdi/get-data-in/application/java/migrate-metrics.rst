.. _java-metrics-migration-guide:

***************************************************
Migration guide for OpenTelemetry Java 2.0 metrics
***************************************************

.. meta::
  :description: OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates.

OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates. Versions 2.0 and higher of the Splunk Distribution of OpenTelemetry Java are fully compatible with these changes.

Follow the steps in this guide to migrate to 2.0 metrics and HTTP semantinc conventions, and convert your IMM, APM, and RUM custom reporting to the new metrics format.

.. note:: AlwaysOn Profiling metrics are not impacted by this change.

Prerequisites
=============================================

The following instructions assume that you're sending Java application metrics using version 1.x of the Splunk Distribution of OpenTelemetry Java.

To migrate from OpenTelemetry Java 1.x to OpenTelemetry Java 2.x you need the following:

- Splunk Distribution of OpenTelemetry Collector version <VERSION> or higher deployed
- Administrator permissions in Splunk Observability Cloud. See :ref:`roles-phase1`

.. _data-migration-ui:

When to start the migration to 2.0 metrics
==============================================

If you're already instrumenting your Java services using the Splunk Distribution of OpenTelemetry Java 1.x or the equivalent upstream instrumentation, you can already migrate to the version 2.0 and higher of the Java agent.

.. include:: /_includes/requirements/java.rst


Data migration manager
----------------------------------------------

The Data Migration Management feature in ::guilabel:`Settings`, ::guilabel:`Data Configuration` lets you manage the migration process for metric streams. For each supported process, you can activate or deactivate the migration of data, see the number of MTS migrated, and the duration of the grace period.

.. add screenshot


.. _java-metrics-grace-period:

Metric data redundancy grace period
-----------------------------------------------

To prevent sudden loss of access to custom reporting elements, the Metrics Pipeline Manager transforms and duplicates metric data in both 1.x and the 2.x formats for a limited period of time with no additional cost.

The duplication and double-publishing of metrics follows a set of predefined rules that are activated when you decide to migrate. The metric rules are treated as system rules and can't be edited. See :ref:`metrics-pipeline-arm`.

The grace period for receiving and processing duplicated metric at no additional cost lasts six months, starting with the release of the Java agent version 2.0 on <DATE>. Migration support is available for 12 months after the release of version 2.0 and will be deprecated at the 18 months mark.

.. note:: After the grace period, duplicated metric data is billed as custom metric data. Make sure to turn off the Data Migration stream after you've completed the migration to avoir surcharges.


.. _migrate-java-steps:

Migrate to OTel Java 2.0
========================================

To migrate your instrumentation to the version 2.0 or higher of the Java agent, follow these steps:

1. Turn on Java metrics migration in the Data Migration page. See :ref:`data-migration-ui`.

2. Turn on OTLP histograms in the Splunk Distribution of OpenTelemetry Collector. See :ref:`enable-histograms-export`.

3. Install version 2.0 or higher of the Splunk Distribution of the Java agent. For upgrade best practices, see :ref:`upgrade-java-instrumentation`.

4. Migrate custom reporting elements:

      - For Splunk APM, see :ref:`migrate-apm-custom-reporting`.
      - For Splunk IMM, see ---
      - For Splunk RUM, see ---

5. (Optional) Switch to the new Java metrics 2.0 built-in dashboards. Built-in dashboard versions are available for Java service metrics representing metrics from versions 1.x and 2.x.

6. When ready, you can turn off the migration the Data Migration stream. See :ref:`data-migration-ui`.

.. caution:: If you don't turn off the Data Migration stream for Java metrics after the grace period, the duplicated metrics are billed as custom metrics. See :ref:`java-metrics-grace-period`.

.. _java-20-metric-names:

New metric names
======================================

.. include:: /_includes/gdi/java-20-metrics-equivalences.rst

For more information, see:

* :new-page:`OpenTelemetry semantic convention <https://opentelemetry.io/docs/specs/semconv/>`

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst