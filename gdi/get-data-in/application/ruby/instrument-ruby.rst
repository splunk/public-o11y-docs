.. _instrument-ruby-applications:

************************************************************************
Instrument your Ruby application for Splunk Observability Cloud
************************************************************************

.. meta:: 
    :description: Instrument your Ruby application using the OpenTelemetry instrumentation for Ruby and get your data into Splunk Observability Cloud.

You can use the OpenTelemetry Collector to send traces from Ruby applications to Splunk APM. 

.. _ruby-prereqs:

Prerequisities
==================================

Before starting, make sure you've installed the following components:

* Bundler version 2.4 or higher
* Ruby version 3.0 or higher

Check that you're using supported libraries and frameworks. For a list of supported libraries, see :new-page:`https://github.com/open-telemetry/opentelemetry-ruby-contrib/tree/main/instrumentation`.

Additionally, you need to install the Splunk Distribution of OpenTelemetry Collector. The following distributions are available:

* :ref:`Linux <collector-linux-intro>`
* :ref:`Kubernetes <collector-kubernetes-intro>`
* :ref:`Windows <collector-windows-intro>`

After installing the Collector, make sure that you have an instance of the Collector running in your environment.

.. _ruby-otel-instrument:

Instrument your application
========================================

To instrument your Ruby application, follow these steps:

#. Install the ``opentelemetry-sdk`` and ``opentelemetry-instrumentation-all`` packages:

    .. code-block:: ruby

        bundle add opentelemetry-sdk opentelemetry-instrumentation-all


#. In your project directory, create a file called opentelemetry.rb in config/initializers/ with the following code: 

    .. code-block:: ruby

        require 'opentelemetry/sdk'
        require 'opentelemetry/instrumentation/all'
        OpenTelemetry::SDK.configure do |c|
            c.use_all() # activates all instrumentation
        end

#. Run the instrumented application. 

Send data directly to Splunk Observability Cloud
=======================================================

By default, all data goes to the local instance of the Splunk Distribution of OpenTelemetry Collector. 

If you need to send data directly to Splunk Observability Cloud, follow these steps:

#. Install the OpenTelemetry exporter package using the following command:

    .. code-block:: bash

        gem install opentelemetry-exporter-otlp

#. Edit the config/exporters/opentelemetry.rb file to include the OpenTelemetry exporter package. 

    .. code-block:: ruby
        :emphasize-lines: 3

        require 'opentelemetry/sdk'
        require 'opentelemetry/instrumentation/all'
        require 'opentelemetry-exporter-otlp'
        OpenTelemetry::SDK.configure do |c|
            c.use_all() # activates all instrumentation
        end

#. Change the endpoint that the application sends data to by updating the environment variable. For example, if your OpenTelemetry Collector instance is listening on ``localhost:4317``, use the following commands:

    .. code-block:: bash

        export SPLUNK_REALM="<splunk-realm>"
        export SPLUNK_ACCESS_TOKEN="<splunk-access-token>"
        export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"

    Replace ``<realm>`` with your Splunk Observability Cloud realm and ``<access-token>`` with your Splunk Observability Cloud access token with ingest permissions.

    To obtain an access token, see :ref:`admin-api-access-tokens`.

    To find your Splunk realm, see :ref:`Note about realms <about-realms>`.

#. Restart your application. 

Learn more
===============================

For example configurations, see :new-page:`https://github.com/open-telemetry/opentelemetry-ruby/tree/main/examples`.