.. _apm-instrumentation-other-langs:

***************************************************************
Instrument applications written in other programming languages
***************************************************************

.. meta::
   :description: You can send traces to Splunk Observabilty Cloud from applications or services written in programming languages for which a Splunk distribution isn't available.

You can send traces to Splunk Observabilty Cloud from applications or services written in programming languages for which a Splunk distribution isn't available yet, such as Rust or Erlang. Follow these steps to manually instrument an application to send traces to Splunk Observability Cloud.

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

Generate spans for your application
==================================================

In your application's code, initialize the OpenTelemetry tracer and create spans for the operations you want to track. How spans are created differs depending on the target programming language. 

The following examples show how to create spans that have attributes or tags attached:

.. tabs::

   .. code-tab:: rust Rust

      let tracer = opentelemetry_otlp::new_pipeline()
          .install_batch(opentelemetry::runtime::AsyncStd)?;

   .. code-tab:: erlang Erlang

      -module(otel_getting_started).

      -export([hello/0]).

      -include_lib("opentelemetry_api/include/otel_tracer.hrl").

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

Run your instrumented application
=============================================

Erlang
rebar3 shell --sname test@chommers

More information
====================

Erlang: https://github.com/tsloughter/otel_getting_started