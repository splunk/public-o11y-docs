.. _linux-advanced-auto-discovery-config:

*****************************************************************************
Advanced customization for automatic discovery in Linux
*****************************************************************************

.. meta:: 
    :description: Learn how to customize your deployment of automatic discovery in a Linux environment.

Learn how to customize automatic discovery and configuration for advanced scenarios. 

Through advanced customization, you can achieve the following tasks:

* :ref:`Override automatic discovery settings <override-default-settings-linux>`
* :ref:`Use automatic discovery with gateway mode <use-with-gateway-linux>`
* :ref:`Customize discovery settings for third-party applications <customize-third-party-settings-linux>`

.. _override-default-settings-linux:

Override default automatic discovery settings
=====================================================

You can override default automatic discovery settings to use features for profiling and runtime metrics collection. 

Activate AlwaysOn Profiling
--------------------------------------

You can activate CPU and memory profiling by updating the environment variables for your instrumentation. AlwaysOn Profiling continuously collects stack traces so that you can discover which lines of code are slowing your processes down. To learn more about Profiling, see :ref:`profiling-intro`.

To activate profiling globally, add the ``--enable-profiler`` flag upon installation for CPU profiling, or ``--enable-profiler-memory`` flag for memory profiling. For example: 

.. code-block:: bash
    :emphasize-lines: 4

    curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
    sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
    --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
    --enable-profiler --enable-profiler-memory

You can also activate profiling for individual languages. By using this approach, you can determine which languages profiling gathers call stacks from.

Follow these steps to activate AlwaysOn Profiling for an individual language: 

#. Open the <language>.conf file located in the ``/etc/splunk/zeroconfig`` directory. 
#. Set the environment variable ``SPLUNK_PROFILER_ENABLED=true`` for CPU profiling, and ``SPLUNK_PROFILER_MEMORY_ENABLED=true`` for memory profiling.
#. Restart your applications.

.. note:: If you're using ``systemd``, the environment variables are instead located in ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.
            
To sample call stacks from a specific interval, change the ``SPLUNK_PROFILER_CALL_STACK_INTERVAL`` setting to your desired interval in milliseconds. The default value is ``10000``.

For example, ``SPLUNK_PROFILER_CALL_STACK_INTERVAL=5000`` sets the call stack interval to 5000 milliseconds.

Activate runtime metrics collection
----------------------------------------------------

You can activate runtime metrics collection by updating the environment variables for your instrumentation. This setting configures the agent to collect additional metrics from your application. 

To activate runtime metrics globally, add the ``--enable-metrics`` flag upon installation. For example: 

.. code-block:: bash
  :emphasize-lines: 4

  curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
  sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
  --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
  --enable-metrics

You can also activate runtime metrics collection for individual languages. By using this approach, you can determine which runtime metrics the Collector sends at a language-level.

To activate runtime metrics collection for an individual language, follow these steps:

#. Open the <language>.conf file located in the ``/etc/splunk/zeroconfig`` directory.
#. Set the environment variable ``SPLUNK_METRICS_ENABLED=true``.
#. Restart your applications.

.. _use-with-gateway-linux:

Use automatic discovery with gateway mode
======================================================

The Splunk OTel Collector Chart uses the agent mode by default. Activating gateway mode deploys an instance of the OpenTelemetry Collector in a separate container, and this instance collects data from the entire cluster.

To learn more about the gateway mode, see :ref:`collector-gateway-mode`.

You can't directly deploy automatic discovery in gateway mode for Linux, but you can send collected data from automatic discovery to an existing gateway deployment.

Follow these steps to send data to a gateway deployment of the OpenTelemetry Collector:

#. Open the <language>.conf file located in ``/etc/splunk/zeroconfig``.
#. Set the environment variable ``OTEL_EXPORTER_OTLP_ENDPOINT=<gateway_endpoint>`` where <gateway_endpoint> is the port of your gateway deployment.
#. Restart your applications.

The Collector now sends data to your gateway deployment. 

.. _customize-third-party-settings-linux:

Customize discovery settings for third-party applications
====================================================================

By default, automatic discovery reads the built-in configuration provided by the Collector executable. You can provide your own configuration to modify settings or adjust the existing configuration in case of a partial discovery status.

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


Additional settings for language runtimes
=============================================

There are many other settings you can customize using automatic discovery and configuration.

For a list of settings that you can change for each language, see the following resources:

.. list-table::
  :header-rows: 1
  :width: 100

  * - Language
    - Resource
  * - Java
    - :ref:`advanced-java-otel-configuration`
  * - Node.js
    - :ref:`advanced-nodejs-otel-configuration`