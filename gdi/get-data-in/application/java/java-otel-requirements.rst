.. _java-otel-requirements:

*************************************************************
Java agent compatibility and requirements
*************************************************************

.. meta::
   :description: This is what you need to instrument Java applications for Splunk Observability Cloud.

Meet the following requirements to instrument Java applications for Splunk Observability Cloud:

Supported libraries and frameworks
=================================================

The Splunk Distribution of OpenTelemetry Java instruments numerous libraries, frameworks, and application servers.

For custom metrics support, you must use MicroMeter 1.5 and higher. See :ref:`java-otel-custom-metrics`.

.. _supported-java-libraries:

Libraries and frameworks
----------------------------

The Splunk Distribution of OpenTelemetry Java supports the following libraries and frameworks:

.. list-table::
   :widths: 50 50
   :header-rows: 1
   :width: 100%

   -

      - Library or framework
      - Versions

   -

      - Akka Actors
      - 2.5 and higher

   -

      - Akka HTTP
      - 10.0 and higher

   -

      - Apache Axis2
      - 1.6 and higher

   -

      - Apache Camel
      - 2.20 and higher (not including 3.x)

   -

      - Apache DBCP
      - 2.0 and higher

   -

      - Apache CXF JAX-RS
      - 3.2 and higher

   -

      - Apache CXF JAX-WS
      - 3.0 and higher

   -

      - Apache Dubbo
      - 2.7 and higher

   -

      - Apache HttpAsyncClient
      - 4.1 and higher

   -

      - Apache HttpClient
      - 2.0 and higher

   -

      - Apache Kafka Producer/Consumer API
      - 0.11 and higher

   -

      - Apache Kafka Streams API
      - 0.11 and higher

   -

      - Apache MyFaces
      - 1.2 and higher (not including 3.x)

   -

      - Apache Pulsar
      - 2.8 and higher

   -

      - Apache RocketMQ gRPC/Protobuf-based Client
      - 5.0.0 and higher

   -

      - Apache RocketMQ Remoting-based Client
      - 4.8 and higher

   -

      - Apache Struts 2
      - 2.3 and higher

   -

      - Apache Tapestry
      - 5.4 and higher

   -

      - Apache Wicket
      - 8.0 and higher

   -

      - Armeria
      - 1.3 and higher

   -

      - AsyncHttpClient
      - 1.9 and higher

   -

      - AWS Lambda
      - 1.0 and higher

   -

      - AWS SDK
      - 1.11.x and 2.2.0 and higher

   -

      - Azure Core
      - 1.14 and higher

   -

      - Cassandra Driver
      - 3.0 and higher

   -

      - Couchbase Client
      - 2.0 and higher and 3.1 and higher

   -

      - c3p0
      - 0.9.2 and higher

   -

      - Dropwizard Metrics
      - 4.0 and higher (disabled by default)

   -

      - Dropwizard Views
      - 0.7 and higher

   -

      - Eclipse Grizzly
      - 2.0 and higher (disabled by default)

   -

      - Eclipse Jersey
      - 2.0 and higher (not including 3.x)

   -

      - Eclipse Jetty HTTP Client
      - 9.2 and higher (not including 10 and higher)

   -

      - Eclipse Metro
      - 2.2 and higher (not including 3.x)

   -

      - Eclipse Mojarra
      - 1.2 and higher (not including 3.x)

   -

      - Elasticsearch API
      - 5.0 and higher

   -

      - Elasticsearch REST Client
      - 5.0 and higher

   -

      - Finatra
      - 2.9 and higher

   -

      - Geode Client
      - 1.4 and higher

   -

      - Google HTTP Client
      - 1.19 and higher

   -

      - Grails
      - 3.0 and higher

   -

      - GraphQL Java
      - 12.0 and higher

   -

      - gRPC
      - 1.6 and higher

   -

      - Guava ListenableFuture
      - 10.0 and higher

   -

      - GWT
      - 2.0 and higher

   -

      - Hibernate
      - 3.3 and higher (not including 6.x)

   -

      - HikariCP
      - 3.0 and higher

   -

      - HttpURLConnection
      - Java 8 and higher

   -

      - Hystrix
      - 1.4 and higher


   -

      - Java Executors
      - Java 8 and higher

   -

      - Java Http Client
      - Java 11 and higher

   -

      - java.util.logging
      - Java 8 and higher

   -

      - Java Platform
      - Java 8 and higher

   -

      - JAX-RS
      - 0.5 and higher

   -

      - JAX-RS Client
      - 1.1 and higher

   -

      - JAX-WS
      - 2.0 and higher (not including 3.x)

   -

      - JBoss Log Manager
      - 1.1 and higher

   -

      - JDBC
      - Java 8 and higher

   -

      - Jedis
      - 1.4 and higher

   -

      - JMS
      - 1.1 and higher


   -

      - Jodd Http
      - 4.2 and higher

   -

      - JSP
      - 2.3 and higher

   -

      - Kotlin Coroutines
      - 1.0 and higher

   -

      - Ktor
      - 1.0 and higher

   -

      - Kubernetes Client
      - 7.0 and higher

   -

      - Lettuce
      - 4.0 and higher

   -

      - Log4j 1
      - 1.2 and higher

   -

      - Log4j 2
      - 2.11 and higher

   -

      - Logback
      - 1.0 and higher

   -

      - Micrometer
      - 1.5 and higher

   -

      - MongoDB Driver
      - 3.1 and higher

   -

      - Netty
      - 3.8 and higher

   -

      - OkHttp
      - 2.2 and higher

   -

      - Oracle UCP
      - 11.2 and higher

   -

      - OSHI
      - 5.3.1 and higher

   -

      - Play
      - 2.4 and higher

   -

      - Play WS
      - 1.0 and higher

   -

      - Quartz
      - 2.0 and higher

   -

      - RabbitMQ Client
      - 2.7 and higher

   -

      - Ratpack
      - 1.4 and higher

   -

      - Reactor
      - 3.1 and higher

   -

      - Reactor Netty
      - 0.9 and higher

   -

      - Rediscala
      - 1.8 and higher

   -

      - Redisson
      - 3.0 and higher

   -

      - RESTEasy
      - 3.0 and higher

   -

      - Restlet
      - 1.0 and higher

   -

      - RMI
      - Java 8 and higher

   -

      - RxJava
      - 1.0 and higher

   -

      - Scala ForkJoinPool
      - 2.8 and higher

   -

      - Servlet
      - 2.2 and higher

   -

      - Spark Web Framework
      - 2.3 and higher

   -

      - Spring Boot
      - 

   -

      - Spring Batch
      - 3.0 and higher (not including 5.0 and higher)

   -

      - Spring Data
      - 1.8 and higher

   -

      - Spring Integration
      - 4.1 and higher (not including 6.0 and higher)

   -

      - Spring JMS
      - 2.0 and higher

   -

      - Spring Kafka
      - 2.7 and higher

   -

      - Spring RabbitMQ
      - 1.0 and higher

   -

      - Spring Scheduling
      - 3.1 and higher

   -

      - Spring RestTemplate
      - 3.1 and higher

   -

      - Spring Web MVC
      - 3.1 and higher

   -

      - Spring Web Services
      - 2.0 and higher

   -

      - Spring WebFlux
      - 5.3 and higher

   -

      - Spymemcached
      - 2.12 and higher

   -

      - Tomcat JDBC Pool
      - 8.5.0 and higher

   -

      - Twilio
      - 6.6 and higher (not including 8.x)

   -

      - Undertow
      - 1.4 and higher

   -

      - Vaadin
      - 14.2 and higher

   -

      - Vert.x Web
      - 3.0 and higher

   -

      - Vert.x HttpClient
      - 3.0 and higher

   -

      - Vert.x Kafka Client
      - 3.6 and higher

   -

      - Vert.x RxJava2
      - 3.5 and higher

   -

      - Vibur DBCP
      - 11.0 and higher

.. note:: To deactivate specific instrumentations, see :ref:`java-instrumentation-issues`.

.. _supported-java-servers:

Application servers
-------------------

The Splunk Distribution of OpenTelemetry Java supports the following application servers. See :ref:`java-servers-instructions` for more information.

.. list-table::
   :widths: 50 50
   :header-rows: 1
   :width: 100%


   -

      - Application server
      - Version

   -

      - Jetty
      - 9.4.x, 10.0.x, 11.0.x

   -

      - Payara
      - 5.0.x, 5.1.x

   -

      - Tomcat
      - 7.0.x

   -

      - Tomcat
      - 7.0.x, 8.5.x, 9.0.x, 10.0.x

   -

      - TomEE
      - 7.x, 8.x

   -

      - Open Liberty
      - 21.x, 22.x

   -

      - Websphere Traditional
      - 8.5.5.x, 9.0.x

   -

      - WildFly
      - 13.x

   -

      - WildFly
      - 17.x, 21.x, 25.x

.. _java-requirements:

Ensure you are using supported Java and JVM versions
==============================================================

The agent of the Splunk Distribution of OpenTelemetry Java supports the following Java versions:

- Java 8 starting from 8u40 (8u262 for AlwaysOn Profiling)
- Java 11
- Java 17 and higher LTS versions

The following Java Virtual Machines (JVMs) are supported:

- AdoptOpenJDK
- Amazon Corretto
- Azul Zulu
- BellSoft Liberica JDK
- Eclipse Adoptium/Temurin
- IBM J9 (AlwaysOn Profiling is not supported)
- Microsoft OpenJDK
- Oracle OpenJDK
- Red Hat OpenJDK
- SAP SapMachine

.. note:: Splunk Observability Cloud officially supports Java and Groovy as JVM languages. You can instrument applications written in other JVM languages, but the quality of the telemetry data is not guaranteed.

.. _java-otel-connector-requirement:

Install and configure the Splunk Distribution of OpenTelemetry Collector
======================================================================================================

The Splunk Distribution of OpenTelemetry Java exports application and JVM metrics and spans to the Splunk Distribution of OpenTelemetry Collector, which also collects system metric data and logs, including profiling data.

To send application traces and spans to Observability Cloud, install the Splunk Distribution of OpenTelemetry Collector for your platform. The following distributions are available:

- Splunk OTel Collector for Linux. See :ref:`otel-install-linux`.
- Splunk OTel Collector for Windows. See :ref:`otel-install-windows`.
- Splunk OTel Collector for Kubernetes. See :ref:`otel-install-k8s`.
