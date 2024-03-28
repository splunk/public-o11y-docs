.. _linux-third-party:

**********************************************************************************
Automatic discovery and configuration for third-party applications in Linux
**********************************************************************************

.. meta:: 
    :description: Learn how to use automatic discovery and configuration to gather data from third-party applications running in Linux environments.

.. intro paragraph

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

Customize discovery settings
==========================================

By default, discovery mode reads the built-in configuration provided by the Collector executable. You can provide your own configuration to modify settings or adjust the existing configuration in case of a partial discovery status.

The priority order for discovery configuration values from lowest to highest is:

- Default ``bundle.d`` component configuration files, built into the Collector executable
- ``config.d/<receivers or extensions>/*.discovery.yaml`` component configuration files
- ``config.d/properties.discovery.yaml`` properties file content in mapped form
- ``config.d/properties.discovery.yaml`` properties file content using ``--set`` form
- ``SPLUNK_DISCOVERY_<xyz>`` property environment variables available to the Collector process
- ``--set splunk.discovery.<xyz>`` property command line options

.. _configd-file:

Define properties through the properties file
------------------------------------------------

You can override or add properties by creating the ``etc/otel/collector/config.d/properties.discovery.yaml`` file. Each mapped property in the file overrides existing discovery settings. For example:

   .. code-block:: yaml


      splunk.discovery:
        receivers:
          postgresql:
            username: "${PG_USERNAME_ENVVAR}"
            password: "${PG_PASSWORD_ENVVAR}"

You can use the ``--discovery-properties=<filepath.yaml>`` argument to load discovery mode properties that you don't want to share with other Collectors. If you specify discovery properties using this argument, properties contained in ``config.d/properties.discovery.yaml`` are ignored.

Create custom configurations
---------------------------------------------

To create custom discovery configurations, follow these steps:

#. Navigate to the ``config.d`` folder in ``/etc/otel/collector/config.d`` on Linux.
#. Create a ``<name>.discovery.yaml`` file and place it inside a subdirectory of ``config.d``, for example ``extensions`` or ``receivers`` where ``<name>`` is the name of the component you want to use.
#. Edit the ``<name>.discovery.yaml`` files to add the desired configuration. For example, if you're adding a receiver, discovery mode loads the content inside the ``receivers`` object of the Collector configuration.

Custom configurations consist of the fields you want to override in the default configuration. For example:

.. code-block:: yaml

    # <some-receiver-type-with-optional-name.discovery.yaml>
      <receiver_type>(/<receiver_name>):
         enabled: <true | false> # true by default
         rule:
            <observer_type>(/<observer_name>): <receiver creator rule for this observer>
         config:
            default:
               <default embedded receiver config>
            <observer_type>(/<observer_name>):
               <observer-specific config items, merged with `default`>
         status:
            metrics:
               <discovery receiver metric status entries>
            statements:
               <discovery receiver statement status entries>

Use the ``--dry-run`` option to check the resulting discovery configuration before using it with the Collector.

See the :new-page:`Discovery receiver README file <https://github.com/signalfx/splunk-otel-collector/blob/main/internal/receiver/discoveryreceiver/README.md>` for more information.

Define a custom configuration directory
-----------------------------------------------------

To define a custom directory for discovery settings, use the ``--config-dir`` option as in the example:

.. code-block:: text

    otelcol --discovery --config-dir <custom_path>


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


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst