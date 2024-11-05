.. _collector-addon-configure-instance:
.. _collector-addon-mode:

*********************************************************************************************
Configure the deployment mode of your Splunk Add-on Collector instance
*********************************************************************************************

.. meta::
   :description: Configure the deployment mode of the Technical Add-on OpenTelemetry Collector instance

.. toctree::
   :maxdepth: 5
   :hidden:

The OpenTelemetry Collector has different :ref:`deployment modes <otel-deployment-mode>`:

* Host monitoring (agent): This is the default value and the simplest configuration. The Splunk Add-on for the OpenTelemetry Collector, when configured as an agent, sends data to Splunk Observability Cloud.

* Data forwarding (gateway): When configured as a gateway, your Splunk Add-on for the OpenTelemetry Collector collects data from one or more agents before forwarding it to Splunk Observability Cloud.

* As an agent that sends data to a gateway: To use a gateway instance, you create one or more instances of Splunk add-on for the OpenTelemetry Collector as agents that send data to that gateway instance.

.. _collector-addon-mode-agent:

Deploy the Splunk Add-on for the OpenTelemetry Collector as an agent
============================================================================================================================================

As an agent, the OpenTelemetry Collector sends data directly to Splunk Observability Cloud. This is the default configuration. Learn more at :ref:`collector-agent-mode`.

If your instance is not configured as an agent and you want to configure it as an agent, edit your inputs.conf file and update the variable ``Splunk_config`` to reflect your agent configuration file name. You can find this file in your directory at ``/otelcol/config/``. The default file name is ``ta-agent-config.yaml``. If you are using a custom configuration file, provide that file name.

.. _collector-addon-mode-gateway:

Deploy the Splunk Add-on for the OpenTelemetry Collector as a gateway
============================================================================================================================================

If deployed as a gateway, the Collector instance can collect data from one or more Collector instances deployed as agents. The gateway instance then sends that data to Splunk Observability Cloud. Learn more at :ref:`collector-gateway-mode`.

To configure your Splunk Add-on for OpenTelemetry Collector as a gateway:

#. Edit your inputs.conf file to update the variable ``Splunk_config`` with your gateway configuration file name. You can find this file in your directory at ``/otelcol/config/``. The default file name for the gateway file is ``ta-gateway-config.yaml``. If you are using a custom configuration file, provide that file name.

#. Set the ``splunk_listen_interface`` value to ``0.0.0.0`` or to the specific IP address that sends data to this gateway in ``local/inputs.conf``.

.. caution:: You must also configure one or more Collector instances as agents that send data to your new gateway. 

.. _collector-addon-mode-send:

Configure Splunk Add-on for OpenTelemetry Collector as an agent that sends data to a gateway
============================================================================================================================================

You can set up one or more Collector instances as agents that send data to another instance that is set up as a gateway. See more at :ref:`collector-agent-to-gateway`.

To do this configure an instance that works as a gateway, and then one or more instances that operate as agents:

#. Create your gateway, if you have not already done so. See :ref:`collector-addon-mode-gateway` for more information.

#. Edit your inputs.conf file to update the variable ``Splunk_config`` to reflect your gateway configuration file name. You can find the default configuration file in your directory at ``/otelcol/config/``. The default file name for this configuration file is ``ta-agent-to-gateway-config.yaml``. If you are using a custom configuration file, provide that file name.

#. In the README directory, open ``inputs.conf.spec`` and copy the attribute for the ``splunk_gateway_url``.

#. Paste this value into ``ta-agent-to-gateway-config.yaml`` and then update the value for this setting with the gateway IP address.