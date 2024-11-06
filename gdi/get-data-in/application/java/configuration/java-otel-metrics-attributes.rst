.. _java-otel-metrics-attributes:

***************************************************************
Metrics and attributes collected by the Splunk OTel Java agent
***************************************************************

.. meta::
  :description: The Splunk Distribution of OpenTelemetry Java collects the following application metrics data and WebEngine attributes. You can also collect custom metrics through OpenTelemetry.

The agent of the Splunk Distribution of OpenTelemetry Java collects the following application metrics data and attributes in addition to all that the upstream OpenTelemetry agent collects. To learn about the different metric types, see :ref:`metric-types`.

.. caution:: OpenTelemetry Java Instrumentation 2.x contains a set of breaking changes, introduced as part of recent OpenTelemetry HTTP semantic convention updates. To migrate, see :ref:`java-metrics-migration-guide`.

.. _java-otel-metrics:

Application metrics
====================================================

The agent of the Splunk Distribution of OpenTelemetry Java collects the following application metrics.

.. _default_app_metrics-java:

Default metric dimensions
----------------------------------------------------

The following dimensions are automatically added to all metrics exported by the agent:

.. list-table::
  :header-rows: 1
  :widths: 40 60
  :width: 100%

  * - Dimension
    - Description
  * - ``deployment.environment``
    - Value of the ``deployment.environment`` resource attribute, if present.
  * - ``runtime``
    - Value of the ``process.runtime.name`` resource attribute, for example ``OpenJDK Runtime Environment``.
  * - ``process.pid``
    - The Java process identifier (PID).
  * - ``container.id``
    - Identifier of the container, if applicable.
  * - ``host.name``
    - Name of the host.
  * - ``service``
    - Value of the ``service.name`` resource attribute.

.. _supported_libraries_java_metrics:

Supported libraries
------------------------------------------------------------

The agent collects the following metrics through the following libraries:

.. list-table::
  :header-rows: 1
  :widths: 45 20 50
  :width: 100%

  * - Library/Framework
    - Instrumentation
    - Supported versions
  * - :ref:`jvm-metrics`
    - ``jvm-metrics-splunk``
    - Java runtimes version 8 and higher
  * - :ref:`Apache DBCP2 connection pool metrics <connection-pool-metrics>`
    - ``commons-dbcp2-splunk``
    - Version 2.0 and higher
  * - :ref:`c3p0 connection pool metrics <connection-pool-metrics>`
    - ``c3p0-splunk``
    - Version 0.9.5 and higher
  * - :ref:`HikariCP connection pool metrics <connection-pool-metrics>`
    - ``hikaricp-splunk``
    - Version 3.0 and higher
  * - :ref:`Oracle Universal Connection Pool metrics (UCP) <connection-pool-metrics>`
    - ``oracle-ucp-splunk``
    - Version 11.2.0.4 and higher
  * - :ref:`Tomcat JDBC connection pool metrics <connection-pool-metrics>`
    - ``tomcat-jdbc-splunk``
    - Version 8.5 and higher
  * - :ref:`Vibur DBCP connection pool metrics <connection-pool-metrics>`
    - ``vibur-dbcp-splunk``
    - Version 20.0 and higher


.. _jvm-metrics:

JVM metrics
=============================================================

The Splunk OTel Java agent collects the following Java Virtual Machine (JVM) metrics when metric collection is activated.

.. _classloader-metrics:

ClassLoader metrics
----------------------------------------------------------------

The agent collects the following ClassLoader metrics:

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 40 10 50
  
  * - Metric
    - Type
    - Description
  * - ``jvm.class.count``
    - UpDown counter
    - Number of loaded classes.
  * - ``jvm.class.unloaded``
    - Counter
    - Total number of unloaded classes since the process started.

.. _gc-metrics:

Garbage collection metrics
------------------------------------------------------------------

The agent collects the following garbage collection (GC) metrics:

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 40 10 50

  * - Metric
    - Type
    - Description
  * - ``jvm.gc.duration{jvm.gc.name=<concurrent gcs>}``
    - Histogram
    - Time spent in concurrent phase, in milliseconds.
  * - ``jvm.memory.allocated``
    - Counter
    - Increase in the size of the young heap memory pool after 1 garbage collection and before the next.

.. _jvm-memory-metrics:

Memory metrics
----------------------------------------------------------------------

The agent collects the following memory metrics:

.. list-table::
  :header-rows: 1
  :widths: 40 10 50
  :width: 100%

  * - Metric
    - Type
    - Description
  * - ``jvm.memory.allocated``
    - Counter
    - Total number of bytes allocated by JVM threads since the previous data point was emitted. Use the rate per second rollup.
  * - ``jvm.buffer.count``
    - UpDown counter
    - An estimate of the number of buffers in the pool.
  * - ``jvm.buffer.memory.usage``
    - UpDown counter
    - An estimate of the memory that the JVM is using for this buffer pool, in bytes.
  * - ``jvm.buffer.memory.limit``
    - UpDown counter
    - An estimate of the total capacity of the buffers in this pool, in bytes.
  * - ``jvm.memory.committed``
    - UpDown counter
    - Amount of memory available to the JVM, in bytes.
  * - ``jvm.memory.limit``
    - UpDown counter
    - Maximum amount of memory available for memory management, in bytes.
  * - ``jvm.memory.used``
    - UpDown counter
    - Amount of used memory, in bytes.

.. _jvm-thread-metrics:

Thread metrics
----------------------------------------------------------------------

The agent collects the following thread metrics:

.. list-table::
  :header-rows: 1
  :widths: 40 10 50
  :width: 100%

  * - Metric
    - Type
    - Description
  * - ``jvm.thread.count``
    - UpDown counter
    - Number of live threads, including daemon and nondaemon threads.


.. _connection-pool-metrics:

Connection pool metrics
----------------------------------------------------------------------

The Splunk Distribution of OpenTelemetry Java instruments several Java Database Connectivity (JDBC) connection pool implementations:

- Apache DBCP2
- c3p0
- HikariCP
- Oracle Universal Connection Pool (UCP)
- Tomcat JDBC
- Vibur DBCP

Each of the connection pools reports a subset of the following metrics:

.. list-table::
  :header-rows: 1
  :widths: 40 10 50
  :width: 100%

  * - Metric
    - Type
    - Description
  * - ``db.client.connections.usage[state=used]``
    - Gauge
    - Number of open connections that are in use.
  * - ``db.client.connections.usage[state=idle]``
    - Gauge
    - Number of open connections that are idle.
  * - ``db.client.connections.idle.max``
    - Gauge
    - Maximum number of idle open connections allowed.
  * - ``db.client.connections.idle.min``
    - Gauge
    - Minimum number of idle open connections allowed.
  * - ``db.client.connections.max``
    - Gauge
    - Maximum number of open connections allowed.
  * - ``db.client.connections.pending_requests``
    - Gauge
    - Number of threads that are waiting for an open connection.
  * - ``db.client.connections.timeouts``
    - Counter
    - Number of connection timeouts that have happened since the application started.
  * - ``db.client.connections.create_time``
    - Histogram
    - Time it took to create a new connection, in milliseconds.
  * - ``db.client.connections.wait_time``
    - Histogram
    - Time it took to get an open connection from the pool, in milliseconds.
  * - ``db.client.connections.use_time``
    - Histogram
    - Time between borrowing a connection and returning it to the pool, in milliseconds.

.. _webengine-attributes-java-otel:

WebEngine attributes
=========================================================

The Splunk Distribution of OpenTelemetry Java captures data about the application server and adds the following attributes to `SERVER` spans:

.. list-table::
  :header-rows: 1
  :width: 100%

  * - Span attribute
    - Description
  * - ``webengine.name``
    - Name of the applications server. For example, ``tomcat``.
  * - ``webengine.version``
    - Version of the application server.

For a list of supported application servers, see the :ref:`supported-java-libraries`.


New metric names
======================================

.. include:: /_includes/gdi/java-20-metrics-equivalences.rst


Deactivate metrics export
==================================

To turn off logs export to Splunk Observability Cloud, set the ``OTEL_METRICS_EXPORTER`` environment variable or the ``otel.metrics.exporter`` system property to ``none``.
