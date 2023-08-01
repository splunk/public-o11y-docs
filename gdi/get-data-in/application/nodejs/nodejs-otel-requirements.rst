.. _nodejs-otel-requirements:

*************************************************************
Splunk OTel JS compatibility and requirements 
*************************************************************

.. meta::
    :description: This is what you need to instrument any Node.js application using the Splunk Distribution of OpenTelemetry JS.

Meet these requirements to instrument Node.js applications for Splunk Observability Cloud using the Splunk Distribution of OpenTelemetry JS.

.. _nodes-requirements:

Ensure you have supported Node.js and library versions
==============================================================

The Splunk Distribution of OpenTelemetry JS requires Node.js 14 and higher. To activate AlwaysOn Profiling, you need Node.js 16 or higher.

The Splunk Distribution of OpenTelemetry JS instruments the following libraries and packages:

.. list-table::
   :header-rows: 1

   - 

      - Instrumentation
      - Environment variable name
   - 

      - `@opentelemetry/instrumentation-amqplib <https://www.npmjs.com/package/@opentelemetry/instrumentation-amqplib>`__
      - amqplib
   - 

      - `@opentelemetry/instrumentation-aws-sdk <https://www.npmjs.com/package/@opentelemetry/instrumentation-aws-sdk>`__
      - aws_sdk
   - 

      - `@opentelemetry/instrumentation-bunyan <https://www.npmjs.com/package/@opentelemetry/instrumentation-bunyan>`__
      - bunyan
   - 

      - `@opentelemetry/instrumentation-cassandra-driver <https://www.npmjs.com/package/@opentelemetry/instrumentation-cassandra-driver>`__
      - cassandra_driver
   - 

      - `@opentelemetry/instrumentation-connect <https://www.npmjs.com/package/@opentelemetry/instrumentation-connect>`__
      - connect
   - 

      - `@opentelemetry/instrumentation-dataloader <https://www.npmjs.com/package/@opentelemetry/instrumentation-dataloader>`__
      - dataloader
   - 

      - `@opentelemetry/instrumentation-dns <https://www.npmjs.com/package/@opentelemetry/instrumentation-dns>`__
      - dns
   - 

      - `@opentelemetry/instrumentation-express <https://www.npmjs.com/package/@opentelemetry/instrumentation-express>`__
      - express
   - 

      - `@opentelemetry/instrumentation-fastify <https://www.npmjs.com/package/@opentelemetry/instrumentation-fastify>`__
      - fastify
   - 

      - `@opentelemetry/instrumentation-generic-pool <https://www.npmjs.com/package/@opentelemetry/instrumentation-generic-pool>`__
      - generic_pool
   - 

      - `@opentelemetry/instrumentation-graphql <https://www.npmjs.com/package/@opentelemetry/instrumentation-graphql>`__
      - graphql
   - 

      - `@opentelemetry/instrumentation-grpc <https://www.npmjs.com/package/@opentelemetry/instrumentation-grpc>`__
      - grpc
   - 

      - `@opentelemetry/instrumentation-hapi <https://www.npmjs.com/package/@opentelemetry/instrumentation-hapi>`__
      - hapi
   - 

      - `@opentelemetry/instrumentation-http <https://www.npmjs.com/package/@opentelemetry/instrumentation-http>`__
      - http
   - 

      - `@opentelemetry/instrumentation-ioredis <https://www.npmjs.com/package/@opentelemetry/instrumentation-ioredis>`__
      - ioredis
   - 

      - `@opentelemetry/instrumentation-knex <https://www.npmjs.com/package/@opentelemetry/instrumentation-knex>`__
      - knex
   - 

      - `@opentelemetry/instrumentation-koa <https://www.npmjs.com/package/@opentelemetry/instrumentation-koa>`__
      - koa
   - 

      - `@opentelemetry/instrumentation-memcached <https://www.npmjs.com/package/@opentelemetry/instrumentation-memcached>`__
      - memcached
   - 

      - `@opentelemetry/instrumentation-mongodb <https://www.npmjs.com/package/@opentelemetry/instrumentation-mongodb>`__
      - mongodb
   - 

      - `@opentelemetry/instrumentation-mongoose <https://www.npmjs.com/package/@opentelemetry/instrumentation-mongoose>`__
      - mongoose
   - 

      - `@opentelemetry/instrumentation-mysql <https://www.npmjs.com/package/@opentelemetry/instrumentation-mysql>`__
      - mysql
   - 

      - `@opentelemetry/instrumentation-mysql2 <https://www.npmjs.com/package/@opentelemetry/instrumentation-mysql2>`__
      - mysql2
   - 

      - `@opentelemetry/instrumentation-nestjs-core <https://www.npmjs.com/package/@opentelemetry/instrumentation-nestjs-core>`__
      - nestjs_core
   - 

      - `@opentelemetry/instrumentation-net <https://www.npmjs.com/package/@opentelemetry/instrumentation-net>`__
      - net
   - 

      - `@opentelemetry/instrumentation-pg <https://www.npmjs.com/package/@opentelemetry/instrumentation-pg>`__
      - pg
   - 

      - `@opentelemetry/instrumentation-pino <https://www.npmjs.com/package/@opentelemetry/instrumentation-pino>`__
      - pino
   - 

      - `@opentelemetry/instrumentation-redis <https://www.npmjs.com/package/@opentelemetry/instrumentation-redis>`__
      - redis
   - 

      - `@opentelemetry/instrumentation-redis-4 <https://www.npmjs.com/package/@opentelemetry/instrumentation-redis-4>`__
      - redis_4
   - 

      - `@opentelemetry/instrumentation-restify <https://www.npmjs.com/package/@opentelemetry/instrumentation-restify>`__
      - restify
   - 

      - `@opentelemetry/instrumentation-router <https://www.npmjs.com/package/@opentelemetry/instrumentation-router>`__
      - router
   - 

      - `@opentelemetry/instrumentation-tedious <https://www.npmjs.com/package/@opentelemetry/instrumentation-tedious>`__
      - tedious
   - 

      - `@opentelemetry/instrumentation-winston <https://www.npmjs.com/package/@opentelemetry/instrumentation-winston>`__
      - winston
   - 

      - `elasticsearch <https://github.com/signalfx/splunk-otel-js/tree/main/src/instrumentations/external/elasticsearch>`__
      - elasticsearch
   - 

      - `kafkajs <https://github.com/signalfx/splunk-otel-js/tree/main/src/instrumentations/external/kafkajs>`__
      - kafkajs
   - 

      - `sequelize <https://github.com/signalfx/splunk-otel-js/tree/main/src/instrumentations/external/sequelize>`__
      - sequelize
   - 

      - `typeorm <https://github.com/signalfx/splunk-otel-js/tree/main/src/instrumentations/external/typeorm>`__
      - typeorm


For a complete list, see :new-page:`the plugins folder <https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node>` in the OpenTelemetry upstream repository on GitHub. To use any additional instrumentation, install it using npm before running your application.

.. note:: If you're using a Node.js version lower than 14, use the :new-page:`SignalFx Tracing Library for Node.js <https://github.com/signalfx/signalfx-nodejs-tracing>`.

.. _nodejs-otel-connector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry JS exports application traces and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs, including profiling data.

To send application traces and spans to Splunk Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk Distribution of the OpenTelemetry Collector for Linux. See :ref:`otel-install-linux`.
- Splunk Distribution of the OpenTelemetry Collector for Windows. See :ref:`otel-install-windows`.
- Splunk Distribution of the OpenTelemetry Collector for Kubernetes. See :ref:`otel-install-k8s`.
