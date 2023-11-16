.. _tcp-logs-receiver:

*******************************************
TCP receiver
*******************************************

The TCP receiver collects logs over TCP. 

.. _get-started-tcp-receiver:

Get started
=================================================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform. See :ref:`otel-install-platform`. 
2. Configure the TCP receiver as described in the next section. 
3. Restart the Collector.

.. _tcp-receiver-sample-configs:

Sample configurations
-------------------------------------------------

To activate the TCP receiver add ``tcplog`` to the ``receivers`` section of your ``agent_config.yaml`` file, as in the following example configuration.

.. code-block:: yaml

    receivers:
      tcplog:
        listen_address: "0.0.0.0:54525"

See :ref:`tcp-receiver-settings` for additional settings.

.. _tcp-receiver-settings:

Settings
=================================================

The following table shows the configuration options for the TCP receiver:

.. raw:: html

    <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tool/main/cfg-metadata/receiver/tcplog.yaml"></div>


.. _troubleshoot-tcp-receiver:

Troubleshooting
=================================================

.. include:: /_includes/troubleshooting-components.rst