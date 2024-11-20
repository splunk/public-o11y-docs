.. _telegraf:

Telegraf 
==================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the telegraf monitor. See benefits, install, configuration, and metrics


Instead of using The Splunk Distribution of the OpenTelemetry Collector's Smart Agent receiver with the
Telegraf monitor to scrape metrics, it is recommended to install Telegraf plugin independently, then push metrics to the Splunk Opentelemetry  collector
via OTLP.



.. note:: All the setup was carried out on a Linux Ubuntu OS based machine but should be replicable on any machines running Linux OS with Debian flavor.

These instruction to install the telegraf plugin to scrape metrics on other OS (for e.g. MacOS/Windows) operating systems, have not been tested
out. 

Benefits
--------

.. include:: /_includes/benefits.rst

Installation of Telegraf Plugin
----------------------------------

Run the following commands to install Telegraf from the InfluxData repository:

.. code:: shell

   curl --silent --location -O \ https://repos.influxdata.com/influxdata-archive.key \ && echo "943666881a1b8d9b849b74caebf02d3465d6beb716510d86a39f6c8e8dac7515  influxdata-archive.key" \
   | sha256sum -c - && cat influxdata-archive.key \
   | gpg --dearmor \
   | sudo tee /etc/apt/trusted.gpg.d/influxdata-archive.gpg > /dev/null \
   && echo 'deb [signed-by=/etc/apt/trusted.gpg.d/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main' \
   | sudo tee /etc/apt/sources.list.d/influxdata.list
   sudo apt-get update && sudo apt-get install telegraf


After successful installation of telegraf above, you can add the following to your telegraf configuration file (usually the config file resides on 
./etc/telegraf/telegraf.d directory)


    # Send OpenTelemetry metrics over gRPC
    [[outputs.opentelemetry]]
    
For detailed information on the Telegraf Opentelemetry output plugin configuration, check https://github.com/influxdata/telegraf/blob/master/plugins/outputs/opentelemetry/README.md 

Configuration
-------------

To retrieve metrics from this telegraf installation running independently, the following Collector
configuration is sufficient:

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
