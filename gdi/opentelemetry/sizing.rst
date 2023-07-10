.. _otel-sizing:

*****************************
Sizing and scaling 
*****************************

.. meta::
      :description: Follow these guidelines when deploying the Splunk Distribution of OpenTelemetry Collector in your environment. Use these guidelines to make sure the Collector is properly sized.

By default, the Collector is configured to use 512 MB (500 x 2^20 bytes) of memory. 

With a single CPU core, the Collector can receive, process, or export the following: 

* If handling traces, 15,000 spans per second.
* If handling metrics, 20,000 data points per second.
* If handling logs, 10,000 log records per second, including Fluentd ``td-agent``, which forwards logs to the ``fluentforward`` receiver in the Collector.

Sizing recommendations 
==========================================

The following is recommended:

* Use a ratio of one CPU to 2 GB of memory. 
* If the Collector handles both trace and metrics data, consider both types of data when planning your deployment. For example, 7.5K spans per second plus 10K data points per second requires 1 CPU core.
* The Collector does not persist data to disk so no disk space is required.

Host monitoring (agent) mode
------------------------------------------------------------

For :ref:`host monitoring (agent) mode <collector-agent-mode>`, allocate resources as needed. 

* Typically, only a single agent runs per application or host, so properly sizing the agent is important. 
* Consider deploying multiple independent agents for a given application or host depending on the use case. For example, a privileged agent can be deployed alongside an unprivileged agent.

Data forwarding (gateway) mode
------------------------------------------------------------

For :ref:`data forwarding (gateway) mode <collector-gateway-mode>`, allocate at least one CPU core per Collector. Each Collector runs independently, so scale increases linearly with the number of Collectors you deploy.

You can deploy multiple Collectors behind a round-robin load balancer for higher availability and performance. Do the following to evenly distribute the data:

* Install a cluster of Collectors with at least N+1 redundancy, which means a load balancer and a minimum of two Collector instances should be configured initially.
* Define a round-robin DNS name.

Component limitations
------------------------------------------------------------

While the Collector itself doesn't define limits, some :ref:`OTel components <otel-components>` do. 

For instance, if you're using the :ref:`splunk-hec-exporter`, the following default limits (among other) apply: 

* Single log event maximum size: 5 MiB 
* Log event batch maximum size (compressed): 2 MiB

.. note:: Check the default values, recommendations and limitations for each of the individual components in your Collector's configuration. Although limits can be configured, use default values for standard working environments.

Scaling recommendations
===========================

To define and scale your architecture, analyze the behavior of your workload to understand the loads and format of each signal type, as well as the load's distribution in time.

For example, consider a scenario with hundreds of Prometheus endpoints to scrape, a terabyte of logs coming from fluentd instances every minute, and some application metrics and OTLP traces.

In this scenario:

* Scaling the Prometheus receivers requires coordination among the scrapers to decide which scraper goes to which endpoint, so set up an architecture that can scale each signal individually. 
* Given that the OTLP receiver allows the ingestion of all telemetry types, application metrics and traces can be on the same instance, so you can scale them horizontally when needed.

When to scale
------------------------------------------------------------

Here's a few tips: 

* If using the ``memory_limiter`` processor, check the ``otelcol_processor_refused_spans`` metric. If data is being refused from entering the pipeline too often, scale up your Collector cluster. You can scale down after memory consumption across the nodes is significantly lower than the limit set through the processor.
* Check metrics related to the queue sizes for exporters, such as ``otelcol_exporter_queue_capacity`` and ``otelcol_exporter_queue_size``. If there aren't enough workers or the back end is too slow, data might accumulate in the queue until there's no more space and it's rejected.

Sometimes scaling won't bring any benefits: 

* If the telemetry database can't keep up with the load. Check ``otelcol_exporter_queue_size`` and ``otelcol_exporter_queue_capacity``: If queue size is close to the queue capacity, exporting data is slower than receiving data. 
* If the network connection between the Collector and the back end is saturated. If the ``otelcol_exporter_send_failed_spans`` metric increases, data is not getting to the back end. 

Scale the Collector
------------------------------------------------------------

How to scale depends on whether the Collector components are stateless, stateful, or scrapers.

Stateless components 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Most components are stateless, so even if they hold some state in memory, it isn't relevant for scaling purposes. 

To scale stateless components, add new replicas and use a load balancer. Consider splitting your collection pipeline for greater reliability.

Stateful components 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Components that might hold data in memory are considered stateful. Stateful components require careful consideration before being scaled up, as they might yield different results when scaled up.

As a general approach, consider adding a layer of Collectors containing the ``load-balancing`` exporter in front of your Collectors doing the tail-sampling or the span-to-metrics processing. The load-balancing exporter hashes the trace ID or the service name consistently and determine which Collector back end must receive spans for a trace. 

You can configure the ``load-balancing`` exporter to use the list of hosts behind a given DNS ``A`` entry. You can also specify a list of static hosts to be used by the exporter. 

Scrapers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To scrape thousands of endpoints you can't simply add more instances with the same configuration, as each Collector would try to scrape the same endpoints as every other Collector in the cluster.

The solution is to shard the endpoints by Collector instances so that if we add another replica of the Collector, each one will act on a different set of endpoints. You can do this by having one configuration file for each Collector so that each Collector would discover only the relevant endpoints for that Collector. Alternatively, you can scale the Prometheus receiver using the Target Allocator.

Learn more
------------------------------------------------------------

To learn more and see scaling examples, read the OpenTelemetry documentation at :new-page:`https://opentelemetry.io/docs/collector/scaling/ <https://opentelemetry.io/docs/collector/scaling/>`.