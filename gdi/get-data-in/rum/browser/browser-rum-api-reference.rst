
.. _browser-rum-api-reference:

**************************************************
API reference for Browser RUM instrumentation
**************************************************

.. meta::
   :description: Use the following methods when creating manual instrumentation for Splunk Observability Cloud real user monitoring / RUM for Browser.

Use the following API methods when creating manual instrumentation for Splunk RUM for Browser. For manual instrumentation examples, see :ref:`manual-rum-browser-instrumentation`.

.. note:: ``try ... catch`` blocks can prevent your app from crashing when using the CDN version of Browser RUM.

.. _browser-rum-methods:

Methods
=========================

setGlobalAttributes
---------------------------

The ``setGlobalAttributes`` method adds a list of attributes to every new span. For example, you can use this method to add user metadata to spans. See :ref:`browser-rum-identify-users`.

.. code:: ts

   SplunkRum.setGlobalAttributes(attributes?: Attributes): void;

.. list-table:: 
   :widths: 30 70
   :width: 100%
   :header-rows: 1

   * - Argument
     - Description
   * -  ``attributes``
     - Object of attributes added to all spans. If undefined, all current global attributes are deleted and no longer added to new spans.

The following example sets different attributes to all new spans:

.. code:: js

   SplunkRum.setGlobalAttributes({
     'enduser.id': 'Test User',
   });
   // All new spans now include enduser.id

   SplunkRum.setGlobalAttributes({
     'dark_mode.enabled': darkModeToggle.status,
   });
   // All new spans now include enduser.id and dark_mode.enabled

   SplunkRum.setGlobalAttributes()
   // New spans no longer include those attributes

getGlobalAttributes
---------------------------

The ``getGlobalAttributes`` method retrieves all current global attributes and returns an ``Attributes`` object with attributes. It doesn't take arguments.

.. code:: ts

   SplunkRum.getGlobalAttributes(): Attributes;

The following example shows how to use ``getGlobalAttributes`` after using ``setGlobalAttributes``:

.. code:: js

   SplunkRum.setGlobalAttributes({
     'enduser.id': 'Test User',
   });
   SplunkRum.setGlobalAttributes({
     'dark_mode.enabled': darkModeToggle.status,
   });

   const attrs = SplunkRum.getGlobalAttributes();
   /* console.log(attrs)
   {
     'enduser.id': 'Test User',
     'dark_mode.enabled': true
   }
   */

getSessionId
---------------------------

The ``getSessionId`` method retrieves the current session ID. It doesn't take arguments.

.. code:: ts

   SplunkRum.getSessionId(): string;

The following example shows how to retrieve the session ID and add it to the application metadata:

.. code:: js

   LiveChat.onChatStarted(() => {
     LiveChat.setMetadata('splunk.sessionId', SplunkRum.getSessionId());
   });

addEventListener and removeEventListener
------------------------------------------------------

You can register event listeners with ``addEventListener`` and remove them using ``removeEventListener``. 

Event listeners take an object in the form ``{ payload: { /* Depending on event */ }}`` as the first parameter.

.. code:: ts

   SplunkRum.addEventListener(type: string, listener: Function): void
   SplunkRum.removeEventListener(type: string, listener: Function): void

.. list-table:: 
   :widths: 20 30 50
   :width: 100%
   :header-rows: 1

   * - Event
     - Payload
     - Description
   * - ``'session-changed'`` 
     - ``sessionId``: string (New session ID)
     - Emitted when the session ID changes.
   * - ``'global-attributes-changed'``
     - ``attributes``: object (New global attributes)
     - Emitted when ``setGlobalAttributes`` is called.

The following example shows how to add an event listener to track changes of session ID:

.. code:: js

   SplunkRum.addEventListener('session-changed', (event) => {
     LiveChat.setMetadata('splunk.sessionId', event.payload.sessionId);
   });

Migrate to OpenTelemetry
==============================

If you have some existing manual instrumentation of your app you can translate the code to use OpenTelemetry conventions. See how in GitHub's :new-page:`Migrating Manual Instrumentation <https://github.com/signalfx/splunk-otel-js-web/blob/13cb35597773c251d7ec0df08cecabf5fbc4bcb2/docs/MigratingInstrumentation.md#custom-properties--tags--attributes>`. 

