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

Splunk-specific environment variables are listed on the table below:

.. list-table::
    :widths: 15 75 10
    :width: 100
    :header-rows: 1

    *   - Name
        - Description
        - Default config?
    *   - ``SPLUNK_ACCESS_TOKEN`` 
        - The Splunk access token to authenticate requests
        - Yes
    *   - ``SPLUNK_API_URL`` 
        - The Splunk API URL. For example, https://api.us0.signalfx.com
        - Yes
    *   - ``SPLUNK_BUNDLE_DIR`` 
        - The path to the Smart Agent bundle. For example, /usr/lib/splunk-otel-collector/agent-bundle
        - Yes
    *   - ``SPLUNK_COLLECTD_DIR``
        - The path to the collectd config directory for the Smart Agent. For example, /usr/lib/splunk-otel-collector/agent-bundle/run/collectd
        - Yes
    *   - ``SPLUNK_HEC_TOKEN`` 
        - The Splunk HEC authentication token
        - Yes
    *   - ``SPLUNK_HEC_URL`` 
        - The Splunk HEC endpoint URL. For example, https://ingest.us0.signalfx.com/v1/log
        - Yes
    *   - ``SPLUNK_INGEST_URL`` 
        - The Splunk ingest URL. For example, https://ingest.us0.signalfx.com
        - Yes
    *   - ``SPLUNK_LISTEN_INTERFACE`` 
        - The network interface the agent receivers listen on
        - Yes
    *   - ``SPLUNK_TRACE_URL`` 
        - The Splunk trace endpoint URL. For example, https://ingest.us0.signalfx.com/v2/trace
        - Yes