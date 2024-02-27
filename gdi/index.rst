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

.. note:: The SignalFx Smart Agent has reached End of Support. While the agent can capture and export telemetry to Splunk Observability Cloud, Splunk no longer provides any support, feature updates, security, or bug fixes. Such requests are not bound by any SLAs.

  Note that this only affects the agent; Smart Agent integrations and application receivers are available and supported through the Splunk Distribution of OpenTelemetry Collector. Native OpenTelemetry receivers are supported as well.

To find an integration for your application or service, see the alphabetical listing of receivers on this page, or use the navigation menu to browse for receivers by application category. 

If available, you can use native OpenTelemetry components instead of Smart Agent application receivers to send data to Splunk Observability Cloud. For instance, you can use the OpenTelemetry native Prometheus receiver to gather metrics from any software, tool, or service that exposes metrics in the Prometheus format, such as Ansible Tower (AWX), CockroachDB, Docker Daemon, Doorman, Etcd, Flink, Grafana, PATROL, Traefik, or Zipkin. For more information, see :ref:`prometheus-receiver`.

* To install the Splunk Distribution of OpenTelemetry Collector, see :ref:`otel-intro`.
* To see native OpenTelemetry receivers, see :ref:`otel-components`. 
* To learn about metrics, see :ref:`metrics-landing`.
* To learn about monitoring infrastructure metrics, see :ref:`get-started-compute`.

You can also use Smart Agent application receivers and monitors with the Collector and the Smart Agent receiver, a native OpenTelemetry component, to send data to Splunk Observability Cloud. For more information, see :ref:`Smart Agent receiver <smartagent-receiver>`.

.. include:: /_includes/application-receiver-table.rst
