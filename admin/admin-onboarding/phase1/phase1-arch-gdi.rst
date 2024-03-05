.. _phase1-arch-gdi:

Onboarding phase part 2: Design your architecture and get data in
*********************************************************************

NEED WORDS

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
#. :ref:`phase1-dashboards`
#. :ref:`phase1-detectors`

.. _phase1-otel:

Get familiar with the OpenTelemetry concepts 
==========================================================

It is important that you understand the concepts of the OpenTelemetry Collector. Pay special attention to configuration of receivers, processors, exporters, and connectors since most OpenTelemetry configurations have each of these pipeline components. 

See :new-page:`https://opentelemetry.io/docs/collector/` and :new-page:`https://opentelemetry.io/docs/collector/configuration/`.

.. _phase1-arch-proto:

Gather requirements and create an architecture prototype
==========================================================

To create an initial architecture solution for Splunk Observability Cloud in your organization you need to gather requirements to create an architecture prototype. 

1. Get familiar with setting up and connecting applications to Splunk Observability Cloud. Set up an initial OpenTelemetry Collector onto 1 of the the more commonly used platforms, such as a VM instance or a Kubernetes cluster. 

   See :ref:`infrastructure-infrastructure` and :ref:`otel-intro` for more information.
2. In most cases, you also need to connect Splunk Observability Cloud to your cloud provider. 

   See :ref:`supported-data-sources` for supported integrations. 
3. Determine the OTel deployment mode you want to use. There are 2 modes: host (agent) and data forwarding (gateway). Host (agent) mode is the default mode. 

   See :ref:`otel-deployment-mode` for more information.
4. To support creation of charts and detectors in Splunk Observability Cloud, define a naming convention for the metrics names. 

   See :ref:`metric-dimension-names`.
5. Select at least one application or service to collect metrics from as part of your prototype. This helps you see how the corresponding dashboards and detectors are created when your metrics are received by Splunk Observability Cloud. Some example services to include as a prototype are an Nginx server, an Apache web server, or a database such as MySQL using OpenTelemetry receivers. 

   See :ref:`nginx`, :ref:`apache-httpserver`, and, :ref:`mysql`.
6. Get familiar with the Splunk Observability Cloud platform receivers for various applications and services. Each receiver has corresponding dashboards and detectors that are automatically created for each integration once the receiver reaches more than 50,000 datapoints. 

   See :ref:`monitor-data-sources`, :ref:`built-in-dashboards`, and :ref:`autodetect`.

.. _phase1-network:

Analyze your required network communication
=============================================

Analyze your required network communication. This includes determining what talks to what, which ports need to be open, what protocols to use, and proxy considerations. 

See :ref:`otel-exposed-endpoints` to determine which ports need to open in the firewall and what protocols need to be enabled or disabled in the OTel collector. 

If a proxy is required by your organization, see :ref:`allow-services`.

.. _phase1-metrics:

Analyze how to collect metrics from cloud providers
==========================================================================

You need to integrate with cloud providers, such as, AWS, Azure, or GCP to allow data ingestion into Splunk Observability Cloud. It is recommended to pay attention to the filtering section in each Cloud provider. Using the Cloud providers' filters helps refine what data you bring in to Splunk Observability Cloud.

To monitor a cloud-based host, install the Splunk OTel collector on each host to send host metrics to Splunk Observability Cloud. You can limit the host metrics you send by excluding specific metrics that you do not need to monitor from consumed from the cloud provider. Excluding metrics from being consumed offers the following advantages:

* Controls which host is monitored, instead of all hosts
* Retrieves advanced metrics without incurring extra cost
* Allows you to send metrics at a higher frequency without incurring extra cost, such as every 10 seconds (default), instead of every 5 minutes or more, which is the typical default for cloud providers. 

See :ref:`get-started-connect` and :ref:`otel_deployments`.


.. _phase1-host-k8s:

Configure and implement host and Kubernetes metrics
==========================================================

The OpenTelemetry Collector automatically reads and detects different types of host or Kubernetes metadata from the OS or from the cloud providers. See :ref:`host-metrics-receiver` or :ref:`otel-kubernetes-config` for more information about host or Kubernetes metadata. 

The OpenTelemetry Collector adds dimensions, metric tags, and span attributes or tags. The most common metadata entry is the name of the host, which can come from different sources with different names. See :ref:`metrics-dimensions-mts` for details on the metadata the collector adds. 

To retrieve the metadata, use the resource detection processor in the pipeline section of the OpenTelemetry Agent Configuration. The resource detection processor allows you to modify your metadata as needed. 

Before installing the OpenTelemetry Collector on a host, verify the resource detection module inside the configuration file of the OpenTelemetry Collector matches the preferred metadata source. The order determines which of the sources are used. See :ref:`resourcedetection-processor`.

.. _phase1-3rd-party:

Collect data from third-party metrics providers
==========================================================

When using the Splunk Distribution of OpenTelemetry Collector you can receivers to collect metrics data from third-party providers. For example, the Prometheus receiver can scrape metrics data from any application that exposes a Prometheus endpoint. See :ref:`prometheus-receiver`.

See :ref:`monitor-data-sources` to see a list of receivers.

.. _phase1-apm:

Get familiar with the Splunk Observability APM concepts
==========================================================

Splunk APM provides end-to-end visibility to help identify issues such as errors and latency across all tags of a service. Splunk APM produces infinite cardinality metrics and full-fidelity traces. Splunk APM also measures RED (Request, Error, Duration) metrics. 

Familiarize yourself with the key concepts of Splunk APM as Splunk APM is utilizes the OpenTelemetry standard for Application Performance Monitoring. See :ref:`apm-key-concepts`.

.. _phase1-auto-instrument:

Add an auto-instrumentation library to a service to send traces to Splunk APM
==================================================================================

.. _phase1-zero-config:

(Optional) Consider the zero-config implementation for .Net and Java
===================================================================

.. _phase1-profiling:

Turn on AlwaysOn Profiling to continuously collect stack traces
=================================================================

.. _phase1-logs:

Log data source review (Log Observer Connect for Splunk Cloud Platform and Splunk Enterprise)
================================================================================================

.. _phase1-dashboards:

Review the default dashboards 
==========================================================

.. _phase1-detectors:

Review the default detectors
==========================================================

