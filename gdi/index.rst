.. _monitor-data-sources:

********************************************************************************
Available host and application monitors
********************************************************************************

.. meta::
  :description: This page provides a listing of all application receivers.


.. toctree::
   :maxdepth: 4
   :hidden:

   Caches and memory <caches-memory>
   Cloud platforms <cloud>
   cloudfoundry-firehose-nozzle/cloudfoundry-firehose-nozzle
   conviva/conviva
   Databases <databases>
   GitLab <gitlab-monitors>
   Hosts and servers <hosts-servers>
   Languages <languages>
   Messaging <messaging>
   Monitoring <monitoring>
   Networks <network>
   Orchestration <orchestration>

You can configure an application receiver to gather metrics from its associated application and the host the application is running on.

To find a receiver for your application, see the alphabetical listing of receivers on this page, or use the left navigation menu for this section to browse for receivers by application category.

Receiver functionality is also provided in the form of SignalFx Smart Agent monitors. Documentation in this section describes configuration options for both the Splunk Distribution of OpenTelemetry Collector receivers and Smart Agent monitors.

The SignalFx Smart Agent is deprecated. For details, see the :new-page:`Deprecation Notice <https://github.com/signalfx/signalfx-agent/blob/main/docs/smartagent-deprecation-notice.md>`.

.. using an include for this table because it also appears on gdi/get-start-in/integrations.rst

.. include:: /_includes/application-receiver-table.rst
