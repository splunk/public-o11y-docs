.. _linux-third-party:

**********************************************************************************
Automatic discovery and configuration for third-party applications in Linux
**********************************************************************************

.. meta:: 
    :description: Learn how to use automatic discovery and configuration to gather data from third-party applications running in Linux environments.

You can use automatic discovery and configuration to find third-party applications (such as databases and web servers) running in your Linux environment. Automatic discovery gathers telemetry data from these applications and sends it to Splunk Observability Cloud.

.. note:: Update the Collector to version 0.94.0 and higher to activate automatic service discovery.

How automatic discovery works
==========================================

When you run the Collector with automatic discovery, it tests built-in configurations for supported metric receivers against endpoints discovered on your platform by observer extensions. This happens before starting the Collector service.

For any dynamically instantiated receiver that retrieves metrics matching the success criteria, the Collector translates the discovery configuration to a receiver creator instance with the known working rules, as well as the required observer extension. See :ref:`receiver-creator-receiver` for more information. At the same time, the Collector adds the configuration to the ``metrics`` pipeline at runtime.

For any receiver that can establish a connection with a service, but not receive the expected metrics, discovery mode suggests which properties to set, or what extensions or settings to configure on the service to successfully retrieve telemetry. You can define any target-specific configuration values that are required, for example authentication information, using discovery properties to tune the discovery process.

When running in Kubernetes, discovery mode tests bundled metric receiver configurations against the endpoints discovered by the ``k8s_observer`` observer. Successfully discovered instances are then incorporated in the existing service configuration.


Discover active metric sources
=========================================

To discover any active and supported metric sources, run the following command on the desired monitoring host:

.. code-block:: shell

    bin/otelcol --discovery --dry-run

.. note:: Automatic discovery requires that environment variables ``SPLUNK_REALM`` and ``SPLUNK_ACCESS_TOKEN`` reference your Splunk Observability realm (for example ``us1``) and API token respectively. Alternatively, you can use the ``--config <path_to_config_yaml>`` option.

The ``--dry-run`` option ensures that the resulting configuration isn't applied to the Collector at runtime. The sample configuration appears in the console as YAML instead. For example:

.. code-block:: text

   $ Discovering for next 10s...
   Partially discovered "smartagent/postgresql" using "docker_observer"
   endpoint "5c9c80ba4319395c26255b6374f048ca973d3618fdd4b92a9ed601c7dddbff6a:5432":
   Please ensure your user credentials are correctly specified with
   `--set splunk.discovery.receivers.smartagent/postgresql.config.params::username="<username>"`
   and `--set splunk.discovery.receivers.smartagent/postgresql.config.params::password="<password>"`
   or `SPLUNK_DISCOVERY_RECEIVERS_smartagent_x2f_postgresql_CONFIG_params_x3a__x3a_username="<username>"`
   and `SPLUNK_DISCOVERY_RECEIVERS_smartagent_x2f_postgresql_CONFIG_params_x3a__x3a_password="<password>"`
   environment variables.

When automatic discovery can't access a discovered service to extract metric data, it provides instructions and the original log error message. In the example, discovery mode can't authenticate to the discovered PostgreSQL server due to missing or incorrect credentials, which you can provide through custom discovery properties. See :ref:`custom-discovery-props`.

.. note:: The Linux installation script of the Collector supports the ``--discovery`` option. When turning on discovery mode through the installation script, the resulting configuration is applied directly to the ``metrics`` pipeline. For example:

   .. code-block:: bash

      curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
      sudo sh /tmp/splunk-otel-collector.sh --realm <realm> – <token> --mode agent --discovery

.. _custom-discovery-props:

Configure or fix discovery properties
==================================================

To fix most of the issues identified by discovery mode, add or edit the configuration settings suggested in the status messages. You can define the required settings in the following ways:

- Use the ``--set`` option to specify settings to be used by discovery mode at runtime. For example:

   .. code-block:: bash

      --set splunk.discovery.receivers.smartagent/postgresql.config.params::username='${PG_USERNAME_ENVVAR}'

- Set the environment variable for the setting. Each discovery property has an equivalent environment variable form using ``_x<hex pair>_`` encoded delimiters for non-word characters ``[^a-zA-Z0-9_]``:

   For example:

      .. code-block:: bash

         export SPLUNK_DISCOVERY_RECEIVERS_smartagent_x2f_postgresql_CONFIG_params_x3a__x3a_username='${PG_USERNAME_ENVVAR}'

- Define the properties in the ``config.d/properties.discovery.yaml`` file. See :ref:`configd-file`.

When issues are detected, discovery mode suggests which parameters and environment variables you've to use to complete the missing configuration settings.

.. note:: By default, the duration of the discovery process is 10 seconds, which you can increase by setting the ``SPLUNK_DISCOVERY_DURATION`` environment variable. For example: ``export SPLUNK_DISCOVERY_DURATION = 20s``.

For more details, including advanced customization settings, see :ref:`customize-third-party-settings-linux`.

Usage example
======================

The following example shows how to install the Collector on Linux using discovery mode to find a MySQL database and retrieve metrics.

#. Install the Collector on the host where MySQL is running. Include the ``--discovery`` flag:

   .. code-block:: shell
    
      curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
      sudo sh /tmp/splunk-otel-collector.sh --realm <realm> - <token> --mode agent --discovery

#. Retrieve the Collector logs with the following command and review the output of the discovery process:

   .. code-block:: shell

      journalctl -u splunk-otel-collector -f

   In the following sample logs, the MySQL database has been partially discovered. The error message indicates the problem, which in this case is bad credentials:

   .. code-block:: text

      Partially discovered "mysql" using "docker_observer" endpoint "acb7cf9f5d674b8bb83487e043857d98c42b93f2214f114b2228e86932b2cde2:3306": Make sure your user credentials are correctly specified using the `--set splunk.discovery.receivers.mysql.config.username="<username>"` and `--set splunk.discovery.receivers.mysql.config.password="<password>"` command or the `SPLUNK_DISCOVERY_RECEIVERS_mysql_CONFIG_username="<username>"` and `SPLUNK_DISCOVERY_RECEIVERS_mysql_CONFIG_password="<password>"` environment variables. (evaluated "{\"error\":\"Error 1045 (28000): Access denied for user 'splunk.discovery.default'@'172.17.0.1' (using password: YES)\",\"kind\":\"receiver\",\"message\":\"Failed to fetch InnoDB stats\"}")

#. Provide the necessary credentials by creating the properties.discovery.yaml file in the `/etc/otel/collector/config.d` directory with the following content:

   .. code-block:: yaml

      splunk.discovery.receivers.mysql.config.username: "<username>"
      splunk.discovery.receivers.mysql.config.password: "<password>"

#. Restart the Collector with the following command:

   .. code-block:: shell

      sudo systemctl restart splunk-otel-collector

#. Tail the Collector logs again to confirm that it has discovered the MySQL database successfully:

   .. code-block:: shell

      journalctl -u splunk-otel-collector -f

#. When successful, the logs include a line similar to the following:

   .. code-block:: text

      Successfully discovered "mysql" using "docker_observer" endpoint "abcdef1234:3306".

.. _linux-third-party-mongodb:

Automatic discovery for MongoDB
====================================

By default, MongoDB automatic discovery rules assume the server is SSL/TLS enabled. 

If it isn't, use the following command line flag to indicate so:

.. code-block:: bash

      --set splunk.discovery.receivers.mongodb.config.tls::insecure=true


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
