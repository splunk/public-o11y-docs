.. _get-started-application:

************************************************************
Instrument back-end applications to send spans to Splunk APM
************************************************************

.. meta::
   :description: Start sending back-end application metrics and spans to Splunk Observability Cloud.

..	toctree::
   :hidden:

   Instrument a Java application TOGGLE <java/get-started>
   Instrument a Node.js application TOGGLE <nodejs/get-started>
   Instrument a .NET application TOGGLE <otel-dotnet/get-started>
   Instrument a Go application TOGGLE <go/get-started>
   Instrument a Python application TOGGLE <python/get-started>
   Instrument a Ruby application TOGGLE <ruby/get-started>
   Instrument a PHP application TOGGLE <php/get-started>
   Instrument a .NET application (SignalFx) TOGGLE <dotnet/get-started>
   Instrument applications written in other programming languages <other-languages>
   Send spans from the Istio service mesh <istio/istio>

Instrument your back-end services and applications to send metrics and traces to Splunk Observability Cloud.
You can send metrics and traces from back-end applications to Splunk Observability Cloud through the Splunk Distribution of OpenTelemetry Collector, or you can send metrics and traces directly to Splunk Observability Cloud using the API.

.. mermaid::

   flowchart LR

      accTitle: Back-end instrumentation diagram
      
      accDescr: OpenTelemetry instrumentation encompasses back-end applications and serverless functions. 
      Instrumentation sends back-end application metrics, traces, and logs to the Splunk Distribution of 
      OpenTelemetry Collector, which sends them to Splunk APM. Instrumentation also sends back-end application 
      metrics, traces, and logs to Splunk APM through the API. Instrumentation sends serverless function metrics, 
      traces, and logs to Splunk APM using the API. 
               

      subgraph "\nOpenTelemetry instrumentation"


      A["Back-end applications
      (Go, Python, Ruby, ...)"]
      B["Serverless functions 
      (AWS Lambda, Azure, GCP)"]
      end

      A -- "traces, metrics, logs" --> O

      O["Splunk Distribution of 
      OpenTelemetry Collector"]
      O --> M["Splunk APM"]

      A -- "traces, metrics, logs (API)" --> M
      B -- "traces, metrics, logs (API)" --> M


.. raw:: html

  <embed>
    <h2>Available language instrumentations<a name="otel-instrumentations" class="headerlink" href="#otel-instrumentations" title="Permalink to this headline">¶</a></h2>
  </embed>

You can instrument applications in each of these languages using official Splunk instrumentation:

- :ref:`Java <get-started-java>`
- :ref:`Node.js <get-started-nodejs>`
- :ref:`.NET <get-started-dotnet-otel>`
- :ref:`Go <get-started-go>`
- :ref:`Python <get-started-python>`
- :ref:`Ruby <get-started-ruby>`
- :ref:`PHP <get-started-php>`

To send spans from the Istio service mesh, see :ref:`get-started-istio`.

You can also send traces from applications written in languages for which Splunk instrumentation isn't available:

- :ref:`Erlang <apm-instrumentation-other-langs>`
- :ref:`Rust <apm-instrumentation-other-langs>`

To learn more about the data collected by Splunk Observability Cloud, see:

- :ref:`data-model`.
- :ref:`get-started-metrics`.
- :ref:`span-attributes`.
