.. _otel-smart-agent:

***********************************************
SignalFx Smart Agent components
***********************************************

.. meta::
      :description: Configure SignalFx Smart Agent to transition to the Splunk Distribution of OpenTelemetry Collector.

The Splunk Distribution of OpenTelemetry Collector is the next-generation agent and gateway for Splunk Observability products. This distribution provides helpful components to assist current Smart Agent users in their transition to the Collector and to ensure no functionality loss. The receiver, its associated extension, and other components provide a means of integrating all Smart Agent metric monitors into your Collector pipelines.

To migrate from the Smart Agent to the Collector, see the :new-page:`migration guide <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/signalfx-smart-agent-migration.md>`.

Extension
====================

The extension offers collectd and Python extensions. Extensions are available primarily for tasks that do not involve processing data. Examples of extensions include health monitoring, service discovery, and data forwarding. Extensions are optional.

See :new-page:`SignalFx Smart Agent Extension <https://github.com/signalfx/splunk-otel-collector/blob/main/internal/extension/smartagentextension/README.md>` in GitHub to copy the configuration YAML file.


Receiver
================

The receiver offers the complete set of Smart Agent monitors as Collector metric receivers. Monitors collect metrics from the host system and services.

See :new-page:`SignalFx Smart Agent Receiver <https://github.com/signalfx/splunk-otel-collector/blob/main/internal/receiver/smartagentreceiver/README.md#configuration>` in GitHub to copy the configuration YAML file.
