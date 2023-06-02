.. _splunk-hec-receiver:

*************************
Splunk HEC receiver
*************************

.. meta::
      :description: The Splunk HEC receiver allows the Splunk Distribution of OpenTelemetry Collector to collect logs and metrics in Splunk HTTP Event Collector format.

The Splunk HTTP Event Collector (HEC) receiver allows the Splunk Distribution of OpenTelemetry Collector to collect events and logs in Splunk HEC format. The supported pipeline types are ``metrics`` and ``logs``. See :ref:`otel-data-processing` for more information.

The receiver accepts data formatted as JSON HEC events under any path or as end-of-line separated log raw data if sent to the ``raw_path``. See :new-page:`Format events for HTTP Event Collector <https://docs.splunk.com/Documentation/Splunk/latest/Data/FormateventsforHTTPEventCollector>` for more information.

.. note:: For information about the HEC exporter, see :ref:`splunk-hec-exporter`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Splunk HEC receiver as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the Splunk HEC receiver add a ``splunk_hec`` entry inside the ``receivers`` section of the Collector configuration file. For example:

.. code-block:: yaml

   receivers:
      splunk_hec:

The following example shows a Splunk HEC receiver configured with all available settings:

.. code-block:: yaml

   receivers:
     # ...
     splunk_hec:
     # Address and port the Splunk HEC receiver should bind to
     endpoint: localhost:8088
     # Whether to preserve incoming access token
     access_token_passthrough: true
     # Path accepting raw HEC events (logs only)
     raw_path: "/foo"
     # Path reporting health checks
     health_path: "/bar"
     # Define field mappings
     hec_metadata_to_otel_attrs:
       source: "file.name"
       sourcetype: "foobar"
       index: "myindex"
       host: "myhostfield"
     # Optional TLS settings
     tls:
       # Both cert_file and
       # key_file are required
       # for TLS connections
       cert_file: /test.crt
       key_file: /test.key

Authorize HTTP requests
-----------------------------

You can use extensions to modify how the handles HTTP server requests: 

* https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/basicauthextension
* https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/bearertokenauthextension
* https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/oidcauthextension
* https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/oauth2clientauthextension

You can also implement your own auth extension to fulfill your requirements using the package https://github.com/open-telemetry/opentelemetry-collector/tree/main/extension/auth and relying on https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configauth.

The receiver gets this ability through its config extending HTTPServerSettings:
https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/splunkhecreceiver/config.go#L21

HTTPServerSettings itself brings the auth settings under the auth key here: https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/confighttp/confighttp.go#L55

Settings
======================

The following table shows the configuration options for the Splunk HEC receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/splunk_hec.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
