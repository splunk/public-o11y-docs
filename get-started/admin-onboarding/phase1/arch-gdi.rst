.. _phase1-arch-gdi:

Onboarding phase: Design your architecture and get data in
***************************************************************

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

It is important that you understand the concepts of the OpenTelemetry Collector. Pay special attention to configuration of receivers, processors, exporters, and connectors since most OpenTelemetry configurations have each of these pipeline component. See :new-page:`https://opentelemetry.io/docs/collector/` :new-page:`https://opentelemetry.io/docs/collector/configuration/`.

.. _phase1-arch-proto:

Gather requirements to create an architecture prototype
==========================================================

Initial architecting of solution by creating a prototype (requirements gathering), including configuring a OpenTelemetry gateway if required

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

