.. _manual-rum-ios-instrumentation:

*******************************************************************************
Manually instrument iOS applications
*******************************************************************************

.. meta::
   :description: Manually instrument iOS applications for Splunk Observability Cloud real user monitoring / RUM using the iOS RUM agent to collect additional telemetry, sanitize Personal Identifiable Information (PII), add global attributes, and more.

You can manually instrument iOS applications for Splunk RUM using the iOS RUM agent to collect additional telemetry, sanitize Personal Identifiable Information (PII), add global attributes, and more.

.. _ios-rum-span-filtering:

Filter spans
======================================

You can modify or drop spans using the ``spanFilter`` function. For example, you can drop or redact spans that contain personally identifiable information (PII).

The following example shows how to remove a span:

.. code-block:: swift

   options.spanFilter = { spanData in
      var spanData = spanData
      if spanData.name == "DropThis" {
         return nil // Spans with the name "DropThis" are not be sent
      }
      var atts = spanData.attributes
      atts["http.url"] = .string("redacted") // Change values for all URLs
      return spanData.settingAttributes(atts)
   }

.. note:: Span filtering is supported only in Swift.

.. _ios-rum-globalattributes:

Manage global attributes
======================================

Global attributes are key-value pairs added to all reported data. Global attributes are useful for reporting app or user-specific values as tags.

The following example shows how to define global attributes in your code:

.. code-block:: swift

   // You can set the globalAttributes option to the map at initialization
   import SplunkOtel
   //..
   SplunkRum.initialize(beaconUrl: "https://rum-ingest.<realm>.signalfx.com/v1/rum",
         rumAuth: "<rum-token>",
         options: SplunkRumOptions(environment:"<environment-name>"))
         options.globalAttributes = ["key1": "value1", "key2": 7]

   // You can also call the ``setGlobalAttributes`` function 
   // anywhere in your code using the same map
   SplunkRum.setGlobalAttributes(["key1": "value1", "key2": 7])
   
   // To remove a global attribute, pass the key name to removeGlobalAttribute
   SplunkRum.removeGlobalAttribute("key2")

.. _ios-rum-change-screen-names:

Manually change screen names
======================================

By default, the iOS RUM agent collects the name set in the :code:`ViewController`. You can customize the screen names for your application by using the ``setScreenName`` function. The custom name persists until your next call to :code:`setScreenName`.

The following example shows how to customize the name of an account settings screen:

.. code-block:: Swift

   SplunkRum.setScreenName("AccountSettingsTab")

When calling the :code:`setScreenName` function, automatic screen name instrumentation is disabled to avoid overwriting custom names.

.. note:: Use ``setScreenName`` in all the views of your application to avoid inconsistent names in your data.

.. _ios-rum-identify-users:

Add user metadata using global attributes
=============================================

By default, the iOS RUM agent doesn't automatically link traces to users of your site. However, you might need to collect user metadata to filter or debug traces.

You can identify users by adding global attributes from the OpenTelemetry specification, such as ``enduser.id`` and ``enduser.role``, to your spans.

The following examples show how to add identification metadata as global attributes when initializing the agent or after you've initialized it, depending on whether user data is accessible at initialization:

Add identification metadata during initialization
--------------------------------------------------

.. code-block:: swift
   :emphasize-lines: 5

   import SplunkOtel
   //..
   SplunkRum.initialize(beaconUrl: "https://rum-ingest.<realm>.signalfx.com/v1/rum",
         rumAuth: "<rum-token>",
         options.globalAttributes = ["enduser.id": "user-id-123456"]

Add identification metadata after initialization
--------------------------------------------------

.. code-block:: swift

   SplunkRum.setGlobalAttributes(["enduser.id": "user-id-123456"])
   SplunkRum.setGlobalAttributes(["enduser.id": "128762"]);
   SplunkRum.setGlobalAttributes(["enduser.role': "premium"]);

.. _ios-rum-tracing-api:

Report custom events
======================================

You can use the OpenTelemetry Swift APIs to report custom events happening in your iOS application.

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

.. _ios-rum-error-reporting:

Configure error reporting
======================================

You can report handled errors, exceptions, and messages using the ``reportError`` function.

The following example shows how to report the :code:`example_error`:

.. code-block:: Swift

   SplunkRum.reportError(example_error)

``reportError`` overloads are available for ``String``, ``Error``, and ``NSException``.

.. _ios-server-trace-context:

Add server trace context from Splunk APM
==========================================

The iOS RUM agent collects server trace context using back-end data provided by APM instrumentation through the ``Server-Timing`` header. In some cases, you might want to generate the header manually.

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