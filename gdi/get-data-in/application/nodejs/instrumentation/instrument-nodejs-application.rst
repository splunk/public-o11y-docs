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

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Node.js guided setup <https://login.signalfx.com/#/gdi/scripted/nodejs-tracing/step-1?category=product-apm&gdiState=%7B"integrationId":"nodejs-tracing"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`. 

   #. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.

   #. In the integration filter menu, select :guilabel:`By Product`.

   #. Select the :guilabel:`APM` product.

   #. Select the :guilabel:`Node.js` tile to open the Node.js guided setup.


Install the Splunk Distribution of OpenTelemetry JS manually
==================================================================

Follow these instructions to install the Splunk Distribution of OpenTelemetry JS:

- :ref:`install-enable-nodejs-agent`
   - :ref:`enable_profiling_nodejs` 
   - :ref:`enable_automatic_metric_collection_nodejs`
- :ref:`configure-nodejs-instrumentation`
- :ref:`nodejs-programmatically-instrument`

.. _install-enable-nodejs-agent:

Install and activate the Node.js instrumentation
------------------------------------------------------

To instrument your Node.js application with the Splunk Distribution of OpenTelemetry JS, follow these steps:

#. Install the ``@splunk/otel`` package:

   .. code-block:: bash

      npm install @splunk/otel
   
   To add custom instrumentations, see :ref:`add-custom-instrumentation`.

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

#. (Optional) Activate metric collection. See :ref:`enable_automatic_metric_collection_nodejs`.

#. To run your Node application, enter the following command:

   .. code-block:: bash

      node -r @splunk/otel/instrument <your-app.js>

If no data appears in APM, see :ref:`common-nodejs-troubleshooting`.

.. note:: To instrument applications that use Webpack, see :ref:`nodejs-webpack-issues`.

.. _enable_profiling_nodejs:

Activate AlwaysOn Profiling
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To activate AlwaysOn Profiling, set the ``SPLUNK_PROFILER_ENABLED`` environment variable to ``true``.

To activate memory profiling, set the ``SPLUNK_PROFILER_MEMORY_ENABLED`` environment variable to ``true`` after activating AlwaysOn Profiling.

The following example shows how to activate the profiler from your application code:

.. code-block:: javascript

   start({
      serviceName: '<service-name>',
      endpoint: 'collectorhost:port',
      profiling: {                       // Activates CPU profiling
         memoryProfilingEnabled: true,   // Activates Memory profiling
      }
   });

See :ref:`get-data-in-profiling` for more information. For more settings, see :ref:`profiling-configuration-nodejs`.

.. _enable_automatic_metric_collection_nodejs:

Activate metrics collection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To activate automatic runtime metric collection, activate the metrics feature using the ``SPLUNK_METRICS_ENABLED`` environment variable. See :ref:`metrics-configuration-nodejs` for more information.

.. tabs::

   .. code-tab:: bash Linux

      export SPLUNK_METRICS_ENABLED='true'

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_METRICS_ENABLED='true'

.. _configure-nodejs-instrumentation:

Configure the Node.js distribution
-----------------------------------------------------

In most cases, the only configuration setting you need to enter is the service name. For advanced configuration, like changing trace propagation formats or configuring server trace data, see :ref:`advanced-nodejs-otel-configuration`.

.. _nodejs-programmatically-instrument:

Instrument your application programmatically
-----------------------------------------------------

To have even finer control over the tracing pipeline, instrument your Node application programmatically.

To instrument your application programmatically, add the following lines at the beginning of your entry point script, before any instrumentation function is called:

.. code-block:: javascript

   const { start } = require('@splunk/otel');

   start({
      serviceName: 'my-node-service',
      endpoint: 'http://localhost:4317'
   });

   // Rest of your main module

The ``start()`` function accepts :ref:`configuration settings <advanced-nodejs-otel-configuration>` as arguments. For example, you can use it to activate runtime metrics and memory profiling:

.. code-block:: javascript

   start({
      serviceName: 'my-node-service',
      metrics: { runtimeMetricsEnabled: true },
      profiling: { memoryProfilingEnabled: true }
   });

After you add the ``start()`` function to your entry point script, run your application by passing the instrumented entry point script using the ``-r`` flag:

.. code-block:: bash

   node -r <entry-point.js> <your-app.js>

.. _add-custom-instrumentation:

Add custom instrumentation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To add custom or third-party instrumentations that implement the OpenTelemetry JS Instrumentation interface, pass them to ``startTracing()`` using the following code:

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
   
For a list of supported instrumentations, see :new-page:`https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node#supported-instrumentations <https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node#supported-instrumentations>` on GitHub.

.. note:: For an example of entry point script, see the :new-page:`sample tracer.js file <https://github.com/signalfx/splunk-otel-js/blob/main/examples/express/tracer.js>` on GitHub.

.. _kubernetes_nodejs_agent:

Deploy the Node.js distribution in Kubernetes
-----------------------------------------------------

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


.. _export-directly-to-olly-cloud-nodejs:

Send data directly to Splunk Observability Cloud
-----------------------------------------------------

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

For more information on the ingest API endpoints, see :new-page:`Send APM traces <https://dev.splunk.com/observability/docs/apm/send_traces/>`.

.. caution:: This procedure applies to spans and traces. To send AlwaysOn Profiling data, you must use the OTel Collector.

Instrument Lambda functions
-----------------------------------------------------

You can instrument AWS Lambda functions using the Splunk OpenTelemetry Lambda Layer. See :ref:`instrument-aws-lambda-functions` for more information.
