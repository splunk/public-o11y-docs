.. _phase1-arch-gdi:

Onboarding part 2: Design your architecture and get data in
*********************************************************************

In the second part of the onboarding phase you get familiar with important concepts, gather requirements, and begin integrating Splunk Observability Cloud into your existing environment. To design your architecture and get data in, do the following:

.. meta::
    :description: 

#. :ref:`phase1-otel`
#. :ref:`phase1-arch-proto`
#. :ref:`phase1-network`
#. :ref:`phase1-metrics`
#. :ref:`phase1-host-k8s`
#. :ref:`phase1-3rd-party`
#. :ref:`phase1-apm`
#. :ref:`phase1-auto-instrument`
#. :ref:`phase1-zero-config`
#. :ref:`phase1-profiling`
#. :ref:`phase1-logs`
#. :ref:`phase1-dashboards-detectors`

.. _phase1-otel:

Get familiar with OpenTelemetry concepts 
==========================================================

Spend some time to understand the concepts of the OpenTelemetry Collector. Pay special attention to configuration of receivers, processors, exporters, and connectors since most OpenTelemetry configurations have each of these pipeline components. 

See :new-page:`https://opentelemetry.io/docs/concepts/`.

.. _phase1-arch-proto:

Create an architecture prototype
==========================================================

Create a prototype architecture solution for Splunk Observability Cloud in your organization. Do the following to create a prototype:

1. Get familiar with setting up and connecting applications to Splunk Observability Cloud. Set up an initial OpenTelemetry Collector onto 1 of the commonly used platforms, such as a VM instance or a Kubernetes cluster. 

   See :ref:`infrastructure-infrastructure` and :ref:`otel-intro` for more information.
2. In most cases, you also need to connect Splunk Observability Cloud to your cloud provider. To ingest data from cloud providers, such as, AWS, Azure, or Google Cloud Platform (GCP), you need to set up cloud integrations. 

   See :ref:`supported-data-sources` for supported integrations. 
3. Determine the OTel deployment mode you want to use. There are 2 modes: host (agent) and data forwarding (gateway). Host (agent) mode is the default mode. 

   See :ref:`otel-deployment-mode` for more information.
4. To support creation of charts and detectors in Splunk Observability Cloud, define and document a naming convention for your metric names. 

   See :ref:`metric-dimension-names`.
5. Select at least 1 application or service to collect metrics from as part of your prototype. This helps you see the corresponding dashboards and detectors are created when your metrics are received by Splunk Observability Cloud. Some example services to include as a prototype are an Nginx server, an Apache web server, or a database such as MySQL using OpenTelemetry receivers. 

   See :ref:`nginx`, :ref:`apache-httpserver`, or, :ref:`mysql`.
6. Get familiar with the Splunk Observability Cloud receivers for various applications and services. Each receiver has corresponding dashboards and detectors that are automatically created for each integration once the receiver reaches more than 50,000 datapoints. 

   See :ref:`monitor-data-sources`, :ref:`built-in-dashboards`, and :ref:`autodetect`.

.. _phase1-network:

Analyze your required network communication
=============================================

Analyze your required network communication. This includes determining what talks to what, which ports need to be open, which protocols to use, and proxy considerations. 

See :ref:`otel-exposed-endpoints` to determine which ports you need to open in the firewall and what protocols you need to turn on or off in the Collector. 

If your organization requires a proxy, see :ref:`allow-services`.

.. _phase1-metrics:

Analyze how to collect metrics from cloud providers
==========================================================================

To monitor a cloud-based host, install the Splunk OTel collector on each host to send host metrics to Splunk Observability Cloud. Use the Cloud providers' filters to refine what data you bring in to Splunk Observability Cloud. You can limit the host metrics you send by excluding specific metrics that you don't need to monitor from the cloud provider. Excluding metrics from being consumed offers the following advantages:

* You can control which host you monitor, instead of all hosts.
* You can retrieve advanced metrics without incurring extra cost.
* You can send metrics at a higher frequency without incurring extra cost, such as every 10 seconds (default) instead of every 5 minutes or more, which is the typical default for cloud providers. 

See :ref:`get-started-connect` and :ref:`otel_deployments`.


.. _phase1-host-k8s:

Configure and implement host and Kubernetes metrics
==========================================================

The OpenTelemetry Collector automatically reads and detects different types of host or Kubernetes metadata from operating systems or from the cloud providers. See :ref:`host-metrics-receiver` or :ref:`otel-kubernetes-config` for more information about host or Kubernetes metadata. 

The OpenTelemetry Collector adds dimensions, metric tags, and span attributes (also known as tags). The most common metadata entry is the name of the host, which can come from different sources with different names. See :ref:`metrics-dimensions-mts` for details on the metadata the collector adds. 

To retrieve and modify your metadata, use the resource detection processor in the pipeline section of the OpenTelemetry Agent Configuration. 

Before installing the OpenTelemetry Collector on a host, verify the resource detection module inside the configuration file of the OpenTelemetry Collector matches the preferred metadata source. The order determines which of the sources are used. See :ref:`resourcedetection-processor`.

.. _phase1-3rd-party:

Collect data from third-party metrics providers
==========================================================

When using the Splunk Distribution of OpenTelemetry Collector you can use receivers to collect metrics data from third-party providers. For example, the Prometheus receiver can scrape metrics data from any application that exposes a Prometheus endpoint. See :ref:`prometheus-receiver`.

See :ref:`monitor-data-sources` to see a list of receivers.

.. _phase1-apm:

Get familiar with Splunk APM and its concepts
==================================================================

Splunk APM provides end-to-end visibility to help identify issues such as errors and latency across all tags of a service. Splunk APM produces infinite cardinality metrics and full-fidelity traces. Splunk APM also measures RED (Request, Error, Duration) metrics. See :ref:`apm-orientation`.

To familiarize yourself with the key concepts of Splunk APM, see :ref:`apm-key-concepts`.

.. _phase1-auto-instrument:

Add an auto instrumentation library to a service to send traces to Splunk APM
==================================================================================

To send traces to Splunk APM, you need to either deploy an auto instrumentation agent for each programming language or language runtime or use the Zero Config auto instrumentation implementation for Java of .NET, described in the following section. 

See :ref:`instrument-applications`.  

.. _phase1-zero-config:

(Optional) Consider using Zero Configuration Auto Instrumentation
====================================================================================================

If you are deploying numerous similar services written in Java, .NET, or Node.js, you can deploy the OpenTelemetry collector and enable the Zero Configuration for Auto Instrumentation. Use zero config if you don't have access to the source code or the ability to change the deployment. 

See :ref:`zero-config`.

.. _phase1-profiling:

(Optional) Turn on AlwaysOn Profiling to collect stack traces
============================================================================

Use AlwaysOn Profiling for deeper analysis of the behavior of select applications. Code profiling collects snapshots of the CPU call stacks and memory usage. After you get profiling data into Splunk Observability Cloud, you can explore stack traces directly from APM and visualize the performance and memory allocation of each component using the flame graph. Use this profiling data to gain insights into your code behavior to troubleshoot performance issues. For example, you can identify bottlenecks and memory leaks for potential optimization.

See :ref:`profiling-intro`.

.. _phase1-logs:

Set up Log Observer Connect for Splunk Cloud Platform or Splunk Enterprise
================================================================================================

If your organization has an entitlement for Splunk Log Observer Connect, Splunk Observability Cloud can automatically relate logs to infrastructure and trace data. 

See :ref:`logs-set-up-logconnect` or :ref:`logs-scp`. 

.. _phase1-dashboards-detectors:

Review the default dashboards and detectors
==========================================================

Splunk Observability Cloud automatically adds built-in-dashboards for each integration you use once it ingests 50,000 data points. Review these built-in dashboards when they are available.

Splunk Observability Cloud also automatically adds the AutoDetect detectors that correspond to the integrations you are using. You can copy the AutoDetect detectors and customize them.

See :ref:`dashboards` and :ref:`autodetect`. 

Next step
===============

:ref:`phase2`



