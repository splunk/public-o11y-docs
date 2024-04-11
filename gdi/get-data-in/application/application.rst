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
   Instrument a Ruby application TOGGLE <ruby/get-started-ruby>
   Instrument a PHP application TOGGLE <php/get-started>
   Instrument a C++ application TOGGLE <cpp/get-started-cpp>
   Send spans from the Istio service mesh <istio/istio>

You can instrument your back-end services and applications to send metrics and traces to Splunk Observability Cloud.

.. raw:: html

   <embed>
      <h2>How to send application data to Splunk Observability Cloud<a name="otel-apm-send" class="headerlink" href="#otel-apm-send" title="Permalink to this headline">¶</a></h2>
   </embed>

You have the following options to send app and service data to Splunk Observability Cloud:

* Use the Splunk Distribution of OpenTelemetry Collector to send metrics and traces from back-end applications.

   * Available languages include Java, Node.js, .NET, Go, Python, Ruby, and PHP.

   * Learn more about the Collector at :ref:`otel-intro`, including the :ref:`zero-config`.

* Send metrics and traces directly to Splunk Observability Cloud using the API. See more in our :new-page:`dev portal documentation <https://dev.splunk.com/observability/docs/apm/send_traces>`.

.. mermaid::

   flowchart LR

      accTitle: Back-end instrumentation diagram 
      accDescr: OpenTelemetry instrumentation encompasses back-end applications and serverless functions. Instrumentation sends back-end application metrics, traces, and logs to the Splunk Distribution of OpenTelemetry Collector, which sends them to Splunk APM. Instrumentation also sends back-end application metrics, traces, and logs to Splunk APM through the API. Instrumentation sends serverless function metrics, traces, and logs to Splunk APM using the API.

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
      <h3>Limitations to using the API<a name="otel-apm-send-api" class="headerlink" href="#otel-apm-send-api" title="Permalink to this headline">¶</a></h3>
   </embed>

If you send your APM data directly to Splunk Observability Cloud without using the Collector, keep in mind the following limitations:

* APM billing data might be inaccurate. Learn more at :ref:`apm-billing-usage-index`.
* APM monitoring correlation might not work as expected, impacting Related Content. To use Related Content, refer to :ref:`get-started-relatedcontent`.

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
- :ref:`C++ <get-started-cpp>`

To send spans from the Istio service mesh, see :ref:`get-started-istio`.

To learn more about the data collected by Splunk Observability Cloud, see:

- :ref:`data-model`
- :ref:`get-started-metrics`
- :ref:`span-attributes`
