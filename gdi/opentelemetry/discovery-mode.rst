.. _discovery_mode:

***************************************************************************
Discovery mode of the Collector
***************************************************************************

.. meta::
      :description: Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and collect metrics automatically.

Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and collect metrics automatically. Discovery mode can detect several types of metric sources on the host, such as databases and servers. With this information, discovery mode creates a configuration you can either modify or apply to the Collector.

The advantage of using discovery mode is that you don't need to manually configure the Collector for the supported metric sources. This is helpful in environments when services might be activated dynamically, for example when scaling your infrastructure. Discovery mode supports the following host services and applications:

- MySQL using the MySQL monitor of the Smart Agent receiver. See :ref:`mysql`.
- PostgreSQL using the PostgreSQL receiver. See :ref:`postgresql-receiver`.

.. note:: Discovery mode is an experimental feature introduced in version 0.72.0 and higher of the Splunk Distribution of the OpenTelemetry Collector and is subject to future changes.

How to activate discovery mode
====================================

To activate the discovery mode in the Collector, add the ``--discovery`` option to the installer script. For example:

.. tabs::

    .. code-tab:: shell Linux
        :emphasize-lines: 2

        curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
        sudo sh /tmp/splunk-otel-collector.sh --discovery \
        --realm SPLUNK_REALM \
        --memory SPLUNK_MEMORY_TOTAL_MIB \
        -- SPLUNK_ACCESS_TOKEN

    .. code-tab:: powershell Windows
        :emphasize-lines: 5

        & {Set-ExecutionPolicy Bypass -Scope Process -Force;  `
        $script = ((New-Object System.Net.WebClient).DownloadString('https://dl.signalfx.com/splunk-otel-collector.ps1'));  `
        $params = @{access_token = "SPLUNK_ACCESS_TOKEN";  `
        realm = "SPLUNK_REALM"  `
        discovery = true};  `
        Invoke-Command -ScriptBlock ([scriptblock]::Create(". {$script} $(&{$args} @params)"))}

You can also pass the ``--discovery`` option directly to the ``otelcol`` executable file in your system. To use the discovery mode to output the generated configuration to the console, add the ``--dry-run`` option. For example:

.. code-block:: shell

    otelcol --discovery --dry-run

How discovery mode works
==========================================

The discovery mode uses the discovery receiver, which wraps the receiver creator and OpenTelemetry observer extensions to detect metric sources on the host and send metrics to Splunk Observability Cloud. See :ref:`receiver-creator-receiver` for more information.

When you run the Collector in discovery mode, the Collector uses both built-in and custom configurations to run observer extensions for a variety of services. If successful, the discovery mode embeds the required settings to the Collector configuration so as to collect and send metrics from the confirmed metric sources.

If some of the detected services throw a ``partial`` status, the Collector provides guidance on how to complete the configuration for collecting metrics from the detected source. By default, the duration of the discovery process is 10 seconds, which you can increase by setting the ``SPLUNK_DISCOVERY_DURATION`` environment variable.

Custom discovery configuration
==========================================

By default, discovery mode reads the built-in configuration provided by the Collector, which is located inside the ``embed.FS`` directory created at runtime.

You can provide your own discovery configuration to modify settings or adjust the existing configuration in case of a partial discovery status.

To create custom configurations, follow these steps:

#. Navigate to the ``config.d`` folder in ``/etc/otel/collector/config.d`` for Linux or ``\opt\td-agent\etc\td-agent\config.d`` on Windows.
#. Create a ``<name>.discovery.yaml`` file inside ``observers`` or ``receivers`` depending on your needs, where ``<name>`` is the name of the component you want to use.
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