.. _jmx-receiver:

*************************
JMX receiver
*************************

.. meta::
      :description: The JMX receiver reports metrics from an MBean server.

The JMX receiver works in conjunction with the :new-page:`OpenTelemetry JMX Metric Gatherer <https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics/README.md>` to report metrics from an MBean server. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

This receiver launches a child JRE process which runs the JMX Metric Gatherer configured with your specified JMX connection information and target built-in OTel-helper Groovy script. It then reports metrics to an implicitly created OTLP receiver. 

In order to use the JMX receiver:

* Download the most recent release of the JMX Metric Gatherer JAR and configure the receiver with its path. 
* JRE must be available on your system.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the JMX receiver as described in the next section.
3. Restart the Collector.

Sample configurations
--------------------------------

To activate the JMX receiver, add ``jmx`` to the ``receivers`` section of your configuration file, as in the following sample configurations. 

See :ref:`jmx-receiver-settings` for more details.

.. code-block:: yaml

  receivers:
    jmx:
      jar_path: /opt/opentelemetry-java-contrib-jmx-metrics.jar
      endpoint: my_jmx_host:12345
      target_system: jvm
      collection_interval: 10s
      initial_delay: 1s
      # optional: the same as specifying OTLP receiver endpoint.
      otlp:
        endpoint: mycollectorotlpreceiver:4317
      username: my_jmx_username
      # determined by the environment variable value
      password: ${env:MY_JMX_PASSWORD}
      resource_attributes: my.attr=my.value,my.other.attr=my.other.value
      log_level: info
      additional_jars:
        - /path/to/other.jar
  
Advanced settings
-----------------------------------------------

* ``jar_path``. The path for the JMX Metric Gatherer uber JAR to run. Use a jar version 1.9 or higher, which can be downloaded from GitHub. ``/opt/opentelemetry-java-contrib-jmx-metrics.jar`` by default.

  *  If you require a non-released version, specify a custom version by providing the sha256 hash of your custom version of the jar during collector build time using the ``ldflags`` option.

.. code-block:: 
  
  go build -ldflags "-X github.com/open-telemetry/opentelemetry-collector-contrib/receiver/jmxreceiver.MetricsGathererHash=<sha256hash>" ...

* ``endpoint``. Required. The JMX Service URL or host and port used to construct the Service URL the Metric Gatherer's JMX client uses. Use the format ``service:jmx:<protocol>:<sap>`` or ``host:port``. 

  * If using the ``host:port`` format, it creates the Service URL ``service:jmx:rmi:///jndi/rmi://<host>:<port>/jmxrmi``. 
  * If using or coerced to ``service:jmx:<protocol>:<sap>`` format, it corresponds to the ``otel.jmx.service.url`` property.

* ``target_system``. The built-in target system (or systems) metric gatherer script to run. 

  * Must be a subset of: ``"activemq"``, ``"cassandra"``, ``"hbase"``, ``"hadoop"``, ``"jetty"``, ``"jvm"``, ``"kafka"``, ``"kafka-consumer"``, ``"kafka-producer"``, ``"solr"``, ``"tomcat"``, or ``"wildfly"``. 

  * If you need to support additional target systems because of a custom JMX metrics gatherer jar configured using the ``MetricsGathererHash`` build time config, add them with another build time flag. It corresponds to the ``otel.jmx.target.system`` property.

.. code-block:: 

  go build -ldflags "-X github.com/open-telemetry/opentelemetry-collector-contrib/receiver/jmxreceiver.MetricsGathererHash=<sha256hash>
        -X github.com/open-telemetry/opentelemetry-collector-contrib/receiver/jmxreceiver.AdditionalTargetSystems=newtarget,othernewtarget" ...

.. _jmx-receiver-settings:

Settings
======================

The following table shows the configuration options for the JMX receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/jmx.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
