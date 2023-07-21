.. _rum-custom-event:

********************************
Create custom events
********************************

Create custom events to capture meaningful metrics about customer journeys and user behavior on your site. Custom events support filtering by tags and the ability to add custom attributes.  

How custom events can add value to your organization  
===============================================================

Splunk RUM automatically collects metrics about page loads, errors, and core web vitals. Sometimes, you need custom logic to capture a specific workflow that is important to your organization to understand. 

Use case
--------

Suppose you are an online retailer. A meaningful custom event for your business might be understanding behavior around conversion rates and why users drop off and don't finish a checkout workflow. You might also want to understand where users are stagnating in your application. You can create a custom event to discover which events precipitate an unsuccessful customer journey. Perhaps users are stopped by an error in your checkout workflow, or are unable to enter a promo code. Custom events provide the opportunity for you to see a unique perspective on your data driven by the questions that matter most to you.  

Create a custom event 
========================

The following examples show how to create a custom event for browser, Android, and iOS applications. 

.. tabs::

   .. tab:: Browser

      To create a custom event, first declare the tracer, and next define the custom event.

      You can declare the tracer through either CDN or NPM. You need to declare the tracer only once. For more information on the difference between CDN and NPM, see :ref:`rum-browser-install`.

      The following example shows how to initialize the tracer and create a custom event using the NPM package:

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

   .. tab:: Android

      You can report custom events and workflows happening in your Android application using the ``addRumEvent`` and ``startWorkflow`` APIs.

      The following example shows how to report when a user closes a help dialog:

      .. code-block:: java

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

   .. tab:: iOS

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

      This example shows how to record an event with no duration:

      .. code-block:: swift

         let dictionary: NSDictionary = [
                           "attribute1": "hello",
                           "attribute2": "world!",
                           "attribute3": 3
         ]
         SplunkRum.reportEvent(name: "testEvent", attributes: dictionary)

Advanced configurations
========================

For more information on advanced configurations, see:

- :ref:`manual-rum-browser-instrumentation`
- :ref:`manual-android-instrumentation`
- :ref:`manual-rum-ios-instrumentation`