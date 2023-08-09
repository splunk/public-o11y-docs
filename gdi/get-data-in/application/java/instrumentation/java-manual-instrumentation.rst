.. _java-manual-instrumentation:

********************************************************************
Manually instrument Java applications for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Manually instrument your Java application when you need to add custom attributes to spans or want to manually generate spans and metrics. Keep reading to learn how to manually instrument your Java application for Splunk Observability Cloud. 

Instrumenting applications automatically using the agent of the Splunk Distribution of OpenTelemetry Java covers most needs. Manually instrumenting your application is only necessary when, for example, you need to add custom attributes to spans or need to manually generate spans and metrics.

For instructions on how to manually instrument Java applications, see the Manual instrumentation docs in the OpenTelemetry Java Instrumentation repository at https://opentelemetry.io/docs/java/manual_instrumentation.

.. note:: Manual OTel instrumentation is fully compatible with Splunk automatic JVM instrumentation and is fully supported by Splunk.

.. _java-otel-custom-metrics:

Send custom Java application metrics
========================================================

The Splunk Distribution of OpenTelemetry Java agent detects if the instrumented application is using Micrometer and injects a special ``MeterRegistry`` implementation that lets the agent collect user-defined meters.

Follow these steps to activate custom application metrics:

- :ref:`add-micrometer-dep`
- :ref:`add-meter-registry`

.. _add-micrometer-dep:

Add the micrometer-core dependency
------------------------------------------------------

To export custom metrics through the Java agent, add a dependency on the ``micrometer-core`` library with version 1.5 and higher:

.. tabs::

  .. code-tab:: xml Maven

      <dependency>
        <groupId>io.micrometer</groupId>
        <artifactId>micrometer-core</artifactId>
        <version>1.7.5</version>
      </dependency>

  .. code-tab:: java Gradle

      implementation("io.micrometer:micrometer-core:1.7.5")

.. _add-meter-registry:

Register each custom meter
---------------------------------------------------

You must register each custom meter in the global ``Metrics.globalRegistry`` instance provided by the Micrometer library. You can use one of meter factory methods provided by the ``Metrics`` class, or use meter builders and reference the ``Metrics.globalRegistry`` directly, as in the following example:

.. code:: java

  class MyClass {
  Counter myCounter = Metrics.counter("my_custom_counter");
    Timer myTimer = Timer.builder("my_custom_timer").register(Metrics.globalRegistry);

    int foo() {
      myCounter.increment();
      return myTimer.record(this::fooImpl);
    }

    private int fooImpl() {
       // ...
    }
  }

For more information on the Micrometer API, see the Micrometer official documentation.
