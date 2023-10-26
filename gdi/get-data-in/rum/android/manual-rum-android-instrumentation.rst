.. _manual-android-instrumentation:

*******************************************************************************
Manually instrument Android applications
*******************************************************************************

.. meta::
   :description: Manually instrument Android applications in Splunk Observability Cloud real user monitoring / RUM instrumentation using the Android RUM agent to collect additional telemetry, sanitize Personal Identifiable Information (PII), add global attributes, and more.

You can manually instrument Android applications for Splunk RUM using the Android RUM agent to collect additional telemetry, sanitize Personal Identifiable Information (PII), add global attributes, and more.

.. _android-rum-span-filtering:

Filter spans
======================================

You can modify or drop spans using the ``filterSpans()`` method. For example, you can drop or redact spans that contain personally identifiable information (PII).

The following example shows how to remove a span:

.. code-block:: java

   SplunkRum.builder()
            .filterSpans(spanFilter ->
               spanFilter
                     .removeSpanAttribute(stringKey("http.user_agent")))

The following example shows how to redact the value of an attribute to remove sensitive data:

.. code-block:: java

   SplunkRum.builder()
            .filterSpans(spanFilter ->
               spanFilter 
                     .replaceSpanAttribute(StandardAttributes.HTTP_URL,
                        value -> Pattern.compile.. _"(user|pass:\\w+")
                              .matcher(value)
                              .replaceAll("$1=<redacted>")))

.. _android-rum-attributes:

Manage global attributes
======================================

Global attributes are key-value pairs added to all reported data. Global attributes are useful for reporting app or user-specific values as tags.

The following example shows how to define the app version and a key-value pair as global attributes:

.. code-block:: java

   SplunkRum.builder()
            .setGlobalAttributes(
                  Attributes.builder()
                           .put("key", "value")
                           .put(StandardAttributes.APP_VERSION, BuildConfig.VERSION_NAME)
                           .build())

To update a set of global attributes after the RUM library is initialized, use the following :code:`SplunkRum` methods:

- ``setGlobalAttribute(AttributeKey)`` to set or update a single attribute.
- ``updateGlobalAttributes(Consumer<AttributesBuilder> attributesUpdater)`` to update attributes in bulk.

.. _android-rum-identify-users:

Add user metadata using global attributes
=============================================

By default, the Android RUM agent doesn't automatically link traces to users of your site. However, you might need to collect user metadata to filter or debug traces.

You can identify users by adding global attributes from the OpenTelemetry specification, such as ``enduser.id`` and ``enduser.role``, to your spans.

The following examples show how to add identification metadata as global attributes when initializing the agent or after you've initialized it, depending on whether user data is accessible at initialization:

Add identification metadata during initialization
--------------------------------------------------

.. code-block:: java
   :emphasize-lines: 5

   SplunkRum.builder()
            .setGlobalAttributes(
                  Attributes.builder()
                           // Adds existing userId
                           .put("enduser.id", "user-id-123456")
                           .build())

Add identification metadata after initialization
--------------------------------------------------

.. code-block:: java

   splunkRum.setGlobalAttribute("enduser.id", "123456L");
   splunkRum.setGlobalAttribute("enduser.type", "loggedInUser");
   splunkRum.setGlobalAttribute("enduser.role", "premium");

.. _android-rum-custom-events:

Report custom events and workflows
======================================

You can report custom events and workflows happening in your Android application using the ``addRumEvent`` and ``startWorkflow`` APIs.

The following example shows how to report when a user closes a help dialog:

.. code-block:: java
   :emphasize-lines: 7

   public Dialog onCreateDialog(Bundle savedInstanceState) {
      LayoutInflater inflater = LayoutInflater.from(activity);
      View alertView = inflater.inflate(R.layout.sample_mail_dialog, null);
      AlertDialog.Builder builder = new AlertDialog.Builder(activity);
      builder.setView(alertView)
               .setNegativeButton(R.string.cancel, (dialog, id) ->
                  // Record a simple "zero duration" span with the provided name and attributes
                     SplunkRum.getInstance().addRumEvent("User Rejected Help", HELPER_ATTRIBUTES));
      return builder.create();
   }

The following example shows how to start a workflow for which metrics are recorded by Splunk RUM. To record the workflow you must end the OpenTelemetry span instance:

.. code-block:: java
   :emphasize-lines: 3,12

   binding.buttonWork.setOnClickListener(v -> {
      Span hardWorker =
            SplunkRum.getInstance().startWorkflow("Main thread working hard");
      try {
         Random random = new Random();
         long startTime = System.currentTimeMillis();
         while (true) {
            random.nextDouble();
            if (System.currentTimeMillis() - startTime > 20_000) {
               break;
            }
         }
      } finally {
         hardWorker.end();
      }
   });

.. _android-rum-customize-screen-names:

Customize screen names
=====================================

By default, the Android RUM agent uses the simple class name of each ``Fragment`` and ``Activity`` type as the value of the ``screen.name`` attribute. To customize the screen name, use the ``@RumScreenName`` annotation.

For example, the following activity appears with the ``screen.name`` attribute set to the value ``Buttercup``:

.. code-block:: java

   @RumScreenName("Buttercup")
   public class MainActivity extends Activity {
      ...
   }

.. _android-rum-error-reporting:

Configure error reporting
======================================

You can report handled errors, exceptions, and messages using the ``addRumException(Throwable)`` method. Exceptions appear as errors in the Splunk RUM UI, and error metrics are recorded.

The following example shows how to report the :code:`Unimplemented Feature: Settings` error in a sample application:

.. code-block:: java
   :emphasize-lines: 5,6,7

   public boolean onOptionsItemSelected(MenuItem item) {
      int id = item.getItemId();
      if (id == R.id.action_settings) {
         SplunkRum.getInstance()
            .addRumException(
               new UnsupportedOperationException("Unimplemented Feature: Settings"),
               SETTINGS_FEATURE_ATTRIBUTES);
         return true;
      }
      return super.onOptionsItemSelected(item);
   }

.. _android-server-trace-context:

Add server trace context from Splunk APM
==========================================

The Android RUM agent collects server trace context using back-end data provided by APM instrumentation through the ``Server-Timing`` header. In some cases, you might want to generate the header manually.

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
