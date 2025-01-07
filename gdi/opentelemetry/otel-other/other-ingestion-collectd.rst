.. _other-ingestion-collectd:

Monitor hosts with collectd and OpenTelemetry
=====================================================================

.. meta::
   :description: Use collectd and native OpenTelemetry to monitor services in Splunk Observability Cloud. See benefits, install, configuration, and metrics.

To monitor your infrastructure with collectd using native OpenTelemetry in Splunk Observability Cloud, install a collectd daemon in your host and connect it to your Collector instance as described in this document.

Benefits
--------

.. raw:: html

   <div class="include-start" id="benefits.rst"></div>

.. include:: /_includes/benefits.rst

.. raw:: html

   <div class="include-stop" id="benefits.rst"></div>


Configuration
----------------------------------

Install a collectd daemon in your host and connect it to an OpenTelemetry Collector with the following steps:

1. Install and configure collectd
2. Configure the OpenTelemetry Collector
3. Build and run


1. Install and configure collectd
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow these steps to install and configure the collectd daemon:

#. Install collectd as a Debian or Yum package in your host 
#. Configure the daemon to ingest free disk related metrics through `collectd/metrics.conf`
#. Configure the daemon to send data over HTTP using `collectd/http.conf`

In this example, the host is represented by an Ubuntu 24.04 docker image.

.. code::

   version: "3"
   services:
      collectd:
         build: collectd
         container_name: collectd
         depends_on:
            - otelcollector
         volumes:
      - ./collectd/http.conf:/etc/collectd/collectd.conf.d/http.conf
      - ./collectd/metrics.conf:/etc/collectd/collectd.conf.d/metrics.conf
   
   # OpenTelemetry Collector
   otelcollector:
      image:  quay.io/signalfx/splunk-otel-collector:latest
      container_name: otelcollector
      command: ["--config=/etc/otel-collector-config.yml", "--set=service.telemetry.logs.level=debug"]
      volumes:
         - ./otel-collector-config.yml:/etc/otel-collector-config.yml

2. Configure the OpenTelemetry Collector
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Set up your Collector instance to listen for traffic from the collectd daemon over HTTP with the :ref:`collectd-receiver`:

.. code:: yaml

   receivers:
      collectd:
         endpoint: "0.0.0.0:8081"

   exporters:
      debug:
         verbosity: detailed

   service:
      pipelines:
         metrics:
            receivers: [collectd]
            exporters: [debug]

.. caution:: Make sure to use ``0.0.0.0`` to expose port 8081 over the Docker network interface so that both Docker containers can interact.

3. Build and run
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the example with the instruction to start the docker-compose setup and build the collectd container:

.. code:: bash

   $> docker compose up --build

Check that the Collector is receiving metrics and logging them to ``stdout`` via the debug exporter:

.. code:: bash

   $> docker logs otelcollector

A typical output is:

.. code::  

   StartTimestamp: 1970-01-01 00:00:00 +0000 UTC
   Timestamp: 2024-12-20 19:55:44.006000128 +0000 UTC
   Value: 38.976566
   Metric #17
   Descriptor:
      -> Name: percent_bytes.reserved
      -> Description: 
      -> Unit: 
      -> DataType: Gauge
   NumberDataPoints #0
   Data point attributes:
      -> plugin: Str(df)
      -> plugin_instance: Str(etc-hosts)
      -> host: Str(ea1d62c7a229)
      ->  dsname: Str(value)
   StartTimestamp: 1970-01-01 00:00:00 +0000 UTC
   Timestamp: 2024-12-20 19:55:44.006000128 +0000 UTC
   Value: 5.102245
      {"kind": "exporter", "data_type": "metrics", "name": "debug"}

Troubleshooting
---------------

.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



