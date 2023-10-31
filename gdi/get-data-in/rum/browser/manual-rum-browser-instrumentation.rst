.. _manual-rum-browser-instrumentation:

*******************************************************************************
Manually instrument browser-based web applications
*******************************************************************************

.. meta::
   :description: Manually instrument front-end applications for Splunk Observability Cloud real user monitoring / RUM to collect additional telemetry, sanitize Personal Identifiable Information (PII), identify users, and more.

You can manually instrument front-end applications for Splunk RUM using the Browser RUM agent to collect additional telemetry, sanitize Personal Identifiable Information (PII), identify users, and more. The following API examples show several manual instrumentations for Splunk RUM.

To migrate manual instrumentation created for another vendor, see :ref:`browser-rum-migrate-instrumentation`. For the API reference of Browser RUM, see :ref:`browser-rum-api-reference`.

Instrument your application using the OpenTelemetry API
=============================================================

To instrument your front-end application manually, use the OpenTelemetry API. The Browser RUM agent automatically registers its TraceProvider using ``@opentelemetry/api``, so that your own instrumentations can access it.

Check the version of the OpenTelemetry API
----------------------------------------------

To manually instrument your application, the version of ``@opentelemetry/api`` you use must match the same major version of ``@opentelemetry/api`` used by the Browser RUM agent.

To verify this, run ``window[Symbol.for('opentelemetry.js.api.1')].version`` in the browser's console from any page that you've instrumented. The command returns the full version of the OpenTelemetry API.

Create a span
---------------------------------------

The following example shows how to create a span with an attribute:

.. code-block:: javascript

   import {trace} from '@opentelemetry/api'

   const span = trace.getTracer('searchbox').startSpan('search');
   span.setAttribute('searchLength', searchString.length);
   // Time passes
   span.end();

.. _user-id-rum-browser:


Set the user ID on all spans
---------------------------------------

The following example shows how to set the user ID globally:

.. code-block:: javascript

   SplunkRum.setGlobalAttributes({
      'enduser.id': 'Test User'
   });

Create a custom event
---------------------------------------

The following example shows how to create a custom event:

.. code-block:: javascript

   import {trace} from '@opentelemetry/api'

   const tracer = trace.getTracer('appModuleLoader');
   const span = tracer.startSpan('test.module.load', {
   attributes: {
      'workflow.name': 'test.module.load'
   }
   });
   // time passes
   span.end();

.. note:: To avoid load problems due to content blockers when using the CDN version of the Browser RUM agent, add ``if (window.SplunkRum)`` checks around ``SplunkRum`` API calls.

.. _rum-browser-redact-pii:

Sanitize Personally Identifiable Information (PII)
=========================================================

The metadata collected by the Browser RUM agent might include Personally Identifiable Information (PII) if your front-end application injects such data in its code. For example, UI components might include PII in their IDs.

To redact PII in the data collected for Splunk RUM, use the ``exporter.onAttributesSerializing`` setting when initializing the Browser RUM instrumentation, as in the following example:

.. code-block:: javascript
   :emphasize-lines: 5,6,7,8

   SplunkRum.init({
   // ...
   exporter: {
   // You can use the entire span as an optional second argument of the sanitizer if needed
      onAttributesSerializing: (attributes) => ({
         ...attributes,
         'http.url': /secret\=/.test(attributes['http.url']) ? '[redacted]' : attributes['http.url'],
      }),
   },
   });

.. note:: The Browser RUM automatic instrumentations do not collect or report any data from request payloads or POST bodies other than their size.

.. _browser-rum-identify-users:

Add user metadata using global attributes
=============================================

By default, the Browser RUM agent doesn't automatically link traces to users of your site. However, you might need to collect user metadata to filter or debug traces.

You can identify users by adding global attributes from the OpenTelemetry specification, such as ``enduser.id`` and ``enduser.role``, to your spans.

The following examples show how to add identification metadata as global attributes when initializing the agent or after you've initialized it, depending on whether user data is accessible at initialization:

Add identification metadata during initialization
--------------------------------------------------

.. code-block:: html
   :emphasize-lines: 7,8,9,10

   <script src="https://cdn.signalfx.com/o11y-gdi-rum/latest/splunk-otel-web.js" crossorigin="anonymous"></script>
   <script>
   SplunkRum.init({
      realm: '<realm>',
      rumAccessToken: '<RUM access token>',
      applicationName: '<application-name>',
      globalAttributes: {
         // The following data is already available
         'enduser.id': 42,
         'enduser.role': 'admin',
      },
   });
   </script>

Add identification metadata after initialization
--------------------------------------------------

.. code-block:: javascript
   :emphasize-lines: 5,6,7,8

   import SplunkRum from '@splunk/otel-web';

   const user = await (await fetch('/api/user')).json();
   // Spans generated prior to this call don't have user metadata
   SplunkRum.setGlobalAttributes({
      'enduser.id': user ? user.id : undefined,
      'enduser.role': user ? user.role : undefined,
   });

.. _browser-server-trace-context:

Add server trace context from Splunk APM
==========================================

The Browser RUM agent collects server trace context using back-end data provided by APM instrumentation through the ``Server-Timing`` header. In some cases, you might want to generate the header manually.

To create the ``Server-Timing`` header manually, provide a ``Server-Timing`` header with the name ``traceparent``, where the ``desc`` field holds the version, the trace ID, the parent ID, and the trace flag. 

Consider the following HTTP header:

.. code-block:: shell
   
   Server-Timing: traceparent;desc="00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"

The example resolves to a context containing the following data:

.. code-block:: shell

   version=00 trace-id=4bf92f3577b34da6a3ce929d0e0e4736
   parent-id=00f067aa0ba902b7 trace-flags=01

When generating a value for the ``traceparent`` header, make sure that it matches the following regular expression:

.. code-block:: shell
   
   00-([0-9a-f]{32})-([0-9a-f]{16})-01

Server timing headers with values that don't match the pattern are automatically discarded. For more information, see the ``Server-Timing`` and ``traceparent`` documentation on the W3C website.

.. note:: If you're using cross-origin resource sharing (CORS) headers, such as ``Access-Control-*``, you might need to grant permission to read the ``Server-Timing`` header. For example: ``Access-Control-Expose-Headers: Server-Timing``.

.. _browser-rum-workflows:

Create workflow spans
===================================================

With workflow spans you can add metadata to your spans to track the steps happening in your application workflows, such as filling out a form or checking a shopping cart.

Workflow spans have the following attributes:

.. list-table:: 
   :widths: 10 10 80
   :width: 100%
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``id``
     - String
     - Unique ID for the workflow instance.
   * - ``name``
     - String
     - Semantic name for the current workflow.

The following snippet shows how to create a workflow span:

.. code-block:: javascript

   import {trace} from '@opentelemetry/api'

   const tracer = trace.getTracer('appModuleLoader');
   const span = tracer.startSpan('test.module.load', {
   attributes: {

      'workflow.name': 'test.module.load'
   }
   });

   // Time passes
   span.end();

To activate error collection for workflow spans, add the ``error`` and ``error.message`` attributes:

.. code-block:: javascript
   :emphasize-lines: 8,9

   import {trace} from '@opentelemetry/api'

   const tracer = trace.getTracer('appModuleLoader');
   const span = tracer.startSpan('test.module.load', {
   attributes: {
      'workflow.name': 'test.module.load',
      'error': true,
      'error.message': 'Custom workflow error message'
   }
   });

   span.end();

.. _rum-browser-spa-custom:

Create custom spans for single-page applications
========================================================

You can use the OpenTelemetry API to create custom spans that are specific to the structure of your application. For example, you can generate spans when a user clicks a specific button, or to instrument a custom communication protocol.

Set up the OpenTelemetry API
---------------------------------------------------------

Add the current version of the OpenTelemetry API package using npm:

.. code-block:: shell

   npm install @opentelemetry/api

.. note:: Make sure that the version of the OpenTelemetry API matches the major version of the API used by the ``@splunk/otel-web`` package. Version information is available in the :new-page:`release notes <https://github.com/signalfx/splunk-otel-js-web/releases>`.

Create custom spans
---------------------------------------------------------

You can create custom spans by including a tracer. For example: 

.. code-block:: javascript

   import {trace} from '@opentelemetry/api';

   // Create a tracer
   const tracer = trace.getTracer('my-application', '1.0.0');
   
   // Example of an async/await function
   async function processForm(form) {
      const span = tracer.startSpan('process form');
      
      // Wait for processing to be done
      span.end();
   }

   // Example of a callback function
   function markCompleted(item) {
      const span = tracer.startSpan('item complete');
   
      processCompletion(item, function() {
         // ... Update item display
         span.end();
      });
   }
   
   // Example of hook system provided by another library
   router.beforeEach((transition) => {
      transition.span = tracer.startSpan('navigate', {
         attributes: {
            'router.path': transition.path
         }
      });
   });

   router.afterEach((transition) => {
      if (transition.span) {
         transition.span.end();
      }
   });

   // For a list of available methods, see the OpenTelemetry API documentation.

To add child spans to the generated spans, use the Context API. For example:

.. code-block:: javascript

   import {trace, context} from '@opentelemetry/api';

   // Create a tracer
   const tracer = trace.getTracer('my-application', '1.0.0');
   
   async function processForm(form) {
      const span = tracer.startSpan('process form');
      await context.with(trace.setSpan(context.active(), span), async () => {
         
         await client.send(form); // client.send would create a XHR span using instrumentation

      });
      span.end();
   }

.. note:: Context might not propagate to child spans that aren't called directly, for example inside a ``Promise.then, setTimeout, ...`` block. To mitigate this issue, activate asynchronous tracing. See :ref:`browser-rum-async-traces`.

.. _rum-browser-spa-errors:

Collect errors with single-page application frameworks
========================================================

To activate the collection of JavaScript errors from single-page application (SPA) frameworks using their own error interceptors or handlers, you need to integrate the Browser RUM agent with the framework.

The following framework-specific examples show how to integrate the Browser RUM agent with the supported frameworks. All the examples assume that you installed the Browser RUM agent using npm. See :ref:`rum-browser-install-npm`.

React
-----------------------------------------

Use the Splunk RUM agent API in your error boundary component:

.. code-block:: javascript

   import React from 'react';
   import SplunkRum from '@splunk/otel-web';
   
   class ErrorBoundary extends React.Component {
      componentDidCatch(error, errorInfo) {
   // To avoid loading issues due to content blockers
   // when using the CDN version of the Browser RUM
   // agent, add if (window.SplunkRum) checks around
   // SplunkRum API calls
         SplunkRum.error(error, errorInfo)
      }
   
      // Rest of your error boundary component
      render() {
         return this.props.children
      }
   }

Vue.js
-----------------------------------------

Add the collect function to your Vue ``errorHandler``. 

For Vue.js version 3.x, use the following code:

.. code-block:: javascript

   import Vue from 'vue';
   import SplunkRum from '@splunk/otel-web';
   
   const app = createApp(App);
   
   app.config.errorHandler = function (error, vm, info) {
   // To avoid loading issues due to content blockers
   // when using the CDN version of the Browser RUM
   // agent, add if (window.SplunkRum) checks around
   // SplunkRum API calls
      SplunkRum.error(error, info)
   }
   app.mount('#app')

For Vue.js version 2.x, use the following code:

.. code-block:: javascript

   import Vue from 'vue';
   import SplunkRum from '@splunk/otel-web';
   
   Vue.config.errorHandler = function (error, vm, info) {
   // To avoid loading issues due to content blockers
   // when using the CDN version of the Browser RUM
   // agent, add if (window.SplunkRum) checks around
   // SplunkRum API calls
      SplunkRum.error(error, info)
   }

Angular
-----------------------------------------

For Angular version 2.x, create an error handler module:

.. code-block:: ts

   import {NgModule, ErrorHandler} from '@angular/core';
   import SplunkRum from '@splunk/otel-web';
   
   class SplunkErrorHandler implements ErrorHandler {
      handleError(error) {
   // To avoid loading issues due to content blockers
   // when using the CDN version of the Browser RUM
   // agent, add if (window.SplunkRum) checks around
   // SplunkRum API calls
         SplunkRum.error(error, info)
      }
   }
   
   @NgModule({
      providers: [
         {
            provide: ErrorHandler,
            useClass: SplunkErrorHandler
         }
      ]
   })
   class AppModule {}

For Angular version 1.x, create an ``exceptionHandler``:

.. code-block:: javascript

   import SplunkRum from '@splunk/otel-web';

   angular.module('...')
      .factory('$exceptionHandler', function () {
         return function (exception, cause) {
   // To avoid loading issues due to content blockers
   // when using the CDN version of the Browser RUM
   // agent, add if (window.SplunkRum) checks around
   // SplunkRum API calls
            SplunkRum.error(exception, cause)
         }
   })

Ember.js
-----------------------------------------

Configure an ``Ember.onerror`` hook as in the following example:

.. code-block:: javascript

   import Ember from 'ember';
   import SplunkRum from '@splunk/otel-web';

   Ember.onerror = function(error) {
   // To avoid loading issues due to content blockers
   // when using the CDN version of the Browser RUM
   // agent, add if (window.SplunkRum) checks around
   // SplunkRum API calls
      SplunkRum.error(error)
   }
