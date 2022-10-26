.. _instrument-nodejs-applications:

***************************************************************
Instrument a Node application for Splunk Observability Cloud
***************************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry Node.js can automatically instrument your Node application or service. Follow these steps to get started.

The Splunk Distribution of OpenTelemetry JS can automatically instrument your Node application and many of the popular node.js libraries your application uses.

To get started, use the guided setup or follow the instructions manually.

Generate customized instructions using the guided setup
====================================================================

To generate all the basic installation commands for your environment and application, use the Node.js guided setup. To access the Node.js guided setup, follow these steps:

#. Log in to Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management`. 
#. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
#. In the integration filter menu, select :guilabel:`By Product`.
#. Select the :guilabel:`APM` product.
#. Select the :guilabel:`Node.js` tile to open the Node.js guided setup.

.. _install-enable-nodejs-agent:

Install and enable the Node.js instrumentation
===================================================================

To instrument your Node.js application with the Splunk Distribution of OpenTelemetry JS, follow these steps:

#. Install the ``@splunk/otel`` package:

   .. code-block:: bash

      npm install @splunk/otel

#. Install the instrumentation packages for your library or framework:

   .. code-block:: bash

      # Sample command for instrumenting the http library
      npm install @opentelemetry/instrumentation-http

   For a list of supported instrumentation packages, see :new-page:`Default Instrumentation Packages <https://github.com/signalfx/splunk-otel-js#default-instrumentation-packages>` on GitHub.

#. Set the ``OTEL_SERVICE_NAME`` environment variable:

   .. tabs::

      .. code-tab:: shell Linux

         export OTEL_SERVICE_NAME=<yourServiceName>

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_SERVICE_NAME=<yourServiceName>

#. (Optional) Set the endpoint URL if the Splunk Distribution of OpenTelemetry Collector is running on a different host:

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

#. To run your Node application, enter the following command:

   .. code-block:: bash

      node -r @splunk/otel/instrument <your-app.js>

If no data appears in :strong:`Observability > APM`, see :ref:`common-nodejs-troubleshooting`.

.. note:: To instrument applications that use Webpack, see :ref:`nodejs-webpack-issues`.

.. _enable_profiling_nodejs:

Enable AlwaysOn Profiling
--------------------------------------

.. caution:: CPU profiling for Node.js is an experimental feature subject to future changes. See :ref:`profiling-intro`.

To enable AlwaysOn Profiling, set the ``SPLUNK_PROFILER_ENABLED`` environment variable to ``true``.

For more settings, see :ref:`profiling-configuration-nodejs`.

.. _enable_automatic_metric_collection_nodejs:

Enable metrics collection
--------------------------------------

To enable automatic runtime metric collection, enable the metrics feature using the ``SPLUNK_METRICS_ENABLED`` environment variable. See :ref:`metrics-configuration-nodejs` for more information.

.. tabs::

   .. code-tab:: bash Linux

      export SPLUNK_METRICS_ENABLED='true'

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_METRICS_ENABLED='true'

Instrument your application programmatically
-------------------------------------------------------

To have even finer control over the tracing pipeline, instrument your Node application programmatically.

To instrument your application programmatically, add the following lines at the beginning of your entry point script, before any instrumentation function is called:

.. code-block:: javascript

   const { start } = require('@splunk/otel');

   start();

   // Rest of your main module

The ``start()`` function accepts :ref:`configuration settings <advanced-nodejs-otel-configuration>` as arguments. For example:

.. code-block:: javascript

   start({
      serviceName: 'my-node-service',
   });

After you add the ``start()`` function to your entry point script, run your application by passing the instrumented entry point script using the ``-r`` flag:

.. code-block:: bash

   node -r <entry-point.js> <your-app.js>

To add custom or third-party instrumentations that implement the OpenTelemetry JS Instrumentation interface, pass them to ``start()`` using the following code:

.. code-block:: javascript

   const { start } = require('@splunk/otel');
   const { getInstrumentations } = require('@splunk/otel/lib/instrumentations');

   start({
      tracing: {
         instrumentations: [
            ...getInstrumentations(), // Adds default instrumentations
            new MyCustomInstrumentation(),
            new AnotherInstrumentation(),
         ],
      },
   });

.. note:: For an example of entry point script, see the :new-page:`sample tracer.js file <https://github.com/signalfx/splunk-otel-js/blob/main/examples/express/tracer.js>` on GitHub.

.. _kubernetes_nodejs_agent:

Deploy the Node.js distribution in Kubernetes
==========================================================

To deploy the Splunk Distribution of OpenTelemetry JS in Kubernetes, configure the Kubernetes Downward API to expose environment variables to Kubernetes resources.

The following example shows how to update a deployment to expose environment variables by adding the OpenTelemetry configuration under the ``.spec.template.spec.containers.env`` section:

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
                 value: "http://$(SPLUNK_OTEL_AGENT):4317"
               - name: OTEL_SERVICE_NAME
                 value: "<serviceName>"
               - name: OTEL_RESOURCE_ATTRIBUTES
                 value: "deployment.environment=<environmentName>"

.. _configure-nodejs-instrumentation:

Configure the Node.js distribution
===========================================================

In most cases, the only configuration setting you need to enter is the service name. For advanced configuration, like changing trace propagation formats or configuring server trace data, see :ref:`advanced-nodejs-otel-configuration`.

.. _export-directly-to-olly-cloud-nodejs:

Send data directly to Observability Cloud
==============================================================

By default, all telemetry is sent to the local instance of the Splunk Distribution of OpenTelemetry Collector.

If you need to send data directly to Observability Cloud, set the following environment variables:

.. tabs::

   .. code-tab:: bash Linux

      export SPLUNK_ACCESS_TOKEN=<access_token>
      export SPLUNK_REALM=<realm>

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_ACCESS_TOKEN=<access_token>
      $env:SPLUNK_REALM=<realm>

To obtain an access token, see :ref:`admin-api-access-tokens`.

In the ingest endpoint URL, ``realm`` is the Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

#. Open the left navigation menu in Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section.

.. note:: This procedure applies to spans and traces. To send AlwaysOn Profiling data, you must use the OTel Collector.

Instrument Lambda functions
==================================

You can instrument AWS Lambda functions using the Splunk OpenTelemetry Lambda Layer. See :ref:`instrument-aws-lambda-functions` for more information.
