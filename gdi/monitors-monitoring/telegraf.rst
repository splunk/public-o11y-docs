.. _telegraf:

Telegraf Exec (OpenTelemetry)
==============================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Telegraf monitor. See benefits, install, configuration, and metrics.

To monitor your system with Telegraf Exec using native OpenTelemetry, install the Telegraf plugin independently, then push metrics to the Splunk Opentelemetry Collector
via OTLP. 

.. note:: This setup is designed for a Linux Ubuntu OS but should be replicable on any machines running Linux OS with Debian flavor. These instructions might not work on other OS (MacOS/Windows). 

Benefits
--------

.. include:: /_includes/benefits.rst

Configuration
----------------------------------

Follow these steps to scrape Telegraf metrics with the OTel Collector:

1. Install the Telegraf Exec Input plugin
2. Set up the OpenTelemetry Output plugin
3. Configure the OpenTelemetry Collector 

1. Install the Telegraf Exec Input Plugin plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the following commands to install Telegraf from the InfluxData repository:

.. code:: shell

   curl --silent --location -O \ https://repos.influxdata.com/influxdata-archive.key \ && echo "943666881a1b8d9b849b74caebf02d3465d6beb716510d86a39f6c8e8dac7515  influxdata-archive.key" \
   | sha256sum -c - && cat influxdata-archive.key \
   | gpg --dearmor \
   | sudo tee /etc/apt/trusted.gpg.d/influxdata-archive.gpg > /dev/null \
   && echo 'deb [signed-by=/etc/apt/trusted.gpg.d/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main' \
   | sudo tee /etc/apt/sources.list.d/influxdata.list
   sudo apt-get update && sudo apt-get install telegraf

2. Set up the OpenTelemetry Output plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Next, add the OTel Output plugin to your Telegraf configuration file:

.. code:: 
    
    # Send OpenTelemetry metrics over gRPC
    [[outputs.opentelemetry]]

The config file usually resides on the ./etc/telegraf/telegraf.d directory.

For detailed information on the Telegraf Opentelemetry output plugin see the :new-page:`Exec Input Plugin <https://github.com/influxdata/telegraf/blob/master/plugins/outputs/opentelemetry/README.md>` documentation in GitHub.

3. Configure the OpenTelemetry Collector
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add the following configuration to the OTel Collector to retrieve metrics from the Telegraf installation:

.. code:: yaml

    receivers:
    otlp:
        protocols:
        http:
        grpc:
    signalfx:
    exporters:
    signalfx:
        access_token: "SPLUNK_TOKEN"
        realm: "us0"
    service:
    pipelines:
        metrics:
            receivers: [otlp]
            exporters: [signalfx]
        metrics/internal:
            receivers: [signalfx]
            processors:
            exporters: [signalfx]

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
