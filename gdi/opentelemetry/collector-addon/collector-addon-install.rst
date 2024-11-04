.. _collector-addon-install:

*********************************************************************************************
Install the Technical Add-on for the Splunk OpenTelemetry Collector
*********************************************************************************************

.. meta::
   :description: Install the Technical Add-on for the Splunk Distribution of the OpenTelemetry Collector.

.. toctree::
   :maxdepth: 5
   :hidden:

You can download the Splunk Add-on for the OpenTelemetry Collector from :new-page:`Splunkbase <https://splunkbase.splunk.com/app/7125?_gl=1*nsvlab*_gcl_au*MTI1MDc1MzQ3OS4xNzIzNDQ2NTk2*FPAU*MTI1MDc1MzQ3OS4xNzIzNDQ2NTk2*_ga*MTY3OTA0Njk3Mi4xNjUyNzEwMTA4*_ga_5EPM2P39FV*MTcyNzcwMTk1MC4xMDQ5LjEuMTcyNzcwMjM4OC4wLjAuMzU0OTAyMDQ1*_fplc*MEE0WVo5cGVvVWpGWXhndCUyRlE1U0RIdU81dUElMkZoUFQ2RyUyQmZXcTRQMGZCdzl5R2N2NVE0JTJGdEVHTXFkZGhPdGZoJTJCQ21JdHp6cFJIOWl0TEdYJTJCd0NIc1BjelRDeG9Oc1lISDlXOU9BcHJ5cm5PTFBRJTNE>` and install it to a :ref:`single <collector-addon-install-uf>` or to :ref:`multiple <collector-addon-install-server>` universal forwarder instances.

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

