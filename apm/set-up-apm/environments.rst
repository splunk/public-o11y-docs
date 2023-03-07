.. _apm-environments:

********************************************************
Set up deployment environments in Splunk APM 
********************************************************

.. Metadata updated: 1/23/23

.. meta::
    :description: Learn how to set the deployment environment tag in Splunk APM.

A deployment environment is a distinct deployment of your system or application that allows you to set up configurations that don't overlap with configurations in other deployments of the same application. Separate deployment environments are often used for different stages of the development process, such as development, staging, and production. 

A common application deployment pattern is to have multiple, distinct application environments that don't interact directly with each other but that are all being monitored by Splunk APM: for instance, quality assurance (QA) and production environments, or multiple distinct deployments in different data centers, regions or cloud providers. 

You can use the ``deployment.environment`` span tag in APM to identify the deployment environment with which each span is associated. 

Setting the ``deployment.environment`` span tag
===============================================

By setting the deployment environment as a span tag on the spans you send to Splunk APM, you can filter your APM experience by environment or environments of interest. There are two ways to add span tags to your spans: on a per-application basis during application auto-instrumentation, or via the Splunk Distribution of OpenTelemetry Collector. 

Once added to spans, the ``deployment.environment`` tag is automatically indexed and becomes a dimension on both Troubleshooting MetricSets and Monitoring MetricSets. To learn more about MetricSets in APM, see :ref:`apm-metricsets`. 

On spans where the ``deployment.environment`` tag is not set, Splunk APM assumes ``deployment.environment = <unknown>``. 

For more information about adding span tags to spans, see :ref:`apm-add-context-trace-span`. 

.. include:: /_includes/tag-decision-support.rst

Set ``deployment.environment`` via auto-instrumentation
-----------------------------------------------------------
To learn how to add span tags during auto-instrumentation, see :ref:`instrument-tags`.

Set ``deployment.environment`` in the Splunk Distribution of OpenTelemetry Collector
------------------------------------------------------------------------------------------------------
The :new-page:`Splunk Distribution of OpenTelemetry Collector agent config file <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/agent_config.yaml#L117>` includes the following ``resource`` processor for adding the ``deployment.environment`` tag, but it is commented out by default. Uncomment this section and add the ``resource/add_environment`` processor to a pipeline if you want to set the ``deployment.environment`` span tag via the Splunk Distribution of OpenTelemetry Collector instead of via instrumentation:

.. code-block:: yaml

    resource/add_environment:
        attributes:
        action: insert
        value: staging/production/...
        key: deployment.environment

Note that unlike standard attributes, the ``deployment.environment`` tag is set with the ``resource`` processor in OpenTelemetry, because this tag is typically associated with the host or container in which the application is running.

To learn more about how to add span tags via the Splunk Distribution of OpenTelemetry Collector, see :ref:`otel-span-tags`.

Alert on specific environments
===========================================
You can monitor application behavior in each of your environments by setting up detectors or distinct alert thresholds for specific environments. To learn more about using detectors and alerts in APM, see :ref:`apm-alerts`. 
