.. _apm-instrumentation-other-langs:

***************************************************************
Instrument applications written in other programming languages
***************************************************************

.. meta::
   :description: You can send traces to Splunk Observabilty Cloud from applications or services written in programming languages for which a Splunk distribution isn't available.

You can send traces to Splunk Observabilty Cloud from applications or services written in programming languages for which a Splunk distribution isn't available. See :ref:`get-started-application` for a list of supported languages.

Follow these steps to manually instrument an application to send traces to Splunk APM in Splunk Observability Cloud.

.. _other-add-dependencies:

1. Add the required dependencies or packages
==================================================

To instrument your application for Splunk Observability Cloud, you need to generate traces and spans that follow the OpenTelemetry format and semantic conventions. Add the required OpenTelemetry dependencies to your project, including gRPC communication libraries for communicating with the Splunk OpenTelemetry Collector.

.. tabs::

   .. tab:: Erlang

      Add the OpenTelemetry packages to the list of dependencies in your rebar.config file:

      .. code-block:: Erlang

         %% rebar.config file

         {deps, [opentelemetry_api
                 opentelemetry,
                 opentelemetry_exporter]}.

      You also must add them to the ``Applications`` section, together with gRPC libraries:

      .. code-block:: Erlang

         %% app.src file

         {applications,
          [kernel,
          stdlib,
          opentelemetry_api,
          opentelemetry,
          opentelemetry_exporter
         ]},

   .. tab:: Rust

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

.. _other-init-tracer:

2. Initialize the OpenTelemetry tracer
=================================================

In your application code, initialize the OpenTelemetry library and tracer like in the following examples:

.. tabs::

   .. tab:: Erlang

      Include the OpenTelemetry tracer in your application code.

      .. code-block:: erlang

         -module(otel_getting_started).

         -export([hello/0]).

         -include_lib("opentelemetry_api/include/otel_tracer.hrl").

      Erlang automatically initializes the tracer.

   .. tab:: Rust

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

.. _other-generate-spans:

3. Generate spans for your application
==================================================

In your application code, create spans for the operations you want to track. How you create spans differs depending on the target programming language. 

The following examples show how to create spans that have attributes or tags:

.. tabs::

   .. code-tab:: erlang Erlang

      hello() ->
         %% start an active span and run a local function
         ?with_span(<<"operation">>, #{}, fun nice_operation/1).

      nice_operation(_SpanCtx) ->
         ?add_event(<<"Nice operation!">>, [{<<"bogons">>, 100}]),
         ?set_attributes([{another_key, <<"yes">>}]),

         %% start an active span and run an anonymous function
         ?with_span(<<"Sub operation...">>, #{},
                     fun(_ChildSpanCtx) ->
                           ?set_attributes([{lemons_key, <<"five">>}]),
                           ?add_event(<<"Sub span event!">>, [])
                     end).

   .. tab:: Rust

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

.. _export-directly-to-olly-cloud-others:

Send data directly to Splunk Observability Cloud
==================================================

By default, all telemetry goes to the local instance of the Splunk Distribution of OpenTelemetry Collector.

If you need to send data directly to Splunk Observability Cloud, set the following environment variables. When instrumenting Rust applications or services you might need to read the values of the environment variables first.

.. code-block:: shell

   OTEL_EXPORTER_OTLP_PROTOCOL=grpc
   OTEL_EXPORTER_OTLP_TRACES_HEADERS=x-sf-token=<access_token>
   OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.<realm>.signalfx.com

To obtain an access token, see :ref:`admin-api-access-tokens`.

In the ingest endpoint URL, ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

#. Open the navigation menu in Splunk Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section.

.. note:: For more information on the ingest API endpoints, see :new-page:`Send APM traces <https://dev.splunk.com/observability/docs/apm/send_traces/>`.
