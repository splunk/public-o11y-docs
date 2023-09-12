Default translation rules and generated metrics
----------------------------------------------------------

The SignalFx exporter uses the translation rules defined in :new-page:`translation/constants.go <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/signalfxexporter/internal/translation/constants.go>` by default. 

The default rules create metrics which are reported directly to Infrastructure Monitoring. If you want to change any of their attributes or values, you need to either modify the translation rules or their constituent host metrics.

By default, the SignalFx exporter creates the following aggregated metrics from the :ref:`host-metrics-receiver`:

* ``cpu.idle``
* ``cpu.interrupt``
* ``cpu.nice``
* ``cpu.num_processors``
* ``cpu.softirq``
* ``cpu.steal``
* ``cpu.system``
* ``cpu.user``
* ``cpu.utilization``
* ``cpu.utilization_per_core``
* ``cpu.wait``
* ``disk.summary_utilization``
* ``disk.utilization``
* ``disk_ops.pending``
* ``disk_ops.total``
* ``memory.total``
* ``memory.utilization``
* ``network.total``
* ``process.cpu_time_seconds``
* ``system.disk.io.total``
* ``system.disk.operations.total``
* ``system.network.io.total``
* ``system.network.packets.total``
* ``vmpage_io.memory.in``
* ``vmpage_io.memory.out``
* ``vmpage_io.swap.in``
* ``vmpage_io.swap.out``

In addition to the aggregated metrics, the default rules make available the following "per core" custom hostmetrics. The CPU number is assigned to the dimension ``cpu``:

* ``cpu.interrupt``
* ``cpu.nice``
* ``cpu.softirq``
* ``cpu.steal``
* ``cpu.system``
* ``cpu.user``
* ``cpu.wait``