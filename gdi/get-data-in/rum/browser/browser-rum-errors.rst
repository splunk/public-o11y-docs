.. _browser-rum-data-js-errors:

********************************************************
Errors collected by the Browser RUM agent
********************************************************

.. meta::
   :description: Understand which errors are collected by the Browser RUM agent for Splunk Observability Cloud real user monitoring / RUM.

The Browser RUM agent collects errors as spans with a duration of zero. Error spans carry a timestamp based on the time when the error occurred.

By default, the instrumentations collect errors from the following sources:

-  Uncaught and unhandled errors from the ``"error"`` event listener on the ``window`` object
-  Unhandled promise rejections from the ``unhandledrejection`` event listener on the ``window`` object
-  Error events from failing to load resources from the ``"error"`` event listener on the ``document`` object
-  ``console.error`` errors logged to the console
-  ``SplunkRum.error`` errors which can't be logged but are still collected by the agent

To collect JavaScript errors from single-page application (SPA) frameworks, see :ref:`rum-browser-spa-errors`.

Uncaught or unhandled errors
=============================================

The Browser RUM agent registers each uncaught or unhandled error as a span with name ``onerror``. Here are some typical examples of uncaught or unhandled errors:

-  Errors that aren't caught by ``try {}`` and ``catch {}`` blocks
-  Errors thrown again in a ``catch`` block but not caught again
-  Syntax errors in files

The following examples show how the Browser RUM agent collects uncaught or unhandled errors:

Syntax error example
---------------------------------------

Consider the following syntax error:

.. code-block:: javascript

   var abc=;

The Browser RUM agent collects the error using the following attributes:

- ``component``: ``"error"``
- ``"error"``: ``true``
- ``error.message``: ``Unexpected token ';'``
- ``error.object``: ``SyntaxError``
- ``error.stack``: ``SyntaxError: Unexpected token ';'``

.. note:: ``error.message`` and ``error.stack`` messages are browser-specific.

Null reference example
---------------------------------------

Consider the following ``null`` reference error:

.. code-block:: javascript

   var test = null;
   test.prop1 = true;

The Browser RUM agent collects the error using the following attributes:

- ``component``: ``"error"``
- ``"error"``: ``true``
- ``error.message``: ``Cannot set property 'prop1' of null``
- ``error.object``: ``TypeError``
- ``error.stack``: ``TypeError: Cannot set property 'prop1' of null at...``

.. note:: ``error.message`` and ``error.stack`` messages are browser-specific.

Uncaught promise rejections
=============================================

The Browser RUM agent registers each uncaught promise rejection as a span with name ``unhandledrejection``. Uncaught promise rejections can happen in the following situations:

-  In a promise chain without a final ``.catch`` method
-  As an error in promise chain, including rethrowing in a ``catch`` block, without any subsequent ``catch`` block
-  As a ``throw`` block in an ``async`` function

The following examples show how the Browser RUM agent collects uncaught promise rejections:

Standard error example
---------------------------------------

Consider the following code:

.. code-block:: javascript

   new Promise((resolve, reject) => {
      reject(new Error('broken'))
   })

The Browser RUM agent collects the error using the following attributes:

- ``component``: ``"error"``
- ``"error"``: ``true``
- ``error.message``: ``broken``
- ``error.object``: ``"error"``
- ``error.stack``: ``Error: broken at...``

.. note:: ``error.message`` and ``error.stack`` messages are browser-specific.

Type error example
---------------------------------------

Consider the following code:

.. code-block:: javascript

   new Promise((resolve, reject) => {
      resolve(null)
   }).then((val) => {
      val.prop = 1
   })

The Browser RUM agent collects the error using the following attributes:

- ``component``: ``"error"``
- ``"error"``: ``true``
- ``error.message``: ``Cannot set property 'prop' of null``
- ``error.object``: ``TypeError``
- ``error.stack``: ``TypeError: Cannot set property 'prop' of null at...``

.. note:: ``error.message`` and ``error.stack`` messages are browser-specific.

Failing to load resources
=============================================

The Browser RUM agent registers each failure to load resources as a span with name ``eventListener.error``. Browsers fail to load resources when the server returns 4xx or 5xx status codes when loading images or scripts.

Consider the following example:

.. code-block:: html

   <!DOCTYPE html>
   <html>
      <head>
         [...]
      </head>
      <body>
         <img src="/missing-image.png" />
      </body>
   </html>

The Browser RUM agent collects the error using the following attributes:

- ``component``: ``"error"``
- ``"error"``: ``true``
- ``error.message``: ``"IMG"``
- ``error.object``: ``"https://example.com/missing-image.png"``
- ``error.stack``: ``""//html/body/img""``

.. note:: ``error.message`` and ``error.stack`` messages are browser-specific.

Console errors
=============================================

The Browser RUM agent registers each error logged using the console as a span with the name ``console.error``. Browsers typically use console errors to show messages in the developer console. The Browser RUM agent collects
console errors from ``try...catch`` blocks where you don't want or can't throw errors further in the stack.

.. note:: Your browser console might misreport console errors as Browser RUM agent errors. Check the stack trace to confirm whether the error is caused by Splunk RUM or by ``console.error`` calls generated by the application you're instrumenting.

The following examples show how the Browser RUM agent collects console errors:

Setting field value to null example
-------------------------------------------------

Consider the following code:

.. code-block:: javascript

   try {
      someNull.anyField = 'value';
   } catch(e) {
      console.error('failed to update', e);
   }

The Browser RUM agent collects the error using the following attributes:

- ``component``: ``"error"``
- ``"error"``: ``true``
- ``error.message``: ``failed to update TypeError: Cannot set property 'anyField' of null``
- ``error.object``: ``String``
- ``error.stack``: ``"TypeError: Cannot set property 'anyField' of null at...``

.. note:: ``error.message`` and ``error.stack`` messages are browser-specific.

Error 404 example
-------------------------------------------------

Consider the following code:

.. code-block:: javascript

   axios.get('/users').then(users => {
      showUsers(users)
   }).catch(error => {
      showErrorMessage()
      console.error('error getting users', error)
   })

The Browser RUM agent collects the error using the following attributes:

- ``component``: ``"error"``
- ``"error"``: ``true``
- ``error.message``: ``"error getting users Error: Request failed with status code 404"``
- ``error.object``: ``"String"``
- ``error.stack``: ``"Error: Request failed with status code 404 [...] at XMLHttpRequest.l.onreadystatechange  axios.min.js:2:8373)"``

.. note:: ``error.message`` and ``error.stack`` messages are browser-specific.

Splunk RUM errors
=============================================

The Browser RUM agent registers each error logged by invoking ``SplunkRum.error`` as a span with name: ``SplunkRum.error``. Using ``SplunkRum.error`` doesn't log an error in the developer console of the browser. Errors are sent along with other RUM telemetry and exposed in the Splunk RUM UI. 

Consider the following example:

.. code-block:: javascript

   axios.get('/users').then(users => {
      showUsers(users)
   }).catch(error => {
      showErrorMessage()
      if (window.SplunkRum) {
      SplunkRum.error('error getting users', error)
      }
   })

The resulting error has similar attributes to any ``console.error`` collected by the Browser RUM agent.