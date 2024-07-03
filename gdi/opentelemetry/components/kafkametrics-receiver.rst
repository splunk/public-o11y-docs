.. _kafkametrics-receiver:

****************************
Kafka metrics receiver
****************************

.. meta::
      :description: Collects Kafka metrics such as brokers, topics, partitions, and consumer groups from Kafka server, and converts them to OTLP format.

The Kafka metrics receiver collects Kafka metrics (such as brokers, topics, partitions, and consumer groups) from a Kafka server and converts them to OTLP format.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Sample configurations
---------------------------

To activate the Kafka metrics receiver, add ``kafkametrics`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    kafkametrics:
      protocol_version: 2.0.0
      scrapers:
        - brokers
        - topics
        - consumers

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [kafkametrics]

Configuration options
--------------------------------------------

These settings are required:

* ``protocol_version``. No default. Kafka protocol version.

* ``scrapers``. No default. Any combination of the following scrapers can be enabled:

  * ``topics``

  * ``consumers``

  * ``brokers``

The following settings are optional:

* brokers (default = localhost:9092): the list of brokers to read from.

* resolve_canonical_bootstrap_servers_only (default = false): whether to resolve then reverse-lookup 

* broker IPs during startup.

* topic_match (default = ^[^_].*$): regex pattern of topics to filter on metrics collection. The default filter excludes internal topics (starting with _).

* group_match (default = .*): regex pattern of consumer groups to filter on for metrics.

* client_id (default = otel-metrics-receiver): consumer client id

* collection_interval (default = 1m): frequency of metric collection/scraping.

* initial_delay (default = 1s): defines how long this receiver waits before starting.

* auth (default none)

  * plain_text
username: The username to use.
password: The password to use

  * ``tls``. 

    * ``ca_file: path to the CA cert. For a client this verifies the server certificate. Should only be used if insecure is set to true.

    * ``cert_file: path to the TLS cert to use for TLS required connections. Should only be used if insecure is set to true.

    * ``key_file: path to the TLS key to use for TLS required connections. Should only be used if insecure is set to true.

    * ``insecure (default = false): Disable verifying the server's certificate chain and host name (InsecureSkipVerify in the tls config)

    * ``server_name_override: ServerName indicates the name of the server requested by the client in order to support virtual hosting.

  * ``kerberos``

    * ``service_name: Kerberos service name

    * ``realm: Kerberos realm

    * ``use_keytab: Use of keytab instead of password, if this is true, keytab file will be used instead of password

    * ``username: The Kerberos username used for authenticate with KDC

    * ``password: The Kerberos password used for authenticate with KDC

    * ``config_file: Path to Kerberos configuration. i.e /etc/krb5.conf

    * ``keytab_file: Path to keytab file. i.e /etc/security/kafka.keytab

    * ``disable_fast_negotiation: Disable PA-FX-FAST negotiation (Pre-Authentication Framework - Fast). Some common Kerberos implementations do not support PA-FX-FAST negotiation. This is set to false by default.

Configuration example: Set authentication and the collection interval to 5 seconds
----------------------------------------------------------------------------------------------

This example sets the collection interval for all scrapers to 5 seconds and configures TLS authentication:

.. code:: yaml

  receivers:
    kafkametrics:
      brokers: 10.10.10.10:9092
      protocol_version: 2.0.0
      scrapers:
        - brokers
        - topics
        - consumers
      auth:
        tls:
          ca_file: ca.pem
          cert_file: cert.pem
          key_file: key.pem
      collection_interval: 5s

Settings
======================

The following table shows the configuration options for the MongoDB receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/kafkametrics.yaml"></div>

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/kafkametricsreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst



