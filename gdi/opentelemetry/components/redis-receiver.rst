.. _redis-receiver:

****************************************
Redis receiver
****************************************

.. meta::
      :description: The Redis receiver retrieves Redis ``INFO`` data from a specific Redis instance and builds metrics from it.

Get started
======================

The Redis receiver is designed to retrieve Redis ``INFO`` data from a single Redis instance, build metrics from that data, and send them to the next consumer at a configurable interval.

Understand the Redis receiver and the ``INFO`` command
----------------------------------------------------------------------

The Redis ``INFO`` command returns information and statistics about a Redis server. The Redis receiver extracts values from the result and converts them to OpenTelemetry metrics. 

For example, the Redis ``INFO`` command returns ``used_cpu_sys``, which indicates the system CPU consumed by the Redis server, expressed in seconds, since the start of the Redis instance. The Redis receiver turns this data into a gauge with a metric name of ``redis.cpu.time`` and a unit value of seconds.

For more information, see :

* :new-page:`Redis commands info <https://redis.io/commands/info>`
* The list of Redis receiver metrics at :ref:`redis-receiver-metrics`

Configure the Redis receiver
----------------------------------------------------------------------

To activate the Redis receiver manually in the Collector configuration, add ``redis`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    redis:
      endpoint: "localhost:6379"
      username: "test"
      password: "test"
      collection_interval: 10s
      tls:
        insecure: true

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [redis]

Configuration settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following setting is required:

* ``endpoint``: The hostname and port of the Redis instance, separated by a colon. No default value.

The following settings are optional:

* ``collection_interval``: This receiver runs on an interval. Each time it runs, it queries Redis, creates metrics, and sends them to the next consumer. The ``collection_interval`` configuration option tells this receiver the duration between runs. 

  * ``collection_interval`` must be a string readable by Golang's ParseDuration function, such as ``1h30m``. Valid time units are ns, us (or µs), ms, s, m, h. ``10s`` by default. 

* ``password``: The password used to access the Redis instance; must match the password specified in the requirepass server configuration option. No default value.

* ``transport``: Defines the network to use for connecting to the server: ``tcp`` or ``unix``. ``tcp`` by default. 

* ``tls``:

  * ``insecure``: Whether to disable client transport security for the exporter's connection. ``true`` by default.

  * ``ca_file``: The path to the CA certification. For a client this verifies the server certificate. 
  
    * Only use if ``insecure`` is set to ``false``.

  * ``cert_file``: The path to the TLS certification to use for TLS required connections. 

    * Only use if ``insecure`` is set to ``false``.
  
  * ``key_file``: The path to the TLS key to use for TLS required connections. 

    * Only use if ``insecure`` is set to ``false``.

Configure the receiver using environment variables
----------------------------------------------------------------------

In OpenTelemetry you can configure any component using environment variables. For example, to pick up the value of an environment variable ``REDIS_PASSWORD``, use:

.. code:: yaml

  receivers:
    redis:
      endpoint: "localhost:6379"
      collection_interval: 10s
      password: ${env:REDIS_PASSWORD}

Settings
======================

The following table shows the configuration options for the Redis receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/redis.yaml"></div>

.. _redis-receiver-metrics:

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/redisreceiver.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
