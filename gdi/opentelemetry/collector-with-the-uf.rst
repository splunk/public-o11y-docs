.. _collector-with-the-uf:

*********************************************************************
Use the Splunk Universal Forwarder with the Collector
*********************************************************************

.. meta::
      :description: Manage your data ingestion manually by deploying the Splunk Distribution of OpenTelemetry Collector alongside the Splunk Universal Forwarder (UF) on each virtual machine (VM).


Splunk Enterprise Cloud and Splunk Observability Cloud currently use different data collection agents:

- Enterprise Cloud uses the :new-page:`Splunk Universal Forwarder (UF) <https://docs.splunk.com/Documentation/Forwarder>` to capture logs and some metrics, which are also stored as logs.
- Splunk Observability Cloud uses OpenTelemetry to capture traces, metrics, and logs. Logs are currently captured through bundled Fluentd.

You can manage your data ingestion manually by deploying the Splunk Distribution of OpenTelemetry Collector alongside the UF on each virtual machine (VM).This solution is applicable for VM environments for operating systems that are currently supported by both Splunk Observability Cloud and Enterprise and Cloud, running in common environments such as AWS EC2, GCE, Azure VMs, and VMWare.

.. note::

   For Kubernetes deployments, use the Splunk Distribution of OpenTelemetry Collector for Kubernetes. Install the Collector using the method that best suits your needs:

   - :ref:`get-started-k8s`
   - :ref:`Manually install in a Kubernetes cluster <otel-install-k8s>`

Benefits
==============

The benefits of using the Universal Forwarder with the Collector are:

- You can use Splunk Observability Cloud alongside Enterprise or Enterprise Cloud without capturing and submitting any duplicate telemetry data.
- When used with :ref:`Splunk Log Observer Connect <logs-intro-logconnect>`, you can take advantage of effectively all Splunk Observability Cloud logging functionality, including :ref:`Related Content <get-started-relatedcontent>`.
- You do not have to update existing UF deployments.

Collect data with the Collector and Universal Forwarder
===========================================================

To collect data with the Collector and the UF:

#. Configure each agent using the default configuration files:

    * Configure the Collector in :new-page:`Agent <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/agent_config.yaml>` or :new-page:`Gateway <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/gateway_config.yaml>` mode.

    * Configure the :new-page:`UF <https://docs.splunk.com/Documentation/Forwarder/latest/Forwarder/Configuretheuniversalforwarder>`.

#. Run the following command to skip installation of Fluentd and the plugins and dependencies for the Collector:

   .. code-block:: bash

      curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
      sudo sh /tmp/splunk-otel-collector.sh --realm SPLUNK_REALM -- SPLUNK_ACCESS_TOKEN --without-fluentd

#. Ensure that the UF captures the fully qualified domain name (FQDN) of the host, which is used to identify hosts in Splunk Observability Cloud. The UF can already capture this, and its behavior is consistent with the Collector. To capture the FQDN:

   * From the ``$SPLUNK_HOME/etc/system/local/`` directory, open server.conf and verify that the following :new-page:`stanza <https://docs.splunk.com/Documentation/Splunk/latest/Admin/Serverconf#OVERVIEW>` is present:
   
   .. code-block:: bash

     [general]
     hostnameOption = fullyqualifiedname

   * From the ``$SPLUNK_HOME/etc/system/local/ directory`` directory, open inputs.conf and verify that the following :new-page:`stanza <https://docs.splunk.com/Documentation/Splunk/latest/Admin/Inputsconf#OVERVIEW>` is present:

   .. code-block:: bash
  
     [default]
     host=$decideOnStartup

   * Restart the UF.

#. Ensure that the UF captures the name of the service, which you must set manually in the Collector configuration and within your applications.

   #. For the UF, do this in the same way that you append trace and span IDs to logs.

   #. To capture the name of the service, set the ``OTEL_SERVICE_NAME`` environment variable in the configuration file. On Linux, run ``export OTEL_SERVICE_NAME=<yourServiceName>``. On Windows Powershell, run ``$env:OTEL_SERVICE_NAME=<yourServiceName>``. See :new-page:`https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables  <https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables>` on GitHub to view additional OpenTelemetry specification environment variables.

#. Restart both agents.
