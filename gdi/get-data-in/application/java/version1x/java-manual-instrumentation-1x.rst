.. caution::

   The Splunk Distribution of OpenTelemetry Java version 1.x is deprecated as of May 28, 2024 and will reach End of Support on May 28, 2025. Until then, only critical security fixes and bug fixes will be provided.

   New customers should use the latest version of the :ref:`Splunk Distribution of OpenTelemetry Java <get-started-java>`. Existing customers should consider migrating to version 2.4.0 or higher. To learn how to migrate, see :ref:`java-metrics-migration-guide`.

.. _java-manual-instrumentation-1x:

***************************************************************************
Manually instrument Java applications using the Java agent 1.x (Deprecated)
***************************************************************************

.. meta::
   :description: Version 1.x of the Splunk Java Agent is deprecated. Learn how to migrate to the latest version.

For instructions on how to manually instrument Java applications, see the Manual instrumentation docs in the OpenTelemetry Java Instrumentation repository at https://opentelemetry.io/docs/java/manual_instrumentation.

.. note:: Manual OTel instrumentation is fully compatible with Splunk automatic JVM instrumentation and is fully supported by Splunk.

.. _java-otel-custom-metrics-1x:

Send custom Java application metrics (1.x)
========================================================

The Splunk Distribution of OpenTelemetry Java agent detects if the instrumented application is using Micrometer and injects a special ``MeterRegistry`` implementation that lets the agent collect user-defined meters.

Follow these steps to activate custom application metrics:

- :ref:`add-micrometer-dep-1x`
- :ref:`add-meter-registry-1x`

.. _add-micrometer-dep-1x:

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

.. _add-meter-registry-1x:

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
