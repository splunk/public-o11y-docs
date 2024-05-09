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
      * - ``NODE_OPTIONS``
        - Specify NodeJS options to preload instrumentation module: ``-r @splunk/otel/instrument``

#. Add any other settings you might need.

.. _azure-functions-js-step-2:

Add the required libraries using NPM
=================================================

Add the following libraries using NPM:

Isolated worker process function
----------------------------------------------------

#. Install the latest version of ``@splunk/otel`` and match the ``@opentelemetry/api`` version used in the ``@splunk/otel``.

   - :new-page:`@splunk/otel <https://www.npmjs.com/package/@splunk/otel>`
   - :new-page:`@opentelemetry/api <https://www.npmjs.com/package/@opentelemetry/api>`
        
.. _azure-functions-js-step-3:

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

.. _azure-functions-js-step-4:

Check that data is coming in
=========================================

Run your function and search for its spans in Splunk APM. See :ref:`span-search` for more information.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
