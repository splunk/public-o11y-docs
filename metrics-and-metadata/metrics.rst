.. _get-started-metrics:

*****************************************************************************
Metrics, data points, and metric time series in Splunk Observability Cloud
*****************************************************************************

.. meta::
   :description: Introduction to metrics in Splunk Observability Cloud.

  
In Splunk Observability Cloud, data consists of the following components:

- A numerical measurement called a metric
- A metric type
- One or more dimensions

Each piece of data in this form is a data point. A metric time series (MTS) contains all the data points that have the same metric name, metric type, and set of dimensions. Observability Cloud automatically creates MTS from incoming data points.

.. _metrics:

Metrics
============

A metric is a measurable number that varies over time. Multiple sources of the same general type, such as host machines, usually report the metric values for a single set of metric names. For example, a server cluster that has 100 host machines might report a single set of metrics named ``cpu.utilization``, ``api.calls``, and ``dropped.packets``, although metric values might be different for each machine.

There are three types of metrics: gauge, cumulative counter, and counter. For example, ``cpu.utilization`` is a gauge metric, ``api.calls`` is a cumulative counter metric, and ``dropped.packets`` is a counter metric.

.. image:: /_images/images-metrics/metrics-diagram.png
  :width: 90%
  :alt: This diagram shows examples of metrics.

The following table explains the three types of metrics.

.. list-table::
  :header-rows: 1
  :widths: 15 45 40

  * - Metric type
    - Description
    - Example
  * - Gauge
    - Value of a measurement at a specific point in time
    - CPU utilization percentage of a server
  * - Cumulative counter
    - Total number of occurrences or items since the measurement began
    - Total number of Splunk Infrastructure Monitoring API calls served since starting the web server
  * - Counter
    - Number of new occurrences or items since the last measurement
    - The number of packets that fail to reach their destinations over each 24-hour period

.. _data-points:

Data points
============

A data point contains a metric name and value, the type of the metric, and the dimensions of the metric. Dimensions are the key-value pairs that identify the source of the reported value.

For example, a data point can be the CPU utilization of host ``server1`` with metric type ``gauge``, metric value ``0.7``, dimensions ``"hostname":"server1"`` and ``"host_location":"Tokyo"``, and the timestamp ``1557225030000``.

    .. image:: /_images/images-metrics/data-point-diagram.png
      :width: 70%
      :alt: This diagram shows an example of a data point and what it contains.

A data point consists of the following components:

.. list-table::
   :header-rows: 1
   :widths: 20 50 30

   * - :strong:`Component`
     - :strong:`Description`
     - :strong:`Examples`

   * - Metric type
     - | The specified metric type determines the way that Splunk Observability Cloud works with the metric.
       |
       | To learn more about metric types, see :ref:`metric-types`.
     - One of three metric types: ``counter``, ``cumulative counter``, or ``gauge``. 

   * - Metric name
     - | A metric name identifies the values that you send into Infrastructure Monitoring. For example, the AWS metric ``4xxErrorRate`` represents the percentage of all HTTP requests for which the HTTP status code is 4xx. The data source often determines the metric name, but application receivers and other integrations might map the data source metric name to another name used by Observability Cloud.
       |
       | To learn more about metrics naming constraints, see :ref:`metric-dimension-names`.
     - ``memory.free``, ``CPUUtilization``, ``page_visits``
   
   * - Metric value
     - The measurement from your system, represented as a number.
     - 99.98751, 0.7
       

   * - Timestamp (Optional)
     - Either the time that data is sent by the software, or the time at which the data arrives in Observability Cloud. The timestamp is in \*nix time in milliseconds.
     - 1557225030000

   * - Dimensions
     - | Key-value pairs that describe some aspect of the source of the metric. A data point can have one or more dimensions. The most common dimension is a source. For example, a dimension can be a host or instance for infrastructure metrics, or it can be an application component or service tier for application metrics.
       | 
       | To learn more about dimensions, see :ref:`metrics-dimensions-mts`.
     - ``"hostname":"server1"``, ``"host_location":"Tokyo"``


.. _metric-time-series:

Metric time series
===================

A metric time series (MTS) is a collection of data points that have the same metric and the same set of dimensions.

Infrastructure Monitoring assumes that incoming data points contain a metric as well as a dimension, or a unique key-value pair that describes some aspect of the metric source.

For example, the following data points for the ``cpu.utilization`` metric with the same ``"hostname":"server1"`` and ``"location":"Tokyo"`` dimensions, but with different values and timestamps, make up a single MTS.


    .. image:: /_images/images-metrics/MTS-diagram.png
      :width: 100%
      :alt: This diagram shows a collection of data points that make up an MTS.


The following sets of data points are in three separate MTS:

#. Gauge metric ``cpu.utilization``, dimension ``"hostname": "host1"``
#. Gauge metric ``cpu.utilization``, dimension ``"source_host": "host1"``
#. Gauge metric ``cpu.utilization``, dimension ``"hostname": "host2"``

MTS 2 has the same host value as MTS 1, but not the same dimension key. MTS 3 has the same host name as MTS 1, but not the same host name value.


Use unique dimensions to create independent MTS
----------------------------------------------------

It's important to configure the Collector or ingest to provide at least one dimension that identifies a unique entity.

For example, when you report on the CPU utilization of 10 hosts in a cluster, the metric is the CPU utilization.

If each host in the cluster shares the exact same dimensions with all the other hosts, the cluster generates only one MTS. This is not recommended as it makes it difficult to differentiate and monitor the CPU utilization of each individual host in the cluster.

However, if each host in the cluster has at least one unique dimension (typically a unique hostname), the cluster generates 10 MTS, or one for each host. Each MTS represents the CPU utilization over time for a single host.


