.. _get-started-linux:

***********************
Collect Linux host data
***********************

.. meta::
   :description: Start sending metrics and logs from Linux hosts to Splunk Observability Cloud.

The Splunk OpenTelemetry Connector is a package that provides integrated collection/forwarding for all telemetry types for the Linux platform. Customers will deploy this connector in support of gathering telemetry for Splunk Infrastructure Monitoring, Splunk APM, or Splunk Log Observer use cases.

This component is packaged in several formats/installers as appropriate for the specific Linux variant (for example, rpm, deb, containers as appropriate) and can be installed to VMs or hosts.

The following Linux distributions and versions are supported:

- Amazon Linux: 2
- CentOS / Red Hat / Oracle: 7, 8
- Debian: 8, 9, 10
- Ubuntu: 16.04, 18.04, 20.04

For non-containerized Linux environments, an installation script is available for deploying and configuring the OpenTelemetry Connector and TD Agent (Fluentd).

Run the following command on your host. Replace ``SPLUNK_REALM``, ``SPLUNK_MEMORY_TOTAL_MIB``, and ``SPLUNK_ACCESS_TOKEN`` for your environment.

.. code-block:: none

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
   sudo sh /tmp/splunk-otel-collector.sh --realm SPLUNK_REALM --memory SPLUNK_MEMORY_TOTAL_MIB -- SPLUNK_ACCESS_TOKEN
