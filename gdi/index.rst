.. _monitor-data-sources:

********************************************************************************
Available host and application monitors in Splunk Observability Cloud
********************************************************************************

.. meta::
  :description: A list of all host and application receivers in Splunk Observability Cloud.

.. toctree::
  :maxdepth: 4
  :hidden:

  Caches and memory TOGGLE <caches-memory>
  Cloud platforms TOGGLE <cloud>
  monitors-cloudfoundry/cloudfoundry-firehose-nozzle
  monitors-conviva/conviva
  Databases TOGGLE <databases>
  GitLab TOGGLE <gitlab-monitors>
  Hosts and servers TOGGLE <hosts-servers>
  Languages TOGGLE <languages>
  Messaging TOGGLE <messaging>
  Monitoring TOGGLE <monitoring>
  Networks TOGGLE <network>
  Orchestration TOGGLE <orchestration>
  Prometheus TOGGLE <prometheus>
  monitors-common-config

.. note:: 
  
  The SignalFx Smart Agent has reached End of Support. While the agent can capture and export telemetry to Splunk Observability Cloud, Splunk no longer provides any support, feature updates, security, or bug fixes. Such requests are not bound by any SLAs.

  Smart Agent integrations and application receivers are available and supported through the Splunk Distribution of the OpenTelemetry Collector. 
  
You can monitor dozens of applications and services with Splunk Observability Cloud with both native OTel components and legacy Smart Agent monitors. 

Native OTel receivers
================================================================

If available, you can use native OpenTelemetry receivers. For instance, you can use the OpenTelemetry native Prometheus receiver to gather metrics from any software, tool, or service that exposes metrics in the Prometheus format, such as Ansible Tower (AWX), CockroachDB, Docker Daemon, Doorman, Etcd, Flink, Grafana, PATROL, Traefik, or Zipkin. For more information, see :ref:`prometheus-receiver`.

These are the available OTel receivers:

.. include:: /_includes/gdi/otel-receivers-table.rst

Legacy monitors
================================================================

You can also use Smart Agent application receivers and monitors with the Collector and the Smart Agent receiver, a native OpenTelemetry component, to send data to Splunk Observability Cloud. For more information, see :ref:`migration-monitors`.

.. include:: /_includes/gdi/application-receiver-table.rst
