.. _apm-instrumentation-other-langs:

***************************************************************
Instrument applications written in other programming languages
***************************************************************

.. meta::
   :description: You can send traces to Splunk Observabilty Cloud from applications or services written in programming languages for which a Splunk distribution isn't available.

You can send traces to Splunk Observabilty Cloud from applications or services written in programming languages for which a Splunk distribution isn't available. Follow these steps to manually instrument an application to send traces to Splunk Observability Cloud.

.. _other-add-dependencies:

Add the required dependencies or packages
==================================================

To instrument your application for Observability Cloud, you need to generate traces and spans that follow the OpenTelemetry format and semantic conventions. Add the required OpenTelemetry dependencies to your project, including gRPC communication libraries for communicating with the Splunk OpenTelemetry Collector.

.. tabs::

   .. tab:: Erlang

      Add the OpenTelemetry packages to the list of dependencies in your ``rebar.config`` file:

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

.. _other-init-tracer:

Initialize the OpenTelemetry tracer
=================================================

In your application's code, initialize the OpenTelemetry library and tracer like in the following examples:

.. tabs::

   .. tab:: Erlang

      Include the OpenTelemetry tracer in your application's code.

      .. code-block:: erlang

         -module(otel_getting_started).

         -export([hello/0]).

         -include_lib("opentelemetry_api/include/otel_tracer.hrl").

      Erlang automatically initializes the tracer.

.. _other-generate-spans:

Generate spans for your application
==================================================

In your application's code, initialize the OpenTelemetry tracer and create spans for the operations you want to track. How you create spans differs depending on the target programming language. 

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

.. _export-directly-to-olly-cloud-others:

Send data directly to Observability Cloud
==================================================

By default, all telemetry goes to the local instance of the Splunk Distribution of OpenTelemetry Collector.

If you need to send data directly to Observability Cloud, set the following environment variables:

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