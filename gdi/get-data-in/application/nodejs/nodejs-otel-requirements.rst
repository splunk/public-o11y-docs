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
   :width: 100%

   - 

      - Instrumentation
      - Environment variable name
   - 

      - :new-page:`@opentelemetry/instrumentation-amqplib <https://www.npmjs.com/package/@opentelemetry/instrumentation-amqplib>`
      - amqplib
   - 

      - :new-page:`@opentelemetry/instrumentation-aws-sdk <https://www.npmjs.com/package/@opentelemetry/instrumentation-aws-sdk>`
      - aws_sdk
   - 

      - :new-page:`@opentelemetry/instrumentation-bunyan <https://www.npmjs.com/package/@opentelemetry/instrumentation-bunyan>`
      - bunyan
   - 

      - :new-page:`@opentelemetry/instrumentation-cassandra-driver <https://www.npmjs.com/package/@opentelemetry/instrumentation-cassandra-driver>`
      - cassandra_driver
   - 

      - :new-page:`@opentelemetry/instrumentation-connect <https://www.npmjs.com/package/@opentelemetry/instrumentation-connect>`
      - connect
   - 

      - :new-page:`@opentelemetry/instrumentation-dataloader <https://www.npmjs.com/package/@opentelemetry/instrumentation-dataloader>`
      - dataloader
   - 

      - :new-page:`@opentelemetry/instrumentation-dns <https://www.npmjs.com/package/@opentelemetry/instrumentation-dns>`
      - dns
   - 

      - :new-page:`@opentelemetry/instrumentation-express <https://www.npmjs.com/package/@opentelemetry/instrumentation-express>`
      - express
   - 

      - :new-page:`@opentelemetry/instrumentation-fastify <https://www.npmjs.com/package/@opentelemetry/instrumentation-fastify>`
      - fastify
   - 

      - :new-page:`@opentelemetry/instrumentation-generic-pool <https://www.npmjs.com/package/@opentelemetry/instrumentation-generic-pool>`
      - generic_pool
   - 

      - :new-page:`@opentelemetry/instrumentation-graphql <https://www.npmjs.com/package/@opentelemetry/instrumentation-graphql>`
      - graphql
   - 

      - :new-page:`@opentelemetry/instrumentation-grpc <https://www.npmjs.com/package/@opentelemetry/instrumentation-grpc>`
      - grpc
   - 

      - :new-page:`@opentelemetry/instrumentation-hapi <https://www.npmjs.com/package/@opentelemetry/instrumentation-hapi>`
      - hapi
   - 

      - :new-page:`@opentelemetry/instrumentation-http <https://www.npmjs.com/package/@opentelemetry/instrumentation-http>`
      - http
   - 

      - :new-page:`@opentelemetry/instrumentation-ioredis <https://www.npmjs.com/package/@opentelemetry/instrumentation-ioredis>`
      - ioredis
   - 

      - :new-page:`@opentelemetry/instrumentation-knex <https://www.npmjs.com/package/@opentelemetry/instrumentation-knex>`
      - knex
   - 

      - :new-page:`@opentelemetry/instrumentation-koa <https://www.npmjs.com/package/@opentelemetry/instrumentation-koa>`
      - koa
   - 

      - :new-page:`@opentelemetry/instrumentation-memcached <https://www.npmjs.com/package/@opentelemetry/instrumentation-memcached>`
      - memcached
   - 

      - :new-page:`@opentelemetry/instrumentation-mongodb <https://www.npmjs.com/package/@opentelemetry/instrumentation-mongodb>`
      - mongodb
   - 

      - :new-page:`@opentelemetry/instrumentation-mongoose <https://www.npmjs.com/package/@opentelemetry/instrumentation-mongoose>`
      - mongoose
   - 

      - :new-page:`@opentelemetry/instrumentation-mysql <https://www.npmjs.com/package/@opentelemetry/instrumentation-mysql>`
      - mysql
   - 

      - :new-page:`@opentelemetry/instrumentation-mysql2 <https://www.npmjs.com/package/@opentelemetry/instrumentation-mysql2>`
      - mysql2
   - 

      - :new-page:`@opentelemetry/instrumentation-nestjs-core <https://www.npmjs.com/package/@opentelemetry/instrumentation-nestjs-core>`
      - nestjs_core
   - 

      - :new-page:`@opentelemetry/instrumentation-net <https://www.npmjs.com/package/@opentelemetry/instrumentation-net>`
      - net
   - 

      - :new-page:`@opentelemetry/instrumentation-pg <https://www.npmjs.com/package/@opentelemetry/instrumentation-pg>`
      - pg
   - 

      - :new-page:`@opentelemetry/instrumentation-pino <https://www.npmjs.com/package/@opentelemetry/instrumentation-pino>`
      - pino
   - 

      - :new-page:`@opentelemetry/instrumentation-redis <https://www.npmjs.com/package/@opentelemetry/instrumentation-redis>`
      - redis
   - 

      - :new-page:`@opentelemetry/instrumentation-redis-4 <https://www.npmjs.com/package/@opentelemetry/instrumentation-redis-4>`
      - redis_4
   - 

      - :new-page:`@opentelemetry/instrumentation-restify <https://www.npmjs.com/package/@opentelemetry/instrumentation-restify>`
      - restify
   - 

      - :new-page:`@opentelemetry/instrumentation-router <https://www.npmjs.com/package/@opentelemetry/instrumentation-router>`
      - router
   - 

      - :new-page:`@opentelemetry/instrumentation-tedious <https://www.npmjs.com/package/@opentelemetry/instrumentation-tedious>`
      - tedious
   - 

      - :new-page:`@opentelemetry/instrumentation-winston <https://www.npmjs.com/package/@opentelemetry/instrumentation-winston>`
      - winston
   - 

      - :new-page:`elasticsearch <https://github.com/signalfx/splunk-otel-js/tree/main/src/instrumentations/external/elasticsearch>`
      - elasticsearch
   - 

      - :new-page:`kafkajs <https://github.com/signalfx/splunk-otel-js/tree/main/src/instrumentations/external/kafkajs>`
      - kafkajs
   - 

      - :new-page:`sequelize <https://github.com/signalfx/splunk-otel-js/tree/main/src/instrumentations/external/sequelize>`
      - sequelize
   - 

      - :new-page:`typeorm <https://github.com/signalfx/splunk-otel-js/tree/main/src/instrumentations/external/typeorm>`
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
