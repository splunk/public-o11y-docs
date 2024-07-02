.. _kafka-receiver:

****************************
Kafka receiver
****************************

.. meta::
      :description: Receives metrics, logs, and traces from Kafka. Metrics and logs only support the OTLP format.

The Kafka receiver allows the Splunk Distribution of the OpenTelemetry Collector to collect metrics and logs (in OTLP format), and traces, from Kafka. Message payload encoding is configurable. The supported pipeline types are ``metrics``, ``logs``, and ``traces``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Kafka receiver as described in the next section.
3. Restart the Collector.

Sample configuration
----------------------

To activate the receiver, add ``kafka`` to the ``receivers`` section of your configuration file:

.. code:: yaml

  receivers:
    kafka:
      protocol_version: 2.0.0

To complete the configuration, include the receiver in the one ore more pipelines of the ``service`` section of your configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [kafka]

Main settings
----------------------

The following setting is required:

* ``protocol_version``. The Kafka protocol version, for example ``2.0.0``.

The following settings are optional:

* ``brokers``. ``localhost:9092`` by default. The list of Kafka brokers.

* ``resolve_canonical_bootstrap_servers_only``. ``false`` by default. Whether to resolve then reverse-lookup broker IPs during startup.

* ``topic``. Defaults: ``otlp_spans`` for traces, ``otlp_metrics`` for metrics, ``otlp_logs`` for logs. The name of the Kafka topic to read from. You can only use one telemetry type for a given topic.

* ``encoding``. ``otlp_proto`` by default. The encoding of the payload received from Kafka. The following encodings are available :

  * ``otlp_proto``. The payload is deserialized to ``ExportTraceServiceRequest``, ``ExportLogsServiceRequest`` or ``ExportMetricsServiceRequest`` respectively.

  * ``jaeger_proto``. The payload is deserialized to a single Jaeger proto ``Span``.

  * ``jaeger_json``. The payload is deserialized to a single Jaeger JSON Span using ``jsonpb``.

  * ``zipkin_proto``. The payload is deserialized into a list of Zipkin proto spans.

  * ``zipkin_json``. The payload is deserialized into a list of Zipkin V2 JSON spans.

  * ``zipkin_thrift``. The payload is deserialized into a list of Zipkin Thrift spans.

  * ``raw````. Only for logs. The payload's bytes are inserted as the body of a log record.

  * ``text``. Only for logs. The payload is decoded as text and inserted as the body of a log record. By default, it uses UTF-8 to decode. You can use ``text_<ENCODING>``, such as ``text_utf-8`` or ``text_shift_jis``, to customize this behavior.

  * ``json``. Only for logs. The payload is decoded as JSON and inserted as the body of a log record.

  * ``azure_resource_logs``. Only for logs. The payload is converted from Azure Resource Logs format to OTLP.

* ``group_id``. ``otel-collector`` by default. The consumer group the receiver consumes messages from.

* ``client_id``. ``otel-collector`` by default. The consumer client ID.

* ``initial_offset``. ``latest`` by default. The initial offset to use if no offset was previously committed. Possible values are ``latest`` or ``earliest``.

* ``auth``. Use one of the following:

  * ``plain_text``. It has the following fields:

    * ``username``. The username to use.

    * ``password``. The password to use.

  * ``sasl``. It has the following fields:

    * ``username``. The username to use.

    * ``password``. The password to use.

    * ``mechanism``. The SASL mechanism to use: ``SCRAM-SHA-256``, ``SCRAM-SHA-512``, ``AWS_MSK_IAM`` or ``PLAIN``.

    * ``aws_msk.region``. If using ``AWS_MSK_IAM``, AWS region.

    * ``aws_msk.broker_addr``. If using ``AWS_MSK_IAM``, MSK broker address.

  * ``tls``. It has the following fields:

    * ``ca_file``. Use only if ``insecure`` is set to ``false``. Path to the CA cert. For a client it verifies the server certificate. 

    * ``cert_file``. Use only if ``insecure`` is set to ``false``. Path to the TLS cert to use for TLS required connections. 

    * ``key_file``. Use only if ``insecure`` is set to ``false``. Path to the TLS key to use for TLS required connections. 

    * ``insecure``. ``false`` by default. Disables the verification of the server's certificate chain and host name, ``InsecureSkipVerify`` in the tls configuration.

    * ``server_name_override``. Indicates the name of the server requested by the client in order to support virtual hosting.

  * ``kerberos``. It has the following fields:

    * ``service_name``. Kerberos service name.

    * ``realm``. Kerberos realm.

    * ``use_keytab``. If ``true``, the keytab is used instead of the password.

    * ``username``. The Kerberos username used to authenticate with KDC.

    * ``password``. The Kerberos password used to authenticate with KDC.

    * ``config_file``. Path to Kerberos configuration, for example ``/etc/krb5.conf``.

    * ``keytab_file``. Path to the keytab file, for example ``/etc/security/kafka.keytab``.

    * ``disable_fast_negotiation``. ``false`` by default. Disables the PA-FX-FAST negotiation (Pre-Authentication Framework - Fast). Some common Kerberos implementations do not support PA-FX-FAST negotiation. 

* ``metadata``. It has the following fields:

  * ``full``. ``true`` by default. Whether to maintain a full set of metadata. When disabled, the client does not make the initial request to broker at the startup.

  * ``retry``. It has the following fields:

    * ``max``. ``3`` by default. The number of retries to get metadata.

    * ``backoff``. ``250ms`` by default. How long to wait between metadata retries.

* ``autocommit``. It has the following fields:

  * ``enable``. ``true`` by default. Whether or not to auto-commit updated offsets back to the broker.

  * ``interval``. ``1s`` by default. How frequently to commit updated offsets. Ineffective unless ``auto-commit`` is enabled.

* ``message_marking``. It has the following fields:

  * ``after``. ``false`` by default. If ``true``, the messages are marked after the pipeline is executed.

  * ``on_error``. ``false`` by default. If ``false``, only the successfully processed messages are marked. Note that this can block the entire partition in case a processed message returns a permanent error.

* ``header_extraction``. Determines how to extract headers. It has the following fields:

    * ``extract_headers``. ``false`` by default. If ``true``, header fields are attached to resource attributes.

    * ``headers``.  ``[]``  by default. List of headers you want to extract from the Kafka records. The matching pattern is ``exact``. Regexes are not supported for the moment.         

Configuration example: Connect to Kafka using SASL and TLS
--------------------------------------------------------------

This is an example of how to configure the receiver to connect to Kafka using SASL and TLS:

.. code:: yaml

  receivers:
    kafka:
      auth:
        sasl:
          username: "user"
          password: "secret"
          mechanism: "SCRAM-SHA-512"
        tls:
          insecure: false

Configuration example: Extract headers
--------------------------------------------------------------

This is an example of how to configure the receiver to extract headers:

.. code:: yaml

  receivers:
    kafka:
      topic: test
      header_extraction: 
        extract_headers: true
        headers: ["header1", "header2"]      

If you feed the receiver the following ``test``:

.. code:: yaml

  {
    event: Hello,
    headers: {
      header1: value1,
      header2: value2,
    }
  }

You'll obtain the following log record:

.. code:: yaml

  {
    ...
    body: Hello,
    resource: {
      kafka.header.header1: value1,
      kafka.header.header2: value2,
    },
    ...
  }

The following applies:

* Kafka record headers ``header1`` and ``header2`` are added to the resource's attributes.
* Every matching Kafka header key is prefixed with the ``kafka.header`` string and attached to the resource's attributes.

Settings
======================

The following table shows the configuration options for the Kafka receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/kafka.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
