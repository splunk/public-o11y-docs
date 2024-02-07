.. _ootb-metrics-linux:

****************************************************************
Collected metrics and dimensions for Linux
****************************************************************

.. meta::
      :description: Out-of-the-box metrics and dimensions obtained with the Collector for Kubernetes.


The following sections list the collected metrics when you use the default configuration for the Collector for Linux in host monitoring (agent) mode. 

The Collector processes collected data as configured in your pipelines. Therefore, metrics that are imported by receivers might be excluded further into the pipeline by other components. For instance, the :ref:`signalfx-exporter`, included in the default Collector configuration, drops certain metrics and applies :ref:`translation rules <exclusion-rules>` that impact the metrics the Collector sends to Splunk Observability Cloud.    

Learn more about the Collector's configuration and data processing at:

* :ref:`collector-linux-intro`
* :ref:`linux-config-ootb`
* :ref:`otel-deployment-mode`
* :ref:`otel-data-processing`
* :ref:`signalfx-exporter`

Metrics collected by the Collector for Linux
============================================================================

.. note:: To see the Collector's internal metrics, refer to :ref:`metrics-internal-collector`.

* ``cpu.idle``
* ``cpu.num_processors``
* ``cpu.utilization``
* ``disk.summary_utilization``
* ``disk.utilization``
* ``disk_ops.total``
* ``memory.total``
* ``memory.utilization``
* ``network.total``
* ``scrape_duration_seconds``
* ``scrape_samples_post_metric_relabeling``
* ``scrape_samples_scraped``
* ``scrape_series_added``
* ``system.cpu.load_average.15m``
* ``system.cpu.load_average.1m``
* ``system.cpu.load_average.5m``
* ``system.disk.io.total``
* ``system.disk.operations``
* ``system.disk.operations.total``
* ``system.filesystem.usage``
* ``system.memory.usage``
* ``system.network.errors``
* ``system.network.io``
* ``system.network.io.total``
* ``system.network.packets.total``
* ``system.paging.operations``
* ``up``
* ``vmpage_io.swap.in``
* ``vmpage_io.swap.out``

