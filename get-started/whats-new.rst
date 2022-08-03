.. _whats-new:

*****************************************************************
What's new in Splunk Observability Cloud
*****************************************************************

.. meta::
      :description: This topic describes what's new in Splunk Observability Cloud.

The Splunk Observability Cloud provides end-to-end visibility into your environment. The following products comprise the Observability Cloud: Splunk Infrastructure Monitoring, Splunk Application Performance Monitoring (APM), Splunk Real User Monitoring (RUM), and Splunk Log Observer. If you are interested in an incident response product, you can opt in to access Splunk On-Call.

The Observability Cloud is available in two editions:

- Standard, which includes Infrastructure Monitoring, APM, and Log Observer
- Plus, which includes the Standard components plus RUM

Both editions support optional connections to Splunk On-Call and Splunk Enterprise Cloud.

This document provides an overview of the changes from the classic user interface (formerly SignalFx) to the new Observability Cloud.

New UI
=========

The Observability Cloud UI provides access to common user workflows across all areas of functionality. You can easily switch between product pages using the navigation menu on the left. You can also access your organization settings, your profile, and help and support from this menu.

New look
^^^^^^^^^^^^^^^^^^^^^^^^^^^
The Home page features a card-based design with links to more detailed information about Observability Cloud products. You can also get quick access to your alerts and dashboards from the Home page.

Primary navigation moved from the top of the application to the left side of the workspace. The top half of the navigation is dedicated to the different product areas. Below that are all of the shared resources such as alerts and dashboards.

Virtual metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^
The Observability Cloud virtualizes metrics used in the host infrastructure navigator for each cloud provider (AWS, GCP, or Azure), allowing metrics captured from agents like the OpenTelemetry Collector or Smart Agent to be merged with metrics captured from a cloud environment.

Virtual metrics ensure that  built-in infrastructure navigator dashboards and your custom programs get metric data from the best source available. This means that each resource (such as a VM) has a single dashboard in the infrastructure explorer and a single metric describing each aspect of its performance (CPU consumption, memory consumption, etc.).

.. For more information on virtual metrics, see virtual metrics (https://signalfuse.atlassian.net/browse/ANALYTICS-1752).

Related content
^^^^^^^^^^^^^^^^^^^^^^^^^^^
The Related Content bar is located at the bottom of the workspace and is used to access related content views within the Observability Cloud. When you use the Related Content bar to jump across related data views in other Observability Cloud products, the same filters automatically apply in the new view to ensure that you see the new view's relevant information.

Splunk APM
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
APM is an application performance monitoring and troubleshooting solution for cloud-native, microservices-based applications.

The separate monitoring and troubleshooting pages have transformed into a single APM landing page, powered by low-latency Monitoring Metricsets. This consolidated view showcases the most sought-after functionality such as tag spotlight.

For instructions on how to set up and instrument Splunk APM, see :ref:`get-started-application`.

Splunk Infrastructure Monitoring
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Infrastructure Monitoring is a purpose-built metrics platform to address real-time cloud monitoring requirements at scale.

Splunk overhauled Infrastructure Monitoring with the following changes:

- Improved navigation between views of related infrastructure and services. This capability lets you seamlessly explore signals across related services and infrastructure.
- Dedicated navigators for the hosts, containers, or functions. This capability lets Infrastructure Monitoring work with various systems, regardless of whether the metrics come from an agent or from a cloud integration, making it easier for you to analyze your infrastructure and not your data sources.

For instructions on how to set up Infrastructure Monitoring, see :ref:`get-started-infrastructure`.

New integration experience
====================================

The Observability Cloud offers support for a broad range of integrations for collecting data of all kinds, from system metrics for infrastructure components to custom data from your applications.

Guided setup
^^^^^^^^^^^^^^^^^^^^^^^^

We have added setup wizards for common data sources, including AWS, Windows VMs, Linux VMs, and Kubernetes. From the Data Setup page, select your integration and follow the step-by-step process provided in the wizard.

The Splunk Distribution of OpenTelemetry Collector
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Splunk is deprecating the SignalFx Smart Agent and replacing it with the Splunk Distribution of OpenTelemetry Collector. The OpenTelemetry Collector fulfills the same role as the Smart Agent, including these primary use cases:

- Centrally managing authentication, batching, and retry
- Sending data from multiple Smart Agents to an OpenTelemetry Collector in the same environment

For instructions on how to set up the OpenTelemetry Collector and the benefits of using it over the Smart Agent, see the :new-page:`Splunk OpenTelemetry Collector <https://github.com/signalfx/splunk-otel-collector>`.

Mapping service for migrating to the Splunk Distribution of OpenTelemetry Collector
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Migrating from the Smart Agent to OpenTelemetry Collector means changes to metrics and dimension names. Splunk has created a mapping service for customers already using OpenTelemetry standards. This mapping service provides the capability to define equivalencies between OpenTelemetry names for data and metadata and their legacy collectd/Smart Agent conventions.

With these equivalencies in place, customers should be able to deploy collectors that conform to the OpenTelemetry conventions. Their existing content should provide a consistent experience for them compared to monitoring the same entities with Smart Agent.

For instructions on how to use the mapping service, see :ref:`get-started-mapping-service`.

New products
=================
Log Observer and RUM are new Splunk products. Log Observer must be purchased with Infrastructure Monitoring, APM, or one of the Observability Cloud bundles. RUM is sold as a standalone product and as part of the Observability Cloud.

Splunk RUM
^^^^^^^^^^^^

RUM collects performance data, errors, and other forms of data to measure the health of your application and assess the performance of your user experience.

For instructions on how to set up RUM, see :ref:`rum-rum-org`.

Splunk Log Observer
^^^^^^^^^^^^^^^^^^^^^^

Splunk Log Observer offers real-time insight into the logs in your environment. With Log Observer, you can perform code-less queries on your logs to identify and troubleshoot problems in your systems. Monitor your releases with the Live Tail feature to get feedback in real-time if your new deployment or recent integration went smoothly.

For instructions on how to set up Log Observer, see :ref:`logs-logs`.
