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

To find an integration for your application or service, see the alphabetical listing of receivers on this page, or use the menu to browse for receivers by application category. 

If available, you can use native OpenTelemetry components instead of Smart Agent application receivers to send data to Observability Cloud. For instance, you can use the OpenTelementry native :ref:`prometheus-receiver` to gather metrics from any software, tool or service that exposes metrics in the Prometheus format, such as Ansible Tower (AWX), CockroachDB, Docker Daemon, Doorman, Etcd, Flink, Grafana, PATROL, Traefik, or Zipkin. 

* See how to install the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`.
* To see native OpenTelemetry receivers, refer to :ref:`otel-components`. 
* Note that metrics collected using this configuration are custom metrics: they're not supported by built-in content, and charges might apply. See more at :ref:`metrics-landing`.

You can also use Smart Agent application receivers and monitors with the Collector and the :ref:`Smart Agent receiver <smartagent-receiver>`, a native OpenTelemetry component, to send data to Splunk Observability Cloud.

.. include:: /_includes/application-receiver-table.rst
