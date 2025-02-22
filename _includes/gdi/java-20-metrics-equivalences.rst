The following table shows the metrics produced by default by OpenTelemetry Java 2.0 and higher, together with their legacy equivalent from version 1.x.

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 50 50
  
  * - OTel Java 2.0 metric
    - Legacy metric (1.x)
  * - ``db.client.connections.create_time`` (Histogram, ms)
    - ``db.pool.connections.create_time``
  * - ``db.client.connections.idle.max``
    - ``db.pool.connections.idle.max``
  * - ``db.client.connections.idle.min``
    - ``db.pool.connections.idle.min``
  * - ``db.client.connections.max``
    - ``db.pool.connections.max``
  * - ``db.client.connections.pending_requests``
    - ``db.pool.connections.pending_threads``
  * - ``db.client.connections.timeouts``
    - ``db.pool.connections.timeouts``
  * - ``db.client.connections.usage[state=idle]``
    - ``db.pool.connections.idle``
  * - ``db.client.connections.usage[state=used]``
    - ``db.pool.connections.active``
  * - ``db.client.connections.use_time`` (Histogram, ms)
    - ``db.pool.connections.use_time``
  * - ``db.client.connections.wait_time`` (Histogram, ms)
    - ``db.pool.connections.wait_time``
  * - ``jvm.buffer.count``
    - ``runtime.jvm.buffer.count``
  * - ``jvm.buffer.memory.limit``
    - ``runtime.jvm.buffer.total.capacity``
  * - ``jvm.buffer.memory.usage``
    - ``runtime.jvm.buffer.memory.used``
  * - ``jvm.class.count``
    - ``runtime.jvm.classes.loaded``
  * - ``jvm.class.unloaded``
    - ``runtime.jvm.classes.unloaded``
  * - ``jvm.gc.duration{jvm.gc.name=<concurrent gcs>}`` (Histogram) |br| ``jvm.gc.action``
    - ``runtime.jvm.gc.concurrent.phase.time``
  * - ``jvm.gc.duration{jvm.gc.name!=<concurrent gcs>}`` |br| ``jvm.gc.action``
    - ``runtime.jvm.gc.pause``
  * - ``jvm.memory.allocated``:sup:`*`
    - ``runtime.jvm.gc.memory.allocated`` |br| ``process.runtime.jvm.memory.allocated``
  * - ``jvm.memory.committed``
    - ``runtime.jvm.memory.committed``
  * - ``jvm.memory.limit``
    - ``runtime.jvm.memory.max``
  * - ``jvm.memory.limit{jvm.memory.pool.name=<long lived pools>}``
    - ``runtime.jvm.gc.max.data.size``
  * - ``jvm.memory.used``
    - ``runtime.jvm.memory.used``
  * - ``jvm.memory.used_after_last_gc{jvm.memory.pool.name=<long lived pools>}``
    - ``runtime.jvm.gc.live.data.size``
  * - ``jvm.thread.count``
    - ``runtime.jvm.threads.daemon`` |br| ``runtime.jvm.threads.live``


:sup:`*` This is a Splunk-specific metric and it's not present in the upstream semantic conventions.

.. note:: The previous table contains metrics generated by default. Additional metrics might be emitted by supported metrics instrumentation, for example when instrumenting application servers.

For more information on the HTTP semantic convention changes, see :new-page:`HTTP semantic convention stability migration guide <https://github.com/open-telemetry/semantic-conventions/blob/main/docs/non-normative/http-migration.md#summary-of-changes>` on GitHub.

