.. caution:: Preview: Discovery mode in Splunk Distribution of OpenTelemetry Collector

    Preview features described in this document are provided by Splunk to you "as is" without any warranties, maintenance and support, or service-level commitments. Splunk makes this preview feature available in its sole discretion and may discontinue it at any time. Use of preview features is subject to the :new-page:`Splunk General Terms <https://www.splunk.com/en_us/legal/splunk-general-terms.html>`.

.. _discovery_mode:

***************************************************************************
Discover and configure metrics sources automatically
***************************************************************************

.. meta::
      :description: Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and collect metrics automatically.

Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and create
a configuration based on the results.

Discovery mode can detect several types of metric sources on the host, such as databases and servers. With this information, the Collector generates configuration you can modify and adopt, or incorporate into your exiting configuration automatically by default.

The main advantage of using discovery mode is that you don't need to manually update the OpenTelemetry Collector configuration for supported metric sources. This is helpful in environments when you deploy and activate host services dynamically or when adding a new supported target database to your infrastructure.

.. note:: Discovery mode is available starting from version 0.72.0 and higher of the Splunk Distribution of the OpenTelemetry Collector.

How discovery mode works
==========================================

When you run the Collector in discovery mode, it tests built-in configurations for supported metric receivers against endpoints discovered on your platform by observer extensions. This happens before starting the Collector service.

For any dynamically instantiated receiver that retrieves metrics matching the success criteria, the Collector translates the discovery configuration to a receiver creator instance with the known working rules, as well as the required observer extension. See :ref:`receiver-creator-receiver` for more information. At the same time, the Collector adds the configuration to the ``metrics`` pipeline at runtime.

For any receiver that can establish a connection with a service, but not receive the expected metrics, discovery mode suggests which properties to set, or what extensions or settings to configure on the service to successfully retrieve telemetry. You can define any target-specific configuration values that are required, for example authentication information, using discovery properties to tune the discovery process. 


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
     - Smart Agent with collectd/mysql monitor type. See :ref:`mysql`.

   * - PostgreSQL
     - Smart Agent with postgresql monitor type. See :ref:`postgresql`.

   * - NGINX
     - Smart Agent with collectd/nginx monitor type. See :ref:`nginx`.



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

When discovery mode can't access a discovered service to extract metric data, it provides instructions and the original log error message. In the example, discovery mode can't authenticate to the discovered PostgreSQL server due to missing or incorrect credentials, which you can provide through custom discovery properties. See :ref:`custom-discovery-props`.

.. note:: The Linux installation script of the Collector supports the ``--discovery`` option. When turning on discovery mode through the installation script, the resulting configuration is applied directly to the ``metrics`` pipeline.

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
           smartagent/postgresql:
            config:
              params:
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


Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
