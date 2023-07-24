.. _instrument-ruby-applications:

***************************************************************
Instrument a Ruby application for Splunk Observability Cloud
***************************************************************

.. meta::
   :description: The Splunk OpenTelemetry Ruby agent can automatically instrument your Ruby application or service. Follow these steps to get started.

The Ruby agent from the Splunk Distribution of OpenTelemetry Ruby can automatically instrument your Ruby application by dynamically patching supported libraries.

To get started, use the guided setup or follow the instructions manually.

Generate customized instructions using the guided setup
====================================================================

To generate all the basic installation commands for your environment and application, use the Ruby guided setup. To access the Ruby guided setup:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Ruby guided setup <https://login.signalfx.com/#/gdi/scripted/ruby-tracing/step-1?category=product-apm&gdiState=%7B"integrationId":"ruby-tracing"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`. 

   #. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.

   #. In the integration filter menu, select :guilabel:`By Product`.

   #. Select the :guilabel:`APM` product.

   #. Select the :guilabel:`Ruby` tile to open the Ruby guided setup.

Install the Splunk Distribution of OpenTelemetry Ruby manually
==================================================================

Follow these instructions to install the Splunk Distribution of OpenTelemetry Ruby:

- :ref:`install-enable-ruby-agent`
- :ref:`configure-python-instrumentation`

.. _install-enable-ruby-agent:

Install and activate the Ruby agent
===================================================================

Follow these steps to automatically instrument your application using the Ruby agent:

#. Check that you meet the requirements. See :ref:`ruby-otel-requirements`.

#. Add the following gems to your project's Gemfile: 

      .. code-block:: text

         gem "splunk-otel", "~> 1.0"
         gem "opentelemetry-instrumentation-all", "~> 0.27"

   Run ``bundle install`` to install the gems.

#.  Activate the instrumentation by passing ``auto_instrument:true`` to the ``configure`` method of ``Splunk::Otel``:

      .. code-block:: ruby

         require "splunk/otel"
         Splunk::Otel.configure(auto_instrument: true)

#. Set the ``OTEL_SERVICE_NAME`` environment variable:

   .. tabs::

      .. code-tab:: shell Linux

         export OTEL_SERVICE_NAME=<yourServiceName>

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_SERVICE_NAME=<yourServiceName>

#. (Optional) Set the endpoint URL if the Splunk OpenTelemetry Collector is running on a different host:

   .. tabs::

      .. code-tab:: shell Linux

         export OTEL_EXPORTER_OTLP_ENDPOINT=<yourCollectorEndpoint>:<yourCollectorPort>

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_EXPORTER_OTLP_ENDPOINT=<yourCollectorEndpoint>:<yourCollectorPort>

#. (Optional) Set the deployment environment and service version:

   .. tabs::

      .. code-tab:: bash Linux

         export OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<envtype>,service.version=<version>'

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<envtype>,service.version=<version>'

If no data appears in APM, see :ref:`common-ruby-troubleshooting`.

If you want to manually install and activate instrumentation libraries, see :ref:`ruby-manual-instrumentation`.

Instrument Ruby on Rails applications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To instrument a Ruby on Rails application, see :ref:`instrument-ruby-rails`.

.. _ruby-enable-server-timing:

Activate server timing for RUM
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can connect Real User Monitoring (RUM) requests from mobile and web applications with server trace data produced by your Ruby application or service. For more information, see :ref:`server-trace-information-ruby`.

.. _configure-ruby-instrumentation:

Configure the Ruby agent
---------------------------------------------

In most cases, the only configuration setting you need to enter is the service name. You can also define other basic settings, like the deployment environment, the service version, and the endpoint, among others.

For advanced configuration of the Ruby agent, like changing trace propagation formats, correlating traces and logs, or configuring server trace data, see :ref:`advanced-ruby-otel-configuration`.

.. _kubernetes_ruby_agent:

Deploy the Ruby agent in Kubernetes
---------------------------------------------

To deploy the Ruby agent in Kubernetes, configure the Kubernetes Downward API to expose environment variables to Kubernetes resources.

The following example shows how to update a deployment to expose environment variables by adding the agent configuration under the ``.spec.template.spec.containers.env`` section:

.. code-block:: yaml

   apiVersion: apps/v1
   kind: Deployment
   spec:
     selector:
       matchLabels:
         app: your-application
     template:
       spec:
         containers:
           - name: myapp
             env:
               - name: SPLUNK_OTEL_AGENT
                 valueFrom:
                   fieldRef:
                     fieldPath: status.hostIP
               - name: OTEL_EXPORTER_OTLP_ENDPOINT
                 value: "http://$(SPLUNK_OTEL_AGENT):4318"
               - name: OTEL_SERVICE_NAME
                 value: "<serviceName>"
               - name: OTEL_RESOURCE_ATTRIBUTES
                 value: "deployment.environment=<environmentName>"

.. _export-directly-to-olly-cloud-ruby:

Send data directly to Splunk Observability Cloud
--------------------------------------------------

By default, all telemetry is sent to the local instance of the Splunk Distribution of OpenTelemetry Collector.

If you need to send data directly to Splunk Observability Cloud, set the following environment variables:

.. tabs::

   .. code-tab:: bash Linux

      export SPLUNK_ACCESS_TOKEN=<access_token>
      export SPLUNK_REALM=<realm>

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_ACCESS_TOKEN=<access_token>
      $env:SPLUNK_REALM=<realm>

To obtain an access token, see :ref:`admin-api-access-tokens`.

In the ingest endpoint URL, ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

#. Open the navigation menu in Splunk Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section.

.. note:: For more information on the ingest API endpoints, see :new-page:`Send APM traces <https://dev.splunk.com/observability/docs/apm/send_traces/>`.

.. _instrument_aws_ruby_functions:

Instrument Lambda functions
----------------------------------

You can instrument AWS Lambda functions using the Splunk OpenTelemetry Lambda Layer. See :ref:`instrument-aws-lambda-functions` for more information.
