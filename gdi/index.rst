.. _monitor-data-sources:

********************************************************************************
Available host and application monitors
********************************************************************************

.. meta::
  :description: This page provides a listing of all host and application receivers in Splunk Observability Cloud.

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

.. note:: The SignalFx Smart Agent has reached End of Support. While the agent can capture and export telemetry to Splunk Observability Cloud, Splunk no longer provides any support, feature updates, security, or bug fixes. Such requests are not bound by any SLAs.

  Note that this only affects the agent; Smart Agent integrations and application receivers are available and supported through the Splunk Distribution of OpenTelemetry Collector. Native OpenTelemetry receivers are supported as well.

To find an integration for your application, see the alphabetical listing of receivers on this page, or use the menu to browse for receivers by application category. 

If available, using OpenTelemetry native components instead of Smart Agent application receivers is the best practice to send data to Observability Cloud. To see native OpenTelemetry receivers, refer to :ref:`otel-components`. 

For instance, you can use the OpenTelementry native :ref:`prometheus-receiver` to gather metrics from any software, tool or service that exposes metrics in the Prometheus format, such as Ansible Tower (AWX), CockroachDB, Docker Daemon, Doorman, Etcd, Flink, Grafana, PATROL, Traefik, or Zipkin. 

If you need to use Smart Agent application receivers and monitors, install the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` with the :ref:`Smart Agent receiver <smartagent-receiver>`, a native OTel component, to send data to Splunk Observability Cloud.

.. include:: /_includes/application-receiver-table.rst
