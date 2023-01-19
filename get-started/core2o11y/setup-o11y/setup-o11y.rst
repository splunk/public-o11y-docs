.. _setup-o11y-setup-o11y:

******************************************************************************************
Set up Splunk Observability Cloud components
******************************************************************************************

.. meta::
   :description: This page describes and links to setup pages for each component of Observability Cloud.


See :ref:`welcome` for a description of each component in Observability Cloud. With the exception of Log Observer Connect, you must send data from your systems to each Observability Cloud component. You do not need to send your Splunk Cloud Platform or Splunk Enterprise logs to Observability Cloud to analyze them in Log Observer Connect. Instead, see :ref:`logs-scp` or :ref:`logs-set-up-logconnect` to run the native integration that allows you to analyze your Splunk platform logs in Log Observer Connect without sending them outside of your Splunk platform instance.

For every Observability Cloud component, see the following topics to send your data to Observability Cloud:

- :ref:`apm` to send traces to Splunk APM.

- :ref:`infrastructure-infrastructure` to send infrastructure data to Splunk Infrastructure Monitoring.

- :ref:`logs-scp` to view and analyze your Splunk Cloud Platform logs in Log Observer Connect. (Setup is required, but your logs do not leave your Splunk Cloud Platform instance.)

- :ref:`logs-set-up-logconnect` to view and analyze your Splunk Enterprise logs in Log Observer Connect. Setup is required, but your logs do not leave your Splunk Enterprise instance.

- :ref:`rum-setup` to send front-end traces and spans, as well as user session data to RUM. By default, RUM does not collect identity data.

- :ref:`set-up-synthetics` to set up your first Uptime and Browser tests.

For an overview of setting up all components and the recommended order of setup, see :ref:`get-started-get-data-in`.