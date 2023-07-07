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

You can configure an application receiver to gather metrics from its associated application and the host the application is running on. Receiver functionality is also provided in the form of SignalFx Smart Agent monitors. 

.. note:: The SignalFx Smart Agent has reached End of Support. While the agent can capture and export telemetry to Splunk Observability Cloud, Splunk no longer provides any support, feature updates, security, or bug fixes. Such requests are not bound by any SLAs.

  Note that this only affects the agent; Smart Agent receivers bundled in the Splunk Distribution of OpenTelemetry Collector are available and supported.

To find a receiver for your application, see the alphabetical listing of receivers on this page, or use the menu to browse for receivers by application category. To see native OpenTelemetry receivers, refer to :ref:`otel-components`. Configuration options for both the Splunk Distribution of OpenTelemetry Collector receivers and Smart Agent monitors is available.

.. include:: /_includes/application-receiver-table.rst
