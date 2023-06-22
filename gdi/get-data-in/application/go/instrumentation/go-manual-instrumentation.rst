.. _go-manual-instrumentation:

**********************************************************************
Custom Go instrumentation for Splunk Observability Cloud
**********************************************************************

.. meta:: 
   :description: Write custom instrumentation for your Go application when you need to add custom attributes to spans or want to manually generate spans and metrics.

Instrumenting applications using the Splunk Distribution of OpenTelemetry Go and instrumentation libraries covers most needs. Writing custom instrumentation for your application is only necessary when, for example, you need to add custom attributes to spans or need to manually generate spans and metrics.

.. _custom-traces-go:

Create custom traces
===============================

To create custom spans and traces, follow these steps:

1. Import the OpenTelemetry API:

   .. code:: go

      import "go.opentelemetry.io/otel"

2. Create a tracer for your spans:

   .. code:: go

      tracer := otel.Tracer("ExampleService")

3. To create a span, you need a handle on a ``context.Context`` instance. You can also set the tags. For example:

   .. code:: go

      func() {
         ctx, span := tracer.Start(ctx, "hello", trace.WithAttributes(attribute.String("foo", "bar")))
         defer span.End()
         // your logic for "hello" span
      }()

See the :new-page:`OpenTelemetry Traces API documentation <https://pkg.go.dev/go.opentelemetry.io/otel/trace>` for additional information.

.. _custom-metrics-go:

Create custom metrics
===============================

To create custom metrics, follow these steps:

1. Import the OpenTelemetry API:

   .. code:: go

      import "go.opentelemetry.io/otel"

2. Create a meter:

   .. code:: go

      meter := otel.Meter("ExampleService")

3. Create an instrument to take measurements:

   .. code:: go

	   counter, err := meter.Int64Counter(
      	"business.requests.count",
	   	metric.WithUnit("{request}"),
	   	metric.WithDescription("The numer of business requests."),
	   )
	   if err != nil {
	   	// handle error (e.g. log it)
	   }

4. Perform the measurements:

   .. code:: go

      counter.Add(ctx, 1);

See the :new-page:`OpenTelemetry Metrics API docs <https://pkg.go.dev/go.opentelemetry.io/otel/metric>` for additional information.
