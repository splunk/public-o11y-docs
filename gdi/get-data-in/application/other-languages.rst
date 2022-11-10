.. _apm-instrumentation-other-langs:

***************************************************************
Instrument applications written in other programming languages
***************************************************************

.. meta::
   :description: You can send traces to Splunk Observabilty Cloud from applications or services written in programming languages for which a Splunk distribution isn't available.

You can send traces to Splunk Observabilty Cloud from applications or services written in programming languages for which a Splunk distribution isn't available yet, such as Rust or Erlang. Follow these steps to manually instrument an application to send traces to Splunk Observability Cloud.

.. _other-add-dependencies:

Add the required dependencies or packages
==================================================

To instrument your application for Observability Cloud, you need to generate traces and spans that follow the OpenTelemetry format and semantic conventions. Add the required OpenTelemetry dependencies to your project, including gRPC communication libraries.

.. tabs::

   .. tab:: Rust

      Add the following dependencies to your ``cargo.toml`` file:

      .. code-block:: toml

         [dependencies]
         opentelemetry = { path = "../../opentelemetry", features = ["rt-tokio", "metrics", "trace"] }
         opentelemetry-otlp = { path = "../../opentelemetry-otlp", features = ["trace", "metrics"] }
         opentelemetry-semantic-conventions = { path = "../../opentelemetry-semantic-conventions" }

   .. tab:: Erlang

      Add the OpenTelemetry packages to the list of dependencies in your ``rebar.config`` file:

      .. code-block:: Erlang

         %% rebar.config file

         {deps, [grpcbox,
               {opentelemetry_api,
                  {git_subdir, "http://github.com/open-telemetry/opentelemetry-erlang", {branch, "main"}, "apps/opentelemetry_api"}},
               {opentelemetry,
                  {git_subdir, "http://github.com/open-telemetry/opentelemetry-erlang", {branch, "main"}, "apps/opentelemetry"}},
               {opentelemetry_exporter,
                  {git_subdir, "http://github.com/open-telemetry/opentelemetry-erlang", {branch, "main"}, "apps/opentelemetry_exporter"}}
               ]}.

      You also must add them to the ``Applications`` section, together with gRPC libraries:

      .. code-block:: Erlang

         %% app.src file

           {applications,
            [kernel,
             stdlib,
             grpcbox,
             opentelemetry_api,
             opentelemetry,
             opentelemetry_exporter
            ]},

.. _other-init-tracer:

Initialize the OpenTelemetry tracer
=================================================

In your application's code, initialize the OpenTelemetry library and tracer like in the following examples:

.. tabs::

   .. code-tab:: rust Rust

      use opentelemetry::global::shutdown_tracer_provider;
      use opentelemetry::runtime;
      use opentelemetry::sdk::Resource;
      use opentelemetry::trace::TraceError;
      use opentelemetry::{global, sdk::trace as sdktrace};
      use opentelemetry::{
         trace::{TraceContextExt, Tracer},
         Context, Key, KeyValue,
      };
      use opentelemetry_otlp::{ExportConfig, WithExportConfig};
      use std::error::Error;
      use std::time::Duration;

      let o11y_endpoint = env!("OTEL_EXPORTER_OTLP_ENDPOINT", "$OTEL_EXPORTER_OTLP_ENDPOINT is not set.");
      let o11y_token = env!("OTEL_EXPORTER_OTLP_TRACES_HEADERS", "$OTEL_EXPORTER_OTLP_TRACES_HEADERS is not set.");

      fn init_tracer() -> Result<sdktrace::Tracer, TraceError> {
         opentelemetry_otlp::new_pipeline()
            .tracing()
            .with_exporter(
                  opentelemetry_otlp::new_exporter()
                     .tonic()
                     .with_endpoint(o11y_endpoint),
            )
            .with_trace_config(
                  sdktrace::config().with_resource(Resource::new(vec![KeyValue::new(
                     opentelemetry_semantic_conventions::resource::SERVICE_NAME,
                     "trace-demo",
                  )])),
            )
            .install_batch(opentelemetry::runtime::Tokio)
      }

   .. code-tab:: erlang Erlang

      -module(otel_getting_started).

      -export([hello/0]).

      -include_lib("opentelemetry_api/include/otel_tracer.hrl").

.. _other-generate-spans:

Generate spans for your application
==================================================

In your application's code, initialize the OpenTelemetry tracer and create spans for the operations you want to track. How you create spans differs depending on the target programming language. 

The following examples show how to create spans that have attributes or tags:

.. tabs::

   .. code-tab:: rust Rust

      const LEMONS_KEY: Key = Key::from_static_str("lemons");
      const ANOTHER_KEY: Key = Key::from_static_str("ex.com/another");

      async fn main() -> Result<(), Box<dyn Error + Send + Sync + 'static>> {
         let _ = init_tracer()?;
         let cx = Context::new();

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

                  histogram.record(&cx, 1.3, &[]);
            });
         });

         tokio::time::sleep(Duration::from_secs(60)).await;
         shutdown_tracer_provider();

         Ok(())
      }

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

.. _other-set-env-vars:

Set the required environment variables
==================================================

To send data to Observability Cloud, the instrumentation sends requests to several ingest API endpoints using the OTLP protocol over a gRPC connection. You must authenticate calls using a valid token and Splunk realm.

Set the following environment variables before running your instrumented application:

.. code-block:: shell

   OTEL_EXPORTER_OTLP_PROTOCOL=grpc
   OTEL_EXPORTER_OTLP_TRACES_HEADERS=x-sf-token=<access_token>
   OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.<realm>.signalfx.com

To obtain an access token, see :ref:`admin-api-access-tokens`.

In the ingest endpoint URL, ``realm`` is the Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

#. Open the left navigation menu in Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section.

.. note:: For more information on the ingest API endpoints, see :ref:`allow-domains`.