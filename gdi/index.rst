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

.. note:: The SignalFx Smart Agent has reached End of Support. While the agent can capture and export telemetry to Splunk Observability Cloud, Splunk no longer provides any support, feature updates, security, or bug fixes. Such requests are not bound by any SLAs.

  Note that this only affects the agent; Smart Agent application receivers are available and supported through the Splunk Distribution of OpenTelemetry Collector. Native OTel receivers are supported as well.

To find a receiver for your application, see the alphabetical listing of receivers on this page, or use the menu to browse for receivers by application category. 

If available, using native components instead of Smart Agent application receivers is the best practice. To see native OpenTelemetry receivers, refer to :ref:`otel-components`. 

For Smart Agent application receivers and monitors, you can use the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` with the :ref:`Smart Agent receiver <smartagent-receiver>`, a native OTel component, to send data to Splunk Observability Cloud.

.. include:: /_includes/application-receiver-table.rst
