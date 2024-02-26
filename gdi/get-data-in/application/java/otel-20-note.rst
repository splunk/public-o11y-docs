.. _note-otel-migration-java:

***********************************************
OpenTelemetry Java Instrumentation 2.x release
***********************************************

.. meta::
  :description: OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates.

OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates. Changes to upstream OpenTelemetry Java instrumentation will impact Splunk OpenTelemetry Java distribution.

To solve this, the 2.0 GA release of the Splunk Distribution of OpenTelemetry Java is fully compatible with the enhancements introduced by OpenTelemetry native version. A migration guide is available to all users. See :ref:`java-metrics-migration-guide`.

Until the stable release of the Splunk Distribution of OpenTelemetry Java 2.0, existing and new customers must continue using version 1.x of the Splunk distribution, which is fully supported and is compatible with existing features of Splunk Observability Cloud.

If you're using the upstream OpenTelemetry 1.x instrumentation, wait before upgrading to version 2.x, as it might cause built-in Java metric dashboards and features that rely on metricized attributes, such Metric Time Series (MTS) and Troubleshooting MetricSets (TMS), to not work as expected.

For more information, see:

* :ref:`About the Splunk Distribution of OpenTelemetry Java <splunk-java-otel-dist>`
* :ref:`APM specific information on the new semantic conventions <migrate-apm-custom-reporting>`
* :ref:`java-metrics-migration-guide`
* :new-page:`OpenTelemetry semantic convention <https://opentelemetry.io/docs/specs/semconv/>`

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
