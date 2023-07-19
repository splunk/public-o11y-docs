.. _correlate-traces-with-logs-go:

******************************************************************
Connect Go trace data with logs for Splunk Observability Cloud
******************************************************************

.. meta:: 
   :description: You can configure logging libraries to include tracing attributes provided automatically by Splunk OTel Go instrumentation. Use the trace metadata to correlate traces with log events and explore logs in Splunk Observability Cloud.

You can configure logging libraries to include tracing attributes provided automatically by Splunk OTel Go instrumentation. Use the trace metadata to correlate traces with log events and explore logs in Splunk.

The following steps describe how to extract trace metadata and configure logging libraries to include the data as log fields.

Extract trace metadata from contexts
==================================================

The ``SpanContextFromContext`` function of the OpenTelemetry Trace API extracts the trace metadata from a ``context.Context`` and returns it in the form of a ``SpanContext``. The following example shows how to use the function:

.. code-block:: go

	spanContext := trace.SpanContextFromContext(ctx)
	if !spanContext.IsValid() {
		// ctx does not contain a valid span.
		// There is no trace metadata to add.
		return
	}

The ``SpanContext`` struct contains the trace and span ID, trace flags with sampling information, and state information. You can add this metadata to log events to enrich their context, and to correlate traces and logs.

Annotate log events
==============================================

After you gather metadata in a ``SpanContext``, you can use it to annotate log events.

Structured logs
-----------------------------------------------

If you're using a structured logger, add the trace metadata as fields. The following example shows how to annotate log events using the ``zap`` logging library:

.. code-block:: go

	logger, _ := zap.NewProduction()
	defer logger.Sync()
	logger = logger.With(
		zap.String("trace_id", spanContext.TraceID().String()),
		zap.String("span_id", spanContext.SpanID().String()),
		zap.String("trace_flags", spanContext.TraceFlags().String()),
	)
	logger.Info("Failed to fetch URL", zap.String("URL", url))

Unstructured logs
-----------------------------------------------

If you're using unstructured logging, you can add the trace metadata as part of the
logged message. The following example shows how to add trace metadata using the standard library ``log`` package:

.. code-block:: go

	// Add the metadata following an order you can parse later on
	log.Printf(
		"(trace_id: %s, span_id: %s, trace_flags: %s): failed to fetch URL: %s",
		spanContext.TraceID().String(),
		spanContext.SpanID().String(),
		spanContext.TraceFlags().String(),
		url,
	)

Example of log annotation
----------------------------------------

The following is a complete example of a ``chi`` server that extracts trace metadata and annotates log messages for handled requests:

.. code-block:: go

	package main

	import (
		"context"
		"net/http"

		"github.com/go-chi/chi"
		"github.com/signalfx/splunk-otel-go/instrumentation/github.com/go-chi/chi/splunkchi"
		"go.opentelemetry.io/otel/trace"
		"go.uber.org/zap"
	)

	func withTraceMetadata(ctx context.Context, logger *zap.Logger) *zap.Logger {
		spanContext := trace.SpanContextFromContext(ctx)
		if !spanContext.IsValid() {
			// ctx does not contain a valid span.
			// There is no trace metadata to add.
			return logger
		}
		return logger.With(
			zap.String("trace_id", spanContext.TraceID().String()),
			zap.String("span_id", spanContext.SpanID().String()),
			zap.String("trace_flags", spanContext.TraceFlags().String()),
		)
	}

	func helloHandler(logger *zap.Logger) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			l := withTraceMetadata(r.Context(), logger)

			n, err := w.Write([]byte("Hello World!\n"))
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				l.Error("failed to write request response", zap.Error(err))
			} else {
				l.Info("request handled", zap.Int("response_bytes", n))
			}
		}
	}

	func main() {
		logger, err := zap.NewProduction()
		if err != nil {
			panic(err)
		}
		defer logger.Sync()

		router := chi.NewRouter()
		router.Use(splunkchi.Middleware())
		router.Get("/hello", helloHandler(logger))
		if err := http.ListenAndServe(":8080", router); err != nil {
			panic(err)
		}
	}