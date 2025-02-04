.. _manual-rum-react-instrumentation:

*******************************************************************************
Manually instrument React Native applications
*******************************************************************************

.. meta::
   :description: Manually instrument React Native applications for Splunk Observability Cloud real user monitoring / RUM using the React Native RUM agent to collect additional telemetry, sanitize Personal Identifiable Information (PII), add global attributes, and more.

You can manually instrument React Native applications for Splunk RUM to collect additional telemetry, sanitize Personal Identifiable Information (PII), add global attributes, and more.

.. _react-rum-globalattributes:

Manage global attributes
======================================

Global attributes are key-value pairs added to all reported data. Global attributes are useful for reporting app or user-specific values as tags.

The following example shows how to define global attributes in your code:

.. code-block:: typescript

   SplunkRum.setGlobalAttributes({
      'enduser.id': 'Test User',
   });


.. _react-rum-identify-users:

Add user metadata using global attributes
=============================================

By default, the React Native RUM agent doesn't automatically link traces to users of your site. However, you might need to collect user metadata to filter or debug traces.

You can identify users by adding global attributes from the OpenTelemetry specification, such as ``enduser.id`` and ``enduser.role``, to your spans.

The following examples show how to add identification metadata as global attributes when initializing the agent or after you've initialized it, depending on whether user data is accessible at initialization:

Add identification metadata during initialization
--------------------------------------------------

.. code-block::
   :emphasize-lines: 5

   const RumConfig: ReactNativeConfiguration = {
      realm: '<realm>',
      rumAccessToken: '<rum-access-token>',
      applicationName: '<your-app-name>',
      environment: '<your-environment>',
      globalAttributes: {
         enduser.id: 'user-id-123456',
         enduser.role: 'premium'
      },
   }

Add identification metadata after initialization
--------------------------------------------------

.. code-block::

   SplunkRum.setGlobalAttributes({
      'enduser.id': 'user-id-123456',
      'enduser.role': 'premium'
   });

.. _react-rum-tracing-api:

Report custom events
======================================

You can use the OpenTelemetry Swift APIs to report custom events happening in your React Native application.

The following example shows how to use the OTel Swift API to report on a function you want to time:

.. code-block:: swift

   func calculateTax() {
      let tracer = OpenTelemetrySDK.instance.tracerProvider.get(instrumentationName: "MyApp")
      let span = tracer.spanBuilder(spanName: "calculateTax").startSpan()
      span.setAttribute(key: "numClaims", value: claims.count)
      span.setAttribute(key: "workflow.name", value: "<your_workflow>") // This allows the event to appear in the UI
    //...
    //...
      span.end() // You can also use defer for this
   }

.. _react-rum-error-reporting:

Configure error reporting
======================================

You can report handled errors, exceptions, and messages using the ``reportError`` function.

The following example shows how to report a custom error:

.. code-block::

   reportError: (err: any, isFatal?: boolean)

.. _react-rum-set-location:

Update location data
======================================

The RUM library includes a method for setting latitude ang longitde as global attributes. For example:

.. code-block::

   updateLocation: (latitude: number, longitude: number)


.. _react-server-trace-context:

Add server trace context from Splunk APM
==========================================

The React Native RUM agent collects server trace context using back-end data provided by APM instrumentation through the ``Server-Timing`` header. In some cases, you might want to generate the header manually.

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