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

You can use any of the instrumentation libraries listed in the :new-page:`OpenTelemetry Registry <https://opentelemetry.io/ecosystem/registry/?language=go&component=instrumentation>`.

The following table lists all the instrumentations supported by Splunk. Check the documentation of each instrumentation package to learn how to activate it.

.. list-table:: 
   :header-rows: 1
   :width: 100%
   :widths: 70 30

   * - Target package
     - Instrumentation package
   * - database/sql
     - :new-page:`splunksql <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/database/sql/splunksql/>`
   * - github.com/confluentinc/confluent-kafka-go/kafka
     - :new-page:`splunkkafka <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/confluentinc/confluent-kafka-go/kafka/splunkkafka>`
   * - github.com/confluentinc/confluent-kafka-go/v2/kafka
     - :new-page:`splunkkafka <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/confluentinc/confluent-kafka-go/v2/kafka/splunkkafka>`
   * - github.com/go-chi/chi
     - :new-page:`splunkchi <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/go-chi/chi/splunkchi>`
   * - github.com/gomodule/redigo
     - :new-page:`splunkredigo <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/gomodule/redigo/splunkredigo>`
   * - github.com/graph-gophers/graphql-go
     - :new-page:`splunkgraphql <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/graph-gophers/graphql-go/splunkgraphql>`
   * - github.com/jackc/pgx/v4
     - :new-page:`splunkpgx <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/jackc/pgx/splunkpgx>`
   * - github.com/jackc/pgx/v5
     - :new-page:`splunkpgx <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/jackc/pgx/v5/splunkpgx>`
   * - github.com/jinzhu/gorm
     - :new-page:`splunkgorm <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/jinzhu/gorm/splunkgorm>`
   * - github.com/jmoiron/sqlx
     - :new-page:`splunksqlx <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/jmoiron/sqlx/splunksqlx>`
   * - github.com/julienschmidt/httprouter
     - :new-page:`splunkhttprouter <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/julienschmidt/httprouter/splunkhttprouter/>`
   * - github.com/lib/pq
     - :new-page:`splunkpq <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/lib/pq/splunkpq>`
   * - github.com/miekg/dns
     - :new-page:`splunkdns <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/miekg/dns/splunkdns>`
   * - gopkg.in/olivere/elastic
     - :new-page:`splunkelastic <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/gopkg.in/olivere/elastic/splunkelastic>`
   * - github.com/syndtr/goleveldb/leveldb
     - :new-page:`splunkleveldb <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/syndtr/goleveldb/leveldb/splunkleveldb/>`
   * - github.com/tidwall/buntdb
     - :new-page:`splunkbuntdb <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/github.com/tidwall/buntdb/splunkbuntdb>`
   * - k8s.io/client-go
     - :new-page:`splunkclient-go <https://pkg.go.dev/github.com/signalfx/splunk-otel-go/instrumentation/k8s.io/client-go/splunkclient-go>`

.. _go-requirements:

Ensure you are using supported Go versions
==============================================================

.. include:: /_includes/requirements/go.rst


.. _go-otel-connector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry Go exports application traces and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs.

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.

