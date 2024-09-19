.. _apache-spark-receiver:

*******************************
Apache Spark receiver
*******************************

.. meta::
      :description: The Apache Spark receiver fetches metrics for an Apache Spark cluster through the Apache Spark REST API. 

The Apache Spark receiver metrics for an Apache Spark cluster through the Apache Spark REST API. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

.. note:: Out-of-the-box dashboards and navigators aren't supported for the Apache Web Server receiver yet, but are planned for a future release.

The receiver uses the following endpoints: ``/metrics/json``, ``/api/v1/applications/[app-id]/stages``, ``/api/v1/applications/[app-id]/executors``, and ``/api/v1/applications/[app-id]/jobs endpoints``.

Purpose
The purpose of this component is to allow monitoring of Apache Spark clusters and the applications running on them through the collection of performance metrics like memory utilization, CPU utilization, shuffle operations, garbage collection time, I/O operations, and more.

Prerequisites
======================

This receiver supports Apache Spark versions 3.3.2 or higher.


Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the Apache Spark receiver, add ``apachespark`` to the ``receivers`` section of your configuration file: 

.. code-block:: yaml

  receivers:
    apachespark:
      collection_interval: 60s
      endpoint: http://localhost:4040
      application_names:
      - PythonStatusAPIDemo
      - PythonLR

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [apachespark]

Configuration options
-----------------------

The following settings are optional:

* ``collection_interval``. ``60s`` by default. Sets the interval this receiver collects metrics on. 
  
  * This value must be a string readable by Golang's ``time.ParseDuration``. Learn more at Go's official documentation :new-page:`ParseDuration function <https://pkg.go.dev/time#ParseDuration>`.
  
  * Valid time units are ``ns``, ``us`` (or ``µs``), ``ms``, ``s``, ``m``, ``h``.

* .. include:: /_includes/gdi/collector-settings-initialdelay.rst

* ``endpoint``. ``http://localhost:4040`` by default. Apache Spark endpoint to connect to in the form of ``[http][://]{host}[:{port}]``.

* ``application_names``. An array of Spark application names for which metrics are collected from. If no application names are specified, metrics are collected for all Spark applications running on the cluster at the specified endpoint.

Settings
======================

The following table shows the configuration options for the Apache Spark receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/apachespark.yaml"></div>

Metrics
======================

The following metrics, resource attributes, and attributes are available.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/apachesparkreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
