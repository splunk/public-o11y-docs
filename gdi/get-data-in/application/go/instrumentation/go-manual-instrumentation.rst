.. _go-manual-instrumentation:

**********************************************************************
Custom Go instrumentation for Splunk Observability Cloud
**********************************************************************

.. meta:: 
   :description: Write custom instrumentation for your Go application when you need to add custom attributes to spans or want to manually generate spans.

Instrumenting applications using the Splunk Distribution of OpenTelemetry Go and instrumentation libraries covers most needs. Writing custom instrumentation for your application is only necessary when, for example, you need to add custom attributes to spans or need to manually generate spans or metrics.

.. _custom-traces-go:

Create custom traces
===============================

To create custom spans and traces, follow these steps:

1. Import the OpenTelemetry API:

   .. code:: go

      import "go.opentelemetry.io/otel"

2. Spans are created by tracers. Therefore, you need to create one:

   .. code:: go

      tracer := otel.Tracer("ExampleService")

3. To create a span with a tracer, you’ll also need a handle on a ``context.Context`` instance e.g. from the request object or from the function parameter. You can also optionally set the tags:

   .. code:: go

      func() {
         ctx, span := tracer.Start(ctx, "hello", trace.WithAttributes(attribute.String("foo", "bar")))
         defer span.End()
         // your logic for "hello" span
      }()

Check [OpenTelemetry Traces API docs](https://pkg.go.dev/go.opentelemetry.io/otel/trace) for further information.


.. _custom-metrics-go:

Create custom metrics
===============================

To create custom metrics, follow these steps:

1. Import the OpenTelemetry API:

   .. code:: go

      import "go.opentelemetry.io/otel"

2. Instruments are created by meters. Therefore, you need to create one:

   .. code:: go

      meter := otel.Meter("ExampleService")

3. Create an instrument which are used for making measurments:

   .. code:: go

	   counter, err := meter.Int64Counter(
      	"business.requests.count",
	   	metric.WithUnit("{request}"),
	   	metric.WithDescription("The numer of business requests."),
	   )
	   if err != nil {
	   	// handle error (e.g. log it)
	   }

4. Make the measurment:

   .. code:: go

      counter.Add(ctx, 1);

Check [OpenTelemetry Metrics API docs](https://pkg.go.dev/go.opentelemetry.io/otel/metric) for further information.