.. _requirements-erlang:

**************************************************************
Erlang instrumentation compatibility and requirements
**************************************************************

.. meta:: 
    :description: Make sure you've met these requirements before instrumenting an Erlang application.

The OpenTelemetry instrumentation for Erlang requires the following components:

* Erlang
* Elixir
* PostgreSQL or the database of your choice
* Phoenix. See :new-page:`https://hexdocs.pm/phoenix/installation.html`

Additionally, you need to install the Splunk Distribution of OpenTelemetry Collector. The following distributions are available:

* :ref:`Linux <collector-linux-intro>`
* :ref:`Kubernetes <collector-kubernetes-intro>`
* :ref:`Windows <collector-windows-intro>`

After installing the Collector, make sure that you have an instance of the Collector running in your environment.

