.. _java-metrics-migration-guide:

***************************************************
Migration guide for OpenTelemetry Java 2.0 metrics
***************************************************

.. meta::
  :description: OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates.

OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates. Versions 2.0 and higher of the Splunk Distribution of OpenTelemetry Java are fully compatible with the updated semantic conventions.

Follow the steps in this guide to migrate to 2.0 metrics and HTTP semantic conventions, and convert your IMM, APM, and RUM custom reporting to the new metrics format.

.. note:: AlwaysOn Profiling metrics are not impacted by this change.

Prerequisites
=============================================

The following instructions assume that you're sending Java application metrics using version 1.x of the Splunk Distribution of OpenTelemetry Java.

To migrate from OpenTelemetry Java 1.x to OpenTelemetry Java 2.x, meet the following requirements:

- Splunk Distribution of OpenTelemetry Collector version 0.95 or higher deployed
- Administrator permissions in Splunk Observability Cloud. See :ref:`roles-table-phase`

If you're already instrumenting your Java services using the Splunk Distribution of OpenTelemetry Java 1.x or the equivalent upstream instrumentation, you can already migrate to the version 2.0 and higher of the Java agent.

.. include:: /_includes/requirements/java.rst


.. _java-metrics-grace-period:

Use the Data Migration tool
=======================================================

Due to the changes in metric names, upgrading to Java OTel 2.x might break existing dashboards, detectors, and other features. To prevent sudden loss of access to custom reporting elements, use the Data Migration tool, which transforms and duplicates metric data in 1.x to the 2.x formats for a limited period of time at no additional cost.

Use Data Migration to manage the migration process for metric streams. For each supported process, you can turn on and off the data migration, see the number of Metric Time Series (MTS) migrated, and view the grace period duration. The duplication and double-publishing of metrics follows a set of predefined rules that are activated when you decide to migrate. The metric rules are treated as system rules and can't be edited.


.. _data-migration-ui:

Grace period
------------------

The grace period for receiving and processing duplicated metrics at no additional cost lasts 6six months, starting with the release of the Java agent version 2.0. Migration support is available for 12 months after the release of version 2.0 and will be deprecated after 18 months.

.. note:: After the grace period, duplicated metric data is billed as custom metric data. Make sure to turn off the Data Migration action after you've completed the migration to avoid surcharges.


.. _migrate-java-steps:

Migrate to OTel Java 2.0
========================================

To migrate your instrumentation to the version 2.0 or higher of the Java agent, follow these steps:

1. Turn on the migration of Java metrics in the :guilabel:`Data Migration` page:

   - Go to :guilabel:`Settings`, :guilabel:`Data Configuration`.
   - Select :guilabel:`Data Migration`.
   - Inside the :guilabel:`Start migration` card, select :guilabel:`Start`.

2. Turn on OTLP histograms in the Splunk Distribution of OpenTelemetry Collector. See :ref:`enable-histograms-export`.

3. Make sure version 2.0 or higher of the Splunk Distribution of the Java agent is installed. See :ref:`upgrade-java-instrumentation`.

4. Migrate your custom reporting elements:

      - For Splunk APM, see :ref:`migrate-apm-custom-reporting`.

5. (Optional) Start using the new Java metrics 2.0 built-in dashboards. Built-in dashboard versions are available for Java service metrics representing metrics from versions 1.x and 2.x.

6. When ready, you can turn off the migration:

   - Go to :guilabel:`Settings`, :guilabel:`Data Configuration`.
   - Select :guilabel:`Data Migration`.
   - In the :guilabel:`Stop migration` card, select :guilabel:`Stop`.

.. caution:: If you don't turn off the Data Migration stream for Java metrics after the grace period, the duplicated metrics are billed as custom metrics. See :ref:`java-metrics-grace-period`.

.. _java-20-metric-names:

New metric names for version 2.0
======================================

.. include:: /_includes/gdi/java-20-metrics-equivalences.rst

For more information on OpenTelemetry semantic conventions, see OpenTelemetry semantic conventions.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
