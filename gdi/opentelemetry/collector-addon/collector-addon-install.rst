.. _collector-addon-install:

*********************************************************************************************
Install the Technical Add-on for the Splunk OpenTelemetry Collector
*********************************************************************************************

.. meta::
   :description: Install the Technical Add-on for the Splunk Distribution of the OpenTelemetry Collector.

.. toctree::
   :maxdepth: 5
   :hidden:

You can install the Splunk Add-on for the OpenTelemetry Collector to a :ref:`single <collector-addon-install-uf>` or to :ref:`multiple <collector-addon-install-server>` universal forwarder instances.

The following applies:

* The Splunk Add-on for the OpenTelemetry Collector installer comes packaged with a number of agent bundle libraries. Do not delete these files, even if you do not plan on incorporating an agent bundle.

* To save space you can remove the folder for the binaries you are not using. For example, if you are installing on Linux you can delete the Windows folder.

* If your configuration uses more than one collector, see :ref:`collector-addon-configure-multiple`.

.. _collector-addon-install-uf:

Install the Splunk Add-on for the OpenTelemetry Collector to a universal forwarder instance
============================================================================================================================================

Follow these steps to install the Splunk Add-on for OpenTelemetry Collector to a universal forwarder instance:

#. Download and unzip the installation file to the machine running universal forwarder. In your unzipped folder, locate and unzip the .tar file to :guilabel:`SPLUNK_HOME > etc > deployment apps`. 

#. Create a new "local" folder in Splunk_TA_otel/. Open the configuration folder and copy the access_token file into your new local folder.

#. In the default folder find the inputs.conf file. You can inspect the defaults for the settings and update the values if necessary. Note that the values in inputs.conf must match those in Splunk Web. 

  * ``splunk_config``. ``$SPLUNK_OTEL_TA_HOME/configs/ta-agent-config.yaml`` by default.
  * ``disabled``. ``false`` by default. 
  * ``start_by_shell``. ``false`` by default. 
  * ``splunk_access_token_file``. ``access_token`` by default. 
  * ``splunk_realm``. ``us0`` by default. A realm is a self-contained deployment that hosts organizations. You can find your realm name on your profile page in the user interface.
  * ``splunk_trace_ingest_url``. The default value is :new-page:`https://ingest.us0.signalfx.com/v2/trace`.

#. In :strong:`Splunk Observability Cloud`, retrieve your access token value. If you do not have a token, contact your Splunk Observability Cloud administrator to create a token. See :ref:`admin-tokens` to learn more about tokens.

#. In Splunk_TA_otel/local, create or open the access_token file, and replace the existing contents with the token value you copied from Splunk Observability Cloud. Save the updated file.

#. In :strong:`Splunk Observability Cloud`, select your name, then select the Organization tab to verify that the realm value in the realm and sapm-endpoint files in your local folder reflect the value shown in Splunk Observability Cloud. Save any changes you make in the local files.

#. Restart Splunkd. Your Add-on solution is now deployed. 

#. In :guilabel:`Splunk Infrastructure Monitoring`, navigate to the host where you deployed the Splunk Add-on for the OpenTelemetry Collector and select it to explore its metrics and status. For more information, see :ref:`use-navigators-imm`.

.. _collector-addon-install-server:

Install the Splunk Add-on for the OpenTelemetry Collector to multiple universal forwarder instances using the deployment server
============================================================================================================================================

Follow these steps to install the Splunk Add-on for the OpenTelemetry Collector to multiple universal forwarder instances using the deployment server:

#. Download and unzip the installation file to the machine running your deployment server. In your unzipped folder, locate and unzip the .tar file to :guilabel:`SPLUNK_HOME > etc > deployment apps`. 

#. Create a new "local" folder in Splunk_TA_otel/. Open the configuration folder and copy the access_token file into your new local folder.

#. In the default folder find the inputs.conf file. You can inspect the defaults for the settings and update the values if necessary. Note that the values in inputs.conf must match those in Splunk Web. 

  * ``splunk_config``. ``$SPLUNK_OTEL_TA_HOME/configs/ta-agent-config.yaml`` by default.
  * ``disabled``. ``false`` by default. 
  * ``start_by_shell``. ``false`` by default. 
  * ``splunk_access_token_file``. ``access_token`` by default. 
  * ``splunk_realm``. ``us0`` by default. A realm is a self-contained deployment that hosts organizations. You can find your realm name on your profile page in the user interface.
  * ``splunk_trace_ingest_url``. The default value is :new-page:`https://ingest.us0.signalfx.com/v2/trace`.

#. In :strong:`Splunk Observability Cloud`, retrieve your access token value. If you do not have a token, contact your Splunk Observability Cloud administrator to create a token. See :ref:`admin-tokens` to learn more about tokens.

#. In Splunk_TA_otel/local, create or open the access_token file, and replace the existing contents with the token value you copied from Splunk Observability Cloud. Save the updated file.

#. In :strong:`Splunk Observability Cloud`, select your name, then select the Organization tab to verify that the realm value in the realm and sapm-endpoint files in your local folder match the value shown in Splunk Observability Cloud. Save any changes you make in the local files.

#. In :strong:`Splunk Web`, select :guilabel:`Settings > Forwarder Management` to access your deployment server.

#. Create a server class:

   #. For "Edit clients", update :guilabel:`Include` to add your Universal Forwarder instance and save.

   #. Go to :guilabel:`Add apps` and select your new Splunk Add-on for the OpenTelemetry Collector service class.

   #. Select :guilabel:`Edit` on your newly created service class and make sure the following are checked:
   
      * Enable App
      * Restart Splunkd

#. Save. Your Add-on solution is now deployed. 

#. In :guilabel:`Splunk Infrastructure Monitoring`, navigate to the host where you deployed the Splunk Add-on for the OpenTelemetry Collector and select it to explore its metrics and status. For more information, see :ref:`use-navigators-imm`.

.. _collector-addon-mode:

Configure the deployment mode of your Splunk Add-on Collector instance
============================================================================================================================================

The OpenTelemetry Collector has different :ref:`deployment modes <otel-deployment-mode>`:

* Host monitoring (agent): This is the default value and the simplest configuration. The Splunk Add-on for the OpenTelemetry Collector, when configured as an agent, sends data to Splunk Observability Cloud.

* Data forwarding (gateway): When configured as a gateway, your Splunk Add-on for the OpenTelemetry Collector collects data from one or more agents before forwarding it to Splunk Observability Cloud.

* As an agent that sends data to a gateway: To use a gateway instance, you create one or more instances of Splunk add-on for the OpenTelemetry Collector as agents that send data to that gateway instance.

.. _collector-addon-mode-agent:

Deploy the Splunk Add-on for the OpenTelemetry Collector as an agent
------------------------------------------------------------------------------------------------------------------------

As an agent, the OpenTelemetry Collector sends data directly to Splunk Observability Cloud. This is the default configuration. Learn more at :ref:`collector-agent-mode`.

If your instance is not configured as an agent and you want to configure it as an agent, edit your inputs.conf file and update the variable ``Splunk_config`` to reflect your agent configuration file name. You can find this file in your directory at ``/otelcol/config/``. The default file name is ``ta-agent-config.yaml``. If you are using a custom configuration file, provide that file name.

.. _collector-addon-mode-gateway:

Deploy the Splunk Add-on for the OpenTelemetry Collector as a gateway
------------------------------------------------------------------------------------------------------------------------

If deployed as a gateway, the Collector instance can collect data from one or more Collector instances deployed as agents. The gateway instance then sends that data to Splunk Observability Cloud. Learn more at :ref:`collector-gateway-mode`.

To configure your Splunk Add-on for OpenTelemetry Collector as a gateway:

#. Edit your inputs.conf file to update the variable ``Splunk_config`` with your gateway configuration file name. You can find this file in your directory at ``/otelcol/config/``. The default file name for the gateway file is ``ta-gateway-config.yaml``. If you are using a custom configuration file, provide that file name.

#. Set the ``splunk_listen_interface`` value to ``0.0.0.0`` or to the specific IP address that sends data to this gateway in ``local/inputs.conf``.

.. caution:: You must also configure one or more Collector instances as agents that send data to your new gateway. 

.. _collector-addon-mode-send:

Configure Splunk Add-on for OpenTelemetry Collector as an agent that sends data to a gateway
------------------------------------------------------------------------------------------------------------------------

You can set up one or more Collector instances as agents that send data to another instance that is set up as a gateway. See more at :ref:`collector-agent-to-gateway`.

To do this configure an instance that works as a gateway, and then one or more instances that operate as agents:

#. Create your gateway, if you have not already done so. See :ref:`collector-addon-mode-gateway` for more information.

#. Edit your inputs.conf file to update the variable ``Splunk_config`` to reflect your gateway configuration file name. You can find the default configuration file in your directory at ``/otelcol/config/``. The default file name for this configuration file is ``ta-agent-to-gateway-config.yaml``. If you are using a custom configuration file, provide that file name.

#. In the README directory, open ``inputs.conf.spec`` and copy the attribute for the ``splunk_gateway_url``.

#. Paste this value into ``ta-agent-to-gateway-config.yaml`` and then update the value for this setting with the gateway IP address.