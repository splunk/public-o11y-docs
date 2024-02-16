.. _get-started-cpp:

*********************************************************************
Instrument C++ applications for Splunk Observability Cloud
*********************************************************************

.. meta:: 
    :description: Use the OpenTelemetry Collector to send traces from your C++ applications to Splunk Observability Cloud.

You can use the OpenTelemetry Collector to send traces from C++ applications to Splunk APM. 

Follow these steps to instrument your C++ application:

#. Add the required dependencies
#. Initialize the OpenTelemetry tracer
#. Generate spans for your application

.. _cpp-prerequisites:

Prerequisities
============================================

Before starting, make sure you've installed the following components:

* Git
* A C++ compiler supporting C++ versions 14 and higher
* Make
* CMake version 3.20 or higher

.. _cpp-dependencies:

\1. Install the Splunk Distribution of OpenTelemetry Collector
==================================================================

.. be more specific about the directory 

In the directory for your C++ application, follow these steps to install the OpenTelemetry Collector:

#. Clone the OpenTelemetry C++ repository.

    .. code-block:: bash

        $ git clone https://github.com/open-telemetry/opentelemetry-cpp.git

#. Build the OpenTelemetry Collector.

    .. code-block:: bash

        $ cd opentelemetry-cpp
        $ mkdir build
        $ cd build
        $ cmake ..
        $ cmake --build .

.. _cpp-otel-tracer:

\2. Initialize the OpenTelemetry tracer
===========================================

Add the following code to your main.cpp file. This code adds functions that you can call in your application to initialize and cleanup the OpenTelemetry tracer.

.. code-block:: cpp

    #include "opentelemetry/exporters/ostream/span_exporter_factory.h"
    #include "opentelemetry/sdk/trace/exporter.h"
    #include "opentelemetry/sdk/trace/processor.h"
    #include "opentelemetry/sdk/trace/simple_processor_factory.h"
    #include "opentelemetry/sdk/trace/tracer_provider_factory.h"
    #include "opentelemetry/trace/provider.h"

    using namespace std;
    namespace trace_api = opentelemetry::trace;
    namespace trace_sdk = opentelemetry::sdk::trace;
    namespace trace_exporter = opentelemetry::exporter::trace;

    namespace {
        void InitTracer() {
            auto exporter  = trace_exporter::OStreamSpanExporterFactory::Create();
            auto processor = trace_sdk::SimpleSpanProcessorFactory::Create(std::move(exporter));
            std::shared_ptr<opentelemetry::trace::TracerProvider> provider =
            trace_sdk::TracerProviderFactory::Create(std::move(processor));
            //set the global trace provider
            trace_api::Provider::SetTracerProvider(provider);
        }
        void CleanupTracer() {
            std::shared_ptr<opentelemetry::trace::TracerProvider> none;
            trace_api::Provider::SetTracerProvider(none);
        }
    }

    int main() {
        InitTracer();

        // Other application code

        CleanupTracer();
        return 0;
    }

.. _cpp-generate-spans:

\3. Generate spans for your application
===========================================

In your application code, create spans for the operations you want to track. Follow these steps to create spans:

#. Create a tracer object. You need a tracer to create and start spans.

    .. code-block:: cpp

        auto provider = opentelemetry::trace::Provider::GetTracerProvider();
        auto tracer = provider->GetTracer("foo_library", "1.0.0");

#. Start a span.

    .. code-block:: cpp

        auto span = tracer->StartSpan("HandleRequest");

For more information about the types of spans you can create, see :new-page:`https://opentelemetry.io/docs/languages/cpp/instrumentation/#traces`.

.. Could be useful to add this

.. _cpp-view-apm-results:

\4. See results in Splunk APM
===========================================

By default, all data goes to the local instance of the Splunk Distribution of OpenTelemetry Collector. 

.. _cpp-learn-more:

Learn more
===========================================

For a walkthrough that uses a sample C++ application, see :new-page:`https://opentelemetry.io/docs/languages/cpp/`.