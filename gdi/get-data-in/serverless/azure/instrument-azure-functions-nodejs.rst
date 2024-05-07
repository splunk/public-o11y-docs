.. _splunk-otel-js-azure:

***********************************************************************
Instrument NodeJS Azure functions for Splunk Observability Cloud
***********************************************************************

.. meta::
   :description: Learn how to instrument your NodeJS Azure functions to export spans to Splunk Observability Cloud.

By instrumenting NodeJS Azure functions you can send spans to Splunk Observability Cloud every time your functions run.

To instrument your NodeJS Azure function with OpenTelemetry to send telemetry to Splunk Observability Cloud, follow these high-level steps:

- :ref:`azure-functions-js-step-1`
- :ref:`azure-functions-js-step-2`
- :ref:`azure-functions-js-step-3`
- :ref:`azure-functions-js-step-4`
- :ref:`azure-functions-js-step-5`

.. _azure-functions-js-step-1:

Define the environment variables
=================================================

Set the required environment variables in your function's settings:

#. Select your function in Function App.

#. Go to :guilabel:`Settings`, then :guilabel:`Configuration`.

#. Select :strong:`New application setting` to add the following settings:

   .. list-table::
      :header-rows: 1
      :width: 100%
      :widths: 40 60

      * - Name
        - Value
      * - ``SPLUNK_ACCESS_TOKEN``
        - Your Splunk access token. To obtain an access token, see :ref:`admin-api-access-tokens`.
      * - ``SPLUNK_REALM``
        - Your Splunk Observability Cloud realm, for example ``us0``. To find your Splunk realm, see :ref:`Note about realms <about-realms>`.

#. Add any other settings you might need.

.. _azure-functions-js-step-2:

Add the required libraries using NPM
=================================================

Add the following libraries using NPM:

Isolated worker process function
----------------------------------------------------

#. Activate the :strong:`Include prerelease` setting.
#. Install the latest version of the following libraries:

   - :new-page:`@opentelemetry/sdk-node <https://www.npmjs.com/package/@opentelemetry/sdk-node>`
   - :new-page:`@opentelemetry/api <https://www.npmjs.com/package/@opentelemetry/api>`
   - :new-page:`@opentelemetry/resources <https://www.npmjs.com/package/@opentelemetry/resources>`
   - :new-page:`@opentelemetry/sdk-metrics <https://www.npmjs.com/package/@opentelemetry/sdk-metrics>`
   - :new-page:`@opentelemetry/auto-instrumentations-node <https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node>`
   - :new-page:`@opentelemetry/semantic-conventions <https://www.npmjs.com/package/@opentelemetry/semantic-conventions>`
   - :new-page:`@opentelemetry/exporter-trace-otlp-proto <https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-proto>`
   - :new-page:`@opentelemetry/exporter-metrics-otlp-proto <https://www.npmjs.com/package/@opentelemetry/exporter-metrics-otlp-proto>`
   - :new-page:`@azure/opentelemetry-instrumentation-azure-sdk <https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk>`

.. _azure-functions-js-step-3:

Initialize OpenTelemetry in the code
=================================================

After adding the dependencies, initialize OpenTelemetry in your function.

Define a preloadable module `instrumentation.ts`. The module bootstraps all instrumentations.

.. code-block:: ts

   import { NodeSDK } from "@opentelemetry/sdk-node";
   import { Resource } from "@opentelemetry/resources";
   import {
      SEMRESATTRS_SERVICE_NAME,
      SEMRESATTRS_SERVICE_VERSION
   } from "@opentelemetry/semantic-conventions";
   import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
   import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto"
   import { OTLPMetricExporter  } from "@opentelemetry/exporter-metrics-otlp-proto"
   import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
   import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk"

   const accessToken = process.env['SPLUNK_ACCESS_TOKEN'];
   const realm = process.env['SPLUNK_REALM'];
   const tracesEndpoint = `https://ingest.${realm}.signalfx.com/v2/trace/otlp`;
   const metricsEndpoint = `https://ingest.${realm}.signalfx.com/v2/datapoint/otlp`;

   const otlpTracesOptions = {
      url: tracesEndpoint,
      headers: {
         ['X-SF-TOKEN']: accessToken
      },
      concurrencyLimit: 10
   }

   const otlpMetricsOptions = {
      url: metricsEndpoint,
      headers: {
         ['X-SF-TOKEN']: accessToken
      },
      concurrencyLimit: 10
   }

   const sdk = new NodeSDK({
      resource: new Resource({
         [SEMRESATTRS_SERVICE_NAME]: process.env['WEBSITE_SITE_NAME'],
         [SEMRESATTRS_SERVICE_VERSION]: "1.0.0"
      }),
      traceExporter: new OTLPTraceExporter(otlpTracesOptions),
      metricReader: new PeriodicExportingMetricReader({
         exporter: new OTLPMetricExporter(otlpMetricsOptions),
      }),
      instrumentations: [getNodeAutoInstrumentations(), createAzureSdkInstrumentation()]
   })

   sdk.start()
         
.. _azure-functions-js-step-4:

Instrument the code to send spans
=================================================

Next, instrument your code using OpenTelemetry. Use the following examples as a starting point to instrument your code. See :new-page:`https://learn.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings <https://learn.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings>` in Microsoft Azure documentation for steps to add environment variables to an Azure function.

The following example shows how to instrument a function using instrumentationWrapper helper:

.. code-block:: ts

   export async function myhttptrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
      context.log(`Http function processed request for url "${request.url}"`);

      const response = // run your function logic here.

      return { body: `Hello, ${response}!` };
   };

   // Universal wrapper method that helps to generate root span for Azure Functions
   export const instrumentationWrapper = <T extends (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>>(func: T) =>
      async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
         
         let result: Promise<Awaited<ReturnType<T>>>;
         let functionName = func.name;
      
         await tracer.startActiveSpan(functionName, async (span: Span) => {
               
               // setup custom attributes for root span, specific to your Azure Functions.
               span.setAttribute("foo", 1);
               span.setAttribute("bar", "Hello World!");
               span.setAttribute("baz", [1, 2, 3])
      
               result = await func(...args)
      
               span.end();
            });
         
         return result;
      }

   app.http('myhttptrigger', {
      methods: ['GET', 'POST'],
      authLevel: 'anonymous',
      handler: instrumentationWrapper(myhttptrigger)
   });

.. _azure-functions-js-step-5:

Check that data is coming in
=========================================

Run your function and search for its spans in Splunk APM. See :ref:`span-search` for more information.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
