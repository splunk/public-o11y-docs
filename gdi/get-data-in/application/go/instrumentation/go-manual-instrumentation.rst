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

You can create custom metrics of type counter (sum with delta aggregation temporality), cumulative counter (sum), and gauge.

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

.. _custom-metrics-go-reference:

OpenTelemetry Go instrument types
----------------------------------------

The following table shows the equivalences between OpenTelemetry instrument types and Splunk Observability Cloud metric types.

.. list-table:: 
   :header-rows: 1
   :widths: 30 70
   :width: 100%

   * - OpenTelemetry Go
     - Splunk Observability Cloud

   * - ``Int64Counter``
     - Cumulative counter

   * - ``Int64Histogram``
     - Histogram types generate three separate metrics in Splunk Observability Cloud:

         * ``_count`` (Cumulative counter), which represents the item count.
         * ``_sum`` (Cumulative counter), which represents the sum of all values.
         * ``_bucket`` (Cumulative counter), which assigns a data point to the bucket.
         * ``_min`` (Gauge), which indicates the minumum value.
         * ``_max`` (Gauge), which indicates the maximum value.
       
       Buckets have a dimension ``le`` which is set to the highest value of the items counted in the bucket.

   * - ``Int64ObservableCounter``
     - Cumulative counter

   * - ``Int64ObservableGauge``
     - Gauge

   * - ``Int64ObservableUpDownCounter``
     - Gauge

   * - ``Int64UpDownCounter``
     - Gauge

   * - ``Float64Counter``
     - Cumulative counter

   * - ``Float64Histogram``
     - Histogram types generate the following separate metrics in Splunk Observability Cloud:

         * ``_count`` (Cumulative counter), which represents the total count of data points.
         * ``_sum`` (Cumulative counter), which represents the sum of all values in the histogram.
         * ``_bucket`` (Cumulative counter), which assigns a data point to the bucket.
         * ``_min`` (Gauge), which indicates the minumum value.
         * ``_max`` (Gauge), which indicates the maximum value.
       
       Buckets have a dimension ``le`` which is set to the highest value of the items counted in the bucket.

   * - ``Float64ObservableCounter``
     - Cumulative counter

   * - ``Float64ObservableGauge``
     - Gauge
   
   * - ``Float64ObservableUpDownCounter``
     - Gauge

   * - ``Float64UpDownCounter``
     - Gauge






