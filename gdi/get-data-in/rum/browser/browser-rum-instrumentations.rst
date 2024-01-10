
.. _browser-rum-instrumentation-data:

**************************************************
Instrumentation-specific data for Browser RUM
**************************************************

.. meta::
   :description: Splunk Observability Cloud real user monitoring / RUM for Browser collects the following data through automatic instrumentations.

Splunk RUM for Browser collects the following data through automatic instrumentations. To activate or deactivate instrumentations, see :ref:`browser-rum-instrumentation-settings`.

.. _browser-rum-data-doc-load:

Document load
===========================================

The ``document`` instrumentation produces spans about resources that load by the time the ``Window:load`` event fires. The root span generated is ``documentLoad``. "The ``parentID`` for the ``documentFetch`` and ``resourceFetch`` spans is ``documentLoad.id``.

If the page load request has a ``Server-Timing`` header, RUM uses the data to link the ``documentFetch`` span to the corresponding back-end span. The Browser RUM agent also collects resources such as ``script``, ``link``, ``css - font``, ``iframe``, ``XHR/fetch``, ``img``, ``favicon`` and ``manifest.json``, and links them to APM traces if the ``Server-Timing`` header is present.

.. _browser-rum-documentload:

documentLoad
------------------------------

The Browser RUM agent collects the following data using the ``documentLoad`` instrumentation:

.. list-table:: 
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``document.referrer``	 
     - String
     - URI of the referral page. For example, ``https://subdomain.example.com``.
   * - ``screen.xy``
     - String
     - Width and height of the display. For example, ``2560x1440``.

The following annotations are collected from the navigation timings, as specified by the W3C specification for the ``PerformanceNavigationTiming`` interface:

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Name
     - Timestamp
   * - ``fetchStart``
     - Immediately before the browser starts fetching the resource.
   * - ``unloadEventStart``
     - Immediately before the user agent starts the unload event of the previous document.
   * - ``unloadEventEnd``
     - Immediately after the user agent finishes the unload event of the previous document.
   * - ``domInteractive``
     - Immediately before the user agent sets the readiness of the current document to `Interactive`.
   * - ``domContentLoadedEventStart``	
     - Immediately before the user agent fires the ``DOMContentLoaded`` event at the current document.
   * - ``domContentLoadedEventEnd``	
     - Immediately after the ``DOMContentLoaded`` event of the current document completes.
   * - ``domComplete``
     - Immediately before the browser sets the readiness of the current document to `Complete`.
   * - ``loadEventStart``
     - Immediately before the load event of the current document is fired.
   * - ``loadEventEnd``
     - When the load event of the current document is completed.

.. _browser-rum-documentfetch:

documentFetch
--------------------------

The Browser RUM agent collects the following data using the ``documentFetch`` instrumentation:

.. list-table:: 
   :widths: 30 10 60
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``http.response_content_length``
     - Number
     - The size of the document received from the payload body.
   * - ``link.traceId``
     - String
     - Trace identifier, collected from the ``Server-Timing`` response header set by the APM agent.
   * - ``link.spanId``	
     - String
     - Span identifier, collected from the ``Server-Timing`` response header set by the APM agent.

.. _browser-rum-resourcefetch:

resourceFetch
--------------------------

The Browser RUM agent collects the following data using the ``resourceFetch`` instrumentation:

.. list-table:: 
   :widths: 30 10 60
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``http.response_content_length``
     - Number
     - The size of the document received from the payload body.
   * - ``http.url``
     - String
     - URL of the requested resource.
   * - ``link.traceId``
     - String
     - Trace identifier, collected from ``Server-Timing`` response header set by the APM agent.
   * - ``link.spanId``
     - String
     - Span identifier, collected from ``Server-Timing`` response header set by the APM agent.

.. note:: Safari 10.1 doesn't support :code:`resourceFetch` spans.

.. _browser-rum-data-fetch-requests:

XHR and Fetch instrumentations
===========================================

The ``xhr`` and ``fetch`` instrumentations collect XMLHttpRequest events and Fetch API events. Spans differ in the value of the ``component`` tag, which differentiates between ``xml-http-request`` and ``fetch``.

This instrumentation prepends the HTTP method name to the name of the span. If the instrumentation maps to a back end
providing a ``Server-Timing`` header in the response, the link with the back-end trace is also generated.

The Browser RUM agent collects the following data using the XHR and Fetch instrumentations:

- ``http.method``
- ``http.response_content_length``
- ``http.host``
- ``http.scheme``
- ``http.status_code``
- ``http.status_text``
- ``http.user_agent``
- ``http.url``

The XHR and Fetch instrumentations annotate the span with timestamps representing when the following events fire:

.. list-table:: 
   :widths: 10 10 80
   :header-rows: 1

   * - Event
     - Type
     - Description
   * - ``open``
     - Number
     - Time in UNIX epoch, measured in microseconds when the XHR ``open`` event fires.
   * - ``send``
     - Number
     - Time when the XHR ``send`` event fires.
   * - ``load``
     - Number
     - Time when the XHR ``load`` event fires.
   * - ``"error"``
     - Number
     - Time when the XHR ``"error"`` event fires.
   * - ``timeout``
     - Number
     - Time when the XHR ``timeout`` event fires.
   * - ``abort``
     - Number
     - Time when the XHR ``abort`` event fires.

Annotations collected by the XHR and Fetch instrumentations are described in :ref:`browser-rum-timing-annotations`.

.. _browser-rum-data-webvitals:

Web Vitals
===========================================

The ``webvitals`` instrumentation collects data about Google Web Vitals metrics. The Browser RUM agent collects Web Vitals metrics as spans with zero duration. Every span has a designated ``traceId`` and no parent span.

The Browser RUM agent collects the following data using the ``webvitals`` instrumentation:

.. list-table:: 
   :widths: 10 30 60
   :header-rows: 1

   * - Name
     - Web Vital
     - Description
   * - ``lcp``
     - Largest Contentful Paint
     - Measures loading performance by capturing the render time of the largest image or text block visible within the viewport.
   * - ``fid``
     - First Input Delay
     - Measures interactivity by capturing the timestamp between user interactions to time when the browser can begin processing event handlers in response to that interaction.
   * - ``cls``
     - Cumulative Layout Shift
     - Measures visual stability by capturing the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page. A layout shift occurs any time a visible element changes its position from one rendered frame to the next.
   * - ``inp``
     - Interaction to Next Paint
     - Measures responsiveness by observing the latency of all interactions a user has done on the page and reports the slowest value.

.. _browser-rum-data-resources-after-load:

Resources after load
===========================================

The ``postload`` instrumentation collects data about resources that load after a page ``load`` event. By default, the instrumentation activates instrumenting ``<script>`` and ``<img>`` resources. Typically, you might use the ``postload`` instrumentation to collect telemetry when loading images on ``scroll`` events. 

Spans collected by the ``postload`` instrumentation match the data model described in :ref:`browser-rum-resourcefetch`.

.. _browser-rum-data-user-interactions:

User interactions
===========================================

The ``interactions`` instrumentation collects telemetry data on interactions on elements that have a registered event listener of the type ``Element.addEventListener``. Events collected by the listener generate a span with a name matching the DOM event name.

The Browser RUM agent collects the following data using the ``interactions`` instrumentation:

.. list-table:: 
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``event_type``
     - String
     - Name of the event. For example, ``click``.
   * - ``target_element``
     - String
     - Name of the target element. For example, ``BUTTON``.
   * - ``target_xpath``
     - String
     - XPath of the target element.

.. _browser-rum-data-visibility-events:

Visibility
===========================================

The ``visibility`` instrumentation collects ``visibilitychange`` events. Visibility changes that happen when a page refreshes aren't recorded, as the browser tab might never go visible.

The Browser RUM agent collects the following data using the ``visibility`` instrumentation:

.. list-table:: 
   :widths: 10 10 80
   :width: 100%
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``hidden``
     - Boolean
     - Whether the page is hidden or not.

.. _browser-rum-data-connectivity-events:

Connectivity
===========================================

The ``connectivity`` instrumentation collects ``offline`` and ``online`` events. The browser records offline events when the browser goes offline and is cached in memory until the browser goes online. Offline and online events are sent at the same time.

The Browser RUM agent collects the following data using the ``connectivity`` instrumentation:

.. list-table:: 
   :widths: 10 10 80
   :width: 100%
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``online``
     - Boolean
     - Whether the browser went online or offline.
 
History API
===========================================

The Browser RUM agent also instruments the History API to provide visibility into the session history of the browser. The History API tracks URL changes that don't reload the page and is used in single-page applications. 

The instrumentation also tracks URL changes that occur by changing the ``location.hash`` by listening to ``hashchange`` events. Route changes have no duration. The ``routeChange`` span contains the following tags:

.. list-table:: 
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``component``
     - String
     - The value is always ``"user-interaction"``.
   * - ``prev.href``
     - String
     - Page URL prior to the route change.
   * - ``location.href``
     - String
     - Page URL after the route change.

.. _browser-rum-data-long-tasks:

Long tasks
===========================================

The ``longtask`` instrumentation collects information about long tasks. The Browser RUM agent creates a span for every long task detected.

Span attributes include the containers where that task occurred. For tasks that don't occur within the top level page, the ``containerId``, ``containerName``, and ``containerSrc`` fields provide information about the source of the task.

The Browser RUM agent collects the following data using the ``longtask`` instrumentation:

.. list-table:: 
   :widths: 50 50
   :width: 100%
   :header-rows: 1

   * - Name
     - Type
   * - ``longtask.name``
     - String
   * - ``longtask.entry_type``	
     - Number
   * - ``longtask.duration``	
     - Number
   * - ``attribution.name``	
     - String
   * - ``attribution.entry_type``	
     - String
   * - ``attribution.start_time``	
     - Number
   * - ``attribution.duration``	
     - Number
   * - ``attribution.container_type``	
     - String
   * - ``attribution.container_src``	
     - String
   * - ``attribution.container_id``	
     - String
   * - ``attribution.container_name``
     - String

.. _browser-rum-data-websockets:

Websockets
===========================================

The ``websockets`` instrumentation collects websocket lifecycle events and uses it to populate spans. The instrumentation collects spans from websocket ``connect``, ``send``, and ``onmessage`` events.

connect
--------------

The ``websockets`` instrumentation collects the following data from ``connect`` events:

.. list-table:: 
   :widths: 10 20 70
   :width: 100%
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``http.url``
     - String
     - The Websocket URL.
   * - ``duration``
     - Number
     - Time lapsed between a websocket constructor call and the ``ws.open`` event firing.
   * - ``protocols``
     - String or array
     - Protocols passed to the websocket constructor.
   * - ``error``
     - String
     - The value can be ``true`` or ``false`` depending on whether an error occurred. Errors are collected during websocket construction or when an ``ws.error`` event fires.
   * - ``error``
     - String
     - Websocket error event message.

send and onmessage
-------------------------

The ``websockets`` instrumentation collects the following data from ``send`` and ``onmessage`` events:

.. list-table:: 
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``http.url``
     - String
     - The Websocket URL.
   * - ``response_content_length``
     - Number
     - Payload size in bytes.

.. _browser-rum-data-socketio:

Socket.io messages
===========================================

The Socket.io instrumentation generates spans from messages sent using the socket.io client library. Spans conform to the OpenTelemetry specifications on messaging systems. This instrumentation is deactivated by default.

When using the standalone socket.io build, activate the instrumentation by passing ``true`` to the configuration setting, as in the following snippet:

.. code-block:: html

   <script src="/location/to/splunk-otel-web.js"></script>
   <script>
      SplunkRum.init({
         // ...
         instrumentations: {
            socketio: true
         }
      });
   </script>
   <script src="/socket.io/socket.io.js"></script>

When using both the ``@splunk/otel-web`` and the ``socket.io-client`` npm packages in the same bundle, pass the socket.io client to the instrumentation using the ``target`` setting:

.. code-block:: javascript

   import SplunkOtelWeb from '@splunk/otel-web';
   import { io } from 'socket.io-client';
   SplunkRum.init({
   // ...
      instrumentations: {
         socketio: {
            target: io,
         },
      },
   });

When using the CDN distribution of Splunk RUM, activate the socket.io instrumentation and expose the ``io`` function as  ``window.io``, as in the following example:

.. code-block:: html

   <script src="/location/to/splunk-otel-web.js"></script>
   <script>
   SplunkRum.init({
      // ...
      instrumentations: {
         socketio: true
      }
   });
   </script>
   <script src="/app.min.js"></script>

The content of the ``app.min.js`` file in the previous example is the following:

.. code-block:: javascript

   import { io } from 'socket.io-client';
   window.io = io;
   const socket = io();
   // ...

You can use a different global variable name by specifying it as the target:

.. code-block:: javascript

   SplunkRum.init({
   // ...
   instrumentations: {
      socketio: {
         target: 'socketIoClient',
         },
      },
   });
   // Expose the io object in your bundle
   window.socketIoClient = io;

Messages sent between socket.io clients and servers produce ``EVENT_NAME send`` spans when the messages go from client to server, and ``EVENT_NAME receive`` spans when the messages go from server to client. Both types of spans contain the following attributes:

.. list-table:: 
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``messaging.system``
     - String
     - The value is always ``socket.io``.
   * - ``messaging.destination``
       ``messaging.socket.io.namespace``
     - String
     - The value of the socket.io namespace.
   * - ``messaging.destination_kind``
     - String
     - The value is always ``topic``.
   * - ``messaging.socket.io.event_name``
     - String
     - Name of the event, the first argument of the ``emit`` or ``on`` function.