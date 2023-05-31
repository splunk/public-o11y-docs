
.. _browser-rum-migrate-instrumentation:

*******************************************************************************
Migrate existing manual instrumentation
*******************************************************************************

.. meta::
   :description: You can migrate manual instrumentation that you added for another vendor to send telemetry data to Splunk Observability Cloud real user monitoring / RUM. To migrate the instrumentation, you must edit the instrumentation code to use OpenTelemetry conventions.

You can migrate manual instrumentation that you added for another vendor to send telemetry data to Splunk RUM. To migrate the instrumentation, you must edit the instrumentation code to use OpenTelemetry conventions.

The following examples shows how you can instrument different data sources for Splunk RUM: 

Migrate actions or events instrumentation
=========================================

You might have instrumentation that collects custom timestamps or time ranges for activity within your app. For example, you might have manually instrumented a CPU-intensive ``calculateEstateTax`` function to know how its performance is affecting users. 
      
When instrumenting the same function using OpenTelemetry, in addition to capturing start and end time in a span, you can include additional details using attributes:

.. code-block:: javascript
   :emphasize-lines: 5,8

   import {trace} from '@opentelemetry/api'

   function calculateEstateTax(estate) {
      const span = trace.getTracer('estate').startSpan('calculateEstateTax');
      span.setAttribute('estate.jurisdictionCount', estate.jurisdictions.length);
      var taxOwed = 0;
      // ...
      span.setAttribute('isTaxOwed', taxOwed > 0);
      span.end();
      return taxOwed;
   }

Migrate custom properties, tags, or attributes instrumentation
================================================================

You might have a feature where you collect additional tags or properties about the page and include that information in your RUM data stream. For example, you might be capturing details about A/B tests, account categorization, the release version of the app, or UI modes. 

You can store this kind of information using OpenTelemetry attributes, which are key-value pairs. If the relevant properties are available at the time the page is loaded, use the ``globalAttributes`` setting:

.. code-block:: javascript

   SplunkRum.init( {
      beaconEndpoint: '...',
      rumAccessToken: '...',
      globalAttributes: {
         'account.type': goldStatus,
         'app.release': getReleaseNumber(),
      },
   });

If the properties are not available until later or can change over the lifetime of the page, update or add them dynamically like in the following example:

.. code-block:: javascript

   SplunkRum.setGlobalAttributes({
      'account.type': goldStatus,
      'app.release': getReleaseNumber(),
      'dark_mode.enabled': darkModeToggle.status,
   });

Migrate errors instrumentation
========================================

You might have manual instrumentation that reports errors that are collected or handled in your code. To collect and report errors to Splunk RUM, use the ``SplunkRum.error`` function:

.. code-block:: javascript
   :emphasize-lines: 4

   try {
      doSomething();
   } catch (e) {
      SplunkRum.error(e);
   }

The ``SplunkRum.error`` function accepts strings and arrays of strings, as well as ``Error`` and ``ErrorEvent`` objects. See :ref:`browser-rum-data-js-errors` for more information.