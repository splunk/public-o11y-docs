.. _collector-env-var:

*********************************************************************************
Environment variables
*********************************************************************************

.. meta::
    :description: Environment variables for the Collector.

The Splunk Distribution of the OpenTelemetry Collector uses both upstream and Splunk-specific environment variables.

Upstream environment variables
==========================================

Upstream environment variables are common to all OpenTelemetry implementations, such as ``OTEL_RESOURCE_ATTRIBUTES`` or ``OTEL_SERVICE_NAME``.

For a detailed list of the upstream environment variables, refer to OpenTelemetry official docs. See more at :new-page:`Environment variable specification <https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/>`. 

Splunk-specific environment variables
==========================================

.. include:: /_includes/collector-env-vars.rst