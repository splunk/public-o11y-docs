.. _go-otel-requirements:

*************************************************************
Go instrumentation compatibility and requirements
*************************************************************

.. meta::
    :description: This is what you need to instrument any Go application for Splunk Observability Cloud.

Meet these requirements to instrument Go applications for Splunk Observability Cloud.

.. _supported-go-libraries:

Supported libraries and frameworks
=================================================

The Splunk Distribution of OpenTelemetry Go can instrument the following libraries. Check the documentation of each instrumentation package to learn how to activate it.

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 70 30

   * - Target package
     - Instrumentation package
   * - database/sql
     - :new-page:`splunksql <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/database/sql/splunksql/>`
   * - host
     - :new-page:`host <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/host>`
   * - net/http
     - :new-page:`otelhttp <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp>`
   * - net/http/httptrace
     - :new-page:`httptrace <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/net/http/httptrace/otelhttptrace>`
   * - runtime
     - :new-page:`runtime <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime/>`
   * - github.com/aws/aws-sdk-go-v2
     - :new-page:`otelaws <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/aws/aws-sdk-go-v2/otelaws>`
   * - github.com/bradfitz/gomemcache
     - :new-page:`otelmemcache <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/bradfitz/gomemcache/memcache/otelmemcache>`
   * - github.com/confluentinc/confluent-kafka-go/kafka
     - :new-page:`splunkkafka <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/confluentinc/confluent-kafka-go/kafka/splunkkafka>`
   * - github.com/confluentinc/confluent-kafka-go/v2/kafka
     - :new-page:`splunkkafka <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/confluentinc/confluent-kafka-go/v2/kafka/splunkkafka>`
   * - github.com/emicklei/go-restful
     - :new-page:`otelrestful <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/emicklei/go-restful/otelrestful>`
   * - github.com/gin-gonic/gin
     - :new-page:`otelgin <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin>`
   * - github.com/go-chi/chi
     - :new-page:`splunkchi <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/go-chi/chi/splunkchi>`
   * - github.com/go-kit/kit
     - :new-page:`otelkit <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/go-kit/kit/otelkit>`
   * - github.com/go-sql-driver/mysql
     - :new-page:`splunkmysql <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/go-sql-driver/mysql/splunkmysql>`
   * - github.com/gocql/gocql
     - :new-page:`otelgocql <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/gocql/gocql/otelgocql>`
   * - github.com/gomodule/redigo
     - :new-page:`splunkredigo <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/gomodule/redigo/splunkredigo>`
   * - github.com/gorilla/mux
     - :new-page:`otelmux <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/gorilla/mux/otelmux>`
   * - github.com/graph-gophers/graphql-go
     - :new-page:`splunkgraphql <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/graph-gophers/graphql-go/splunkgraphql>`
   * - github.com/jackc/pgx
     - :new-page:`splunkpgx <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/jackc/pgx/splunkpgx>`
   * - github.com/jinzhu/gorm
     - :new-page:`splunkgorm <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/jinzhu/gorm/splunkgorm>`
   * - github.com/jmoiron/sqlx
     - :new-page:`splunksqlx <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/jmoiron/sqlx/splunksqlx>`
   * - github.com/julienschmidt/httprouter
     - :new-page:`splunkhttprouter <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/julienschmidt/httprouter/splunkhttprouter/>`
   * - github.com/labstack/echo
     - :new-page:`otelecho <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho>`
   * - github.com/lib/pq
     - :new-page:`splunkpq <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/lib/pq/splunkpq>`
   * - github.com/miekg/dns
     - :new-page:`splunkdns <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/miekg/dns/splunkdns>`
   * - gopkg.in/olivere/elastic
     - :new-page:`splunkelastic <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/gopkg.in/olivere/elastic/splunkelastic>`
   * - github.com/Shopify/sarama
     - :new-page:`otelsarama <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/github.com/Shopify/sarama/otelsarama>`
   * - github.com/syndtr/goleveldb/leveldb
     - :new-page:`splunkleveldb <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/syndtr/goleveldb/leveldb/splunkleveldb/>`
   * - github.com/tidwall/buntdb
     - :new-page:`splunkbuntdb <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/tidwall/buntdb/splunkbuntdb>`
   * - go.mongodb.org/mongo-driver
     - :new-page:`otelmongo <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/go.mongodb.org/mongo-driver/mongo/otelmongo>`
   * - google.golang.org/grpc
     - :new-page:`otelgrpc <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc>`
   * - gopkg.in/macaron.v1
     - :new-page:`otelmacaron <https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/gopkg.in/macaron.v1/otelmacaron>`
   * - k8s.io/client-go
     - :new-page:`splunkclient-go <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/k8s.io/client-go/splunkclient-go>`

.. _go-requirements:

Ensure you are using supported Go versions
==============================================================

The Splunk Distribution of OpenTelemetry Go is compatible with Go 1.19 and higher.

.. _go-otel-connector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry Go exports application traces and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs.

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.

