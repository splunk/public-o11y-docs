The following table shows the previous metric names and the current names used by OpenTelemetry Java 2.0 and higher. When a metric isn't available, the table suggests a similar metric or calculation where possible. For a full list of OpenTelemetry Java 2.0 metrics, see :ref:`java-otel-metrics-attributes`.

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 30 70
  
  * - Old name (Micrometer)
    - New name or OTel Java 2.0 equivalent
  * - ``runtime.jvm.classes.loaded``
    - ``jvm.class.count`` |br| ``jvm.class.loaded``
  * - ``runtime.jvm.classes.unloaded``
    - ``jvm.class.unloaded``
  * - ``runtime.jvm.gc.concurrent.phase.time``
    - ``jvm.gc.duration{jvm.gc.name=<concurrent gcs>}`` (Histogram)
  * - ``runtime.jvm.gc.live.data.size``
    - ``process.runtime.jvm.memory.usage_after_last_gc{pool=<long lived pools>}``
  * - ``runtime.jvm.gc.max.data.size``
    - ``jvm.memory.limit{jvm.memory.pool.name=<long lived pools>}``
  * - ``runtime.jvm.gc.memory.allocated``
    - ``process.runtime.jvm.memory.allocated``
  * - ``runtime.jvm.gc.memory.promoted``
    - No equivalent
  * - ``runtime.jvm.gc.pause``
    - ``jvm.gc.duration{jvm.gc.name!=<concurrent gcs>}``
  * - ``runtime.jvm.gc.overhead``
    - No equivalent
  * - ``runtime.jvm.memory.usage.after.gc``
    - ``jvm.memory.usage_after_last_gc{jvm.memory.pool.name=<long lived pools>,`` |br| ``jvm.memory.type=heap} / jvm.memory.limit{jvm.memory.pool.name=<long lived pools>,jvm.memory.type=heap}``
  * - ``process.runtime.jvm.memory.allocated``
    - ``process.runtime.jvm.memory.allocated``
  * - ``process.runtime.jvm.memory.reclaimed``
    - ``process.runtime.jvm.memory.reclaimed``
  * - ``runtime.jvm.buffer.count``
    - ``jvm.buffer.count``
  * - ``runtime.jvm.buffer.memory.used``
    - ``jvm.buffer.memory.usage``
  * - ``runtime.jvm.buffer.total.capacity``
    - ``jvm.buffer.memory.limit``
  * - ``runtime.jvm.memory.committed``
    - ``jvm.memory.committed``
  * - ``runtime.jvm.memory.max``
    - ``jvm.memory.limit``
  * - ``runtime.jvm.memory.used``
    - ``jvm.memory.used``
  * - ``runtime.jvm.threads.daemon``
    - ``jvm.thread.count``
  * - ``runtime.jvm.threads.live``
    - ``jvm.thread.count``
  * - ``runtime.jvm.threads.peak``
    - No equivalent
  * - ``runtime.jvm.threads.states``
    - ``jvm.thread.count``
  * - ``db.pool.connections``
    - ``db.client.connections.usage``
  * - ``db.pool.connections.active``
    - ``db.client.connections.usage[state=used]``
  * - ``db.pool.connections.idle``
    - ``db.client.connections.usage[state=idle]``
  * - ``db.pool.connections.idle.max``
    - ``db.client.connections.idle.max``
  * - ``db.pool.connections.idle.min``
    - ``db.client.connections.idle.min``
  * - ``db.pool.connections.max``
    - ``db.client.connections.max``
  * - ``db.pool.connections.pending_threads``
    - ``db.client.connections.pending_requests``
  * - ``db.pool.connections.timeouts``
    - ``db.client.connections.timeouts``
  * - ``db.pool.connections.create_time``
    - ``db.client.connections.create_time`` (Histogram, ms)
  * - ``db.pool.connections.wait_time``
    - ``db.client.connections.wait_time`` (Histogram, ms)
  * - ``db.pool.connections.use_time``
    - ``db.client.connections.use_time`` (Histogram, ms)
  * - ``executor.threads``
    - No equivalent
  * - ``executor.threads.active``
    - No equivalent
  * - ``executor.threads.idle``
    - No equivalent
  * - ``executor.threads.core``
    - No equivalent
  * - ``executor.threads.max``
    - No equivalent
  * - ``executor.tasks.submitted``
    - No equivalent
  * - ``executor.tasks.completed``
    - No equivalent