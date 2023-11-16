.. _udp-logs-receiver:

**************************************************************
UDP receiver
**************************************************************

The UDP receiver collects logs over UDP. 

.. _get-started-udp-receiver:

Get started
=================================================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform. See :ref:`otel-install-platform`. 
2. Configure the UDP receiver as described in the next section. 
3. Restart the Collector.

.. _udp-receiver-sample-configs:

Sample configurations
-------------------------------------------------

To activate the UDP receiver add ``udplog`` to the ``receivers`` section of your ``agent_config.yaml`` file, as in the following example configuration.

.. code-block:: yaml

    receivers:
      udplog:
        listen_address: "0.0.0.0:54525"

See :ref:`udp-receiver-settings` for additional settings.

.. _udp-receiver-settings:

Settings
=================================================

The following table shows the configuration options for the UDP receiver:

.. raw:: html

    <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tool/main/cfg-metadata/receiver/udplog.yaml"></div>


.. _troubleshoot-udp-receiver:

Troubleshooting
=================================================

.. include:: /_includes/troubleshooting-components.rst
