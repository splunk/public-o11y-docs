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
* A running instance of the Splunk Distribution of OpenTelemetry Collector.

.. _cpp-dependencies:

\1. Add the required dependencies
===========================================

Before you get started with instrumentation, the OpenTelemetry Collector requires several dependencies.

In your CMakeLists.txt file, add the following code to include these dependencies.

.. code-block:: cpp

    include_directories(${OPENTELEMETRY_ROOT}/api/include)
    include_directories(${OPENTELEMETRY_ROOT}/sdk/include)
    include_directories(${OPENTELEMETRY_ROOT}/sdk/src)
    include_directories(${OPENTELEMETRY_ROOT}/exporters/ostream/include)

    find_library(OPENTELEMETRY_COMMON_LIB NAMES libopentelemetry_common.a HINTS "${OPENTELEMETRY_ROOT}/build/sdk/src/common" NO_DEFAULT_PATH)
    find_library(OPENTELEMETRY_TRACE_LIB NAMES libopentelemetry_trace.a HINTS "${OPENTELEMETRY_ROOT}/build/sdk/src/trace" NO_DEFAULT_PATH)
    find_library(OPENTELEMETRY_EXPORTER_LIB NAMES libopentelemetry_exporter_ostream_span.a HINTS "${OPENTELEMETRY_ROOT}/build/exporters/ostream" NO_DEFAULT_PATH)
    find_library(OPENTELEMETRY_RESOURCE_LIB NAMES libopentelemetry_resources.a HINTS "${OPENTELEMETRY_ROOT}/build/sdk/src/resource" NO_DEFAULT_PATH)

    if(OPENTELEMETRY_COMMON_LIB AND OPENTELEMETRY_TRACE_LIB AND OPENTELEMETRY_EXPORTER_LIB AND OPENTELEMETRY_RESOURCE_LIB)
        message(STATUS "Found opentelemetry libraries")
    else()
        message(SEND_ERROR "Did not find opentelemetry libraries")
    endif()

.. _cpp-otel-tracer:

\2. Initialize the OpenTelemetry tracer
===========================================

The OpenTelemetry tracer runs alongside your C++ application, generating telemetry data when the application receives calls.

To start the tracer, add the following code to your main.cpp file. This code adds functions that you can call in your application to initialize and cleanup the OpenTelemetry tracer.

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

The OpenTelemetry Collector gathers spans that your application generates. To start this process, create spans for the operations you want to track by editing your application code.

Follow these steps to create spans:

#. Create a tracer object. You need a tracer to create and start spans.

    .. code-block:: cpp

        auto provider = opentelemetry::trace::Provider::GetTracerProvider();
        auto tracer = provider->GetTracer("foo_library", "1.0.0");

#. Start a span.

    .. code-block:: cpp

        auto span = tracer->StartSpan("HandleRequest");

For more information about the types of spans you can create, see :new-page:`https://opentelemetry.io/docs/languages/cpp/instrumentation/#traces`.

While the application is running, your local instance of the OpenTelemetry Collector listens for these spans and sends them to Splunk Observability Cloud. You can then see your data in Splunk APM.

.. _cpp-send-data-directly:

Send data directly to Splunk Observability Cloud
============================================================

By default, all data goes to the local instance of the Splunk Distribution of OpenTelemetry Collector. 

If you need to send data directly to Splunk Observability Cloud, set the following environment variables:

.. code-block:: bash

    OTEL_EXPORTER_OTLP_PROTOCOL=grpc
    OTEL_EXPORTER_OTLP_TRACES_HEADERS=x-sf-token=<access_token>
    OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.<realm>.signalfx.com

Replace ``<realm>`` with your Splunk Observability Cloud realm and ``<access-token>`` with your Splunk Observability Cloud access token with ingest permissions.

To learn more about realms and access tokens, see :ref:`admin-org-tokens`.

.. _cpp-learn-more:

Learn more
===========================================

For a walkthrough that uses a sample C++ application, see :new-page:`https://opentelemetry.io/docs/languages/cpp/`. This walkthrough uses the upstream OpenTelemetry Collector, not the Splunk Distribution.