.. _kafkametrics-receiver:

****************************
Kafka metrics receiver
****************************

.. meta::
      :description: Collects Kafka metrics such as brokers, topics, partitions, and consumer groups from Kafka server, and converts them to OTLP format.

The Kafka metrics receiver collects Kafka metrics (such as brokers, topics, partitions, and consumer groups) from a Kafka server and converts them to OTLP format. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Sample configuration
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

* ``protocol_version``. No default. The Kafka protocol version, for example ``2.0.0``.

* ``scrapers``. No default. Any combination of the following scrapers can be enabled:

  * ``topics``

  * ``consumers``

  * ``brokers``

The following settings are optional:

* ``brokers``. ``localhost:9092`` by default. The list of brokers to read from.

* ``resolve_canonical_bootstrap_servers_only``. ``false`` by default. Determines whether to resolve then reverse-lookup broker IPs during startup.

* ``topic_match``. ``^[^_].*$)`` by default. Regex pattern of topics to filter on metrics collection. The default filter excludes internal topics, which start with ``_``.

* ``group_match``. ``.*)`` by default. Regex pattern of consumer groups to filter on for metrics.

* ``client_id``. ``otel-metrics-receiver`` by default. Consumer client Id.

* ``collection_interval``. ``1m`` by default. Frequency of metric collection/scraping.

* ``initial_delay``. ``1s`` by default. Determines how long this receiver waits before starting.

* ``auth``. No default. Use one of the following:

  * ``plain_text``. It has the following fields:

    * ``username``. The username to use.

    * ``password``. The password to use.

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

The following table shows the configuration options for the Kafka metrics receiver:

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



