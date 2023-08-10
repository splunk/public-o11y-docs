.. _browser-rum-spas:

*******************************************************************************
Instrument single-page applications for Splunk RUM
*******************************************************************************

.. meta::
   :description: Learn how to instrument your single-page applications (SPAs) for Splunk Observability Cloud real user monitoring / RUM.

With the Browser RUM agent from the Splunk Distribution of OpenTelemetry JavaScript for Web you can instrument your single-page applications (SPA) to capture client-side telemetry, including:

- User interactions
- Changes to URLs
- Fetch and XHR requests
- Long tasks and delays
- JavaScript errors

The Browser RUM agent supports SPAs built on React, AngularJS, Ember.js, and Vue.js.

Considerations on server-side rendering
=========================================================

When instrumenting single-page applications with server-side rendering (SSR) support, don't include RUM in the server side. Instead, apply Splunk APM instrumentation to the server that generates pre-rendered responses. See :ref:`get-started-application` for more information.

Get single-page applications data in
========================================================

The following sections describe how to activate the instrumentation for several different SPA frameworks.

Next.js
--------------------------------------------------------

To instrument a Next.js SPA using the Browser RUM agent, follow these steps:

1. Install the npm package version of the Browser RUM agent. See :ref:`rum-browser-install-npm`.

2. Create a ``src/splunk-rum.js`` file that imports the ``@splunk/otel-web`` package and calls the ``SplunkRum.init()`` function:

   .. code-block:: javascript

      import SplunkRum from '@splunk/otel-web';
      
      SplunkRum.init({
         realm: '<realm>',
         rumAccessToken: '<your_rum_token>',
         applicationName: '<your_application_name>',
         version: '<your_app_version>',
         deploymentEnvironment: '<your_environment_name>'
      });

   * ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. See :new-page:`Realms in endpoints <https://dev.splunk.com/observability/docs/realms_in_endpoints>`.
   * To generate a RUM access token, see :ref:`rum-access-token`.

3. Add the following code to the ``next.config.js`` file:

   .. code-block:: javascript

      module.exports = {
         reactStrictMode: true,
         webpack: (config, { isServer }) => {
            // Leave server bundle as-is
            if (isServer) {
               return config;
            }
            // Overwrite current entrypoints
            const origEntry = config.entry;
            const entry = async () => {
               let entries = origEntry;
               if (typeof entries === 'function') {
               entries = await entries();
               }
         
               const instrumentFile = './src/splunk-rum.js';
         
               // Webpack accepts string, string[] or object as entrypoint values
               // https://webpack.js.org/configuration/entry-context/#entry
               // Generally, in our testing main is just a string value
               // but for completeness/future safety this covers all
               if (typeof entries.main === 'string') {
               entries.main = [instrumentFile, entries.main];
               } else if (Array.isArray(entries.main)) {
               entries.main = [instrumentFile, ...entries.main];
               } else {
               let imported = entries.main.import;
               if (typeof imported === 'string') {
                  imported = [instrumentFile, imported];
               } else {
                  imported = [instrumentFile, ...imported];
               }
         
               entries.main = {
                  ...entries.main,
                  import: imported
               };
               }
         
               return entries;
            };
         
            // Replace entry in config with new value
            return {
               ...config,
               entry
            };
         }
      };

Gatsby
--------------------------------------------------------

To instrument a Gatsby SPA using the Browser RUM agent, follow these steps:

1. Install the npm package version of the Browser RUM agent. See :ref:`rum-browser-install-npm`.

2. Import the ``@splunk/otel-web`` package and call the ``SplunkRum.init()`` function in the ``gatsby-browser.js`` file. For example:

   .. code-block:: javascript

      /**
      * Implement Gatsby Browser APIs in this file.
      *
      * See: https://www.gatsbyjs.com/docs/browser-apis/
      */
      
      import SplunkRum from '@splunk/otel-web';
      
      SplunkRum.init({
         realm: '<realm>',
         rumAccessToken: '<your_rum_token>',
         applicationName: '<your_application_name>',
         version: '<your_app_version>',
         deploymentEnvironment: '<your_environment_name>'
      });

   * ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. See :new-page:`Realms in endpoints <https://dev.splunk.com/observability/docs/realms_in_endpoints>`.
   * To generate a RUM access token, see :ref:`rum-access-token`.

Nuxt.js v2 and v3
--------------------------------------------------------

To instrument a Nuxt.js v2 SPA using the Browser RUM agent, follow these steps:

1. Install the npm package version of the Browser RUM agent. See :ref:`rum-browser-install-npm`.

2. Create a plugin file, for example ``plugins/splunk-rum.client.js``, that imports the ``@splunk/otel-web`` package and calls the ``SplunkRum.init()`` function:

   .. code-block:: javascript

      import SplunkRum from '@splunk/otel-web';
      
      SplunkRum.init({
         realm: '<realm>',
         rumAccessToken: '<your_rum_token>',
         applicationName: '<your_application_name>',
         version: '<your_app_version>',
         deploymentEnvironment: '<your_environment_name>'
      });

   * ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. See :new-page:`Realms in endpoints <https://dev.splunk.com/observability/docs/realms_in_endpoints>`.
   * To generate a RUM access token, see :ref:`rum-access-token`.

   .. note:: The ``.client.js`` suffix in the file name instructs Nuxt to load the plugin only in the client side.

3. Edit the ``nuxt.config.js`` file to include the ``plugins/splunk-rum.client.js`` plugin:

   .. code-block:: javascript

      export default {
         plugins: [
            '~/plugins/splunk-rum.client.js',
         ],
      }

   .. note:: This step is not required when using Nuxt.js v3, as it registers plugins automatically.

Angular Universal
--------------------------------------------------------

To instrument an Angular Universal SPA using the Browser RUM agent, follow these steps:

1. Install the npm package version of the Browser RUM agent. See :ref:`rum-browser-install-npm`.

2. Create a ``src/splunk-rum.ts`` file that imports the ``@splunk/otel-web`` package and calls the ``SplunkRum.init()`` function:

   .. code-block:: javascript

      import SplunkRum from '@splunk/otel-web';
      
      SplunkRum.init({
         realm: '<realm>',
         rumAccessToken: '<your_rum_token>',
         applicationName: '<your_application_name>',
         version: '<your_app_version>',
         deploymentEnvironment: '<your_environment_name>'
      });

3. Edit the ``src/main.ts`` file to import the ``splunk-rum`` file you've created:

   .. code-block:: javascript

      import './splunk-rum';
      import { enableProdMode } from '@angular/core';
      import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
      
      // ...

.. note:: If ``Zone`` errors appears, you might need to ignore type checking of older libraries using ``skipLibCheck``. For example:

   .. code-block:: javascript

      // tsconfig.json
      {
         "compilerOptions": {
            // ...
            "skipLibCheck": true
         }
      }

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