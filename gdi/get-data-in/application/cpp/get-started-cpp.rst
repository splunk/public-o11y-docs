.. _get-started-cpp:

*********************************************************************
Instrument C++ applications for Splunk Observability Cloud
*********************************************************************

.. meta:: 
    :description: Use the OpenTelemetry Collector to send traces from your C++ applications to Splunk Observability Cloud.

You can use the OpenTelemetry Collector to send traces from C++ applications to Splunk APM. 

Follow these steps to instrument your C++ application:

#. :ref:`Add the required dependencies <cpp-dependencies>`
#. :ref:`Initialize the OpenTelemetry tracer <cpp-otel-tracer>`
#. :ref:`Generate spans for your application <cpp-generate-spans>`

.. _cpp-prerequisites:

Prerequisities
============================================

Before starting, make sure you've installed the following components:

* A C++ compiler supporting C++ versions 14 and higher
* Make
* CMake version 3.20 or higher

Additionally, you need to install the Splunk Distribution of OpenTelemetry Collector. The following distributions are available:

* :ref:`Linux <collector-linux-intro>`
* :ref:`Kubernetes <collector-kubernetes-intro>`
* :ref:`Windows <collector-windows-intro>`

After installing the Collector, make sure that you have an instance of the Collector running in your environment.

.. _cpp-opentelemetry-build:

1. Build the OpenTelemetry C++ libraries
===========================================

To instrument your C++ code, install and build the OpenTelemetry C++ libraries. Follow these steps: 

#. In your project directory, create a new directory called ``opentelemetry-cpp``. 

#. In the ``opentelemetry-cpp`` directory, clone the OpenTelemetry C++ repository:

    .. code-block:: bash

        git clone https://github.com/open-telemetry/opentelemetry-cpp.git

#. Next, run the following commands to build the OpenTelemetry C++ libraries:

    .. code-block:: bash 

        cd opentelemetry-cpp
        mkdir build
        cd build
        cmake ..
        cmake --build .

.. _cpp-dependencies:

2. Add the required dependencies
===========================================

Before you get started with instrumentation, the OpenTelemetry instrumentation for C++ requires several dependencies.

In your CMakeLists.txt file, add the following code to include these dependencies:

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

3. Initialize the OpenTelemetry tracer
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

4. Generate spans for your application
===========================================

The OpenTelemetry Collector gathers spans that your application generates. To start this process, create spans for the operations you want to track by editing your application code.

Follow these steps to create spans:

#. Create a tracer object. You need a tracer to create and start spans.

    .. code-block:: cpp

        auto provider = opentelemetry::trace::Provider::GetTracerProvider();
        auto tracer = provider->GetTracer("foo_library", "1.0.0");

#. Start a span. Your application emits the span whenever the associated operation is called.

    .. code-block:: cpp

        auto span = tracer->StartSpan("HandleRequest");

For more information about the types of spans you can create, see :new-page:`https://opentelemetry.io/docs/languages/cpp/instrumentation/#traces`.

While the application is running, your local instance of the OpenTelemetry Collector listens for these spans and sends them to Splunk Observability Cloud. You can then see your data in Splunk APM.

.. _cpp-send-data-directly:

Send data directly to Splunk Observability Cloud
============================================================

By default, all data goes to the local instance of the Splunk Distribution of OpenTelemetry Collector. 

If you need to send data directly to Splunk Observability Cloud, follow these steps:

#. Rebuild the OpenTelemetry C++ client and include the ``-DWITH_OTLP_GRPC=ON`` flag.
#. Configure the exporter to send data to an OTLP endpoint in your ``main.cpp`` code. For example:

   .. code-block:: cpp

        namespace otlp = opentelemetry::exporter::otlp;

        void InitTracer()
        {
            trace_sdk::BatchSpanProcessorOptions bspOpts{};
            // creates a new options object and sets the OTLP endpoint URL
            otlp::OtlpHttpExporterOptions opts;
            opts.url = "http://localhost:4318/v1/traces";

            // pass the options object as an argument for the exporter creator
            auto exporter = otlp::OtlpHttpExporterFactory::Create(opts);
            auto processor = trace_sdk::BatchSpanProcessorFactory::Create(std::move(exporter), bspOpts);
            std::shared_ptr<trace_api::TracerProvider> provider = trace_sdk::TracerProviderFactory::Create(std::move(processor));
            trace_api::Provider::SetTracerProvider(provider);
        }

#. Set the following environment variables:

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

OpenTelemetry C++ also has several example configurations. To view them, see :new-page:`https://github.com/open-telemetry/opentelemetry-cpp/tree/main/examples`.

