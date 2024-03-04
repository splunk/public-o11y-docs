.. _instrument-rust:

************************************************************************
Instrument your Rust application for Splunk Observability Cloud
************************************************************************

.. meta:: 
    :description: Learn how to instrument your Rust application using the OpenTelemetry instrumentation for Rust and send your application traces to Splunk Observability Cloud.

You can send traces from your Rust applications using the OpenTelemetry instrumentation for Rust. To get started, follow these instructions.

1. Add the required dependencies or packages
==================================================

To instrument your application for Splunk Observability Cloud, you need to generate traces and spans that follow the OpenTelemetry format and semantic conventions. Add the required OpenTelemetry dependencies to your project, including gRPC communication libraries for communicating with the Splunk OpenTelemetry Collector.

Add the required dependencies to the cargo.toml file:

.. code-block:: toml

    [package]
    name = "demorust"
    version = "0.1.0"
    edition = "2021"

    [dependencies]
    opentelemetry = { version = "0.18.0", features = ["rt-tokio", "metrics", "trace"] }
    opentelemetry-otlp = { version = "0.11.0", features = ["trace", "metrics"] }
    opentelemetry-semantic-conventions = { version = "0.10.0" }
    # You might have to install protobuf or protoc
    opentelemetry-proto = { version = "0.1.0"}
    tokio = { version = "1", features = ["full"] }

.. _rust-init-tracer:

2. Initialize the OpenTelemetry tracer
=================================================

In your application code, initialize the OpenTelemetry library and tracer like in the following example:

Add the required modules and initialize the tracer:

.. code-block:: Rust

    use opentelemetry::global::shutdown_tracer_provider;
    use opentelemetry::sdk::Resource;
    use opentelemetry::trace::TraceError;
    use opentelemetry::{global, sdk::trace as sdktrace};
    use opentelemetry::{
        trace::{TraceContextExt, Tracer},
        Context, Key, KeyValue,
    };
    use opentelemetry_otlp::WithExportConfig;
    use std::error::Error;

    fn init_tracer() -> Result<sdktrace::Tracer, TraceError> {
        opentelemetry_otlp::new_pipeline()
            .tracing()
            .with_exporter(
            opentelemetry_otlp::new_exporter()
                .tonic()
                // Splunk OTel Collector default endpoint
                .with_endpoint("http://localhost:4317"),
            )
            // Define the service name and deployment environment
            .with_trace_config(
                sdktrace::config().with_resource(Resource::new(vec![
                    KeyValue::new(opentelemetry_semantic_conventions::resource::SERVICE_NAME,"trace-demo",),
                    KeyValue::new(opentelemetry_semantic_conventions::resource::DEPLOYMENT_ENVIRONMENT,"production-rust",)
                ])),
            )
        .install_batch(opentelemetry::runtime::Tokio)
    }

.. _rust-generate-spans:

3. Generate spans for your application
==================================================

In your Rust code, create spans for the operations you want to track.

The following example shows how to create spans that have attributes or tags:

Add the required modules and initialize the tracer:

.. code-block:: Rust

    // Define some span attributes
    const LEMONS_KEY: Key = Key::from_static_str("lemons");
    const ANOTHER_KEY: Key = Key::from_static_str("ex.com/another");

    #[tokio::main]
    async fn main() -> Result<(), Box<dyn Error + Send + Sync + 'static>> {
        let _ = init_tracer()?;
        let _cx = Context::new();

        let tracer = global::tracer("ex.com/basic");

        tracer.in_span("operation", |cx| {
            let span = cx.span();
            span.add_event(
                "Nice operation!".to_string(),
                vec![Key::new("bogons").i64(100)],
            );
            span.set_attribute(ANOTHER_KEY.string("yes"));

            tracer.in_span("Sub operation...", |cx| {
                let span = cx.span();
                span.set_attribute(LEMONS_KEY.string("five"));
                span.add_event("Sub span event", vec![]);
            });
        });

        shutdown_tracer_provider();

        Ok(())
    }

.. _export-directly-to-olly-cloud-rust:

Send data directly to Splunk Observability Cloud
==================================================

By default, all telemetry goes to the local instance of the Splunk Distribution of OpenTelemetry Collector.

If you need to send data directly to Splunk Observability Cloud, set the following environment variables. When instrumenting Rust applications or services you might need to read the values of the environment variables first.

.. code-block:: shell

   OTEL_EXPORTER_OTLP_PROTOCOL=grpc
   OTEL_EXPORTER_OTLP_TRACES_HEADERS=x-sf-token=<access_token>
   OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.<realm>.signalfx.com

To obtain an access token, see :ref:`admin-api-access-tokens`.

To find your Splunk realm, see :ref:`Note about realms <about-realms>`.

.. note:: For more information on the ingest API endpoints, see :new-page:`Send APM traces <https://dev.splunk.com/observability/docs/apm/send_traces/>`.
