.. _collector-addon-troubleshooting:

*********************************************************************************************
Technical Add-on for the Splunk OpenTelemetry Collector: Troubleshooting
*********************************************************************************************

.. meta::
   :description: Introduction to the Technical Add-on for the Splunk Distribution of the OpenTelemetry Collector.

.. toctree::
   :maxdepth: 5
   :hidden:

   Install the Technical Add-on <collector-addon-install.rst>
   Configure the Technical Add-on <collector-addon-configure.rst>

If you experience issues collecting data, try these steps to make sure that the Splunk Add-on for the OpenTelemetry Collector is correctly deployed and configured.

If you confirm that the add-on is installed and configured correctly but you still can't see data in Splunk Observability Cloud, then the issue may be with your Collector instance. See :ref:`otel-troubleshooting` for further steps.

Verify that the Splunk Add-on for OpenTelemetry Collector is deployed successfully
============================================================================================================================================

* Check your server to make sure it is adequately configured, refer to your OS documentation for more information.

* Make sure that the Splunk Add-on for OpenTelemetry Collector is enabled in :guilabel:`Settings > Forwarder Management > Add apps > Enable App`.

* Make sure that Splunkd has restarted after installation in one of two ways:

  * In the Splunk Web interface, you can check that the Splunk Add-on for OpenTelemetry Collector is enabled in :guilabel:`Settings > Forwarder Management > Add apps > Restart Splunkd`.

  * Check the Splunk_TA_otel.log to make sure that splunkd has restarted.

Verify that the Splunk Add-on for OpenTelemetry Collector is running properly
============================================================================================================================================

* Check the following logs generated in $SPLUNK_HOME/var/log/splunk/ for any runtime or start/stop errors:

  * otel.log (or whatever you have named it to if using a custom log file)

  * Splunk_TA_otel.log

* Make sure that there are no competing collector agents running on your server. If you have configured a Collector agent using Splunk Observability Cloud, a new agent created on the same server with the Splunk Add-on for the OpenTelemetry Collector will not run properly. See :ref:`collector-addon-configure-multiple` for more information.



