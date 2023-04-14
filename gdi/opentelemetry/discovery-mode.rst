.. caution:: Preview: Discovery mode in Splunk Distribution of OpenTelemetry Collector

    Preview features described in this document are provided by Splunk to you "as is" without any warranties, maintenance and support, or service-level commitments. Splunk makes this preview feature available in its sole discretion and may discontinue it at any time. Use of preview features is subject to the :new-page:`Splunk General Terms <https://www.splunk.com/en_us/legal/splunk-general-terms.html>`.

.. _discovery_mode:

***************************************************************************
Discovery mode of the Collector
***************************************************************************

.. meta::
      :description: Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and collect metrics automatically.

Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and create
a configuration based on the results. Discovery mode can detect several types of metric sources on the host, such as databases and servers. With this information, it creates a Collector configuration you can either modify or use.

The advantage of using discovery mode is that you don't need to manually configure the Collector for the supported metric sources. This is helpful in environments when services might be activated dynamically, for example when scaling your infrastructure.

.. note:: Discovery mode is available starting from version 0.72.0 and higher of the Splunk Distribution of the OpenTelemetry Collector.

Supported host services and applications
=========================================

Discovery mode supports the following host services and applications:

.. list-table::
   :width: 100%
   :widths: 20 40 40
   :header-rows: 1

   * - Service
     - Receiver
     - Configuration

   * - MySQL
     - Smart Agent with MySQL monitor type. See :ref:`mysql`.
     - ``smartagent-postgresql.discovery.yaml`` 

   * - PostgreSQL
     - :ref:`postgresql-receiver`
     - ``smartagent-postgresql.discovery.yaml``

Create sample configurations
=========================================

To create sample configurations for metric sources detected by the Collector, run the following command:

.. code-block:: shell

    bin/otelcol --discovery --dry-run

The ``--dry-run`` option ensures that a configuration isn't applied to the Collector at runtime. The resulting sample configuration appears in the console as YAML. For example:

.. code-block:: bash

   Discovering for next 10s...
   Discovery complete.
   
   # YAML configuration snippet follows

If discovery mode identifies issues, the Collector shows status messages for full and partial failures. Status messages include possible solutions that you can try.

If you want to apply the configuration directly to the Collector, remove the ``--dry-run`` option.

Customize discovery settings
==========================================

By default, discovery mode reads the built-in configuration provided by the Collector, which is located inside the ``embed.FS`` directory created at runtime.

You can provide your own discovery configuration to modify settings or adjust the existing configuration in case of a partial discovery status.

To create custom configurations, follow these steps:

#. Navigate to the ``config.d`` folder in ``/etc/otel/collector/config.d`` for Linux or ``\opt\td-agent\etc\td-agent\config.d`` on Windows.
#. Create a ``<name>.discovery.yaml`` file and place it inside a subdirectory of ``config.d``, for example ``observers`` or ``receivers`` where ``<name>`` is the name of the component you want to use.
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

How discovery mode works
==========================================

The discovery mode creates temporary discovery receiver instances. The discovery receiver instances wrap the receiver creator and use OpenTelemetry observer extensions to detect metric sources on the host capable of sending metrics to Splunk Observability Cloud. See :ref:`receiver-creator-receiver` for more information.

When you run the Collector in discovery mode, the Collector uses both built-in and custom configurations to run observer extensions for a variety of services. If successful, the discovery mode embeds the required settings to the Collector configuration so as to collect and send metrics from the confirmed metric sources.

If some of the detected services throw a ``partial`` status, the Collector provides guidance on how to complete the configuration for collecting metrics from the detected source. By default, the duration of the discovery process is 10 seconds, which you can increase by setting the ``SPLUNK_DISCOVERY_DURATION`` environment variable.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst