.. _instrument-erlang:

*************************************************************************
Instrument your Erlang application for Splunk Observability Cloud
*************************************************************************

.. meta:: 
    :description: Learn how to instrument your Erlang application using the OpenTelemetry instrumentation for Erlang and send your application traces to Splunk Observability Cloud.

You can send traces from your Erlang applications using the OpenTelemetry instrumentation for Erlang. To get started, follow these instructions.

.. _erlang-add-dependencies:

1. Add the required dependencies or packages
==================================================

To instrument your application for Splunk Observability Cloud, you need to generate traces and spans that follow the OpenTelemetry format and semantic conventions. Add the required OpenTelemetry dependencies to your project, including gRPC communication libraries for communicating with the Splunk OpenTelemetry Collector.

Add the OpenTelemetry packages to the list of dependencies in your rebar.config file:

.. code-block:: Erlang

    %% rebar.config file

    {deps, [opentelemetry_api
            opentelemetry,
            opentelemetry_exporter]}.

You also must add them to the ``Applications`` section, together with gRPC libraries:

.. code-block:: erlang

    %% app.src file

    {applications,
     [kernel,
     stdlib,
     opentelemetry_api,
     opentelemetry,
     opentelemetry_exporter
    ]},

.. _erlang-init-tracer:

2. Initialize the OpenTelemetry tracer
=================================================

In your application code, initialize the OpenTelemetry library and tracer like in the following example:

.. code-block:: erlang

    -module(otel_getting_started).

    -export([hello/0]).

    -include_lib("opentelemetry_api/include/otel_tracer.hrl").

Erlang automatically initializes the tracer.

.. _erlang-generate-spans:

3. Generate spans for your application
==================================================

In your Erlang application code, create spans for the operations you want to track.

The following example shows how to create spans that have attributes or tags:

.. code-block:: erlang

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

.. _export-directly-to-olly-cloud-erlang:

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
