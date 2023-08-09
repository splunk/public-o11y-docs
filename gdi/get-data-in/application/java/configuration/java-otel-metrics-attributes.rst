.. _java-otel-metrics-attributes:

***************************************************************
Metrics and attributes collected by the Splunk OTel Java agent
***************************************************************

.. meta:: 
  :description: The Splunk Distribution of OpenTelemetry Java collects the following application metrics data and WebEngine attributes. You can also collect custom metrics through Micrometer.

The agent of the Splunk Distribution of OpenTelemetry Java collects the following application metrics data and attributes in addition to all that the upstream OpenTelemetry agent collects. To learn about the different metric types, see :ref:`metric-types`.

.. caution:: This feature is experimental, and exported metric data and configuration properties might change. See more in :new-page:`GitHub <https://github.com/signalfx/splunk-otel-java/blob/main/docs/metrics.md#metrics-and-attributes/>`.

.. _enable-otel-metrics:

Activate metrics collection
====================================================

To collect Java application and Java Virtual Machine metrics, see :ref:`enable_automatic_metric_collection`.

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
  * - :ref:`Tomcat thread pool metrics <thread-pool-metrics>`
    - ``tomcat``
    - Version 8.5 and higher
  * - :ref:`WebSphere Liberty thread pool metrics <thread-pool-metrics>`
    - ``liberty``
    - Version 20.0.0.12
  * - :ref:`WebLogic thread pool metrics <thread-pool-metrics>`
    - ``weblogic``
    - Versions 12.x and 14.x

.. _jvm-metrics:

JVM metrics
=============================================================

The Splunk OTel Java agent collects the following Java Virtual Machine (JVM) metrics when metric collection is activated:

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
  * - ``runtime.jvm.classes.loaded``
    - Gauge
    - Number of loaded classes.
  * - ``runtime.jvm.classes.unloaded``
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
  * - ``runtime.jvm.gc.concurrent.phase.time``
    - Timer
    - Time spent in concurrent phase, in milliseconds.
  * - ``runtime.jvm.gc.live.data.size``
    - Gauge
    - Size of long-lived heap memory pool after reclamation, in bytes.
  * - ``runtime.jvm.gc.max.data.size``
    - Gauge
    - Maximum size of long-lived heap memory pool, in bytes.
  * - ``runtime.jvm.gc.memory.allocated``
    - Counter
    - Increase in the size of the young heap memory pool after one garbage collection and before the next.
  * - ``runtime.jvm.gc.memory.promoted``
    - Counter
    - Count of positive increases in the size of the old generation memory pool from before to after garbage collection.
  * - ``runtime.jvm.gc.pause``
    - Timer
    - Time spent in garbage collection pause, in seconds. It produces multiple aggregations, such as ``runtime.jvm.gc.pause.avg``, ``runtime.jvm.gc.pause.count``, ``runtime.jvm.gc.pause.max``, or ``runtime.jvm.gc.pause.totalTime``.

.. _jvm-heap-pressure-metrics:

Heap pressure metrics
----------------------------------------------------------------------

The agent collects the following heap pressure metrics:

.. list-table:: 
  :header-rows: 1
  :widths: 40 10 50
  :width: 100%

  * - Metric
    - Type
    - Description
  * - ``runtime.jvm.gc.overhead``
    - Gauge
    - An approximation of the percentage of CPU time used by GCP activities over the last lookback period or since monitoring began, whichever is shorter, in the range [0..1].
  * - ``runtime.jvm.memory.usage.after.gc``
    - Gauge
    - The percentage of long-lived heap pool used after the last GCP event, in the range [0..1].

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
  * - ``process.runtime.jvm.memory.allocated``
    - Counter
    - Total number of bytes allocated by JVM threads since the previous data point was emitted. 
        - Use the rate per second rollup. 
        - Requires to activate memory profiling, or to use the ``splunk.metrics.experimental.enabled`` flag.
  * - ``process.runtime.jvm.memory.reclaimed``
    - Counter
    - Total number of bytes reclaimed by the GCP since the previous data point was emitted. Notes: 
        - This metric might be inaccurate for concurrent garbage collectors such as Shenandoah or ZGC. 
        - Use the rate per second rollup.
        - Requires to activate memory profiling, or to use the ``splunk.metrics.experimental.enabled`` flag. 
  * - ``runtime.jvm.buffer.count``
    - Gauge
    - An estimate of the number of buffers in the pool.
  * - ``runtime.jvm.buffer.memory.used``
    - Gauge
    - An estimate of the memory that the JVM is using for this buffer pool, in bytes.
  * - ``runtime.jvm.buffer.total.capacity``
    - Gauge
    - An estimate of the total capacity of the buffers in this pool, in bytes.
  * - ``runtime.jvm.memory.committed``
    - Gauge
    - Amount of memory available to the JVM, in bytes.
  * - ``runtime.jvm.memory.max``
    - Gauge
    - Maximum amount of memory available for memory management, in bytes.
  * - ``runtime.jvm.memory.used``
    - Gauge
    - Amount of used memory, in bytes.

All memory pool metrics share the following tags:

.. list-table:: 
  :header-rows: 1
  :width: 100%
  :widths: 30 70

  * - Tag
    - Value
  * - ``area``
    - Either ``heap`` or ``nonheap``
  * - ``id``
    - Name of the memory pool. For example, ``Perm Gen``

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
  * - ``runtime.jvm.threads.daemon``
    - Gauge
    - Number of live daemon threads.
  * - ``runtime.jvm.threads.live``
    - Gauge
    - Number of live threads, including both daemon and nondaemon threads.
  * - ``runtime.jvm.threads.peak``
    - Gauge
    - Peak live thread count since the JVM started or peak was reset.
  * - ``runtime.jvm.threads.states``
    - Gauge
    - Number of threads per ``state`` as a metric tag.

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
- WebSphere Liberty
- WebLogic thread pools

Each of the connection pools reports a subset of the following metrics:

.. list-table:: 
  :header-rows: 1
  :widths: 40 10 50
  :width: 100%

  * - Metric
    - Type
    - Description
  * - ``db.pool.connections``
    - Gauge
    - Number of open connections.
  * - ``db.pool.connections.active``
    - Gauge
    - Number of open connections that are in use.
  * - ``db.pool.connections.idle``
    - Gauge
    - Number of open connections that are idle.
  * - ``db.pool.connections.idle.max``
    - Gauge
    - Maximum number of idle open connections allowed.
  * - ``db.pool.connections.idle.min``
    - Gauge
    - Minimum number of idle open connections allowed.
  * - ``db.pool.connections.max``
    - Gauge
    - Maximum number of open connections allowed.
  * - ``db.pool.connections.pending_threads``
    - Gauge
    - Number of threads that are waiting for an open connection.
  * - ``db.pool.connections.timeouts``
    - Counter
    - Number of connection timeouts that have happened since the application started.
  * - ``db.pool.connections.create_time``
    - Timer
    - Time it took to create a new connection.
  * - ``db.pool.connections.wait_time``
    - Timer
    - Time it took to get an open connection from the pool.
  * - ``db.pool.connections.use_time``
    - Timer
    - Time between borrowing a connection and returning it to the pool.

All connection pool metrics share the following tags:

.. list-table:: 
  :header-rows: 1
  :widths: 40 60
  :width: 100%

  * - Tag
    - Value
  * - ``pool.name``
    - Name of the connection pool. Spring bean name if Spring is used, JMX object name otherwise.
  * - ``pool.type``
    - Type or implementation of the connection pool. For example, ``c3p0``, ``dbcp2``, or ``hikari``.

.. _thread-pool-metrics:

Thread pool metrics
----------------------------------------------------------------------

The Splunk Distribution of OpenTelemetry Java instruments the following thread pool implementations:

- Tomcat connector thread pools
- WebSphere Liberty web request thread pool
- Weblogic thread pools

Each of the supported connection pools reports a subset of the following metrics:

.. list-table:: 
  :header-rows: 1
  :widths: 40 10 50
  :width: 100%

  * - Metric
    - Type
    - Description
  * - ``executor.threads``
    - Timer
    - Number of threads in the pool.
  * - ``executor.threads.active``
    - Timer
    - Number of threads that are executing code.
  * - ``executor.threads.idle``
    - Timer
    - Number of threads that aren't executing code.
  * - ``executor.threads.core``
    - Timer
    - Core thread pool size, expressed as the number of threads that are always kept in the pool.
  * - ``executor.threads.max``
    - Timer
    - Maximum number of threads in the pool.
  * - ``executor.tasks.submitted``
    - Counter
    - Total number of tasks submitted to the executor.
  * - ``executor.tasks.completed``
    - Counter
    - Total number of tasks completed by the executor.

All thread pool metrics have the following tags:

.. list-table:: 
  :header-rows: 1
  :widths: 40 60
  :width: 100%

  * - Tag
    - Value
  * - ``executor.name``
    - Name of the thread pool.
  * - ``executor.type``
    - Type/implementation of the connection pool. For example, ``tomcat``, ``liberty``, or ``weblogic``.

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

For a list of supported application servers, see the OpenTelemetry documentation at https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md#application-servers.
