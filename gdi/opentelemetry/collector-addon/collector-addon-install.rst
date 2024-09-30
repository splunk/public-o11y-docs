.. _collector-addon-install:

*********************************************************************************************
Splunk Technical add-on for the Splunk Distribution of the OpenTelemetry Collector
*********************************************************************************************

.. meta::
   :description: Install the Technical Add-on for the Splunk Distribution of the OpenTelemetry Collector.

.. toctree::
   :maxdepth: 5
   :hidden:

Lorem Ipsum

.. _collector-addon-install-best:

Best practices
======================================================================

* The Splunk Add-on for OpenTelemetry Collector installer comes packaged with a number of agent bundle libraries. Do not delete these files, even if you do not plan on incorporating an agent bundle.

* To save space you can remove the folder for the binaries you are not using. For example, if you are installing on Linux you can delete the Windows folder.

* If your configuration uses more than one collector, see Manage multiple collectors in this manual.

.. _collector-addon-install-server:

Install the Splunk Add-on for the OpenTelemetry Collector to multiple universal forwarder instances using the deployment server
============================================================================================================================================

Follow these steps to install the Splunk Add-on for the OpenTelemetry Collector to multiple universal forwarder instances using the deployment server:

#. Download and unzip the installation file to the machine running your deployment server.

#. In your unzipped folder, locate and unzip the .tar file to SPLUNK_HOME > etc > deployment apps. Create a new "local" folder in Splunk_TA_otel/.

#. In Splunk_TA_otel/, open the configuration folder and copy the access_token file into your new local folder, for example, in Splunk_TA_otel/local.

#. In the default folder find the inputs.conf file. You can inspect the defaults for the settings and update the values if necessary. Note that the values in inputs.conf must match the value in Splunk Web. For example, you would update the realm value from us0 to us1 in both inputs.conf and in Splunk Web.

  * splunk_config = the default value is $SPLUNK_OTEL_TA_HOME/configs/ta-agent-config.yaml`
  * disabled = the default value is false
  * start_by_shell = the default value is false
  * splunk_access_token_file = the default value is access_token
  * splunk_realm = default value is us0. A realm is a self-contained deployment that hosts organizations. You can find your realm name on your profile page in the user interface.
  * splunk_trace_ingest_url = the default value is :new-page:`https://ingest.us0.signalfx.com/v2/trace`.

#. In Splunk Observability Cloud, retrieve your access token value. If you do not have a token, contact your Splunk Observability Cloud administrator to create a token. See :ref:`admin-tokens` to learn more about tokens.

#. In Splunk_TA_otel/local, create or open the access_token file, and replace the existing contents with the token value you copied from Splunk Observability Cloud. Save the updated file.

#. In Splunk Observability Cloud, select your name, then select the Organization tab to verify that the realm value in the realm and sapm-endpoint files in your local folder match the value shown in Splunk Observability Cloud. Save any changes you make in the local files.

#. In Splunk Web, select :strong:`Settings > Forwarder Management` to access your deployment server.

#. Create a server class:

   #. For "Edit clients", update :strong:`Include` to add your Universal Forwarder instance and save.

   #. Go to :strong:`Add apps` and select your new Splunk Add-on for OpenTelemetry Collector service class.

   #. Select :strong:`Edit` on your newly created service class and make sure the following are checked:
   
      * Enable App
      * Restart Splunkd

#. Save. Your Add-on solution is now deployed. 

#. In :strong:`Splunk Infrastructure Monitoring`, navigate to the host where you deployed the Splunk Add-on for the OpenTelemetry Collector and select it to explore its metrics and status. For more information, see :ref:`use-navigators-imm`.