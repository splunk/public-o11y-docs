.. _nodejs-manual-instrumentation:

********************************************************************
Manually instrument Node applications for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Manually instrument your Node application when you need to add custom attributes to spans or want to manually generate spans and metrics. Keep reading to learn how to manually instrument your Node application for Observability Cloud. 

Instrumenting applications automatically using the agent of the Splunk Distribution of OpenTelemetry Node covers most needs. Manually instrumenting your application is only necessary when, for example, you need to add custom attributes to spans or need to manually generate spans.

For instructions on how to manually instrument Java applications, see the Manual instrumentation docs in the OpenTelemetry official documentation at :new-page:`https://opentelemetry.io/docs/instrumentation/js/manual/ <https://opentelemetry.io/docs/instrumentation/js/manual/>`.

.. note:: Manual OTel instrumentation is fully compatible with Splunk automatic Node.js instrumentation and is fully supported by Splunk.

.. _nodejs-otel-custom-metrics:

Send custom Node application metrics
========================================================

Follow these steps to activate custom application metrics:

- :ref:`acquire-meter-node`
- :ref:`create-instrument-node`

.. _acquire-meter-node:

Set up a meter
------------------------------------------------------

After you've installed and initialized the Splunk Distribution of OpenTelemetry JS, set up a new meter anywhere in your code. For example

.. code-block:: javascript

   const myMeter = opentelemetry.metrics.getMeter(
      'my-splunk-meter'
   );

.. note:: As a best practice, only call the ``getMeter`` method when needed.

.. _create-instrument-node:

Create an instrument
---------------------------------------------------

Create a synchronous or asynchronous instrument within the new meter to collect metrics. For example:

.. code-block:: javascript

   // Example of a counter

   const counter = myMeter.createCounter('events.counter');
   // You can add attributes to the counter
   counter.add(1, { 'some.optional.attribute': 'some value' });

   // Example of a gauge (async)

   let temperature = 32;
   const gauge = myMeter.createObservableGauge('temperature.gauge',
   // You can add a description to your instruments
      {
         description: 'A gauge instrument for temperature',
         unit: 'celiusDegrees',
         valueType: ValueType.INT,
      }
   );
   gauge.addCallback((result) => {
      result.observe(temperature);
   });