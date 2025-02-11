

.. _network-explorer-intro:

********************************************
Introduction to Network Explorer
********************************************

.. meta::
    :description: Introduction to Network Explorer in Splunk Infrastructure Monitoring

As part of your existing Splunk Infrastructure Monitoring experience, Network Explorer is a network observability capability designed for cloud and micro-service environments.

Network Explorer lets you ingest and analyze network telemetry, which you can use to:

- Identify network anomalies in real time.
- Discover sources of high network cost in your environment.
- Examine service topology with visualizations.


How does Network Explorer work?
================================================================================

Network Explorer uses kernel collectors to collect network data on your hosts and send the collected data to the Splunk Distribution of OpenTelemetry Collector through a centralized reducer. The Splunk Distribution of OpenTelemetry Collector then sends your network data to Splunk Infrastructure Monitoring, giving you visibility into your network topology and errors.

.. image:: /_images/images-network-explorer/network-explorer-architecture.png
  :width: 100%
  :alt: This diagram shows how Network Explorer works.

Get started with Network Explorer
======================================

For information on how to set up Network Explorer, see :ref:`network-explorer-setup`.

.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/network-explorer-info.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>
