.. _java-metrics-migration-guide:

***************************************************
Migration guide for OpenTelemetry Java 2.0 metrics
***************************************************

.. meta::
  :description: OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates.

penTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates. Changes to upstream OpenTelemetry Java instrumentation will impact Splunk OpenTelemetry Java distribution.

To solve this, the 2.0 GA release of the Splunk Distribution of OpenTelemetry Java, expected to happen in early 2024, will be fully compatible with the enhancements introduced by OpenTelemetry native version. A migration guide will be made available to all users.

Until the stable release of the Splunk Distribution of OpenTelemetry Java 2.0, existing and new customers must continue using version 1.x of the Splu

If you're using the upstream OpenTelemetry 1.x instrumentation, wait before upgrading to version 2.x, as it might cause built-in Java metric dashboards and features that rely on metricized attributes, such MTS and TMS, to not work as expected.

ENABLE 

DATA MIGRATION PAGE

Assuming that: All prerequisite available (implemented or releases)
Decision by customer to start the migration 
Prepare for migration 
Regenerate custom metricssets of HTTP sem convention impacted indexes under new naming conventions
Enable migration functionality for Java 2.x migration
Deploy instrumentation 
Splunk OTel Collector in version including necessary metric exporter changes  
Splunk Java instrumentation 2.x agent 
Perform migration steps on IM 
Re-create dashboards for impacted metrics 
Re-create detectors and alerts for impacted metrics
Perform migration steps on APM
Customers need to manually change MMS references in their custom reporting (dashboards, charts, and detectors). 
Switch to Java service runtime metrics 2.0 dashboard
Migration steps on RUM 
TBD
Disable metric processor transformations and double-publishing 
General assumptions 
Manual migration - Customers will have to migrate their custom dashboards containing metrics for impacted charts and detectors with associated  alerts (i.e. custom elements) to be based on new metrics and semantic conventions. The migration will be documented in the form of a migration guide describing how to identify and change the content. The guide will be published in official documentation and if applicable referenced from data migration functionality in the observability cloud settings.
Best effort migration - no parity of data or data formats - The migration is caused by a series of breaking changes in semantic conventions and metrics. Therefore the data presented after the migration will not be the same as before migration and will have different structure and in some cases meaning. It is critical to convey that message to any team (internal or external) impacted by this change.  
Migration start - Migration will start based on customer decision to start using Java OpenTelemetry instrumentation 2.x and will require as one of the first steps update of the instrumentation components (java agent, collector).
Preventing access to data  - To prevent sudden loss of access to custom elements new data will be duplicated and double-published for a limited period of time without charge i.e. grace period.
Grace period length is 6 months - during which a customer will not be charged for duplicated data.  
Cost after the grace period - After grace duplicated data will be treated as custom metrics and a customer will be charged for it according to general billing rules.
Grace period is fixed. - Grace period starts when Splunk Otel Java 2.x instrumentation is released  and lasts for a predetermined period of time which is minimum 6  months and should not exceed EoS for Splunk Otel Java 1.x instrumentation so ~12 months from 2.x release.  . 
Metric transformations in metric processor. - transformations, duplication and double-publishing of selected metrics will happen in the metric processor based on a set of predefined rules which will be active when the user will decide to enable migration functionality.. 
Metric Pipeline Management UX changes to show migration rules - The MPM will display all the defined rules similarly to any other rule. The migration rules will be treated as system rules which can not be edited or modified by the user/admin.The metric processor UI user experience - Metric Pipline Mnagment 
Migration management UX - A new settings page (available on settings navigation and/or icon on data management bar) will be created to manage current and future migrations. The page will allow a set of migration procedures that can be enabled or disabled by the user and will automatically generate necessary actions in the system. That UI will also contain all additional information related to migrations.
Built-in (i.e. Out of the Box or OoTB) Java service metrics dashboards in two versions. - Two dashboard versions will be available for Java service metrics representing metrics from 1.x and 2.x and will be displayed to the customer simultaneously. The customer should have the ability to select which dashboard to use. 
Java profiling metrics will not be impacted. - Metrics used as part of Java profiling feature for CPU and memory will not be impacted.Required profiling metrics will be transformed from new metrics to old or Java 2.x will continue to publish metrics that can not be transformed.
HTTP Semantic convention changes for APM - The semantic convention change should not impact the main UI and its general functions and built-in features; however any customer defined indexes will have to be manually updated.
HTTP Semantic convention changes for RUM - The semantic convention change should not impact the main UI and its general functions however any customer defined indexes will have to be manually updated.
Migration documentation - The migration process will be described in the form of a high level migration guide and several area specific migration guide documents. High level migration guides will describe overall process and reference area specific migration guides as needed.
Data migration page - describes new settings page and its operations.
Instrumentation guide - describes the steps necessary to migrate to new Java 2.x instrumentation covering java agent and collector.
APM guide - describes the changes related to built-in and custom TMS, MMS, associated custom reporting, built-in dashboard as well as any other steps related to semantic conventions updates 
IM guide - describes manual steps necessary to recreate dashboards/charts and detectors/alerts.management and metric processor to control the process of transformation. 
RUM guide - describes the changes related to functionality as well as any other steps related to semantic conventions updates 


For more information, see:

* :ref:`About the Splunk Distribution of OpenTelemetry Java <splunk-java-otel-dist>`
* :ref:`APM specific information on the new semantic conventions <migrate-apm-custom-reporting>`
* :new-page:`OpenTelemetry semantic convention <https://opentelemetry.io/docs/specs/semconv/>`

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst