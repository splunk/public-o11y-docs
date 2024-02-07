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
    *   - ``SPLUNK_BALLAST_SIZE_MIB`` 
        - Use it to set the ballast size for the Collector explicitly instead of the value calculated from ``SPLUNK_MEMORY_LIMIT_MIB``. Set it to 1/3 to 1/2 of the configured memory
        - No
    *   - ``SPLUNK_BUNDLE_DIR`` 
        - The path to the Smart Agent bundle. For example, ``/usr/lib/splunk-otel-collector/agent-bundle``
        - Yes
    *   - ``SPLUNK_COLLECTD_DIR``
        - The path to the collectd config directory for the Smart Agent. For example, ``/usr/lib/splunk-otel-collector/agent-bundle/run/collectd``
        - Yes
    *   - ``SPLUNK_CONFIG`` 
        - Destination path of the Collector custom configuration file 
        - No
    *   - ``SPLUNK_CONFIG_YAML`` 
        - Specifies your custom configuration YAML. This is useful in environments where access to the underlying file system is not readily available
        - No
    *   - ``SPLUNK_DEBUG_CONFIG_SERVER`` 
        - By default, the Collector provides a sensitive value-redacting, local config server listening at http://localhost:55554/debug/configz/effective, which is helpful in troubleshooting. To disable it, set ``SPLUNK_DEBUG_CONFIG_SERVER`` to any value other than ``true``. To set the desired port to listen to, use ``SPLUNK_DEBUG_CONFIG_SERVER_PORT``
        - No
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
        - The network interface the agent receivers listen on. ``0.0.0.0`` by default
        - Yes
    *   - ``SPLUNK_MEMORY_LIMIT_MIB`` 
        - Use it to set the memory limit for the ``memory_limiter`` processor. 512 MiB by default 
        - No
    *   - ``SPLUNK_MEMORY_TOTAL_MIB`` 
        - Total memory in MiB to allocate to the Collector
        - No
    *   - ``SPLUNK_REALM`` 
        - Your Splunk realm
        - No
    *   - ``SPLUNK_TRACE_URL`` 
        - The Splunk trace endpoint URL. For example, https://ingest.us0.signalfx.com/v2/trace
        - Yes

``SPLUNK_*_URL`` environment variables are automatically derived from ``SPLUNK_REALM``. For example, ``SPLUNK_INGEST_URL`` = https://ingest.SPLUNK_REALM.signalfx.com.