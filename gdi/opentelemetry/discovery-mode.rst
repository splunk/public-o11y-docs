.. caution:: Preview: Discovery mode in Splunk Distribution of OpenTelemetry Collector

    Preview features described in this document are provided by Splunk to you "as is" without any warranties, maintenance and support, or service-level commitments. Splunk makes this preview feature available in its sole discretion and may discontinue it at any time. Use of preview features is subject to the :new-page:`Splunk General Terms <https://www.splunk.com/en_us/legal/splunk-general-terms.html>`.

.. _discovery_mode:

***************************************************************************
Discover and configure metrics sources automatically
***************************************************************************

.. meta::
      :description: Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and collect metrics automatically.

Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and create
a configuration based on the results. Discovery mode can detect several types of metric sources on the host, such as databases and servers. With this information, the Collector generates configuration you can modify and use.

The main advantage of using discovery mode is that you don't need to manually configure the OpenTelemetry Collector for the supported metric sources. This is helpful in environments when you deploy and activate host services dynamically, for example when scaling your infrastructure based on existing demand.

.. note:: Discovery mode is available starting from version 0.72.0 and higher of the Splunk Distribution of the OpenTelemetry Collector.

How discovery mode works
==========================================

When you run the Collector in discovery mode, it tests built-in configurations for supported metric receivers against endpoints discovered on your platform by observer extensions.

For any receiver that successfully retrieves metrics, the Collector translates the discovery configuration to a receiver creator instance with the known working rules. See :ref:`receiver-creator-receiver` for more information.

At the same, the Collector adds the configuration to the ``metrics`` pipeline at runtime, unless you run the Collector using ``--dry-run``, in which case it outputs the configuration to the terminal.

For any receiver that can establish a connection with a service, discovery mode suggests which properties to set, or what extensions or settings to configure on the service to successfully retrieve telemetry.

Supported host services and applications
=========================================

Discovery mode supports the following host services and applications:

.. list-table::
   :width: 100%
   :widths: 30 70
   :header-rows: 1

   * - Service
     - Receiver

   * - MySQL
     - Smart Agent with MySQL monitor type. See :ref:`mysql`.

   * - PostgreSQL
     - :ref:`postgresql-receiver`

Discover active metric sources
=========================================

To discover any active and supported metric sources, run the following command on the desired monitoring host:

.. code-block:: shell

    bin/otelcol --discovery --dry-run

The ``--dry-run`` option ensures that the resulting configuration isn't applied to the Collector at runtime. The sample configuration appears in the console as YAML instead. For example:

.. code-block:: bash

   $ Discovering for next 10s...
   Partially discovered "smartagent/postgresql" using "docker_observer" endpoint "5c9c80ba4319395c26255b6374f048ca973d3618fdd4b92a9ed601c7dddbff6a:5432": Please ensure your user credentials are correctly specified with `--set splunk.discovery.receivers.smartagent/postgresql.config.params::username="<username>"` and `--set splunk.discovery.receivers.smartagent/postgresql.config.params::password="<password>"` or `SPLUNK_DISCOVERY_RECEIVERS_smartagent_x2f_postgresql_CONFIG_params_x3a__x3a_username="<username>"` and `SPLUNK_DISCOVERY_RECEIVERS_smartagent_x2f_postgresql_CONFIG_params_x3a__x3a_password="<password>"` environment variables. (evaluated "{\"error\":\"failed to determine total_time column name: pq: password authentication failed for user \\\"splunk.discovery.default\\\"\",\"host\":\"172.17.0.2\",\"kind\":\"receiver\",\"message\":\"could not monitor postgresql server: failed to determine total_time column name: pq: password authentication failed for user \\\"splunk.discovery.default\\\"\",\"monitorType\":\"postgresql\",\"port\":\"5432\"}")

When discovery mode can't access a discovered service to extract metric data, it provides instructions and the original log error message. In the example, discovery mode couldn't authenticate to the discovered PostgreSQL server due to missing or incorrect credentials.

To fix most of the issues identified by discovery mode, add or edit the configuration settings suggested in the status messages. You can define the required settings in the following ways:

- Use the ``--set`` option to specify settings to be used by discovery mode at runtime.
- Set the environment variable for the setting.

In both cases, discovery mode suggests which paramenters and environment variables you've to use to complete the missing configuration settings.

.. note:: By default, the duration of the discovery process is 10 seconds, which you can increase by setting the ``SPLUNK_DISCOVERY_DURATION`` environment variable.

Customize discovery settings
==========================================

By default, discovery mode reads the built-in configuration provided by the Collector executable. You can provide your own configuration to modify settings or adjust the existing configuration in case of a partial discovery status.

To create custom discovery configurations, follow these steps:

#. Navigate to the ``config.d`` folder in ``/etc/otel/collector/config.d`` on Linux.
#. Create a ``<name>.discovery.yaml`` file and place it inside a subdirectory of ``config.d``, for example ``extensions`` or ``receivers`` where ``<name>`` is the name of the component you want to use.
#. Edit the ``<name>.discovery.yaml`` files to add the desired configuration. For example, if you're adding a receiver, discovery mode loads the content inside the ``receivers`` object of the Collector configuration.

Custom configurations consist of the fields you want to override in the default configuration. For example:

.. code-block:: yaml

    smartagent/postgresql:
      rule:
        # Only overrides this field with port 9871
        docker_observer: type == "container" and port == 9871

If you prefer to override settings from the console, use the ``--set`` option when running the Collector. This is useful in environments like Kubernetes. For example:

.. code-block:: bash

    otelcol --config /dev/null --discovery \
    --set splunk.discovery.receivers.extensions.docker_observer.config.endpoint="tcp://0.0.0.0:543"

Use the ``--dry-run`` option to check the resulting discovery configuration before using it with the Collector.

Define a custom configuration directory
------------------------------------------------

To define a custom directory for discovery settings, use the ``--config-dir`` option as in the example:

.. code-block:: text

    otelcol --discovery --config-dir <custom_path>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst