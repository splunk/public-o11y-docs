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
To create a custom event, use the OpenTelementry API for JavaScript with the TraceProvider. The following example shows how to create a custom event. To create a custom event you need to first, declare the tracer. Then, you can define the custom event.

Declare the tracer  
---------------------
You can declare the tracer through either CDN or NPM. You need to declare the tracer only once. For more information on the difference between CDN and NPM, see :ref:`Choose how you want to instrument and configure Splunk RUM on your application <rum-browser-install>`.

 
Declare the tracer with CDN
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following code sample shows how to the declare through CDN. 

.. code-block:: 

    <script>
        const Provider = SplunkRum.provider; 
        var tracer=Provider.getTracer('appModuleLoader');
    </script>


Declare the tracer with NPM
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following code sample shows how to the declare through NPM. 

.. code-block:: 

    import {trace} from '@opentelemetry/api'


Define the custom event 
--------------------------

Next, define the custom event in the start and end span. The field ``workflow.name`` is required. The following code sample shows how to define a custom event: 

.. code-block:: javascript
      
    const span = tracer.startSpan('test.module.load', {
        attributes: {
            'workflow.name': 'test.module.load'
        }
    });
    
    //  time passes with custom business logic for example checkout, add to cart etc

    span.end();


Advanced configurations
========================

For more information on advanced configurations, see :new-page:`Manual instrumentation using API <https://github.com/signalfx/splunk-otel-js-web/blob/main/docs/ManualInstrumentation.md>` in the splunk-otel-js-web library on GitHub. 
