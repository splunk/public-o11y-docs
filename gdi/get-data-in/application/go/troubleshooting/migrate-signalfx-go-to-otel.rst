.. _migrate-signalfx-go-to-otel: 

****************************************************
Migrate from the SignalFx Tracing Library for Go
****************************************************

.. meta:: 
   :description: The Splunk Distribution of OpenTelemetry Go replaces the deprecated SignalFx Go Tracing Library. To migrate to the Splunk Distribution of OpenTelemetry Go, follow these instructions.

The Splunk Distribution of OpenTelemetry Go replaces the deprecated SignalFx Go Tracing Library. To migrate to the Splunk Go OTel instrumentation, follow these instructions.

.. _requirements-splunk-go-otel-migration:

Compatibility and requirements
==========================================================

The Splunk Distribution of OpenTelemetry Go requires Go 1.18 and higher. See :ref:`go-otel-requirements`.

Reconfigure the tracing settings
==========================================================

The ``distro`` package from the Splunk Distribution of OpenTelemetry Go replaces the ``tracing`` package from the SignalFx Tracing Library for Go. Replace the ``tracing.Start`` function with ``distro.Run``. 

Use the following replacements in ``tracing.StartOption`` instances:

.. list-table:: 
   :header-rows: 1

   * - SignalFx Tracing Library
     - Splunk OTel Go
   * - ``tracing.WithAccessToken``
     - Use the ``SPLUNK_ACCESS_TOKEN`` environment variable. See  :ref:`main-go-settings` for more information.
   * - ``tracing.WithEndpointURL``
     - Use the ``SPLUNK_REALM`` or other environment variables to configure the exporter. See  :ref:`trace-exporters-settings-go` for more information.
   * - ``tracing.WithGlobalTag``
     - See :ref:`go-migration-define-resource`.
   * - ``tracing.WithRecordedValueMaxLength``
     - See :ref:`go-migration-set-span-limits`.
   * - ``tracing.WithServiceName``
     - See :ref:`go-migration-define-resource`.
   * - ``tracing.WithoutLibraryTags``
     - Metadata about the tracing library is available in the ``Resource`` associated with the ``distro.SDK``. See :ref:`go-migration-define-resource` for more information.

The ``distro.SDK`` must shut down when your application stops. Defer a cleanup function in your application ``main`` function as in the following example:

.. code-block:: go

   sdk, err := distro.Run()
   if err != nil {
      panic(err)
   }
   defer func() {
      // A context with a deadline can be passed here instead if needed
      if err := sdk.Shutdown(context.Background()); err != nil {
         panic(err)
      }
   }()
   /* ... */

.. _go-migration-define-resource:

Defining resources
----------------------------------------

OpenTelemetry uses resources to describe the metadata applied to all spans. The ``distro.Run`` function creates a default ``Resource`` entity containing all the required Splunk and OpenTelemetry metadata for traces. To provide metadata about your service, include it in ``Resource``.

To include additional attributes in the metadata for all traces produced by the ``distro.SDK``, use the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable. For example:

.. code-block:: sh

   export OTEL_RESOURCE_ATTRIBUTES="ab-test-value=red,owner=Lisa"

.. caution:: Setting the name of the service is required. If you don't set a service name using the ``OTEL_SERVICE_NAME`` environment variable, trace data might be unidentifiable.

.. _go-migration-set-span-limits:

Setting span limits
----------------------------------------

OpenTelemetry includes guards to prevent code from producing excessive usage of computational resources. You can configure span limits by setting the following environment variables:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - Environment variable
     - Description
   * - ``OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT``
     - Maximum number of attributes per span. The default value is unlimited.
   * - ``OTEL_EVENT_ATTRIBUTE_COUNT_LIMIT``
     - Maximum number of attributes per event. The default value is unlimited.
   * - ``OTEL_LINK_ATTRIBUTE_COUNT_LIMIT``
     - Maximum number of attributes per link. The default value is unlimited.
   * - ``OTEL_SPAN_EVENT_COUNT_LIMIT``
     - Maximum number of events per span. The default value is unlimited.
   * - ``OTEL_SPAN_LINK_COUNT_LIMIT``
     - Maximum number of links per span. The default value is ``1000``.
   * - ``OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT``
     - Maximum length of strings for span attribute values. Values larger than the limit are truncated. The default value is ``12000``.

Replace instances of ``tracing.WithRecordedValueMaxLength`` by setting the ``OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT`` environment variable to the same value.

Rewrite all manual instrumentation
==========================================================

Edit all spans created using the ``tracer`` package so that they use OpenTelemetry. 

Consider the following function instrumented using the ``tracer`` package:

.. code-block:: go

   func BusinessOperation(ctx context.Context, client string) {
      opts := []tracer.StartSpanOption{
         tracer.Tag("client", client),
         tracer.SpanType("internal"),
      }
      if parent, ok := tracer.SpanFromContext(ctx); ok {
         opts = append(opts, tracer.ChildOf(parent.Context()))
      }
      span := tracer.StartSpan("BusinessOperation", opts...)
      defer span.Finish()
      /* ... */
   }

After editing all the spans to use OpenTelemetry, the code looks like the following example:

.. code-block:: go

   func BusinessOperation(ctx context.Context, client string) {
      tracer := otel.Tracer("app-name")
      opts := []trace.SpanStartOption{
         trace.WithAttributes(attribute.String("client", client)),
         trace.WithSpanKind(trace.SpanKindInternal),
      }
      ctx, span := tracer.Start(ctx, "BusinessOperation", opts...)
      defer span.End()
      /* ... */
   }

Create OpenTelemetry Tracers
-------------------------------------------

OpenTelemetry uses traces to encapsulate the tracing function of a single instrumentation library. Create
a ``Tracer`` from the global ``TracerProvider`` registered when you start ``distro.SDK``, as in the following example:

.. code-block:: go

   tracer := otel.Tracer("app-name")

Use the new tracer and its ``Start`` function to replace all ``tracer.StartSpan`` invocations:

.. code-block:: go

   ctx, span := tracer.Start(ctx, "BusinessOperation", /* options ... */)

Use the ``operationName`` parameter from ``tracer.StartSpan`` as the ``name`` parameter for ``Start``. 

Replace StartSpanOption instances
-------------------------------------------

Use the following replacements for ``tracer.StartSpanOption`` instances:

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 40 60

   * - SignalFx Tracing Library
     - Splunk OTel Go
   * - ``tracer.ChildOf``
     - The relationship between spans is defined using a ``context.Context``. The ``context.Context`` passed to ``Start`` needs to contain your parent span. This is done automatically if the context is returned from a previous call to ``Start``. To define a parent span explicitly in a context, use ``trace.ContextWithSpan``.
   * - ``tracer.ResourceName``
     - See :ref:`go-migration-define-resource`.
   * - ``tracer.ServiceName``
     - See :ref:`go-migration-define-resource`.
   * - ``tracer.SpanType``
     - ``trace.WithSpanKind``
   * - ``tracer.StartTime``
     - ``trace.WithTimestamp``
   * - ``tracer.Tag``
     - ``trace.WithAttributes``
   * - ``tracer.WithRecordedValueMaxLength``
     - See :ref:`go-migration-set-span-limits`.
   * - ``tracer.WithSpanID``
     - Span IDs are automatically set. If you require custom span IDs, create a custom ``IDGenerator``.

End all spans
-------------------------------------------

Use the OpenTelemetry ``End`` method to end spans, as in the following example:

.. code-block:: go

   defer span.End()

Replace all instrumentation libraries
==========================================================

Replace the following instrumentation libraries with the OpenTelemetry equivalent, if available:

.. list-table:: 
   :header-rows: 1

   * - SignalFx library
     - OpenTelemetry library
   * - ``aws/aws-sdk-go/aws``
     - :new-page:`otelaws <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/aws/aws-sdk-go-v2/otelaws>`
   * - ``bradfitz/gomemcache/memcache``
     - :new-page:`otelmemcache <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/bradfitz/gomemcache/memcache/otelmemcache>`
   * - ``confluentinc/confluent-kafka-go/kafka``
     - :new-page:`splunkkafka <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/confluentinc/confluent-kafka-go/kafka/splunkkafka>`
   * - ``database/sql``
     - :new-page:`splunksql <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/database/sql/splunksql>` (:new-page:`splunkmysql <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/go-sql-driver/mysql/splunkmysql>`, :new-page:`splunkpgx <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/jackc/pgx/splunkpgx>`, :new-page:`splunkpq <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/lib/pq/splunkpq>`)
   * - ``emicklei/go-restful``
     - :new-page:`otelrestful <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/emicklei/go-restful/otelrestful>`
   * - ``garyburd/redigo``
     - ``gomodule/redigo`` and :new-page:`splunkredigo <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/gomodule/redigo/splunkredigo>`
   * - ``gin-gonic/gin``
     - :new-page:`otelgin <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin>`
   * - ``globalsign/mgo``
     - ``mongodb/mongo-go-driver`` and ``otelmongo``
   * - ``go-chi/chi``
     - :new-page:`splunkchi <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/go-chi/chi/splunkchi>`
   * - ``go-redis/redis``
     - This package provides native support for OpenTelemetry.
   * - ``gocql/gocql``
     - :new-page:`otelgocql <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/gocql/gocql/otelgocql>`
   * - ``gomodule/redigo``
     - :new-page:`splunkredigo <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/gomodule/redigo/splunkredigo>`
   * - ``google.golang.org/api``
     - Use either :new-page:`otelgrpc <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc>` or :new-page:`otelhttp <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp>` with a gRPC or HTTP client when calling ``cloudresourcemanager.NewService``.
   * - ``google.golang.org/grpc.v12``
     - Use the latest version of the package alongside :new-page:`otelgrpc <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc>`.
   * - ``google.golang.org/grpc``
     - :new-page:`otelgrpc <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc>`
   * - ``gorilla/mux``
     - :new-page:`otelmux <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/gorilla/mux/otelmux>`
   * - ``graph-gophers/graphql-go``
     - :new-page:`splunkgraphql <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/graph-gophers/graphql-go/splunkgraphql>`
   * - ``jinzhu/gorm``
     - :new-page:`splunkgorm <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/jinzhu/gorm/splunkgorm>`
   * - ``jmoiron/sqlx``
     - :new-page:`splunksqlx <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/jmoiron/sqlx/splunksqlx>`
   * - ``julienschmidt/httprouter``
     - :new-page:`splunkhttprouter <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/julienschmidt/httprouter/splunkhttprouter>`
   * - ``k8s.io/client-go/kubernetes``
     - :new-page:`splunkclient-go <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/k8s.io/client-go/splunkclient-go>`
   * - ``labstack/echo.v4``
     - :new-page:`otelecho <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho>`
   * - ``labstack/echo``
     - Upgrade to ``echo@v4`` and use ``otelecho``.
   * - ``miekg/dns``
     - :new-page:`splunkdns <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/miekg/dns/splunkdns>`
   * - ``mongodb/mongo-go-driver/mongo``
     - :new-page:`otelmongo <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/go.mongodb.org/mongo-driver/mongo/otelmongo>`
   * - ``net/http``
     - :new-page:`splunkhttp <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/net/http/splunkhttp>` and :new-page:`otelhttp <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp>`
   * - ``olivere/elastic``
     - :new-page:`splunkelastic <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/gopkg.in/olivere/elastic/splunkelastic>`
   * - ``Shopify/sarama``
     - :new-page:`otelsarama <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/Shopify/sarama/otelsarama>`
   * - ``syndtr/goleveldb/leveldb``
     - :new-page:`splunkleveldb <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/syndtr/goleveldb/leveldb/splunkleveldb>`
   * - ``tidwall/buntdb``
     - :new-page:`splunkbuntdb <https://github.com/signalfx/splunk-otel-go/tree/main/instrumentation/github.com/tidwall/buntdb/splunkbuntdb>`

Remove the SignalFx Tracing Library
==========================================================

After you've completed the migration, remove all dependencies on ``github.com/signalfx/signalfx-go-tracing`` packages. Make sure to verify this by checking your ``go.mod`` files after cleaning them up.
