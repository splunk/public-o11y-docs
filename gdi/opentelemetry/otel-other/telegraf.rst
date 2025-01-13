.. _telegraf:
.. _telegraf-generic:

Monitor services with Telegraf Input plugins and OpenTelemetry
=====================================================================

.. meta::
   :description: Use Telegraf and OpenTelemetry to monitor your services in Splunk Observability Cloud. See benefits, install, configuration, and metrics.

To monitor your service with Telegraf using native OpenTelemetry in Splunk Observability Cloud, install the service's Telegraf Input plugin then push metrics to the Splunk Opentelemetry Collector via OTLP. 

.. note:: This setup is designed for a Linux Ubuntu OS but should be replicable on any machines running Linux OS with Debian flavor. These instructions might not work on other OS (MacOS/Windows). 

Benefits
--------



.. raw:: html

   <div class="include-start" id="benefits.rst"></div>

.. include:: /_includes/benefits.rst

.. raw:: html

   <div class="include-stop" id="benefits.rst"></div>




Configuration
----------------------------------

Follow these steps to scrape Telegraf metrics with the OTel Collector:

1. Install Telegraf
2. Set up your service's Telegraf Input plugin
3. Set up the Telegraf OpenTelemetry Output plugin
4. Configure the OpenTelemetry Collector

5. Install Telegraf 
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

2. Set up your service's Telegraf Input plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Next, install the Telegraf Input plugin for the service you want to monitor. Available plugins include Chrony, Consul, Docker, Elasticsearch, Fluentd, GitHub, Jenkins, RabbitMQ or SQL. Find a complete list of available plugins at :new-page:`Telegraf Input plugins <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>` in GitHub.

For example, if you want to monitor execute commands on every interval and parse metrics from their output with the Exec Input plugin, use a setup like: 

.. code:: 

  # Read metrics from one or more commands that can output to stdout
  [[inputs.exec]]
  
  ## Commands array
  commands = ["sh /testfolder/testscript.sh"]
  timeout = "30s"
  data_format = "influx"

  ## Environment variables
  ## Array of "key=value" pairs to pass as environment variables
  ## e.g. "KEY=value", "USERNAME=John Doe",
  ## "LD_LIBRARY_PATH=/opt/custom/lib64:/usr/local/libs"
  # environment = []

  ## Measurement name suffix
  ## Used for separating different commands
  # name_suffix = ""

  ## Ignore Error Code
  ## If set to true, a non-zero error code in not considered an error and the
  ## plugin will continue to parse the output.
  # ignore_error = false

3. Set up the Telegraf OpenTelemetry Output plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Next, add the OTel Output plugin to your Telegraf configuration file:

.. code:: 
    
    # Send OpenTelemetry metrics over gRPC
    [[outputs.opentelemetry]]

The config file usually resides on the ./etc/telegraf/telegraf.d directory.

For detailed information see Telegraf's :new-page:`OpenTelemetry Output plugin <https://github.com/influxdata/telegraf/blob/master/plugins/outputs/opentelemetry/README.md>` documentation in GitHub.

4. Configure the OpenTelemetry Collector
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



.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



