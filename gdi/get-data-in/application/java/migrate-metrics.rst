.. _java-metrics-migration-guide:

***************************************************
Migration guide for OpenTelemetry Java 2.0 metrics
***************************************************

.. meta::
  :description: OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates.

OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates. Versions 2.0 and higher of the Splunk Distribution of OpenTelemetry Java are fully compatible with these changes.

Follow the steps in this guide to migrate to 2.0 metrics and convert your IMM, APM, and RUM custom reporting to the new metrics format.

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

.. include:: /_includes/gdi/java-20-metrics-equivalences.rst

For more information, see:

* :new-page:`OpenTelemetry semantic convention <https://opentelemetry.io/docs/specs/semconv/>`

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst