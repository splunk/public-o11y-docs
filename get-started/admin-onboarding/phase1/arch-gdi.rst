.. _phase1-arch-gdi:

Onboarding phase: Design your architecture and get data in
***************************************************************

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

It is important that you understand the concepts of the OpenTelemetry Collector. Pay special attention to configuration of receivers, processors, exporters, and connectors since most OpenTelemetry configurations have each of these pipeline components. See :new-page:`https://opentelemetry.io/docs/collector/` :new-page:`https://opentelemetry.io/docs/collector/configuration/`.

.. _phase1-arch-proto:

Gather requirements to create an architecture prototype
==========================================================

To create an initial architecture solution for Splunk Observability Cloud in your organization you need to gather requirements to create a architecture prototype. 

1. Start by building a small prototype system. To do so, you need to get familiar with setting up and connecting applications to Splunk Observability Cloud. Set up an initial OpenTelemetry Collector onto 1 of the the more commonly used platforms, such as a VM instance or a Kubernetes cluster. See :ref:`infrastructure-infrastructure` and :ref:`otel-intro` for more information.
2. In most cases you also need to connect Splunk Observability Cloud to your cloud provider. See :ref:`supported-data-sources` for supported integrations. 
3. You also need to make decisions on the OTel deployment mode you want to use. See :ref:`collector-intro-deploy` for more information.
4. the configurations of the OpenTelemetry agent either in native (single host) or in Kubernetes mode.
5. To support creation of charts and detectors in Splunk Observability Cloud, define a naming convention for the metrics names. See :ref:`metric-dimension-names`.
6. Select at least one application or service to collect metrics from as part of your prototype. This helps you see how the corresponding dashboards and detectors are created when your metrics are received by Splunk Observability Cloud. Some example services to include as a prototype are an Nginx server, an Apache web server, or a database such as MySQL using OpenTelemetry receivers. See :ref:`nginx`, :ref:`apache-httpserver`, and, :ref:`mysql`.
7. Get familiar with he Splunk Observability Cloud platform receivers for various applications and services. See :ref:`monitor-data-sources`. Each receiver has corresponding dashboards and detectors that are automatically created for each integration once the receiver reaches more than 50,000 datapoints. See :ref:`built-in-dashboards` and :ref:`autodetect`.



including configuring a OpenTelemetry gateway if required

.. _phase1-network:

Analyze your required network communication
=============================================

.. _phase1-metrics:

Analyze how to collect metrics from hosts, containers, cloud providers
==========================================================================

.. _phase1-host-k8s:

Configure and implement host and Kubernetes metrics
==========================================================

.. _phase1-3rd-party:

Collect data from 3rd-party metrics providers
==========================================================

.. _phase1-apm:

Get familiar with the Splunk Observability APM concepts
==========================================================

.. _phase1-auto-instrument:

Add an auto-instrumentation library to a service to send traces to Splunk APM
==================================================================================

.. _phase1-zero-config:

(Optional) Consider the zero-config implementation for .Net & Java
===================================================================

.. _phase1-profiling:

Turn on AlwaysOn Profiling to continuously collect stack traces
==========================================================

.. _phase1-logs:

Log data source review (Log Observer Connect for Splunk Cloud Platform and Splunk Enterprise)
==========================================================

.. _phase1-dashboards:

Review the default dashboards 
==========================================================

.. _phase1-detectors:

Review the default detectors
==========================================================

